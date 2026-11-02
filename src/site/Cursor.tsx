import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Difference-blended cursor for fine pointers. Grows over anything
 * interactive; elements with data-cursor="Label" show that label inside it.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!dot || !label) return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) {
      dot.style.display = 'none';
      return;
    }

    document.documentElement.classList.add('has-cursor');
    gsap.set(dot, { xPercent: -50, yPercent: -50, x: -100, y: -100 });
    const xTo = gsap.quickTo(dot, 'x', { duration: 0.35, ease: 'power3' });
    const yTo = gsap.quickTo(dot, 'y', { duration: 0.35, ease: 'power3' });

    let state = '';
    const setState = (next: string, text = '') => {
      if (next === state && label.textContent === text) return;
      state = next;
      label.textContent = text;
      const size = next === 'label' ? 96 : next === 'hover' ? 54 : 12;
      gsap.to(dot, { width: size, height: size, duration: 0.45, ease: 'expo.out' });
      gsap.to(label, { opacity: next === 'label' ? 1 : 0, duration: 0.25 });
    };

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      const el = (e.target as Element | null)?.closest?.('[data-cursor], a, button, [role="button"]');
      if (!el) return setState('idle');
      const text = el.getAttribute('data-cursor');
      if (text) setState('label', text);
      else setState('hover');
    };
    const onLeave = () => gsap.to(dot, { opacity: 0, duration: 0.2 });
    const onEnter = () => gsap.to(dot, { opacity: 1, duration: 0.2 });

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('pointerenter', onEnter);
    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('pointerenter', onEnter);
    };
  }, []);

  return (
    <div ref={dotRef} className="cursor" aria-hidden="true">
      <span ref={labelRef} className="cursor-label" />
    </div>
  );
}
