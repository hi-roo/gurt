/**
 * Ressorts — die feste, kuratierte Top-Ebene der Navigation (anders als die offenen,
 * wachsenden `themen`/Tags). Kleiner, stabiler Satz; jeder Beitrag trägt genau ein
 * Ressort (`ressort`-Slug). Reihenfolge = Reihenfolge in der Navigation.
 *
 * WICHTIG: Dieselbe Liste (Titel/Slug) ist im Studio-Schema gespiegelt
 * (`apps/studio/schemas/documents/beitrag.ts`, Feld `ressort`). Bei Änderungen beide
 * Stellen anpassen und das Studio neu deployen.
 */
export interface Ressort {
  slug: string;
  name: string;
}

// Orientiert an den Bundesministerien (institutionell, neutral) — Ein-Wort-Domänen
// statt erfundener „&"-Kombis. „Parlament" ist die Ausnahme (Legislative, kein Ministerium).
// Wächst organisch: Gesundheit, Bildung, Verkehr, Digitales, Justiz, Außenpolitik … kommen
// hinzu, sobald es Beiträge gibt (die Nav zeigt nur belegte Ressorts).
export const RESSORTS: readonly Ressort[] = [
  { slug: 'finanzen', name: 'Finanzen' },
  { slug: 'wirtschaft', name: 'Wirtschaft' },
  { slug: 'soziales', name: 'Soziales' },
  { slug: 'umwelt', name: 'Umwelt' },
  { slug: 'inneres', name: 'Inneres' },
  { slug: 'verteidigung', name: 'Verteidigung' },
  { slug: 'wohnen', name: 'Wohnen' },
  { slug: 'parlament', name: 'Parlament' },
] as const;

const BY_SLUG = new Map(RESSORTS.map((r) => [r.slug, r]));

/** Ressort-Objekt zu einem Slug (oder undefined). */
export function ressortBySlug(slug: string | undefined): Ressort | undefined {
  return slug ? BY_SLUG.get(slug) : undefined;
}

/** Anzeigename zu einem Ressort-Slug (Fallback: der Slug selbst). */
export function ressortName(slug: string | undefined): string {
  return ressortBySlug(slug)?.name ?? slug ?? '';
}
