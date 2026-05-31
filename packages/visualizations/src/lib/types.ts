/** Eine Datenzeile — bewusst eng typisiert für Tabellen/Charts. */
export type Cell = string | number | null | undefined;
export type Row = Record<string, Cell>;

/** Spaltendefinition für Tabellen & Achsenbeschriftung. */
export interface Column {
  key: string;
  label: string;
  unit?: string;
  align?: 'left' | 'right';
}
