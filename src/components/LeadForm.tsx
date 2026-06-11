import { useState, type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { api } from '../lib/api';

const BUSINESS_TYPES = [
  'Agency / Marketing',
  'Professional Services (legal, accounting, consulting)',
  'SaaS / Technology',
  'E-commerce / Retail',
  'Real Estate',
  'Healthcare / Medical',
  'Financial Services / Insurance',
  'Home Services / Trades',
  'Hospitality / Restaurant',
  'Education',
  'Nonprofit',
  'Other',
];

const COMPANY_SIZES = ['Just me', '2–10', '11–50', '51–200', '200+'];

const BUDGETS = [
  'Not sure yet',
  'Under $1,000',
  '$1,000 – $5,000',
  '$5,000 – $15,000',
  '$15,000+',
];

const FALLBACK_EMAIL = 'jaredhmackay@gmail.com';

const initial = {
  name: '',
  email: '',
  phone: '',
  businessType: '',
  companyName: '',
  companySize: '',
  budget: '',
  message: '',
  website: '', // honeypot
};

const inputCls =
  'w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-accent transition-colors text-paper placeholder:text-white/30';

const selectCls = inputCls + ' appearance-none cursor-pointer';

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      {children}
    </div>
  );
}

export default function LeadForm() {
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof typeof initial, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await api.post('/api/public/leads', {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        businessType: form.businessType,
        companyName: form.companyName.trim() || null,
        companySize: form.companySize || null,
        budget: form.budget || null,
        message: form.message.trim() || null,
        source: 'custom-ai-landing',
        website: form.website,
      });
      setDone(true);
    } catch {
      setError(
        `Something went wrong sending your request. Please email me directly at ${FALLBACK_EMAIL} and I'll get right back to you.`,
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 sm:p-12 text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-accent mb-5">
          <CheckCircle2 size={28} strokeWidth={1.75} />
        </span>
        <h3 className="font-display text-2xl sm:text-3xl font-semibold text-paper mb-3">
          Request received.
        </h3>
        <p className="text-white/70 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          Thanks, {form.name.split(' ')[0] || 'there'} — your free consultation request is in. We’ll
          reach out within one business day to find the one workflow worth automating first.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 sm:p-8 md:p-10 text-left"
    >
      {/* Honeypot — visually hidden, off-screen, not focusable */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Company website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(e) => set('website', e.target.value)}
          />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
        <Field label="Full name" required>
          <input
            required
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            className={inputCls}
            placeholder="Jane Doe"
            autoComplete="name"
          />
        </Field>
        <Field label="Email" required>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            className={inputCls}
            placeholder="jane@company.com"
            autoComplete="email"
          />
        </Field>
        <Field label="Phone" required>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
            className={inputCls}
            placeholder="(555) 123-4567"
            autoComplete="tel"
          />
        </Field>
        <Field label="Business type" required>
          <select
            required
            value={form.businessType}
            onChange={(e) => set('businessType', e.target.value)}
            className={selectCls + (form.businessType ? '' : ' text-white/30')}
          >
            <option value="" disabled>
              Select your industry…
            </option>
            {BUSINESS_TYPES.map((t) => (
              <option key={t} value={t} className="text-ink">
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Company name">
          <input
            value={form.companyName}
            onChange={(e) => set('companyName', e.target.value)}
            className={inputCls}
            placeholder="Acme Inc."
            autoComplete="organization"
          />
        </Field>
        <Field label="Company size">
          <select
            value={form.companySize}
            onChange={(e) => set('companySize', e.target.value)}
            className={selectCls + (form.companySize ? '' : ' text-white/30')}
          >
            <option value="" disabled>
              Select…
            </option>
            {COMPANY_SIZES.map((s) => (
              <option key={s} value={s} className="text-ink">
                {s}
              </option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Estimated budget">
            <select
              value={form.budget}
              onChange={(e) => set('budget', e.target.value)}
              className={selectCls + (form.budget ? '' : ' text-white/30')}
            >
              <option value="" disabled>
                Select a range…
              </option>
              {BUDGETS.map((b) => (
                <option key={b} value={b} className="text-ink">
                  {b}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="What would you like to automate or build?">
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => set('message', e.target.value)}
              className={inputCls + ' resize-none'}
              placeholder="Tell us about the repetitive process or problem that's costing your team the most time."
            />
          </Field>
        </div>
      </div>

      {error && <p className="mt-5 text-sm text-red-400 leading-relaxed">{error}</p>}

      <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-paper text-ink font-medium px-7 py-3.5 text-sm sm:text-base hover:scale-[1.03] transition-transform disabled:opacity-50 disabled:hover:scale-100"
        >
          {submitting ? 'Sending…' : 'Get my free consultation'}
          {!submitting && <ArrowUpRight size={18} strokeWidth={1.75} />}
        </button>
        <p className="text-xs text-white/40 leading-relaxed sm:max-w-xs">
          No cost, no obligation. We’ll reply within one business day. Your details are only used to
          contact you about your inquiry.
        </p>
      </div>
    </form>
  );
}
