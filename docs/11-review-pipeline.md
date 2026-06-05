# 11 — Prüfstraße (fachredaktionelle Schleuse)

Jeder **neue Beitrag** durchläuft vor Freigabe und Veröffentlichung eine **fachredaktionelle
Schleuse** — eine Prüfstraße aus mehreren Fachredaktionen. Sie ist ein **Gate, kein Autor**:
Sie meldet Findings, sie schreibt nicht um. Die Fixes macht der Autor, die **Freigabe erteilt der
Mensch**. Das kodifiziert, was redaktionelles Gegenlesen leistet (vgl. das Review des
Sozialstaat-Beitrags, das u. a. einen Zahlenfehler und eine Vergleichbarkeits-Lücke fand).

## Wann (Trigger)

- **Pflicht für neue Beiträge** — vor der ersten Veröffentlichung (`publish:sanity`).
- **Ausgenommen** sind kleine Edits: Tippfehler, Farb-/Stiländerungen, Daten-Refresh,
  Einzelzahl-Korrekturen, Re-Import ohne Inhaltsänderung.
- Bei einer **größeren Überarbeitung** eines bestehenden Beitrags erneut laufen lassen.

## Wo im Prozess

```
Recherche (gurt-quellen) → Bau (seed.ts) → Gates (typecheck/lint/test) → Browser-Check
   → 🚦 PRÜFSTRASSE → Fixes → [Re-Run bei Bedarf] → ✅ Freigabe (Mensch) → publish:sanity + Live-Check
```

Die Schleuse setzt **auf den bestehenden Bauprozess auf** (Skill `gurt-storytelling`): erst bauen
und die Gates grün bekommen, dann prüfen, dann freigeben.

## Die fünf Fachredaktionen (Desks)

Jeder Desk prüft unabhängig gegen eine Direktive und gibt ein Votum (🟢/🟡/🔴) plus Findings
(Schwere · Fundstelle · Problem · Beleg · Empfehlung) zurück.

| Desk | Direktive | prüft im Kern |
| --- | --- | --- |
| **Faktencheck & Quellen** | docs/08, Skill `gurt-quellen` | jede Zahl primärbequellt, nachgerechnet, Bezugsjahr/Datenstand aktuell; tragende Werte **unabhängig** gegengeprüft |
| **Neutralität & Editorial** | docs/07, docs/10 | keine wertende Sprache, Vergleich statt These, Diskurs ausgewogen (4–5 bequellte Stimmen), urteilsfreier Schluss |
| **Methodik & Vergleichbarkeit** | docs/08 | Bemessungsgrundlagen getrennt, „Äpfel/Birnen"-Caveat **prominent im Haupttext**, abgeleitete Werte markiert, Methodik-Note vollständig |
| **Visualisierung & A11y** | docs/06, Skill `gurt-visualisierung` | Charttyp passend, Tabellen-Fallback + Beschreibung, Farbe nie alleiniger Träger, Caption bequellt, mobil/Kontrast/Reduced-Motion |
| **Technik & Schichten** | CLAUDE.md (Root + je Schicht) | Schichtgrenzen, Provenienz an Datensätzen, Encoding-/Referenz-Konsistenz, keine Secrets, in `seedArticles` + gültiges Ressort |

## Chefredaktion (Synthese)

Bündelt die fünf Voten zu **einer Freigabe-Empfehlung**:

- 🟢 **Go** — keine Blocker, höchstens Minors.
- 🟡 **Go mit Auflagen** — Majors zuerst beheben, dann frei.
- 🔴 **No-Go** — mindestens ein Blocker (z. B. falsche/unbelegte Zahl, Neutralitätsverstoß,
  fehlender A11y-Fallback).

Mit priorisierter Findings-Liste (Blocker → Major → Minor). **Die Empfehlung ist beratend; die
Freigabe trifft der Mensch.**

## Umsetzung (Hybrid)

- **Prozess/Definition:** Skill `gurt-review` (Desks, Checklisten, Verdikt-Format, Einordnung).
- **Motor:** Workflow `.claude/workflows/review-beitrag.js` — fünf unabhängige Desk-Agenten
  (parallel, read-only) + ein Synthese-Agent. Aufruf mit dem Beitrags-Slug:

  ```
  Workflow „review-beitrag", args: { slug: "<beitrags-slug>" }
  ```

  Rückgabe: `{ slug, synthese: { empfehlung, begründung, blocker[], majors[], minors[] }, desks[] }`.

Die Schleuse ändert **keine Dateien**; sie liefert nur den Prüfbericht. Der Autor arbeitet die
Findings ab und legt das Ergebnis zur Freigabe vor.
