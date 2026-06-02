'use client';

import { useEffect, useRef } from 'react';
import { dataPalette } from '@gurt/ui/tokens';

/**
 * Generativer Signatur-Streifen (PoC) — Flussfeld-Agenten mit verblassenden Spuren
 * (Prinzip nach „Generative Gestaltung" M_1_5_02). Viele Agenten wandern Frame für
 * Frame entlang eines Perlin-Noise-Feldes und ziehen feine Spuren; ein halbtrans-
 * parentes Overlay (Paper-Farbe) lässt alte Spuren verblassen → kontinuierliche,
 * rauchige Bewegung, die sich aufbaut und löst. Agenten, die das Bild verlassen
 * oder altern, werden neu gesetzt → dauerhaft gleichmäßig gefüllt, kein Kollaps.
 * Eine leichte Rechts-Strömung gibt dem Streifen Band-Charakter. Spuren in den
 * Chart-Farben (`dataPalette`), Hintergrund mode-aware (`--paper`).
 *
 * - **Rein dekorativ:** `aria-hidden`, trägt keine Information.
 * - **`prefers-reduced-motion`:** rendert ein vorab „entwickeltes" statisches Bild.
 * - **Sparsam:** pausiert außerhalb des Viewports und bei verstecktem Tab; ~30 fps.
 * - **Variabel:** Seed je Seitenaufruf → anderes Noise-Feld/Farben.
 */
export interface GenerativeBannerProps {
  className?: string;
}

const TAU = Math.PI * 2;

/** Deterministischer PRNG (mulberry32) — Seed je Aufruf gesetzt. */
function mulberry32(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Kompaktes 2D-Perlin-Noise (Permutation per Seed gemischt). Liefert ~[0,1]. */
function makeNoise(rand: () => number): (x: number, y: number) => number {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i += 1) p[i] = i;
  for (let i = 255; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    const t = p[i] ?? 0;
    p[i] = p[j] ?? 0;
    p[j] = t;
  }
  const perm = new Uint8Array(512);
  for (let i = 0; i < 512; i += 1) perm[i] = p[i & 255] ?? 0;
  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a: number, b: number, t: number) => a + t * (b - a);
  const grad = (hash: number, x: number, y: number) => {
    const u = (hash & 1) === 0 ? x : -x;
    const v = (hash & 2) === 0 ? y : -y;
    return u + v;
  };
  return (x: number, y: number) => {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const u = fade(xf);
    const v = fade(yf);
    const pX = perm[X] ?? 0;
    const pX1 = perm[X + 1] ?? 0;
    const aa = perm[pX + Y] ?? 0;
    const ab = perm[pX + Y + 1] ?? 0;
    const ba = perm[pX1 + Y] ?? 0;
    const bb = perm[pX1 + Y + 1] ?? 0;
    const res = lerp(
      lerp(grad(aa, xf, yf), grad(ba, xf - 1, yf), u),
      lerp(grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1), u),
      v,
    );
    return (res + 1) / 2;
  };
}

type Agent = { x: number; y: number; age: number; maxAge: number; color: string };

export function GenerativeBanner({ className }: GenerativeBannerProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rand = mulberry32(Date.now() >>> 0);
    let noise = makeNoise(rand);

    let w = 0;
    let h = 0;
    let agents: Agent[] = [];
    let tDrift = 0;
    let raf = 0;
    let last = 0;
    let running = false;

    const freq = 1 / 210; // Noise-Maßstab (Feld mit deutlich sichtbaren Wirbeln)
    const swirl = 1.7; // Stärke der Richtungsdrehung
    const stepSize = 0.9; // langsame Bewegung
    const bias = 0.62; // Rechts-Strömung (Band-Charakter)
    const fadeAlpha = 0.03; // langsameres Verblassen → längere Spuren
    const agentAlpha = 0.28;

    const cssVar = (name: string, fallback: string): string =>
      getComputedStyle(canvas).getPropertyValue(name).trim() || fallback;

    const spawn = (a: Agent) => {
      a.x = rand() * w;
      a.y = rand() * h;
      a.age = 0;
      a.maxAge = 60 + Math.floor(rand() * 150);
      a.color = dataPalette[Math.floor(rand() * dataPalette.length)] ?? dataPalette[0];
    };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = wrap.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = 'round';
      ctx.lineWidth = 1.8; // dickere Spuren
      // Hintergrund initial mit Paper füllen (Akkumulation startet auf bg).
      ctx.globalAlpha = 1;
      ctx.fillStyle = cssVar('--paper', '#ffffff');
      ctx.fillRect(0, 0, w, h);
      const count = Math.min(1200, Math.max(260, Math.round((w * h) / 160)));
      agents = Array.from({ length: count }, () => {
        const a: Agent = { x: 0, y: 0, age: 0, maxAge: 0, color: dataPalette[0] };
        spawn(a);
        return a;
      });
    };

    const step = () => {
      // Verblassen: Paper-Overlay mit kleiner Deckkraft.
      ctx.globalAlpha = fadeAlpha;
      ctx.fillStyle = cssVar('--paper', '#ffffff');
      ctx.fillRect(0, 0, w, h);
      // Agenten bewegen + Spuren zeichnen.
      ctx.globalAlpha = agentAlpha;
      for (let i = 0; i < agents.length; i += 1) {
        const a = agents[i];
        if (!a) continue;
        const ang = noise(a.x * freq + tDrift, a.y * freq) * TAU * swirl;
        const dx = Math.cos(ang) * 0.75 + bias;
        const dy = Math.sin(ang) * 0.9;
        const nx = a.x + dx * stepSize;
        const ny = a.y + dy * stepSize;
        ctx.strokeStyle = a.color;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(nx, ny);
        ctx.stroke();
        a.x = nx;
        a.y = ny;
        a.age += 1;
        if (a.x < -4 || a.x > w + 4 || a.y < -4 || a.y > h + 4 || a.age > a.maxAge) spawn(a);
      }
      ctx.globalAlpha = 1;
      tDrift += 0.008; // Feld driftet zusätzlich langsam → bildet/löst sich
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < 33) return; // ~30 fps
      last = now;
      step();
    };

    const start = () => {
      if (running || reduce) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    build();
    // Warmlauf: sofort eine „entwickelte" Textur — nie leer (auch bei pausiertem/
    // verstecktem Tab, reduced-motion oder erstem Paint). Danach läuft die Loop weiter.
    for (let k = 0, n = reduce ? 240 : 85; k < n; k += 1) step();

    const io = new IntersectionObserver(
      (entries) => {
        const on = entries[0]?.isIntersecting && !document.hidden;
        if (on) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(wrap);

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    let resizeRaf = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        noise = makeNoise(mulberry32((w * 131 + h * 977 + 7) >>> 0));
        build();
        for (let k = 0, n = reduce ? 240 : 85; k < n; k += 1) step();
      });
    });
    ro.observe(wrap);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(resizeRaf);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`relative w-full overflow-hidden border-b border-line bg-paper ${className ?? ''}`}
    >
      <canvas ref={canvasRef} className="block h-20 w-full md:h-24" />
    </div>
  );
}
