# Design-Discovery — Interface-Update (behutsam)

**Status:** Exploration. Läuft isoliert auf dem Branch `discovery` und unter `/lab` (noindex, nicht
in der Navigation). **Nichts hiervon ist live.** Reife Bausteine wandern erst nach Freigabe einzeln
nach `main`.

**Prämisse:** behutsame Weiterentwicklung — die bestehende editoriale Ruhe (FF Info, Weißraum,
Palette „GURT Vibrant", strukturgebende Tokens) bleibt der Anker; Neues ergänzt, ersetzt nicht.

## Design-Richtung (aus den Benchmarks)

Gemeinsame Sprache der Referenzen (SPTO/Yekaterinburg, Undique, Astrum, rotes Statistik-Buch):

- **Generative, weiche Gradient-Flächen** als ausdrucksstarke Hero-/Teaser-Elemente.
  → baut auf vorhandenen Bannern (`generative-banner`, `signature-banner`, `banner-*`) + `brandGradient`.
- **Selbstbewusste editoriale Typografie**: große, ruhige Headlines, viel Weißraum, kleine Mono-Labels.
  → GURT hat das im Ansatz (FF-Info-Display + Mono-Kicker); Discovery verstärkt Hierarchie/Größe.
- **Kennzahl als Anker**: große Stat-Zahl als Blickfang (Astrum „33 %", Buch „48 %").
  → neuer „Kennzahl-Hero"-Baustein für Feature-Beiträge.
- **Systematischer Report-Look**: Schnitt-Nummerierung, dezente Linien-/Raster-Motive (Undique).
  → passt zu Dossiers + Themen-Hubs.
- **Dark Mode** als gleichwertige Variante (Astrum).
  → Tokens in `theme.css` sind bereits dark/light-fähig; es fehlen Umschalter + Politur.
- **Eigenes Logo-Mark** (SPTO-Monogramm, Astrum-Asterisk, Kreis+Quadrat).
  → Favicon/Brand-Icon (aktuell kein `app/icon.*`).

## Die acht Spuren

| # | Idee | Baut auf | Aufwand / Risiko |
| - | ---- | -------- | ---------------- |
| 1 | **Branded Interaction** — generative Grafik für Teaser-/Themenbilder | `generative-banner`, `dataPalette`, `brandGradient` | mittel / niedrig (additiv) |
| 2 | **Feature-Beitrag** hervorgehoben (Hero auf Startseite) | Startseite, `ArticleList` | niedrig / niedrig |
| 3 | **Dossier** (Themen-Sammlung) | `thema`/`ressort`, Themen-Seiten | mittel / mittel (Content-Modell) |
| 4 | **Aktivierende Einstiege** (Quiz/Schätzfrage vor dem Beitrag) | neuer Block-Typ | mittel / **inhaltlich heikel** (Neutralität) |
| 5 | **Neues Navigationskonzept** | Header/Nav | mittel / mittel (UX-Risiko) |
| 6 | **Dark Mode** | `theme.css` (Tokens vorhanden) | niedrig–mittel / niedrig |
| 7 | **Favicon / Brand-Icon** (G+, G/ … ) | — (Lücke) | niedrig / niedrig |
| 8 | **Benchmark-Sammlung** (Referenzbilder) | dieses Dokument | erledigt (Richtung oben) |

## Vorgeschlagene Reihenfolge (signalstark, risikoarm zuerst)

1. **Brand-Icon/Favicon (#7)** + **Dark Mode (#6)** — kleine, sofort sichtbare Identitäts-Gewinne.
2. **Branded-Interaction-Teaser (#1)** + **Feature-Hero (#2)** — der visuelle Kern, baut auf Vorhandenem.
3. **Dossier (#3)** + **Navigation (#5)** — strukturelle Schritte, brauchen mehr UX-Überlegung.
4. **Aktivierende Einstiege (#4)** — zuletzt: Quiz/Schätzfragen berühren die Methodik-Haltung und
   müssen ergebnisoffen + ohne suggestives Framing sein (Prüfstraße einbeziehen).

> Zu #4: Ein „Schätz-dann-sieh"-Einstieg (z. B. „Wie hoch ist der Steueranteil? → dann die Grafik
> enthüllen") aktiviert stark und passt zur Methodik-Haltung — *wenn* die Frage neutral und faktisch
> bleibt. Genau hier ist die geschärfte Positionierung (methodisch, nicht binär) der Maßstab.
