import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Marquee from './Marquee';
import { sideProjects, type SideProject } from './data';

const FRAME_RATIO: Record<SideProject['frame'], number> = { wide: 16 / 10, tv: 16 / 9, phone: 9 / 19.5 };

/** "1600 / 1042" -> 1.535; falls back to the frame's default ratio. */
function ratioOf(p: SideProject): number {
  if (p.aspect) {
    const [w, h] = p.aspect.split('/').map((n) => Number(n.trim()));
    if (w > 0 && h > 0) return w / h;
  }
  return FRAME_RATIO[p.frame];
}

/**
 * A muted, looping screen recording that plays while it is on screen.
 * If the browser will not start it on its own (iPhone Low Power Mode, or
 * Reduce Motion turned on), a play button appears; tapping toggles playback.
 */
function ProjectVideo({ project }: { project: SideProject }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [blocked, setBlocked] = useState(reduceMotion);
  const [playing, setPlaying] = useState(false);
  // The ref is read inside the observer; the state drives what is shown.
  const userPaused = useRef(false);
  const [pausedByUser, setPausedByUser] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // iOS only autoplays when the muted attribute itself is present.
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause();
          return;
        }
        if (reduceMotion || userPaused.current) return;
        video.play().then(
          () => setBlocked(false),
          () => setBlocked(true),
        );
      },
      { threshold: 0.3 },
    );
    io.observe(video);
    return () => {
      io.disconnect();
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, [reduceMotion]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      setPausedByUser(false);
      video.play().then(
        () => setBlocked(false),
        () => setBlocked(true),
      );
    } else {
      userPaused.current = true;
      setPausedByUser(true);
      video.pause();
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        src={project.video}
        poster={project.poster}
        muted
        loop
        playsInline
        preload="metadata"
        onClick={toggle}
        aria-label={`Screen recording of ${project.title}. Click to play or pause.`}
      />
      {(blocked || (pausedByUser && !playing)) && (
        <button
          type="button"
          className="side-play"
          onClick={toggle}
          aria-label={`Play the ${project.title} video`}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
          </svg>
        </button>
      )}
    </>
  );
}

// Projects appear on the site once their recording is added.
const shown = sideProjects.filter((p) => p.video);

function Title({ p }: { p: SideProject }) {
  const long = Math.max(...p.title.split(' ').map((w) => w.length)) > 8;
  return (
    <h3 className={`side-title ${p.keepCase ? 'side-title-keep' : ''} ${long ? 'side-title-long' : ''}`} data-chars>
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
  );
}

export default function SideProjects() {
  return (
    <ol className="side-list">
      {shown.map((p) => (
        <li key={p.title} className="side-item">
          <header className="side-head">
            <div className="side-head-main">
              <p className="side-kind mono">
                {p.kind}
                {p.status && <span className="side-status">{p.status}</span>}
              </p>
              <Title p={p} />
            </div>
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
          </header>

          <div
            className={`side-media side-media-${p.frame}`}
            style={{ '--ar': ratioOf(p) } as CSSProperties}
          >
            <ProjectVideo project={p} />
          </div>

          <div className="side-body">
            <div className="side-lead">
              <p className="side-desc" data-lines>
                {p.description}
              </p>
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
            <div className="side-details">
              {p.highlights && (
                <ul className="side-highlights">
                  {p.highlights.map((h) => (
                    <li key={h.name}>
                      <strong>{h.name}.</strong> {h.text}
                    </li>
                  ))}
                </ul>
              )}
              {p.notes && (
                <div className="side-notes">
                  {p.notes.map((n) => (
                    <p key={n.label} className="side-note">
                      <strong>{n.label}.</strong> {n.text}
                    </p>
                  ))}
                </div>
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
