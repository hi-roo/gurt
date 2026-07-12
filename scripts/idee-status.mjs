/**
 * Setzt den Status von `idee`-Dokumenten (Themen-Backlog) über die Sanity-Mutate-API.
 * Teil der Backlog-Pflege — siehe docs/12-themen-radar-backlog.md.
 * Reines ESM-JavaScript (nur eingebautes fetch) → läuft mit `node` direkt.
 *
 *   node --env-file-if-exists=.env.local scripts/idee-status.mjs <status> <id...>
 *   # oder (Worktree ohne eigenes .env.local):
 *   node --env-file=/PFAD/zum/repo/.env.local scripts/idee-status.mjs <status> <id...>
 *
 * status: vorschlag | umgesetzt | verworfen
 * Beispiele:
 *   … scripts/idee-status.mjs umgesetzt idee.kurat.chatkontrolle-ueberwachung
 *   … scripts/idee-status.mjs verworfen idee.dip.336934 idee.dip.336677
 *
 * Env: SANITY_WRITE_TOKEN (Editor-/Write-Token), SANITY_PROJECT_ID
 *      (o. SANITY_STUDIO_PROJECT_ID / NEXT_PUBLIC_SANITY_PROJECT_ID), SANITY_DATASET.
 */
const PROJECT =
  process.env.SANITY_PROJECT_ID ??
  process.env.SANITY_STUDIO_PROJECT_ID ??
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??
  'nfndwwt2';
const DATASET = process.env.SANITY_DATASET ?? process.env.SANITY_STUDIO_DATASET ?? 'production';
const TOKEN = process.env.SANITY_WRITE_TOKEN;

const VALID = new Set(['vorschlag', 'umgesetzt', 'verworfen']);
const [status, ...ids] = process.argv.slice(2);

if (!TOKEN) {
  console.error('Fehlt: SANITY_WRITE_TOKEN (Write-/Editor-Token).');
  process.exit(1);
}
if (!VALID.has(status) || ids.length === 0) {
  console.error('Nutzung: idee-status.mjs <vorschlag|umgesetzt|verworfen> <idee-id ...>');
  process.exit(1);
}

const mutations = ids.map((id) => ({ patch: { id, set: { status } } }));
const url = `https://${PROJECT}.api.sanity.io/v2025-01-01/data/mutate/${DATASET}?returnIds=true`;
const res = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
  body: JSON.stringify({ mutations }),
});
if (!res.ok) {
  console.error(`Sanity-Mutation fehlgeschlagen: ${res.status} ${await res.text()}`);
  process.exit(1);
}
const json = await res.json();
console.log(`OK: ${ids.length} idee(n) auf „${status}" gesetzt (${json.results?.length ?? json.documentIds?.length ?? 0} Operationen, Projekt ${PROJECT}/${DATASET}).`);
for (const id of ids) console.log(`  · ${id}`);
