-- BodyShop AI — Supabase Schema
-- Run this in Supabase SQL Editor

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pg_trgm; -- For fuzzy full-text search

-- ─────────────────────────────────────────
-- USERS & AUTH
-- ─────────────────────────────────────────

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'employee' CHECK (role IN ('admin', 'manager', 'employee')),
  preferred_language TEXT NOT NULL DEFAULT 'en' CHECK (preferred_language IN ('en', 'fr', 'es')),
  shop_location TEXT,
  avatar_url TEXT,
  last_active_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ─────────────────────────────────────────
-- WORKFLOW TABS
-- ─────────────────────────────────────────

CREATE TABLE public.workflow_tabs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  label_en TEXT NOT NULL,
  label_fr TEXT NOT NULL,
  label_es TEXT NOT NULL,
  icon TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  color_hex TEXT DEFAULT '#f97316',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default tabs
INSERT INTO public.workflow_tabs (slug, label_en, label_fr, label_es, icon, sort_order, color_hex) VALUES
  ('vehicle-disassembly', 'Vehicle Disassembly', 'Démontage Véhicule',        'Desmontaje de Vehículo',      '🔧', 1, '#f97316'),
  ('auto-body-repairs',   'Auto Body Repairs',   'Réparations Carrosserie',   'Reparaciones de Carrocería',  '🔨', 2, '#ef4444'),
  ('painting',            'Painting',            'Peinture',                  'Pintura',                     '🎨', 3, '#8b5cf6'),
  ('reassembly',          'Reassembly',          'Réassemblage',              'Reensamblaje',                '⚙️',  4, '#3b82f6'),
  ('detailing-qc',        'Detailing & QC',      'Finition & CQ',             'Detallado y CC',              '✅', 5, '#22c55e');

-- ─────────────────────────────────────────
-- DOCUMENTS (SDS, TECH SHEETS, MANUALS)
-- ─────────────────────────────────────────

CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  doc_type TEXT NOT NULL CHECK (doc_type IN ('sds', 'tech_sheet', 'manual', 'procedure', 'checklist', 'other')),
  tab_slug TEXT REFERENCES public.workflow_tabs(slug),
  language TEXT DEFAULT 'en',
  file_url TEXT,          -- Supabase Storage URL
  file_name TEXT,
  file_size_bytes BIGINT,
  mime_type TEXT,
  tags TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  uploaded_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Document chunks for RAG
CREATE TABLE public.document_chunks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL REFERENCES public.documents(id) ON DELETE CASCADE,
  chunk_index INTEGER NOT NULL,
  content TEXT NOT NULL,
  token_count INTEGER,
  embedding vector(1536),   -- OpenAI text-embedding-3-small dimensions
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- HNSW index for fast vector search (critical for 1000 users)
CREATE INDEX ON public.document_chunks 
  USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);

-- Full text search index
CREATE INDEX ON public.documents USING GIN(to_tsvector('english', title || ' ' || COALESCE(description, '')));

-- ─────────────────────────────────────────
-- MEDIA (VIDEOS & SLIDESHOWS)
-- ─────────────────────────────────────────

CREATE TABLE public.media_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  media_type TEXT NOT NULL CHECK (media_type IN ('video', 'slideshow', 'image')),
  tab_slug TEXT REFERENCES public.workflow_tabs(slug),
  language TEXT DEFAULT 'en',
  file_url TEXT,            -- Supabase Storage or external URL
  thumbnail_url TEXT,
  duration_seconds INTEGER, -- For videos
  slide_count INTEGER,      -- For slideshows
  tags TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  uploaded_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- CHAT / AGENT SESSIONS
-- ─────────────────────────────────────────

CREATE TABLE public.chat_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  tab_slug TEXT,
  language TEXT DEFAULT 'en',
  title TEXT,               -- Auto-generated summary
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  language TEXT DEFAULT 'en',
  sources JSONB DEFAULT '[]',  -- Document citations
  voice_input BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast session message retrieval
CREATE INDEX ON public.chat_messages (session_id, created_at DESC);

