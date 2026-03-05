// routes/agent.js — AI Agent with RAG + parallel media search
// Voice queries like "show me how to use body filler" trigger video results

import { Router } from 'express';
import { anthropic, openai, supabase } from '../index.js';
import { generateEmbedding, matchDocuments } from '../services/rag.js';
import { detectLanguage, getSystemPrompt } from '../services/anthropic.js';
import { logger } from '../utils/logger.js';

export const agentRouter = Router();

// ─── Video intent detection ───────────────────────────────────
const VIDEO_INTENT_PATTERNS = [
  /\b(show\s+me|play|watch|video|videos|tutorial|how\s+to|demonstrate|demonstration|training\s+video|walkthrough|see\s+how|let\s+me\s+see)\b/i,
  /\b(montrez?[-\s]moi|vidéo|tutoriel|comment\s+faire|démonstration|voir\s+comment)\b/i,
  /\b(muéstrame|muéstreme|video|vídeo|tutorial|cómo\s+se\s+hace|cómo\s+usar|ver\s+cómo|demostración)\b/i,
];

function hasVideoIntent(message) {
  return VIDEO_INTENT_PATTERNS.some(p => p.test(message));
}

function extractVideoSearchTerms(message) {
  return message
    .replace(/\b(show\s+me|play|watch|a\s+video\s+(on|about|for)|video\s+(on|about|for)|tutorial\s+(on|about|for)|how\s+to|let\s+me\s+see|i\s+need\s+to\s+see|demonstrate|training\s+video|walkthrough|montrez?[-\s]moi|comment\s+faire|muéstrame|muéstreme|cómo\s+se\s+hace|cómo\s+usar)\b/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

// ─── POST /api/agent/query ────────────────────────────────────
agentRouter.post('/query', async (req, res) => {
  const { message, sessionId, tabSlug, language, voiceInput } = req.body;
  const userId = req.user.id;

  if (!message?.trim()) return res.status(400).json({ error: 'Message is required' });

  // Set SSE headers immediately so error handler can always write
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');

  try {
    // Check if AI client is available
    if (!anthropic) {
      res.write(`data: ${JSON.stringify({ type: 'text', content: 'AI service is not configured yet. Please ask your administrator to set the ANTHROPIC_API_KEY environment variable.' })}\n\n`);
      res.write(`data: ${JSON.stringify({ type: 'done' })}\n\n`);
      return res.end();
    }

    const lang = language || await detectLanguage(message) || 'en';
    const wantsVideo = hasVideoIntent(message);
    const videoSearchTerms = wantsVideo ? extractVideoSearchTerms(message) : null;

    // Only run embedding search if OpenAI is configured
    const [embedding, mediaResults] = await Promise.all([
      openai ? generateEmbedding(message) : Promise.resolve(null),
      wantsVideo ? searchMedia(videoSearchTerms || message, tabSlug, lang) : Promise.resolve([]),
    ]);

    const relevantChunks = embedding ? await matchDocuments(embedding, {
      tabFilter: tabSlug, matchCount: 6, threshold: 0.60,
    }) : [];

    let keywordResults = [];
    try {
      const { data } = await supabase.rpc('search_documents', {
        search_query: message, tab_filter: tabSlug || null, result_limit: 4,
      });
      keywordResults = data || [];
    } catch (e) {
      logger.warn('Keyword search failed (non-fatal)', { error: e.message });
    }

    let conversationHistory = [];
    if (sessionId) {
      const { data: msgs } = await supabase
        .from('chat_messages').select('role, content')
        .eq('session_id', sessionId).order('created_at', { ascending: true }).limit(10);
      conversationHistory = (msgs || []).map(m => ({ role: m.role, content: m.content }));
    }

    const contextText = relevantChunks.length > 0
      ? relevantChunks.map((c, i) => `[Source ${i + 1}: ${c.title} (${c.doc_type?.toUpperCase()})]\n${c.content}`).join('\n\n---\n\n')
      : 'No specific documents found.';

    const videoHint = mediaResults.length > 0
      ? `\n\n<available_videos>\n${mediaResults.map((v, i) =>
          `Video ${i + 1}: "${v.title}" — Tags: ${(v.tags || []).join(', ')}`
        ).join('\n')}\n</available_videos>\nRelevant training videos have been found and will be shown to the user automatically. Briefly acknowledge them in your response.`
      : '';

    const messages = [
      ...conversationHistory,
      { role: 'user', content: `${message}\n\n<context>\n${contextText}${videoHint}\n</context>` },
    ];

    // Send video cards before text starts streaming
    if (mediaResults.length > 0) {
      res.write(`data: ${JSON.stringify({ type: 'media', media: mediaResults })}\n\n`);
    }

    let fullResponse = '';
    const stream = anthropic.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: getSystemPrompt(lang, tabSlug),
      messages,
    });

    stream.on('text', (text) => {
      fullResponse += text;
      res.write(`data: ${JSON.stringify({ type: 'text', content: text })}\n\n`);
    });

    await stream.finalMessage();

    const docSources = relevantChunks.slice(0, 3).map(c => ({
      id: c.document_id, title: c.title, docType: c.doc_type,
      tabSlug: c.tab_slug, fileUrl: c.file_url, similarity: Math.round(c.similarity * 100),
    }));

    if (docSources.length > 0) {
      res.write(`data: ${JSON.stringify({ type: 'sources', sources: docSources })}\n\n`);
    }

    res.write(`data: ${JSON.stringify({ type: 'done', language: lang, hadVideo: mediaResults.length > 0 })}\n\n`);
    res.end();

    saveToSession(userId, sessionId, message, fullResponse, lang, docSources, mediaResults, voiceInput);

  } catch (error) {
    logger.error('Agent query error', { error: error.message, stack: error.stack, userId });
    try {
      res.write(`data: ${JSON.stringify({ type: 'text', content: 'Sorry, something went wrong processing your question. Please try again.' })}\n\n`);
      res.write(`data: ${JSON.stringify({ type: 'done' })}\n\n`);
      res.end();
    } catch (writeErr) {
      logger.error('Failed to write error response', { error: writeErr.message });
    }
  }
});

