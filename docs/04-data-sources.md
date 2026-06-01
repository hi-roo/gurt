# 04 — Datenquellen

Gurt nutzt **ausschließlich offizielle / primäre Quellen**. Jeder Datensatz trägt Herkunft, Abruf-
datum und Lizenz (siehe `quelle`/`datensatz` im [Content-Modell](02-content-model.md)). Adapter
liegen in `packages/data/src/sources/`.

## Quellen im Überblick

| Quelle                 | Inhalt                                  | Zugriff                         | Key nötig |
| ---------------------- | --------------------------------------- | ------------------------------- | --------- |
| data.europa.eu         | EU-Open-Data (Metadaten + Datensätze)   | REST-Search-API + SPARQL        | nein      |
| Energy-Charts (Fh ISE) | Stromerzeugung Deutschland (öffentlich) | REST-API                        | nein      |
| Bundestag DIP          | Parlamentsmaterialien (Vorgänge etc.)   | REST-API                        | **ja**    |
| bundesregierung.de     | Regierungs-Kommunikation, Pressemitt.   | HTML/RSS (kein offizielles JSON)| nein      |
| Ministerien (z. B. BMWK)| Strategien, Positionen, Statistiken    | HTML/PDF (kuratiert)            | nein      |

---

## data.europa.eu

Offizielles EU-Open-Data-Portal.

- **Search-/REST-API:** Metadaten-Suche über die DCAT-Kataloge (JSON).
- **SPARQL-Endpoint:** `https://data.europa.eu/sparql` — für komplexe Abfragen über die RDF/DCAT-
  Metadatenstruktur.
- **Developers' Corner:** `https://data.europa.eu/en/developerscorner`.
- **Lizenz:** je Datensatz unterschiedlich — **immer** die Datensatz-Lizenz übernehmen und ausweisen.

Adapter: `packages/data/src/sources/data-europa.ts` (Search + SPARQL).

---

## Energy-Charts (Fraunhofer ISE)

Öffentliche Stromerzeugung Deutschlands (und weiterer Länder), offen und ohne Key.

- **API:** `https://api.energy-charts.info/public_power?country=de&start=…&end=…` — 15-Min-Zeitreihe
  je Produktionstyp (MW).
- **Metrik-Hinweis:** „öffentliche Nettostromerzeugung" ≠ Destatis „ins Netz eingespeist" ≠
  „Bruttostromerzeugung" (AGEB). Beim Vergleich von EE-Anteilen immer die Abgrenzung mitführen.
- Adapter: `packages/data/src/sources/energy-charts.ts` — `fetchAnnualGeneration(country, year)`
  aggregiert die Zeitreihe zu Jahres-TWh je Träger (Pumpspeicher als Speicher ausgeschlossen).

## Bundestag DIP (Dokumentations- und Informationssystem)

Parlamentsmaterialien des Deutschen Bundestags.

- **Basis-URL:** `https://search.dip.bundestag.de/api/v1/`
- **Endpoints:** `vorgang`, `vorgangsposition`, `drucksache`, `drucksache-text`,
  `plenarprotokoll`, `plenarprotokoll-text`, `aktivitaet`, `person`.
- **Auth:** API-Key, als Header `Authorization: ApiKey <KEY>` **oder** Query `?apikey=<KEY>`.
- **Key anfordern:** E-Mail an `parlamentsdokumentation@bundestag.de` (42-stelliger Key).
  Die früher öffentlich dokumentierten Test-Keys sind inzwischen deaktiviert (HTTP 401) —
  ein eigener Key ist erforderlich.
- **OpenAPI-Spec:** `https://dip.bundestag.api.bund.dev/`
- **Format:** JSON, paginiert (Cursor).
- **Lizenz:** amtliche Werke; Nutzung gemäß DIP-Nutzungshinweisen, Quelle nennen.

Adapter: `packages/data/src/sources/bundestag-dip.ts`. Key aus `process.env.DIP_API_KEY`.

> Rate-Limit & Fairness: Cursor-Pagination respektieren, Ergebnisse cachen, nicht hämmern.

---

## bundesregierung.de & Ministerien

Kein offizielles JSON-API. Strukturierte Inhalte kommen als HTML/RSS/PDF.

- **Vorgehen:** Fetch + Parsing (RSS bevorzugt), strikt als *Roh-Eingabe* behandeln; relevante
  Aussagen werden **redaktionell kuratiert** in `position`/`quelle` übernommen — nie automatisch
  als „Fakt" publiziert.
- **Provenienz:** Original-URL + Abrufdatum + (wenn möglich) Archiv-Snapshot speichern.

Adapter/Helfer: `packages/data/src/sources/bundesregierung.ts` (RSS/HTML-Helfer).

---

## Lizenz-Disziplin (verbindlich)

1. **Keine Veröffentlichung ohne ausgewiesene Quell-Lizenz.**
2. Lizenz + Herausgeber + Abrufdatum landen am `datensatz`/`quelle`.
3. Inkompatible Lizenzen werden nicht weiterverbreitet — nur verlinkt.
4. Im Zweifel: verlinken statt spiegeln.
