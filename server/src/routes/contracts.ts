import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../db.js';
import { requireAdmin } from '../auth.js';
import { stripe } from '../stripe.js';

export const contractsRouter = Router();
contractsRouter.use(requireAdmin);

const upsertSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional().default(''),
  terms: z.string().optional().default(''),
  clientName: z.string().min(1),
  clientEmail: z.string().email(),
  clientCompany: z.string().optional().nullable(),
  clientPhone: z.string().optional().nullable(),
  hasOneTime: z.boolean().default(false),
  hasMonthly: z.boolean().default(false),
  oneTimeFee: z.number().int().nonnegative().optional().nullable(), // cents
  monthlyFee: z.number().int().nonnegative().optional().nullable(), // cents
  currency: z.string().length(3).default('usd'),
});

contractsRouter.get('/', async (_req, res) => {
  const rows = await prisma.contract.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(rows);
});

contractsRouter.get('/:id', async (req, res) => {
  const c = await prisma.contract.findUnique({ where: { id: req.params.id } });
  if (!c) return res.status(404).json({ error: 'not_found' });
  res.json(c);
});

contractsRouter.post('/', async (req, res) => {
  const parsed = upsertSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'invalid_body', details: parsed.error.flatten() });

  if (!parsed.data.hasOneTime && !parsed.data.hasMonthly) {
    return res.status(400).json({ error: 'need_at_least_one_fee' });
  }

  const contract = await prisma.contract.create({ data: parsed.data });
  res.status(201).json(contract);
});

contractsRouter.patch('/:id', async (req, res) => {
  const parsed = upsertSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'invalid_body' });

  const contract = await prisma.contract.update({
    where: { id: req.params.id },
    data: parsed.data,
  });
  res.json(contract);
});

contractsRouter.delete('/:id', async (req, res) => {
  const contract = await prisma.contract.findUnique({ where: { id: req.params.id } });
  if (!contract) return res.status(404).json({ error: 'not_found' });

  // Best-effort: cancel Stripe subscription if active
  if (contract.stripeSubscriptionId) {
    try {
      await stripe.subscriptions.cancel(contract.stripeSubscriptionId);
    } catch (err) {
      console.warn('[contracts.delete] stripe cancel failed', err);
    }
  }

  await prisma.contract.delete({ where: { id: req.params.id } });
  res.json({ ok: true });
});
