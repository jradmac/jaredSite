import Stripe from 'stripe';

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.warn('[stripe] STRIPE_SECRET_KEY is not set — Stripe endpoints will fail until it is.');
}

export const stripe = new Stripe(key ?? 'sk_test_missing', {
  apiVersion: '2025-02-24.acacia',
});
