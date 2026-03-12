// Body Shop Wiz — Text-to-Speech Route
// OpenAI TTS with Supabase audio caching

import { Router } from 'express';
import crypto from 'crypto';
import { supabase, openai } from '../index.js';
import { logger } from '../utils/logger.js';

export const ttsRouter = Router();

// Ensure tts-cache bucket exists on first load
let bucketChecked = false;
async function ensureBucket() {
  if (bucketChecked) return;
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const exists = buckets?.some(b => b.name === 'tts-cache');
    if (!exists) {
      const { error } = await supabase.storage.createBucket('tts-cache', {
        public: false,
        fileSizeLimit: 5 * 1024 * 1024, // 5MB max per audio file
      });
      if (error && !error.message?.includes('already exists')) {
        logger.warn('Could not create tts-cache bucket', { error: error.message });
      } else {
        logger.info('Created tts-cache storage bucket');
      }
    }
    bucketChecked = true;
  } catch (err) {
    logger.warn('Bucket check failed', { error: err.message });
  }
}
ensureBucket();

// TTS config
const TTS_MODEL = 'gpt-4o-mini-tts';
const TTS_VOICE = 'ash';          // Deep, clear male voice — fits "Max"
const TTS_RESPONSE_FORMAT = 'mp3';
const MAX_TTS_CHARS = 3000;        // Hard cap to control cost
const CACHE_BUCKET = 'tts-cache';  // Supabase Storage bucket name

// Generate a deterministic cache key from text + voice config
function cacheKey(text, voice, lang) {
  const hash = crypto.createHash('sha256')
    .update(`${voice}:${lang}:${text}`)
    .digest('hex')
    .slice(0, 24);
  return `${lang}/${hash}.mp3`;
}

// POST /api/tts
// Body: { text: string, language?: "en"|"fr"|"es" }
// Returns: audio/mpeg binary stream
ttsRouter.post('/', async (req, res) => {
  try {
    const { text, language = 'en' } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'text is required' });
    }

    if (!openai) {
      return res.status(503).json({ error: 'TTS service unavailable — OpenAI not configured' });
    }

    // Truncate to cap cost
    const cleanText = text.slice(0, MAX_TTS_CHARS).trim();
    if (!cleanText) {
      return res.status(400).json({ error: 'text is empty after cleaning' });
    }

    const key = cacheKey(cleanText, TTS_VOICE, language);

    // ── 1. Check Supabase Storage cache ──
    try {
      const { data: cached, error: dlErr } = await supabase.storage
        .from(CACHE_BUCKET)
        .download(key);

      if (!dlErr && cached) {
        logger.info('TTS cache HIT', { key, chars: cleanText.length });
        const buffer = Buffer.from(await cached.arrayBuffer());
        res.set({
          'Content-Type': 'audio/mpeg',
          'Content-Length': buffer.length,
          'X-TTS-Cache': 'HIT',
          'Cache-Control': 'public, max-age=86400',
        });
        return res.send(buffer);
      }
    } catch (cacheErr) {
      // Cache miss or bucket doesn't exist yet — proceed to generate
      logger.info('TTS cache miss or unavailable', { key });
    }

    // ── 2. Generate via OpenAI TTS ──
    logger.info('TTS generating', { chars: cleanText.length, voice: TTS_VOICE, lang: language });

    const ttsResponse = await openai.audio.speech.create({
      model: TTS_MODEL,
      voice: TTS_VOICE,
      input: cleanText,
      response_format: TTS_RESPONSE_FORMAT,
      speed: 0.95,  // Slightly slower for shop clarity
    });

    const audioBuffer = Buffer.from(await ttsResponse.arrayBuffer());

    // ── 3. Cache to Supabase Storage (fire-and-forget) ──
    supabase.storage
      .from(CACHE_BUCKET)
      .upload(key, audioBuffer, {
        contentType: 'audio/mpeg',
        upsert: true,
      })
      .then(({ error: upErr }) => {
        if (upErr) {
          logger.warn('TTS cache write failed', { key, error: upErr.message });
        } else {
          logger.info('TTS cached', { key, bytes: audioBuffer.length });
        }
      })
      .catch(err => {
        logger.warn('TTS cache write error', { key, error: err.message });
      });

    // ── 4. Return audio to client ──
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': audioBuffer.length,
      'X-TTS-Cache': 'MISS',
      'Cache-Control': 'public, max-age=86400',
    });
    return res.send(audioBuffer);

  } catch (err) {
    logger.error('TTS error', { error: err.message, stack: err.stack });

    if (err?.status === 429) {
      return res.status(429).json({ error: 'TTS rate limit exceeded. Try again shortly.' });
    }

    return res.status(500).json({ error: 'TTS generation failed' });
  }
});

// GET /api/tts/stats  — admin endpoint to check cache usage
ttsRouter.get('/stats', async (req, res) => {
  try {
    const langs = ['en', 'fr', 'es'];
    const stats = {};

    for (const lang of langs) {
      const { data, error } = await supabase.storage
        .from(CACHE_BUCKET)
        .list(lang, { limit: 1000 });

      stats[lang] = {
        cached_files: data?.length || 0,
        error: error?.message || null,
      };
    }

    res.json({ bucket: CACHE_BUCKET, stats });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
