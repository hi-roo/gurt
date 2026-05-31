import { describe, expect, it } from 'vitest';
import { buildMatrix, type MatrixPosition } from './matrix';

const positions: MatrixPosition[] = [
  { akteur: 'Reiche', massnahme: 'Gaskraftwerke', haltung: 'dafuer' },
  { akteur: 'Reiche', massnahme: 'Erneuerbare', haltung: 'differenziert' },
  { akteur: 'Umweltverband', massnahme: 'Gaskraftwerke', haltung: 'dagegen' },
];

describe('buildMatrix', () => {
  it('extrahiert eindeutige Akteure und Maßnahmen in Reihenfolge', () => {
    const matrix = buildMatrix(positions);
    expect(matrix.akteure).toEqual(['Reiche', 'Umweltverband']);
    expect(matrix.massnahmen).toEqual(['Gaskraftwerke', 'Erneuerbare']);
  });

  it('findet eine Position per Achsen-Schlüssel', () => {
    const matrix = buildMatrix(positions);
    expect(matrix.get('Reiche', 'Gaskraftwerke')?.haltung).toBe('dafuer');
    expect(matrix.get('Umweltverband', 'Gaskraftwerke')?.haltung).toBe('dagegen');
  });

  it('liefert undefined für leere Zellen', () => {
    const matrix = buildMatrix(positions);
    expect(matrix.get('Umweltverband', 'Erneuerbare')).toBeUndefined();
  });
});
