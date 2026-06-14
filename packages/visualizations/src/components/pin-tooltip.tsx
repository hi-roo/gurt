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
 */
export function PinTooltip({ left, top, below, text, pinned, onClose }: PinTooltipProps) {
  return (
    <div
      role="tooltip"
      data-pin-tooltip={pinned ? 'true' : undefined}
      className={`absolute z-40 flex max-w-[18rem] items-start gap-1.5 px-2.5 py-1.5 text-sm font-medium leading-snug shadow-lg ${
        pinned ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      style={{
        left,
        top,
        transform: below ? 'translate(-50%, 12px)' : 'translate(-50%, calc(-100% - 12px))',
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
      {/* Orientierungspfeil: zeigt auf den Datenpunkt. Farbe = Box-Hintergrund. */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 h-0 w-0 -translate-x-1/2"
        style={{
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
