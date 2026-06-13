# 04 — Datenquellen

Gurt nutzt **ausschließlich offizielle / primäre Quellen**. Jeder Datensatz trägt Herkunft, Abruf-
datum und Lizenz (siehe `quelle`/`datensatz` im [Content-Modell](02-content-model.md)). Adapter
liegen in `packages/data/src/sources/`.

## Quellen im Überblick

| Quelle                 | Inhalt                                  | Zugriff                         | Key nötig |
| ---------------------- | --------------------------------------- | ------------------------------- | --------- |
| Destatis GENESIS-Online| Amtliche Statistik (Bevölkerung, Soziales …) | REST-Webservice (POST)     | **ja**    |
| data.europa.eu         | EU-Open-Data (Metadaten + Datensätze)   | REST-Search-API + SPARQL        | nein      |
| Energy-Charts (Fh ISE) | Stromerzeugung Deutschland (öffentlich) | REST-API                        | nein      |
| Bundestag DIP          | Parlamentsmaterialien (Vorgänge etc.)   | REST-API                        | **ja**    |
| Bundestag (nam. Abst.) | Namentliche Abstimmungen (Einzelstimmen)| abgeordnetenwatch-API v2 (CC0)  | nein      |
| bundesregierung.de     | Regierungs-Kommunikation, Pressemitt.   | HTML/RSS (kein offizielles JSON)| nein      |
| Ministerien (z. B. BMWK)| Strategien, Positionen, Statistiken    | HTML/PDF (kuratiert)            | nein      |
| GovData.de             | Bund/Länder/Kommunen, offene Daten (Meta-Katalog) | CKAN-API + DCAT (RDF) | nein      |

---

## Destatis GENESIS-Online (Statistisches Bundesamt)

Die zentrale amtliche Statistikdatenbank Deutschlands (Bevölkerung, Erwerbstätigkeit, Preise,
Sozialleistungen, Renten u. v. m.) — primäre Quelle ersten Ranges.

- **Basis-URL:** `https://genesis.destatis.de/genesisWS/rest/2020/`
- **Auth:** persönlicher **API-Token** im HTTP-Header `username` (Passwort bleibt leer). Token nach
  Login unter „Webservice (API)" erzeugen. Token aus `process.env.GENESIS_API_TOKEN`, nie committen.
- **Daten holen:** **POST** `data/table` (formularkodiert) → JSON-Hülle mit der Tabelle in
  `Object.Content`; `Status.Code = 0` bedeutet Erfolg. Parameter u. a. `name` (Tabellencode,
  z. B. `12411-0001`), `area=all`, `startyear`/`endyear`, `language`.
- **Format-Hinweis:** `data/table` liefert die klassische Tabellendarstellung (für einfache
  Zeitreihen via `parseFlatTimeSeries` direkt nutzbar); komplexe mehrdimensionale Tabellen liefert
  `data/tablefile` als Flat-File-CSV (ffcsv, ZIP).
- **OpenAPI/Swagger:** `https://genesis.destatis.de/genesisWS/swagger-ui/index.html`
- **Lizenz:** „Datenlizenz Deutschland — Namensnennung 2.0" (`dl-de/by-2-0`) — Quelle nennen.

Adapter: `packages/data/src/sources/genesis-destatis.ts` — `fetchTable` / `fetchTimeSeries`
(+ pure `parseFlatTimeSeries`). CLI:
`pnpm --filter @gurt/data ingest -- --source=genesis --name=12411-0001 --startyear=2015`.

> Hinweis: Das **neue** GENESIS (`genesis.destatis.de`) erwartet die Daten-Methoden als POST mit
> Token-Header; die ältere Variante mit `username`/`password` als Query-Parameter wird in die
> Web-Oberfläche umgeleitet (→ HTML statt JSON).

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

## Namentliche Abstimmungen (Bundestag) via abgeordnetenwatch

Die **namentlichen Abstimmungen** des Bundestags (wie jede:r Abgeordnete votiert hat) sind amtliche
offene Daten — der Bundestag veröffentlicht sie je Abstimmung als XLSX/XML unter
`bundestag.de/parlament/plenum/abstimmung/liste`. Die **DIP-API liefert diese Einzelstimmen nicht**
(nur Vorgänge/Drucksachen/Protokolle/Personen/Aktivitäten). Maschinenlesbar und stabil paginierbar
gibt es sie über die **abgeordnetenwatch.de-API v2**, die genau diese amtlichen Abstimmungen
republiziert.

- **Basis-URL:** `https://www.abgeordnetenwatch.de/api/v2/`
- **Endpoints:** `parliament-periods` (Legislaturperioden), `polls?field_legislature=<id>`
  (namentliche Abstimmungen einer Periode), `polls/<id>?related_data=votes` (Einzelstimmen mit
  Fraktion + `yes`/`no`/`abstain`/`no_show`).
- **Bundestag-Perioden:** 20. WP (2021–2025) = `field_legislature=132`, 21. WP (ab 2025) = `161`.
- **Auth:** **keiner** (keyless). Rate-Limit ~30 Requests/Min. → Adapter drosselt sequentiell + Retry.
- **Lizenz:** **CC0 1.0** (gemeinfrei); Urdaten = amtliche namentliche Abstimmungen des Bundestags
  (beide ausweisen).

