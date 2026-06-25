// routes/video-scripts.js — Generate Synthesia-ready video scripts from documents
// Pulls SOPs/procedures from the knowledge base and converts them to
// natural, scene-by-scene narration scripts for AI video generation.

import { Router } from 'express';
import { anthropic, supabase } from '../index.js';
import { logger } from '../utils/logger.js';
import { ANTHROPIC_MODEL } from '../services/anthropic.js';

export const videoScriptsRouter = Router();

// ─── Generate video script for a single document ─────────────────
videoScriptsRouter.post('/generate/:documentId', async (req, res) => {
  const { documentId } = req.params;
  const { language = 'en', style = 'training' } = req.body;

  try {
    if (!anthropic) {
      return res.status(503).json({ error: 'AI service not configured' });
    }

    // Fetch document + its chunks
    const [docResult, chunksResult] = await Promise.all([
      supabase.from('documents').select('*').eq('id', documentId).single(),
      supabase.from('document_chunks')
        .select('content, chunk_index')
        .eq('document_id', documentId)
        .order('chunk_index', { ascending: true }),
    ]);

    if (docResult.error || !docResult.data) {
      return res.status(404).json({ error: 'Document not found' });
    }

    const doc = docResult.data;
    const chunks = chunksResult.data || [];
    const fullContent = chunks.length > 0
      ? chunks.map(c => c.content).join('\n\n')
      : doc.description || '';

    if (!fullContent.trim()) {
      return res.status(400).json({ error: 'Document has no content to generate a script from' });
    }

    const langNames = { en: 'English', fr: 'French', es: 'Spanish' };
    const langName = langNames[language] || 'English';

    const scriptPrompt = `You are a professional training video scriptwriter for the automotive collision repair industry. Convert the following technical document into a Synthesia-ready video script.

DOCUMENT TITLE: ${doc.title}
DOCUMENT TYPE: ${doc.doc_type}

DOCUMENT CONTENT:
${fullContent}

REQUIREMENTS:
1. Write the script in ${langName}
2. Format the output as a scene-by-scene narration script
3. Each scene should be 15-30 seconds when read aloud (roughly 40-75 words per scene)
4. Target 5-10 scenes total for a 2-4 minute video
5. The narrator is "Max" — a friendly, experienced Canadian body shop veteran
6. Use conversational, natural language — this will be spoken by an AI avatar
7. DO NOT use any markdown, asterisks, bullet points, or special formatting
8. DO NOT include stage directions like [pause] or [show image] — Synthesia handles visuals separately

SCRIPT FORMAT — use this exact structure:
TITLE: [Video Title]
DURATION: [Estimated minutes]
SCENES: [Number of scenes]

---

SCENE 1: [Scene Title]
[Narration text — written naturally as Max would say it]

---

SCENE 2: [Scene Title]
[Narration text]

---

(continue for all scenes)

---

SCENE FINAL: Wrap Up
[Brief closing with a safety reminder if applicable, and encouragement to practice]

STYLE NOTES:
- Open with Max introducing the topic casually: "Hey team, today we're going to walk through..."
- For procedures, walk through each step as if you're standing next to the tech showing them
- Include practical tips a veteran would share: "A little trick I've learned over the years..."
- For safety content, be direct but not preachy: "This is one you really don't want to skip..."
- Close with something encouraging: "Once you've done this a few times, it becomes second nature"
- Keep the energy up — this is a training video, not a lecture`;

    const response = await anthropic.messages.create({
      model: ANTHROPIC_MODEL,
      max_tokens: 4096,
      messages: [{ role: 'user', content: scriptPrompt }],
    });

    const script = response.content[0]?.text || '';

    // Parse scene count and estimated duration from the script
    const sceneMatches = script.match(/SCENE \d+/g);
    const sceneCount = sceneMatches ? sceneMatches.length : 0;
    const durationMatch = script.match(/DURATION:\s*(.+)/);
    const estimatedDuration = durationMatch ? durationMatch[1].trim() : `~${Math.ceil(sceneCount * 0.5)} minutes`;

    logger.info('Video script generated', {
      documentId,
      title: doc.title,
      scenes: sceneCount,
      scriptLength: script.length,
    });

    res.json({
      script,
      metadata: {
        documentId,
        documentTitle: doc.title,
        docType: doc.doc_type,
        language,
        sceneCount,
        estimatedDuration,
        generatedAt: new Date().toISOString(),
      },
    });

  } catch (error) {
    logger.error('Video script generation failed', { error: error.message, documentId });
    res.status(500).json({ error: 'Failed to generate video script' });
  }
});

