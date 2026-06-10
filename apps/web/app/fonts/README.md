# OG-Schriften (eingebettet für next/og)

Diese TTFs werden in die OG-/Share-Bilder (`opengraph-image.tsx`) eingebettet —
`next/og` (Satori) braucht Schriften als Datei, Typekit-Webfonts funktionieren dort
nicht. Seit dem Redesign v0.6.0 („Glut im Dunkel": Georgia + FF Unit) gilt:

- **Gelasio** (`Gelasio-Medium.ttf`, 500) — Display/Headlines. Metrik-kompatible,
  freie Alternative zu **Georgia** (Eben Sorkin, OFL). Bezug: Google Fonts (`ofl/gelasio`).
- **Fira Sans** (`FiraSans-Regular.ttf`, `FiraSans-Bold.ttf`) — UI-Text/Wordmark,
  Ersatz für **FF Unit** (Erik Spiekermann, gleiche Design-DNA, OFL).
- **Fira Mono** (`FiraMono-Regular.ttf`) — Kicker/Meta („Correspondence"-Charakter, OFL).

Alle unter der **SIL Open Font License 1.1**; die OFL erlaubt Einbettung und
Weitergabe. Bezug: https://github.com/google/fonts bzw. fonts.gstatic.com.

Liegen echte **FF-Unit-Dateien** (Desktop-Lizenz) vor, können sie hier eingesetzt und
in `app/og-fonts.ts` referenziert werden — der Rest bleibt unverändert.
