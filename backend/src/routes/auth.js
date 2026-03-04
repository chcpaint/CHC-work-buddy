// routes/auth.js — Authentication endpoints using Supabase Auth

import { Router } from 'express';
import { supabase } from '../index.js';
import { logger } from '../utils/logger.js';

export const authRouter = Router();

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
      user: { ...data.user, ...profile },
    });
  } catch (err) {
    logger.error('Login error', { error: err.message });
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// POST /api/auth/register
authRouter.post('/register', async (req, res) => {
  const { email, password, fullName } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    if (error) return res.status(400).json({ error: error.message });

    // If email confirmation is enabled, session will be null.
    // Auto-confirm the user via admin API so they can sign in immediately.
    if (!data.session && data.user) {
      logger.info('Auto-confirming user', { userId: data.user.id, email });

      // Confirm the user's email via admin API
      const { error: confirmError } = await supabase.auth.admin.updateUserById(
        data.user.id,
        { email_confirm: true }
      );

      if (confirmError) {
        logger.error('Auto-confirm failed', { error: confirmError.message });
        // Still return success — user was created, they just need manual confirmation
        return res.json({
          user: data.user,
          message: 'Account created. Please check your email to confirm, then sign in.',
          needsConfirmation: true,
        });
      }

      // Now sign them in to get a session
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email, password,
      });

      if (signInError) {
        logger.error('Post-confirm sign-in failed', { error: signInError.message });
        return res.json({
          user: data.user,
          message: 'Account created and confirmed. Please sign in.',
          needsConfirmation: false,
        });
      }

      return res.json({
        token: signInData.session.access_token,
        user: signInData.user,
        message: 'Registration successful',
      });
    }

    // If session exists (email confirmation disabled), return it directly
    res.json({
      token: data.session?.access_token,
      user: data.user,
      message: 'Registration successful',
    });
  } catch (err) {
    logger.error('Register error', { error: err.message });
    res.status(500).json({ error: 'Registration failed' });
  }
});

// POST /api/auth/logout
authRouter.post('/logout', async (req, res) => {
  const token = req.headers.authorization?.slice(7);
  if (token) {
    await supabase.auth.admin.signOut(token).catch(() => {});
  }
  res.json({ success: true });
});
