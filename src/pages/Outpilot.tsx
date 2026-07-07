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
  Database,
  PenLine,
  Send,
  MessagesSquare,
  CalendarCheck,
  FileSpreadsheet,
  Workflow,
  Sparkles,
  MessageSquare,
  Repeat,
  ShoppingBag,
  ShieldCheck,
  BarChart3,
  Users,
} from 'lucide-react';

const ACCENTS = [
  'rgba(255, 106, 61, 0.35)',
  'rgba(124, 92, 255, 0.35)',
  'rgba(34, 211, 238, 0.35)',
] as const;

const stats = [
  { value: '24/7', label: 'Always-on across email & SMS' },
  { value: '1-to-1', label: 'Every message individually written' },
  { value: '$0', label: 'New ad spend to make it work' },
];

const steps = [
  {
    icon: Database,
    title: 'Connect Your Leads',
    description:
      'Bring in the people you already have — old lead lists, abandoned checkouts, giveaway entries, waitlists, form submissions, trade-show contacts, and past customers. Outpilot syncs alongside the tools you already run, like Klaviyo, HubSpot, and Shopify, without disrupting a thing.',
  },
  {
    icon: Search,
    title: 'Segment by Intent',
    description:
      'Outpilot reads each contact and sorts them by where they left off — cart abandoners, dormant buyers, unconverted signups, people who clicked but never purchased. Every list, no matter how old or cold, is scored so the right message goes to the right person.',
  },
  {
    icon: PenLine,
    title: 'Write Individually',
    description:
      'An AI model writes a unique email or text for every single contact — referencing the product they looked at, the offer they entered, or the interest they showed. Not a mail-merge blast with a swapped-in first name. Every message reads like a thoughtful 1-to-1 note, not a broadcast.',
  },
  {
    icon: Send,
    title: 'Reach Out Over Email & SMS',
    description:
      'Messages go out on the channel each person actually answers, through fully authenticated sending (SPF, DKIM, DMARC) with healthy per-inbox limits and one-click opt-out. Deliverability and compliance are treated as infrastructure, not an afterthought.',
  },
  {
    icon: MessagesSquare,
    title: 'Handle Every Reply',
    description:
      "When someone responds, the AI reads the reply and understands the intent — a product question, an objection, a 'send me the link,' or a 'not right now.' It answers in real time, around the clock, so no interested customer is left waiting on a human.",
  },
  {
    icon: ShoppingBag,
    title: 'Guide Back to the Sale',
    description:
      'Once intent is clear, Outpilot points each person to exactly the right next step — the specific product, collection, booking page, or offer — and follows up on a smart, spaced cadence until they convert or gracefully opt out.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Report & Track',
    description:
      'Throughout, Outpilot keeps a live view your team has full access to — every contact, every conversation, and a plain-language summary of exactly where each one stands. You see the revenue being recovered in real time, message by message.',
  },
];

const comparisons = [
  {
    title: 'vs. a Batch Email Blast',
    description:
      'Campaigns and flows send the same message to a whole segment and stop the moment someone replies. Outpilot writes a unique message for each person and actually holds the conversation — answering questions, handling objections, and guiding them to buy. One is a broadcast. Outpilot is a dialogue.',
  },
  {
    title: 'vs. More Ad Spend',
    description:
      'Ads pay to find brand-new strangers and hope they convert. Outpilot recovers revenue from people who already raised their hand — old leads, abandoned carts, past interest — at no new acquisition cost. You already paid to earn these leads; Outpilot cashes them in.',
  },
  {
    title: 'vs. Your Existing Flows',
    description:
      'Abandoned-cart and win-back automations fire a fixed sequence, then go quiet. Outpilot picks up where they stop — reading replies, adapting to each person, and reopening conversations your flows already gave up on. It layers on top of your stack, it does not replace it.',
  },
  {
    title: 'vs. Hiring a Retention Rep',
    description:
      'A rep personalizes in batches, works 40 hours a week, needs ramp time, and eventually churns. Outpilot personalizes every single message across email and SMS, works 24/7, starts immediately, and costs a fraction of a salary.',
  },
];

const audiences = [
  {
    icon: ShoppingBag,
    title: 'E-Commerce & DTC',
    description:
      'Shopify and online brands recovering abandoned checkouts, past customers, and browsers who never bought.',
  },
  {
    icon: Users,
    title: 'Consumer Brands',
    description:
      'Turn giveaway entries, waitlists, and interested-but-unconverted fans into paying customers.',
  },
  {
    icon: Database,
    title: 'Big Lead Lists',
    description:
      'Anyone sitting on old, dormant lists — form fills, trade-show leads, signups — that were never fully worked.',
  },
  {
    icon: CalendarCheck,
    title: 'Service & Appointment',
    description:
      'Clinics, studios, and local businesses re-engaging inquiries and guiding them to the booking page.',
  },
];

