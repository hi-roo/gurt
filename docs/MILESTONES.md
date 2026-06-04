# Meilensteine & Rollback

Dieses Projekt wächst über Jahre. Damit neue Features einen stabilen Stand nicht
verschlechtern, markieren wir **Meilensteine** als benannte Wiederherstellungspunkte.
Im Zweifel gilt: lieber öfter taggen.

## Konvention

- **Tag-Schema:** annotierte Git-Tags `vMAJOR.MINOR.PATCH` (Semver) — das Datum steht
  in der Tag-Nachricht **und** im Log unten. `v0.x` = vor dem ersten öffentlichen
  Release; eine neue `MINOR` für ein spürbares Feature-Bündel, `PATCH` für Fixes.
- **Wann taggen:** wenn ein zusammenhängender, **verifizierter** Stand erreicht ist
  (Gates grün, im Browser geprüft, deployt) — typischerweise am Ende eines Arbeitstags
  oder Feature-Blocks.
- **Tag erzeugen:**
  ```bash
  git tag -a v0.1.0 -m "Meilenstein v0.1.0 (2026-06-04) — Kurzbeschreibung"
  git push origin v0.1.0
  ```

## Drei Ebenen für den Rückweg

1. **Code → Git-Tag.** Stand ansehen/auschecken oder einen Fix-Branch ziehen:
   ```bash
   git show v0.1.0            # was steckt drin
   git switch -c hotfix v0.1.0   # Branch vom Meilenstein
   # gezielt zurücknehmen:
   git revert <commit>        # einzelne Änderung rückgängig (history-sicher)
   ```
   `revert` ist gegenüber `reset --hard` auf `main` vorzuziehen (kein Force-Push,
   Historie bleibt nachvollziehbar).
2. **Produktion → Vercel Instant Rollback.** Jeder Deploy bleibt erhalten. Im
   Vercel-Dashboard (Project → Deployments) eine frühere, funktionierende
   Production-Version **„Promote to Production"** — sofort live, **ohne** Rebuild.
   Schnellster Live-Undo bei einem schlechten Deploy.
3. **Inhalte → Sanity + NDJSON.** Sanity versioniert jedes Dokument (Document History
   im Studio). Zusätzlich liegt der reproduzierbare Import-Stand in Git
   (`apps/studio/seed/migrated.ndjson`); ein erneuter Import setzt den Content-Stand
   wieder her:
   ```bash
   pnpm migrate:ndjson
   SANITY_PROJECT_ID=nfndwwt2 SANITY_DATASET=production \
     SANITY_WRITE_TOKEN=<editor-token> pnpm import:sanity
   ```

## Meilenstein-Log

### v0.4.0 — 2026-06-04 (Abend)

Zwei-Ebenen-Taxonomie und ein Studio-Schema-Fix.

- **Ressort-Ebene** als feste Top-Navigation, an den **Bundesministerien** orientiert
  (institutionell, neutral): acht **Ein-Wort-Domänen** statt erfundener „&"-Kombis —
  Finanzen, Wirtschaft, Soziales, Umwelt, Inneres, Verteidigung, Wohnen, Parlament.
  **Themen** bleiben daneben als feine, frei wachsende Tags. Neue Route `/ressort/[slug]`,
  Header-Nav, Artikel-Breadcrumb und Sitemap; `ressort`-Feld am Beitrag (Enum, gespiegelt
  in `content/ressorts.ts`), alle 13 Beiträge zugeordnet. Nav zeigt nur belegte Ressorts.