// ─── Batch generate scripts for all SOPs/procedures ──────────────
videoScriptsRouter.post('/batch', async (req, res) => {
  const { language = 'en', docTypes = ['procedure', 'tech_sheet', 'manual'] } = req.body;

  try {
    // Fetch all active documents of the requested types
    const { data: docs, error } = await supabase
      .from('documents')
      .select('id, title, doc_type, description')
      .eq('is_active', true)
      .in('doc_type', docTypes)
      .order('title', { ascending: true });

    if (error) throw error;

    res.json({
      documents: (docs || []).map(d => ({
        id: d.id,
        title: d.title,
        docType: d.doc_type,
        description: d.description?.slice(0, 120),
      })),
      total: (docs || []).length,
      message: `Found ${(docs || []).length} documents ready for video script generation. Use POST /api/video-scripts/generate/:id to generate each script.`,
    });

  } catch (error) {
    logger.error('Batch listing failed', { error: error.message });
    res.status(500).json({ error: 'Failed to list documents' });
  }
});

// ─── Download script as plain text file ──────────────────────────
videoScriptsRouter.post('/download/:documentId', async (req, res) => {
  const { documentId } = req.params;
  const { language = 'en' } = req.body;

  try {
    if (!anthropic) {
      return res.status(503).json({ error: 'AI service not configured' });
    }

    // Fetch document + chunks
    const [docResult, chunksResult] = await Promise.all([
      supabase.from('documents').select('*').eq('id', documentId).single(),
      supabase.from('document_chunks')
        .select('content, chunk_index')
        .eq('document_id', documentId)
        .order('chunk_index', { ascending: true }),
    ]);

    if (docResult.error || !docResult.data) {
      return res.status(404).json({ error: 'Document not found' });
    }

    const doc = docResult.data;
    const chunks = chunksResult.data || [];
    const fullContent = chunks.length > 0
      ? chunks.map(c => c.content).join('\n\n')
      : doc.description || '';

    if (!fullContent.trim()) {
      return res.status(400).json({ error: 'Document has no content' });
    }

    const langNames = { en: 'English', fr: 'French', es: 'Spanish' };

    const response = await anthropic.messages.create({
      model: ANTHROPIC_MODEL,
      max_tokens: 4096,
      messages: [{
        role: 'user',
        content: `Convert this body shop document into a Synthesia video narration script in ${langNames[language] || 'English'}. Write it scene by scene with natural, conversational narration by "Max" — a friendly veteran body shop tech. Target 5-10 scenes, 15-30 seconds each. No markdown, no special characters. Use this format:

TITLE: [title]
DURATION: [estimate]
---
SCENE 1: [name]
[narration]
---
(etc.)

DOCUMENT: ${doc.title}
CONTENT:
${fullContent}`,
      }],
    });

    const script = response.content[0]?.text || '';
    const safeTitle = doc.title.replace(/[^a-zA-Z0-9-_ ]/g, '').replace(/\s+/g, '-');
    const filename = `video-script-${safeTitle}.txt`;

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(script);

  } catch (error) {
    logger.error('Script download failed', { error: error.message, documentId });
    res.status(500).json({ error: 'Failed to generate script for download' });
  }
});
