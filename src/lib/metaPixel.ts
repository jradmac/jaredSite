// ── Meta (Facebook) Pixel ────────────────────────────────────────
// Set your Pixel ID in your host's env as VITE_META_PIXEL_ID,
// or paste it directly into the fallback string below.
// (A Pixel ID is public — it ships in client code either way.)
const PIXEL_ID = (import.meta.env.VITE_META_PIXEL_ID as string | undefined) || '641569926932916';

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

/** Fire a Pixel event (standard or custom). No-op if the Pixel isn't loaded. */
export function trackPixel(event: string, params?: Record<string, unknown>): void {
  const fbq = typeof window !== 'undefined' ? window.fbq : undefined;
  if (!fbq) return;
  if (params) fbq('track', event, params);
  else fbq('track', event);
}
