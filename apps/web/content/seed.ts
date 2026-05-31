import type { PortableTextBlock } from '@portabletext/types';
import type { Article, BodyBlock } from './types';
import { energieEuVisualisierung } from './datasets/energie-eu';
import { energieEuLaenderVisualisierung } from './datasets/energie-eu-laender';
import { dipEnergieVisualisierung, hasDipData } from './datasets/dip-energie';

/**
 * Seed-Inhalt: das Energie-Leitbeispiel. Läuft, bevor ein Sanity-Projekt existiert.
 *
 * WICHTIG: Alle Zahlen sind ILLUSTRATIV und dienen nur der Demonstration der
 * Darstellungsformen. Keine erfundenen Zitate realer Personen (siehe docs/07).
 * Echte Beiträge werden redaktionell aus offiziellen Quellen erstellt.
 */

let counter = 0;
const key = (): string => `seed-${counter++}`;

function block(style: PortableTextBlock['style'], text: string): PortableTextBlock {
  return {
    _type: 'block',
    _key: key(),
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text, marks: [] }],
  };
}

const positionsMatrix: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Wer steht wie zu den drei Wegen?',
    typ: 'position-matrix',
    beschreibung:
      'Matrix aus fünf Akteuren und drei energiepolitischen Maßnahmen. Sie zeigt, dass Zustimmung zu neuen Gaskraftwerken, zum Ausbau der Erneuerbaren und zur Technologieoffenheit nebeneinander bestehen können — mehrere Positionen sind gleichzeitig vertretbar.',
    caption: 'Positionen ausgewählter Akteure zu drei parallelen Maßnahmen (illustratives Beispiel).',
    positionen: [
      { akteur: 'Wirtschaftsministerium', massnahme: 'Neue Gaskraftwerke', haltung: 'dafuer', zitat: 'Gaskraftwerke als Brücke für Versorgungssicherheit (illustrativ).' },
      { akteur: 'Wirtschaftsministerium', massnahme: 'Ausbau Erneuerbare', haltung: 'differenziert' },
      { akteur: 'Wirtschaftsministerium', massnahme: 'Technologieoffenheit', haltung: 'dafuer', zitat: 'Lösungen technologieoffen denken (illustrativ).' },
      { akteur: 'Umweltverbände', massnahme: 'Neue Gaskraftwerke', haltung: 'dagegen' },
      { akteur: 'Umweltverbände', massnahme: 'Ausbau Erneuerbare', haltung: 'dafuer' },
      { akteur: 'Umweltverbände', massnahme: 'Technologieoffenheit', haltung: 'differenziert' },
      { akteur: 'Industrieverband', massnahme: 'Neue Gaskraftwerke', haltung: 'dafuer' },
      { akteur: 'Industrieverband', massnahme: 'Ausbau Erneuerbare', haltung: 'differenziert' },
      { akteur: 'Industrieverband', massnahme: 'Technologieoffenheit', haltung: 'dafuer' },
      { akteur: 'Energiewirtschaft', massnahme: 'Neue Gaskraftwerke', haltung: 'dafuer' },
      { akteur: 'Energiewirtschaft', massnahme: 'Ausbau Erneuerbare', haltung: 'dafuer' },
      { akteur: 'Energiewirtschaft', massnahme: 'Technologieoffenheit', haltung: 'differenziert' },
      { akteur: 'Klimaforschung', massnahme: 'Neue Gaskraftwerke', haltung: 'differenziert' },
      { akteur: 'Klimaforschung', massnahme: 'Ausbau Erneuerbare', haltung: 'dafuer' },
      { akteur: 'Klimaforschung', massnahme: 'Technologieoffenheit', haltung: 'unklar' },
    ],
  },
};

const erzeugungBalken: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Stromerzeugung nach Energieträger',
    typ: 'balken',
    beschreibung:
      'Balkendiagramm der Stromerzeugung nach Energieträger in Terawattstunden. Erneuerbare liefern den größten Anteil, Erdgas einen kleineren, aber für die Spitzenlast relevanten Beitrag (illustrative Werte).',
    caption: 'Stromerzeugung nach Energieträger in TWh (illustratives Beispiel).',
    encoding: { kategorieFeld: 'traeger', yFeld: 'twh' },
    datensatz: {
      titel: 'Stromerzeugung nach Energieträger',
      quelle: { titel: 'Illustratives Beispiel', herausgeber: 'Gurt (Demo-Daten)' },
      spalten: [
        { name: 'traeger', typ: 'string' },
        { name: 'twh', typ: 'number', einheit: 'TWh' },
      ],
      daten: [
        { traeger: 'Erneuerbare', twh: 256 },
        { traeger: 'Kohle', twh: 132 },
        { traeger: 'Erdgas', twh: 76 },
        { traeger: 'Sonstige', twh: 40 },
      ],
    },
  },
};

