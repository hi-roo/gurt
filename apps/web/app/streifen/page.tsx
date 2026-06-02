import type { Metadata } from 'next';
import { Container, Heading, Section } from '@gurt/ui';
import { GenerativeBanner } from '../../components/generative-banner';
import { BannerGrid } from '../../components/banner-grid';
import { BannerShapes } from '../../components/banner-shapes';

// Interne Vorschau zum Vergleich der Signatur-Streifen-Varianten — nicht verlinkt,
// nicht indexiert, nicht in der Sitemap. Dient nur der Auswahl.
export const metadata: Metadata = {
  title: 'Signatur-Streifen — Varianten (Vorschau)',
  robots: { index: false, follow: false },
};

const labelClass = 'font-mono text-xs uppercase tracking-widest text-subtle';

export default function StreifenVariantenPage() {
  return (
    <Container width="full">
      <Section className="max-w-3xl">
        <p className={`${labelClass} text-accent`}>Intern · Vorschau</p>
        <Heading level={1} className="mt-4">
          Signatur-Streifen — Varianten
        </Heading>
        <p className="mt-4 text-muted">
          Vergleich der aktuellen und zweier interaktiver Varianten (alle in den Chart-Farben).
          Bewege die Maus, um die interaktiven Streifen zu steuern. Diese Seite ist nicht verlinkt
          und nicht indexiert.
        </p>
      </Section>

      <div className="mt-4 space-y-12">
        <figure>
          <figcaption className={`${labelClass} mb-2`}>Aktuell (live) · Flussfeld-Agenten</figcaption>
          <GenerativeBanner />
        </figure>
        <figure>
          <figcaption className={`${labelClass} mb-2`}>
            Variante 1 · Interaktives Farb-Raster (Maus = Auflösung)
          </figcaption>
          <BannerGrid />
        </figure>
        <figure>
          <figcaption className={`${labelClass} mb-2`}>
            Variante 2 · Dreiecke, die zur Maus zeigen
          </figcaption>
          <BannerShapes mode="triangle" />
        </figure>
        <figure>
          <figcaption className={`${labelClass} mb-2`}>
            Variante 3 · Linien, die zur Maus zeigen
          </figcaption>
          <BannerShapes mode="line" />
        </figure>
        <figure>
          <figcaption className={`${labelClass} mb-2`}>
            Variante 4 · Grundformen (Dreieck / Quadrat / Halbkreis), randomisiert, zur Maus
          </figcaption>
          <BannerShapes mode="forms" />
        </figure>
      </div>
    </Container>
  );
}
