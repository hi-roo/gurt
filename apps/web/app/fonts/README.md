# OG-Schriften (eingebettet für next/og)

Diese TTFs werden in die OG-/Share-Bilder (`opengraph-image.tsx`) eingebettet —
`next/og` (Satori) braucht Schriften als Datei, Typekit-Webfonts funktionieren dort
nicht. Marken-Typo seit v0.7.0: FF Unit Slab (Display) + FF Unit (alles andere):

- **Roboto Slab** (`RobotoSlab-Regular.ttf`, 400) — Display/Headlines, Slab-Stellvertreter
  für **FF Unit Slab** (Christian Robertson, **Apache License 2.0**; erlaubt Einbettung
  und Weitergabe). Bezug: Google Fonts (`apache/robotoslab`).
- **Fira Sans** (`FiraSans-Regular.ttf`, `FiraSans-Bold.ttf`) — UI-Text, Wordmark,
  Kicker & Meta, Ersatz für **FF Unit** (Erik Spiekermann, gleiche Design-DNA,
  **SIL Open Font License 1.1**).

Bezug: https://github.com/google/fonts bzw. fonts.gstatic.com.

Liegen echte **FF-Unit-Dateien** (Desktop-Lizenz) vor, können sie hier eingesetzt und
in `app/og-fonts.ts` referenziert werden — der Rest bleibt unverändert.