const investitionenLinie: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Investitionen: Erneuerbare und Gaskraftwerke',
    typ: 'linie',
    beschreibung:
      'Liniendiagramm zweier Investitionsverläufe 2019–2025 in Milliarden Euro. Investitionen in Erneuerbare steigen zunächst und gehen zuletzt leicht zurück; Investitionen in Gaskraftwerke steigen kontinuierlich (illustrative Werte).',
    caption: 'Jährliche Investitionen in Mrd. € (illustratives Beispiel).',
    encoding: { xFeld: 'jahr', yFeld: 'mrd', serieFeld: 'bereich' },
    datensatz: {
      titel: 'Investitionen nach Bereich, 2019–2025',
      quelle: { titel: 'Illustratives Beispiel', herausgeber: 'Gurt (Demo-Daten)' },
      spalten: [
        { name: 'jahr', typ: 'string' },
        { name: 'bereich', typ: 'string' },
        { name: 'mrd', typ: 'number', einheit: 'Mrd. €' },
      ],
      daten: [
        { jahr: '2019', bereich: 'Erneuerbare', mrd: 12 },
        { jahr: '2020', bereich: 'Erneuerbare', mrd: 14 },
        { jahr: '2021', bereich: 'Erneuerbare', mrd: 16 },
        { jahr: '2022', bereich: 'Erneuerbare', mrd: 19 },
        { jahr: '2023', bereich: 'Erneuerbare', mrd: 22 },
        { jahr: '2024', bereich: 'Erneuerbare', mrd: 20 },
        { jahr: '2025', bereich: 'Erneuerbare', mrd: 18 },
        { jahr: '2019', bereich: 'Gaskraftwerke', mrd: 2 },
        { jahr: '2020', bereich: 'Gaskraftwerke', mrd: 2 },
        { jahr: '2021', bereich: 'Gaskraftwerke', mrd: 3 },
        { jahr: '2022', bereich: 'Gaskraftwerke', mrd: 4 },
        { jahr: '2023', bereich: 'Gaskraftwerke', mrd: 5 },
        { jahr: '2024', bereich: 'Gaskraftwerke', mrd: 7 },
        { jahr: '2025', bereich: 'Gaskraftwerke', mrd: 9 },
      ],
    },
  },
};

