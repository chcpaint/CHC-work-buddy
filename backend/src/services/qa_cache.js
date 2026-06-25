// services/qa_cache.js — Tier 1 answer cache.
// Reuses Max's previous answers for repeat (or near-duplicate) questions,
// avoiding the Anthropic API call entirely. Two-tier lookup: exact-match
// on normalized text first (fast), then semantic similarity via pgvector.
//
// Toggle via env vars:
//   QA_CACHE_ENABLED               true|false  (default true)
//   QA_CACHE_SIMILARITY_THRESHOLD  0.0-1.0     (default 0.92)

import { supabase } from '../index.js';
import { generateEmbedding } from './rag.js';
import { logger } from '../utils/logger.js';

const ENABLED = process.env.QA_CACHE_ENABLED !== 'false';
const SIMILARITY_THRESHOLD = parseFloat(process.env.QA_CACHE_SIMILARITY_THRESHOLD || '0.92');

// Normalize for exact-match key: lowercase, collapse whitespace, strip
// trailing punctuation. Keeps "what's the mix ratio?" === "What's the mix ratio".
export function normalizeQuery(q) {
  return (q || '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[?!.,;:]+$/g, '');
}

// ─── Lookup ────────────────────────────────────────────────────
// Returns { matchType, answer, sources, media, answerSource, similarity? }
// or null if no usable cache entry.
export async function findCachedAnswer(query, tabSlug, language) {
  if (!ENABLED || !query?.trim()) return null;

  const normalized = normalizeQuery(query);
  const lang = language || 'en';

  try {
    // 1. EXACT MATCH — by (normalized_query, tab_slug, language)
    //    tab_slug NULL is treated as "any tab" — gives us cross-tab hits too.
    const { data: exactCandidates } = await supabase
      .from('qa_cache')
      .select('id, answer, sources, media, answer_source, hit_count, tab_slug')
      .eq('normalized_query', normalized)
      .eq('language', lang)
      .eq('is_active', true)
      .order('hit_count', { ascending: false })
      .limit(5);

    let chosen = null;
    if (exactCandidates?.length) {
      // Prefer the tab-specific entry over a cross-tab one
      chosen = exactCandidates.find(r => r.tab_slug === tabSlug) || exactCandidates[0];
    }

    if (chosen) {
      // Fire-and-forget hit_count bump
      supabase.from('qa_cache')
        .update({ hit_count: (chosen.hit_count || 0) + 1, last_used_at: new Date().toISOString() })
        .eq('id', chosen.id)
        .then(() => {});

      return {
        matchType: 'exact',
        answer: chosen.answer,
        sources: chosen.sources || [],
        media: chosen.media || [],
        answerSource: chosen.answer_source,
      };
    }

    // 2. SEMANTIC SIMILARITY — embed the question, find any close match
    const embedding = await generateEmbedding(query);
    if (!embedding) return null;

    const { data: matches, error: rpcErr } = await supabase.rpc('match_qa_cache', {
      query_embedding: embedding,
      match_threshold: SIMILARITY_THRESHOLD,
      tab_filter: tabSlug || null,
      lang_filter: lang,
    });

    if (rpcErr) {
      logger.warn('match_qa_cache RPC error', { error: rpcErr.message });
      return null;
    }
    if (!matches || matches.length === 0) return null;

    const m = matches[0];
    supabase.from('qa_cache')
      .update({ hit_count: (m.hit_count || 0) + 1, last_used_at: new Date().toISOString() })
      .eq('id', m.id)
      .then(() => {});

    return {
      matchType: 'semantic',
      similarity: m.similarity,
      answer: m.answer,
      sources: m.sources || [],
      media: m.media || [],
      answerSource: m.answer_source,
    };

  } catch (err) {
    logger.warn('qa_cache lookup failed (non-fatal)', { error: err.message });
    return null;
  }
}

// ─── Store ─────────────────────────────────────────────────────
// Called after a fresh (non-cached) Anthropic call succeeds.
export async function storeCachedAnswer({
  query, tabSlug, language, answer, sources, media, answerSource,
}) {
  if (!ENABLED || !query?.trim() || !answer?.trim()) return;

  // Don't cache the generic error response or trivially short answers.
  if (answer.length < 50) return;
  if (answer.startsWith('Sorry, something went wrong')) return;

  try {
    const normalized = normalizeQuery(query);
    const embedding = await generateEmbedding(query);

    const { error } = await supabase.from('qa_cache').upsert({
      normalized_query: normalized,
      tab_slug: tabSlug || null,
      language: language || 'en',
      query_embedding: embedding,
      original_query: query,
      answer,
      sources: sources || [],
      media: media || [],
      answer_source: answerSource || 'rag',
      last_used_at: new Date().toISOString(),
    }, {
      onConflict: 'normalized_query,tab_slug,language',
    });

    if (error) {
      logger.warn('qa_cache upsert failed', { error: error.message });
    } else {
      logger.info('qa_cache stored', { q: normalized.slice(0, 80) });
    }
  } catch (err) {
    logger.warn('qa_cache store failed (non-fatal)', { error: err.message });
  }
}

// ─── Admin helpers (used by /api/cache/* routes) ───────────────
export async function getCacheStats(days = 30) {
  try {
    const { data, error } = await supabase.rpc('qa_cache_stats', { days_window: days });
    if (error) throw error;
    const row = (data && data[0]) || {};
    return {
      enabled: ENABLED,
      similarity_threshold: SIMILARITY_THRESHOLD,
      cached_questions: Number(row.cached_questions || 0),
      total_hits: Number(row.total_hits || 0),
      hits_last_30d: Number(row.hits_in_window || 0),
      oldest_entry: row.oldest_entry,
      newest_entry: row.newest_entry,
    };
  } catch (err) {
    return { enabled: ENABLED, error: err.message };
  }
}

export async function getTopCached(limit = 25) {
  const { data, error } = await supabase
    .from('qa_cache')
    .select('id, original_query, tab_slug, language, hit_count, answer_source, last_used_at, created_at')
    .eq('is_active', true)
    .order('hit_count', { ascending: false })
    .limit(Number(limit));
  if (error) throw error;
  return data || [];
}

// Clear cache — must specify at least one constraint to avoid accidental nukes.
export async function clearCache({ tabSlug, olderThanDays, query } = {}) {
  if (!tabSlug && !olderThanDays && !query) {
    throw new Error('Must specify tabSlug, olderThanDays, or query');
  }
  let q = supabase.from('qa_cache').delete();
  if (tabSlug)       q = q.eq('tab_slug', tabSlug);
  if (query)         q = q.eq('normalized_query', normalizeQuery(query));
  if (olderThanDays) {
    const cutoff = new Date(Date.now() - olderThanDays * 86400000).toISOString();
    q = q.lt('last_used_at', cutoff);
  }
  const { error, count } = await q;
  if (error) throw error;
  return { deleted: count || 0 };
}
