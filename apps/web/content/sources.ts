import type {
  BodyBlock,
  DatentabelleBlock,
  DiskursBlock,
  QuelleRef,
  QuellenNote,
  VisualisierungBlock,
  ZitatBlock,
} from './types';

/** Eine deduplizierte Quelle für die Weiterlesen-Liste der Randspalte. */
export type SourceLink = QuelleRef;

/**
 * Sammelt alle im Beitrag belegten Quellen (Datensätze, Diskurs-Stimmen, Zitate, Quellen-Noten)
 * dedupliziert in Lesereihenfolge. Reine Logik (kein Rendering) — speist die Randspalte (UX-2),
 * ohne dass der Beitrag eigene Weiterlesen-Felder pflegen muss.
 *
 * Hinweis: `PortableTextBlock` trägt `_type: string` (kein Literal), daher narrowt die Union nicht
 * automatisch — die Block-Typen werden nach dem `_type`-Check explizit gecastet.
 */
export function collectSources(body: BodyBlock[]): SourceLink[] {
  const out: SourceLink[] = [];
  const seen = new Set<string>();
  const add = (q?: QuelleRef) => {
    if (!q?.titel) return;
    const keyStr = (q.url ?? q.titel).trim().toLowerCase();
    if (seen.has(keyStr)) return;
    seen.add(keyStr);
    out.push({ titel: q.titel, url: q.url, herausgeber: q.herausgeber });
  };

  for (const block of body) {
    switch (block._type) {
      case 'visualisierungBlock':
        add((block as VisualisierungBlock).visualisierung?.datensatz?.quelle);
        break;
      case 'datentabelleBlock':
        add((block as DatentabelleBlock).datensatz?.quelle);
        break;
      case 'diskursBlock':
        (block as DiskursBlock).perspektiven?.forEach((p) => add(p.quelle));
        break;
      case 'quellenNote':
        add((block as QuellenNote).quelle);
        break;
      case 'zitatBlock':
        add((block as ZitatBlock).quelle);
        break;
      default:
        break; // Portable-Text-Blöcke tragen keine eigene Quelle
    }
  }
  return out;
}