const energieArticle: Article = {
  _id: 'seed-energie',
  titel: 'Gaskraftwerke, Erneuerbare, Technologieoffenheit: Warum mehrere Wege gleichzeitig nötig sein können',
  slug: 'energie-mehrere-wege',
  standfirst:
    'Die Debatte um Deutschlands Energiepolitik wird oft als Entweder-oder geführt. Ein genauer Blick zeigt: Versorgungssicherheit, Klimaschutz und Wettbewerbsfähigkeit verlangen parallele Antworten — und viele Positionen können gleichzeitig zutreffen.',
  veroeffentlicht: '2026-05-20',
  themen: [{ name: 'Energiepolitik', slug: 'energiepolitik' }],
  autoren: [{ name: 'Gurt-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Dies ist ein Demonstrationsbeitrag. Sämtliche Zahlen und Positionen sind ILLUSTRATIV und nicht aus offiziellen Quellen abgeleitet. Sie zeigen ausschließlich die Darstellungsformen der Plattform. Reale Beiträge stützen sich auf offizielle Quellen (data.europa.eu, Bundestag-DIP, Bundesregierung) und weisen Datenstand, Auswahl und Grenzen aus.',
  body: [
    block('h2', 'Worum es geht'),
    block(
      'normal',
      'Der Aufbau neuer Gaskraftwerke gilt als nötig, um Versorgungssicherheit zu garantieren, wenn Wind und Sonne nicht ausreichen. Gleichzeitig sind Erneuerbare langfristig die günstigste Quelle und zentral für die Klimaziele. Und „Technologieoffenheit" hält weitere Optionen offen.',
    ),
    block(
      'normal',
      'Diese Wege schließen sich nicht aus — sie adressieren unterschiedliche Probleme zur selben Zeit. Die folgende Matrix macht sichtbar, wie verschiedene Akteure zu den drei Maßnahmen stehen.',
    ),
    positionsMatrix,
    block('h2', 'Stromerzeugung heute'),
    block(
      'normal',
      'Erneuerbare tragen den größten Anteil der Erzeugung; Gas bleibt vor allem für die gesicherte Leistung relevant. Der Vergleich der Größenordnungen ordnet die Debatte ein.',
    ),
    erzeugungBalken,
    block('h2', 'Zwei Kurven, eine Debatte'),
    block(
      'normal',
      'Wer von „Zurückfahren der Erneuerbaren" und „Setzen auf Gas" spricht, meint oft zwei parallele Investitionsverläufe. Beide nebeneinander zu sehen, schärft das Bild.',
    ),
    investitionenLinie,
    {
      _type: 'zitatBlock',
      _key: key(),
      zitat:
        'Mehrere Dinge können gleichzeitig richtig sein: gesicherte Leistung, der Ausbau der Erneuerbaren und das Offenhalten weiterer Technologien.',
      quelle: { titel: 'Illustratives Beispiel (keine reale Quelle)' },
    },
    {
      _type: 'vergleichBlock',
      _key: key(),
      titel: 'Zwei Maßnahmen im Vergleich',
      einleitung:
        'Beide Maßnahmen verfolgen legitime, aber unterschiedliche Ziele — Versorgungssicherheit kurzfristig, Klima und Kosten langfristig.',
      links: { titel: 'Neue Gaskraftwerke' },
      rechts: { titel: 'Ausbau Erneuerbare' },
    },
    {
      _type: 'quellenNote',
      _key: key(),
      text: 'Alle Daten in diesem Beitrag sind illustrativ und dienen nur der Demonstration. Reale Beiträge nutzen ausschließlich offizielle Quellen mit ausgewiesenem Datenstand.',
      quelle: { titel: 'Gurt — Methodik', url: 'https://gurt.report' },
    },
  ],
};

// Erster ECHTER Beitrag (nicht illustrativ): live erfasste Daten von data.europa.eu.
const euDatenArticle: Article = {
  _id: 'eu-energie-daten',
  titel: 'Wie viele offene Energie-Daten verzeichnet die EU?',
  slug: 'eu-energie-datensaetze',
  standfirst:
    'Ein erster Beitrag mit echten Zahlen statt Beispielwerten: Das EU-Open-Data-Portal listet zehntausende energiebezogene Datensätze — aber sehr ungleich über die Themen verteilt.',
  veroeffentlicht: '2026-05-31',
  themen: [
    { name: 'Energiepolitik', slug: 'energiepolitik' },
    { name: 'Offene Daten', slug: 'offene-daten' },
  ],
  autoren: [{ name: 'Gurt-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Datenquelle: data.europa.eu (EU Open Data Portal), Such-API, abgerufen am 31. Mai 2026. (1) Treffer je Stichwort: Gesamttreffermenge je deutschsprachigem Begriff (Volltextsuche, limit=0). (2) Herkunftsländer: relevanz-sortierte Stichprobe der 300 wichtigsten „Energie"-Treffer, aggregiert nach Land — keine Vollerhebung, daher als Stichprobe ausgewiesen. Die Zahlen spiegeln Datenverfügbarkeit und Verschlagwortung im Portal wider, nicht die reale energiewirtschaftliche Bedeutung. Reproduzierbar via „pnpm --filter @gurt/data ingest -- --source=data-europa-counts" bzw. „--source=data-europa-countries".',
  body: [
    block('h2', 'Echte Zahlen, offizielle Quelle'),
    block(
      'normal',
      'Anders als das Leitbeispiel weiter unten nutzt dieser Beitrag keine illustrativen Werte, sondern live abgefragte Metadaten des offiziellen EU-Open-Data-Portals. Die Visualisierung zeigt, zu welchen Energie-Stichwörtern wie viele offene Datensätze vorliegen.',
    ),
    {
      _type: 'visualisierungBlock',
      _key: key(),
      visualisierung: energieEuVisualisierung,
    },
    block(
      'normal',
      'Die Verteilung ist stark ungleich: Übergreifende Begriffe wie „Energie" und „Erneuerbare Energien" führen mit Abstand, während spezifische Felder wie Solarenergie oder Energieeffizienz nur wenige Hundert Treffer haben. Das sagt zunächst etwas über Verschlagwortung und Datenpraxis aus — nicht über die politische oder wirtschaftliche Bedeutung eines Themas.',
    ),
    block('h2', 'Woher die Daten kommen'),
    block(
      'normal',
      'Wer trägt eigentlich am meisten zu den offenen Energie-Daten bei? Eine Stichprobe der 300 relevantesten Treffer, aufgeschlüsselt nach Herkunftsland, zeigt ein klares Bild — mit einigen Überraschungen.',
    ),
    {
      _type: 'visualisierungBlock',
      _key: key(),
      visualisierung: energieEuLaenderVisualisierung,
    },
    block(
      'normal',
      'Deutschland und Dänemark liegen fast gleichauf vorn, gefolgt von Frankreich. Bemerkenswert: Das kleine Dänemark hält mit großen Mitgliedstaaten mit — ein Hinweis auf seine ausgeprägte Open-Data- und Energiedaten-Kultur. Da es sich um eine relevanz-sortierte Stichprobe handelt, ist dies eine Momentaufnahme, keine vollständige Länderstatistik.',
    ),
    {
      _type: 'quellenNote',
      _key: key(),
      text: 'Daten live abgefragt am 31. Mai 2026 über die Such-API von data.europa.eu (Treffer je Stichwort, limit=0).',
      quelle: { titel: 'data.europa.eu — EU Open Data Portal', url: 'https://data.europa.eu' },
    },
  ],
};

// Echter DIP-Beitrag (Deutscher Bundestag). Erscheint automatisch, sobald
// dip-energie.json befüllt ist (DIP_API_KEY erforderlich, siehe dip-energie.ts).
const dipArticle: Article = {
  _id: 'dip-energie-vorgaenge',
  titel: 'Energie im Bundestag: Wie viele Vorgänge pro Jahr?',
  slug: 'dip-energie-vorgaenge',
  standfirst:
    'Auf Basis des amtlichen Dokumentations- und Informationssystems (DIP) des Deutschen Bundestags: die parlamentarische Befassung mit dem Thema Energie im Zeitverlauf.',
  veroeffentlicht: '2026-05-31',
  themen: [
    { name: 'Energiepolitik', slug: 'energiepolitik' },
    { name: 'Parlament', slug: 'parlament' },
  ],
  autoren: [{ name: 'Gurt-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Datenquelle: Deutscher Bundestag, Dokumentations- und Informationssystem (DIP), API v1. Vollständige Auszählung aller im DIP erfassten Vorgänge mit dem Titelstichwort „Energie" (1976–2026, 1416 Vorgänge), aggregiert nach Vorgangsdatum — keine Stichprobe. Das laufende Jahr 2026 ist naturgemäß unvollständig. „Energie" im Titel ist ein grober Näherungswert für das Thema; verwandte Vorgänge ohne dieses Stichwort fehlen. Reproduzierbar via „pnpm --filter @gurt/data ingest -- --source=bundestag-dip --titel=Energie --pages=20". Ein DIP-API-Key ist erforderlich.',
  body: [
    block('h2', 'Parlamentarische Befassung im Zeitverlauf'),
    block(
      'normal',
      'Wie intensiv beschäftigt sich der Bundestag mit Energie? Die folgende Auswertung zählt die im DIP erfassten Vorgänge je Jahr — ein Indikator für die parlamentarische Aufmerksamkeit.',
    ),
    {
      _type: 'visualisierungBlock',
      _key: key(),
      visualisierung: dipEnergieVisualisierung,
    },
    block(
      'normal',
      'Das Bild ist eindeutig: In den 1970er- und 1980er-Jahren befasste sich der Bundestag nur vereinzelt mit „Energie", seit den 2000er-Jahren dauerhaft intensiv — mit einem Höchststand 2012. Die Auswertung zählt allein das Titelstichwort und ist damit ein grober, aber konsistenter Indikator für die parlamentarische Aufmerksamkeit über fünf Jahrzehnte.',
    ),
    {
      _type: 'quellenNote',
      _key: key(),
      text: 'Quelle: Deutscher Bundestag, DIP-API (v1), Vorgänge mit Titel-Filter „Energie".',
      quelle: {
        titel: 'Deutscher Bundestag — DIP',
        url: 'https://dip.bundestag.de',
      },
    },
  ],
};

export const seedArticles: Article[] = [
  euDatenArticle,
  ...(hasDipData ? [dipArticle] : []),
  energieArticle,
];
