import { useEffect, useRef, type CSSProperties } from 'react';
import { sideProjects, type SideProject } from './data';

/**
 * A muted, looping screen recording that only plays while it is on screen.
 * Until a recording exists it shows a tinted placeholder frame instead.
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

  if (!project.video) {
    return (
      <div className="side-placeholder" style={{ '--tint': project.tint } as CSSProperties}>
        <span>{project.title}</span>
        <span className="side-placeholder-note">Recording coming soon</span>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      src={project.video}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={`Screen recording of ${project.title}`}
    />
  );
}

export default function SideProjects() {
  return (
    <ol className="side-list">
      {sideProjects.map((p, i) => (
        <li key={p.title} className={`side-item ${i % 2 ? 'side-item-flip' : ''}`}>
          <div className={`side-media side-media-${p.frame}`}>
            <ProjectVideo project={p} />
          </div>
          <div className="side-copy">
            <p className="side-kind mono">
              {p.kind}
              <span className="side-status">{p.status}</span>
            </p>
            <h3 className="side-title" data-chars>
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
            <p className="side-desc" data-lines>
              {p.description}
            </p>
            <p className="side-stack">{p.stack.join(' / ')}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
