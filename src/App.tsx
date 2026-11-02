import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

import Navbar from './components/Navbar';
import Field from './site/Field';
import Preloader from './site/Preloader';
import Cursor from './site/Cursor';
import Marquee from './site/Marquee';
import LocalTime from './site/LocalTime';
import {
  projects,
  metrics,
  salesJobs,
  otherWork,
  principles,
  books,
  facts,
  engineeringSkills,
  sellingSkills,
  quote,
} from './site/data';
import './site/site.css';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/** Splits a string into masked characters for the big type moments. */
function Chars({ text, className = 'char' }: { text: string; className?: string }) {
  return (
    <>
      {text.split(' ').map((word, wi, arr) => (
        <span key={wi}>
          <span className="word-keep">
            {word.split('').map((c, ci) => (
              <span key={ci} className="char-mask">
                <span className={className}>{c}</span>
              </span>
            ))}
          </span>
          {wi < arr.length - 1 ? ' ' : null}
        </span>
      ))}
    </>
  );
}

function App() {
  const location = useLocation();
  const rootRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<gsap.core.Timeline | null>(null);
  const [introDone, setIntroDone] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);

  // Support scrolling to a section after navigating home from another page
  useEffect(() => {
    const scrollTo = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (scrollTo) {
      setTimeout(() => {
        document.getElementById(scrollTo)?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    }
  }, [location]);

  // Split text only once the real fonts are in, so line breaks are correct.
  useEffect(() => {
    let cancelled = false;
    const done = () => !cancelled && setFontsReady(true);
    const timer = window.setTimeout(done, 2500);
    document.fonts?.ready.then(done).catch(done);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  useGSAP(
    () => {
      if (!fontsReady) return;
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        document.documentElement.classList.add('is-motion');

        /* ── Hero: letters rise out of the dark ─────────────────── */
        gsap.set('.hero-char', { y: 0, yPercent: 118 });
        gsap.set('.hero-reveal', { autoAlpha: 0, y: 16 });
        introRef.current = gsap
          .timeline({ paused: true })
          .to('.hero-char', { yPercent: 0, duration: 1.5, ease: 'expo.out', stagger: 0.045 })
          .to('.hero-reveal', { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08 }, 0.5);

        /* ── Hero: scroll flies through the type into the field ─── */
        const manifesto = SplitText.create('.hero-manifesto-text', { type: 'words' });
        gsap.set(manifesto.words, { autoAlpha: 0, yPercent: 60 });
        gsap.set('.hero-actions', { autoAlpha: 0, y: 20 });
        gsap.set('.hero-manifesto', { visibility: 'visible' });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.hero',
              start: 'top top',
              end: '+=160%',
              scrub: 1,
              pin: true,
            },
          })
          .to('.hero-meta', { autoAlpha: 0, y: -20, duration: 0.25 }, 0)
          .to('.hero-words', { scale: 2.6, yPercent: -6, duration: 1, ease: 'power2.in' }, 0)
          .to('.hero-mask', { backgroundColor: '#ffffff', color: '#ffffff', duration: 0.7, ease: 'power1.in' }, 0.15)
          .to('.hero-shade', { opacity: 1, duration: 0.4 }, 0.6)
          .to(manifesto.words, { autoAlpha: 1, yPercent: 0, stagger: 0.02, duration: 0.3, ease: 'power3.out' }, 0.7)
          .to('.hero-actions', { autoAlpha: 1, y: 0, duration: 0.25 }, 1.05);

        /* ── Scroll progress ───────────────────────────────────── */
        gsap.to('.progress', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
        });

        /* ── Big display headings: characters rise on entry ───── */
        gsap.utils.toArray<HTMLElement>('[data-chars]').forEach((el) => {
          gsap.from(el.querySelectorAll('.char'), {
            yPercent: 115,
            rotate: 6,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.022,
            scrollTrigger: { trigger: el, start: 'top 88%' },
          });
        });

        /* ── Paragraph reveals: masked lines ───────────────────── */
        gsap.utils.toArray<HTMLElement>('[data-lines]').forEach((el) => {
          const split = SplitText.create(el, { type: 'lines', mask: 'lines' });
          gsap.from(split.lines, {
            yPercent: 105,
            duration: 1,
            ease: 'expo.out',
            stagger: 0.08,
            scrollTrigger: { trigger: el, start: 'top 90%' },
          });
        });

        /* ── Hairlines draw themselves ─────────────────────────── */
        gsap.utils.toArray<HTMLElement>('[data-rule]').forEach((el) => {
          gsap.from(el, {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 1.4,
            ease: 'expo.inOut',
            scrollTrigger: { trigger: el, start: 'top 95%' },
          });
        });

        /* ── Generic rise for small blocks ─────────────────────── */
        gsap.utils.toArray<HTMLElement>('[data-rise]').forEach((el) => {
          gsap.from(el, {
            y: 40,
            autoAlpha: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%' },
          });
        });

        /* ── Counters ──────────────────────────────────────────── */
        gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
          const to = Number(el.dataset.count);
          const prefix = el.dataset.prefix ?? '';
          const suffix = el.dataset.suffix ?? '';
          const obj = { v: 0 };
          el.textContent = `${prefix}0${suffix}`;
          gsap.to(obj, {
            v: to,
            duration: 2.2,
            ease: 'expo.out',
            onUpdate: () => {
              el.textContent = `${prefix}${Math.round(obj.v)}${suffix}`;
            },
            scrollTrigger: { trigger: el, start: 'top 85%' },
          });
        });

        /* ── Metrics sentence: each claim slides in from the side ─ */
        gsap.utils.toArray<HTMLElement>('.stat').forEach((el, i) => {
          gsap.from(el, {
            xPercent: i % 2 ? 12 : -12,
            autoAlpha: 0,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          });
        });

        /* ── Work index: rows stagger in ───────────────────────── */
        gsap.from('.work-row', {
          yPercent: 40,
          autoAlpha: 0,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: { trigger: '.work-list', start: 'top 80%' },
        });

        /* ── Quote: words light up as you read ─────────────────── */
        const quoteSplit = SplitText.create('.quote-text', { type: 'words' });
        gsap
          .timeline({
            scrollTrigger: { trigger: '.quote', start: 'top top', end: '+=120%', scrub: 0.6, pin: true },
          })
          .fromTo(quoteSplit.words, { opacity: 0.1 }, { opacity: 1, stagger: 0.1, ease: 'none' })
          .to('.quote-glow', { opacity: 1, scale: 1.15, ease: 'none', duration: quoteSplit.words.length * 0.1 }, 0);

        /* ── Experience rail fills with progress ───────────────── */
        gsap.from('.xp-rail-fill', {
          scaleY: 0,
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: { trigger: '.xp-list', start: 'top 70%', end: 'bottom 60%', scrub: true },
        });
        gsap.utils.toArray<HTMLElement>('.xp-stat-num').forEach((el) => {
          gsap.from(el, {
            scale: 0.4,
            autoAlpha: 0,
            duration: 1.3,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          });
        });

        /* ── Thinking: outlined line fills in with scroll ──────── */
        gsap.fromTo(
          '.think-fill',
          { backgroundSize: '0% 100%' },
          {
            backgroundSize: '100% 100%',
            ease: 'none',
            scrollTrigger: { trigger: '.think-big', start: 'top 70%', end: 'bottom 35%', scrub: true },
          },
        );

        /* ── About portrait: shutter reveal + drift ───────────── */
        gsap.fromTo(
          '.about-photo',
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.4,
            ease: 'expo.inOut',
            scrollTrigger: { trigger: '.about-photo', start: 'top 80%' },
          },
        );
        gsap.fromTo(
          '.about-photo img',
          { scale: 1.35, yPercent: -6 },
          {
            scale: 1.05,
            yPercent: 6,
            ease: 'none',
            scrollTrigger: { trigger: '.about-photo', start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );

        /* ── Library: titles arrive one after another ───────── */
        gsap.from('.book-wrap', {
          autoAlpha: 0,
          duration: 0.9,
          ease: 'power2.out',
          stagger: 0.09,
          scrollTrigger: { trigger: '.books', start: 'top 85%' },
        });

        /* ── Contact: the closing word fills with light ────────── */
        gsap.fromTo(
          '.contact-words',
          { scale: 0.85 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'top 20%', scrub: true },
          },
        );

        return () => {
          document.documentElement.classList.remove('is-motion');
          introRef.current = null;
        };
      });

      ScrollTrigger.refresh();
      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [fontsReady] },
  );

  // Play the hero entrance once the preloader hands off and the type is split.
  useEffect(() => {
    if (introDone && fontsReady) introRef.current?.play();
  }, [introDone, fontsReady]);

  const year = new Date().getFullYear();

  return (
    <div ref={rootRef} className="site">
      <Preloader onDone={() => setIntroDone(true)} />
      <Cursor />
      <div className="progress" aria-hidden="true" />
      <Navbar />

      <main>
        {/* ═════════ HERO ═════════ */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-stage">
            <Field className="hero-field" />
            <div className="hero-mask" aria-hidden="true">
              <div className="hero-words">
                <span className="hero-line">
                  <Chars text="Build" className="hero-char" />
                </span>
                <span className="hero-line">
                  <Chars text="& sell" className="hero-char" />
                </span>
              </div>
            </div>
            <div className="hero-shade" aria-hidden="true" />
          </div>

          <div className="hero-manifesto">
            <p className="hero-manifesto-text">
              I write the code, architect the demo, run the technical sale, and onboard the customer. End to end,
              no translation layer.
            </p>
            <div className="hero-actions">
              <a href="#work" className="btn btn-solid">
                See the work
              </a>
              <a href="/resume" className="btn btn-ghost">
                Resume
              </a>
            </div>
          </div>

          <h1 id="hero-title" className="sr-only">
            Jared Mackay. I build and sell what customers need.
          </h1>

          <div className="hero-meta">
            <div className="hero-meta-left hero-reveal">
              <p className="hero-name">Jared Mackay</p>
              <p className="hero-role">Engineer and operator. I build what customers need, then I sell it.</p>
            </div>
            <div className="hero-scroll hero-reveal" aria-hidden="true">
              <span>Scroll</span>
              <span className="hero-scroll-line" />
            </div>
            <div className="hero-meta-right hero-reveal mono">
              <LocalTime />
              <span>40.76° N, 111.89° W</span>
            </div>
          </div>
        </section>

        {/* ═════════ METRICS AS A SENTENCE ═════════ */}
        <section className="stats" aria-label="Track record">
          <p className="stats-text">
            {metrics.map((m) => (
              <span key={m.text} className="stat">
                <span className="stat-num" data-count={m.value} data-prefix={m.prefix} data-suffix={m.suffix}>
                  {m.prefix}
                  {m.value}
                  {m.suffix}
                </span>{' '}
                <span className="stat-text">{m.text}</span>{' '}
              </span>
            ))}
          </p>
        </section>

        <Marquee className="band" speed={60}>
          {['Build', 'Ship', 'Sell', 'Close'].map((w) => (
            <span key={w} className="band-item">
              {w}
              <span className="band-star" />
            </span>
          ))}
        </Marquee>

        {/* ═════════ WORK ═════════ */}
        <section id="work" className="section work">
          <div className="section-head">
            <h2 className="display" data-chars>
              <Chars text="Built it." />
              <br />
              <Chars text="Shipped it." />
            </h2>
            <p className="lede" data-lines>
              Products I've designed, built, and taken to market end to end. Hover a name to open it up.
            </p>
          </div>

          <ul className="work-list">
            {projects.map((p) => {
              const style = { '--flood': p.flood, '--flood-ink': p.ink } as CSSProperties;
              const inner = (
                <>
                  <span className="work-main">
                    <span className="work-title">{p.title}</span>
                    <span className="work-meta">
                      <span>{p.role}</span>
                      <span className="work-tags">{p.tags.join(' / ')}</span>
                    </span>
                  </span>
                  <span className="work-more">
                    <span className="work-more-inner">
                      <span className="work-desc">{p.description}</span>
                      {p.cta && (
                        <span className="work-cta">
                          {p.cta}
                          <svg viewBox="0 0 16 16" aria-hidden="true">
                            <path d="M4 12 12 4M6 4h6v6" fill="none" stroke="currentColor" strokeWidth="1.6" />
                          </svg>
                        </span>
                      )}
                    </span>
                  </span>
                </>
              );
              return (
                <li key={p.title} className="work-row" style={style}>
                  {p.href ? (
                    <a href={p.href} target="_blank" rel="noopener noreferrer" className="work-link" data-cursor="Visit">
                      {inner}
                    </a>
                  ) : (
                    <div className="work-link" tabIndex={0}>
                      {inner}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        {/* ═════════ EXPERIENCE ═════════ */}
        <section id="experience" className="section xp">
          <div className="section-head">
            <h2 className="display display-md" data-chars>
              <Chars text="Before the products," />
              <br />
              <Chars text="the reps." />
            </h2>
            <p className="lede" data-lines>
              Years of carrying a quota taught me how to listen, how to close, and how to lead a team through both.
            </p>
          </div>

          <div className="xp-list">
            <div className="xp-rail" aria-hidden="true">
              <span className="xp-rail-fill" />
            </div>
            {salesJobs.map((job) => (
              <article key={job.title} className="xp-item">
                <p className="xp-when mono">
                  {job.when}
                  <br />
                  {job.where}
                </p>
                <div className="xp-body">
                  <h3 className="xp-title" data-chars>
                    <Chars text={job.title} />
                  </h3>
                  <p className="xp-role">{job.role}</p>
                  <p className="xp-desc" data-lines>
                    {job.description}
                  </p>
                </div>
                <p className="xp-stat">
                  <span className="xp-stat-num">{job.stat}</span>
                  <span className="xp-stat-label">{job.statLabel}</span>
                </p>
              </article>
            ))}
          </div>

          <h3 className="sub" data-rise>
            Other work and service
          </h3>
          <div className="xp-small">
            {otherWork.map((job) => (
              <article key={job.title} className="xp-small-item" data-rise>
                <span className="rule" data-rule />
                <p className="xp-small-meta mono">
                  {job.when}, {job.where}
                </p>
                <h4 className="xp-small-title">{job.title}</h4>
                <p className="xp-small-role">{job.role}</p>
                <p className="xp-small-desc">{job.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ═════════ QUOTE (scrubbed) ═════════ */}
        <section className="quote" aria-label="Philosophy">
          <div className="quote-glow" aria-hidden="true" />
          <p className="quote-text">{quote}</p>
        </section>

        {/* ═════════ THINKING / AI ═════════ */}
        <section id="ai" className="section think">
          <h2 className="think-big">
            <span className="think-line" data-chars>
              <Chars text="I'm the thinker." />
            </span>
            <span className="think-line think-outline">
              <span className="think-fill">AI is the assistant.</span>
            </span>
          </h2>

          <div className="think-cols">
            <div className="think-copy">
              <p className="think-lead" data-lines>
                I use AI to enhance my skills, not own them.
              </p>
              <p data-lines>
                I decide what to build, how the pieces connect, and what the customer actually needs. Then I direct
                AI to help execute: generating boilerplate, building components that would take hours to write from
                scratch, and turning my architecture into working code faster.
              </p>
              <p data-lines>It's a tool in the workflow, not the workflow itself.</p>
            </div>
            <div>
              <h3 className="sub sub-tight">How I work</h3>
              <ul className="principles">
                {principles.map((p) => (
                  <li key={p} data-rise>
                    <span className="rule" data-rule />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ═════════ LIBRARY ═════════ */}
        <section id="toolkit" className="section library">
          <div className="section-head">
            <h2 className="display display-md" data-chars>
              <Chars text="What I read." />
              <br />
              <Chars text="How I think." />
            </h2>
          </div>
          <p className="books">
            {books.map((b, i) => (
              <span key={b.work} className="book-wrap">
                <span className="book" tabIndex={0}>
                  <span className="book-title">{b.work}</span>
                  <span className="book-author">{b.author}</span>
                </span>
                {i < books.length - 1 && (
                  <span className="book-sep" aria-hidden="true">
                    /
                  </span>
                )}
              </span>
            ))}
          </p>
        </section>

        {/* ═════════ ABOUT ═════════ */}
        <section id="about" className="section about">
          <div className="about-grid">
            <figure className="about-photo">
              <img src="/headshot.png" alt="Jared Mackay" loading="lazy" />
            </figure>
            <div className="about-copy">
              <h2 className="display display-md" data-chars>
                <Chars text="Paradise, CA" />
                <br />
                <Chars text="to Salt Lake." />
              </h2>
              <p className="about-lead" data-lines>
                I've spent my career across tech sales roles, from enterprise to early stage, and built and launched my
                own startups along the way.
              </p>
              <p className="about-body" data-lines>
                Outside of work I'm usually reading, traveling, or doing both at the same time. I'm fluent in
                Portuguese and English.
              </p>
              <dl className="facts">
                {facts.map((f) => (
                  <div key={f.label} className="fact" data-rise>
                    <span className="rule" data-rule />
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <div className="skills" aria-label="Skills">
          <p className="sr-only">
            Skills: {[...engineeringSkills, ...sellingSkills].join(', ')}
          </p>
          <Marquee className="skills-row" speed={45}>
            {engineeringSkills.map((s) => (
              <span key={s} className="skill">
                {s}
                <span className="band-star" />
              </span>
            ))}
          </Marquee>
          <Marquee className="skills-row skills-row-outline" speed={45} reverse>
            {sellingSkills.map((s) => (
              <span key={s} className="skill">
                {s}
                <span className="band-star" />
              </span>
            ))}
          </Marquee>
        </div>

        {/* ═════════ CONTACT ═════════ */}
        <section id="contact" className="contact">
          <div className="contact-stage">
            <Field className="contact-field" glow={1.1} />
            <div className="contact-mask" aria-hidden="true">
              <div className="contact-words">
                <span>Let's close</span>
                <span>something.</span>
              </div>
            </div>
          </div>
          <h2 className="sr-only">Let's close something.</h2>

          <div className="contact-body">
            <p className="lede" data-lines>
              Whether you need someone to build the product, sell it, or both, I'm interested in the conversation.
            </p>
            <a href="mailto:jaredhmackay@gmail.com" className="contact-mail" data-cursor="Write">
              <span>jaredhmackay@gmail.com</span>
            </a>
            <ul className="socials">
              <li>
                <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/jaredmkay/" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a href="/resume">Resume</a>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Built and sold with intent.</p>
        <p className="mono">
          Salt Lake City, <LocalTime />
        </p>
        <p className="footer-right">
          <a href="/admin/login">Admin</a>
          <span>© {year}</span>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top</button>
        </p>
      </footer>
    </div>
  );
}

export default App;
