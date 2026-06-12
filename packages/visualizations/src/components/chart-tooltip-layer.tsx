'use client';

import { useCallback, useRef, useState, type ReactNode } from 'react';

interface TipState {
  left: number;
  top: number;
  text: string;
  below: boolean;
}

/**
 * Leichtgewichtiger, barrierefreier Tooltip-Layer für die Server-SVG-Charts
 * (Treemap/Sankey/Waffle). Zeigt sofort ein gestyltes Tooltip auf:
 * - **Hover** (folgt dem Cursor) für Maus,
 * - **Tastatur-Fokus** für fokussierbare Zellen (`tabIndex`),
 * - **Tap** (ein Tap fokussiert die Zelle → Tooltip) für Touch.
 *
 * Die Zellen tragen `data-tip="…"` (Tooltip-Text); fokussierbare Zellen zusätzlich
 * `tabIndex={0}` + `aria-label`. Escape schließt. Das SSR-Markup, die Legende und
 * der Tabellen-Fallback bleiben unberührt — der Tooltip ist reine Ergänzung.
 */
export function ChartTooltipLayer({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<TipState | null>(null);

  const place = useCallback((text: string, clientX: number, clientY: number) => {
    const root = ref.current;
    if (!root || !text) return;
    const r = root.getBoundingClientRect();
    const left = Math.min(Math.max(clientX - r.left, 8), r.width - 8);
    const top = clientY - r.top;
    setTip({ left, top, text, below: top < 44 });
  }, []);

  const target = (node: EventTarget | null): HTMLElement | null =>
    (node as Element | null)?.closest('[data-tip]') ?? null;

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const t = target(e.target);
      // Bei „kein Treffer“ NICHT verstecken (Lücken zwischen Zellen → kein Flackern);
      // verstecken übernimmt onPointerLeave.
      if (t) place(t.getAttribute('data-tip') ?? '', e.clientX, e.clientY);
    },
    [place],
  );

  const onPointerLeave = useCallback(() => setTip(null), []);

  const onFocus = useCallback(
    (e: React.FocusEvent) => {
      const t = target(e.target);
      if (!t) return;
      const b = t.getBoundingClientRect();
      place(t.getAttribute('data-tip') ?? '', b.left + b.width / 2, b.top);
    },
    [place],
  );

  const onBlur = useCallback(() => setTip(null), []);
  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setTip(null);
  }, []);

  return (
    <div
      ref={ref}
      className={`relative ${className ?? ''}`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onFocusCapture={onFocus}
      onBlurCapture={onBlur}
      onKeyDown={onKeyDown}
    >
      {children}
      {tip ? (
        <div
          role="tooltip"
          className="pointer-events-none absolute z-30 max-w-[18rem] px-2.5 py-1.5 text-sm font-medium leading-snug shadow-lg"
          style={{
            left: tip.left,
            top: tip.top,
            transform: tip.below ? 'translate(-50%, 12px)' : 'translate(-50%, calc(-100% - 12px))',
            background: 'var(--color-ink)',
            color: 'var(--color-paper)',
          }}
        >
          {tip.text}
        </div>
      ) : null}
    </div>
  );
}
