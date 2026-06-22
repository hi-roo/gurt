import { describe, expect, it } from 'vitest';
import type { Column } from './types';
import { mergeDerivedColumns } from './table-fallback';

const ANTEIL: Column = { key: 'anteil', label: 'Anteil', align: 'right' };

describe('mergeDerivedColumns', () => {
  it('hängt die abgeleitete Spalte an, wenn ihr Key noch fehlt', () => {
    const base: Column[] = [
      { key: 'kategorie', label: 'Kategorie' },
      { key: 'wert', label: 'Wert', unit: 'TWh' },
    ];
    const { columns, added } = mergeDerivedColumns(base, [ANTEIL]);
    expect(columns.map((c) => c.key)).toEqual(['kategorie', 'wert', 'anteil']);
    expect(added.has('anteil')).toBe(true);
  });

  it('hängt NICHT an, wenn der Datensatz selbst ein Feld `anteil` führt (kein doppelter Key)', () => {
    // Reproduziert den Bug: value-Feld heißt `anteil` → Brücke übergibt eine Spalte mit key `anteil`.
    const base: Column[] = [
      { key: 'kategorie', label: 'Kategorie' },
      { key: 'anteil', label: 'Anteil', unit: '%', align: 'right' },
    ];
    const { columns, added } = mergeDerivedColumns(base, [ANTEIL]);
    expect(columns.map((c) => c.key)).toEqual(['kategorie', 'anteil']);
    expect(added.has('anteil')).toBe(false);
    // erhält die ORIGINAL-Spalte (mit Einheit), nicht die abgeleitete
    expect(columns.find((c) => c.key === 'anteil')?.unit).toBe('%');
  });

  it('garantiert eindeutige Keys, egal ob Kollision oder nicht', () => {
    for (const base of [
      [{ key: 'k', label: 'K' }, { key: 'v', label: 'V' }] as Column[],
      [{ key: 'k', label: 'K' }, { key: 'anteil', label: 'A' }] as Column[],
    ]) {
      const { columns } = mergeDerivedColumns(base, [ANTEIL]);
      const keys = columns.map((c) => c.key);
      expect(new Set(keys).size).toBe(keys.length);
    }
  });

  it('mehrere abgeleitete Spalten: hängt nur die nicht-kollidierenden an (Treemap: anteil + enthaelt)', () => {
    const base: Column[] = [
      { key: 'kategorie', label: 'Kategorie' },
      { key: 'enthaelt', label: 'Enthält' },
    ];
    const { columns, added } = mergeDerivedColumns(base, [ANTEIL, { key: 'enthaelt', label: 'Enthält' }]);
    expect(columns.map((c) => c.key)).toEqual(['kategorie', 'enthaelt', 'anteil']);
    expect(added.has('anteil')).toBe(true);
    expect(added.has('enthaelt')).toBe(false);
  });

  it('entfernt Duplikate innerhalb von `derived` selbst', () => {
    const { columns, added } = mergeDerivedColumns([{ key: 'k', label: 'K' }], [ANTEIL, ANTEIL]);
    expect(columns.map((c) => c.key)).toEqual(['k', 'anteil']);
    expect(added.has('anteil')).toBe(true);
  });

  it('mutiert die Basis-Spalten nicht', () => {
    const base: Column[] = [{ key: 'k', label: 'K' }];
    mergeDerivedColumns(base, [ANTEIL]);
    expect(base.map((c) => c.key)).toEqual(['k']);
  });
});
