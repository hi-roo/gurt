# CLAUDE.md — Visualisierungs-Schicht (`@gurt/visualizations`)

Observable Plot + D3 Komponenten. Referenz: [docs/06-visualization-guidelines.md](../../docs/06-visualization-guidelines.md).

## Verantwortung

- Wiederverwendbare Chart-Komponenten: `BarChart`, `LineChart`, `PositionMatrix`, plus `DataTable`
  (universeller Fallback) und `ObservablePlot` (Plot-Hülle).
- Reine Logik (z. B. `buildMatrix`) getrennt von Rendering → testbar (`*.test.ts`).

## Eiserne Regeln

1. **Kennt kein CMS, keine Daten-APIs.** Komponenten bekommen reine Daten + Config als Props.
   Die Brücke Sanity→Komponente liegt in `apps/web`.
2. **A11y ist Teil der Definition-of-Done:**
   - Tabellen-Fallback (`DataTable`) immer vorhanden (sichtbar bei No-JS, sonst in `<details>`).
   - `role="img"` + `aria-label`; Fokussierbarkeit bei interaktiven Zellen.
   - Farbe nie allein bedeutungstragend; `prefers-reduced-motion` respektiert (global in theme.css).
3. **Farben nur aus `@gurt/ui/tokens`** (Palette „GURT Vibrant"). Keine hardcodierten Hex-Werte für
   Datenreihen. Farbe nie allein bedeutungstragend — Labels/Tabellen-Fallback Pflicht; Kontrast AA.
   Ausnahme: die neutrale Haltungs-Kodierung in `matrix.ts` (dokumentiert, bewusst nicht Rot/Grün).
4. **SSR-sicher.** Plot-basierte Charts sind client-only mit Tabellen-Fallback im SSR;
   `PositionMatrix` rendert statisches SVG schon serverseitig.

## Faustregel Plot vs. D3

Standard-Charts (Balken, Linie, Fläche) → Observable Plot. Bespoke/Interaktiv (Matrix, Zeitachse,
Scrollytelling) → D3 / handgebautes SVG. Siehe ADR 0004.

## Test

`pnpm --filter @gurt/visualizations test` (Vitest). Reine Logik wird getestet, nicht das Rendering.
