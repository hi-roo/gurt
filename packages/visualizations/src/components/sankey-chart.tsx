import { dataPalette } from '@gurt/ui/tokens';
import type { Column, Row } from '../lib/types';
import { ChartTooltipLayer } from './chart-tooltip-layer';
import { DataTable } from './data-table';
import { layoutSankey, toSankeyLinks } from './sankey';

export interface SankeyChartProps {
  data: Row[];
  source: string;
  target: string;
  value: string;
  ariaLabel: string;
  columns?: Column[];
}

const VB_W = 1000;
const VB_H = 460;
// bottom genügend groß, damit die zweizeilige Beschriftung des UNTERSTEN Knotens
// (Wert + Anteil, ~1,1 em unter der Knotenmitte) noch in die viewBox passt — sonst
// klippt das SVG die letzte Zeile (der unterste Knoten sitzt am Rand von innerH).
const MARGIN = { top: 34, right: 250, bottom: 32, left: 14 };

const fmt = (n: number): string => n.toLocaleString('de-DE', { maximumFractionDigits: 1 });
// Quell-/Ziel-/Wert-Feldnamen für den Tabellenkopf großschreiben (z. B. „von“→„Von“),
// statt den rohen Schlüssel zu zeigen.
const cap = (s: string): string => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

/**
 * Sankey: Flüsse zwischen Knoten, Bandbreite ∝ Menge. Kontextualisierend —
 * zeigt, wie sich ein Ganzes auf Verwendungen verteilt. Reines SVG → SSR-fähig,
 * kein Layout-Sprung. Bänder in Ziel-Farbe („GURT Vibrant“); Bänder/Knoten tragen
 * ein `data-tip` → interaktives Tooltip (Hover/Fokus/Tap) über `ChartTooltipLayer`;
 * Tabellen-Fallback.
 */
export function SankeyChart({ data, source, target, value, ariaLabel, columns }: SankeyChartProps) {
  const links = toSankeyLinks(data, source, target, value);
  const innerW = VB_W - MARGIN.left - MARGIN.right;
  const innerH = VB_H - MARGIN.top - MARGIN.bottom;
  const layout = layoutSankey(links, { width: innerW, height: innerH, nodeWidth: 16, nodePadding: 24 });
  const unit = columns?.find((c) => c.key === value)?.unit;

  // Bezugsgröße für Prozente = Gesamtfluss F (Summe der Quellknoten in Layer 0), NICHT die
  // Summe ALLER Links: Bei mehrstufigen (zweiseitigen) Sankeys — Einnahmen → Knoten → Ausgaben —
  // durchläuft jede Einheit zwei Kanten, die Link-Summe wäre 2·F und die Anteile halbiert
  // (Bundeshaushalt: 197/1049 ≈ 19 % statt 197/524 ≈ 38 %). F = die eine Flussseite.
  const maxLayer = layout.nodes.reduce((m, n) => Math.max(m, n.layer), 0);
  const flowTotal = layout.nodes.filter((n) => n.layer === 0).reduce((acc, n) => acc + n.value, 0) || 1;

  // Ziel-Knoten bekommen Palette-Farben; Quellknoten neutral (Strukturknoten).
  const targets = layout.nodes.filter((n) => n.layer !== 0);
  const colorByKey = new Map<string, string>();
  layout.nodes.forEach((n) => {
    if (n.layer === 0) colorByKey.set(n.key, 'var(--color-ink)');
  });
  targets.forEach((n, i) => colorByKey.set(n.key, dataPalette[i % dataPalette.length] ?? dataPalette[0]));

  const pct = (v: number): string => `${((v / flowTotal) * 100).toFixed(0)} %`;

  const tableColumns: Column[] = [
    { key: source, label: cap(source) },
    { key: target, label: cap(target) },
    { key: value, label: cap(value), unit, align: 'right' },
    { key: 'anteil', label: 'Anteil', align: 'right' },
  ];
  const tableRows: Row[] = links.map((l) => ({
    [source]: l.source,
    [target]: l.target,
    [value]: l.value,
    anteil: `${((l.value / flowTotal) * 100).toFixed(1).replace('.', ',')} %`,
  }));

  return (
    <ChartTooltipLayer>
      <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="h-auto w-full min-w-[32rem]"
        role="img"
        aria-label={ariaLabel}
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
          {layout.links.map((l) => (
            <path
              key={`${l.source}-${l.target}`}
              d={l.path}
              fill="none"
              stroke={colorByKey.get(l.target) ?? dataPalette[0]}
              strokeWidth={Math.max(1, l.width)}
              strokeOpacity={0.42}
              className="cursor-help"
              data-tip={`${l.source} → ${l.target}: ${fmt(l.value)}${unit ? ` ${unit}` : ''} (${pct(l.value)})`}
            />
          ))}

          {layout.nodes.map((n) => {
            const isSource = n.layer === 0;
            const nodeTip = `${n.key}: ${fmt(n.value)}${unit ? ` ${unit}` : ''}`;
            return (
              <g
                key={n.key}
                data-tip={nodeTip}
                tabIndex={0}
                role="img"
                aria-label={nodeTip}
                className="cursor-help [outline:none] focus-visible:[outline:2px_solid_var(--color-accent)] focus-visible:[outline-offset:2px]"
              >
                <rect x={n.x} y={n.y} width={n.w} height={n.h} fill={colorByKey.get(n.key)} />
                {isSource ? (
                  <text x={n.x} y={n.y - 12} textAnchor="start" fill="var(--color-ink)" fontSize={20} fontWeight={600}>
                    {`${n.key} · ${fmt(n.value)}${unit ? ` ${unit}` : ''}`}
                  </text>
                ) : (
                  <text x={n.x + n.w + 10} y={n.y + n.h / 2} dominantBaseline="middle" fill="var(--color-ink)" fontSize={15}>
                    <tspan x={n.x + n.w + 10} dy="-0.15em" fontWeight={600}>
                      {n.key}
                    </tspan>
                    <tspan x={n.x + n.w + 10} dy="1.25em" opacity={0.7}>
                      {n.layer === maxLayer
                        ? `${fmt(n.value)}${unit ? ` ${unit}` : ''} · ${pct(n.value)}`
                        : `${fmt(n.value)}${unit ? ` ${unit}` : ''}`}
                    </tspan>
                  </text>
                )}
              </g>
            );
          })}
        </g>
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
