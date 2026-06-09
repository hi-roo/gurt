import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Heading, Lead, Prose, Section } from '@gurt/ui';
import { CopperCTA } from '../../components/copper';

export const metadata: Metadata = {
  title: 'Über GURT',
  description:
    'GURT ist eine nicht-kommerzielle, gemeinwohlorientierte Daten-Journalismus-Plattform: politische Leitlinien aus Deutschland und der EU, datenbasiert und kritisch eingeordnet.',
};

export default function UeberPage() {
  return (
    <>
    <Container width="prose">
      <Section>
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Über</p>
        <Heading level={1} className="mt-3">
          Über GURT
        </Heading>
        <Lead className="mt-5">
          GURT erklärt politische Leitlinien aus Deutschland und der EU durch Datenvisualisierung
          und anschauliche Beispiele — kritisch, quellennah und ohne parteipolitische Vereinnahmung.
        </Lead>
        <Prose className="mt-8">
          <p>
            Viele politische Entscheidungen entstehen in Zielkonflikten. Eine Maßnahme kann
            kurzfristig notwendig sein und langfristig neue Probleme schaffen. Sie kann eine Gruppe
            entlasten und eine andere belasten. Sie kann ökonomisch plausibel sein und
            sozialpolitisch umstritten bleiben.
          </p>
          <p>GURT macht diese Spannungen sichtbar.</p>
          <p>
            Nicht, um alles gleich gültig erscheinen zu lassen. Sondern um besser zu zeigen, unter
            welchen Annahmen eine Position tragfähig ist — und wo ihre Grenzen liegen.
          </p>
          <p>
            Unsere redaktionelle Haltung liegt in der Methode: Quellen offenlegen, Begriffe klären,
            Pro- und Contra-Argumente sichtbar machen, Datenstand nennen und unterschiedliche
            Perspektiven nicht künstlich glätten.
          </p>
          <p>
            GURT ordnet ein, ohne Propaganda zu betreiben. GURT vereinfacht, ohne falsche
            Eindeutigkeit zu erzeugen.
          </p>

          <h2>Was GURT unter Neutralität versteht</h2>
          <p>
            GURT ist nicht neutral gegenüber Fakten, Quellen oder methodischen Fehlern. Aber GURT
            vermeidet parteipolitische Vorfestlegungen.
          </p>
          <p>
            GURT zeigt, welche Ziele eine Maßnahme verfolgt, welche Annahmen sie trägt, welche
            Gegenargumente relevant sind und wo die Datenlage endet.
          </p>
          <p>
            Neutralität bedeutet für GURT nicht Gleichgültigkeit. Sie bedeutet: Die Bewertung soll
            nicht versteckt im Framing liegen, sondern nachvollziehbar aus Quellen, Kriterien und
            Argumenten entstehen.
          </p>

          <h2>Quellen &amp; Methodik</h2>
          <p>
            GURT arbeitet mit offiziellen und primären Quellen, etwa Datenportalen der EU,
            Dokumenten des Deutschen Bundestags, Bundesministerien, Statistikämtern und öffentlich
            zugänglichen Gesetzes- und Verordnungsgrundlagen.
          </p>
          <p>
            Jeder Beitrag weist Quellen, Datenstand und methodische Einschränkungen aus. Eigene
            Berechnungen oder Ableitungen werden als solche kenntlich gemacht.
          </p>
          <p>
            Wo Daten nicht direkt vergleichbar sind, wird das benannt. Wo politische Maßnahmen
            mehrere Wirkungen haben können, werden zentrale Pro- und Contra-Argumente getrennt
            dargestellt. <Link href="/methodik">Mehr dazu auf der Seite Methodik</Link>.
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
    <CopperCTA
      eyebrow="Methode statt Meinung"
      statement={<>Mehrere Dinge können gleichzeitig richtig sein. Aber nicht alles.</>}
      ctaText="Beiträge entdecken"
      ctaHref="/themen"
    />
    </>
  );
}