const capabilities = [
  {
    icon: Workflow,
    title: 'Works With Your Stack',
    description:
      'Plugs in alongside Klaviyo, HubSpot, Shopify, and the tools you already run. Outpilot adds a reactivation layer — it never asks you to rip anything out.',
  },
  {
    icon: MessageSquare,
    title: 'Email + SMS in One System',
    description:
      'Reach each person on the channel they actually answer, in one coordinated conversation — no juggling separate tools for text and email.',
  },
  {
    icon: Sparkles,
    title: 'True 1-to-1 Personalization',
    description:
      'Every message is individually written by AI for the specific person and what they were interested in. No templates, no merge fields, no blasts.',
  },
  {
    icon: MessagesSquare,
    title: 'Conversational AI Replies',
    description:
      "Outpilot doesn't just send and hope. It reads every reply, answers product questions, handles objections, and keeps the conversation moving toward a sale.",
  },
  {
    icon: ShoppingBag,
    title: 'Guided Path to Purchase',
    description:
      'Every interested contact is routed to the exact right next step — the product, collection, booking page, or offer most likely to convert them.',
  },
  {
    icon: Repeat,
    title: 'Smart Follow-Up',
    description:
      'Quiet contacts get a short, spaced follow-up across email and SMS before being gracefully closed out — persistent, never pushy.',
  },
  {
    icon: ShieldCheck,
    title: 'Deliverability & Compliance',
    description:
      'Verified sends, SPF/DKIM/DMARC, and automatic one-click opt-out. Healthy inboxes and CAN-SPAM / TCPA-friendly by default.',
  },
  {
    icon: BarChart3,
    title: 'Full Conversation Reporting',
    description:
      'Live visibility into every conversation and a plain-language summary of where each one stands — so you can watch recovered revenue add up.',
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
                <div className="flex flex-col items-center gap-3 mb-6">
                  <img
                    src="/outpilot-logo.png"
                    alt="Outpilot logo"
                    className="h-16 w-16 rounded-2xl object-cover border-2 border-white/30 shadow-lg shadow-black/30"
                  />
                  <span className="font-display text-lg font-semibold tracking-[0.25em] uppercase">
                    Outpilot
                  </span>
                </div>
                <p className="uppercase tracking-[0.3em] text-xs text-white/60 mb-6">
                  AI Email &amp; SMS Revenue Recovery
                </p>
              </AnimatedContent>

              <h1 className="font-display text-[2.75rem] sm:text-7xl md:text-8xl font-semibold leading-[0.95] tracking-tight">
                <BlurText
                  text="Lost Revenue. Recovered. Automatically."
                  delay={120}
                  animateBy="words"
                  direction="top"
                  className="justify-center"
                />
              </h1>

              <AnimatedContent distance={30} direction="vertical" delay={0.6} duration={0.8}>
                <p className="mt-6 sm:mt-8 max-w-2xl mx-auto text-white/70 text-sm sm:text-lg leading-relaxed">
                  Outpilot reactivates the leads you already have — old lists, abandoned checkouts,
                  giveaway entries, waitlists, and browsers who never bought — with personalized 1-to-1
                  email and SMS that answers questions, follows up, and guides each person back to the
                  right product or offer.
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
                  Outpilot is an AI-powered email and SMS marketing system that recovers the revenue
                  hiding in leads you already have. It re-engages old and dormant lists, abandoned
                  checkouts, and everyone who showed interest but never bought — holding personalized
                  1-to-1 conversations that answer questions, follow up, and guide people back to the
                  sale. It works alongside Klaviyo, HubSpot, and Shopify, adding a reactivation layer
                  on top of your marketing rather than replacing any of it.
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
                  A complete recovery cycle —{' '}
                  <GradientText
                    colors={['#ff6a3d', '#7c5cff', '#22d3ee', '#ff6a3d']}
                    animationSpeed={5}
                    className="inline-block"
                  >
                    start to finish.
                  </GradientText>
                </h2>
                <p className="text-white/70 text-base sm:text-lg max-w-2xl">
                  Seven stages run continuously, taking every lead you already have from dormant to
                  recovered revenue — with a live report your team can watch in real time.
                </p>
              </AnimatedContent>

              <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 mt-10 sm:mt-14">
                {steps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <AnimatedContent
                      key={step.title}
                      distance={30}
                      direction="vertical"
                      delay={i * 0.1}
                      duration={0.7}
                      className={i === steps.length - 1 && steps.length % 2 === 1 ? 'sm:col-span-2' : ''}
                    >
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
                  engine that turns dormant leads into recovered revenue — without new ad spend or
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
                  Not another blast.{' '}
                  <GradientText
                    colors={['#ff6a3d', '#7c5cff', '#22d3ee', '#ff6a3d']}
                    animationSpeed={5}
                    className="inline-block"
                  >
                    A real conversation.
                  </GradientText>
                </h2>
                <p className="text-white/70 text-base sm:text-lg max-w-2xl">
                  Outpilot writes, sends, converses, follows up, and closes — a personalized
                  reactivation layer that works with your marketing stack instead of competing with it.
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
                  Built for brands sitting on{' '}
                  <GradientText
                    colors={['#ff6a3d', '#7c5cff', '#22d3ee', '#ff6a3d']}
                    animationSpeed={5}
                    className="inline-block"
                  >
                    untapped revenue.
                  </GradientText>
                </h2>
                <p className="text-white/70 text-base sm:text-lg max-w-2xl">
                  If you have a list of people who once showed interest, Outpilot turns it back into
                  revenue. It works best for e-commerce and consumer brands — abandoned checkouts,
                  giveaway entries, waitlists, past customers — and for any business holding old,
                  dormant lists that were never fully worked.
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
                  Everything you need to win them back.
                </h2>
                <p className="text-white/70 text-base sm:text-lg max-w-2xl">
                  Outpilot is a complete revenue recovery system — not a collection of disconnected
                  point solutions bolted onto your stack.
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
                  Recover the revenue you already{' '}
                  <GradientText
                    colors={['#ff6a3d', '#7c5cff', '#ff6a3d']}
                    animationSpeed={5}
                    className="inline-block"
                  >
                    earned
                  </GradientText>
                  .
                </h2>
                <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-8 sm:mb-12">
                  Start with a short pilot on your real lead list — old contacts, abandoned carts, past
                  interest. Measured on the only metric that matters: revenue recovered.
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
            <p>Outpilot — AI Email &amp; SMS Revenue Recovery</p>
            <p>© {new Date().getFullYear()} · MMXXVI</p>
          </div>
        </footer>
      </div>
    </ClickSpark>
  );
}
