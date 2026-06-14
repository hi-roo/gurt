import type { Datensatz, Provenance, Spalte } from '../types';

/**
 * Berechnet die Übereinstimmungs-Matrix des Abstimmungsverhaltens der
 * Bundestagsfraktionen aus namentlichen Abstimmungen (Einzelstimmen je
 * Abgeordnetem mit Fraktion). Reine Funktionen → ohne Netz testbar.
 *
 * Definition (transparent, vgl. docs/08): Für jede Abstimmung wird je Fraktion die
 * **Mehrheitshaltung** bestimmt (Ja/Nein/Enthaltung; Nichtabgabe/ungültig zählen
 * nicht mit). Die Übereinstimmung zweier Fraktionen ist der Anteil der Abstimmungen
 * — gezählt nur dort, wo *beide* eine Mehrheit hatten —, in denen diese Mehrheit
 * gleich war. Gleiche Mehrheit bedeutet **nicht** gleiche Motive: Zwei Fraktionen
 * können denselben Entwurf aus gegensätzlichen Gründen ablehnen.
 */
export const FRAKTIONEN = ['CDU/CSU', 'SPD', 'Grüne', 'FDP', 'AfD', 'Linke'] as const;
export type Fraktion = (typeof FRAKTIONEN)[number];

export type Stance = 'yes' | 'no' | 'abstain';

export interface SimpleVote {
  /** Fraktionslabel der API (z. B. "SPD (Bundestag 2021 - 2025)") oder null. */
  fraktion?: string | null;
  /** Roher Vote-Wert der API ("yes" | "no" | "abstain" | "no_show" | …). */
  vote: string;
}

export interface PollLike {
  votes: SimpleVote[];
}

/**
 * Mappt ein API-Fraktionslabel auf die kanonische Kurzform — sonst null
 * (z. B. „fraktionslos"). Robust gegen Weichtrennzeichen/NBSP in den Labels
 * (abgeordnetenwatch liefert "BÜNDNIS 90/­DIE GRÜNEN" mit Soft-Hyphen).
 */
export function canonicalFraktion(label: string | null | undefined): Fraktion | null {
  if (!label) return null;
  const s = label.replace(/[\u00ad\u00a0]/g, '').toUpperCase();
  if (s.includes('CDU') || s.includes('CSU')) return 'CDU/CSU';
  if (s.includes('SPD')) return 'SPD';
  if (s.includes('GRÜNE') || s.includes('BÜNDNIS')) return 'Grüne';
  if (s.includes('FDP') || s.includes('FREIE DEMOKRAT')) return 'FDP';
  if (s.includes('AFD') || s.includes('ALTERNATIVE FÜR')) return 'AfD';
  if (s.includes('LINKE')) return 'Linke';
  return null;
}

function toStance(vote: string): Stance | null {
  if (vote === 'yes') return 'yes';
  if (vote === 'no') return 'no';
  if (vote === 'abstain') return 'abstain';
  return null; // no_show, invalid, …
}

// Deterministische Reihenfolge für den (praktisch nie auftretenden) Gleichstand.
const STANCE_ORDER: Stance[] = ['yes', 'no', 'abstain'];

/** Mehrheitshaltung je Fraktion in EINER Abstimmung. */
export function fraktionMajorities(votes: SimpleVote[]): Map<Fraktion, Stance> {
  const tally = new Map<Fraktion, Record<Stance, number>>();
  for (const vote of votes) {
    const fraktion = canonicalFraktion(vote.fraktion);
    if (!fraktion) continue;
    const stance = toStance(vote.vote);
    if (!stance) continue;
    const record = tally.get(fraktion) ?? { yes: 0, no: 0, abstain: 0 };
    record[stance] += 1;
    tally.set(fraktion, record);
  }

  const majorities = new Map<Fraktion, Stance>();
  for (const [fraktion, record] of tally) {
    let best: Stance = 'yes';
    let bestCount = -1;
    for (const stance of STANCE_ORDER) {
      if (record[stance] > bestCount) {
        bestCount = record[stance];
        best = stance;
      }
    }
    if (bestCount > 0) majorities.set(fraktion, best);
  }
  return majorities;
}

export interface PairAgreement {
  fraktionA: Fraktion;
  fraktionB: Fraktion;
  /** Anteil gleicher Mehrheitshaltung in Prozent (0–100, eine Dezimalstelle). */
  uebereinstimmung: number;
  /** Anzahl Abstimmungen, in denen beide Fraktionen eine Mehrheit hatten. */
  gemeinsam: number;
}

