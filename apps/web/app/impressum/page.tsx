import type { Metadata } from 'next';
import { Container, Heading, Prose, Section } from '@gurt/ui';

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Anbieterkennzeichnung und inhaltlich Verantwortlicher für gurt.info.',
};

export default function ImpressumPage() {
  return (
    <Container width="prose">
      <Section>
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Rechtliches</p>
        <Heading level={1} className="mt-3">
          Impressum
        </Heading>
        <Prose className="mt-8">
          <p>
            Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG) und § 18 Abs. 2 Medienstaatsvertrag (MStV).
          </p>

          <h2>Diensteanbieter</h2>
          <p>
            Ronny Puschmann
            <br />
            Beuthstr. 5
            <br />
            10117 Berlin
            <br />
            Deutschland
          </p>

          <h2>Kontakt</h2>
          <p>
            E-Mail: <a href="mailto:hallo@gurt.info">hallo@gurt.info</a>
            <br />
            Web: <a href="https://gurt.info">gurt.info</a>
          </p>

          <h2>Inhaltlich verantwortlich</h2>
          <p>
            Verantwortlich für den journalistisch-redaktionellen Inhalt nach § 18 Abs. 2 MStV:
            <br />
            Ronny Puschmann, Anschrift wie oben.
          </p>

          <h2>Art des Angebots</h2>
          <p>
            GURT ist ein nicht-kommerzielles, gemeinwohlorientiertes Projekt ohne
            Gewinnerzielungsabsicht und kein nach der Abgabenordnung anerkannter gemeinnütziger
            Träger. Der Quellcode steht unter der PolyForm Noncommercial License 1.0.0, die
            redaktionellen Inhalte unter CC BY-NC-ND 4.0; die Lizenz jedes Datensatzes ist gesondert
            ausgewiesen.
          </p>

          <h2>Haftung für Inhalte</h2>
          <p>
            Die Inhalte werden mit größter Sorgfalt und unter Angabe der Quellen erstellt. Für
            Richtigkeit, Vollständigkeit und Aktualität wird gleichwohl keine Gewähr übernommen.
            Hinweise auf Fehler nehmen wir unter{' '}
            <a href="mailto:hinweise@gurt.info">hinweise@gurt.info</a> entgegen und korrigieren sie
            zeitnah.
          </p>

          <h2>Haftung für Links</h2>
          <p>
            Dieses Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
            Einfluss haben. Für diese fremden Inhalte ist stets der jeweilige Anbieter
            verantwortlich.
          </p>

          <h2>Urheberrecht</h2>
          <p>
            Quellcode: PolyForm Noncommercial License 1.0.0. Redaktionelle Inhalte: CC BY-NC-ND 4.0.
            Daten Dritter unterliegen den jeweils ausgewiesenen Lizenzen der Herausgeber.
          </p>

          <h2>Verbraucherstreitbeilegung</h2>
          <p>
            Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </Prose>
      </Section>
    </Container>
  );
}
