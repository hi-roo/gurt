import type { ResolvedVisualisierung } from '../types';

/**
 * ECHTE Daten — kein Demo. Stichprobe der 300 relevantesten „Energie“-Datensätze
 * auf data.europa.eu, aggregiert nach Herkunftsland. Stand 31. Mai 2026.
 * Reproduzierbar via:
 *   pnpm --filter @gurt/data ingest -- --source=data-europa-countries --q=Energie --limit=300
 *
 * Wichtig: relevanz-sortierte Stichprobe, KEINE Vollerhebung — entsprechend
 * ausgewiesen (siehe Methodik im Beitrag). Ländernamen ins Deutsche übertragen.
 */
export const energieEuLaenderVisualisierung: ResolvedVisualisierung = {
  titel: 'Energie-Datensätze nach Herkunftsland',
  typ: 'balken',
  beschreibung:
    'Balkendiagramm der Herkunftsländer einer Stichprobe von 300 „Energie“-Datensätzen auf data.europa.eu (Stand 31. Mai 2026). Deutschland (86) und Dänemark (83) führen mit großem Abstand, gefolgt von Frankreich (43); danach folgen Österreich, Irland und die Niederlande.',
  caption: 'Herkunftsländer einer Stichprobe von 300 „Energie“-Datensätzen (Stand 31.05.2026).',
  encoding: { kategorieFeld: 'land', yFeld: 'anzahl' },
  datensatz: {
    titel: 'Energie-Datensätze nach Herkunftsland (Stichprobe, n=300)',
    quelle: {
      titel: 'data.europa.eu — EU Open Data Portal',
      url: 'https://data.europa.eu',
      herausgeber: 'Amt für Veröffentlichungen der Europäischen Union',
    },
    spalten: [
      { name: 'land', typ: 'string' },
      { name: 'anzahl', typ: 'number', einheit: 'Datensätze' },
    ],
    daten: [
      { land: 'Deutschland', anzahl: 86 },
      { land: 'Dänemark', anzahl: 83 },
      { land: 'Frankreich', anzahl: 43 },
      { land: 'Österreich', anzahl: 18 },
      { land: 'Irland', anzahl: 15 },
      { land: 'Niederlande', anzahl: 13 },
      { land: 'Belgien', anzahl: 9 },
      { land: 'Schweiz', anzahl: 6 },
      { land: 'Kroatien', anzahl: 4 },
      { land: 'Litauen', anzahl: 3 },
    ],
  },
};
