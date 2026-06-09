# Discovery — „Glut im Dunkel": enigmatische Palette (poline-Kontrapunkt) + FF Unit

> Status: Discovery-Variante unter `/lab/carbon-unit` (noindex, von Live getrennt).
> Gegenstück zur konservierten **Prüf-Folie** `/lab/carbon` (IBM Plex + Carbon-Blau).
> Bewusstes Experiment, nicht Live-Versprechen.

## Idee

Gleiche Struktur wie die Carbon-Prüf-Folie (UI-Shell · Lead-Space · Tiles · CTA · Footer), aber zwei
Variablen bewusst getauscht — als sauberer A/B-Vergleich:

- **Typografie:** **FF Unit** („unit", via Typekit-Kit `nkg1woj`) statt IBM Plex. Geste über die
  Schnitte: Thin (100) groß für den Lead, Regular (400) für Sektionen/Body (Hierarchie über
  Größe/Abstand, nicht Fettung), Bold (700) nur sparsam für Labels.
- **Farbe:** eine **„enigmatische" Palette** als Kontrapunkt zu poline (https://meodai.github.io/poline/)
  und zum nüchternen IBM-Blau — entstanden aus einer Workflow-Jury (poline recherchiert → 5 divergente
  Paletten → bewertet → synthetisiert; Sieger „Glut im Dunkel", 44/50).

## Palette „Glut im Dunkel"

Ein kalt-indigoblaues Anthrazit-Feld, durchbrochen von **einem glühenden Kupfer-Ember** (Primär) und
einem **kühlen Aqua-Gegenglint** — tief und satt statt grau, *warm im Kalten*. Maximaler Abstand zu
IBM-Carbon: dunkel statt hell, **warm** statt institutionelles Blau, warmes Off-White statt Weiß.

| Rolle | Hex | Notiz |
| --- | --- | --- |
| background | `#0c111d` | fast-schwarzes Indigo (Feld) |
| surface | `#17243a` | Karten/Tiles |
| surfaceAlt | `#22344c` | hellere Stufe (Header/Footer/Tabellen) |
| line | `#5f86a8` | Borders/Gitter — **nur Fläche/Strich** |
| textPrimary | `#f1e8da` | warmes Off-White |
| textSecondary | `#b7ac9b` | Meta/Captions |
| **primary** | `#f2852c` | **Kupfer/Bernstein — dominanter Ember** |
| primaryHover | `#ff9a44` | |
| onPrimary | `#1c0e03` | dunkelbraun — Text auf `primary` (**nie weiß**) |
| accentA | `#9feae3` | Aqua-Gegenglint (Key-Visual, seltener Akzent) |
| accentB | `#317890` | Petrol — **nur Fläche/Strich** |

### Kontraste (WCAG, per Node nachgerechnet — unabhängig verifiziert)

- textPrimary → background **15,53:1** (AAA); → surface 12,81:1; → surfaceAlt 10,40:1
- textSecondary → background 8,43:1; → surface 6,95:1; → surfaceAlt **5,64:1** (alle AA)
- onPrimary → primary **7,33:1**; → primaryHover 8,94:1 (Weiß auf Kupfer wäre nur 2,57:1 → vermieden)
- primary → background 7,33:1 · accentA → background 13,79:1 (als Link/Large-Text/Icon tauglich)
- line → surface 4,05:1; → surfaceAlt 3,28:1; → background 4,91:1 (Borders ≥ 3:1 auf jeder Fläche)

### Auflagen für den Code

- **Text auf `primary` ist `onPrimary` (dunkelbraun), nie weiß.** Gilt für Lead-Space, CTA-Bahn,
  Akzent-Tile, Buttons auf Kupfer.
- `line` und `accentB` ausschließlich als Fill/Stroke — **nie als Fließtext-Farbe**.
- `primary` (Kupfer) **rationieren**: dominant auf Lead-Space/CTA/einem Tile, sonst sparsam, damit der
  Ember Signal bleibt und nicht zur Warnfarbe kippt.
- Flächen-Elevation (bg → surface → surfaceAlt) trägt über Hue/Sattheit + feine Borders, nicht über
  Helligkeit.

## Herkunft (poline-Methode)

Anker in zylindrischem HSL (Hue=Winkel, Saturation=Radius, Lightness=Höhe), mit `invertedLightness`
(dunkle Stufen am gesättigten Disk-Rand → tief, aber satt) und einer **exponentiellen Positions-Funktion**,
die die Sehne durch unerwartete kühle Zwischen-Hues biegt (Petrol → Aqua-Glimmen) — der „falsche",
überraschende Mittelton, der mysteriös statt korporativ wirkt.

## Typekit-Notiz

Das Kit `nkg1woj` enthält jetzt neben FF Info auch **„unit"** (100–900, je normal/kursiv). Der globale
`<link>` trägt `?v=…` als **Cache-Bust**, weil Browser die alte Kit-CSS (nur FF Info) gecacht hatten →
sonst Fallback auf eine Serife. „Typekit später aufräumen" bleibt offen (FF Info ↔ FF Unit entscheiden).

## Iteration 2 — reduziert, hell/dunkel, asymmetrisch, Mitmachen

- **Farben reduziert:** Interface nur noch **Neutral + EIN Kupfer-Ember**. Aqua/Petrol aus dem UI
  entfernt (waren je Akzent/Key-Visual) — der eine Akzent trägt jetzt alles.
- **Key-Visual im Primärton:** der generative Hero ist in **Kupfer** umgefärbt (vorher Aqua), passend
  zum dominanten Ton.
- **Hell-Variante** als CSS-Variablen-Umschalter (`data-cu-theme`, `components/lab/carbon-unit-theme.tsx`),
  Default dunkel. Vorbereitung für den globalen Dark-Mode-Track. Light-Tokens (AA verifiziert):
  `--cu-bg #ece9e0` · `surface #e1ddd1` · `surfaceAlt #d6d1c2` · `line #7c7563` (≥3:1) ·
  `text #16202f` (13,5:1) · `text2 #5a5346` · `primaryText #9a4a0c` (Link 5,15:1). `primary`/`onPrimary`
  bleiben themen-invariant (Kupfer-Flächen + dunkler Text in beiden Modi).
- **Asymmetrie:** Hero auf **7/5** statt 50/50, mit „01"-Editorial-Marke; Tile-Raster mit **breitem
  Feature-Tile** (`col-span-2`) statt gleichförmigem Gitter.
- **Neuer Abschnitt „Ein Thema vorschlagen":** Eingabe + Senden (mailto `hinweise@gurt.info`) +
  Beispiel-Chips — speist perspektivisch den Themen-Radar/`idee`-Workflow.

## Iteration 3 — durchgehende Grid-Achse, Hell als Default

- **Eine Achse über die ganze Seite:** alle Sektionen teilen denselben Container `GUT`
  (`max-w-[82rem] px-6 sm:px-10`) und ein 12-Spalten-Raster. Hero-Headline, „01"-Kicker, Sektions-
  Überschriften, **CTA-Headline**, GURT-Logo und Tile-Raster fluchten linksbündig auf **Spalte 1**
  (objektiv verifiziert: alle `getBoundingClientRect().left` identisch). Behebt „Hero nutzt andere
  Achsen als die Sektionen".
- **Hero = Kupfer-Bahn + raster-gebundenes Key-Visual** (Spalten 8–12, rechte Kante = rechte Achse)
  statt full-bleed-Split — so bleibt die Achse über die Seite tragend. Text/Fluss durchgehend
  linksbündig.
- **Hell ist Default** (`CarbonUnitTheme` initial `light`); Dunkel per Umschalter.

## Iteration 4 — Key-Visual größer, Headline-Schrift-Test

- **Key-Visual** wieder zur Mitte vergrößert (Hero-Split 8/4 → **7/5**); rechte Kante bleibt auf der
  Achse (bündig mit der „Wirtschaft"-Kachel).
- **Headline-Schrift als visueller Test** (`data-cu-head`, Schalter „Aa"): Section-/Display-Headlines
  schalten zwischen **Sans** (FF Unit Thin), **Slab** (FF Unit Slab Light, `"unit-slab"` aus Typekit)
  und **Serif** (Georgia/Garamond). Gewicht passt sich je Schnitt an (`--cu-hw-display` 100/300/400).
  Body bleibt durchgehend FF Unit. Kit-Cache-Bust auf `?v=20260609` (unit-slab ergänzt).

## Iteration 5 — Slab gesetzt, Key-Visual auf Mittelachse, Hero 500

- **Slab ist Default** (`data-cu-head` initial `slab` = FF Unit Slab). Sans/Serif bleiben als Test
  per „Aa"-Schalter.
- **Key-Visual bündig zur Mitte:** Hero-Split 7/5 → **6/6**; linke Kante exakt auf der Seiten-
  Mittelachse (verifiziert: 660px = Viewport-Mitte, Delta 0). Rechte Kante weiter auf der Achse.
- **Nur die Hero-Headline:** `font-weight 500` (Slab Medium) — Autorität gegenüber den übrigen
  Display-Headlines (Slab Light 300). Übrige Headline-Logik unverändert.

## Iteration 6 — Headlines einheitlich 500, Key-Visual 8/4, Mobile-Pass

- **Alle Headlines (h1/h2/h3) auf `font-weight 500`** — einheitlich (eine `HEAD`-Konstante,
  `--cu-hw-*`-Gewichtsvariablen entfallen). Schrift-Test (Sans/Slab/Serif) bleibt.
- **Key-Visual zurück auf 8/4** — Start exakt bei ⅔ (Spalte 9/12 = linke Kante der „Wirtschaft"-Kachel;
  verifiziert: 865 vs 866 px).
- **Mobile-Pass:** kein Horizontal-Overflow (verifiziert), alle Sektionen stapeln einspaltig
  (Hero: Text → Key-Visual; Vorschlag: Text → Formular; Footer). Header reduziert auf „GURT" + Icons
  (Subtitle < sm aus), Hero-Deko-Linie < sm aus, Schrift-Schalter auf 44 px (Touch). Offen für später:
  echtes Mobil-Menü (Hamburger) statt nur Icons.
