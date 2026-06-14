'use client';

import { scaleBand } from 'd3-scale';
import { useMemo, useState } from 'react';
import type { Column, Row } from '../lib/types';
import { useResize } from '../lib/hooks';
import { DataTable } from './data-table';
import { buildMatrix, haltungStyle, type Haltung, type MatrixPosition } from './matrix';

export interface PositionMatrixProps {
  positions: MatrixPosition[];
  ariaLabel: string;
}

const MARGIN = { top: 124, right: 16, bottom: 8, left: 184 };
const ROW_HEIGHT = 56;
const MIN_COL_WIDTH = 132;
/** Sichtbarer Zwischenraum zwischen Zellen (px) — an die Quadratabstände des Waffle-Charts
 *  angeglichen. Jede Zelle wird um GAP/2 ringsum eingerückt → volle GAP-Lücke dazwischen. */
const GAP = 2;

/** Lesbare Textfarbe (dunkel/hell) je nach Helligkeit der Zellfarbe — für das Label IN der Zelle. */
function readableInk(hex: string): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6 ? '#16202f' : '#ffffff';
}

const TABLE_COLUMNS: Column[] = [
  { key: 'akteur', label: 'Akteur' },
  { key: 'massnahme', label: 'Maßnahme' },
  { key: 'haltung', label: 'Haltung' },
  { key: 'zitat', label: 'Zitat / Beleg' },
];

/**
 * Flagship-Visualisierung: Akteure (Zeilen) × Maßnahmen (Spalten), je Zelle die
 * Haltung. Macht sichtbar, dass mehrere Positionen gleichzeitig bestehen können
 * — das Leitbeispiel von Gurt. SSR-sicher (statisches SVG), Hover/Fokus hydriert.
 */
