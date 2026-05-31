import type { ResolvedVisualisierung } from '../types';

/**
 * ECHTE Daten — kein Demo. Erfasst live von data.europa.eu (EU Open Data Portal),
 * Such-API, Stand 31. Mai 2026. Reproduzierbar via:
 *   pnpm --filter @gurt/data ingest -- --source=data-europa-counts
 *
 * Gezählt wird die Gesamttreffermenge je deutschsprachigem Stichwort (limit=0).
 * Die Zahlen spiegeln die Datenverfügbarkeit im Portal, nicht die reale
 * energiewirtschaftliche Bedeutung (siehe Methodik im Beitrag).
 */
export const energieEuVisualisierung: ResolvedVisualisierung = {
  titel: 'Offene EU-Datensätze nach Energie-Stichwort',
  typ: 'balken',
  beschreibung:
    'Balkendiagramm der Anzahl offener Datensätze auf data.europa.eu je Energie-Stichwort (Stand 31. Mai 2026). „Energie" (33.400) und „Erneuerbare Energien" (19.318) dominieren deutlich; spezifische Stichwörter wie Solarenergie (326) oder Energieeffizienz (435) sind weit seltener vertreten.',
  caption: 'Anzahl offener Datensätze auf data.europa.eu je Stichwort (Stand 31.05.2026).',
  encoding: { kategorieFeld: 'stichwort', yFeld: 'anzahl' },
  datensatz: {
    titel: 'Offene EU-Datensätze nach Energie-Stichwort',
    quelle: {
      titel: 'data.europa.eu — EU Open Data Portal',
      url: 'https://data.europa.eu',
      herausgeber: 'Amt für Veröffentlichungen der Europäischen Union',
    },
    spalten: [
      { name: 'stichwort', typ: 'string' },
      { name: 'anzahl', typ: 'number', einheit: 'Datensätze' },
    ],
    daten: [
      { stichwort: 'Energie', anzahl: 33400 },
      { stichwort: 'Erneuerbare Energien', anzahl: 19318 },
      { stichwort: 'Windenergie', anzahl: 2944 },
      { stichwort: 'Kohle', anzahl: 1939 },
      { stichwort: 'Erdgas', anzahl: 1182 },
      { stichwort: 'Energieeffizienz', anzahl: 435 },
      { stichwort: 'Wasserkraft', anzahl: 424 },
      { stichwort: 'Solarenergie', anzahl: 326 },
    ],
  },
};
