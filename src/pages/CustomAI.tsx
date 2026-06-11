import { Link } from 'react-router-dom';
import Aurora from '../components/Aurora';
import BlurText from '../components/BlurText';
import AnimatedContent from '../components/AnimatedContent';
import GradientText from '../components/GradientText';
import SpotlightCard from '../components/SpotlightCard';
import ShinyText from '../components/ShinyText';
import ClickSpark from '../components/ClickSpark';
import Navbar from '../components/Navbar';
import AIOrb from '../components/AIOrb';
import {
  ArrowLeft,
  Search,
  Inbox,
  FileText,
  Database,
  MessageSquare,
  Users,
  Workflow,
  Layers,
  Repeat,
  ShieldCheck,
  Lock,
  CheckCircle2,
} from 'lucide-react';

const ACCENTS = [
  'rgba(255, 106, 61, 0.35)',
  'rgba(124, 92, 255, 0.35)',
  'rgba(34, 211, 238, 0.35)',
] as const;

const stats = [
  { value: 'Cut costs', label: 'Automate the expensive manual work that quietly drains your budget' },
  { value: 'Save time', label: 'Hand your team back the hours lost to repetitive busywork' },
  { value: 'Increase revenue', label: 'Free your people to focus on the work that actually grows the business' },
];

const pains = [
  'Re-keying the same data between tools that don’t talk to each other',
  'Inboxes and tickets that pile up faster than anyone can answer them',
  'Reports and hand-offs rebuilt by hand, the same way, every single week',
  'Knowledge buried in drives and docs that no one can find when it matters',
];

const builds = [
  {
    icon: Inbox,
    title: 'Email & Inbox Triage',
    description:
      'Incoming email read, categorized, drafted, and routed automatically — your team only touches the replies that actually need a human.',
    tag: 'Drafting · Routing',
  },
  {
    icon: FileText,
    title: 'Document & Data Extraction',
    description:
      'Pull the numbers, names, and line items out of PDFs, invoices, and contracts straight into your systems — no more manual re-keying.',
    tag: 'Parsing · OCR',
  },
  {
    icon: Database,
    title: 'Internal Knowledge Assistant',
    description:
      'A private assistant trained on your own docs, SOPs, and history, so staff get accurate answers in seconds instead of digging through drives.',
    tag: 'RAG · Search',
  },
  {
    icon: MessageSquare,
    title: 'Customer Support Deflection',
    description:
      'Answer the repetitive questions instantly, around the clock, escalating only the genuinely tricky tickets to your people.',
    tag: 'Support',
  },
  {
    icon: Users,
    title: 'Lead Enrichment & CRM Hygiene',
    description:
      'Every new lead researched, enriched, and logged cleanly — so your pipeline stays current without anyone maintaining it by hand.',
    tag: 'Enrichment',
  },
  {
    icon: Workflow,
    title: 'Ops & Reporting Automation',
    description:
      'The recurring reports, hand-offs, and copy-paste-between-tools work, running on their own on whatever schedule you set.',
    tag: 'Automation',
  },
];

const showcase = [
  {
    img: '/ai-workflow.svg',
    title: 'Live dashboards, not black boxes',
    description:
      'Every automation reports what it did and what it saved — so you can watch the ROI, not take it on faith.',
  },
  {
    img: '/ai-integrations.svg',
    title: 'Wired into the tools you already use',
    description:
      'Your CRM, inbox, sheets, and apps connected into one system that fits your workflow instead of forcing a new one.',
  },
];

const steps = [
  {
    icon: Search,
    title: 'We Audit',
    description:
      'A free, no-pressure call where we map your actual workflows and find the one process quietly costing you the most. You leave knowing exactly what’s worth automating first — whether or not you hire us.',
  },
  {
    icon: Layers,
    title: 'We Build',
    description:
      'We scope that one workflow to a fixed price and a fixed timeline, build it against your real data, and prove it works before anything goes live. No open-ended retainers, no surprise invoices.',
  },
  {
    icon: Repeat,
    title: 'We Run & Refine',
    description:
      'Once it’s earning its keep, we keep it running, watch it, and add the next workflow when you’re ready. You grow the system one proven win at a time.',
  },
];

