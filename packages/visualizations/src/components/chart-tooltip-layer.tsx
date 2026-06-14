'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useViewport } from '../lib/hooks';
import { ChartReadout } from './chart-readout';

interface TipState {
  left: number;
  top: number;
  text: string;
  below: boolean;
}

/**
 * Tooltip-Layer mit **Tap-to-Pin** für die Server-SVG-Charts (Treemap/Sankey/Waffle).
 * Zwei Zustände, eine Render-Regel `pinned ?? tip`:
 * - **tip** — flüchtig (Hover auf Maus, Tastatur-Fokus); verschwindet bei Leave/Blur.
 * - **pinned** — persistent; überlebt Leave/Blur/Scroll, fällt nur durch erneuten
 *   Tap/Enter (Toggle), Escape, Tap-daneben oder das Schließen-×.
 *
 * Auf Touch (`coarse`) ist die Hover-Vorschau aus; gepinnt wird per Tap. Der angeheftete
 * Wert wird zusätzlich über eine gemeinsame `aria-live`-Senke (`ChartReadout`) angesagt;
 * das gepinnte Element bekommt eine Outline (Hervorhebung nie nur über Farbe). Die Zellen
 * tragen wie bisher `data-tip` (+ fokussierbare Zellen `tabIndex`+`aria-label`); Legende und
 * Tabellen-Fallback bleiben die vollständige, barrierefreie Quelle.
 */
export function ChartTooltipLayer({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const pinnedElRef = useRef<HTMLElement | null>(null);
  const [tip, setTip] = useState<TipState | null>(null);
  const [pinned, setPinned] = useState<TipState | null>(null);
  const { coarse } = useViewport();

  const target = (node: EventTarget | null): HTMLElement | null =>
    (node as Element | null)?.closest('[data-tip]') ?? null;

  const computeTip = useCallback((text: string, clientX: number, clientY: number): TipState | null => {
    const root = ref.current;
    if (!root || !text) return null;
    const r = root.getBoundingClientRect();
    const left = Math.min(Math.max(clientX - r.left, 8), r.width - 8);
    const top = clientY - r.top;
    return { left, top, text, below: top < 44 };
  }, []);

  /** Outline am gepinnten Element — gleiche Mechanik wie der Fokus-Ring (auch in SVG). */
  const highlight = useCallback((el: HTMLElement | null) => {
    const prev = pinnedElRef.current;
    if (prev && prev !== el) {
      prev.style.outline = '';
      prev.style.outlineOffset = '';
      prev.removeAttribute('data-pinned');
    }
    if (el) {
      el.style.outline = '2px solid var(--color-ink)';
      el.style.outlineOffset = '1px';
      el.setAttribute('data-pinned', 'true');
    }
    pinnedElRef.current = el;
  }, []);

  const unpin = useCallback(() => {
    highlight(null);
    setPinned(null);
  }, [highlight]);

  const pinEl = useCallback(
    (el: HTMLElement) => {
      const b = el.getBoundingClientRect();
      const t = computeTip(el.getAttribute('data-tip') ?? '', b.left + b.width / 2, b.top);
      if (!t) return;
      highlight(el);
      setPinned(t);
    },
    [computeTip, highlight],
  );

  // Hover-Vorschau (nur Maus/fine): folgt dem Zeiger; Pin bleibt unberührt.
  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (coarse) return;
      const el = target(e.target);
      if (el) setTip(computeTip(el.getAttribute('data-tip') ?? '', e.clientX, e.clientY));
    },
    [coarse, computeTip],
  );

  const onPointerLeave = useCallback(() => setTip(null), []);

  // Tastatur-Fokus = flüchtige Vorschau (am Element verankert).
  const onFocus = useCallback(
    (e: React.FocusEvent) => {
      const el = target(e.target);
      if (!el) return;
      const b = el.getBoundingClientRect();
      setTip(computeTip(el.getAttribute('data-tip') ?? '', b.left + b.width / 2, b.top));
    },
    [computeTip],
  );

  const onBlur = useCallback(() => setTip(null), []);

  // Tap/Klick: Toggle-Pin am getroffenen Element; Klick auf Leerraum löst.
  const onClick = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as Element | null)?.closest('[data-pin-tooltip]')) return; // Klicks im Tooltip (× regelt selbst)
      const el = target(e.target);
      if (!el || pinnedElRef.current === el) {
        unpin();
        return;
      }
      pinEl(el);
    },
    [pinEl, unpin],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        unpin();
        setTip(null);
        return;
      }
      if (e.key === 'Enter' || e.key === ' ') {
        const el = target(document.activeElement);
        if (el) {
          e.preventDefault();
          if (pinnedElRef.current === el) unpin();
          else pinEl(el);
        }
      }
    },
    [pinEl, unpin],
  );

  // Tap-daneben: pointerdown außerhalb des Layers löst den Pin (mit Cleanup).
  useEffect(() => {
    if (!pinned) return undefined;
    const onDown = (e: PointerEvent) => {
      const root = ref.current;
      if (root && !root.contains(e.target as Node)) unpin();
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [pinned, unpin]);

  const active = pinned ?? tip;
  const isPinned = pinned !== null;

  return (
    <div
      ref={ref}
      className={`relative ${className ?? ''}`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onClick={onClick}
      onFocusCapture={onFocus}
      onBlurCapture={onBlur}
      onKeyDown={onKeyDown}
    >
      {children}
      {active ? (
        <div
          role="tooltip"
          data-pin-tooltip={isPinned ? 'true' : undefined}
          className={`absolute z-40 flex max-w-[18rem] items-start gap-1.5 px-2.5 py-1.5 text-sm font-medium leading-snug shadow-lg ${
            isPinned ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
          style={{
            left: active.left,
            top: active.top,
            transform: active.below ? 'translate(-50%, 12px)' : 'translate(-50%, calc(-100% - 12px))',
            background: 'var(--color-ink)',
            color: 'var(--color-paper)',
          }}
        >
          <span>{active.text}</span>
          {isPinned ? (
            <button
              type="button"
              aria-label="Schließen"
              onClick={(e) => {
                e.stopPropagation();
                unpin();
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
          {/* Orientierungspfeil: zeigt auf den Datenpunkt. Farbe = Box-Hintergrund. */}
          <span
            aria-hidden="true"
            className="absolute left-1/2 h-0 w-0 -translate-x-1/2"
            style={{
              [active.below ? 'top' : 'bottom']: -5,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              ...(active.below
                ? { borderBottom: '5px solid var(--color-ink)' }
                : { borderTop: '5px solid var(--color-ink)' }),
            }}
          />
        </div>
      ) : null}
      <ChartReadout entry={isPinned && pinned ? pinned.text : null} />
    </div>
  );
}
