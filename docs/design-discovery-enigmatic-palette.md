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
