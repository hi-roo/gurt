'use client';

import { useEffect, useRef } from 'react';
import { dataPalette } from '@gurt/ui/tokens';

/**
 * DISCOVERY — datengetriebener generativer Hero (Flow-Feld-Agenten).
 *
 * Die echte Datenreihe `values` eines Beitrags formt das Feld:
 *  - **Silhouette:** Agenten steigen dort, wo die Werte hoch sind (Daten-Bias auf dy).
 *  - **Dichte:** skaliert mit der „Energie" (Streuung) der Daten.
 *  - **Farbe:** lokale Magnitude wählt aus drei seed-festen Paletten-Tönen.
 *  - **Seed (Slug):** stabiles Basis-Noise-Feld + Farbwahl je Beitrag.
 *
 * Damit ist das Visual eine ehrliche Codierung der Daten, nicht Dekoration.
 * Rein dekorativ im A11y-Sinn (`aria-hidden`); `prefers-reduced-motion` → statisches,
 * vorab entwickeltes Bild; pausiert außerhalb Viewport / bei verstecktem Tab.
 */
const TAU = Math.PI * 2;

function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

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

export interface FlowHeroProps {
  values: number[];
  seed: string;
  className?: string;
  /** Hintergrund: 'paper' (hell) oder 'ink' (dunkel, Astrum-Stil). */
  tone?: 'paper' | 'ink';
}

export function FlowHero({ values, seed, className, tone = 'paper' }: FlowHeroProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const valuesKey = values.join(',');

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const baseSeed = hashStr(seed);
    const rand = mulberry32(baseSeed);
    let noise = makeNoise(rand);

    // --- Daten aufbereiten ---
    const vals = values.length >= 2 ? values : [0, 1];
    const lo = Math.min(...vals);
    const hi = Math.max(...vals);
    const span = hi - lo || 1;
    const norm = vals.map((v) => (v - lo) / span); // [0,1]
    const mean = norm.reduce((s, v) => s + v, 0) / norm.length;
    const energy = Math.sqrt(norm.reduce((s, v) => s + (v - mean) ** 2, 0) / norm.length); // Streuung
    const sampleData = (t01: number) => {
      const x = Math.max(0, Math.min(1, t01)) * (norm.length - 1);
      const i = Math.floor(x);
      const f = x - i;
      return (norm[i] ?? 0) * (1 - f) + (norm[Math.min(i + 1, norm.length - 1)] ?? 0) * f;
    };

    // --- Drei seed-feste Farben + Hintergrund je Ton ---
    const pal = dataPalette;
    const pick = (sh: number) => pal[(baseSeed >> sh) % pal.length] ?? pal[0];
    const colors = [pick(2), pick(9), pick(17)];
    const bg = tone === 'ink' ? '#0e1326' : '#ffffff';

    let w = 0;
    let h = 0;
    let agents: Agent[] = [];
    let tDrift = 0;
    let raf = 0;
    let last = 0;
    let running = false;

    const freq = 1 / 240;
    const swirl = 1.6;
    const stepSize = 0.95;
    const bias = 0.5;
    const fadeAlpha = tone === 'ink' ? 0.035 : 0.03;
    const agentAlpha = tone === 'ink' ? 0.34 : 0.26;

    const colorFor = (xn: number) => {
      const d = sampleData(xn);
      return d < 0.38 ? colors[0]! : d < 0.7 ? colors[1]! : colors[2]!;
    };

    const spawn = (a: Agent) => {
      a.x = rand() * w;
      a.y = rand() * h;
      a.age = 0;
      a.maxAge = 70 + Math.floor(rand() * 160);
      a.color = colorFor(a.x / Math.max(1, w));
    };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = wrap.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = 'round';
      ctx.lineWidth = 1.6;
      ctx.globalAlpha = 1;
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);
      // Dichte: Basis + Daten-Energie (lebhaftere Daten → dichteres Feld).
      const density = 150 + energy * 360;
      const count = Math.min(1600, Math.max(280, Math.round((w * h) / 150) + density));
      agents = Array.from({ length: count }, () => {
        const a: Agent = { x: 0, y: 0, age: 0, maxAge: 0, color: colors[0]! };
        spawn(a);
        return a;
      });
    };

    const step = () => {
      ctx.globalAlpha = fadeAlpha;
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = agentAlpha;
      for (let i = 0; i < agents.length; i += 1) {
        const a = agents[i];
        if (!a) continue;
        const ang = noise(a.x * freq + tDrift, a.y * freq) * TAU * swirl;
        const dataBias = (sampleData(a.x / Math.max(1, w)) - 0.5) * 2; // [-1,1]
        const dx = Math.cos(ang) * 0.8 + bias;
        const dy = Math.sin(ang) * 0.9 - dataBias * 0.95; // hohe Werte → Sog nach oben
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
      tDrift += 0.006;
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < 33) return;
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
    for (let k = 0, n = reduce ? 320 : 110; k < n; k += 1) step();

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !document.hidden) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(wrap);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);

    let resizeRaf = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        noise = makeNoise(mulberry32(baseSeed));
        build();
        for (let k = 0, n = reduce ? 320 : 110; k < n; k += 1) step();
      });
    });
    ro.observe(wrap);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(resizeRaf);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [seed, valuesKey, tone, values]);

  return (
    <div ref={wrapRef} aria-hidden="true" className={`relative w-full overflow-hidden ${className ?? ''}`}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