const trust = [
  {
    icon: Lock,
    title: 'Your data stays yours',
    description:
      'Your information is never used to train public models. It’s processed securely, kept in your control, and access is locked down. Security is a section here, not a footnote.',
  },
  {
    icon: ShieldCheck,
    title: 'Human in the loop',
    description:
      'AI handles the repetitive 80%; your team approves the edge cases. Built with guardrails, fallbacks, and monitoring so nothing important runs unchecked.',
  },
  {
    icon: Users,
    title: 'It augments your team',
    description:
      'This removes the busywork your people already hate — so their hours go to the work that actually needs a human. Nobody gets replaced.',
  },
  {
    icon: CheckCircle2,
    title: 'Fixed scope, no spiral',
    description:
      'Every build has a defined deliverable, a fixed price, and a clear finish line agreed up front. You always know what you’re getting and what it costs.',
  },
];

const packages = [
  {
    icon: Search,
    name: 'Workflow Audit',
    price: 'Free',
    blurb:
      'A working session to find your highest-ROI automation and quantify what it’s costing you today. Yours to keep, no commitment.',
    points: ['30–45 minute call', 'Mapped to your real workflows', 'Quantified ROI estimate', 'Clear first-build recommendation'],
    featured: false,
  },
  {
    icon: Layers,
    name: 'First Build',
    price: 'Fixed scope',
    blurb:
      'One workflow, scoped to a fixed price and timeline, built on your real data and proven before it ever goes live.',
    points: ['Single high-impact workflow', 'Built & tested on your data', 'Fixed price, fixed timeline', 'Live in weeks, not quarters'],
    featured: true,
  },
  {
    icon: Repeat,
    name: 'Ongoing Partner',
    price: 'Monthly',
    blurb:
      'We keep your automations running and add the next proven win on a simple monthly basis — for teams that want a long-term build partner.',
    points: ['Maintenance & monitoring', 'New workflows over time', 'Priority turnaround', 'Cancel anytime'],
    featured: false,
  },
];

