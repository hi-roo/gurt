'use client';

import { useEffect, useRef } from 'react';
import { dataPalette } from '@gurt/ui/tokens';

/**
 * DISCOVERY — datengetriebener generativer Hero (Flow-Feld-Agenten).
 *
 * Die echte Datenreihe `values` formt das Feld (Silhouette: Sog nach oben bei
 * hohen Werten; Dichte: Streuung; Farbe: Magnitude). Der Seed (Slug) bestimmt
 * zusätzlich — bewusst breit gestreut, damit Beiträge klar unterscheidbar sind —:
 * Flussrichtung, Wirbelgröße (Maßstab), Wirbelintensität, Tempo und drei
 * kontrastierende Paletten-Töne. „Form = Daten“, nicht Dekoration.
 *
 * A11y: `aria-hidden`. `prefers-reduced-motion` → statisches, vorab entwickeltes
 * Bild. `motion='hover'` → standardmäßig statisch, Bewegung nur beim Überfahren.
 * `motion='always'` → animiert, pausiert außerhalb Viewport / bei verstecktem Tab.
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
  tone?: 'paper' | 'ink';
  /** Expliziter Hintergrund (überschreibt `tone`) — z. B. der aktuelle `--paper`-Wert, theme-aware. */
  bgColor?: string;
  /** 'always' = animiert (Viewport-Pause); 'hover' = statisch, Bewegung nur beim Überfahren. */
  motion?: 'always' | 'hover';
}

