/**
 * Mini-CLI für Ingestion-Jobs. Gibt einen normalisierten `Datensatz` (JSON) auf
 * stdout aus — bereit zur Kuratierung in Sanity (siehe docs/05-data-pipeline.md).
 *
 * Beispiele:
 *   pnpm --filter @gurt/data ingest -- --source=data-europa --q=Energie
 *   pnpm --filter @gurt/data ingest -- --source=bundestag-dip --titel=Gaskraftwerk
 */
import { fetchAllVorgaenge } from './sources/bundestag-dip';
import { countDatasetsByKeywords, searchDatasetsByTitle } from './sources/data-europa';
import { vorgaengeNachJahr } from './transform/vorgaenge';
import { toDatensatz } from './transform/dataset';
import type { Provenance } from './types';

function parseArgs(argv: string[]): Record<string, string> {
  const args: Record<string, string> = {};
  for (const token of argv) {
    const match = /^--([^=]+)=(.*)$/.exec(token);
    if (match?.[1] !== undefined) args[match[1]] = match[2] ?? '';
  }
  return args;
}

// `new Date()` ist hier (Laufzeit-Skript) erlaubt; reine Transforms bleiben uhrfrei.
const now = (): string => new Date().toISOString();

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));

  switch (args.source) {
    case 'data-europa': {
      const keyword = args.q ?? 'Energie';
      const rows = await searchDatasetsByTitle(keyword, Number(args.limit ?? 10));
      const provenance: Provenance = {
        herausgeber: 'data.europa.eu (EU Open Data Portal)',
        url: 'https://data.europa.eu/sparql',
        abgerufenAm: now(),
        lizenz: 'je Datensatz unterschiedlich — siehe Quelle',
        hinweis: `SPARQL-Titelsuche nach „${keyword}" (deutschsprachige Datensätze).`,
      };
      const datensatz = toDatensatz({
        titel: `data.europa.eu — Datensätze zu „${keyword}"`,
        spalten: [
          { name: 'title', typ: 'string' },
          { name: 'dataset', typ: 'string' },
        ],
        daten: rows,
        provenance,
      });
      console.log(JSON.stringify(datensatz, null, 2));
      break;
    }

    case 'data-europa-counts': {
      const keywords = (args.keywords ?? 'Energie,Erneuerbare Energien,Windenergie,Solarenergie,Wasserkraft,Erdgas,Kohle,Energieeffizienz')
        .split(',')
        .map((k) => k.trim())
        .filter(Boolean);
      const rows = await countDatasetsByKeywords(keywords);
      const provenance: Provenance = {
        herausgeber: 'data.europa.eu (EU Open Data Portal)',
        url: 'https://data.europa.eu/api/hub/search/search',
        abgerufenAm: now(),
        lizenz: 'Portal-Metadaten; je Datensatz unterschiedlich',
        hinweis: 'Anzahl offener Datensätze je Stichwort (Such-API, limit=0).',
      };
      const datensatz = toDatensatz({
        titel: 'Offene EU-Datensätze nach Energie-Stichwort',
        spalten: [
          { name: 'stichwort', typ: 'string' },
          { name: 'anzahl', typ: 'number', einheit: 'Datensätze' },
        ],
        daten: rows,
        provenance,
      });
      console.log(JSON.stringify(datensatz, null, 2));
      break;
    }

    case 'bundestag-dip': {
      const vorgaenge = await fetchAllVorgaenge(
        { titel: args.titel },
        {},
        Number(args.pages ?? 3),
      );
      const provenance: Provenance = {
        herausgeber: 'Deutscher Bundestag',
        url: 'https://search.dip.bundestag.de/api/v1/vorgang',
        abgerufenAm: now(),
        lizenz: 'amtliches Werk (DIP-Nutzungshinweise)',
        hinweis: `Vorgänge mit Titel-Filter „${args.titel ?? ''}", aggregiert nach Jahr.`,
      };
      const datensatz = vorgaengeNachJahr(vorgaenge, provenance);
      console.log(JSON.stringify(datensatz, null, 2));
      break;
    }

    default:
      console.error(
        [
          'Unbekannte Quelle. Nutzung:',
          '  --source=data-europa  --q=Energie            (live, ohne Key)',
          '  --source=bundestag-dip --titel=Gaskraftwerk  (benötigt DIP_API_KEY)',
        ].join('\n'),
      );
      process.exitCode = 1;
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
