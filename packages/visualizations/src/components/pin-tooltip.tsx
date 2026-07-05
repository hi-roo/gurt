'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { tooltipArrowLeft, tooltipShift } from '../lib/tooltip-shift';

export interface PinTooltipProps {
  /** Position relativ zum Container (px). */
  left: number;
  top: number;
  /** Unter dem Punkt platzieren (wenn oben kein Platz). */
  below: boolean;
  text: string;
  /** Angeheftet → klickbar (pointer-events) + Schließen-×. */
  pinned: boolean;
  onClose?: () => void;
}

/**
 * Das gemeinsame Tooltip — EINE Tooltip-Sprache für alle Chart-Familien (Server-SVG via
 * `ChartTooltipLayer`, Plot via `PlotPinOverlay`). Dunkle Box mit Orientierungspfeil; im
 * angehefteten Zustand `pointer-events-auto` + Schließen-×, sonst `pointer-events-none`.
 *
 * Randkorrektur: Die Box ist standardmäßig über dem Datenpunkt zentriert; an den
 * Diagrammrändern würde sie vom Container abgeschnitten. Nach dem Rendern wird sie
 * vermessen (`useLayoutEffect`, vor dem Paint) und per `tooltipShift` in den Container
 * geschoben — der Pfeil bleibt via `tooltipArrowLeft` auf dem Datenpunkt.
 */
export function PinTooltip({ left, top, below, text, pinned, onClose }: PinTooltipProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState<{ dx: number; arrow: number | null }>({ dx: 0, arrow: null });

  useLayoutEffect(() => {
    const el = boxRef.current;
    const host = el?.offsetParent as HTMLElement | null;
    if (!el || !host) return;
    const dx = tooltipShift(left, el.offsetWidth, host.clientWidth);
    const arrow = tooltipArrowLeft(el.offsetWidth, dx);
    setFit((f) => (Math.abs(f.dx - dx) < 0.5 && f.arrow === arrow ? f : { dx, arrow }));
  }, [left, top, below, text, pinned]);

  return (
    <div
      ref={boxRef}
      role="tooltip"
      data-pin-tooltip={pinned ? 'true' : undefined}
      className={`absolute z-40 flex max-w-[18rem] items-start gap-1.5 px-2.5 py-1.5 text-sm font-medium leading-snug shadow-lg ${
        pinned ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      style={{
        left,
        top,
        transform: below
          ? `translate(calc(-50% + ${fit.dx}px), 12px)`
          : `translate(calc(-50% + ${fit.dx}px), calc(-100% - 12px))`,
        background: 'var(--color-ink)',
        color: 'var(--color-paper)',
      }}
    >
      <span>{text}</span>
      {pinned && onClose ? (
        <button
          type="button"
          aria-label="Schließen"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="-mr-1 -mt-0.5 shrink-0 opacity-80 hover:opacity-100"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      ) : null}
      {/* Orientierungspfeil: zeigt auf den Datenpunkt — auch wenn die Box am Rand
          verschoben wurde (Gegenversatz). Farbe = Box-Hintergrund. */}
      <span
        aria-hidden="true"
        className="absolute h-0 w-0 -translate-x-1/2"
        style={{
          left: fit.arrow ?? '50%',
          [below ? 'top' : 'bottom']: -5,
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          ...(below
            ? { borderBottom: '5px solid var(--color-ink)' }
            : { borderTop: '5px solid var(--color-ink)' }),
        }}
      />
    </div>
  );
}
