# CLAUDE.md — Design-Schicht (`@gurt/ui`)

Design-System: Tokens + editoriale Primitive. Referenz: [docs/03-design-system.md](../../docs/03-design-system.md).

## Verantwortung

- **Tokens** (Farbe, Typo, Abstand) als Single Source of Truth.
  - CSS: `src/styles/theme.css` (Tailwind v4 `@theme`, mode-aware).
  - JS: `src/tokens.ts` (für Visualisierungen, die Farben programmatisch brauchen).
- **Primitive**: `Container`, `Section`, `Grid`, `Prose`, `Heading`, `Text`, `Lead`, `Caption`,
  `Label`, `Figure`, `Tag`, `Divider`, `Callout`.

## Regeln

1. **App-unabhängig.** Importiere niemals aus `apps/*`. Keine Daten-/CMS-Logik hier.
2. **Tokens synchron halten.** `theme.css` und `tokens.ts` müssen dieselben Daten-Farben führen.
3. **Chart-Farben** kommen ausschließlich aus `tokens.ts` (Palette „GURT Vibrant") — nirgends hardcoden.
   Farbe ist **nie** alleiniger Bedeutungsträger: Charts brauchen Labels + Tabellen-Fallback (A11y).
4. **Kontrast.** Neue Farbpaare gegen WCAG AA prüfen, bevor sie eingeführt werden.
5. **Farben nie an Parteien/Lager koppeln** (strukturelle Neutralität, siehe docs/07): Die vibrierende
   Palette wird rein kategorial nach Index vergeben, nicht als Wertung. Kontrast (WCAG AA) bleibt Pflicht.
   _Dokumentierte Ausnahme:_ Bei Charts **über benannte Akteure/Fraktionen** (z. B. „Wer stimmt mit
   wem?") dürfen etablierte **Identitäts-/Erkennungsfarben** (Partei-Farben) verwendet werden — als
   Erkennungshilfe, nicht als Wertung. Sie werden pro Beitrag im Content gesetzt (nicht in den Tokens),
   AA-Kontrast bleibt Pflicht und Farbe nie alleiniger Bedeutungsträger (Labels + Tabelle).

## Konsum

- `apps/web` importiert `@gurt/ui/theme.css` (Tokens) und Komponenten aus `@gurt/ui`.
- `packages/visualizations` importiert Farb-Tokens aus `@gurt/ui/tokens`.
- Wird über Next.js `transpilePackages` als Quell-TS eingebunden (kein Build-Step nötig).