Adapter: `packages/data/src/sources/abgeordnetenwatch.ts` (+ Zod-Schema). Auswertung:
`packages/data/src/transform/fraktions-matrix.ts` (pure, getestet) berechnet die Fraktions-
Übereinstimmungsmatrix (Mehrheitshaltung je Fraktion → Paaranteil gleicher Mehrheit;
`presentFraktionen` blendet nicht vertretene Fraktionen aus — z. B. die FDP in der 21. WP). CLI:
`pnpm --filter @gurt/data ingest -- --source=abgeordnetenwatch-abstimmungen --wahlperiode=132`.
Roh-Snapshots: `apps/web/content/datasets/fraktions-matrix-wp20.json` (abgeschlossene 20. WP, statisch
im Seed) und `…-wp21.json` (laufende 21. WP).

> Auto-Refresh: Der Chord der **laufenden 21. WP** (`datensatz.wer-stimmt-mit-wem.1`) wird wöchentlich
> von der Action `refresh-data` aktualisiert (`scripts/refresh-sanity-data.ts`) und vom Seed-Import
> übersprungen (`REFRESH_MANAGED`). Die abgeschlossene 20. WP (`.0`) bleibt statisch. Damit die
> Auto-Werte nicht mit dem Text auseinanderlaufen, ist die WP21-Prosa bewusst **ohne feste Zahlen**
> formuliert — die exakten, jeweils aktuellen Werte stehen in der Tabelle/`datenJson`.

---

## bundesregierung.de & Ministerien

Kein offizielles JSON-API. Strukturierte Inhalte kommen als HTML/RSS/PDF.

- **Vorgehen:** Fetch + Parsing (RSS bevorzugt), strikt als *Roh-Eingabe* behandeln; relevante
  Aussagen werden **redaktionell kuratiert** in `position`/`quelle` übernommen — nie automatisch
  als „Fakt" publiziert.
- **Provenienz:** Original-URL + Abrufdatum + (wenn möglich) Archiv-Snapshot speichern.

Adapter/Helfer: `packages/data/src/sources/bundesregierung.ts` (RSS/HTML-Helfer).

---

## GovData.de — geprüft (Stand 2026-06): Discovery-Quelle, vorerst kein Adapter

Das offene Datenportal des Bundes bündelt Datensätze von **Bund, Ländern und Kommunen** nach
**DCAT-AP.de**. Es ist primär ein **Meta-Katalog**: Meist verweist es auf den Quelldatensatz beim
jeweiligen Herausgeber, statt eigene Primärdaten zu führen.

- **API:** CKAN, **keyless**. Beispiel: `https://www.govdata.de/ckan/api/3/action/package_search?q=<term>&rows=<n>`
  → JSON mit `success: true`, `result.count` und `result.results[]` (`title`, `organization.title`,
  `license_id`/`license_title`, `resources[].format`). Der DCAT-Katalog liegt zusätzlich als
  RDF/Turtle/JSON-LD vor; Einzeldatensätze als JSON.
- **Beispiel-Abruf (geprüft 06/2026):** `q=haushalt` → **1.917 Treffer**. Beispiele: „Haushalte"
  (Stadt Karlsruhe, **CC-BY 4.0**, 19 CSV-Ressourcen); „Haushalt" (Land Schleswig-Holstein, ohne
  Ressource und ohne Lizenzangabe).
- **Lizenz:** gemischt — viele `dl-de/by-2-0` oder CC-BY, aber **uneinheitlich gepflegt** (teils leer).
  Pro Datensatz prüfen (`license_id`); nur offen lizenzierte Datensätze **mit** Ressource nutzen.
- **Abdeckung:** sehr breit, aber schwerpunktmäßig **kommunal/regional**. Für GURTs nationale
  Leitfragen sind die direkten Primärquellen (Destatis, BMAS, NATO …) meist granularer und
  autoritativer.

**Empfehlung:** **Kein voller Adapter nötig (vorerst).** GovData als **Discovery-Werkzeug** nutzen —
Katalog durchsuchen, Quelldatensatz identifizieren, dann **beim Original-Herausgeber** abrufen und die
Provenienz dort verankern. Sobald ein Beitrag einen **kommunalen/regionalen Vergleich** braucht, lohnt
ein **schlanker `govdata`-CKAN-Adapter** (`package_search` → Filter auf `license_id` + Format CSV/JSON,
Zod-validiert, Provenienz je Datensatz). Bis dahin gilt die Lizenz-Disziplin unten unverändert.

---

## Lizenz-Disziplin (verbindlich)

1. **Keine Veröffentlichung ohne ausgewiesene Quell-Lizenz.**
2. Lizenz + Herausgeber + Abrufdatum landen am `datensatz`/`quelle`.
3. Inkompatible Lizenzen werden nicht weiterverbreitet — nur verlinkt.
4. Im Zweifel: verlinken statt spiegeln.
