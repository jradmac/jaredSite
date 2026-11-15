import { useEffect, useRef, type CSSProperties } from 'react';
import Marquee from './Marquee';
import { sideProjects, type SideProject } from './data';

/**
 * A muted, looping screen recording that only plays while it is on screen.
 */
function ProjectVideo({ project }: { project: SideProject }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={project.video}
      poster={project.poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={`Screen recording of ${project.title}`}
    />
  );
}

// Projects appear on the site once their recording is added.
const shown = sideProjects.filter((p) => p.video);

export default function SideProjects() {
  return (
    <ol className="side-list">
      {shown.map((p, i) => (
        <li key={p.title} className={`side-item ${i % 2 ? 'side-item-flip' : ''}`}>
          <div className="side-row">
            <div
              className={`side-media side-media-${p.frame}`}
              style={p.aspect ? ({ aspectRatio: p.aspect } as CSSProperties) : undefined}
            >
              <ProjectVideo project={p} />
            </div>
            <div className="side-copy">
              <p className="side-kind mono">
                {p.kind}
                {p.status && <span className="side-status">{p.status}</span>}
              </p>
              <h3
                className={`side-title ${p.keepCase ? 'side-title-keep' : ''} ${
                  Math.max(...p.title.split(' ').map((w) => w.length)) > 8 ? 'side-title-long' : ''
                }`}
                data-chars
              >
                {p.title.split(' ').map((word, wi, words) => (
                  <span key={wi}>
                    <span className="word-keep">
                      {word.split('').map((c, ci) => (
                        <span key={ci} className="char-mask">
                          <span className="char">{c}</span>
                        </span>
                      ))}
                    </span>
                    {wi < words.length - 1 ? ' ' : null}
                  </span>
                ))}
              </h3>
              {p.stats && (
                <dl className="side-stats">
                  {p.stats.map((s) => (
                    <div key={s.label}>
                      <dt>{s.label}</dt>
                      <dd>{s.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <p className="side-desc" data-lines>
                {p.description}
              </p>
              {p.highlights && (
                <ul className="side-highlights">
                  {p.highlights.map((h) => (
                    <li key={h.name}>
                      <strong>{h.name}.</strong> {h.text}
                    </li>
                  ))}
                </ul>
              )}
              {p.notes?.map((n) => (
                <p key={n.label} className="side-note">
                  <strong>{n.label}.</strong> {n.text}
                </p>
              ))}
              <p className="side-stack">{p.stack.join(' / ')}</p>
              {p.link && (
                <a
                  href={p.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="side-link"
                  data-cursor="Open"
                >
                  {p.link.label}
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M4 12 12 4M6 4h6v6" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {p.gallery && (
            <figure className="side-gallery">
              <Marquee speed={35} className="side-gallery-strip">
                {p.gallery.images.map((src) => (
                  <img key={src} src={src} alt="" loading="lazy" width={540} height={360} />
                ))}
              </Marquee>
              <figcaption>{p.gallery.caption}</figcaption>
            </figure>
          )}
        </li>
      ))}
    </ol>
  );
}
