// ── Meta (Facebook) Pixel ────────────────────────────────────────
// Set your Pixel ID in your host's env as VITE_META_PIXEL_ID,
// or paste it directly into the fallback string below.
// (A Pixel ID is public — it ships in client code either way.)
const PIXEL_ID = (import.meta.env.VITE_META_PIXEL_ID as string | undefined) || '1539925997799431';

type FbqFn = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: FbqFn;
    _fbq?: FbqFn;
  }
}

/** Loads fbevents.js and initializes the Pixel. Safe no-op without an ID. */
export function initMetaPixel(): void {
  if (typeof window === 'undefined' || !PIXEL_ID || window.fbq) return;

  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as FbqFn;
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = '2.0';

  window.fbq = fbq;
  if (!window._fbq) window._fbq = fbq;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  const first = document.getElementsByTagName('script')[0];
  first?.parentNode?.insertBefore(script, first);

  fbq('init', PIXEL_ID);
}

/** Fire a Pixel event (standard or custom). No-op if the Pixel isn't loaded.
 *  Pass options.eventID to deduplicate against a matching server-side CAPI event. */
export function trackPixel(
  event: string,
  params?: Record<string, unknown>,
  options?: { eventID?: string },
): void {
  const fbq = typeof window !== 'undefined' ? window.fbq : undefined;
  if (!fbq) return;
  if (options) fbq('track', event, params ?? {}, options);
  else if (params) fbq('track', event, params);
  else fbq('track', event);
}

/** Read a browser cookie (used for Meta's _fbp / _fbc attribution cookies). */
export function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : undefined;
}

/** Generate a unique event id shared by the browser Pixel and the server CAPI event. */
export function newEventId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
