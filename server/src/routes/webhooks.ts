import { Router, raw } from 'express';
import type Stripe from 'stripe';
import { prisma } from '../db.js';
import { stripe } from '../stripe.js';

export const webhooksRouter = Router();

// IMPORTANT: this route uses the raw body — mounted with raw() before json() middleware.
webhooksRouter.post('/stripe', raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !secret) return res.status(400).send('missing signature or secret');

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, secret);
  } catch (err) {
    console.error('[webhook] signature verification failed', err);
    return res.status(400).send(`webhook_error`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const contractId = session.metadata?.contractId;
        if (!contractId) break;

        await prisma.contract.update({
          where: { id: contractId },
          data: {
            stripeSubscriptionId: (session.subscription as string | null) ?? undefined,
            stripeCustomerId: (session.customer as string | null) ?? undefined,
            status: 'active',
          },
        });
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const subId = typeof invoice.subscription === 'string' ? invoice.subscription : invoice.subscription?.id;
        if (!subId) break;
        await prisma.contract.updateMany({
          where: { stripeSubscriptionId: subId },
          data: { status: 'past_due' },
        });
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        const subId = typeof invoice.subscription === 'string' ? invoice.subscription : invoice.subscription?.id;
        if (!subId) break;
        await prisma.contract.updateMany({
          where: { stripeSubscriptionId: subId },
          data: { status: 'active' },
        });
        break;
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        await prisma.contract.updateMany({
          where: { stripeSubscriptionId: sub.id },
          data: { status: 'canceled' },
        });
        break;
      }

      default:
        // Ignore other events
        break;
    }
    res.json({ received: true });
  } catch (err) {
    console.error('[webhook] handler error', err);
    res.status(500).send('handler_error');
  }
});
