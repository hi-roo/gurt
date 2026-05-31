# 03 — Design-System

Implementiert in `packages/ui` als Tailwind-CSS-v4-Theme (CSS-`@theme`) + React-Primitive.
Anspruch: **editorial, systemisch, strukturgebend**. Gestalterische Referenz: sanity.io — ruhig,
typografisch präzise, hohe Informationsdichte ohne Unruhe.

## Haltung

- **Inhalt führt, Gestaltung dient.** Die Visualisierung ist der Star, nicht das Chrome.
- **Wenige, konsistente Bausteine.** Ein systematisches Token-Set statt Einzelfall-Styling.
- **Ruhe & Hierarchie.** Großzügiger Weißraum, klare typografische Stufen, zurückhaltende Farbe.
- **Lesbarkeit zuerst.** Optimale Zeilenlänge (~66 Zeichen), starker Kontrast, ruhiger Satz.

## Design-Tokens

### Typografie

Zwei Familien, klar getrennt nach Funktion:

- **Display / Headlines:** eine Serif (editorialer Charakter). Fallback: `Georgia, serif`.
- **Fließtext & UI:** eine humanistische Sans. Fallback: `system-ui, sans-serif`.
- **Daten / Zahlen / Code:** Mono mit `tabular-nums`. Fallback: `ui-monospace, monospace`.

Typo-Skala (modular, ~1.2): `xs · sm · base(18px Fließtext) · lg · xl · 2xl · 3xl · 4xl · 5xl`.

### Farbe

Zurückhaltende, neutrale Basis + eine Akzentfarbe. Themenfarben (`thema.farbe`) werden aus einer
kuratierten, kontraststarken Palette gewählt — **nie** parteipolitische Farben als Default, um keine
Wertung zu suggerieren (siehe [07-editorial-guidelines.md](07-editorial-guidelines.md)).

- `ink` (Text), `paper` (Hintergrund), `muted` (sekundär), `line` (Trenner).
- `accent` (Marke/Interaktion).
- **Daten-Palette:** kategorial (qualitativ, farbenblind-sicher) + sequenziell + divergierend.
  Diese Palette ist die **einzige** Quelle für Chart-Farben (`packages/visualizations` liest sie).
- Dark- & Light-Mode; alle Paare erfüllen WCAG AA (Text 4.5:1, große Schrift 3:1).

### Raster & Abstand

- 4px-Basisraster; Spacing-Skala `0 · 1 · 2 · 3 · 4 · 6 · 8 · 12 · 16 · 24 …`.
- Content-Spalten: schmale Lesespalte (Text), breite Spalte (Visualisierung), volle Breite (Hero).
- Responsiver Container mit definierten Breakpoints.

### Weitere Tokens

Radius, Schatten (sparsam), Motion (Dauer/Easing; respektiert `prefers-reduced-motion`).

## Primitive (React-Komponenten in `packages/ui/src`)

Strukturgebende, ungestylte-bis-leicht-gestylte Bausteine:

- `Container`, `Section`, `Grid` — Layout & Lesespalten.
- `Prose` — editorialer Fließtext-Stil für Portable Text.
- `Heading`, `Text`, `Lead`, `Caption`, `Label` — Typo-Primitive.
- `Figure` — Rahmen für Visualisierungen inkl. Caption & Quelle.
- `Tag`, `Divider`, `Callout` — kleine Struktur-Elemente.

## Regeln

1. **Keine Magic-Values** in `apps/web` oder `packages/visualizations` — immer Tokens nutzen.
2. **Chart-Farben kommen ausschließlich** aus der Daten-Palette dieses Systems.
3. **Kontrast prüfen**, bevor eine Farbkombination eingeführt wird.
4. Neue Tokens hier dokumentieren, dann implementieren.