export function PositionMatrix({ positions, ariaLabel }: PositionMatrixProps) {
  const { ref, width } = useResize<HTMLDivElement>();
  const [active, setActive] = useState<MatrixPosition | null>(null);

  const matrix = useMemo(() => buildMatrix(positions), [positions]);

  const svgWidth = Math.max(width, MARGIN.left + MARGIN.right + matrix.massnahmen.length * MIN_COL_WIDTH);
  const svgHeight = MARGIN.top + matrix.akteure.length * ROW_HEIGHT + MARGIN.bottom;

  const x = useMemo(
    () =>
      scaleBand<string>()
        .domain(matrix.massnahmen)
        .range([MARGIN.left, svgWidth - MARGIN.right])
        .paddingInner(0)
        .paddingOuter(0.02),
    [matrix.massnahmen, svgWidth],
  );

  const y = useMemo(
    () =>
      scaleBand<string>()
        .domain(matrix.akteure)
        .range([MARGIN.top, svgHeight - MARGIN.bottom])
        .paddingInner(0)
        .paddingOuter(0.02),
    [matrix.akteure, svgHeight],
  );

  const usedHaltungen = useMemo(() => {
    const set = new Set<Haltung>(positions.map((p) => p.haltung));
    return (Object.keys(haltungStyle) as Haltung[]).filter((h) => set.has(h));
  }, [positions]);

  const tableRows: Row[] = positions.map((p) => ({
    akteur: p.akteur,
    massnahme: p.massnahme,
    haltung: haltungStyle[p.haltung].label,
    zitat: p.zitat ? `${p.zitat}${p.quelle?.titel ? ` (Quelle: ${p.quelle.titel})` : ''}` : '–',
  }));

  // Belege-Liste: nur Aussagen mit echter Quelle. Aussagen ohne Quelle (z. B.
  // „keine eindeutige Position“) erscheinen in der Tabelle, aber nicht als Beleg.
  const belege = positions.filter((p) => p.zitat && p.quelle);

  return (
    <div ref={ref} className="relative">
      {/* Desktop: das Raster-SVG (ab sm). Mobil ausgeblendet → kein Horizontalscroll. */}
      <div className="hidden overflow-x-auto sm:block">
        <svg
          width={svgWidth}
          height={svgHeight}
          role="img"
          aria-label={ariaLabel}
          className="text-ink"
          style={{ maxWidth: 'none' }}
        >
          {/* Spaltenköpfe (Maßnahmen), diagonal */}
          {matrix.massnahmen.map((massnahme) => {
            const cx = (x(massnahme) ?? 0) + x.bandwidth() / 2;
            return (
              <text
                key={massnahme}
                transform={`translate(${cx}, ${MARGIN.top - 12}) rotate(-30)`}
                textAnchor="start"
                className="fill-muted text-[12px]"
              >
                {massnahme}
              </text>
            );
          })}

          {/* Zeilenköpfe (Akteure) */}
          {matrix.akteure.map((akteur) => (
            <text
              key={akteur}
              x={MARGIN.left - 12}
              y={(y(akteur) ?? 0) + y.bandwidth() / 2}
              textAnchor="end"
              dominantBaseline="middle"
              className="fill-ink text-[13px] font-medium"
            >
              {akteur}
            </text>
          ))}

          {/* Zellen */}
          {matrix.akteure.map((akteur) =>
            matrix.massnahmen.map((massnahme) => {
              const position = matrix.get(akteur, massnahme);
              const cellX = x(massnahme) ?? 0;
              const cellY = y(akteur) ?? 0;
              const style = position ? haltungStyle[position.haltung] : null;
              const label = position
                ? `${akteur}, ${massnahme}: ${style?.label}${position.zitat ? `. Aussage: ${position.zitat}` : ''}${position.quelle?.titel ? ` (Quelle: ${position.quelle.titel})` : ''}`
                : `${akteur}, ${massnahme}: keine Angabe`;
              const isActive =
                !!position && active?.akteur === akteur && active?.massnahme === massnahme;
              const select = () => setActive(position ?? null);
              return (
                <g
                  key={`${akteur} ${massnahme}`}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isActive}
                  aria-label={label}
                  onClick={select}
                  onFocus={select}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      select();
                    } else if (event.key === 'Escape') {
                      setActive(null);
                    }
                  }}
                  className="cursor-pointer outline-none focus-visible:[&>rect]:stroke-accent"
                >
                  <rect
                    x={cellX + GAP / 2}
                    y={cellY + GAP / 2}
                    width={Math.max(0, x.bandwidth() - GAP)}
                    height={Math.max(0, y.bandwidth() - GAP)}
                    fill={style ? style.color : 'transparent'}
                    stroke={isActive ? 'var(--color-ink)' : style ? 'transparent' : 'var(--color-line)'}
                    strokeDasharray={!isActive && !style ? '3 3' : undefined}
                    strokeWidth={isActive ? 2.5 : 1.5}
                  />
                  {/* Haltungs-Label direkt in der Kachel (wie Treemap) → Farbe ist nicht
                      alleiniger Bedeutungsträger; nur wenn die Zelle breit genug ist. */}
                  {style && x.bandwidth() > 76 ? (
                    <text
                      x={cellX + x.bandwidth() / 2}
                      y={cellY + y.bandwidth() / 2}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="pointer-events-none"
                      fontSize={12}
                      fontWeight={500}
                      fill={readableInk(style.color)}
                    >
                      {style.short}
                    </text>
                  ) : null}
                </g>
              );
            }),
          )}
        </svg>
      </div>

      {/* Mobil: gestapelt nach Akteur statt Raster — kein Horizontalscroll (VIZ-5/ADR 0005).
          Gleiche Interaktion: Zeile antippen → Aussage + Quelle im Detail-Bereich unten. */}
      <div className="sm:hidden">
        {matrix.akteure.map((akteur) => (
          <div key={akteur} className="mb-4 last:mb-0">
            <h3 className="mb-1.5 text-sm font-medium text-ink">{akteur}</h3>
            <div className="divide-y divide-line/60 border border-line/60">
              {matrix.massnahmen.map((massnahme) => {
                const position = matrix.get(akteur, massnahme);
                const style = position ? haltungStyle[position.haltung] : null;
                const isActive =
                  !!position && active?.akteur === akteur && active?.massnahme === massnahme;
                const cellLabel = position
                  ? `${akteur}, ${massnahme}: ${style?.label}${position.zitat ? `. Aussage: ${position.zitat}` : ''}${position.quelle?.titel ? ` (Quelle: ${position.quelle.titel})` : ''}`
                  : `${akteur}, ${massnahme}: keine Angabe`;
                return (
                  <button
                    key={massnahme}
                    type="button"
                    aria-pressed={isActive}
                    aria-label={cellLabel}
                    onClick={() => setActive(position ?? null)}
                    onKeyDown={(event) => {
                      if (event.key === 'Escape') setActive(null);
                    }}
                    className={`flex w-full items-center justify-between gap-3 px-3 py-3 text-left text-sm outline-none focus-visible:bg-accent/10 ${
                      isActive ? 'bg-accent/10' : ''
                    }`}
                  >
                    <span className="min-w-0 flex-1 text-muted">{massnahme}</span>
                    {style ? (
                      <span
                        className="shrink-0 px-2 py-0.5 text-xs font-medium"
                        style={{ backgroundColor: style.color, color: readableInk(style.color) }}
                      >
                        {style.short}
                      </span>
                    ) : (
                      <span className="shrink-0 text-xs text-subtle">keine Angabe</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Detail-Bereich: Mindesthöhe reserviert Platz (kein Sprung), wächst aber bei
          längerem Text mit → nichts wird abgeschnitten. */}
      <div className="mt-3 min-h-[7rem]" aria-live="polite">
        {active?.zitat ? (
          <div className="bg-surface p-3 text-sm">
            <span className="font-medium">{active.akteur}</span>{' '}
            <span className="text-subtle">· {active.massnahme} · {haltungStyle[active.haltung].label}</span>
            <p className="mt-1 italic text-muted">„{active.zitat}“</p>
            {active.quelle?.url ? (
              <a
                href={active.quelle.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-xs text-accent hover:underline"
              >
                {active.quelle.titel ?? 'Quelle'} ↗
              </a>
            ) : active.quelle?.titel ? (
              <p className="mt-1 text-xs text-subtle">Quelle: {active.quelle.titel}</p>
            ) : null}
          </div>
        ) : (
          <p className="px-1 text-sm text-subtle">
            Zelle anklicken oder per Tastatur (Tab, dann Enter) wählen — zeigt Aussage + Quelle dauerhaft an (Esc schließt).
          </p>
        )}
      </div>

      {/* Legende */}
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
        {usedHaltungen.map((haltung) => (
          <li key={haltung} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-block h-3 w-3"
              style={{ backgroundColor: haltungStyle[haltung].color }}
            />
            {haltungStyle[haltung].label}
          </li>
        ))}
      </ul>

      {/* Belege: jede Aussage mit direkter Quelle (Stil-Guide §5) */}
      {belege.length ? (
        <div className="mt-5 border-t border-line pt-4">
          <h3 className="font-mono text-xs uppercase tracking-widest text-subtle">Belege</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {belege.map((p, index) => (
              <li key={`${p.akteur}-${p.massnahme}-${index}`}>
                <span className="font-medium text-ink">{p.akteur}</span>
                <span className="text-subtle"> · {p.massnahme}</span>: „{p.zitat}“{' '}
                {p.quelle?.url ? (
                  <a
                    href={p.quelle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whitespace-nowrap text-accent hover:underline"
                  >
                    {p.quelle.titel ?? 'Quelle'} ↗
                  </a>
                ) : p.quelle?.titel ? (
                  <span className="text-subtle">({p.quelle.titel})</span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Barrierefreier Tabellen-Fallback */}
      <details className="mt-4 text-sm text-muted">
        <summary className="cursor-pointer">Daten als Tabelle anzeigen</summary>
        <div className="mt-2 overflow-x-auto">
          <DataTable columns={TABLE_COLUMNS} rows={tableRows} />
        </div>
      </details>
    </div>
  );
}
