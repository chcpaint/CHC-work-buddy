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

    // Normalize tab slug — "All Tabs" or empty means null
    const normalizedTabSlug = (tabSlug && tabSlug !== '' && tabSlug !== '-- All Tabs --') ? tabSlug : null;

    // 2. Upload file to Supabase Storage
    const filePath = `documents/${normalizedTabSlug || 'general'}/${Date.now()}-${originalname}`;
    let publicUrl = null;
    try {
      const { data: storageData, error: storageError } = await supabase.storage
        .from('bodyshop-docs')
        .upload(filePath, buffer, { contentType: mimetype });

      if (storageError) {
        logger.warn('Storage upload failed (continuing without file URL)', { error: storageError.message });
      } else {
        const { data } = supabase.storage.from('bodyshop-docs').getPublicUrl(filePath);
        publicUrl = data?.publicUrl || null;
      }
    } catch (storageErr) {
      logger.warn('Storage upload exception (continuing without file URL)', { error: storageErr.message });
    }

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
        tab_slug: normalizedTabSlug || autoTags?.suggestedTab || null,
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
    logger.error('Document ingest error', { error: error.message, stack: error.stack });
    res.status(500).json({ error: 'Failed to process document', details: error.message, hint: error.hint || error.code || null });
  }
});

// Helper: extract YouTube video ID from various URL formats
function extractYouTubeId(url) {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const match = url.match(p);
    if (match) return match[1];
  }
  return null;
}

// Helper: extract Vimeo video ID from various URL formats
function extractVimeoId(url) {
  if (!url) return null;
  const patterns = [
    /vimeo\.com\/(\d+)/,
    /vimeo\.com\/video\/(\d+)/,
    /player\.vimeo\.com\/video\/(\d+)/,
  ];
  for (const p of patterns) {
    const match = url.match(p);
    if (match) return match[1];
  }
  return null;
}

// POST /api/ingest/media — Upload video/slideshow or add YouTube link
ingestRouter.post('/media', upload.single('file'), async (req, res) => {
  const { title, description, mediaType, tabSlug, language } = req.body;
  const userId = req.user.id;

  if (!req.file && !req.body.fileUrl && !req.body.youtubeUrl && !req.body.vimeoUrl) {
    return res.status(400).json({ error: 'No file, URL, YouTube, or Vimeo link provided' });
  }

  try {
    const normalizedTabSlug = (tabSlug && tabSlug !== '' && tabSlug !== '-- All Tabs --') ? tabSlug : null;
    let fileUrl = req.body.fileUrl || null;
    let thumbnailUrl = req.body.thumbnailUrl || null;
    let videoSource = null; // 'youtube', 'vimeo', or null

    // Handle YouTube URL
    if (req.body.youtubeUrl) {
      const ytId = extractYouTubeId(req.body.youtubeUrl);
      if (ytId) {
        fileUrl = `https://www.youtube.com/watch?v=${ytId}`;
        thumbnailUrl = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
        videoSource = 'youtube';
      } else {
        fileUrl = req.body.youtubeUrl;
      }
    }

    // Handle Vimeo URL
    if (req.body.vimeoUrl) {
      const vimeoId = extractVimeoId(req.body.vimeoUrl);
      if (vimeoId) {
        fileUrl = `https://vimeo.com/${vimeoId}`;
        thumbnailUrl = `https://vumbnail.com/${vimeoId}.jpg`;
        videoSource = 'vimeo';
      } else {
        fileUrl = req.body.vimeoUrl;
      }
    }

    // Also auto-detect YouTube/Vimeo from generic fileUrl
    if (fileUrl && !videoSource) {
      const ytId = extractYouTubeId(fileUrl);
      if (ytId) {
        fileUrl = `https://www.youtube.com/watch?v=${ytId}`;
        thumbnailUrl = thumbnailUrl || `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
        videoSource = 'youtube';
      } else {
        const vimeoId = extractVimeoId(fileUrl);
        if (vimeoId) {
          fileUrl = `https://vimeo.com/${vimeoId}`;
          thumbnailUrl = thumbnailUrl || `https://vumbnail.com/${vimeoId}.jpg`;
          videoSource = 'vimeo';
        }
      }
    }

    // Handle file upload (non-fatal if storage fails)
    if (req.file && !fileUrl) {
      const { buffer, originalname, mimetype } = req.file;
      const filePath = `media/${normalizedTabSlug || 'general'}/${Date.now()}-${originalname}`;
      try {
        const { error: storageError } = await supabase.storage
          .from('bodyshop-media')
          .upload(filePath, buffer, { contentType: mimetype });

        if (!storageError) {
          const { data } = supabase.storage.from('bodyshop-media').getPublicUrl(filePath);
          fileUrl = data?.publicUrl || null;
        } else {
          logger.warn('Media storage upload failed', { error: storageError.message });
        }
      } catch (storageErr) {
        logger.warn('Media storage exception', { error: storageErr.message });
      }
    }

    // Auto-tag media with AI
    const autoTags = await autoTagMedia({
      title, description,
      transcript: req.body.transcript,
    }).catch(() => null);

    const manualTags = req.body.tags ? req.body.tags.split(',').map(t => t.trim().toLowerCase()).filter(Boolean) : [];
    const manualKeywords = req.body.keywords ? req.body.keywords.split(',').map(k => k.trim().toLowerCase()).filter(Boolean) : [];

    const insertPayload = {
      title,
      description,
      media_type: mediaType || 'video',
      tab_slug: normalizedTabSlug || autoTags?.suggestedTab || null,
      language: language || 'en',
      file_url: fileUrl,
      thumbnail_url: thumbnailUrl,
      tags: [...new Set([...manualTags, ...(autoTags?.tags || [])])],
      keywords: [...new Set([...manualKeywords, ...(autoTags?.keywords || [])])],
      transcript: req.body.transcript || null,
      uploaded_by: userId,
    };
    // Store video source if the column exists (youtube/vimeo)
    if (videoSource) insertPayload.video_source = videoSource;

    const { data, error } = await supabase
      .from('media_items')
      .insert(insertPayload)
      .select()
      .single();

    if (error) {
      // If video_source column doesn't exist yet, retry without it
      if (error.message?.includes('video_source')) {
        delete insertPayload.video_source;
        const retry = await supabase.from('media_items').insert(insertPayload).select().single();
        if (retry.error) throw retry.error;
        logger.info('Media created (without video_source column)', { mediaId: retry.data.id, videoSource });
        return res.json({ success: true, media: retry.data });
      }
      throw error;
    }
    logger.info('Media created', { mediaId: data.id, videoSource, autoTags: autoTags?.tags?.length || 0 });
    res.json({ success: true, media: data });

  } catch (error) {
    logger.error('Media ingest error', { error: error.message, stack: error.stack });
    res.status(500).json({ error: 'Failed to upload media', details: error.message });
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
