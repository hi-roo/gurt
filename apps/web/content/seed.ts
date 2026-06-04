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
      { akteur: 'BMWK (Reiche)', massnahme: 'Ausbau Erneuerbare', haltung: 'differenziert', zitat: 'Hält das geplante Ausbautempo für überzogen; fordert „Realitätscheck" und Synchronisierung mit dem Netzausbau.', quelle: { titel: 'pv-magazine', url: 'https://www.pv-magazine.de/2025/05/09/katherina-reiche-fordert-realitaetscheck-fuer-die-energiewende/' } },
      { akteur: 'BMWK (Reiche)', massnahme: 'Technologieoffenheit', haltung: 'dafuer', zitat: 'Ein Teil der Kapazität soll technologieoffen ausgeschrieben werden.', quelle: { titel: 'taz', url: 'https://taz.de/Umstrittener-Ausbau/!6122082/' } },
      { akteur: 'EU-Kommission', massnahme: 'Neue Gaskraftwerke', haltung: 'differenziert', zitat: 'Untersagte 20 GW beihilferechtlich; Verhandlung über rund 12–12,5 GW.', quelle: { titel: 'ZDFheute', url: 'https://www.zdfheute.de/politik/reiche-eu-gaskraftwerke-plan-widerstand-100.html' } },
      { akteur: 'EU-Kommission', massnahme: 'Ausbau Erneuerbare', haltung: 'dafuer', zitat: 'Verbindliches EU-Ziel: mindestens 42,5 % Erneuerbare bis 2030 (RED III).', quelle: { titel: 'Europäische Kommission', url: 'https://germany.representation.ec.europa.eu/news/energie-und-klima-kommission-begrusst-einigung-zu-erneuerbaren-energien-startet-aufruf-unter-dem-2023-03-30_de' } },
      { akteur: 'EU-Kommission', massnahme: 'Technologieoffenheit', haltung: 'unklar', zitat: 'Keine eindeutige öffentliche Festlegung zu diesem Begriff in dieser Debatte.' },
      { akteur: 'Umweltverbände', massnahme: 'Neue Gaskraftwerke', haltung: 'dagegen', zitat: 'Fordern keine weiteren fossilen Kraftwerke.', quelle: { titel: 'Umweltinstitut', url: 'https://umweltinstitut.org/energie-und-klima/mitmachaktionen/keine-weiteren-fossilen-kraftwerke-in-deutschland/' } },
      { akteur: 'Umweltverbände', massnahme: 'Ausbau Erneuerbare', haltung: 'dafuer', zitat: 'Setzen auf konsequenten Ausbau der Erneuerbaren statt neuer fossiler Kraftwerke.', quelle: { titel: 'Campact', url: 'https://www.campact.de/klima/energiewende-retten-lobby-ministerin-reiche-stoppen/' } },
      { akteur: 'Umweltverbände', massnahme: 'Technologieoffenheit', haltung: 'differenziert', zitat: 'Sehen „Technologieoffenheit" skeptisch — als möglichen Vorwand für neue fossile Kapazitäten.', quelle: { titel: 'Umweltinstitut', url: 'https://umweltinstitut.org/energie-und-klima/mitmachaktionen/keine-weiteren-fossilen-kraftwerke-in-deutschland/' } },
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
        { name: 'traeger', typ: 'string' },
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
  standfirst:
    'Wirtschaftsministerin Reiche will neue Gaskraftwerke — während die Erneuerbaren Rekorde brechen. Ein Widerspruch? Die echten Erzeugungsdaten zeigen: Versorgungssicherheit, Klimaschutz und Wettbewerbsfähigkeit verlangen parallele Antworten. Mehrere Dinge können gleichzeitig richtig sein.',
  veroeffentlicht: '2026-06-01',
  themen: [{ name: 'Energiepolitik', slug: 'energiepolitik' }],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Stromdaten: Fraunhofer ISE / Energy-Charts, öffentliche Nettostromerzeugung, Jahreswerte 2015–2024 (abgerufen 06/2026), über den GURT-Adapter aus der API aggregiert. Metrik-Hinweis: Die „öffentliche Nettostromerzeugung" unterscheidet sich von der „ins Netz eingespeisten" Menge (Destatis) und der Bruttostromerzeugung (AG Energiebilanzen) — der EE-Anteil liegt je nach Abgrenzung bei rund 59–63 %. Pumpspeicher sind als Speicher ausgenommen; „Erdgas" ohne Kuppelgas. Positionen (Stand 2025) sind paraphrasiert und bequellt (ZDFheute, taz, pv-magazine, Umweltinstitut/Campact) — keine wörtlichen Zitate. Reproduzierbar über den Energy-Charts-Adapter (packages/data). Primärenergieverbrauch nach Energieträgern (Treemap, in PJ) und Erdgasverbrauch nach Verbrauchsbereichen (Sankey, in TWh = Mrd. kWh, brennwertbezogen) stammen aus der AG Energiebilanzen (Jahresbericht „Energieverbrauch in Deutschland 2023", vorläufige Angaben). Wichtige Abgrenzung: Die 96,5 TWh „Stromversorgung" im Sankey sind die Gas-Einsatzmenge (Input) für die Stromerzeugung, nicht die daraus erzeugte Strommenge — sie ist deshalb nicht mit den 43,6 TWh Gas-Stromerzeugung (Output) im Strommix vergleichbar. Der „Stromaustauschsaldo" (+42 PJ, 0,4 %) ist ein Bilanzposten (Nettoimport) und 2023 positiv. Der Diskurs-Abschnitt bildet den Stand Mai 2026 ab (Kabinettsbeschluss zum StromVKG, EU-beihilferechtliche Genehmigung noch ausstehend); die Sichtweisen sind paraphrasiert und je mit Quelle ausgewiesen (pv magazine, taz; u. a. BMWE, EU-Kommission, BDEW, Deutsche Umwelthilfe, Bundesverband Neue Energiewirtschaft) — ausgewählt, um das Spektrum ausgewogen abzubilden.',
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
  standfirst:
    'Ein erster Beitrag mit echten Zahlen statt Beispielwerten: Das EU-Open-Data-Portal listet zehntausende energiebezogene Datensätze — aber sehr ungleich über die Themen verteilt.',
  veroeffentlicht: '2026-05-31',
  themen: [
    { name: 'Energiepolitik', slug: 'energiepolitik' },
    { name: 'Offene Daten', slug: 'offene-daten' },
  ],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
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
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
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

