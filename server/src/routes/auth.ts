import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '../db.js';
import { clearAuthCookie, requireAdmin, setAuthCookie, signAdminToken, type AuthedRequest } from '../auth.js';

export const authRouter = Router();

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

authRouter.post('/login', async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'invalid_body' });

  const { username, password } = parsed.data;
  const user = await prisma.adminUser.findUnique({ where: { username } });
  if (!user) return res.status(401).json({ error: 'invalid_credentials' });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'invalid_credentials' });

  const token = signAdminToken(user.id);
  setAuthCookie(res, token);
  res.json({ ok: true, username: user.username });
});

authRouter.post('/logout', (_req, res) => {
  clearAuthCookie(res);
  res.json({ ok: true });
});

authRouter.get('/me', requireAdmin, async (req: AuthedRequest, res) => {
  const user = await prisma.adminUser.findUnique({ where: { id: req.adminId! } });
  if (!user) return res.status(401).json({ error: 'unauthorized' });
  res.json({ id: user.id, username: user.username });
});
