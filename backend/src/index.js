// Body Shop Wiz — Backend API Server
// Node.js + Express | Railway deployment

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import multer from 'multer';
import dotenv from 'dotenv';
import { agentRouter } from './routes/agent.js';
import { documentsRouter } from './routes/documents.js';
import { mediaRouter } from './routes/media.js';
import { searchRouter } from './routes/search.js';
import { ingestRouter } from './routes/ingest.js';
import { authRouter } from './routes/auth.js';
import { usersRouter } from './routes/users.js';
import { learningRouter } from './routes/learning.js';
import { authMiddleware } from './middleware/auth.js';
import { auditMiddleware } from './middleware/audit.js';
import { logger } from './utils/logger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Supabase & AI Clients ───────────────────────────────────
export const supabase = createClient(
  process.env.SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'placeholder'
);

// Defensive initialization — server starts even if keys are missing
export let anthropic = null;
try {
  if (process.env.ANTHROPIC_API_KEY) {
    anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  } else {
    console.warn('⚠️  ANTHROPIC_API_KEY not set — AI chat will be unavailable');
  }
} catch (err) {
  console.warn('⚠️  Failed to initialize Anthropic client:', err.message);
}

export let openai = null;
try {
  if (process.env.OPENAI_API_KEY) {
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  } else {
    console.warn('⚠️  OPENAI_API_KEY not set — embeddings will be unavailable');
  }
} catch (err) {
  console.warn('⚠️  Failed to initialize OpenAI client:', err.message);
}

// ─── Security Middleware ──────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "blob:", "*.supabase.co"],
      mediaSrc: ["'self'", "blob:", "*.supabase.co"],
      connectSrc: ["'self'", "*.supabase.co", "*.anthropic.com"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// CORS — whitelist only
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(o => o.trim().replace(/\/+$/, ''))  // trim whitespace and trailing slashes
  .filter(Boolean);

logger.info('CORS allowed origins:', { allowedOrigins });

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, health checks)
    if (!origin) return callback(null, true);
    // Normalize origin for comparison
    const normalizedOrigin = origin.replace(/\/+$/, '');
    if (allowedOrigins.includes(normalizedOrigin) || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      logger.warn(`CORS blocked origin: ${origin}`, { allowedOrigins });
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
}));

app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Trust Railway's reverse proxy so X-Forwarded-For works correctly
app.set('trust proxy', 1);

// ─── Rate Limiting ────────────────────────────────────────────

// General API rate limit
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,       // 1 minute
  max: 100,                   // 100 requests/min per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again shortly.' },
  validate: { trustProxy: false, xForwardedForHeader: false },
});

// Stricter limit for AI agent (expensive)
const agentLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,                    // 30 AI requests/min per IP
  message: { error: 'AI request limit reached. Please wait a moment.' },
  validate: { trustProxy: false, xForwardedForHeader: false },
});

// Upload limiter
const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,  // 1 hour
  max: 50,                    // 50 uploads/hour
  message: { error: 'Upload limit reached.' },
  validate: { trustProxy: false, xForwardedForHeader: false },
});

app.use('/api', apiLimiter);
app.use('/api/agent', agentLimiter);
app.use('/api/ingest', uploadLimiter);

// ─── Request Logging & Audit ──────────────────────────────────
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('user-agent'),
  });
  next();
});

// ─── Health Check (no auth) ───────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    cors_origins: allowedOrigins,
    port: PORT,
    anthropic_ready: !!anthropic,
    openai_ready: !!openai,
    openai_key_set: !!process.env.OPENAI_API_KEY,
    anthropic_key_set: !!process.env.ANTHROPIC_API_KEY,
  });
});

// ─── Public Routes ─────────────────────────────────────────────
app.use('/api/auth', authRouter);

