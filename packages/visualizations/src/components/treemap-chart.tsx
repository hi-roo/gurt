import { dataPalette } from '@gurt/ui/tokens';
import type { Column, Row } from '../lib/types';
import { ChartTooltipLayer } from './chart-tooltip-layer';
import { DataTable } from './data-table';
import { layoutTreemap, toTreemapItems } from './treemap';

export interface TreemapChartProps {
  data: Row[];
  label: string;
  value: string;
  ariaLabel: string;
  columns?: Column[];
  /**
   * Optionale Erklärung je Kategorie („was steckt drin“). Erscheint sichtbar als
   * Definitionsliste unter der Legende sowie im Tooltip und im Tabellen-Fallback.
   * Treemaps mit abstrakten Sammel-Kategorien sollten sie immer mitgeben.
   */
  descriptions?: Record<string, string>;
}

const VB_W = 1000;
const VB_H = 560;

/**
 * Sichtbarer Zwischenraum zwischen Kacheln (User-Units im 1000×560-Viewport): jede Kachel
 * wird um GAP/2 ringsum eingerückt → zwischen zwei Kacheln entsteht eine volle GAP-Lücke,
 * durch die der (durchscheinende) Figuren-Hintergrund zeigt. An die 2px-Quadratabstände des
 * Waffle-Charts angeglichen: bei ~0,58 Render-Skala (Viewport 1000→~576px) ≈ 2,3px sichtbar.
 */
const GAP = 4;

const fmt = (n: number): string => n.toLocaleString('de-DE', { maximumFractionDigits: 1 });

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
 * Layout-Sprung. Farben aus der Palette „GURT Vibrant“. Legende + Tabellen-Fallback;
 * jede Kachel ist fokussierbar und trägt ein `data-tip` → interaktives Tooltip
 * (Hover/Fokus/Tap) über `ChartTooltipLayer`: Label, Wert, Anteil.
 */
export function TreemapChart({ data, label, value, ariaLabel, columns, descriptions }: TreemapChartProps) {
  const items = toTreemapItems(data, label, value).sort((a, b) => b.value - a.value);
  const rects = layoutTreemap(items, VB_W, VB_H);
  const unit = columns?.find((c) => c.key === value)?.unit;
  const total = items.reduce((acc, it) => acc + it.value, 0);
  const hasDesc = !!descriptions && Object.keys(descriptions).length > 0;

  const colorByLabel = new Map(items.map((it, i) => [it.label, dataPalette[i % dataPalette.length] ?? dataPalette[0]]));

  const tableColumns: Column[] = [
    ...(columns?.length ? columns : [{ key: label, label }, { key: value, label: value, unit }]),
    { key: 'anteil', label: 'Anteil', align: 'right' },
    ...(hasDesc ? [{ key: 'enthaelt', label: 'Enthält' } as Column] : []),
  ];
  const tableRows: Row[] = items.map((it) => ({
    [label]: it.label,
    [value]: it.value,
    anteil: `${((it.value / total) * 100).toFixed(1).replace('.', ',')} %`,
    ...(hasDesc ? { enthaelt: descriptions?.[it.label] ?? '' } : {}),
  }));

  return (
    <ChartTooltipLayer>
      <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="h-auto w-full min-w-[30rem]"
        role="img"
        aria-label={ariaLabel}
        preserveAspectRatio="xMidYMid meet"
      >
        {rects.map((r) => {
          const color = colorByLabel.get(r.label) ?? dataPalette[0];
          const ink = readableInk(color);
          // Kachel um GAP/2 ringsum einrücken → sichtbare Lücke zwischen Kacheln (Clamp gegen
          // negative Maße bei winzigen Kacheln). Ersetzt den früheren weißen Rahmen.
          const ix = r.x + GAP / 2;
          const iy = r.y + GAP / 2;
          const iw = Math.max(0, r.w - GAP);
          const ih = Math.max(0, r.h - GAP);
          const showLabel = r.w > 96 && r.h > 46;
          const showValue = r.w > 96 && r.h > 70;
          const tipDesc = descriptions?.[r.label];
          const tip = `${r.label}: ${fmt(r.value)}${unit ? ` ${unit}` : ''} (${((r.value / total) * 100).toFixed(1).replace('.', ',')} %)${tipDesc ? ` — ${tipDesc}` : ''}`;
          return (
            <g
              key={r.label}
              data-tip={tip}
              tabIndex={0}
              role="img"
              aria-label={tip}
              className="cursor-help [outline:none] focus-visible:[outline:2px_solid_var(--color-accent)] focus-visible:[outline-offset:2px]"
            >
              <rect x={ix} y={iy} width={iw} height={ih} fill={color} />
              {showLabel ? (
                <text x={ix + 12} y={iy + 30} fill={ink} fontSize={22} fontWeight={600}>
                  {r.label}
                </text>
              ) : null}
              {showValue ? (
                <text x={ix + 12} y={iy + 56} fill={ink} fontSize={18} opacity={0.85}>
                  {`${fmt(r.value)}${unit ? ` ${unit}` : ''} · ${((r.value / total) * 100).toFixed(0)} %`}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
      </div>

      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
        {items.map((it) => (
          <li key={it.label} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-block h-3 w-3"
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

      {hasDesc ? (
        <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
          {items
            .filter((it) => descriptions?.[it.label])
            .map((it) => (
              <div key={it.label} className="sm:flex sm:gap-3">
                <dt className="shrink-0 font-medium text-ink sm:w-52">{it.label}</dt>
                <dd className="text-muted">{descriptions?.[it.label]}</dd>
              </div>
            ))}
        </dl>
      ) : null}

      <details className="mt-4 text-sm text-muted">
        <summary className="cursor-pointer">Daten als Tabelle anzeigen</summary>
        <div className="mt-2 overflow-x-auto">
          <DataTable columns={tableColumns} rows={tableRows} />
        </div>
      </details>
    </ChartTooltipLayer>
  );
}
