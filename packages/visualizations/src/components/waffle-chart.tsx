import { dataPalette } from '@gurt/ui/tokens';
import type { Column, Row } from '../lib/types';
import { ChartTooltipLayer } from './chart-tooltip-layer';
import { DataTable } from './data-table';
import { allocateWaffle } from './waffle';
import { ProportionList } from './proportion-list';
import type { ProportionInput } from './proportions';

export interface WaffleChartProps {
  data: Row[];
  category: string;
  value: string;
  ariaLabel: string;
  columns?: Column[];
}

const fmt = (n: number): string => n.toLocaleString('de-DE', { maximumFractionDigits: 1 });

/**
 * Waffle-Chart: Anteile am Ganzen als 10×10-Raster (100 Zellen). Kontextualisierend
 * und field-dependent-freundlich (konkrete Mengen statt Achsen). Reines CSS-Grid →
 * SSR-fähig, kein Layout-Sprung. Farben aus der Palette „GURT Vibrant“. Legende +
 * Tabellen-Fallback; jede Zelle trägt ein `data-tip` → interaktives Tooltip (Hover/Tap)
 * über `ChartTooltipLayer`: Kategorie, Wert, Anteil.
 */
export function WaffleChart({ data, category, value, ariaLabel, columns }: WaffleChartProps) {
  const slices = allocateWaffle(data, category, value, 100);
  const unit = columns?.find((c) => c.key === value)?.unit;
  // Mobiler Reflow: dieselben Slices als vertikale Anteils-Balkenliste (statt winzigem Raster).
  const proportionItems: ProportionInput[] = slices.map((s, index) => ({
    label: s.category,
    value: s.value,
    color: dataPalette[index % dataPalette.length] ?? dataPalette[0],
  }));

  const cells: { color: string; category: string; title: string }[] = [];
  slices.forEach((slice, index) => {
    const color = dataPalette[index % dataPalette.length] ?? dataPalette[0];
    const title = `${slice.category}: ${fmt(slice.value)}${unit ? ` ${unit}` : ''} · ${(slice.share * 100).toFixed(0)} %`;
    for (let i = 0; i < slice.cells; i += 1) cells.push({ color, category: slice.category, title });
  });

  const tableColumns: Column[] = [
    ...(columns?.length ? columns : [{ key: category, label: category }, { key: value, label: value, unit }]),
    { key: 'anteil', label: 'Anteil', align: 'right' },
  ];
  const tableRows: Row[] = slices.map((s) => ({
    [category]: s.category,
    [value]: s.value,
    anteil: `${(s.share * 100).toFixed(1).replace('.', ',')} %`,
  }));

  return (
    <ChartTooltipLayer>
      <div
        className="mx-auto hidden max-w-md grid-cols-10 gap-[2px] sm:grid"
        role="img"
        aria-label={ariaLabel}
      >
        {cells.map((cell, index) => (
          <span
            key={`${cell.category}-${index}`}
            className="aspect-square cursor-help"
            style={{ backgroundColor: cell.color }}
            data-tip={cell.title}
          />
        ))}
      </div>

      {/* Mobil (< sm): Waffle-Raster oben ausgeblendet — stattdessen die vertikale
          Anteils-Balkenliste (lesbare Werte statt winziger Zellen). */}
      <ProportionList
        className="sm:hidden"
        items={proportionItems}
        unit={unit}
        ariaLabel={ariaLabel}
      />

      <ul className="mt-5 hidden flex-wrap gap-x-5 gap-y-2 text-sm text-muted sm:flex">
        {slices.map((s, index) => (
          <li key={s.category} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-block h-3 w-3"
              style={{ backgroundColor: dataPalette[index % dataPalette.length] }}
            />
            <span className="text-ink">{s.category}</span>
            <span className="text-subtle">
              {fmt(s.value)}
              {unit ? ` ${unit}` : ''} · {(s.share * 100).toFixed(0)} %
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
    </ChartTooltipLayer>
  );
}