export interface MatrixResult {
  paare: PairAgreement[];
  /** Anzahl ausgewerteter Abstimmungen. */
  abstimmungen: number;
}

function pairKey(a: Fraktion, b: Fraktion): string {
  return `${a}__${b}`;
}

/**
 * Kanonische Fraktionen, die in den Abstimmungen tatsächlich vertreten sind
 * (mind. eine gültige Stimme), in fester Reihenfolge. So enthält z. B. die
 * 21. Wahlperiode keine FDP (an der 5-%-Hürde gescheitert) — sie taucht dann
 * gar nicht erst als „0 %"-Bogen auf.
 */
export function presentFraktionen(polls: PollLike[]): Fraktion[] {
  const seen = new Set<Fraktion>();
  for (const poll of polls) {
    for (const vote of poll.votes) {
      const fraktion = canonicalFraktion(vote.fraktion);
      if (fraktion && toStance(vote.vote)) seen.add(fraktion);
    }
  }
  return FRAKTIONEN.filter((fraktion) => seen.has(fraktion));
}

/**
 * Übereinstimmungs-Matrix über alle Fraktionspaare. Standardmäßig nur über die
 * tatsächlich vertretenen Fraktionen (`presentFraktionen`) — bei sechs Fraktionen
 * sind das 15 Paare, bei fünf (21. WP ohne FDP) zehn.
 */
export function fraktionsMatrix(
  polls: PollLike[],
  fraktionen: readonly Fraktion[] = presentFraktionen(polls),
): MatrixResult {
  const cells = new Map<string, { same: number; both: number }>();
  for (let i = 0; i < fraktionen.length; i++) {
    for (let j = i + 1; j < fraktionen.length; j++) {
      cells.set(pairKey(fraktionen[i]!, fraktionen[j]!), { same: 0, both: 0 });
    }
  }

  for (const poll of polls) {
    const majorities = fraktionMajorities(poll.votes);
    for (let i = 0; i < fraktionen.length; i++) {
      for (let j = i + 1; j < fraktionen.length; j++) {
        const a = fraktionen[i]!;
        const b = fraktionen[j]!;
        const majA = majorities.get(a);
        const majB = majorities.get(b);
        if (!majA || !majB) continue;
        const cell = cells.get(pairKey(a, b))!;
        cell.both += 1;
        if (majA === majB) cell.same += 1;
      }
    }
  }

  const paare: PairAgreement[] = [];
  for (let i = 0; i < fraktionen.length; i++) {
    for (let j = i + 1; j < fraktionen.length; j++) {
      const a = fraktionen[i]!;
      const b = fraktionen[j]!;
      const cell = cells.get(pairKey(a, b))!;
      const pct = cell.both === 0 ? 0 : Math.round((cell.same / cell.both) * 1000) / 10;
      paare.push({ fraktionA: a, fraktionB: b, uebereinstimmung: pct, gemeinsam: cell.both });
    }
  }

  return { paare, abstimmungen: polls.length };
}

/**
 * Spalten des Chord-Datensatzes — mit Anzeige-Labels für den Tabellenkopf (statt der rohen
 * Feldschlüssel „fraktionA“ …). EINE Quelle für Seed-Import UND Refresh (refresh-sanity-data).
 */
export const CHORD_SPALTEN: Spalte[] = [
  { name: 'fraktionA', label: 'Fraktion A', typ: 'string' },
  { name: 'fraktionB', label: 'Fraktion B', typ: 'string' },
  { name: 'uebereinstimmung', label: 'Übereinstimmung', typ: 'number', einheit: '%' },
];

/** Baut den chartbaren Chord-Datensatz aus der Matrix (inkl. Provenienz). */
export function matrixToDatensatz(
  result: MatrixResult,
  provenance: Provenance,
  wahlperiodeLabel = '20. WP',
): Datensatz {
  return {
    titel: `Fraktions-Übereinstimmung im Bundestag (${wahlperiodeLabel}, ${result.abstimmungen} namentliche Abstimmungen)`,
    provenance,
    spalten: CHORD_SPALTEN,
    daten: result.paare.map((pair) => ({
      fraktionA: pair.fraktionA,
      fraktionB: pair.fraktionB,
      uebereinstimmung: pair.uebereinstimmung,
    })),
  };
}