// ─── Diagnostic: test AI + DB functions ──────────────────────
app.get('/api/maintenance/test-agent', async (req, res) => {
  const results = { steps: [] };
  try {
    // Test 1: Can we query document_chunks?
    const { data: chunks, error: chunkErr } = await supabase
      .from('document_chunks')
      .select('id, content')
      .limit(2);
    results.steps.push({ step: 'query_chunks', success: !chunkErr, count: chunks?.length, error: chunkErr?.message });

    // Test 2: Does search_documents RPC exist?
    try {
      const { data: searchData, error: searchErr } = await supabase.rpc('search_documents', {
        search_query: 'body filler', tab_filter: null, result_limit: 3,
      });
      results.steps.push({ step: 'search_documents_rpc', success: !searchErr, count: searchData?.length, error: searchErr?.message });
    } catch (e) {
      results.steps.push({ step: 'search_documents_rpc', success: false, error: e.message });
    }

    // Test 3: Does match_documents RPC exist? (need embedding)
    try {
      const { generateEmbedding } = await import('./services/rag.js');
      const emb = await generateEmbedding('body filler application');
      results.steps.push({ step: 'generate_embedding', success: !!emb, dimensions: emb?.length });

      if (emb) {
        const { data: matchData, error: matchErr } = await supabase.rpc('match_documents', {
          query_embedding: emb, match_threshold: 0.5, match_count: 3, tab_filter: null,
        });
        results.steps.push({ step: 'match_documents_rpc', success: !matchErr, count: matchData?.length, error: matchErr?.message });
      }
    } catch (e) {
      results.steps.push({ step: 'vector_search', success: false, error: e.message });
    }

    // Test 4: Can Anthropic respond?
    try {
      if (anthropic) {
        const resp = await anthropic.messages.create({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 50,
          messages: [{ role: 'user', content: 'Say "hello" in one word.' }],
        });
        results.steps.push({ step: 'anthropic_chat', success: true, response: resp.content[0]?.text });
      } else {
        results.steps.push({ step: 'anthropic_chat', success: false, error: 'anthropic client is null' });
      }
    } catch (e) {
      results.steps.push({ step: 'anthropic_chat', success: false, error: e.message });
    }

    res.json(results);
  } catch (e) {
    res.status(500).json({ error: e.message, steps: results.steps });
  }
});

