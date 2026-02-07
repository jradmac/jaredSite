import BlurText from './components/BlurText';
import Aurora from './components/Aurora';
import ScrollReveal from './components/ScrollReveal';
import FadeContent from './components/FadeContent';
import Dock from './components/Dock';
import GradientText from './components/GradientText';
import PixelCard from './components/PixelCard';
import CountUp from './components/CountUp';
import Magnet from './components/Magnet';
import ShinyText from './components/ShinyText';
import AnimatedContent from './components/AnimatedContent';
import { Briefcase, BookOpen, Mail, ArrowUpRight, Linkedin, Instagram, Layers } from 'lucide-react';

function App() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const dockItems = [
    { icon: <Briefcase size={20} strokeWidth={1.5} />, label: 'Work', onClick: () => scrollTo('work') },
    { icon: <BookOpen size={20} strokeWidth={1.5} />, label: 'Toolkit', onClick: () => scrollTo('toolkit') },
    { icon: <Mail size={20} strokeWidth={1.5} />, label: 'Contact', onClick: () => scrollTo('contact') },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Navigation Dock */}
      <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center">
        <Dock
          items={dockItems}
          baseItemSize={44}
          magnification={62}
          panelHeight={56}
          distance={150}
        />
      </div>

      {/* ═══════════════════════════════════════════════ */}
      {/* HERO                                            */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden px-6 pb-32 md:pb-40">
        <div className="absolute inset-0 opacity-12">
          <Aurora
            colorStops={['#8B7355', '#A0937D', '#6B5B45']}
            amplitude={0.8}
            blend={0.6}
            speed={0.3}
          />
        </div>

        {/* Decorative column lines */}
        <div className="absolute inset-0 flex justify-between px-[10%] pointer-events-none opacity-[0.04]">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-px h-full bg-ink" />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <BlurText
              text="Jared Mackay"
              className="font-mono text-sm md:text-base tracking-wider text-ink-muted uppercase justify-center leading-none"
              delay={80}
              animateBy="words"
              direction="top"
              stepDuration={0.4}
            />
            <FadeContent delay={400} duration={800} blur>
              <span className="font-mono text-sm md:text-base tracking-wider text-ink-muted uppercase whitespace-nowrap">
                / Salt Lake City
              </span>
            </FadeContent>
          </div>

          <div className="w-16 h-px bg-ink/25 mx-auto mb-4" />

          <div className="max-w-2xl mx-auto">
            <FadeContent delay={200} duration={1000} blur>
              <h1 className="font-sans text-3xl md:text-5xl font-black tracking-tight text-ink leading-[1.15]">
                <span className="underline decoration-2 underline-offset-4">Engineers who sell</span> build what customers actually need.
              </h1>
            </FadeContent>
            <FadeContent delay={900} duration={1000} blur>
              <GradientText
                colors={['#6B4C3B', '#8B7355', '#3B5998', '#6B4C3B']}
                animationSpeed={6}
                className="font-sans text-3xl md:text-5xl font-black tracking-tight leading-[1.15]"
              >
                <span className="underline decoration-2 underline-offset-4">Salespeople who build</span> know exactly how to win them.
              </GradientText>
            </FadeContent>
          </div>

          <FadeContent delay={1000} duration={1200}>
            <p className="font-sans text-sm font-medium leading-relaxed text-ink-light max-w-2xl mx-auto mt-10">
              I live at the intersection of building and selling.
              I write the code, architect the demo, run the technical sale, and
              onboard the customer. End to end. No translation layer.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap mt-8">
              {['Full-Stack Engineering', 'Go-To-Market Strategy', 'Technical Sales'].map((tag) => (
                <span
                  key={tag}
                  className="font-sans text-xs font-medium tracking-wider uppercase text-ink-muted border border-rule rounded-full px-5 py-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </FadeContent>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* METRICS                                         */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="py-24 px-6 border-y border-rule">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: 6, suffix: '+', label: 'Years in Sales' },
              { value: 40, suffix: 'M', label: 'Revenue Influenced' },
              { value: 300, suffix: '%', label: 'Pipeline Growth' },
              { value: 3, suffix: '', label: 'Products Built & Launched' },
            ].map((stat, i) => (
              <AnimatedContent key={i} distance={60} delay={i * 0.1} duration={0.6}>
                <div className="text-center">
                  <div className="font-sans text-5xl md:text-6xl font-black tracking-tight text-ink">
                    {stat.label === 'Revenue Influenced' && '$'}
                    <CountUp to={stat.value} duration={2.5} separator="," />
                    <span>{stat.suffix}</span>
                  </div>
                  <p className="font-sans text-sm font-medium tracking-wider uppercase text-ink-muted mt-3">
                    {stat.label}
                  </p>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* WORK — Spotlight Cards                          */}
      {/* ═══════════════════════════════════════════════ */}
      <section id="work" className="py-32 md:py-44 px-6 bg-warm-white">
        <div className="max-w-6xl mx-auto">
          <AnimatedContent distance={40} duration={0.7}>
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-ink-muted mb-6">
              002 / Selected Work
            </p>
            <h2 className="font-sans text-4xl md:text-6xl font-black tracking-tight text-ink leading-[1.1] mb-20">
              Built it. Shipped it. Sold it.
            </h2>
          </AnimatedContent>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <img src="/voleyLogo.png" alt="Voley" className="h-7" />,
                title: 'Voley',
                role: 'Founder & Builder',
                description: 'A communication platform for insurance agencies. Built on deep AMS integration, designed for agency-wide collaboration, and evolving with the latest messaging innovation.',
                tags: ['Active', 'Agencies Onboarded'],
                gradient: ['#6B4C3B', '#8B7355', '#A0937D'],
                href: 'https://letsvoley.com',
              },
              {
                icon: <img src="/index.png" alt="Index CRM" className="h-16 -mt-3" />,
                title: 'Index CRM',
                role: 'Founder & Builder',
                description: 'A cold-calling focused CRM with full pipeline management, streamlined workflows, and intermission games to keep sales reps sharp between answered calls.',
                tags: ['React', 'TypeScript', 'Node.js', 'Sales Tech'],
                gradient: ['#3B5998', '#5B79B8', '#8B9DC3'],
                href: 'https://empathetic-quietude-production.up.railway.app/login',
              },
              {
                icon: <img src="/junzi.png" alt="Junzi" className="h-7" />,
                title: 'Junzi',
                role: 'Founder & Builder',
                description: 'Social media for long-format opinion sharing — cultivating a different kind of mind. One that seeks to understand before it judges, that treats changing its position as growth rather than defeat. Less noise. More intention. A space where thinking well matters more than thinking fast.',
                gradient: ['#4A6741', '#6B8F63', '#8BB383'],
                href: 'https://www.bejunzi.com',
              },
              {
                icon: <Layers size={28} strokeWidth={1.5} />,
                title: 'Analytics Pipeline as a Service',
                role: 'Eng + Revenue',
                description: 'Stream processing handling 500K events/sec with exactly-once semantics. Owned the entire funnel — product spec to signed contract.',
                tags: ['Flink', 'Kafka', 'ClickHouse', 'Pipeline Mgmt'],
                gradient: ['#8B5E3C', '#A07850', '#B89468'],
              },
            ].map((project, i) => {
              const card = (
                <PixelCard
                  className="p-8 md:p-10 h-full group cursor-pointer hover:border-ink-muted/30 transition-colors duration-500"
                  colors={project.gradient.join(',')}
                  gap={6}
                  speed={30}
                >
                  <div className="flex items-start justify-between mb-6 h-8">
                    <div className="text-ink-muted group-hover:text-ink transition-colors duration-300">
                      {project.icon}
                    </div>
                    {'href' in project && project.href ? (
                      <span className="flex items-center gap-1.5 font-mono text-xs font-medium text-ink-muted group-hover:text-ink transition-colors duration-300">
                        {project.title === 'Voley' ? 'letsvoley.com' : project.title === 'Junzi' ? 'bejunzi.com' : 'Try it'} <ArrowUpRight size={16} strokeWidth={1.5} />
                      </span>
                    ) : (
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-ink-muted">
                        <ArrowUpRight size={20} strokeWidth={1.5} />
                      </div>
                    )}
                  </div>

                  <div className="mb-2">
                    <GradientText
                      colors={project.gradient}
                      animationSpeed={8}
                      className="font-sans text-xs font-bold tracking-wider uppercase"
                    >
                      {project.role}
                    </GradientText>
                  </div>

                  <h3 className="font-sans text-2xl md:text-3xl font-bold tracking-tight text-ink mb-4">
                    {project.title}
                  </h3>

                  <p className="font-sans text-base font-medium leading-relaxed text-ink-light">
                    {project.description}
                  </p>
                </PixelCard>
              );
              return (
                <AnimatedContent key={i} distance={80} delay={i * 0.1} duration={0.7}>
                  {'href' in project && project.href ? (
                    <a href={project.href} target="_blank" rel="noopener noreferrer" className="h-full block">{card}</a>
                  ) : card}
                </AnimatedContent>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* QUOTE — ScrollReveal                            */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="py-32 md:py-44 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal
            baseRotation={2}
            enableBlur
            blurStrength={4}
            textClassName="font-sans text-3xl md:text-5xl font-bold text-ink leading-snug tracking-tight"
          >
            The engineer who can sell doesn't just build features — they build revenue. The salesperson who can build doesn't just close deals — they close the right ones.
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* HOW I USE AI                                     */}
      {/* ═══════════════════════════════════════════════ */}
      <section id="ai" className="py-32 md:py-44 px-6 bg-warm-white">
        <div className="max-w-5xl mx-auto">
          <AnimatedContent distance={40} duration={0.7}>
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-ink-muted mb-6">
              003 / AI & Process
            </p>
          </AnimatedContent>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedContent distance={60} delay={0.15} duration={0.7}>
              <PixelCard
                className="p-8 md:p-10 h-full hover:border-ink-muted/30 transition-colors duration-500"
                colors="#6B4C3B,#8B7355,#A0937D"
                gap={6}
                speed={25}
              >
                <h2 className="font-sans text-3xl md:text-4xl font-black tracking-tight text-ink leading-[1.1] mb-8">
                  How I use AI
                </h2>
                <p className="font-sans text-base font-medium leading-relaxed text-ink-light">
                  I use AI to enhance my skills, not own them.
                </p>
                <p className="font-sans text-base font-medium leading-relaxed text-ink-light mt-4">
                  I decide what to build, how the pieces connect, and what the customer
                  actually needs. Then I direct AI to help execute — generating the boilerplate,
                  building out components that would take hours to write from scratch, and
                  turning my architecture into working code faster. I'm the thinker. AI is the assistant.
                </p>
                <p className="font-sans text-base font-medium leading-relaxed text-ink-light mt-4">
                  It's a tool in the workflow, not the workflow itself.
                </p>
              </PixelCard>
            </AnimatedContent>

            <AnimatedContent distance={60} delay={0.3} duration={0.7}>
              <PixelCard
                className="p-8 md:p-10 h-full hover:border-ink-muted/30 transition-colors duration-500"
                colors="#3B5998,#5B79B8,#8B9DC3"
                gap={6}
                speed={25}
              >
                <h2 className="font-sans text-3xl md:text-4xl font-black tracking-tight leading-[1.1] mb-8">
                  <GradientText
                    colors={['#6B4C3B', '#8B7355', '#3B5998', '#6B4C3B']}
                    animationSpeed={6}
                    className="mx-0! justify-start!"
                  >
                    How I Work
                  </GradientText>
                </h2>
                <ul className="space-y-4">
                  {[
                    'Architect the system, then sell the vision to the customer',
                    'Ship fast, demo early, iterate on real feedback',
                    'Own the full loop — from technical decisions to closed deals',
                    'Delegate execution, never judgment or strategy',
                    'Build where stakes are high and shortcuts cost trust',
                  ].map((item) => (
                    <li key={item} className="font-sans text-base font-medium leading-relaxed flex items-start gap-3">
                      <span className="text-ink-muted mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-ink-muted" />
                      <GradientText
                        colors={['#6B4C3B', '#8B7355', '#3B5998', '#6B4C3B']}
                        animationSpeed={6}
                        className="mx-0! justify-start!"
                      >
                        {item}
                      </GradientText>
                    </li>
                  ))}
                </ul>
              </PixelCard>
            </AnimatedContent>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* TOOLKIT                                         */}
      {/* ═══════════════════════════════════════════════ */}
      <section id="toolkit" className="py-32 md:py-44 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatedContent distance={40} duration={0.7}>
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-ink-muted mb-6">
              004 / Toolkit
            </p>
            <h2 className="font-sans text-4xl md:text-6xl font-black tracking-tight text-ink leading-[1.1] mb-8">
              What I read. How I think.
            </h2>
          </AnimatedContent>

          <AnimatedContent distance={40} delay={0.15} duration={0.7}>
            <div className="mb-20">
              <ScrollReveal
                baseRotation={1}
                enableBlur
                blurStrength={2}
                textClassName="font-serif text-2xl md:text-3xl font-medium text-ink-light leading-relaxed italic"
              >
                "The best founders are the ones who can do the technical work and sell the vision." — Marc Andreessen
              </ScrollReveal>
            </div>
          </AnimatedContent>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
              <AnimatedContent key={book.work} distance={50} delay={i * 0.08} duration={0.6}>
                <PixelCard
                  className="p-6 h-full group cursor-pointer hover:border-ink-muted/30 transition-colors duration-500"
                  colors="#d4c4a8,#b8a88a,#8b7355"
                  gap={7}
                  speed={20}
                >
                  <p className="font-mono text-[10px] font-medium tracking-wider uppercase text-ink-muted mb-4">
                    {book.category}
                  </p>
                  <h3 className="font-sans text-lg font-bold tracking-tight text-ink leading-snug">
                    {book.work}
                  </h3>
                  <p className="font-sans text-sm font-medium text-ink-muted mt-2">
                    {book.author}
                  </p>
                </PixelCard>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* ABOUT ME                                        */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="py-32 md:py-44 px-6 bg-warm-white">
        <div className="max-w-5xl mx-auto">
          <AnimatedContent distance={40} duration={0.7}>
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-ink-muted mb-12">
              005 / About Me
            </p>
          </AnimatedContent>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-16">
            <AnimatedContent distance={40} duration={0.7}>
              <img
                src="/headshot.JPG"
                alt="Jared Mackay"
                className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover shrink-0"
              />
            </AnimatedContent>
            <AnimatedContent distance={40} delay={0.15} duration={0.7}>
              <div>
                <h2 className="font-sans text-3xl md:text-4xl font-black tracking-tight text-ink leading-[1.1] mb-6">
                  A little more about me.
                </h2>
                <p className="font-sans text-lg font-medium leading-relaxed text-ink-light mb-4">
                  Originally from Paradise, California. I've spent my career across a range of
                  tech sales roles — from enterprise to early-stage — and have built and launched
                  my own startups along the way.
                </p>
                <p className="font-sans text-lg font-medium leading-relaxed text-ink-light mb-4">
                  Outside of work, I'm usually reading, traveling, or doing both at the same time.
                  I'm fluent in both Portuguese and English.
                </p>
              </div>
            </AnimatedContent>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedContent distance={60} delay={0.15} duration={0.7}>
              <PixelCard
                className="p-8 md:p-10 h-full hover:border-ink-muted/30 transition-colors duration-500 flex flex-col items-center"
                colors="#6B4C3B,#8B7355,#A0937D"
                gap={6}
                speed={25}
              >
                <h3 className="font-sans text-lg md:text-xl font-black tracking-wider uppercase mb-6 text-center">
                  <GradientText colors={['#6B4C3B', '#8B7355', '#A0937D', '#6B4C3B']} animationSpeed={6}>Skills & Languages</GradientText>
                </h3>
                <ul className="w-full">
                  {['TypeScript', 'JavaScript', 'Python', 'React', 'Expo', 'Node.js', 'PostgreSQL', 'AWS', 'HTML/CSS', 'REST APIs', 'Git'].map((skill, i, arr) => (
                    <li key={skill} className={`py-3 text-center font-sans text-base font-medium text-ink-light ${i < arr.length - 1 ? 'border-b border-rule/50' : ''}`}>
                      {skill}
                    </li>
                  ))}
                </ul>
              </PixelCard>
            </AnimatedContent>
            <AnimatedContent distance={60} delay={0.3} duration={0.7}>
              <PixelCard
                className="p-8 md:p-10 h-full hover:border-ink-muted/30 transition-colors duration-500 flex flex-col items-center"
                colors="#3B5998,#5B79B8,#8B9DC3"
                gap={6}
                speed={25}
              >
                <h3 className="font-sans text-lg md:text-xl font-black tracking-wider uppercase mb-6 text-center">
                  <GradientText colors={['#3B5998', '#5B79B8', '#8B9DC3', '#3B5998']} animationSpeed={6}>Sales & GTM</GradientText>
                </h3>
                <ul className="w-full">
                  {['Technical Sales', 'Solution Engineering', 'Go-To-Market Strategy', 'Pipeline Management', 'Enterprise Demos', 'Cold Calling', 'Discovery & Qualification', 'Negotiation', 'Customer Success', 'CRM & Sales Ops'].map((skill, i, arr) => (
                    <li key={skill} className={`py-3 text-center font-sans text-base font-medium text-ink-light ${i < arr.length - 1 ? 'border-b border-rule/50' : ''}`}>
                      {skill}
                    </li>
                  ))}
                </ul>
              </PixelCard>
            </AnimatedContent>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* CONTACT                                         */}
      {/* ═══════════════════════════════════════════════ */}
      <section id="contact" className="py-32 md:py-44 px-6 bg-ink text-parchment">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedContent distance={40} duration={0.7}>
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-parchment/50 mb-6">
              006 / Contact
            </p>
            <h2 className="font-sans text-4xl md:text-6xl font-black tracking-tight text-parchment leading-[1.1] mb-8">
              Let's close something.
            </h2>
            <p className="font-sans text-lg font-medium text-parchment/60 max-w-xl mx-auto mb-16">
              Whether you need someone to build the product, sell it, or both —
              I'm interested in the conversation.
            </p>
          </AnimatedContent>

          <AnimatedContent distance={40} delay={0.2} duration={0.7}>
            <a
              href="mailto:jaredhmackay@gmail.com"
              className="inline-block font-sans text-lg font-bold tracking-wide text-parchment border-2 border-parchment/30 rounded-full px-12 py-5 hover:bg-parchment hover:text-ink transition-all duration-500"
            >
              <ShinyText
                text="jaredhmackay@gmail.com"
                color="#FAF8F5"
                shineColor="#ffffff"
                speed={4}
                className="font-sans text-lg font-bold"
              />
            </a>

            <div className="flex items-center justify-center gap-10 mt-16">
              {[
                { icon: <Linkedin size={22} strokeWidth={1.5} />, label: 'LinkedIn', href: 'https://www.linkedin.com/feed/' },
                { icon: <Instagram size={22} strokeWidth={1.5} />, label: 'Instagram', href: 'https://www.instagram.com/jaredmkay/' },
              ].map((social) => (
                <Magnet key={social.label} padding={60} magnetStrength={4}>
                  <a
                    href={social.href}
                    className="flex items-center gap-3 font-sans text-sm font-medium text-parchment/50 hover:text-parchment transition-colors duration-300"
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

      {/* ═══════════════════════════════════════════════ */}
      {/* FOOTER                                          */}
      {/* ═══════════════════════════════════════════════ */}
      <footer className="py-10 pb-24 px-6 bg-ink border-t border-parchment/10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <p className="font-mono text-xs text-parchment/30">
            Built and sold with intent.
          </p>
          <p className="font-mono text-xs text-parchment/30">
            MMXXVI
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
