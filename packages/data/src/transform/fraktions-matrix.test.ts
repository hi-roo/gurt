import { describe, expect, it } from 'vitest';
import {
  canonicalFraktion,
  fraktionMajorities,
  fraktionsMatrix,
  matrixToDatensatz,
  type SimpleVote,
} from './fraktions-matrix';

/** Baut die Stimmen einer Abstimmung als Block je Fraktion. */
function block(fraktion: string, vote: string, n: number): SimpleVote[] {
  return Array.from({ length: n }, () => ({ fraktion, vote }));
}

describe('canonicalFraktion', () => {
  it('mappt API-Labels (inkl. Soft-Hyphen/NBSP) auf die Kurzform', () => {
    expect(canonicalFraktion('SPD (Bundestag 2021 - 2025)')).toBe('SPD');
    expect(canonicalFraktion('CDU/CSU (Bundestag 2021 - 2025)')).toBe('CDU/CSU');
    // Soft-Hyphen (U+00AD) im echten AW-Label:
    expect(canonicalFraktion('BÜNDNIS 90/­DIE GRÜNEN (Bundestag 2021 - 2025)')).toBe('Grüne');
    expect(canonicalFraktion('DIE LINKE. (Bundestag 2021 - 2025)')).toBe('Linke');
    expect(canonicalFraktion('AfD (Bundestag 2021 - 2025)')).toBe('AfD');
    expect(canonicalFraktion('FDP (Bundestag 2021 - 2025)')).toBe('FDP');
  });

  it('gibt null für fraktionslos/unbekannt/leer', () => {
    expect(canonicalFraktion('fraktionslos (Bundestag 2021 - 2025)')).toBeNull();
    expect(canonicalFraktion(null)).toBeNull();
    expect(canonicalFraktion(undefined)).toBeNull();
  });
});

describe('fraktionMajorities', () => {
  it('bestimmt die Mehrheitshaltung und ignoriert no_show', () => {
    const votes = [
      ...block('SPD', 'yes', 190),
      ...block('SPD', 'no_show', 16), // zählt nicht
      ...block('CDU/CSU', 'no', 180),
      ...block('CDU/CSU', 'yes', 2), // Minderheit
    ];
    const maj = fraktionMajorities(votes);
    expect(maj.get('SPD')).toBe('yes');
    expect(maj.get('CDU/CSU')).toBe('no');
  });

  it('listet eine Fraktion ohne gültige Stimme (nur no_show) nicht', () => {
    const maj = fraktionMajorities(block('AfD', 'no_show', 12));
    expect(maj.has('AfD')).toBe(false);
  });
});

describe('fraktionsMatrix', () => {
  // Zwei Abstimmungen: Ampel (SPD/Grüne/FDP) gegen CDU/CSU+AfD, Linke enthält sich.
  const polls = [
    {
      votes: [
        ...block('SPD', 'yes', 200),
        ...block('Grüne', 'yes', 117),
        ...block('FDP', 'yes', 90),
        ...block('CDU/CSU', 'no', 190),
        ...block('AfD', 'no', 80),
        ...block('Linke', 'abstain', 39),
      ],
    },
    {
      votes: [
        ...block('SPD', 'yes', 200),
        ...block('Grüne', 'yes', 117),
        ...block('FDP', 'no', 90), // FDP schert einmal aus
        ...block('CDU/CSU', 'no', 190),
        ...block('AfD', 'no', 80),
        ...block('Linke', 'no', 39),
      ],
    },
  ];

  const result = fraktionsMatrix(polls);

  it('zählt 15 Paare und alle Abstimmungen', () => {
    expect(result.paare).toHaveLength(15);
    expect(result.abstimmungen).toBe(2);
  });

  function pct(a: string, b: string): number {
    const found = result.paare.find(
      (p) =>
        (p.fraktionA === a && p.fraktionB === b) || (p.fraktionA === b && p.fraktionB === a),
    );
    return found!.uebereinstimmung;
  }

  it('SPD–Grüne stimmen in beiden gleich → 100 %', () => {
    expect(pct('SPD', 'Grüne')).toBe(100);
  });

  it('SPD–FDP stimmen 1 von 2 gleich → 50 %', () => {
    expect(pct('SPD', 'FDP')).toBe(50);
  });

  it('CDU/CSU–AfD stimmen beide Male "no" → 100 %', () => {
    expect(pct('CDU/CSU', 'AfD')).toBe(100);
  });

  it('SPD–CDU/CSU nie gleich → 0 %', () => {
    expect(pct('SPD', 'CDU/CSU')).toBe(0);
  });

  it('AfD–Linke: 2. Mal beide "no" → 50 %', () => {
    // 1. Abstimmung: AfD no / Linke abstain (ungleich); 2.: beide no (gleich) → 1/2
    expect(pct('AfD', 'Linke')).toBe(50);
  });
});

describe('matrixToDatensatz', () => {
  it('erzeugt einen chartbaren Datensatz mit Provenienz', () => {
    const result = fraktionsMatrix([
      { votes: [...block('SPD', 'yes', 2), ...block('CDU/CSU', 'no', 2)] },
    ]);
    const ds = matrixToDatensatz(result, {
      herausgeber: 'Test',
      url: 'https://example.org',
      abgerufenAm: '2026-06-05T00:00:00.000Z',
    });
    expect(ds.titel).toContain('1 namentliche Abstimmungen');
    expect(ds.spalten.map((s) => s.name)).toEqual(['fraktionA', 'fraktionB', 'uebereinstimmung']);
    expect(ds.daten).toHaveLength(15);
  });
});
