import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Heading, Lead, Prose, Section } from '@gurt/ui';
import { CopperCTA } from '../../components/copper';

export const metadata: Metadata = {
  title: 'Methodik',
  description:
    'Wie GURT arbeitet: offizielle Quellen, strukturelle Neutralität, ehrliche Visualisierung und transparente Werkzeuge.',
};

export default function MethodikPage() {
  return (
    <>
    <Container width="prose">
      <Section>
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Transparenz</p>
        <Heading level={1} className="mt-3">
          Methodik
        </Heading>
        <Lead className="mt-5">
          GURT ist ein nicht-kommerzielles, quelloffenes Informationsprojekt. Beiträge werden auf
          Basis offizieller und primärer Quellen erstellt.
        </Lead>
        <Prose className="mt-8">
          <h2>Quellen</h2>
          <p>
            Wir stützen uns auf amtliche und primäre Quellen — Statistikämter, Ministerien, Eurostat,
            den Bundestag und vergleichbare Herausgeber. Jede Zahl trägt eine ausgewiesene Quelle;
            Datenstand und Abrufdatum stehen an jedem Beitrag. Sekundärquellen werden vermieden, wo
            eine Primärquelle erreichbar ist.
          </p>

          <h2>Neutralität</h2>
          <p>
            GURT ist nicht neutral gegenüber Fakten, Quellen oder methodischen Fehlern — vermeidet
            aber parteipolitische Vorfestlegungen. Die redaktionelle Haltung liegt in der Methode:
            Ziele und Annahmen einer Maßnahme benennen, relevante Gegenargumente zeigen, die Grenze
            der Datenlage markieren. Die Bewertung soll nicht versteckt im Framing liegen, sondern
            nachvollziehbar aus Quellen, Kriterien und Argumenten entstehen. Leitmotiv:{' '}
            <strong>mehrere Dinge können gleichzeitig richtig sein — aber nicht alles</strong>.
          </p>

          <h2>Visualisierung</h2>
          <p>
            Schaubilder folgen dem Grundsatz „Ehrlichkeit vor Effekt“: keine irreführenden Achsen,
            Bezugsgrößen und Zeiträume immer sichtbar, Schätzungen und Prognosen als solche markiert.
            Einreihige Verläufe erhalten eine Vergleichsgröße, wo die Einordnung zentral ist. Jede
            Visualisierung hat eine Text-Alternative und einen Tabellen-Fallback (Barrierefreiheit).
          </p>

          <h2>KI-gestützte Werkzeuge</h2>
          <p>
            KI-gestützte Werkzeuge können bei Strukturierung, Prüfung und Formulierung unterstützen;
            die redaktionelle Verantwortung liegt beim Betreiber. Fakten, Quellen und Einordnung
            werden redaktionell geprüft. Im Detail:{' '}
            <Link href="/transparenz">KI-Verwendung bei GURT</Link>.
          </p>

          <h2>Korrekturen</h2>
          <p>
            Fehler korrigieren wir zeitnah und transparent. Hinweise nehmen wir unter{' '}
            <a href="mailto:hinweise@gurt.info">hinweise@gurt.info</a> entgegen.
          </p>
        </Prose>
      </Section>
    </Container>
    <CopperCTA
      eyebrow="Offen & nachvollziehbar"
      statement={<>Jede Zahl trägt eine Quelle. Jede Einordnung ihren Weg.</>}
      ctaText="Beiträge entdecken"
      ctaHref="/themen"
    />
    </>
  );
}
