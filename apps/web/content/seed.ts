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
      { akteur: 'BMWK (Reiche)', massnahme: 'Neue Gaskraftwerke', haltung: 'dafuer', zitat: 'Fordert gesicherte Leistung für Dunkelflauten: zunächst ≥20 GW, nach EU-Widerstand 12–12,5 GW.', quelle: { titel: 'ZDFheute', url: 'https://www.zdfheute.de/politik/reiche-eu-gaskraftwerke-plan-widerstand-100.html' } },
      { akteur: 'BMWK (Reiche)', massnahme: 'Ausbau Erneuerbare', haltung: 'differenziert', zitat: 'Hält das geplante Ausbautempo für überzogen; fordert „Realitätscheck“ und Synchronisierung mit dem Netzausbau.', quelle: { titel: 'pv-magazine', url: 'https://www.pv-magazine.de/2025/05/09/katherina-reiche-fordert-realitaetscheck-fuer-die-energiewende/' } },
      { akteur: 'BMWK (Reiche)', massnahme: 'Technologieoffenheit', haltung: 'dafuer', zitat: 'Ein Teil der Kapazität soll technologieoffen ausgeschrieben werden.', quelle: { titel: 'taz', url: 'https://taz.de/Umstrittener-Ausbau/!6122082/' } },
      { akteur: 'EU-Kommission', massnahme: 'Neue Gaskraftwerke', haltung: 'differenziert', zitat: 'Untersagte 20 GW beihilferechtlich; Verhandlung über rund 12–12,5 GW.', quelle: { titel: 'ZDFheute', url: 'https://www.zdfheute.de/politik/reiche-eu-gaskraftwerke-plan-widerstand-100.html' } },
      { akteur: 'EU-Kommission', massnahme: 'Ausbau Erneuerbare', haltung: 'dafuer', zitat: 'Verbindliches EU-Ziel: mindestens 42,5 % Erneuerbare bis 2030 (RED III).', quelle: { titel: 'Europäische Kommission', url: 'https://germany.representation.ec.europa.eu/news/energie-und-klima-kommission-begrusst-einigung-zu-erneuerbaren-energien-startet-aufruf-unter-dem-2023-03-30_de' } },
      { akteur: 'EU-Kommission', massnahme: 'Technologieoffenheit', haltung: 'unklar', zitat: 'Keine eindeutige öffentliche Festlegung zu diesem Begriff in dieser Debatte.' },
      { akteur: 'Umweltverbände', massnahme: 'Neue Gaskraftwerke', haltung: 'dagegen', zitat: 'Fordern keine weiteren fossilen Kraftwerke.', quelle: { titel: 'Umweltinstitut', url: 'https://umweltinstitut.org/energie-und-klima/mitmachaktionen/keine-weiteren-fossilen-kraftwerke-in-deutschland/' } },
      { akteur: 'Umweltverbände', massnahme: 'Ausbau Erneuerbare', haltung: 'dafuer', zitat: 'Setzen auf konsequenten Ausbau der Erneuerbaren statt neuer fossiler Kraftwerke.', quelle: { titel: 'Campact', url: 'https://www.campact.de/klima/energiewende-retten-lobby-ministerin-reiche-stoppen/' } },
      { akteur: 'Umweltverbände', massnahme: 'Technologieoffenheit', haltung: 'differenziert', zitat: 'Sehen „Technologieoffenheit“ skeptisch — als möglichen Vorwand für neue fossile Kapazitäten.', quelle: { titel: 'Umweltinstitut', url: 'https://umweltinstitut.org/energie-und-klima/mitmachaktionen/keine-weiteren-fossilen-kraftwerke-in-deutschland/' } },
    ],
  },
};

const erzeugungBalken: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Stromerzeugung nach Energieträger 2024',
    typ: 'waffle',
    beschreibung:
      'Waffle-Diagramm (Anteile am Ganzen) der öffentlichen Nettostromerzeugung Deutschlands 2024 nach Energieträger (Fraunhofer ISE / Energy-Charts). Jede der 100 Kacheln steht für rund 1 % der Erzeugung. Windkraft führt (136,3 TWh) vor Braunkohle (71,1) und Solar (59,7); Erdgas trägt 43,6 TWh bei. Erneuerbare stellen rund 62 %.',
    caption: 'Öffentliche Nettostromerzeugung 2024, Anteil je Energieträger. Quelle: Fraunhofer ISE / Energy-Charts.',
    encoding: { kategorieFeld: 'traeger', yFeld: 'twh' },
    datensatz: {
      titel: 'Stromerzeugung nach Energieträger 2024',
      quelle: {
        titel: 'Energy-Charts (Fraunhofer ISE)',
        url: 'https://www.energy-charts.info',
        herausgeber: 'Fraunhofer-Institut für Solare Energiesysteme ISE',
      },
      spalten: [
        { name: 'traeger', label: 'Träger', typ: 'string' },
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

const primaerenergieTreemap: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Primärenergieverbrauch 2023 nach Energieträgern',
    typ: 'treemap',
    beschreibung:
      'Treemap des Primärenergieverbrauchs Deutschlands 2023 (10.735 PJ) nach Energieträgern (AG Energiebilanzen). Die Fläche je Kachel entspricht dem Anteil: Mineralöl dominiert mit 3.822 PJ (35,6 %) vor Erdgas (2.655 PJ; 24,7 %) und erneuerbaren Energien (2.107 PJ; 19,6 %). Strom ist nur ein Ausschnitt dieses Gesamtsystems — Öl (vor allem im Verkehr) und Erdgas (vor allem für Wärme) prägen den Energieverbrauch weiterhin stark.',
    caption:
      'Primärenergieverbrauch Deutschland 2023 in Petajoule, Anteil je Energieträger. Quelle: AG Energiebilanzen (Jahresbericht 2023).',
    encoding: { kategorieFeld: 'traeger', yFeld: 'pj' },
    datensatz: {
      titel: 'Primärenergieverbrauch nach Energieträgern 2023',
      quelle: {
        titel: 'AG Energiebilanzen — Energieverbrauch in Deutschland 2023',
        url: 'https://ag-energiebilanzen.de/energieverbrauch-ist-2023-kraeftig-gesunken/',
        herausgeber: 'Arbeitsgemeinschaft Energiebilanzen e. V.',
      },
      spalten: [
        { name: 'traeger', label: 'Träger', typ: 'string' },
        { name: 'pj', typ: 'number', einheit: 'PJ' },
      ],
      daten: [
        { traeger: 'Mineralöl', pj: 3822, beschreibung: 'Vor allem Kraftstoffe (Benzin, Diesel, Kerosin) und Heizöl.' },
        { traeger: 'Erdgas', pj: 2655, beschreibung: 'Heizen, Industrieprozesse und Stromerzeugung.' },
        { traeger: 'Erneuerbare', pj: 2107, beschreibung: 'Windkraft, Solarenergie, Biomasse und Wasserkraft.' },
        { traeger: 'Steinkohle', pj: 931, beschreibung: 'Importierte Kohle für Kraftwerke und die Stahlindustrie.' },
        { traeger: 'Braunkohle', pj: 895, beschreibung: 'Heimische Kohle, überwiegend zur Stromerzeugung.' },
        { traeger: 'Sonstige', pj: 204, beschreibung: 'Abfälle und sonstige Energieträger.' },
        { traeger: 'Kernenergie', pj: 79, beschreibung: 'Reststrom aus Kernkraft; der Ausstieg erfolgte Mitte April 2023.' },
        { traeger: 'Stromaustauschsaldo', pj: 42, beschreibung: 'Saldo aus Strom-Importen und -Exporten.' },
      ],
    },
  },
};

const erdgasSankey: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Wohin fließt das Erdgas?',
    typ: 'sankey',
    beschreibung:
      'Sankey-Diagramm des inländischen Erdgasabsatzes Deutschlands 2023 (721,8 TWh, brennwertbezogen) nach Verbrauchsbereichen (AG Energiebilanzen). Der größte Teil geht in die Industrie (246,6 TWh) und in die Wärmeversorgung privater Haushalte (229,0 TWh); die Stromversorgung erhält mit 96,5 TWh nur rund 13 %. Die Debatte um neue Gaskraftwerke betrifft damit einen vergleichsweise kleinen — für gesicherte Leistung aber wichtigen — Teil des Gasverbrauchs.',
    caption:
      'Inländischer Erdgasabsatz Deutschland 2023 in TWh (Brennwert, Gas-Input) nach Verbrauchsbereichen. Quelle: AG Energiebilanzen (Jahresbericht 2023).',
    encoding: { kategorieFeld: 'von', serieFeld: 'nach', yFeld: 'twh' },
    datensatz: {
      titel: 'Erdgasverbrauch nach Verbrauchsbereichen 2023',
      quelle: {
        titel: 'AG Energiebilanzen — Energieverbrauch in Deutschland 2023',
        url: 'https://ag-energiebilanzen.de/energieverbrauch-ist-2023-kraeftig-gesunken/',
        herausgeber: 'Arbeitsgemeinschaft Energiebilanzen e. V.',
      },
      spalten: [
        { name: 'von', typ: 'string' },
        { name: 'nach', typ: 'string' },
        { name: 'twh', typ: 'number', einheit: 'TWh' },
      ],
      daten: [
        { von: 'Erdgas', nach: 'Industrie', twh: 246.6 },
        { von: 'Erdgas', nach: 'Private Haushalte', twh: 229.0 },
        { von: 'Erdgas', nach: 'Gewerbe/Handel/Dienstl.', twh: 99.4 },
        { von: 'Erdgas', nach: 'Stromversorgung', twh: 96.5 },
        { von: 'Erdgas', nach: 'Fernwärme/Kälte', twh: 48.1 },
        { von: 'Erdgas', nach: 'Verkehr', twh: 2.2 },
      ],
    },
  },
};

const energieArticle: Article = {
  _id: 'seed-energie',
  titel: 'Gaskraftwerke, Erneuerbare, Technologieoffenheit: Warum mehrere Wege gleichzeitig nötig sein können',
  slug: 'energie-mehrere-wege',
  ressort: 'wirtschaft',
  standfirst:
    'Wirtschaftsministerin Reiche will neue Gaskraftwerke — während die Erneuerbaren Rekorde brechen. Ein Widerspruch? Die echten Erzeugungsdaten zeigen: Versorgungssicherheit, Klimaschutz und Wettbewerbsfähigkeit verlangen parallele Antworten. Mehrere Dinge können gleichzeitig richtig sein.',
  veroeffentlicht: '2026-06-01',
  themen: [{ name: 'Energiepolitik', slug: 'energiepolitik' }],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Stromdaten: Fraunhofer ISE / Energy-Charts, öffentliche Nettostromerzeugung, Jahreswerte 2015–2024 (abgerufen 06/2026), über den GURT-Adapter aus der API aggregiert. Metrik-Hinweis: Die „öffentliche Nettostromerzeugung“ unterscheidet sich von der „ins Netz eingespeisten“ Menge (Destatis) und der Bruttostromerzeugung (AG Energiebilanzen) — der EE-Anteil liegt je nach Abgrenzung bei rund 59–63 %. Pumpspeicher sind als Speicher ausgenommen; „Erdgas“ ohne Kuppelgas. Positionen (Stand 2025) sind paraphrasiert und bequellt (ZDFheute, taz, pv-magazine, Umweltinstitut/Campact); die separat ausgewiesenen, wörtlichen Zitate (Reiche, Bandt) stammen aus den verlinkten Quellen (zfk bzw. DNR). Reproduzierbar über den Energy-Charts-Adapter (packages/data). Primärenergieverbrauch nach Energieträgern (Treemap, in PJ) und Erdgasverbrauch nach Verbrauchsbereichen (Sankey, in TWh = Mrd. kWh, brennwertbezogen) stammen aus der AG Energiebilanzen (Jahresbericht „Energieverbrauch in Deutschland 2023“, vorläufige Angaben). Wichtige Abgrenzung: Die 96,5 TWh „Stromversorgung“ im Sankey sind die Gas-Einsatzmenge (Input) für die Stromerzeugung, nicht die daraus erzeugte Strommenge — sie ist deshalb nicht mit den 43,6 TWh Gas-Stromerzeugung (Output) im Strommix vergleichbar. Der „Stromaustauschsaldo“ (+42 PJ, 0,4 %) ist ein Bilanzposten (Nettoimport) und 2023 positiv. Der Diskurs-Abschnitt bildet den Stand Mai 2026 ab (Kabinettsbeschluss zum StromVKG, EU-beihilferechtliche Genehmigung noch ausstehend); die Sichtweisen sind paraphrasiert und je mit Quelle ausgewiesen (pv magazine, taz; u. a. BMWE, EU-Kommission, BDEW, Deutsche Umwelthilfe, Bundesverband Neue Energiewirtschaft) — ausgewählt, um das Spektrum ausgewogen abzubilden.',
  body: [
    block('h2', 'Worum es geht'),
    block(
      'normal',
      'Wirtschaftsministerin Katharina Reiche (CDU) will neue Gaskraftwerke bauen lassen — zunächst war von mindestens 20 Gigawatt die Rede, nach Widerstand der EU-Kommission noch von rund 12 bis 12,5 GW. Sie sollen Versorgungssicherheit garantieren, wenn bei „Dunkelflaute“ wenig Wind- und Solarstrom verfügbar ist. Zugleich nennt Reiche das geplante Tempo beim Ausbau der Erneuerbaren überzogen.',
    ),
    block(
      'normal',
      'Das klingt nach einem Widerspruch zu einer Energiewende, die messbar voranschreitet. Tatsächlich adressieren beide Wege unterschiedliche Probleme zur selben Zeit — gesicherte Leistung kurzfristig, Klima und Kosten langfristig. Die folgende Matrix macht sichtbar, wie verschiedene Akteure zu den drei Maßnahmen stehen.',
    ),
    positionsMatrix,
    block(
      'normal',
      'In ihren eigenen Worten: Wirtschaftsministerin Reiche begründet die neuen Gaskraftwerke mit der Versorgungssicherheit —',
    ),
    {
      _type: 'zitatBlock',
      _key: key(),
      zitat:
        'Wir setzen deshalb für unsere Versorgungssicherheit auf Gaskraftwerke – sonst müssten die Kohlekraftwerke länger laufen.',
      quelle: {
        titel: 'Katherina Reiche (Bundeswirtschaftsministerin, CDU), dpa-Interview, Juli 2025',
        url: 'https://www.zfk.de/politik/deutschland/reiche-gaskraftwerke-zeitplan-unrealistisch',
        herausgeber: 'Zeitung für kommunale Wirtschaft (zfk)',
      },
      imHero: true,
      heroEyebrow: 'Aus der Energiedebatte',
    },
    block(
      'normal',
      '— während die Umweltverbände den konsequenten Ausbau der Erneuerbaren als die bessere Absicherung dagegensetzen. BUND-Vorsitzender Olaf Bandt:',
    ),
    {
      _type: 'zitatBlock',
      _key: key(),
      zitat:
        'Den weiteren Ausbau der Erneuerbaren konsequent und naturverträglich voranzutreiben, ist die beste Versicherung gegen globale Krisen und für bezahlbare Strompreise.',
      quelle: {
        titel: 'Olaf Bandt (BUND-Vorsitzender), gemeinsame Stellungnahme der Umweltverbände, April 2026',
        url: 'https://www.dnr.de/presse/pressemitteilungen/umweltorganisationen-kritisieren-entwuerfe-fuer-energiegesetze-scharf',
        herausgeber: 'Deutscher Naturschutzring (DNR)',
      },
      imHero: true,
      heroEyebrow: 'Aus der Energiedebatte',
    },
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
    block('h2', 'Strom ist nur ein Teil des Energiesystems'),
    block(
      'normal',
      'Die Strommix-Debatte verdeckt leicht, dass Strom nur einen Ausschnitt des Energieverbrauchs ausmacht. Über das gesamte Energiesystem betrachtet dominierten 2023 weiterhin fossile Energieträger: Mineralöl — vor allem im Verkehr — und Erdgas — vor allem für Wärme — stellten zusammen mehr als 60 Prozent des Primärenergieverbrauchs. Der Umbau der Stromerzeugung ist also weit fortgeschritten, der von Wärme und Verkehr steht größtenteils noch bevor.',
    ),
    primaerenergieTreemap,
    block('h2', 'Wohin das Erdgas wirklich fließt'),
    block(
      'normal',
      'Beim Erdgas zeigt der Verbrauch nach Bereichen, worum es bei den Gaskraftwerken geht — und worum nicht. 2023 floss der weitaus größte Teil des inländischen Erdgasabsatzes in die Industrie und in die Wärmeversorgung der Haushalte. Die Stromversorgung erhielt nur rund 13 Prozent. Neue Gaskraftwerke betreffen damit einen kleinen, aber für die gesicherte Leistung in Dunkelflauten wichtigen Teil des Gassystems.',
    ),
    erdgasSankey,
    {
      _type: 'zitatBlock',
      _key: key(),
      zitat:
        'Mehrere Dinge können gleichzeitig richtig sein: gesicherte Leistung für die Dunkelflaute, der weitere Ausbau der Erneuerbaren und das Offenhalten technologieoffener Optionen.',
      quelle: { titel: 'GURT — redaktionelle Einordnung' },
    },
    {
      _type: 'diskursBlock',
      _key: key(),
      titel: 'Wie über die neuen Gaskraftwerke gestritten wird',
      frage: 'Braucht Deutschland neue Gaskraftwerke — und in welcher Form?',
      einleitung:
        'Im Mai 2026 beschloss das Bundeskabinett das Strom-Versorgungssicherheits- und Kapazitätsgesetz (StromVKG); erste Ausschreibungen sind ab September 2026 geplant, die endgültige EU-beihilferechtliche Genehmigung steht noch aus. Der Streit verläuft entlang mehrerer Achsen — Versorgungssicherheit, Kosten, Klima und Marktdesign. Ausgewählte Stimmen aus Politik, Wirtschaft und Verbänden (paraphrasiert, mit Quelle):',
      perspektiven: [
        {
          label: 'Bundesregierung (BMWE, Reiche)',
          aussage:
            'Die Ausschreibung von zwölf Gigawatt steuerbarer Leistung schaffe die Grundlage für eine gesicherte Stromversorgung und für die Wettbewerbsfähigkeit der Industrie — gerade in Dunkelflauten und nach dem Kohleausstieg.',
          quelle: {
            titel: 'Bundesregierung einigt sich mit EU-Kommission auf Eckpunkte der Kraftwerksstrategie',
            url: 'https://www.pv-magazine.de/2026/01/16/bundesregierung-einigt-sich-mit-eu-kommission-auf-eckpunkte-der-kraftwerksstrategie/',
            herausgeber: 'pv magazine',
          },
        },
        {
          label: 'EU-Kommission (Beihilferecht)',
          aussage:
            'Aus ursprünglich rund 20 Gigawatt wurden im Abgleich mit dem EU-Beihilferecht zwölf Gigawatt; die endgültige beihilferechtliche Genehmigung der Kommission steht noch aus.',
          quelle: {
            titel: 'Neue Gaskraftwerke: Bundesregierung einigt sich mit EU',
            url: 'https://taz.de/Neue-Gaskraftwerke/!6146169/',
            herausgeber: 'taz',
          },
        },
        {
          label: 'BDEW (Energiebranche, Kerstin Andreae)',
          aussage:
            'Der Branchenverband unterstützt den Aufbau gesicherter Leistung, mahnt aber Investitionssicherheit an: Die endgültige EU-Genehmigung solle vor dem Beginn der Ausschreibungen vorliegen.',
          quelle: {
            titel: 'Kraftwerksstrategie passiert Bundeskabinett',
            url: 'https://www.pv-magazine.de/2026/05/13/kraftwerksstrategie-passiert-bundeskabinett/',
            herausgeber: 'pv magazine',
          },
        },
        {
          label: 'Deutsche Umwelthilfe (Sascha Müller-Kraenner)',
          aussage:
            'Der Fokus auf fossile Stromerzeugung sei eine schlechte Nachricht für Stromkunden und Klimaziele; es fehle Technologieoffenheit und eine verbindliche Vorgabe für Wasserstoff aus erneuerbaren Quellen.',
          quelle: {
            titel: 'Neue Gaskraftwerke: Bundesregierung einigt sich mit EU',
            url: 'https://taz.de/Neue-Gaskraftwerke/!6146169/',
            herausgeber: 'taz',
          },
        },
        {
          label: 'Bundesverband Neue Energiewirtschaft (Robert Busch)',
          aussage:
            'Das Gesetz zementiere den Bau neuer Gaskraftwerke, statt einen Wettbewerb um die besten Lösungen — etwa Speicher und dezentrale Flexibilität — zu ermöglichen.',
          quelle: {
            titel: 'Kraftwerksstrategie passiert Bundeskabinett',
            url: 'https://www.pv-magazine.de/2026/05/13/kraftwerksstrategie-passiert-bundeskabinett/',
            herausgeber: 'pv magazine',
          },
        },
      ],
      einordnung:
        'Die Sichtweisen widersprechen sich weniger, als es scheint: gesicherte Leistung für Dunkelflauten, niedrige Kosten, Klimaschutz und ein technologieoffener Wettbewerb sind je für sich legitime Ziele. Strittig ist vor allem, wie viel fossile Kapazität nötig ist — und wie schnell sie auf Wasserstoff oder Alternativen umgestellt wird.',
    },
    {
      _type: 'quellenNote',
      _key: key(),
      text: 'Erzeugungsdaten: Fraunhofer ISE / Energy-Charts (öffentliche Nettostromerzeugung, 2015–2024). Primärenergieverbrauch und Erdgasverbrauch nach Bereichen: AG Energiebilanzen (Jahresbericht 2023). Positionen (Stand 2025) paraphrasiert nach ZDFheute, taz, pv-magazine sowie Umweltinstitut/Campact. Metrik- und Auswahlhinweise siehe Methodik.',
      quelle: { titel: 'Energy-Charts (Fraunhofer ISE)', url: 'https://www.energy-charts.info' },
    },
  ],
};

// Erster ECHTER Beitrag (nicht illustrativ): live erfasste Daten von data.europa.eu.
const euDatenArticle: Article = {
  _id: 'eu-energie-daten',
  titel: 'Wie viele offene Energie-Daten verzeichnet die EU?',
  slug: 'eu-energie-datensaetze',
  ressort: 'wirtschaft',
  standfirst:
    'Ein erster Beitrag mit echten Zahlen statt Beispielwerten: Das EU-Open-Data-Portal listet zehntausende energiebezogene Datensätze — aber sehr ungleich über die Themen verteilt.',
  veroeffentlicht: '2026-05-31',
  themen: [
    { name: 'Energiepolitik', slug: 'energiepolitik' },
    { name: 'Offene Daten', slug: 'offene-daten' },
  ],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Datenquelle: data.europa.eu (EU Open Data Portal), Such-API, abgerufen am 31. Mai 2026. (1) Treffer je Stichwort: Gesamttreffermenge je deutschsprachigem Begriff (Volltextsuche, limit=0). (2) Herkunftsländer: relevanz-sortierte Stichprobe der 300 wichtigsten „Energie“-Treffer, aggregiert nach Land — keine Vollerhebung, daher als Stichprobe ausgewiesen. Die Zahlen spiegeln Datenverfügbarkeit und Verschlagwortung im Portal wider, nicht die reale energiewirtschaftliche Bedeutung. Reproduzierbar via „pnpm --filter @gurt/data ingest -- --source=data-europa-counts“ bzw. „--source=data-europa-countries“.',
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
      'Die Verteilung ist stark ungleich: Übergreifende Begriffe wie „Energie“ und „Erneuerbare Energien“ führen mit Abstand, während spezifische Felder wie Solarenergie oder Energieeffizienz nur wenige Hundert Treffer haben. Das sagt zunächst etwas über Verschlagwortung und Datenpraxis aus — nicht über die politische oder wirtschaftliche Bedeutung eines Themas.',
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
  ressort: 'parlament',
  standfirst:
    'Auf Basis des amtlichen Dokumentations- und Informationssystems (DIP) des Deutschen Bundestags: die parlamentarische Befassung mit dem Thema Energie im Zeitverlauf.',
  veroeffentlicht: '2026-05-31',
  themen: [
    { name: 'Energiepolitik', slug: 'energiepolitik' },
    { name: 'Parlament', slug: 'parlament' },
  ],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Datenquelle: Deutscher Bundestag, Dokumentations- und Informationssystem (DIP), API v1. Vollständige Auszählung aller im DIP erfassten Vorgänge mit dem Titelstichwort „Energie“ (1976–2026, 1416 Vorgänge), aggregiert nach Vorgangsdatum — keine Stichprobe. Das laufende Jahr 2026 ist naturgemäß unvollständig. „Energie“ im Titel ist ein grober Näherungswert für das Thema; verwandte Vorgänge ohne dieses Stichwort fehlen. Reproduzierbar via „pnpm --filter @gurt/data ingest -- --source=bundestag-dip --titel=Energie --pages=20“. Ein DIP-API-Key ist erforderlich.',
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
      'Das Bild ist eindeutig: In den 1970er- und 1980er-Jahren befasste sich der Bundestag nur vereinzelt mit „Energie“, seit den 2000er-Jahren dauerhaft intensiv — mit einem Höchststand 2012. Die Auswertung zählt allein das Titelstichwort und ist damit ein grober, aber konsistenter Indikator für die parlamentarische Aufmerksamkeit über fünf Jahrzehnte.',
    ),
    {
      _type: 'quellenNote',
      _key: key(),
      text: 'Quelle: Deutscher Bundestag, DIP-API (v1), Vorgänge mit Titel-Filter „Energie“.',
      quelle: {
        titel: 'Deutscher Bundestag — DIP',
        url: 'https://dip.bundestag.de',
      },
    },
  ],
};

// Benchmark-Beitrag #2: Verteidigung / Zeitenwende — echte, bequellte Daten.
const verteidigungAusgabenLinie: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Erst 2024 an der NATO-Marke von zwei Prozent',
    typ: 'linie',
    beschreibung:
      'Liniendiagramm der deutschen Verteidigungsausgaben als Anteil am realen Bruttoinlandsprodukt (NATO-Definition, Preisbasis 2021), 2014–2024, mit dem NATO-Richtwert von zwei Prozent als gestrichelter Bezugslinie. Der Wert steigt von 1,16 % (2014) auf 2,00 % (2024) — Deutschland lag das ganze Jahrzehnt unter der Marke und erreichte sie 2024 erstmals seit Anfang der 1990er-Jahre. Der stärkste Sprung fällt mit dem Sondervermögen und der Zeitenwende ab 2022 zusammen.',
    caption:
      'Deutsche Verteidigungsausgaben als Anteil am realen BIP (NATO-Definition, Preisbasis 2021), mit NATO-Richtwert 2 % (gestrichelt). 2024 erstmals erreicht. Quelle: NATO, Defence Expenditure of NATO Countries (2014–2025).',
    encoding: { xFeld: 'jahr', yFeld: 'anteil', serieFeld: 'reihe', gestrichelteReihen: ['NATO-Ziel (2 %)'] },
    datensatz: {
      titel: 'Verteidigungsausgaben Deutschlands in % des BIP (NATO) mit 2-%-Richtwert, 2014–2024',
      quelle: {
        titel: 'NATO — Defence Expenditure of NATO Countries (2014–2025)',
        url: 'https://www.nato.int/en/news-and-events/articles/news/2025/08/28/defence-expenditure-of-nato-countries-2014-2025',
        herausgeber: 'NATO',
      },
      spalten: [
        { name: 'jahr', typ: 'string' },
        { name: 'reihe', typ: 'string' },
        { name: 'anteil', typ: 'number', einheit: '% BIP' },
      ],
      daten: [
        { jahr: '2014', reihe: 'Verteidigungsausgaben', anteil: 1.16 },
        { jahr: '2015', reihe: 'Verteidigungsausgaben', anteil: 1.16 },
        { jahr: '2016', reihe: 'Verteidigungsausgaben', anteil: 1.18 },
        { jahr: '2017', reihe: 'Verteidigungsausgaben', anteil: 1.21 },
        { jahr: '2018', reihe: 'Verteidigungsausgaben', anteil: 1.23 },
        { jahr: '2019', reihe: 'Verteidigungsausgaben', anteil: 1.33 },
        { jahr: '2020', reihe: 'Verteidigungsausgaben', anteil: 1.49 },
        { jahr: '2021', reihe: 'Verteidigungsausgaben', anteil: 1.43 },
        { jahr: '2022', reihe: 'Verteidigungsausgaben', anteil: 1.48 },
        { jahr: '2023', reihe: 'Verteidigungsausgaben', anteil: 1.61 },
        { jahr: '2024', reihe: 'Verteidigungsausgaben', anteil: 2.0 },
        { jahr: '2014', reihe: 'NATO-Ziel (2 %)', anteil: 2.0 },
        { jahr: '2015', reihe: 'NATO-Ziel (2 %)', anteil: 2.0 },
        { jahr: '2016', reihe: 'NATO-Ziel (2 %)', anteil: 2.0 },
        { jahr: '2017', reihe: 'NATO-Ziel (2 %)', anteil: 2.0 },
        { jahr: '2018', reihe: 'NATO-Ziel (2 %)', anteil: 2.0 },
        { jahr: '2019', reihe: 'NATO-Ziel (2 %)', anteil: 2.0 },
        { jahr: '2020', reihe: 'NATO-Ziel (2 %)', anteil: 2.0 },
        { jahr: '2021', reihe: 'NATO-Ziel (2 %)', anteil: 2.0 },
        { jahr: '2022', reihe: 'NATO-Ziel (2 %)', anteil: 2.0 },
        { jahr: '2023', reihe: 'NATO-Ziel (2 %)', anteil: 2.0 },
        { jahr: '2024', reihe: 'NATO-Ziel (2 %)', anteil: 2.0 },
      ],
    },
  },
};

const natoBeeswarm: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Im Bündnis ist 2 % die Schwelle, nicht die Spitze',
    typ: 'beeswarm',
    beschreibung:
      'Beeswarm-Diagramm: Verteidigungsausgaben als Anteil am realen BIP 2024 (NATO-Schätzung, Preisbasis 2021) für 31 NATO-Mitglieder, je ein Punkt pro Land. Die Werte reichen von 1,19 % (Luxemburg) bis 3,79 % (Polen). Deutschland liegt mit genau 2,00 % auf dem NATO-Richtwert — und damit im Mittelfeld: Staaten an der Ostflanke wie Polen (3,79), Estland (3,37), Lettland (3,36) und Litauen (3,09) sowie die USA (3,21) und Griechenland (2,74) geben anteilig deutlich mehr aus; mehrere west- und südeuropäische Partner wie Spanien (1,43), Italien (1,50) und Belgien (1,29) liegen darunter. Eine gestrichelte Linie markiert den 2-%-Richtwert.',
    caption:
      'Verteidigungsausgaben als Anteil am realen BIP 2024, je ein Punkt pro NATO-Mitglied (Island ohne eigene Streitkräfte ausgenommen). Deutschland (hervorgehoben) liegt bei 2,0 %. Quelle: NATO, Defence Expenditure of NATO Countries (2014–2025).',
    encoding: {
      xFeld: '% des BIP (2024)',
      yFeld: 'prozent',
      kategorieFeld: 'land',
      highlight: 'Deutschland',
      refWert: 2.0,
      refLabel: 'NATO-Richtwert 2 %',
    },
    datensatz: {
      titel: 'Verteidigungsausgaben der NATO-Mitglieder in % des realen BIP, 2024 (Schätzung)',
      quelle: {
        titel: 'NATO — Defence Expenditure of NATO Countries (2014–2025), Tabelle 3',
        url: 'https://www.nato.int/en/news-and-events/articles/news/2025/08/28/defence-expenditure-of-nato-countries-2014-2025',
        herausgeber: 'NATO',
      },
      spalten: [
        { name: 'land', typ: 'string' },
        { name: 'prozent', typ: 'number', einheit: '% BIP' },
      ],
      daten: [
        { land: 'Polen', prozent: 3.79 },
        { land: 'Estland', prozent: 3.37 },
        { land: 'Lettland', prozent: 3.36 },
        { land: 'USA', prozent: 3.21 },
        { land: 'Litauen', prozent: 3.09 },
        { land: 'Griechenland', prozent: 2.74 },
        { land: 'Finnland', prozent: 2.4 },
        { land: 'Vereinigtes Königreich', prozent: 2.33 },
        { land: 'Schweden', prozent: 2.31 },
        { land: 'Dänemark', prozent: 2.27 },
        { land: 'Norwegen', prozent: 2.27 },
        { land: 'Rumänien', prozent: 2.17 },
        { land: 'Ungarn', prozent: 2.13 },
        { land: 'Türkei', prozent: 2.13 },
        { land: 'Tschechien', prozent: 2.08 },
        { land: 'Frankreich', prozent: 2.03 },
        { land: 'Deutschland', prozent: 2.0 },
        { land: 'Niederlande', prozent: 2.0 },
        { land: 'Slowakei', prozent: 1.96 },
        { land: 'Bulgarien', prozent: 1.95 },
        { land: 'Nordmazedonien', prozent: 1.89 },
        { land: 'Kroatien', prozent: 1.87 },
        { land: 'Montenegro', prozent: 1.72 },
        { land: 'Albanien', prozent: 1.7 },
        { land: 'Portugal', prozent: 1.58 },
        { land: 'Italien', prozent: 1.5 },
        { land: 'Kanada', prozent: 1.47 },
        { land: 'Spanien', prozent: 1.43 },
        { land: 'Slowenien', prozent: 1.37 },
        { land: 'Belgien', prozent: 1.29 },
        { land: 'Luxemburg', prozent: 1.19 },
      ],
    },
  },
};

const sondervermoegenTreemap: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Wohin das Sondervermögen fließt (Wirtschaftsplan 2022)',
    typ: 'treemap',
    beschreibung:
      'Treemap des Wirtschaftsplans 2022 für das 100-Milliarden-Sondervermögen der Bundeswehr (81,9 Mrd € Verpflichtungsermächtigungen) nach Dimensionen. Die Luftstreitkräfte dominieren mit 33,4 Mrd € (u. a. F-35, schwere Transporthubschrauber), gefolgt von Führung & Digitalisierung (20,7) und dem Heer (16,6). Die Marine erhält 8,8 Mrd €. Der Rest verteilt sich auf Ausrüstung und Forschung.',
    caption:
      'Wirtschaftsplan 2022 des Sondervermögens Bundeswehr (81,9 Mrd € Verpflichtungsermächtigungen) nach Dimensionen. Quelle: Bundesregierung/BMVg, Wirtschaftsplan 2022.',
    encoding: { kategorieFeld: 'dimension', yFeld: 'mrd' },
    datensatz: {
      titel: 'Sondervermögen Bundeswehr — Wirtschaftsplan 2022 nach Dimensionen',
      quelle: {
        titel: 'Sondervermögen Bundeswehr — Wirtschaftsplan 2022',
        url: 'https://de.wikipedia.org/wiki/Sonderverm%C3%B6gen_Bundeswehr',
        herausgeber: 'Bundesregierung / BMVg (zusammengefasst)',
      },
      spalten: [
        { name: 'dimension', typ: 'string' },
        { name: 'mrd', typ: 'number', einheit: 'Mrd €' },
      ],
      daten: [
        { dimension: 'Luftstreitkräfte', mrd: 33.4, beschreibung: 'Kampfflugzeuge (u. a. F-35, Eurofighter), Hubschrauber, Luftverteidigung und Drohnen.' },
        { dimension: 'Führung & Digitalisierung', mrd: 20.7, beschreibung: 'Funk- und Führungssysteme, IT-Netze und Satellitenkommunikation.' },
        { dimension: 'Heer (Land)', mrd: 16.6, beschreibung: 'Gepanzerte Fahrzeuge, Schützenpanzer und Ausrüstung der Landstreitkräfte.' },
        { dimension: 'Marine (See)', mrd: 8.8, beschreibung: 'Fregatten, Korvetten, U-Boote und maritime Ausrüstung.' },
        { dimension: 'Bekleidung & Ausrüstung', mrd: 1.9, beschreibung: 'Persönliche Ausrüstung und Bekleidung der Soldatinnen und Soldaten.' },
        { dimension: 'Forschung & Technologie', mrd: 0.4, beschreibung: 'Wehrtechnische Forschung und Entwicklung.' },
      ],
    },
  },
};

const verteidigungDiskurs: BodyBlock = {
  _type: 'diskursBlock',
  _key: key(),
  titel: 'Wie über die Aufrüstung gestritten wird',
  frage: 'Wie viel Verteidigung braucht Deutschland — und wie soll sie finanziert werden?',
  einleitung:
    'Die Richtung ist weithin Konsens, das Tempo und die Finanzierung sind umstritten. 2025 lockerte der Bundestag die Schuldenbremse für Verteidigungsausgaben oberhalb von 1 % des BIP; für 2026 sind rund 108 Mrd € vorgesehen, bis 2029 ein Anteil von 3,5 % des BIP, beim NATO-Gipfel in Den Haag wurde 2025 ein Ziel von 5 % (3,5 % Kern + 1,5 % verwandt) bis 2035 beschlossen. Ausgewählte Stimmen (paraphrasiert, mit Quelle):',
  perspektiven: [
    {
      label: 'Bundesregierung (Verteidigungsminister Pistorius, SPD)',
      aussage:
        'Angesichts der Bedrohung durch Russland seien deutlich steigende Verteidigungsausgaben „zwingend notwendig“; Deutschland müsse abschreckungs- und bündnisfähig werden.',
      quelle: {
        titel: 'Pistorius: Verteidigungsausgaben müssen deutlich steigen',
        url: 'https://www.bundestag.de/dokumente/textarchiv/2025/kw20-de-verteidigung-1064970',
        herausgeber: 'Deutscher Bundestag',
      },
    },
    {
      label: 'NATO (Gipfel Den Haag 2025)',
      aussage:
        'Die Allianz beschloss ein neues Ziel: 3,5 % des BIP für Kernverteidigung plus 1,5 % für verteidigungsbezogene Ausgaben — zusammen 5 % bis 2035.',
      quelle: {
        titel: 'NATO-Gipfel 2025: Historischer Beschluss zu Verteidigungsausgaben',
        url: 'https://www.bmvg.de/de/aktuelles/nato-gipfel-2025-historischer-beschluss-verteidigungsausgaben-5952094',
        herausgeber: 'BMVg',
      },
    },
    {
      label: 'Bundesrechnungshof',
      aussage:
        'Kernaufgaben wie die Verteidigung sollten grundsätzlich aus laufenden Einnahmen finanziert werden, nicht über Schulden; eine Ausnahme von der Schuldenbremse solle allenfalls oberhalb von 2 % des BIP greifen. Die Verschuldungsdynamik berge langfristige Risiken.',
      quelle: {
        titel: 'Schuldenbremse: Umgehung gefährdet solide Staatsfinanzen',
        url: 'https://www.bundesrechnungshof.de/SharedDocs/Kurzmeldungen/DE/2025/aenderung-grundgesetz/kurzmeldung-1.html',
        herausgeber: 'Bundesrechnungshof',
      },
    },
    {
      label: 'Sachverständigenrat (Wirtschaftsweise)',
      aussage:
        'Das Sondervermögen solle „zusätzlich“ wirken und stärker investitionsorientiert eingesetzt werden, damit es die Verteidigungsfähigkeit tatsächlich erhöht und nicht reguläre Ausgaben ersetzt.',
      quelle: {
        titel: 'Zusätzlichkeit und Investitionsorientierung des Sondervermögens verbessern (Jahresgutachten 2025/26)',
        url: 'https://www.sachverstaendigenrat-wirtschaft.de/fileadmin/dateiablage/gutachten/jg202526/JG202526_Kapitel_2.pdf',
        herausgeber: 'Sachverständigenrat',
      },
    },
    {
      label: 'Die Linke (Ulrich Thoden, MdB)',
      aussage:
        'Die Devise „Whatever it takes“ sei ein „Blankoscheck“ für die Rüstungsindustrie; Verteidigung müsse aus dem Kernhaushalt finanziert werden, und Diplomatie dürfe nicht in den Hintergrund treten.',
      quelle: {
        titel: 'Deutlicher Anstieg bei den Verteidigungsausgaben (Debatte)',
        url: 'https://www.bundestag.de/dokumente/textarchiv/2025/kw38-de-verteidigung-1103990',
        herausgeber: 'Deutscher Bundestag',
      },
    },
  ],
  einordnung:
    'Dass Deutschland nach Jahren der Unterfinanzierung wieder mehr in Verteidigung investiert, ist breiter Konsens. Strittig ist dreierlei: das Tempo (3,5 % bzw. 5 %), die Finanzierung (Schulden vs. Kernhaushalt) und die Wirksamkeit (ob das Geld die Truppe tatsächlich einsatzfähiger macht). Mehrere dieser Anliegen können gleichzeitig berechtigt sein.',
};

const verteidigungArticle: Article = {
  _id: 'seed-verteidigung',
  titel: 'Die Zeitenwende in Zahlen: Wie Deutschland seine Verteidigung umbaut',
  slug: 'zeitenwende-in-zahlen',
  ressort: 'verteidigung',
  standfirst:
    'Innerhalb eines Jahrzehnts ist Deutschland vom Zwei-Prozent-Nachzügler zum Land geworden, das die NATO-Marke erreicht — finanziert über ein 100-Milliarden-Sondervermögen und eine gelockerte Schuldenbremse. Die echten Zahlen zeigen, wie groß der Sprung ist, wohin das Geld fließt und worüber gestritten wird.',
  veroeffentlicht: '2026-06-01',
  themen: [{ name: 'Verteidigung', slug: 'verteidigung' }],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Ausgaben-Zeitreihe: NATO, „Defence Expenditure of NATO Countries (2014–2025)“, Tabelle 3 (Anteil am realen BIP, Preisbasis 2021); 2024 ist eine NATO-Schätzung. Hinweis zur Abgrenzung: Auf Basis laufender Preise weist die NATO für 2024 rund 2,12 % aus — wir nutzen durchgängig die inflationsbereinigte Reihe (real, 2021er Preise: 2,00 % für 2024), damit die Jahre vergleichbar sind. Die NATO-Definition ist weiter gefasst als der Verteidigungshaushalt (Einzelplan 14) und enthält u. a. Pensionen und Teile anderer Ressorts. Der Bündnisvergleich (Beeswarm) nutzt dieselbe Tabelle 3 (realer BIP-Anteil 2024, je Mitglied; Deutschland 2,00 %); Island ist ohne eigene Streitkräfte und meldet keinen %BIP-Wert, daher 31 statt 32 Punkte. Struktur des Sondervermögens: Wirtschaftsplan 2022 (81,9 Mrd € Verpflichtungsermächtigungen nach Dimensionen); die vollen 100 Mrd € umfassen zusätzlich später verplante Mittel und Finanzierungskosten/Zinsen, das Sondervermögen war Ende 2024 vollständig vertraglich gebunden. Ziel- und Planwerte (2026: rund 108 Mrd €; 2029: rund 152 Mrd € bzw. 3,5 % BIP; 5 % bis 2035) nach BMVg und Bundestag. Positionen (Stand 2025/2026) sind paraphrasiert und bequellt (Bundestag, Bundesrechnungshof, Sachverständigenrat, BMVg); die zwei separat ausgewiesenen, wörtlichen Zitate (Pistorius, Reichinnek) stammen aus den verlinkten Primärquellen (Bulletin der Bundesregierung bzw. Fraktion Die Linke).',
  body: [
    block('h2', 'Worum es geht'),
    block(
      'normal',
      'Nach dem russischen Überfall auf die Ukraine rief Bundeskanzler Olaf Scholz 2022 die „Zeitenwende“ aus und kündigte ein Sondervermögen von 100 Milliarden Euro für die Bundeswehr an. 2025 lockerte der Bundestag zudem die Schuldenbremse: Verteidigungsausgaben oberhalb von einem Prozent des BIP sind seither von ihr ausgenommen. Damit ist nicht nur ein einmaliger Schub finanziert, sondern ein dauerhaft höheres Ausgabenniveau angelegt.',
    ),
    block(
      'normal',
      'Was bedeutet das in Zahlen? Drei Fragen führen durch diesen Beitrag: Wie groß ist der Sprung bei den Ausgaben? Wohin fließt das Geld? Und worüber wird gestritten?',
    ),
    block('h2', 'Vom Schlusslicht zur Zwei-Prozent-Marke'),
    block(
      'normal',
      'Über Jahre lag Deutschland deutlich unter der 2014 vereinbarten NATO-Marke von zwei Prozent des BIP. Erst 2024 wurde sie erreicht: Der Anteil stieg von 1,16 Prozent (2014) auf 2,00 Prozent — der stärkste Anstieg fällt mit Sondervermögen und Zeitenwende ab 2022 zusammen.',
    ),
    verteidigungAusgabenLinie,
    block(
      'normal',
      'Zwei Prozent sind im Bündnis allerdings die Eintrittsschwelle, nicht die Spitze. Im Vergleich aller NATO-Mitglieder liegt Deutschland 2024 genau auf der Marke — und damit im Mittelfeld: Die Staaten an der Ostflanke geben, gemessen an ihrer Wirtschaftskraft, mit Abstand am meisten aus.',
    ),
    natoBeeswarm,
    block('h2', 'Wohin die 100 Milliarden fließen'),
    block(
      'normal',
      'Das Sondervermögen ist kein laufendes Budget, sondern ein Investitionsprogramm. Der Wirtschaftsplan 2022 verteilte den größten Teil auf die Luftstreitkräfte — darunter die Beschaffung des US-Kampfjets F-35 und schwerer Transporthubschrauber — gefolgt von Führung und Digitalisierung sowie dem Heer. Bis Ende 2024 waren alle Mittel vertraglich gebunden.',
    ),
    sondervermoegenTreemap,
    block('h2', 'Der Streit über Tempo, Schulden und Wirkung'),
    block(
      'normal',
      'Dass Deutschland wieder mehr in Verteidigung investiert, ist breiter Konsens. Umstritten sind das Tempo des weiteren Anstiegs, die Finanzierung über Schulden statt aus dem Kernhaushalt und die Frage, ob das Geld die Truppe tatsächlich einsatzfähiger macht.',
    ),
    verteidigungDiskurs,
    block(
      'normal',
      'Zwei Stimmen bündeln den Streit ums Geld. Verteidigungsminister Boris Pistorius begründet das höhere Niveau:',
    ),
    {
      _type: 'zitatBlock',
      _key: key(),
      zitat:
        'Die Nato muss europäischer werden, damit sie transatlantisch bleiben kann. Das heißt: mehr eigene Verantwortung für die eigene konventionelle Verteidigung, und das schnell.',
      quelle: {
        titel: 'Boris Pistorius (Bundesverteidigungsminister, SPD), Rede zum Verteidigungshaushalt 2026 im Deutschen Bundestag, September 2025',
        url: 'https://www.bundesregierung.de/breg-de/service/newsletter-und-abos/bulletin/bmvg-pistorius-haushalt-2026-2385822',
        herausgeber: 'Bulletin der Bundesregierung',
      },
      imHero: true,
      heroEyebrow: 'Aus der Verteidigungsdebatte',
    },
    block('normal', '— die Linke hält die soziale Rechnung dagegen. Fraktionsvorsitzende Heidi Reichinnek:'),
    {
      _type: 'zitatBlock',
      _key: key(),
      zitat: 'Aber jeder Cent, der in die Rüstung fließt, fehlt an anderer Stelle.',
      quelle: {
        titel: 'Heidi Reichinnek (Fraktionsvorsitzende Die Linke), Haushaltsdebatte im Deutschen Bundestag, Juli 2025',
        url: 'https://www.dielinkebt.de/themen/reden/detail/rede-von-heidi-reichinnek-am-09072025/',
        herausgeber: 'Fraktion Die Linke im Bundestag',
      },
      imHero: true,
      heroEyebrow: 'Aus der Verteidigungsdebatte',
    },
    {
      _type: 'quellenNote',
      _key: key(),
      text: 'Ausgaben: NATO, Defence Expenditure of NATO Countries (2014–2025), Tabelle 3 (real, 2021er Preise). Sondervermögen: Wirtschaftsplan 2022. Ziele/Planwerte: BMVg, Deutscher Bundestag. Positionen paraphrasiert nach Bundestag, Bundesrechnungshof und Sachverständigenrat. Abgrenzungs- und Metrik-Hinweise siehe Methodik.',
      quelle: { titel: 'NATO — Defence Expenditure of NATO Countries (2014–2025)', url: 'https://www.nato.int/en/news-and-events/articles/news/2025/08/28/defence-expenditure-of-nato-countries-2014-2025' },
    },
  ],
};

// Benchmark-Beitrag #3: Migration & Arbeitsmarkt — strikt neutral, datenbasiert.
const herkunftslaenderTreemap: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Die zehn wichtigsten Herkunftsländer 2024',
    typ: 'treemap',
    beschreibung:
      'Treemap der zehn Länder mit der höchsten Nettozuwanderung ausländischer Staatsangehöriger nach Deutschland 2024. Die Ukraine führt (rund 121.000), gefolgt von Syrien (75.100) und Indien (41.300). Das Bild ist vielfältig: Flucht (Ukraine, Syrien, Afghanistan) steht neben Erwerbs- und Fachkräftezuwanderung (Indien auf Platz 3). Gezeigt sind die zehn größten Herkunftsländer; die gesamte Nettozuwanderung ausländischer Staatsangehöriger lag 2024 bei rund 511.000 Personen.',
    caption:
      'Nettozuwanderung ausländischer Staatsangehöriger 2024 nach den zehn wichtigsten Herkunftsländern. Quelle: Statistisches Bundesamt (über SVR).',
    encoding: { kategorieFeld: 'land', yFeld: 'personen' },
    datensatz: {
      titel: 'Nettozuwanderung ausländischer Staatsangehöriger 2024 — Top-10-Herkunftsländer',
      quelle: {
        titel: 'Statistisches Bundesamt 2025 (Wanderungsstatistik), zit. n. SVR „Fakten zur Einwanderung“',
        url: 'https://www.svr-migration.de/wp-content/uploads/2024/12/SVR_Kurzbuendig_Einwanderung_2025.pdf',
        herausgeber: 'Statistisches Bundesamt / SVR',
      },
      spalten: [
        { name: 'land', typ: 'string' },
        { name: 'personen', typ: 'number', einheit: 'Personen' },
      ],
      daten: [
        { land: 'Ukraine', personen: 121034 },
        { land: 'Syrien', personen: 75136 },
        { land: 'Indien', personen: 41300 },
        { land: 'Türkei', personen: 41140 },
        { land: 'Afghanistan', personen: 32729 },
        { land: 'Iran', personen: 17522 },
        { land: 'Kosovo', personen: 16836 },
        { land: 'Vietnam', personen: 12070 },
        { land: 'Pakistan', personen: 10949 },
        { land: 'China', personen: 10723 },
      ],
    },
  },
};

const zuwanderungsgruendeWaffle: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Warum Menschen aus Nicht-EU-Ländern 2024 kamen',
    typ: 'waffle',
    beschreibung:
      'Waffle-Diagramm der vier wichtigsten dokumentierten Zuwanderungsgründe von Drittstaatsangehörigen 2024: Asyl­erstanträge (229.751), Familiennachzug (rund 92.700), Erwerbstätigkeit (rund 52.700) und Ausbildung/Studium (rund 49.400). Wichtig zur Einordnung: Der Aufenthaltszweck wird nur bei Drittstaatsangehörigen erfasst — die EU-Binnenzuwanderung (überwiegend Arbeit und Familie) ist hier nicht enthalten. Jede Kachel steht für rund ein Prozent dieser vier Gründe.',
    caption:
      'Vier wichtigste Zuwanderungsgründe von Drittstaatsangehörigen 2024 (ohne EU-Freizügigkeit). Quelle: BAMF 2025 (über SVR).',
    encoding: { kategorieFeld: 'grund', yFeld: 'personen' },
    datensatz: {
      titel: 'Zuwanderungsgründe Drittstaatsangehöriger 2024 (vier größte)',
      quelle: {
        titel: 'BAMF 2025, zit. n. SVR „Fakten zur Einwanderung“',
        url: 'https://www.svr-migration.de/wp-content/uploads/2024/12/SVR_Kurzbuendig_Einwanderung_2025.pdf',
        herausgeber: 'BAMF / SVR',
      },
      spalten: [
        { name: 'grund', typ: 'string' },
        { name: 'personen', typ: 'number', einheit: 'Personen' },
      ],
      daten: [
        { grund: 'Asyl (Erstanträge)', personen: 229751 },
        { grund: 'Familiennachzug', personen: 92700 },
        { grund: 'Erwerbstätigkeit', personen: 52700 },
        { grund: 'Ausbildung & Studium', personen: 49400 },
      ],
    },
  },
};

const migrationDiskurs: BodyBlock = {
  _type: 'diskursBlock',
  _key: key(),
  titel: 'Wie über Zuwanderung und Arbeitsmarkt gestritten wird',
  frage: 'Wie viel Zuwanderung braucht der Arbeitsmarkt — und wie gelingt Integration?',
  einleitung:
    'Dass Deutschland angesichts einer schrumpfenden Erwerbsbevölkerung qualifizierte Zuwanderung braucht, ist unter Fachleuten breiter Konsens; umstritten sind das „Wie“ der Steuerung, die Integration und das Verhältnis von Erwerbs- zu Fluchtmigration. Ausgewählte Stimmen (paraphrasiert, mit Quelle):',
  perspektiven: [
    {
      label: 'Institut der deutschen Wirtschaft (IW)',
      aussage:
        'Die größten Fachkräftelücken bestehen im Gesundheitswesen (rund 46.100 unbesetzte Stellen 2024) und im Baugewerbe (rund 41.300). Da die Zuwanderung aus den EU-Oststaaten versiege, gewinne die Anwerbung qualifizierter Fachkräfte aus Drittstaaten an Bedeutung.',
      quelle: {
        titel: 'Fachkräftezuwanderung aus EU-Osterweiterung versiegt — Alternativen benötigt',
        url: 'https://www.iwkoeln.de/studien/alexander-burstedde-fachkraeftezuwanderung-aus-eu-osterweiterung-versiegt-alternativen-benoetigt.html',
        herausgeber: 'IW Köln',
      },
    },
    {
      label: 'Bundesregierung (Fachkräfteeinwanderungsgesetz 2023)',
      aussage:
        'Mit dem reformierten Fachkräfteeinwanderungsgesetz und der „Chancenkarte“ (Punktesystem) sollen legale Wege erleichtert und die qualifizierte Zuwanderung aus Drittstaaten um bis zu 60.000 Personen pro Jahr erhöht werden.',
      quelle: {
        titel: 'Fachkräfteeinwanderungsgesetz',
        url: 'https://www.bmas.de/DE/Arbeit/Migration-und-Arbeit/Rechtliches-zu-Einreise-Arbeitsmarktzugang-und-Absicherung/Fachkraefteeinwanderungsgesetz/fachkraefteeinwanderungsgesetz.html',
        herausgeber: 'BMAS',
      },
    },
    {
      label: 'Institut für Arbeitsmarkt- und Berufsforschung (IAB)',
      aussage:
        'Erwerbsmigration sei nötig, ihre Wirkung hänge aber an der Umsetzung — vor allem an der schnelleren Anerkennung ausländischer Abschlüsse; parallel müsse das inländische Potenzial (Qualifizierung, Erwerbsbeteiligung) gehoben werden.',
      quelle: {
        titel: 'Zum Gesetzentwurf zur Weiterentwicklung der Fachkräfteeinwanderung',
        url: 'https://iab.de/zum-gesetzentwurf-der-bundesregierung-zur-weiterentwicklung-der-fachkraefteeinwanderung/',
        herausgeber: 'IAB',
      },
    },
    {
      label: 'ver.di (Gewerkschaft)',
      aussage:
        'Ohne Zuwanderung würde der Arbeitsmarkt nicht wachsen, sondern schrumpfen: 2024 stieg die Beschäftigung von Ausländerinnen und Ausländern, während die der deutschen Beschäftigten zurückging. Entscheidend seien gute Arbeitsbedingungen und Integration.',
      quelle: {
        titel: 'Fachkräftemangel in Deutschland: Herausforderung und Wege in die Zukunft',
        url: 'https://www.verdi.de/politik-gesellschaft/fachkraeftemangel-deutschland-herausforderung-und-wege-zukunft',
        herausgeber: 'ver.di',
      },
    },
    {
      label: 'Sachverständigenrat (SVR Migration)',
      aussage:
        'Deutschland sei seit Jahrzehnten ein Einwanderungsland. Neben der qualifizierten Zuwanderung komme es auf Integration und auf das Ausschöpfen des inländischen Potenzials an; Erwerbs- und Fluchtmigration seien getrennt zu betrachten.',
      quelle: {
        titel: 'Fakten zur Einwanderung in Deutschland (Kurz & bündig 2025)',
        url: 'https://www.svr-migration.de/wp-content/uploads/2024/12/SVR_Kurzbuendig_Einwanderung_2025.pdf',
        herausgeber: 'SVR',
      },
    },
  ],
  einordnung:
    'Die Daten und die meisten Stimmen deuten in eine Richtung: Eine alternde Gesellschaft mit niedriger Geburtenrate ist auf Zuwanderung angewiesen, wenn der Arbeitsmarkt nicht schrumpfen soll. Strittig bleibt, wie qualifizierte Zuwanderung gezielt gewonnen, Integration verbessert und das inländische Potenzial besser genutzt werden kann — und wie sich Erwerbs- und Fluchtmigration zueinander verhalten.',
};

const migrationPflegeBalken: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Pflege: Jede sechste Fachkraft hat einen ausländischen Pass',
    typ: 'balken',
    beschreibung:
      'Balkendiagramm: Anteil der Beschäftigten mit ausländischer Staatsangehörigkeit in den Pflegeberufen (sozialversicherungspflichtig Beschäftigte, Stichtag 30. Juni 2023). In der Altenpflege hat mit 18,9 Prozent fast jede fünfte Kraft einen ausländischen Pass, über alle Pflegeberufe sind es 16,2 Prozent (rund 271.000 Personen), in der Krankenpflege 14,5 Prozent. Binnen zehn Jahren hat sich dieser Anteil grob verdreifacht (Krankenpflege von 4,9 auf 14,5 Prozent, Altenpflege von 6,9 auf 18,9 Prozent), während die Zahl der Pflegekräfte mit deutschem Pass seit 2022 zurückgeht — ausländische Beschäftigte federn den demografisch bedingten Rückgang also bereits maßgeblich ab.',
    caption:
      'Anteil ausländischer Staatsangehöriger an den sozialversicherungspflichtig Beschäftigten in den Pflegeberufen, 30. Juni 2023 (in Prozent). Quelle: IAB-Forschungsbericht 22/2024 „Internationalisierung der Pflege“.',
    encoding: { kategorieFeld: 'beruf', yFeld: 'anteil' },
    datensatz: {
      titel: 'Anteil ausländischer Beschäftigter in Pflegeberufen (Juni 2023)',
      quelle: {
        titel: 'IAB-Forschungsbericht 22/2024 — Internationalisierung der Pflege',
        url: 'https://doku.iab.de/forschungsbericht/2024/fb2224.pdf',
        herausgeber: 'Institut für Arbeitsmarkt- und Berufsforschung (IAB)',
      },
      spalten: [
        { name: 'beruf', typ: 'string' },
        { name: 'anteil', typ: 'number', einheit: '% der Beschäftigten' },
      ],
      daten: [
        { beruf: 'Altenpflege', anteil: 18.9 },
        { beruf: 'Pflege insgesamt', anteil: 16.2 },
        { beruf: 'Krankenpflege', anteil: 14.5 },
      ],
    },
  },
};

const migrationArticle: Article = {
  _id: 'seed-migration',
  titel: 'Zuwanderung und Arbeitsmarkt: Was die Zahlen zeigen',
  slug: 'migration-und-arbeitsmarkt',
  ressort: 'inneres',
  standfirst:
    'Die Nettozuwanderung ist seit dem Rekordjahr 2022 stark gesunken — zugleich altert Deutschland und die Erwerbsbevölkerung schrumpft. Die echten Zahlen zeigen, woher Menschen kommen, warum sie kommen und welche Rolle Zuwanderung für den Arbeitsmarkt spielt. Jenseits der Schlagzeilen ist das Bild vielschichtig.',
  veroeffentlicht: '2026-06-01',
  themen: [
    { name: 'Migration', slug: 'migration' },
    { name: 'Arbeitsmarkt', slug: 'arbeitsmarkt' },
  ],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Datenquellen: Statistisches Bundesamt (Wanderungsstatistik, Demografie), Bundesamt für Migration und Flüchtlinge (BAMF, Zuwanderungsgründe/Asyl), Institut der deutschen Wirtschaft (IW, Fachkräftelücken), Bundesagentur für Arbeit (Beschäftigung), zusammengefasst u. a. im SVR-Faktenpapier „Fakten zur Einwanderung in Deutschland“ (Stand Dezember 2025). Bezugsjahr ist durchgängig 2024, soweit nicht anders genannt. Wichtige Einordnung: Der Aufenthaltszweck wird nur bei Drittstaatsangehörigen erfasst — die EU-Binnenzuwanderung (überwiegend Arbeit und Familie) ist im Gründe-Diagramm nicht enthalten; das Waffle bildet die vier größten dokumentierten Gründe ab, nicht die gesamte Zuwanderung. Die Herkunftsländer-Treemap zeigt die zehn größten Herkunftsländer der Nettozuwanderung ausländischer Staatsangehöriger (Gesamtwert 2024 rund 511.000). Die Wanderungsstatistik ist seit dem Berichtsjahr 2016 wegen methodischer Änderungen nur eingeschränkt mit früheren Jahren vergleichbar. Die im Diskurs kartierten Positionen sind paraphrasiert und bequellt; die zwei separat ausgewiesenen, wörtlichen Zitate (Dobrindt, Judith/PRO ASYL) stammen aus den verlinkten Primärquellen (Bulletin der Bundesregierung bzw. PRO-ASYL-Pressemitteilung). Bewusst getrennt behandelt: Erwerbs- und Fluchtmigration. Geburtenziffer 2024 (Statistisches Bundesamt, Pressemitteilung PD25_259): die zusammengefasste Geburtenziffer 1,35 bezieht sich auf alle Frauen mit Wohnsitz in Deutschland (Wohnortprinzip); nach Staatsangehörigkeit getrennt liegt sie bei 1,23 (deutsch) bzw. 1,84 (ausländisch). Pflegeberufe: IAB-Forschungsbericht 22/2024 „Internationalisierung der Pflege“ — Anteil ausländischer Staatsangehöriger an den sozialversicherungspflichtig Beschäftigten in den Pflegeberufen, Stichtag 30. Juni 2023 (Pflege insgesamt 16,2 %, Altenpflege 18,9 %, Krankenpflege 14,5 %; Veränderung gegenüber 2013). Die Ergänzungen zu Geburtenziffer und Pflege gehen auf einen Leserhinweis zurück.',
  body: [
    block('h2', 'Worum es geht'),
    block(
      'normal',
      'Deutschland ist seit 1957 — mit wenigen Ausnahmejahren — ein Einwanderungsland: Es ziehen mehr Menschen zu als fort. Nach dem Rekord von rund 1,46 Millionen Nettozuwanderung im Jahr 2022 (vor allem Geflüchtete aus der Ukraine) halbierte sich der Wert 2023 auf rund 663.000 und ging 2024 weiter auf rund 430.000 zurück.',
    ),
    block(
      'normal',
      'Zugleich altert die Gesellschaft: Die Geburtenrate fiel 2024 auf 1,35 Kinder je Frau — den niedrigsten Wert seit 2005 — und die Erwerbsbevölkerung schrumpft. Dieser Wert bezieht sich auf alle Frauen mit Wohnsitz in Deutschland; Frauen ohne deutschen Pass haben mit 1,84 Kindern eine höhere Geburtenziffer als deutsche Frauen (1,23), Zuwanderung hebt den Schnitt also leicht. Vor diesem Hintergrund führen drei Fragen durch den Beitrag: Woher kommen die Menschen? Warum kommen sie? Und welche Rolle spielt Zuwanderung für den Arbeitsmarkt?',
    ),
    block('h2', 'Woher die Menschen kommen'),
    block(
      'normal',
      'Die Herkunft ist vielfältig. 2024 stand die Ukraine zum dritten Mal in Folge an der Spitze, gefolgt von Syrien. Auffällig ist Platz drei: Indien — ein Hinweis auf wachsende Fachkräftezuwanderung. Flucht und Erwerbszuwanderung stehen also nebeneinander.',
    ),
    herkunftslaenderTreemap,
    block('h2', 'Warum sie kommen'),
    block(
      'normal',
      'Bei Drittstaatsangehörigen wird der Aufenthaltszweck erfasst. 2024 war Asyl der häufigste dokumentierte Grund, gefolgt von Familiennachzug, Erwerbstätigkeit sowie Ausbildung und Studium. Wichtig für die Einordnung: Die große EU-Binnenzuwanderung — überwiegend zum Arbeiten und aus familiären Gründen — taucht hier nicht auf, weil ihr Zweck nicht zentral erfasst wird.',
    ),
    zuwanderungsgruendeWaffle,
    block('h2', 'Was der Arbeitsmarkt braucht'),
    block(
      'normal',
      'Der Zusammenhang zum Arbeitsmarkt ist messbar: 2024 stieg die sozialversicherungspflichtige Beschäftigung von Ausländerinnen und Ausländern, während die der deutschen Beschäftigten zurückging. Ohne Zuwanderung würde der Arbeitsmarkt also nicht wachsen, sondern schrumpfen. Die größten Fachkräftelücken verzeichnete 2024 das Gesundheitswesen (rund 46.100 unbesetzte Stellen), gefolgt vom Baugewerbe (rund 41.300). Mit dem Fachkräfteeinwanderungsgesetz und der „Chancenkarte“ will die Bundesregierung die qualifizierte Zuwanderung aus Drittstaaten um bis zu 60.000 Personen jährlich erhöhen.',
    ),
    block(
      'normal',
      'Wie stark Zuwanderung einen einzelnen Engpass-Sektor schon heute trägt, zeigt die Pflege: Im Juni 2023 hatte jede sechste Pflegekraft einen ausländischen Pass (16,2 Prozent, rund 271.000 Personen), in der Altenpflege fast jede fünfte. Binnen zehn Jahren hat sich dieser Anteil grob verdreifacht, während die Zahl der Pflegekräfte mit deutschem Pass seit 2022 zurückgeht — ausländische Beschäftigte federn den demografisch bedingten Rückgang also bereits maßgeblich ab.',
    ),
    migrationPflegeBalken,
    block('h2', 'Wie darüber gestritten wird'),
    block(
      'normal',
      'Über die Richtung herrscht weithin Einigkeit, über Tempo, Steuerung und Integration wird gestritten. Die folgenden Stimmen spannen das Feld auf.',
    ),
    migrationDiskurs,
    block(
      'normal',
      'Schärfer als über den Arbeitsmarkt wird über Asyl- und Grenzpolitik gestritten. Bundesinnenminister Alexander Dobrindt zieht eine positive Bilanz:',
    ),
    {
      _type: 'zitatBlock',
      _key: key(),
      zitat: 'Die Migrationswende wirkt. Die Zahlen gehen zurück.',
      quelle: {
        titel: 'Alexander Dobrindt (Bundesinnenminister, CSU), Rede im Deutschen Bundestag, Juli 2025',
        url: 'https://www.bundesregierung.de/breg-de/service/newsletter-und-abos/bulletin/rede-des-bundesministers-des-innern-alexander-dobrindt--2364214',
        herausgeber: 'Bulletin der Bundesregierung',
      },
      imHero: true,
      heroEyebrow: 'Aus der Migrationsdebatte',
    },
    block(
      'normal',
      '— Menschenrechtsorganisationen widersprechen scharf. Wiebke Judith, rechtspolitische Sprecherin von PRO ASYL:',
    ),
    {
      _type: 'zitatBlock',
      _key: key(),
      zitat:
        'Mit den sogenannten Return Hubs plant die Bundesregierung nichts anderes als Abschiebelager außerhalb von rechtsstaatlichen Bedingungen.',
      quelle: {
        titel: 'Wiebke Judith (rechtspolitische Sprecherin, PRO ASYL), Pressemitteilung zu „Return Hubs“, Januar 2026',
        url: 'https://www.proasyl.de/pressemitteilung/pro-asyl-zu-abschiebezentren-return-hubs-ausserhalb-der-eu/',
        herausgeber: 'PRO ASYL',
      },
      imHero: true,
      heroEyebrow: 'Aus der Migrationsdebatte',
    },
    {
      _type: 'quellenNote',
      _key: key(),
      text: 'Daten: Statistisches Bundesamt (Wanderung, Demografie, Geburtenziffer), BAMF (Gründe/Asyl), IW Köln (Fachkräftelücken), Bundesagentur für Arbeit (Beschäftigung); zusammengefasst im SVR-Faktenpapier 2025. Anteil ausländischer Pflegekräfte: IAB-Forschungsbericht 22/2024. Einordnungs- und Methodenhinweise siehe Methodik.',
      quelle: { titel: 'SVR — Fakten zur Einwanderung in Deutschland (2025)', url: 'https://www.svr-migration.de/wp-content/uploads/2024/12/SVR_Kurzbuendig_Einwanderung_2025.pdf' },
    },
  ],
};

// Benchmark-Beitrag #4: Wohnen / Bauen / Mieten — echte, bequellte Destatis-Daten.
const bauLinie: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Genehmigt und gebaut: beide weit unter dem Ziel',
    typ: 'linie',
    beschreibung:
      'Liniendiagramm der genehmigten und der fertiggestellten Wohnungen in Deutschland 2022–2025 (Statistisches Bundesamt). Die Baugenehmigungen fielen von 354.200 (2022) auf 215.900 (2024, niedrigster Stand seit 2010) und stiegen 2025 erstmals wieder leicht auf 238.500. Die Fertigstellungen folgen mit Verzögerung nach unten: von rund 295.000 auf 206.600 (2025) — alle Werte liegen weit unter dem politischen Ziel von 400.000 neuen Wohnungen pro Jahr.',
    caption:
      'Genehmigte und fertiggestellte Wohnungen in Deutschland, 2022–2025. Zum Vergleich: das Koalitionsziel liegt bei 400.000/Jahr. Quelle: Statistisches Bundesamt.',
    encoding: { xFeld: 'jahr', yFeld: 'wohnungen', serieFeld: 'reihe' },
    datensatz: {
      titel: 'Baugenehmigungen und Baufertigstellungen 2022–2025',
      quelle: {
        titel: 'Statistisches Bundesamt — Baugenehmigungen / Baufertigstellungen',
        url: 'https://www.destatis.de/DE/Themen/Branchen-Unternehmen/Bauen/_inhalt.html',
        herausgeber: 'Statistisches Bundesamt',
      },
      spalten: [
        { name: 'jahr', typ: 'string' },
        { name: 'reihe', typ: 'string' },
        { name: 'wohnungen', typ: 'number', einheit: 'Wohnungen' },
      ],
      daten: [
        { jahr: '2022', reihe: 'Genehmigungen', wohnungen: 354200 },
        { jahr: '2023', reihe: 'Genehmigungen', wohnungen: 260100 },
        { jahr: '2024', reihe: 'Genehmigungen', wohnungen: 215900 },
        { jahr: '2025', reihe: 'Genehmigungen', wohnungen: 238500 },
        { jahr: '2022', reihe: 'Fertigstellungen', wohnungen: 295300 },
        { jahr: '2023', reihe: 'Fertigstellungen', wohnungen: 294400 },
        { jahr: '2024', reihe: 'Fertigstellungen', wohnungen: 251900 },
        { jahr: '2025', reihe: 'Fertigstellungen', wohnungen: 206600 },
      ],
    },
  },
};

const gebaeudetypTreemap: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Wer baut was? Fertigstellungen 2024 nach Gebäudetyp',
    typ: 'treemap',
    beschreibung:
      'Treemap der 2024 fertiggestellten Wohnungen Deutschlands nach Gebäudetyp (Statistisches Bundesamt). Die meisten Wohnungen entstehen in Mehrfamilienhäusern (135.300), die überwiegend von Unternehmen errichtet werden. Einfamilienhäuser (54.500) brachen am stärksten ein (−22 % gegenüber 2023), weil hohe Zinsen vor allem private Bauherren treffen. „Sonstige“ umfasst Wohnheime, Wohnungen in Nichtwohngebäuden und Baumaßnahmen an bestehenden Gebäuden.',
    caption:
      'Fertiggestellte Wohnungen 2024 nach Gebäudetyp (insgesamt 251.900). Quelle: Statistisches Bundesamt.',
    encoding: { kategorieFeld: 'typ', yFeld: 'wohnungen' },
    datensatz: {
      titel: 'Baufertigstellungen 2024 nach Gebäudetyp',
      quelle: {
        titel: 'Statistisches Bundesamt — 14,4 % weniger fertiggestellte Wohnungen im Jahr 2024',
        url: 'https://www.destatis.de/DE/Presse/Pressemitteilungen/2025/05/PD25_183_31121.html',
        herausgeber: 'Statistisches Bundesamt',
      },
      spalten: [
        { name: 'typ', typ: 'string' },
        { name: 'wohnungen', typ: 'number', einheit: 'Wohnungen' },
      ],
      daten: [
        { typ: 'Mehrfamilienhäuser', wohnungen: 135300, beschreibung: 'Wohnungen in Gebäuden mit drei oder mehr Wohneinheiten (Geschosswohnungsbau).' },
        { typ: 'Einfamilienhäuser', wohnungen: 54500, beschreibung: 'Freistehende Häuser mit einer Wohnung.' },
        { typ: 'Sonstige (Wohnheime, Umbau u. a.)', wohnungen: 44500, beschreibung: 'Wohnheime sowie neue Wohnungen durch Um- und Ausbau im Bestand.' },
        { typ: 'Zweifamilienhäuser', wohnungen: 17600, beschreibung: 'Häuser mit zwei Wohnungen (z. B. mit Einliegerwohnung).' },
      ],
    },
  },
};

const wohnenDiskurs: BodyBlock = {
  _type: 'diskursBlock',
  _key: key(),
  titel: 'Wie über die Wohnungskrise gestritten wird',
  frage: 'Wie kommt Deutschland aus dem Bau-Tief — und wer schützt die Mieterinnen und Mieter?',
  einleitung:
    'Dass zu wenig gebaut wird und die Mieten in den Ballungsräumen steigen, ist unstrittig; über die Mittel wird gestritten. Im Oktober 2025 trat der „Bau-Turbo“ in Kraft, der Genehmigungen beschleunigen soll. Ausgewählte Stimmen (paraphrasiert, mit Quelle):',
  perspektiven: [
    {
      label: 'Bundesregierung (BMWSB, „Bau-Turbo“)',
      aussage:
        'Mit dem im Oktober 2025 in Kraft getretenen „Bau-Turbo“ sollen Kommunen zusätzliche Wohnungen schneller und unter Bedingungen auch ohne Bebauungsplan zulassen können — um bezahlbaren Wohnraum zügiger zu schaffen.',
      quelle: {
        titel: 'Schneller bauen mit dem Wohnungsbau-Turbo',
        url: 'https://www.bundesregierung.de/breg-de/aktuelles/wohnungsbau-turbo-2354894',
        herausgeber: 'Bundesregierung',
      },
    },
    {
      label: 'Zentralverband Deutsches Baugewerbe (ZDB)',
      aussage:
        'Mehr als 760.000 Wohnungen seien genehmigt, aber noch nicht gebaut („Bauüberhang“). Viele Vorhaben scheiterten an Finanzierungskosten, Regulierung und fehlender Wirtschaftlichkeit; nötig sei daher ein „echter“ Bau-Turbo mit besseren Rahmenbedingungen, nicht nur schnelleren Genehmigungen.',
      quelle: {
        titel: 'Wohnungsbau vor Absturz? Bauwirtschaft fordert echten Bau-Turbo',
        url: 'https://www.meistertipp.de/aktuelles/news/wohnungsbau-vor-absturz-bauwirtschaft-fordert-echten-bau-turbo',
        herausgeber: 'ZDB (zit. n. Meistertipp)',
      },
    },
    {
      label: 'Deutscher Mieterbund',
      aussage:
        'Sinkt der Neubau bei weiter hoher Nachfrage, verschärft sich die Wohnungsnot und die Mieten steigen. Nötig seien deutlich mehr sozialer Wohnungsbau und ein wirksamer Mieterschutz, etwa eine verlängerte und nachgeschärfte Mietpreisbremse.',
      quelle: {
        titel: 'Deutscher Mieterbund — Positionen zu Wohnungsbau und Mietrecht',
        url: 'https://www.mieterbund.de/',
        herausgeber: 'Deutscher Mieterbund',
      },
    },
    {
      label: 'Deutscher Städtetag',
      aussage:
        'Die Beschleunigung des Wohnungsbaus sei richtig; damit der Bau-Turbo vor Ort wirke, brauchten die Kommunen jedoch Planungshoheit, Personal und ausreichende Mittel.',
      quelle: {
        titel: 'Gesetz zur Beschleunigung des Wohnungsbaus und zur Wohnraumsicherung',
        url: 'https://www.staedtetag.de/themen/austausch-gesetz-beschleunigung-wohnungsbaus-wohnraumsicherung',
        herausgeber: 'Deutscher Städtetag',
      },
    },
  ],
  einordnung:
    'Die Diagnose teilen fast alle: zu wenig Neubau bei anhaltend hoher Nachfrage treibt die Mieten. Strittig ist der Weg — schnellere Genehmigungen, bessere wirtschaftliche Rahmenbedingungen, mehr sozialer Wohnungsbau und stärkerer Mieterschutz. Mehrere dieser Hebel können gleichzeitig nötig sein.',
};

const wohnenArticle: Article = {
  _id: 'seed-wohnen',
  titel: 'Wohnen: Warum so wenig gebaut wird, und die Mieten steigen',
  slug: 'wohnen-bauen-und-mieten',
  ressort: 'wohnen',
  standfirst:
    'Deutschland verfehlt sein Wohnungsbau-Ziel deutlich: 2025 wurden so wenige Wohnungen fertig wie seit über einem Jahrzehnt nicht. Zugleich bleibt die Nachfrage hoch — und die Mieten steigen. Die echten Zahlen zeigen, wie groß die Lücke ist, wer was baut und worüber gestritten wird.',
  veroeffentlicht: '2026-06-02',
  themen: [{ name: 'Wohnen', slug: 'wohnen' }],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Datenquelle: Statistisches Bundesamt (Destatis), Pressemitteilungen zu Baugenehmigungen (PD25_061 vom 18.02.2025; PD26_052 vom 18.02.2026) und Baufertigstellungen (PD25_183 vom 23.05.2025; PD26_174 vom 22.05.2026). Wichtige Abgrenzung: „Genehmigt“ ist nicht „gebaut“ — zwischen Genehmigung und Fertigstellung liegen zuletzt rund 26 Monate Bauzeit, und ein großer „Bauüberhang“ (genehmigt, aber nicht fertiggestellt) ist noch offen. Das Ziel von 400.000 Wohnungen pro Jahr ist ein politisches Koalitionsziel der Bundesregierung, kein statistischer Wert. In der Treemap fasst „Sonstige“ Wohnheime, Wohnungen in Nichtwohngebäuden und Baumaßnahmen an bestehenden Gebäuden zusammen (Residuum zur Gesamtzahl 2024). Mietangaben beziehen sich auf die amtlich gemessenen Nettokaltmieten im Verbraucherpreisindex; neu angebotene Wohnungen verteuern sich in Ballungsräumen erfahrungsgemäß schneller als der Index. Positionen (Stand 2025/2026) sind paraphrasiert und bequellt — keine wörtlichen Zitate.',
  body: [
    block('h2', 'Worum es geht'),
    block(
      'normal',
      'Deutschland hat Ende 2024 rund 43,8 Millionen Wohnungen — und baut zu wenige neue hinzu. Die Bundesregierung nennt seit Jahren das Ziel von 400.000 neuen Wohnungen pro Jahr. Die Wirklichkeit liegt weit darunter: Nach rund 294.000 Fertigstellungen in den Jahren 2021 bis 2023 sank die Zahl 2024 auf 251.900 und 2025 auf 206.600 — den niedrigsten Stand seit über einem Jahrzehnt.',
    ),
    block(
      'normal',
      'Zugleich bleibt die Nachfrage hoch. Wo weniger gebaut wird und viele eine Wohnung suchen, steigen die Mieten — besonders in den Städten. Drei Fragen führen durch den Beitrag: Wie groß ist die Lücke? Wer baut was? Und was folgt daraus für die Mieten?',
    ),
    block('h2', 'Genehmigt, gebaut und das Ziel'),
    block(
      'normal',
      'Die Baugenehmigungen sind ein Frühindikator: Sie fielen von 354.200 (2022) über 260.100 (2023) auf 215.900 (2024) — den tiefsten Stand seit 2010. 2025 stiegen sie erstmals seit 2021 wieder leicht, auf 238.500. Die Fertigstellungen folgen mit Verzögerung nach unten, weil eine Neubauwohnung im Schnitt rund 26 Monate bis zur Fertigstellung braucht.',
    ),
    bauLinie,
    block(
      'normal',
      'Ein genehmigtes Vorhaben ist noch kein fertiges Haus: Nach Angaben der Bauwirtschaft sind mehr als 760.000 Wohnungen genehmigt, aber nicht gebaut — der sogenannte Bauüberhang. Viele Projekte stocken an gestiegenen Finanzierungs- und Baukosten.',
    ),
    block('h2', 'Wer baut was'),
    block(
      'normal',
      'Der Neubau verschiebt sich. Die meisten neuen Wohnungen entstehen in Mehrfamilienhäusern, die überwiegend von Unternehmen gebaut werden. Private Einfamilienhäuser brachen dagegen am stärksten ein — die gestiegenen Zinsen treffen vor allem Bauherren, die selbst finanzieren.',
    ),
    gebaeudetypTreemap,
    block('h2', 'Die Folge: steigende Mieten'),
    block(
      'normal',
      'Weniger Neubau bei anhaltend hoher Nachfrage verknappt das Angebot — und treibt die Preise. Die amtlich gemessenen Nettokaltmieten (Verbraucherpreisindex) steigen seit Jahren stetig; neu angebotene Wohnungen verteuern sich in den Ballungsräumen noch deutlich schneller. Der Wohnungsbau ist damit nicht nur eine Bau-, sondern auch eine soziale Frage.',
    ),
    block('h2', 'Wie darüber gestritten wird'),
    block(
      'normal',
      'Über die Diagnose herrscht weithin Einigkeit, über die Mittel nicht. Schnellere Genehmigungen, bessere wirtschaftliche Bedingungen, mehr sozialer Wohnungsbau, stärkerer Mieterschutz — die folgenden Stimmen spannen das Feld auf.',
    ),
    wohnenDiskurs,
    {
      _type: 'quellenNote',
      _key: key(),
      text: 'Daten: Statistisches Bundesamt (Baugenehmigungen und Baufertigstellungen 2022–2025). Bauüberhang: Bauwirtschaft/ZDB. Positionen paraphrasiert nach Bundesregierung, ZDB, Deutscher Mieterbund und Deutscher Städtetag. Abgrenzungs- und Methodenhinweise siehe Methodik.',
      quelle: { titel: 'Statistisches Bundesamt — Bauen', url: 'https://www.destatis.de/DE/Themen/Branchen-Unternehmen/Bauen/_inhalt.html' },
    },
  ],
};

// Benchmark-Beitrag #5: Rente & private Altersvorsorge — echte, bequellte Daten.
const altenquotientKorridor: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Auf 100 Erwerbstätige kommen immer mehr Rentner',
    typ: 'linie',
    beschreibung:
      'Liniendiagramm des Altenquotienten — Personen ab 67 Jahren je 100 Personen im erwerbsfähigen Alter (20 bis 66) — von 2024 bis 2070. Heute liegt er bei rund 33. Bis etwa 2040 steigt er in allen Zukunftsvarianten steil auf über 44 (die Babyboomer gehen in Rente), danach spreizt sich der Korridor: In der mittleren Annahme (G2L2W2) steigt er weiter auf 51 (2070), bei stärkerer Alterung (alte Bevölkerung, G1L3W1) auf 61, bei schwächerer Alterung (junge Bevölkerung, G3L1W3) verharrt er um 43. Selbst der günstigste Pfad bedeutet rund ein Drittel mehr Rentner je Erwerbsperson als heute. Quelle: 16. koordinierte Bevölkerungsvorausberechnung, eigene Berechnung aus der Altersstruktur.',
    caption:
      'Altenquotient (Personen ab 67 je 100 im Alter 20–66), 2024–2070. Drei Varianten der 16. koordinierten Bevölkerungsvorausberechnung: „Mittlere Annahme“ (G2L2W2, durchgezogen) zwischen „Stärkere Alterung“ (alte Bevölkerung, G1L3W1) und „Schwächere Alterung“ (junge Bevölkerung, G3L1W3). Quelle: Statistisches Bundesamt, 16. kBV (eigene Berechnung aus der Altersstruktur, GENESIS-Tabelle 12421-0002).',
    encoding: { xFeld: 'jahr', yFeld: 'quotient', serieFeld: 'variante', gestrichelteReihen: ['Stärkere Alterung', 'Schwächere Alterung'] },
    datensatz: {
      titel: 'Altenquotient (67+ je 100 im Alter 20–66) — 16. kBV, Varianten, 2024–2070',
      quelle: {
        titel: 'Statistisches Bundesamt — 16. koordinierte Bevölkerungsvorausberechnung (eigene Berechnung aus GENESIS 12421-0002)',
        url: 'https://www.destatis.de/DE/Themen/Gesellschaft-Umwelt/Bevoelkerung/Bevoelkerungsvorausberechnung/_inhalt.html',
        herausgeber: 'Statistisches Bundesamt',
      },
      spalten: [
        { name: 'jahr', typ: 'string' },
        { name: 'variante', typ: 'string' },
        { name: 'quotient', typ: 'number', einheit: '67+ je 100 (20–66)' },
      ],
      daten: [
        { jahr: '2024', variante: 'Stärkere Alterung', quotient: 33 },
        { jahr: '2030', variante: 'Stärkere Alterung', quotient: 38.6 },
        { jahr: '2035', variante: 'Stärkere Alterung', quotient: 44.5 },
        { jahr: '2040', variante: 'Stärkere Alterung', quotient: 46.8 },
        { jahr: '2045', variante: 'Stärkere Alterung', quotient: 47.2 },
        { jahr: '2050', variante: 'Stärkere Alterung', quotient: 49.4 },
        { jahr: '2055', variante: 'Stärkere Alterung', quotient: 52.4 },
        { jahr: '2060', variante: 'Stärkere Alterung', quotient: 55.6 },
        { jahr: '2065', variante: 'Stärkere Alterung', quotient: 58.6 },
        { jahr: '2070', variante: 'Stärkere Alterung', quotient: 61 },
        { jahr: '2024', variante: 'Mittlere Annahme', quotient: 33 },
        { jahr: '2030', variante: 'Mittlere Annahme', quotient: 38 },
        { jahr: '2035', variante: 'Mittlere Annahme', quotient: 43.1 },
        { jahr: '2040', variante: 'Mittlere Annahme', quotient: 44.6 },
        { jahr: '2045', variante: 'Mittlere Annahme', quotient: 44.2 },
        { jahr: '2050', variante: 'Mittlere Annahme', quotient: 45.2 },
        { jahr: '2055', variante: 'Mittlere Annahme', quotient: 46.9 },
        { jahr: '2060', variante: 'Mittlere Annahme', quotient: 48.5 },
        { jahr: '2065', variante: 'Mittlere Annahme', quotient: 50 },
        { jahr: '2070', variante: 'Mittlere Annahme', quotient: 51 },
        { jahr: '2024', variante: 'Schwächere Alterung', quotient: 33 },
        { jahr: '2030', variante: 'Schwächere Alterung', quotient: 37.4 },
        { jahr: '2035', variante: 'Schwächere Alterung', quotient: 41.8 },
        { jahr: '2040', variante: 'Schwächere Alterung', quotient: 42.5 },
        { jahr: '2045', variante: 'Schwächere Alterung', quotient: 41.4 },
        { jahr: '2050', variante: 'Schwächere Alterung', quotient: 41.2 },
        { jahr: '2055', variante: 'Schwächere Alterung', quotient: 41.7 },
        { jahr: '2060', variante: 'Schwächere Alterung', quotient: 42.2 },
        { jahr: '2065', variante: 'Schwächere Alterung', quotient: 42.7 },
        { jahr: '2070', variante: 'Schwächere Alterung', quotient: 42.8 },
      ],
    },
  },
};

const altenAnteilRaster: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Bald ist jede·r Vierte im Rentenalter',
    typ: 'verhaeltnis',
    beschreibung:
      'Verhältnis-Darstellung als 100 Personen-Icons je Jahr: der Anteil der Menschen ab 67 Jahren an allen. Heute (2025) sind rund 20 von 100 mindestens 67 — jede·r Fünfte; 2035 rund 25 — jede·r Vierte; 2070 rund 28 in der mittleren Annahme, bei stärkerer Alterung bis 33 — also bis zu jede·r Dritte. Jede Kachel steht für eine Person; die Gesamtzahl ist je Jahr gleich, nur der eingefärbte Anteil wächst. Quelle: 16. koordinierte Bevölkerungsvorausberechnung, eigene Berechnung aus der Altersstruktur.',
    caption:
      'Anteil der Bevölkerung ab 67 Jahren, je 100 Menschen, 2025 / 2035 / 2070 (mittlere Annahme G2L2W2; bei stärkerer Alterung 2070 rund 33). Quelle: Statistisches Bundesamt, 16. kBV (eigene Berechnung, GENESIS 12421-0002).',
    encoding: { xFeld: 'jahr', yFeld: 'anteil', kategorieFeld: 'jünger als 67', serieFeld: 'ab 67' },
    datensatz: {
      titel: 'Anteil der Bevölkerung ab 67 je 100 Menschen, 2025–2070 (16. kBV, mittlere Annahme)',
      quelle: {
        titel: 'Statistisches Bundesamt — 16. koordinierte Bevölkerungsvorausberechnung (eigene Berechnung aus GENESIS 12421-0002)',
        url: 'https://www.destatis.de/DE/Themen/Gesellschaft-Umwelt/Bevoelkerung/Bevoelkerungsvorausberechnung/_inhalt.html',
        herausgeber: 'Statistisches Bundesamt',
      },
      spalten: [
        { name: 'jahr', typ: 'string' },
        { name: 'anteil', typ: 'number', einheit: 'von 100' },
      ],
      daten: [
        { jahr: '2025', anteil: 20 },
        { jahr: '2035', anteil: 25 },
        { jahr: '2070', anteil: 28 },
      ],
    },
  },
};

const renteHebelLinie: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Was die Annahmen versprechen: Niveau hält, Beitrag steigt',
    typ: 'linie',
    beschreibung:
      'Liniendiagramm der Projektion von Rentenniveau und Beitragssatz bis 2039 aus dem Rentenversicherungsbericht 2025. Das Rentenniveau wird per Haltelinie bis 2031 bei 48 % gehalten und sinkt danach bis 2039 auf 46,3 %. Der Beitragssatz steigt von 18,6 % (bis 2027 stabil) über 20,0 % (2029) auf 21,2 % (2039). Beide Hebel bewegen sich, um die Rente trotz wachsender demografischer Last zu finanzieren.',
    caption:
      'Projektion: Rentenniveau und Beitragssatz bis 2039, in Prozent. Quelle: Rentenversicherungsbericht 2025 (Bundesregierung).',
    encoding: { xFeld: 'jahr', yFeld: 'prozent', serieFeld: 'kennzahl' },
    datensatz: {
      titel: 'Rentenniveau und Beitragssatz — Projektion 2025–2039',
      quelle: {
        titel: 'Rentenversicherungsbericht 2025',
        url: 'https://www.bundesregierung.de/breg-de/aktuelles/rentenbericht-2025-2394260',
        herausgeber: 'Bundesregierung / BMAS',
      },
      spalten: [
        { name: 'jahr', typ: 'string' },
        { name: 'kennzahl', typ: 'string' },
        { name: 'prozent', typ: 'number', einheit: '%' },
      ],
      daten: [
        { jahr: '2025', kennzahl: 'Rentenniveau', prozent: 48.0 },
        { jahr: '2027', kennzahl: 'Rentenniveau', prozent: 48.0 },
        { jahr: '2029', kennzahl: 'Rentenniveau', prozent: 48.0 },
        { jahr: '2039', kennzahl: 'Rentenniveau', prozent: 46.3 },
        { jahr: '2025', kennzahl: 'Beitragssatz', prozent: 18.6 },
        { jahr: '2027', kennzahl: 'Beitragssatz', prozent: 18.6 },
        { jahr: '2029', kennzahl: 'Beitragssatz', prozent: 20.0 },
        { jahr: '2039', kennzahl: 'Beitragssatz', prozent: 21.2 },
      ],
    },
  },
};

const renteDiskurs: BodyBlock = {
  _type: 'diskursBlock',
  _key: key(),
  titel: 'Wie über die Rente gestritten wird',
  frage: 'Wer trägt die wachsende Last — und wie werden die Lücken gefüllt: über die gesetzliche Rente, Steuern, späteres Arbeiten oder private Vorsorge?',
  einleitung:
    'Dass die Demografie die umlagefinanzierte Rente unter Druck setzt, ist unstrittig; umstritten ist, an welchen Stellschrauben gedreht wird. Mit dem Rentenpaket 2025 hält die Bundesregierung das Niveau zunächst bei 48 %. Ausgewählte Stimmen (paraphrasiert, mit Quelle):',
  perspektiven: [
    {
      label: 'Bundesregierung (BMAS, Rentenpaket 2025)',
      aussage:
        'Mit dem Rentenpaket 2025 werde das Rentenniveau über die Rentenanpassung 2031 hinaus bei 48 % gehalten, um die Renten verlässlich zu stabilisieren.',
      quelle: {
        titel: 'Rentenbericht 2025',
        url: 'https://www.bundesregierung.de/breg-de/aktuelles/rentenbericht-2025-2394260',
        herausgeber: 'Bundesregierung',
      },
    },
    {
      label: 'Deutsche Rentenversicherung (Bericht)',
      aussage:
        'Die Projektion zeigt einen steigenden Beitragssatz — bis 2039 auf rund 21 % — sowie einen hohen, über Steuern finanzierten Bundeszuschuss. Eine verlässliche, langfristige Finanzierung sei entscheidend.',
      quelle: {
        titel: 'Rentenversicherungsbericht 2025 (Kabinettbeschluss)',
        url: 'https://www.bmas.de/DE/Service/Presse/Pressemitteilungen/2025/bundeskabinett-beschliesst-rentenversicherungsbericht-2025.html',
        herausgeber: 'BMAS / Deutsche Rentenversicherung',
      },
    },
    {
      label: 'Institut der deutschen Wirtschaft (IW)',
      aussage:
        'Das dauerhafte Festschreiben des Niveaus sei teuer: Allein 2035 fehlten dadurch rund 34 Milliarden Euro. Ohne Anpassungen — etwa beim Renteneintrittsalter, beim Niveau oder durch mehr kapitalgedeckte Vorsorge — wachse die Last vor allem für die Jüngeren.',
      quelle: {
        titel: 'Rentenpaket II: 2035 fehlen 34 Milliarden Euro',
        url: 'https://www.iwkoeln.de/presse/iw-nachrichten/jochen-pimpertz-2035-fehlen-34-milliarden-euro.html',
        herausgeber: 'IW Köln',
      },
    },
    {
      label: 'Sozialverband VdK',
      aussage:
        'Das Rentenniveau müsse dauerhaft gesichert und eher angehoben werden, um Altersarmut zu verhindern; ein höheres Renteneintrittsalter und Leistungskürzungen lehnt der Verband ab.',
      quelle: {
        titel: 'Sozialverband VdK — Positionen zur Rente',
        url: 'https://www.vdk.de/deutschland/pages/themen/rente',
        herausgeber: 'Sozialverband VdK',
      },
    },
    {
      label: 'Wissenschaftlicher Beirat beim BMWK',
      aussage:
        'Ein dauerhaft festgeschriebenes Rentenniveau sei nicht generationengerecht finanzierbar. Der Beirat empfiehlt, das Renteneintrittsalter an die steigende Lebenserwartung zu koppeln, statt die Last über höhere Beiträge und Steuerzuschüsse auf die Jüngeren zu verschieben (Rentnerquotient rund 48 je 100 Beitragszahler 2016, rund 70 bis 2045).',
      quelle: {
        titel: 'Grundlegende Reform der gesetzlichen Rentenversicherung (Gutachten)',
        url: 'https://www.bundeswirtschaftsministerium.de/Redaktion/DE/Publikationen/Ministerium/Veroeffentlichung-Wissenschaftlicher-Beirat/reform-rentenversicherung.pdf',
        herausgeber: 'Wissenschaftlicher Beirat beim BMWK',
      },
    },
    {
      label: 'Bundesregierung (BMF, Frühstart-Rente)',
      aussage:
        'Eine renditestärkere, kostengünstigere kapitalgedeckte Vorsorge solle die gesetzliche Rente ergänzen. Die Frühstart-Rente führe junge Menschen früh an den Kapitalmarkt heran und baue über Jahrzehnte zusätzliches Alterskapital auf.',
      quelle: {
        titel: 'Neustart für die private Altersvorsorge (BMF-Monatsbericht 01/2026)',
        url: 'https://www.bundesfinanzministerium.de/Monatsberichte/Ausgabe/2026/01/Inhalte/Kapitel-2-Analysen/2-2-neustart-fuer-die-private-altersvorsorge.html',
        herausgeber: 'Bundesministerium der Finanzen',
      },
    },
    {
      label: 'Wirtschaftsdienst (ZBW) / Verbraucherschutz',
      aussage:
        'Kapitalgedeckte Vorsorge biete langfristig Renditechancen, berge aber Verteilungsrisiken: Einkommensschwache Haushalte könnten nach dem Ende der staatlichen Förderung kaum weiter einzahlen — für sie drohe die Lücke sich eher zu vergrößern als zu schließen.',
      quelle: {
        titel: 'Kapitalgedeckte Altersvorsorge: Chancen und Risiken der Frühstart-Rente',
        url: 'https://www.wirtschaftsdienst.eu/inhalt/jahr/2025/heft/5/beitrag/kapitalgedeckte-altersvorsorge-welche-chancen-und-risiken-birgt-die-fruehstart-rente.html',
        herausgeber: 'Wirtschaftsdienst (ZBW)',
      },
    },
  ],
  einordnung:
    'Die Demografie ist gesetzt — strittig ist die Verteilung der Lasten. Jede Stellschraube verschiebt sie woandershin: ein höheres Niveau entlastet Rentnerinnen und Rentner, belastet aber Beitrags- und Steuerzahlende; ein höheres Eintrittsalter oder mehr Kapitaldeckung entlastet die Kasse, trifft aber andere. Mehrere dieser Antworten können zugleich nötig sein.',
};

const merzAussageZitat: BodyBlock = {
  _type: 'zitatBlock',
  _key: key(),
  zitat:
    'Und es übersteigt ganz einfach die Kräfte von zwei Beitragszahlern, wenn sie in Zukunft eine Person in der Rente finanzieren sollen.',
  quelle: {
    titel: 'Friedrich Merz (Bundeskanzler), DGB-Bundeskongress Berlin, Mai 2026',
    url: 'https://www.tagesspiegel.de/politik/gewerkschafter-buhen-kanzler-aus-merz-verteidigt-rentenreform-bei-dgb-kongress-15585792.html',
    herausgeber: 'Der Tagesspiegel',
  },
  imHero: true,
  heroEyebrow: 'Aus der Rentendebatte',
};

const fahimiRenteZitat: BodyBlock = {
  _type: 'zitatBlock',
  _key: key(),
  zitat:
    'Wer das Renteneintrittsalter beliebig nach oben setzen will oder das Sicherungsniveau der Rente angreift, der riskiert einen gesellschaftlichen Großkonflikt.',
  quelle: {
    titel: 'Yasmin Fahimi (DGB-Vorsitzende), Grundsatzreferat DGB-Bundeskongress Berlin, Mai 2026',
    url: 'https://www.nd-aktuell.de/artikel/1199654.gewerkschaften-dgb-bundeskongress-aufgeheizte-stimmung-kalte-mathematik.html',
    herausgeber: 'nd (neues deutschland)',
  },
  imHero: true,
  heroEyebrow: 'Aus der Rentendebatte',
};

const beitragszahlerLinie: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Von sechs auf zwei — und weiter abwärts',
    typ: 'linie',
    beschreibung:
      'Liniendiagramm: Wie viele Beitragszahler kommen auf einen Rentner in der gesetzlichen Rentenversicherung (gerundete Kopfzahl)? Die beobachtete Reihe sinkt von rund 6 (1962) über 4 (1973) und 3 (1988) auf rund 2 heute (2024: 40,11 Mio. aktiv Versicherte je 18,92 Mio. Altersrentner ≈ 2,1). Eine zweite, als Projektion ausgewiesene Reihe setzt am heutigen Wert an und fällt weiter: rund 1,5 (2030) und rund 1,3 (2050) Beitragszahler je Rentner (IW Köln). Damit sinkt das Verhältnis absehbar unter zwei zu eins.',
    caption:
      'Beitragszahler je Rentner in der gesetzlichen Rentenversicherung, gerundet. Beobachtet 1962–2024: aktiv Versicherte je Altersrentner (Demografieportal/BiB; aktueller Wert Deutsche Rentenversicherung 2024). Projektion 2030/2050: IW Köln. Definitionen leicht unterschiedlich — Werte daher gerundet und Projektion getrennt ausgewiesen.',
    encoding: { xFeld: 'jahr', yFeld: 'wert', serieFeld: 'reihe', gestrichelteReihen: ['Projektion'] },
    datensatz: {
      titel: 'Beitragszahler je Rentner — beobachtet 1962–2024 und Projektion 2030/2050',
      quelle: {
        titel:
          'Demografieportal des BiB & Deutsche Rentenversicherung (beobachtet); IW Köln (Projektion)',
        url: 'https://www.demografie-portal.de/DE/Fakten/altersrentner-beitragszahler.html',
        herausgeber: 'BiB / Deutsche Rentenversicherung / IW Köln',
      },
      spalten: [
        { name: 'jahr', typ: 'string' },
        { name: 'reihe', typ: 'string' },
        { name: 'wert', typ: 'number', einheit: 'Beitragszahler je Rentner' },
      ],
      daten: [
        { jahr: '1962', reihe: 'Beobachtet', wert: 6 },
        { jahr: '1973', reihe: 'Beobachtet', wert: 4 },
        { jahr: '1988', reihe: 'Beobachtet', wert: 3 },
        { jahr: '2024', reihe: 'Beobachtet', wert: 2.1 },
        { jahr: '2024', reihe: 'Projektion', wert: 2.1 },
        { jahr: '2030', reihe: 'Projektion', wert: 1.5 },
        { jahr: '2050', reihe: 'Projektion', wert: 1.3 },
      ],
    },
  },
};

const renteArticle: Article = {
  _id: 'seed-rente',
  titel: 'Die Rente und ihre Annahmen: Was trägt, und was, wenn es kippt?',
  slug: 'rente-und-ihre-annahmen',
  ressort: 'soziales',
  standfirst:
    'Die gesetzliche Rente ist umlagefinanziert: Die Beiträge von heute zahlen die Renten von heute. Das funktioniert, solange genug Erwerbstätige auf jede Rentnerin kommen — doch die geburtenstarken Jahrgänge gehen in Rente. Die echten Zahlen zeigen, wie stark die Last steigt, was die Annahmen versprechen und worüber gestritten wird.',
  veroeffentlicht: '2026-06-02',
  themen: [{ name: 'Rente', slug: 'rente' }],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Datenquellen: Statistisches Bundesamt, 16. koordinierte Bevölkerungsvorausberechnung (Basis 31.12.2024, veröffentlicht Dezember 2025). Der Altenquotient-Korridor zeigt Personen ab 67 je 100 Personen im Alter 20 bis 66 — eigene Berechnung aus der Altersstruktur (GENESIS-Tabelle 12421-0002, Summe der Einzelaltersjahre je Variante): heute rund 33; bis 2070 je nach Variante rund 43 (Minimum = junge Bevölkerung, G3L1W3), 51 (Moderat, G2L2W2) oder 61 (Maximum = alte Bevölkerung, G1L3W1). Die berechneten Endwerte (42,8 / 51,0 / 61,0) decken sich mit den von Destatis veröffentlichten Eckwerten (43 / 51 / 61). Beitragszahler je Rentner: beobachtet (1962 rund 6; 1973 rund 4; 1988 rund 3; 2024 rund 2,1 = 40,11 Mio. aktiv Versicherte je 18,92 Mio. Altersrentner; Demografieportal des BiB und Deutsche Rentenversicherung „Rentenversicherung in Zahlen 2025“); Projektion 2030 rund 1,5 und 2050 rund 1,3 (IW Köln, leicht abweichende Abgrenzung „je Rentner insgesamt“, daher gerundet und als Projektion getrennt ausgewiesen). Das amtliche Maß der Rentenformel ist der Äquivalenz-Rentnerquotient (rund 48 Rentner je 100 Beitragszahler 2016, rund 70 bis 2045 ⇒ rechnerisch rund 1,4 Beitragszahler je Rentner). Aussage Friedrich Merz: DGB-Bundeskongress, Mai 2026. Renten-Projektion: Rentenversicherungsbericht 2025 (Bundesregierung/BMAS); Rentenniveau per Haltelinie bis zur Rentenanpassung 2031 bei 48 %, danach laut Projektion bis 2039 auf 46,3 %; Beitragssatz bis 2027 bei 18,6 %, danach steigend (19,8 % 2028, 20,0 % 2029) bis 2039 auf 21,2 %. Finanzierung 2024 (DRV): Einnahmen rund 402 Mrd. Euro, davon Beiträge rund 306 Mrd. (rund 76 %) und Bundesmittel/Steuern rund 93 Mrd. (rund 23 %); der jährliche Bundeszuschuss liegt über 100 Mrd. Euro. Private/kapitalgedeckte Vorsorge: Frühstart-Rente (Kabinettsbeschluss Dezember 2025, Auszahlung ab 2026), Altersvorsorgereformgesetz und Zweites Betriebsrentenstärkungsgesetz (Dezember 2025) — Quellen Bundesregierung/BMF; kritische Einordnung u. a. Wirtschaftsdienst (ZBW). Projektionen sind keine Prognosen, sondern Modellrechnungen unter Annahmen. Positionen (Stand 2025/2026) sind paraphrasiert und bequellt.',
  body: [
    block('h2', 'Worum es geht'),
    block(
      'normal',
      'Die gesetzliche Rente in Deutschland ist umlagefinanziert: Was Beschäftigte und Arbeitgeber heute einzahlen, wird unmittelbar an die heutigen Rentnerinnen und Rentner ausgezahlt. Dieses Versprechen ruht auf einer demografischen Annahme — dass genug Erwerbstätige auf jede Person im Ruhestand kommen. Genau diese Annahme gerät unter Druck, weil die geburtenstarken Jahrgänge in Rente gehen.',
    ),
    block(
      'normal',
      'Drei Fragen führen durch den Beitrag: Wie stark verschiebt sich das Verhältnis von Jung zu Alt? Was tut die Politik dagegen — und was verspricht sie? Und warum rät sie zugleich dringend zur privaten Vorsorge? Der rote Faden ist eine Kette: Demografie → Druck auf das Rentenniveau → Versorgungslücke → ergänzende Vorsorge.',
    ),
    block('h2', 'Die demografische Wette'),
    block(
      'normal',
      'Fangen wir konkret an: Wie viele Menschen sind überhaupt im Rentenalter? Heute ist gut jede·r Fünfte 67 Jahre oder älter. Mit der Verrentung der geburtenstarken Jahrgänge wird daraus rasch jede·r Vierte — und je nach Entwicklung bis 2070 fast jede·r Dritte.',
    ),
    altenAnteilRaster,
    block(
      'normal',
      'Für die Rentenkasse zählt aber nicht nur, wie viele alt sind, sondern wie viele Erwerbstätige sie tragen. Genau das misst der Altenquotient: Personen ab 67 je 100 Menschen im erwerbsfähigen Alter (20 bis 66). Er liegt heute bei rund 33 und steigt in allen Zukunftsvarianten — bis etwa 2040 steil, weil die Babyboomer in den Ruhestand wechseln; danach spreizt sich der Korridor je nach Geburtenrate, Lebenserwartung und Zuwanderung. Selbst im günstigsten Fall kommen 2070 rund 43 Menschen ab 67 auf 100 Erwerbstätige — ein Drittel mehr als heute; im ungünstigsten sind es 61. Die Alterung ist also keine Frage des Ob, sondern des Wie stark.',
    ),
    altenquotientKorridor,
    block('h2', 'Aussage-Check: Zwei Beitragszahler, eine Rente?'),
    block(
      'normal',
      'Bundeskanzler Friedrich Merz brachte diese Last beim DGB-Bundeskongress im Mai 2026 auf eine Formel — „Das ist Demografie und Mathematik“ — und begründete damit den Reformbedarf:',
    ),
    merzAussageZitat,
    block(
      'normal',
      'Gewerkschaften und Sozialverbände teilen die Diagnose des sinkenden Verhältnisses, ziehen aber andere Schlüsse. DGB-Vorsitzende Yasmin Fahimi warnte beim selben Kongress vor einseitigen Eingriffen ins Rentenniveau:',
    ),
    fahimiRenteZitat,
    block(
      'normal',
      'Gemeint ist das Umlageprinzip: Die Beiträge der Erwerbstätigen finanzieren die laufenden Renten. Entscheidend ist deshalb, wie viele Beitragszahler auf einen Rentner kommen. Dieses Verhältnis ist über Jahrzehnte gesunken — von rund sechs in den 1960er-Jahren auf etwa zwei heute (2024: 40,1 Millionen aktiv Versicherte, 18,9 Millionen Altersrentner). Und mit der Verrentung der Babyboomer sinkt es absehbar unter zwei zu eins.',
    ),
    beitragszahlerLinie,
    block(
      'normal',
      'Die Aussage von Friedrich Merz trifft die Richtung — als „zwei finanzieren eine“ ist sie aber eine Vereinfachung. Drei Dinge runden das Bild, und sie können gleichzeitig richtig sein. Erstens hängt die genaue Zahl von der Definition ab: je nachdem, ob man nur Altersrentner (rund 2,1) oder alle Rentenbeziehenden zählt und ob man nach Köpfen oder nach dem amtlichen Äquivalenz-Rentnerquotienten der Rentenformel rechnet, fällt sie etwas anders aus. „Zwei“ ist eine faire gerundete Momentaufnahme, keine exakte Konstante. Zweitens tragen nicht allein die Beiträge: 2024 kamen rund 76 Prozent der Einnahmen aus Beiträgen, aber rund ein Viertel — etwa 93 Milliarden Euro — aus Steuern (Bundeszuschuss), unter anderem als Ausgleich für versicherungsfremde Leistungen. Drittens zählt die Kennzahl Köpfe, nicht Beiträge pro Kopf: Löhne und Produktivität steigen über die Zeit, weshalb das reine Kopf-Verhältnis die Last tendenziell überzeichnet. Die Demografie verschärft sie dennoch real.',
    ),
    block('h2', 'Was die Annahmen versprechen'),
    block(
      'normal',
      'Politik reagiert mit mehreren Stellschrauben. Das Rentenpaket 2025 hält das Rentenniveau — das Verhältnis einer Standardrente zum Durchschnittslohn — bis 2031 bei 48 Prozent; danach sinkt es laut Projektion bis 2039 auf 46,3 Prozent. Zugleich steigt der Beitragssatz von 18,6 auf 21,2 Prozent. Stabiles Niveau, höhere Beiträge und ein wachsender Steuerzuschuss greifen also ineinander. Den Rest trägt der Bund: Rund ein Viertel der Renteneinnahmen — über 100 Milliarden Euro im Jahr — kommt aus Steuern und ist einer der größten Posten im Bundeshaushalt.',
    ),
    renteHebelLinie,
    block('h2', 'Die Lücke und die drei Säulen'),
    block(
      'normal',
      'Die Haltelinie sichert das Niveau — aber befristet, und ein gehaltenes Niveau bedeutet nicht gleichbleibende Kaufkraft: Das Rentenniveau misst die Standardrente am Durchschnittslohn, nicht an den eigenen Lebenshaltungskosten. Sinkt es langfristig, öffnet sich eine Versorgungslücke — die gesetzliche Rente ersetzt dann einen kleineren Teil des früheren Einkommens. Genau hier setzt das Drei-Säulen-Modell an: gesetzliche (erste), betriebliche (zweite) und private (dritte) Vorsorge sollen das Alterseinkommen gemeinsam tragen.',
    ),
    block(
      'normal',
      'Die Bundesregierung stärkt 2025/26 alle drei Säulen. Für die gesetzliche das Rentenpaket mit der 48-Prozent-Haltelinie; für die betriebliche das Zweite Betriebsrentenstärkungsgesetz (Dezember 2025); für die private die Frühstart-Rente — ab 2026 zahlt der Staat für jedes Schulkind von 6 bis 18 zehn Euro im Monat in ein privates, kapitalgedecktes Altersvorsorgedepot —, flankiert vom Altersvorsorgereformgesetz, das die geförderte private Vorsorge günstiger und renditeorientierter machen soll.',
    ),
    block(
      'normal',
      'Die Logik dahinter: Was die umlagefinanzierte Rente demografisch nicht mehr allein stemmen kann, soll Kapitaldeckung ergänzen — Geld, das am Kapitalmarkt mitwächst, statt von immer weniger Beitragszahlern aufgebracht zu werden. Die Grenzen sind ebenso real: Kapitalmärkte schwanken und kennen keine Garantie; wer wenig verdient, kann wenig zurücklegen — und bei der Frühstart-Rente endet die staatliche Einzahlung mit 18. Je mehr Gewicht von der ersten auf die dritte Säule wandert, desto stärker hängt die Alterssicherung am individuellen Sparvermögen. Ob die ergänzende Vorsorge die Lücke schließt oder die Ungleichheit im Alter vergrößert, ist offen — und der Kern der Debatte.',
    ),
    block('h2', 'Wie darüber gestritten wird'),
    block(
      'normal',
      'Über die Diagnose herrscht weithin Einigkeit, über die Verteilung der Lasten nicht. Höheres oder niedrigeres Niveau, späteres Eintrittsalter, mehr kapitalgedeckte Vorsorge, ein größerer Steuerzuschuss — die folgenden Stimmen spannen das Feld auf.',
    ),
    renteDiskurs,
    {
      _type: 'quellenNote',
      _key: key(),
      text: 'Daten: Statistisches Bundesamt (16. koordinierte Bevölkerungsvorausberechnung; Altenquotient eigene Berechnung aus GENESIS-Tabelle 12421-0002), Deutsche Rentenversicherung („Rentenversicherung in Zahlen 2025“), Demografieportal des BiB, IW Köln und Rentenversicherungsbericht 2025 (Bundesregierung/BMAS). Zitat Friedrich Merz: DGB-Bundeskongress, Mai 2026 (Der Tagesspiegel). Positionen paraphrasiert nach Bundesregierung/BMF, Deutscher Rentenversicherung, IW Köln, Sozialverband VdK, Wissenschaftlichem Beirat beim BMWK und Wirtschaftsdienst (ZBW). Definitions- und Modellhinweise siehe Methodik.',
      quelle: { titel: 'Rentenversicherungsbericht 2025', url: 'https://www.bundesregierung.de/breg-de/aktuelles/rentenbericht-2025-2394260' },
    },
  ],
};

const klimaEmissionenLinie: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Halbe Strecke geschafft — der steilere Teil liegt vor uns',
    typ: 'linie',
    beschreibung:
      'Liniendiagramm der deutschen Treibhausgasemissionen (ohne LULUCF, in Mt CO2-Äquivalent) von 1990 bis 2024 sowie der gesetzlichen Zielmarken. Die tatsächlichen Emissionen sinken von 1.252 Mt (1990) auf 649 Mt (2024) — ein Rückgang um 48 %. Zwischenwerte: 741 Mt (2020), 749 Mt (2022, leichter Wiederanstieg), 672 Mt (2023). Die zweite Linie zeigt die gesetzlichen Zielmarken des Klimaschutzgesetzes ausgehend von 2024: 438 Mt bis 2030 (−65 % ggü. 1990) und 150 Mt bis 2040 (−88 %); bis 2045 gilt Netto-Treibhausgasneutralität. Bis 2024 wurde knapp die Hälfte erreicht; die verbleibende Strecke bis 2030 und 2040 ist deutlich steiler als der bisherige Pfad.',
    caption:
      'Treibhausgasemissionen Deutschlands 1990–2024 (ohne LULUCF) und die gesetzlichen Zielmarken, in Mt CO2-Äquivalent. Quelle: Umweltbundesamt (finale Daten 2024); Zielmarken nach Bundes-Klimaschutzgesetz (§ 3).',
    encoding: { xFeld: 'jahr', yFeld: 'mt', serieFeld: 'reihe' },
    datensatz: {
      titel: 'Treibhausgasemissionen Deutschlands und gesetzliche Zielmarken, 1990–2040',
      quelle: {
        titel: 'Umweltbundesamt — Finale Daten für 2024: Emissionen um drei Prozent gesunken',
        url: 'https://www.umweltbundesamt.de/themen/finale-daten-fuer-2024-emissionen-um-drei-prozent',
        herausgeber: 'Umweltbundesamt',
      },
      spalten: [
        { name: 'jahr', typ: 'string' },
        { name: 'reihe', typ: 'string' },
        { name: 'mt', typ: 'number', einheit: 'Mt CO2-Äq.' },
      ],
      daten: [
        { jahr: '1990', reihe: 'Tatsächliche Emissionen', mt: 1252 },
        { jahr: '2020', reihe: 'Tatsächliche Emissionen', mt: 741 },
        { jahr: '2022', reihe: 'Tatsächliche Emissionen', mt: 749 },
        { jahr: '2023', reihe: 'Tatsächliche Emissionen', mt: 672 },
        { jahr: '2024', reihe: 'Tatsächliche Emissionen', mt: 649 },
        { jahr: '2024', reihe: 'Gesetzliche Zielmarke (KSG)', mt: 649 },
        { jahr: '2030', reihe: 'Gesetzliche Zielmarke (KSG)', mt: 438 },
        { jahr: '2040', reihe: 'Gesetzliche Zielmarke (KSG)', mt: 150 },
      ],
    },
  },
};

const klimaSektorenTreemap: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Woher die Emissionen 2024 kamen',
    typ: 'treemap',
    beschreibung:
      'Treemap der deutschen Treibhausgasemissionen 2024 (649 Mt CO2-Äquivalent, ohne LULUCF) nach den Sektoren des Klimaschutzgesetzes. Die Fläche je Kachel entspricht dem Anteil: Energiewirtschaft 185 Mt, Industrie 153 Mt, Verkehr 143,1 Mt, Gebäude 100,5 Mt, Landwirtschaft 62,1 Mt sowie Abfallwirtschaft und Sonstiges 5,4 Mt. Der gesamte Emissionsrückgang gegenüber 2023 (−23 Mt) stammt fast vollständig aus der Energiewirtschaft (−17,6 Mt durch Rekord-Erneuerbare und weniger Kohle); Verkehr (−2,1 Mt) und Gebäude (−2,4 Mt) bewegten sich kaum, die Industrie blieb nahezu konstant.',
    caption:
      'Treibhausgasemissionen Deutschlands 2024 nach KSG-Sektoren, in Mt CO2-Äquivalent (ohne LULUCF). Quelle: Umweltbundesamt / Expertenrat für Klimafragen (Prüfbericht 2025).',
    encoding: { kategorieFeld: 'sektor', yFeld: 'mt' },
    datensatz: {
      titel: 'Treibhausgasemissionen nach KSG-Sektoren 2024',
      quelle: {
        titel: 'Expertenrat für Klimafragen — Prüfbericht zu den Emissionsdaten 2024',
        url: 'https://expertenrat-klima.de/fileadmin/ERK/Berichte/ERK2025_Pruefbericht-Emissionsdaten-2024-Projektionsdaten-2025.pdf',
        herausgeber: 'Expertenrat für Klimafragen',
      },
      spalten: [
        { name: 'sektor', typ: 'string' },
        { name: 'mt', typ: 'number', einheit: 'Mt CO2-Äq.' },
      ],
      daten: [
        { sektor: 'Energiewirtschaft', mt: 185.0, beschreibung: 'Strom- und Fernwärmeerzeugung in Kraftwerken (Kohle, Gas) sowie Raffinerien.' },
        { sektor: 'Industrie', mt: 153.0, beschreibung: 'Prozess- und Energieemissionen der Industrie (u. a. Stahl, Chemie, Zement).' },
        { sektor: 'Verkehr', mt: 143.1, beschreibung: 'Vor allem Straßenverkehr, dazu Schiene, Binnenschifffahrt und inländischer Luftverkehr (ohne internationalen Flug- und Seeverkehr).' },
        { sektor: 'Gebäude', mt: 100.5, beschreibung: 'Heizen und Warmwasser in Wohn- und Nichtwohngebäuden (vor allem Öl- und Gasheizungen).' },
        { sektor: 'Landwirtschaft', mt: 62.1, beschreibung: 'Methan aus der Tierhaltung, Lachgas aus der Düngung und landwirtschaftliche Böden.' },
        { sektor: 'Abfall & Sonstiges', mt: 5.4, beschreibung: 'Abfallwirtschaft (Deponien, Abwasser) und weitere kleine Quellen.' },
      ],
    },
  },
};

const klimaDiskurs: BodyBlock = {
  _type: 'diskursBlock',
  _key: key(),
  titel: 'Wie über den Klimakurs gestritten wird',
  frage: 'Ist Deutschland auf Kurs — oder verdeckt der Gesamtrückgang, dass die schwierigen Sektoren stehenbleiben?',
  einleitung:
    'Dass die Emissionen 2024 auf 649 Mt gesunken sind (−48 % gegenüber 1990), ist unstrittig. Umstritten ist die Deutung: Reicht das Tempo, woher kommt der Rückgang — und tragen alle Sektoren ihren Teil? Ausgewählte Stimmen (paraphrasiert, mit Quelle):',
  perspektiven: [
    {
      label: 'Umweltbundesamt (finale Daten 2024)',
      aussage:
        'Die Emissionen sind 2024 um 3,4 % auf 649 Mt gesunken und liegen damit 48 % unter dem Niveau von 1990. Getragen werde der Rückgang vor allem vom Ausbau der Erneuerbaren und dem Rückgang der Kohleverstromung; das Klimaziel für 2030 sei erreichbar.',
      quelle: {
        titel: 'Finale Daten für 2024: Emissionen um drei Prozent gesunken',
        url: 'https://www.umweltbundesamt.de/themen/finale-daten-fuer-2024-emissionen-um-drei-prozent',
        herausgeber: 'Umweltbundesamt',
      },
    },
    {
      label: 'Expertenrat für Klimafragen',
      aussage:
        'Das Gesamtbudget der Jahre 2021 bis 2030 werde laut Projektion eingehalten (Puffer rund 81 Mt). Zugleich überschritten Verkehr und Gebäude 2024 erneut ihre Jahresbudgets, stärker als im Vorjahr; die projizierte Minderung erreicht bis 2030 etwa 63 % statt der gesetzlichen 65 %, und das 2040-Ziel (−88 %) werde deutlich verfehlt.',
      quelle: {
        titel: 'Prüfbericht zu den Emissionsdaten 2024 und Projektionsdaten 2025',
        url: 'https://expertenrat-klima.de/fileadmin/ERK/Berichte/ERK2025_Pruefbericht-Emissionsdaten-2024-Projektionsdaten-2025.pdf',
        herausgeber: 'Expertenrat für Klimafragen',
      },
    },
    {
      label: 'Agora Energiewende',
      aussage:
        'Über 80 % des Rückgangs 2024 entfielen auf die Energiewirtschaft (Rekord-Erneuerbare, weniger Kohle). Strukturell habe sich wenig bewegt: Der Verkehrsrückgang sei vor allem konjunkturell, der Wärmepumpen-Absatz fiel um 44 %, die Sanierungsrate erreichte einen Tiefstand. National werde das Jahresziel gehalten, die EU-Vorgaben für Verkehr und Gebäude aber verfehlt.',
      quelle: {
        titel: 'Die Energiewende in Deutschland: Stand der Dinge 2024',
        url: 'https://www.agora-energiewende.de/publikationen/die-energiewende-in-deutschland-stand-der-dinge-2024',
        herausgeber: 'Agora Energiewende',
      },
    },
    {
      label: 'Wirtschaft (DIHK / Verbände)',
      aussage:
        'Ein starrer Zeitplan aus jahres- und sektorscharfen Vorgaben erzeuge vor allem Bürokratie und unnötige Kosten. Gefragt seien Technologieoffenheit, planbare Rahmenbedingungen und bezahlbare Energie; ein Teil des Rückgangs sei zudem Folge schwacher Konjunktur, nicht nur der Klimapolitik.',
      quelle: {
        titel: 'Klimaschutzprogramm — Stimmen aus Wirtschaft und Verbänden',
        url: 'https://www.haufe.de/sustainability/debatte/klimaschutzprogramm-stimmen-aus-wirtschaft-und-verbaenden_575768_680760.html',
        herausgeber: 'Haufe (Übersicht)',
      },
    },
    {
      label: 'Deutsche Umwelthilfe',
      aussage:
        'Das Tempo reiche nicht: Die Ziele für 2030 und 2040 würden ohne sofortige Nachsteuerung deutlich verfehlt, vor allem wegen Verkehr und Gebäuden. Die Novelle des Klimaschutzgesetzes — der Wegfall verbindlicher Jahres- und Sektorziele — verschleiere die Verantwortung; nötig sei ein wirksames Sofortprogramm.',
      quelle: {
        titel: 'Klimaziele 2030 und 2040 werden deutlich verfehlt — DUH fordert sofortige Nachsteuerung',
        url: 'https://www.duh.de/presse/pressemitteilungen/pressemitteilung/klimaziele-2030-und-2040-werden-deutlich-verfehlt-deutsche-umwelthilfe-fordert-sofortige-nachsteuer/',
        herausgeber: 'Deutsche Umwelthilfe',
      },
    },
  ],
  einordnung:
    'Mehreres ist zugleich richtig: Deutschland hat fast die Hälfte seiner Emissionen abgebaut und hält das kumulierte Budget bis 2030 voraussichtlich ein — und genau dieser Erfolg stammt fast nur aus dem Stromsektor. Verkehr und Gebäude verfehlen ihre Beiträge dauerhaft, ein Teil des jüngsten Rückgangs ist konjunkturell, und die Ziele für 2040 und die Neutralität 2045 liegen auf dem heutigen Pfad außer Reichweite. Der einfache Teil — den Strom sauberer zu machen — ist weitgehend gehoben; der schwierigere — Heizen und Verkehr — steht noch aus.',
};

const klimaArticle: Article = {
  _id: 'seed-klima',
  titel: 'Deutschlands Treibhausgase: 48 Prozent geschafft, der schwerere Teil kommt noch',
  slug: 'treibhausgase-und-klimaziele',
  ressort: 'umwelt',
  standfirst:
    'Deutschland hat seine Treibhausgase seit 1990 fast halbiert: 2024 lagen sie bei 649 Millionen Tonnen, 48 Prozent unter dem Ausgangswert. Doch der Rückgang stammt fast vollständig aus dem Stromsektor, während Verkehr und Gebäude ihre Ziele verfehlen. Die echten Zahlen zeigen, was erreicht wurde, woher es kam — und wie steil der Weg zu den gesetzlichen Zielen 2030 und 2040 noch ist.',
  veroeffentlicht: '2026-06-02',
  themen: [{ name: 'Klima', slug: 'klima' }],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Datenquellen: Umweltbundesamt (Nationales Treibhausgasinventar, finale Daten 2024, veröffentlicht 14.03.2025) und Expertenrat für Klimafragen (Prüfbericht zu den Emissionsdaten 2024 und Projektionsdaten 2025, Mai 2025). Alle Emissionswerte sind Treibhausgase ohne den Sektor LULUCF (Landnutzung), in Mt CO2-Äquivalent nach den Sektoren des Bundes-Klimaschutzgesetzes (KSG). Die Jahreswerte der Linie stammen aus einer konsistenten UBA-Reihe: 1990 = 1.252, 2020 = 741 (−40,8 % ggü. 1990), 2022 = 749, 2023 = 672, 2024 = 649 (−48,2 %); der Pfad zwischen 1990 und 2020 verlief nicht linear (Plateau in den 2000er-Jahren, beschleunigte Minderung ab etwa 2018). Werte anderer Buchungssysteme (z. B. die Umweltökonomischen Gesamtrechnungen von Destatis) weichen ab und werden hier nicht gemischt. Die Zielmarken sind die gesetzlichen Zielwerte des KSG (§ 3): −65 % bis 2030 (≈ 438 Mt), −88 % bis 2040 (≈ 150 Mt), Netto-Treibhausgasneutralität bis 2045; die Verbindungslinie zwischen den Zielmarken ist illustrativ, nicht als jährliches Budget zu lesen. Die Sektorwerte 2024 (Energiewirtschaft 185, Industrie 153, Verkehr 143,1, Gebäude 100,5, Landwirtschaft 62,1, Abfall & Sonstiges 5,4) summieren sich auf 649,1 Mt und stammen aus dem Prüfbericht des Expertenrats (Tabelle 4); LULUCF (51,3 Mt Senke) ist nicht enthalten. Projektionen sind Modellrechnungen unter Annahmen, keine Prognosen. Positionen (Stand 2025) sind paraphrasiert und bequellt.',
  body: [
    block('h2', 'Worum es geht'),
    block(
      'normal',
      'Deutschland hat sich im Klimaschutzgesetz gesetzlich auf Ziele festgelegt: die Treibhausgase bis 2030 um 65 Prozent gegenüber 1990 zu senken, bis 2040 um 88 Prozent — und bis 2045 netto klimaneutral zu werden. Die finalen Zahlen für 2024 sind ein guter Anlass, nüchtern zu prüfen: Wo steht das Land auf diesem Weg?',
    ),
    block(
      'normal',
      '2024 lagen die Emissionen bei 649 Millionen Tonnen CO2-Äquivalent — 3,4 Prozent weniger als 2023 und 48 Prozent unter dem Wert von 1990. Knapp die Hälfte der Strecke ist also geschafft. Drei Fragen führen durch den Beitrag: Wie weit ist Deutschland gekommen? Woher kam der Rückgang? Und worüber wird gestritten?',
    ),
    block('h2', 'Fast die Hälfte geschafft'),
    block(
      'normal',
      'Seit 1990 sind die Emissionen von rund 1.252 auf 649 Millionen Tonnen gefallen. Der Weg dahin war nicht gleichmäßig: Nach einem langen Plateau in den 2000er-Jahren beschleunigte sich die Minderung ab etwa 2018, mit einem kleinen Wiederanstieg nach der Pandemie. Die folgende Linie zeigt den bisherigen Pfad — und daneben, wie steil es bis zu den gesetzlichen Zielmarken 2030 und 2040 weitergehen müsste.',
    ),
    klimaEmissionenLinie,
    block('h2', 'Woher der Rückgang kam'),
    block(
      'normal',
      'Der gesamte Rückgang gegenüber 2023 — 23 Millionen Tonnen — stammt fast vollständig aus einem einzigen Sektor: der Energiewirtschaft (−17,6 Mt), getragen von Rekord-Erneuerbaren und weniger Kohlestrom. Verkehr (−2,1 Mt) und Gebäude (−2,4 Mt) bewegten sich kaum, die Industrie blieb nahezu konstant. Die Treemap zeigt, wie sich die 649 Millionen Tonnen 2024 auf die Sektoren verteilen.',
    ),
    klimaSektorenTreemap,
    block(
      'normal',
      'Das ist der Kern der Debatte: Der einfache Hebel — sauberer Strom — ist weitgehend gezogen. Die verbleibenden großen Brocken liegen im Verkehr und in den Gebäuden, wo sich am wenigsten bewegt. Genau dort entscheidet sich, ob die Ziele für 2030 und 2040 erreichbar bleiben.',
    ),
    block('h2', 'Wie darüber gestritten wird'),
    block(
      'normal',
      'Über die Zahlen herrscht Einigkeit, über ihre Deutung nicht. Ist Deutschland auf Kurs, weil das Dekadenbudget eingehalten wird — oder neben der Spur, weil die schwierigen Sektoren stehenbleiben und das 2040-Ziel außer Reichweite gerät? Die folgenden Stimmen spannen das Feld auf.',
    ),
    klimaDiskurs,
    {
      _type: 'quellenNote',
      _key: key(),
      text: 'Daten: Umweltbundesamt (finale Daten 2024, Nationales Treibhausgasinventar) und Expertenrat für Klimafragen (Prüfbericht 2025). Alle Werte ohne LULUCF, in Mt CO2-Äquivalent. Zielmarken nach Bundes-Klimaschutzgesetz (§ 3). Positionen paraphrasiert nach Umweltbundesamt, Expertenrat für Klimafragen, Agora Energiewende, DIHK/Wirtschaftsverbänden und Deutscher Umwelthilfe. Methoden- und Definitionshinweise siehe Methodik.',
      quelle: {
        titel: 'Umweltbundesamt — Finale Daten für 2024',
        url: 'https://www.umweltbundesamt.de/themen/finale-daten-fuer-2024-emissionen-um-drei-prozent',
      },
    },
  ],
};

const merzSozialstaatZitat: BodyBlock = {
  _type: 'zitatBlock',
  _key: key(),
  zitat:
    'Der Sozialstaat, wie wir ihn heute haben, ist mit dem, was wir erwirtschaften, nicht mehr finanzierbar.',
  quelle: {
    titel: 'Friedrich Merz (Bundeskanzler), CDU-Landesparteitag Osnabrück, August 2025',
    url: 'https://www.zdfheute.de/politik/sozialstaat-debatte-unbezahlbar-merz-kritik-100.html',
    herausgeber: 'ZDFheute',
  },
  imHero: true,
  heroEyebrow: 'Aus der Sozialstaatsdebatte',
};

const benteleZitat: BodyBlock = {
  _type: 'zitatBlock',
  _key: key(),
  zitat: 'Der Sozialstaat ist nicht das Problem, er ist die Lösung.',
  quelle: {
    titel: 'Verena Bentele (VdK-Präsidentin), sozialpolitisches Forum des VdK Bayern, 2025',
    url: 'https://bayern.vdk.de/unsere-angebote/aktuelle-meldung/der-sozialstaat-ist-die-loesung/',
    herausgeber: 'Sozialverband VdK Bayern',
  },
  imHero: true,
  heroEyebrow: 'Aus der Sozialstaatsdebatte',
};

const sozialquoteLinie: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Leicht über dem EU-Schnitt — und im selben Takt',
    typ: 'linie',
    beschreibung:
      'Liniendiagramm der Ausgaben für Sozialschutz in Prozent des Bruttoinlandsprodukts (Eurostat, ESSPROS — identisches Maß für beide Reihen), Deutschland und der EU-27-Durchschnitt, 2013–2023. Deutschland liegt über den gesamten Zeitraum etwa ein bis zwei Prozentpunkte über dem EU-27-Schnitt (2023: 29,9 gegenüber 27,8 Prozent), folgt aber demselben Muster: Beide steigen 2020 sprunghaft (Corona-Krise — die Wirtschaftsleistung brach ein, die Ausgaben stiegen) und normalisieren sich danach. Der deutsche Wert ist also etwas höher, aber nicht vom europäischen Trend abgekoppelt. Die etwas breiter gefasste nationale Sozialleistungsquote (Sozialbudget) liegt nochmals rund einen Punkt höher: 31,2 Prozent für 2024.',
    caption:
      'Ausgaben für Sozialschutz in % des BIP, Deutschland und EU-27-Durchschnitt, 2013–2023 (Eurostat, ESSPROS, identisches Maß). Der gemeinsame Sprung 2020 ist ein Krisen-Sondereffekt. Quelle: Eurostat (tps00098).',
    encoding: { xFeld: 'jahr', yFeld: 'quote', serieFeld: 'reihe' },
    datensatz: {
      titel: 'Ausgaben für Sozialschutz in % des BIP — Deutschland und EU-27, 2013–2023 (Eurostat ESSPROS)',
      quelle: {
        titel: 'Eurostat — Ausgaben für Sozialschutz in % des BIP (ESSPROS, tps00098)',
        url: 'https://ec.europa.eu/eurostat/databrowser/view/tps00098/default/table',
        herausgeber: 'Eurostat',
      },
      spalten: [
        { name: 'jahr', typ: 'string' },
        { name: 'reihe', typ: 'string' },
        { name: 'quote', typ: 'number', einheit: '% des BIP' },
      ],
      daten: [
        { jahr: '2013', reihe: 'Deutschland', quote: 28.7 },
        { jahr: '2014', reihe: 'Deutschland', quote: 28.6 },
        { jahr: '2015', reihe: 'Deutschland', quote: 28.9 },
        { jahr: '2016', reihe: 'Deutschland', quote: 29.2 },
        { jahr: '2017', reihe: 'Deutschland', quote: 29.0 },
        { jahr: '2018', reihe: 'Deutschland', quote: 29.2 },
        { jahr: '2019', reihe: 'Deutschland', quote: 29.6 },
        { jahr: '2020', reihe: 'Deutschland', quote: 32.5 },
        { jahr: '2021', reihe: 'Deutschland', quote: 31.5 },
        { jahr: '2022', reihe: 'Deutschland', quote: 29.9 },
        { jahr: '2023', reihe: 'Deutschland', quote: 29.9 },
        { jahr: '2013', reihe: 'EU-27', quote: 28.8 },
        { jahr: '2014', reihe: 'EU-27', quote: 28.7 },
        { jahr: '2015', reihe: 'EU-27', quote: 28.3 },
        { jahr: '2016', reihe: 'EU-27', quote: 28.3 },
        { jahr: '2017', reihe: 'EU-27', quote: 27.9 },
        { jahr: '2018', reihe: 'EU-27', quote: 27.7 },
        { jahr: '2019', reihe: 'EU-27', quote: 27.8 },
        { jahr: '2020', reihe: 'EU-27', quote: 31.5 },
        { jahr: '2021', reihe: 'EU-27', quote: 29.8 },
        { jahr: '2022', reihe: 'EU-27', quote: 27.9 },
        { jahr: '2023', reihe: 'EU-27', quote: 27.8 },
      ],
    },
  },
};

const sozialbudgetTreemap: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Vor allem Alter und Gesundheit — kaum Arbeitslosigkeit',
    typ: 'treemap',
    beschreibung:
      'Treemap des Sozialbudgets 2022 nach Funktionen (rund 1.179 Milliarden Euro). Die Fläche je Kachel entspricht dem Anteil: Alter und Hinterbliebene (Renten) 475 Mrd. Euro, Krankheit und Invalidität (Gesundheit, Pflege, Erwerbsminderung) 459 Mrd., Familie und Kinder 126 Mrd., Arbeitslosigkeit 58 Mrd., Wohnen und allgemeine Lebenshilfe 25 Mrd. sowie Verwaltung und Sonstiges 36 Mrd. Allein Alter und Gesundheit machen rund vier Fünftel aus; die oft im Zentrum der Debatte stehende Arbeitslosigkeit ist mit rund fünf Prozent ein kleiner Posten. Der Sozialstaat ist damit vor allem von Demografie und Gesundheitskosten getrieben.',
    caption:
      'Sozialbudget 2022 nach Funktionen, in Mrd. Euro. Alter und Gesundheit dominieren; Arbeitslosigkeit ist ein kleiner Teil. Quelle: BMAS, Sozialbudget (nach Funktionen).',
    encoding: { kategorieFeld: 'funktion', yFeld: 'mrd' },
    datensatz: {
      titel: 'Sozialbudget 2022 nach Funktionen',
      quelle: {
        titel: 'Bundesministerium für Arbeit und Soziales — Sozialbudget',
        url: 'https://www.bmas.de/DE/Service/Publikationen/Broschueren/a230-25-sozialbudget-2024.html',
        herausgeber: 'BMAS',
      },
      spalten: [
        { name: 'funktion', typ: 'string' },
        { name: 'mrd', typ: 'number', einheit: 'Mrd. Euro' },
      ],
      daten: [
        {
          funktion: 'Alter & Hinterbliebene',
          mrd: 475,
          beschreibung:
            'Vor allem die gesetzlichen Altersrenten, dazu Beamtenpensionen, betriebliche Altersversorgung und Hinterbliebenenrenten (Witwen-, Witwer- und Waisenrenten).',
        },
        {
          funktion: 'Krankheit & Invalidität',
          mrd: 459,
          beschreibung:
            'Gesetzliche und private Krankenversicherung, Pflegeversicherung, Lohnfortzahlung im Krankheitsfall sowie Renten wegen Erwerbsminderung und Leistungen zur Rehabilitation.',
        },
        {
          funktion: 'Familie & Kinder',
          mrd: 126,
          beschreibung:
            'Kindergeld und Kinderfreibeträge, Elterngeld, Kinderzuschlag, Mutterschaftsleistungen und die Förderung der Kinderbetreuung.',
        },
        {
          funktion: 'Arbeitslosigkeit',
          mrd: 58,
          beschreibung:
            'Arbeitslosengeld, Bürgergeld (Grundsicherung für Arbeitsuchende), Kurzarbeitergeld und Maßnahmen der Arbeitsförderung.',
        },
        {
          funktion: 'Wohnen & Lebenshilfe',
          mrd: 25,
          beschreibung:
            'Wohngeld, Grundsicherung im Alter und bei Erwerbsminderung sowie Sozialhilfe und allgemeine Fürsorgeleistungen.',
        },
        {
          funktion: 'Verwaltung & Sonstiges',
          mrd: 36,
          beschreibung:
            'Verwaltungskosten der Sozialversicherungs- und Fürsorgesysteme sowie sonstige, nicht direkt zuordenbare Leistungen.',
        },
      ],
    },
  },
};

const sozialBeeswarm: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Über dem EU-Schnitt, aber kein Spitzenreiter',
    typ: 'beeswarm',
    beschreibung:
      'Beeswarm-Diagramm: Ausgaben für Sozialschutz in Prozent des BIP 2023 (Eurostat) für 30 europäische Staaten, je ein Punkt pro Land. Deutschland liegt mit 29,9 Prozent über dem EU-Durchschnitt (27,8 Prozent, gestrichelte Linie), aber klar hinter den höchsten: Frankreich 33,8, Finnland 31,8, Österreich 30,6. Mehrere dieser Hochausgaben-Länder sind wirtschaftlich stark — ein einfacher Umkehrschluss „weniger Sozialausgaben gleich mehr Wirtschaftskraft“ lässt sich aus der Verteilung nicht ablesen. Am unteren Ende liegen Irland (12,6; durch die BIP-Verzerrung ein Sonderfall) und osteuropäische Staaten.',
    caption:
      'Ausgaben für Sozialschutz in % des BIP 2023, je ein Punkt pro Land (EU- und EFTA-Staaten). Deutschland (hervorgehoben) liegt bei 29,9 %, über dem EU-Schnitt (27,8 %). Quelle: Eurostat (ESSPROS).',
    encoding: {
      xFeld: '% des BIP (2023)',
      yFeld: 'quote',
      kategorieFeld: 'land',
      highlight: 'Deutschland',
      refWert: 27.8,
      refLabel: 'EU-Durchschnitt 27,8 %',
    },
    datensatz: {
      titel: 'Ausgaben für Sozialschutz in % des BIP 2023, europäische Staaten (Eurostat)',
      quelle: {
        titel: 'Eurostat — Ausgaben für Sozialschutz in % des BIP (ESSPROS), 2023',
        url: 'https://ec.europa.eu/eurostat/de/web/social-protection',
        herausgeber: 'Eurostat',
      },
      spalten: [
        { name: 'land', typ: 'string' },
        { name: 'quote', typ: 'number', einheit: '% BIP' },
      ],
      daten: [
        { land: 'Frankreich', quote: 33.8 },
        { land: 'Finnland', quote: 31.8 },
        { land: 'Österreich', quote: 30.6 },
        { land: 'Deutschland', quote: 29.9 },
        { land: 'Dänemark', quote: 29.3 },
        { land: 'Belgien', quote: 28.9 },
        { land: 'Italien', quote: 28.8 },
        { land: 'Schweden', quote: 27.9 },
        { land: 'Niederlande', quote: 27.6 },
        { land: 'Schweiz', quote: 27.5 },
        { land: 'Spanien', quote: 25.5 },
        { land: 'Island', quote: 25.4 },
        { land: 'Norwegen', quote: 23.9 },
        { land: 'Griechenland', quote: 23.6 },
        { land: 'Portugal', quote: 23.4 },
        { land: 'Slowenien', quote: 23.1 },
        { land: 'Luxemburg', quote: 22.5 },
        { land: 'Polen', quote: 22.5 },
        { land: 'Tschechien', quote: 20.7 },
        { land: 'Kroatien', quote: 20.3 },
        { land: 'Slowakei', quote: 19.9 },
        { land: 'Bulgarien', quote: 19.4 },
        { land: 'Zypern', quote: 19.2 },
        { land: 'Lettland', quote: 17.9 },
        { land: 'Estland', quote: 17.3 },
        { land: 'Litauen', quote: 17.0 },
        { land: 'Ungarn', quote: 16.8 },
        { land: 'Rumänien', quote: 16.6 },
        { land: 'Malta', quote: 13.2 },
        { land: 'Irland', quote: 12.6 },
      ],
    },
  },
};

const sozialbeitragLinie: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Der Sozialbeitrag steigt — Richtung 50 Prozent',
    typ: 'linie',
    beschreibung:
      'Liniendiagramm des Gesamtsozialversicherungsbeitrags (Summe der Beitragssätze für Rente, Kranken- inkl. durchschnittlichem Zusatzbeitrag, Pflege- und Arbeitslosenversicherung) in Prozent des Bruttolohns. Über zwei Jahrzehnte lag er stabil um 40 Prozent (2000: 41,0; 2010: 39,6; 2020: 40,0). Seit 2023 steigt er spürbar — 2025 auf 42,3 Prozent, über die 40-Prozent-Marke, die Arbeitgeber und Regierung als Obergrenze nennen. Eine als Projektion ausgewiesene Reihe folgt einer Modellrechnung der vbw bis 2035: rund 49,7 Prozent, getrieben von der Alterung. Weil Arbeitgeber und Beschäftigte den Satz je zur Hälfte tragen, ist genau das der Druckpunkt der Debatte um Lohnzusatzkosten.',
    caption:
      'Gesamtsozialversicherungsbeitrag (Rente + Kranken inkl. Zusatzbeitrag + Pflege + Arbeitslosen), in % des Bruttolohns. Beobachtet bis 2025, Projektion bis 2035. Quelle: sozialpolitik-aktuell (beobachtet); vbw-Studie 2025 (Projektion).',
    encoding: { xFeld: 'jahr', yFeld: 'satz', serieFeld: 'reihe', gestrichelteReihen: ['Projektion'] },
    datensatz: {
      titel: 'Gesamtsozialversicherungsbeitragssatz, 2000–2035 (beobachtet + Projektion)',
      quelle: {
        titel:
          'sozialpolitik-aktuell.de (beobachtet); vbw — Sozialversicherung und Lohnzusatzkosten 2025 (Projektion 2035)',
        url: 'https://www.sozialpolitik-aktuell.de/finanzierung-datensammlung.html',
        herausgeber: 'sozialpolitik-aktuell / vbw',
      },
      spalten: [
        { name: 'jahr', typ: 'string' },
        { name: 'reihe', typ: 'string' },
        { name: 'satz', typ: 'number', einheit: '% des Bruttolohns' },
      ],
      daten: [
        { jahr: '2000', reihe: 'Beobachtet', satz: 41.0 },
        { jahr: '2010', reihe: 'Beobachtet', satz: 39.6 },
        { jahr: '2020', reihe: 'Beobachtet', satz: 40.0 },
        { jahr: '2025', reihe: 'Beobachtet', satz: 42.3 },
        { jahr: '2025', reihe: 'Projektion', satz: 42.3 },
        { jahr: '2035', reihe: 'Projektion', satz: 49.7 },
      ],
    },
  },
};

const sozialDiskurs: BodyBlock = {
  _type: 'diskursBlock',
  _key: key(),
  titel: 'Bremst der Sozialstaat die Wirtschaft, oder stützt er sie?',
  frage: 'Schwächt ein großzügiger Sozialstaat die Wirtschaft, oder ist er Voraussetzung für ihre Stabilität?',
  einleitung:
    'Dass der Sozialstaat unter demografischem und fiskalischem Druck steht, ist unstrittig; umstritten ist seine Wirkung auf die Wirtschaft — und ob die Antwort Kürzung, Reform oder Ausbau heißt. Der Streit läuft seit 2025 mitten durch die Koalition aus CDU/CSU und SPD. Ausgewählte Stimmen (paraphrasiert, mit Quelle):',
  perspektiven: [
    {
      label: 'CDU/CSU (Bundeskanzler Merz)',
      aussage:
        'Der Sozialstaat sei in seiner heutigen Form mit der Wirtschaftsleistung nicht mehr finanzierbar; nötig seien Strukturreformen, damit sich Arbeit stärker lohnt und die Lohnzusatzkosten nicht weiter steigen.',
      quelle: {
        titel: 'Sozialstaat-Debatte: Ist der Sozialstaat wirklich zu teuer?',
        url: 'https://www.zdfheute.de/politik/sozialstaat-debatte-unbezahlbar-merz-kritik-100.html',
        herausgeber: 'ZDFheute',
      },
    },
    {
      label: 'SPD (Vizekanzler Klingbeil)',
      aussage:
        'Der Sozialstaat sei ein Fundament der sozialen Marktwirtschaft und habe Deutschland stark gemacht. Reformen seien möglich, ein pauschales Einsparen zweistelliger Milliardenbeträge „am Sozialstaat“ werde es mit der SPD aber nicht geben.',
      quelle: {
        titel: 'Sozialstaat „nicht finanzierbar“: Merz fordert Reformen, SPD blockiert',
        url: 'https://de.euronews.com/2025/08/25/sozialstaat-merz-reformen-spd-union',
        herausgeber: 'Euronews',
      },
    },
    {
      label: 'Arbeitgeber (BDA)',
      aussage:
        'Die Sozialbeiträge müssten unter 40 Prozent gehalten werden; hohe Lohnzusatzkosten verteuerten Arbeit, bremsten Beschäftigung und Investitionen und schwächten so die Wettbewerbsfähigkeit.',
      quelle: {
        titel: 'Bundesvereinigung der Deutschen Arbeitgeberverbände — Soziale Sicherung',
        url: 'https://www.arbeitgeber.de/themen/soziale-sicherung/',
        herausgeber: 'BDA',
      },
    },
    {
      label: 'Institut der deutschen Wirtschaft (IW)',
      aussage:
        'Ohne Strukturreformen sei der Sozialstaat angesichts der alternden Bevölkerung nicht tragfähig; entscheidend seien wirksame Arbeitsanreize, mehr Beschäftigung und Effizienz statt immer höherer Beiträge und Zuschüsse.',
      quelle: {
        titel: 'IW Köln — Sozialstaat und Sozialausgaben',
        url: 'https://www.iwkoeln.de/themen/sozialstaat.html',
        herausgeber: 'IW Köln',
      },
    },
    {
      label: 'Hans-Böckler-Stiftung / DGB',
      aussage:
        'Ein Datencheck zeige: Deutschlands Sozialausgaben lägen im internationalen Vergleich im Mittelfeld und seien nicht „aufgebläht“. Der Sozialstaat stabilisiere Nachfrage und Gesellschaft; Kürzungen träfen vor allem die Schwächeren und schwächten die Konjunktur in Krisen.',
      quelle: {
        titel: 'Die Mär vom aufgeblähten Sozialstaat',
        url: 'https://www.boeckler.de/de/boeckler-impuls-die-mar-vom-aufgeblahten-sozialstaat-57956.htm',
        herausgeber: 'Hans-Böckler-Stiftung',
      },
    },
    {
      label: 'Sozialverbände (Der Paritätische)',
      aussage:
        'Deutschland sei kein „Spitzenreiter“ bei den Sozialausgaben. Leistungskürzungen verschärften Armut, ohne die strukturellen Kostentreiber — Demografie und Gesundheit — zu lösen; nötig seien gezielte Reformen und auskömmliche Finanzierung, nicht pauschaler Rückbau.',
      quelle: {
        titel: 'Deutschland — Spitzenreiter bei den Sozialausgaben?',
        url: 'https://www.der-paritaetische.de/alle-meldungen/deutschland-spitzenreiter-bei-den-sozialausgaben/',
        herausgeber: 'Der Paritätische',
      },
    },
  ],
  einordnung:
    'Die Daten ordnen den Streit, entscheiden ihn aber nicht: Der Sozialstaat ist groß, international jedoch nicht außergewöhnlich, und vor allem von Alter und Gesundheit getrieben — also von der Demografie. Ob er die Wirtschaft bremst oder stützt, hängt davon ab, welcher Mechanismus überwiegt: dämpfen hohe Abgaben Leistung und Investitionen, oder sichern Stabilität, Nachfrage und Humankapital das Wachstum? Die empirische Evidenz ist gemischt, und beide Wirkungen können nebeneinander bestehen. Die eigentliche Frage ist deshalb weniger „kürzen oder nicht“, sondern wo, wie und mit welcher Wirkung umgebaut wird.',
};

const sozialstaatArticle: Article = {
  _id: 'seed-sozialstaat',
  titel: 'Sozialstaat: Bremse oder Stütze der Wirtschaft?',
  slug: 'sozialstaat-bremse-oder-stuetze',
  ressort: 'soziales',
  standfirst:
    'Der Sozialstaat kostet rund ein Drittel der Wirtschaftsleistung — und ist zum Streitfall geworden: Die einen sehen eine Wachstumsbremse, die gekürzt gehört, die anderen eine Investition, die die Wirtschaft stabil hält. Beide Seiten haben Zahlen und Argumente. Die echten Daten zeigen, wie groß der Sozialstaat ist, wofür er das Geld ausgibt und wie er international dasteht — und ordnen den Streit neutral ein.',
  veroeffentlicht: '2026-06-03',
  themen: [{ name: 'Wirtschaft', slug: 'wirtschaft' }],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Die Größe des Sozialstaats wird mit unterschiedlichen, leicht abweichenden Kennzahlen gemessen — sie werden hier nicht vermischt: (1) Die nationale Sozialleistungsquote des Sozialbudgets (BMAS) lag 2024 bei 31,2 % des BIP (rund 1.345 Mrd. Euro, vorläufig). (2) Die EU-harmonisierte Eurostat-Quote „Ausgaben für Sozialschutz in % des BIP“ (ESSPROS) ist etwas enger gefasst; für sie werden die Jahresreihe (Deutschland und EU-27-Durchschnitt, 2013–2023, Eurostat-Tabelle tps00098 — identisches Maß für beide) und der europäische Ländervergleich 2023 verwendet. (3) Die OECD-Quote „öffentliche Sozialausgaben“ ist noch enger (Deutschland rund 26,7 %, 2022). Linie: Eurostat/ESSPROS (tps00098), Deutschland und EU-27-Durchschnitt, Jahresreihe 2013–2023; Deutschland liegt durchgängig ein bis zwei Punkte über dem EU-Schnitt; der gemeinsame Wert 2020 (Deutschland 32,5 %, EU-27 31,5 %) ist ein Krisen-Sondereffekt (BIP-Einbruch). Treemap: BMAS-Sozialbudget 2022 nach Funktionen (Summe rund 1.179 Mrd. Euro); „Krankheit & Invalidität“ umfasst Gesundheit, Pflege und Erwerbsminderung. Ländervergleich (Beeswarm): Eurostat 2023, EU- und EFTA-Staaten, Referenzlinie EU-27-Durchschnitt 27,8 %; Irland ist wegen der BIP-Verzerrung ein Sonderfall. Die Wirkung des Sozialstaats auf das Wirtschaftswachstum ist wissenschaftlich umstritten (Anreiz- vs. Stabilisierungs-/Investitionswirkung) und wird hier als Debatte dargestellt, nicht als gesicherte Tatsache. Gesamtsozialversicherungsbeitrag: Summe der Beitragssätze (Rente, Kranken inkl. durchschnittlichem Zusatzbeitrag, Pflege ohne Kinderlosen-Zuschlag, Arbeitslosen) in % des Bruttolohns; beobachtete Stützjahre nach sozialpolitik-aktuell (2025: 42,3 %), Projektion 2035 (rund 49,7 %) nach vbw-Studie 2025 — Arbeitgeber und Beschäftigte tragen je etwa die Hälfte. Zur Wirksamkeit von Beitragssenkungen: Schätzungen zum französischen CICE-Umbau (rund 40.000–70.000 Stellen, etwa 51.000 Euro je Stelle und Jahr, geringer BIP-Effekt). Eine Senkung der Arbeitgeberbeiträge mindert die Einnahmen der Sozialversicherung (Entlastung, keine Einsparung) und erfordert Gegenfinanzierung. Positionen (Stand 2025/2026) sind paraphrasiert und bequellt; das wörtliche Zitat ist belegt.',
  body: [
    block('h2', 'Worum es geht'),
    block(
      'normal',
      'Bundeskanzler Friedrich Merz hat den Streit im August 2025 zugespitzt:',
    ),
    merzSozialstaatZitat,
    block(
      'normal',
      'Sozialverbände widersprechen grundsätzlich. VdK-Präsidentin Verena Bentele dreht die Logik um:',
    ),
    benteleZitat,
    block(
      'normal',
      'Die Aussage traf einen Nerv — und Widerspruch, auch vom Koalitionspartner: SPD-Chef Lars Klingbeil hielt entgegen, man werde nicht „mal eben 30 Milliarden am Sozialstaat sparen“. Hintergrund sind eine Haushaltslücke von rund 30 Milliarden Euro für 2027 und eine Sozialleistungsquote auf Rekordhöhe. Der Streit verläuft damit mitten durch die Regierung. Drei Fragen führen durch den Beitrag: Wie groß ist der Sozialstaat wirklich? Wofür gibt er das Geld aus? Und bremst er die Wirtschaft — oder stützt er sie?',
    ),
    block('h2', 'Wie groß ist der Sozialstaat?'),
    block(
      'normal',
      'Gemessen wird die Größe an der Sozialleistungsquote — dem Anteil aller Sozialausgaben an der Wirtschaftsleistung. Nach dem nationalen Sozialbudget lag sie 2024 bei 31,2 Prozent (rund 1.345 Milliarden Euro). EU-einheitlich erfasst liegt sie etwas niedriger und bewegt sich in einem engen Band — dicht am EU-27-Durchschnitt und mit einem gemeinsamen Ausschlag 2020, als die Wirtschaft in der Pandemie einbrach und die Ausgaben stiegen. Von einer „Explosion“ der Kosten lässt sich also nicht sprechen.',
    ),
    sozialquoteLinie,
    block('h2', 'Wofür gibt er das Geld aus?'),
    block(
      'normal',
      '„Sozialstaat“ wird im Streit oft mit Transfers für Arbeitslose gleichgesetzt — die Zahlen zeigen ein anderes Bild. Der mit Abstand größte Teil fließt in Alter (Renten) und Gesundheit; Arbeitslosigkeit ist nur ein kleiner Posten. Der Sozialstaat ist damit vor allem von Demografie und Gesundheitskosten getrieben, nicht von „Untätigkeit“ — was die Stellschrauben einer Reform stark einschränkt.',
    ),
    sozialbudgetTreemap,
    block('h2', 'Wie steht Deutschland international da?'),
    block(
      'normal',
      'Ist Deutschland Spitzenreiter? Im europäischen Vergleich liegt es etwas über dem EU-Durchschnitt, aber klar hinter Ländern wie Frankreich, Finnland oder Österreich. Bemerkenswert: Mehrere Hochausgaben-Länder sind zugleich wirtschaftlich stark. Ein einfacher Umkehrschluss „weniger Sozialausgaben bedeuten mehr Wirtschaftskraft“ lässt sich aus der Verteilung nicht ziehen.',
    ),
    sozialBeeswarm,
    block('h2', 'Der meistdiskutierte Hebel: Lohnzusatzkosten'),
    block(
      'normal',
      'Hinter der Streitfrage steht eine konkrete Zahl: der Gesamtsozialversicherungsbeitrag — die Summe der Beiträge für Rente, Kranken-, Pflege- und Arbeitslosenversicherung. Über zwanzig Jahre lag er stabil um 40 Prozent des Bruttolohns; seit 2023 steigt er und hat die 40-Prozent-Marke überschritten, die Arbeitgeberverbände und die Regierung als Obergrenze nennen. Modellrechnungen sehen ihn bis 2035 Richtung 50 Prozent — getrieben von der Alterung. Weil Beschäftigte und Arbeitgeber den Beitrag je zur Hälfte zahlen, sind die „Lohnzusatzkosten“ der lauteste Reform-Hebel.',
    ),
    sozialbeitragLinie,
    block(
      'normal',
      'Naheliegend klingt: den Arbeitgeber-Anteil senken, dann sinken die Arbeitskosten. Hier lohnt aber ein genauer Blick — denn eine Beitragssenkung spart dem Sozialstaat nichts, sie senkt seine Einnahmen. Was die Arbeitgeber entlastet, hinterlässt eine Finanzierungslücke, die jemand füllen muss: höhere Steuerzuschüsse (also alle Steuerzahlenden), höhere Beiträge der Beschäftigten — oder Leistungskürzungen. Entlastung ist nicht dasselbe wie Einsparung.',
    ),
    block(
      'normal',
      'Wie wirksam wären solche Senkungen? Die Erfahrung des europäischen Auslands ist ernüchternd: Frankreich hat seine Arbeitgeberbeiträge stark gesenkt (Umbau des Steuergutschrift-Programms CICE). Studien schätzen den Effekt auf rund 40.000 bis 70.000 zusätzliche Stellen — bei Kosten von etwa 51.000 Euro je Stelle und Jahr und kaum messbarem Wachstumseffekt. Der ökonomisch seriöse Kern ist die Idee der „fiskalischen Abwertung“: Finanzierung von der Arbeit auf den Konsum (Mehrwertsteuer) verlagern, was Exporte relativ verbilligt — die Last trägt dann aber der Konsum, also auch Beschäftigte und Rentnerinnen. Kurz: Der Hebel verlagert vor allem, wer zahlt; billiger wird der Sozialstaat dadurch nicht, und die Beschäftigungseffekte sind moderat und teuer erkauft.',
    ),
    block('h2', 'Wie darüber gestritten wird'),
    block(
      'normal',
      'Über die Diagnose — demografischer und fiskalischer Druck — herrscht weithin Einigkeit, über die Wirkung des Sozialstaats auf die Wirtschaft und die richtige Antwort nicht. Bremse oder Stütze, kürzen, reformieren oder ausbauen — die folgenden Stimmen spannen das Feld auf.',
    ),
    sozialDiskurs,
    {
      _type: 'quellenNote',
      _key: key(),
      text: 'Daten: BMAS (Sozialbudget 2024 — Quote und Funktionen), Eurostat/ESSPROS (Sozialschutzquote im Zeitverlauf und Ländervergleich), OECD (SOCX, zur Einordnung), sozialpolitik-aktuell und vbw (Gesamtsozialversicherungsbeitrag) sowie Studien zum französischen CICE-Umbau. Zitat Friedrich Merz: CDU-Landesparteitag Osnabrück, August 2025 (ZDFheute). Positionen paraphrasiert nach Bundesregierung (CDU/CSU, SPD), BDA, IW Köln, Hans-Böckler-Stiftung/DGB und Der Paritätische. Definitions- und Methodenhinweise (drei unterschiedliche Quoten; Entlastung ≠ Einsparung) siehe Methodik.',
      quelle: {
        titel: 'BMAS — Sozialbudget 2024',
        url: 'https://www.bmas.de/DE/Service/Publikationen/Broschueren/a230-25-sozialbudget-2024.html',
      },
    },
  ],
};

// Die 15 Übereinstimmungswerte sind reproduzierbar aus den amtlichen namentlichen
// Abstimmungen der 20. WP berechnet (Einzelstimmen via abgeordnetenwatch, CC0):
//   pnpm --filter @gurt/data ingest -- --source=abgeordnetenwatch-abstimmungen --wahlperiode=132
// Roh-Snapshot der Auswertung: apps/web/content/datasets/fraktions-matrix-wp20.json
const wahlChord: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Wer stimmt mit wem?',
    typ: 'chord',
    beschreibung:
      'Chord-Diagramm der Übereinstimmung im Abstimmungsverhalten der sechs Bundestags­fraktionen (CDU/CSU, SPD, Grüne, FDP, AfD, Linke) in der 20. Wahlperiode. Grundlage sind alle 162 namentlichen Abstimmungen der Wahlperiode (18.11.2021–18.03.2025); der Wert je Fraktionspaar ist der Anteil der Abstimmungen, bei denen beide Fraktionen dieselbe Mehrheits­haltung (Ja/Nein/Enthaltung) zeigten. Jede Fraktion ist ein Bogen, jedes Band verbindet zwei Fraktionen — je breiter, desto höher die Übereinstimmung. Am höchsten ist sie innerhalb der damaligen Ampel-Koalition: SPD und Grüne stimmten praktisch durchgängig gleich (99,4 %), SPD/Grüne und FDP zu 95,7 %. CDU/CSU liegt mit rund 46 % zur Koalition und 50,0 % zur AfD dazwischen. Die niedrigsten Werte hat die AfD gegenüber der Koalition (16,7 % zu SPD und Grünen, 19,8 % zur FDP); ihre höchste Übereinstimmung besteht mit der Linken (52,0 %) — meist als gemeinsame Ablehnung von Regierungsvorlagen, nicht aus inhaltlicher Nähe. Die Farben folgen den üblichen Partei-Erkennungsfarben (CDU/CSU Grau, SPD Magenta, Grüne Grün, FDP Gelb, AfD Blau, Linke Pink) — als Identitätsmerkmal, nicht als Wertung.',
    caption:
      'Übereinstimmung im Abstimmungsverhalten der Bundestagsfraktionen, 20. Wahlperiode. Anteil aller 162 namentlichen Abstimmungen (Nov 2021–März 2025), bei denen zwei Fraktionen dieselbe Mehrheitshaltung hatten. Quelle: eigene Auswertung der namentlichen Abstimmungen des Bundestags (Einzelstimmen via abgeordnetenwatch, CC0).',
    encoding: {
      kategorieFeld: 'fraktionA',
      serieFeld: 'fraktionB',
      yFeld: 'uebereinstimmung',
      // Partei-Erkennungsfarben als Identitätsmerkmal (dokumentierte Ausnahme; nie
      // wertend, AA geprüft). Werte aus der kanonischen Palette „GURT Vibrant“
      // (dataPalette): SPD data-7, Grüne data-4, FDP data-3, AfD data-6, Linke data-1 (Pink);
      // einzige Nicht-Palette-Farbe ist das neutrale Grau der CDU/CSU. Format „Label:#hex“.
      farben: ['CDU/CSU:#4b5563', 'SPD:#9e0059', 'Grüne:#1f9e5a', 'FDP:#ffbd00', 'AfD:#3d6fe0', 'Linke:#ff0054'],
    },
    datensatz: {
      titel: 'Fraktions-Übereinstimmung im Bundestag (20. WP, 162 namentliche Abstimmungen)',
      quelle: {
        titel: 'Namentliche Abstimmungen des Deutschen Bundestags, 20. WP — eigene Auswertung (Einzelstimmen via abgeordnetenwatch)',
        url: 'https://www.bundestag.de/parlament/plenum/abstimmung/liste',
        herausgeber: 'Deutscher Bundestag (Urdaten) · abgeordnetenwatch.de (CC0)',
      },
      spalten: [
        { name: 'fraktionA', label: 'Fraktion A', typ: 'string' },
        { name: 'fraktionB', label: 'Fraktion B', typ: 'string' },
        { name: 'uebereinstimmung', label: 'Übereinstimmung', typ: 'number', einheit: '%' },
      ],
      daten: [
        { fraktionA: 'CDU/CSU', fraktionB: 'SPD', uebereinstimmung: 46.3 },
        { fraktionA: 'CDU/CSU', fraktionB: 'Grüne', uebereinstimmung: 46.3 },
        { fraktionA: 'CDU/CSU', fraktionB: 'FDP', uebereinstimmung: 46.9 },
        { fraktionA: 'CDU/CSU', fraktionB: 'AfD', uebereinstimmung: 50 },
        { fraktionA: 'CDU/CSU', fraktionB: 'Linke', uebereinstimmung: 35.5 },
        { fraktionA: 'SPD', fraktionB: 'Grüne', uebereinstimmung: 99.4 },
        { fraktionA: 'SPD', fraktionB: 'FDP', uebereinstimmung: 95.7 },
        { fraktionA: 'SPD', fraktionB: 'AfD', uebereinstimmung: 16.7 },
        { fraktionA: 'SPD', fraktionB: 'Linke', uebereinstimmung: 35.5 },
        { fraktionA: 'Grüne', fraktionB: 'FDP', uebereinstimmung: 95.7 },
        { fraktionA: 'Grüne', fraktionB: 'AfD', uebereinstimmung: 16.7 },
        { fraktionA: 'Grüne', fraktionB: 'Linke', uebereinstimmung: 35.5 },
        { fraktionA: 'FDP', fraktionB: 'AfD', uebereinstimmung: 19.8 },
        { fraktionA: 'FDP', fraktionB: 'Linke', uebereinstimmung: 34.9 },
        { fraktionA: 'AfD', fraktionB: 'Linke', uebereinstimmung: 52 },
      ],
    },
  },
};

// Zweiter Chord: laufende 21. WP (5 Fraktionen, keine FDP). Gleiche reproduzierbare
// Quelle wie oben, andere Periode:
//   pnpm --filter @gurt/data ingest -- --source=abgeordnetenwatch-abstimmungen --wahlperiode=161
// Roh-Snapshot: apps/web/content/datasets/fraktions-matrix-wp21.json
const wahlChord21: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Und in der laufenden Wahlperiode?',
    typ: 'chord',
    beschreibung:
      'Chord-Diagramm der Übereinstimmung im Abstimmungsverhalten der Bundestags­fraktionen in der laufenden 21. Wahlperiode. Seit der Bundestagswahl 2025 sitzen nur noch fünf Fraktionen im Bundestag (CDU/CSU, SPD, Grüne, AfD, Linke) — die FDP ist am Wiedereinzug gescheitert. CDU/CSU und SPD bilden nun die Regierungskoalition; ihre beiden Bögen sind am breitesten verbunden, sie stimmen nahezu durchgängig gleich. Grüne und Linke, gemeinsam in der Opposition, bilden das zweitdichteste Band. Am weitesten auseinander liegen die Regierungsfraktionen und die AfD. Die in der Ampel-Zeit auffällig hohe Übereinstimmung von AfD und Linken ist deutlich gesunken. Die Auswertung beruht auf einer kleineren, noch wachsenden Zahl namentlicher Abstimmungen und wird wöchentlich automatisch aktualisiert; die genauen, jeweils aktuellen Werte stehen in der Tabelle unter der Grafik. Die Farben folgen den üblichen Partei-Erkennungsfarben — als Identitätsmerkmal, nicht als Wertung.',
    caption:
      'Übereinstimmung im Abstimmungsverhalten der Bundestagsfraktionen, laufende 21. Wahlperiode (seit Juni 2025) — wöchentlich automatisch aktualisiert. Anteil der bislang erfassten namentlichen Abstimmungen, bei denen zwei Fraktionen dieselbe Mehrheitshaltung hatten. Quelle: eigene Auswertung der namentlichen Abstimmungen des Bundestags (Einzelstimmen via abgeordnetenwatch, CC0).',
    encoding: {
      kategorieFeld: 'fraktionA',
      serieFeld: 'fraktionB',
      yFeld: 'uebereinstimmung',
      // Gleiche Identitätsfarben wie oben, ohne FDP (nicht mehr im Bundestag).
      farben: ['CDU/CSU:#4b5563', 'SPD:#9e0059', 'Grüne:#1f9e5a', 'AfD:#3d6fe0', 'Linke:#ff0054'],
    },
    datensatz: {
      titel: 'Fraktions-Übereinstimmung im Bundestag (21. WP, 52 namentliche Abstimmungen)',
      quelle: {
        titel: 'Namentliche Abstimmungen des Deutschen Bundestags, 21. WP — eigene Auswertung (Einzelstimmen via abgeordnetenwatch)',
        url: 'https://www.bundestag.de/parlament/plenum/abstimmung/liste',
        herausgeber: 'Deutscher Bundestag (Urdaten) · abgeordnetenwatch.de (CC0)',
      },
      spalten: [
        { name: 'fraktionA', label: 'Fraktion A', typ: 'string' },
        { name: 'fraktionB', label: 'Fraktion B', typ: 'string' },
        { name: 'uebereinstimmung', label: 'Übereinstimmung', typ: 'number', einheit: '%' },
      ],
      daten: [
        { fraktionA: 'CDU/CSU', fraktionB: 'SPD', uebereinstimmung: 100 },
        { fraktionA: 'CDU/CSU', fraktionB: 'Grüne', uebereinstimmung: 44.2 },
        { fraktionA: 'CDU/CSU', fraktionB: 'AfD', uebereinstimmung: 28.8 },
        { fraktionA: 'CDU/CSU', fraktionB: 'Linke', uebereinstimmung: 30.8 },
        { fraktionA: 'SPD', fraktionB: 'Grüne', uebereinstimmung: 44.2 },
        { fraktionA: 'SPD', fraktionB: 'AfD', uebereinstimmung: 28.8 },
        { fraktionA: 'SPD', fraktionB: 'Linke', uebereinstimmung: 30.8 },
        { fraktionA: 'Grüne', fraktionB: 'AfD', uebereinstimmung: 30.8 },
        { fraktionA: 'Grüne', fraktionB: 'Linke', uebereinstimmung: 69.2 },
        { fraktionA: 'AfD', fraktionB: 'Linke', uebereinstimmung: 34.6 },
      ],
    },
  },
};

const wahlArticle: Article = {
  _id: 'seed-wer-stimmt-mit-wem',
  titel: 'Wer stimmt mit wem? Die Fraktionen im Bundestag',
  slug: 'wer-stimmt-mit-wem',
  ressort: 'parlament',
  standfirst:
    'Bei namentlichen Abstimmungen zeigt sich, welche Fraktionen im Bundestag oft gleich votieren — und welche selten. Ein Chord-Diagramm macht diese Nähe und Distanz auf einen Blick sichtbar. Es ist eine rein beschreibende Karte des Abstimmungsverhaltens: Sie zeigt, wer wie oft dieselbe Mehrheit hatte — nicht, wer mit wem „kann“ oder wer recht hat.',
  veroeffentlicht: '2026-06-04',
  themen: [{ name: 'Parlament', slug: 'parlament' }],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Datengrundlage sind alle 162 namentlichen Abstimmungen der abgeschlossenen 20. Wahlperiode des Deutschen Bundestags (18.11.2021–18.03.2025) sowie die namentlichen Abstimmungen der laufenden 21. Wahlperiode (seit 25.06.2025), deren Auswertung wöchentlich automatisch aktualisiert wird. Quelle der Einzelstimmen ist der Deutsche Bundestag selbst (namentliche Abstimmungen als offene Daten); abgerufen über die abgeordnetenwatch.de-API (CC0), die diese amtlichen Abstimmungen maschinenlesbar bereitstellt. Die Übereinstimmungs-Matrix wird von GURT reproduzierbar selbst berechnet (Adapter und Auswertung in `packages/data`): Für jede Abstimmung wird je Fraktion die Mehrheitshaltung bestimmt (Ja, Nein oder Enthaltung; Nichtabgabe und ungültige Stimmen zählen nicht mit), und die Übereinstimmung zweier Fraktionen ist der Anteil der Abstimmungen — gezählt nur dort, wo beide eine Mehrheit hatten —, in denen diese Mehrheit gleich war. Alle Fraktionspaare werden direkt aus den Einzelstimmen ermittelt (15 in der 20. WP mit sechs Fraktionen, 10 in der 21. WP, in der nur fünf Fraktionen vertreten sind — die FDP ist 2025 aus dem Bundestag ausgeschieden); es gibt keine abgeleiteten oder geschätzten Werte. Namentliche Abstimmungen sind nur ein Teil aller Abstimmungen (oft strittige Fragen) und keine repräsentative Stichprobe; viele Beschlüsse fallen ohne namentliche Erfassung oder einstimmig. „Die Linke“ umfasst nach dem Verlust des Fraktionsstatus (Dezember 2023) auch die Gruppe Die Linke. Eine gleiche Mehrheitshaltung bedeutet nicht inhaltliche Übereinstimmung: Zwei Oppositionsfraktionen können denselben Gesetzentwurf aus gegensätzlichen Gründen ablehnen. Beide Wahlperioden werden getrennt ausgewiesen, weil sich Fraktionslandschaft und Regierungsmehrheit unterscheiden (20. WP: Ampel-Koalition aus SPD, Grünen und FDP; 21. WP: CDU/CSU und SPD als Regierung). Die 21. Wahlperiode läuft noch; ihre Werte beruhen auf einer kleineren, wachsenden Grundlage und verschieben sich mit weiteren Abstimmungen. Die Bögen sind in den üblichen Partei-Erkennungsfarben eingefärbt — als Identitätshilfe, nicht als Wertung; Farbe ist nie alleiniger Bedeutungsträger (Labels und Tabelle bleiben vollständig).',
  body: [
    block('h2', 'Worum es geht'),
    block(
      'normal',
      'Bei einer namentlichen Abstimmung wird im Bundestag festgehalten, wie jede einzelne Abgeordnete und jeder einzelne Abgeordnete votiert. Aus diesen Stimmen lässt sich ablesen, welche Fraktionen oft dieselbe Mehrheit bilden — und welche selten zusammenfinden. Das folgende Chord-Diagramm fasst alle 162 namentlichen Abstimmungen der vergangenen Wahlperiode (2021–2025) zusammen: Jede Fraktion ist ein Bogen am Rand, jedes Band dazwischen steht für die Übereinstimmung zweier Fraktionen — je breiter, desto häufiger stimmten sie gleich.',
    ),
    wahlChord,
    block('h2', 'Was die Bänder zeigen'),
    block(
      'normal',
      'Am dichtesten ist das Geflecht innerhalb der damaligen Regierung: SPD und Grüne hatten in fast allen 162 Abstimmungen dieselbe Mehrheit (99,4 %), die FDP wich nur in Einzelfragen — etwa zur Impfpflicht — ab (95,7 %). Drei Fraktionen stimmen also fast wie eine. CDU/CSU liegt dazwischen: rund 46 Prozent Übereinstimmung mit der Koalition, 50,0 Prozent mit der AfD — als größte Oppositionsfraktion votierte sie teils mit der Regierung, teils dagegen. Die dünnsten Bänder gehören zur AfD: gegenüber SPD und Grünen nur 16,7 Prozent, gegenüber der FDP 19,8 Prozent.',
    ),
    block('h2', 'Gleiche Mehrheit heißt nicht gleiche Motive'),
    block(
      'normal',
      'Auffällig ist die höchste Übereinstimmung der AfD — ausgerechnet mit der Linken (52,0 %), der im Links-rechts-Schema am weitesten entfernten Fraktion. Das ist kein Zeichen inhaltlicher Nähe, sondern Folge der Methode: Wer in der Opposition sitzt, lehnt Regierungsvorlagen häufig ab — und zwei Fraktionen, die mit „Nein“ stimmen, zählen hier als übereinstimmend, auch wenn sie es aus gegensätzlichen Gründen tun. Das Diagramm misst gleiches Stimmverhalten, nicht gleiche Überzeugung. Und es zeigt nur namentliche Abstimmungen, die sich auf strittige Fragen konzentrieren — die vielen einvernehmlichen Beschlüsse des Parlaments tauchen hier nicht auf.',
    ),
    block(
      'normal',
      'Die bisherige Karte bildet die abgeschlossene 20. Wahlperiode mit ihrer Ampel-Koalition ab. Seit der Bundestagswahl 2025 hat sich das Bild verschoben.',
    ),
    block('h2', 'Die laufende 21. Wahlperiode'),
    block(
      'normal',
      'In der neuen Wahlperiode regieren CDU/CSU und SPD gemeinsam; die FDP ist am Wiedereinzug gescheitert und sitzt nicht mehr im Bundestag. Grüne, AfD und Die Linke bilden die Opposition. Das folgende Diagramm wertet die bisher erfassten namentlichen Abstimmungen der neuen Periode aus (seit dem 25. Juni 2025) — eine noch wachsende und kleinere Grundlage als die 162 Abstimmungen der abgeschlossenen 20. Wahlperiode. Es wird wöchentlich automatisch aktualisiert.',
    ),
    wahlChord21,
    block(
      'normal',
      'Die neue Regierungskoalition stimmt nahezu geschlossen: CDU/CSU und SPD hatten bislang in praktisch jeder Abstimmung dieselbe Mehrheit. Auf der anderen Seite rücken Grüne und Linke zusammen — die beiden Fraktionen, die nun gemeinsam opponieren. Am weitesten auseinander liegen die Regierungsfraktionen und die AfD. Und die in den Ampel-Jahren auffällige Nähe von AfD und Linken ist deutlich gesunken: Gemeinsame Neins fallen seltener zusammen, seit die Oppositionsrollen neu verteilt sind. Die genauen, laufend aktualisierten Werte stehen in der Tabelle unter der Grafik.',
    ),
    block(
      'normal',
      'Beide Diagramme messen dasselbe — gleiche Mehrheiten, nicht gleiche Motive — und spiegeln vor allem, wer gerade regiert und wer opponiert, nicht inhaltliche Nähe. GURT schreibt die laufende Wahlperiode fort, sobald weitere namentliche Abstimmungen vorliegen.',
    ),
    {
      _type: 'quellenNote',
      _key: key(),
      text: 'Daten: eigene Auswertung der namentlichen Abstimmungen des Deutschen Bundestags — 162 der abgeschlossenen 20. Wahlperiode (18.11.2021–18.03.2025) sowie die laufend (wöchentlich automatisch) aktualisierte Auswertung der 21. Wahlperiode (seit 25.06.2025). Sie werden vom Bundestag als offene Daten veröffentlicht; abgerufen über die abgeordnetenwatch.de-API (CC0). Alle Fraktionspaare sind direkt aus den Einzelstimmen berechnet (kein abgeleiteter Wert). Definition, Reichweite und Grenzen (gleiche Mehrheit ≠ gleiche Motive) siehe Methodik.',
      quelle: {
        titel: 'Deutscher Bundestag — Namentliche Abstimmungen (Einzelstimmen via abgeordnetenwatch)',
        url: 'https://www.bundestag.de/parlament/plenum/abstimmung/liste',
      },
    },
  ],
};

const schuldenLinie: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Hoch, aber nicht außer Kontrolle',
    typ: 'linie',
    beschreibung:
      'Liniendiagramm der deutschen Schuldenstandsquote (Staatsschulden in Prozent des BIP, Maastricht-Definition) für ausgewählte Jahre 2010–2025. Nach der Finanzkrise lag sie 2010 bei rund 82 Prozent (Höchststand), sank bis 2019 auf 59,6 Prozent — erstmals seit Langem unter die Maastricht-Grenze von 60 Prozent —, stieg in der Corona-Pandemie 2020 auf 68,8 Prozent und liegt seither bei rund 62 bis 63 Prozent (2024: 62,5 %, 2025: 63,5 %). Eine gestrichelte Linie markiert die Maastricht-Grenze von 60 Prozent.',
    caption:
      'Schuldenstandsquote Deutschlands in Prozent des BIP (Maastricht), ausgewählte Jahre. Die gestrichelte Linie ist die EU-Zielmarke von 60 Prozent. Quelle: Deutsche Bundesbank / Eurostat.',
    encoding: { xFeld: 'jahr', yFeld: 'prozent', serieFeld: 'reihe', gestrichelteReihen: ['Maastricht-Grenze (60 %)'] },
    datensatz: {
      titel: 'Schuldenstandsquote Deutschland (Maastricht), ausgewählte Jahre',
      quelle: {
        titel: 'Deutsche Bundesbank — Maastricht-Defizit und -Schuldenstand',
        url: 'https://www.bundesbank.de/de/statistiken/oeffentliche-finanzen/maastricht-defizit-und-schuldenstand/maastricht-defizit-und-schuldenstand-773068',
        herausgeber: 'Deutsche Bundesbank / Eurostat',
      },
      spalten: [
        { name: 'jahr', typ: 'number' },
        { name: 'prozent', typ: 'number', einheit: '% BIP' },
        { name: 'reihe', typ: 'string' },
      ],
      daten: [
        { jahr: 2010, prozent: 82.4, reihe: 'Schuldenquote' },
        { jahr: 2012, prozent: 81.2, reihe: 'Schuldenquote' },
        { jahr: 2019, prozent: 59.6, reihe: 'Schuldenquote' },
        { jahr: 2020, prozent: 68.8, reihe: 'Schuldenquote' },
        { jahr: 2023, prozent: 63.6, reihe: 'Schuldenquote' },
        { jahr: 2024, prozent: 62.5, reihe: 'Schuldenquote' },
        { jahr: 2025, prozent: 63.5, reihe: 'Schuldenquote' },
        { jahr: 2010, prozent: 60, reihe: 'Maastricht-Grenze (60 %)' },
        { jahr: 2025, prozent: 60, reihe: 'Maastricht-Grenze (60 %)' },
      ],
    },
  },
};

const schuldenBeeswarm: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Im EU-Vergleich gehört Deutschland zu den Sparsamen',
    typ: 'beeswarm',
    beschreibung:
      'Beeswarm-Diagramm der Schuldenstandsquoten der 27 EU-Mitgliedstaaten 2023 (Staatsschulden in Prozent des BIP), je ein Punkt pro Land. Die Werte reichen von 19,6 Prozent (Estland) bis 161,9 Prozent (Griechenland). Deutschland liegt mit 63,6 Prozent im unteren Mittelfeld — deutlich unter dem EU-27-Schnitt von 81,7 Prozent und weit unter Frankreich (110,6), Italien (137,3) oder Griechenland (161,9), aber über der Maastricht-Grenze von 60 Prozent, die als gestrichelte Linie markiert ist.',
    caption:
      'Schuldenstandsquote der EU-Staaten 2023 in Prozent des BIP, je ein Punkt pro Land; Deutschland (hervorgehoben) bei 63,6 %, EU-27-Schnitt 81,7 %. Quelle: Eurostat / bpb.',
    encoding: {
      xFeld: '% des BIP (2023)',
      yFeld: 'prozent',
      kategorieFeld: 'land',
      highlight: 'Deutschland',
      refWert: 60,
      refLabel: 'Maastricht-Grenze 60 %',
    },
    datensatz: {
      titel: 'Schuldenstandsquoten der EU-27 in % des BIP, 2023',
      quelle: {
        titel: 'bpb / Eurostat — Öffentlicher Schuldenstand (EU-Mitgliedstaaten)',
        url: 'https://www.bpb.de/kurz-knapp/zahlen-und-fakten/europa/70570/oeffentlicher-schuldenstand/',
        herausgeber: 'Eurostat / Bundeszentrale für politische Bildung',
      },
      spalten: [
        { name: 'land', typ: 'string' },
        { name: 'prozent', typ: 'number', einheit: '% BIP' },
      ],
      daten: [
        { land: 'Griechenland', prozent: 161.9 },
        { land: 'Italien', prozent: 137.3 },
        { land: 'Frankreich', prozent: 110.6 },
        { land: 'Spanien', prozent: 107.7 },
        { land: 'Belgien', prozent: 105.2 },
        { land: 'Portugal', prozent: 99.1 },
        { land: 'Österreich', prozent: 77.8 },
        { land: 'Zypern', prozent: 77.3 },
        { land: 'Finnland', prozent: 75.8 },
        { land: 'Ungarn', prozent: 73.5 },
        { land: 'Slowenien', prozent: 69.2 },
        { land: 'Deutschland', prozent: 63.6 },
        { land: 'Kroatien', prozent: 63.0 },
        { land: 'Slowakei', prozent: 56.0 },
        { land: 'Malta', prozent: 50.4 },
        { land: 'Polen', prozent: 49.6 },
        { land: 'Rumänien', prozent: 48.8 },
        { land: 'Niederlande', prozent: 46.5 },
        { land: 'Tschechien', prozent: 44.0 },
        { land: 'Irland', prozent: 43.7 },
        { land: 'Lettland', prozent: 43.6 },
        { land: 'Litauen', prozent: 38.3 },
        { land: 'Schweden', prozent: 31.2 },
        { land: 'Dänemark', prozent: 29.3 },
        { land: 'Luxemburg', prozent: 25.7 },
        { land: 'Bulgarien', prozent: 23.1 },
        { land: 'Estland', prozent: 19.6 },
      ],
    },
  },
};

const investitionsTreemap: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Wofür Geld fehlt: rund 600 Milliarden über zehn Jahre',
    typ: 'treemap',
    beschreibung:
      'Treemap des geschätzten zusätzlichen öffentlichen Investitionsbedarfs in Deutschland über zehn Jahre (gemeinsame Schätzung von IMK und IW Köln, 2024), insgesamt rund 596 Milliarden Euro nach Bereichen. Den größten Block bildet der Klimaschutz mit 200 Mrd €, gefolgt von kommunaler Infrastruktur (190), Verkehr und ÖPNV (127), Bildung (42) und sozialem Wohnungsbau (37).',
    caption:
      'Geschätzter zusätzlicher öffentlicher Investitionsbedarf über zehn Jahre nach Bereichen, in Mrd Euro. Quelle: IMK (Hans-Böckler-Stiftung) & IW Köln, 2024.',
    encoding: { kategorieFeld: 'bereich', yFeld: 'mrd' },
    datensatz: {
      titel: 'Zusätzlicher öffentlicher Investitionsbedarf (IMK/IW 2024), 10 Jahre, nach Bereichen',
      quelle: {
        titel: 'IMK & IW — 600 Milliarden Euro Extra-Investitionen über 10 Jahre',
        url: 'https://www.boeckler.de/de/pressemitteilungen-2675-600-milliarden-euro-staatliche-extra-investitionen-60422.htm',
        herausgeber: 'IMK (Hans-Böckler-Stiftung) & IW Köln',
      },
      spalten: [
        { name: 'bereich', typ: 'string' },
        { name: 'mrd', typ: 'number', einheit: 'Mrd €' },
      ],
      daten: [
        { bereich: 'Klimaschutz', mrd: 200, beschreibung: 'Energetische Gebäudesanierung, Strom- und Wärmenetze, Ausbau erneuerbarer Energien.' },
        { bereich: 'Kommunale Infrastruktur', mrd: 190, beschreibung: 'Sanierungsstau in Städten und Gemeinden (rund 177 Mrd) plus Klimaanpassung (rund 13 Mrd).' },
        { bereich: 'Verkehr & ÖPNV', mrd: 127, beschreibung: 'Schienenmodernisierung (rund 60 Mrd), öffentlicher Nahverkehr (28 Mrd) und Fernstraßen (39 Mrd).' },
        { bereich: 'Bildung', mrd: 42, beschreibung: 'Hochschulsanierung (rund 35 Mrd) und Ausbau von Ganztagsschulen (rund 7 Mrd).' },
        { bereich: 'Sozialer Wohnungsbau', mrd: 37, beschreibung: 'Neubau und Modernisierung von Sozialwohnungen.' },
      ],
    },
  },
};

const schuldenDiskurs: BodyBlock = {
  _type: 'diskursBlock',
  _key: key(),
  titel: 'Wie über die Schuldenbremse gestritten wird',
  frage: 'Diszipliniert die Schuldenbremse den Staat — oder bremst sie nötige Investitionen aus?',
  einleitung:
    'Über die Diagnose herrscht weithin Einigkeit: ein großer Investitionsstau bei gleichzeitig wieder spürbarer Zinslast. Umstritten ist die Antwort — wie viel Regelbindung, wie viel Spielraum, und ob neues Geld in Investitionen oder in laufende Ausgaben fließt. Stand nach der Reform vom März 2025; Stimmen paraphrasiert, mit Quelle:',
  perspektiven: [
    {
      label: 'Bundesregierung (CDU/CSU & SPD)',
      aussage:
        'Die neue Koalition brachte die Lockerung selbst auf den Weg: Mehr Spielraum für Verteidigung und ein großes Infrastrukturprogramm seien nötig, um Sicherheit und Handlungsfähigkeit des Staates zu sichern.',
      quelle: {
        titel: 'Grundgesetzänderung für Verteidigung und Sondervermögen',
        url: 'https://www.bpb.de/kurz-knapp/hintergrund-aktuell/560839/grundgesetzaenderung-fuer-verteidigung-und-sondervermoegen/',
        herausgeber: 'Bundeszentrale für politische Bildung',
      },
    },
    {
      label: 'Deutsche Bundesbank (Joachim Nagel)',
      aussage:
        'Eine maßvolle Reform, die mehr Investitionen erlaubt, sei vertretbar — die Schuldenquote müsse aber perspektivisch wieder Richtung 60 Prozent verankert und die Regelbindung erhalten bleiben.',
      quelle: {
        titel: 'Bundesbank schlägt Reform der Schuldenbremse für solide Finanzen und mehr Investitionen vor',
        url: 'https://www.bundesbank.de/de/presse/pressenotizen/bundesbank-schlaegt-reform-der-schuldenbremse-fuer-solide-staatsfinanzen-und-mehr-investitionen-vor-952702',
        herausgeber: 'Deutsche Bundesbank',
      },
    },
    {
      label: 'Sachverständigenrat (Monika Schnitzer)',
      aussage:
        'Die Schuldenbremse sei „in ihrer jetzigen Form zu starr“; sie brauche Spielraum für zukunftsgerichtete Ausgaben, ohne die öffentlichen Finanzen auszuhöhlen.',
      quelle: {
        titel: 'Schuldenbremse: Vorschläge für eine Reform von Top-Ökonomen',
        url: 'https://www.businessinsider.de/wirtschaft/schuldenbremse-lockern-vorschlaege-fuer-reform-von-bundesbank-wirtschaftsweisen-banken/',
        herausgeber: 'Sachverständigenrat (zitiert)',
      },
    },
    {
      label: 'FDP (Christian Lindner)',
      aussage:
        'Gegen die Lockerung: Neue Schulden drohten laufende Ausgaben wie Sozialleistungen statt Investitionen zu finanzieren — das sei „das Gegenteil von Generationengerechtigkeit“, zumal die Last auf einer kleiner werdenden arbeitenden Bevölkerung wiege.',
      quelle: {
        titel: 'Lindner: Mut zur Veränderung statt Politik auf Pump',
        url: 'https://www.fdp.de/mut-zur-veraenderung-statt-politik-auf-pump',
        herausgeber: 'FDP',
      },
    },
    {
      label: 'Gewerkschaften & IMK (DGB / Hans-Böckler-Stiftung)',
      aussage:
        'Die Schuldenbremse wirke als Investitionsbremse: Rund 600 Milliarden Euro zusätzliche öffentliche Investitionen über zehn Jahre seien nötig — Sparen am falschen Ende schade Wirtschaft, Infrastruktur und Zusammenhalt.',
      quelle: {
        titel: '600 Milliarden Euro können Infrastruktur und Wirtschaft zukunftsfähig machen',
        url: 'https://www.dgb.de/aktuelles/news/600-milliarden-euro-koennen-infrastruktur-und-wirtschaft-zukunftsfaehig-machen/',
        herausgeber: 'DGB / Hans-Böckler-Stiftung',
      },
    },
  ],
  einordnung:
    'Mehrere Dinge sind gleichzeitig richtig: Schulden sind nicht umsonst — die Zinslast bindet künftigen Spielraum —, und unterlassene Investitionen sind ebenfalls ein Preis, nur später und verteilt. Der Streit dreht sich weniger um das Ob als um das Wie: feste Regel oder Spielraum, und vor allem, ob neues Geld investiv wirkt oder im laufenden Haushalt versickert.',
};

const schuldenbremseArticle: Article = {
  _id: 'seed-schuldenbremse',
  titel: 'Schuldenbremse: Wie viel Schulden verträgt Deutschland?',
  slug: 'schuldenbremse-wie-viel-schulden',
  ressort: 'finanzen',
  standfirst:
    'Die Schuldenbremse soll den Staat disziplinieren und kommende Generationen schützen — 2025 wurde sie zum ersten Mal grundlegend gelockert. Seitdem wird gestritten: nötige Bremse oder Bremsklotz für Investitionen? Die echten Zahlen zeigen, wie hoch Deutschlands Schuld wirklich ist, was sie kostet, was unterlassene Investitionen kosten — und was die Reform geändert hat.',
  veroeffentlicht: '2026-06-04',
  themen: [{ name: 'Haushalt', slug: 'haushalt' }],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Schuldenstandsquote = Bruttoschulden des Staates in Prozent des BIP nach Maastricht-Definition (Deutsche Bundesbank / Eurostat); ausgewählte Jahre. Werte u. a.: Höchststand 2010 rund 82 %, 2019 59,6 %, Pandemie 2020 68,8 %, 2024 62,5 %, 2025 63,5 % (Bundesbank, teils vorläufig; Jahre werden revidiert). EU-Vergleich: Eurostat/bpb, Stand 2023 (jüngste vollständige EU-27-Reihe; einzelne Länder 2024 leicht abweichend), EU-27-Schnitt 81,7 %, Euroraum 88,6 %. Zinsausgaben des Bundes (IW Köln / BMF): 2021 rund 4 Mrd € (Niedrigzinsphase), 2023 rund 40 Mrd €, 2024 rund 37 Mrd €; Anstieg durch gestiegene Marktzinsen und höhere Schulden. Investitionsbedarf: gemeinsame Schätzung von IMK (Hans-Böckler-Stiftung) und IW Köln, Mai 2024, rund 600 Mrd € zusätzlich über zehn Jahre, Aufteilung gerundet — eine modellgestützte Schätzung, kein amtlicher Wert; der wahrgenommene kommunale Investitionsrückstand lag laut KfW-Kommunalpanel 2025 bei 215,7 Mrd €. Schuldenbremse-Mechanik: Art. 109/115 GG, strukturelles Defizit des Bundes höchstens 0,35 % des BIP; 2009 eingeführt, ab 2016 voll wirksam, 2020–2022 wegen außergewöhnlicher Notlage ausgesetzt. Reform: Grundgesetzänderung, Bundestag 18.3.2025 (512 zu 206 Stimmen), Bundesrat 21.3.2025, in Kraft 25.3.2025 — Verteidigung, Zivilschutz, Nachrichtendienste und Ukraine-Militärhilfe oberhalb von 1 % des BIP von der Schuldenregel ausgenommen; 500-Mrd-€-Sondervermögen für zusätzliche Investitionen in Infrastruktur und Klimaneutralität bis 2045; Länder dürfen strukturell bis 0,35 % ihres BIP verschulden. Positionen paraphrasiert, Stand 2025.',
  body: [
    block('h2', 'Worum es geht'),
    block(
      'normal',
      'Die Schuldenbremse steht seit 2009 im Grundgesetz: Der Bund darf sich strukturell nur in engem Rahmen neu verschulden — höchstens 0,35 Prozent der Wirtschaftsleistung pro Jahr, die Länder bislang gar nicht. Sie soll die Politik disziplinieren und kommende Generationen vor wachsenden Schuldenbergen schützen. Im März 2025 wurde sie zum ersten Mal grundlegend gelockert — für die Verteidigung und für ein 500-Milliarden-Programm für Infrastruktur.',
    ),
    block(
      'normal',
      'Seitdem wird gestritten: Diszipliniert die Bremse den Staat sinnvoll — oder verhindert sie nötige Investitionen? Drei Fragen führen durch den Beitrag: Wie hoch ist Deutschlands Schuld wirklich? Was kostet sie — und was bremst die Bremse? Und was hat die Reform geändert?',
    ),
    block('h2', 'Wie hoch ist die Schuld?'),
    block(
      'normal',
      'Gemessen wird die Last an der Schuldenstandsquote — den gesamten Staatsschulden im Verhältnis zur jährlichen Wirtschaftsleistung. Nach der Finanzkrise kletterte sie auf rund 82 Prozent (2010), den höchsten Wert; danach sank sie bis 2019 unter die Maastricht-Grenze von 60 Prozent, stieg in der Pandemie wieder und liegt heute bei rund 62 bis 63 Prozent — in absoluten Zahlen rund 2,8 Billionen Euro. Von einer außer Kontrolle geratenen Schuld lässt sich also nicht sprechen; wohl aber liegt Deutschland über der EU-Zielmarke.',
    ),
    schuldenLinie,
    block(
      'normal',
      'Im europäischen Vergleich steht Deutschland sogar günstig da. Während Frankreich (111 Prozent), Italien (137) oder Griechenland (162) weit über der Marke liegen, gehört Deutschland mit rund 64 Prozent zu den niedriger verschuldeten großen EU-Staaten — deutlich unter dem EU-Schnitt von rund 82 Prozent.',
    ),
    schuldenBeeswarm,
    block('h2', 'Was kostet sie, und was bremst die Bremse?'),
    block(
      'normal',
      'Schulden sind nicht umsonst. Mit den gestiegenen Zinsen kletterten die Zinsausgaben des Bundes von rund 4 Milliarden Euro (2021, Niedrigzinsphase) auf rund 37 Milliarden Euro (2024) — fast eine Verzehnfachung in drei Jahren. Jeder Euro Zins fehlt für anderes. Genau das ist das Argument für die Bremse: Wer heute Schulden macht, bindet morgen Spielraum.',
    ),
    block(
      'normal',
      'Doch es gibt eine zweite Rechnung. Auch unterlassene Investitionen kosten — nur später und verteilt. Forschungsinstitute beziffern den zusätzlichen öffentlichen Investitionsbedarf auf rund 600 Milliarden Euro über zehn Jahre; allein die Kommunen meldeten 2025 einen Investitionsrückstand von 216 Milliarden Euro. Marode Brücken, Schulen und Schienen sind aufgeschobene Kosten — die Bremse schützt vor Schulden, nicht vor diesem Stau.',
    ),
    investitionsTreemap,
    block('h2', 'Was die Reform 2025 geändert hat'),
    block(
      'normal',
      'Im März 2025 änderten der noch amtierende Bundestag (512 zu 206 Stimmen) und der Bundesrat das Grundgesetz mit Zweidrittelmehrheit. Drei Dinge wurden gelockert: Verteidigungsausgaben oberhalb von 1 Prozent der Wirtschaftsleistung zählen nicht mehr zur Schuldenbremse (auch Militärhilfe für die Ukraine); ein kreditfinanziertes Sondervermögen von 500 Milliarden Euro finanziert über zwölf Jahre zusätzliche Investitionen in Infrastruktur und Klimaneutralität bis 2045; und die Länder dürfen sich nun ebenfalls bis 0,35 Prozent ihres BIP strukturell verschulden. Die Bremse wurde damit nicht abgeschafft, aber für zwei große Posten geöffnet.',
    ),
    block('h2', 'Wie darüber gestritten wird'),
    block(
      'normal',
      'Über die Diagnose — Investitionsstau bei gleichzeitig steigender Zinslast — herrscht weithin Einigkeit. Umstritten ist die Antwort: Wie viel Regelbindung, wie viel Spielraum? Und fließt neues Geld in Investitionen oder in laufende Ausgaben? Die folgenden Stimmen spannen das Feld auf.',
    ),
    schuldenDiskurs,
    {
      _type: 'quellenNote',
      _key: key(),
      text: 'Daten: Deutsche Bundesbank (Schuldenstand und -quote 2024/2025), Eurostat & Bundeszentrale für politische Bildung (EU-Vergleich 2023), IW Köln (Zinsausgaben des Bundes), IMK (Hans-Böckler-Stiftung) & IW Köln (Investitionsbedarf 2024), KfW-Kommunalpanel 2025 (kommunaler Investitionsrückstand). Reform 2025: Deutscher Bundestag, Bundesrat, Bundesfinanzministerium, bpb. Positionen paraphrasiert nach Bundesregierung/Bundestag, Deutscher Bundesbank, Sachverständigenrat, FDP sowie DGB/Hans-Böckler-Stiftung. Definitionen, Datenstände und Abgrenzungen siehe Methodik.',
      quelle: {
        titel: 'Deutsche Bundesbank — Deutsche Staatsschulden 2024',
        url: 'https://www.bundesbank.de/de/presse/pressenotizen/deutsche-staatsschulden-954838',
      },
    },
  ],
};

const buergergeldTreemap: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Wer bekommt Bürgergeld?',
    typ: 'treemap',
    beschreibung:
      'Treemap der rund 5,5 Millionen Bürgergeld-Beziehenden (Mai 2025) nach Gruppen. Das Bild der „arbeitsunwilligen“ Empfänger trügt: Rund 1,5 Mio sind Kinder und andere nicht Erwerbsfähige, rund 1,4 Mio Erwerbsfähige sind nicht arbeitslos (sie betreuen Kinder, pflegen Angehörige, sind in Ausbildung/Maßnahme oder arbeitsunfähig), und rund 0,8 Mio arbeiten sogar, verdienen aber zu wenig („Aufstocker“). Nur rund 1,8 Mio — etwa ein Drittel aller Beziehenden und 46 % der Erwerbsfähigen — sind als arbeitslos gemeldet.',
    caption:
      'Bürgergeld-Beziehende nach Gruppen, rund 5,5 Mio (2024/2025), in Mio Personen. Quelle: Bundesagentur für Arbeit (Statistik SGB II).',
    encoding: { kategorieFeld: 'gruppe', yFeld: 'mio' },
    datensatz: {
      titel: 'Bürgergeld-Beziehende nach Gruppen (BA, 2024/2025)',
      quelle: {
        titel: 'Bundesagentur für Arbeit — Statistik Grundsicherung (SGB II)',
        url: 'https://statistik.arbeitsagentur.de',
        herausgeber: 'Bundesagentur für Arbeit',
      },
      spalten: [
        { name: 'gruppe', typ: 'string' },
        { name: 'mio', typ: 'number', einheit: 'Mio' },
      ],
      daten: [
        { gruppe: 'Arbeitslos (erwerbsfähig)', mio: 1.8, beschreibung: 'Erwerbsfähige, die als arbeitslos gemeldet sind — rund 46 % der Erwerbsfähigen.' },
        { gruppe: 'Kinder & nicht Erwerbsfähige', mio: 1.5, beschreibung: 'Vor allem Kinder unter 15 Jahren — sie dürfen und können nicht arbeiten.' },
        { gruppe: 'Erwerbsfähig, nicht arbeitslos', mio: 1.4, beschreibung: 'Betreuen kleine Kinder, pflegen Angehörige, sind in Schule/Ausbildung/Maßnahme oder arbeitsunfähig.' },
        { gruppe: 'Erwerbstätig — „Aufstocker“', mio: 0.8, beschreibung: 'Sie arbeiten, ihr Lohn reicht aber nicht zum Leben (rund 814.000).' },
      ],
    },
  },
};

const regelsatzLinie: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Erst kräftig hoch, dann Nullrunde',
    typ: 'linie',
    beschreibung:
      'Liniendiagramm des Bürgergeld-Regelsatzes für eine alleinstehende Person, 2022–2026, in Euro pro Monat (durchgezogen), mit einer gestrichelten Vergleichslinie: dem Betrag, den die 449 Euro von 2022 bräuchten, um die Kaufkraft zu halten (mit dem Verbraucherpreisindex fortgeschrieben). Nach 449 Euro (2022) stieg der Regelsatz 2023 auf 502 und 2024 auf 563 Euro und überholte damit die seit 2022 aufgelaufene Inflation; seither gilt eine „Nullrunde“ (2025 und 2026: 563 Euro), während die Kaufkraft-Linie weiter steigt und den Abstand verringert. 2026 liegt der Regelsatz mit 563 Euro noch über der fortgeschriebenen Kaufkraft von rund 507 Euro. Hinzu kommen jeweils die Kosten der Unterkunft. Die gesetzliche Anpassung folgt einem eigenen Mischindex aus Preisen und Nettolöhnen; der Verbraucherpreisindex dient hier als allgemeine Vergleichsgröße, der Wert für 2026 beruht auf einer Inflationsprognose von rund zwei Prozent.',
    caption:
      'Bürgergeld-Regelsatz für Alleinstehende, in € pro Monat (ohne Wohnkosten), mit inflationsbereinigter Vergleichslinie (449 € von 2022, mit dem VPI fortgeschrieben; 2026 Prognose). Quelle: Bundesregierung/BMAS (Regelsatz); Statistisches Bundesamt (Verbraucherpreisindex).',
    encoding: { xFeld: 'jahr', yFeld: 'euro', serieFeld: 'reihe', gestrichelteReihen: ['Kaufkraft von 2022'] },
    datensatz: {
      titel: 'Bürgergeld-Regelsatz Alleinstehende vs. inflationsbereinigte Basis 2022, 2022–2026',
      quelle: {
        titel: 'Bundesregierung — Regelbedarfe / Nullrunde Bürgergeld; Verbraucherpreisindex: Statistisches Bundesamt',
        url: 'https://www.bundesregierung.de/breg-de/aktuelles/nullrunde-buergergeld-2383676',
        herausgeber: 'Bundesregierung / BMAS; Destatis (VPI)',
      },
      spalten: [
        { name: 'jahr', typ: 'number' },
        { name: 'euro', typ: 'number', einheit: '€' },
        { name: 'reihe', typ: 'string' },
      ],
      daten: [
        { jahr: 2022, euro: 449, reihe: 'Regelsatz' },
        { jahr: 2023, euro: 502, reihe: 'Regelsatz' },
        { jahr: 2024, euro: 563, reihe: 'Regelsatz' },
        { jahr: 2025, euro: 563, reihe: 'Regelsatz' },
        { jahr: 2026, euro: 563, reihe: 'Regelsatz' },
        { jahr: 2022, euro: 449, reihe: 'Kaufkraft von 2022' },
        { jahr: 2023, euro: 476, reihe: 'Kaufkraft von 2022' },
        { jahr: 2024, euro: 486, reihe: 'Kaufkraft von 2022' },
        { jahr: 2025, euro: 497, reihe: 'Kaufkraft von 2022' },
        { jahr: 2026, euro: 507, reihe: 'Kaufkraft von 2022' },
      ],
    },
  },
};

const lohnabstandBalken: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Für Alleinstehende lohnt sich Arbeit klar',
    typ: 'balken',
    beschreibung:
      'Balkendiagramm des verfügbaren Monatseinkommens einer alleinstehenden Person (WSI, August 2025): Mit einer Vollzeitstelle zum Mindestlohn bleiben rund 1.572 Euro (1.546 Euro netto plus 26 Euro Wohngeld); mit Bürgergeld sind es rund 1.015 Euro (563 Euro Regelbedarf plus 451,73 Euro für die Unterkunft). Der Lohnabstand beträgt damit rund 557 Euro im Monat — regional zwischen etwa 380 und 660 Euro.',
    caption:
      'Verfügbares Monatseinkommen einer alleinstehenden Person: Mindestlohn-Vollzeit vs. Bürgergeld, in Euro (WSI, Mindestlohn 2025). Quelle: WSI / Hans-Böckler-Stiftung.',
    encoding: { kategorieFeld: 'situation', yFeld: 'euro' },
    datensatz: {
      titel: 'Verfügbares Einkommen Alleinstehende: Mindestlohn vs. Bürgergeld (WSI 2025)',
      quelle: {
        titel: 'WSI — Einkommen bei Mindestlohn deutlich höher als mit Bürgergeld',
        url: 'https://www.wsi.de/de/pressemitteilungen-15991-einkommen-bei-mindestlohnbeschaeftigung-deutlich-hoeher-als-buergergeld-70666.htm',
        herausgeber: 'WSI / Hans-Böckler-Stiftung',
      },
      spalten: [
        { name: 'situation', typ: 'string' },
        { name: 'euro', typ: 'number', einheit: '€' },
      ],
      daten: [
        { situation: 'Mindestlohn-Vollzeit (netto + Wohngeld)', euro: 1572 },
        { situation: 'Bürgergeld (Regelbedarf + Wohnkosten)', euro: 1015 },
      ],
    },
  },
};

const buergergeldDiskurs: BodyBlock = {
  _type: 'diskursBlock',
  _key: key(),
  titel: 'Wie über das Bürgergeld gestritten wird',
  frage: 'Wie hoch soll die Grundsicherung sein — und an welche Pflichten geknüpft?',
  einleitung:
    'Über die Diagnose — Reformbedarf bei Anreizen und Vermittlung — gibt es breite Zustimmung; über das Mittel nicht. Soll mehr Druck wirken, oder schadet er? Und wie hoch muss das Existenzminimum sein? Stand nach dem Reformbeschluss vom März 2026; Stimmen paraphrasiert, mit Quelle:',
  perspektiven: [
    {
      label: 'Bundesregierung (CDU/CSU & SPD)',
      aussage:
        'Wer arbeiten kann, soll schneller vermittelt werden; wer nicht mitwirkt, muss klare Konsequenzen tragen. Fördern und Fordern gehörten zusammen, und der Lohnabstand zur Arbeit müsse gewahrt bleiben.',
      quelle: {
        titel: 'Bürgergeld wird zur neuen Grundsicherung',
        url: 'https://www.bundesregierung.de/breg-de/aktuelles/bundesrat-neue-grundsicherung-2399562',
        herausgeber: 'Bundesregierung',
      },
    },
    {
      label: 'ifo Institut (Ökonomie)',
      aussage:
        'Ein spürbarer Lohnabstand bestehe zwar — die Anreize, die eigene Arbeit auszuweiten oder mehr zu verdienen, seien für untere und mittlere Einkommen aber oft gering; das System brauche stärkere Erwerbsanreize.',
      quelle: {
        titel: 'ifo — „Lohnt“ sich Arbeit noch? Lohnabstand und Arbeitsanreize',
        url: 'https://www.ifo.de/en/publications/2024/article-journal/lohnt-sich-arbeit-noch-lohnabstand-und-arbeitsanreize-2024',
        herausgeber: 'ifo Institut',
      },
    },
    {
      label: 'Caritas (Wohlfahrtsverband)',
      aussage:
        'Das Bild der „Arbeitsunwilligen“ treffe auf wenige zu: Die große Mehrheit der Beziehenden seien Kinder, Pflegende, Kranke oder Menschen, die bereits arbeiten. Pauschaler Druck gehe an der Realität vorbei.',
      quelle: {
        titel: 'Caritas — Fakten statt Polemik zum Bürgergeld',
        url: 'https://www.caritas.de/fuerprofis/fachthemen/armut/fakten-statt-polemik-zum-buergergeld',
        herausgeber: 'Deutscher Caritasverband',
      },
    },
    {
      label: 'Sozialverband (SoVD)',
      aussage:
        'Schärfere Sanktionen und der Wegfall der Vermögens-Schonzeit verschärften Armut; vollständige Leistungskürzungen könnten bis zur Wohnungslosigkeit führen und seien verfassungsrechtlich heikel.',
      quelle: {
        titel: 'SoVD — Reform der Grundsicherung beschlossen, SoVD warnt vor Folgen',
        url: 'https://www.sovd.de/aktuelles/meldung/reform-der-grundsicherung-beschlossen-sovd-warnt-vor-folgen',
        herausgeber: 'Sozialverband Deutschland (SoVD)',
      },
    },
    {
      label: 'Gewerkschaften (DGB / ver.di)',
      aussage:
        'Druck und Misstrauen brächten kaum Menschen in gute Arbeit; nötig seien Qualifizierung, gute Vermittlung und auskömmliche Leistungen statt einer Sanktionsverschärfung.',
      quelle: {
        titel: 'ver.di — Bürgergeld / Grundsicherung 2026',
        url: 'https://www.verdi.de/politik-gesellschaft/buergergeldgrundsicherung-2026-anspruch-voraussetzungen',
        herausgeber: 'ver.di',
      },
    },
  ],
  einordnung:
    'Mehrere Dinge sind gleichzeitig richtig: Für Alleinstehende lohnt sich Arbeit klar mehr als Bürgergeld — und zugleich ist die große Mehrheit der Beziehenden nicht „arbeitsunwillig“, sondern Kind, pflegt, lernt, ist krank oder arbeitet bereits. Ob schärfere Sanktionen mehr Menschen in Arbeit bringen, ist empirisch umstritten; das Grundgesetz zieht zugleich eine Untergrenze, die das menschenwürdige Existenzminimum sichert.',
};

const buergergeldArticle: Article = {
  _id: 'seed-buergergeld',
  titel: 'Bürgergeld: Wer bekommt es, und was ändert die neue Grundsicherung?',
  slug: 'buergergeld-grundsicherung',
  ressort: 'soziales',
  standfirst:
    'Kaum ein Sozialthema wird so hart diskutiert wie das Bürgergeld — für die einen „Vollkasko“, für die anderen Existenzminimum. 2026 wird es zur „neuen Grundsicherung“ mit schärferen Pflichten umgebaut. Die echten Zahlen zeigen, wer es bekommt, ob es zum Leben reicht, ob sich Arbeit noch lohnt — und was die Reform ändert.',
  veroeffentlicht: '2026-06-04',
  themen: [{ name: 'Soziales', slug: 'soziales' }],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Empfänger (Bundesagentur für Arbeit, Mai 2025): rund 5,5 Mio Bürgergeld-Beziehende, davon rund 4,0 Mio erwerbsfähig und rund 1,5 Mio nicht erwerbsfähig (vor allem Kinder unter 15). Erwerbsstatus der Erwerbsfähigen (2024/2025): rund 1,8 Mio arbeitslos gemeldet (46 %), rund 0,81 Mio erwerbstätig („Aufstocker“, 20 %, Stand März 2024); die übrigen rund 1,4 Mio sind als Residual ausgewiesen (Kinderbetreuung, Pflege, Schule/Ausbildung/Maßnahme, Arbeitsunfähigkeit). Regelsatz Alleinstehende (BMAS/Bundesregierung): 2022 449 €, 2023 502 €, 2024–2026 563 € (Nullrunde 2025/26 wegen gesunkener Inflation und Besitzschutzregel; Wohnkosten kommen hinzu). Kaufkraft-Vergleichslinie: 449 € (2022) mit dem Verbraucherpreisindex fortgeschrieben (Destatis, Jahresdurchschnitte, 2020=100: 110,2 · 116,7 · 119,3 · 121,9; 2026 mit der Bundesbank-Inflationsprognose von rund 2,2 %). Der VPI ist eine allgemeine Vergleichsgröße — die gesetzliche Anpassung nutzt einen eigenen Mischindex aus Preisen und Löhnen, zudem ist die Inflation für einkommensschwache Haushalte höher (IMK-Inflationsmonitor, Hans-Böckler-Stiftung); der reale Abstand fällt damit kleiner aus. Bürgergeld-Ausgaben 2024 rund 46,9 Mrd € (BIAJ; +~4 Mrd ggü. Vorjahr). Lohnabstand: WSI (Hans-Böckler-Stiftung), August 2025, alleinstehende Person, Mindestlohn 2025 (12,82 €/h): verfügbares Einkommen rund 1.572 € (1.546 € netto + 26 € Wohngeld) gegenüber rund 1.015 € Bürgergeld (563 € Regelbedarf + 451,73 € Unterkunft) = rund 557 € Abstand (regional 379–662 €); mit dem Mindestlohn 2026 (13,90 €/h) ist der Abstand größer. Bei Familien mit Kindern fällt der Abstand kleiner aus; Erwerbstätige können dann zusätzlich Wohngeld und Kinderzuschlag erhalten. Reform „neue Grundsicherung“: Kabinett 17.12.2025, Bundestag 5.3.2026, Inkrafttreten ab 1.7.2026 schrittweise — Umbenennung, sofortige 30-%-Kürzung bei Pflichtverletzung (statt stufenweise), Streichung der Zahlung bei drei versäumten Terminen (Miete direkt an den Vermieter), Wiedereinführung des Vermittlungsvorrangs, Wegfall der Vermögens-Karenzzeit. Das Bundesverfassungsgericht begrenzte Sanktionen 2019 auf höchstens 30 % und schützt das menschenwürdige Existenzminimum. Die im Diskurs kartierten Positionen sind paraphrasiert (Stand 2026); die zwei separat ausgewiesenen, wörtlichen Zitate (Bas, Rock) stammen aus den verlinkten Quellen (vorwärts bzw. Paritätischer Gesamtverband).',
  body: [
    block('h2', 'Worum es geht'),
    block(
      'normal',
      'Kaum ein Sozialthema wird so hart diskutiert wie das Bürgergeld — die Grundsicherung für Arbeitsuchende (SGB II), 2023 aus „Hartz IV“ hervorgegangen. Im Streit steht es für „Vollkasko“ und „Arbeitsverweigerung“ auf der einen, für „Existenzminimum“ und „Würde“ auf der anderen Seite. 2026 wird es erneut umgebaut: zur „neuen Grundsicherung“ mit schärferen Pflichten.',
    ),
    block(
      'normal',
      'Drei Fragen führen durch den Beitrag: Wer bekommt Bürgergeld — und warum arbeiten nicht alle? Reicht es zum Leben, und lohnt sich Arbeit noch? Und was ändert die neue Grundsicherung?',
    ),
    block('h2', 'Wer bekommt Bürgergeld?'),
    block(
      'normal',
      'Im Mai 2025 bezogen rund 5,5 Millionen Menschen Bürgergeld. Das Bild der „arbeitsunwilligen“ Empfänger trügt: Gut ein Viertel sind Kinder, ein weiteres Viertel betreut Kinder, pflegt Angehörige, ist in Ausbildung oder krank — und rund 0,8 Millionen arbeiten sogar, verdienen aber zu wenig („Aufstocker“). Als arbeitslos gemeldet ist nur etwa ein Drittel der Beziehenden.',
    ),
    buergergeldTreemap,
    block('h2', 'Reicht es, und lohnt sich Arbeit noch?'),
    block(
      'normal',
      'Wie hoch ist das Bürgergeld? Der Regelsatz für eine alleinstehende Person stieg 2023 und 2024 kräftig — von 449 auf 563 Euro —, um die hohe Inflation auszugleichen; seither gilt eine „Nullrunde“: 2025 und 2026 bleibt er bei 563 Euro. Dazu kommen die Kosten der Unterkunft. Insgesamt kostete das Bürgergeld 2024 rund 46,9 Milliarden Euro.',
    ),
    regelsatzLinie,
    block(
      'normal',
      'Was bedeutet die gestrichelte Linie? Sie zeigt, was die 449 Euro von 2022 in jedem Jahr wert sein müssten, nur um sich davon dieselben Dinge leisten zu können — also den Regelsatz, der die Inflation seit 2022 genau ausgleicht. Der Abstand zwischen beiden Linien ist damit der reale Gewinn oder Verlust an Kaufkraft: Weil der Regelsatz 2024 kräftig stieg, liegt er seither über dieser Marke; die Nullrunde lässt den Vorsprung aber Jahr für Jahr schrumpfen. Zwei Dinge schränken den Vergleich ein — die gesetzliche Anpassung folgt nicht dem allgemeinen Verbraucherpreisindex, sondern einem eigenen Mischindex aus Preisen und Löhnen; und die Inflation trifft einkommensschwache Haushalte härter als den Durchschnitt, weil sie mehr für Energie und Lebensmittel ausgeben, die sich 2022 und 2023 am stärksten verteuerten (IMK). An ihrem tatsächlichen Warenkorb gemessen fiele der Abstand kleiner aus.',
    ),
    block(
      'normal',
      'Lohnt sich Arbeit dann überhaupt noch? Für Alleinstehende eindeutig ja: Wer Vollzeit zum Mindestlohn arbeitet, hat laut einer Untersuchung des WSI rund 1.572 Euro im Monat zur Verfügung — etwa 557 Euro mehr als mit Bürgergeld (rund 1.015 Euro inklusive Wohnkosten). Der Abstand schwankt regional zwischen rund 380 und 660 Euro und ist mit dem höheren Mindestlohn 2026 (13,90 Euro) noch gewachsen. Bei Familien mit mehreren Kindern fällt er kleiner aus — dann greifen für Arbeitende aber zusätzlich Wohngeld und Kinderzuschlag.',
    ),
    lohnabstandBalken,
    block('h2', 'Was die neue Grundsicherung ändert'),
    block(
      'normal',
      'Im März 2026 beschloss der Bundestag den Umbau des Bürgergelds zur „neuen Grundsicherung“ (in Kraft ab Juli 2026, schrittweise). Wer Termine im Jobcenter ohne wichtigen Grund versäumt, dem wird das Geld künftig sofort um 30 Prozent gekürzt — nicht mehr stufenweise; beim dritten versäumten Termin wird die Zahlung vorerst gestrichen und die Miete direkt an den Vermieter überwiesen. Der „Vermittlungsvorrang“ gilt wieder (erst Arbeit, dann Qualifizierung), und die „Karenzzeit“, in der Erspartes geschützt war, fällt weg. Eine Grenze zieht das Bundesverfassungsgericht: Das menschenwürdige Existenzminimum muss gesichert bleiben — vollständige Streichungen über längere Zeit hat es 2019 für unzulässig erklärt.',
    ),
    block('h2', 'Wie darüber gestritten wird'),
    block(
      'normal',
      'Über die Diagnose — Reformbedarf bei Anreizen und Vermittlung — gibt es breite Zustimmung; über das Mittel nicht. Soll mehr Druck wirken, oder schadet er? Und wie hoch muss das Existenzminimum sein? Die folgenden Stimmen spannen das Feld auf.',
    ),
    buergergeldDiskurs,
    block(
      'normal',
      'Zwei Stimmen bündeln den Kern des Streits. Bundesarbeitsministerin Bärbel Bas verteidigt die schärferen Pflichten:',
    ),
    {
      _type: 'zitatBlock',
      _key: key(),
      zitat: 'Wer mitmacht, der hat überhaupt nichts zu befürchten.',
      quelle: {
        titel: 'Bärbel Bas (Bundesarbeitsministerin, SPD), zur neuen Grundsicherung, November 2025',
        url: 'https://www.vorwaerts.de/soziale-politik/streit-ums-buergergeld-so-hart-sind-die-sanktionen-wirklich',
        herausgeber: 'vorwärts',
      },
      imHero: true,
      heroEyebrow: 'Aus der Bürgergeld-Debatte',
    },
    block(
      'normal',
      '— die Sozialverbände sehen darin vor allem zusätzlichen Druck. Joachim Rock, Hauptgeschäftsführer des Paritätischen Gesamtverbandes:',
    ),
    {
      _type: 'zitatBlock',
      _key: key(),
      zitat:
        'Statt Menschen bei der Jobsuche stärker zu unterstützen, verschärft die neue Grundsicherung Unsicherheit und Existenzängste.',
      quelle: {
        titel: 'Joachim Rock (Hauptgeschäftsführer, Paritätischer Gesamtverband), zum Kabinettsbeschluss „neue Grundsicherung“, Dezember 2025',
        url: 'https://www.der-paritaetische.de/alle-meldungen/neue-grundsicherung-im-kabinett-verabschiedet/',
        herausgeber: 'Paritätischer Gesamtverband',
      },
      imHero: true,
      heroEyebrow: 'Aus der Bürgergeld-Debatte',
    },
    {
      _type: 'quellenNote',
      _key: key(),
      text: 'Daten: Bundesagentur für Arbeit (Empfänger und Erwerbsstatus, SGB II), Bundesregierung/BMAS (Regelsatz), BIAJ (Ausgaben 2024), WSI/Hans-Böckler-Stiftung (Lohnabstand, August 2025). Reform „neue Grundsicherung“: Deutscher Bundestag, Bundesregierung. Positionen paraphrasiert nach Bundesregierung, ifo Institut, Caritas, SoVD und ver.di/DGB. Verfassungsrahmen: Bundesverfassungsgericht (Sanktionsurteil 2019). Definitionen, Datenstände und Abgrenzungen siehe Methodik.',
      quelle: {
        titel: 'Bundesagentur für Arbeit — Bürgergeld (Grundsicherung SGB II)',
        url: 'https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/buergergeld',
      },
    },
  ],
};

const subventionenTreemap: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Rund 65 Milliarden — fast die Hälfte im Verkehr',
    typ: 'treemap',
    beschreibung:
      'Treemap der umweltschädlichen Subventionen in Deutschland nach Bereichen (Umweltbundesamt, Datenbasis 2018), insgesamt rund 65,4 Milliarden Euro pro Jahr. Der Verkehr ist mit 30,7 Mrd € (47 %) der größte Block, gefolgt von der Energie (25,5 Mrd €, 39 %); Verkehr und Energie machen zusammen über vier Fünftel aus. Land- und Forstwirtschaft (5,9 Mrd €) sowie Bau und Wohnen (3,3 Mrd €) sind deutlich kleiner.',
    caption:
      'Umweltschädliche Subventionen nach Bereichen, rund 65 Mrd € pro Jahr (Datenbasis 2018), in Mrd €. „Umweltschädlich“ ist eine Einordnung des Umweltbundesamts. Quelle: Umweltbundesamt (UBA).',
    encoding: { kategorieFeld: 'bereich', yFeld: 'mrd' },
    datensatz: {
      titel: 'Umweltschädliche Subventionen nach Bereichen (UBA, 2018)',
      quelle: {
        titel: 'Umweltbundesamt — Umweltschädliche Subventionen in Deutschland',
        url: 'https://www.umweltbundesamt.de/themen/wirtschaft-konsum/wirtschaft-umwelt/umweltschaedliche-subventionen',
        herausgeber: 'Umweltbundesamt (UBA)',
      },
      spalten: [
        { name: 'bereich', label: 'Bereich', typ: 'string' },
        { name: 'mrd', label: 'Betrag', typ: 'number', einheit: 'Mrd €' },
      ],
      daten: [
        { bereich: 'Verkehr', mrd: 30.7, beschreibung: 'Größter Block — u. a. Dieselprivileg, Steuerbefreiung von Kerosin, Pendlerpauschale und Dienstwagenprivileg.' },
        { bereich: 'Energie', mrd: 25.5, beschreibung: 'Energiesteuer-Vergünstigungen für Industrie und Landwirtschaft sowie weitere Ausnahmen.' },
        { bereich: 'Land- & Forstwirtschaft', mrd: 5.9, beschreibung: 'Steuervergünstigungen wie der Agrardiesel und weitere Ausnahmen für die Landwirtschaft.' },
        { bereich: 'Bau & Wohnen', mrd: 3.3, beschreibung: 'Vergünstigungen mit umwelt- bzw. klimaschädlicher Wirkung im Gebäudebereich.' },
      ],
    },
  },
};

const einzelpostenBalken: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Die größten Einzelposten — alle im Verkehr',
    typ: 'balken',
    beschreibung:
      'Balkendiagramm der größten einzelnen umweltschädlichen Subventionen, alle im Verkehr, in Milliarden Euro pro Jahr (gerundete Schätzungen, UBA/FÖS): das Dieselprivileg (niedrigere Steuer auf Diesel als auf Benzin) mit rund 9,5 Mrd €, die Steuerbefreiung von Flugbenzin (Kerosin) mit rund 8 Mrd €, das Dienstwagenprivileg mit rund 6 Mrd € und die Pendlerpauschale mit rund 5 Mrd €. Diese Vergünstigungen entlasten tendenziell höhere Einkommen.',
    caption:
      'Größte einzelne umweltschädliche Subventionen (Verkehr), gerundete Schätzungen in Mrd € pro Jahr. Quelle: UBA / FÖS.',
    encoding: { kategorieFeld: 'posten', yFeld: 'mrd' },
    datensatz: {
      titel: 'Größte umweltschädliche Einzel-Subventionen im Verkehr (gerundet)',
      quelle: {
        titel: 'FÖS / UBA — klimaschädliche Subventionen im Verkehr',
        url: 'https://foes.de/publikationen/2023/W_Reform_umweltschaedlicher_Subventionen.pdf',
        herausgeber: 'Forum Ökologisch-Soziale Marktwirtschaft (FÖS) / UBA',
      },
      spalten: [
        { name: 'posten', label: 'Einzelposten', typ: 'string' },
        { name: 'mrd', label: 'Betrag', typ: 'number', einheit: 'Mrd €' },
      ],
      daten: [
        { posten: 'Dieselprivileg', mrd: 9.5 },
        { posten: 'Steuerbefreiung Kerosin', mrd: 8.0 },
        { posten: 'Dienstwagenprivileg', mrd: 6.1 },
        { posten: 'Pendlerpauschale', mrd: 5.3 },
      ],
    },
  },
};

const subventionenDiskurs: BodyBlock = {
  _type: 'diskursBlock',
  _key: key(),
  titel: 'Wie über den Abbau gestritten wird',
  frage: 'Sollten umweltschädliche Subventionen gestrichen oder umgeschichtet werden?',
  einleitung:
    'Über die Diagnose — viele dieser Vergünstigungen schaden dem Klima und begünstigen tendenziell Besserverdienende — herrscht unter Fachleuten weitgehend Einigkeit; über Tempo und soziale Abfederung nicht. Stand 2024–2026; Stimmen paraphrasiert, mit Quelle:',
  perspektiven: [
    {
      label: 'Umweltbundesamt (UBA)',
      aussage:
        'Diese Subventionen wirkten umwelt- und klimaschädlich und setzten falsche Anreize; ihr Abbau sei überfällig, schaffe Haushaltsspielraum und helfe beim Klimaschutz.',
      quelle: {
        titel: 'Umweltbundesamt — Umweltschädliche Subventionen',
        url: 'https://www.umweltbundesamt.de/themen/wirtschaft-konsum/wirtschaft-umwelt/umweltschaedliche-subventionen',
        herausgeber: 'Umweltbundesamt (UBA)',
      },
    },
    {
      label: 'VCD (Verkehrsclub Deutschland)',
      aussage:
        'Dienstwagen-, Diesel- und Pendlerprivileg begünstigten vor allem höhere Einkommen und große, schwere Autos; nötig sei ein sozial- und klimagerechter Umbau — etwa eine einkommensunabhängige Mobilitätsprämie — statt einer pauschalen Streichung.',
      quelle: {
        titel: 'VCD — Abschaffung von Dienstwagenprivileg und Co. gefordert',
        url: 'https://www.vcd.org/service/presse/pressemitteilungen/staat-foerdert-klimaschaedliches-verhalten-vcd-fordert-abschaffung-von-dienstwagenprivileg-und-co',
        herausgeber: 'Verkehrsclub Deutschland (VCD)',
      },
    },
    {
      label: 'Deutscher Bauernverband',
      aussage:
        'Der Abbau der Agrardiesel-Vergünstigung treffe die Höfe hart — eine Umstellung auf E-Antriebe sei in der Landwirtschaft nicht möglich —, und schwäche die Wettbewerbsfähigkeit gegenüber dem Ausland.',
      quelle: {
        titel: 'Bundestag — Forderung nach Steuervergünstigung für Agrardiesel (Debatte)',
        url: 'https://www.bundestag.de/dokumente/textarchiv/2024/kw12-de-agrardiesel-994704',
        herausgeber: 'Deutscher Bundestag',
      },
    },
    {
      label: 'ADAC',
      aussage:
        'Die Pendlerpauschale dürfe nicht gestrichen werden — im Gegenteil: Angesichts hoher Mobilitätskosten und steigender CO₂-Preise sei ihre Erhöhung (ab 2026 auf 38 Cent ab dem ersten Kilometer) eine nötige Entlastung der Pendlerinnen und Pendler.',
      quelle: {
        titel: 'ADAC — Position zur Erhöhung der Entfernungspauschale (Lobbyregister)',
        url: 'https://www.lobbyregister.bundestag.de/inhalte-der-interessenvertretung/regelungsvorhabensuche/RV0019509/241842',
        herausgeber: 'ADAC (Lobbyregister Bundestag)',
      },
    },
    {
      label: 'Bundesregierung',
      aussage:
        'Sie bekennt sich grundsätzlich zum Subventionsabbau, geht aber wegen sozialer und wirtschaftlicher Härten schrittweise vor: Der Agrardiesel wurde abgebaut, große Posten wie das Diesel- und Dienstwagenprivileg blieben bislang weitgehend unangetastet.',
      quelle: {
        titel: 'Bundestag — Ökonomen stützen Kurs bei Agrardiesel (Haushaltsfinanzierungsgesetz)',
        url: 'https://www.bundestag.de/dokumente/textarchiv/2024/kw03-pa-finanzen-haushaltsfinanzierungsgesetz-2024-985794',
        herausgeber: 'Deutscher Bundestag',
      },
    },
  ],
  einordnung:
    'Mehrere Dinge sind gleichzeitig richtig: Viele dieser Subventionen schaden dem Klima und entlasten vor allem Besserverdienende — und zugleich trifft ihr Abbau konkrete Gruppen wie Landwirte oder Pendler sofort und sichtbar, während der Nutzen für Klima und Haushalt diffus und später anfällt. „Entlastung“ und „Subvention“ sind oft dasselbe aus zwei Blickwinkeln; gestritten wird weniger über das Ob als über das sozial verträgliche Wie.',
};

const subventionenArticle: Article = {
  _id: 'seed-umweltschaedliche-subventionen',
  titel: 'Umweltschädliche Subventionen: Wohin 65 Milliarden fließen, und warum der Abbau stockt',
  slug: 'umweltschaedliche-subventionen',
  ressort: 'umwelt',
  standfirst:
    'Der Staat fördert Klimaschutz — und verbilligt zugleich fossile Energie und Verkehr. Das Umweltbundesamt beziffert diese „umweltschädlichen Subventionen“ auf rund 65 Milliarden Euro im Jahr. Sind das verzichtbare Klimakiller oder nötige Entlastungen für Pendler, Landwirte und Industrie? Die echten Zahlen zeigen, wohin das Geld fließt, wer profitiert — und warum der Abbau so schwer ist.',
  veroeffentlicht: '2026-06-04',
  themen: [{ name: 'Klima', slug: 'klima' }],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Datengrundlage ist die Erhebung des Umweltbundesamts (UBA) „Umweltschädliche Subventionen in Deutschland“, Datenbasis 2018, Gesamtvolumen rund 65,4 Mrd € pro Jahr (Verkehr 30,7 / Energie 25,5 / Land- und Forstwirtschaft 5,9 / Bau und Wohnen 3,3 Mrd €); aktuellere Vollerhebungen liegen nicht vor, in der Energiekrise stiegen die fossilen Subventionen im engeren Sinn 2023 vorübergehend auf rund 85 Mrd €. „Umweltschädlich“ ist eine Bewertung des UBA — nicht jede Vergünstigung gilt allen als schädlich. Die Einzelposten sind gerundete Schätzungen aus verschiedenen Quellen und Jahren (UBA, FÖS); die Werte variieren (z. B. Dieselprivileg rund 8–9,5 Mrd €, Kerosin-Steuerbefreiung rund 8 Mrd €, Dienstwagenprivileg rund 3–6 Mrd €, Pendlerpauschale rund 5–6 Mrd €). Verteilungs- und CO₂-Angaben (Vergünstigungen entlasten überwiegend höhere Einkommen; das Ende des Dieselprivilegs könnte bis 2030 rund 25,7 Mio t CO₂ vermeiden) nach FÖS/Agora. Agrardiesel: Steuervergünstigung 21,48 ct/l, stufenweiser Abbau 2024 (−40 %), 2025 (−70 %), ab 2026 vollständig; Mehreinnahmen rund 450 Mio € pro Jahr; der Bauernverband beziffert die Belastung höher. Positionen paraphrasiert, Stand 2024–2026.',
  body: [
    block('h2', 'Worum es geht'),
    block(
      'normal',
      'Der Staat gibt nicht nur Geld aus, um Klimaschutz zu fördern — er begünstigt zugleich klimaschädliches Verhalten. Das Umweltbundesamt beziffert die „umweltschädlichen Subventionen“ in Deutschland auf rund 65 Milliarden Euro im Jahr (Datenbasis 2018): Steuervergünstigungen und Ausnahmen, die fossile Energie und Verkehr verbilligen. „Umweltschädlich“ ist dabei eine Einordnung des Umweltbundesamts — nicht jede Vergünstigung gilt allen als schädlich.',
    ),
    block(
      'normal',
      'Drei Fragen führen durch den Beitrag: Wie groß sind diese Subventionen, und wohin fließen sie? Wer profitiert? Und warum ist der Abbau so schwer?',
    ),
    block('h2', 'Wie groß, und wohin?'),
    block(
      'normal',
      'Rund 65 Milliarden Euro im Jahr — und fast die Hälfte davon im Verkehr. Das Umweltbundesamt ordnet die Subventionen vier Bereichen zu; Verkehr und Energie machen zusammen über vier Fünftel aus.',
    ),
    subventionenTreemap,
    block('h2', 'Wer profitiert?'),
    block(
      'normal',
      'Die größten einzelnen Posten liegen allesamt im Verkehr: das Dieselprivileg (niedrigere Steuer auf Diesel als auf Benzin), die Steuerbefreiung von Flugbenzin (Kerosin), das Dienstwagenprivileg und die Pendlerpauschale. Auffällig: Diese Vergünstigungen entlasten tendenziell höhere Einkommen — wer weiter pendelt, einen teureren Dienstwagen fährt oder mehr verdient, spart absolut am meisten.',
    ),
    einzelpostenBalken,
    block(
      'normal',
      'Ihr Abbau brächte dem Staat zweistellige Milliardenbeträge — und dem Klima messbar weniger CO₂: Allein das Ende des Dieselprivilegs könnte bis 2030 rund 25 Millionen Tonnen CO₂ vermeiden.',
    ),
    block('h2', 'Warum der Abbau stockt'),
    block(
      'normal',
      'Wenn der Nutzen so klar ist — warum bleibt das meiste bestehen? Weil der Abbau konkrete Gruppen sofort und sichtbar trifft, während der Nutzen diffus und später anfällt. Das zeigte sich 2024 am Agrardiesel: Die Regierung baute die Steuervergünstigung (21,48 Cent je Liter) stufenweise ab — Mehreinnahmen rund 450 Millionen Euro im Jahr. Es folgten wochenlange Bauernproteste. Viel größere Posten wie das Diesel- und das Dienstwagenprivileg blieben dagegen unangetastet. „Entlastung“ und „Subvention“ sind eben oft dasselbe, nur aus zwei Blickwinkeln.',
    ),
    block('h2', 'Wie darüber gestritten wird'),
    block(
      'normal',
      'Über die Diagnose — viele dieser Vergünstigungen schaden dem Klima und begünstigen Besserverdienende — herrscht unter Fachleuten weitgehend Einigkeit; über Tempo und soziale Abfederung nicht. Die folgenden Stimmen spannen das Feld auf.',
    ),
    subventionenDiskurs,
    {
      _type: 'quellenNote',
      _key: key(),
      text: 'Daten: Umweltbundesamt (Umweltschädliche Subventionen in Deutschland, Datenbasis 2018), Forum Ökologisch-Soziale Marktwirtschaft (FÖS) und Agora (Einzelposten, Verteilungs- und CO₂-Wirkung). Agrardiesel und Subventionsabbau: Deutscher Bundestag. Positionen paraphrasiert nach Umweltbundesamt, VCD, Deutschem Bauernverband, ADAC und Bundesregierung. Definitionen, Bezugsjahre und Abgrenzungen (insbesondere: „umweltschädlich“ ist eine UBA-Bewertung; Einzelposten gerundet) siehe Methodik.',
      quelle: {
        titel: 'Umweltbundesamt — Umweltschädliche Subventionen in Deutschland',
        url: 'https://www.umweltbundesamt.de/themen/wirtschaft-konsum/wirtschaft-umwelt/umweltschaedliche-subventionen',
      },
    },
  ],
};

const belastungBalken: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Zwei Maßstäbe: Abgabenkeil auf Arbeit, Abgeltungsteuer auf Kapitalerträge',
    typ: 'balken',
    beschreibung:
      'Balkendiagramm zweier unterschiedlicher Belastungsmaße — bewusst nebeneinandergestellt, nicht gleichgesetzt. Der OECD-Abgabenkeil misst Einkommensteuer plus Sozialbeiträge von Arbeitnehmer und Arbeitgeber im Verhältnis zu den gesamten Arbeitskosten eines alleinstehenden Durchschnittsverdieners; er lag 2025 bei 49,3 Prozent (2024: 47,9 Prozent) — der zweithöchste Wert der OECD (Schnitt 35,1 Prozent). Die Abgeltungsteuer misst die Steuer auf private Kapitalerträge (Zinsen, Dividenden, Kursgewinne) oberhalb des Sparer-Pauschbetrags: 25 Prozent plus Solidaritätszuschlag, zusammen 26,375 Prozent — ohne Sozialbeiträge. Die beiden Werte beziehen sich auf verschiedene Bemessungsgrundlagen (Arbeitskosten gegenüber Brutto-Kapitalertrag) und zeigen eine strukturelle Differenz, keinen persönlichen Steuersatzvergleich.',
    caption:
      'Zwei verschiedene Belastungsmaße: OECD-Abgabenkeil auf Arbeit (2025) und Abgeltungsteuer auf private Kapitalerträge (inkl. Soli), in Prozent (26,4 gerundet von 26,375). Kein identischer Maßstab — siehe Hinweis darunter. Quelle: OECD (Taxing Wages 2026); Abgeltungsteuer nach § 32d EStG.',
    encoding: { kategorieFeld: 'einkommensart', yFeld: 'prozent' },
    datensatz: {
      titel: 'Abgabenkeil auf Arbeit (2025) und Abgeltungsteuer auf Kapitalerträge — zwei Maßstäbe',
      quelle: {
        titel: 'OECD — Taxing Wages 2026 (Abgabenkeil Deutschland 2025); Abgeltungsteuer nach § 32d EStG',
        url: 'https://www.oecd.org/en/publications/taxing-wages-2026_3a5169ef-en.html',
        herausgeber: 'OECD / Bundesfinanzministerium',
      },
      spalten: [
        { name: 'einkommensart', label: 'Belastungsmaß', typ: 'string' },
        { name: 'prozent', label: 'Anteil', typ: 'number', einheit: '%' },
      ],
      daten: [
        { einkommensart: 'Abgabenkeil auf Arbeit (2025)', prozent: 49.3 },
        { einkommensart: 'Abgeltungsteuer (inkl. Soli)', prozent: 26.4 },
      ],
    },
  },
};

const sozialfinanzierungTreemap: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Worauf der Sozialstaat ruht: 1,4 Billionen Euro im Jahr',
    typ: 'treemap',
    beschreibung:
      'Treemap der Finanzierung des Sozialbudgets 2024 (insgesamt rund 1.388 Milliarden Euro) nach Geldgebern. Rund zwei Drittel stammen aus Sozialbeiträgen, die an den Lohn gekoppelt sind: Arbeitgeber rund 472 Milliarden (34 Prozent) und Versicherte rund 426 Milliarden (30,7 Prozent). Gut ein Drittel trägt der Staat über Steuerzuschüsse, rund 465 Milliarden (33,5 Prozent). Private Kapitalerträge tragen zu diesen Beiträgen nichts bei.',
    caption:
      'Finanzierung des Sozialbudgets 2024 nach Geldgebern, in Milliarden Euro (Gesamt rund 1.388 Mrd). Quelle: BMAS, Sozialbudget 2024.',
    encoding: { kategorieFeld: 'finanzier', yFeld: 'mrd' },
    datensatz: {
      titel: 'Sozialbudget 2024 nach Geldgebern (BMAS)',
      quelle: {
        titel: 'Sozialbudget 2024',
        url: 'https://www.bmas.de/DE/Service/Publikationen/Broschueren/a230-25-sozialbudget-2024.html',
        herausgeber: 'Bundesministerium für Arbeit und Soziales (BMAS)',
      },
      spalten: [
        { name: 'finanzier', label: 'Geldgeber', typ: 'string' },
        { name: 'mrd', label: 'Betrag', typ: 'number', einheit: 'Mrd €' },
      ],
      daten: [
        { finanzier: 'Arbeitgeber', mrd: 472, beschreibung: 'Arbeitgeberanteile an den Sozialbeiträgen — an die Lohnsumme gekoppelt.' },
        { finanzier: 'Steuerzuschüsse', mrd: 465, beschreibung: 'Zuschüsse aus Steuermitteln von Bund, Ländern und Gemeinden — größter Posten ist der Zuschuss des Bundes zur Rentenversicherung. Aus dem allgemeinen Haushalt, nicht einer einzelnen Steuer zugeordnet (Gesamtdeckungsprinzip).' },
        { finanzier: 'Versicherte', mrd: 426, beschreibung: 'Arbeitnehmeranteile der Beschäftigten — ebenfalls auf den Lohn erhoben.' },
        { finanzier: 'Sonstige', mrd: 25, beschreibung: 'Eigenbeiträge, Erstattungen und Vermögenserträge der Sozialversicherung.' },
      ],
    },
  },
};

const steueraufkommenBalken: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Woraus die Steuern kommen: Umsatz- und Lohnsteuer dominieren',
    typ: 'balken',
    beschreibung:
      'Balkendiagramm der kassenmäßigen Steuereinnahmen 2024 nach Steuerart (ohne reine Gemeindesteuern, insgesamt rund 861 Milliarden Euro; Bundesfinanzministerium). Die mit Abstand größten Posten sind die Umsatzsteuer (302 Milliarden Euro, eine Verbrauchsteuer, die alle beim Einkaufen zahlen) und die Lohnsteuer (249 Milliarden Euro, auf Arbeit) — zusammen rund zwei Drittel. Steuern auf Unternehmensgewinne und Kapitalerträge sind kleiner: Körperschaftsteuer 40, nicht veranlagte Steuern vom Ertrag (überwiegend Gewinnausschüttungen) 34, Abgeltungsteuer 19 Milliarden Euro. Auch der über Steuern finanzierte Teil des Sozialstaats ruht damit breit auf Konsum und Arbeit.',
    caption:
      'Steuereinnahmen 2024 nach Art, in Milliarden Euro (ohne reine Gemeindesteuern). Quelle: Bundesfinanzministerium, Monatsbericht Januar 2025.',
    encoding: { kategorieFeld: 'steuerart', yFeld: 'mrd' },
    datensatz: {
      titel: 'Steuereinnahmen 2024 nach Art (BMF)',
      quelle: {
        titel: 'Bundesfinanzministerium — Steuereinnahmen 2024 (Monatsbericht Januar 2025)',
        url: 'https://www.bundesfinanzministerium.de/Monatsberichte/Ausgabe/2025/01/Inhalte/Kapitel-4-Wirtschafts-und-Finanzlage/4-2-steuereinnahmen-dezember-2024.html',
        herausgeber: 'Bundesfinanzministerium',
      },
      spalten: [
        { name: 'steuerart', label: 'Steuerart', typ: 'string' },
        { name: 'mrd', label: 'Betrag', typ: 'number', einheit: 'Mrd €' },
      ],
      daten: [
        { steuerart: 'Umsatzsteuer', mrd: 302 },
        { steuerart: 'Lohnsteuer', mrd: 249 },
        { steuerart: 'Übrige Steuern', mrd: 107 },
        { steuerart: 'Einkommensteuer (veranlagt)', mrd: 75 },
        { steuerart: 'Körperschaftsteuer', mrd: 40 },
        { steuerart: 'Energiesteuer', mrd: 35 },
        { steuerart: 'Nicht veranlagte Steuern vom Ertrag', mrd: 34 },
        { steuerart: 'Abgeltungsteuer (Zinsen, Kursgewinne)', mrd: 19 },
      ],
    },
  },
};

const volkseinkommenVerhaeltnis: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Ein gutes Viertel ist nicht lohnbezogenes Einkommen',
    typ: 'verhaeltnis',
    beschreibung:
      'Verhältnis-Darstellung als 100 Kacheln: die Zusammensetzung des Volkseinkommens 2024 (rund 3.200 Milliarden Euro). Etwa 74 von 100 Euro sind Arbeitnehmerentgelt (Löhne und Gehälter samt Arbeitgeberbeiträgen), rund 26 Euro sind Unternehmens- und Vermögenseinkommen (rund 840 Milliarden Euro). Diese Größe ist breiter als private Kapitalerträge aus Depots: Sie umfasst auch Unternehmensgewinne und Einkommen Selbstständiger. Sie zeigt also die Bedeutung nicht lohnbezogener Einkommen — nicht direkt, wie viel steuerpflichtige Kapitalerträge private Haushalte erzielen.',
    caption:
      'Zusammensetzung des Volkseinkommens 2024, je 100 Euro (Unternehmens- und Vermögenseinkommen, breiter als private Kapitalerträge). Quelle: Statistisches Bundesamt, Volkswirtschaftliche Gesamtrechnungen.',
    encoding: {
      xFeld: 'bezug',
      yFeld: 'anteil',
      kategorieFeld: 'Löhne und Gehälter (Arbeit)',
      serieFeld: 'Gewinne und Vermögen (Kapital)',
      zweifarbig: true,
    },
    datensatz: {
      titel: 'Volkseinkommen 2024 nach Einkommensart (Destatis, VGR)',
      quelle: {
        titel: 'Statistisches Bundesamt — VGR, Bruttonationaleinkommen und Volkseinkommen 2024',
        url: 'https://www.destatis.de/DE/Themen/Wirtschaft/Konjunkturindikatoren/Volkswirtschaftliche-Gesamtrechnungen/vgr810.html',
        herausgeber: 'Statistisches Bundesamt',
      },
      spalten: [
        { name: 'bezug', label: 'Größe', typ: 'string' },
        { name: 'anteil', label: 'Anteil', typ: 'number', einheit: 'von 100 €' },
      ],
      daten: [{ bezug: 'Volkseinkommen 2024', anteil: 26 }],
    },
  },
};

const vermoegenKonzentration: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Wem das Kapital gehört: 10 % der Haushalte, 54 % des Vermögens',
    typ: 'anteilsbalken',
    beschreibung:
      'Zwei gestapelte 100-Prozent-Balken im Vergleich: oben die Haushalte (reichstes Zehntel 10 Prozent, übrige 90 Prozent), unten das private Nettovermögen (reichstes Zehntel 54 Prozent, übrige 46 Prozent), je gleiche Farbe pro Gruppe. Das reichste Zehntel der Haushalte hält gut die Hälfte des Nettovermögens; die vermögensärmere Hälfte nur gut 2 Prozent (Bundesbank-Vermögensbefragung 2023, PHF). Weil Kapitalerträge — Zinsen, Dividenden, Kursgewinne — aus Vermögen entstehen, sind auch sie stark bei den oberen Haushalten gebündelt, anders als Arbeitseinkommen.',
    caption:
      'Anteil am privaten Nettovermögen gegenüber dem Anteil an den Haushalten, in Prozent. Quelle: Deutsche Bundesbank, Vermögensbefragung 2023 (PHF).',
    encoding: { kategorieFeld: 'bar', serieFeld: 'gruppe', yFeld: 'anteil' },
    datensatz: {
      titel: 'Haushalte und Nettovermögen nach Gruppe (Bundesbank PHF 2023)',
      quelle: {
        titel: 'Deutsche Bundesbank — Vermögen und Finanzen privater Haushalte, Vermögensbefragung 2023 (PHF)',
        url: 'https://publikationen.bundesbank.de/publikationen-de/berichte-studien/monatsberichte/vermoegen-und-finanzen-privater-haushalte-in-deutschland-ergebnisse-der-vermoegensbefragung-2023--954598',
        herausgeber: 'Deutsche Bundesbank',
      },
      spalten: [
        { name: 'bar', typ: 'string' },
        { name: 'gruppe', typ: 'string' },
        { name: 'anteil', typ: 'number', einheit: '%' },
      ],
      daten: [
        { bar: 'Haushalte', gruppe: 'reichstes Zehntel', anteil: 10 },
        { bar: 'Haushalte', gruppe: 'übrige 90 %', anteil: 90 },
        { bar: 'Vermögen', gruppe: 'reichstes Zehntel', anteil: 54 },
        { bar: 'Vermögen', gruppe: 'übrige 90 %', anteil: 46 },
      ],
    },
  },
};

const kapitalDiskurs: BodyBlock = {
  _type: 'diskursBlock',
  _key: key(),
  titel: 'Reformwege, und welche Annahmen dahinterstehen',
  frage: 'Wer soll den Sozialstaat künftig tragen — und welche Einkommen werden einbezogen?',
  einleitung:
    'Aus den gezeigten Unterschieden folgt keine bestimmte Reform — wohl aber ein Streit über die Stellschrauben. Die einen wollen die Finanzierungsbasis verbreitern (alle Erwerbstätigen, auch Kapitaleinkommen), die anderen warnen vor höheren Lasten und Ausweichreaktionen. Stand 2025; Stimmen paraphrasiert, je mit Quelle:',
  perspektiven: [
    {
      label: 'Sozialverband VdK',
      aussage:
        'Alle Erwerbstätigen sollten einzahlen — auch Beamte, Selbstständige, Abgeordnete und Vorstände —, und Beiträge sollten auf jedes Gehalt fällig werden. Eine breitere, solidarische Basis mache den Sozialstaat gerechter und finanzierbar.',
      quelle: {
        titel: 'VdK — Ein guter Sozialstaat ist finanzierbar (Faktenblatt, Jan. 2025)',
        url: 'https://www.vdk.de/deutschland/pages/themen/rente/82897/erwerbstaetigenversicherung',
        herausgeber: 'Sozialverband VdK Deutschland',
      },
    },
    {
      label: 'Sachverständigenrat (SVR)',
      aussage:
        'Eine solidarische Versicherung, in die alle Erwerbstätigen einzahlen, hätte über Jahrzehnte positive Einnahmeeffekte. Zugleich solle das Steuersystem Verzerrungen zwischen den Einkommensarten abbauen.',
      quelle: {
        titel: 'SVR — Jahresgutachten 2023/24 (Erwerbstätigenversicherung, Einnahmeeffekte)',
        url: 'https://www.sachverstaendigenrat-wirtschaft.de/jahresgutachten-2023.html',
        herausgeber: 'Sachverständigenrat zur Begutachtung der gesamtwirtschaftlichen Entwicklung',
      },
    },
    {
      label: 'DIW Berlin (Stefan Bach)',
      aussage:
        'Die pauschale Abgeltungsteuer begünstige hohe Einkommen, deren Kapitalerträge sonst dem Spitzensteuersatz unterlägen. Eine bloße Abschaffung brächte aber wenig, weil Kapital auf Unternehmensebene vorbelastet ist; eine Reform müsse differenziert ansetzen.',
      quelle: {
        titel: 'DIW — Abschaffung der Abgeltungsteuer belastet hohe Einkommen kaum',
        url: 'https://www.diw.de/de/diw_01.c.568703.de/themen_nachrichten/abschaffung_der_abgeltungsteuer_fuehrt_zu_steuerausfaellen_und_belastet_hohe_einkommen_kaum.html',
        herausgeber: 'DIW Berlin',
      },
    },
    {
      label: 'IfW Kiel',
      aussage:
        'Kapitaleinkommen sei bereits auf Unternehmensebene durch die Körperschaftsteuer vorbelastet; die Abgeltungsteuer begünstige es daher nicht, sondern mildere die Doppelbelastung. Höhere Sätze oder Sozialabgaben auf Kapital verteuerten Investitionen.',
      quelle: {
        titel: 'Kiel Institut — Die Abgeltungssteuer begünstigt Kapitaleinkommen nicht',
        url: 'https://www.kielinstitut.de/de/publikationen/kiel-focus/die-abgeltungssteuer-beguenstigt-kapitaleinkommen-nicht/',
        herausgeber: 'IfW Kiel',
      },
    },
    {
      label: 'IW Köln (Tobias Hentze)',
      aussage:
        'Sozialabgaben auf Kapitalerträge würden einen großen Teil der Rendite abschöpfen; eine Bürgerversicherung entlaste den Beitragssatz nur wenig, erhöhe aber die Gesamtlast. Deutschland habe schon einen der höchsten Abgabenkeile — Priorität sei, Arbeit nicht weiter zu verteuern.',
      quelle: {
        titel: 'IW — Sozialabgaben auf Kapitalerträge: Staat würde großen Teil der Rendite kassieren',
        url: 'https://www.iwkoeln.de/presse/iw-nachrichten/tobias-hentze-staat-koennte-grossteil-der-rendite-kassieren.html',
        herausgeber: 'Institut der deutschen Wirtschaft (IW)',
      },
    },
  ],
  einordnung:
    'Mehrere Dinge sind gleichzeitig richtig: Wer arbeitet, trägt über Steuern und Sozialbeiträge fast die Hälfte der Arbeitskosten ab (Abgabenkeil inklusive Arbeitgeberbeiträgen, kein persönlicher Steuersatz), während Kapitalerträge pauschal und ohne Sozialbeiträge belastet werden — und zugleich ist Kapitaleinkommen auf Unternehmensebene bereits vorbesteuert und international beweglich. Ob eine breitere Basis (alle Erwerbstätigen, auch Kapital) den Sozialstaat gerechter und stabiler finanziert oder vor allem die Gesamtlast erhöht und Investitionen bremst, hängt von Annahmen über Verhalten und Abwanderung ab. Das Diagramm zeigt die Belastungsunterschiede; ob sie gerecht sind, bleibt eine politische Frage.',
};

const vergleichMatrix: BodyBlock = {
  _type: 'datentabelleBlock',
  _key: key(),
  caption: 'Was die vier Kennzahlen zeigen — und was nicht (eigene Einordnung der Datenlage).',
  datensatz: {
    titel: 'Aussagekraft der Kennzahlen',
    quelle: { titel: 'GURT — eigene Einordnung der Datenlage' },
    spalten: [
      { name: 'Kennzahl', typ: 'string' },
      { name: 'Aussagefähig für', typ: 'string' },
      { name: 'Nicht aussagefähig für', typ: 'string' },
    ],
    daten: [
      {
        Kennzahl: 'OECD-Abgabenkeil',
        'Aussagefähig für': 'Belastung eines typischen Arbeitsverhältnisses (inkl. Arbeitgeberbeiträge)',
        'Nicht aussagefähig für': 'persönliche Gesamtbelastung aller Haushalte',
      },
      {
        Kennzahl: 'Abgeltungsteuer',
        'Aussagefähig für': 'Belastung bestimmter privater Kapitalerträge',
        'Nicht aussagefähig für': 'Gesamtbelastung von Unternehmensgewinnen',
      },
      {
        Kennzahl: 'Sozialbudget-Finanzierung',
        'Aussagefähig für': 'formale Mittelherkunft',
        'Nicht aussagefähig für': 'ökonomische Lastverteilung (wer sie real trägt)',
      },
      {
        Kennzahl: 'Volkseinkommen',
        'Aussagefähig für': 'Anteil Arbeit vs. Unternehmens-/Vermögenseinkommen',
        'Nicht aussagefähig für': 'steuerpflichtige private Kapitalerträge direkt',
      },
    ],
  },
};

const reformMatrix: BodyBlock = {
  _type: 'datentabelleBlock',
  _key: key(),
  caption: 'Vier Reformideen nach derselben Logik: erwarteter Effekt, zentrale Annahme, zentrale Gegenannahme.',
  datensatz: {
    titel: 'Reformideen, Effekte und Annahmen',
    quelle: { titel: 'GURT — eigene Einordnung; Positionen siehe Diskurs' },
    spalten: [
      { name: 'Reformidee', typ: 'string' },
      { name: 'Erwarteter Effekt', typ: 'string' },
      { name: 'Zentrale Annahme', typ: 'string' },
      { name: 'Zentrale Gegenannahme', typ: 'string' },
    ],
    daten: [
      {
        Reformidee: 'Alle Erwerbstätigen einzahlen lassen',
        'Erwarteter Effekt': 'breitere Finanzierungsbasis',
        'Zentrale Annahme': 'mehr Beitragszahler stabilisieren das System',
        'Zentrale Gegenannahme': 'neue Ansprüche erhöhen langfristig die Ausgaben',
      },
      {
        Reformidee: 'Beitragsbemessungsgrenze anheben',
        'Erwarteter Effekt': 'höhere Einnahmen von hohen Arbeitseinkommen',
        'Zentrale Annahme': 'stärkere Leistungsfähigkeit wird einbezogen',
        'Zentrale Gegenannahme': 'höhere Grenzbelastung auf qualifizierte Arbeit',
      },
      {
        Reformidee: 'Kapitalerträge einbeziehen',
        'Erwarteter Effekt': 'weniger Lohnfixierung',
        'Zentrale Annahme': 'Kapitalerträge sind eine leistungsfähige Quelle',
        'Zentrale Gegenannahme': 'Kapital ist mobiler und teils vorbelastet',
      },
      {
        Reformidee: 'Steuerzuschüsse erhöhen',
        'Erwarteter Effekt': 'Entlastung der Beitragszahler',
        'Zentrale Annahme': 'Sozialstaat ist gesamtgesellschaftliche Aufgabe',
        'Zentrale Gegenannahme': 'Verlagerung in Haushalts- und Steuerkonflikte',
      },
    ],
  },
};

const arbeitKapitalArticle: Article = {
  _id: 'seed-wer-finanziert-den-sozialstaat',
  titel: 'Wer finanziert den Sozialstaat? Arbeit, Steuern und Kapital im Vergleich',
  slug: 'wer-finanziert-den-sozialstaat',
  ressort: 'soziales',
  standfirst:
    'Der Sozialstaat wird vor allem über Löhne, Sozialbeiträge und Steuern finanziert. Kapitalerträge werden anders erfasst und anders belastet. Dieser Beitrag trennt drei Ebenen — Finanzierung, Belastung, Bewertung — und zeigt, was vergleichbar ist und was nicht.',
  veroeffentlicht: '2026-06-05',
  themen: [
    { name: 'Sozialstaat', slug: 'sozialstaat' },
    { name: 'Steuern und Abgaben', slug: 'steuern-und-abgaben' },
  ],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Der Abgabenkeil auf Arbeit stammt aus der OECD-Studie Taxing Wages 2026 (alleinstehende Person mit Durchschnittsverdienst, ohne Kinder; Anteil von Einkommensteuer und Sozialbeiträgen an den gesamten Arbeitskosten, inklusive Arbeitgeberbeiträge): 49,3 Prozent für 2025 (2024: 47,9 Prozent). Er ist kein persönlicher Steuersatz. Die Belastung von Kapitalerträgen ist die Abgeltungsteuer nach § 32d EStG: 25 Prozent zuzüglich Solidaritätszuschlag (zusammen 26,375 Prozent, ggf. Kirchensteuer), erhoben auf Zinsen, Dividenden und Kursgewinne oberhalb des Sparer-Pauschbetrags von 1.000 Euro; Sozialbeiträge fallen darauf nicht an. Die beiden Werte beziehen sich auf unterschiedliche Bemessungsgrundlagen (Arbeitskosten gegenüber Brutto-Kapitalertrag) und zeigen eine strukturelle Differenz, keinen vollständigen persönlichen Steuersatzvergleich. Sozialbeiträge auf Arbeit werden nur bis zur Beitragsbemessungsgrenze erhoben; Kapitalerträge sind auf Unternehmensebene meist bereits durch Körperschaft- und Gewerbesteuer vorbelastet. Steueraufkommen 2024 (kassenmäßig) nach BMF-Monatsbericht Januar 2025, Tabelle „Entwicklung der Steuereinnahmen … (Dezember 2024)“ (bundesfinanzministerium.de): Lohnsteuer 248,9 Mrd Euro; Abgeltungsteuer auf Zins- und Veräußerungserträge 19,3 Mrd Euro (kassenmäßiges Ist für das Gesamtjahr 2024; die Schätzspalte des Arbeitskreises Steuerschätzung vom Oktober 2024 weist rund 18,2 Mrd aus, der Wert stieg 2024 stark an); nicht veranlagte Steuern vom Ertrag (überwiegend Gewinnausschüttungen) 34,0 Mrd Euro. Finanzierung des Sozialbudgets 2024 (BMAS): Volumen rund 1.388 Mrd Euro; die sozialen Leistungen selbst liegen mit rund 1.345 Mrd Euro etwas darunter (Differenz vor allem Verwaltung); die Position „Sonstige“ (rund 25 Mrd Euro) umfasst Eigenbeiträge, Erstattungen und Vermögenserträge der Sozialversicherung. Volkseinkommen 2024 (Volkswirtschaftliche Gesamtrechnungen): rund 3.200 Mrd Euro, davon Arbeitnehmerentgelt rund 74 Prozent; das Unternehmens- und Vermögenseinkommen (rund 840 Mrd Euro) ist breiter als private Kapitalerträge und enthält auch Unternehmensgewinne und Einkommen Selbstständiger. Vermögensverteilung: Deutsche Bundesbank, Vermögensbefragung 2023 (Panel on Household Finances/PHF; veröffentlicht im Monatsbericht April 2025). Das reichste Zehntel der Haushalte hält rund 54 Prozent (genau 53,6 Prozent) des privaten Nettovermögens, die vermögensärmere Hälfte gut 2 Prozent; Nettovermögen = Sach- plus Finanzvermögen abzüglich Schulden. Die Befragung ist eine Stichprobenerhebung; sehr große Vermögen sind erfahrungsgemäß untererfasst, die tatsächliche Konzentration eher höher. Steuereinnahmen 2024 nach Art (kassenmäßig, ohne reine Gemeindesteuern, insgesamt rund 861 Mrd Euro): BMF-Monatsbericht Januar 2025; „Übrige Steuern“ bündelt unter anderem Versicherung-, Tabak-, Grunderwerb- und Stromsteuer sowie den Solidaritätszuschlag. Die staatlichen Zuschüsse zum Sozialbudget sind keinen einzelnen Steuern zugeordnet (Gesamtdeckungsprinzip); das Steuerarten-Diagramm zeigt daher die Struktur des gesamten Steueraufkommens, nicht eine Aufteilung des Zuschusses. Positionen paraphrasiert, je mit Quelle. Alle Online-Quellen abgerufen im Juni 2026.',
  body: [
    block('h2', 'Kurzbefund'),
    block(
      'normal',
      'Der Sozialstaat ist der größte Posten der öffentlichen Hand: Rund 1,4 Billionen Euro flossen 2024 in Renten, Gesundheit, Pflege, Familien und Arbeitslosigkeit. Bezahlt wird das vor allem aus der Arbeit — über die Lohnsteuer und über Sozialbeiträge auf den Lohn. Ein Bild dazu: Von 100 Euro Arbeitskosten gehen fast die Hälfte an Steuern und Abgaben. Von 100 Euro Kapitalertrag — Zinsen, Dividenden, Kursgewinne — ist es gut ein Viertel, und Sozialbeiträge fallen gar nicht an. Der Vergleich ist wichtig, hat aber seine Tücken.',
    ),
    block(
      'normal',
      'Damit er belastbar bleibt, trennt dieser Beitrag drei Ebenen, die oft vermischt werden: erstens die Finanzierung — woher das Geld formal kommt; zweitens die Belastung — welche Einkommensart wie belastet wird; drittens die Bewertung — welche Reformoption welche Nebenwirkungen hätte. Der Beitrag zeigt die Unterschiede; ob sie gerecht sind, bleibt eine politische Frage.',
    ),
    block('h2', 'Wie der Sozialstaat formal finanziert wird'),
    block(
      'normal',
      'Die erste Ebene ist die formale Mittelherkunft: Rund zwei Drittel des Sozialbudgets stammen aus Sozialbeiträgen, die an den Lohn gekoppelt sind, ein knappes Drittel aus Steuerzuschüssen.',
    ),
    sozialfinanzierungTreemap,
    block(
      'normal',
      'Auch das Steueraufkommen ist breiter, als ein einzelner Vergleich vermuten lässt. Die Lohnsteuer brachte 2024 rund 248,9 Milliarden Euro. Die Abgeltungsteuer auf Zins- und Veräußerungserträge lag bei rund 19,3 Milliarden Euro; hinzu kommen nicht veranlagte Steuern vom Ertrag (überwiegend Gewinnausschüttungen) mit rund 34,0 Milliarden Euro sowie weitere Unternehmenssteuern. Ein direkter Vergleich allein von Lohnsteuer und Abgeltungsteuer zeigt daher nur einen Ausschnitt — nicht „Arbeit gegen Kapital“ insgesamt. Auch die steuerfinanzierten Zuschüsse zum Sozialstaat stammen aus diesem breiten Mix, nicht nur aus der Lohnsteuer.',
    ),
    block(
      'normal',
      'Woraus besteht dieser steuerfinanzierte Teil? Aus dem allgemeinen Steuermix — und der wird von zwei Steuern dominiert, die breit auf Konsum und Arbeit liegen.',
    ),
    steueraufkommenBalken,
    block('h2', 'Wie Arbeit und Kapitalerträge belastet werden'),
    block(
      'normal',
      'Die zweite Ebene ist die Belastung einzelner Einkommensarten. Hier lohnt der Vergleich — aber nur mit Vorsicht, weil zwei verschiedene Maße nebeneinanderstehen.',
    ),
    belastungBalken,
    block(
      'blockquote',
      'Wichtig: kein identischer Maßstab. Der Abgabenkeil auf Arbeit misst die Belastung eines typischen Arbeitsverhältnisses inklusive Arbeitgeberbeiträgen. Die Abgeltungsteuer misst die Steuer auf bestimmte private Kapitalerträge. Der Vergleich zeigt eine strukturelle Differenz — aber keinen vollständigen persönlichen Steuersatzvergleich.',
    ),
    block(
      'normal',
      'Auf Arbeit summieren sich Einkommensteuer und Sozialbeiträge: Der OECD-Abgabenkeil lag 2025 bei 49,3 Prozent der Arbeitskosten (2024: 47,9 Prozent) — der zweithöchste Wert der OECD. Den größten Teil machen die Sozialbeiträge aus, rund 41 Prozent des Bruttolohns (Arbeitnehmer und Arbeitgeber je gut 20 Prozent), erhoben bis zur Beitragsbemessungsgrenze; darüber liegende Arbeitseinkommen werden nur anteilig belastet.',
    ),
    block(
      'normal',
      'Auf private Kapitalerträge fällt die Abgeltungsteuer von 25 Prozent plus Solidaritätszuschlag an, zusammen 26,375 Prozent — und keine Sozialbeiträge. Bis zum Sparer-Pauschbetrag von 1.000 Euro im Jahr bleiben sie steuerfrei. Sie gilt einheitlich für Zinsen, Dividenden und Kursgewinne. Wichtig zur Einordnung: Dividenden und Gewinne sind auf Unternehmensebene meist bereits durch Körperschaft- und Gewerbesteuer vorbelastet — die Abgeltungsteuer kommt obendrauf.',
    ),
    block('h2', 'Ein Viertel ist nicht lohnbezogenes Einkommen'),
    block(
      'normal',
      'Nicht lohnbezogenes Einkommen ist keine Randgröße. Vom gesamten Volkseinkommen entfällt gut ein Viertel auf Unternehmens- und Vermögenseinkommen.',
    ),
    volkseinkommenVerhaeltnis,
    block(
      'normal',
      'Diese Größe ist allerdings breiter als die privaten Kapitalerträge, die der Abgeltungsteuer unterliegen: Sie enthält auch einbehaltene Unternehmensgewinne und Einkommen Selbstständiger. Sie zeigt also die Bedeutung nicht lohnbezogener Einkommen — nicht direkt, wie viel steuerpflichtige Kapitalerträge private Haushalte erzielen. Bekannt ist, dass diese Erträge stärker auf Haushalte mit hohen Einkommen und Vermögen konzentriert sind als Arbeitseinkommen.',
    ),
    block(
      'normal',
      'Wem gehört dieses Kapital? Überwiegend den vermögenden Haushalten. Denn Kapitalerträge fließen aus Vermögen — und das ist stark konzentriert.',
    ),
    vermoegenKonzentration,
    block('h2', 'Was der Vergleich zeigt, und was nicht'),
    block(
      'normal',
      'Bevor es um Reformen geht, lohnt der nüchterne Blick auf die Reichweite der vier Kennzahlen. Jede ist für etwas aussagekräftig — und für etwas anderes nicht.',
    ),
    vergleichMatrix,
    block('h2', 'Reformwege und ihre Annahmen'),
    block(
      'normal',
      'Die dritte Ebene ist die Bewertung. Aus den Unterschieden folgt keine bestimmte Reform — jede Stellschraube beruht auf einer Annahme und einer Gegenannahme. Vier Optionen, nach derselben Logik:',
    ),
    reformMatrix,
    block(
      'normal',
      'Hinter diesen Optionen stehen reale Akteure mit unterschiedlichen Gewichtungen. Die wichtigsten Stimmen, je mit Quelle:',
    ),
    kapitalDiskurs,
    block('h2', 'Wo der Streit beginnt'),
    block(
      'normal',
      'Die Daten zeigen: Die Finanzierung der sozialen Sicherung ist in Deutschland stark an Arbeit und Löhne gekoppelt. Kapitalerträge werden anders besteuert und nicht regulär zur Sozialversicherung herangezogen. Daraus folgt aber nicht automatisch eine bestimmte Reform. Wer die Finanzierungsbasis verbreitern will, muss Verteilungswirkungen, die Vorbelastung von Unternehmensgewinnen, Ausweichreaktionen und langfristige Leistungsansprüche mitrechnen. Der Streit beginnt nicht bei der Frage, ob Arbeit und Kapital unterschiedlich behandelt werden — das ist sichtbar. Er beginnt bei der Frage, welche Unterschiede sachlich begründet sind und welche nicht.',
    ),
    {
      _type: 'quellenNote',
      _key: key(),
      text: 'Daten: OECD, Taxing Wages 2026 (Abgabenkeil auf Arbeit, 2025); Abgeltungsteuer nach § 32d EStG (Bundesfinanzministerium); Sozialbudget 2024 (BMAS); Steueraufkommen 2024 (BMF-Monatsbericht Januar 2025); Volkseinkommen 2024 (Statistisches Bundesamt, VGR-Tabelle lrvgr04); Vermögensverteilung 2023 (Deutsche Bundesbank, Vermögensbefragung/PHF). Vergleich unterschiedlicher Bemessungsgrundlagen, Definitionen und Grenzen siehe Methodik; die beiden Übersichtstabellen sind eigene Einordnungen.',
      quelle: {
        titel: 'OECD — Taxing Wages 2026',
        url: 'https://www.oecd.org/en/publications/taxing-wages-2026_3a5169ef-en.html',
      },
    },
  ],
};

/* ── ART-10 · Ganztag in der Grundschule (Rechtsanspruch ab 1.8.2026) ─────────────── */

const ganztagVerhaeltnis: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Betreut — und gewünscht: je 100 Grundschulkinder',
    typ: 'verhaeltnis',
    beschreibung:
      'Verhältnis-Darstellung als 100 Kinder-Icons je Zeile: Bundesweit besuchten 2024 rund 57 von 100 Kindern im Grundschulalter ein Ganztagsangebot (Ganztagsschule oder Hort beziehungsweise Tageseinrichtung; Übermittagsbetreuung zählt nicht dazu). Eltern von rund 65 von 100 Kindern wünschten sich ein solches Angebot. Die Differenz von rund acht Kindern je 100 ist die bundesweite Bedarfslücke — sie verteilt sich sehr ungleich über die Länder.',
    caption:
      'Je 100 Kinder im Grundschulalter, 2024: ganztags betreut (57) und von den Eltern gewünscht (65). Quellen: GaFöG-Evaluationsbericht (BMBFSFJ, 2025); DJI-Kinderbetreuungsreport (Hüsken et al., 2025), zusammengeführt im IW-Report 7/2026.',
    encoding: { xFeld: 'gruppe', yFeld: 'anteil', kategorieFeld: 'übrige Kinder', serieFeld: 'betreut bzw. gewünscht' },
    datensatz: {
      titel: 'Ganztagsbetreuung und Elternbedarf je 100 Grundschulkinder (2024)',
      quelle: {
        titel: 'IW-Report 7/2026 — Ganztagsbetreuung für Grundschulkinder (Datenbasis: GaFöG-Evaluation BMBFSFJ 2025; DJI-Kinderbetreuungsreport, Hüsken et al. 2025)',
        url: 'https://www.iwkoeln.de/fileadmin/user_upload/Studien/Report/PDF/2026/IW-Report_2026-Ganztagsbetreuung-Grundsch%C3%BCler.pdf',
        herausgeber: 'Institut der deutschen Wirtschaft (IW)',
      },
      spalten: [
        { name: 'gruppe', typ: 'string' },
        { name: 'anteil', typ: 'number', einheit: 'von 100' },
      ],
      daten: [
        { gruppe: 'Ganztags betreut (2024)', anteil: 57 },
        { gruppe: 'Von Eltern gewünscht (2024)', anteil: 65 },
      ],
    },
  },
};

const ganztagBeeswarm: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Zwischen 99 und 34 Prozent: die Länder im Vergleich',
    typ: 'beeswarm',
    beschreibung:
      'Beeswarm-Diagramm: Ganztagsbetreuungsquote von Kindern im Grundschulalter 2024, je ein Punkt pro Bundesland. Die Spannweite ist enorm: Hamburg erreicht 99 Prozent, dahinter folgen die ostdeutschen Länder (Sachsen 88, Thüringen 87, Berlin 85, Brandenburg 84, Mecklenburg-Vorpommern 78, Sachsen-Anhalt 77 Prozent). Am unteren Ende stehen westdeutsche Flächenländer: Schleswig-Holstein 42 und Bayern (hervorgehoben) 34 Prozent. Eine gestrichelte Linie markiert den Bundesschnitt von 57 Prozent.',
    caption:
      'Ganztagsbetreuungsquote von Kindern im Grundschulalter 2024, je ein Punkt pro Bundesland; Bayern hervorgehoben, gestrichelt der Bundesschnitt (57 %). Quelle: GaFöG-Evaluationsbericht (BMBFSFJ, 2025), zusammengestellt im IW-Report 7/2026.',
    encoding: {
      xFeld: 'Ganztagsbetreuungsquote 2024 (%)',
      yFeld: 'quote',
      kategorieFeld: 'land',
      highlight: 'Bayern',
      refWert: 57,
      refLabel: 'Bundesschnitt (57 %)',
    },
    datensatz: {
      titel: 'Ganztagsbetreuungsquoten von Grundschulkindern nach Bundesland (Schuljahr 2023/24)',
      quelle: {
        titel: '3. Bericht zum Ganztagsförderungsgesetz (BMBFSFJ, Dezember 2025); Zusammenstellung: IW-Report 7/2026, Abb. 2-2',
        url: 'https://www.bmbfsfj.bund.de/resource/blob/276950/0683672d9bc1b4f3cb17402e2a70297e/3-gafoeg-bericht-data.pdf',
        herausgeber: 'Bundesministerium für Bildung, Familie, Senioren, Frauen und Jugend',
      },
      spalten: [
        { name: 'land', typ: 'string' },
        { name: 'quote', typ: 'number', einheit: '%' },
      ],
      daten: [
        { land: 'Hamburg', quote: 99 },
        { land: 'Sachsen', quote: 88 },
        { land: 'Thüringen', quote: 87 },
        { land: 'Berlin', quote: 85 },
        { land: 'Brandenburg', quote: 84 },
        { land: 'Mecklenburg-Vorpommern', quote: 78 },
        { land: 'Sachsen-Anhalt', quote: 77 },
        { land: 'Saarland', quote: 63 },
        { land: 'Hessen', quote: 59 },
        { land: 'Bremen', quote: 58 },
        { land: 'Niedersachsen', quote: 55 },
        { land: 'Rheinland-Pfalz', quote: 55 },
        { land: 'Nordrhein-Westfalen', quote: 53 },
        { land: 'Baden-Württemberg', quote: 49 },
        { land: 'Schleswig-Holstein', quote: 42 },
        { land: 'Bayern', quote: 34 },
      ],
    },
  },
};

const ganztagLueckeBalken: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Wo bis 2029/30 Plätze fehlen — gemessen am heutigen Elternbedarf',
    typ: 'balken',
    beschreibung:
      'Balkendiagramm des rechnerischen Ausbaubedarfs an Ganztagsplätzen bis zum Schuljahr 2029/2030 in den neun Ländern mit Lücke (IW-Modellrechnung auf Basis der Elternbedarfe 2024): Nordrhein-Westfalen 45.300, Bayern 42.300, Baden-Württemberg 22.400, Hessen 16.200, Schleswig-Holstein 10.400, Rheinland-Pfalz 6.800, Bremen 2.400, Saarland 2.200, Niedersachsen 1.700 — zusammen 149.700 Plätze. Alle ostdeutschen Länder und Hamburg können den Anspruch nach dieser Rechnung ohne weiteren Ausbau erfüllen. Die Tabelle weist zusätzlich die relative Lücke in Prozentpunkten aus, bezogen auf die erwartete Zahl der Grundschulkinder 2029/30 — dort führen Schleswig-Holstein (10), Bremen (9) und Bayern (8).',
    caption:
      'Rechnerischer Ausbaubedarf an Ganztagsplätzen bis zum Schuljahr 2029/30, gemessen an den Elternbedarfen 2024; Summe: 149.700. Bei einer einheitlichen Bedarfsquote von 75 % läge er bei 570.900. Die relative Lücke (Prozentpunkte, bezogen auf die erwartete Kinderzahl 2029/30) steht in der Tabelle. Quelle: IW-Report 7/2026, Tabelle 3-1 (Modellrechnung).',
    encoding: { kategorieFeld: 'land', yFeld: 'plaetze' },
    datensatz: {
      titel: 'Rechnerischer Ausbaubedarf an Ganztagsplätzen bis 2029/30 (Elternbedarfe 2024)',
      quelle: {
        titel: 'IW-Report 7/2026, Tabelle 3-1 (eigene Berechnungen IW; Datenbasis BMBFSFJ 2025, Hüsken et al. 2025, Statistisches Bundesamt 2026)',
        url: 'https://www.iwkoeln.de/fileadmin/user_upload/Studien/Report/PDF/2026/IW-Report_2026-Ganztagsbetreuung-Grundsch%C3%BCler.pdf',
        herausgeber: 'Institut der deutschen Wirtschaft (IW)',
      },
      spalten: [
        { name: 'land', typ: 'string' },
        { name: 'plaetze', label: 'Plätze', typ: 'number', einheit: 'Plätze' },
        { name: 'luecke', label: 'Lücke', typ: 'number', einheit: 'Prozentpunkte' },
      ],
      daten: [
        { land: 'Nordrhein-Westfalen', plaetze: 45300, luecke: 7 },
        { land: 'Bayern', plaetze: 42300, luecke: 8 },
        { land: 'Baden-Württemberg', plaetze: 22400, luecke: 5 },
        { land: 'Hessen', plaetze: 16200, luecke: 7 },
        { land: 'Schleswig-Holstein', plaetze: 10400, luecke: 10 },
        { land: 'Rheinland-Pfalz', plaetze: 6800, luecke: 4 },
        { land: 'Bremen', plaetze: 2400, luecke: 9 },
        { land: 'Saarland', plaetze: 2200, luecke: 6 },
        { land: 'Niedersachsen', plaetze: 1700, luecke: 1 },
      ],
    },
  },
};

const ganztagDiskurs: BodyBlock = {
  _type: 'diskursBlock',
  _key: key(),
  titel: 'Kommt der Anspruch rechtzeitig in die Fläche?',
  frage: 'Kann der Rechtsanspruch ab August 2026 flächendeckend eingelöst werden — und zu welcher Qualität?',
  einleitung:
    'Dass der Ganztag Familien entlastet und Bildungschancen verbessern kann, ist breiter Konsens; gestritten wird über Tempo, Geld, Personal und Qualität. Stand: Januar bis Juni 2026; Stimmen paraphrasiert, mit Quelle:',
  perspektiven: [
    {
      label: 'Bundesregierung (BMBFSFJ)',
      aussage:
        'Der Rechtsanspruch komme wie beschlossen: ab August 2026 für die erste Klassenstufe, danach aufwachsend. Er verbessere Bildungs- und Teilhabechancen der Kinder und die Vereinbarkeit von Familie und Beruf; der Bund beteilige sich mit 3,5 Milliarden Euro an den Investitionen und dauerhaft an den Betriebskosten.',
      quelle: {
        titel: 'BMBFSFJ — Das Ganztagsförderungsgesetz (GaFöG)',
        url: 'https://www.bmbfsfj.bund.de/bmbfsfj/ministerium/gesetze/gesetz-rechtsanspruch-ganztagsbetreuung-grundschulen-178966',
        herausgeber: 'Bundesministerium für Bildung, Familie, Senioren, Frauen und Jugend',
      },
    },
    {
      label: 'Städte- und Gemeindebund (DStGB)',
      aussage:
        'Wegen fehlender Fachkräfte und der angespannten kommunalen Finanzlage drohten ab August 2026 Umsetzungsprobleme; in der Bundestagsanhörung im Januar 2026 plädierte der Verband dafür, den Start des Rechtsanspruchs zu verschieben.',
      quelle: {
        titel: 'Deutscher Bundestag — Anhörung zur Ganztagsbetreuung in der Ferienzeit (26.01.2026)',
        url: 'https://www.bundestag.de/dokumente/textarchiv/2026/kw05-pa-bildung-0-1136250',
        herausgeber: 'Deutscher Bundestag',
      },
    },
    {
      label: 'GEW (Bildungsgewerkschaft)',
      aussage:
        'Ohne gut ausgebildete Fachkräfte bleibe der Rechtsanspruch ein leeres Versprechen: Bis 2030 fehlten rund 100.000 zusätzliche pädagogische Beschäftigte (Fachkräfte-Radar der Bertelsmann Stiftung, 2022), und es brauche bundesweit verbindliche Qualitätsstandards für den Ganztag statt eines reinen Platzausbaus.',
      quelle: {
        titel: 'GEW — Recht auf Ganztagsbetreuung (Themenseite, „15 Punkte für einen guten Ganztag“)',
        url: 'https://www.gew.de/ganztag',
        herausgeber: 'Gewerkschaft Erziehung und Wissenschaft (GEW)',
      },
    },
    {
      label: 'Institut der deutschen Wirtschaft (IW)',
      aussage:
        'Der Osten und Hamburg erfüllten den Anspruch schon heute; im übrigen Westdeutschland fehlten — gemessen am Elternbedarf — noch rund 149.700 Plätze. Sinkende Kinderzahlen schlössen einen Teil der Lücke von selbst; die Länder sollten zudem prüfen, ob Ausgestaltung und Elternbeiträge die Nutzung hemmen, denn Ganztag diene Vereinbarkeit wie Teilhabechancen.',
      quelle: {
        titel: 'IW-Report 7/2026 — Ganztagsbetreuung für Grundschulkinder (Geis-Thöne, 25.02.2026)',
        url: 'https://www.iwkoeln.de/fileadmin/user_upload/Studien/Report/PDF/2026/IW-Report_2026-Ganztagsbetreuung-Grundsch%C3%BCler.pdf',
        herausgeber: 'Institut der deutschen Wirtschaft (IW)',
      },
    },
    {
      label: 'Bildungsforschung (Rauschenbach, TU Dortmund)',
      aussage:
        'Gerade die Ferienzeiten seien der wunde Punkt: Die Jugendarbeit könne die Betreuung dort ohne zusätzliches Personal und zusätzliche Finanzmittel nicht rechtsanspruchserfüllend leisten — der Gesetzgeber dürfe Lücken nicht nur formal schließen.',
      quelle: {
        titel: 'Deutscher Bundestag — Anhörung zur Ganztagsbetreuung in der Ferienzeit (26.01.2026)',
        url: 'https://www.bundestag.de/dokumente/textarchiv/2026/kw05-pa-bildung-0-1136250',
        herausgeber: 'Deutscher Bundestag',
      },
    },
  ],
  einordnung:
    'Der Befund ist zwischen den Beteiligten kaum strittig: Im Osten und in Hamburg ist der Anspruch nach diesen Quoten rechnerisch erfüllt, im Westen fehlen Plätze und Personal — und ob bestehende Angebote die Ferienanforderung des Gesetzes erfüllen, ist vielerorts offen, nicht nur im Westen. Der Streit dreht sich um die Konsequenz — starten und nachbessern (Bund), verschieben (Kommunen) oder zuerst Qualität und Personal sichern (GEW). Mehrere Ziele sind hier gleichzeitig berechtigt: ein einklagbares Versprechen an Familien, solide Kommunalfinanzen und gute pädagogische Qualität. Alle drei zugleich, bis August — das ist die eigentliche Wette des Gesetzes.',
};

const ganztagArticle: Article = {
  _id: 'seed-ganztag',
  slug: 'ganztag-grundschule-rechtsanspruch',
  titel: 'Ganztag in der Grundschule: Reicht das Tempo für den Rechtsanspruch?',
  ressort: 'soziales',
  standfirst:
    'Ab dem 1. August 2026 hat jedes Kind, das neu eingeschult wird, Anspruch auf Ganztagsbetreuung — acht Stunden, fünf Tage, auch in den Ferien. Bundesweit besuchen 57 von 100 Grundschulkindern heute ein Ganztagsangebot, Eltern wünschen es für 65; zwischen Hamburg (99 Prozent) und Bayern (34 Prozent) liegen Welten. Die Zahlen zeigen, wo Plätze fehlen, wo nicht — und worüber kurz vor dem Start gestritten wird.',
  veroeffentlicht: '2026-06-12',
  themen: [
    { name: 'Bildung', slug: 'bildung' },
    { name: 'Familie', slug: 'familie' },
  ],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Datenquellen und Abgrenzungen: Die Ganztagsbetreuungsquoten je Bundesland beziehen sich auf das Schuljahr 2023/24 (amtliche Schul- sowie Kinder- und Jugendhilfestatistik; im Beitrag vereinfachend als „2024“ geführt) und stammen aus dem 3. Bericht zum Ganztagsförderungsgesetz (BMBFSFJ, Dezember 2025); sie zählen Kinder im Grundschulalter in Ganztagsschulen und Horten beziehungsweise Tageseinrichtungen — Übermittagsbetreuung zählt nicht dazu. Die Bedarfsquoten stammen aus der DJI-Kinderbetreuungsstudie (Elternbefragung 2024; Kinderbetreuungsreport, Hüsken et al., 2025) und geben den von Eltern geäußerten Wunsch wieder; sie beruhen auf einer repräsentativen Stichprobe, Länderwerte tragen daher Stichprobenunsicherheit und sind als Größenordnungen zu lesen. Wunsch und tatsächliche Inanspruchnahme können auseinanderfallen. Beide Reihen sind im IW-Report 7/2026 (Geis-Thöne, 25.02.2026) zusammengeführt; der rechnerische Ausbaubedarf bis zum Schuljahr 2029/30 (Tabelle 3-1) ist eine IW-Modellrechnung: aktueller Platzbestand fortgeschrieben und an der für 2029/30 erwarteten Zahl der Grundschulkinder (Statistisches Bundesamt, 2026) gemessen. Zwei Szenarien: an den Elternbedarfen 2024 gemessen fehlen 149.700 Plätze; bei einer einheitlichen Referenz-Bedarfsquote von 75 Prozent wären es 570.900 — die Spannbreite zeigt, wie stark das Ergebnis von der Bedarfsannahme abhängt. Nicht eingerechnet ist, ob bestehende Angebote alle GaFöG-Anforderungen erfüllen; insbesondere die Ferienbetreuung (Anspruch bis auf maximal vier Wochen Schließzeit) ist in den Quoten nicht abgebildet, die tatsächliche Lücke kann daher größer sein. Rechtsrahmen: GaFöG von 2021, verankert im SGB VIII — Anspruch ab 01.08.2026 für Klassenstufe 1, jährlich aufwachsend, ab Schuljahr 2029/30 für die Klassen 1 bis 4; Umfang acht Zeitstunden an fünf Werktagen, Unterrichtszeit wird angerechnet. Bundesmittel laut BMBFSFJ: 3,5 Milliarden Euro Investitionsfinanzhilfen, Betriebskostenbeteiligung 2026–2029 insgesamt 2,49 Milliarden Euro, ab 2030 jährlich 1,3 Milliarden Euro. Positionen (Stand Januar–Juni 2026) sind paraphrasiert und bequellt. Alle Online-Quellen abgerufen im Juni 2026.',
  body: [
    block('h2', 'Worum es geht'),
    block(
      'normal',
      'Im Herbst 2021 hat der Gesetzgeber den Familien ein Versprechen gemacht: Mit dem Ganztagsförderungsgesetz (GaFöG) bekommt jedes Kind, das ab August 2026 eingeschult wird, einen einklagbaren Anspruch auf ganztägige Förderung — acht Zeitstunden an fünf Werktagen, die Unterrichtszeit eingerechnet, und das auch in den Ferien bis auf höchstens vier Wochen Schließzeit. Der Anspruch wächst jedes Jahr um eine Klassenstufe mit; ab dem Schuljahr 2029/30 gilt er für alle Grundschulkinder.',
    ),
    block(
      'normal',
      'Sieben Wochen vor dem Start lohnt der nüchterne Blick auf die Zahlen. Drei Fragen führen durch den Beitrag: Wo steht das Angebot heute? Wie groß ist die Lücke bis 2029/30 — und wo liegt sie? Und woran könnte das Versprechen in der Praxis scheitern?',
    ),
    block('h2', 'Wo das Land steht'),
    block(
      'normal',
      'Bundesweit besuchten 2024 rund 57 von 100 Kindern im Grundschulalter ein Ganztagsangebot — in einer Ganztagsschule, im Hort oder einer anderen Tageseinrichtung. Der Wunsch der Eltern liegt darüber: Für rund 65 von 100 Kindern hätten sie gern einen Platz. Die Lücke von acht Kindern je 100 klingt überschaubar — sie verteilt sich aber extrem ungleich.',
    ),
    ganztagVerhaeltnis,
    block('h2', 'Der Osten und Hamburg erfüllen den Anspruch rechnerisch schon heute'),
    block(
      'normal',
      'Alle ostdeutschen Länder — Berlin eingeschlossen — und Hamburg betreuen bereits heute gut drei Viertel bis nahezu alle Grundschulkinder ganztags — getragen von gewachsenen Hortsystemen und teils von Landesansprüchen, die über das GaFöG hinausgehen: Sachsen-Anhalt etwa garantiert Betreuung bis zur sechsten Klasse, in Mecklenburg-Vorpommern ist sie für Eltern im Grundsatz beitragsfrei. Am anderen Ende stehen westdeutsche Flächenländer — Schleswig-Holstein bei 42, Bayern bei 34 Prozent. Auch beim Elternbedarf ist die Spreizung groß: Im Saarland wünschen sich Eltern für 74 von 100 Kindern einen Platz, in Bayern für 43.',
    ),
    ganztagBeeswarm,
    block('h2', 'Die Lücke bis 2029/30, und wovon ihre Größe abhängt'),
    block(
      'normal',
      'Gemessen an den heutigen Elternbedarfen müssten im Westen — außer in Hamburg — bis zum Schuljahr 2029/30 noch rund 149.700 Ganztagsplätze entstehen. Fast ein Drittel entfällt auf Nordrhein-Westfalen, gefolgt von Bayern; relativ zur erwarteten Zahl der Grundschulkinder 2029/30 ist die Lücke in Schleswig-Holstein (10 Prozentpunkte), Bremen (9) und Bayern (8) am größten. Zwei Dinge relativieren die Zahl — in beide Richtungen: Sinkende Kinderzahlen schließen einen Teil der Lücke von selbst, in Bayern und Baden-Württemberg allerdings erst nach dem Höchststand 2027/28. Und: Stiegen die Bedarfe im Westen auf eine Referenzquote von 75 Prozent — ein Niveau noch unter allen Ost-Bedarfswerten, nahe dem Ist-Stand Sachsen-Anhalts (77) und der Bedarfsquote des Saarlands (74) —, läge der Bedarf bei 570.900 Plätzen, allein 204.300 davon in Bayern.',
    ),
    ganztagLueckeBalken,
    block('h2', 'Der wunde Punkt: Ferien und Personal'),
    block(
      'normal',
      'In den Quoten steckt eine Unschärfe, die im Alltag entscheidend ist: Der Rechtsanspruch umfasst die Ferien — viele Ganztagsangebote im Westen enden aber mit dem Schultag. Der Bundestag verhandelte deshalb im Januar 2026 einen Gesetzentwurf, der Angebote der Jugendarbeit für die Ferienbetreuung öffnen soll; in der Anhörung bezweifelten Fachleute, dass das ohne zusätzliches Personal und Geld trägt. Und der Bund zahlt mit: 3,5 Milliarden Euro für Investitionen, dazu Betriebskostenbeteiligungen von insgesamt 2,49 Milliarden Euro bis 2029 und 1,3 Milliarden jährlich ab 2030 — aus Sicht der Kommunen zu wenig, aus Sicht des Bundes ein dauerhafter Einstieg.',
    ),
    ganztagDiskurs,
    {
      _type: 'quellenNote',
      _key: key(),
      text: 'Betreuungsquoten (Schuljahr 2023/24): 3. Bericht zum Ganztagsförderungsgesetz (BMBFSFJ, Dezember 2025). Elternbedarfe 2024: DJI-Kinderbetreuungsreport (Hüsken et al., 2025; dji.de). Modellrechnung zum Ausbaubedarf: IW-Report 7/2026 (Geis-Thöne). Rechtsrahmen und Bundesmittel: BMBFSFJ (GaFöG, SGB VIII). Positionen: Bundestagsanhörung vom 26.01.2026, GEW (Fachkräfte-Zahl: Bertelsmann Stiftung 2022), BMBFSFJ, IW.',
      quelle: {
        titel: '3. Bericht zum Ganztagsförderungsgesetz (BMBFSFJ, PDF)',
        url: 'https://www.bmbfsfj.bund.de/resource/blob/276950/0683672d9bc1b4f3cb17402e2a70297e/3-gafoeg-bericht-data.pdf',
      },
    },
  ],
};

// Beitrag „China-Abhängigkeit: Wie viel De-Risking ist möglich?“ — echte, bequellte Daten.
const chinaHandelLinie: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Deutscher Warenhandel mit China: Ein- und Ausfuhren 2022–2025',
    typ: 'linie',
    beschreibung:
      'Liniendiagramm des deutschen Warenhandels mit China 2022–2025, in Milliarden Euro. Die Ausfuhren nach China sinken seit 2022 (106,8) Jahr für Jahr: 97,3 (2023), 90,0 (2024), 81,3 (2025). Die Einfuhren aus China liegen weit darüber: nach dem Höchststand 2022 (191,1) gingen sie auf 155,7 (2023) und 156,3 (2024) zurück und stiegen 2025 wieder auf 170,6. So bleibt ein strukturelles Handelsdefizit — 2025 rund 89 Milliarden Euro.',
    caption:
      'Deutscher Warenhandel mit China 2022–2025, in Mrd. Euro. Der Abstand zwischen Ein- und Ausfuhren ist das Handelsdefizit. Quelle: Statistisches Bundesamt (Ausfuhren und Defizit amtlich; Einfuhren 2022/2023 daraus abgeleitet — siehe Methodik —, 2024/2025 amtlich).',
    encoding: { xFeld: 'jahr', yFeld: 'mrd', serieFeld: 'reihe' },
    datensatz: {
      titel: 'Deutscher Warenhandel mit China — Aus- und Einfuhren 2022–2025 (Mrd. Euro)',
      quelle: {
        titel: 'Statistisches Bundesamt — Außenhandel mit China (Pressemitteilungen 2025/2026)',
        url: 'https://www.destatis.de/DE/Presse/Pressemitteilungen/2026/02/PD26_056_51.html',
        herausgeber: 'Statistisches Bundesamt',
      },
      spalten: [
        { name: 'jahr', typ: 'string' },
        { name: 'reihe', typ: 'string' },
        { name: 'mrd', typ: 'number', einheit: 'Mrd. Euro' },
      ],
      daten: [
        { jahr: '2022', reihe: 'Einfuhren aus China', mrd: 191.1 },
        { jahr: '2023', reihe: 'Einfuhren aus China', mrd: 155.7 },
        { jahr: '2024', reihe: 'Einfuhren aus China', mrd: 156.3 },
        { jahr: '2025', reihe: 'Einfuhren aus China', mrd: 170.6 },
        { jahr: '2022', reihe: 'Ausfuhren nach China', mrd: 106.8 },
        { jahr: '2023', reihe: 'Ausfuhren nach China', mrd: 97.3 },
        { jahr: '2024', reihe: 'Ausfuhren nach China', mrd: 90.0 },
        { jahr: '2025', reihe: 'Ausfuhren nach China', mrd: 81.3 },
      ],
    },
  },
};

const chinaRohstoffBalken: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Seltene Erden: Chinas Anteil an den deutschen Importen sinkt',
    typ: 'balken',
    beschreibung:
      'Balkendiagramm: Anteil Chinas an der nach Deutschland importierten Menge seltener Erden, 2023 bis 2025 (Statistisches Bundesamt). Der direkte China-Anteil sank von 69,1 Prozent (2023) über 65,5 Prozent (2024) auf 55,4 Prozent (2025) — der mit Abstand deutlichste Rückgang unter den deutschen Einfuhren aus China, aber weiterhin die Mehrheit der Menge. Einzelne Stoffe sind stärker konzentriert: Lanthanverbindungen — der Großteil der deutschen Importmenge, unter anderem für Akkus — kamen 2024 zu 76,3 Prozent aus China; bei den Magnet-Metallen Neodym, Praseodym und Samarium (für Elektromotoren) importiert Deutschland laut amtlicher Statistik „nahezu vollständig“ aus China, einen Prozentwert nennt sie dafür nur EU-weit (97,7 Prozent, 2024). Die Anteile messen das direkte Herkunftsland der Importmenge, nicht zwingend den Förderort.',
    caption:
      'China-Anteil an der nach Deutschland importierten Menge seltener Erden, 2023–2025 (in Prozent der Importmenge). Quelle: Statistisches Bundesamt (Pressemitteilungen April 2025 und April 2026). Anteil = direktes Herkunftsland, nicht zwingend Förder- oder Verarbeitungsort.',
    encoding: { kategorieFeld: 'jahr', yFeld: 'anteil' },
    datensatz: {
      titel: 'China-Anteil an deutschen Importen seltener Erden, 2023–2025',
      quelle: {
        titel: 'Statistisches Bundesamt — Seltene Erden überwiegend aus China (Pressemitteilungen 2025/2026)',
        url: 'https://www.destatis.de/DE/Presse/Pressemitteilungen/2026/04/PD26_N023_51.html',
        herausgeber: 'Statistisches Bundesamt',
      },
      spalten: [
        { name: 'jahr', typ: 'string' },
        { name: 'anteil', typ: 'number', einheit: '% der Importmenge' },
      ],
      daten: [
        { jahr: '2023', anteil: 69.1 },
        { jahr: '2024', anteil: 65.5 },
        { jahr: '2025', anteil: 55.4 },
      ],
    },
  },
};

const chinaDiskurs: BodyBlock = {
  _type: 'diskursBlock',
  _key: key(),
  titel: 'Wie über das De-Risking gestritten wird',
  frage: 'Wie weit soll Deutschland seine wirtschaftlichen Abhängigkeiten von China verringern — und zu welchem Preis?',
  einleitung:
    'Seit der China-Strategie 2023 ist „De-Risking, nicht Decoupling“ die offizielle Linie: Risiken mindern, ohne sich zu entkoppeln. Umstritten ist, wie kritisch die Abhängigkeiten wirklich sind, wie weit eine Entflechtung gehen soll, wie schnell — und ob sie überhaupt geschieht. Ausgewählte Stimmen (paraphrasiert, mit Quelle):',
  perspektiven: [
    {
      label: 'Bundesregierung (China-Strategie 2023)',
      aussage:
        'Eine Reduzierung von Risiken (De-Risking) sei dringend erforderlich, eine Entkopplung der Volkswirtschaften (De-Coupling) lehne man jedoch ab. China setze seine wirtschaftliche Macht gezielt ein, um politische Ziele zu verfolgen — einseitige Abhängigkeiten bei kritischen Gütern müssten deshalb verringert werden.',
      quelle: {
        titel: 'Die China-Strategie der Bundesregierung (2023)',
        url: 'https://www.auswaertiges-amt.de/de/aussenpolitik/asien/china-strategie-2607934',
        herausgeber: 'Auswärtiges Amt',
      },
    },
    {
      label: 'BDI (Industrie)',
      aussage:
        'Der Industrieverband hält die De-Risking-Strategie für richtig, warnt aber vor einer Entkopplung: China bleibe ein zentraler Absatzmarkt und Lieferant. Diversifizierung sei nötig, müsse aber unternehmerisch und mit Augenmaß erfolgen, nicht als politisch verordneter Rückzug.',
      quelle: {
        titel: 'BDI — Außenwirtschaft: China',
        url: 'https://bdi.eu/themenfelder/aussenwirtschaft/china',
        herausgeber: 'Bundesverband der Deutschen Industrie',
      },
    },
    {
      label: 'Automobilindustrie (VW / VDA)',
      aussage:
        'Für die exportstarke Autoindustrie ist China der mit Abstand wichtigste Einzelmarkt. Volkswagen verlängerte 2024 sein Gemeinschaftsunternehmen mit SAIC bis 2040 und setzt auf „In China, für China“ — lokale Entwicklung und Lieferketten, um im Markt zu bleiben und zugleich weniger erpressbar zu werden. Ein konfrontativer Rückzug würde Wettbewerbsfähigkeit und Arbeitsplätze kosten.',
      quelle: {
        titel: 'Volkswagen Group — China Capital Markets Day 2024',
        url: 'https://www.volkswagen-group.com/en/china-capital-markets-day-2024-by-the-volkswagen-group-18251',
        herausgeber: 'Volkswagen Group',
      },
    },
    {
      label: 'IW Köln (Jürgen Matthes)',
      aussage:
        'In den Daten sei vom De-Risking „keine Spur“: Chinas Anteil an den deutschen Wareneinfuhren stieg 2024 auf 11,9 Prozent, die Importe aus China nahmen zu. Politische Rhetorik und reales Beschaffungsverhalten der Unternehmen klafften auseinander; bei vielen Vorprodukten bestehe weiter eine hohe Abhängigkeit.',
      quelle: {
        titel: 'Deutsche Einfuhren aus China 2024: Von De-Risking keine Spur',
        url: 'https://www.iwkoeln.de/presse/iw-nachrichten/juergen-matthes-von-de-risking-keine-spur.html',
        herausgeber: 'Institut der deutschen Wirtschaft (IW)',
      },
    },
    {
      label: 'ifo Institut (Lisandra Flach)',
      aussage:
        'Eine breite Ent-Globalisierung wäre sehr teuer: Eine Modellrechnung des Instituts beziffert den Wohlstandsverlust einer umfassenden Rückverlagerung der Produktion nach Deutschland auf rund 10 Prozent des BIP. Eine reine Handels-Entkopplung allein von China schlägt im Modell dagegen weit geringer zu Buche (etwa ein halbes Prozent). Die Schlussfolgerung: nicht pauschal entkoppeln, sondern einseitige Abhängigkeiten bei wirklich kritischen Gütern gezielt verringern.',
      quelle: {
        titel: 'ifo-Studie für die vbw: Geopolitische Herausforderungen und das deutsche Wirtschaftsmodell (2022)',
        url: 'https://www.ifo.de/DocDL/Studie_Geopolitische_Herausforderungen_Folgen_deutsches_Wirtschaftsmodell.pdf',
        herausgeber: 'ifo Institut',
      },
    },
    {
      label: 'MERICS (China-Forschung)',
      aussage:
        'Während China sich wirtschaftlich zunehmend von Europa unabhängig mache, wachse Deutschlands Abhängigkeit von China weiter. Darin liege ein strategisches Risiko, weil China wirtschaftliche Hebel im Konfliktfall politisch einsetzen könne. De-Risking müsse deshalb über einzelne Rohstoffe hinaus gedacht werden.',
      quelle: {
        titel: 'MERICS — Nationale Perspektiven für das De-Risking Europas gegenüber China',
        url: 'https://www.merics.org/de/studie/nationale-perspektiven-fuer-das-de-risking-europas-gegenueber-china',
        herausgeber: 'Mercator Institute for China Studies (MERICS)',
      },
    },
    {
      label: 'Gegenposition: Interdependenz als Stabilisator',
      aussage:
        'Eine Gegenstimme in der Forschung warnt davor, die Risiken zu überzeichnen: Wirtschaftliche Verflechtung sei nicht automatisch eine Schwäche, sondern schaffe wechselseitige Interessen und könne dadurch stabilisierend wirken — auch China ist auf den europäischen Markt und auf Technologie angewiesen. Ein Übermaß an Entflechtung berge eigene Risiken; entscheidend sei gezielte Resilienz, nicht die Behandlung jeder Abhängigkeit als Bedrohung.',
      quelle: {
        titel: 'Ist Deutschland zu abhängig von China?',
        url: 'https://www.bpb.de/themen/wirtschaft/freihandel/geopolitik-und-welthandel/544434/ist-deutschland-zu-abhaengig-von-china/',
        herausgeber: 'Bundeszentrale für politische Bildung (bpb)',
      },
    },
  ],
  einordnung:
    'Mehrere Dinge sind zugleich richtig: Die Verflechtung mit China bringt Wohlstand und ist nicht ohne Weiteres ersetzbar — und sie ist bei einzelnen kritischen Gütern hoch konzentriert — und das politisch ausgerufene De-Risking ist in den Handelszahlen bisher kaum messbar. Die Streitfrage ist nicht, ob Risiken bestehen, sondern welche davon kritisch genug sind, um die Kosten einer Diversifizierung zu rechtfertigen.',
};

const chinaArticle: Article = {
  _id: 'seed-china-de-risking',
  titel: 'China-Abhängigkeit: Wie viel De-Risking ist möglich?',
  slug: 'china-de-risking',
  ressort: 'wirtschaft',
  standfirst:
    'Deutschland und China sind wirtschaftlich eng verflochten — eine Verbindung, von der beide Seiten profitieren und die zugleich Schlagseite hat: Die Importe aus China bleiben hoch, die Exporte sinken, das Handelsdefizit ist strukturell. Bei einzelnen kritischen Gütern wie den Magnet-Metallen für Elektromotoren importiert Deutschland nahezu vollständig aus China. Politisch heißt das Ziel „De-Risking“ — doch in den Handelszahlen ist davon bisher kaum etwas zu sehen.',
  veroeffentlicht: '2026-06-15',
  themen: [
    { name: 'Wirtschaft', slug: 'wirtschaft' },
    { name: 'Außenhandel', slug: 'aussenhandel' },
  ],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Handelsdaten: Statistisches Bundesamt (Außenhandel mit China; Pressemitteilungen vom Februar 2023, 2024, 2025 und 2026). Das Partner-Ranking misst den Außenhandelsumsatz (Ein- plus Ausfuhren): 2024 standen erstmals seit neun Jahren wieder die USA an der Spitze, 2025 war China erneut wichtigster Handelspartner — die enge Verflechtung bleibt. Die Einfuhren aus China sind amtlich für 2022 (191,1 Mrd. €, Defizit 84,3), 2024 (156,3) und 2025 (170,6); der Wert für 2023 ist aus amtlicher Ausfuhr und Defizit abgeleitet (97,3 + 58,4 = 155,7, deckt sich mit dem amtlichen Wert). Seltene Erden (Statistisches Bundesamt, Pressemitteilungen April 2025 und April 2026): Der China-Anteil an der nach Deutschland importierten Menge sank von 69,1 % (2023) über 65,5 % (2024) auf 55,4 % (2025). Lanthanverbindungen lagen 2024 bei 76,3 % (Deutschland); bei den Magnet-Metallen Neodym/Praseodym/Samarium nennt die Statistik für Deutschland keinen Prozentwert, sondern „nahezu vollständig“ — der Prozentwert 97,7 % (sowie Cer/Lanthan 99,3 %) ist eine EU-weite Eurostat-Angabe und im Text als solche gekennzeichnet. Die Anteile beziehen sich auf die importierte Menge und das direkte Herkunftsland; seltene Erden werden teils über Drittländer gehandelt, der Förder- oder Verarbeitungsort kann abweichen. Chinas Anteil an den gesamten deutschen Wareneinfuhren (11,9 %) ist der zuletzt verfügbare Jahreswert (2024). Vorprodukt-Abhängigkeit: ifo-Unternehmensumfragen und IW Köln (Matthes, 2024/2025). Die ifo-BIP-Zahl stammt aus einer Modellrechnung für die vbw (2022); die rund 10 Prozent gelten für eine umfassende Rückverlagerung (Reshoring), eine reine Handels-Entkopplung allein von China fällt im Modell weit geringer aus. Positionen (Stand 2022–2025) sind paraphrasiert und bequellt — keine wörtlichen Zitate.',
  body: [
    block('h2', 'Worum es geht'),
    block(
      'normal',
      'Kaum eine Wirtschaftsbeziehung wird so intensiv diskutiert wie die mit China. 2025 war die Volksrepublik mit einem Außenhandelsumsatz von rund 252 Milliarden Euro wieder Deutschlands wichtigster Handelspartner. Diese Verflechtung bringt Wohlstand — und sie ist einseitig geworden: Deutschland kauft deutlich mehr in China, als es dorthin verkauft.',
    ),
    block(
      'normal',
      'Seit 2023 lautet das politische Ziel „De-Risking, nicht Decoupling“ — Risiken mindern, ohne sich zu entkoppeln. Drei Fragen führen durch den Beitrag: Wie eng und wie einseitig ist die Verflechtung? Wo ist die Abhängigkeit konkret am größten? Und kommt das De-Risking überhaupt voran?',
    ),
    block('h2', 'Wie eng und wie symmetrisch ist die Verflechtung?'),
    block(
      'normal',
      'Der Warenhandel zeigt eine klare Asymmetrie. Die deutschen Ausfuhren nach China sinken seit 2022 Jahr für Jahr — von 106,8 (2022) auf 81,3 Milliarden Euro (2025). Die Einfuhren aus China liegen weit darüber und blieben hoch; 2025 stiegen sie wieder auf 170,6 Milliarden Euro.',
    ),
    chinaHandelLinie,
    block(
      'normal',
      'Daraus ergibt sich ein strukturelles Handelsdefizit von rund 89 Milliarden Euro (2025). Beim Ranking der Handelspartner wechselt die Spitze — 2024 lagen erstmals seit neun Jahren wieder die USA vorn, 2025 war China erneut Nummer eins. Für die Frage der Abhängigkeit zählt aber weniger der Rang als die Richtung: Bei den Einfuhren ist Deutschland besonders auf China angewiesen.',
    ),
    block('h2', 'Wo wird die Abhängigkeit konkret?'),
    block(
      'normal',
      'Abhängigkeit ist kein Durchschnitt, sondern steckt in einzelnen Gütern. Am sichtbarsten ist sie bei den seltenen Erden — Metallen für Elektromotoren, Magnete, Akkus und Elektronik. Über alle seltenen Erden zusammen kam 2025 noch gut die Hälfte der nach Deutschland importierten Menge aus China; einzelne Stoffe sind stärker konzentriert. Bei den Magnet-Metallen Neodym, Praseodym und Samarium importiert Deutschland laut amtlicher Statistik „nahezu vollständig“ aus China — einen genauen Prozentwert weist die Statistik dafür nur EU-weit aus (97,7 Prozent, 2024).',
    ),
    chinaRohstoffBalken,
    block(
      'normal',
      'Über seltene Erden hinaus reicht die Verflechtung tief in die Industrie. In ifo-Unternehmensumfragen gaben zuletzt 37 Prozent der Industriefirmen an, von wichtigen Vorprodukten aus China abhängig zu sein (2022: 46 Prozent). Nach einer Auswertung des IW Köln wiesen 77 von 229 untersuchten Produktgruppen über fünf Jahre einen China-Anteil von mindestens 50 Prozent auf; rund 80 Prozent der betroffenen Unternehmen halten einen Ersatz für schwierig.',
    ),
    block('h2', 'Kommt das De-Risking voran?'),
    block(
      'normal',
      'In der politischen Rhetorik ist De-Risking allgegenwärtig — in den Handelszahlen ist es bisher kaum messbar. Chinas Anteil an den gesamten deutschen Wareneinfuhren stieg 2024 sogar leicht auf 11,9 Prozent (zuletzt verfügbarer Jahreswert), weil die Importe aus China zunahmen, während die Gesamteinfuhren sanken. Unternehmensbefragungen zeigen: Eine breite Mehrheit hat die Beschaffung aus China nicht zurückgefahren; viele Firmen kauften zuletzt ähnlich viel oder mehr dort ein als fünf Jahre zuvor. Klar zurückgegangen ist dagegen der mengenmäßige China-Anteil bei den seltenen Erden — von 69,1 (2023) auf 55,4 Prozent (2025). Beide Größen sind nicht direkt vergleichbar: Die 11,9 Prozent messen einen Wertanteil aller Einfuhren, der Seltene-Erden-Wert einen Mengenanteil einer einzelnen Warengruppe; sie zeigen je nur den eigenen Trend.',
    ),
    block('h2', 'Wie darüber gestritten wird'),
    block(
      'normal',
      'Schon über das Ausmaß der Risiken wird gestritten — und ebenso darüber, wie weit eine Entflechtung gehen soll, wie schnell und wer die Kosten trägt. Die folgenden Stimmen spannen das Feld auf: von der Sorge vor strategischer Erpressbarkeit bis zur Warnung vor einer überzogenen, selbstschädigenden Entkopplung.',
    ),
    chinaDiskurs,
    {
      _type: 'quellenNote',
      _key: key(),
      text: 'Handelsdaten: Statistisches Bundesamt (Aus- und Einfuhren mit China 2022–2025, Handelsdefizit, Partner-Ranking). Seltene Erden: Statistisches Bundesamt (Pressemitteilungen April 2025 und April 2026); deutsche Importanteile im Diagramm, EU-weite Eurostat-Anteile im Text als solche gekennzeichnet. Vorprodukt-Abhängigkeit: ifo-Unternehmensumfragen und IW Köln (Matthes). Positionen paraphrasiert nach Bundesregierung (China-Strategie 2023), BDI, Automobilindustrie (VW/VDA), IW Köln, ifo Institut, MERICS und der wissenschaftlichen Interdependenz-Gegenposition (bpb). Ableitungen und Abgrenzungen siehe Methodik.',
      quelle: { titel: 'Statistisches Bundesamt — Außenhandel', url: 'https://www.destatis.de/DE/Themen/Wirtschaft/Aussenhandel/_inhalt.html' },
    },
  ],
};

const staatshaushaltSankey: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Der Bundeshaushalt 2026: Woher das Geld kommt — und wohin es fließt',
    typ: 'sankey',
    beschreibung:
      'Sankey-Diagramm des Bundeshaushalts 2026 (Kernhaushalt, 524,5 Milliarden Euro). Links die Herkunft der Mittel: Steuereinnahmen (387,2 Mrd. Euro), neue Schulden bzw. Nettokreditaufnahme (98,0) und sonstige Einnahmen (39,3). Rechts die größten Ausgabenbereiche: Arbeit und Soziales (197,3 Mrd. Euro, über ein Drittel des Haushalts), Verteidigung (82,7), Verkehr (27,9), Zinsen (rund 30) sowie die übrigen rund 20 Einzelpläne zusammengefasst (186,6). Die Darstellung folgt dem Gesamtdeckungsprinzip: Einnahmen werden nicht einzelnen Ausgaben zugeordnet, sondern fließen über einen gemeinsamen Knoten in den Haushalt.',
    caption:
      'Bundeshaushalt 2026 (Kernhaushalt), Soll in Mrd. Euro: Mittelherkunft (links) und größte Ausgabenbereiche (rechts). Quelle: Deutscher Bundestag (Haushaltsgesetz 2026, beschlossen Nov./Dez. 2025). Zinsen rund 30 Mrd (Allgemeine Finanzverwaltung); „übrige Einzelpläne“ fasst die kleineren Ressorts zusammen; sonstige Einnahmen abgeleitet (siehe Methodik).',
    encoding: { kategorieFeld: 'von', serieFeld: 'nach', yFeld: 'mrd' },
    datensatz: {
      titel: 'Bundeshaushalt 2026 (Kernhaushalt) — Mittelherkunft und Ausgabenbereiche (Mrd. Euro)',
      quelle: {
        titel: 'Deutscher Bundestag — Haushaltsgesetz 2026 (beschlossen)',
        url: 'https://www.bundestag.de/dokumente/textarchiv/2025/kw48-de-haushaltsgesetz-2026-dritte-lesung-1126152',
        herausgeber: 'Deutscher Bundestag',
      },
      spalten: [
        { name: 'von', typ: 'string' },
        { name: 'nach', typ: 'string' },
        { name: 'mrd', typ: 'number', einheit: 'Mrd. Euro' },
      ],
      daten: [
        { von: 'Steuern', nach: 'Bundeshaushalt', mrd: 387.2 },
        { von: 'Neue Schulden', nach: 'Bundeshaushalt', mrd: 98.0 },
        { von: 'Sonstige Einnahmen', nach: 'Bundeshaushalt', mrd: 39.3 },
        { von: 'Bundeshaushalt', nach: 'Arbeit und Soziales', mrd: 197.3 },
        { von: 'Bundeshaushalt', nach: 'Verteidigung', mrd: 82.7 },
        { von: 'Bundeshaushalt', nach: 'Verkehr', mrd: 27.9 },
        { von: 'Bundeshaushalt', nach: 'Zinsen', mrd: 30.0 },
        { von: 'Bundeshaushalt', nach: 'übrige Einzelpläne', mrd: 186.6 },
      ],
    },
  },
};

const sondervermoegenBalken: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Das 500-Milliarden-Sondervermögen: Wohin die Investitionsmittel fließen',
    typ: 'balken',
    beschreibung:
      'Balkendiagramm der Aufteilung des Sondervermögens „Infrastruktur und Klimaneutralität“ (bis zu 500 Milliarden Euro, verteilt über zwölf Jahre, 2025–2036). Rund 300 Milliarden Euro entfallen auf den Bund, 100 Milliarden auf den Klima- und Transformationsfonds (KTF) und 100 Milliarden auf Länder und Kommunen. Das Grundgesetz (Artikel 143h) bindet die Mittel an zusätzliche Investitionen und verlangt eine „angepasste Investitionsquote“ von rund zehn Prozent im Bundeshaushalt. Ob die Mittel tatsächlich zusätzlich wirken oder reguläre Investitionen ersetzen, ist umstritten (siehe Diskurs).',
    caption:
      'Aufteilung des Sondervermögens Infrastruktur und Klimaneutralität (bis zu 500 Mrd. Euro, 2025–2036), in Mrd. Euro. Quelle: Bundesregierung/Bundesfinanzministerium; Deutscher Bundestag. Verteilung über zwölf Jahre; Jahresbeträge variieren.',
    encoding: { kategorieFeld: 'topf', yFeld: 'mrd' },
    datensatz: {
      titel: 'Sondervermögen Infrastruktur und Klimaneutralität — Aufteilung (Mrd. Euro)',
      quelle: {
        titel: 'Bundesregierung — Sondervermögen für Infrastruktur und Investitionen',
        url: 'https://www.bundesregierung.de/breg-de/aktuelles/sondervermoegen-2356240',
        herausgeber: 'Presse- und Informationsamt der Bundesregierung',
      },
      spalten: [
        { name: 'topf', typ: 'string' },
        { name: 'mrd', typ: 'number', einheit: 'Mrd. Euro' },
      ],
      daten: [
        { topf: 'Bund', mrd: 300 },
        { topf: 'Klima- und Transformationsfonds', mrd: 100 },
        { topf: 'Länder und Kommunen', mrd: 100 },
      ],
    },
  },
};

const staatsausgabenDiskurs: BodyBlock = {
  _type: 'diskursBlock',
  _key: key(),
  titel: 'Wofür die neuen Schulden, und wirken sie zusätzlich?',
  frage: 'Sollen die neuen Schulden so verwendet werden, wie es das Sondervermögen verspricht — und wirken sie wirklich zusätzlich und investiv?',
  einleitung:
    'Seit der Grundgesetzänderung 2025 darf der Bund für Verteidigung und Infrastruktur neue Schulden außerhalb der regulären Schuldenbremse aufnehmen. Das Sondervermögen Infrastruktur soll bis zu 500 Milliarden Euro in zusätzliche Investitionen lenken. Umstritten ist, ob die Mittel tatsächlich zusätzlich sind oder reguläre Ausgaben ersetzen — und wie hoch der konsumtive Anteil ausfällt. Ausgewählte Stimmen (paraphrasiert, mit Quelle):',
  perspektiven: [
    {
      label: 'Bundesregierung (Investitionsoffensive)',
      aussage:
        'Die Regierung versteht das Sondervermögen als überfällige „Investitionsoffensive für das ganze Land“: Mit bis zu 500 Milliarden Euro über zwölf Jahre sollen marode Infrastruktur — Brücken, Schienen, Schulen, Energienetze — saniert und der Weg zur Klimaneutralität finanziert werden. Die zusätzliche Verschuldung sei vertretbar, weil sie in langlebige Sachwerte fließe, die kommenden Generationen zugutekämen.',
      quelle: {
        titel: 'Investitionsoffensive für das ganze Land',
        url: 'https://www.bundesregierung.de/breg-de/aktuelles/sondervermoegen-2356240',
        herausgeber: 'Presse- und Informationsamt der Bundesregierung',
      },
    },
    {
      label: 'Bundesrechnungshof',
      aussage:
        'Der Rechnungshof warnt vor einer „gefährlichen Verschuldungsdynamik“ und mahnt, der Bund lebe strukturell über seine Verhältnisse. Entscheidend sei, dass die neuen Schulden tatsächlich in zusätzliche Investitionen flössen und nicht konsumtive Ausgaben finanzierten; die Verdrängung von Investitionen aus dem Kernhaushalt müsse enden. Geld aus dem Sondervermögen dürfe nur für echte Sachinvestitionen verwendet werden.',
      quelle: {
        titel: 'Bundeshaushalt 2026 unter der Lupe — Einzelplananalysen',
        url: 'https://www.bundesrechnungshof.de/SharedDocs/Kurzmeldungen/DE/2025/einzelplananalyse_2026/epa-2026-kurzmeldung.html',
        herausgeber: 'Bundesrechnungshof',
      },
    },
    {
      label: 'IW Köln (Tobias Hentze)',
      aussage:
        'Nach Berechnungen des Instituts wird ein großer Teil der neuen Kredite zweckentfremdet: Von bis zu 271 Milliarden Euro zusätzlicher Verschuldung bis 2029 dienten bis zu 133 Milliarden — fast die Hälfte — nicht zusätzlichen Investitionen, sondern ersetzten Mittel, die ohnehin im Kernhaushalt vorgesehen waren. Damit verpuffe ein erheblicher Teil der erhofften Wachstumswirkung.',
      quelle: {
        titel: 'Sondervermögen: Jeder zweite Euro wird zweckentfremdet',
        url: 'https://www.iwkoeln.de/presse/pressemitteilungen/tobias-hentze-die-haelfte-wird-zweckentfremdet.html',
        herausgeber: 'Institut der deutschen Wirtschaft (IW)',
      },
    },
    {
      label: 'Sachverständigenrat (Wirtschaft)',
      aussage:
        'Der Sachverständigenrat hält das Sondervermögen für eine Chance, fordert aber, seine „Zusätzlichkeit und Investitionsorientierung“ zu verbessern. Damit es wirke, müssten die regulären Investitionen im Kernhaushalt erhalten bleiben und die Mittel gezielt in produktivitätssteigernde Projekte fließen — sonst bleibe der konjunkturelle Effekt gering und die Schuldenlast steige ohne entsprechenden Gegenwert.',
      quelle: {
        titel: 'Zusätzlichkeit und Investitionsorientierung des Sondervermögens verbessern (Jahresgutachten 2025/26, Kapitel 2)',
        url: 'https://www.sachverstaendigenrat-wirtschaft.de/fileadmin/dateiablage/gutachten/jg202526/JG202526_Kapitel_2.pdf',
        herausgeber: 'Sachverständigenrat zur Begutachtung der gesamtwirtschaftlichen Entwicklung',
      },
    },
    {
      label: 'IMK / Hans-Böckler-Stiftung (Sebastian Dullien)',
      aussage:
        'Aus gewerkschaftsnaher Sicht sind die Investitionen überfällig: IMK und IW schätzten den zusätzlichen öffentlichen Investitionsbedarf auf rund 600 Milliarden Euro im Jahrzehnt — selbst bei idealer Verwendung decke das Sondervermögen davon nur etwa zwei Drittel. Ohne das Investitionsprogramm fiele die Wachstumsprognose für 2026 deutlich niedriger aus. Die Kritik an der Zusätzlichkeit dürfe nicht dazu führen, das Volumen kleinzureden.',
      quelle: {
        titel: 'IMK prognostiziert Wirtschaftswachstum für 2026 — Investitionsprogramm wesentlicher Faktor',
        url: 'https://www.boeckler.de/de/pressemitteilungen-2675-imk-prognostiziert-wirtschaftswachstum-fuer-2026-67957.htm',
        herausgeber: 'Hans-Böckler-Stiftung (IMK)',
      },
    },
  ],
  einordnung:
    'Mehrere Dinge sind zugleich richtig: IW und IMK beziffern den zusätzlichen öffentlichen Investitionsbedarf übereinstimmend auf rund 600 Milliarden Euro im Jahrzehnt — und zugleich ist umstritten, ob die neuen Schulden zusätzlich und investiv wirken oder im Kernhaushalt Spielräume für laufende Ausgaben eröffnen. Der Streit dreht sich damit weniger um das Ob der Investitionen als um die Zusätzlichkeit: ob neben dem Sondervermögen auch die regulären Investitionen erhalten bleiben.',
};

const staatsausgabenArticle: Article = {
  _id: 'seed-staatsausgaben-wofuer',
  titel: 'Bundeshaushalt 2026: Wofür der Staat das Geld ausgibt, und wofür die neuen Schulden',
  slug: 'staatsausgaben-wofuer',
  ressort: 'finanzen',
  standfirst:
    'Der Bund plant für 2026 Ausgaben von 524,5 Milliarden Euro — mehr als ein Drittel davon für Arbeit und Soziales, deutlich vor Verteidigung und Verkehr. Fast 100 Milliarden Euro sind neue Schulden allein im Kernhaushalt, dazu kommt das 500-Milliarden-Sondervermögen für Infrastruktur und Klima. Es soll zusätzliche Investitionen finanzieren — doch ob die Mittel wirklich obendrauf kommen oder reguläre Ausgaben ersetzen, ist umstritten.',
  veroeffentlicht: '2026-06-17',
  themen: [
    { name: 'Finanzen', slug: 'finanzen' },
    { name: 'Bundeshaushalt', slug: 'bundeshaushalt' },
  ],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Datenstand: Bundeshaushalt 2026, beschlossene Soll-Werte (Deutscher Bundestag, Haushaltsgesetz 2026, dritte Lesung November/Dezember 2025). Alle Sankey-Werte beziehen sich auf den Kernhaushalt (524,54 Mrd. Euro); die Sondervermögen (Infrastruktur/Klima und Bundeswehr) liegen außerhalb dieser Summe und werden separat ausgewiesen — so wird nichts doppelt gezählt. Einnahmenseite: Steuereinnahmen 387,21 Mrd. €, Nettokreditaufnahme 97,96 Mrd. € (im Text gerundet 98); die „sonstigen Einnahmen“ sind aus der Differenz zur Gesamtsumme abgeleitet (524,54 − 387,21 − 97,96 = 39,37) und im Diagramm auf 39,3 gerundet, damit die beschrifteten Zu- und Abflüsse übereinstimmen (je 524,5; rundungsbedingt rund 0,04 unter der exakten Gesamtsumme 524,54). Die Nettokreditaufnahme setzt sich zusammen aus rund 40,4 Mrd. € im Rahmen der regulären Schuldenregel und 57,6 Mrd. € über die seit 2025 geltende Bereichsausnahme für Verteidigung und Sicherheit. Die im Text genannte Gesamtgröße „mehr als 180 Mrd. € neue Schulden 2026“ umfasst diese Kernhaushalts-Nettokreditaufnahme (97,96) zuzüglich der Kreditermächtigungen der Sondervermögen 2026 (rund 82 Mrd. €, davon Sondervermögen Bundeswehr rund 25,5 und Sondervermögen Infrastruktur rund 56 — letzteres abgeleitet aus rund 82 abzüglich 25,5). Die IW-Schätzung von 271 Mrd. € bezeichnet dagegen die bis 2029 kumulierte zusätzliche Kreditaufnahme (keine Jahresgröße); davon ordnet das IW bis zu 133 Mrd. nicht zusätzlichen Investitionen zu. Ausgabenseite: Arbeit und Soziales 197,34, Verteidigung 82,69 (Kernhaushalt; das Sondervermögen Bundeswehr von rund 25,5 Mrd. kommt zusätzlich), Verkehr 27,90 (Kernhaushalt; Investitionen aus dem Sondervermögen Infrastruktur kommen zusätzlich obendrauf). Die Zinsausgaben (rund 30 Mrd.) werden in der Allgemeinen Finanzverwaltung (Einzelplan 60) verbucht, hier aber als eigener Block ausgewiesen; sie steigen laut Finanzplan bis 2029 auf rund 66,5 Mrd. „Übrige Einzelpläne“ (186,6) fasst die rund 20 kleineren Ressorts (u. a. Gesundheit, Bildung und Forschung, Inneres, wirtschaftliche Zusammenarbeit) sowie den nicht gesondert ausgewiesenen Rest der Allgemeinen Finanzverwaltung als Residual zusammen; der Wert ergibt sich aus der Gesamtsumme abzüglich der vier ausgewiesenen Ausgabenblöcke. Gesamtdeckungsprinzip: Einnahmen werden nicht einzelnen Ausgaben zugeordnet — die Pfeile verlaufen bewusst über den gemeinsamen Knoten „Bundeshaushalt“. Sondervermögen Infrastruktur und Klimaneutralität: bis zu 500 Mrd. € über zwölf Jahre (Art. 143h GG), aufgeteilt auf Bund (300), Klima- und Transformationsfonds (100) sowie Länder und Kommunen (100); die Jahresbeträge variieren. Die „angepasste Investitionsquote“ von rund 10 % ist die gesetzliche Bedingung für die Zusätzlichkeit. Die Angabe des IW Köln, wonach bis zu 133 von 271 Mrd. € neuer Kredite „zweckentfremdet“ würden, ist eine Schätzung des Instituts (Stand 2025) und wird von der Bundesregierung bestritten; sie ist im Text als Schätzung gekennzeichnet. Positionen (Stand 2025) sind paraphrasiert und bequellt — keine wörtlichen Zitate. Alle Online-Quellen abgerufen im Juni 2026.',
  body: [
    block('h2', 'Worum es geht'),
    block(
      'normal',
      'Mit 524,5 Milliarden Euro ist der Bundeshaushalt 2026 der größte der bundesdeutschen Geschichte — gut 21 Milliarden mehr als 2025. Der mit Abstand größte Posten ist dabei nicht die Verteidigung oder der Schuldendienst, sondern mit rund 197 Milliarden Euro der Etat für Arbeit und Soziales: über ein Drittel des gesamten Haushalts. Wofür der Staat sein Geld ausgibt, entscheidet sich also vor allem an den großen sozialen Sicherungssystemen.',
    ),
    block(
      'normal',
      'Zugleich finanziert sich der Bund 2026 zu einem erheblichen Teil über neue Schulden — fast 100 Milliarden Euro allein im Kernhaushalt, dazu das 500-Milliarden-Sondervermögen für Infrastruktur und Klima. Drei Fragen führen durch den Beitrag: Wofür gibt der Bund das Geld aus? Woher kommt es — und wie viel davon sind neue Schulden? Und fließen diese neuen Schulden wirklich in zusätzliche Investitionen oder in den laufenden Betrieb?',
    ),
    block('h2', 'Wofür gibt der Staat das Geld aus?'),
    block(
      'normal',
      'Ein Bundeshaushalt ist eine große Umverteilungsmaschine: Auf der einen Seite fließen Einnahmen herein, auf der anderen verteilen sie sich auf die Ressorts. Das folgende Sankey-Diagramm zeigt beide Seiten 2026 und macht die Größenverhältnisse sichtbar. Wichtig dabei: Nach dem Gesamtdeckungsprinzip werden einzelne Einnahmen nicht bestimmten Ausgaben zugewiesen; alle Mittel fließen in einen gemeinsamen Topf.',
    ),
    staatshaushaltSankey,
    block(
      'normal',
      'Die Rangfolge ist eindeutig: Arbeit und Soziales (197,3 Milliarden Euro) übertrifft die nächstgrößeren Bereiche — Verteidigung (82,7) und Verkehr (27,9) — um ein Vielfaches. Auch die Zinsausgaben sind mit rund 30 Milliarden Euro wieder ein spürbarer Block; laut Finanzplanung steigen sie bis 2029 auf rund 66 Milliarden. Alle übrigen rund 20 Einzelpläne — von Gesundheit über Bildung und Forschung bis Entwicklung — sind hier zu einem Sammelposten zusammengefasst.',
    ),
    block('h2', 'Woher kommt das Geld, und wie viel sind Schulden?'),
    block(
      'normal',
      'Den größten Teil tragen die Steuerzahler: rund 387 Milliarden Euro Steuereinnahmen. Knapp 98 Milliarden Euro sind neue Schulden (Nettokreditaufnahme) allein im Kernhaushalt — deutlich mehr als in den Vorjahren. Möglich wird das durch die Schuldenbremsen-Reform 2025: Von den 98 Milliarden entfallen rund 40 auf den regulären Spielraum der Schuldenbremse, rund 58 auf die neue Bereichsausnahme für Verteidigung und Sicherheit, die seit 2025 nicht mehr auf die Schuldenbremse angerechnet wird. Rechnet man die Kreditermächtigungen der Sondervermögen hinzu — rund 82 Milliarden Euro, davon gut 25 Milliarden für die Bundeswehr und rund 56 Milliarden für Infrastruktur und Klima —, nimmt der Bund 2026 insgesamt mehr als 180 Milliarden Euro neue Schulden auf.',
    ),
    block('h2', 'Wofür die neuen Schulden?'),
    block(
      'normal',
      'Der größte Teil der zusätzlichen Verschuldung läuft über das Sondervermögen „Infrastruktur und Klimaneutralität“: bis zu 500 Milliarden Euro über zwölf Jahre, festgeschrieben im Grundgesetz. Rund 300 Milliarden gehen an den Bund, je 100 Milliarden an den Klima- und Transformationsfonds sowie an Länder und Kommunen.',
    ),
    sondervermoegenBalken,
    block(
      'normal',
      'Damit die Mittel wirklich obendrauf kommen und nicht reguläre Haushaltsmittel ersetzen, verlangt das Grundgesetz eine „angepasste Investitionsquote“ von rund zehn Prozent im Kernhaushalt. Genau hier setzt die Kritik an: Das IW Köln schätzt, dass von bis zu 271 Milliarden Euro zusätzlicher Kredite, die bis 2029 auflaufen, fast die Hälfte (rund 133 Milliarden) nicht zusätzlich investiert, sondern für ohnehin geplante oder konsumtive Zwecke verwendet wird. Diese 271 Milliarden sind eine bis 2029 aufsummierte Größe — nicht zu verwechseln mit der jährlichen Neuverschuldung (2026: knapp 98 Milliarden im Kernhaushalt, gut 180 mit Sondervermögen) oder dem Zwölf-Jahres-Rahmen von 500 Milliarden. Bundesregierung und gewerkschaftsnahe Ökonomen halten dagegen — die einen verweisen auf den langlebigen Wert der Investitionen, die anderen auf den enormen Investitionsrückstand. Diese Schätzung des zweckentfremdeten Anteils ist umstritten (siehe Methodik und Diskurs).',
    ),
    block('h2', 'Wie darüber gestritten wird'),
    block(
      'normal',
      'Die Streitfrage ist selten, ob investiert werden soll — der Sanierungsbedarf bei Brücken, Schienen und Schulen ist weithin anerkannt. Gestritten wird über die Zusätzlichkeit: ob die neuen Schulden echte zusätzliche Investitionen finanzieren oder ob sie Spielräume für laufende Ausgaben schaffen und die reguläre Investitionsquote sinkt. Die folgenden Stimmen spannen das Feld auf.',
    ),
    staatsausgabenDiskurs,
    {
      _type: 'quellenNote',
      _key: key(),
      text: 'Haushaltszahlen: Deutscher Bundestag (Haushaltsgesetz 2026, beschlossen November/Dezember 2025) und Bundesfinanzministerium; Einnahmen, Nettokreditaufnahme und größte Einzelpläne im Kernhaushalt. Sondervermögen: Bundesregierung/Bundesfinanzministerium und Deutscher Bundestag. Positionen paraphrasiert nach Bundesregierung, Bundesrechnungshof, IW Köln, Sachverständigenrat und IMK/Hans-Böckler-Stiftung. Ableitungen und Abgrenzungen (Gesamtdeckungsprinzip; Kernhaushalt vs. Sondervermögen; „übrige Einzelpläne“ als Sammelposten; abgeleitete sonstige Einnahmen; IW-Schätzung als Schätzung gekennzeichnet) siehe Methodik.',
      quelle: { titel: 'Deutscher Bundestag — Haushaltsgesetz 2026', url: 'https://www.bundestag.de/dokumente/textarchiv/2025/kw48-de-haushaltsgesetz-2026-dritte-lesung-1126152' },
    },
  ],
};

const zugangTabelle: BodyBlock = {
  _type: 'datentabelleBlock',
  _key: key(),
  caption:
    'Arbeitsmarktzugang nach Aufenthaltsstatus (Stand der Regeln seit Februar 2024). Quelle: BMAS und Bundesagentur für Arbeit.',
  datensatz: {
    titel: 'Wer in Deutschland arbeiten darf — nach Aufenthaltsstatus',
    quelle: {
      titel: 'Bundesagentur für Arbeit — Aufenthaltsstatus und Arbeitsmarktzulassung',
      url: 'https://www.arbeitsagentur.de/unternehmen/arbeitskraefte/gefluechtete-beschaeftigen/aufenthaltsstatus',
    },
    spalten: [
      { name: 'Status', typ: 'string' },
      { name: 'Arbeitsmarktzugang', typ: 'string' },
      { name: 'Frühestens möglich', typ: 'string' },
    ],
    daten: [
      { Status: 'EU-Bürger:innen', Arbeitsmarktzugang: 'Voller, freier Zugang (Arbeitnehmerfreizügigkeit)', 'Frühestens möglich': 'sofort' },
      { Status: 'Anerkannte Schutzberechtigte', Arbeitsmarktzugang: 'Unbeschränkt, einheimischen Beschäftigten gleichgestellt', 'Frühestens möglich': 'sofort nach Anerkennung' },
      { Status: 'Ukrainische Geflüchtete (§ 24 AufenthG)', Arbeitsmarktzugang: 'Unbeschränkt (vorübergehender Schutz)', 'Frühestens möglich': 'sofort' },
      { Status: 'Asylsuchende (ohne Wohnpflicht in Aufnahmeeinrichtung)', Arbeitsmarktzugang: 'Beschäftigungserlaubnis (Ausländerbehörde, ggf. Bundesagentur für Arbeit)', 'Frühestens möglich': 'nach 3 Monaten' },
      { Status: 'Asylsuchende (mit Wohnpflicht in Aufnahmeeinrichtung)', Arbeitsmarktzugang: 'Beschäftigungserlaubnis', 'Frühestens möglich': 'nach 6 Monaten' },
      { Status: 'Geduldete', Arbeitsmarktzugang: 'Beschäftigungserlaubnis nach Voraussetzungen/Ermessen', 'Frühestens möglich': 'i. d. R. nach 6 Monaten' },
      { Status: 'Fachkräfte aus Drittstaaten', Arbeitsmarktzugang: 'Über Fachkräfteeinwanderungsgesetz / Chancenkarte', 'Frühestens möglich': 'mit Visum/Aufenthaltstitel' },
    ],
  },
};

const erwerbsBalken: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Erwerbstätigenquote nach Geburtsland: Deutschland und EU im Vergleich',
    typ: 'balken',
    beschreibung:
      'Balkendiagramm der Erwerbstätigenquote nach Geburtsland (20–64 Jahre, 2024). Die im Ausland Geborenen sind in Deutschland zu 72,3 Prozent erwerbstätig — mehr als im EU-27-Schnitt (70,4 Prozent), aber weniger als die einheimisch Geborenen (Deutschland 83,9 Prozent, EU-27 76,8 Prozent). Das ist eine deskriptive Quote, kein Maß für Integrationsleistung: Die im Ausland Geborenen unterscheiden sich zwischen den Ländern nach Alter, Qualifikation, Herkunft, Aufenthaltsdauer und dem Anteil von Erwerbs- gegenüber Fluchtmigration; zudem schließt die Kategorie EU-Binnenzugewanderte mit meist hoher Beschäftigung ein.',
    caption:
      'Erwerbstätigenquote nach Geburtsland, Deutschland und EU-27, 2024 (20–64 Jahre, in Prozent). Quelle: Eurostat (lfsa_ergacob). „Im Ausland geboren“ umfasst alle Zugewanderten; die feinere Kategorie „außerhalb der EU geboren“ ist für 2024 in dieser Reihe noch nicht ausgewiesen.',
    encoding: {
      kategorieFeld: 'gruppe',
      yFeld: 'quote',
      reihenfolge: [
        'Deutschland, einheimisch geboren',
        'Deutschland, im Ausland geboren',
        'EU-27, einheimisch geboren',
        'EU-27, im Ausland geboren',
      ],
      trennlinieNach: 2,
    },
    datensatz: {
      titel: 'Erwerbstätigenquote nach Geburtsland 2024 (20–64 Jahre)',
      quelle: {
        titel: 'Eurostat — Employment rates by country of birth (lfsa_ergacob)',
        url: 'https://ec.europa.eu/eurostat/databrowser/view/lfsa_ergacob/default/table?lang=de',
        herausgeber: 'Eurostat',
      },
      spalten: [
        { name: 'gruppe', typ: 'string' },
        { name: 'quote', typ: 'number', einheit: '%' },
      ],
      daten: [
        { gruppe: 'Deutschland, einheimisch geboren', quote: 83.9 },
        { gruppe: 'Deutschland, im Ausland geboren', quote: 72.3 },
        { gruppe: 'EU-27, einheimisch geboren', quote: 76.8 },
        { gruppe: 'EU-27, im Ausland geboren', quote: 70.4 },
      ],
    },
  },
};

const ukraineBalken: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Ukrainische Geflüchtete: Beschäftigung in ausgewählten Ländern (Ende 2022)',
    typ: 'balken',
    beschreibung:
      'Balkendiagramm der Beschäftigungsquote ukrainischer Geflüchteter in ausgewählten Ländern, 4. Quartal 2022 (kurz nach Ankunft): Vereinigtes Königreich 56, Litauen 48, Niederlande 46, Estland 40, Dänemark 39, Polen 38 und Deutschland 20 Prozent. Wichtig: Die Quoten sind nur eingeschränkt vergleichbar (unterschiedliche nationale Methoden und Bezugsgrößen) und es ist eine Momentaufnahme kurz nach Ankunft — seither sind die Quoten gestiegen, in Deutschland bis Anfang 2024 auf rund 27 Prozent, in Dänemark bis Ende 2023 auf rund 53 Prozent. Hohe Quoten gehen häufig mit schneller Vermittlung in geringqualifizierte, oft befristete Tätigkeiten einher.',
    caption:
      'Beschäftigungsquote ukrainischer Geflüchteter in ausgewählten Ländern, 4. Quartal 2022 (kurz nach Ankunft), in Prozent. Quelle: IAB-Forschungsbericht 16/2024. Nur eingeschränkt vergleichbar — die Länder messen unterschiedlich (Dänemark z. B. auf engerer Basis, Stand März 2024). Gezeigt sind Länder mit höheren Quoten; im vollständigen IAB-Vergleich aller 26 Länder liegt Deutschland im Mittelfeld. Seither gestiegen: Deutschland bis Anfang 2024 auf rund 27 %, Dänemark bis Ende 2023 auf rund 53 %.',
    encoding: { kategorieFeld: 'land', yFeld: 'quote' },
    datensatz: {
      titel: 'Beschäftigungsquote ukrainischer Geflüchteter im Ländervergleich (Q4 2022)',
      quelle: {
        titel: 'IAB-Forschungsbericht 16/2024 — Labour market integration of Ukrainian refugees',
        url: 'https://doku.iab.de/forschungsbericht/2024/fb1624en.pdf',
        herausgeber: 'Institut für Arbeitsmarkt- und Berufsforschung (IAB)',
      },
      spalten: [
        { name: 'land', typ: 'string' },
        { name: 'quote', typ: 'number', einheit: '%' },
      ],
      daten: [
        { land: 'Vereinigtes Königreich', quote: 56 },
        { land: 'Litauen', quote: 48 },
        { land: 'Niederlande', quote: 46 },
        { land: 'Estland', quote: 40 },
        { land: 'Dänemark', quote: 39 },
        { land: 'Polen', quote: 38 },
        { land: 'Deutschland', quote: 20 },
      ],
    },
  },
};

const integrationDiskurs: BodyBlock = {
  _type: 'diskursBlock',
  _key: key(),
  titel: 'Schnell vermitteln oder zuerst qualifizieren?',
  frage: 'Wie gelingt Arbeitsmarktintegration am besten — schnelle Vermittlung oder Sprache und Qualifikation zuerst? Und welche Zugangshürden sollte man abbauen?',
  einleitung:
    'Über das Ziel — Zugewanderte gut in Arbeit zu bringen — besteht weitgehend Einigkeit; über den Weg wird gestritten. Im Kern stehen zwei Strategien („work-first“ vs. Sprache und Qualifikation zuerst) und die Frage, wie offen der Zugang sein soll. Ausgewählte Stimmen (paraphrasiert, mit Quelle):',
  perspektiven: [
    {
      label: 'IAB (Arbeitsmarktforschung)',
      aussage:
        'Aus Sicht des Instituts zahlt sich nachhaltige Integration aus: Wer zuerst in Sprache und die Anerkennung von Qualifikationen investiert, startet langsamer, landet aber seltener in prekären Hilfstätigkeiten und häufiger in qualifikationsgerechter, besser bezahlter Arbeit. Schnelle Vermittlungserfolge in Ländern mit hohen Quoten beruhten oft auf geringqualifizierten, befristeten oder Teilzeit-Jobs.',
      quelle: {
        titel: 'IAB — Labour market integration of Ukrainian refugees: An international perspective',
        url: 'https://iab.de/en/labour-market-integration-of-ukrainian-refugees-an-international-perspective/',
        herausgeber: 'Institut für Arbeitsmarkt- und Berufsforschung (IAB)',
      },
    },
    {
      label: 'Bundesregierung / Bundesagentur für Arbeit („Job-Turbo“)',
      aussage:
        'Mit dem „Job-Turbo“ setzen Bundesregierung und Arbeitsagentur auf einen schnelleren Einstieg: Geflüchtete sollen schon mit Grundkenntnissen der Sprache (etwa A2/B1) in Arbeit kommen und parallel weiter Deutsch und fachliche Kompetenzen erwerben. Frühe Beschäftigung fördere Spracherwerb und Integration, statt sie aufzuschieben.',
      quelle: {
        titel: 'BMAS — Job-Turbo zur Arbeitsmarktintegration von Geflüchteten',
        url: 'https://www.bmas.de/DE/Arbeit/Migration-und-Arbeit/Flucht-und-Aysl/Turbo-zur-Arbeitsmarktintegration-von-Gefluechteten/turbo-zur-arbeitsmarktintegration-von-gefluechteten.html',
        herausgeber: 'Bundesministerium für Arbeit und Soziales',
      },
    },
    {
      label: 'IW Köln (Wirtschaftsforschung)',
      aussage:
        'Aus wirtschaftsnaher Sicht ist früher Arbeitsmarkteinstieg der wirksamste Integrationsmotor: Angesichts des Fachkräftemangels koste jede verzögerte Aufnahme Wertschöpfung und erschwere die Eingliederung. Bürokratische Hürden, lange Anerkennungsverfahren und Wartefristen sollten abgebaut werden; Sprache lasse sich auch im Betrieb erwerben.',
      quelle: {
        titel: 'IW Köln — Fachkräftezuwanderung und Arbeitsmarktintegration',
        url: 'https://www.iwkoeln.de/studien/alexander-burstedde-fachkraeftezuwanderung-aus-eu-osterweiterung-versiegt-alternativen-benoetigt.html',
        herausgeber: 'Institut der deutschen Wirtschaft (IW)',
      },
    },
    {
      label: 'DGB (Gewerkschaften)',
      aussage:
        'Der Gewerkschaftsbund warnt, Tempo dürfe nicht zulasten guter Arbeit gehen: Eine Vermittlung um jeden Preis in Helfertätigkeiten verfehle das Ziel nachhaltiger Integration und drücke Löhne. Die Bilanz des „Job-Turbo“ sei durchwachsen; entscheidend seien Qualifizierung, Tarifbindung und verlässliche Sprachförderung.',
      quelle: {
        titel: 'DGB — Arbeitsmarktintegration Geflüchteter: Wie wirksam ist der Job-Turbo?',
        url: 'https://www.dgb.de/fileadmin/download_center/Studien/Arbeitsmarkt_Aktuell/251111_Arbeitsmarktintegration_Gefl%C3%BCchteter_Wie_wirksam_ist_der_Job-Turbo.pdf',
        herausgeber: 'Deutscher Gewerkschaftsbund (DGB)',
      },
    },
    {
      label: 'Informationsverbund Asyl & Migration',
      aussage:
        'Aus Sicht der Flüchtlingsberatung bremsen rechtliche Hürden die Integration: Wartefristen und Beschäftigungsverbote für Asylsuchende, Ermessensspielräume der Behörden und langwierige Anerkennungsverfahren hielten Menschen oft monatelang vom Arbeitsmarkt fern — obwohl frühe Arbeit die Integration erleichtere. Der Zugang müsse früher und verlässlicher werden.',
      quelle: {
        titel: 'asyl.net — Zugang zu Arbeit',
        url: 'https://www.asyl.net/themen/bildung-und-arbeit/zugang-zu-arbeit',
        herausgeber: 'Informationsverbund Asyl & Migration',
      },
    },
    {
      label: 'OECD (internationaler Vergleich)',
      aussage:
        'Die OECD betont, dass nicht die Geschwindigkeit allein zählt, sondern die nachhaltige Eingliederung: gezielte, frühe Förderung, rasche Anerkennung mitgebrachter Qualifikationen und der Abbau bürokratischer Hürden. Deutschlands Beschäftigungsquote Zugewanderter liege über dem EU-Schnitt, der Abstand zur einheimischen Bevölkerung sei aber größer als anderswo.',
      quelle: {
        titel: 'OECD/European Commission — Indicators of Immigrant Integration 2023: Settling In',
        url: 'https://doi.org/10.1787/1d5020a6-en',
        herausgeber: 'OECD Publishing',
      },
    },
  ],
  einordnung:
    'Beide Strategien haben Stärken und Grenzen: Schnelle Vermittlung bringt höhere Quoten, oft aber in geringqualifizierte, unsichere Jobs; ein Sprach- und Qualifizierungs-zuerst-Ansatz startet langsamer, zielt aber auf stabilere Beschäftigung. Aus Sicht von IAB und OECD ist eine niedrige Frühquote daher nicht gleichbedeutend mit schlechterer Integration; aus Sicht der Tempo-Befürworter zählt dagegen jeder frühe Arbeitsmarkteinstieg — auch wegen des Fachkräftemangels. Strittig bleibt, wie viel Tempo nötig ist, ohne Qualität zu opfern, und welche Zugangshürden man früher abbauen sollte.',
};

const integrationArticle: Article = {
  _id: 'seed-arbeitsmarktintegration',
  titel: 'Arbeitsmarktintegration: Wer arbeiten darf, und wie gut es im EU-Vergleich gelingt',
  slug: 'arbeitsmarktintegration-eu-vergleich',
  ressort: 'inneres',
  standfirst:
    'Deutschland gewährt anerkannten Schutzberechtigten einen weitreichenden Zugang zum Arbeitsmarkt. Trotzdem führt schneller rechtlicher Zugang nicht automatisch zu schneller Beschäftigung. Eurostat-Daten zeigen: Im Ausland Geborene sind in Deutschland häufiger erwerbstätig als im EU-Durchschnitt. Zugleich ist der Abstand zu im Inland Geborenen größer als im EU-Schnitt. Bei ukrainischen Geflüchteten zeigt sich zusätzlich: Länder mit stärkerem „work-first“-Ansatz erreichten anfangs höhere Beschäftigungsquoten, die langfristige Bewertung bleibt aber offen.',
  veroeffentlicht: '2026-06-19',
  themen: [
    { name: 'Migration', slug: 'migration' },
    { name: 'Arbeitsmarkt', slug: 'arbeitsmarkt' },
    { name: 'Integration', slug: 'integration' },
  ],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Arbeitsmarktzugang nach Aufenthaltsstatus: Bundesministerium für Arbeit und Soziales (BMAS) und Bundesagentur für Arbeit (Stand der Regeln seit 27. Februar 2024). Die Wartefristen (3 bzw. 6 Monate) gelten für Asylsuchende je nachdem, ob eine Wohnpflicht in einer Aufnahmeeinrichtung besteht; anerkannte Schutzberechtigte, EU-Bürgerinnen und -Bürger sowie ukrainische Geflüchtete (§ 24 Aufenthaltsgesetz) haben sofortigen, unbeschränkten Zugang. Erwerbstätigenquoten nach Geburtsland: Eurostat (Tabelle lfsa_ergacob), Jahr 2024, Altersgruppe 20–64, in Prozent. Gezeigt wird „im Ausland geboren“ (alle Zugewanderten) gegenüber „einheimisch geboren“, für Deutschland und den EU-27-Schnitt; die feinere Kategorie „außerhalb der EU geboren“ ist für 2024 weder nach Geburtsland noch nach Staatsangehörigkeit ausgewiesen (n/a, geprüft für 2023 und 2024) — gezeigt wird daher der Gesamtwert „im Ausland geboren“, der auch EU-Binnenzugewanderte mit meist hoher Beschäftigung einschließt und damit kein sauberes Maß für Schutz-/Drittstaatszuwanderung ist. Wichtig: Die höhere Quote ist deskriptiv und kein Maß für Integrationsleistung — sie hängt auch von der Zusammensetzung der Zugewanderten ab (Alter, Qualifikation, Herkunft, Aufenthaltsdauer, Erwerbs- vs. Fluchtmigration, Konjunktur); ein Leistungsurteil bräuchte kontrollierte Vergleiche nach diesen Merkmalen, gerade solche Gruppenunterschiede nennt auch die OECD als zentral. Ukrainische Geflüchtete: IAB-Forschungsbericht 16/2024 „Labour market integration of Ukrainian refugees: An international perspective“. Wichtige Einordnung: Der Ländervergleich der Beschäftigungsquoten ist nur eingeschränkt vergleichbar — die Länder verwenden unterschiedliche Methoden und Bezugsgrößen (Deutschland: Erwerbstätigenquote der 15- bis 64-Jährigen; Dänemark z. B. nur den Anteil der als vermittelbar Eingestuften, von denen rund ein Drittel ausgenommen ist — Stand März 2024). Der Balken zeigt den einzigen vollständigen Querschnitt, für den im Bericht Werte für alle gezeigten Länder vorliegen (4. Quartal 2022, kurz nach Ankunft) — er belegt keine methodische Vergleichbarkeit; seither sind die Quoten gestiegen — Deutschland bis zum 1. Quartal 2024 auf rund 27 Prozent und nach neueren IAB-Daten bis Mitte 2025 auf rund 50 Prozent (unter den 2022 Eingereisten; IAB, 2026), Dänemark bis Ende 2023 auf rund 53 Prozent. Hohe Quoten gehen häufig mit schneller Vermittlung in geringqualifizierte, oft befristete oder Teilzeit-Tätigkeiten einher („work-first“), niedrigere mit einem Sprach- und Qualifizierungs-zuerst-Ansatz. Positionen (Stand 2024/2025) sind paraphrasiert und bequellt. Der Beitrag geht auf einen Leserhinweis zurück.',
  body: [
    block('h2', 'Worum es geht'),
    block(
      'normal',
      'Ob jemand, der nach Deutschland kommt, hier arbeiten darf, ist keine Frage des Wollens, sondern des Aufenthaltsstatus. Und ob Integration „gelingt“, lässt sich nicht an einer einzigen Quote ablesen. Dieser Beitrag trennt drei Dinge, die in der Debatte oft vermischt werden: den rechtlichen Zugang zum Arbeitsmarkt, die tatsächliche Beschäftigung im EU-Vergleich und die Frage, was eine „hohe“ oder „niedrige“ Quote überhaupt aussagt.',
    ),
    block(
      'normal',
      'Drei Fragen führen durch den Beitrag: Wer darf überhaupt arbeiten? Wie gut sind Zugewanderte beschäftigt — im Vergleich zur einheimischen Bevölkerung und zum EU-Schnitt? Und was lehrt der Sonderfall der ukrainischen Geflüchteten über schnelle gegenüber nachhaltiger Integration?',
    ),
    block('h2', 'Wer darf überhaupt arbeiten?'),
    block(
      'normal',
      'Der Zugang zum Arbeitsmarkt hängt stark vom Aufenthaltsstatus ab. EU-Bürgerinnen und -Bürger arbeiten frei; anerkannte Schutzberechtigte sind einheimischen Beschäftigten gleichgestellt; ukrainische Geflüchtete haben über den vorübergehenden Schutz (§ 24 Aufenthaltsgesetz) sofortigen Zugang. Asylsuchende dagegen müssen warten — je nach Unterbringung drei oder sechs Monate — und brauchen danach eine Beschäftigungserlaubnis der Ausländerbehörde. Geduldete unterliegen weiteren Voraussetzungen. Seit Februar 2024 sind die Regeln etwas gelockert.',
    ),
    zugangTabelle,
    block('h2', 'Wie gut sind Zugewanderte beschäftigt?'),
    block(
      'normal',
      'Sind Zugewanderte einmal auf dem Arbeitsmarkt, ist ihre Erwerbstätigenquote in Deutschland höher als im EU-Schnitt — aber niedriger als die der einheimisch Geborenen. 2024 lag die Quote der im Ausland Geborenen (20–64 Jahre) bei 72,3 Prozent, gegenüber 70,4 Prozent im EU-27-Schnitt. Zugleich ist der Abstand zur einheimischen Bevölkerung in Deutschland größer (83,9 Prozent) als im EU-Mittel (76,8 Prozent).',
    ),
    erwerbsBalken,
    block(
      'normal',
      'Diese höhere Quote bedeutet aber nicht automatisch „bessere Integration“. Sie zeigt zunächst nur, dass im Ausland Geborene in Deutschland häufiger erwerbstätig sind als im EU-Schnitt. Die Ursachen können ebenso in der Zusammensetzung liegen — Alter, Qualifikation, Herkunftsstruktur, Aufenthaltsdauer, der Anteil von Erwerbs- gegenüber Fluchtmigration oder die Konjunktur; gerade solche Unterschiede zwischen Migrantengruppen nennt auch die OECD als zentral für Integrationsvergleiche. Ein belastbares Urteil über die Integrationsleistung bräuchte kontrollierte Vergleiche nach Aufenthaltsdauer, Herkunft, Bildung, Alter, Geschlecht und Aufenthaltsstatus.',
    ),
    block('h2', 'Der Sonderfall Ukraine: schnell oder nachhaltig?'),
    block(
      'normal',
      'Bei den ukrainischen Geflüchteten liegt Deutschlands Beschäftigungsquote unter der vieler europäischer Länder — im folgenden Vergleich ausgewählter Länder am unteren Ende; im vollständigen IAB-Vergleich aller 26 Länder rangiert Deutschland im Mittelfeld (einige liegen darunter). Wichtig vorab: Die Quoten sind nur eingeschränkt vergleichbar, weil die Länder unterschiedlich messen.',
    ),
    ukraineBalken,
    block(
      'normal',
      'Konkret heißt das: Die Länder messen unterschiedlich (Deutschland die Erwerbstätigenquote, Dänemark etwa nur den Anteil der als vermittelbar Eingestuften). Und die Unterschiede spiegeln verschiedene Strategien: Länder mit hohen Quoten vermitteln Geflüchtete schnell, oft in geringqualifizierte, befristete oder Teilzeit-Tätigkeiten („work-first“); Deutschland setzt zuerst auf Sprache und die Anerkennung von Qualifikationen. Befürworter dieses Wegs — etwa das IAB — erwarten davon nachhaltigere, besser bezahlte Beschäftigung; Tempo-Befürworter halten den langsameren Start für einen Nachteil. Die gezeigten Werte stammen zudem aus dem 4. Quartal 2022, kurz nach Ankunft. Seither ist Deutschlands Quote deutlich gestiegen — auf rund 27 Prozent Anfang 2024 und nach neueren IAB-Daten auf rund 50 Prozent Mitte 2025 (unter den 2022 Eingereisten); der anfängliche Abstand zu den schnell vermittelnden Ländern hat sich damit stark verkleinert.',
    ),
    block('h2', 'Wie darüber gestritten wird'),
    block(
      'normal',
      'Genau hier verläuft die Debatte: Wie viel Tempo ist nötig, ohne Qualität und Nachhaltigkeit zu opfern — und welche Zugangshürden sollte man früher abbauen? Die folgenden Stimmen spannen das Feld auf.',
    ),
    integrationDiskurs,
    {
      _type: 'quellenNote',
      _key: key(),
      text: 'Arbeitsmarktzugang: BMAS und Bundesagentur für Arbeit. Erwerbstätigenquoten nach Geburtsland: Eurostat (lfsa_ergacob, 2024). Ukrainische Geflüchtete im Ländervergleich: IAB-Forschungsbericht 16/2024 (Q4 2022; nur eingeschränkt vergleichbar — Methoden- und Datenstand-Hinweise siehe Methodik); aktuellere deutsche Quote (rund 50 % Mitte 2025): IAB (2026). Positionen paraphrasiert nach IAB, Bundesregierung/Bundesagentur für Arbeit, DGB, Informationsverbund Asyl & Migration und OECD. Der Beitrag geht auf einen Leserhinweis zurück.',
      quelle: { titel: 'IAB — Arbeitsmarktintegration ukrainischer Geflüchteter', url: 'https://iab.de/en/labour-market-integration-of-ukrainian-refugees-an-international-perspective/' },
    },
  ],
};

const ausfuhrBalken: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Was die EU in den Mercosur exportiert (2024)',
    typ: 'balken',
    beschreibung:
      'Balkendiagramm der fünf größten EU-Ausfuhrgruppen in den Mercosur 2024 (in Milliarden Euro): Arzneimittel (6,8), Industriemaschinen (5,4), Fahrzeuge (4,8), Spezialmaschinen (3,4) und Elektrotechnik (3,0). Es sind durchweg verarbeitete Industriegüter; über alle Warengruppen hinweg entfielen 86,6 Prozent der EU-Ausfuhren in den Mercosur auf Industriegüter.',
    caption:
      'Die fünf größten EU-Ausfuhrgruppen in den Mercosur, 2024, in Milliarden Euro. Diese fünf Gruppen decken rund 42 Prozent der EU-Ausfuhren ab; über alle Gruppen sind 86,6 Prozent der EU-Ausfuhren Industriegüter. Quelle: Eurostat.',
    encoding: { kategorieFeld: 'warengruppe', yFeld: 'wert' },
    datensatz: {
      titel: 'Größte EU-Ausfuhrgruppen in den Mercosur 2024 (Mrd. Euro)',
      quelle: {
        titel: 'Eurostat — EU-Mercosur trade up substantially in the last decade',
        url: 'https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20250620-3',
        herausgeber: 'Eurostat',
      },
      spalten: [
        { name: 'warengruppe', label: 'EU-Ausfuhr', typ: 'string' },
        { name: 'wert', typ: 'number', einheit: 'Mrd. €' },
      ],
      daten: [
        { warengruppe: 'Arzneimittel', wert: 6.8 },
        { warengruppe: 'Industriemaschinen', wert: 5.4 },
        { warengruppe: 'Fahrzeuge', wert: 4.8 },
        { warengruppe: 'Spezialmaschinen', wert: 3.4 },
        { warengruppe: 'Elektrotechnik', wert: 3.0 },
      ],
    },
  },
};

const einfuhrBalken: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Was die EU aus dem Mercosur importiert (2024)',
    typ: 'balken',
    beschreibung:
      'Balkendiagramm der fünf größten EU-Einfuhrgruppen aus dem Mercosur 2024 (in Milliarden Euro): Erdöl und Mineralöl (12,1), Futtermittel (7,1), Kaffee, Tee und Kakao (5,2), Erze (4,9) und Ölsaaten (3,7). Es sind überwiegend Rohstoffe und Agrargüter; das größte Einzelgut (Erdöl) ist deutlich größer als die größte Ausfuhrgruppe. Über alle Warengruppen hinweg entfielen 81,3 Prozent der EU-Einfuhren aus dem Mercosur auf Primärgüter.',
    caption:
      'Die fünf größten EU-Einfuhrgruppen aus dem Mercosur, 2024, in Milliarden Euro. Diese fünf Gruppen decken rund 59 Prozent der EU-Einfuhren ab; über alle Gruppen sind 81,3 Prozent der EU-Einfuhren Primärgüter. Quelle: Eurostat.',
    encoding: { kategorieFeld: 'warengruppe', yFeld: 'wert' },
    datensatz: {
      titel: 'Größte EU-Einfuhrgruppen aus dem Mercosur 2024 (Mrd. Euro)',
      quelle: {
        titel: 'Eurostat — EU-Mercosur trade up substantially in the last decade',
        url: 'https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20250620-3',
        herausgeber: 'Eurostat',
      },
      spalten: [
        { name: 'warengruppe', label: 'EU-Einfuhr', typ: 'string' },
        { name: 'wert', typ: 'number', einheit: 'Mrd. €' },
      ],
      daten: [
        { warengruppe: 'Erdöl und Mineralöl', wert: 12.1 },
        { warengruppe: 'Futtermittel', wert: 7.1 },
        { warengruppe: 'Kaffee, Tee, Kakao', wert: 5.2 },
        { warengruppe: 'Erze', wert: 4.9 },
        { warengruppe: 'Ölsaaten', wert: 3.7 },
      ],
    },
  },
};

const rindfleischQuote: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Die Rindfleisch-Quote als Anteil der EU-Produktion',
    typ: 'waffle',
    beschreibung:
      'Waffle-Diagramm aus 100 Kacheln (je rund 1 Prozent der EU-Rindfleischproduktion): Die zollbegünstigte Einfuhrquote aus dem Mercosur (99.000 Tonnen) entspricht rund 1,5 Prozent der EU-Rindfleischproduktion und ist als rund 2 von 100 Kacheln dargestellt; die übrigen rund 98 Kacheln stehen für die heimische und sonstige Produktion.',
    caption:
      'Zollbegünstigte Mercosur-Rindfleischquote (99.000 t) als Anteil der EU-Rindfleischproduktion (rund 2 von 100 Kacheln, 1,5 Prozent). Quelle: BMLEH; Quote zu 7,5 Prozent Zoll, über fünf Jahre gestaffelt.',
    encoding: { kategorieFeld: 'kategorie', yFeld: 'wert' },
    datensatz: {
      titel: 'Mercosur-Rindfleischquote als Anteil der EU-Produktion',
      quelle: {
        titel: 'BMLEH — FAQ zum EU-Mercosur-Abkommen',
        url: 'https://www.bmleh.de/SharedDocs/FAQs/DE/faq-eu-mercosur/FAQ-eu-mercosur_List.html',
        herausgeber: 'Bundesministerium für Landwirtschaft, Ernährung und Heimat',
      },
      spalten: [
        { name: 'kategorie', typ: 'string' },
        { name: 'wert', typ: 'number', einheit: '%' },
      ],
      daten: [
        { kategorie: 'Mercosur-Quote', wert: 1.5 },
        { kategorie: 'übrige EU-Produktion', wert: 98.5 },
      ],
    },
  },
};

const mercosurDiskurs: BodyBlock = {
  _type: 'diskursBlock',
  _key: key(),
  titel: 'Überwiegen die Chancen oder die Risiken?',
  frage:
    'Bringt das EU-Mercosur-Abkommen unterm Strich mehr Chancen (Exportmärkte, Rohstoffe, geopolitische Eigenständigkeit) oder mehr Risiken (Landwirtschaft, Klima, Regenwald)?',
  einleitung:
    'Die Bewertung fällt je nach Interesse sehr unterschiedlich aus — und quer durch die EU: Im Rat stimmten fünf Länder dagegen (Österreich, Frankreich, Ungarn, Irland, Polen). Ausgewählte Stimmen (paraphrasiert, mit Quelle):',
  perspektiven: [
    {
      label: 'BDI (Industrie)',
      aussage:
        'Der Industrieverband wertet das Abkommen als wichtigen Erfolg und ein starkes Signal für offenen Handel. Unternehmen sparten rund vier Milliarden Euro Zölle pro Jahr; gerade der industrielle Mittelstand profitiere, und der Zugang zu kritischen Rohstoffen wie Lithium und Kupfer (für Elektromobilität und Erneuerbare) werde leichter. Die Mitgliedstaaten sollten die Ratifizierung zügig abschließen.',
      quelle: {
        titel: 'BDI — Wichtiger Erfolg für die deutsche und europäische Wirtschaft',
        url: 'https://bdi.eu/artikel/news/bdi-zum-eu-mercosur-handelsabkommen-wichtiger-erfolg-fuer-die-deutsche-und-europaeische-wirtschaft',
        herausgeber: 'Bundesverband der Deutschen Industrie (BDI)',
      },
    },
    {
      label: 'Europäische Kommission',
      aussage:
        'Aus Sicht der Kommission stärkt das Abkommen Europas wirtschaftliche Eigenständigkeit in Zeiten von Handelskonflikten und sichert Lieferketten und Rohstoffe. Umwelt- und Klimavorgaben (etwa das Pariser Abkommen) seien im Vertrag verankert und ließen sich so eher einfordern als ohne Abkommen; sensible Agrarmärkte würden über begrenzte Quoten und Schutzklauseln abgesichert.',
      quelle: {
        titel: 'Europäische Kommission — The EU-Mercosur trade agreement',
        url: 'https://commission.europa.eu/topics/trade/eu-mercosur-trade-agreement_en',
        herausgeber: 'Europäische Kommission',
      },
    },
    {
      label: 'Bauernverbände',
      aussage:
        'Die Bauernverbände fordern Nachverhandlungen: Die Marktöffnung drohe die heimische Erzeugung zu verdrängen, weil Importe aus dem Mercosur niedrigeren Klima-, Umwelt- und Tierwohlstandards unterlägen, an die hiesige Betriebe gebunden seien. Das sei ungleicher Wettbewerb; betroffen seien vor allem Rind, Geflügel, Zucker und Ethanol.',
      quelle: {
        titel: 'Bayerischer Bauernverband — Mercosur',
        url: 'https://www.bayerischerbauernverband.de/mercosur',
        herausgeber: 'Bayerischer Bauernverband',
      },
    },
    {
      label: 'Greenpeace (Umwelt)',
      aussage:
        'Greenpeace lehnt das Abkommen ab: Es setze Anreize für mehr Rinderhaltung und Sojaanbau und damit für weitere Rodung — rund 90 Prozent der Amazonas-Zerstörung seit 1970 gingen auf Viehwirtschaft zurück. Verbindliche, durchsetzbare Klimaauflagen fehlten; nach Schätzung der EU-Kommission könnten die EU-Rindfleischeinfuhren aus Südamerika um bis zu 64 Prozent steigen.',
      quelle: {
        titel: 'Greenpeace — Stellungnahme zum Abschluss des EU-Mercosur-Abkommens',
        url: 'https://presseportal.greenpeace.de/245060-greenpeace-stellungnahme-zum-abschluss-des-eu-mercosur-abkommens/',
        herausgeber: 'Greenpeace e.V.',
      },
    },
    {
      label: 'Gegenstimmen im Rat',
      aussage:
        'Fünf Mitgliedstaaten stimmten im Rat gegen das Abkommen: Frankreich, Österreich, Ungarn, Irland und Polen. Ihre wiederkehrenden Einwände sind der Schutz der eigenen Landwirtschaft und gleiche Umwelt- und Produktionsstandards für Importware; aus ihrer Sicht reichen die Schutzklauseln und die Kontrolle der Einfuhrstandards nicht aus.',
      quelle: {
        titel: 'Consilium — Council greenlights signature of the EU-Mercosur agreement',
        url: 'https://www.consilium.europa.eu/en/press/press-releases/2026/01/09/eu-mercosur-council-greenlights-signature-of-the-comprehensive-partnership-and-trade-agreement/',
        herausgeber: 'Rat der EU',
      },
    },
    {
      label: 'Bundesregierung / BMLEH',
      aussage:
        'Die Bundesregierung trägt das Abkommen mit und verweist auf den Nutzen für die Exportwirtschaft. Das Landwirtschaftsministerium betont, die Agrarquoten seien mengenmäßig begrenzt (Rindfleisch rund 1,5 Prozent der EU-Produktion) und über mehrere Jahre gestaffelt, und es gebe Schutzklauseln bei Marktstörungen. Kritik an Standards und Kontrolle bleibt Teil der Debatte.',
      quelle: {
        titel: 'BMLEH — FAQ zum EU-Mercosur-Abkommen',
        url: 'https://www.bmleh.de/SharedDocs/FAQs/DE/faq-eu-mercosur/FAQ-eu-mercosur_List.html',
        herausgeber: 'Bundesministerium für Landwirtschaft, Ernährung und Heimat',
      },
    },
  ],
  einordnung:
    'Mehrere Dinge sind zugleich plausibel: Für Deutschlands exportorientierte Industrie ist das Abkommen eine reale Chance, und ein Teil der Agrarsorge relativiert sich an den Mengen — die Rindfleischquote bleibt klein gegenüber der EU-Produktion. Zugleich sind die Sorgen um faire Wettbewerbsbedingungen bei den Standards und um zusätzliche Rodungsanreize nicht ausgeräumt; die Durchsetzbarkeit der Umweltauflagen ist genau der Punkt, an dem sich die Lager scheiden. Endgültig entschieden ist ohnehin noch nichts: Das Europäische Parlament muss zustimmen, ein EuGH-Gutachten steht aus.',
};

const mercosurArticle: Article = {
  _id: 'seed-eu-mercosur',
  titel: 'EU-Mercosur: Was das neue Handelsabkommen für Deutschland bedeutet',
  slug: 'eu-mercosur-handelsabkommen',
  ressort: 'wirtschaft',
  standfirst:
    'Seit dem 1. Mai 2026 gilt das EU-Mercosur-Abkommen vorläufig — das bislang größte Handelsabkommen der EU. Für Deutschlands Industrie öffnet es einen Markt von rund 270 Millionen Menschen: Die EU verkauft vor allem Maschinen, Fahrzeuge und Arzneimittel und kauft im Gegenzug überwiegend Rohstoffe und Agrargüter. Genau diese Asymmetrie ist der Streitpunkt — zwischen Exportchancen, Sorgen der Landwirtschaft und dem Schutz des Regenwalds. Die Daten ordnen ein, wie groß Chancen und Risiken wirklich sind.',
  veroeffentlicht: '2026-06-22',
  themen: [
    { name: 'Außenhandel', slug: 'aussenhandel' },
    { name: 'Wirtschaft', slug: 'wirtschaft' },
    { name: 'Landwirtschaft', slug: 'landwirtschaft' },
  ],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Status und Verfahren: Die Verhandlungen wurden am 6. Dezember 2024 abgeschlossen (Partnerschaftsabkommen plus separates Interim-Handelsabkommen). Der Rat der EU billigte das Handelsabkommen am 9. Januar 2026 mit qualifizierter Mehrheit (21 zu 5; dagegen Österreich, Frankreich, Ungarn, Irland und Polen, Enthaltung Belgien); Unterzeichnung am 17. Januar 2026. Nach Ratifizierung in den Mercosur-Staaten (Februar bis März 2026) wird das Handelsabkommen seit dem 1. Mai 2026 vorläufig angewendet. Ausstehend: Zustimmung des Europäischen Parlaments; das Parlament hat den Vertrag am 21. Januar 2026 dem Europäischen Gerichtshof zur gutachterlichen Prüfung vorgelegt. Handelsdaten: Eurostat (Warenhandel EU-Mercosur 2024). Gezeigt sind die fünf größten Warengruppen je Richtung in Milliarden Euro; sie decken rund 42 Prozent der EU-Ausfuhren bzw. rund 59 Prozent der EU-Einfuhren ab (insgesamt EU-Ausfuhren 55,2 Mrd. Euro, EU-Einfuhren 56,0 Mrd. Euro). Die Anteile 86,6 Prozent (Industriegüter an den Ausfuhren) und 81,3 Prozent (Primärgüter an den Einfuhren) beziehen sich auf den gesamten Warenhandel, nicht auf die gezeigten Top-5. Über zehn Jahre (2014 bis 2024) stiegen die EU-Einfuhren aus dem Mercosur um 50,3 Prozent, die Ausfuhren um 25,1 Prozent. Deutschland-Bezug: Von den EU-Fahrzeug- und Kfz-Teil-Ausfuhren in den Mercosur (rund 5 Mrd. Euro) entfielen 42 Prozent auf Deutschland; bei Pkw-Ausfuhren nach Brasilien rund 70 Prozent (Eurostat). Rindfleischquote: zollbegünstigtes Kontingent von 99.000 Tonnen (7,5 Prozent Zoll), über fünf Jahre bis zur vollen Höhe eingeführt; bezogen auf diese Endstufe entspricht es rund 1,5 Prozent der EU-Rindfleischproduktion (rund 6,6 Millionen Tonnen) und etwa einem Drittel der heutigen Einfuhren aus dem Mercosur (347.000 Tonnen 2024; BMLEH). Die EU-Kommission legt für diese Einfuhren teils eine engere Abgrenzung zugrunde (rund 206.000 Tonnen), wonach das Kontingent näher an der Hälfte läge — die Werte unterscheiden sich je nach amtlicher Abgrenzung. Nach Schätzung der EU-Kommission könnten die EU-Rindfleischeinfuhren aus Südamerika um bis zu 64 Prozent steigen; diese Schätzung bezieht sich auf die gesamten Einfuhren aus Südamerika, nicht auf die Kontingentmenge. Positionen (Stand 2026) sind paraphrasiert und bequellt — keine wörtlichen Zitate. Vorbehalt: Das Abkommen wird vorläufig angewendet, ist aber noch nicht endgültig ratifiziert — „unterzeichnet und vorläufig angewendet“ ist nicht dasselbe wie „endgültig in Kraft“.',
  body: [
    block('h2', 'Worum es geht'),
    block(
      'normal',
      'Nach einem Vierteljahrhundert Verhandlung ist es so weit: Seit dem 1. Mai 2026 gilt das Handelsabkommen zwischen der EU und dem südamerikanischen Mercosur — Brasilien, Argentinien, Paraguay und Uruguay — vorläufig. Es ist das größte Handelsabkommen, das die EU je geschlossen hat, und verbindet rund 270 Millionen Menschen in Südamerika mit dem europäischen Binnenmarkt. Endgültig in Kraft ist es noch nicht: Das Europäische Parlament muss zustimmen, ein Gutachten des Europäischen Gerichtshofs steht aus.',
    ),
    block(
      'normal',
      'Drei Fragen führen durch den Beitrag: Was handeln die EU und Deutschland überhaupt mit dem Mercosur, und wer profitiert? Wie groß ist die vielzitierte Gefahr für die Landwirtschaft wirklich? Und woran scheiden sich die Geister, wenn sogar fünf EU-Länder das Abkommen ablehnen?',
    ),
    block('h2', 'Was die EU mit dem Mercosur handelt'),
    block(
      'normal',
      'Der Handel ist deutlich asymmetrisch, und aus Sicht der exportorientierten Industrie ist genau das attraktiv. Über alle Warengruppen hinweg verkauft die EU nach Südamerika fast nur verarbeitete Industriegüter (86,6 Prozent ihrer Ausfuhren) und kauft im Gegenzug überwiegend Rohstoffe und Agrargüter (81,3 Prozent ihrer Einfuhren). Die fünf größten Gruppen je Richtung zeigen das Muster.',
    ),
    ausfuhrBalken,
    einfuhrBalken,
    block(
      'normal',
      'Für Deutschland ist vor allem die Fahrzeugbranche im Spiel: 42 Prozent der EU-Fahrzeug- und Kfz-Teil-Ausfuhren in den Mercosur stammen aus Deutschland, bei Pkw nach Brasilien sind es rund 70 Prozent. Der Industrieverband BDI rechnet mit Zollersparnissen von rund vier Milliarden Euro pro Jahr und verweist auf den leichteren Zugang zu kritischen Rohstoffen wie Lithium und Kupfer. Der Handel zwischen EU und Mercosur ist über die vergangenen zehn Jahre ohnehin kräftig gewachsen: die Einfuhren um gut 50, die Ausfuhren um 25 Prozent.',
    ),
    block('h2', 'Was das Abkommen für die Landwirtschaft heißt'),
    block(
      'normal',
      'Die größte Sorge der Landwirtschaft trägt einen Namen: Rindfleisch — in der Debatte oft als „Rindfleischschwemme“ zugespitzt. Das Abkommen öffnet ein zollbegünstigtes Einfuhrkontingent von 99.000 Tonnen (zu 7,5 statt vollem Zoll), gestaffelt über fünf Jahre. Wie groß diese Menge im Verhältnis zur EU-Produktion ist, zeigt das folgende Diagramm.',
    ),
    rindfleischQuote,
    block(
      'normal',
      'Rund 1,5 Prozent der europäischen Produktion — so groß ist die Quote im Verhältnis, etwa ein Drittel der heutigen Einfuhren aus dem Mercosur (rund 347.000 Tonnen 2024). Erledigt ist die Sorge damit nicht: Erstens kann sich die Einfuhr in einzelnen Segmenten (etwa hochwertigen Teilstücken) und Regionen stärker bemerkbar machen, und die EU-Kommission selbst hält einen Anstieg der südamerikanischen Rindfleischeinfuhren um bis zu 64 Prozent für möglich. Diese Schätzung bezieht sich auf die gesamten EU-Einfuhren aus Südamerika, nicht auf die Kontingentmenge: 64 Prozent der heutigen rund 347.000 Tonnen wären etwa 222.000 Tonnen, also mehr als das Kontingent. Zweitens — und das ist der eigentliche Streit — geht es weniger um die Menge als um die Standards: Importware unterliegt nicht denselben Klima-, Umwelt- und Tierwohlauflagen wie die heimische Erzeugung.',
    ),
    block('h2', 'Wie darüber gestritten wird'),
    block(
      'normal',
      'Damit ist der Kern der Debatte erreicht: Sie verläuft nicht nur zwischen Befürwortung und Ablehnung, sondern quer durch Branchen und Mitgliedstaaten. Die folgenden Stimmen spannen das Feld auf.',
    ),
    mercosurDiskurs,
    {
      _type: 'quellenNote',
      _key: key(),
      text: 'Status und Verfahren: Rat der EU / Consilium und Europäische Kommission. Handelsdaten 2024 und Zehnjahresvergleich: Eurostat. Rindfleischquote und Agrarfolgen: BMLEH (FAQ) sowie EU-Kommission. Positionen paraphrasiert nach BDI, Europäischer Kommission, Bauernverbänden, Greenpeace und BMLEH. Stand: Juni 2026; das Abkommen wird vorläufig angewendet, die endgültige Ratifizierung (Zustimmung des Europäischen Parlaments, EuGH-Gutachten) steht aus.',
      quelle: {
        titel: 'Consilium — EU-Mercosur agreements explained',
        url: 'https://www.consilium.europa.eu/en/policies/eu-mercosur-agreements-explained/',
      },
    },
  ],
};

const usaBereichBalken: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Der US-Anteil in drei strategischen Bereichen',
    typ: 'balken',
    beschreibung:
      'Balkendiagramm des US-Anteils in drei strategischen Feldern (in Prozent): am EU-Cloud-Markt rund 70 Prozent (US-Hyperscaler, 2024), an Europas Großwaffen-Importen rund 55 Prozent (2019 bis 2023) und an den EU-Gasimporten rund 27 Prozent (erstes Halbjahr 2025). Wichtig: Die drei Werte messen Unterschiedliches (Marktanteil, Importanteil, Importanteil) und sind nicht direkt vergleichbar — sie zeigen das Muster einer hohen, in allen drei Feldern bedeutenden Abhängigkeit von einem einzigen Partner.',
    caption:
      'US-Anteil je Bereich: Cloud-Markt (Marktanteil der US-Anbieter 2024), Rüstung (Anteil an Europas Großwaffen-Importen 2019–23), Gas (Anteil an den EU-Gasimporten, 1. Halbjahr 2025). Je Bereich eine andere Bezugsgröße — nicht direkt vergleichbar. Quellen: Synergy Research, SIPRI/Bruegel, Eurostat.',
    encoding: { kategorieFeld: 'bereich', yFeld: 'anteil' },
    datensatz: {
      titel: 'US-Anteil in drei strategischen Bereichen',
      quelle: {
        titel: 'Synergy Research, SIPRI/Bruegel, Eurostat (je Bereich, siehe Methodik)',
        url: 'https://www.bruegel.org/policy-brief/europes-dependence-us-foreign-military-sales-and-what-do-about-it',
        herausgeber: 'Bruegel / Synergy Research / Eurostat',
      },
      spalten: [
        { name: 'bereich', typ: 'string' },
        { name: 'anteil', typ: 'number', einheit: '%' },
      ],
      daten: [
        { bereich: 'Cloud-Markt', anteil: 70 },
        { bereich: 'Rüstungsimporte', anteil: 55 },
        { bereich: 'Gasimporte', anteil: 27 },
      ],
    },
  },
};

const gasTauschLinie: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Russland raus, USA rein: der Anteil an den EU-Gasimporten',
    typ: 'linie',
    beschreibung:
      'Liniendiagramm des Anteils zweier Lieferanten an den gesamten EU-Gasimporten, 2019 bis 2025 (in Prozent). Russlands Anteil fällt von rund 51 Prozent (2019) über 19 Prozent (2024) auf rund 11 Prozent (erstes Halbjahr 2025). Der US-Anteil steigt im selben Zeitraum von rund 4 (2019) auf 16,5 (2024) und 27 Prozent (2025). Die Linien kreuzen sich um 2024/25 — Europa hat einen großen Teil seiner russischen Gasabhängigkeit durch eine wachsende Abhängigkeit von US-Gas (überwiegend LNG) ersetzt.',
    caption:
      'Anteil an den gesamten EU-Gasimporten, in Prozent, Schlüsseljahre 2019 / 2024 / 2025 (2025: erstes Halbjahr). Russlands Rückgang konzentriert sich auf die Zeit nach Februar 2022. Quellen: IEEFA (Berechnung auf Basis von Eurostat-Volumina), Columbia CGEP.',
    encoding: { xFeld: 'jahr', yFeld: 'anteil', serieFeld: 'lieferant' },
    datensatz: {
      titel: 'Anteil an den EU-Gasimporten: Russland und USA, 2019–2025',
      quelle: {
        titel: 'IEEFA-Berechnung auf Basis von Eurostat-Volumina; Columbia Center on Global Energy Policy',
        url: 'https://ieefa.org/resources/eu-risks-new-energy-dependence-us-could-supply-80-its-lng-imports-2030',
        herausgeber: 'IEEFA / Eurostat',
      },
      spalten: [
        { name: 'jahr', typ: 'string' },
        { name: 'lieferant', typ: 'string' },
        { name: 'anteil', typ: 'number', einheit: '%' },
      ],
      daten: [
        { jahr: '2019', lieferant: 'Russland', anteil: 51 },
        { jahr: '2019', lieferant: 'USA', anteil: 4 },
        { jahr: '2024', lieferant: 'Russland', anteil: 19 },
        { jahr: '2024', lieferant: 'USA', anteil: 16.5 },
        { jahr: '2025', lieferant: 'Russland', anteil: 11 },
        { jahr: '2025', lieferant: 'USA', anteil: 27 },
      ],
    },
  },
};

const autonomieDiskurs: BodyBlock = {
  _type: 'diskursBlock',
  _key: key(),
  titel: 'Wie viel Autonomie ist realistisch?',
  frage:
    'Soll Europa seine Abhängigkeit von den USA gezielt abbauen („strategische Autonomie“) — und wo geht das überhaupt, ohne die Sicherheit zu schwächen?',
  einleitung:
    'Über die Diagnose — hohe Abhängigkeit in mehreren Feldern — besteht weitgehend Einigkeit; über die Konsequenz wird gestritten, und die Lager verlaufen quer durch die EU. Ausgewählte Stimmen (paraphrasiert, mit Quelle):',
  perspektiven: [
    {
      label: 'Frankreich / Macron',
      aussage:
        'Der französische Präsident treibt die strategische Autonomie am stärksten voran: Europa sei „sterblich“, die Zeit, in der es seine Energie aus Russland und seine Sicherheit von den USA bezog, sei vorbei. Europa müsse eigene Fähigkeiten bei Verteidigung, Technologie und Industrie aufbauen, dürfe kein bloßer Befehlsempfänger sein und solle bei der Rüstung europäische Beschaffung bevorzugen.',
      quelle: {
        titel: 'NBC News — „Europe could die“, Macron-Rede an der Sorbonne',
        url: 'https://www.nbcnews.com/news/world/emmanuel-macron-europe-could-die-defense-economic-reform-rcna149323',
        herausgeber: 'NBC News',
      },
    },
    {
      label: 'Baltische Staaten / Polen',
      aussage:
        'Aus östlicher Sicht ist die transatlantische Bindung Sicherheitsgarantie, nicht Abhängigkeit: Angesichts der russischen Bedrohung zähle vor allem glaubwürdige Abschreckung, die kurzfristig nur die USA und die NATO liefern könnten; „strategische Autonomie“ sei nicht das eigene Ziel. Entscheidend sei, die USA in Europa engagiert zu halten, statt sich von ihnen zu lösen.',
      quelle: {
        titel: 'Kyiv Independent — Baltics skeptical of Western European leadership',
        url: 'https://kyivindependent.com/unless-you-act-its-just-rhetoric-baltics-skeptical-of-western-european-leadership/',
        herausgeber: 'The Kyiv Independent',
      },
    },
    {
      label: 'EU-Kommission',
      aussage:
        'Die Kommission setzt nicht auf Abkopplung, sondern auf gezieltes „De-Risking“: Mit der Strategie für wirtschaftliche Sicherheit, dem Chips Act und dem Gesetz zu kritischen Rohstoffen sollen riskante Einzelabhängigkeiten reduziert und Lieferketten in strategischen Sektoren gesichert werden — ohne offene Märkte und Bündnisse aufzugeben.',
      quelle: {
        titel: 'Europäische Kommission — Wirtschaftliche Sicherheit der EU',
        url: 'https://commission.europa.eu/topics/eu-economic-security_en',
        herausgeber: 'Europäische Kommission',
      },
    },
    {
      label: 'IEEFA (Energie)',
      aussage:
        'Energieanalysten warnen vor einem Déjà-vu: Europa habe die russische Gasabhängigkeit teils durch eine neue Abhängigkeit von US-LNG ersetzt. Bis 2030 könnten die USA bis zu 80 Prozent der EU-LNG-Importe stellen — die Lehre aus 2022 (Streuung der Lieferanten) drohe verfehlt zu werden, samt Preis- und Versorgungsrisiken bei politischen Spannungen.',
      quelle: {
        titel: 'IEEFA — EU risks new energy dependence as US could supply 80% of its LNG by 2030',
        url: 'https://ieefa.org/resources/eu-risks-new-energy-dependence-us-could-supply-80-its-lng-imports-2030',
        herausgeber: 'Institute for Energy Economics and Financial Analysis (IEEFA)',
      },
    },
    {
      label: 'Bruegel (Wirtschaftsforschung)',
      aussage:
        'Aus Forschungssicht ist Autonomie eine Frage des Maßes: Manche Abhängigkeiten lassen sich abbauen (Energie diversifizieren, eigene Cloud- und Rüstungskapazitäten aufbauen), andere — etwa US-Sicherheitsgarantien oder tief verankerte US-Software — kurzfristig nicht ersetzen. Sinnvoll sei gezieltes De-Risking mit klaren Prioritäten, nicht ein teures, unrealistisches Decoupling.',
      quelle: {
        titel: 'Bruegel — Europe’s dependence on US foreign military sales and what to do about it',
        url: 'https://www.bruegel.org/policy-brief/europes-dependence-us-foreign-military-sales-and-what-do-about-it',
        herausgeber: 'Bruegel',
      },
    },
    {
      label: 'ECIPE (Handelsökonomie)',
      aussage:
        'Aus handelsökonomischer Sicht ist „strategische Autonomie“ riskant: Trotz des Zusatzes „offen“ tendiere sie zum Protektionismus, verteuere Lieferketten und schade einer Wirtschaft, deren Wachstum überwiegend von außerhalb der EU komme. Abhängigkeiten ließen sich besser durch breitere Verflechtung und neue Handelsabkommen abbauen als durch Schutzinstrumente; Eigenständigkeit dürfe nicht zur Abschottung werden, und die Bindung an Partner wie die USA bleibe wirtschaftlich rational.',
      quelle: {
        titel: 'ECIPE — The EU Stuck Between Trade Openness and Strategic Autonomy',
        url: 'https://ecipe.org/insights/eu-trade-openness-strategic-autonomy/',
        herausgeber: 'European Centre for International Political Economy (ECIPE)',
      },
    },
  ],
  einordnung:
    'Mehrere Dinge sind zugleich richtig: Die Abhängigkeit ist real und in einigen Feldern (Rüstung, Cloud) gewachsen; ein vollständiges Abkoppeln wäre teuer, langwierig und sicherheitspolitisch riskant; und gezieltes De-Risking ist möglich, aber je Feld unterschiedlich schnell. Strittig bleibt das Tempo und die Reihenfolge — und ob Europa bereit ist, für mehr Eigenständigkeit kurzfristig höhere Kosten und Risiken zu tragen.',
};

const usaArticle: Article = {
  _id: 'seed-usa-abhaengigkeit',
  titel: 'Wie abhängig ist Europa von den USA?',
  slug: 'usa-abhaengigkeit-strategische-autonomie',
  ressort: 'wirtschaft',
  standfirst:
    'Krieg in der Ukraine, angekündigte US-Zölle, infrage gestellte Beistandszusagen und die Marktmacht der US-Tech-Konzerne: Europas Verhältnis zu den USA steht unter Druck wie lange nicht. In drei strategischen Feldern — Sicherheit, Technologie und Energie — zeigen die Daten, wie stark die EU von den USA abhängt: bei Waffen und Cloud-Diensten sehr, beim Gas seit dem Bruch mit Russland zunehmend. Der Beitrag ordnet ein, wo „strategische Autonomie“ realistisch ist und wo Europa kurzfristig gebunden bleibt.',
  veroeffentlicht: '2026-06-23',
  themen: [
    { name: 'Geopolitik', slug: 'geopolitik' },
    { name: 'Verteidigung', slug: 'verteidigung' },
    { name: 'Energie', slug: 'energie' },
  ],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Der Beitrag misst „Abhängigkeit“ in drei Feldern mit je eigener, nicht direkt vergleichbarer Kennzahl. Die drei Felder (Sicherheit, Technologie, Energie) stehen exemplarisch für besonders strategische, datenseitig belegbare Bereiche; die Auswahl ist nicht abschließend. Sicherheit: Anteil der USA an Europas Importen schwerer Waffen, rund 55 Prozent im Zeitraum 2019–2023 (gegenüber 35 Prozent 2014–2018; SIPRI, zitiert nach Bruegel). Ergänzend: US-Auslandsrüstungsverkäufe (Foreign Military Sales) machten 2022–2024 rund 51 Prozent der Beschaffung europäischer NATO-Staaten aus (2019–2021: 28 Prozent); der jährliche FMS-Wert stieg von rund 11 auf 68 Milliarden US-Dollar (Bruegel). Technologie: Anteil der US-Hyperscaler (Amazon, Microsoft, Google) am europäischen Cloud-Markt rund 70 Prozent 2024 (europäische Anbieter rund 15 Prozent; Synergy Research). Energie: Anteil der USA an den gesamten EU-Gasimporten rund 27 Prozent im ersten Halbjahr 2025 (2019: rund 4 Prozent); an den EU-LNG-Importen war die USA 2025 mit rund 56 Prozent größter Lieferant. Russlands Anteil an den EU-Gasimporten fiel von rund 51 Prozent (2019) auf rund 11 Prozent (erstes Halbjahr 2025), vor allem ab 2022; Norwegen bleibt größter Pipeline-Gaslieferant (Eurostat; Columbia Center on Global Energy Policy; API). Wichtig: Marktanteil, Importanteil und Beschaffungsanteil messen Verschiedenes — der Vergleich zeigt das Muster (hohe Abhängigkeit von einem Partner in mehreren Feldern), nicht direkt vergleichbare Größen. Die Linie zeigt Schlüsseljahre (2019/2024/2025), nicht jeden Jahreswert; die Endpunkte 2019 und 2025 sind belegt, die 2024-Zwischenwerte (Russland rund 19, USA rund 16,5 Prozent) sind gerundete Stützwerte. Die kombinierten Anteile an den gesamten Gasimporten sind eine IEEFA-Berechnung auf Basis von Eurostat-Volumina; 2025-Werte beziehen sich auf das erste Halbjahr. Positionen sind paraphrasiert und bequellt (überwiegend Stand 2024–2026; die handelsökonomische Kritik von ECIPE ist eine strukturelle Position von 2022) — keine wörtlichen Zitate; das Macron-Zitat „sterblich“ stammt aus der Sorbonne-Rede (April 2024) und ist als solches gekennzeichnet.',
  body: [
    block('h2', 'Worum es geht'),
    block(
      'normal',
      'Jahrzehntelang war die transatlantische Bindung für Europa selbstverständlich: Sicherheit über die NATO und die USA, günstige Technologie aus dem Silicon Valley, Energie zuletzt verstärkt aus den USA. Mit dem Krieg in der Ukraine, angekündigten US-Zöllen, offen infrage gestellten Beistandszusagen und Streit über die Marktmacht der US-Tech-Konzerne ist daraus eine Streitfrage geworden: Wie abhängig ist Europa eigentlich — und sollte es das ändern?',
    ),
    block(
      'normal',
      'Drei Fragen führen durch den Beitrag: In welchen Feldern hängt Europa wie stark von den USA ab? Wie hat sich das zuletzt verschoben — besonders bei der Energie? Und wie viel Eigenständigkeit ist überhaupt realistisch, ohne die eigene Sicherheit zu schwächen?',
    ),
    block('h2', 'Wo Europa von den USA abhängt'),
    block(
      'normal',
      'Die Abhängigkeit ist kein einzelner Wert, sondern verteilt sich über mehrere strategische Felder — und sie ist überall beträchtlich. Drei Kennzahlen aus Sicherheit, Technologie und Energie machen die Größenordnung greifbar (jede misst etwas anderes, daher nicht direkt vergleichbar):',
    ),
    usaBereichBalken,
    block(
      'normal',
      'Am sichtbarsten ist die Abhängigkeit bei Sicherheit und Technologie. Bei schweren Waffen kam zuletzt rund die Hälfte der europäischen Importe aus den USA — Tendenz steigend (55 Prozent für 2019–2023 gegenüber 35 Prozent davor). Käufe über das US-Programm Foreign Military Sales machten zuletzt 51 Prozent der NATO-Beschaffung der Europäer aus, nach 28 Prozent wenige Jahre zuvor. Systeme wie der F-35 oder PATRIOT binden über Software, Ersatzteile und Wartung langfristig an die USA. Beim Cloud-Computing kontrollieren Amazon, Microsoft und Google rund 70 Prozent des europäischen Marktes; europäische Anbieter halten nur etwa 15 Prozent — mit der Sorge, dass US-Gesetze (etwa der Cloud Act) Zugriff auf in Europa gespeicherte Daten ermöglichen.',
    ),
    block('h2', 'Die Verschiebung bei der Energie'),
    block(
      'normal',
      'Am stärksten verschoben hat sich zuletzt die Energie. Vor 2022 war Russland mit Abstand größter Gaslieferant der EU; nach dem Überfall auf die Ukraine brach dieser Anteil ein — und wurde zu einem großen Teil durch verflüssigtes Erdgas (LNG) aus den USA ersetzt.',
    ),
    gasTauschLinie,
    block(
      'normal',
      'Der US-Anteil an den EU-Gasimporten stieg von rund 4 Prozent (2019) auf rund 27 Prozent (erstes Halbjahr 2025); bei LNG ist die USA mit rund 56 Prozent inzwischen größter Lieferant. Russlands Anteil fiel im selben Zeitraum von rund 51 auf 11 Prozent. Zwei Dinge sind dabei wichtig: Es sind Anteile an einem nach 2022 deutlich geschrumpften Gesamtvolumen — ein höherer US-Anteil spiegelt also auch ein kleineres Ganzes wider; und die Lücke füllten nicht die USA allein, größter Pipeline-Gaslieferant der EU bleibt Norwegen. Dennoch warnen Energieanalysten vor einem Déjà-vu: Europa könnte eine Einzelabhängigkeit gegen die nächste getauscht haben — bis 2030 könnten die USA bis zu 80 Prozent der EU-LNG-Importe stellen. Anders als bei Russland ist die USA ein Bündnispartner; planbar bleibt die Lieferung aber nur, solange die Beziehungen stabil sind.',
    ),
    block('h2', 'Wie darüber gestritten wird'),
    block(
      'normal',
      'Über die Diagnose besteht weitgehend Einigkeit, über die Konsequenz nicht — und die Lager verlaufen quer durch die EU, zwischen denen, die mehr Eigenständigkeit fordern, und denen, für die die USA die unverzichtbare Sicherheitsgarantie sind. Die folgenden Stimmen spannen das Feld auf.',
    ),
    autonomieDiskurs,
    {
      _type: 'quellenNote',
      _key: key(),
      text: 'Sicherheit: SIPRI (Anteil an Großwaffen-Importen) und Bruegel (Foreign Military Sales). Technologie: Synergy Research (EU-Cloud-Marktanteile). Energie: Eurostat, Columbia Center on Global Energy Policy und API (EU-Gas- und LNG-Importe); Anteile an den gesamten Gasimporten. Positionen paraphrasiert nach Frankreich/Macron, baltischen Staaten, EU-Kommission, IEEFA, Bruegel und ECIPE. Stand: Juni 2026; 2025-Werte beziehen sich auf das erste Halbjahr.',
      quelle: {
        titel: 'Bruegel — Europe’s dependence on US foreign military sales',
        url: 'https://www.bruegel.org/policy-brief/europes-dependence-us-foreign-military-sales-and-what-do-about-it',
      },
    },
  ],
};

export const seedArticles: Article[] = [
  euDatenArticle,
  ...(hasDipData ? [dipArticle] : []),
  energieArticle,
  verteidigungArticle,
  migrationArticle,
  wohnenArticle,
  renteArticle,
  klimaArticle,
  sozialstaatArticle,
  wahlArticle,
  schuldenbremseArticle,
  buergergeldArticle,
  subventionenArticle,
  ganztagArticle,
  chinaArticle,
  staatsausgabenArticle,
  integrationArticle,
  mercosurArticle,
  usaArticle,
];

/**
 * Zurückgezogene / geparkte Entwürfe — NICHT in `seedArticles`, also weder live
 * noch im Publish/NDJSON. Inhalt bleibt erhalten (Wiederaufnahme = zurück in
 * `seedArticles` schieben). „Wer finanziert den Sozialstaat?“ wurde am 2026-06-05
 * von der Veröffentlichung zurückgenommen (Finanzierungs-Story aktuell nicht sauber
 * händelbar — Hierarchie/Steuerzuordnung nicht durchgängig belegbar).
 */
export const draftArticles: Article[] = [arbeitKapitalArticle];