// Benchmark-Beitrag #2: Verteidigung / Zeitenwende — echte, bequellte Daten.
const verteidigungAusgabenLinie: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Verteidigungsausgaben im Anteil am BIP, 2014–2024',
    typ: 'linie',
    beschreibung:
      'Liniendiagramm der deutschen Verteidigungsausgaben als Anteil am realen Bruttoinlandsprodukt (NATO-Definition, Preisbasis 2021), 2014–2024. Der Wert steigt von 1,16 % (2014) auf 2,00 % (2024) — 2024 erreichte Deutschland erstmals seit Anfang der 1990er-Jahre die NATO-Marke von zwei Prozent. Der stärkste Sprung fällt mit dem Sondervermögen und der Zeitenwende ab 2022 zusammen.',
    caption:
      'Deutsche Verteidigungsausgaben als Anteil am realen BIP (NATO-Definition, Preisbasis 2021). 2024 erstmals 2,0 %. Quelle: NATO, Defence Expenditure of NATO Countries (2014–2025).',
    encoding: { xFeld: 'jahr', yFeld: 'anteil' },
    datensatz: {
      titel: 'Verteidigungsausgaben Deutschlands in % des BIP (NATO), 2014–2024',
      quelle: {
        titel: 'NATO — Defence Expenditure of NATO Countries (2014–2025)',
        url: 'https://www.nato.int/cps/en/natohq/news_236782.htm',
        herausgeber: 'NATO',
      },
      spalten: [
        { name: 'jahr', typ: 'string' },
        { name: 'anteil', typ: 'number', einheit: '% BIP' },
      ],
      daten: [
        { jahr: '2014', anteil: 1.16 },
        { jahr: '2015', anteil: 1.16 },
        { jahr: '2016', anteil: 1.18 },
        { jahr: '2017', anteil: 1.21 },
        { jahr: '2018', anteil: 1.23 },
        { jahr: '2019', anteil: 1.33 },
        { jahr: '2020', anteil: 1.49 },
        { jahr: '2021', anteil: 1.43 },
        { jahr: '2022', anteil: 1.48 },
        { jahr: '2023', anteil: 1.61 },
        { jahr: '2024', anteil: 2.0 },
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
        url: 'https://www.nato.int/cps/en/natohq/news_236782.htm',
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
        'Angesichts der Bedrohung durch Russland seien deutlich steigende Verteidigungsausgaben „zwingend notwendig"; Deutschland müsse abschreckungs- und bündnisfähig werden.',
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
        'Das Sondervermögen solle „zusätzlich" wirken und stärker investitionsorientiert eingesetzt werden, damit es die Verteidigungsfähigkeit tatsächlich erhöht und nicht reguläre Ausgaben ersetzt.',
      quelle: {
        titel: 'Zusätzlichkeit und Investitionsorientierung des Sondervermögens verbessern (Jahresgutachten 2025/26)',
        url: 'https://www.sachverstaendigenrat-wirtschaft.de/fileadmin/dateiablage/gutachten/jg202526/JG202526_Kapitel_2.pdf',
        herausgeber: 'Sachverständigenrat',
      },
    },
    {
      label: 'Die Linke (Ulrich Thoden, MdB)',
      aussage:
        'Die Devise „Whatever it takes" sei ein „Blankoscheck" für die Rüstungsindustrie; Verteidigung müsse aus dem Kernhaushalt finanziert werden, und Diplomatie dürfe nicht in den Hintergrund treten.',
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
  standfirst:
    'Innerhalb eines Jahrzehnts ist Deutschland vom Zwei-Prozent-Nachzügler zum Land geworden, das die NATO-Marke erreicht — finanziert über ein 100-Milliarden-Sondervermögen und eine gelockerte Schuldenbremse. Die echten Zahlen zeigen, wie groß der Sprung ist, wohin das Geld fließt und worüber gestritten wird.',
  veroeffentlicht: '2026-06-01',
  themen: [{ name: 'Verteidigung', slug: 'verteidigung' }],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Ausgaben-Zeitreihe: NATO, „Defence Expenditure of NATO Countries (2014–2025)", Tabelle 3 (Anteil am realen BIP, Preisbasis 2021); 2024 ist eine NATO-Schätzung. Hinweis zur Abgrenzung: Auf Basis laufender Preise weist die NATO für 2024 rund 2,12 % aus — wir nutzen durchgängig die inflationsbereinigte Reihe (real, 2021er Preise: 2,00 % für 2024), damit die Jahre vergleichbar sind. Die NATO-Definition ist weiter gefasst als der Verteidigungshaushalt (Einzelplan 14) und enthält u. a. Pensionen und Teile anderer Ressorts. Der Bündnisvergleich (Beeswarm) nutzt dieselbe Tabelle 3 (realer BIP-Anteil 2024, je Mitglied; Deutschland 2,00 %); Island ist ohne eigene Streitkräfte und meldet keinen %BIP-Wert, daher 31 statt 32 Punkte. Struktur des Sondervermögens: Wirtschaftsplan 2022 (81,9 Mrd € Verpflichtungsermächtigungen nach Dimensionen); die vollen 100 Mrd € umfassen zusätzlich später verplante Mittel und Finanzierungskosten/Zinsen, das Sondervermögen war Ende 2024 vollständig vertraglich gebunden. Ziel- und Planwerte (2026: rund 108 Mrd €; 2029: rund 152 Mrd € bzw. 3,5 % BIP; 5 % bis 2035) nach BMVg und Bundestag. Positionen (Stand 2025/2026) sind paraphrasiert und bequellt (Bundestag, Bundesrechnungshof, Sachverständigenrat, BMVg) — keine wörtlichen Zitate.',
  body: [
    block('h2', 'Worum es geht'),
    block(
      'normal',
      'Nach dem russischen Überfall auf die Ukraine rief Bundeskanzler Olaf Scholz 2022 die „Zeitenwende" aus und kündigte ein Sondervermögen von 100 Milliarden Euro für die Bundeswehr an. 2025 lockerte der Bundestag zudem die Schuldenbremse: Verteidigungsausgaben oberhalb von einem Prozent des BIP sind seither von ihr ausgenommen. Damit ist nicht nur ein einmaliger Schub finanziert, sondern ein dauerhaft höheres Ausgabenniveau angelegt.',
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
    {
      _type: 'quellenNote',
      _key: key(),
      text: 'Ausgaben: NATO, Defence Expenditure of NATO Countries (2014–2025), Tabelle 3 (real, 2021er Preise). Sondervermögen: Wirtschaftsplan 2022. Ziele/Planwerte: BMVg, Deutscher Bundestag. Positionen paraphrasiert nach Bundestag, Bundesrechnungshof und Sachverständigenrat. Abgrenzungs- und Metrik-Hinweise siehe Methodik.',
      quelle: { titel: 'NATO — Defence Expenditure of NATO Countries (2014–2025)', url: 'https://www.nato.int/cps/en/natohq/news_236782.htm' },
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
        titel: 'Statistisches Bundesamt 2025 (Wanderungsstatistik), zit. n. SVR „Fakten zur Einwanderung"',
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
        titel: 'BAMF 2025, zit. n. SVR „Fakten zur Einwanderung"',
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
    'Dass Deutschland angesichts einer schrumpfenden Erwerbsbevölkerung qualifizierte Zuwanderung braucht, ist unter Fachleuten breiter Konsens; umstritten sind das „Wie" der Steuerung, die Integration und das Verhältnis von Erwerbs- zu Fluchtmigration. Ausgewählte Stimmen (paraphrasiert, mit Quelle):',
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
        'Mit dem reformierten Fachkräfteeinwanderungsgesetz und der „Chancenkarte" (Punktesystem) sollen legale Wege erleichtert und die qualifizierte Zuwanderung aus Drittstaaten um bis zu 60.000 Personen pro Jahr erhöht werden.',
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

const migrationArticle: Article = {
  _id: 'seed-migration',
  titel: 'Zuwanderung und Arbeitsmarkt: Was die Zahlen zeigen',
  slug: 'migration-und-arbeitsmarkt',
  standfirst:
    'Die Nettozuwanderung ist seit dem Rekordjahr 2022 stark gesunken — zugleich altert Deutschland und die Erwerbsbevölkerung schrumpft. Die echten Zahlen zeigen, woher Menschen kommen, warum sie kommen und welche Rolle Zuwanderung für den Arbeitsmarkt spielt. Jenseits der Schlagzeilen ist das Bild vielschichtig.',
  veroeffentlicht: '2026-06-01',
  themen: [
    { name: 'Migration', slug: 'migration' },
    { name: 'Arbeitsmarkt', slug: 'arbeitsmarkt' },
  ],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Datenquellen: Statistisches Bundesamt (Wanderungsstatistik, Demografie), Bundesamt für Migration und Flüchtlinge (BAMF, Zuwanderungsgründe/Asyl), Institut der deutschen Wirtschaft (IW, Fachkräftelücken), Bundesagentur für Arbeit (Beschäftigung), zusammengefasst u. a. im SVR-Faktenpapier „Fakten zur Einwanderung in Deutschland" (Stand Dezember 2025). Bezugsjahr ist durchgängig 2024, soweit nicht anders genannt. Wichtige Einordnung: Der Aufenthaltszweck wird nur bei Drittstaatsangehörigen erfasst — die EU-Binnenzuwanderung (überwiegend Arbeit und Familie) ist im Gründe-Diagramm nicht enthalten; das Waffle bildet die vier größten dokumentierten Gründe ab, nicht die gesamte Zuwanderung. Die Herkunftsländer-Treemap zeigt die zehn größten Herkunftsländer der Nettozuwanderung ausländischer Staatsangehöriger (Gesamtwert 2024 rund 511.000). Die Wanderungsstatistik ist seit dem Berichtsjahr 2016 wegen methodischer Änderungen nur eingeschränkt mit früheren Jahren vergleichbar. Positionen sind paraphrasiert und bequellt — keine wörtlichen Zitate. Bewusst getrennt behandelt: Erwerbs- und Fluchtmigration.',
  body: [
    block('h2', 'Worum es geht'),
    block(
      'normal',
      'Deutschland ist seit 1957 — mit wenigen Ausnahmejahren — ein Einwanderungsland: Es ziehen mehr Menschen zu als fort. Nach dem Rekord von rund 1,46 Millionen Nettozuwanderung im Jahr 2022 (vor allem Geflüchtete aus der Ukraine) halbierte sich der Wert 2023 auf rund 663.000 und ging 2024 weiter auf rund 430.000 zurück.',
    ),
    block(
      'normal',
      'Zugleich altert die Gesellschaft: Die Geburtenrate fiel 2024 auf 1,35 Kinder je Frau — den niedrigsten Wert seit 2005 — und die Erwerbsbevölkerung schrumpft. Vor diesem Hintergrund führen drei Fragen durch den Beitrag: Woher kommen die Menschen? Warum kommen sie? Und welche Rolle spielt Zuwanderung für den Arbeitsmarkt?',
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
      'Der Zusammenhang zum Arbeitsmarkt ist messbar: 2024 stieg die sozialversicherungspflichtige Beschäftigung von Ausländerinnen und Ausländern, während die der deutschen Beschäftigten zurückging. Ohne Zuwanderung würde der Arbeitsmarkt also nicht wachsen, sondern schrumpfen. Die größten Fachkräftelücken verzeichnete 2024 das Gesundheitswesen (rund 46.100 unbesetzte Stellen), gefolgt vom Baugewerbe (rund 41.300). Mit dem Fachkräfteeinwanderungsgesetz und der „Chancenkarte" will die Bundesregierung die qualifizierte Zuwanderung aus Drittstaaten um bis zu 60.000 Personen jährlich erhöhen.',
    ),
    block('h2', 'Wie darüber gestritten wird'),
    block(
      'normal',
      'Über die Richtung herrscht weithin Einigkeit, über Tempo, Steuerung und Integration wird gestritten. Die folgenden Stimmen spannen das Feld auf.',
    ),
    migrationDiskurs,
    {
      _type: 'quellenNote',
      _key: key(),
      text: 'Daten: Statistisches Bundesamt (Wanderung, Demografie), BAMF (Gründe/Asyl), IW Köln (Fachkräftelücken), Bundesagentur für Arbeit (Beschäftigung); zusammengefasst im SVR-Faktenpapier 2025. Einordnungs- und Methodenhinweise siehe Methodik.',
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
      'Treemap der 2024 fertiggestellten Wohnungen Deutschlands nach Gebäudetyp (Statistisches Bundesamt). Die meisten Wohnungen entstehen in Mehrfamilienhäusern (135.300), die überwiegend von Unternehmen errichtet werden. Einfamilienhäuser (54.500) brachen am stärksten ein (−22 % gegenüber 2023), weil hohe Zinsen vor allem private Bauherren treffen. „Sonstige" umfasst Wohnheime, Wohnungen in Nichtwohngebäuden und Baumaßnahmen an bestehenden Gebäuden.',
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
    'Dass zu wenig gebaut wird und die Mieten in den Ballungsräumen steigen, ist unstrittig; über die Mittel wird gestritten. Im Oktober 2025 trat der „Bau-Turbo" in Kraft, der Genehmigungen beschleunigen soll. Ausgewählte Stimmen (paraphrasiert, mit Quelle):',
  perspektiven: [
    {
      label: 'Bundesregierung (BMWSB, „Bau-Turbo")',
      aussage:
        'Mit dem im Oktober 2025 in Kraft getretenen „Bau-Turbo" sollen Kommunen zusätzliche Wohnungen schneller und unter Bedingungen auch ohne Bebauungsplan zulassen können — um bezahlbaren Wohnraum zügiger zu schaffen.',
      quelle: {
        titel: 'Schneller bauen mit dem Wohnungsbau-Turbo',
        url: 'https://www.bundesregierung.de/breg-de/aktuelles/wohnungsbau-turbo-2354894',
        herausgeber: 'Bundesregierung',
      },
    },
    {
      label: 'Zentralverband Deutsches Baugewerbe (ZDB)',
      aussage:
        'Mehr als 760.000 Wohnungen seien genehmigt, aber noch nicht gebaut („Bauüberhang"). Viele Vorhaben scheiterten an Finanzierungskosten, Regulierung und fehlender Wirtschaftlichkeit; nötig sei daher ein „echter" Bau-Turbo mit besseren Rahmenbedingungen, nicht nur schnelleren Genehmigungen.',
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
  titel: 'Wohnen: Warum so wenig gebaut wird — und die Mieten steigen',
  slug: 'wohnen-bauen-und-mieten',
  standfirst:
    'Deutschland verfehlt sein Wohnungsbau-Ziel deutlich: 2025 wurden so wenige Wohnungen fertig wie seit über einem Jahrzehnt nicht. Zugleich bleibt die Nachfrage hoch — und die Mieten steigen. Die echten Zahlen zeigen, wie groß die Lücke ist, wer was baut und worüber gestritten wird.',
  veroeffentlicht: '2026-06-02',
  themen: [{ name: 'Wohnen', slug: 'wohnen' }],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Datenquelle: Statistisches Bundesamt (Destatis), Pressemitteilungen zu Baugenehmigungen (PD25_061 vom 18.02.2025; PD26_052 vom 18.02.2026) und Baufertigstellungen (PD25_183 vom 23.05.2025; PD26_174 vom 22.05.2026). Wichtige Abgrenzung: „Genehmigt" ist nicht „gebaut" — zwischen Genehmigung und Fertigstellung liegen zuletzt rund 26 Monate Bauzeit, und ein großer „Bauüberhang" (genehmigt, aber nicht fertiggestellt) ist noch offen. Das Ziel von 400.000 Wohnungen pro Jahr ist ein politisches Koalitionsziel der Bundesregierung, kein statistischer Wert. In der Treemap fasst „Sonstige" Wohnheime, Wohnungen in Nichtwohngebäuden und Baumaßnahmen an bestehenden Gebäuden zusammen (Residuum zur Gesamtzahl 2024). Mietangaben beziehen sich auf die amtlich gemessenen Nettokaltmieten im Verbraucherpreisindex; neu angebotene Wohnungen verteuern sich in Ballungsräumen erfahrungsgemäß schneller als der Index. Positionen (Stand 2025/2026) sind paraphrasiert und bequellt — keine wörtlichen Zitate.',
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
    block('h2', 'Genehmigt, gebaut — und das Ziel'),
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
      'Altenquotient (Personen ab 67 je 100 im Alter 20–66), 2024–2070. Drei Varianten der 16. koordinierten Bevölkerungsvorausberechnung: „Mittlere Annahme" (G2L2W2, durchgezogen) zwischen „Stärkere Alterung" (alte Bevölkerung, G1L3W1) und „Schwächere Alterung" (junge Bevölkerung, G3L1W3). Quelle: Statistisches Bundesamt, 16. kBV (eigene Berechnung aus der Altersstruktur, GENESIS-Tabelle 12421-0002).',
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
  titel: 'Die Rente und ihre Annahmen: Was trägt — und was, wenn es kippt?',
  slug: 'rente-und-ihre-annahmen',
  standfirst:
    'Die gesetzliche Rente ist umlagefinanziert: Die Beiträge von heute zahlen die Renten von heute. Das funktioniert, solange genug Erwerbstätige auf jede Rentnerin kommen — doch die geburtenstarken Jahrgänge gehen in Rente. Die echten Zahlen zeigen, wie stark die Last steigt, was die Annahmen versprechen und worüber gestritten wird.',
  veroeffentlicht: '2026-06-02',
  themen: [{ name: 'Rente', slug: 'rente' }],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Datenquellen: Statistisches Bundesamt, 16. koordinierte Bevölkerungsvorausberechnung (Basis 31.12.2024, veröffentlicht Dezember 2025). Der Altenquotient-Korridor zeigt Personen ab 67 je 100 Personen im Alter 20 bis 66 — eigene Berechnung aus der Altersstruktur (GENESIS-Tabelle 12421-0002, Summe der Einzelaltersjahre je Variante): heute rund 33; bis 2070 je nach Variante rund 43 (Minimum = junge Bevölkerung, G3L1W3), 51 (Moderat, G2L2W2) oder 61 (Maximum = alte Bevölkerung, G1L3W1). Die berechneten Endwerte (42,8 / 51,0 / 61,0) decken sich mit den von Destatis veröffentlichten Eckwerten (43 / 51 / 61). Beitragszahler je Rentner: beobachtet (1962 rund 6; 1973 rund 4; 1988 rund 3; 2024 rund 2,1 = 40,11 Mio. aktiv Versicherte je 18,92 Mio. Altersrentner; Demografieportal des BiB und Deutsche Rentenversicherung „Rentenversicherung in Zahlen 2025"); Projektion 2030 rund 1,5 und 2050 rund 1,3 (IW Köln, leicht abweichende Abgrenzung „je Rentner insgesamt", daher gerundet und als Projektion getrennt ausgewiesen). Das amtliche Maß der Rentenformel ist der Äquivalenz-Rentnerquotient (rund 48 Rentner je 100 Beitragszahler 2016, rund 70 bis 2045 ⇒ rechnerisch rund 1,4 Beitragszahler je Rentner). Aussage Friedrich Merz: DGB-Bundeskongress, Mai 2026. Renten-Projektion: Rentenversicherungsbericht 2025 (Bundesregierung/BMAS); Rentenniveau per Haltelinie bis zur Rentenanpassung 2031 bei 48 %, danach laut Projektion bis 2039 auf 46,3 %; Beitragssatz bis 2027 bei 18,6 %, danach steigend (19,8 % 2028, 20,0 % 2029) bis 2039 auf 21,2 %. Finanzierung 2024 (DRV): Einnahmen rund 402 Mrd. Euro, davon Beiträge rund 306 Mrd. (rund 76 %) und Bundesmittel/Steuern rund 93 Mrd. (rund 23 %); der jährliche Bundeszuschuss liegt über 100 Mrd. Euro. Private/kapitalgedeckte Vorsorge: Frühstart-Rente (Kabinettsbeschluss Dezember 2025, Auszahlung ab 2026), Altersvorsorgereformgesetz und Zweites Betriebsrentenstärkungsgesetz (Dezember 2025) — Quellen Bundesregierung/BMF; kritische Einordnung u. a. Wirtschaftsdienst (ZBW). Projektionen sind keine Prognosen, sondern Modellrechnungen unter Annahmen. Positionen (Stand 2025/2026) sind paraphrasiert und bequellt.',
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
      'Bundeskanzler Friedrich Merz brachte diese Last beim DGB-Bundeskongress im Mai 2026 auf eine Formel — „Das ist Demografie und Mathematik" — und begründete damit den Reformbedarf:',
    ),
    merzAussageZitat,
    block(
      'normal',
      'Gemeint ist das Umlageprinzip: Die Beiträge der Erwerbstätigen finanzieren die laufenden Renten. Entscheidend ist deshalb, wie viele Beitragszahler auf einen Rentner kommen. Dieses Verhältnis ist über Jahrzehnte gesunken — von rund sechs in den 1960er-Jahren auf etwa zwei heute (2024: 40,1 Millionen aktiv Versicherte, 18,9 Millionen Altersrentner). Und mit der Verrentung der Babyboomer sinkt es absehbar unter zwei zu eins.',
    ),
    beitragszahlerLinie,
    block(
      'normal',
      'Die Aussage trifft die Richtung — als „zwei finanzieren eine" ist sie aber eine Vereinfachung. Drei Dinge runden das Bild, und sie können gleichzeitig richtig sein. Erstens hängt die genaue Zahl von der Definition ab: je nachdem, ob man nur Altersrentner (rund 2,1) oder alle Rentenbeziehenden zählt und ob man nach Köpfen oder nach dem amtlichen Äquivalenz-Rentnerquotienten der Rentenformel rechnet, fällt sie etwas anders aus. „Zwei" ist eine faire gerundete Momentaufnahme, keine exakte Konstante. Zweitens tragen nicht allein die Beiträge: 2024 kamen rund 76 Prozent der Einnahmen aus Beiträgen, aber rund ein Viertel — etwa 93 Milliarden Euro — aus Steuern (Bundeszuschuss), unter anderem als Ausgleich für versicherungsfremde Leistungen. Drittens zählt die Kennzahl Köpfe, nicht Beiträge pro Kopf: Löhne und Produktivität steigen über die Zeit, weshalb das reine Kopf-Verhältnis die Last tendenziell überzeichnet. Die Demografie verschärft sie dennoch real.',
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
      text: 'Daten: Statistisches Bundesamt (16. koordinierte Bevölkerungsvorausberechnung; Altenquotient eigene Berechnung aus GENESIS-Tabelle 12421-0002), Deutsche Rentenversicherung („Rentenversicherung in Zahlen 2025"), Demografieportal des BiB, IW Köln und Rentenversicherungsbericht 2025 (Bundesregierung/BMAS). Zitat Friedrich Merz: DGB-Bundeskongress, Mai 2026 (Der Tagesspiegel). Positionen paraphrasiert nach Bundesregierung/BMF, Deutscher Rentenversicherung, IW Köln, Sozialverband VdK, Wissenschaftlichem Beirat beim BMWK und Wirtschaftsdienst (ZBW). Definitions- und Modellhinweise siehe Methodik.',
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
  titel: 'Deutschlands Treibhausgase: 48 Prozent geschafft — der schwerere Teil kommt noch',
  slug: 'treibhausgase-und-klimaziele',
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
};

const sozialquoteLinie: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Seit zwei Jahrzehnten ein enges Band — mit Krisen-Ausschlag',
    typ: 'linie',
    beschreibung:
      'Liniendiagramm der Ausgaben für Sozialschutz in Prozent des Bruttoinlandsprodukts (Eurostat, EU-harmonisiert) für Deutschland, 2000–2023. Der Wert bewegt sich über zwei Jahrzehnte in einem engen Band um 28 bis 30 Prozent: 28,5 (2000), 28,6 (2005), 29,5 (2010), 28,9 (2015). 2020 schnellt er auf 32,5 Prozent — ein Ausnahmewert, weil in der Corona-Krise die Wirtschaftsleistung einbrach und die Ausgaben stiegen —, danach geht er auf 29,9 Prozent (2022 und 2023) zurück. Die Quote explodiert also nicht; sie steigt in Krisen sprunghaft und normalisiert sich danach. Die etwas breiter gefasste nationale Sozialleistungsquote (Sozialbudget) liegt rund einen Punkt höher: 31,2 Prozent für 2024.',
    caption:
      'Ausgaben für Sozialschutz in % des BIP, Deutschland, 2000–2023 (Eurostat). Der Sprung 2020 ist ein Krisen-Sondereffekt. Quelle: Eurostat (ESSPROS). Die nationale Sozialleistungsquote des Sozialbudgets liegt etwas höher (2024: 31,2 %).',
    encoding: { xFeld: 'jahr', yFeld: 'quote' },
    datensatz: {
      titel: 'Ausgaben für Sozialschutz in % des BIP, Deutschland, 2000–2023 (Eurostat)',
      quelle: {
        titel: 'Eurostat — Ausgaben für Sozialschutz in % des BIP (ESSPROS)',
        url: 'https://ec.europa.eu/eurostat/de/web/social-protection',
        herausgeber: 'Eurostat',
      },
      spalten: [
        { name: 'jahr', typ: 'string' },
        { name: 'quote', typ: 'number', einheit: '% des BIP' },
      ],
      daten: [
        { jahr: '2000', quote: 28.5 },
        { jahr: '2005', quote: 28.6 },
        { jahr: '2010', quote: 29.5 },
        { jahr: '2015', quote: 28.9 },
        { jahr: '2020', quote: 32.5 },
        { jahr: '2022', quote: 29.9 },
        { jahr: '2023', quote: 29.9 },
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
      'Beeswarm-Diagramm: Ausgaben für Sozialschutz in Prozent des BIP 2023 (Eurostat) für 30 europäische Staaten, je ein Punkt pro Land. Deutschland liegt mit 29,9 Prozent über dem EU-Durchschnitt (27,8 Prozent, gestrichelte Linie), aber klar hinter den höchsten: Frankreich 33,8, Finnland 31,8, Österreich 30,6. Mehrere dieser Hochausgaben-Länder sind wirtschaftlich stark — ein einfacher Umkehrschluss „weniger Sozialausgaben gleich mehr Wirtschaftskraft" lässt sich aus der Verteilung nicht ablesen. Am unteren Ende liegen Irland (12,6; durch die BIP-Verzerrung ein Sonderfall) und osteuropäische Staaten.',
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
  titel: 'Bremst der Sozialstaat die Wirtschaft — oder stützt er sie?',
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
        'Der Sozialstaat sei ein Fundament der sozialen Marktwirtschaft und habe Deutschland stark gemacht. Reformen seien möglich, ein pauschales Einsparen zweistelliger Milliardenbeträge „am Sozialstaat" werde es mit der SPD aber nicht geben.',
      quelle: {
        titel: 'Sozialstaat „nicht finanzierbar": Merz fordert Reformen, SPD blockiert',
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
        'Ein Datencheck zeige: Deutschlands Sozialausgaben lägen im internationalen Vergleich im Mittelfeld und seien nicht „aufgebläht". Der Sozialstaat stabilisiere Nachfrage und Gesellschaft; Kürzungen träfen vor allem die Schwächeren und schwächten die Konjunktur in Krisen.',
      quelle: {
        titel: 'Die Mär vom aufgeblähten Sozialstaat',
        url: 'https://www.boeckler.de/de/boeckler-impuls-die-mar-vom-aufgeblahten-sozialstaat-57956.htm',
        herausgeber: 'Hans-Böckler-Stiftung',
      },
    },
    {
      label: 'Sozialverbände (Der Paritätische)',
      aussage:
        'Deutschland sei kein „Spitzenreiter" bei den Sozialausgaben. Leistungskürzungen verschärften Armut, ohne die strukturellen Kostentreiber — Demografie und Gesundheit — zu lösen; nötig seien gezielte Reformen und auskömmliche Finanzierung, nicht pauschaler Rückbau.',
      quelle: {
        titel: 'Deutschland — Spitzenreiter bei den Sozialausgaben?',
        url: 'https://www.der-paritaetische.de/alle-meldungen/deutschland-spitzenreiter-bei-den-sozialausgaben/',
        herausgeber: 'Der Paritätische',
      },
    },
  ],
  einordnung:
    'Die Daten ordnen den Streit, entscheiden ihn aber nicht: Der Sozialstaat ist groß, international jedoch nicht außergewöhnlich, und vor allem von Alter und Gesundheit getrieben — also von der Demografie. Ob er die Wirtschaft bremst oder stützt, hängt davon ab, welcher Mechanismus überwiegt: dämpfen hohe Abgaben Leistung und Investitionen, oder sichern Stabilität, Nachfrage und Humankapital das Wachstum? Die empirische Evidenz ist gemischt, und beide Wirkungen können nebeneinander bestehen. Die eigentliche Frage ist deshalb weniger „kürzen oder nicht", sondern wo, wie und mit welcher Wirkung umgebaut wird.',
};

const sozialstaatArticle: Article = {
  _id: 'seed-sozialstaat',
  titel: 'Sozialstaat: Bremse oder Stütze der Wirtschaft?',
  slug: 'sozialstaat-bremse-oder-stuetze',
  standfirst:
    'Der Sozialstaat kostet rund ein Drittel der Wirtschaftsleistung — und ist zum Streitfall geworden: Die einen sehen eine Wachstumsbremse, die gekürzt gehört, die anderen eine Investition, die die Wirtschaft stabil hält. Beide Seiten haben Zahlen und Argumente. Die echten Daten zeigen, wie groß der Sozialstaat ist, wofür er das Geld ausgibt und wie er international dasteht — und ordnen den Streit neutral ein.',
  veroeffentlicht: '2026-06-03',
  themen: [{ name: 'Wirtschaft', slug: 'wirtschaft' }],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Die Größe des Sozialstaats wird mit unterschiedlichen, leicht abweichenden Kennzahlen gemessen — sie werden hier nicht vermischt: (1) Die nationale Sozialleistungsquote des Sozialbudgets (BMAS) lag 2024 bei 31,2 % des BIP (rund 1.345 Mrd. Euro, vorläufig). (2) Die EU-harmonisierte Eurostat-Quote „Ausgaben für Sozialschutz in % des BIP" (ESSPROS) ist etwas enger gefasst; für sie wird die Zeitreihe (Deutschland 2000–2023) und der europäische Ländervergleich 2023 verwendet. (3) Die OECD-Quote „öffentliche Sozialausgaben" ist noch enger (Deutschland rund 26,7 %, 2022). Linie: Eurostat/ESSPROS, Deutschland, ausgewählte Jahre 2000–2023; der Wert 2020 (32,5 %) ist ein Krisen-Sondereffekt (BIP-Einbruch). Treemap: BMAS-Sozialbudget 2022 nach Funktionen (Summe rund 1.179 Mrd. Euro); „Krankheit & Invalidität" umfasst Gesundheit, Pflege und Erwerbsminderung. Ländervergleich (Beeswarm): Eurostat 2023, EU- und EFTA-Staaten, Referenzlinie EU-27-Durchschnitt 27,8 %; Irland ist wegen der BIP-Verzerrung ein Sonderfall. Die Wirkung des Sozialstaats auf das Wirtschaftswachstum ist wissenschaftlich umstritten (Anreiz- vs. Stabilisierungs-/Investitionswirkung) und wird hier als Debatte dargestellt, nicht als gesicherte Tatsache. Gesamtsozialversicherungsbeitrag: Summe der Beitragssätze (Rente, Kranken inkl. durchschnittlichem Zusatzbeitrag, Pflege ohne Kinderlosen-Zuschlag, Arbeitslosen) in % des Bruttolohns; beobachtete Stützjahre nach sozialpolitik-aktuell (2025: 42,3 %), Projektion 2035 (rund 49,7 %) nach vbw-Studie 2025 — Arbeitgeber und Beschäftigte tragen je etwa die Hälfte. Zur Wirksamkeit von Beitragssenkungen: Schätzungen zum französischen CICE-Umbau (rund 40.000–70.000 Stellen, etwa 51.000 Euro je Stelle und Jahr, geringer BIP-Effekt). Eine Senkung der Arbeitgeberbeiträge mindert die Einnahmen der Sozialversicherung (Entlastung, keine Einsparung) und erfordert Gegenfinanzierung. Positionen (Stand 2025/2026) sind paraphrasiert und bequellt; das wörtliche Zitat ist belegt.',
  body: [
    block('h2', 'Worum es geht'),
    block(
      'normal',
      'Bundeskanzler Friedrich Merz hat den Streit im August 2025 zugespitzt:',
    ),
    merzSozialstaatZitat,
    block(
      'normal',
      'Die Aussage traf einen Nerv — und Widerspruch, auch vom Koalitionspartner: SPD-Chef Lars Klingbeil hielt entgegen, man werde nicht „mal eben 30 Milliarden am Sozialstaat sparen". Hintergrund sind eine Haushaltslücke von rund 30 Milliarden Euro für 2027 und eine Sozialleistungsquote auf Rekordhöhe. Der Streit verläuft damit mitten durch die Regierung. Drei Fragen führen durch den Beitrag: Wie groß ist der Sozialstaat wirklich? Wofür gibt er das Geld aus? Und bremst er die Wirtschaft — oder stützt er sie?',
    ),
    block('h2', 'Wie groß ist der Sozialstaat?'),
    block(
      'normal',
      'Gemessen wird die Größe an der Sozialleistungsquote — dem Anteil aller Sozialausgaben an der Wirtschaftsleistung. Nach dem nationalen Sozialbudget lag sie 2024 bei 31,2 Prozent (rund 1.345 Milliarden Euro). EU-einheitlich erfasst liegt sie etwas niedriger, bewegt sich aber seit über zwei Jahrzehnten in einem engen Band — mit einem Ausschlag nach oben 2020, als die Wirtschaft in der Pandemie einbrach und die Ausgaben stiegen. Von einer „Explosion" der Kosten lässt sich also nicht sprechen.',
    ),
    sozialquoteLinie,
    block('h2', 'Wofür gibt er das Geld aus?'),
    block(
      'normal',
      '„Sozialstaat" wird im Streit oft mit Transfers für Arbeitslose gleichgesetzt — die Zahlen zeigen ein anderes Bild. Der mit Abstand größte Teil fließt in Alter (Renten) und Gesundheit; Arbeitslosigkeit ist nur ein kleiner Posten. Der Sozialstaat ist damit vor allem von Demografie und Gesundheitskosten getrieben, nicht von „Untätigkeit" — was die Stellschrauben einer Reform stark einschränkt.',
    ),
    sozialbudgetTreemap,
    block('h2', 'Wie steht Deutschland international da?'),
    block(
      'normal',
      'Ist Deutschland Spitzenreiter? Im europäischen Vergleich liegt es etwas über dem EU-Durchschnitt, aber klar hinter Ländern wie Frankreich, Finnland oder Österreich. Bemerkenswert: Mehrere Hochausgaben-Länder sind zugleich wirtschaftlich stark. Ein einfacher Umkehrschluss „weniger Sozialausgaben bedeuten mehr Wirtschaftskraft" lässt sich aus der Verteilung nicht ziehen.',
    ),
    sozialBeeswarm,
    block('h2', 'Der meistdiskutierte Hebel: Lohnzusatzkosten'),
    block(
      'normal',
      'Hinter der Streitfrage steht eine konkrete Zahl: der Gesamtsozialversicherungsbeitrag — die Summe der Beiträge für Rente, Kranken-, Pflege- und Arbeitslosenversicherung. Über zwanzig Jahre lag er stabil um 40 Prozent des Bruttolohns; seit 2023 steigt er und hat die 40-Prozent-Marke überschritten, die Arbeitgeberverbände und die Regierung als Obergrenze nennen. Modellrechnungen sehen ihn bis 2035 Richtung 50 Prozent — getrieben von der Alterung. Weil Beschäftigte und Arbeitgeber den Beitrag je zur Hälfte zahlen, sind die „Lohnzusatzkosten" der lauteste Reform-Hebel.',
    ),
    sozialbeitragLinie,
    block(
      'normal',
      'Naheliegend klingt: den Arbeitgeber-Anteil senken, dann sinken die Arbeitskosten. Hier lohnt aber ein genauer Blick — denn eine Beitragssenkung spart dem Sozialstaat nichts, sie senkt seine Einnahmen. Was die Arbeitgeber entlastet, hinterlässt eine Finanzierungslücke, die jemand füllen muss: höhere Steuerzuschüsse (also alle Steuerzahlenden), höhere Beiträge der Beschäftigten — oder Leistungskürzungen. Entlastung ist nicht dasselbe wie Einsparung.',
    ),
    block(
      'normal',
      'Wie wirksam wären solche Senkungen? Die Erfahrung des europäischen Auslands ist ernüchternd: Frankreich hat seine Arbeitgeberbeiträge stark gesenkt (Umbau des Steuergutschrift-Programms CICE). Studien schätzen den Effekt auf rund 40.000 bis 70.000 zusätzliche Stellen — bei Kosten von etwa 51.000 Euro je Stelle und Jahr und kaum messbarem Wachstumseffekt. Der ökonomisch seriöse Kern ist die Idee der „fiskalischen Abwertung": Finanzierung von der Arbeit auf den Konsum (Mehrwertsteuer) verlagern, was Exporte relativ verbilligt — die Last trägt dann aber der Konsum, also auch Beschäftigte und Rentnerinnen. Kurz: Der Hebel verlagert vor allem, wer zahlt; billiger wird der Sozialstaat dadurch nicht, und die Beschäftigungseffekte sind moderat und teuer erkauft.',
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

const wahlChord: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Wer stimmt mit wem?',
    typ: 'chord',
    beschreibung:
      'Chord-Diagramm der Übereinstimmung im Abstimmungsverhalten der sechs Bundestags­fraktionen (CDU/CSU, SPD, Grüne, FDP, AfD, Linke) in der 20. Wahlperiode. Grundlage sind 107 namentliche Abstimmungen (18.11.2021–07.07.2023); der Wert je Fraktionspaar ist der Anteil der Abstimmungen, bei denen beide Fraktionen dieselbe Mehrheits­haltung (Ja/Nein/Enthaltung) zeigten. Jede Fraktion ist ein Bogen, jedes Band verbindet zwei Fraktionen — je breiter, desto höher die Übereinstimmung. Am höchsten ist sie innerhalb der damaligen Ampel-Koalition: SPD und Grüne stimmten in allen Abstimmungen gleich (100 %), SPD/Grüne und FDP zu 98,1 %. CDU/CSU liegt mit rund 47,7 % zur Koalition und 46,7 % zur AfD dazwischen. Die niedrigsten Werte hat die AfD gegenüber der Koalition (19,6 %); ihre höchste Übereinstimmung besteht mit der Linken (52,3 %) — meist als gemeinsame Ablehnung von Regierungsvorlagen, nicht aus inhaltlicher Nähe. Die Farben folgen den üblichen Partei-Erkennungsfarben (CDU/CSU Grau, SPD Magenta, Grüne Grün, FDP Gelb, AfD Blau, Linke Orange) — als Identitätsmerkmal, nicht als Wertung.',
    caption:
      'Übereinstimmung im Abstimmungsverhalten der Bundestagsfraktionen, 20. Wahlperiode. Anteil der 107 namentlichen Abstimmungen (Nov 2021–Juli 2023), bei denen zwei Fraktionen dieselbe Mehrheitshaltung hatten. Quelle: Datenanalyse nach Daten des Deutschen Bundestags.',
    encoding: {
      kategorieFeld: 'fraktionA',
      serieFeld: 'fraktionB',
      yFeld: 'uebereinstimmung',
      // Partei-Erkennungsfarben als Identitätsmerkmal (dokumentierte Ausnahme; nie
      // wertend, AA geprüft). Werte aus der kanonischen Palette „GURT Vibrant"
      // (dataPalette): SPD data-7, Grüne data-4, FDP data-3, AfD data-6, Linke data-5;
      // einzige Nicht-Palette-Farbe ist das neutrale Grau der CDU/CSU. Format „Label:#hex".
      farben: ['CDU/CSU:#4b5563', 'SPD:#9e0059', 'Grüne:#1f9e5a', 'FDP:#ffbd00', 'AfD:#3d6fe0', 'Linke:#ff5400'],
    },
    datensatz: {
      titel: 'Fraktions-Übereinstimmung im Bundestag (20. WP, 107 namentliche Abstimmungen)',
      quelle: {
        titel: 'Datenanalyse des Abstimmungsverhaltens im Bundestag (nach Bundestag-Daten)',
        url: 'https://nicosrp.medium.com/datenanalyse-des-abstimmungsverhaltens-im-bundestag-ddddc502091b',
        herausgeber: 'Auswertung der namentlichen Abstimmungen des Deutschen Bundestags',
      },
      spalten: [
        { name: 'fraktionA', typ: 'string' },
        { name: 'fraktionB', typ: 'string' },
        { name: 'uebereinstimmung', typ: 'number', einheit: '%' },
      ],
      daten: [
        { fraktionA: 'CDU/CSU', fraktionB: 'SPD', uebereinstimmung: 47.7 },
        { fraktionA: 'CDU/CSU', fraktionB: 'Grüne', uebereinstimmung: 47.7 },
        { fraktionA: 'CDU/CSU', fraktionB: 'FDP', uebereinstimmung: 47.7 },
        { fraktionA: 'CDU/CSU', fraktionB: 'AfD', uebereinstimmung: 46.7 },
        { fraktionA: 'CDU/CSU', fraktionB: 'Linke', uebereinstimmung: 33.6 },
        { fraktionA: 'SPD', fraktionB: 'Grüne', uebereinstimmung: 100 },
        { fraktionA: 'SPD', fraktionB: 'FDP', uebereinstimmung: 98.1 },
        { fraktionA: 'SPD', fraktionB: 'AfD', uebereinstimmung: 19.6 },
        { fraktionA: 'SPD', fraktionB: 'Linke', uebereinstimmung: 34.6 },
        { fraktionA: 'Grüne', fraktionB: 'FDP', uebereinstimmung: 98.1 },
        { fraktionA: 'Grüne', fraktionB: 'AfD', uebereinstimmung: 19.6 },
        { fraktionA: 'Grüne', fraktionB: 'Linke', uebereinstimmung: 34.6 },
        { fraktionA: 'FDP', fraktionB: 'AfD', uebereinstimmung: 19.6 },
        { fraktionA: 'FDP', fraktionB: 'Linke', uebereinstimmung: 34.6 },
        { fraktionA: 'AfD', fraktionB: 'Linke', uebereinstimmung: 52.3 },
      ],
    },
  },
};

const wahlArticle: Article = {
  _id: 'seed-wer-stimmt-mit-wem',
  titel: 'Wer stimmt mit wem? Die Fraktionen im Bundestag',
  slug: 'wer-stimmt-mit-wem',
  standfirst:
    'Bei namentlichen Abstimmungen zeigt sich, welche Fraktionen im Bundestag oft gleich votieren — und welche selten. Ein Chord-Diagramm macht diese Nähe und Distanz auf einen Blick sichtbar. Es ist eine rein beschreibende Karte des Abstimmungsverhaltens: Sie zeigt, wer wie oft dieselbe Mehrheit hatte — nicht, wer mit wem „kann" oder wer recht hat.',
  veroeffentlicht: '2026-06-04',
  themen: [{ name: 'Parlament', slug: 'parlament' }],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Datengrundlage sind 107 namentliche Abstimmungen der 20. Wahlperiode des Deutschen Bundestags (18.11.2021–07.07.2023). Als „Übereinstimmung" zweier Fraktionen gilt der Anteil der Abstimmungen, bei denen beide dieselbe Mehrheitshaltung (Ja, Nein oder Enthaltung) innerhalb der jeweiligen Fraktion hatten. Namentliche Abstimmungen sind nur ein Teil aller Abstimmungen (oft strittige Fragen) und keine repräsentative Stichprobe; viele Beschlüsse fallen ohne namentliche Erfassung oder einstimmig. Die Werte gegenüber den drei Koalitionsfraktionen (SPD, Grüne, FDP) werden aus der ausgewerteten Übereinstimmung „Fraktion gegenüber den Koalitionsfraktionen" abgeleitet; das ist zulässig, weil die Koalition geschlossen stimmte (SPD–Grüne 100 %, SPD/Grüne–FDP 98,1 %), die Einzelwerte also um höchstens rund zwei Prozentpunkte abweichen. Eine gleiche Mehrheitshaltung bedeutet nicht inhaltliche Übereinstimmung: Zwei Oppositionsfraktionen können denselben Gesetzentwurf aus gegensätzlichen Gründen ablehnen. Die Analyse bezieht sich auf die 20. Wahlperiode (Ampel-Koalition); die Fraktionslandschaft der laufenden 21. Wahlperiode (CDU/CSU und SPD als Regierung) unterscheidet sich — eine Aktualisierung folgt, sobald genügend namentliche Abstimmungen vorliegen. Die Bögen sind in den üblichen Partei-Erkennungsfarben eingefärbt — als Identitätshilfe, nicht als Wertung; Farbe ist nie alleiniger Bedeutungsträger (Labels und Tabelle bleiben vollständig).',
  body: [
    block('h2', 'Worum es geht'),
    block(
      'normal',
      'Bei einer namentlichen Abstimmung wird im Bundestag festgehalten, wie jede einzelne Abgeordnete und jeder einzelne Abgeordnete votiert. Aus diesen Stimmen lässt sich ablesen, welche Fraktionen oft dieselbe Mehrheit bilden — und welche selten zusammenfinden. Das folgende Chord-Diagramm fasst 107 namentliche Abstimmungen der vergangenen Wahlperiode (2021–2023) zusammen: Jede Fraktion ist ein Bogen am Rand, jedes Band dazwischen steht für die Übereinstimmung zweier Fraktionen — je breiter, desto häufiger stimmten sie gleich.',
    ),
    wahlChord,
    block('h2', 'Was die Bänder zeigen'),
    block(
      'normal',
      'Am dichtesten ist das Geflecht innerhalb der damaligen Regierung: SPD und Grüne hatten in allen 107 Abstimmungen dieselbe Mehrheit (100 %), die FDP wich nur in Einzelfragen — etwa zur Impfpflicht — ab (98,1 %). Drei Fraktionen stimmen also fast wie eine. CDU/CSU liegt dazwischen: rund 47,7 Prozent Übereinstimmung mit der Koalition, 46,7 Prozent mit der AfD — als größte Oppositionsfraktion votierte sie teils mit der Regierung, teils dagegen. Die dünnsten Bänder gehören zur AfD: gegenüber den Koalitionsfraktionen nur 19,6 Prozent.',
    ),
    block('h2', 'Gleiche Mehrheit heißt nicht gleiche Motive'),
    block(
      'normal',
      'Auffällig ist die höchste Übereinstimmung der AfD — ausgerechnet mit der Linken (52,3 %), der im Links-rechts-Schema am weitesten entfernten Fraktion. Das ist kein Zeichen inhaltlicher Nähe, sondern Folge der Methode: Wer in der Opposition sitzt, lehnt Regierungsvorlagen häufig ab — und zwei Fraktionen, die mit „Nein" stimmen, zählen hier als übereinstimmend, auch wenn sie es aus gegensätzlichen Gründen tun. Das Diagramm misst gleiches Stimmverhalten, nicht gleiche Überzeugung. Und es zeigt nur namentliche Abstimmungen, die sich auf strittige Fragen konzentrieren — die vielen einvernehmlichen Beschlüsse des Parlaments tauchen hier nicht auf.',
    ),
    block(
      'normal',
      'Die Karte bildet die 20. Wahlperiode mit ihrer Ampel-Koalition ab. In der laufenden 21. Wahlperiode regieren CDU/CSU und SPD gemeinsam — das Muster verschiebt sich entsprechend. GURT aktualisiert das Diagramm, sobald genügend namentliche Abstimmungen der neuen Periode vorliegen.',
    ),
    {
      _type: 'quellenNote',
      _key: key(),
      text: 'Daten: Auswertung der 107 namentlichen Abstimmungen der 20. Wahlperiode des Deutschen Bundestags (18.11.2021–07.07.2023). Die namentlichen Abstimmungen werden vom Bundestag als offene Daten veröffentlicht. Definition der Übereinstimmung, Reichweite und Grenzen (gleiche Mehrheit ≠ gleiche Motive; Ableitung der Koalitionswerte) siehe Methodik.',
      quelle: {
        titel: 'Deutscher Bundestag — Namentliche Abstimmungen',
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
        'Die Schuldenbremse sei „in ihrer jetzigen Form zu starr"; sie brauche Spielraum für zukunftsgerichtete Ausgaben, ohne die öffentlichen Finanzen auszuhöhlen.',
      quelle: {
        titel: 'Schuldenbremse: Vorschläge für eine Reform von Top-Ökonomen',
        url: 'https://www.businessinsider.de/wirtschaft/schuldenbremse-lockern-vorschlaege-fuer-reform-von-bundesbank-wirtschaftsweisen-banken/',
        herausgeber: 'Sachverständigenrat (zitiert)',
      },
    },
    {
      label: 'FDP (Christian Lindner)',
      aussage:
        'Gegen die Lockerung: Neue Schulden drohten laufende Ausgaben wie Sozialleistungen statt Investitionen zu finanzieren — das sei „das Gegenteil von Generationengerechtigkeit", zumal die Last auf einer kleiner werdenden arbeitenden Bevölkerung wiege.',
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
    block('h2', 'Was kostet sie — und was bremst die Bremse?'),
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
      'Treemap der rund 5,5 Millionen Bürgergeld-Beziehenden (Mai 2025) nach Gruppen. Das Bild der „arbeitsunwilligen" Empfänger trügt: Rund 1,5 Mio sind Kinder und andere nicht Erwerbsfähige, rund 1,4 Mio Erwerbsfähige sind nicht arbeitslos (sie betreuen Kinder, pflegen Angehörige, sind in Ausbildung/Maßnahme oder arbeitsunfähig), und rund 0,8 Mio arbeiten sogar, verdienen aber zu wenig („Aufstocker"). Nur rund 1,8 Mio — etwa ein Drittel aller Beziehenden und 46 % der Erwerbsfähigen — sind als arbeitslos gemeldet.',
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
        { gruppe: 'Erwerbstätig — „Aufstocker"', mio: 0.8, beschreibung: 'Sie arbeiten, ihr Lohn reicht aber nicht zum Leben (rund 814.000).' },
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
      'Liniendiagramm des Bürgergeld-Regelsatzes für eine alleinstehende Person, 2022–2026, in Euro pro Monat. Nach 449 Euro (2022) stieg er 2023 auf 502 und 2024 auf 563 Euro, um die hohe Inflation auszugleichen; seither gilt eine „Nullrunde" — 2025 und 2026 bleibt er bei 563 Euro. Hinzu kommen die Kosten der Unterkunft.',
    caption:
      'Bürgergeld-Regelsatz für Alleinstehende, in Euro pro Monat (ohne Wohnkosten). Quelle: Bundesregierung / BMAS.',
    encoding: { xFeld: 'jahr', yFeld: 'euro', serieFeld: 'reihe' },
    datensatz: {
      titel: 'Bürgergeld-Regelsatz Alleinstehende 2022–2026',
      quelle: {
        titel: 'Bundesregierung — Regelbedarfe / Nullrunde Bürgergeld',
        url: 'https://www.bundesregierung.de/breg-de/aktuelles/nullrunde-buergergeld-2383676',
        herausgeber: 'Bundesregierung / BMAS',
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
        titel: 'ifo — „Lohnt" sich Arbeit noch? Lohnabstand und Arbeitsanreize',
        url: 'https://www.ifo.de/en/publications/2024/article-journal/lohnt-sich-arbeit-noch-lohnabstand-und-arbeitsanreize-2024',
        herausgeber: 'ifo Institut',
      },
    },
    {
      label: 'Caritas (Wohlfahrtsverband)',
      aussage:
        'Das Bild der „Arbeitsunwilligen" treffe auf wenige zu: Die große Mehrheit der Beziehenden seien Kinder, Pflegende, Kranke oder Menschen, die bereits arbeiten. Pauschaler Druck gehe an der Realität vorbei.',
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
    'Mehrere Dinge sind gleichzeitig richtig: Für Alleinstehende lohnt sich Arbeit klar mehr als Bürgergeld — und zugleich ist die große Mehrheit der Beziehenden nicht „arbeitsunwillig", sondern Kind, pflegt, lernt, ist krank oder arbeitet bereits. Ob schärfere Sanktionen mehr Menschen in Arbeit bringen, ist empirisch umstritten; das Grundgesetz zieht zugleich eine Untergrenze, die das menschenwürdige Existenzminimum sichert.',
};

const buergergeldArticle: Article = {
  _id: 'seed-buergergeld',
  titel: 'Bürgergeld: Wer bekommt es — und was ändert die neue Grundsicherung?',
  slug: 'buergergeld-grundsicherung',
  standfirst:
    'Kaum ein Sozialthema wird so hart diskutiert wie das Bürgergeld — für die einen „Vollkasko", für die anderen Existenzminimum. 2026 wird es zur „neuen Grundsicherung" mit schärferen Pflichten umgebaut. Die echten Zahlen zeigen, wer es bekommt, ob es zum Leben reicht, ob sich Arbeit noch lohnt — und was die Reform ändert.',
  veroeffentlicht: '2026-06-04',
  themen: [{ name: 'Soziales', slug: 'soziales' }],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Empfänger (Bundesagentur für Arbeit, Mai 2025): rund 5,5 Mio Bürgergeld-Beziehende, davon rund 4,0 Mio erwerbsfähig und rund 1,5 Mio nicht erwerbsfähig (vor allem Kinder unter 15). Erwerbsstatus der Erwerbsfähigen (2024/2025): rund 1,8 Mio arbeitslos gemeldet (46 %), rund 0,81 Mio erwerbstätig („Aufstocker", 20 %, Stand März 2024); die übrigen rund 1,4 Mio sind als Residual ausgewiesen (Kinderbetreuung, Pflege, Schule/Ausbildung/Maßnahme, Arbeitsunfähigkeit). Regelsatz Alleinstehende (BMAS/Bundesregierung): 2022 449 €, 2023 502 €, 2024–2026 563 € (Nullrunde 2025/26 wegen gesunkener Inflation und Besitzschutzregel; Wohnkosten kommen hinzu). Bürgergeld-Ausgaben 2024 rund 46,9 Mrd € (BIAJ; +~4 Mrd ggü. Vorjahr). Lohnabstand: WSI (Hans-Böckler-Stiftung), August 2025, alleinstehende Person, Mindestlohn 2025 (12,82 €/h): verfügbares Einkommen rund 1.572 € (1.546 € netto + 26 € Wohngeld) gegenüber rund 1.015 € Bürgergeld (563 € Regelbedarf + 451,73 € Unterkunft) = rund 557 € Abstand (regional 379–662 €); mit dem Mindestlohn 2026 (13,90 €/h) ist der Abstand größer. Bei Familien mit Kindern fällt der Abstand kleiner aus; Erwerbstätige können dann zusätzlich Wohngeld und Kinderzuschlag erhalten. Reform „neue Grundsicherung": Kabinett 17.12.2025, Bundestag 5.3.2026, Inkrafttreten ab 1.7.2026 schrittweise — Umbenennung, sofortige 30-%-Kürzung bei Pflichtverletzung (statt stufenweise), Streichung der Zahlung bei drei versäumten Terminen (Miete direkt an den Vermieter), Wiedereinführung des Vermittlungsvorrangs, Wegfall der Vermögens-Karenzzeit. Das Bundesverfassungsgericht begrenzte Sanktionen 2019 auf höchstens 30 % und schützt das menschenwürdige Existenzminimum. Positionen paraphrasiert, Stand 2026.',
  body: [
    block('h2', 'Worum es geht'),
    block(
      'normal',
      'Kaum ein Sozialthema wird so hart diskutiert wie das Bürgergeld — die Grundsicherung für Arbeitsuchende (SGB II), 2023 aus „Hartz IV" hervorgegangen. Im Streit steht es für „Vollkasko" und „Arbeitsverweigerung" auf der einen, für „Existenzminimum" und „Würde" auf der anderen Seite. 2026 wird es erneut umgebaut: zur „neuen Grundsicherung" mit schärferen Pflichten.',
    ),
    block(
      'normal',
      'Drei Fragen führen durch den Beitrag: Wer bekommt Bürgergeld — und warum arbeiten nicht alle? Reicht es zum Leben, und lohnt sich Arbeit noch? Und was ändert die neue Grundsicherung?',
    ),
    block('h2', 'Wer bekommt Bürgergeld?'),
    block(
      'normal',
      'Im Mai 2025 bezogen rund 5,5 Millionen Menschen Bürgergeld. Das Bild der „arbeitsunwilligen" Empfänger trügt: Gut ein Viertel sind Kinder, ein weiteres Viertel betreut Kinder, pflegt Angehörige, ist in Ausbildung oder krank — und rund 0,8 Millionen arbeiten sogar, verdienen aber zu wenig („Aufstocker"). Als arbeitslos gemeldet ist nur etwa ein Drittel der Beziehenden.',
    ),
    buergergeldTreemap,
    block('h2', 'Reicht es — und lohnt sich Arbeit noch?'),
    block(
      'normal',
      'Wie hoch ist das Bürgergeld? Der Regelsatz für eine alleinstehende Person stieg 2023 und 2024 kräftig — von 449 auf 563 Euro —, um die hohe Inflation auszugleichen; seither gilt eine „Nullrunde": 2025 und 2026 bleibt er bei 563 Euro. Dazu kommen die Kosten der Unterkunft. Insgesamt kostete das Bürgergeld 2024 rund 46,9 Milliarden Euro.',
    ),
    regelsatzLinie,
    block(
      'normal',
      'Lohnt sich Arbeit dann überhaupt noch? Für Alleinstehende eindeutig ja: Wer Vollzeit zum Mindestlohn arbeitet, hat laut einer Untersuchung des WSI rund 1.572 Euro im Monat zur Verfügung — etwa 557 Euro mehr als mit Bürgergeld (rund 1.015 Euro inklusive Wohnkosten). Der Abstand schwankt regional zwischen rund 380 und 660 Euro und ist mit dem höheren Mindestlohn 2026 (13,90 Euro) noch gewachsen. Bei Familien mit mehreren Kindern fällt er kleiner aus — dann greifen für Arbeitende aber zusätzlich Wohngeld und Kinderzuschlag.',
    ),
    lohnabstandBalken,
    block('h2', 'Was die neue Grundsicherung ändert'),
    block(
      'normal',
      'Im März 2026 beschloss der Bundestag den Umbau des Bürgergelds zur „neuen Grundsicherung" (in Kraft ab Juli 2026, schrittweise). Wer Termine im Jobcenter ohne wichtigen Grund versäumt, dem wird das Geld künftig sofort um 30 Prozent gekürzt — nicht mehr stufenweise; beim dritten versäumten Termin wird die Zahlung vorerst gestrichen und die Miete direkt an den Vermieter überwiesen. Der „Vermittlungsvorrang" gilt wieder (erst Arbeit, dann Qualifizierung), und die „Karenzzeit", in der Erspartes geschützt war, fällt weg. Eine Grenze zieht das Bundesverfassungsgericht: Das menschenwürdige Existenzminimum muss gesichert bleiben — vollständige Streichungen über längere Zeit hat es 2019 für unzulässig erklärt.',
    ),
    block('h2', 'Wie darüber gestritten wird'),
    block(
      'normal',
      'Über die Diagnose — Reformbedarf bei Anreizen und Vermittlung — gibt es breite Zustimmung; über das Mittel nicht. Soll mehr Druck wirken, oder schadet er? Und wie hoch muss das Existenzminimum sein? Die folgenden Stimmen spannen das Feld auf.',
    ),
    buergergeldDiskurs,
    {
      _type: 'quellenNote',
      _key: key(),
      text: 'Daten: Bundesagentur für Arbeit (Empfänger und Erwerbsstatus, SGB II), Bundesregierung/BMAS (Regelsatz), BIAJ (Ausgaben 2024), WSI/Hans-Böckler-Stiftung (Lohnabstand, August 2025). Reform „neue Grundsicherung": Deutscher Bundestag, Bundesregierung. Positionen paraphrasiert nach Bundesregierung, ifo Institut, Caritas, SoVD und ver.di/DGB. Verfassungsrahmen: Bundesverfassungsgericht (Sanktionsurteil 2019). Definitionen, Datenstände und Abgrenzungen siehe Methodik.',
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
      'Umweltschädliche Subventionen nach Bereichen, rund 65 Mrd € pro Jahr (Datenbasis 2018), in Mrd €. „Umweltschädlich" ist eine Einordnung des Umweltbundesamts. Quelle: Umweltbundesamt (UBA).',
    encoding: { kategorieFeld: 'bereich', yFeld: 'mrd' },
    datensatz: {
      titel: 'Umweltschädliche Subventionen nach Bereichen (UBA, 2018)',
      quelle: {
        titel: 'Umweltbundesamt — Umweltschädliche Subventionen in Deutschland',
        url: 'https://www.umweltbundesamt.de/themen/wirtschaft-konsum/wirtschaft-umwelt/umweltschaedliche-subventionen',
        herausgeber: 'Umweltbundesamt (UBA)',
      },
      spalten: [
        { name: 'bereich', typ: 'string' },
        { name: 'mrd', typ: 'number', einheit: 'Mrd €' },
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
        { name: 'posten', typ: 'string' },
        { name: 'mrd', typ: 'number', einheit: 'Mrd €' },
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
    'Mehrere Dinge sind gleichzeitig richtig: Viele dieser Subventionen schaden dem Klima und entlasten vor allem Besserverdienende — und zugleich trifft ihr Abbau konkrete Gruppen wie Landwirte oder Pendler sofort und sichtbar, während der Nutzen für Klima und Haushalt diffus und später anfällt. „Entlastung" und „Subvention" sind oft dasselbe aus zwei Blickwinkeln; gestritten wird weniger über das Ob als über das sozial verträgliche Wie.',
};

const subventionenArticle: Article = {
  _id: 'seed-umweltschaedliche-subventionen',
  titel: 'Umweltschädliche Subventionen: Wohin 65 Milliarden fließen — und warum der Abbau stockt',
  slug: 'umweltschaedliche-subventionen',
  standfirst:
    'Der Staat fördert Klimaschutz — und verbilligt zugleich fossile Energie und Verkehr. Das Umweltbundesamt beziffert diese „umweltschädlichen Subventionen" auf rund 65 Milliarden Euro im Jahr. Sind das verzichtbare Klimakiller oder nötige Entlastungen für Pendler, Landwirte und Industrie? Die echten Zahlen zeigen, wohin das Geld fließt, wer profitiert — und warum der Abbau so schwer ist.',
  veroeffentlicht: '2026-06-04',
  themen: [{ name: 'Klima', slug: 'klima' }],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Datengrundlage ist die Erhebung des Umweltbundesamts (UBA) „Umweltschädliche Subventionen in Deutschland", Datenbasis 2018, Gesamtvolumen rund 65,4 Mrd € pro Jahr (Verkehr 30,7 / Energie 25,5 / Land- und Forstwirtschaft 5,9 / Bau und Wohnen 3,3 Mrd €); aktuellere Vollerhebungen liegen nicht vor, in der Energiekrise stiegen die fossilen Subventionen im engeren Sinn 2023 vorübergehend auf rund 85 Mrd €. „Umweltschädlich" ist eine Bewertung des UBA — nicht jede Vergünstigung gilt allen als schädlich. Die Einzelposten sind gerundete Schätzungen aus verschiedenen Quellen und Jahren (UBA, FÖS); die Werte variieren (z. B. Dieselprivileg rund 8–9,5 Mrd €, Kerosin-Steuerbefreiung rund 8 Mrd €, Dienstwagenprivileg rund 3–6 Mrd €, Pendlerpauschale rund 5–6 Mrd €). Verteilungs- und CO₂-Angaben (Vergünstigungen entlasten überwiegend höhere Einkommen; das Ende des Dieselprivilegs könnte bis 2030 rund 25,7 Mio t CO₂ vermeiden) nach FÖS/Agora. Agrardiesel: Steuervergünstigung 21,48 ct/l, stufenweiser Abbau 2024 (−40 %), 2025 (−70 %), ab 2026 vollständig; Mehreinnahmen rund 450 Mio € pro Jahr; der Bauernverband beziffert die Belastung höher. Positionen paraphrasiert, Stand 2024–2026.',
  body: [
    block('h2', 'Worum es geht'),
    block(
      'normal',
      'Der Staat gibt nicht nur Geld aus, um Klimaschutz zu fördern — er begünstigt zugleich klimaschädliches Verhalten. Das Umweltbundesamt beziffert die „umweltschädlichen Subventionen" in Deutschland auf rund 65 Milliarden Euro im Jahr (Datenbasis 2018): Steuervergünstigungen und Ausnahmen, die fossile Energie und Verkehr verbilligen. „Umweltschädlich" ist dabei eine Einordnung des Umweltbundesamts — nicht jede Vergünstigung gilt allen als schädlich.',
    ),
    block(
      'normal',
      'Drei Fragen führen durch den Beitrag: Wie groß sind diese Subventionen, und wohin fließen sie? Wer profitiert? Und warum ist der Abbau so schwer?',
    ),
    block('h2', 'Wie groß — und wohin?'),
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
      'Wenn der Nutzen so klar ist — warum bleibt das meiste bestehen? Weil der Abbau konkrete Gruppen sofort und sichtbar trifft, während der Nutzen diffus und später anfällt. Das zeigte sich 2024 am Agrardiesel: Die Regierung baute die Steuervergünstigung (21,48 Cent je Liter) stufenweise ab — Mehreinnahmen rund 450 Millionen Euro im Jahr. Es folgten wochenlange Bauernproteste. Viel größere Posten wie das Diesel- und das Dienstwagenprivileg blieben dagegen unangetastet. „Entlastung" und „Subvention" sind eben oft dasselbe, nur aus zwei Blickwinkeln.',
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
      text: 'Daten: Umweltbundesamt (Umweltschädliche Subventionen in Deutschland, Datenbasis 2018), Forum Ökologisch-Soziale Marktwirtschaft (FÖS) und Agora (Einzelposten, Verteilungs- und CO₂-Wirkung). Agrardiesel und Subventionsabbau: Deutscher Bundestag. Positionen paraphrasiert nach Umweltbundesamt, VCD, Deutschem Bauernverband, ADAC und Bundesregierung. Definitionen, Bezugsjahre und Abgrenzungen (insbesondere: „umweltschädlich" ist eine UBA-Bewertung; Einzelposten gerundet) siehe Methodik.',
      quelle: {
        titel: 'Umweltbundesamt — Umweltschädliche Subventionen in Deutschland',
        url: 'https://www.umweltbundesamt.de/themen/wirtschaft-konsum/wirtschaft-umwelt/umweltschaedliche-subventionen',
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
];