agentRouter.get('/media-search', async (req, res) => {
  const { q, tab, type, limit = 8 } = req.query;
  if (!q?.trim()) return res.status(400).json({ error: 'Query required' });
  try {
    const results = await searchMedia(q, tab || null, null, type || null, Number(limit));
    res.json({ results, query: q });
  } catch (err) {
    res.status(500).json({ error: 'Media search failed' });
  }
});

agentRouter.post('/session', async (req, res) => {
  const { tabSlug, language } = req.body;
  const userId = req.user.id;
  try {
    const { data, error } = await supabase.from('chat_sessions')
      .insert({ user_id: userId, tab_slug: tabSlug, language: language || 'en' })
      .select().single();
    if (error) throw error;
    res.json({ session: data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create session' });
  }
});

agentRouter.get('/sessions', async (req, res) => {
  const userId = req.user.id;
  try {
    const { data, error } = await supabase.from('chat_sessions')
      .select('*').eq('user_id', userId).eq('is_active', true)
      .order('updated_at', { ascending: false }).limit(20);
    if (error) throw error;
    res.json({ sessions: data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

async function searchMedia(query, tabSlug, language, mediaType, limit = 8) {
  try {
    const { data, error } = await supabase.rpc('search_media', {
      search_query: query, tab_filter: tabSlug || null,
      media_type_filter: mediaType || null, language_filter: language || null,
      result_limit: limit,
    });
    if (error) throw error;
    return data || [];
  } catch (err) {
    logger.warn('search_media RPC fallback', { err: err.message });
    const { data: fallback } = await supabase.from('media_items').select('*')
      .eq('is_active', true).or(`title.ilike.%${query}%,description.ilike.%${query}%`).limit(limit);
    return fallback || [];
  }
}

async function saveToSession(userId, sessionId, userMsg, assistantMsg, language, docSources, mediaSources, voiceInput) {
  try {
    let sid = sessionId;
    if (!sid) {
      const { data } = await supabase.from('chat_sessions')
        .insert({ user_id: userId, language }).select().single();
      sid = data?.id;
    }
    if (!sid) return;
    const allSources = [
      ...docSources.map(s => ({ ...s, sourceType: 'document' })),
      ...(mediaSources || []).slice(0, 3).map(m => ({ id: m.id, title: m.title, sourceType: 'media', fileUrl: m.file_url, mediaType: m.media_type })),
    ];
    await supabase.from('chat_messages').insert([
      { session_id: sid, role: 'user',      content: userMsg,      language, voice_input: voiceInput || false },
      { session_id: sid, role: 'assistant', content: assistantMsg, language, sources: allSources },
    ]);
    await supabase.from('chat_sessions').update({ updated_at: new Date().toISOString() }).eq('id', sid);
  } catch (err) {
    logger.error('saveToSession error', { err: err.message });
  }
}
