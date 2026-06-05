import type { Metadata } from 'next';
import { Container, Heading, Lead, Prose, Section } from '@gurt/ui';

export const metadata: Metadata = {
  title: 'Über GURT',
  description:
    'GURT ist eine nicht-kommerzielle, gemeinwohlorientierte Daten-Journalismus-Plattform: politische Leitlinien aus Deutschland und der EU, datenbasiert und kritisch eingeordnet.',
};

export default function UeberPage() {
  return (
    <Container width="prose">
      <Section>
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Über</p>
        <Heading level={1} className="mt-3">
          Über GURT
        </Heading>
        <Lead className="mt-5">
          GURT erklärt politische Leitlinien aus Deutschland und der EU durch Datenvisualisierung und
          anschauliche Beispiele — kritisch, aber nicht propagandistisch.
        </Lead>
        <Prose className="mt-8">
          <p>
            Politik kommuniziert heute fast ausschließlich in Textform und erwartet von den Medien
            eine verständliche Aufarbeitung. GURT übersetzt diese Komplexität in interaktive
            Schaubilder — und macht sichtbar, dass <strong>mehrere Dinge gleichzeitig richtig sein
            können</strong>.
          </p>
          <p>
            Neutralität ist bei uns strukturell verankert: Maßnahmen tragen Pro- und Contra-Argumente,
            Positionen werden explizit gemacht, und jede Zahl hat eine ausgewiesene Quelle. Wir ordnen
            ein, ohne zu werten.
          </p>
          <h2>Quellen &amp; Methodik</h2>
          <p>
            Wir nutzen ausschließlich offizielle und primäre Quellen — etwa das EU-Open-Data-Portal
            (data.europa.eu) und das Dokumentations- und Informationssystem des Deutschen Bundestags
            (DIP). Datenstand und Methodik sind an jedem Beitrag ausgewiesen.
          </p>
          <h2>Nicht-kommerziell &amp; quelloffen</h2>
          <p>
            GURT ist ein nicht-kommerzielles, gemeinwohlorientiertes Projekt — kein anerkannter
            gemeinnütziger Träger im Sinne der Abgabenordnung. Der Code steht unter der MIT-Lizenz,
            die Inhalte unter CC BY 4.0; die Lizenz jedes Datensatzes ist gesondert ausgewiesen.
          </p>
        </Prose>
      </Section>
    </Container>
  );
}
