import BlurText from './components/BlurText';
import Aurora from './components/Aurora';
import ScrollReveal from './components/ScrollReveal';
import GradientText from './components/GradientText';
import SpotlightCard from './components/SpotlightCard';
import CountUp from './components/CountUp';
import Magnet from './components/Magnet';
import ShinyText from './components/ShinyText';
import AnimatedContent from './components/AnimatedContent';
import RotatingText from './components/RotatingText';
import ClickSpark from './components/ClickSpark';
import Navbar from './components/Navbar';
import { ArrowUpRight, Linkedin, Instagram, Layers, Feather, GraduationCap } from 'lucide-react';

function App() {
  return (
    <ClickSpark sparkColor="#ff6a3d" sparkRadius={16} sparkCount={8} duration={500}>
      <div className="noise relative min-h-screen overflow-x-hidden bg-ink text-paper">
        <Navbar />

        <main className="relative z-10">
          {/* ═══════════════════════════════════════════════ */}
          {/* HERO                                            */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-5 sm:px-6 pt-24 pb-16">
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
                <p className="uppercase tracking-[0.3em] text-xs text-white/60 mb-6">
                  Salt Lake City · Engineer & Operator
                </p>
              </AnimatedContent>

              <h1 className="font-display text-[2.75rem] sm:text-7xl md:text-8xl font-semibold leading-[0.95] tracking-tight">
                <BlurText
                  text="Hi, I'm Jared."
                  delay={120}
                  animateBy="words"
                  direction="top"
                  className="justify-center"
                />
              </h1>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:gap-3 text-xl sm:text-3xl md:text-4xl font-display px-2">
                <span className="text-white/70">I</span>
                <RotatingText
                  texts={['build', 'sell', 'ship', 'close']}
                  rotationInterval={2200}
                  mainClassName="px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg bg-accent text-ink font-semibold"
                  splitLevelClassName="overflow-hidden"
                />
                <span className="text-white/70">what customers need.</span>
              </div>

              <AnimatedContent distance={30} direction="vertical" delay={0.6} duration={0.8}>
                <p className="mt-6 sm:mt-8 max-w-xl mx-auto text-white/70 text-sm sm:text-lg leading-relaxed">
                  I live at the intersection of building and selling. I write the code, architect the demo,
                  run the technical sale, and onboard the customer — end to end, no translation layer.
                </p>
              </AnimatedContent>

              <AnimatedContent distance={30} direction="vertical" delay={0.9} duration={0.8}>
                <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 justify-center">
                  <a
                    href="#work"
                    className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-full bg-paper text-ink font-medium hover:scale-105 transition-transform"
                  >
                    View work
                  </a>
                  <a
                    href="#contact"
                    className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-full border border-white/20 hover:bg-white/5 transition-colors"
                  >
                    <ShinyText text="Get in touch →" speed={4} />
                  </a>
                  <a
                    href="/resume"
                    className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-full border border-white/20 hover:bg-white/5 transition-colors"
                  >
                    Resume
                  </a>
                </div>
              </AnimatedContent>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* METRICS                                         */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="py-16 sm:py-24 md:py-28 px-5 sm:px-6 border-y border-white/10">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
                {[
                  { value: 6, suffix: '+', label: 'Years in Sales' },
                  { value: 40, prefix: '$', suffix: 'M', label: 'Revenue Influenced' },
                  { value: 300, suffix: '%', label: 'Pipeline Growth' },
                  { value: 3, suffix: '', label: 'Products Launched' },
                ].map((stat, i) => (
                  <AnimatedContent key={i} distance={60} delay={i * 0.1} duration={0.6}>
                    <div className="text-center">
                      <div className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-paper">
                        {stat.prefix}
                        <CountUp to={stat.value} duration={2.5} separator="," />
                        <span>{stat.suffix}</span>
                      </div>
                      <p className="text-[10px] sm:text-xs font-medium tracking-widest uppercase text-white/50 mt-2 sm:mt-3">
                        {stat.label}
                      </p>
                    </div>
                  </AnimatedContent>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* WORK                                            */}
          {/* ═══════════════════════════════════════════════ */}
          <section id="work" className="relative px-5 sm:px-6 py-20 sm:py-28 md:py-44">
            <div className="max-w-6xl mx-auto">
              <AnimatedContent distance={40} direction="vertical" duration={0.7}>
                <p className="uppercase tracking-[0.3em] text-[10px] sm:text-xs text-white/60 mb-3 sm:mb-4">
                  002 · Selected work
                </p>
                <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight mb-4">
                  Built it.{' '}
                  <GradientText
                    colors={['#ff6a3d', '#7c5cff', '#22d3ee', '#ff6a3d']}
                    animationSpeed={5}
                    className="inline-block"
                  >
                    Shipped it.
                  </GradientText>{' '}
                  Sold it.
                </h2>
                <p className="text-white/70 text-base sm:text-lg max-w-2xl">
                  A selection of products I've designed, built, and taken to market end-to-end.
                </p>
              </AnimatedContent>

              <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 mt-10 sm:mt-14">
                {[
                  {
                    icon: <img src="/voleyLogo.png" alt="Voley" className="h-7" />,
                    title: 'Voley',
                    role: 'Founder & Builder',
                    description:
                      'A communication platform for insurance agencies. Deep AMS integration, agency-wide collaboration, evolving with the latest in messaging.',
                    tags: ['Active'],
                    spotlight: 'rgba(255, 106, 61, 0.35)' as const,
                    href: 'https://letsvoley.com',
                    cta: 'letsvoley.com',
                  },
                  {
                    icon: <img src="/index.png" alt="Index CRM" className="h-14 -mt-2" />,
                    title: 'Index CRM',
                    role: 'Founder & Builder',
                    description:
                      'A cold-calling CRM with full pipeline management, streamlined workflows, and intermission games to keep reps sharp.',
                    tags: ['React', 'TypeScript', 'Node.js'],
                    spotlight: 'rgba(124, 92, 255, 0.35)' as const,
                    href: 'https://empathetic-quietude-production.up.railway.app/login',
                    cta: 'Try it',
                  },
                  {
                    icon: <Feather size={28} strokeWidth={1.5} className="text-white/70" />,
                    title: 'Junzi',
                    role: 'Founder & Builder',
                    description:
                      'Social media for long-format opinion sharing. A space where thinking well matters more than thinking fast.',
                    tags: ['Social'],
                    spotlight: 'rgba(34, 211, 238, 0.35)' as const,
                    href: 'https://www.bejunzi.com',
                    cta: 'bejunzi.com',
                  },
                  {
                    icon: <GraduationCap size={28} strokeWidth={1.5} className="text-white/70" />,
                    title: '4 Tomorrow',
                    role: 'Founder · Nonprofit',
                    description:
                      'An AI-powered supplemental learning tool for underserved communities. Deploys on existing computers and teaches reading, writing, English, and entrepreneurship — adapting to each child in real time.',
                    tags: ['Nonprofit', 'AI'],
                    spotlight: 'rgba(124, 92, 255, 0.35)' as const,
                    href: 'https://www.4tommorrow.org/',
                    cta: '4tommorrow.org',
                  },
                  {
                    icon: <Layers size={28} strokeWidth={1.5} className="text-white/70" />,
                    title: 'Analytics Pipeline',
                    role: 'Eng + Revenue',
                    description:
                      'Stream processing handling 500K events/sec with exactly-once semantics. Owned product spec to signed contract.',
                    tags: ['Flink', 'Kafka', 'ClickHouse'],
                    spotlight: 'rgba(255, 106, 61, 0.35)' as const,
                  },
                ].map((project, i) => {
                  const card = (
                    <SpotlightCard
                      className="h-full group cursor-pointer hover:border-white/20 transition-colors p-6! sm:p-8!"
                      spotlightColor={project.spotlight}
                    >
                      <div className="flex items-start justify-between mb-5 sm:mb-6 h-10">
                        <div className="shrink-0">{project.icon}</div>
                        {'href' in project && project.href ? (
                          <span className="flex items-center gap-1.5 text-xs font-medium text-white/60 group-hover:text-paper transition-colors">
                            {project.cta} <ArrowUpRight size={14} strokeWidth={1.5} />
                          </span>
                        ) : (
                          <ArrowUpRight
                            size={20}
                            strokeWidth={1.5}
                            className="opacity-0 group-hover:opacity-60 transition-opacity text-white/60"
                          />
                        )}
                      </div>

                      <p className="text-[10px] uppercase tracking-widest font-medium text-accent mb-3">
                        {project.role}
                      </p>

                      <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-paper mb-3">
                        {project.title}
                      </h3>

                      <p className="text-white/70 text-sm leading-relaxed mb-5">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </SpotlightCard>
                  );
                  return (
                    <AnimatedContent key={i} distance={30} direction="vertical" delay={i * 0.1} duration={0.7}>
                      {'href' in project && project.href ? (
                        <a href={project.href} target="_blank" rel="noopener noreferrer" className="h-full block">
                          {card}
                        </a>
                      ) : (
                        card
                      )}
                    </AnimatedContent>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* EXPERIENCE                                      */}
          {/* ═══════════════════════════════════════════════ */}
          <section id="experience" className="relative px-5 sm:px-6 py-20 sm:py-28 md:py-40">
            <div className="max-w-6xl mx-auto">
              <AnimatedContent distance={40} direction="vertical" duration={0.7}>
                <p className="uppercase tracking-[0.3em] text-[10px] sm:text-xs text-white/60 mb-3 sm:mb-4">
                  003 · Experience
                </p>
                <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight mb-4">
                  Before the products,{' '}
                  <GradientText
                    colors={['#ff6a3d', '#7c5cff', '#22d3ee', '#ff6a3d']}
                    animationSpeed={5}
                    className="inline-block"
                  >
                    the reps.
                  </GradientText>
                </h2>
                <p className="text-white/70 text-base sm:text-lg max-w-2xl">
                  Years of carrying a quota taught me how to listen, how to close, and how to lead a team through both.
                </p>
              </AnimatedContent>

              <div className="mt-10 sm:mt-14">
                <p className="text-[10px] uppercase tracking-widest text-accent mb-4 sm:mb-5">Sales</p>
                <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                  {[
                    {
                      title: 'Sunrun',
                      role: 'Top Sales Rep → Sales Manager',
                      meta: '2023 · Honolulu, HI',
                      description:
                        '#1 sales rep company-wide in 2023, then promoted to Sales Manager. Led multi-state teams of 18–30 year olds — built trainings, set goals, organized housing, travel, and food, analyzed territory data for market trends, and negotiated win-win customer contracts.',
                      spotlight: 'rgba(255, 106, 61, 0.35)' as const,
                    },
                    {
                      title: 'Estella Rose',
                      role: 'Luxury Jewelry · Phone Sales',
                      meta: 'High-Ticket',
                      description:
                        'Closed $10K–$25K luxury jewelry pieces entirely over the phone. No product in hand — every deal built on voice, trust, and timing.',
                      spotlight: 'rgba(124, 92, 255, 0.35)' as const,
                    },
                  ].map((job, i) => (
                    <AnimatedContent key={job.title} distance={30} direction="vertical" delay={i * 0.1} duration={0.7}>
                      <SpotlightCard className="h-full p-6! sm:p-8!" spotlightColor={job.spotlight}>
                        <p className="text-[10px] uppercase tracking-widest font-medium text-accent mb-3">
                          {job.role}
                        </p>
                        <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-paper mb-2">
                          {job.title}
                        </h3>
                        <p className="text-[11px] text-white/50 mb-4 uppercase tracking-widest">{job.meta}</p>
                        <p className="text-white/70 text-sm leading-relaxed">{job.description}</p>
                      </SpotlightCard>
                    </AnimatedContent>
                  ))}
                </div>
              </div>

              <div className="mt-12 sm:mt-16">
                <p className="text-[10px] uppercase tracking-widest text-accent mb-4 sm:mb-5">Other work & service</p>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                  {[
                    {
                      title: 'Active Event Technology',
                      role: 'Technical Support',
                      meta: 'Nov 2022 – Dec 2023 · San Francisco, CA',
                      description:
                        'Installed and networked devices and security software for large-scale concerts at the AT&T Center.',
                    },
                    {
                      title: 'BYU',
                      role: 'Secretary',
                      meta: 'Oct 2022 – Apr 2023 · Provo, UT',
                      description:
                        'Coordinated meetings, faculty travel, and student inquiries across departments — the operations layer behind the academic day.',
                    },
                    {
                      title: 'Men of Culture',
                      role: 'President',
                      meta: 'Jan 2023 – Present · Salt Lake City, UT',
                      description:
                        "Lead a men's club focused on personal growth and intellectual development. Organize events and speak on health and wellness.",
                    },
                    {
                      title: 'Church of Jesus Christ of Latter-Day Saints',
                      role: 'Volunteer Representative',
                      meta: 'Belem, Brazil',
                      description:
                        'Two years of full-time volunteer service in northern Brazil. Where I picked up Portuguese and learned that trust is built in patience.',
                    },
                  ].map((job, i) => (
                    <AnimatedContent key={job.title} distance={20} direction="vertical" delay={i * 0.05} duration={0.6}>
                      <SpotlightCard className="h-full !p-5 sm:!p-6" spotlightColor="rgba(34, 211, 238, 0.25)">
                        <p className="text-[10px] uppercase tracking-widest font-medium text-accent mb-2">
                          {job.role}
                        </p>
                        <h4 className="font-display text-lg sm:text-xl font-semibold text-paper mb-1">
                          {job.title}
                        </h4>
                        <p className="text-[11px] text-white/50 mb-3 uppercase tracking-widest">{job.meta}</p>
                        <p className="text-white/65 text-sm leading-relaxed">{job.description}</p>
                      </SpotlightCard>
                    </AnimatedContent>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* QUOTE                                           */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="py-20 sm:py-28 md:py-40 px-5 sm:px-6 bg-white/[0.02] border-y border-white/5">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal
                baseRotation={2}
                enableBlur
                blurStrength={4}
                textClassName="font-display text-xl sm:text-3xl md:text-5xl font-semibold text-paper leading-snug tracking-tight"
              >
                The engineer who can sell doesn't just build features — they build revenue. The salesperson who can build doesn't just close deals — they close the right ones.
              </ScrollReveal>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* HOW I USE AI                                    */}
          {/* ═══════════════════════════════════════════════ */}
          <section id="ai" className="py-20 sm:py-28 md:py-44 px-5 sm:px-6">
            <div className="max-w-5xl mx-auto">
              <AnimatedContent distance={40} duration={0.7}>
                <p className="uppercase tracking-[0.3em] text-[10px] sm:text-xs text-white/60 mb-3 sm:mb-4">
                  004 · AI & Process
                </p>
                <h2 className="font-display text-3xl sm:text-5xl font-semibold leading-tight tracking-tight mb-10 sm:mb-14">
                  How I work with{' '}
                  <GradientText
                    colors={['#ff6a3d', '#7c5cff', '#22d3ee', '#ff6a3d']}
                    animationSpeed={5}
                    className="inline-block"
                  >
                    the tools
                  </GradientText>
                  .
                </h2>
              </AnimatedContent>

              <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
                <AnimatedContent distance={30} direction="vertical" delay={0.15} duration={0.7}>
                  <SpotlightCard className="h-full p-6! sm:p-8!" spotlightColor="rgba(255, 106, 61, 0.3)">
                    <h3 className="font-display text-xl sm:text-2xl font-semibold text-paper mb-4">How I use AI</h3>
                    <p className="text-white/70 leading-relaxed mb-3">
                      I use AI to enhance my skills, not own them.
                    </p>
                    <p className="text-white/70 leading-relaxed mb-3">
                      I decide what to build, how the pieces connect, and what the customer actually needs.
                      Then I direct AI to help execute — generating boilerplate, building components that
                      would take hours to write from scratch, and turning my architecture into working code faster.
                    </p>
                    <p className="text-white/70 leading-relaxed">
                      I'm the thinker. AI is the assistant. It's a tool in the workflow, not the workflow itself.
                    </p>
                  </SpotlightCard>
                </AnimatedContent>

                <AnimatedContent distance={30} direction="vertical" delay={0.3} duration={0.7}>
                  <SpotlightCard className="h-full p-6! sm:p-8!" spotlightColor="rgba(124, 92, 255, 0.3)">
                    <h3 className="font-display text-xl sm:text-2xl font-semibold text-paper mb-4">How I work</h3>
                    <ul className="space-y-3">
                      {[
                        'Architect the system, then sell the vision to the customer',
                        'Ship fast, demo early, iterate on real feedback',
                        'Own the full loop — from technical decisions to closed deals',
                        'Delegate execution, never judgment or strategy',
                        'Build where stakes are high and shortcuts cost trust',
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3 text-white/70">
                          <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </SpotlightCard>
                </AnimatedContent>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* TOOLKIT                                         */}
          {/* ═══════════════════════════════════════════════ */}
          <section id="toolkit" className="py-20 sm:py-28 md:py-44 px-5 sm:px-6 bg-white/[0.02] border-y border-white/5">
            <div className="max-w-5xl mx-auto">
              <AnimatedContent distance={40} duration={0.7}>
                <p className="uppercase tracking-[0.3em] text-[10px] sm:text-xs text-white/60 mb-3 sm:mb-4">
                  005 · Toolkit
                </p>
                <h2 className="font-display text-3xl sm:text-5xl font-semibold leading-tight tracking-tight mb-6">
                  What I read. How I think.
                </h2>
              </AnimatedContent>

              <AnimatedContent distance={40} delay={0.15} duration={0.7}>
                <div className="mb-10 sm:mb-16 max-w-3xl">
                  <ScrollReveal
                    baseRotation={1}
                    enableBlur
                    blurStrength={2}
                    textClassName="text-base sm:text-xl md:text-2xl font-medium text-white/60 leading-relaxed italic"
                  >
                    "The best founders are the ones who can do the technical work and sell the vision." — Marc Andreessen
                  </ScrollReveal>
                </div>
              </AnimatedContent>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { author: 'Plato', work: 'The Republic', category: 'Philosophy' },
                  { author: 'Plato', work: 'Symposium', category: 'Philosophy' },
                  { author: 'Confucius', work: 'The Analects', category: 'Philosophy' },
                  { author: 'Epictetus', work: 'The Discourses', category: 'Stoicism' },
                  { author: 'Nathan Furr & Paul Ahlstrom', work: 'Nail It Then Scale It', category: 'Startups' },
                  { author: 'Og Mandino', work: 'The Greatest Salesman in the World', category: 'Sales' },
                  { author: 'James Allen', work: 'As a Man Thinketh', category: 'Mindset' },
                  { author: 'Martin Fowler', work: 'Patterns of Enterprise Application Architecture', category: 'Engineering' },
                  { author: 'Various', work: 'Software as a Science', category: 'Engineering' },
                ].map((book, i) => (
                  <AnimatedContent key={book.work} distance={30} direction="vertical" delay={i * 0.05} duration={0.6}>
                    <SpotlightCard
                      className="h-full !p-5"
                      spotlightColor="rgba(255, 106, 61, 0.25)"
                    >
                      <p className="text-[10px] uppercase tracking-widest text-accent mb-3">
                        {book.category}
                      </p>
                      <h3 className="font-display text-lg font-semibold text-paper leading-snug mb-2">
                        {book.work}
                      </h3>
                      <p className="text-sm text-white/50">{book.author}</p>
                    </SpotlightCard>
                  </AnimatedContent>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* ABOUT                                           */}
          {/* ═══════════════════════════════════════════════ */}
          <section id="about" className="py-20 sm:py-28 md:py-44 px-5 sm:px-6">
            <div className="max-w-5xl mx-auto">
              <AnimatedContent distance={40} duration={0.7}>
                <p className="uppercase tracking-[0.3em] text-[10px] sm:text-xs text-white/60 mb-3 sm:mb-4">
                  006 · About
                </p>
                <h2 className="font-display text-3xl sm:text-5xl font-semibold leading-tight tracking-tight mb-8 sm:mb-12">
                  A little more about me.
                </h2>
              </AnimatedContent>

              <div className="grid md:grid-cols-[280px_1fr] gap-8 md:gap-10 items-start">
                <AnimatedContent distance={30} direction="horizontal" reverse duration={0.8}>
                  <div className="relative max-w-[260px] mx-auto md:max-w-none md:mx-0">
                    <div className="aspect-[3/4] rounded-3xl overflow-hidden border border-white/10">
                      <img src="/headshot.JPG" alt="Jared Mackay" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -inset-3 rounded-3xl bg-accent/20 blur-2xl -z-10" />
                  </div>
                </AnimatedContent>

                <AnimatedContent distance={30} direction="horizontal" duration={0.8}>
                  <div className="space-y-4 sm:space-y-5 text-white/80 text-base sm:text-lg leading-relaxed">
                    <p>
                      I'm <span className="text-paper font-medium">Jared</span> — originally from
                      Paradise, California, now based in Salt Lake City. I've spent my career across
                      a range of tech sales roles, from enterprise to early-stage, and have built
                      and launched my own startups along the way.
                    </p>
                    <p>
                      Outside of work, I'm usually reading, traveling, or doing both at the same time.
                      I'm fluent in Portuguese and English.
                    </p>

                    <dl className="grid grid-cols-2 gap-3 pt-4">
                      {[
                        { label: 'Based in', value: 'Salt Lake City' },
                        { label: 'From', value: 'Paradise, CA' },
                        { label: 'Languages', value: 'EN / PT' },
                        { label: 'Focus', value: 'Build + Sell' },
                      ].map((f) => (
                        <div key={f.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                          <dt className="text-xs uppercase tracking-wider text-white/50">{f.label}</dt>
                          <dd className="text-paper font-medium mt-1">{f.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </AnimatedContent>
              </div>

              <div className="mt-14 sm:mt-20">
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-paper mb-5 sm:mb-6">Skills & toolkit</h3>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {[
                    'TypeScript',
                    'React',
                    'Node.js',
                    'Python',
                    'PostgreSQL',
                    'AWS',
                    'Technical Sales',
                    'Solution Engineering',
                    'Go-To-Market Strategy',
                    'Pipeline Management',
                    'Enterprise Demos',
                    'Negotiation',
                  ].map((skill, i) => (
                    <AnimatedContent key={skill} distance={20} direction="vertical" delay={i * 0.05} duration={0.6}>
                      <SpotlightCard className="h-full !p-4" spotlightColor="rgba(124, 92, 255, 0.3)">
                        <p className="text-paper font-medium text-sm">{skill}</p>
                      </SpotlightCard>
                    </AnimatedContent>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* CONTACT                                         */}
          {/* ═══════════════════════════════════════════════ */}
          <section id="contact" className="py-20 sm:py-28 md:py-44 px-5 sm:px-6 relative overflow-hidden">
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
                <p className="uppercase tracking-[0.3em] text-[10px] sm:text-xs text-white/60 mb-3 sm:mb-4">
                  007 · Contact
                </p>
                <h2 className="font-display text-3xl sm:text-6xl font-semibold leading-tight tracking-tight mb-5 sm:mb-6">
                  Let's{' '}
                  <GradientText
                    colors={['#ff6a3d', '#7c5cff', '#ff6a3d']}
                    animationSpeed={5}
                    className="inline-block"
                  >
                    close something
                  </GradientText>
                  .
                </h2>
                <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-8 sm:mb-12">
                  Whether you need someone to build the product, sell it, or both — I'm interested in
                  the conversation.
                </p>
              </AnimatedContent>

              <AnimatedContent distance={30} direction="vertical" delay={0.2} duration={0.7}>
                <a
                  href="mailto:jaredhmackay@gmail.com"
                  className="inline-block rounded-full bg-paper text-ink font-medium px-5 sm:px-10 py-3 sm:py-4 text-sm sm:text-base hover:scale-105 transition-transform max-w-full break-all"
                >
                  <ShinyText text="jaredhmackay@gmail.com" speed={4} className="text-ink font-medium" />
                </a>

                <div className="flex items-center justify-center gap-8 sm:gap-10 mt-10 sm:mt-12">
                  {[
                    { icon: <Linkedin size={22} strokeWidth={1.5} />, label: 'LinkedIn', href: 'https://www.linkedin.com/feed/' },
                    { icon: <Instagram size={22} strokeWidth={1.5} />, label: 'Instagram', href: 'https://www.instagram.com/jaredmkay/' },
                  ].map((social) => (
                    <Magnet key={social.label} padding={60} magnetStrength={4}>
                      <a
                        href={social.href}
                        className="flex items-center gap-2 text-sm text-white/60 hover:text-paper transition-colors"
                      >
                        {social.icon}
                        <span>{social.label}</span>
                      </a>
                    </Magnet>
                  ))}
                </div>
              </AnimatedContent>
            </div>
          </section>
        </main>

        <footer className="relative z-10 border-t border-white/10 py-6 sm:py-8 px-5 sm:px-6">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] sm:text-xs text-white/40 text-center">
            <p>Built and sold with intent.</p>
            <div className="flex items-center gap-4">
              <a href="/admin/login" className="hover:text-white/70 transition-colors">Admin</a>
              <p>© {new Date().getFullYear()} · MMXXVI</p>
            </div>
          </div>
        </footer>
      </div>
    </ClickSpark>
  );
}

export default App;
