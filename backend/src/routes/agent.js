// routes/agent.js — AI Agent with RAG + parallel media search
// Voice queries like "show me how to use body filler" trigger video results

import { Router } from 'express';
import { anthropic, openai, supabase } from '../index.js';
import { generateEmbedding, matchDocuments } from '../services/rag.js';
import { detectLanguage, getSystemPrompt } from '../services/anthropic.js';
import { logger } from '../utils/logger.js';

export const agentRouter = Router();

// ─── Translation intent detection ─────────────────────────────
const TRANSLATION_PATTERNS = [
  /\b(translat|tradui|traduc|tradúc|en\s+español|en\s+français|in\s+spanish|in\s+french|au\s+français|al\s+español)\b/i,
  /\b(dame\s+en\s+español|donnez[-\s]moi\s+en\s+français|convertir?\s+al?\s+(español|french|français|spanish))\b/i,
];

function hasTranslationIntent(message) {
  return TRANSLATION_PATTERNS.some(p => p.test(message));
}

// ─── Video intent detection ───────────────────────────────────
const VIDEO_INTENT_PATTERNS = [
  /\b(show\s+me|play|watch|video|videos|tutorial|how\s+to|demonstrate|demonstration|training\s+video|walkthrough|see\s+how|let\s+me\s+see)\b/i,
  /\b(montrez?[-\s]moi|vidéo|tutoriel|comment\s+faire|démonstration|voir\s+comment)\b/i,
  /\b(muéstrame|muéstreme|video|vídeo|tutorial|cómo\s+se\s+hace|cómo\s+usar|ver\s+cómo|demostración)\b/i,
  /\b(media|training|clip|recording)\b/i,
];

