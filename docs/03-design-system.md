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

**FF Info** (Adobe Fonts / Typekit-Kit `nkg1woj`), drei Schnitte klar nach Funktion getrennt — geladen
in `apps/web/app/layout.tsx` (preconnect + Stylesheet):

- **Display / Headlines / Wordmark:** `ff-info-display-web-pro` (Token `--font-display`). Fallback: `system-ui, sans-serif`.
- **Fließtext & UI:** `ff-info-text-web-pro` (Token `--font-sans`). Fallback: `system-ui, sans-serif`.
- **Captions, Tabellen-Beschriftungen & Kicker:** `info-correspondence-web-pro` (Tokens `--font-caption` / `--font-mono`),
  mit `tabular-nums`. Fallback: `ui-monospace, monospace`.

Verfügbare Schnitte je Familie: Book/Regular (400) und Bold (700), je normal + kursiv. `font-semibold` (600)
rendert über Font-Matching als Bold.

Typo-Skala (modular, ~1.2): `xs · sm · base(18px Fließtext) · lg · xl · 2xl · 3xl · 4xl · 5xl`.

**Marke:** Der Name wird durchgängig in Versalien geschrieben — **GURT**.

### Farbe

Zurückhaltende, neutrale Basis + eine Akzentfarbe. Themenfarben (`thema.farbe`) werden aus einer
kuratierten, kontraststarken Palette gewählt — **nie** parteipolitische Farben als Default, um keine
Wertung zu suggerieren (siehe [07-editorial-guidelines.md](07-editorial-guidelines.md)).

- `ink` (Text), `paper` (Hintergrund), `muted` (sekundär), `line` (Trenner).
- `accent` (Marke/Interaktion) — Marken-Magenta `#9e0059` (Light) / `#ff5c7a` (Dark), AA-geprüft.
- **Daten-Palette „GURT Vibrant":** kräftiges, hue-diverses Marken-Spektrum (Pink-Rot, Violett, Amber,
  Grün, Orange, Blau, Magenta, Teal) — vibrierend für hohe Aufmerksamkeit/Akzeptanz. Diese Palette ist
  die **einzige** Quelle für Chart-Farben (`packages/visualizations` liest sie). **A11y-Pflicht bleibt:**
  Farbe ist nie alleiniger Bedeutungsträger (Labels + Tabellen-Fallback), Kontrast wird je Einsatz
  geprüft, und Farben werden rein kategorial nach Index vergeben — **nie** an Parteien/Lager gekoppelt.
- **Marken-Verlauf** (`--brand-gradient`, Token `brandGradient`): Amber→Orange→Pink→Magenta→Violett —
  für Hero-Flächen, Signatur-Poster und Share-Bilder; **nicht** für Datenreihen.
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