export function FlowHero({ values, seed, className, tone = 'paper', bgColor, motion = 'always' }: FlowHeroProps) {
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
    let noise = makeNoise(mulberry32(baseSeed));
    const rand = mulberry32((baseSeed ^ 0x85ebca6b) >>> 0);

    // --- Daten ---
    const vals = values.length >= 2 ? values : [0, 1];
    const lo = Math.min(...vals);
    const hi = Math.max(...vals);
    const span = hi - lo || 1;
    const norm = vals.map((v) => (v - lo) / span);
    const mean = norm.reduce((s, v) => s + v, 0) / norm.length;
    const energy = Math.sqrt(norm.reduce((s, v) => s + (v - mean) ** 2, 0) / norm.length);
    const sampleData = (t01: number) => {
      const x = Math.max(0, Math.min(1, t01)) * (norm.length - 1);
      const i = Math.floor(x);
      const f = x - i;
      return (norm[i] ?? 0) * (1 - f) + (norm[Math.min(i + 1, norm.length - 1)] ?? 0) * f;
    };

    // --- Seed-gestreute Parameter (breit, für klare Unterscheidbarkeit) ---
    const rp = mulberry32((baseSeed ^ 0x9e3779b9) >>> 0);
    const freq = 1 / (150 + rp() * 230); // Wirbelgröße/Maßstab: 1/150 … 1/380
    const swirl = 1.0 + rp() * 1.9; // Wirbelintensität/-zahl: 1.0 … 2.9
    const flowAngle = rp() * TAU; // Gesamt-Flussrichtung (nicht mehr immer rechts)
    const driftStrength = 0.28 + rp() * 0.5;
    const bx = Math.cos(flowAngle) * driftStrength;
    const by = Math.sin(flowAngle) * driftStrength;
    const stepSize = 0.7 + rp() * 0.6;

    // --- Drei kontrastierende Farben (über die hue-diverse Palette gespreizt) ---
    const pal = dataPalette;
    const i0 = baseSeed % pal.length;
    const i1 = (i0 + 3 + ((baseSeed >> 4) % 2)) % pal.length;
    const i2 = (i0 + 5 + ((baseSeed >> 9) % 2)) % pal.length;
    const colors = [pal[i0] ?? pal[0], pal[i1] ?? pal[0], pal[i2] ?? pal[0]];
    const bg = bgColor ?? (tone === 'ink' ? '#0c111d' : '#ece9e0');

    let w = 0;
    let h = 0;
    let agents: Agent[] = [];
    let tDrift = 0;
    let raf = 0;
    let last = 0;
    let running = false;
    // Maus-Interaktion: Agenten ballen sich beim Überfahren um den Cursor (mit leichtem Wirbel).
    const pointer = { x: 0, y: 0, active: false, strength: 0 };

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
      const density = 140 + energy * 360;
      const count = Math.min(1600, Math.max(260, Math.round((w * h) / 150) + density));
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
      // Anziehungsstärke weich nachführen → die „Ballung“ blendet beim Überfahren ein/aus.
      pointer.strength += ((pointer.active ? 1 : 0) - pointer.strength) * 0.05;
      const pullR = Math.min(w, h) * 0.5;
      for (let i = 0; i < agents.length; i += 1) {
        const a = agents[i];
        if (!a) continue;
        const ang = noise(a.x * freq + tDrift, a.y * freq) * TAU * swirl;
        const dataBias = (sampleData(a.x / Math.max(1, w)) - 0.5) * 2;
        let dx = Math.cos(ang) * 0.8 + bx;
        let dy = Math.sin(ang) * 0.9 + by - dataBias * 0.95;
        // Beim Überfahren: Zug zum Cursor (Ballung) + Wirbel drumherum → die Bewegungsdynamik
        // reagiert auf die Maus. Stärke ∝ Nähe, weich ein-/ausgeblendet.
        if (pointer.strength > 0.01) {
          const ddx = pointer.x - a.x;
          const ddy = pointer.y - a.y;
          const dist = Math.hypot(ddx, ddy);
          if (dist > 1 && dist < pullR) {
            const f = pointer.strength * (1 - dist / pullR);
            const ux = ddx / dist;
            const uy = ddy / dist;
            dx += ux * f * 1.7 - uy * f * 1.0;
            dy += uy * f * 1.7 + ux * f * 1.0;
          }
        }
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

    // --- Auslöser: Viewport (always) vs. Hover ---
    const cleanups: Array<() => void> = [];
    if (motion === 'hover' && !reduce) {
      const enter = () => {
        if (!document.hidden) start();
      };
      const leave = () => stop();
      wrap.addEventListener('pointerenter', enter);
      wrap.addEventListener('pointerleave', leave);
      cleanups.push(() => {
        wrap.removeEventListener('pointerenter', enter);
        wrap.removeEventListener('pointerleave', leave);
      });
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting && !document.hidden) start();
          else stop();
        },
        { threshold: 0 },
      );
      io.observe(wrap);
      cleanups.push(() => io.disconnect());
    }

    // Maus-Interaktion (beide Modi, außer reduced-motion): Cursor verfolgen → Ballung im step().
    if (!reduce) {
      const onMove = (e: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        pointer.x = e.clientX - rect.left;
        pointer.y = e.clientY - rect.top;
        pointer.active = true;
      };
      const onLeave = () => {
        pointer.active = false;
      };
      wrap.addEventListener('pointermove', onMove);
      wrap.addEventListener('pointerleave', onLeave);
      cleanups.push(() => {
        wrap.removeEventListener('pointermove', onMove);
        wrap.removeEventListener('pointerleave', onLeave);
      });
    }

    const onVis = () => {
      if (document.hidden) stop();
    };
    document.addEventListener('visibilitychange', onVis);
    cleanups.push(() => document.removeEventListener('visibilitychange', onVis));

    let resizeRaf = 0;
    const ro = new ResizeObserver(() => {
      // Nur bei ECHTER Größenänderung neu bauen (≥1px gegenüber dem letzten Build) — verhindert
      // Rebuild-Schleifen (z. B. Safari-Layout-Feedback) und unnötiges „Flackern“ des Felds.
      if (Math.abs(wrap.clientWidth - w) < 1 && Math.abs(canvas.clientHeight - h) < 1) return;
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
      ro.disconnect();
      cancelAnimationFrame(resizeRaf);
      cleanups.forEach((fn) => fn());
    };
  }, [seed, valuesKey, tone, bgColor, motion, values]);

  return (
    // Positions-Default nur ohne eigenes className — sonst kollidiert `relative` mit einem
    // übergebenen `absolute` (Tailwind-Reihenfolge ließe `relative` gewinnen): Der Wrapper läge
    // im Fluss, und die intrinsische Canvas-Größe (height-ATTRIBUT = dpr × CSS-Höhe) könnte die
    // Grid-Zeile hochtreiben — in Safari ein Wachstums-Loop (Zeile wächst → Observer → Rebuild …).
    <div ref={wrapRef} aria-hidden="true" className={`overflow-hidden ${className ?? 'relative w-full'}`}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
