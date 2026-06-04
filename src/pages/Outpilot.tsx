import { Link } from 'react-router-dom';
import Aurora from '../components/Aurora';
import BlurText from '../components/BlurText';
import AnimatedContent from '../components/AnimatedContent';
import GradientText from '../components/GradientText';
import SpotlightCard from '../components/SpotlightCard';
import ShinyText from '../components/ShinyText';
import ClickSpark from '../components/ClickSpark';
import Navbar from '../components/Navbar';
import {
  ArrowUpRight,
  ArrowLeft,
  Search,
  AtSign,
  PenLine,
  Send,
  MessagesSquare,
  CalendarCheck,
  Workflow,
  Sparkles,
  MessageSquare,
  Repeat,
  Inbox,
  ShieldCheck,
  Scale,
  BarChart3,
  Building2,
  Cpu,
  Users,
  Landmark,
} from 'lucide-react';

const ACCENTS = [
  'rgba(255, 106, 61, 0.35)',
  'rgba(124, 92, 255, 0.35)',
  'rgba(34, 211, 238, 0.35)',
] as const;

const stats = [
  { value: '24/7', label: 'Always running, never off' },
  { value: '100%', label: 'Fully automated pipeline' },
  { value: '1-to-1', label: 'Every email individually written' },
];

const steps = [
  {
    icon: Search,
    title: 'Find Prospects',
    description:
      'Outpilot continuously sources target businesses by industry, geography, and company profile. You define the market; it finds the businesses. No manual list-building or CSV uploads required.',
  },
  {
    icon: AtSign,
    title: 'Resolve a Contact',
    description:
      'For each business, Outpilot identifies a real, deliverable email address for the right person. It verifies the domain can actually receive mail before a single message is sent, keeping your deliverability clean from the start.',
  },
  {
    icon: PenLine,
    title: 'Write Individually',
    description:
      'An AI model writes a unique, individual email for every single prospect — referencing their specific business, not a mail-merge template with swapped-in variables. Every message reads like it was written by a thoughtful human who did their homework.',
  },
  {
    icon: Send,
    title: 'Send & Manage Delivery',
    description:
      'Messages go out through a managed pool of sending inboxes, with built-in daily limits per inbox and full email authentication (SPF, DKIM, DMARC) configured. Deliverability is treated as infrastructure, not an afterthought.',
  },
  {
    icon: MessagesSquare,
    title: 'Handle Every Reply',
    description:
      "When a prospect responds, the AI reads the reply, understands their intent — interest, a question, an objection, or a 'not right now' — and responds appropriately. It also catches replies that arrive off-thread or as auto-responders, which most tools miss entirely.",
  },
  {
    icon: CalendarCheck,
    title: 'Follow Up & Book',
    description:
      'Non-responders receive a short, spaced follow-up sequence before being gracefully closed out. When genuine interest is detected, Outpilot offers a meeting, handles the scheduling exchange, and places a confirmed appointment on your calendar.',
  },
];

const comparisons = [
  {
    title: 'vs. a Sending Tool',
    description:
      'Most outreach tools are sending platforms — they help you fire emails faster, but you still write the copy, manage the lists, handle every reply by hand, and hope someone follows up before the lead goes cold. Outpilot is the entire workflow in one system: it researches, writes, sends, converses, follows up, and books.',
  },
  {
    title: 'vs. Hiring a Sales Rep',
    description:
      'A sales rep personalizes in batches, works 40 hours a week, needs ramp time, and eventually churns. Outpilot personalizes every single message, works 24/7, starts immediately, and costs a fraction of a salary.',
  },
  {
    title: 'vs. Paid Advertising',
    description:
      'Ad spend drives traffic and clicks that you still have to convert. Outpilot reaches named decision-makers directly and produces booked meetings — not impressions — at a fixed, predictable cost per campaign.',
  },
  {
    title: 'vs. Doing It Manually',
    description:
      'Manual outreach degrades fast: copy gets recycled, follow-ups fall through, and volume always loses to other priorities. Outpilot sustains genuine personalization at a volume no individual can match, consistently, without falling behind.',
  },
];

