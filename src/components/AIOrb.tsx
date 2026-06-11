interface AIOrbProps {
  size?: number;
  className?: string;
}

/**
 * Animated, self-contained "AI core" mark — rotating gradient rings,
 * orbiting particles, and a breathing core. Styles live in index.css.
 */
export default function AIOrb({ size = 72, className = '' }: AIOrbProps) {
  return (
    <div className={`ai-orb ${className}`} style={{ width: size, height: size }} aria-hidden="true">
      <div className="ai-orb-glow" />
      <div className="ai-orb-ring" />
      <div className="ai-orb-ring ai-orb-ring-2" />
      <div className="ai-orb-core" />
      <div className="ai-orb-orbit">
        <span className="ai-orb-dot" />
      </div>
      <div className="ai-orb-orbit ai-orb-orbit-2">
        <span className="ai-orb-dot" />
      </div>
    </div>
  );
}
