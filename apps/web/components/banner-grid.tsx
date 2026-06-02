'use client';

import { useEffect, useRef } from 'react';
import { dataPalette } from '@gurt/ui/tokens';

/**
 * Signatur-Streifen, Variante 1 — interaktives Farb-Raster (Prinzip nach
 * „Generative Gestaltung" P_1_2_3_01). Die Mausposition steuert die Auflösung
 * des Rasters: clientX → Spaltenanzahl, clientY → Zeilenanzahl. Die Kacheln
 * sind in den Chart-Farben (`dataPalette`) eingefärbt (diagonale Abfolge).
 * Hintergrund weiß. Rein dekorativ (aria-hidden); zeichnet nur bei Mausbewegung
 * (kein Dauer-Loop), daher unkritisch für `prefers-reduced-motion`.
 */
export interface BannerGridProps {
  className?: string;
}

export function BannerGrid({ className }: BannerGridProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const maxCols = 44;
    const maxRows = 7;
    const seqLen = 24;
    const seq = Array.from(
      { length: seqLen },
      (_, i) => dataPalette[i % dataPalette.length] ?? '#000000',
    );

    let w = 0;
    let h = 0;
    let cols = 16;
    let rows = 4;
    let raf = 0;
    let pending = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = wrap.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const tileW = w / cols;
      const tileH = h / rows;
      for (let gy = 0; gy < rows; gy += 1) {
        for (let gx = 0; gx < cols; gx += 1) {
          ctx.fillStyle = seq[(gx + gy) % seqLen] ?? '#000000';
          ctx.fillRect(
            Math.floor(gx * tileW),
            Math.floor(gy * tileH),
            Math.ceil(tileW) + 1,
            Math.ceil(tileH) + 1,
          );
        }
      }
    };

    const schedule = () => {
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(() => {
        pending = false;
        draw();
      });
    };

    const onMove = (e: MouseEvent) => {
      cols = Math.max(1, Math.min(maxCols, Math.round((e.clientX / window.innerWidth) * maxCols)));
      rows = Math.max(1, Math.min(maxRows, Math.round((e.clientY / window.innerHeight) * maxRows)));
      schedule();
    };

    resize();
    draw();
    window.addEventListener('mousemove', onMove, { passive: true });
    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(wrap);

    return () => {
      window.removeEventListener('mousemove', onMove);
      ro.disconnect();
      cancelAnimationFrame(raf);
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
