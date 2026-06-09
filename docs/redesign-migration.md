# Redesign-Migration — Übertrag der Discovery-Designsprache Richtung Live

> Branch **`redesign`** (ab `main`). Ziel: die in `/lab/carbon-unit` (Branch `discovery`) erprobte
> Designsprache — **FF Unit + Georgia**, Palette **„Glut im Dunkel"** (Kupfer + Bone/Indigo),
> Carbon-Shell, Dark-Mode — staffelweise auf die echte Seite bringen. **Gestaffelt, risikoarm,
> jederzeit stop-/rückbaubar.** `main`/Live bleibt unberührt, bis ein Meilenstein gemerged wird.
> Blaupause/Werte: `docs/design-discovery-enigmatic-palette.md` (auf `discovery`).

## Schritt 1 — Fundament

- **1a · Schriften** ✅ — `theme.css`: `--font-sans` → FF Unit (`"unit"`), `--font-display` → Georgia.
  Wordmark bleibt FF Unit (`site-header`). Typekit-Kit Cache-Bust `?v=20260609` (lädt unit/unit-slab).
  Mono-Kicker (Correspondence) bleiben. Re-skinnt die Typo der ganzen Seite via Token-Tausch.
- **1b · Palette** ✅ — `theme.css` `:root` + `.dark` auf „Glut im Dunkel" (Bone/Indigo + Kupfer).
  `--accent` = lesbares Tief-Kupfer (Light, AA) / heller Ember (Dark); neu `--primary` (#f2852c) +
  `--on-primary` (#1c0e03) für Flächen/CTAs. Alle Kontraste per Node verifiziert; Charts lesen auf
  Bone & Indigo.
- **1c · Dark-Mode-Toggle** ✅ — globaler Umschalter im Header (`theme-toggle.tsx`), No-Flash-Script
  im `<head>` (+ `suppressHydrationWarning`), Persistenz via `localStorage`, ohne Wahl folgt
  `prefers-color-scheme` (reaktiv). **Adversarial-Review-Jury** (Workflow) bestätigte FOUC/Storage/
  System sauber; ein Major-A11y-Finding behoben (doppeltes Zustandssignal → statischer Name
  „Dunkler Modus" + `aria-pressed` trägt den Zustand, `title` für Maus-Hover).
- **1d · Shell** ⬜ — Header → Carbon-Bar + Mobil-Side-Nav (aus `/lab/carbon-unit`), Footer.

## Schritt 2 — Seite für Seite

Startseite → Beitrag → Ressort/Thema/Suche → Rechtsseiten, je verifiziert; danach Prüfstraße +
Meilenstein-Tag + Rollback-Notiz, dann Merge nach `main`.

## Offene Befunde (in den passenden Schritten zu beheben)

- **Signatur-Streifen** (Startseite) erzwingt weißen Grund → im Dark-Mode ein heller Balken.
  Beim Startseiten-Umbau dark-aware machen oder durch das generative FlowHero-Feld ersetzen.
- **Chart-Tooltip** (`ChartTooltipLayer`) ist im Dark-Mode noch hell → im Charts-Schliff dark-aware.
- **OG-/Share-Bilder** nutzen eingebettete Fira-Fonts (Satori, kein Typekit) — Typo/Palette dort
  später separat angleichen.
