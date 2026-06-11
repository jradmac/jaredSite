import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../db.js';
import { requireAdmin } from '../auth.js';

export const leadsRouter = Router();
leadsRouter.use(requireAdmin);

leadsRouter.get('/', async (_req, res) => {
  const rows = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(rows);
});

const statusSchema = z.object({
  status: z.enum(['new', 'contacted', 'qualified', 'won', 'lost']),
});

leadsRouter.patch('/:id', async (req, res) => {
  const parsed = statusSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'invalid_body' });

  const lead = await prisma.lead.update({
    where: { id: req.params.id },
    data: { status: parsed.data.status },
  });
  res.json(lead);
});

leadsRouter.delete('/:id', async (req, res) => {
  const lead = await prisma.lead.findUnique({ where: { id: req.params.id } });
  if (!lead) return res.status(404).json({ error: 'not_found' });
  await prisma.lead.delete({ where: { id: req.params.id } });
  res.json({ ok: true });
});
