import { describe, expect, it } from 'vitest';
import { parseDipResponse } from './dip';

const sample = {
  numFound: 2,
  documents: [
    {
      id: '1',
      titel: 'Gesetz zur Beschleunigung des Ausbaus der Stromnetze',
      vorgangstyp: 'Gesetzgebung',
      datum: '2025-03-01',
      extraFeldDasWirIgnorieren: true,
    },
    { id: '2', titel: 'Antrag betr. Bau neuer Gaskraftwerke' },
  ],
  cursor: 'cursor-token',
};

describe('parseDipResponse', () => {
  it('validiert eine wohlgeformte Antwort und behält unbekannte Felder', () => {
    const response = parseDipResponse(sample);
    expect(response.documents).toHaveLength(2);
    expect(response.documents[0]?.titel).toContain('Beschleunigung');
    expect(response.cursor).toBe('cursor-token');
  });

  it('wirft bei fehlendem Pflichtfeld (titel)', () => {
    expect(() => parseDipResponse({ documents: [{ id: 'x' }] })).toThrow();
  });
});
