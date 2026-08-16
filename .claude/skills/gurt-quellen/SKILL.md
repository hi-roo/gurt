---
name: gurt-quellen
description: >-
  Playbook für Quellensuche & -prüfung bei GURT-Beiträgen. Nutze es, sobald du
  für einen Beitrag/Datensatz echte Zahlen recherchierst, eine Datenquelle
  anbindest oder Positionen belegst — d. h. bei Aufgaben wie „Daten recherchieren",
  „Quelle finden/prüfen", „Zahlen für Artikel X". Kodifiziert Quellenhierarchie,
  Extraktions-Tricks (inkl. PDF), Neutralität und Zitierschema (siehe docs/04, 07, 08).
---

# GURT — Quellensuche & Quellenprüfung

**Grundsatz (docs/08):** *Jede Zahl hat eine Quelle.* Kein Datenpunkt ohne Provenienz.
Lieber wenige, belastbare Zahlen aus Primärquellen als viele unbelegte.

## 1. Quellenhierarchie (von stark nach schwach)
1. **Amtliche Primärquellen / Statistikämter:** Destatis, AG Energiebilanzen (AGEB),
   BAMF, BMWE/BMWK · BMAS · BMWSB · BMVg, Deutsche Rentenversicherung, Bundesrechnungshof,
   NATO (Defence Expenditure), Eurostat, Fraunhofer ISE / Energy-Charts, Bundestag-DIP.
2. **Forschungsinstitute / Räte:** SVR (Migration & Wirtschaft), IW, IAB, ifo, Agora, BBSR.
3. **Verbände / Akteure (für Positionen):** mit klarer Zuschreibung (z. B. ZDB, BDEW, VdK,
   Mieterbund, ver.di, DUH).
4. **Leitmedien:** zum Beleg von Aussagen/Diskurs — ausgewogen über das Spektrum.
- **Meiden** als Primärquelle: Statista u. ä. (oft Paywall/Sekundär). Als Wegweiser ok,
  Wert dann aus der genannten Primärquelle ziehen.
- **Bevorzugt keyless** (Eurostat, Destatis, amtliche Pressemitteilungen).

## 2. Extraktion (was zuverlässig klappt)
- **Zusammenfassungen sind keine Quellen:** tragende Werte nur aus dem Rohtext (pdftotext,
  Datenanhang, API) — automatische Zusammenfassungen haben nachweislich Zahlen erfunden.
  Rohdateien im Scratchpad sichern, damit die Gegenprüfung ohne Neu-Abruf möglich ist.
- `WebSearch` → konkrete Quelle finden → `WebFetch` zum Auslesen.
- **JS-gerenderte Portale** (Destatis, UBA interaktiv) liefern via WebFetch oft nur die
  **Navigation** → stattdessen die **Pressemitteilung** oder das **PDF** ansteuern.
- **PDFs:** WebFetch speichert die Datei lokal unter `…/tool-results/*.pdf`. Dann:
  `pdftotext -layout <pfad> /tmp/x.txt` (poppler ist via brew installiert) und mit `grep`
  die Tabelle holen. So kamen NATO-, AGEB- und SVR-Zahlen rein. Ein naiver zlib-Regex
  scheitert an Object-Stream-PDFs — immer `pdftotext` nehmen.
- Jahresreihen oft uneinheitlich (Methodenbrüche, Revisionen) → lieber **eine** konsistente
  Quelle/Definition als gemischte Werte; fehlt eine saubere Reihe, wenige belegte Stützjahre
  nehmen und das transparent machen.

## 3. Neutralität & Integrität (docs/07)
- Positionen **paraphrasieren** ist der Normalfall; ein **wörtliches Primärzitat** ist zulässig,
  wenn es treffender ist als jede Umschreibung — dann unverändert, als vollständiger Satz,
  Auslassungen mit […], Quelle = das Dokument der Fundstelle. Nie erfundene oder angeglichene Zitate.
- **Mehrere Sichtweisen** ausgewogen, je mit Quelle direkt; keine einseitige Rahmung.
- **Caveats dokumentieren**, wo Daten uneindeutig/abgegrenzt sind, z. B.: NATO real- vs.
  current-prices; Gas-Input vs. Strom-Output; Genehmigt ≠ gebaut; EU-Freizügigkeit nicht
  nach Grund erfasst; Altenquotient-Definition (65 vs. 67). Diese Hinweise gehören in die
  **Methodik-Note** des Beitrags.
- Abgeleitete Werte (z. B. Anteil aus Quotient) **kennzeichnen** und Rechenweg notieren.

## 4. Zitierschema
Jede `quelle`: `{ titel, url, herausgeber? }`. In Charts an den `datensatz.quelle`, bei
Aussagen (Matrix/Diskurs) direkt an die Aussage. Datenstand/Abrufdatum in die Methodik.

## 5. Checkliste vor dem Schreiben

Verbindlich nach docs/08 „Grundrecherche": **erst pinnen, dann schreiben** — die Prüfstraße
ist Gegenprüfung, nicht Recherche.

- [ ] Jeder Wert hat eine Primär-/belastbare Quelle (titel+url).
- [ ] Tragende Werte aus dem Rohtext gezogen (nicht aus Zusammenfassungen); Rohdaten gesichert.
- [ ] Rechenstand je Reihe benannt; keine gemischten Stände; anstehende Revisionen geprüft.
- [ ] Bemessungsgrundlage an jeder Zahl (Bestand/Fluss, Abgrenzung, Grundgesamtheit).
- [ ] Umfragen: Instrument, Feldzeit, Fallzahl, Fehlermarge benannt; Skalen nie gemischt.
- [ ] Zitate wörtlich an der Fundstelle geprüft; keine Fragmente als Ganzsätze.
- [ ] Belege am Ort (Inline-Link, Deeplink); alle URLs auf Erreichbarkeit geprüft.
- [ ] Nicht Belegbares gestrichen und benannt; Fehlendes als Befund berichtet.
- [ ] Einheiten & Definitionen geklärt und in der Methodik notiert.
- [ ] Positionen paraphrasiert oder wörtlich nach Zitatregeln (docs/07), ausgewogen, je bequellt.
- [ ] Bezugsjahr/Datenstand vermerkt; Unsicherheiten offengelegt.