// Detect when user is asking "what videos/media do you have" (inventory question)
const MEDIA_INVENTORY_PATTERNS = [
  /\b(what|which|list|any|all)\b.*\b(video|videos|media|training|tutorial|clip)\b/i,
  /\b(video|videos|media|training|tutorial)\b.*\b(do\s+you\s+have|available|exist|are\s+there|got|library|find|found|can'?t\s+find|cannot\s+find|where|no\s+video)\b/i,
  /\b(do\s+you\s+have)\b.*\b(video|videos|media|training|tutorial)\b/i,
  /\b(show|see|view|browse)\b.*\b(all|every|library|collection)\b/i,
  /\b(no|don'?t\s+have|can'?t\s+find|cannot\s+find|where\s+are)\b.*\b(video|videos|media)\b/i,
];

function hasVideoIntent(message) {
  return VIDEO_INTENT_PATTERNS.some(p => p.test(message));
}

function hasMediaInventoryIntent(message) {
  return MEDIA_INVENTORY_PATTERNS.some(p => p.test(message));
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
    const wantsMediaInventory = hasMediaInventoryIntent(message);
    const wantsTranslation = hasTranslationIntent(message) || lang !== 'en';
    const videoSearchTerms = wantsVideo ? extractVideoSearchTerms(message) : null;

    // Run embedding search, keyword search (tab-filtered + cross-tab), and media search in parallel
    // For inventory questions ("what videos do you have"), fetch ALL media instead of searching
    // For specific video queries, search but fall back to all media if nothing found
    const [embedding, initialMediaResults, tabKeywordResults, allKeywordResults] = await Promise.all([
      openai ? generateEmbedding(message) : Promise.resolve(null),
      wantsMediaInventory
        ? getAllMedia()
        : (wantsVideo ? searchMedia(videoSearchTerms || message, tabSlug, null) : Promise.resolve([])),
      // Tab-filtered keyword search
      supabase.rpc('search_documents', {
        search_query: message, tab_filter: tabSlug || null, result_limit: 6,
      }).then(r => r.data || []).catch(e => {
        logger.warn('Tab keyword search failed (non-fatal)', { error: e.message });
        return [];
      }),
      // Cross-tab keyword search (no tab filter — finds docs in any tab)
      supabase.rpc('search_documents', {
        search_query: message, tab_filter: null, result_limit: 6,
      }).then(r => r.data || []).catch(e => {
        logger.warn('Cross-tab keyword search failed (non-fatal)', { error: e.message });
        return [];
      }),
    ]);

    // Safety net: if user wanted video but search returned nothing, fetch ALL media
    let mediaResults = initialMediaResults;
    if ((wantsVideo || wantsMediaInventory) && mediaResults.length === 0) {
      logger.info('Video search returned 0 results, fetching ALL media as fallback');
      mediaResults = await getAllMedia();
    }

    // Merge tab-filtered + cross-tab keyword results, dedup by id
    const kwSeen = new Set();
    const keywordResults = [];
    for (const r of [...tabKeywordResults, ...allKeywordResults]) {
      if (!kwSeen.has(r.id)) {
        kwSeen.add(r.id);
        keywordResults.push(r);
      }
    }

    logger.info('Search results', {
      query: message.slice(0, 80),
      tabSlug,
      wantsVideo,
      wantsMediaInventory,
      mediaHits: mediaResults.length,
      embeddingGenerated: !!embedding,
      tabKeywordHits: tabKeywordResults.length,
      crossTabKeywordHits: allKeywordResults.length,
      mergedKeywordHits: keywordResults.length,
    });

    // Vector search — also try cross-tab if tab-filtered gives few results
    let relevantChunks = embedding ? await matchDocuments(embedding, {
      tabFilter: tabSlug, matchCount: 8, threshold: 0.45,
    }) : [];

    if (relevantChunks.length < 3 && embedding) {
      const crossTabChunks = await matchDocuments(embedding, {
        tabFilter: null, matchCount: 8, threshold: 0.45,
      });
      const chunkSeen = new Set(relevantChunks.map(c => c.document_id));
      for (const c of crossTabChunks) {
        if (!chunkSeen.has(c.document_id)) {
          chunkSeen.add(c.document_id);
          relevantChunks.push(c);
        }
      }
    }

    // If keyword search found documents, also fetch their chunks for context
    let keywordChunks = [];
    if (keywordResults.length > 0) {
      const docIds = keywordResults.map(r => r.id);
      try {
        const { data: extraChunks } = await supabase
          .from('document_chunks')
          .select('content, document_id, chunk_index')
          .in('document_id', docIds)
          .order('chunk_index', { ascending: true })
          .limit(12);
        keywordChunks = (extraChunks || []).map(c => {
          const parentDoc = keywordResults.find(d => d.id === c.document_id);
          return {
            content: c.content,
            document_id: c.document_id,
            title: parentDoc?.title || 'Unknown',
            doc_type: parentDoc?.doc_type || 'other',
            tab_slug: parentDoc?.tab_slug,
            file_url: parentDoc?.file_url,
            similarity: parentDoc?.rank || 0.5,
          };
        });
      } catch (e) {
        logger.warn('Keyword chunk fetch failed (non-fatal)', { error: e.message });
      }
    }

    // Merge vector chunks with keyword chunks, deduplicate by document_id + chunk content
    const seen = new Set();
    const allChunks = [];
    for (const chunk of [...relevantChunks, ...keywordChunks]) {
      const key = `${chunk.document_id}-${chunk.content?.slice(0, 50)}`;
      if (!seen.has(key)) {
        seen.add(key);
        allChunks.push(chunk);
      }
    }
    // Replace relevantChunks reference for downstream use
    const mergedChunks = allChunks.slice(0, 10);

    logger.info('Final merged context', {
      vectorChunks: relevantChunks.length,
      keywordChunks: keywordChunks.length,
      mergedTotal: mergedChunks.length,
      docTitles: [...new Set(mergedChunks.map(c => c.title))].slice(0, 5),
    });

    let conversationHistory = [];
    if (sessionId) {
      const { data: msgs } = await supabase
        .from('chat_messages').select('role, content')
        .eq('session_id', sessionId).order('created_at', { ascending: true }).limit(10);
      conversationHistory = (msgs || []).map(m => ({ role: m.role, content: m.content }));
    }

    const contextText = mergedChunks.length > 0
      ? mergedChunks.map((c, i) => `[Source ${i + 1}: ${c.title} (${c.doc_type?.toUpperCase()})]\n${c.content}`).join('\n\n---\n\n')
      : (keywordResults.length > 0
        ? keywordResults.map((d, i) => `[Source ${i + 1}: ${d.title} (${d.doc_type?.toUpperCase()})]\n${d.description || 'No description available.'}`).join('\n\n---\n\n')
        : 'No specific documents found.');

    const videoHint = mediaResults.length > 0
      ? `\n\n<available_videos>\n${mediaResults.map((v, i) =>
          `Video ${i + 1}: "${v.title}" — Tags: ${(v.tags || []).join(', ')} — Tab: ${v.tab_slug || 'all'}`
        ).join('\n')}\n</available_videos>\n${wantsMediaInventory
          ? 'The user is asking about what videos/media are available. List ALL the videos shown above with their titles and brief descriptions. The video cards are being shown to the user automatically.'
          : 'Relevant training videos have been found and will be shown to the user automatically. Briefly acknowledge them in your response.'}`
      : (wantsVideo || wantsMediaInventory
        ? '\n\nNo training videos or media have been uploaded to the library yet.'
        : '');

    // Translation hint — tell Max to translate the full document content
    const langNames = { es: 'Spanish', fr: 'French', en: 'English' };
    const translationHint = wantsTranslation && mergedChunks.length > 0
      ? `\n\n<translation_instruction>The user speaks ${langNames[lang] || lang}. The documents in the context are in English. You MUST translate the FULL document content into ${langNames[lang] || lang}. Do not summarize — provide the complete translated text so the user can read or print it. Start with "📄 ${lang === 'es' ? 'Traducido de' : lang === 'fr' ? 'Traduit de' : 'Translated from'}: [document title]" then provide the full translation.</translation_instruction>`
      : '';

    const messages = [
      ...conversationHistory,
      { role: 'user', content: `${message}\n\n<context>\n${contextText}${videoHint}${translationHint}\n</context>` },
    ];

    // Send video cards before text starts streaming
    if (mediaResults.length > 0) {
      res.write(`data: ${JSON.stringify({ type: 'media', media: mediaResults })}\n\n`);
    }

    // Use higher token limit for translations (full document content)
    const maxTokens = wantsTranslation ? 4096 : 1024;

    let fullResponse = '';
    const stream = anthropic.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: maxTokens,
      system: getSystemPrompt(lang, tabSlug),
      messages,
    });

    stream.on('text', (text) => {
      fullResponse += text;
      res.write(`data: ${JSON.stringify({ type: 'text', content: text })}\n\n`);
    });

    await stream.finalMessage();

    // Build sources from merged chunks + keyword results (deduplicated)
    const sourceMap = new Map();
    for (const c of mergedChunks) {
      if (!sourceMap.has(c.document_id)) {
        sourceMap.set(c.document_id, {
          id: c.document_id, title: c.title, docType: c.doc_type,
          tabSlug: c.tab_slug, fileUrl: c.file_url, similarity: Math.round((c.similarity || 0.5) * 100),
        });
      }
    }
    for (const d of keywordResults) {
      if (!sourceMap.has(d.id)) {
        sourceMap.set(d.id, {
          id: d.id, title: d.title, docType: d.doc_type,
          tabSlug: d.tab_slug, fileUrl: d.file_url, similarity: Math.round((d.rank || 0.5) * 100),
        });
      }
    }
    const docSources = Array.from(sourceMap.values()).slice(0, 5);

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