const audiences = [
  {
    icon: Building2,
    title: 'B2B Service Firms',
    description:
      'Agencies, consultants, managed services — anyone whose growth depends on conversations.',
  },
  {
    icon: Cpu,
    title: 'SaaS & Tech',
    description:
      'Outbound prospecting for demos and discovery calls, at scale and without the headcount.',
  },
  {
    icon: Users,
    title: 'Recruiters',
    description:
      'Reach hiring managers and candidates with individually crafted outreach, not spam blasts.',
  },
  {
    icon: Landmark,
    title: 'Financial Services',
    description:
      'Compliant, personalized prospecting for advisors, brokers, and fintech products.',
  },
];

const capabilities = [
  {
    icon: Workflow,
    title: 'End-to-End Automation',
    description:
      'The full outbound cycle runs without human involvement — from sourcing a lead to placing a confirmed meeting on your calendar.',
  },
  {
    icon: Sparkles,
    title: 'True 1-to-1 Personalization',
    description:
      'Every email is individually written by AI for the specific recipient. No templates, no variable-merge fields. Each message is unique.',
  },
  {
    icon: MessageSquare,
    title: 'Conversational AI Replies',
    description:
      "Outpilot doesn't just send and hope. It reads every reply, understands the intent, and carries the conversation forward appropriately.",
  },
  {
    icon: Repeat,
    title: 'Smart Follow-Up Sequences',
    description:
      'Non-responders receive a short, spaced follow-up sequence before being gracefully closed out — no awkward double-sends or silence.',
  },
  {
    icon: Inbox,
    title: 'Multi-Inbox Delivery',
    description:
      'Volume is spread across a managed pool of inboxes, with per-inbox sending limits to maintain healthy deliverability at scale.',
  },
  {
    icon: ShieldCheck,
    title: 'Deliverability Safeguards',
    description:
      'Email addresses are verified before sending. SPF, DKIM, and DMARC are properly configured. Bounces are minimized by design.',
  },
  {
    icon: Scale,
    title: 'Compliance Built In',
    description:
      'Every message includes a physical address and one-click opt-out. Opt-outs are honored automatically. CAN-SPAM compliant by default.',
  },
  {
    icon: BarChart3,
    title: 'Live Tracking & Reporting',
    description:
      'A continuously updated sheet shows every prospect, their current status, and a plain-language summary of where each conversation stands.',
  },
];

const PILOT_MAILTO =
  'mailto:jaredhmackay@gmail.com?subject=Outpilot%20Pilot%20Request&body=I%27d%20like%20to%20run%20a%20pilot%20with%20Outpilot.';

