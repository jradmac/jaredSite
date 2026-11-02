import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

/**
 * Live light field — a domain-warped noise field in the site's three accent
 * colours (ember, violet, signal cyan) that drifts on its own and bends
 * toward the pointer. Rendered with ogl on a single full-screen triangle.
 */

const vertex = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec2 uMouse;
  uniform float uGlow;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = m * p;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
    float t = uTime * 0.05;

    vec2 m = (uMouse - 0.5) * vec2(uRes.x / uRes.y, 1.0);
    float d = length(p - m);
    float pull = exp(-d * 2.6);

    vec2 q = vec2(fbm(p * 1.3 + t), fbm(p * 1.3 - t + 3.1));
    vec2 r = vec2(
      fbm(p * 1.5 + 2.2 * q + vec2(1.7, 9.2) + t * 1.4),
      fbm(p * 1.5 + 2.2 * q + vec2(8.3, 2.8) - t)
    );
    r += 0.35 * pull * vec2(cos(uTime * 0.4), sin(uTime * 0.4));
    float f = fbm(p * 1.1 + 3.2 * r);

    vec3 ember  = vec3(1.0, 0.416, 0.239);
    vec3 violet = vec3(0.486, 0.361, 1.0);
    vec3 signal = vec3(0.133, 0.827, 0.933);
    vec3 deep   = vec3(0.07, 0.03, 0.12);

    vec3 col = mix(violet, ember, smoothstep(0.32, 0.72, f));
    col = mix(col, signal, smoothstep(0.58, 0.92, r.y) * 0.85);
    col = mix(deep, col, smoothstep(0.12, 0.62, f * 1.15 + 0.35 * pull));
    col *= uGlow;

    // film grain
    col += (hash(gl_FragCoord.xy + fract(uTime) * 100.0) - 0.5) * 0.05;
    gl_FragColor = vec4(col, 1.0);
  }
`;

type FieldProps = {
  className?: string;
  glow?: number;
};

export default function Field({ className = '', glow = 1.15 }: FieldProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let renderer: Renderer;
    try {
      renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio || 1, 1.5), alpha: false });
    } catch {
      host.classList.add('field-fallback');
      return;
    }
    const gl = renderer.gl;
    gl.canvas.style.width = '100%';
    gl.canvas.style.height = '100%';
    gl.canvas.style.display = 'block';
    host.appendChild(gl.canvas);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 8 },
        uRes: { value: [1, 1] },
        uMouse: { value: [0.5, 0.5] },
        uGlow: { value: glow },
      },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      renderer.setSize(Math.max(1, width), Math.max(1, height));
      program.uniforms.uRes.value = [gl.canvas.width, gl.canvas.height];
      if (reduce) renderer.render({ scene: mesh });
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    const target = [0.5, 0.5];
    const mouse = [0.5, 0.5];
    const onMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      target[0] = (e.clientX - rect.left) / rect.width;
      target[1] = 1 - (e.clientY - rect.top) / rect.height;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(host);

    let raf = 0;
    let last = performance.now();
    let time = 8;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!visible || document.hidden) return;
      time += dt;
      mouse[0] += (target[0] - mouse[0]) * 0.05;
      mouse[1] += (target[1] - mouse[1]) * 0.05;
      program.uniforms.uTime.value = time;
      program.uniforms.uMouse.value = mouse;
      renderer.render({ scene: mesh });
    };
    if (reduce) renderer.render({ scene: mesh });
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      gl.canvas.remove();
    };
  }, [glow]);

  return <div ref={hostRef} className={`field ${className}`} aria-hidden="true" />;
}
