import { dataPalette } from '@gurt/ui/tokens';
import type { Column, Row } from '../lib/types';
import { ChartTooltipLayer } from './chart-tooltip-layer';
import { DataTable } from './data-table';
import { buildChord, pairsToMatrix, type ChordSubArc } from './chord';

export interface ChordChartProps {
  data: Row[];
  /** Feld für Entität A (ungerichtetes Paar). */
  source: string;
  /** Feld für Entität B. */
  target: string;
  /** Feld für den Beziehungswert (z. B. Übereinstimmung in %). */
  value: string;
  ariaLabel: string;
  /** Einheit für Tooltip/Tabelle (Default „%“). */
  unit?: string;
  /**
   * Optionale Label→Farbe-Zuordnung (Hex). Default ist die rein kategoriale
   * Palette; eine Zuordnung erlaubt etablierte Identitätsfarben bei Charts über
   * benannte Akteure/Fraktionen (dokumentierte Ausnahme — nie wertend, AA Pflicht).
   */
  colorByLabel?: Record<string, string>;
  columns?: Column[];
}

const VB_W = 760;
const VB_H = 720;
const CX = VB_W / 2;
const CY = 356;
const R_OUT = 250; // Außenradius der Gruppen-Bänder
const BAND = 15; // Dicke der Gruppen-Bänder
const R_RIB = R_OUT - BAND; // Radius, an dem die Ribbons ansetzen
const R_LABEL = R_OUT + 16;

/** Punkt auf dem Kreis: 0 = oben, wachsender Winkel = im Uhrzeigersinn. */
function point(angle: number, r: number): [number, number] {
  return [CX + r * Math.sin(angle), CY - r * Math.cos(angle)];
}

function arcBand(start: number, end: number): string {
  const [ox0, oy0] = point(start, R_OUT);
  const [ox1, oy1] = point(end, R_OUT);
  const [ix1, iy1] = point(end, R_OUT - BAND);
  const [ix0, iy0] = point(start, R_OUT - BAND);
  const large = end - start > Math.PI ? 1 : 0;
  return `M ${ox0} ${oy0} A ${R_OUT} ${R_OUT} 0 ${large} 1 ${ox1} ${oy1} L ${ix1} ${iy1} A ${R_OUT - BAND} ${R_OUT - BAND} 0 ${large} 0 ${ix0} ${iy0} Z`;
}

function ribbonPath(s: ChordSubArc, t: ChordSubArc): string {
  const [sx0, sy0] = point(s.a0, R_RIB);
  const [sx1, sy1] = point(s.a1, R_RIB);
  const [tx0, ty0] = point(t.a0, R_RIB);
  const [tx1, ty1] = point(t.a1, R_RIB);
  const sLarge = s.a1 - s.a0 > Math.PI ? 1 : 0;
  const tLarge = t.a1 - t.a0 > Math.PI ? 1 : 0;
  return `M ${sx0} ${sy0} A ${R_RIB} ${R_RIB} 0 ${sLarge} 1 ${sx1} ${sy1} Q ${CX} ${CY} ${tx0} ${ty0} A ${R_RIB} ${R_RIB} 0 ${tLarge} 1 ${tx1} ${ty1} Q ${CX} ${CY} ${sx0} ${sy0} Z`;
}

const fmtPct = (v: number, unit: string): string =>
  `${v.toLocaleString('de-DE', { maximumFractionDigits: 1 })}${unit ? ` ${unit}` : ''}`;

/**
 * Chord-Diagramm: symmetrische Beziehungen zwischen Entitäten. Jede Entität ist
 * ein Bogen (Größe ∝ Summe ihrer Beziehungen); jedes Band (Ribbon) verbindet zwei
 * Entitäten, seine Breite ∝ Beziehungswert. Reines SVG → SSR-fähig. Farben per
 * Default rein kategorial (Palette „GURT Vibrant“); optional erlaubt `colorByLabel`
 * etablierte Identitätsfarben bei benannten Akteuren/Fraktionen (dokumentierte
 * Ausnahme, nie wertend). Bögen/Bänder tragen `data-tip` (interaktives Tooltip via
 * `ChartTooltipLayer`); vollständige, barrierefreie Quelle bleibt der Tabellen-Fallback.
 */
export function ChordChart({ data, source, target, value, ariaLabel, unit = '%', colorByLabel, columns }: ChordChartProps) {
  const { labels, matrix } = pairsToMatrix(data, source, target, value);
  const layout = buildChord(labels, matrix);
  const color = (i: number): string =>
    colorByLabel?.[labels[i] ?? ''] ?? dataPalette[i % dataPalette.length] ?? dataPalette[0];

  const tableColumns: Column[] = columns ?? [
    { key: source, label: source },
    { key: target, label: target },
    { key: value, label: value, unit, align: 'right' },
  ];
  const tableRows: Row[] = [...layout.ribbons]
    .sort((a, b) => b.value - a.value)
    .map((r) => ({
      [source]: labels[r.i] ?? '',
      [target]: labels[r.j] ?? '',
      [value]: r.value,
    }));

  return (
    <ChartTooltipLayer>
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="mx-auto h-auto w-full min-w-[20rem] max-w-[34rem]"
          role="img"
          aria-label={ariaLabel}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Bänder zuerst (liegen hinter den Bögen) */}
          {layout.ribbons.map((r) => {
            const tip = `${labels[r.i]} ↔ ${labels[r.j]}: ${fmtPct(r.value, unit)}`;
            return (
              <path
                key={`r-${r.i}-${r.j}`}
                d={ribbonPath(r.source, r.target)}
                fill={color(r.i)}
                fillOpacity={0.5}
                stroke={color(r.i)}
                strokeOpacity={0.25}
                strokeWidth={0.5}
                tabIndex={0}
                role="img"
                aria-label={tip}
                data-tip={tip}
                className="cursor-help transition-opacity hover:[fill-opacity:0.85] [outline:none] focus-visible:[outline:2px_solid_var(--color-accent)] focus-visible:[outline-offset:2px]"
              />
            );
          })}

          {/* Gruppen-Bögen + Labels */}
          {layout.groups.map((g) => {
            if (g.endAngle - g.startAngle < 0.001) return null;
            const mid = (g.startAngle + g.endAngle) / 2;
            const [lx, ly] = point(mid, R_LABEL);
            const anchor = Math.sin(mid) >= 0 ? 'start' : 'end';
            const tip = `${g.label}`;
            return (
              <g key={`g-${g.index}`}>
                <path
                  d={arcBand(g.startAngle, g.endAngle)}
                  fill={color(g.index)}
                  tabIndex={0}
                  role="img"
                  aria-label={tip}
                  data-tip={tip}
                  className="cursor-help [outline:none] focus-visible:[outline:2px_solid_var(--color-accent)] focus-visible:[outline-offset:2px]"
                />
                <text
                  x={lx}
                  y={ly}
                  textAnchor={anchor}
                  dominantBaseline="middle"
                  fill="var(--color-ink)"
                  fontSize={18}
                  fontWeight={600}
                >
                  {g.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <details className="mt-4 text-sm text-muted">
        <summary className="cursor-pointer">Daten als Tabelle anzeigen</summary>
        <div className="mt-2 overflow-x-auto">
          <DataTable columns={tableColumns} rows={tableRows} />
        </div>
      </details>
    </ChartTooltipLayer>
  );
}
