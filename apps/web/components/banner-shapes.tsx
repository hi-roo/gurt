'use client';

import { useEffect, useRef } from 'react';
import { dataPalette } from '@gurt/ui/tokens';

/**
 * Signatur-Streifen, Variante 2 — ein Raster aus Formen (Zeiger-Dreiecke), die
 * stets zur Maus zeigen (Prinzip nach „Generative Gestaltung" P_2_1_1_04). Der
 * Winkel jeder Form ergibt sich aus `atan2` zur Cursor-Position; nahe am Cursor
 * werden die Formen größer. Eingefärbt in den Chart-Farben (`dataPalette`).
 * Hintergrund weiß. Rein dekorativ (aria-hidden); zeichnet nur bei Mausbewegung.
 */
export interface BannerShapesProps {
  className?: string;
}

export function BannerShapes({ className }: BannerShapesProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rows = 3;
    let w = 0;
    let h = 0;
    let cell = 0;
    let cols = 0;
    let tx = 0; // Zielpunkt (Maus) in Canvas-Koordinaten
    let ty = 0;
    let diag = 1;
    let raf = 0;
    let pending = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = wrap.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = h / rows;
      cols = Math.max(1, Math.ceil(w / cell));
      diag = Math.hypot(w, h) || 1;
      tx = w / 2;
      ty = -h; // Default: Zeiger fächern nach oben (Cursor „über" dem Streifen)
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let gy = 0; gy < rows; gy += 1) {
        for (let gx = 0; gx < cols; gx += 1) {
          const cx = gx * cell + cell / 2;
          const cy = gy * cell + cell / 2;
          const ang = Math.atan2(ty - cy, tx - cx);
          const near = Math.max(0, 1 - Math.hypot(tx - cx, ty - cy) / diag); // 0..1
          const len = cell * 0.3 * (0.7 + 0.9 * near); // nahe am Cursor größer
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(ang);
          ctx.fillStyle = dataPalette[(gx + gy) % dataPalette.length] ?? '#000000';
          ctx.beginPath();
          ctx.moveTo(len, 0);
          ctx.lineTo(-len * 0.6, len * 0.55);
          ctx.lineTo(-len * 0.6, -len * 0.55);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
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
      const r = canvas.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
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
