-- Migration 004: Query logging for knowledge gap analysis
-- Tracks every question asked of Max and whether it was answered from
-- vector search, keyword/RAG search, or LLM fallback (knowledge gap)

CREATE TABLE IF NOT EXISTS public.query_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  query TEXT NOT NULL,
  answer_source TEXT NOT NULL CHECK (answer_source IN ('vector', 'rag', 'llm')),
  matched_docs TEXT[] DEFAULT '{}',
  language TEXT DEFAULT 'en',
  tab_slug TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for admin reporting
CREATE INDEX IF NOT EXISTS idx_query_logs_source ON public.query_logs(answer_source, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_query_logs_date ON public.query_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_query_logs_user ON public.query_logs(user_id, created_at DESC);

-- RLS
ALTER TABLE public.query_logs ENABLE ROW LEVEL SECURITY;

-- Admins can read all logs
CREATE POLICY "query_logs_select_admin" ON public.query_logs FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'manager')));

-- Insert from backend (service role bypasses RLS, but add policy for safety)
CREATE POLICY "query_logs_insert" ON public.query_logs FOR INSERT TO authenticated
  WITH CHECK (true);
