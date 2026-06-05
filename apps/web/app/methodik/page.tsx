import type { Metadata } from 'next';
import { Container, Heading, Lead, Prose, Section } from '@gurt/ui';

export const metadata: Metadata = {
  title: 'Methodik',
  description:
    'Wie GURT arbeitet: offizielle Quellen, strukturelle Neutralität, ehrliche Visualisierung und transparente Werkzeuge.',
};

export default function MethodikPage() {
  return (
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
            Neutralität ist strukturell verankert: Maßnahmen tragen Pro- und Contra-Argumente,
            Positionen werden explizit gemacht, der Ton bleibt urteilsfrei. Leitmotiv ist, dass{' '}
            <strong>mehrere Dinge gleichzeitig richtig sein können</strong>.
          </p>

          <h2>Visualisierung</h2>
          <p>
            Schaubilder folgen dem Grundsatz „Ehrlichkeit vor Effekt": keine irreführenden Achsen,
            Bezugsgrößen und Zeiträume immer sichtbar, Schätzungen und Prognosen als solche markiert.
            Einreihige Verläufe erhalten eine Vergleichsgröße, wo die Einordnung zentral ist. Jede
            Visualisierung hat eine Text-Alternative und einen Tabellen-Fallback (Barrierefreiheit).
          </p>

          <h2>KI-gestützte Werkzeuge</h2>
          <p>
            KI-gestützte Werkzeuge können bei Strukturierung, Prüfung und Formulierung unterstützen;
            die redaktionelle Verantwortung liegt beim Betreiber. Fakten, Quellen und Einordnung
            werden redaktionell geprüft.
          </p>

          <h2>Korrekturen</h2>
          <p>
            Fehler korrigieren wir zeitnah und transparent. Hinweise nehmen wir unter{' '}
            <a href="mailto:hinweise@gurt.info">hinweise@gurt.info</a> entgegen.
          </p>
        </Prose>
      </Section>
    </Container>
  );
}
