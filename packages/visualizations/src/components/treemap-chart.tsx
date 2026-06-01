import { dataPalette } from '@gurt/ui/tokens';
import type { Column, Row } from '../lib/types';
import { DataTable } from './data-table';
import { layoutTreemap, toTreemapItems } from './treemap';

export interface TreemapChartProps {
  data: Row[];
  label: string;
  value: string;
  ariaLabel: string;
  columns?: Column[];
}

const VB_W = 1000;
const VB_H = 560;

const fmt = (n: number): string => n.toLocaleString('de-DE', { maximumFractionDigits: 0 });

/** Lesbare Textfarbe (schwarz/weiß) je nach Helligkeit der Kachelfarbe. */
function readableInk(hex: string): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? '#1a1a1a' : '#ffffff';
}

/**
 * Treemap: Anteile am Ganzen, Fläche ∝ Größe (Squarified). Kontextualisierend —
 * zeigt Struktur und Größenordnung zugleich. Reines SVG → SSR-fähig, kein
 * Layout-Sprung. Farben aus Okabe-Ito. Tabellen-Fallback.
 */
export function TreemapChart({ data, label, value, ariaLabel, columns }: TreemapChartProps) {
  const items = toTreemapItems(data, label, value).sort((a, b) => b.value - a.value);
  const rects = layoutTreemap(items, VB_W, VB_H);
  const unit = columns?.find((c) => c.key === value)?.unit;
  const total = items.reduce((acc, it) => acc + it.value, 0);

  const colorByLabel = new Map(items.map((it, i) => [it.label, dataPalette[i % dataPalette.length] ?? dataPalette[0]]));

  const tableColumns: Column[] = [
    ...(columns?.length ? columns : [{ key: label, label }, { key: value, label: value, unit }]),
    { key: 'anteil', label: 'Anteil', align: 'right' },
  ];
  const tableRows: Row[] = items.map((it) => ({
    [label]: it.label,
    [value]: it.value,
    anteil: `${((it.value / total) * 100).toFixed(1).replace('.', ',')} %`,
  }));

  return (
    <div>
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        width="100%"
        className="h-auto w-full"
        role="img"
        aria-label={ariaLabel}
        preserveAspectRatio="xMidYMid meet"
      >
        {rects.map((r) => {
          const color = colorByLabel.get(r.label) ?? dataPalette[0];
          const ink = readableInk(color);
          const showLabel = r.w > 96 && r.h > 46;
          const showValue = r.w > 96 && r.h > 70;
          return (
            <g key={r.label}>
              <rect x={r.x} y={r.y} width={r.w} height={r.h} fill={color} stroke="#ffffff" strokeWidth={2} rx={3}>
                <title>{`${r.label}: ${fmt(r.value)}${unit ? ` ${unit}` : ''} (${((r.value / total) * 100).toFixed(1).replace('.', ',')} %)`}</title>
              </rect>
              {showLabel ? (
                <text x={r.x + 12} y={r.y + 30} fill={ink} fontSize={22} fontWeight={600}>
                  {r.label}
                </text>
              ) : null}
              {showValue ? (
                <text x={r.x + 12} y={r.y + 56} fill={ink} fontSize={18} opacity={0.85}>
                  {`${fmt(r.value)}${unit ? ` ${unit}` : ''} · ${((r.value / total) * 100).toFixed(0)} %`}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>

      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
        {items.map((it) => (
          <li key={it.label} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-block h-3 w-3 rounded-sm"
              style={{ backgroundColor: colorByLabel.get(it.label) }}
            />
            <span className="text-ink">{it.label}</span>
            <span className="text-subtle">
              {fmt(it.value)}
              {unit ? ` ${unit}` : ''} · {((it.value / total) * 100).toFixed(0)} %
            </span>
          </li>
        ))}
      </ul>

      <details className="mt-4 text-sm text-muted">
        <summary className="cursor-pointer">Daten als Tabelle anzeigen</summary>
        <div className="mt-2 overflow-x-auto">
          <DataTable columns={tableColumns} rows={tableRows} />
        </div>
      </details>
    </div>
  );
}
