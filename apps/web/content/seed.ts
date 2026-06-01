import type { PortableTextBlock } from '@portabletext/types';
import type { Article, BodyBlock } from './types';
import { energieEuVisualisierung } from './datasets/energie-eu';
import { energieEuLaenderVisualisierung } from './datasets/energie-eu-laender';
import { dipEnergieVisualisierung, hasDipData } from './datasets/dip-energie';

/**
 * Seed-Inhalt: Bootstrap-Beiträge, bevor/falls kein Sanity-Projekt konfiguriert ist.
 *
 * Alle drei Beiträge nutzen ECHTE, bequellte Daten: Energie-Leuchtturm (Fraunhofer
 * ISE / Energy-Charts), EU-Open-Data (data.europa.eu) und Bundestag-DIP. Positionen
 * sind paraphrasiert und bequellt — keine erfundenen Zitate realer Personen (docs/07).
 * Datenstand, Metrik und Grenzen sind je Beitrag in Methodik/Quellen ausgewiesen.
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
      'Matrix aus drei Akteuren und drei energiepolitischen Maßnahmen (Stand 2025): neue Gaskraftwerke, Ausbau der Erneuerbaren, Technologieoffenheit. Sie zeigt, dass gesicherte Leistung, Erneuerbaren-Ausbau und Technologieoffenheit nebeneinander vertreten werden — mehrere Positionen können gleichzeitig zutreffen. Positionen sind paraphrasiert und bequellt (keine wörtlichen Zitate).',
    caption: 'Positionen ausgewählter Akteure zu drei parallelen Maßnahmen (Stand 2025; Quellen siehe Methodik).',
    positionen: [
      { akteur: 'BMWK (Reiche)', massnahme: 'Neue Gaskraftwerke', haltung: 'dafuer', zitat: 'Fordert gesicherte Leistung für Dunkelflauten: zunächst ≥20 GW, nach EU-Widerstand 12–12,5 GW.' },
      { akteur: 'BMWK (Reiche)', massnahme: 'Ausbau Erneuerbare', haltung: 'differenziert', zitat: 'Hält das geplante Ausbautempo für überzogen; fordert „Realitätscheck" und Synchronisierung mit dem Netzausbau.' },
      { akteur: 'BMWK (Reiche)', massnahme: 'Technologieoffenheit', haltung: 'dafuer', zitat: 'Ein Teil der Kapazität soll technologieoffen ausgeschrieben werden.' },
      { akteur: 'EU-Kommission', massnahme: 'Neue Gaskraftwerke', haltung: 'differenziert', zitat: 'Untersagte 20 GW beihilferechtlich; Verhandlung über rund 12–12,5 GW.' },
      { akteur: 'EU-Kommission', massnahme: 'Ausbau Erneuerbare', haltung: 'dafuer', zitat: 'Erneuerbare sind zentral für die EU-Klimaziele.' },
      { akteur: 'EU-Kommission', massnahme: 'Technologieoffenheit', haltung: 'unklar' },
      { akteur: 'Umweltverbände', massnahme: 'Neue Gaskraftwerke', haltung: 'dagegen', zitat: 'Fordern keine weiteren fossilen Kraftwerke.' },
      { akteur: 'Umweltverbände', massnahme: 'Ausbau Erneuerbare', haltung: 'dafuer' },
      { akteur: 'Umweltverbände', massnahme: 'Technologieoffenheit', haltung: 'differenziert' },
    ],
  },
};

const erzeugungBalken: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Stromerzeugung nach Energieträger 2024',
    typ: 'balken',
    beschreibung:
      'Balkendiagramm der öffentlichen Nettostromerzeugung Deutschlands 2024 nach Energieträger in Terawattstunden (Fraunhofer ISE / Energy-Charts). Windkraft führt mit 136,3 TWh vor Braunkohle (71,1) und Solar (59,7); Erdgas trägt 43,6 TWh bei. Erneuerbare stellen rund 62 % der öffentlichen Nettoerzeugung.',
    caption: 'Öffentliche Nettostromerzeugung 2024 in TWh. Quelle: Fraunhofer ISE / Energy-Charts.',
    encoding: { kategorieFeld: 'traeger', yFeld: 'twh' },
    datensatz: {
      titel: 'Stromerzeugung nach Energieträger 2024',
      quelle: {
        titel: 'Energy-Charts (Fraunhofer ISE)',
        url: 'https://www.energy-charts.info',
        herausgeber: 'Fraunhofer-Institut für Solare Energiesysteme ISE',
      },
      spalten: [
        { name: 'traeger', typ: 'string' },
        { name: 'twh', typ: 'number', einheit: 'TWh' },
      ],
      daten: [
        { traeger: 'Windkraft', twh: 136.3 },
        { traeger: 'Braunkohle', twh: 71.1 },
        { traeger: 'Solar', twh: 59.7 },
        { traeger: 'Erdgas', twh: 43.6 },
        { traeger: 'Biomasse', twh: 37 },
        { traeger: 'Steinkohle', twh: 23.8 },
        { traeger: 'Wasserkraft', twh: 22.3 },
        { traeger: 'Sonstige', twh: 18.5 },
      ],
    },
  },
};

const eeFossilLinie: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Erneuerbare überholen die Fossilen',
    typ: 'linie',
    beschreibung:
      'Liniendiagramm der öffentlichen Nettostromerzeugung 2015–2024 in Terawattstunden, getrennt nach erneuerbaren und fossilen Trägern (Fraunhofer ISE). Die Erneuerbaren steigen von 172,7 auf 255,3 TWh, die Fossilen fallen von 277,8 auf 146,3 TWh; der Wechsel der Führung liegt um 2019.',
    caption: 'Öffentliche Nettostromerzeugung 2015–2024 in TWh. Quelle: Fraunhofer ISE / Energy-Charts.',
    encoding: { xFeld: 'jahr', yFeld: 'twh', serieFeld: 'bereich' },
    datensatz: {
      titel: 'Erneuerbare vs. fossile Stromerzeugung 2015–2024',
      quelle: {
        titel: 'Energy-Charts (Fraunhofer ISE)',
        url: 'https://www.energy-charts.info',
        herausgeber: 'Fraunhofer ISE',
      },
      spalten: [
        { name: 'jahr', typ: 'string' },
        { name: 'bereich', typ: 'string' },
        { name: 'twh', typ: 'number', einheit: 'TWh' },
      ],
      daten: [
        { jahr: '2015', bereich: 'Erneuerbare', twh: 172.7 },
        { jahr: '2016', bereich: 'Erneuerbare', twh: 173.3 },
        { jahr: '2017', bereich: 'Erneuerbare', twh: 199.3 },
        { jahr: '2018', bereich: 'Erneuerbare', twh: 206.4 },
        { jahr: '2019', bereich: 'Erneuerbare', twh: 225.3 },
        { jahr: '2020', bereich: 'Erneuerbare', twh: 234.6 },
        { jahr: '2021', bereich: 'Erneuerbare', twh: 219.7 },
        { jahr: '2022', bereich: 'Erneuerbare', twh: 233.2 },
        { jahr: '2023', bereich: 'Erneuerbare', twh: 249.7 },
        { jahr: '2024', bereich: 'Erneuerbare', twh: 255.3 },
        { jahr: '2015', bereich: 'Fossile', twh: 277.8 },
        { jahr: '2016', bereich: 'Fossile', twh: 283.2 },
        { jahr: '2017', bereich: 'Fossile', twh: 266.6 },
        { jahr: '2018', bereich: 'Fossile', twh: 251.5 },
        { jahr: '2019', bereich: 'Fossile', twh: 208.4 },
        { jahr: '2020', bereich: 'Fossile', twh: 179.1 },
        { jahr: '2021', bereich: 'Fossile', twh: 201.6 },
        { jahr: '2022', bereich: 'Fossile', twh: 209.9 },
        { jahr: '2023', bereich: 'Fossile', twh: 158.9 },
        { jahr: '2024', bereich: 'Fossile', twh: 146.3 },
      ],
    },
  },
};

const energieArticle: Article = {
  _id: 'seed-energie',
  titel: 'Gaskraftwerke, Erneuerbare, Technologieoffenheit: Warum mehrere Wege gleichzeitig nötig sein können',
  slug: 'energie-mehrere-wege',
  standfirst:
    'Wirtschaftsministerin Reiche will neue Gaskraftwerke — während die Erneuerbaren Rekorde brechen. Ein Widerspruch? Die echten Erzeugungsdaten zeigen: Versorgungssicherheit, Klimaschutz und Wettbewerbsfähigkeit verlangen parallele Antworten. Mehrere Dinge können gleichzeitig richtig sein.',
  veroeffentlicht: '2026-06-01',
  themen: [{ name: 'Energiepolitik', slug: 'energiepolitik' }],
  autoren: [{ name: 'Gurt-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Stromdaten: Fraunhofer ISE / Energy-Charts, öffentliche Nettostromerzeugung, Jahreswerte 2015–2024 (abgerufen 06/2026), über den Gurt-Adapter aus der API aggregiert. Metrik-Hinweis: Die „öffentliche Nettostromerzeugung" unterscheidet sich von der „ins Netz eingespeisten" Menge (Destatis) und der Bruttostromerzeugung (AG Energiebilanzen) — der EE-Anteil liegt je nach Abgrenzung bei rund 59–63 %. Pumpspeicher sind als Speicher ausgenommen; „Erdgas" ohne Kuppelgas. Positionen (Stand 2025) sind paraphrasiert und bequellt (ZDFheute, taz, pv-magazine, Umweltinstitut/Campact) — keine wörtlichen Zitate. Reproduzierbar über den Energy-Charts-Adapter (packages/data).',
  body: [
    block('h2', 'Worum es geht'),
    block(
      'normal',
      'Wirtschaftsministerin Katharina Reiche (CDU) will neue Gaskraftwerke bauen lassen — zunächst war von mindestens 20 Gigawatt die Rede, nach Widerstand der EU-Kommission noch von rund 12 bis 12,5 GW. Sie sollen Versorgungssicherheit garantieren, wenn bei „Dunkelflaute" wenig Wind- und Solarstrom verfügbar ist. Zugleich nennt Reiche das geplante Tempo beim Ausbau der Erneuerbaren überzogen.',
    ),
    block(
      'normal',
      'Das klingt nach einem Widerspruch zu einer Energiewende, die messbar voranschreitet. Tatsächlich adressieren beide Wege unterschiedliche Probleme zur selben Zeit — gesicherte Leistung kurzfristig, Klima und Kosten langfristig. Die folgende Matrix macht sichtbar, wie verschiedene Akteure zu den drei Maßnahmen stehen.',
    ),
    positionsMatrix,
    block('h2', 'Der Strommix 2024'),
    block(
      'normal',
      'Die echten Erzeugungsdaten ordnen die Debatte ein: 2024 war Windkraft mit 136,3 TWh der mit Abstand wichtigste Stromlieferant, gefolgt von Braunkohle (71,1) und Solar (59,7). Erdgas trug 43,6 TWh bei — wichtig vor allem für die gesicherte Leistung, aber kein Schwergewicht im Mix.',
    ),
    erzeugungBalken,
    block('h2', 'Die Wende ist messbar'),
    block(
      'normal',
      'Im Zeitverlauf wird der Wandel deutlich: Die erneuerbare Erzeugung stieg von 172,7 TWh (2015) auf 255,3 TWh (2024), während die fossile von 277,8 auf 146,3 TWh fiel. Um 2019 zogen die Erneuerbaren erstmals an den Fossilen vorbei. Der Bedarf an gesicherter Leistung für Phasen ohne Wind und Sonne bleibt davon unberührt — genau hier setzen die Gaskraftwerks-Pläne an.',
    ),
    eeFossilLinie,
    {
      _type: 'zitatBlock',
      _key: key(),
      zitat:
        'Mehrere Dinge können gleichzeitig richtig sein: gesicherte Leistung für die Dunkelflaute, der weitere Ausbau der Erneuerbaren und das Offenhalten technologieoffener Optionen.',
      quelle: { titel: 'Gurt — redaktionelle Einordnung' },
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
      text: 'Erzeugungsdaten: Fraunhofer ISE / Energy-Charts (öffentliche Nettostromerzeugung, 2015–2024). Positionen (Stand 2025) paraphrasiert nach ZDFheute, taz, pv-magazine sowie Umweltinstitut/Campact. Metrik- und Auswahlhinweise siehe Methodik.',
      quelle: { titel: 'Energy-Charts (Fraunhofer ISE)', url: 'https://www.energy-charts.info' },
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
