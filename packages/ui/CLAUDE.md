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
3. **Chart-Farben** kommen ausschließlich aus `tokens.ts` (Okabe-Ito-Palette) — nirgends hardcoden.
4. **Kontrast.** Neue Farbpaare gegen WCAG AA prüfen, bevor sie eingeführt werden.
5. **Keine parteipolitischen Default-Farben** (Neutralität, siehe docs/07).

## Konsum

- `apps/web` importiert `@gurt/ui/theme.css` (Tokens) und Komponenten aus `@gurt/ui`.
- `packages/visualizations` importiert Farb-Tokens aus `@gurt/ui/tokens`.
- Wird über Next.js `transpilePackages` als Quell-TS eingebunden (kein Build-Step nötig).
