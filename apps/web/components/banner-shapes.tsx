'use client';

import { useEffect, useRef } from 'react';
import { dataPalette } from '@gurt/ui/tokens';

/**
 * Signatur-Streifen, Variante 2 + Ableitungen — ein Raster aus Formen, die stets
 * zur Maus zeigen (Prinzip nach „Generative Gestaltung" P_2_1_1_04). Der Winkel
 * jeder Form ergibt sich aus `atan2` zur Cursor-Position; nahe am Cursor werden
 * die Formen größer. Eingefärbt in den Chart-Farben (`dataPalette`).
 *
 * `mode`:
 * - `triangle` (Default): gefülltes Zeiger-Dreieck.
 * - `line`: Linie/Nadel, die zur Maus zeigt.
 * - `forms`: je Zelle zufällig gleichschenkliges Dreieck, Quadrat oder Halbkreis
 *   (Form + Farbe randomisiert, stabil pro Zelle).
 *
 * Hintergrund weiß. Rein dekorativ (aria-hidden); zeichnet nur bei Mausbewegung.
 */
export interface BannerShapesProps {
  className?: string;
  mode?: 'triangle' | 'line' | 'forms';
}

const HALF_PI = Math.PI / 2;
const SEED = 9871;

export function BannerShapes({ className, mode = 'triangle' }: BannerShapesProps) {
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
    let tx = 0;
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
      ty = -h; // Default: Formen fächern nach oben
    };

    const drawCell = (gx: number, gy: number) => {
      const cx = gx * cell + cell / 2;
      const cy = gy * cell + cell / 2;
      const ang = Math.atan2(ty - cy, tx - cx);
      const near = Math.max(0, 1 - Math.hypot(tx - cx, ty - cy) / diag); // 0..1
      const s = cell * 0.32 * (0.7 + 0.9 * near); // nahe am Cursor größer
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(ang);

      if (mode === 'line') {
        ctx.strokeStyle = dataPalette[(gx + gy) % dataPalette.length] ?? '#000000';
        ctx.lineWidth = 1.6;
        ctx.lineCap = 'round';
        const len = cell * 0.46 * (0.7 + 0.9 * near);
        ctx.beginPath();
        ctx.moveTo(-len * 0.35, 0);
        ctx.lineTo(len * 0.65, 0);
        ctx.stroke();
      } else if (mode === 'forms') {
        const hash = ((gx * 73856093) ^ (gy * 19349663) ^ SEED) >>> 0;
        ctx.fillStyle = dataPalette[(hash >>> 3) % dataPalette.length] ?? '#000000';
        ctx.beginPath();
        switch (hash % 3) {
          case 0: // gleichschenkliges (gleichseitiges) Dreieck, Spitze zum Cursor
            ctx.moveTo(s, 0);
            ctx.lineTo(-s * 0.5, s * 0.87);
            ctx.lineTo(-s * 0.5, -s * 0.87);
            ctx.closePath();
            break;
          case 1: { // Quadrat
            const q = s * 1.1;
            ctx.rect(-q / 2, -q / 2, q, q);
            break;
          }
          default: // Halbkreis, flache Seite quer, Wölbung zum Cursor
            ctx.arc(0, 0, s, -HALF_PI, HALF_PI);
            ctx.closePath();
        }
        ctx.fill();
      } else {
        // triangle (Default)
        ctx.fillStyle = dataPalette[(gx + gy) % dataPalette.length] ?? '#000000';
        const len = cell * 0.3 * (0.7 + 0.9 * near);
        ctx.beginPath();
        ctx.moveTo(len, 0);
        ctx.lineTo(-len * 0.6, len * 0.55);
        ctx.lineTo(-len * 0.6, -len * 0.55);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let gy = 0; gy < rows; gy += 1) {
        for (let gx = 0; gx < cols; gx += 1) drawCell(gx, gy);
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
  }, [mode]);

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
