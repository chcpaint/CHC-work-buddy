-- Migration 005: Q&A answer cache for Tier 1 self-sufficiency
-- Stores Max's answers keyed by normalized question so repeat queries
-- skip the Anthropic API call entirely. Two lookup strategies:
--   1. exact match on (normalized_query, tab_slug, language)
--   2. semantic similarity match via pgvector when no exact hit

-- ─── Table ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.qa_cache (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  normalized_query  TEXT NOT NULL,
  tab_slug          TEXT,
  language          TEXT NOT NULL DEFAULT 'en',
  query_embedding   vector(1536),
  original_query    TEXT NOT NULL,
  answer            TEXT NOT NULL,
  sources           JSONB DEFAULT '[]'::jsonb,
  media             JSONB DEFAULT '[]'::jsonb,
  answer_source     TEXT,                           -- 'vector','rag','llm' from original gen
  hit_count         INTEGER NOT NULL DEFAULT 0,
  is_active         BOOLEAN NOT NULL DEFAULT true,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_used_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Unique constraint that treats NULL tab_slug as a real key ──
-- (PG 15+ syntax — CHC project is on 17, so this works.)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'qa_cache_norm_tab_lang_uniq'
  ) THEN
    ALTER TABLE public.qa_cache
      ADD CONSTRAINT qa_cache_norm_tab_lang_uniq
      UNIQUE NULLS NOT DISTINCT (normalized_query, tab_slug, language);
  END IF;
END $$;

-- ─── Indexes ────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS qa_cache_hnsw_idx
  ON public.qa_cache USING hnsw (query_embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);

CREATE INDEX IF NOT EXISTS qa_cache_lookup_idx
  ON public.qa_cache (normalized_query, tab_slug, language)
  WHERE is_active = true;

CREATE INDEX IF NOT EXISTS qa_cache_recency_idx
  ON public.qa_cache (last_used_at DESC);

-- ─── RLS — backend uses service role which bypasses, but enable
-- for defense in depth so anon clients can't read the cache directly.
ALTER TABLE public.qa_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "qa_cache_admin_read" ON public.qa_cache FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'manager')));

-- ─── Semantic similarity lookup function ────────────────────
CREATE OR REPLACE FUNCTION public.match_qa_cache(
  query_embedding vector(1536),
  match_threshold FLOAT DEFAULT 0.92,
  tab_filter      TEXT  DEFAULT NULL,
  lang_filter     TEXT  DEFAULT NULL
)
RETURNS TABLE (
  id              UUID,
  original_query  TEXT,
  answer          TEXT,
  sources         JSONB,
  media           JSONB,
  answer_source   TEXT,
  hit_count       INTEGER,
  similarity      FLOAT
)
LANGUAGE plpgsql AS $$
BEGIN
  RETURN QUERY
  SELECT
    qa.id,
    qa.original_query,
    qa.answer,
    qa.sources,
    qa.media,
    qa.answer_source,
    qa.hit_count,
    (1 - (qa.query_embedding <=> query_embedding))::FLOAT AS similarity
  FROM public.qa_cache qa
  WHERE qa.is_active = true
    AND qa.query_embedding IS NOT NULL
    AND (tab_filter  IS NULL OR qa.tab_slug IS NULL OR qa.tab_slug = tab_filter)
    AND (lang_filter IS NULL OR qa.language = lang_filter)
    AND (1 - (qa.query_embedding <=> query_embedding)) > match_threshold
  ORDER BY qa.query_embedding <=> query_embedding ASC
  LIMIT 1;
END;
$$;

-- ─── Stats helper (for the admin /api/cache/stats endpoint) ─
CREATE OR REPLACE FUNCTION public.qa_cache_stats(days_window INT DEFAULT 30)
RETURNS TABLE (
  cached_questions    BIGINT,
  total_hits          BIGINT,
  hits_in_window      BIGINT,
  oldest_entry        TIMESTAMPTZ,
  newest_entry        TIMESTAMPTZ
)
LANGUAGE plpgsql AS $$
DECLARE
  cutoff TIMESTAMPTZ := NOW() - (days_window || ' days')::INTERVAL;
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)                                                AS cached_questions,
    COALESCE(SUM(hit_count), 0)                             AS total_hits,
    COALESCE(SUM(CASE WHEN last_used_at > cutoff THEN hit_count ELSE 0 END), 0) AS hits_in_window,
    MIN(created_at)                                         AS oldest_entry,
    MAX(created_at)                                         AS newest_entry
  FROM public.qa_cache
  WHERE is_active = true;
END;
$$;
