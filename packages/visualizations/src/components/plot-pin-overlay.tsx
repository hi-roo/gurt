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
import { pickNearest, type Frame, type PointerWeight } from '../lib/pick-nearest';
import { usePin } from '../lib/use-pin';
import { ChartReadout } from './chart-readout';
import { PinTooltip } from './pin-tooltip';

export interface PlotPinPoint {
  /** Pixelposition im Plot-/Overlay-Koordinatensystem. */
  x: number;
  y: number;
  /** Tooltip- und Vorlese-Text (vorformatiert: „Jahr 2024 · 3,2 % BIP“). */
  text: string;
  /** Ring-Farbe (Reihe/Kategorie); nie alleiniger Bedeutungsträger. */
  color?: string;
}

export interface PlotPinOverlayProps {
  points: PlotPinPoint[];
  /** Achsen-Gewichtung wie Plots Pointer (POINTER_X/Y/XY). */
  weight: PointerWeight;
  /** Datenfläche für den Rand-Flip (optional). */
  frame?: Frame;
  /** Beschriftung des fokussierbaren Overlays. */
  ariaLabel: string;
}

const RING = 7;

/**
 * Transparentes Pointer-Capture-Overlay über einem Observable-Plot-SVG — bringt Tap-to-Pin
 * zu den Plot-Charts (Balken/Linie/Fläche/Beeswarm) und ersetzt Plots reinen Hover-Tip.
 * Wählt den nächsten Datenpunkt per `pickNearest` (Pixel aus den Plot-Skalen via
 * `ObservablePlot.onPlot`), pinnt/hovert über `usePin` (Tap; Pfeile = Vorschau + Enter = Pin;
 * Escape; Tap-daneben), rendert einen DOM-Ring als Anker (KEIN Plot-Re-render → kein
 * Flackern/Fokusverlust) und das gemeinsame `PinTooltip`. Die Trefferzone ist die gesamte
 * Fläche (entkoppelt vom kleinen Marker). Auf Touch (`coarse`) ist die Hover-Vorschau aus.
 * Liegt deckungsgleich (`inset-0`) im `relative`-Plot-Container; der gepinnte Wert wird über
 * die gemeinsame `aria-live`-Senke angesagt (Tastatur-Navigation ebenso).
 */
export function PlotPinOverlay({ points, weight, frame, ariaLabel }: PlotPinOverlayProps) {
  const ref = useRef<HTMLDivElement>(null);
  const lastSrc = useRef<'mouse' | 'key'>('mouse');
  const { coarse } = useViewport();
  const { active, pinned, setHover, togglePin, clearPin, moveFocus } = usePin(points.length, ref);

  const pts = useMemo(() => points.map((p) => ({ x: p.x, y: p.y })), [points]);

  const localPick = useCallback(
    (clientX: number, clientY: number): number => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return -1;
      return pickNearest(pts, clientX - r.left, clientY - r.top, weight, frame);
    },
    [pts, weight, frame],
  );

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      if (coarse) return;
      lastSrc.current = 'mouse';
      const i = localPick(e.clientX, e.clientY);
      setHover(i >= 0 ? i : null);
    },
    [coarse, localPick, setHover],
  );

  const onPointerLeave = useCallback(() => setHover(null), [setHover]);

  const onClick = useCallback(
    (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest('[data-pin-tooltip]')) return;
      lastSrc.current = 'mouse';
      const i = localPick(e.clientX, e.clientY);
      if (i >= 0) togglePin(i);
    },
    [localPick, togglePin],
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

  const ap = active != null ? points[active] ?? null : null;
  const isPinned = pinned != null;
  // Auf der gemeinsamen aria-live-Senke nur Pin und Tastatur-Navigation ansagen — nicht
  // jede Maus-Hover-Bewegung (das wäre Geplapper).
  const announce = ap && (isPinned || lastSrc.current === 'key') ? ap.text : null;

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
      {ap ? (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute rounded-full"
            style={{
              left: ap.x,
              top: ap.y,
              width: RING * 2,
              height: RING * 2,
              transform: 'translate(-50%, -50%)',
              border: `2px solid ${ap.color ?? 'var(--color-ink)'}`,
              boxShadow: '0 0 0 2px var(--color-paper)',
            }}
          />
          <PinTooltip
            left={ap.x}
            top={ap.y}
            below={ap.y < 44}
            text={ap.text}
            pinned={isPinned}
            onClose={clearPin}
          />
        </>
      ) : null}
      <ChartReadout entry={announce} />
    </div>
  );
}
