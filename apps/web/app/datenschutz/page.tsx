import type { Metadata } from 'next';
import { Container, Heading, Prose, Section } from '@gurt/ui';

export const metadata: Metadata = {
  title: 'Datenschutz',
  description:
    'Datenschutzerklärung für gurt.info — welche Daten verarbeitet werden und welche Rechte du hast.',
};

export default function DatenschutzPage() {
  return (
    <Container width="prose">
      <Section>
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Rechtliches</p>
        <Heading level={1} className="mt-3">
          Datenschutzerklärung
        </Heading>
        <Prose className="mt-8">
          <p>
            GURT verarbeitet so wenige personenbezogene Daten wie möglich. Die Website setzt{' '}
            <strong>keine Cookies zu Analyse- oder Marketingzwecken</strong>, bindet keine Tracking-
            oder Werbedienste ein und führt keine Reichweitenmessung durch.
          </p>

          <h2>Verantwortlicher</h2>
          <p>
            Ronny Puschmann
            <br />
            Beuthstr. 5
            <br />
            10117 Berlin
            <br />
            E-Mail: <a href="mailto:ronny.puschmann@gurt.info">ronny.puschmann@gurt.info</a>
          </p>

          <h2>Hosting und Server-Logfiles</h2>
          <p>
            Die Website wird bei der Vercel Inc. (340 S Lemon Ave #4133, Walnut, CA 91789, USA)
            betrieben. Beim Aufruf verarbeitet der Server technisch notwendige Daten (z. B.
            IP-Adresse, Zeitpunkt, angeforderte Seite, Browsertyp) in Logfiles, um Auslieferung und
            Sicherheit zu gewährleisten. Rechtsgrundlage ist das berechtigte Interesse an einem
            stabilen, sicheren Betrieb (Art. 6 Abs. 1 lit. f DSGVO). Mit Vercel besteht ein
            Auftragsverarbeitungsvertrag; eine Übermittlung in die USA wird über die
            EU-Standardvertragsklauseln abgesichert.
          </p>

          <h2>Schriftarten (Adobe Fonts)</h2>
          <p>
            Zur einheitlichen Darstellung lädt die Seite Schriften über Adobe Fonts (Adobe Systems
            Software Ireland Ltd.). Beim Laden der Schrift wird deine IP-Adresse an Adobe übermittelt.
            Rechtsgrundlage ist das berechtigte Interesse an einer konsistenten Typografie (Art. 6
            Abs. 1 lit. f DSGVO). Nach Angaben des Anbieters werden dabei keine Cookies gesetzt.
          </p>

          <h2>Kontaktaufnahme</h2>
          <p>
            Wenn du uns per E-Mail kontaktierst — etwa über einen Hinweis- oder Korrektur-Link —
            verarbeiten wir deine Angaben ausschließlich zur Bearbeitung der Anfrage (Art. 6 Abs. 1
            lit. f DSGVO). Die Daten werden gelöscht, sobald sie nicht mehr erforderlich sind.
          </p>

          <h2>Deine Rechte</h2>
          <p>
            Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
            Datenübertragbarkeit sowie Widerspruch gegen Verarbeitungen, die auf einem berechtigten
            Interesse beruhen. Außerdem kannst du dich bei einer Datenschutz-Aufsichtsbehörde
            beschweren; zuständig ist die Berliner Beauftragte für Datenschutz und
            Informationsfreiheit.
          </p>

          <p className="text-sm text-subtle">Stand: Juni 2026.</p>
        </Prose>
      </Section>
    </Container>
  );
}
