// routes/ingest.js — Document upload, extraction, and embedding

import { Router } from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import { supabase } from '../index.js';
import { ingestDocument } from '../services/rag.js';
import { autoTagDocument, autoTagMedia } from '../services/autotag.js';
import { requireRole } from '../middleware/auth.js';
import { logger } from '../utils/logger.js';

export const ingestRouter = Router();

// Only admins and managers can upload documents
ingestRouter.use(requireRole(['admin', 'manager']));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max
  fileFilter: (req, file, cb) => {
    const allowed = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'text/csv',
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type ${file.mimetype} not supported`));
    }
  },
});

// POST /api/ingest/document — Upload and embed a document
ingestRouter.post('/document', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file provided' });
  }

  const { title, description, docType, tabSlug, language, tags } = req.body;
  const userId = req.user.id;

  if (!title || !docType) {
    return res.status(400).json({ error: 'title and docType are required' });
  }

  try {
    // 1. Extract text from file
    let rawText = '';
    const { buffer, mimetype, originalname, size } = req.file;

    if (mimetype === 'application/pdf') {
      const pdfData = await pdfParse(buffer);
      rawText = pdfData.text;
    } else if (mimetype.includes('wordprocessingml')) {
      const result = await mammoth.extractRawText({ buffer });
      rawText = result.value;
    } else {
      rawText = buffer.toString('utf-8');
    }

    if (!rawText.trim()) {
      return res.status(400).json({ error: 'Could not extract text from file' });
    }

    // 1b. Auto-tag with AI (runs in parallel with upload, non-blocking)
    const autoTagPromise = autoTagDocument(rawText, { title, docType }).catch(err => {
      logger.warn('Auto-tag skipped', { error: err.message });
      return null;
    });

    // 2. Upload file to Supabase Storage
    const filePath = `documents/${tabSlug || 'general'}/${Date.now()}-${originalname}`;
    const { data: storageData, error: storageError } = await supabase.storage
      .from('bodyshop-docs')
      .upload(filePath, buffer, { contentType: mimetype });

    if (storageError) throw storageError;

    const { data: { publicUrl } } = supabase.storage
      .from('bodyshop-docs')
      .getPublicUrl(filePath);

    // 3. Wait for auto-tags and merge with manual input
    const autoTags = await autoTagPromise;
    const manualTags = tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [];
    const mergedTags = [...new Set([...manualTags, ...(autoTags?.tags || [])])];

    const { data: docRecord, error: docError } = await supabase
      .from('documents')
      .insert({
        title,
        description: description || autoTags?.description || null,
        doc_type: docType || autoTags?.suggestedDocType || 'other',
        tab_slug: tabSlug || autoTags?.suggestedTab || null,
        language: language || 'en',
        file_url: publicUrl,
        file_name: originalname,
        file_size_bytes: size,
        mime_type: mimetype,
        tags: mergedTags,
        uploaded_by: userId,
      })
      .select()
      .single();

    if (docError) throw docError;

    logger.info('Document created with auto-tags', {
      documentId: docRecord.id,
      manualTags: manualTags.length,
      autoTags: autoTags?.tags?.length || 0,
      suggestedTab: autoTags?.suggestedTab,
    });

    // 4. Start embedding pipeline (async - return immediately)
    res.json({
      success: true,
      document: docRecord,
      message: 'Document uploaded. Embedding in progress...',
    });

    // 5. Run embedding asynchronously
    ingestDocument(docRecord.id, rawText)
      .then(result => {
        logger.info('Embedding complete', { documentId: docRecord.id, chunks: result.chunkCount });
      })
      .catch(err => {
        logger.error('Embedding failed', { documentId: docRecord.id, error: err.message });
        // Mark document as embedding_failed
        supabase.from('documents')
          .update({ metadata: { embedding_status: 'failed', error: err.message } })
          .eq('id', docRecord.id);
      });

  } catch (error) {
    logger.error('Document ingest error', { error: error.message });
    res.status(500).json({ error: 'Failed to process document', details: error.message });
  }
});

// POST /api/ingest/media — Upload video or slideshow
ingestRouter.post('/media', upload.single('file'), async (req, res) => {
  const { title, description, mediaType, tabSlug, language } = req.body;
  const userId = req.user.id;

  if (!req.file && !req.body.fileUrl) {
    return res.status(400).json({ error: 'No file or URL provided' });
  }

  try {
    let fileUrl = req.body.fileUrl;
    let thumbnailUrl = req.body.thumbnailUrl;

    if (req.file) {
      const { buffer, originalname, mimetype } = req.file;
      const filePath = `media/${tabSlug || 'general'}/${Date.now()}-${originalname}`;
      
      const { error: storageError } = await supabase.storage
        .from('bodyshop-media')
        .upload(filePath, buffer, { contentType: mimetype });

      if (storageError) throw storageError;

      const { data: { publicUrl } } = supabase.storage
        .from('bodyshop-media')
        .getPublicUrl(filePath);

      fileUrl = publicUrl;
    }

    // Auto-tag media with AI
    const autoTags = await autoTagMedia({
      title, description,
      transcript: req.body.transcript,
    }).catch(() => null);

    const manualTags = req.body.tags ? req.body.tags.split(',').map(t => t.trim().toLowerCase()).filter(Boolean) : [];
    const manualKeywords = req.body.keywords ? req.body.keywords.split(',').map(k => k.trim().toLowerCase()).filter(Boolean) : [];

    const { data, error } = await supabase
      .from('media_items')
      .insert({
        title,
        description,
        media_type: mediaType,
        tab_slug: tabSlug || autoTags?.suggestedTab || null,
        language: language || 'en',
        file_url: fileUrl,
        thumbnail_url: thumbnailUrl || null,
        tags: [...new Set([...manualTags, ...(autoTags?.tags || [])])],
        keywords: [...new Set([...manualKeywords, ...(autoTags?.keywords || [])])],
        transcript: req.body.transcript || null,
        uploaded_by: userId,
      })
      .select()
      .single();

    if (error) throw error;
    logger.info('Media created with auto-tags', { mediaId: data.id, autoTags: autoTags?.tags?.length || 0 });
    res.json({ success: true, media: data });

  } catch (error) {
    logger.error('Media ingest error', { error: error.message });
    res.status(500).json({ error: 'Failed to upload media' });
  }
});

// POST /api/ingest/generate-embeddings — backfill embeddings for all chunks missing them
ingestRouter.post('/generate-embeddings', async (req, res) => {
  try {
    // Find all chunks without embeddings
    const { data: chunks, error: fetchErr } = await supabase
      .from('document_chunks')
      .select('id, content')
      .is('embedding', null)
      .order('created_at', { ascending: true })
      .limit(500);

    if (fetchErr) throw fetchErr;

    if (!chunks || chunks.length === 0) {
      return res.json({ message: 'All chunks already have embeddings', processed: 0 });
    }

    logger.info(`Generating embeddings for ${chunks.length} chunks`);
    let successCount = 0;
    let failCount = 0;

    // Process in batches of 10
    const BATCH = 10;
    for (let i = 0; i < chunks.length; i += BATCH) {
      const batch = chunks.slice(i, i + BATCH);

      const results = await Promise.all(
        batch.map(async (chunk) => {
          try {
            const { generateEmbedding } = await import('../services/rag.js');
            const embedding = await generateEmbedding(chunk.content);
            if (!embedding) return { id: chunk.id, success: false };

            const { error: updateErr } = await supabase
              .from('document_chunks')
              .update({ embedding })
              .eq('id', chunk.id);

            if (updateErr) return { id: chunk.id, success: false };
            return { id: chunk.id, success: true };
          } catch {
            return { id: chunk.id, success: false };
          }
        })
      );

      successCount += results.filter(r => r.success).length;
      failCount += results.filter(r => !r.success).length;

      // Rate limit pause between batches
      if (i + BATCH < chunks.length) {
        await new Promise(r => setTimeout(r, 300));
      }
    }

    logger.info(`Embedding generation complete: ${successCount} success, ${failCount} failed`);
    res.json({ message: 'Embedding generation complete', processed: successCount, failed: failCount, total: chunks.length });
  } catch (error) {
    logger.error('Embedding generation failed', { error: error.message });
    res.status(500).json({ error: 'Embedding generation failed', details: error.message });
  }
});

// DELETE /api/ingest/document/:id
ingestRouter.delete('/document/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Chunks cascade delete via FK
    const { error } = await supabase
      .from('documents')
      .update({ is_active: false })
      .eq('id', id);

    if (error) throw error;
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete document' });
  }
});
