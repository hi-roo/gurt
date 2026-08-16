# 08 — Methodik & Transparenz

Transparenz ist Gurts Geschäftsgrundlage. Diese Seite beschreibt, wie wir arbeiten — öffentlich
nachvollziehbar.

## Daten-Herkunft

- Wir nutzen **offizielle / primäre Quellen** (siehe [04-data-sources.md](04-data-sources.md)).
- Jeder Datensatz trägt: **Herausgeber, Original-URL, Abrufdatum, Lizenz** und — falls transformiert —
  eine **Provenienz-Notiz**, was verändert wurde.
- Wo möglich, hinterlegen wir einen **Archiv-Snapshot** der Quelle.

## Grundrecherche (verbindlich)

Zehn Regeln aus der Redaktionspraxis (Stand August 2026). Sie gelten **vor** dem Schreiben und
vor der Prüfstraße — die Schleuse ist Gegenprüfung, nicht Recherche. Jede Regel hat einen realen
Vorfall als Ursprung; die Kurzbelege stehen in Klammern.

**Reihenfolge und Rohmaterial**

1. **Erst pinnen, dann schreiben.** Jede tragende Zahl (Chart, Standfirst, Kernsatz) wird an der
   Primärquelle verifiziert, bevor der Text entsteht — nicht danach. *(Atomkraft/Fracking: aus
   Suchzusammenfassungen übernommene Chart-Zahlen blockierten die Freigabe.)*
2. **Zusammenfassungen sind keine Quellen.** Tragende Werte nur aus dem Rohtext — PDF via
   `pdftotext`, Datenanhang, API. Automatische Zusammenfassungen haben nachweislich Zahlen
   erfunden, die dem Dokument widersprachen. *(Vorfall Deutschland-Monitor 2025.)*
3. **Rohdaten lokal sichern.** Ausgelesene Primärdateien werden im Arbeitsverzeichnis gesichert,
   damit die Gegenprüfung ohne Neu-Abruf möglich ist. *(Bewährt beim IFG-Beitrag.)*

**Zahlen-Disziplin**

4. **Ein Rechenstand je Reihe, benannt.** Revisionen haben Datum und Kalender; Stände werden nie
   stillschweigend gemischt, anstehende Revisionen werden genannt. *(Regierungsbilanz: BIP nach,
   Investitionen vor der VGR-Revision vom 30.07.2026.)*
5. **Bemessungsgrundlage an jede Zahl.** Bestand ≠ Neueinstellung, Erwerbstätige ≠ Arbeitnehmer,
   Reserven ≠ Ressourcen ≠ Förderrate. Fast gleiche Zahlen aus verschiedenen Abgrenzungen sind
   die gefährlichste Verwechslung. *(„177.000 angekündigte Stellen" neben „−177.000 Bestand".)*
6. **Umfragen: Instrument nennen, nie mischen.** Fragewortlaut, Skala, Modus, Feldzeit, Fallzahl,
   Fehlermarge gehören zur Zahl; Werte verschiedener Instrumente nie in eine Grafik, abweichende
   Wellen kennzeichnen. *(41/27/23 Prozent Vertrauen für dieselbe Bundesregierung.)*

**Zitate und Belege**

7. **Zitattreue ist wörtlich.** Wortlaut an der Fundstelle prüfen; keine Fragmente als ganze
   Sätze, keine stille Großschreibung, keine Zahl einer Quelle zuschreiben, die sie nicht
   enthält. *(Halluziniertes Politiker-Zitat bei Fracking; verkürztes Zitat in der Hero-Rotation.)*
8. **Beleg am Ort, erreichbar.** Tragende Zahlen tragen ihren Link im Absatz (Inline-Link),
   Deeplinks statt Startseiten; alle URLs werden vor Freigabe auf Erreichbarkeit geprüft.
   *(Eine Sammelnote ohne Links war ein Freigabe-Blocker.)*

**Redliches Nein**

9. **Nicht belegbar heißt streichen — und sagen.** Zahlen ohne offengelegte Methodik oder
   Primärbeleg fliegen raus, auch wenn sie die Geschichte stützen; Interessenquellen und
   Umetikettierungen werden benannt. *(Lobby-Zähler ohne Methodik; „Studie", die amtliche
   Rohdaten nur aufbereitete.)*
10. **Fehlendes ist ein Befund.** Kein quantifiziertes Ziel, keine Aufschlüsselung, keine
    Kreuztabelle — das wird berichtet statt überbrückt. *(Arbeitsmarkt ohne Beschäftigungsziel;
    Mindeststandards ohne Herkunfts-Kreuzung.)*

## Von Rohdaten zur Grafik

1. **Extraktion** über getypte Adapter (`packages/data`).
2. **Validierung** mit Zod an der Systemgrenze.
3. **Transformation** dokumentiert (Einheiten, Aggregation, Filter).
4. **Redaktionelle Kuratierung** verknüpft Daten mit Kontext — im Vier-Augen-Prinzip.
5. **Visualisierung** nach den Regeln in [06](06-visualization-guidelines.md) (ehrliche Achsen,
   Unsicherheit sichtbar, A11y).

## Methodik-Hinweis pro Beitrag

Jeder Beitrag enthält einen Methodik-Hinweis (`beitrag.methodik`) mit mindestens:

- **Datenstand** (Zeitpunkt der Daten und letzter Aktualisierung).
- **Auswahl** (welche Daten/Akteure/Zeiträume — und warum).
- **Grenzen** (was die Daten **nicht** zeigen; bekannte Unsicherheiten).

## Korrektur-Policy

- Substanzielle Korrekturen werden **am Beitrag gekennzeichnet** (Was, Wann, Warum).
- Tippfehler/Stilkorrekturen ohne Bedeutungsänderung müssen nicht ausgewiesen werden.
- Korrektur-Hinweise bleiben dauerhaft sichtbar.

## Unabhängigkeit & Interessenkonflikte

- Finanzierung und Förderer werden offengelegt.
- Bei thematischen Interessenkonflikten erfolgt ein sichtbarer Hinweis.
- Keine Einflussnahme Dritter auf redaktionelle Auswahl oder Darstellung.

## Offenheit

- Quellcode ist quelloffen für nicht-kommerzielle Nutzung (PolyForm Noncommercial 1.0.0). Inhalte
  sind nicht-kommerziell nachnutzbar (CC BY-NC-ND 4.0). Externe Datensätze behalten ihre Quell-Lizenz.
- Methodische Kritik ist willkommen — Kontakt-/Hinweiswege werden auf der Plattform bereitgestellt.
