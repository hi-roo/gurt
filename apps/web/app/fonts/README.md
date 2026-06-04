# OG-Schriften (eingebettet für next/og)

Diese TTFs werden in die OG-/Share-Bilder (`opengraph-image.tsx`) eingebettet —
`next/og` (Satori) braucht Schriften als Datei, Typekit-Webfonts funktionieren dort
nicht. Als lizenzfreier, sehr naher Ersatz für die Marken-Schrift **FF Info** dienen:

- **Fira Sans** (`FiraSans-Regular.ttf`, `FiraSans-Bold.ttf`) — Fließtext/Headline.
- **Fira Mono** (`FiraMono-Regular.ttf`) — Kicker/Meta („Correspondence"-Charakter).

Beide von Erik Spiekermann (gleiche Design-DNA wie FF Info/FF Meta), lizenziert unter
der **SIL Open Font License 1.1** (OFL). Bezug: https://github.com/google/fonts
(`ofl/firasans`, `ofl/firamono`). Die OFL erlaubt Einbettung und Weitergabe; die
Lizenz ist Teil der Schriftprojekte.

Liegen echte **FF-Info-Dateien** (Desktop-Lizenz) vor, können sie hier eingesetzt und
in `app/og-fonts.ts` referenziert werden — der Rest bleibt unverändert.
