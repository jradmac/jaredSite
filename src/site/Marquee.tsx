import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Endless horizontal band. Drifts on its own, surges with scroll speed,
 * and flips direction when the reader scrolls back up.
 */
export default function Marquee({
  children,
  speed = 40,
  reverse = false,
  className = '',
}: {
  children: ReactNode;
  speed?: number; // px per second at rest
  reverse?: boolean;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const base = reverse ? 1 : -1;
    let dir = 1;
    let boost = 0;
    let x = 0;
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        dir = self.direction;
        boost = Math.min(Math.abs(self.getVelocity()) / 4, 1400);
      },
    });

    const tick = (_t: number, deltaMs: number) => {
      const half = track.scrollWidth / 2;
      if (!half) return;
      boost *= 0.92;
      x += (base * dir * (speed + boost) * deltaMs) / 1000;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      gsap.set(track, { x });
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      st.kill();
    };
  }, [speed, reverse]);

  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div ref={trackRef} className="marquee-track">
        <div className="marquee-group">{children}</div>
        <div className="marquee-group">{children}</div>
      </div>
    </div>
  );
}
