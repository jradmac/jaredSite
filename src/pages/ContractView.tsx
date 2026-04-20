import { useEffect, useState, type FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { api, type PublicContract } from '../lib/api';

function dollars(cents: number | null | undefined) {
  if (cents == null) return '—';
  return (cents / 100).toLocaleString(undefined, { style: 'currency', currency: 'USD' });
}

export default function ContractView() {
  const { id } = useParams<{ id: string }>();
  const [contract, setContract] = useState<PublicContract | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [agree, setAgree] = useState(false);
  const [signerName, setSignerName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await api.get<PublicContract>(`/api/public/contract/${id}`);
        setContract(data);
      } catch {
        setNotFound(true);
      }
    })();
  }, [id]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!agree || !id) return;
    setSubmitting(true);
    setError(null);
    try {
      const { checkoutUrl } = await api.post<{ checkoutUrl: string }>(`/api/public/contract/${id}/sign`, {
        agree: true,
        signerName,
      });
      window.location.href = checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setSubmitting(false);
    }
  };

  if (notFound) {
    return (
      <div className="min-h-screen bg-ink text-paper grid place-items-center px-5">
        <div className="text-center">
          <h1 className="font-display text-3xl font-semibold mb-2">Contract not found</h1>
          <p className="text-white/60">Double-check the link you were sent.</p>
        </div>
      </div>
    );
  }

  if (!contract) {
    return <div className="min-h-screen bg-ink text-white/40 grid place-items-center">Loading contract…</div>;
  }

  const alreadySigned = contract.status === 'signed' || contract.status === 'active';

  return (
    <div className="min-h-screen bg-ink text-paper">
      <main className="max-w-3xl mx-auto px-5 sm:px-6 py-12 sm:py-20">
        <p className="uppercase tracking-[0.3em] text-[10px] sm:text-xs text-white/50 mb-4">Service agreement</p>
        <h1 className="font-display text-3xl sm:text-5xl font-semibold leading-tight tracking-tight mb-6">
          {contract.name}
        </h1>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 mb-6 space-y-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50 mb-1">Between</p>
            <p className="text-paper">Jared Mackay</p>
            <p className="text-white/60 text-sm">and</p>
            <p className="text-paper">
              {contract.clientName}
              {contract.clientCompany ? ` — ${contract.clientCompany}` : ''}
            </p>
            <p className="text-white/50 text-sm">{contract.clientEmail}</p>
          </div>

          {contract.description && (
            <div>
              <p className="text-xs uppercase tracking-widest text-white/50 mb-1">Scope</p>
              <p className="whitespace-pre-wrap text-white/80 leading-relaxed">{contract.description}</p>
            </div>
          )}

          <div>
            <p className="text-xs uppercase tracking-widest text-white/50 mb-2">Fees</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {contract.hasOneTime && (
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-wider text-white/50">One-time</p>
                  <p className="font-display text-2xl font-semibold mt-1">{dollars(contract.oneTimeFee)}</p>
                </div>
              )}
              {contract.hasMonthly && (
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-wider text-white/50">Monthly</p>
                  <p className="font-display text-2xl font-semibold mt-1">
                    {dollars(contract.monthlyFee)}
                    <span className="text-sm font-normal text-white/50">/mo</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {contract.terms && (
            <div>
              <p className="text-xs uppercase tracking-widest text-white/50 mb-2">Terms & services</p>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 max-h-80 overflow-y-auto text-sm text-white/75 leading-relaxed whitespace-pre-wrap">
                {contract.terms}
              </div>
            </div>
          )}
        </div>

        {alreadySigned ? (
          <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-6 text-center">
            <p className="text-green-400 font-medium mb-1">This contract has been signed.</p>
            <p className="text-white/60 text-sm">
              {contract.agreedAt && `Signed on ${new Date(contract.agreedAt).toLocaleString()}`}
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 space-y-5">
            <h2 className="font-display text-xl font-semibold">Sign & pay</h2>

            <div>
              <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Your full name</label>
              <input
                required
                value={signerName}
                onChange={(e) => setSignerName(e.target.value)}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-accent"
                placeholder={contract.clientName}
              />
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="w-4 h-4 mt-1 accent-accent shrink-0"
              />
              <span className="text-sm text-white/75 leading-relaxed">
                I have read and agree to the terms and services above. Checking this box constitutes my digital signature
                and legally binds me to this agreement.
              </span>
            </label>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={!agree || !signerName || submitting}
              className="w-full rounded-full bg-paper text-ink font-medium py-3 hover:scale-[1.01] active:scale-[0.99] transition-transform disabled:opacity-40"
            >
              {submitting ? 'Preparing payment…' : 'Sign & continue to payment'}
            </button>
            <p className="text-xs text-white/40 text-center">
              You'll be redirected to Stripe to enter your card. Your card is saved securely for automatic monthly billing.
            </p>
          </form>
        )}
      </main>
    </div>
  );
}