-- ─────────────────────────────────────────
-- AUDIT LOG (Security)
-- ─────────────────────────────────────────

CREATE TABLE public.audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id),
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id UUID,
  ip_address INET,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX ON public.audit_log (user_id, created_at DESC);
CREATE INDEX ON public.audit_log (action, created_at DESC);

-- ─────────────────────────────────────────
-- ROW LEVEL SECURITY (RLS)
-- ─────────────────────────────────────────

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Profiles: users can see all active profiles, only update own
CREATE POLICY "profiles_select" ON public.profiles FOR SELECT USING (is_active = true);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Documents: all authenticated users can read, admins can write
CREATE POLICY "documents_select" ON public.documents FOR SELECT TO authenticated USING (is_active = true);
CREATE POLICY "documents_insert" ON public.documents FOR INSERT TO authenticated 
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'manager')));
CREATE POLICY "documents_update" ON public.documents FOR UPDATE TO authenticated 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'manager')));

-- Chunks: same as documents
CREATE POLICY "chunks_select" ON public.document_chunks FOR SELECT TO authenticated USING (true);
CREATE POLICY "chunks_insert" ON public.document_chunks FOR INSERT TO authenticated 
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'manager')));

-- Media: all authenticated users can read
CREATE POLICY "media_select" ON public.media_items FOR SELECT TO authenticated USING (is_active = true);
CREATE POLICY "media_insert" ON public.media_items FOR INSERT TO authenticated 
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'manager')));

-- Chat: users can only see their own sessions
CREATE POLICY "sessions_own" ON public.chat_sessions FOR ALL TO authenticated USING (user_id = auth.uid());
CREATE POLICY "messages_own" ON public.chat_messages FOR ALL TO authenticated 
  USING (EXISTS (SELECT 1 FROM public.chat_sessions WHERE id = session_id AND user_id = auth.uid()));

-- ─────────────────────────────────────────
-- VECTOR SIMILARITY SEARCH FUNCTION
-- ─────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.match_documents(
  query_embedding vector(1536),
  match_threshold FLOAT DEFAULT 0.7,
  match_count INT DEFAULT 8,
  tab_filter TEXT DEFAULT NULL
)
RETURNS TABLE (
  document_id UUID,
  chunk_id UUID,
  title TEXT,
  content TEXT,
  doc_type TEXT,
  tab_slug TEXT,
  file_url TEXT,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    d.id AS document_id,
    dc.id AS chunk_id,
    d.title,
    dc.content,
    d.doc_type,
    d.tab_slug,
    d.file_url,
    1 - (dc.embedding <=> query_embedding) AS similarity
  FROM public.document_chunks dc
  JOIN public.documents d ON d.id = dc.document_id
  WHERE d.is_active = true
    AND (tab_filter IS NULL OR d.tab_slug = tab_filter)
    AND 1 - (dc.embedding <=> query_embedding) > match_threshold
  ORDER BY dc.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- ─────────────────────────────────────────
-- FULL TEXT SEARCH FUNCTION
-- ─────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.search_documents(
  search_query TEXT,
  tab_filter TEXT DEFAULT NULL,
  result_limit INT DEFAULT 20
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  description TEXT,
  doc_type TEXT,
  tab_slug TEXT,
  file_url TEXT,
  rank FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    d.id,
    d.title,
    d.description,
    d.doc_type,
    d.tab_slug,
    d.file_url,
    ts_rank(to_tsvector('english', d.title || ' ' || COALESCE(d.description, '')), 
            plainto_tsquery('english', search_query)) AS rank
  FROM public.documents d
  WHERE d.is_active = true
    AND (tab_filter IS NULL OR d.tab_slug = tab_filter)
    AND to_tsvector('english', d.title || ' ' || COALESCE(d.description, '')) 
        @@ plainto_tsquery('english', search_query)
  ORDER BY rank DESC
  LIMIT result_limit;
END;
$$;

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON public.documents
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_media_updated_at BEFORE UPDATE ON public.media_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
