/**
 * Mini-CLI für Ingestion-Jobs. Schreibt (vorerst) nach stdout — Laden nach
 * Sanity erfolgt in einem späteren Schritt (siehe docs/05-data-pipeline.md).
 *
 * Beispiel:
 *   pnpm --filter @gurt/data ingest -- --source=bundestag-dip --titel="Gaskraftwerk"
 */
import { fetchVorgaenge } from './sources/bundestag-dip';

function parseArgs(argv: string[]): Record<string, string> {
  const args: Record<string, string> = {};
  for (const token of argv) {
    const match = /^--([^=]+)=(.*)$/.exec(token);
    if (match?.[1] !== undefined) args[match[1]] = match[2] ?? '';
  }
  return args;
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));

  switch (args.source) {
    case 'bundestag-dip': {
      const response = await fetchVorgaenge({ titel: args.titel });
      const items = response.documents.slice(0, 5);
      console.log(`Gefunden: ${response.numFound ?? items.length}. Erste ${items.length}:`);
      for (const vorgang of items) {
        console.log(`- ${vorgang.titel}${vorgang.datum ? ` (${vorgang.datum})` : ''}`);
      }
      break;
    }
    default:
      console.error(
        'Nutzung: pnpm --filter @gurt/data ingest -- --source=bundestag-dip --titel="…"',
      );
      process.exitCode = 1;
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