export default function Outpilot() {
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
                <div className="inline-flex items-center gap-2.5 mb-6">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-ink font-display font-bold text-lg">
                    O
                  </span>
                  <span className="font-display text-lg font-semibold tracking-[0.25em] uppercase">
                    Outpilot
                  </span>
                </div>
                <p className="uppercase tracking-[0.3em] text-xs text-white/60 mb-6">
                  AI-Powered Outbound Sales Automation
                </p>
              </AnimatedContent>

              <h1 className="font-display text-[2.75rem] sm:text-7xl md:text-8xl font-semibold leading-[0.95] tracking-tight">
                <BlurText
                  text="Meetings. Booked. Automatically."
                  delay={120}
                  animateBy="words"
                  direction="top"
                  className="justify-center"
                />
              </h1>

              <AnimatedContent distance={30} direction="vertical" delay={0.6} duration={0.8}>
                <p className="mt-6 sm:mt-8 max-w-2xl mx-auto text-white/70 text-sm sm:text-lg leading-relaxed">
                  Outpilot finds your ideal prospects, writes a personalized email for each one,
                  handles their replies in real time, and books qualified meetings on your calendar —
                  with zero manual work from your team.
                </p>
              </AnimatedContent>

              <AnimatedContent distance={30} direction="vertical" delay={0.9} duration={0.8}>
                <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 justify-center">
                  <a
                    href={PILOT_MAILTO}
                    className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-full bg-paper text-ink font-medium hover:scale-105 transition-transform"
                  >
                    Request a Pilot →
                  </a>
                  <a
                    href="#how"
                    className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-full border border-white/20 hover:bg-white/5 transition-colors"
                  >
                    <ShinyText text="See how it works" speed={4} />
                  </a>
                </div>
              </AnimatedContent>

              {/* Stat trio */}
              <div className="mt-14 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 max-w-3xl mx-auto">
                {stats.map((s, i) => (
                  <AnimatedContent key={s.value} distance={40} delay={i * 0.1} duration={0.6}>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5 sm:p-6 text-center">
                      <div className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-paper">
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
          {/* WHAT IS OUTPILOT                                */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="py-20 sm:py-28 md:py-40 px-5 sm:px-6 border-y border-white/10">
            <div className="max-w-4xl mx-auto">
              <AnimatedContent distance={40} direction="vertical" duration={0.7}>
                <p className="uppercase tracking-[0.3em] text-[10px] sm:text-xs text-white/60 mb-3 sm:mb-4">
                  001 · Overview
                </p>
                <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight mb-6">
                  What is{' '}
                  <GradientText
                    colors={['#ff6a3d', '#7c5cff', '#22d3ee', '#ff6a3d']}
                    animationSpeed={5}
                    className="inline-block"
                  >
                    Outpilot
                  </GradientText>
                  ?
                </h2>
                <p className="text-white/70 text-base sm:text-xl leading-relaxed">
                  Outpilot is an end-to-end automated outreach system. It does the work of a full
                  outbound sales rep — finding leads, reaching out individually, managing the
                  back-and-forth, and setting appointments — without the cost, ramp-up, or management
                  that a human rep requires. It runs continuously, around the clock, without supervision.
                </p>
              </AnimatedContent>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* HOW IT WORKS                                    */}
          {/* ═══════════════════════════════════════════════ */}
          <section id="how" className="relative px-5 sm:px-6 py-20 sm:py-28 md:py-44">
            <div className="max-w-6xl mx-auto">
              <AnimatedContent distance={40} direction="vertical" duration={0.7}>
                <p className="uppercase tracking-[0.3em] text-[10px] sm:text-xs text-white/60 mb-3 sm:mb-4">
                  002 · How it works
                </p>
                <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight mb-4">
                  A complete outbound cycle —{' '}
                  <GradientText
                    colors={['#ff6a3d', '#7c5cff', '#22d3ee', '#ff6a3d']}
                    animationSpeed={5}
                    className="inline-block"
                  >
                    start to finish.
                  </GradientText>
                </h2>
                <p className="text-white/70 text-base sm:text-lg max-w-2xl">
                  Six stages run continuously, handing each prospect from discovery all the way to a
                  confirmed meeting.
                </p>
              </AnimatedContent>

              <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 mt-10 sm:mt-14">
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

              <AnimatedContent distance={30} direction="vertical" delay={0.2} duration={0.7}>
                <p className="mt-10 sm:mt-14 text-white/60 text-sm sm:text-base max-w-3xl">
                  <span className="text-accent font-medium">The result:</span> a steady, autonomous
                  pipeline that finds prospects, starts conversations, and fills your calendar — without
                  manual work from your team.
                </p>
              </AnimatedContent>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* WHAT MAKES IT DIFFERENT                         */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="py-20 sm:py-28 md:py-44 px-5 sm:px-6 bg-white/[0.02] border-y border-white/5">
            <div className="max-w-6xl mx-auto">
              <AnimatedContent distance={40} duration={0.7}>
                <p className="uppercase tracking-[0.3em] text-[10px] sm:text-xs text-white/60 mb-3 sm:mb-4">
                  003 · What makes it different
                </p>
                <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight mb-4">
                  Not a sending tool.{' '}
                  <GradientText
                    colors={['#ff6a3d', '#7c5cff', '#22d3ee', '#ff6a3d']}
                    animationSpeed={5}
                    className="inline-block"
                  >
                    The entire workflow.
                  </GradientText>
                </h2>
                <p className="text-white/70 text-base sm:text-lg max-w-2xl">
                  Outpilot researches, writes, sends, converses, follows up, and books — replacing a
                  stack of tools and the manual labor between them.
                </p>
              </AnimatedContent>

              <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 mt-10 sm:mt-14">
                {comparisons.map((c, i) => (
                  <AnimatedContent key={c.title} distance={30} direction="vertical" delay={i * 0.1} duration={0.7}>
                    <SpotlightCard className="h-full p-6! sm:p-8!" spotlightColor={ACCENTS[i % 3]}>
                      <h3 className="font-display text-xl sm:text-2xl font-semibold text-paper mb-3">
                        {c.title}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed">{c.description}</p>
                    </SpotlightCard>
                  </AnimatedContent>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* WHO IT'S FOR                                    */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="py-20 sm:py-28 md:py-44 px-5 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <AnimatedContent distance={40} duration={0.7}>
                <p className="uppercase tracking-[0.3em] text-[10px] sm:text-xs text-white/60 mb-3 sm:mb-4">
                  004 · Who it's for
                </p>
                <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight mb-4">
                  Built for businesses that grow through{' '}
                  <GradientText
                    colors={['#ff6a3d', '#7c5cff', '#22d3ee', '#ff6a3d']}
                    animationSpeed={5}
                    className="inline-block"
                  >
                    direct outreach.
                  </GradientText>
                </h2>
                <p className="text-white/70 text-base sm:text-lg max-w-2xl">
                  Particularly suited to companies selling B2B services, where the right conversation
                  with the right decision-maker is what drives new business. It works equally well on
                  fresh prospect lists or on older, dormant lists that were never fully worked.
                </p>
              </AnimatedContent>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-10 sm:mt-14">
                {audiences.map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <AnimatedContent key={a.title} distance={30} direction="vertical" delay={i * 0.08} duration={0.7}>
                      <SpotlightCard className="h-full p-6! sm:p-7!" spotlightColor={ACCENTS[i % 3]}>
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-accent mb-5">
                          <Icon size={22} strokeWidth={1.5} />
                        </span>
                        <h3 className="font-display text-lg sm:text-xl font-semibold text-paper mb-2">
                          {a.title}
                        </h3>
                        <p className="text-white/65 text-sm leading-relaxed">{a.description}</p>
                      </SpotlightCard>
                    </AnimatedContent>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* KEY CAPABILITIES                                */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="py-20 sm:py-28 md:py-44 px-5 sm:px-6 bg-white/[0.02] border-y border-white/5">
            <div className="max-w-6xl mx-auto">
              <AnimatedContent distance={40} duration={0.7}>
                <p className="uppercase tracking-[0.3em] text-[10px] sm:text-xs text-white/60 mb-3 sm:mb-4">
                  005 · Key capabilities
                </p>
                <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight mb-4">
                  Everything you need.
                </h2>
                <p className="text-white/70 text-base sm:text-lg max-w-2xl">
                  Outpilot is a complete system, not a collection of disconnected point solutions.
                </p>
              </AnimatedContent>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-10 sm:mt-14">
                {capabilities.map((cap, i) => {
                  const Icon = cap.icon;
                  return (
                    <AnimatedContent key={cap.title} distance={30} direction="vertical" delay={i * 0.06} duration={0.6}>
                      <SpotlightCard className="h-full !p-5 sm:!p-6" spotlightColor={ACCENTS[i % 3]}>
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-accent mb-4">
                          <Icon size={20} strokeWidth={1.5} />
                        </span>
                        <h3 className="font-display text-base sm:text-lg font-semibold text-paper mb-2 leading-snug">
                          {cap.title}
                        </h3>
                        <p className="text-white/65 text-sm leading-relaxed">{cap.description}</p>
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
                  Ready to put your outbound on{' '}
                  <GradientText
                    colors={['#ff6a3d', '#7c5cff', '#ff6a3d']}
                    animationSpeed={5}
                    className="inline-block"
                  >
                    autopilot
                  </GradientText>
                  ?
                </h2>
                <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-8 sm:mb-12">
                  Start with a short pilot against your real target market. Measured on the only metric
                  that matters: meetings booked.
                </p>
              </AnimatedContent>

              <AnimatedContent distance={30} direction="vertical" delay={0.2} duration={0.7}>
                <a
                  href={PILOT_MAILTO}
                  className="inline-flex items-center gap-2 rounded-full bg-paper text-ink font-medium px-6 sm:px-10 py-3 sm:py-4 text-sm sm:text-base hover:scale-105 transition-transform"
                >
                  Request a Pilot
                  <ArrowUpRight size={18} strokeWidth={1.75} />
                </a>

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
            <p>Outpilot — AI-Powered Outbound Sales Automation</p>
            <p>© {new Date().getFullYear()} · MMXXVI</p>
          </div>
        </footer>
      </div>
    </ClickSpark>
  );
}
