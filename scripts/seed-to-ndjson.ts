/**
 * Migration: Seed-Inhalte (apps/web/content) → normalisierte Sanity-Dokumente (NDJSON).
 * Ausführen:  pnpm migrate:ndjson
 * Importieren: sanity dataset import apps/studio/seed/migrated.ndjson production
 *
 * Erzeugt deterministische _ids (slug-basiert), dedupliziert Quellen/Themen/Autoren,
 * wandelt resolved `daten` → `datenJson` (String) und Body-Blöcke in Referenzen.
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { seedArticles } from '../apps/web/content/seed.ts';

type Doc = { _id: string; _type: string; [key: string]: unknown };

let keyCounter = 0;
const k = (): string => `k${(keyCounter++).toString(36)}`;

function slug(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'x'
  );
}

const docs: Doc[] = [];
const seen = new Set<string>();
function push(doc: Doc): string {
  if (!seen.has(doc._id)) {
    seen.add(doc._id);
    docs.push(doc);
  }
  return doc._id;
}

type Quelle = { titel: string; url?: string; herausgeber?: string };
function quelleId(q?: Quelle): string | undefined {
  if (!q?.titel) return undefined;
  return push({ _id: `quelle.${slug(q.titel)}`, _type: 'quelle', titel: q.titel, url: q.url, herausgeber: q.herausgeber });
}
function autorId(a: { name: string; rolle?: string }): string {
  return push({ _id: `autor.${slug(a.name)}`, _type: 'autor', name: a.name, rolle: a.rolle });
}
function themaId(t: { name: string; slug?: string }): string {
  return push({
    _id: `thema.${slug(t.name)}`,
    _type: 'thema',
    name: t.name,
    slug: { _type: 'slug', current: t.slug ?? slug(t.name) },
  });
}
function massnahmeId(titel: string): string {
  return push({
    _id: `massnahme.${slug(titel)}`,
    _type: 'massnahme',
    titel,
    slug: { _type: 'slug', current: slug(titel) },
  });
}
const arrayRef = (id: string) => ({ _type: 'reference', _ref: id, _key: k() });
const fieldRef = (id: string) => ({ _type: 'reference', _ref: id });

function datensatzId(ds: Record<string, any>, base: string): string {
  const qid = quelleId(ds.quelle);
  return push({
    _id: `datensatz.${base}`,
    _type: 'datensatz',
    titel: ds.titel,
    spalten: (ds.spalten ?? []).map((s: Record<string, unknown>) => ({ _key: k(), ...s })),
    datenJson: JSON.stringify(ds.daten ?? []),
    quelle: qid ? fieldRef(qid) : undefined,
  });
}

function visualisierungId(v: Record<string, any>, base: string): string {
  const doc: Doc = {
    _id: `visualisierung.${base}`,
    _type: 'visualisierung',
    titel: v.titel,
    typ: v.typ,
    beschreibung: v.beschreibung,
    caption: v.caption,
    encoding: v.encoding ? { ...v.encoding } : undefined,
  };
  if (v.typ === 'position-matrix') {
    doc.matrixPositionen = (v.positionen ?? []).map((p: Record<string, unknown>) => ({ _key: k(), ...p }));
  } else if (v.datensatz) {
    doc.datensatz = fieldRef(datensatzId(v.datensatz, base));
  }
  return push(doc);
}

function convertBody(body: any[], base: string): unknown[] {
  let i = 0;
  return body.map((block) => {
    switch (block._type) {
      case 'visualisierungBlock':
        return {
          _type: 'visualisierungBlock',
          _key: block._key ?? k(),
          visualisierung: fieldRef(visualisierungId(block.visualisierung, `${base}.${i++}`)),
        };
      case 'datentabelleBlock':
        return {
          _type: 'datentabelleBlock',
          _key: block._key ?? k(),
          caption: block.caption,
          datensatz: fieldRef(datensatzId(block.datensatz, `${base}.tab.${i++}`)),
        };
      case 'zitatBlock': {
        const qid = quelleId(block.quelle);
        return { _type: 'zitatBlock', _key: block._key ?? k(), zitat: block.zitat, quelle: qid ? fieldRef(qid) : undefined };
      }
      case 'quellenNote': {
        const qid = quelleId(block.quelle);
        return { _type: 'quellenNote', _key: block._key ?? k(), text: block.text, quelle: qid ? fieldRef(qid) : undefined };
      }
      case 'diskursBlock':
        return {
          _type: 'diskursBlock',
          _key: block._key ?? k(),
          titel: block.titel,
          frage: block.frage,
          einleitung: block.einleitung,
          perspektiven: (block.perspektiven ?? []).map((p: Record<string, unknown>) => ({ _key: k(), ...p })),
          einordnung: block.einordnung,
        };
      default:
        return block; // Portable-Text-Block — bereits gültig (_key, children)
    }
  });
}

for (const article of seedArticles) {
  const base = slug(article.slug);
  push({
    _id: `beitrag.${base}`,
    _type: 'beitrag',
    titel: article.titel,
    slug: { _type: 'slug', current: article.slug },
    standfirst: article.standfirst,
    status: 'veroeffentlicht',
    veroeffentlicht: article.veroeffentlicht ? new Date(article.veroeffentlicht).toISOString() : undefined,
    ressort: article.ressort,
    methodik: article.methodik,
    autoren: (article.autoren ?? []).map((a) => arrayRef(autorId(a))),
    themen: (article.themen ?? []).map((t) => arrayRef(themaId(t))),
    body: convertBody(article.body as any[], base),
  });
}

const ndjson = docs.map((d) => JSON.stringify(d)).join('\n') + '\n';
const outPath = fileURLToPath(new URL('../apps/studio/seed/migrated.ndjson', import.meta.url));
writeFileSync(outPath, ndjson);

const counts: Record<string, number> = {};
for (const d of docs) counts[d._type] = (counts[d._type] ?? 0) + 1;
console.log(`Geschrieben: ${docs.length} Dokumente → ${outPath}`);
console.log('Nach Typ:', counts);
