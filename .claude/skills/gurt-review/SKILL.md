---
name: gurt-review
description: >-
  Fachredaktionelle Prüfstraße (Gate, kein Autor) für einen NEUEN GURT-Beitrag,
  bevor er freigegeben/veröffentlicht wird. Nutze sie nach dem Bauen + grünen Gates
  und vor `publish:sanity` — bei Aufgaben wie „Beitrag prüfen / freigeben /
  review / Prüfstraße / vor Veröffentlichung gegenlesen". Fünf Desks (Faktencheck,
  Neutralität, Methodik, Visualisierung/A11y, Technik) + Chefredaktions-Synthese →
  Freigabe-Empfehlung. NICHT für kleine Edits (Tippfehler, Farbe, Datenrefresh).
  Siehe docs/11-review-pipeline.md.
---

# GURT — Prüfstraße (fachredaktionelle Schleuse)

**Gate, kein Autor.** Die Schleuse meldet Findings; sie schreibt nicht um. Die Fixes macht der
Autor, die **Freigabe erteilt der Mensch**. Vollständige Beschreibung: `docs/11-review-pipeline.md`.

## Wann
- **Pflicht für neue Beiträge** (vor der ersten `publish:sanity`).
- **Ausgenommen:** kleine Edits — Tippfehler, Farb-/Stilanpassung, Daten-Refresh, Einzelzahl-Fix,
  Re-Import ohne Inhaltsänderung. Bei **größeren Überarbeitungen** erneut laufen lassen.

## Ablauf
1. Beitrag bauen und Gates grün bekommen (Skill `gurt-storytelling`); im Browser/seed gegenlesen.
2. **Prüfstraße starten** — Workflow `review-beitrag` mit dem Slug:
   `Workflow „review-beitrag", args: { slug: "<beitrags-slug>" }`
   (Erfordert Opt-in für Multi-Agent-Orchestrierung — die Schleuse ist genau dieser Fall.)
3. **Bericht lesen:** je Desk Votum (🟢/🟡/🔴) + Findings (Schwere · Fundstelle · Problem · Beleg ·
   Empfehlung); Chefredaktion liefert die **Freigabe-Empfehlung** (go / go-mit-auflagen / no-go).
4. **Findings abarbeiten** (Autor): Blocker und Majors zuerst; Minors nach Ermessen. Bei
   substanziellen Änderungen Schleuse erneut laufen lassen.
5. **Freigabe vorlegen** (Mensch entscheidet) → erst dann `publish:sanity` + Live-Check.

## Die fünf Desks (Kurzfassung)
- **Faktencheck & Quellen** (docs/08, `gurt-quellen`): jede Zahl primärbequellt, aktuell; tragende
  Werte **unabhängig** gegengeprüft (WebSearch/WebFetch).
- **Neutralität & Editorial** (docs/07, docs/10): keine Wertung; Vergleich statt These; Diskurs
  ausgewogen (4–5 bequellte Stimmen); urteilsfreier Schluss.
- **Methodik & Vergleichbarkeit** (docs/08): Bemessungsgrundlagen getrennt; „Äpfel/Birnen"-Caveat
  **prominent im Haupttext**; abgeleitete Werte markiert; Methodik-Note vollständig.
- **Visualisierung & A11y** (docs/06, `gurt-visualisierung`): Charttyp passend; Tabellen-Fallback +
  Beschreibung; Farbe nie alleiniger Träger; Caption bequellt; mobil/Kontrast/Reduced-Motion.
- **Technik & Schichten** (CLAUDE.md): Schichtgrenzen; Provenienz; Encoding-/Referenz-Konsistenz;
  keine Secrets; in `seedArticles` + gültiges Ressort.

## Verdikt
🟢 **Go** (keine Blocker) · 🟡 **Go mit Auflagen** (Majors fixen) · 🔴 **No-Go** (≥ 1 Blocker:
falsche/unbelegte Zahl, Neutralitätsverstoß, fehlender A11y-Fallback …). Empfehlung ist beratend;
die Freigabe trifft der Mensch.
