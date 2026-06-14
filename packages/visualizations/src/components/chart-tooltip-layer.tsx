'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useViewport } from '../lib/hooks';
import { ChartReadout } from './chart-readout';
import { PinTooltip } from './pin-tooltip';

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
  const pinnedElRef = useRef<HTMLElement | SVGElement | null>(null);
  const [tip, setTip] = useState<TipState | null>(null);
  const [pinned, setPinned] = useState<TipState | null>(null);
  const { coarse } = useViewport();

  const target = (node: EventTarget | null): HTMLElement | SVGElement | null =>
    ((node as Element | null)?.closest('[data-tip]') as HTMLElement | SVGElement | null) ?? null;

  const computeTip = useCallback((text: string, clientX: number, clientY: number): TipState | null => {
    const root = ref.current;
    if (!root || !text) return null;
    const r = root.getBoundingClientRect();
    const left = Math.min(Math.max(clientX - r.left, 8), r.width - 8);
    const top = clientY - r.top;
    return { left, top, text, below: top < 44 };
  }, []);

  /**
   * Hervorhebung am gepinnten Element. Default ist eine Outline (gleiche Mechanik wie der
   * Fokus-Ring) — formtreu für kleine Bounding-Boxen (Knoten-Gruppen, HTML-Zellen, GEFÜLLTE
   * Pfade wie Chord-Bögen/-Bänder). NUR strich-gezeichnete Pfade (Sankey-Bänder: `fill='none'`,
   * breiter Strich) werden stattdessen am Strich betont (volle Deckkraft) — dort läge eine
   * Outline als Rechteck um die fast chartbreite BBox ums ganze Diagramm. Unterschieden wird
   * am Zeichenkanal (gefüllt vs. strich), nicht am Elementtyp; nie nur über Farbe (Tooltip +
   * aria-live tragen den Wert).
   */
  const highlight = useCallback((el: HTMLElement | SVGElement | null) => {
    const apply = (node: HTMLElement | SVGElement, on: boolean) => {
      const strokeDrawn = node instanceof SVGPathElement && getComputedStyle(node).fill === 'none';
      if (strokeDrawn) {
        node.style.strokeOpacity = on ? '0.95' : '';
      } else {
        node.style.outline = on ? '2px solid var(--color-ink)' : '';
        node.style.outlineOffset = on ? '1px' : '';
      }
      if (on) node.setAttribute('data-pinned', 'true');
      else node.removeAttribute('data-pinned');
    };
    const prev = pinnedElRef.current;
    if (prev && prev !== el) apply(prev, false);
    if (el) apply(el, true);
    pinnedElRef.current = el;
  }, []);

  const unpin = useCallback(() => {
    highlight(null);
    setPinned(null);
  }, [highlight]);

  const pinEl = useCallback(
    (el: HTMLElement | SVGElement) => {
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
        <PinTooltip
          left={active.left}
          top={active.top}
          below={active.below}
          text={active.text}
          pinned={isPinned}
          onClose={unpin}
        />
      ) : null}
      <ChartReadout entry={isPinned && pinned ? pinned.text : null} />
    </div>
  );
}
