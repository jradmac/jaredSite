import { Router } from 'express';
import { z } from 'zod';
import type Stripe from 'stripe';
import { prisma } from '../db.js';
import { stripe } from '../stripe.js';
import { sendLeadEvent } from '../meta.js';

export const publicRouter = Router();

// ── Lead capture (public marketing form) ────────────────────────
const leadSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().min(3).max(50),
  businessType: z.string().trim().min(1).max(120),
  companyName: z.string().trim().max(200).optional().nullable(),
  companySize: z.string().trim().max(50).optional().nullable(),
  budget: z.string().trim().max(50).optional().nullable(),
  message: z.string().trim().max(5000).optional().nullable(),
  source: z.string().trim().max(120).optional().nullable(),
  // Meta CAPI fields (not stored) — for accurate, deduplicated ad tracking.
  eventId: z.string().trim().max(100).optional().nullable(),
  fbp: z.string().trim().max(255).optional().nullable(),
  fbc: z.string().trim().max(512).optional().nullable(),
  eventSourceUrl: z.string().trim().max(1000).optional().nullable(),
  // Honeypot: real users never fill this hidden field.
  website: z.string().max(0).optional().or(z.literal('')),
});

publicRouter.post('/leads', async (req, res) => {
  // Silently accept (but discard) anything that trips the honeypot.
  if (typeof req.body?.website === 'string' && req.body.website.trim() !== '') {
    return res.status(201).json({ ok: true });
  }

  const parsed = leadSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'invalid_body', details: parsed.error.flatten() });
  }

  const { website: _ignored, ...data } = parsed.data;
  await prisma.lead.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      businessType: data.businessType,
      companyName: data.companyName || null,
      companySize: data.companySize || null,
      budget: data.budget || null,
      message: data.message || null,
      source: data.source || null,
    },
  });

  // Fire the server-side Meta Lead event (best-effort, never blocks the response).
  const ip =
    (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    undefined;
  void sendLeadEvent({
    email: data.email,
    phone: data.phone,
    name: data.name,
    eventId: data.eventId,
    eventSourceUrl: data.eventSourceUrl,
    fbp: data.fbp,
    fbc: data.fbc,
    ip,
    userAgent: req.headers['user-agent'],
  });

  res.status(201).json({ ok: true });
});

// Public view of a contract (only safe fields)
publicRouter.get('/contract/:id', async (req, res) => {
  const c = await prisma.contract.findUnique({ where: { id: req.params.id } });
  if (!c) return res.status(404).json({ error: 'not_found' });

  res.json({
    id: c.id,
    name: c.name,
    description: c.description,
    terms: c.terms,
    clientName: c.clientName,
    clientEmail: c.clientEmail,
    clientCompany: c.clientCompany,
    hasOneTime: c.hasOneTime,
    hasMonthly: c.hasMonthly,
    oneTimeFee: c.oneTimeFee,
    monthlyFee: c.monthlyFee,
    currency: c.currency,
    status: c.status,
    agreedAt: c.agreedAt,
  });
});

const signSchema = z.object({
  agree: z.literal(true),
  signerName: z.string().min(1),
});

// Client signs and proceeds to Stripe Checkout
publicRouter.post('/contract/:id/sign', async (req, res) => {
  const parsed = signSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'must_agree' });

  const contract = await prisma.contract.findUnique({ where: { id: req.params.id } });
  if (!contract) return res.status(404).json({ error: 'not_found' });
  if (contract.status === 'active' || contract.status === 'signed') {
    return res.status(400).json({ error: 'already_signed' });
  }
  if (!contract.hasOneTime && !contract.hasMonthly) {
    return res.status(400).json({ error: 'contract_has_no_fees' });
  }

  const ip =
    (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    'unknown';

  // 1. Create or reuse Stripe customer
  let customerId = contract.stripeCustomerId;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: contract.clientEmail,
      name: parsed.data.signerName,
      metadata: { contractId: contract.id, contractName: contract.name },
    });
    customerId = customer.id;
  }

  // 2. Build line items for Checkout
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  if (contract.hasMonthly && contract.monthlyFee && contract.monthlyFee > 0) {
    lineItems.push({
      quantity: 1,
      price_data: {
        currency: contract.currency,
        unit_amount: contract.monthlyFee,
        recurring: { interval: 'month' },
        product_data: { name: `${contract.name} — Monthly` },
      },
    });
  }

  if (contract.hasOneTime && contract.oneTimeFee && contract.oneTimeFee > 0) {
    lineItems.push({
      quantity: 1,
      price_data: {
        currency: contract.currency,
        unit_amount: contract.oneTimeFee,
        product_data: { name: `${contract.name} — Setup Fee` },
      },
    });
  }

  const origin = process.env.PUBLIC_WEB_ORIGIN ?? 'http://localhost:5173';
  const mode: Stripe.Checkout.SessionCreateParams.Mode = contract.hasMonthly ? 'subscription' : 'payment';

  const session = await stripe.checkout.sessions.create({
    mode,
    customer: customerId,
    line_items: lineItems,
    success_url: `${origin}/contract/${contract.id}/success`,
    cancel_url: `${origin}/contract/${contract.id}`,
    metadata: { contractId: contract.id },
    subscription_data: contract.hasMonthly
      ? { metadata: { contractId: contract.id } }
      : undefined,
  });

  await prisma.contract.update({
    where: { id: contract.id },
    data: {
      stripeCustomerId: customerId,
      stripeCheckoutSessionId: session.id,
      stripeCheckoutUrl: session.url ?? undefined,
      agreedAt: new Date(),
      agreedIp: ip,
      status: 'signed',
    },
  });

  res.json({ checkoutUrl: session.url });
});
