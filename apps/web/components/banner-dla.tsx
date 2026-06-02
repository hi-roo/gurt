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
  /**
   * `false` (Default): mehrere Keime → mehrere getrennte Aggregate.
   * `true`: eine verbundene Grundlinie über die volle Breite → EIN zusammen-
   * hängendes Korallen-Band, das sich über die ganze Streifenbreite erstreckt.
   */
  band?: boolean;
}

const TAU = Math.PI * 2;

export function BannerDla({ className, band = false }: BannerDlaProps) {
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
    let modelScale = 1; // Größenskalierung der Kreise

    const paint = (i: number) => {
      ctx.fillStyle = cols[i] ?? '#000000';
      ctx.beginPath();
      ctx.arc(xs[i] ?? 0, ys[i] ?? 0, rs[i] ?? 1, 0, TAU);
      ctx.fill();
    };

    const addOne = () => {
      const newR = (1 + Math.random() * 3.5) * modelScale;
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
      if (band) {
        // Verbundene Grundlinie über die volle Breite — aber nur als UNSICHTBARE
        // Anker (nicht gezeichnet) + leichte Streuung → EIN zusammenhängendes
        // Aggregat ohne harte lineare Ballung im Zentrum. Modell auf 125 % skaliert.
        modelScale = 1.25;
        const seedR = 1.8 * modelScale;
        const stepX = seedR * 1.4; // Überlappung → durchgehend verbunden
        // Organischer, geschwungener Strang (Wellenkurve, kein gerader Strich) über
        // die volle Breite — wird gezeichnet (sichtbarer „Zweig", keine weiße Lücke),
        // von dem die Korallen wachsen.
        const a1 = h * 0.22;
        const a2 = h * 0.1;
        const f1 = (TAU / w) * (1.5 + Math.random() * 1.5);
        const f2 = (TAU / w) * (3.5 + Math.random() * 2.5);
        const p1 = Math.random() * TAU;
        const p2 = Math.random() * TAU;
        let i = 0;
        for (let px = seedR; px <= w - seedR; px += stepX) {
          const py = Math.max(
            seedR,
            Math.min(h - seedR, h / 2 + a1 * Math.sin(f1 * px + p1) + a2 * Math.sin(f2 * px + p2)),
          );
          xs.push(px);
          ys.push(py);
          rs.push(seedR);
          cols.push(dataPalette[i % dataPalette.length] ?? '#000000');
          paint(xs.length - 1); // sichtbarer organischer Strang
          i += 1;
        }
        target = Math.min(4000, Math.max(400, Math.round((w * h) / 140)));
      } else {
        // Mehrere Keime entlang des Streifens → mehrere getrennte Aggregate.
        modelScale = 1;
        const seeds = Math.max(1, Math.round(w / 230));
        for (let s = 0; s < seeds; s += 1) {
          xs.push(((s + 0.5) / seeds) * w);
          ys.push(h / 2);
          rs.push(4);
          cols.push(dataPalette[s % dataPalette.length] ?? '#000000');
          paint(s);
        }
        target = Math.min(1500, Math.max(200, Math.round((w * h) / 230)));
      }
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
  }, [band]);

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
