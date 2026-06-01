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
 */
export function DataTable({ caption, columns, rows, className }: DataTableProps) {
  return (
    <table className={className ?? 'w-full border-collapse text-sm tabular-nums'}>
      {caption ? (
        <caption className="mb-2 text-left font-caption text-subtle">{caption}</caption>
      ) : null}
      <thead>
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
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className="border-b border-line/60">
            {columns.map((col) => (
              <td
                key={col.key}
                className={col.align === 'right' ? 'px-3 py-2 text-right' : 'px-3 py-2 text-left'}
              >
                {formatCell(row[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
