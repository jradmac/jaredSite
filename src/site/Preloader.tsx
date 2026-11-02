import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Opening sequence: a counter runs to 100 while the name assembles,
 * then the whole panel wipes upward to hand off to the hero.
 * Runs once per browser session; skipped for reduced motion.
 */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const doneRef = useRef(onDone);
  useLayoutEffect(() => {
    doneRef.current = onDone;
  }, [onDone]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let seen = false;
    try {
      seen = sessionStorage.getItem('jm-intro') === '1';
    } catch {
      /* storage unavailable: just play it */
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (seen || reduce) {
      root.style.display = 'none';
      doneRef.current();
      return;
    }

    document.documentElement.classList.add('is-loading');
    const counter = { v: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          try {
            sessionStorage.setItem('jm-intro', '1');
          } catch {
            /* ignore */
          }
          document.documentElement.classList.remove('is-loading');
          root.style.display = 'none';
        },
      });
      tl.from('.pre-char', {
        yPercent: 110,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.035,
      })
        .to(
          counter,
          {
            v: 100,
            duration: 1.4,
            ease: 'power3.inOut',
            onUpdate: () => {
              if (countRef.current) countRef.current.textContent = String(Math.round(counter.v)).padStart(3, '0');
            },
          },
          0,
        )
        .to('.pre-bar', { scaleX: 1, duration: 1.4, ease: 'power3.inOut' }, 0)
        .to('.pre-char', { yPercent: -110, duration: 0.6, ease: 'expo.in', stagger: 0.02 }, 1.45)
        .add(() => doneRef.current(), 1.85)
        .to(root, { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'expo.inOut' }, 1.75);
    }, root);

    return () => {
      ctx.revert();
      document.documentElement.classList.remove('is-loading');
    };
  }, []);

  const name = 'Jared Mackay';
  return (
    <div ref={rootRef} className="preloader" aria-hidden="true">
      <div className="pre-name">
        {name.split('').map((c, i) => (
          <span key={i} className="pre-mask">
            <span className="pre-char">{c === ' ' ? ' ' : c}</span>
          </span>
        ))}
      </div>
      <div className="pre-foot">
        <span>Loading the field</span>
        <span ref={countRef} className="pre-count">000</span>
      </div>
      <div className="pre-bar" />
    </div>
  );
}
