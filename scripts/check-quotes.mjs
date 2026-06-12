/**
 * Typografie-Gate: deutsche Anführungszeichen („…“, 9966) statt Zollzeichen.
 *
 * Findet das häufigste Fehlmuster — deutsches öffnendes „ mit schließendem
 * Zollzeichen " — in allen user-facing Quellen (Web-App, UI-/Viz-Pakete,
 * Studio-Schemas). Schlägt mit Fundstellen fehl; läuft in CI nach dem Lint.
 *
 * Bewusst eng gefasst: reine Zollzeichen-Paare ("…") bleiben erlaubt, weil sie
 * in Code (Attribute, Strings) legitim sind — das Muster „…" ist dagegen immer
 * ein Tippfehler im Text. Korrekt: „Wort“ · Binnenzitat: ‚Wort‘.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOTS = [
  'apps/web/app',
  'apps/web/components',
  'apps/web/content',
  'apps/web/lib',
  'apps/studio/schemas',
  'packages/ui/src',
  'packages/visualizations/src',
];
const EXT = /\.(ts|tsx)$/;
const WRONG = /„[^"„“\n]*"/g;

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* walk(path);
    else if (EXT.test(name)) yield path;
  }
}

const findings = [];
for (const root of ROOTS) {
  let files;
  try {
    files = [...walk(root)];
  } catch {
    continue; // Root existiert (noch) nicht — überspringen.
  }
  for (const file of files) {
    const lines = readFileSync(file, 'utf8').split('\n');
    lines.forEach((line, i) => {
      for (const match of line.matchAll(WRONG)) {
        findings.push(`${file}:${i + 1}  ${match[0]}`);
      }
    });
  }
}

if (findings.length) {
  console.error(
    `✗ ${findings.length} falsche(s) Anführungszeichen-Paar(e) — deutsches „ braucht schließendes “ (kein Zollzeichen):\n`,
  );
  for (const f of findings) console.error('  ' + f);
  console.error('\nKorrekt: „Wort“ (9966) · Binnenzitat: ‚Wort‘');
  process.exit(1);
}
console.log('✓ Anführungszeichen ok („…“, keine Zollzeichen-Schließungen)');
