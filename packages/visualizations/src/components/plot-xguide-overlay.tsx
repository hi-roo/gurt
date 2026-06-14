'use client';

import {
  useCallback,
  useMemo,
  useRef,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from 'react';
import { useViewport } from '../lib/hooks';
import { usePin } from '../lib/use-pin';
import { ChartReadout } from './chart-readout';

export interface XGuideEntry {
  series: string;
  /** Formatierter Wert inkl. Einheit, z. B. „245 TWh“. */
  value: string;
  /** Reihenfarbe (nie alleiniger Träger). */
  color?: string;
}

export interface XGuideColumn {
  /** Pixel-x im Overlay-Koordinatensystem. */
  x: number;
  /** x-Beschriftung, z. B. „2024“. */
  label: string;
  entries: XGuideEntry[];
}

export interface PlotXGuideOverlayProps {
  columns: XGuideColumn[];
  /** Overlay-Breite (für die Readout-Box-Klemmung). */
  width: number;
  ariaLabel: string;
}

/**
 * Tap-to-Pin-Overlay mit **vertikaler x-Führung** für gestapelte Flächendiagramme —
 * statt eines einzelnen Punkts (das Band liegt auf der kumulierten Summe) zeigt das
 * Antippen einer Zeitstelle eine senkrechte Führungslinie + die Werte ALLER Bänder an
 * diesem x (gut zum Vergleich der Zusammensetzung). Persistenter Pin (Tap; Pfeile =
 * Vorschau + Enter = Pin; Escape; Tap-daneben; Schließen-×), auf Touch (`coarse`) Hover
 * aus, aria-live-Ansage. Liegt deckungsgleich (`inset-0`) im `relative`-Plot-Container.
 */
export function PlotXGuideOverlay({ columns, width, ariaLabel }: PlotXGuideOverlayProps) {
  const ref = useRef<HTMLDivElement>(null);
  const lastSrc = useRef<'mouse' | 'key'>('mouse');
  const { coarse } = useViewport();
  const { active, pinned, setHover, togglePin, clearPin, moveFocus } = usePin(columns.length, ref);

  const xs = useMemo(() => columns.map((c) => c.x), [columns]);

  const nearestX = useCallback(
    (clientX: number): number => {
      const r = ref.current?.getBoundingClientRect();
      if (!r || !xs.length) return -1;
      const px = clientX - r.left;
      let best = -1;
      let bestD = Infinity;
      for (let i = 0; i < xs.length; i += 1) {
        const d = Math.abs(xs[i]! - px);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      }
      return best;
    },
    [xs],
  );

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      if (coarse) return;
      lastSrc.current = 'mouse';
      setHover(nearestX(e.clientX));
    },
    [coarse, nearestX, setHover],
  );

  const onPointerLeave = useCallback(() => setHover(null), [setHover]);

  const onClick = useCallback(
    (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest('[data-pin-tooltip]')) return;
      lastSrc.current = 'mouse';
      const i = nearestX(e.clientX);
      if (i >= 0) togglePin(i);
    },
    [nearestX, togglePin],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        clearPin();
        setHover(null);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        lastSrc.current = 'key';
        moveFocus(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        lastSrc.current = 'key';
        moveFocus(-1);
      } else if ((e.key === 'Enter' || e.key === ' ') && active != null) {
        e.preventDefault();
        lastSrc.current = 'key';
        togglePin(active);
      }
    },
    [clearPin, setHover, moveFocus, active, togglePin],
  );

  const col = active != null ? columns[active] ?? null : null;
  const isPinned = pinned != null;
  const announce =
    col && (isPinned || lastSrc.current === 'key')
      ? `${col.label}: ${col.entries.map((en) => `${en.series} ${en.value}`).join(', ')}`
      : '';
  // Readout-Box auf die Seite mit mehr Platz legen (rechts vom Strich, sonst links).
  const flipLeft = col ? col.x > width * 0.6 : false;

  return (
    <div
      ref={ref}
      tabIndex={0}
      aria-label={ariaLabel}
      className="absolute inset-0 [outline:none] focus-visible:[outline:2px_solid_var(--color-accent)] focus-visible:[outline-offset:2px]"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {col ? (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 top-0 w-px"
            style={{ left: col.x, background: 'var(--color-ink)', opacity: 0.5 }}
          />
          <div
            role="tooltip"
            data-pin-tooltip={isPinned ? 'true' : undefined}
            className={`absolute top-2 z-40 max-w-[15rem] px-2.5 py-2 text-sm leading-snug shadow-lg ${
              isPinned ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
            style={{
              left: col.x,
              transform: flipLeft ? 'translateX(calc(-100% - 8px))' : 'translateX(8px)',
              background: 'var(--color-ink)',
              color: 'var(--color-paper)',
            }}
          >
            <div className="flex items-start justify-between gap-2">
              <span className="font-semibold">{col.label}</span>
              {isPinned ? (
                <button
                  type="button"
                  aria-label="Schließen"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearPin();
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
            </div>
            <ul className="mt-1 space-y-0.5">
              {col.entries.map((en) => (
                <li key={en.series} className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="inline-block h-2.5 w-2.5 shrink-0"
                    style={{ background: en.color }}
                  />
                  <span>{en.series}</span>
                  <span className="ml-auto pl-3 tabular-nums">{en.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : null}
      <ChartReadout entry={announce} />
    </div>
  );
}
