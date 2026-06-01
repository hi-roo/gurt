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
const ROW_HEIGHT = 44;
const MIN_COL_WIDTH = 96;

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
        .padding(0.08),
    [matrix.massnahmen, svgWidth],
  );

  const y = useMemo(
    () =>
      scaleBand<string>()
        .domain(matrix.akteure)
        .range([MARGIN.top, svgHeight - MARGIN.bottom])
        .padding(0.14),
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

  const belege = positions.filter((p) => p.zitat);

  return (
    <div ref={ref} className="relative">
      <div className="overflow-x-auto">
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
              return (
                <g
                  key={`${akteur} ${massnahme}`}
                  tabIndex={0}
                  role="img"
                  aria-label={label}
                  onMouseEnter={() => setActive(position ?? null)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(position ?? null)}
                  onBlur={() => setActive(null)}
                  className="cursor-default outline-none focus-visible:[&>rect]:stroke-accent"
                >
                  <title>{label}</title>
                  <rect
                    x={cellX}
                    y={cellY}
                    width={x.bandwidth()}
                    height={y.bandwidth()}
                    rx={4}
                    fill={style ? style.color : 'transparent'}
                    stroke={style ? 'transparent' : 'var(--color-line)'}
                    strokeDasharray={style ? undefined : '3 3'}
                    strokeWidth={1.5}
                  />
                </g>
              );
            }),
          )}
        </svg>
      </div>

      {/* Tooltip mit Aussage + Quelle */}
      {active?.zitat ? (
        <div className="mt-3 rounded-md border border-line bg-surface p-3 text-sm">
          <span className="font-medium">{active.akteur}</span>{' '}
          <span className="text-subtle">· {active.massnahme} · {haltungStyle[active.haltung].label}</span>
          <p className="mt-1 italic text-muted">„{active.zitat}"</p>
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
      ) : null}

      {/* Legende */}
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
        {usedHaltungen.map((haltung) => (
          <li key={haltung} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-block h-3 w-3 rounded-sm border border-line"
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
                <span className="text-subtle"> · {p.massnahme}</span>: „{p.zitat}"{' '}
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