- **Studio-Redeploy:** hosted Studio mit aktuellem Schema neu veröffentlicht — behebt den
  `diskursBlock`-Validierungsfehler („not allowed by the schema") und aktiviert alle
  Schema-Neuerungen im Editor (`chord`, `farben`, `idee`, `ressort`).

Regel bekräftigt: **nach jeder Schema-Änderung** `pnpm --filter @gurt/studio deploy`.

### v0.3.0 — 2026-06-04 (Abend)

Zwei weitere Tier-1-Beiträge und eine neue Rubrik; Sanity nun **13 Beiträge**.

- **Beitrag „Bürgergeld: Wer bekommt es — und was ändert die neue Grundsicherung?"**
  (neue Rubrik **Soziales**) — Empfänger-Treemap, Regelsatz-Linie, Lohnabstand-Balken (WSI),
  5-Stimmen-Diskurs.
- **Beitrag „Umweltschädliche Subventionen"** (Rubrik Klima) — Sektor-Treemap (UBA, 65,4 Mrd),
  Einzelposten-Balken (FÖS/UBA), 5-Stimmen-Diskurs.
- **Treemap-Werte** global präziser (eine Dezimalstelle statt gerundet).
- Veröffentlicht token-frei via `pnpm publish:sanity` (Editor-Token aus `.env.local`).

Hinweis: Nach Schema-Änderungen muss das hosted Studio neu deployt werden
(`pnpm --filter @gurt/studio deploy`).

### v0.2.0 — 2026-06-04 (Abend)

- **Neuer Beitrag „Schuldenbremse: Wie viel Schulden verträgt Deutschland?"** in neuer Rubrik
  **Haushalt** — Schuldenquote-Linie mit Maastricht-Referenz, EU-Beeswarm (27 Länder),
  Investitionsbedarf-Treemap (IMK/IW), 5-Stimmen-Diskurs, Methodik. Live in Sanity
  (11 veröffentlichte Beiträge).
- **10 kuratierte Themen-Radar-Ideen** als `idee`-Dokumente im Studio
  (`scripts/seed-ideen.mjs` / `pnpm seed:ideen`).
- **DX:** Editor-Token dauerhaft in `.env.local` → `pnpm publish:sanity` und `pnpm seed:ideen`
  ohne Token-Eingabe.

### v0.1.2 — 2026-06-04 (Abend)

- **OG-/Share-Bilder** auf **hellen** Hintergrund umgestellt; Marken-Schrift-Ersatz
  **Fira Sans + Fira Mono** (OFL, FF-Info-nah, Spiekermann) in `next/og` eingebettet
  (`app/og-fonts.ts` lädt die TTFs aus `app/fonts/` via `fs`). Kicker/Meta in Mono
  („Correspondence"-Charakter). FF Info selbst ist als Typekit-Webfont nicht einbettbar.

### v0.1.1 — 2026-06-04 (Tagesabschluss)

Stabiler Tagesabschluss-Stand nach v0.1.0.

- **Chord-Beitrag** live in Sanity; Partei-Farben auf die kanonische Palette
  „GURT Vibrant" abgeglichen (nur CDU/CSU-Grau als dokumentierte Ausnahme).
- **Korrektur-Hinweis** je Beitrag gekürzt; Postfach `hinweise@gurt.info` eingerichtet
  (iCloud+ Custom Domain, MX/SPF/DKIM via Vercel-DNS) — Zustellung getestet.
- **DIP-Datensatz** mit produktivem API-Key aktualisiert (Energie-Vorgänge bis 2026).
- **DX:** `pnpm publish:sanity` + automatisches Laden von `.env.local` beim Import
  (Editor-Token einmalig hinterlegen, kein Inline-Token mehr nötig).

Commits `89d258e..4d6d9aa`.

### v0.1.0 — 2026-06-04

Erster formaler Meilenstein. Stabiler, verifizierter Stand der Plattform.

- **Inhalte:** 10 veröffentlichte Beiträge (Energie, Verteidigung, Migration, Wohnen,
  Rente, Klima, Sozialstaat, EU-Daten, DIP-Parlament, „Wer stimmt mit wem?").
- **Chart-Vokabular:** Balken, Linie, Fläche/Stream, Waffle, Treemap, Sankey,
  Verhältnis/Icon-Array, Beeswarm, Positions-Matrix, **Chord** (neu).
- **Funktionen:** Volltextsuche `/suche`, ISR auf den Listen-Routen, Hinweis-/
  Korrektur-Link je Beitrag (mailto), OG-/Share-Bilder, Sitemap + RSS, Themen-Radar.
- **Marke:** FF-Info-Typografie durchgängig (inkl. Charts), Palette „GURT Vibrant";
  Chord nutzt dokumentierte Partei-Identitätsfarben aus der kanonischen Palette.
- **Daten:** Adapter für data.europa.eu, Bundestag-DIP und GENESIS-Online (Destatis).

Rollback auf diesen Stand: siehe oben (`git switch -c hotfix v0.1.0` bzw. Vercel-Promote).
