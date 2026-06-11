# OG-Schriften (eingebettet für next/og)

Diese TTFs werden in die OG-/Share-Bilder (`opengraph-image.tsx`) eingebettet —
`next/og` (Satori) braucht Schriften als Datei, Typekit-Webfonts funktionieren dort
nicht. Marken-Typo seit v0.7.0: FF Unit Slab (Display) + FF Unit (alles andere):

- **Gelasio** (`Gelasio-Medium.ttf`, 500) — Display/Headlines (Serifen-Stellvertreter;
  Eben Sorkin, OFL). Bezug: Google Fonts (`ofl/gelasio`).
- **Fira Sans** (`FiraSans-Regular.ttf`, `FiraSans-Bold.ttf`) — UI-Text, Wordmark,
  Kicker & Meta, Ersatz für **FF Unit** (Erik Spiekermann, gleiche Design-DNA, OFL).

Alle unter der **SIL Open Font License 1.1**; die OFL erlaubt Einbettung und
Weitergabe. Bezug: https://github.com/google/fonts bzw. fonts.gstatic.com.

Liegen echte **FF-Unit-Dateien** (Desktop-Lizenz) vor, können sie hier eingesetzt und
in `app/og-fonts.ts` referenziert werden — der Rest bleibt unverändert.
