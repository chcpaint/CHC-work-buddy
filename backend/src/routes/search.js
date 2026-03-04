// routes/search.js — Search endpoint

import { Router } from 'express';
import { hybridSearch } from '../services/rag.js';

export const searchRouter = Router();

// GET /api/search?q=...&tab=...
searchRouter.get('/', async (req, res) => {
  const { q, tab } = req.query;
  if (!q?.trim()) return res.status(400).json({ error: 'Query required' });

  try {
    const results = await hybridSearch(q, { tabFilter: tab || null });
    res.json({ results, query: q });
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
});
