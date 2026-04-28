// routes/media.js — Media CRUD + keyword/tag/phrase search

import { Router } from 'express';
import { supabase } from '../index.js';
import { logger } from '../utils/logger.js';

export const mediaRouter = Router();

// ─── GET /api/media — List media items (tab / type filter) ────
mediaRouter.get('/', async (req, res) => {
  const { tab, type, language, limit = 20, offset = 0 } = req.query;

  let query = supabase
    .from('media_items')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .range(offset, offset + Number(limit) - 1);

  if (tab)      query = query.eq('tab_slug', tab);
  if (type)     query = query.eq('media_type', type);
  if (language) query = query.eq('language', language);

  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json({ media: data });
});

// ─── GET /api/media/search — Keyword / tag / phrase search ────
//
//  Query params:
//    q        — natural-language search phrase  (required)
//    tab      — filter to a workflow tab slug   (optional)
//    type     — 'video' | 'slideshow' | 'image' (optional)
//    language — 'en' | 'fr' | 'es'              (optional)
//    limit    — max results, default 8           (optional)
//
mediaRouter.get('/search', async (req, res) => {
  const { q, tab, type, language, limit = 8 } = req.query;

  if (!q?.trim()) {
    return res.status(400).json({ error: 'Search query (q) is required' });
  }

  try {
    // 1. Full-text + tag + fuzzy search via our SQL function
    const { data: ftsResults, error: ftsError } = await supabase.rpc('search_media', {
      search_query:       q.trim(),
      tab_filter:         tab      || null,
      media_type_filter:  type     || null,
      language_filter:    language || null,
      result_limit:       Number(limit),
    });

    if (ftsError) {
      logger.error('Media FTS search error', { error: ftsError.message });
      // Fall through to fallback
    }

    // 2. Fallback: simple ilike on title+description if FTS returns nothing
    //    (handles edge case where search_vector index not yet built)
    let results = ftsResults || [];

    if (results.length === 0) {
      logger.info('Media FTS returned 0 results, falling back to ilike', { q });

      // Escape PostgREST .or() metacharacters so a comma/paren/backslash in the
      // query doesn't break out of the filter expression.
      const safeQ = q.replace(/[,()\\*]/g, '');

      let fallback = supabase
        .from('media_items')
        .select('*')
        .eq('is_active', true)
        .or(`title.ilike.%${safeQ}%,description.ilike.%${safeQ}%`)
        .limit(Number(limit));

      if (tab)      fallback = fallback.eq('tab_slug', tab);
      if (type)     fallback = fallback.eq('media_type', type);
      if (language) fallback = fallback.eq('language', language);

      const { data: fallbackData } = await fallback;
      results = fallbackData || [];
    }

    res.json({
      results,
      query: q,
      count: results.length,
    });

  } catch (err) {
    logger.error('Media search error', { error: err.message });
    res.status(500).json({ error: 'Media search failed' });
  }
});

// ─── GET /api/media/tags — All unique tags across media library ─
mediaRouter.get('/tags', async (req, res) => {
  try {
    // unnest the tags + keywords arrays and return distinct values
    const { data, error } = await supabase
      .from('media_items')
      .select('tags, keywords')
      .eq('is_active', true);

    if (error) throw error;

    const allTags = new Set();
    (data || []).forEach(item => {
      (item.tags    || []).forEach(t => allTags.add(t.toLowerCase()));
      (item.keywords || []).forEach(k => allTags.add(k.toLowerCase()));
    });

    res.json({ tags: [...allTags].sort() });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
});

// ─── GET /api/media/:id — Single media item ───────────────────
mediaRouter.get('/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('media_items')
    .select('*')
    .eq('id', req.params.id)
    .eq('is_active', true)
    .single();

  if (error || !data) return res.status(404).json({ error: 'Not found' });
  res.json({ media: data });
});

// PATCH /api/media/:id — Update media metadata
mediaRouter.patch('/:id', async (req, res) => {
  const { title, description, media_type, tab_slug, language, tags, keywords, transcript, file_url } = req.body;
  const updates = {};
  if (title !== undefined) updates.title = title;
  if (description !== undefined) updates.description = description;
  if (media_type !== undefined) updates.media_type = media_type;
  if (tab_slug !== undefined) updates.tab_slug = tab_slug || null;
  if (language !== undefined) updates.language = language;
  if (file_url !== undefined) updates.file_url = file_url;
  if (tags !== undefined) updates.tags = Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim().toLowerCase()).filter(Boolean);
  if (keywords !== undefined) updates.keywords = Array.isArray(keywords) ? keywords : keywords.split(',').map(k => k.trim().toLowerCase()).filter(Boolean);
  if (transcript !== undefined) updates.transcript = transcript;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'No fields to update' });
  }

  const { data, error } = await supabase
    .from('media_items')
    .update(updates)
    .eq('id', req.params.id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json({ media: data });
});

// DELETE /api/media/:id — Soft-delete a media item
mediaRouter.delete('/:id', async (req, res) => {
  const { error } = await supabase
    .from('media_items')
    .update({ is_active: false })
    .eq('id', req.params.id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});
