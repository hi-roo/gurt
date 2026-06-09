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
- **1d · Shell** ✅ — Header zur Carbon-Bar (Wordmark + Nav + Dark-Toggle + Ressort-Reihe; **Hamburger
  < md**). Globale **Mobil-Side-Nav** (`site-mobile-nav.tsx`) mit Fokus-Falle, echten Nav-Punkten +
  Bereichen, token-getrieben (Hell/Dunkel), volle Höhe, Schließen via Backdrop/Escape/Link + Fokus-
  Rückgabe. Footer-Wordmark auf Unit. **Bug gefangen + behoben:** der `backdrop-blur` des Headers bildet
  einen Containing-Block für `fixed`-Elemente → der Drawer wurde in die ~77px-Header-Box eingesperrt.
  Fix: Drawer per **Portal an `document.body`** (globale Tokens liegen auf `:root`, Theming bleibt intakt).

**→ Fundament (Schritt 1) komplett.** Nächster Schritt: Seite-für-Seite-Politur (Schritt 2).

## Schritt 2 — Seite für Seite

Startseite → Beitrag → Ressort/Thema/Suche → Rechtsseiten, je verifiziert; danach Prüfstraße +
Meilenstein-Tag + Rollback-Notiz, dann Merge nach `main`.

- **2 · Startseite — generative Signatur** ✅ — der alte `SignatureBanner` (erzwang `bg-white` → heller
  Streifen im Dark) ist durch das **datengetriebene FlowHero-Feld** ersetzt (`flow-hero.tsx` aus der
  Discovery + theme-aware Wrapper `home-generative.tsx`, der `--paper` liest und bei Hell/Dunkel
  re-mountet → Grund exakt zur Seite). FlowHero um optionalen `bgColor`-Prop erweitert. In Hell + Dunkel
  verifiziert. _Aufräumen offen:_ `signature-banner.tsx` + `banner-*` + `/streifen` sind nun verwaist.
- **2 · Beitragsseite** ✅ (verifiziert, **ohne Code-Änderung** — die Token-Foundation re-skinnt sie):
  Header/Breadcrumb/Tag/Georgia-Headline + alle Chart-Typen lesen auf Bone & Indigo (Linie in beiden
  Modi geprüft). **Tooltip-Befund aufgeklärt:** der SVG-`ChartTooltipLayer` ist bereits theme-aware
  (`--color-ink`/`--color-paper`, invertiert korrekt — kein Bug). Plot-`tip` ist Plots heller
  Standard-Tip (lesbar); ein theme-kohärentes Umfärben würde Serien-Swatches in mehrreihigen Tips
  riskieren → **bewusst nicht** pauschal angefasst, als optionaler Feinschliff vorgemerkt.
- **2 · Restliche Seiten + Aufräumen** ✅ — Sweep über Ressort/Thema/Suche/Themen/Über/Impressum/
  Datenschutz/Methodik: alle 200, fehlerfrei, token-getrieben geskinnt; `/suche` (inkl. Input +
  Treffer-Highlight) im Dark spot-geprüft. Verwaiste `signature-banner` + `banner-{grid,shapes,dla}`
  + `generative-banner` + `/streifen`-Vorschauseite gelöscht.
- _Weiter offen:_ Plot-Tip-Feinschliff (optional), **Meilenstein-Tag + Merge nach `main`**.

## Schritt 3 — QA-Review-Jury + Fixes ✅

Adversarial-QA-Jury (Workflow, 4 Lenses: A11y · Theming · Korrektheit · Aufräumen) über `main…redesign`:
**GO mit Fixes**, keine Blocker. Tests grün (54/54), Typecheck/Lint grün. Eingearbeitet (alle node-verifiziert):

- **Major (A11y-Kontrast-Regression):** `--accent` Light `#a8500f` → **`#984809`** (AA auf Surface 4,74 /
  Paper 5,30 — vorher 4,05 auf Surface); `--subtle` Light `#6a6353` → **`#645d4d`** (4,81) und Dark
  `#8f8676` → **`#9a917f`** (4,99). Diskurs-Kicker + Mobil-Drawer-Label jetzt AA auf Surface in beiden Modi.
- **Minor (echte Dark-Regression):** `color-scheme: light/dark` an `:root`/`.dark` — native Scrollbars,
  Form-Inputs, Overscroll folgen jetzt dem Modus.
- **Nits:** FlowHero-Hell-Fallback `#ffffff` → `#ece9e0`; `home-generative` Lazy-Init +
  `suppressHydrationWarning` (kein 1-Frame-Aufblitz im Dark-Load); Hamburger `aria-controls` + Drawer-`id`.
- _Offen, nicht-blockierend:_ ungenutzte `--primary`/`--on-primary` (für kommende CTA-Flächen vorgesehen);
  Plot-Tip-Feinschliff; OG-Bilder.

**→ `redesign` ist merge-fähig.** Vor dem Merge: `pnpm build` in sauberer Umgebung (Dev-Server stoppen),
Meilenstein-Tag + Rollback-Notiz; Merge nach `main` **nur auf ausdrückliche Freigabe**.

## Offene Befunde (in den passenden Schritten zu beheben)

- **Signatur-Streifen** (Startseite) erzwingt weißen Grund → im Dark-Mode ein heller Balken.
  Beim Startseiten-Umbau dark-aware machen oder durch das generative FlowHero-Feld ersetzen.
- **Chart-Tooltip** (`ChartTooltipLayer`) ist im Dark-Mode noch hell → im Charts-Schliff dark-aware.
- **OG-/Share-Bilder** nutzen eingebettete Fira-Fonts (Satori, kein Typekit) — Typo/Palette dort
  später separat angleichen.
