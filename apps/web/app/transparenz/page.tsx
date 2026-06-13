import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Heading, Lead, Prose, Section } from '@gurt/ui';
import { CopperCTA } from '../../components/copper';

export const metadata: Metadata = {
  title: 'KI-Verwendung bei GURT',
  description:
    'KI-Verwendung bei GURT: Wo Künstliche Intelligenz hilft — Recherche, Code, Redaktion, Schaubilder, Daten-Pipeline, Themen-Radar — und wo Menschen entscheiden. KI bereitet vor, der Mensch verantwortet und gibt frei.',
};

export default function TransparenzPage() {
  return (
    <>
      <Container width="prose">
        <Section>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Transparenz</p>
          <Heading level={1} className="mt-3">
            KI-Verwendung bei GURT
          </Heading>
          <Lead className="mt-5">
            GURT entsteht KI-gestützt: Recherche, Code, Texte und Schaubilder werden mit einem
            KI-System (Anthropic Claude, über das Entwickler-Werkzeug Claude Code) erarbeitet. Diese
            Seite legt offen, wo die KI hilft — und wo Menschen entscheiden.
          </Lead>
          <Prose className="mt-8">
            <h2>Der Grundsatz</h2>
            <p>
              KI ist hier ein Werkzeug, kein Autopilot. Sie beschleunigt Recherche, Entwurf und
              Prüfung; die redaktionelle Verantwortung und jede Veröffentlichung liegen beim
              Betreiber. Nichts geht ohne ausdrückliche menschliche Freigabe live — weder ein Beitrag
              noch ein Datenimport.
            </p>

            <h2>Technik &amp; Code</h2>
            <p>
              Die Plattform — ein Monorepo aus Next.js (Frontend), Sanity (Redaktion), einer eigenen
              Visualisierungs-Bibliothek und getypten Datenadaptern — wird KI-unterstützt entwickelt.
              Code wird vorgeschlagen, automatisch geprüft (Typprüfung, Linting, Tests) und im Browser
              verifiziert; ein Mensch sichtet die Änderungen, führt sie zusammen und stellt sie online.
            </p>

            <h2>Recherche &amp; Quellen</h2>
            <p>
              Jede Zahl braucht eine Quelle — bevorzugt amtlich und primär (Statistikämter,
              Ministerien, Eurostat, Bundestag). Für strittige Aussagen läuft eine mehrstufige
              Recherche, in der mehrere unabhängige KI-Durchgänge dieselbe Behauptung gegenprüfen
              (Wortlaut, Datum, Beleg), bevor sie verwendet wird. Wörtliche Zitate realer Personen
              werden an der Originalquelle verifiziert, nie erfunden. Quellenwahl und Schlussprüfung
              verantwortet der Mensch.
            </p>

            <h2>Redaktion &amp; Storytelling</h2>
            <p>
              Beiträge folgen festen redaktionellen Playbooks: neutrale Stimme, Zielkonflikte sichtbar
              machen, Pro und Contra getrennt und je belegt. Vor der Freigabe durchläuft jeder neue
              Beitrag eine Prüfstraße aus mehreren unabhängigen KI-Desks (Faktencheck, Neutralität,
              Methodik, Visualisierung/Barrierefreiheit, Technik) — eine Gegenkontrolle, die gezielt
              nach Schwächen sucht. Die Empfehlung daraus prüft und entscheidet der Mensch.
            </p>

            <h2>Schaubilder &amp; Barrierefreiheit</h2>
            <p>
              Charts entstehen aus bequellten Daten nach dem Grundsatz „Ehrlichkeit vor Effekt“:
              sichtbare Bezugsgrößen, als solche markierte Prognosen, Farbe nie als alleiniger
              Bedeutungsträger. Jede Visualisierung hat eine Text-Alternative und einen
              Tabellen-Fallback. Charttyp-Wahl und Datenprüfung bleiben menschliche Entscheidungen.
            </p>

            <h2>Daten-Pipeline</h2>
            <p>
              Daten kommen über getypte Adapter mit Schema-Validierung und Herkunftsnachweis aus
              offiziellen Schnittstellen. Einzelne, klar gekennzeichnete Datensätze werden wöchentlich
              automatisch aktualisiert; die Anbindung neuer Quellen und ihre Validierung macht der
              Mensch.
            </p>

            <h2>Themen-Radar</h2>
            <p>
              Ein Skript wertet regelmäßig öffentliche Parlaments-Signale aus und schlägt mögliche
              Themen als strukturierte Briefe vor. Diese Vorschläge werden <em>nicht</em> automatisch
              veröffentlicht — ob aus einem Signal ein Beitrag wird, entscheidet die Redaktion.
            </p>

            <h2>Wo die KI aufhört</h2>
            <p>
              Kein automatisches Veröffentlichen: Beitrag und Datenimport gehen nur nach
              ausdrücklicher Freigabe live. Keine parteipolitische Wertung. Keine Zahl ohne Quelle,
              keine erfundenen Zitate. Fehler korrigieren wir zeitnah und transparent — Hinweise an{' '}
              <a href="mailto:hinweise@gurt.info">hinweise@gurt.info</a>.
            </p>

            <h2>Warum wir das offenlegen</h2>
            <p>
              GURTs Glaubwürdigkeit lebt von Nachvollziehbarkeit. Wer Quellen offenlegt, sollte auch
              das Werkzeug offenlegen, mit dem er arbeitet. Auch diese Seite entstand KI-gestützt —
              geprüft und freigegeben von einem Menschen. Mehr zur Arbeitsweise auf der{' '}
              <Link href="/methodik">Methodik-Seite</Link>.
            </p>
          </Prose>
        </Section>
      </Container>
      <CopperCTA
        eyebrow="Werkzeug, nicht Autopilot"
        statement={<>KI bereitet vor. Menschen verantworten und geben frei.</>}
        ctaText="Zur Methodik"
        ctaHref="/methodik"
      />
    </>
  );
}
