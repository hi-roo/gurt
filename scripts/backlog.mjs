/**
 * Zeigt den Themen-Backlog (`idee`-Dokumente) aus Sanity — Grundlage der Priorisierung.
 * Teil der Backlog-Pflege — siehe docs/12-themen-radar-backlog.md.
 * Reines ESM-JavaScript (nur eingebautes fetch) → läuft mit `node` direkt.
 *
 *   node --env-file-if-exists=.env.local scripts/backlog.mjs         # offene (status vorschlag)
 *   node --env-file-if-exists=.env.local scripts/backlog.mjs --all   # inkl. umgesetzt/verworfen
 *   # Worktree ohne eigenes .env.local: --env-file=/PFAD/zum/repo/.env.local
 *
 * Env: SANITY_WRITE_TOKEN (o. SANITY_API_READ_TOKEN), SANITY_PROJECT_ID
 *      (o. SANITY_STUDIO_PROJECT_ID / NEXT_PUBLIC_SANITY_PROJECT_ID), SANITY_DATASET.
 */
const PROJECT =
  process.env.SANITY_PROJECT_ID ??
  process.env.SANITY_STUDIO_PROJECT_ID ??
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??
  'nfndwwt2';
const DATASET = process.env.SANITY_DATASET ?? process.env.SANITY_STUDIO_DATASET ?? 'production';
const TOKEN = process.env.SANITY_WRITE_TOKEN ?? process.env.SANITY_API_READ_TOKEN;

if (!TOKEN) {
  console.error('Fehlt: SANITY_WRITE_TOKEN oder SANITY_API_READ_TOKEN.');
  process.exit(1);
}

const all = process.argv.includes('--all');
const filter = all ? '_type=="idee"' : '_type=="idee" && status=="vorschlag"';
const query = `*[${filter}]|order(themenfeld asc, entdecktAm desc){_id,titel,status,themenfeld,leitfrage,entdecktAm}`;
const url = `https://${PROJECT}.api.sanity.io/v2025-01-01/data/query/${DATASET}?query=${encodeURIComponent(query)}`;

const res = await fetch(url, { headers: { Authorization: `Bearer ${TOKEN}` } });
if (!res.ok) {
  console.error(`Sanity-Query fehlgeschlagen: ${res.status} ${await res.text()}`);
  process.exit(1);
}
const docs = (await res.json()).result ?? [];

const byStatus = {};
for (const d of docs) byStatus[d.status ?? '(ohne)'] = (byStatus[d.status ?? '(ohne)'] ?? 0) + 1;
console.log(`Themen-Backlog (${PROJECT}/${DATASET}) — ${docs.length} idee-Docs${all ? '' : ' (offen)'}`);
console.log(`Status: ${JSON.stringify(byStatus)}`);

let feld = null;
for (const d of docs) {
  if (d.themenfeld !== feld) {
    feld = d.themenfeld;
    console.log(`\n### ${feld ?? '(ohne Feld)'}`);
  }
  const mark = d.status === 'vorschlag' ? '·' : d.status === 'umgesetzt' ? '✓' : '✗';
  console.log(`  ${mark} ${d.titel}  (${d.entdecktAm ?? 'o. D.'})  <${d._id}>`);
}
