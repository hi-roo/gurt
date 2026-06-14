# ADR 0005 — Responsives Visualisierungs-Framework (Mobil-Reflow)

- **Status:** Angenommen (Phase 0 + 1 umgesetzt; Phase 2 + 3 offen)
- **Datum:** 2026-06
- **Kontext-Doku:** [docs/06-visualization-guidelines.md](../06-visualization-guidelines.md)

## Kontext

Die Charts wurden chart-für-chart gebaut; „mobil" wurde je Komponente einzeln gelöst. Ein
Audit (Stand 2026-06) zeigte drei strukturelle Lücken:

1. **Feste-Seitenverhältnis-SVGs reflowen nicht.** Treemap (1000×560), Sankey (1000×460),
   Chord (760×720) nutzen festes `viewBox` + `min-w-[20–32rem]` → auf dem Handy nur schrumpfen
   oder horizontal scrollen, nie umbrechen.
2. **Tabellen haben keine Responsive-Logik.** `DataTable` ist eine nackte `<table>` in
   `overflow-x-auto` → breite Tabellen scrollen seitlich, statt umzubrechen.
3. **Interaktion ist gespalten.** Plot-Charts (Balken/Linie/Fläche/Beeswarm) haben nur Hover
   (`Plot.tip`) — auf Touch unbrauchbar; SSR-SVGs haben Tap/Fokus über `ChartTooltipLayer`.

Auslöser war Testerinnen-Feedback („Diagramme mobil stark optimieren; Treemap-Beschriftungen
sehr klein; Tabellenspalten/Treemap vertikal stapeln? Sankey auf kleinen Viewports? Klick-
Interaktion?").

## Entscheidung

Ein gemeinsames Framework statt Einzelfixes: **„Responsive by contract".**

1. **CSS-Umschaltung als primärer Reflow-Mechanismus.** Layout wird über `max-sm:`/`sm:`-Utilities
   umgeschaltet (beide Layouts gerendert, eines per CSS sichtbar). Das ist **SSR-sicher, ohne
   Hydration-Flackern und No-JS-fähig** — Pflicht für die server-gerenderten SVG-Charts. Ein
   JS-Viewport-Primitiv (`useBreakpoint`/Context) wird **erst für Interaktion** (Phase 2)
   eingeführt, wo Laufzeit-Erkennung wirklich nötig ist.
2. **Geteiltes Mobil-Reflow-Primitiv `ProportionList`** für „Teil am Ganzen"-Charts (Treemap,
   später Waffle): eine vertikale Anteils-Balkenliste (Farbchip + Label + Balken ∝ Anteil +
   Wert/Prozent). Reine Logik (`toProportions`, getestet) getrennt vom Rendering.
3. **`DataTable` bricht mobil zu Karten um** (gestapelte `Label: Wert`-Paare; Kopf ausgeblendet,
   jede Zelle trägt ihr Label selbst). Trifft jede Tabelle **und** jeden Chart-Datenfallback.
4. **Per-Typ-Mobil-Vertrag:** Jeder Charttyp deklariert eine Desktop- und eine Mobil-Reflow-Ansicht.
   Der Tabellen-Fallback (`DataTable`) und `role="img"`+`aria-label` bleiben die barrierefreie Quelle.

### Phasen

- **Phase 0** — `ProportionList` (Primitiv) + Test. ✅
- **Phase 1a** — `DataTable` Karten-Modus < sm. ✅
- **Phase 1b** — Treemap mobil → `ProportionList` (Waffle/ShareBars folgen). ✅
- **Phase 2** — einheitlicher **Tap-to-Pin**-Layer über alle Charts (löst Hover-only ab); braucht
   das JS-Viewport-Primitiv. ⏳
- **Phase 3** — **Sankey als echtes Vertikal-Sankey** (ausdrückliche Vorgabe — keine Fluss-Liste),
   Chord/Position-Matrix als Mobil-Karten. ⏳

## Konsequenzen

- **Positiv:** Mobil keine Querformat-Scrolls mehr, alle Werte lesbar; A11y erhalten
  (Tabellen-Fallback, `role="img"`); SSR-sicher, kein Flackern; ein wiederverwendbares Primitiv
  statt N Einzellösungen.
- **Kosten:** etwas mehr Markup (Dual-Render via CSS); Karten sind höher als Tabellenzeilen.
- **Verpflichtung:** Neue Charts müssen den Mobil-Vertrag erfüllen (docs/06 wird nachgezogen, wenn
  Phase 2/3 die Interaktions-/Spezialfall-Konventionen festschreiben).
