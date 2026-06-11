// New-lead notifications to Telegram via a bot.
// Disabled (no-op) unless TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID are set.
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const CHAT_ID = process.env.TELEGRAM_CHAT_ID || '';
const WEB_ORIGIN = process.env.PUBLIC_WEB_ORIGIN || 'https://www.jaredmkay.com';

export interface LeadNotification {
  name: string;
  email: string;
  phone: string;
  businessType: string;
  companyName?: string | null;
  companySize?: string | null;
  budget?: string | null;
  message?: string | null;
  source?: string | null;
}

function esc(value?: string | null): string {
  const t = (value ?? '').trim();
  if (!t) return '—';
  return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Best-effort Telegram ping for a new lead. Never throws. */
export async function notifyNewLead(lead: LeadNotification): Promise<void> {
  if (!BOT_TOKEN || !CHAT_ID) return;

  const text =
    `🚀 <b>New lead — Custom AI</b>\n\n` +
    `<b>Name:</b> ${esc(lead.name)}\n` +
    `<b>Business:</b> ${esc(lead.businessType)}\n` +
    `<b>Email:</b> ${esc(lead.email)}\n` +
    `<b>Phone:</b> ${esc(lead.phone)}\n` +
    `<b>Company:</b> ${esc(lead.companyName)}\n` +
    `<b>Size:</b> ${esc(lead.companySize)}\n` +
    `<b>Budget:</b> ${esc(lead.budget)}\n` +
    `<b>Source:</b> ${esc(lead.source)}\n\n` +
    `<b>Message:</b>\n${lead.message ? esc(lead.message.slice(0, 1000)) : '—'}\n\n` +
    `${WEB_ORIGIN}/admin`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.warn(`[notify] Telegram responded ${res.status}: ${body}`);
    }
  } catch (err) {
    console.warn('[notify] Telegram request failed', err);
  }
}