// Fetch ALL active media (for inventory questions like "what videos do you have")
// NOTE: Intentionally does NOT filter by tabSlug so users always see all available videos
async function getAllMedia(limit = 50) {
  try {
    const { data, error } = await supabase.from('media_items').select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    logger.info('getAllMedia result', { count: (data || []).length });
    return data || [];
  } catch (err) {
    logger.warn('getAllMedia error', { err: err.message });
    return [];
  }
}

async function searchMedia(query, tabSlug, language, mediaType, limit = 8) {
  try {
    // Try RPC search first (no tab filter — we want to find ALL matching media)
    const { data, error } = await supabase.rpc('search_media', {
      search_query: query, tab_filter: null,
      media_type_filter: mediaType || null, language_filter: null,
      result_limit: limit,
    });
    if (error) throw error;
    if (data && data.length > 0) return data;
  } catch (err) {
    logger.warn('search_media RPC failed (may not exist)', { err: err.message });
  }

  // Fallback 1 — ILIKE on title/description per word
  try {
    const words = query.toLowerCase().split(/\s+/).filter(w => w.length >= 3);
    let fb = supabase.from('media_items').select('*').eq('is_active', true).limit(limit);
    if (words.length > 0) {
      const orClauses = words.map(w => `title.ilike.%${w}%,description.ilike.%${w}%`).join(',');
      fb = fb.or(orClauses);
    }
    const { data: fallback } = await fb;
    if (fallback && fallback.length > 0) return fallback;
  } catch (e2) {
    logger.warn('ILIKE fallback failed', { err: e2.message });
  }

  // Fallback 2 — just return ALL media (the user asked for videos, show them what we have)
  logger.info('searchMedia: returning all media as last resort');
  return getAllMedia(limit);
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
