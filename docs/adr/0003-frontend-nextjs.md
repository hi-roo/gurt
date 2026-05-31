# ADR 0003 — Next.js 15 (App Router) als Frontend

- **Status:** akzeptiert
- **Datum:** 2026-05-31

## Kontext

Das Frontend muss editorial überzeugen, interaktive Visualisierungen tragen, performant und
SEO-stark sein und sauber mit Sanity zusammenspielen.

## Entscheidung

**Next.js 15** mit **App Router**, integriert via **`next-sanity`** (v11+, `defineLive`).

## Begründung

- Beste Sanity-Integration (Visual Editing, Draft Mode, Live-Content).
- React Server Components + ISR → schnelle, statische Auslieferung mit gezielter Interaktivität.
- Visualisierungen als hydratisierte Inseln (Performance + A11y-freundlich).
- Riesiges Ökosystem; wächst mit (Suche, Profile, später ggf. mehr).
- Erstklassiges Deployment auf Vercel.

## Konsequenzen

- React-19/Server-Components-Mentalmodell für Mitwirkende nötig.
- Sorgfalt bei Server/Client-Grenze (Visualisierungen sind Client-Inseln).

## Alternativen

- **Astro:** exzellent für statisch-content-lastige Seiten, aber kleineres App-Ökosystem und
  schwächere Sanity-Visual-Editing-Integration. Verworfen — als Option dokumentiert.
