import type { Cell, Column, Row } from '../lib/types';

export interface DataTableProps {
  caption?: string;
  columns: Column[];
  rows: Row[];
  className?: string;
}

function formatCell(value: Cell): string {
  if (value === null || value === undefined) return '–';
  if (typeof value === 'number') return value.toLocaleString('de-DE');
  return value;
}

/**
 * Barrierefreie Datentabelle. Universeller Fallback für jede Visualisierung
 * (siehe docs/06). Rein & SSR-sicher — kein Browser-API.
 *
 * Responsiv (Teil des Mobil-Frameworks): ab `sm` eine klassische Tabelle; darunter
 * bricht jede Zeile zu einer Karte mit `Label: Wert`-Paaren um (`max-sm:`-Utilities,
 * reines CSS → kein Flackern, No-JS-fähig). Der Kopf wird mobil ausgeblendet; jede
 * Zelle trägt ihr Spaltenlabel selbst (sichtbar nur mobil), damit der Bezug erhalten
 * bleibt. Statt horizontalem Scrollen breiter Tabellen sind alle Werte lesbar.
 */
export function DataTable({ caption, columns, rows, className }: DataTableProps) {
  return (
    <table className={className ?? 'w-full border-collapse text-sm tabular-nums max-sm:block'}>
      {caption ? (
        <caption className="mb-2 text-left font-caption text-subtle max-sm:block">{caption}</caption>
      ) : null}
      <thead className="max-sm:hidden">
        <tr className="border-b border-line">
          {columns.map((col) => (
            <th
              key={col.key}
              scope="col"
              className={col.align === 'right' ? 'px-3 py-2 text-right' : 'px-3 py-2 text-left'}
            >
              {col.label}
              {col.unit ? <span className="text-subtle"> ({col.unit})</span> : null}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="max-sm:block">
        {rows.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className="max-sm:block max-sm:border max-sm:border-line max-sm:border-b-0 max-sm:p-3 max-sm:last:border-b sm:border-b sm:border-line/60 sm:[&:last-child]:border-b-0"
          >
            {columns.map((col) => (
              <td
                key={col.key}
                className={`${
                  col.align === 'right' ? 'px-3 py-2 text-right' : 'px-3 py-2 text-left'
                } max-sm:block max-sm:px-0 max-sm:py-1.5 max-sm:text-left`}
              >
                <span className="hidden text-xs font-medium text-subtle max-sm:mb-0.5 max-sm:block">
                  {col.label}
                  {col.unit ? ` (${col.unit})` : ''}
                </span>
                <span className="max-sm:block max-sm:text-left">{formatCell(row[col.key])}</span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
