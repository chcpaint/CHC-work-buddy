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
import { videoScriptsRouter } from './routes/video-scripts.js';
import { ttsRouter } from './routes/tts.js';
import { authMiddleware, requireRole } from './middleware/auth.js';
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

// TTS limiter — moderate (cached hits are free, but generation costs money)
const ttsLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 40,  // 40 TTS requests/min per IP
  message: { error: 'TTS rate limit reached. Please wait a moment.' },
  validate: { trustProxy: false, xForwardedForHeader: false },
});

app.use('/api', apiLimiter);
app.use('/api/agent', agentLimiter);
app.use('/api/ingest', uploadLimiter);
app.use('/api/tts', ttsLimiter);

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
    tts_ready: !!openai,
  });
});

// ─── Public Routes ─────────────────────────────────────────────
app.use('/api/auth', authRouter);

// ─── Diagnostic: test AI + DB functions ──────────────────────
app.get('/api/maintenance/test-agent', authMiddleware, requireRole(['admin']), async (req, res) => {
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
          model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5',
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
app.get('/api/maintenance/db-check', authMiddleware, requireRole(['admin']), async (req, res) => {
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
app.all('/api/maintenance/generate-embeddings', authMiddleware, requireRole(['admin']), async (req, res) => {
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
app.use('/api/video-scripts', authMiddleware, videoScriptsRouter);
app.use('/api/tts', authMiddleware, ttsRouter);

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

// ─── Full-report aggregate (drives the admin Reports page) ────
app.get('/api/reports/full', authMiddleware, async (req, res) => {
  if (!['admin', 'manager'].includes(req.user.role)) return res.status(403).json({ error: 'Admin only' });
  const days = Number(req.query.days || 30);
  const sinceIso = new Date(Date.now() - days * 86400000).toISOString();

  try {
    // Pull every logged query in the window once, then aggregate in memory.
    const { data: logs, error: logsErr } = await supabase
      .from('query_logs')
      .select('query, answer_source, language, tab_slug, matched_docs, created_at')
      .gte('created_at', sinceIso)
      .order('created_at', { ascending: false })
      .limit(10000);
    if (logsErr) throw logsErr;
    const rows = logs || [];

    // Coverage breakdown
    const bySource = { vector: 0, rag: 0, llm: 0, cache: 0 };
    rows.forEach(r => { bySource[r.answer_source] = (bySource[r.answer_source] || 0) + 1; });
    const total = rows.length;
    const grounded = bySource.vector + bySource.rag + (bySource.cache || 0);
    const coveragePercent = total > 0 ? Math.round((grounded / total) * 1000) / 10 : 100;

    // Top questions
    const topMap = new Map();
    rows.forEach(r => {
      const q = (r.query || '').trim().toLowerCase();
      if (!q) return;
      const entry = topMap.get(q) || { question: q, count: 0, sources: new Set(), lastAsked: r.created_at };
      entry.count += 1;
      entry.sources.add(r.answer_source);
      if (r.created_at > entry.lastAsked) entry.lastAsked = r.created_at;
      topMap.set(q, entry);
    });
    const topQuestions = Array.from(topMap.values())
      .sort((a, b) => b.count - a.count || new Date(b.lastAsked) - new Date(a.lastAsked))
      .slice(0, 25)
      .map(e => ({ question: e.question, count: e.count, sources: Array.from(e.sources), lastAsked: e.lastAsked }));

    // Knowledge gaps (llm-source only)
    const gapMap = new Map();
    rows.filter(r => r.answer_source === 'llm').forEach(r => {
      const key = (r.query || '').trim().toLowerCase() + '|' + (r.tab_slug || '');
      const entry = gapMap.get(key) || {
        question: (r.query || '').trim(), count: 0, tabSlug: r.tab_slug, lastAsked: r.created_at,
      };
      entry.count += 1;
      if (r.created_at > entry.lastAsked) entry.lastAsked = r.created_at;
      gapMap.set(key, entry);
    });
    const knowledgeGaps = Array.from(gapMap.values())
      .sort((a, b) => b.count - a.count || new Date(b.lastAsked) - new Date(a.lastAsked))
      .slice(0, 30);

    // By tab
    const tabMap = new Map();
    rows.forEach(r => {
      const tab = r.tab_slug || '(none)';
      const e = tabMap.get(tab) || { tab, questions: 0, fromDocs: 0, fromLlm: 0 };
      e.questions += 1;
      if (['vector','rag','cache'].includes(r.answer_source)) e.fromDocs += 1;
      if (r.answer_source === 'llm') e.fromLlm += 1;
      tabMap.set(tab, e);
    });
    const byTab = Array.from(tabMap.values()).sort((a, b) => b.questions - a.questions);

    // Daily activity (last 30 days regardless of `days` param)
    const dailyMap = new Map();
    const recent = rows.filter(r => new Date(r.created_at) > new Date(Date.now() - 30 * 86400000));
    recent.forEach(r => {
      const d = r.created_at.slice(0, 10);
      dailyMap.set(d, (dailyMap.get(d) || 0) + 1);
    });
    const daily = Array.from(dailyMap.entries())
      .map(([day, count]) => ({ day, count }))
      .sort((a, b) => a.day.localeCompare(b.day));

    // Languages
    const langMap = new Map();
    rows.forEach(r => {
      const l = r.language || '?';
      langMap.set(l, (langMap.get(l) || 0) + 1);
    });
    const languages = Array.from(langMap.entries())
      .map(([lang, count]) => ({ lang, count }))
      .sort((a, b) => b.count - a.count);

    // Cache stats
    const cacheStats = await getCacheStats(days).catch(() => null);

    res.json({
      period: { days, from: sinceIso.slice(0,10), to: new Date().toISOString().slice(0,10) },
      total, bySource, coveragePercent,
      topQuestions, knowledgeGaps, byTab, daily, languages,
      cacheStats,
    });
  } catch (err) {
    logger.error('Full report error', { error: err.message });
    res.status(500).json({ error: err.message });
  }
});

// ─── Monthly snapshot CSV — packaged for sharing/emailing ────
app.get('/api/reports/monthly-csv', authMiddleware, async (req, res) => {
  if (!['admin', 'manager'].includes(req.user.role)) return res.status(403).json({ error: 'Admin only' });
  const days = Number(req.query.days || 30);

  // Hand-rolled to avoid a CSV dep — fetches the same data the JSON endpoint produces.
  try {
    const internalRes = await fetch(
      `http://localhost:${process.env.PORT || 3001}/api/reports/full?days=${days}`,
      { headers: { Authorization: req.headers.authorization } }
    );
    const d = await internalRes.json();

    const esc = v => '"' + String(v ?? '').replace(/"/g, '""') + '"';
    const lines = [];
    lines.push(`# Body Shop Wiz — Monthly Snapshot — ${d.period?.from} to ${d.period?.to}`);
    lines.push(`# Generated ${new Date().toISOString()}`);
    lines.push('');
    lines.push('## Overall Coverage');
    lines.push('Metric,Value');
    lines.push(`Total questions,${d.total}`);
    lines.push(`Vector search,${d.bySource?.vector || 0}`);
    lines.push(`Keyword/RAG,${d.bySource?.rag || 0}`);
    lines.push(`Cache,${d.bySource?.cache || 0}`);
    lines.push(`LLM fallback,${d.bySource?.llm || 0}`);
    lines.push(`Coverage %,${d.coveragePercent}`);
    lines.push('');
    lines.push('## Top Questions');
    lines.push('Question,Times asked,Sources,Last asked');
    (d.topQuestions || []).forEach(q => lines.push([esc(q.question), q.count, esc((q.sources||[]).join('|')), q.lastAsked?.slice(0,10)].join(',')));
    lines.push('');
    lines.push('## Knowledge Gaps');
    lines.push('Question,Times asked,Tab,Last asked');
    (d.knowledgeGaps || []).forEach(g => lines.push([esc(g.question), g.count, esc(g.tabSlug), g.lastAsked?.slice(0,10)].join(',')));
    lines.push('');
    lines.push('## Activity by Tab');
    lines.push('Tab,Questions,From docs,From general AI');
    (d.byTab || []).forEach(t => lines.push([esc(t.tab), t.questions, t.fromDocs, t.fromLlm].join(',')));
    lines.push('');
    lines.push('## Daily Activity (last 30 days)');
    lines.push('Day,Questions');
    (d.daily || []).forEach(x => lines.push(`${x.day},${x.count}`));
    lines.push('');
    lines.push('## Languages');
    lines.push('Language,Questions');
    (d.languages || []).forEach(x => lines.push(`${esc(x.lang)},${x.count}`));
    lines.push('');
    lines.push('## Cache');
    if (d.cacheStats) {
      lines.push(`Cache enabled,${d.cacheStats.enabled}`);
      lines.push(`Cached questions,${d.cacheStats.cached_questions || 0}`);
      lines.push(`Total cache hits,${d.cacheStats.total_hits || 0}`);
      lines.push(`Hits last ${days} days,${d.cacheStats.hits_last_30d || 0}`);
    }

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=bodyshopwiz-snapshot-${d.period?.to || 'today'}.csv`);
    res.send(lines.join('\n'));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Scheduled email delivery (called by Supabase pg_cron) ───
// Auth model: shared secret. The Supabase pg_cron job sends a Bearer
// header with REPORT_CRON_SECRET (configured in Railway). No user JWT.
//
// Env vars on backend:
//   RESEND_API_KEY        Resend API key (re_...)
//   REPORT_EMAIL_FROM     'Body Shop Wiz <onboarding@resend.dev>' default
//   REPORT_EMAIL_TO       recipient address
//   REPORT_CRON_SECRET    shared secret pg_cron sends in Authorization header
//
// Sends:
//   - HTML email body with headline number + top questions + gaps preview
//   - Multi-section CSV attachment with full report data

app.post('/api/reports/send-monthly', async (req, res) => {
  // Shared-secret auth — accept either header form
  const provided = (req.headers.authorization || '').replace(/^Bearer\s+/i, '')
                || req.headers['x-cron-secret']
                || req.query.secret;
  const expected = process.env.REPORT_CRON_SECRET;
  if (!expected || provided !== expected) {
    logger.warn('send-monthly: unauthorized', { ip: req.ip });
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const FROM = process.env.REPORT_EMAIL_FROM || 'Body Shop Wiz <onboarding@resend.dev>';
  const TO   = (req.body?.to) || process.env.REPORT_EMAIL_TO;

  if (!RESEND_API_KEY || !TO) {
    return res.status(500).json({ error: 'Email not configured (set RESEND_API_KEY and REPORT_EMAIL_TO)' });
  }

  const days = Number(req.body?.days || req.query?.days || 30);
  const sinceIso = new Date(Date.now() - days * 86400000).toISOString();

  try {
    // ─── Pull report data (same logic as /api/reports/full) ────
    const { data: logs } = await supabase
      .from('query_logs')
      .select('query, answer_source, language, tab_slug, created_at')
      .gte('created_at', sinceIso)
      .order('created_at', { ascending: false })
      .limit(10000);
    const rows = logs || [];

    const bySource = { vector: 0, rag: 0, llm: 0, cache: 0 };
    rows.forEach(r => { bySource[r.answer_source] = (bySource[r.answer_source] || 0) + 1; });
    const total = rows.length;
    const grounded = bySource.vector + bySource.rag + (bySource.cache || 0);
    const coveragePercent = total > 0 ? Math.round((grounded / total) * 1000) / 10 : 100;

    // Top questions
    const topMap = new Map();
    rows.forEach(r => {
      const q = (r.query || '').trim().toLowerCase();
      if (!q) return;
      const e = topMap.get(q) || { question: q, count: 0 };
      e.count += 1;
      topMap.set(q, e);
    });
    const topQuestions = Array.from(topMap.values()).sort((a, b) => b.count - a.count).slice(0, 10);

    // Gaps
    const gapMap = new Map();
    rows.filter(r => r.answer_source === 'llm').forEach(r => {
      const k = (r.query || '').trim().toLowerCase();
      const e = gapMap.get(k) || { question: r.query, count: 0, tabSlug: r.tab_slug };
      e.count += 1;
      gapMap.set(k, e);
    });
    const gaps = Array.from(gapMap.values()).sort((a, b) => b.count - a.count).slice(0, 10);

    // By tab
    const tabMap = new Map();
    rows.forEach(r => {
      const t = r.tab_slug || '(none)';
      tabMap.set(t, (tabMap.get(t) || 0) + 1);
    });
    const byTab = Array.from(tabMap.entries()).map(([tab, count]) => ({ tab, count })).sort((a, b) => b.count - a.count);

    // ─── Compose HTML body ──────────────────────────────────────
    const periodFrom = sinceIso.slice(0, 10);
    const periodTo   = new Date().toISOString().slice(0, 10);
    const monthLabel = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const html = `<!DOCTYPE html>
<html><body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 24px; color: #1e293b; background: #f8fafc;">

<div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
  <div style="background: #E01030; color: white; padding: 24px 28px;">
    <div style="font-size: 11px; letter-spacing: 2px; text-transform: uppercase; opacity: 0.9;">Body Shop Wiz</div>
    <h1 style="margin: 4px 0 0; font-size: 24px; font-weight: 800;">Monthly Report · ${monthLabel}</h1>
    <div style="font-size: 13px; margin-top: 6px; opacity: 0.9;">${periodFrom} → ${periodTo}</div>
  </div>

  <div style="padding: 28px;">

    <div style="background: #fff5f7; border-left: 4px solid #E01030; padding: 16px 20px; border-radius: 4px; margin-bottom: 24px;">
      <div style="font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: #E01030; font-weight: 700;">Headline</div>
      <div style="font-size: 18px; margin-top: 4px; line-height: 1.5;">
        <strong>${total}</strong> questions answered &middot; <strong>${coveragePercent}%</strong> grounded in your document library
      </div>
    </div>

    <h2 style="font-size: 14px; letter-spacing: 1px; text-transform: uppercase; color: #64748b; margin: 24px 0 12px;">Source Breakdown</h2>
    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
      <tr><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">✅ Verified (vector search)</td><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 600;">${bySource.vector || 0}</td></tr>
      <tr><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">🔍 Database (keyword)</td><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 600;">${bySource.rag || 0}</td></tr>
      <tr><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">⚡ Answered from cache</td><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 600; color: #a855f7;">${bySource.cache || 0}</td></tr>
      <tr><td style="padding: 8px 0;">⚠️ General AI (no doc found)</td><td style="padding: 8px 0; text-align: right; font-weight: 600; color: #f97316;">${bySource.llm || 0}</td></tr>
    </table>

    ${topQuestions.length > 0 ? `
    <h2 style="font-size: 14px; letter-spacing: 1px; text-transform: uppercase; color: #64748b; margin: 28px 0 12px;">Top Questions This Period</h2>
    <ol style="padding-left: 20px; margin: 0; font-size: 14px; line-height: 1.7;">
      ${topQuestions.map(q => `<li style="margin-bottom: 4px;"><strong style="color: #E01030;">×${q.count}</strong> &nbsp; ${q.question.replace(/</g, '&lt;')}</li>`).join('')}
    </ol>
    ` : ''}

    ${gaps.length > 0 ? `
    <h2 style="font-size: 14px; letter-spacing: 1px; text-transform: uppercase; color: #f97316; margin: 28px 0 12px;">Knowledge Gaps — Upload Docs To Close These</h2>
    <ul style="padding-left: 20px; margin: 0; font-size: 14px; line-height: 1.7;">
      ${gaps.map(g => `<li style="margin-bottom: 4px;"><strong style="color: #f97316;">×${g.count}</strong> &nbsp; ${(g.question || '').replace(/</g, '&lt;')} <span style="color: #94a3b8; font-size: 12px;">(${g.tabSlug || 'no tab'})</span></li>`).join('')}
    </ul>
    ` : '<p style="color: #22c55e; margin: 28px 0 0;">✓ No knowledge gaps this period — your document library covered every question.</p>'}

    ${byTab.length > 0 ? `
    <h2 style="font-size: 14px; letter-spacing: 1px; text-transform: uppercase; color: #64748b; margin: 28px 0 12px;">Activity by Tab</h2>
    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
      ${byTab.map(t => `<tr><td style="padding: 6px 0;">${t.tab}</td><td style="padding: 6px 0; text-align: right; font-weight: 600;">${t.count}</td></tr>`).join('')}
    </table>
    ` : ''}

    <div style="margin-top: 32px; padding: 16px; background: #f8fafc; border-radius: 8px; font-size: 13px; color: #64748b;">
      📎 The full CSV is attached. Open in Excel or Numbers to see all questions, dates, and per-tab breakdowns.<br><br>
      Want to dig in interactively? Open the admin Reports page at <a href="https://chc-work-buddy-frontend-production.up.railway.app/admin" style="color: #E01030;">Body Shop Wiz Admin</a>.
    </div>

  </div>
</div>

<div style="text-align: center; font-size: 11px; color: #94a3b8; margin-top: 16px;">
  Body Shop Wiz · CHC Paint and Auto Body Supplies · Automated monthly digest
</div>

</body></html>`;

    // ─── Build CSV attachment (same shape as /monthly-csv) ──────
    const esc = v => '"' + String(v ?? '').replace(/"/g, '""') + '"';
    const lines = [
      `# Body Shop Wiz — Monthly Snapshot — ${periodFrom} to ${periodTo}`,
      '## Overall Coverage',
      'Metric,Value',
      `Total questions,${total}`,
      `Vector search,${bySource.vector || 0}`,
      `Keyword/RAG,${bySource.rag || 0}`,
      `Cache,${bySource.cache || 0}`,
      `LLM fallback,${bySource.llm || 0}`,
      `Coverage %,${coveragePercent}`,
      '',
      '## Top Questions',
      'Question,Times asked',
      ...topQuestions.map(q => `${esc(q.question)},${q.count}`),
      '',
      '## Knowledge Gaps',
      'Question,Times asked,Tab',
      ...gaps.map(g => `${esc(g.question)},${g.count},${esc(g.tabSlug)}`),
      '',
      '## Activity by Tab',
      'Tab,Questions',
      ...byTab.map(t => `${esc(t.tab)},${t.count}`),
    ];
    const csv = lines.join('\n');
    const csvB64 = Buffer.from(csv, 'utf-8').toString('base64');

    // ─── Send via Resend API ──────────────────────────────────
    const subject = `Body Shop Wiz — Monthly Report — ${monthLabel}`;
    const resendBody = {
      from: FROM,
      to: Array.isArray(TO) ? TO : [TO],
      subject,
      html,
      attachments: [{
        filename: `bodyshopwiz-${periodTo}.csv`,
        content: csvB64,
      }],
    };

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resendBody),
    });

    if (!resendRes.ok) {
      const errBody = await resendRes.text();
      logger.error('Resend send failed', { status: resendRes.status, body: errBody });
      return res.status(502).json({ error: 'Email send failed', detail: errBody });
    }

    const sendResult = await resendRes.json();
    logger.info('Monthly report email sent', { id: sendResult.id, to: TO, total, days });
    res.json({
      success: true,
      email_id: sendResult.id,
      sent_to: TO,
      period: { from: periodFrom, to: periodTo, days },
      stats: { total, coveragePercent },
    });

  } catch (err) {
    logger.error('send-monthly error', { error: err.message, stack: err.stack });
    res.status(500).json({ error: err.message });
  }
});

// ─── Q&A Cache Admin (admin/manager only) ────────────────────
import { getCacheStats, getTopCached, clearCache } from './services/qa_cache.js';

app.get('/api/cache/stats', authMiddleware, async (req, res) => {
  if (!['admin', 'manager'].includes(req.user.role)) return res.status(403).json({ error: 'Admin only' });
  const days = Number(req.query.days || 30);
  res.json(await getCacheStats(days));
});

app.get('/api/cache/top', authMiddleware, async (req, res) => {
  if (!['admin', 'manager'].includes(req.user.role)) return res.status(403).json({ error: 'Admin only' });
  try {
    const rows = await getTopCached(req.query.limit || 25);
    res.json({ entries: rows, total: rows.length });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/cache/clear', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
  try {
    const { tabSlug, olderThanDays, query } = req.body || {};
    const result = await clearCache({ tabSlug, olderThanDays, query });
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// ─── Existing query-logs export ──────────────────────────────
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
