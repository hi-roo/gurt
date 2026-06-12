import type { PortableTextBlock } from '@portabletext/types';
import type { Haltung } from '@gurt/visualizations';

export interface QuelleRef {
  titel: string;
  url?: string;
  herausgeber?: string;
}

export interface ResolvedDatensatz {
  titel: string;
  spalten: { name: string; typ: string; einheit?: string }[];
  /** Datenzeilen (im Seed direkt, aus Sanity nach JSON-Parse von datenJson). */
  daten: Array<Record<string, string | number | null>>;
  quelle?: QuelleRef;
}

export interface ResolvedVisualisierung {
  titel: string;
  typ: 'balken' | 'waffle' | 'treemap' | 'sankey' | 'chord' | 'verhaeltnis' | 'anteilsbalken' | 'linie' | 'flaeche' | 'beeswarm' | 'position-matrix' | 'zeitachse' | 'bespoke';
  /** A11y-Pflichtfeld: Text-Alternative. */
  beschreibung: string;
  caption?: string;
  encoding?: {
    xFeld?: string;
    yFeld?: string;
    kategorieFeld?: string;
    serieFeld?: string;
    /** Nur Beeswarm: hervorgehobene Kategorie + optionale Referenzlinie. */
    highlight?: string;
    refWert?: number;
    refLabel?: string;
    /** Nur Linie: Serien-Werte, die gestrichelt gezeichnet werden (z. B. Projektionen). */
    gestrichelteReihen?: string[];
    /** Nur Verhältnis/Icon-Array: Basis und Hervorhebung als zwei gleichwertige Kategorien
     *  (Basis erhält eine eigene Palettenfarbe statt Grau) — z. B. Arbeit vs. Kapital. */
    zweifarbig?: boolean;
    /**
     * Optionale Label→Farbe-Zuordnung, je Eintrag als `"Label:#hex"` (String-Array,
     * Sanity-konform — keine Sonderzeichen in Attributnamen). Dokumentierte Ausnahme
     * von der rein kategorialen Palette: erlaubt etablierte Identitätsfarben bei
     * Charts über benannte Akteure/Fraktionen (z. B. Partei-Erkennungsfarben). Nie
     * wertend, AA-Kontrast Pflicht, Farbe nie alleiniger Bedeutungsträger.
     */
    farben?: string[];
  };
  datensatz?: ResolvedDatensatz;
  /** Nur für position-matrix. Aussagen tragen ihre Quelle direkt (Pflicht). */
  positionen?: {
    akteur: string;
    massnahme: string;
    haltung: Haltung;
    zitat?: string;
    quelle?: QuelleRef;
  }[];
}

export interface VisualisierungBlock {
  _type: 'visualisierungBlock';
  _key: string;
  visualisierung: ResolvedVisualisierung;
}

export interface DatentabelleBlock {
  _type: 'datentabelleBlock';
  _key: string;
  caption?: string;
  datensatz: ResolvedDatensatz;
}

export interface ZitatBlock {
  _type: 'zitatBlock';
  _key: string;
  zitat: string;
  quelle?: QuelleRef;
}

export interface QuellenNote {
  _type: 'quellenNote';
  _key: string;
  text: string;
  quelle?: QuelleRef;
}

export interface DiskursPerspektive {
  /** Stimme / Perspektive im Diskurs (z. B. „Bundesregierung“, „Umweltverbände“). */
  label: string;
  /** Paraphrasierte Aussage — keine wörtlichen Zitate (docs/07). */
  aussage: string;
  /** Quelle direkt an der Sichtweise (Pflicht). */
  quelle?: QuelleRef;
}

export interface DiskursBlock {
  _type: 'diskursBlock';
  _key: string;
  titel?: string;
  frage?: string;
  einleitung?: string;
  perspektiven: DiskursPerspektive[];
  einordnung?: string;
}

export type BodyBlock =
  | PortableTextBlock
  | VisualisierungBlock
  | DatentabelleBlock
  | ZitatBlock
  | QuellenNote
  | DiskursBlock;

export interface ArticleSummary {
  _id: string;
  titel: string;
  slug: string;
  standfirst?: string;
  veroeffentlicht?: string;
  /** Feste Top-Ebene (ein Ressort-Slug, siehe content/ressorts.ts). */
  ressort?: string;
  themen?: { name: string; slug?: string }[];
}

export interface Article extends ArticleSummary {
  methodik?: string;
  autoren?: { name: string; rolle?: string }[];
  body: BodyBlock[];
}

/** Ein durchsuchbarer Beitrag (flacher Index für die Volltextsuche). */
export interface SearchDoc {
  slug: string;
  titel: string;
  standfirst: string;
  themen: { name: string; slug?: string }[];
  /** Fließtext des Beitrags, flach (Sanity: pt::text(body); Seed: Block-Text). */
  text: string;
}
