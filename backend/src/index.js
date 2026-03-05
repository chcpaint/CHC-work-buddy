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

// ─── Rate Limiting ────────────────────────────────────────────

// General API rate limit
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,       // 1 minute
  max: 100,                   // 100 requests/min per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again shortly.' },
});

// Stricter limit for AI agent (expensive)
const agentLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,                    // 30 AI requests/min per IP
  message: { error: 'AI request limit reached. Please wait a moment.' },
});

// Upload limiter
const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,  // 1 hour
  max: 50,                    // 50 uploads/hour
  message: { error: 'Upload limit reached.' },
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
