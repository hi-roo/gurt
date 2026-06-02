---
name: gurt-storytelling
description: >-
  Playbook für das Schreiben & Strukturieren eines GURT-Beitrags. Nutze es, wenn
  du einen neuen Beitrag (Artikel/Benchmark) entwirfst, einen Diskurs-Block baust
  oder einen Beitrag in Seed/Sanity verankerst — z. B. „Artikel X bauen", „Beitrag
  zu Thema Y". Kodifiziert Stimme, Benchmark-Qualität, Bauplan, Diskurs-Block und
  den Seed→Sanity-Workflow (siehe docs/07, docs/10).
---

# GURT — Storytelling & Artikel-Bauplan

**Stimme (docs/10 §1):** souverän wie eine öffentliche Institution, neugierig wie ein
Wirtschaftsmagazin. Neutral, präzise, ohne wertende Sprache. Leitmotiv: *„Mehrere Dinge
können gleichzeitig richtig sein."*

## 1. Benchmark-Qualität (Definition of Done je Beitrag)
Klare **Leitfrage** · **≥ 1 echte interaktive Viz** mit bequellten Daten · **kartierte/bequellte
Positionen** (Diskurs-Block und/oder Positions-Matrix) · **Methodik-Note** mit Quellen +
Abgrenzungen · **neutrale Sprache** durchgängig.

## 2. Bauplan (bewährte Reihenfolge)
1. **h2 „Worum es geht"** — Kontext in 2 Absätzen + **drei Leitfragen**, die den Beitrag führen.
2. **Daten-Sektionen** — je: kurzer Setup-Absatz, der die Aussage benennt → **dann die Viz**.
   (Nicht kontextarm: jede Grafik hat einen erklärenden Satz davor.)
3. **Diskurs-Sektion** — h2 + Einleitung → **Diskurs-Block**.
4. **Quellen-Note** (kompakt) + **Methodik & Transparenz** (Callout, Abgrenzungen/Definitionen).
- Optional ein redaktionelles **Zitat** als Pointe (klar als GURT-Einordnung markiert).

## 3. Diskurs-Block (ersetzt den alten dünnen Vergleich)
- **4–5 ausgewogene Sichtweisen** über das Spektrum (Regierung, Wirtschaft/Verbände, Wissenschaft,
  Sozial/Opposition …), je **paraphrasiert + Quelle direkt** (`perspektiven[].quelle`).
- `frage` (Leitfrage), `einleitung` (Kontext + Stand/Datum), `einordnung` (neutral, ohne Wertung).
- Anti-Pattern vermeiden: einseitige Auswahl, fehlender Kontext, „Maßnahme A/B" ohne Beleg.

## 4. Seed → Sanity-Workflow (Schritt für Schritt)
1. Beitrag in `apps/web/content/seed.ts` als `Article` + `BodyBlock[]` schreiben; in
   `seedArticles` aufnehmen. Block-Typen: `block()` (Portable Text), `visualisierungBlock`,
   `diskursBlock`, `zitatBlock`, `quellenNote`.
2. **Gates:** `pnpm typecheck`, `pnpm lint`, `pnpm test` (alle grün).
3. **Browser** (Dev-Server): Beitrag rendert, Charts korrekt, mobil sauber (kein Overflow).
4. **Nach Sanity:** `pnpm migrate:ndjson` → `SANITY_PROJECT_ID="$NEXT_PUBLIC_SANITY_PROJECT_ID"
   SANITY_WRITE_TOKEN="$SANITY_API_READ_TOKEN" node scripts/import-to-sanity.mjs`
   (Env aus Root-`.env.local`: `set -a; . ./.env.local; set +a`). Refresh-verwaltete `datensatz.eu-*`/
   `datensatz.dip-*` werden automatisch übersprungen.
5. Neue Rubrik? Ein neues `themen`-Slug erscheint **automatisch** in der Themen-Nav (`getThemes`).

## 5. Commit & Push (Repo-Regeln)
- Committer: `32794885+hi-roo@users.noreply.github.com`, **kein** `Co-Authored-By` (Vercel-Hobby).
- Commit-Messages mit Sonderzeichen via `git commit -F <datei>` (zsh-Parsefehler bei `-m` möglich).
- **Push nach `main` nur auf ausdrückliche User-Freigabe** (Auto-Mode-Gate). Vorher lokal committen.

## 6. Slug-/Themen-Slate (Benchmark, bereits live)
Energie · Verteidigung · Migration · Wohnen · Rente. Optional #6 Klima (Querschnitt).
Quellen-Playbook: Skill **gurt-quellen**. Chart-Playbook: Skill **gurt-visualisierung**.
