const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`${res.status}: ${text || res.statusText}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'PATCH', body: body ? JSON.stringify(body) : undefined }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};

export interface Contract {
  id: string;
  name: string;
  description: string;
  terms: string;
  clientName: string;
  clientEmail: string;
  clientCompany: string | null;
  clientPhone: string | null;
  hasOneTime: boolean;
  hasMonthly: boolean;
  oneTimeFee: number | null;
  monthlyFee: number | null;
  currency: string;
  status: 'draft' | 'sent' | 'signed' | 'active' | 'past_due' | 'canceled';
  stripeCheckoutUrl: string | null;
  agreedAt: string | null;
  createdAt: string;
}

export interface PublicContract {
  id: string;
  name: string;
  description: string;
  terms: string;
  clientName: string;
  clientEmail: string;
  clientCompany: string | null;
  hasOneTime: boolean;
  hasMonthly: boolean;
  oneTimeFee: number | null;
  monthlyFee: number | null;
  currency: string;
  status: string;
  agreedAt: string | null;
}
