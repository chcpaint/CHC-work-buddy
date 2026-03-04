// routes/documents.js — Document CRUD

import { Router } from 'express';
import { supabase } from '../index.js';

export const documentsRouter = Router();

// GET /api/documents — List documents (optionally filtered by tab)
documentsRouter.get('/', async (req, res) => {
  const { tab, type, limit = 50, offset = 0 } = req.query;

  let query = supabase
    .from('documents')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (tab) query = query.eq('tab_slug', tab);
  if (type) query = query.eq('doc_type', type);

  const { data, error, count } = await query;
  if (error) return res.status(500).json({ error: error.message });

  res.json({ documents: data, total: count });
});

// GET /api/documents/:id — Single document
documentsRouter.get('/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('id', req.params.id)
    .eq('is_active', true)
    .single();

  if (error || !data) return res.status(404).json({ error: 'Document not found' });
  res.json({ document: data });
});
