// routes/auth.js — Authentication endpoints using Supabase Auth

import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { supabase } from '../index.js';
import { logger } from '../utils/logger.js';

export const authRouter = Router();

// Stricter rate limit on auth endpoints to slow down credential stuffing.
// 10 attempts/min/IP is enough for a normal user mistyping their password,
// but rules out automated brute-force.
const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many authentication attempts. Please wait a minute and try again.' },
  validate: { trustProxy: false, xForwardedForHeader: false },
});

authRouter.use('/login', authLimiter);
authRouter.use('/refresh', authLimiter);

// POST /api/auth/login
authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return res.status(401).json({ error: error.message });

    // Get profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    res.json({
      token: data.session.access_token,
      refreshToken: data.session.refresh_token,
      expiresAt: data.session.expires_at,
      user: { ...data.user, ...profile },
    });
  } catch (err) {
    logger.error('Login error', { error: err.message });
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// POST /api/auth/refresh — Refresh an expired access token
authRouter.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh token required' });
  }

  try {
    const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken });
    if (error || !data.session) {
      return res.status(401).json({ error: 'Refresh token expired. Please sign in again.' });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    res.json({
      token: data.session.access_token,
      refreshToken: data.session.refresh_token,
      expiresAt: data.session.expires_at,
      user: { ...data.user, ...profile },
    });
  } catch (err) {
    logger.error('Refresh error', { error: err.message });
    res.status(500).json({ error: 'Token refresh failed' });
  }
});

// POST /api/auth/register
// DISABLED for CHC intranet rollout: single shared account is provisioned manually.
// To re-enable for multi-user mode, restore from git history (see review doc B2).
authRouter.post('/register', (req, res) => {
  logger.warn('Registration attempt blocked (single-user mode)', {
    ip: req.ip,
    email: req.body?.email || null,
  });
  return res.status(403).json({
    error: 'Self-service registration is disabled. Contact your administrator for access.',
  });
});

// POST /api/auth/logout
authRouter.post('/logout', async (req, res) => {
  const token = req.headers.authorization?.slice(7);
  if (token) {
    await supabase.auth.admin.signOut(token).catch(() => {});
  }
  res.json({ success: true });
});