export default function CustomAI() {
  return (
    <ClickSpark sparkColor="#ff6a3d" sparkRadius={16} sparkCount={8} duration={500}>
      <div className="noise relative min-h-screen overflow-x-hidden bg-ink text-paper">
        <Navbar />

        <main className="relative z-10">
          {/* ═══════════════════════════════════════════════ */}
          {/* HERO                                            */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-5 sm:px-6 pt-28 pb-16">
            <div className="absolute inset-0 -z-0">
              <Aurora
                colorStops={['#ff6a3d', '#7c5cff', '#22d3ee']}
                amplitude={1.1}
                blend={0.5}
                speed={0.8}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/40 to-ink pointer-events-none" />

            <div className="relative z-10 max-w-5xl w-full text-center">
              <AnimatedContent distance={40} direction="vertical" duration={0.8}>
                <div className="flex flex-col items-center gap-4 mb-6">
                  <AIOrb size={76} />
                  <span className="font-display text-lg font-semibold tracking-[0.25em] uppercase">
                    Custom AI Solutions
                  </span>
                </div>
                <p className="uppercase tracking-[0.3em] text-xs text-white/60 mb-6">
                  Custom AI Builds for Business
                </p>
              </AnimatedContent>

              <h1 className="font-display text-[2.5rem] sm:text-7xl md:text-8xl font-semibold leading-[0.95] tracking-tight">
                <BlurText
                  text="Stop paying people to do what software should."
                  delay={120}
                  animateBy="words"
                  direction="top"
                  className="justify-center"
                />
              </h1>

              <AnimatedContent distance={30} direction="vertical" delay={0.6} duration={0.8}>
                <p className="mt-6 sm:mt-8 max-w-2xl mx-auto text-white/70 text-sm sm:text-lg leading-relaxed">
                  We build custom AI that fits how your business actually works — automating the
                  repetitive, expensive, copy-paste work your team hates. No generic tool to learn,
                  no buzzwords. Just one workflow, handled, with measurable ROI.
                </p>
              </AnimatedContent>

              <AnimatedContent distance={30} direction="vertical" delay={0.9} duration={0.8}>
                <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 justify-center">
                  <Link
                    to="/free-consultation"
                    className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-full bg-paper text-ink font-medium hover:scale-105 transition-transform"
                  >
                    Get a free consultation →
                  </Link>
                  <a
                    href="#build"
                    className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-full border border-white/20 hover:bg-white/5 transition-colors"
                  >
                    <ShinyText text="See what we build" speed={4} />
                  </a>
                </div>
              </AnimatedContent>

              {/* Stat trio */}
              <div className="mt-14 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 max-w-3xl mx-auto items-stretch">
                {stats.map((s, i) => (
                  <AnimatedContent key={s.value} className="h-full" distance={40} delay={i * 0.1} duration={0.6}>
                    <div className="h-full flex flex-col justify-center rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5 sm:p-6 text-center">
                      <div className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-paper">
                        {s.value}
                      </div>
                      <p className="text-[10px] sm:text-xs font-medium tracking-widest uppercase text-white/50 mt-2 sm:mt-3 leading-relaxed">
                        {s.label}
                      </p>
                    </div>
                  </AnimatedContent>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* THE PROBLEM                                     */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="py-20 sm:py-28 md:py-40 px-5 sm:px-6 border-y border-white/10">
            <div className="max-w-4xl mx-auto">
              <AnimatedContent distance={40} direction="vertical" duration={0.7}>
                <p className="uppercase tracking-[0.3em] text-[10px] sm:text-xs text-white/60 mb-3 sm:mb-4">
                  001 · The problem
                </p>
                <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight mb-6">
                  Your team is doing work{' '}
                  <GradientText
                    colors={['#ff6a3d', '#7c5cff', '#22d3ee', '#ff6a3d']}
                    animationSpeed={5}
                    className="inline-block"
                  >
                    software should be doing.
                  </GradientText>
                </h2>
                <p className="text-white/70 text-base sm:text-xl leading-relaxed mb-8 sm:mb-10">
                  Every business runs on a handful of quiet, repetitive processes that eat hours and
                  morale. They’re too specific for off-the-shelf software, so smart people end up doing
                  them by hand — over and over. That’s exactly where custom AI pays for itself.
                </p>
              </AnimatedContent>

              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {pains.map((p, i) => (
                  <AnimatedContent key={p} distance={20} direction="vertical" delay={i * 0.08} duration={0.6}>
                    <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
                      <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                      <span className="text-white/75 text-sm sm:text-base leading-relaxed">{p}</span>
                    </div>
                  </AnimatedContent>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* WHY CUSTOM (image + text)                       */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="py-20 sm:py-28 md:py-44 px-5 sm:px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14 items-center">
              <AnimatedContent distance={30} direction="horizontal" reverse duration={0.8}>
                <div className="relative">
                  <div className="rounded-3xl overflow-hidden border border-white/10">
                    <img
                      src="/why-custom.png"
                      alt="A team collaborating around a laptop"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -inset-3 rounded-3xl bg-accent/15 blur-2xl -z-10" />
                </div>
              </AnimatedContent>

              <AnimatedContent distance={30} direction="horizontal" duration={0.8}>
                <div>
                  <p className="uppercase tracking-[0.3em] text-[10px] sm:text-xs text-white/60 mb-3 sm:mb-4">
                    002 · Why custom
                  </p>
                  <h2 className="font-display text-3xl sm:text-5xl font-semibold leading-tight tracking-tight mb-5">
                    Off-the-shelf tools make you fit them.{' '}
                    <GradientText
                      colors={['#ff6a3d', '#7c5cff', '#22d3ee', '#ff6a3d']}
                      animationSpeed={5}
                      className="inline-block"
                    >
                      We fit you.
                    </GradientText>
                  </h2>
                  <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-6">
                    Generic SaaS is built for the average company, which means it never quite matches
                    yours. A custom build wraps around your real process, your real data, and your real
                    tools — so it solves the actual problem instead of half of it.
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Built around your workflow, not a template you adapt to',
                      'Connected to the systems you already run on',
                      'Scoped to one painful process first, then expanded',
                      'Owned and understood — no mystery vendor lock-in',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-white/75">
                        <CheckCircle2 size={18} strokeWidth={1.75} className="mt-0.5 shrink-0 text-accent" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedContent>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* WHAT WE BUILD                                   */}
          {/* ═══════════════════════════════════════════════ */}
          <section id="build" className="py-20 sm:py-28 md:py-44 px-5 sm:px-6 bg-white/[0.02] border-y border-white/5">
            <div className="max-w-6xl mx-auto">
              <AnimatedContent distance={40} duration={0.7}>
                <p className="uppercase tracking-[0.3em] text-[10px] sm:text-xs text-white/60 mb-3 sm:mb-4">
                  003 · What we build
                </p>
                <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight mb-4">
                  Outcomes,{' '}
                  <GradientText
                    colors={['#ff6a3d', '#7c5cff', '#22d3ee', '#ff6a3d']}
                    animationSpeed={5}
                    className="inline-block"
                  >
                    not science projects.
                  </GradientText>
                </h2>
                <p className="text-white/70 text-base sm:text-lg max-w-2xl">
                  A few of the most common builds — but every engagement starts from your workflow, not
                  this menu. If it’s repetitive and rule-bound, it’s probably automatable.
                </p>
              </AnimatedContent>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-10 sm:mt-14">
                {builds.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <AnimatedContent key={b.title} distance={30} direction="vertical" delay={i * 0.06} duration={0.6}>
                      <SpotlightCard className="h-full p-6! sm:p-7!" spotlightColor={ACCENTS[i % 3]}>
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-accent mb-5">
                          <Icon size={22} strokeWidth={1.5} />
                        </span>
                        <h3 className="font-display text-lg sm:text-xl font-semibold text-paper mb-2">
                          {b.title}
                        </h3>
                        <p className="text-white/65 text-sm leading-relaxed mb-5">{b.description}</p>
                        <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">
                          {b.tag}
                        </span>
                      </SpotlightCard>
                    </AnimatedContent>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* SHOWCASE (pictures)                             */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="py-20 sm:py-28 md:py-44 px-5 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <AnimatedContent distance={40} duration={0.7}>
                <p className="uppercase tracking-[0.3em] text-[10px] sm:text-xs text-white/60 mb-3 sm:mb-4">
                  004 · Under the hood
                </p>
                <h2 className="font-display text-3xl sm:text-5xl font-semibold leading-tight tracking-tight mb-4">
                  Systems you can{' '}
                  <GradientText
                    colors={['#ff6a3d', '#7c5cff', '#22d3ee', '#ff6a3d']}
                    animationSpeed={5}
                    className="inline-block"
                  >
                    actually see working.
                  </GradientText>
                </h2>
              </AnimatedContent>

              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mt-10 sm:mt-14">
                {showcase.map((s, i) => (
                  <AnimatedContent key={s.title} distance={30} direction="vertical" delay={i * 0.12} duration={0.7}>
                    <div className="group relative">
                      <div className="rounded-3xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-colors">
                        <img src={s.img} alt={s.title} className="w-full aspect-[3/2] object-cover" />
                      </div>
                      <div className="absolute -inset-2 rounded-3xl bg-accent2/10 blur-2xl -z-10" />
                      <h3 className="font-display text-xl sm:text-2xl font-semibold text-paper mt-5 mb-2">
                        {s.title}
                      </h3>
                      <p className="text-white/65 text-sm sm:text-base leading-relaxed">{s.description}</p>
                    </div>
                  </AnimatedContent>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* HOW IT WORKS                                    */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="py-20 sm:py-28 md:py-44 px-5 sm:px-6 bg-white/[0.02] border-y border-white/5">
            <div className="max-w-6xl mx-auto">
              <AnimatedContent distance={40} duration={0.7}>
                <p className="uppercase tracking-[0.3em] text-[10px] sm:text-xs text-white/60 mb-3 sm:mb-4">
                  005 · How it works
                </p>
                <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight mb-4">
                  Low risk by design —{' '}
                  <GradientText
                    colors={['#ff6a3d', '#7c5cff', '#22d3ee', '#ff6a3d']}
                    animationSpeed={5}
                    className="inline-block"
                  >
                    prove it small first.
                  </GradientText>
                </h2>
                <p className="text-white/70 text-base sm:text-lg max-w-2xl">
                  You see it work on your own data before you commit to scaling it. No big-bang
                  transformation, no open-ended contract.
                </p>
              </AnimatedContent>

              <div className="grid md:grid-cols-3 gap-5 sm:gap-6 mt-10 sm:mt-14">
                {steps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <AnimatedContent key={step.title} distance={30} direction="vertical" delay={i * 0.1} duration={0.7}>
                      <SpotlightCard className="h-full p-6! sm:p-8!" spotlightColor={ACCENTS[i % 3]}>
                        <div className="flex items-start justify-between mb-5 sm:mb-6">
                          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-accent">
                            <Icon size={22} strokeWidth={1.5} />
                          </span>
                          <span className="font-display text-3xl sm:text-4xl font-semibold text-white/15">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl font-semibold text-paper mb-3">
                          {step.title}
                        </h3>
                        <p className="text-white/70 text-sm leading-relaxed">{step.description}</p>
                      </SpotlightCard>
                    </AnimatedContent>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* BUILT TO BE TRUSTED                             */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="py-20 sm:py-28 md:py-44 px-5 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <AnimatedContent distance={40} duration={0.7}>
                <p className="uppercase tracking-[0.3em] text-[10px] sm:text-xs text-white/60 mb-3 sm:mb-4">
                  006 · Built to be trusted
                </p>
                <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight mb-4">
                  The questions every owner asks —{' '}
                  <GradientText
                    colors={['#ff6a3d', '#7c5cff', '#22d3ee', '#ff6a3d']}
                    animationSpeed={5}
                    className="inline-block"
                  >
                    answered up front.
                  </GradientText>
                </h2>
              </AnimatedContent>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-10 sm:mt-14">
                {trust.map((t, i) => {
                  const Icon = t.icon;
                  return (
                    <AnimatedContent key={t.title} distance={30} direction="vertical" delay={i * 0.08} duration={0.7}>
                      <SpotlightCard className="h-full p-6! sm:p-7!" spotlightColor={ACCENTS[i % 3]}>
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-accent mb-5">
                          <Icon size={22} strokeWidth={1.5} />
                        </span>
                        <h3 className="font-display text-lg sm:text-xl font-semibold text-paper mb-2">
                          {t.title}
                        </h3>
                        <p className="text-white/65 text-sm leading-relaxed">{t.description}</p>
                      </SpotlightCard>
                    </AnimatedContent>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* ENGAGEMENTS                                     */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="py-20 sm:py-28 md:py-44 px-5 sm:px-6 bg-white/[0.02] border-y border-white/5">
            <div className="max-w-6xl mx-auto">
              <AnimatedContent distance={40} duration={0.7}>
                <p className="uppercase tracking-[0.3em] text-[10px] sm:text-xs text-white/60 mb-3 sm:mb-4">
                  007 · How we work together
                </p>
                <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight mb-4">
                  Start free.{' '}
                  <GradientText
                    colors={['#ff6a3d', '#7c5cff', '#22d3ee', '#ff6a3d']}
                    animationSpeed={5}
                    className="inline-block"
                  >
                    Scale on proof.
                  </GradientText>
                </h2>
                <p className="text-white/70 text-base sm:text-lg max-w-2xl">
                  Every price is measured against what the manual version already costs you — in salary
                  hours, errors, and slow follow-up.
                </p>
              </AnimatedContent>

              <div className="grid md:grid-cols-3 gap-5 sm:gap-6 mt-10 sm:mt-14">
                {packages.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <AnimatedContent key={p.name} distance={30} direction="vertical" delay={i * 0.1} duration={0.7}>
                      <SpotlightCard
                        className={`h-full p-6! sm:p-8! ${p.featured ? 'border-accent/40!' : ''}`}
                        spotlightColor={ACCENTS[i % 3]}
                      >
                        <div className="flex items-center justify-between mb-5">
                          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-accent">
                            <Icon size={22} strokeWidth={1.5} />
                          </span>
                          {p.featured && (
                            <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-accent text-ink font-semibold">
                              Most popular
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl font-semibold text-paper mb-1">
                          {p.name}
                        </h3>
                        <p className="text-accent text-sm font-medium uppercase tracking-widest mb-4">
                          {p.price}
                        </p>
                        <p className="text-white/65 text-sm leading-relaxed mb-5">{p.blurb}</p>
                        <ul className="space-y-2.5">
                          {p.points.map((pt) => (
                            <li key={pt} className="flex items-start gap-2.5 text-white/75 text-sm">
                              <CheckCircle2 size={16} strokeWidth={1.75} className="mt-0.5 shrink-0 text-accent" />
                              <span className="leading-relaxed">{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </SpotlightCard>
                    </AnimatedContent>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* CTA                                             */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="py-20 sm:py-28 md:py-44 px-5 sm:px-6 relative overflow-hidden">
            <div className="absolute inset-0 -z-0 opacity-40">
              <Aurora
                colorStops={['#ff6a3d', '#7c5cff', '#22d3ee']}
                amplitude={0.8}
                blend={0.4}
                speed={0.5}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/60 to-ink pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <AnimatedContent distance={40} duration={0.7}>
                <h2 className="font-display text-3xl sm:text-6xl font-semibold leading-tight tracking-tight mb-5 sm:mb-6">
                  Let’s find the one workflow{' '}
                  <GradientText
                    colors={['#ff6a3d', '#7c5cff', '#ff6a3d']}
                    animationSpeed={5}
                    className="inline-block"
                  >
                    worth automating first
                  </GradientText>
                  .
                </h2>
                <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-8 sm:mb-12">
                  The consultation is free and the recommendation is yours to keep. Worst case, you
                  walk away knowing exactly where your team’s time is leaking.
                </p>
              </AnimatedContent>

              <AnimatedContent distance={30} direction="vertical" delay={0.2} duration={0.7}>
                <Link
                  to="/free-consultation"
                  className="inline-flex items-center gap-2 rounded-full bg-paper text-ink font-medium px-6 sm:px-10 py-3 sm:py-4 text-sm sm:text-base hover:scale-105 transition-transform"
                >
                  Get a free consultation →
                </Link>

                <div className="mt-10 sm:mt-12">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-paper transition-colors"
                  >
                    <ArrowLeft size={16} strokeWidth={1.5} />
                    Back to Jared Mackay
                  </Link>
                </div>
              </AnimatedContent>
            </div>
          </section>
        </main>

        <footer className="relative z-10 border-t border-white/10 py-6 sm:py-8 px-5 sm:px-6">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] sm:text-xs text-white/40 text-center">
            <p>Custom AI Solutions — AI builds for business, done end-to-end</p>
            <p>© {new Date().getFullYear()} · MMXXVI</p>
          </div>
        </footer>
      </div>
    </ClickSpark>
  );
}
