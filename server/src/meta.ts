import crypto from 'node:crypto';

// Meta Conversions API — server-side event sender for accurate ad tracking.
// Disabled (no-op) unless META_CAPI_ACCESS_TOKEN is set in the environment.
const PIXEL_ID = process.env.META_PIXEL_ID || '1451500423327450';
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN || '';
const API_VERSION = 'v21.0';

function sha256(value?: string | null): string | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

function hashPhone(phone?: string | null): string | undefined {
  if (!phone) return undefined;
  let digits = phone.replace(/\D/g, '');
  if (!digits) return undefined;
  // Assume US country code if a bare 10-digit number was provided.
  if (digits.length === 10) digits = `1${digits}`;
  return crypto.createHash('sha256').update(digits).digest('hex');
}

export interface LeadEventInput {
  email?: string | null;
  phone?: string | null;
  name?: string | null;
  eventId?: string | null;
  eventSourceUrl?: string | null;
  fbp?: string | null;
  fbc?: string | null;
  ip?: string;
  userAgent?: string;
}

/** Best-effort: sends a server-side "Lead" event to Meta. Never throws. */
export async function sendLeadEvent(input: LeadEventInput): Promise<void> {
  if (!ACCESS_TOKEN) return;

  const parts = (input.name ?? '').trim().split(/\s+/).filter(Boolean);
  const firstName = parts[0];
  const lastName = parts.slice(1).join(' ');

  const userData: Record<string, unknown> = {};
  const em = sha256(input.email);
  if (em) userData.em = [em];
  const ph = hashPhone(input.phone);
  if (ph) userData.ph = [ph];
  const fn = sha256(firstName);
  if (fn) userData.fn = [fn];
  const ln = sha256(lastName);
  if (ln) userData.ln = [ln];
  if (input.ip) userData.client_ip_address = input.ip;
  if (input.userAgent) userData.client_user_agent = input.userAgent;
  if (input.fbp) userData.fbp = input.fbp;
  if (input.fbc) userData.fbc = input.fbc;

  const payload = {
    data: [
      {
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId || undefined,
        event_source_url: input.eventSourceUrl || undefined,
        action_source: 'website',
        user_data: userData,
      },
    ],
  };

  try {
    const url = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(
      ACCESS_TOKEN,
    )}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.warn(`[capi] Meta responded ${res.status}: ${text}`);
    }
  } catch (err) {
    console.warn('[capi] lead event request failed', err);
  }
}
