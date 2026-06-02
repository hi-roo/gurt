'use client';

import { useEffect, useRef } from 'react';
import { dataPalette } from '@gurt/ui/tokens';

/**
 * Signatur-Streifen, Variante 6 — Limited Diffusion Aggregation (Prinzip nach
 * „Generative Gestaltung" P_2_2_4_01). Aus mehreren Keimen entlang des Streifens
 * wachsen organische Kreis-Aggregate: ein zufälliger neuer Kreis wird an die
 * Außenkante des nächstgelegenen bestehenden Kreises gesetzt. Kreise in den
 * Chart-Farben (`dataPalette`), Hintergrund weiß.
 *
 * - **Rein dekorativ:** `aria-hidden`.
 * - **Wachstum** läuft additiv bis zum Zielbestand und stoppt dann (kein Dauer-
 *   Loop); `prefers-reduced-motion` rendert das fertige Aggregat sofort statisch.
 * - Pausiert außerhalb des Viewports / bei verstecktem Tab.
 */
export interface BannerDlaProps {
  className?: string;
}

const TAU = Math.PI * 2;

export function BannerDla({ className }: BannerDlaProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0;
    let h = 0;
    let xs: number[] = [];
    let ys: number[] = [];
    let rs: number[] = [];
    let cols: string[] = [];
    let target = 0;
    let raf = 0;
    let running = false;

    const paint = (i: number) => {
      ctx.fillStyle = cols[i] ?? '#000000';
      ctx.beginPath();
      ctx.arc(xs[i] ?? 0, ys[i] ?? 0, rs[i] ?? 1, 0, TAU);
      ctx.fill();
    };

    const addOne = () => {
      const newR = 1 + Math.random() * 3.5;
      const nx = newR + Math.random() * (w - 2 * newR);
      const ny = newR + Math.random() * (h - 2 * newR);
      let closest = Number.MAX_VALUE;
      let ci = 0;
      for (let i = 0; i < xs.length; i += 1) {
        const dx = nx - (xs[i] ?? 0);
        const dy = ny - (ys[i] ?? 0);
        const d = dx * dx + dy * dy;
        if (d < closest) {
          closest = d;
          ci = i;
        }
      }
      const ang = Math.atan2(ny - (ys[ci] ?? 0), nx - (xs[ci] ?? 0));
      const rad = (rs[ci] ?? 1) + newR;
      xs.push((xs[ci] ?? 0) + Math.cos(ang) * rad);
      ys.push((ys[ci] ?? 0) + Math.sin(ang) * rad);
      rs.push(newR);
      cols.push(dataPalette[Math.floor(Math.random() * dataPalette.length)] ?? '#000000');
      paint(xs.length - 1);
    };

    const reset = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = wrap.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);
      xs = [];
      ys = [];
      rs = [];
      cols = [];
      // Keime entlang des Streifens (vertikal mittig)
      const seeds = Math.max(1, Math.round(w / 230));
      for (let s = 0; s < seeds; s += 1) {
        xs.push(((s + 0.5) / seeds) * w);
        ys.push(h / 2);
        rs.push(4);
        cols.push(dataPalette[s % dataPalette.length] ?? '#000000');
        paint(s);
      }
      target = Math.min(1500, Math.max(200, Math.round((w * h) / 230)));
    };

    const grow = (n: number) => {
      for (let k = 0; k < n && xs.length < target; k += 1) addOne();
    };

    const loop = () => {
      if (xs.length >= target) {
        running = false;
        return;
      }
      grow(14);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduce || xs.length >= target) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    reset();
    if (reduce) grow(target);

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !document.hidden) start();
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
        stop();
        reset();
        if (reduce) grow(target);
        else start();
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
      className={`relative w-full overflow-hidden border-b border-line bg-white ${className ?? ''}`}
    >
      <canvas ref={canvasRef} className="block h-20 w-full md:h-24" />
    </div>
  );
}
