import { useEffect, useState, type FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { X, FileText } from 'lucide-react';
import { api, type PublicContract } from '../lib/api';
import Aurora from '../components/Aurora';
import SpotlightCard from '../components/SpotlightCard';
import AnimatedContent from '../components/AnimatedContent';
import GradientText from '../components/GradientText';
import ShinyText from '../components/ShinyText';

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
  const [termsOpen, setTermsOpen] = useState(false);

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

  useEffect(() => {
    if (!termsOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setTermsOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [termsOpen]);

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
      <div className="noise relative min-h-screen overflow-x-hidden bg-ink text-paper grid place-items-center px-5">
        <div className="text-center relative z-10">
          <p className="uppercase tracking-[0.3em] text-[10px] sm:text-xs text-white/50 mb-4">404 · not found</p>
          <h1 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight mb-3">Contract not found</h1>
          <p className="text-white/60">Double-check the link you were sent.</p>
        </div>
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="noise relative min-h-screen overflow-x-hidden bg-ink text-white/40 grid place-items-center">
        <ShinyText text="Loading contract…" speed={3} />
      </div>
    );
  }

  const alreadySigned = contract.status === 'signed' || contract.status === 'active';

  return (
    <div className="noise relative min-h-screen overflow-x-hidden bg-ink text-paper">
      <div className="absolute inset-x-0 top-0 h-[60vh] -z-0 opacity-50 pointer-events-none">
        <Aurora
          colorStops={['#ff6a3d', '#7c5cff', '#22d3ee']}
          amplitude={0.9}
          blend={0.4}
          speed={0.6}
        />
      </div>
      <div className="absolute inset-x-0 top-0 h-[60vh] bg-gradient-to-b from-transparent via-ink/40 to-ink pointer-events-none" />

      <main className="relative z-10 max-w-3xl mx-auto px-5 sm:px-6 py-16 sm:py-24">
        <AnimatedContent distance={40} direction="vertical" duration={0.7}>
          <p className="uppercase tracking-[0.3em] text-[10px] sm:text-xs text-white/60 mb-4">
            Service agreement
          </p>
        </AnimatedContent>

        <AnimatedContent distance={40} direction="vertical" delay={0.1} duration={0.7}>
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold leading-[1.05] tracking-tight mb-8 sm:mb-10">
            <GradientText
              colors={['#ff6a3d', '#7c5cff', '#22d3ee', '#ff6a3d']}
              animationSpeed={6}
              className="inline-block"
            >
              {contract.name}
            </GradientText>
          </h1>
        </AnimatedContent>

        <AnimatedContent distance={30} direction="vertical" delay={0.2} duration={0.7}>
          <SpotlightCard
            className="mb-6 space-y-6 p-6! sm:p-8!"
            spotlightColor="rgba(255, 106, 61, 0.25)"
          >
            <div>
              <p className="text-[10px] uppercase tracking-widest text-accent mb-2">Between</p>
              <p className="text-paper font-medium">Jared Mackay</p>
              <p className="text-white/50 text-sm my-1">and</p>
              <p className="text-paper font-medium">
                {contract.clientName}
                {contract.clientCompany ? ` — ${contract.clientCompany}` : ''}
              </p>
              <p className="text-white/50 text-sm">{contract.clientEmail}</p>
            </div>

            {contract.description && (
              <div>
                <p className="text-[10px] uppercase tracking-widest text-accent mb-2">Scope</p>
                <p className="whitespace-pre-wrap text-white/80 leading-relaxed">{contract.description}</p>
              </div>
            )}

            <div>
              <p className="text-[10px] uppercase tracking-widest text-accent mb-3">Fees</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {contract.hasOneTime && (
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-[10px] uppercase tracking-widest text-white/50">One-time</p>
                    <p className="font-display text-2xl sm:text-3xl font-semibold text-paper mt-1 tracking-tight">
                      {dollars(contract.oneTimeFee)}
                    </p>
                  </div>
                )}
                {contract.hasMonthly && (
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-[10px] uppercase tracking-widest text-white/50">Monthly</p>
                    <p className="font-display text-2xl sm:text-3xl font-semibold text-paper mt-1 tracking-tight">
                      {dollars(contract.monthlyFee)}
                      <span className="text-sm font-normal text-white/50">/mo</span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {contract.terms && (
              <div>
                <p className="text-[10px] uppercase tracking-widest text-accent mb-2">Terms &amp; services</p>
                <button
                  type="button"
                  onClick={() => setTermsOpen(true)}
                  className="w-full flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] hover:border-accent/40 hover:bg-white/[0.07] transition-colors px-4 py-3.5 text-left group"
                >
                  <span className="flex items-center gap-3">
                    <FileText size={18} strokeWidth={1.5} className="text-accent shrink-0" />
                    <span className="text-paper font-medium">View full terms &amp; services</span>
                  </span>
                  <span className="text-xs text-white/50 group-hover:text-paper transition-colors">
                    Open →
                  </span>
                </button>
              </div>
            )}
          </SpotlightCard>
        </AnimatedContent>

        {alreadySigned ? (
          <AnimatedContent distance={30} direction="vertical" delay={0.3} duration={0.7}>
            <SpotlightCard
              className="text-center p-6! sm:p-8!"
              spotlightColor="rgba(34, 211, 238, 0.3)"
            >
              <p className="text-[10px] uppercase tracking-widest text-accent3 mb-3">Signed &amp; active</p>
              <p className="font-display text-xl sm:text-2xl font-semibold text-paper mb-2">
                This contract has been signed.
              </p>
              <p className="text-white/60 text-sm">
                {contract.agreedAt && `Signed on ${new Date(contract.agreedAt).toLocaleString()}`}
              </p>
            </SpotlightCard>
          </AnimatedContent>
        ) : (
          <AnimatedContent distance={30} direction="vertical" delay={0.3} duration={0.7}>
            <SpotlightCard
              className="p-6! sm:p-8!"
              spotlightColor="rgba(124, 92, 255, 0.3)"
            >
              <form onSubmit={onSubmit} className="space-y-6">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-accent mb-1">Final step</p>
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold text-paper tracking-tight">
                    Sign &amp; pay
                  </h2>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">
                    Your full name
                  </label>
                  <input
                    required
                    value={signerName}
                    onChange={(e) => setSignerName(e.target.value)}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none transition-colors focus:border-accent/60 focus:bg-white/[0.07] placeholder:text-white/30"
                    placeholder={contract.clientName}
                  />
                </div>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="w-4 h-4 mt-1 accent-accent shrink-0"
                  />
                  <span className="text-sm text-white/75 leading-relaxed group-hover:text-white/90 transition-colors">
                    I have read and agree to the terms and services above. Checking this box constitutes my
                    digital signature and legally binds me to this agreement.
                  </span>
                </label>

                {error && (
                  <p className="text-sm text-red-400 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={!agree || !signerName || submitting}
                  className="w-full rounded-full bg-paper text-ink font-medium py-3 sm:py-3.5 hover:scale-[1.01] active:scale-[0.99] transition-transform disabled:opacity-40 disabled:hover:scale-100"
                >
                  {submitting ? 'Preparing payment…' : 'Sign & continue to payment →'}
                </button>

                <p className="text-[11px] text-white/40 text-center leading-relaxed">
                  You'll be redirected to Stripe to enter your card. Your card is saved securely for
                  automatic monthly billing.
                </p>
              </form>
            </SpotlightCard>
          </AnimatedContent>
        )}
      </main>

      {termsOpen && contract.terms && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="terms-modal-title"
          className="fixed inset-0 z-50 grid place-items-center px-4 py-8 sm:p-8 bg-ink/80 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setTermsOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl max-h-full rounded-3xl border border-white/10 bg-ink shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 px-6 sm:px-8 pt-6 sm:pt-8 pb-4 border-b border-white/5">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-accent mb-1">Agreement</p>
                <h2
                  id="terms-modal-title"
                  className="font-display text-xl sm:text-2xl font-semibold text-paper tracking-tight"
                >
                  Terms &amp; services
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setTermsOpen(false)}
                aria-label="Close terms"
                className="shrink-0 rounded-full w-9 h-9 grid place-items-center text-white/60 hover:text-paper hover:bg-white/10 transition-colors"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <div className="overflow-y-auto px-6 sm:px-8 py-6 text-sm sm:text-base text-white/80 leading-relaxed whitespace-pre-wrap">
              {contract.terms}
            </div>

            <div className="px-6 sm:px-8 py-4 border-t border-white/5 flex justify-end bg-white/[0.02]">
              <button
                type="button"
                onClick={() => setTermsOpen(false)}
                className="rounded-full bg-paper text-ink font-medium px-5 py-2 text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