// ─── Quick DB health check (no auth) — check document & media counts ──
app.get('/api/maintenance/db-check', async (req, res) => {
  try {
    const [docResult, mediaResult, docInactive, mediaInactive] = await Promise.all([
      supabase.from('documents').select('id, title, tab_slug, is_active', { count: 'exact' }).eq('is_active', true),
      supabase.from('media_items').select('id, title, tab_slug, is_active', { count: 'exact' }).eq('is_active', true),
      supabase.from('documents').select('id, title, tab_slug', { count: 'exact' }).eq('is_active', false),
      supabase.from('media_items').select('id, title, tab_slug', { count: 'exact' }).eq('is_active', false),
    ]);

    const tabSlugCounts = {};
    (docResult.data || []).forEach(d => {
      const key = d.tab_slug || '(null)';
      tabSlugCounts[key] = (tabSlugCounts[key] || 0) + 1;
    });

    res.json({
      documents: {
        active: docResult.data?.length || 0,
        inactive: docInactive.data?.length || 0,
        byTab: tabSlugCounts,
        sample: (docResult.data || []).slice(0, 5).map(d => ({ id: d.id, title: d.title, tab_slug: d.tab_slug })),
        error: docResult.error?.message,
      },
      media: {
        active: mediaResult.data?.length || 0,
        inactive: mediaInactive.data?.length || 0,
        sample: (mediaResult.data || []).slice(0, 5).map(m => ({ id: m.id, title: m.title, tab_slug: m.tab_slug })),
        error: mediaResult.error?.message,
      },
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ─── Maintenance: one-time embedding backfill (no auth) ──────
app.all('/api/maintenance/generate-embeddings', async (req, res) => {
  try {
    // Create a fresh OpenAI client directly (in case the global one is null)
    const { default: OpenAI } = await import('openai');
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'OPENAI_API_KEY not set in environment variables' });
    }
    const freshOpenai = new OpenAI({ apiKey });

    const { data: chunks, error: fetchErr } = await supabase
      .from('document_chunks')
      .select('id, content')
      .is('embedding', null)
      .order('created_at', { ascending: true })
      .limit(500);

    if (fetchErr) throw fetchErr;
    if (!chunks || chunks.length === 0) {
      return res.json({ message: 'All chunks already have embeddings', processed: 0 });
    }

    logger.info(`Generating embeddings for ${chunks.length} chunks`);
    let successCount = 0;
    let errors = [];
    const BATCH = 5;

    for (let i = 0; i < chunks.length; i += BATCH) {
      const batch = chunks.slice(i, i + BATCH);
      const results = await Promise.all(
        batch.map(async (chunk) => {
          try {
            const resp = await freshOpenai.embeddings.create({
              model: 'text-embedding-3-small',
              input: chunk.content.replace(/\n/g, ' ').trim().slice(0, 8000),
            });
            const embedding = resp.data[0].embedding;
            const { error } = await supabase.from('document_chunks').update({ embedding }).eq('id', chunk.id);
            if (error) { errors.push(error.message); return false; }
            return true;
          } catch (e) { errors.push(e.message); return false; }
        })
      );
      successCount += results.filter(Boolean).length;
      if (i + BATCH < chunks.length) await new Promise(r => setTimeout(r, 500));
    }

    res.json({ message: 'Done', processed: successCount, failed: chunks.length - successCount, total: chunks.length, errors: errors.slice(0, 5) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ─── Protected Routes (JWT required) ──────────────────────────
app.use('/api/agent', authMiddleware, auditMiddleware, agentRouter);
app.use('/api/documents', authMiddleware, documentsRouter);
app.use('/api/media', authMiddleware, mediaRouter);
app.use('/api/search', authMiddleware, searchRouter);
app.use('/api/ingest', authMiddleware, ingestRouter);
app.use('/api/auth/users', authMiddleware, usersRouter);
app.use('/api/learning', authMiddleware, learningRouter);

// ─── Query Logs / Knowledge Gap Report (admin only) ──────────
app.get('/api/query-logs', authMiddleware, async (req, res) => {
  if (!['admin', 'manager'].includes(req.user.role)) return res.status(403).json({ error: 'Admin only' });
  const { source, days = 30, limit = 500 } = req.query;
  const since = new Date(Date.now() - Number(days) * 86400000).toISOString();

  let query = supabase.from('query_logs')
    .select('id, query, answer_source, matched_docs, language, tab_slug, created_at, user_id')
    .gte('created_at', since)
    .order('created_at', { ascending: false })
    .limit(Number(limit));

  if (source) query = query.eq('answer_source', source);

  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json({ logs: data || [], total: (data || []).length });
});

app.get('/api/query-logs/summary', authMiddleware, async (req, res) => {
  if (!['admin', 'manager'].includes(req.user.role)) return res.status(403).json({ error: 'Admin only' });
  const { days = 30 } = req.query;
  const since = new Date(Date.now() - Number(days) * 86400000).toISOString();

  const { data: logs } = await supabase.from('query_logs')
    .select('query, answer_source, tab_slug, created_at')
    .gte('created_at', since)
    .order('created_at', { ascending: false })
    .limit(2000);

  const allLogs = logs || [];
  const total = allLogs.length;
  const vector = allLogs.filter(l => l.answer_source === 'vector').length;
  const rag = allLogs.filter(l => l.answer_source === 'rag').length;
  const llm = allLogs.filter(l => l.answer_source === 'llm').length;

  // Knowledge gaps: queries that hit LLM (no docs found)
  const gaps = allLogs
    .filter(l => l.answer_source === 'llm')
    .map(l => ({ query: l.query, tab: l.tab_slug, date: l.created_at }));

  res.json({
    period: `${days} days`,
    total,
    breakdown: { vector, rag, llm },
    coveragePercent: total > 0 ? Math.round(((vector + rag) / total) * 100) : 100,
    knowledgeGaps: gaps,
  });
});

app.get('/api/query-logs/export', authMiddleware, async (req, res) => {
  if (!['admin', 'manager'].includes(req.user.role)) return res.status(403).json({ error: 'Admin only' });
  const { days = 30 } = req.query;
  const since = new Date(Date.now() - Number(days) * 86400000).toISOString();

  const { data: logs } = await supabase.from('query_logs')
    .select('query, answer_source, matched_docs, language, tab_slug, created_at')
    .gte('created_at', since)
    .order('created_at', { ascending: false })
    .limit(5000);

  // CSV export
  const header = 'Date,Query,Source,Matched Documents,Language,Tab\n';
  const rows = (logs || []).map(l => {
    const date = new Date(l.created_at).toISOString().slice(0, 19);
    const query = `"${(l.query || '').replace(/"/g, '""')}"`;
    const docs = `"${(l.matched_docs || []).join('; ')}"`;
    return `${date},${query},${l.answer_source},${docs},${l.language},${l.tab_slug || 'all'}`;
  }).join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename=query_logs_${days}d.csv`);
  res.send(header + rows);
});

// ─── 404 Handler ──────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// ─── Global Error Handler ──────────────────────────────────────
app.use((err, req, res, next) => {
  logger.error('Unhandled error', { error: err.message, stack: err.stack });
  
  if (err.message.includes('not allowed by CORS')) {
    return res.status(403).json({ error: 'CORS policy violation' });
  }

  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
  });
});

// ─── Start Server ──────────────────────────────────────────────
app.listen(PORT, () => {
  logger.info(`Body Shop Wiz API running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV}`);
});

export default app;
