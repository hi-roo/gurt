/**
 * Importiert apps/studio/seed/migrated.ndjson über die Sanity-HTTP-Mutate-API.
 * Reines ESM-JavaScript (nur eingebautes fetch/fs) → läuft mit `node` direkt,
 * ohne tsx/esbuild (die auf Node 26 crashen).
 *
 *   SANITY_PROJECT_ID=nfndwwt2 SANITY_WRITE_TOKEN=<token> node scripts/import-to-sanity.mjs
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const projectId =
  process.env.SANITY_PROJECT_ID ?? process.env.SANITY_STUDIO_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET ?? process.env.SANITY_STUDIO_DATASET ?? 'production';
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error('Fehlt: SANITY_PROJECT_ID und/oder SANITY_WRITE_TOKEN (Write-/Editor-Token).');
  process.exit(1);
}

const ndjsonPath = fileURLToPath(new URL('../apps/studio/seed/migrated.ndjson', import.meta.url));
// Auto-refreshte Datensätze (von der GitHub-Action `refresh-data` verwaltet)
// NICHT durch den Seed-Import überschreiben.
const REFRESH_MANAGED = /^datensatz\.(eu-|dip-)/;

const docs = readFileSync(ndjsonPath, 'utf8')
  .trim()
  .split('\n')
  .filter(Boolean)
  .map((line) => JSON.parse(line))
  .filter((doc) => {
    if (REFRESH_MANAGED.test(doc._id)) {
      console.log(`· übersprungen (refresh-verwaltet): ${doc._id}`);
      return false;
    }
    return true;
  });

const mutations = docs.map((doc) => ({ createOrReplace: doc }));

const url = `https://${projectId}.api.sanity.io/v2025-01-01/data/mutate/${dataset}?returnIds=true`;
const response = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify({ mutations }),
});

const json = await response.json();
if (!response.ok) {
  console.error(`Import fehlgeschlagen (HTTP ${response.status}):`, JSON.stringify(json));
  process.exit(1);
}

console.log(`OK Importiert: ${(json.results ?? []).length} Dokumente in "${dataset}" (Projekt ${projectId}).`);
