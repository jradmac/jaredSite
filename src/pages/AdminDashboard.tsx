import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, type Contract } from '../lib/api';

function dollars(cents: number | null | undefined) {
  if (cents == null) return '';
  return (cents / 100).toLocaleString(undefined, { style: 'currency', currency: 'USD' });
}

function statusColor(s: Contract['status']) {
  switch (s) {
    case 'active':
      return 'bg-green-500/10 text-green-400 border-green-500/20';
    case 'signed':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    case 'past_due':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    case 'canceled':
      return 'bg-red-500/10 text-red-400 border-red-500/20';
    default:
      return 'bg-white/5 text-white/60 border-white/10';
  }
}

interface FormState {
  name: string;
  description: string;
  terms: string;
  clientName: string;
  clientEmail: string;
  clientCompany: string;
  clientPhone: string;
  hasOneTime: boolean;
  hasMonthly: boolean;
  oneTimeFee: string;
  monthlyFee: string;
}

const EMPTY: FormState = {
  name: '',
  description: '',
  terms: '',
  clientName: '',
  clientEmail: '',
  clientCompany: '',
  clientPhone: '',
  hasOneTime: false,
  hasMonthly: true,
  oneTimeFee: '',
  monthlyFee: '',
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const loadContracts = useCallback(async () => {
    const rows = await api.get<Contract[]>('/api/contracts');
    setContracts(rows);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await api.get('/api/auth/me');
        setAuthed(true);
        await loadContracts();
      } catch {
        setAuthed(false);
        navigate('/admin/login');
      }
    })();
  }, [navigate, loadContracts]);

  const canSubmit = useMemo(() => {
    if (!form.name || !form.clientName || !form.clientEmail) return false;
    if (!form.hasOneTime && !form.hasMonthly) return false;
    if (form.hasOneTime && !form.oneTimeFee) return false;
    if (form.hasMonthly && !form.monthlyFee) return false;
    return true;
  }, [form]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      await api.post('/api/contracts', {
        name: form.name,
        description: form.description,
        terms: form.terms,
        clientName: form.clientName,
        clientEmail: form.clientEmail,
        clientCompany: form.clientCompany || null,
        clientPhone: form.clientPhone || null,
        hasOneTime: form.hasOneTime,
        hasMonthly: form.hasMonthly,
        oneTimeFee: form.hasOneTime ? Math.round(parseFloat(form.oneTimeFee) * 100) : null,
        monthlyFee: form.hasMonthly ? Math.round(parseFloat(form.monthlyFee) * 100) : null,
        currency: 'usd',
      });
      setForm(EMPTY);
      setShowForm(false);
      await loadContracts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm('Delete this contract? If the client has an active subscription, it will be canceled in Stripe.')) return;
    await api.delete(`/api/contracts/${id}`);
    await loadContracts();
  };

  const onLogout = async () => {
    await api.post('/api/auth/logout');
    navigate('/admin/login');
  };

  const contractLink = (id: string) => `${window.location.origin}/contract/${id}`;

  if (authed === null) {
    return <div className="min-h-screen bg-ink text-white/40 grid place-items-center">Loading…</div>;
  }

  return (
    <div className="min-h-screen bg-ink text-paper">
      <header className="border-b border-white/10 px-5 sm:px-6 py-4 flex items-center justify-between">
        <h1 className="font-display text-lg sm:text-xl font-semibold">
          <span className="gradient-text">Admin</span>
        </h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowForm((s) => !s)}
            className="text-sm px-4 py-2 rounded-full bg-paper text-ink font-medium"
          >
            {showForm ? 'Close' : 'New contract'}
          </button>
          <button onClick={onLogout} className="text-sm px-4 py-2 rounded-full border border-white/15 text-white/70">
            Log out
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 sm:px-6 py-8 sm:py-12">
        {showForm && (
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 mb-10 space-y-5"
          >
            <h2 className="font-display text-xl font-semibold">Create contract</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Contract name">
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputCls}
                  placeholder="Website redesign"
                />
              </Field>
              <Field label="Client name">
                <input
                  required
                  value={form.clientName}
                  onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                  className={inputCls}
                  placeholder="Jane Doe"
                />
              </Field>
              <Field label="Client email">
                <input
                  required
                  type="email"
                  value={form.clientEmail}
                  onChange={(e) => setForm({ ...form, clientEmail: e.target.value })}
                  className={inputCls}
                  placeholder="jane@acme.com"
                />
              </Field>
              <Field label="Client company">
                <input
                  value={form.clientCompany}
                  onChange={(e) => setForm({ ...form, clientCompany: e.target.value })}
                  className={inputCls}
                  placeholder="Acme Inc."
                />
              </Field>
              <Field label="Client phone">
                <input
                  value={form.clientPhone}
                  onChange={(e) => setForm({ ...form, clientPhone: e.target.value })}
                  className={inputCls}
                />
              </Field>
            </div>

            <Field label="Description">
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className={inputCls}
                placeholder="Scope of work, deliverables, etc."
              />
            </Field>

            <Field label="Terms & services (shown on the client's signing page)">
              <textarea
                rows={6}
                value={form.terms}
                onChange={(e) => setForm({ ...form, terms: e.target.value })}
                className={inputCls}
                placeholder="The full terms the client will agree to."
              />
            </Field>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 p-4">
                <label className="flex items-center gap-3 cursor-pointer mb-3">
                  <input
                    type="checkbox"
                    checked={form.hasOneTime}
                    onChange={(e) => setForm({ ...form, hasOneTime: e.target.checked })}
                    className="w-4 h-4 accent-accent"
                  />
                  <span className="font-medium">One-time fee</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  disabled={!form.hasOneTime}
                  value={form.oneTimeFee}
                  onChange={(e) => setForm({ ...form, oneTimeFee: e.target.value })}
                  className={inputCls + ' disabled:opacity-40'}
                  placeholder="5000.00"
                />
              </div>

              <div className="rounded-xl border border-white/10 p-4">
                <label className="flex items-center gap-3 cursor-pointer mb-3">
                  <input
                    type="checkbox"
                    checked={form.hasMonthly}
                    onChange={(e) => setForm({ ...form, hasMonthly: e.target.checked })}
                    className="w-4 h-4 accent-accent"
                  />
                  <span className="font-medium">Monthly fee (recurring)</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  disabled={!form.hasMonthly}
                  value={form.monthlyFee}
                  onChange={(e) => setForm({ ...form, monthlyFee: e.target.value })}
                  className={inputCls + ' disabled:opacity-40'}
                  placeholder="1500.00"
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={!canSubmit || saving}
                className="rounded-full bg-paper text-ink font-medium px-6 py-3 disabled:opacity-40"
              >
                {saving ? 'Saving…' : 'Create contract'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setForm(EMPTY);
                }}
                className="rounded-full border border-white/15 px-6 py-3 text-white/70"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="space-y-3">
          <h2 className="font-display text-xl font-semibold mb-4">Contracts</h2>
          {contracts.length === 0 && (
            <p className="text-white/50 text-sm">No contracts yet. Click "New contract" to create one.</p>
          )}
          {contracts.map((c) => (
            <div
              key={c.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-display text-lg font-semibold truncate">{c.name}</h3>
                  <span
                    className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border ${statusColor(c.status)}`}
                  >
                    {c.status}
                  </span>
                </div>
                <p className="text-sm text-white/60">
                  {c.clientName} · {c.clientEmail}
                </p>
                <p className="text-xs text-white/40 mt-1">
                  {c.hasOneTime && <span>One-time {dollars(c.oneTimeFee)} </span>}
                  {c.hasMonthly && <span>· Monthly {dollars(c.monthlyFee)}</span>}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(contractLink(c.id));
                    alert('Contract link copied');
                  }}
                  className="text-xs px-3 py-2 rounded-full border border-white/15 text-white/70 hover:text-paper hover:bg-white/5"
                >
                  Copy link
                </button>
                <a
                  href={`/contract/${c.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs px-3 py-2 rounded-full border border-white/15 text-white/70 hover:text-paper hover:bg-white/5"
                >
                  View
                </a>
                <button
                  onClick={() => onDelete(c.id)}
                  className="text-xs px-3 py-2 rounded-full border border-red-500/30 text-red-400 hover:bg-red-500/10"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

const inputCls =
  'w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-accent transition-colors text-paper placeholder:text-white/30';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">{label}</label>
      {children}
    </div>
  );
}
