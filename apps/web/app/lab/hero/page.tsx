import { Container, Heading, Section } from '@gurt/ui';
import { FlowHero } from '../../../components/lab/flow-hero';

// Echte Reihen aus bestehenden Beiträgen — das Feld codiert sie.
const SERIES: Record<string, number[]> = {
  verteidigung: [1.16, 1.16, 1.18, 1.21, 1.23, 1.33, 1.49, 1.43, 1.48, 1.61, 2.0],
  sozialschutz: [28.7, 28.6, 28.9, 29.2, 29.0, 29.2, 29.6, 32.5, 31.5, 29.9, 29.9],
  schulden: [82, 80, 79, 77, 75, 71, 69, 61, 59.6, 68.8, 69, 66, 63, 62.5, 63.5],
  regelsatz: [449, 502, 563, 563, 563],
};

const VARIANTS = [
  { t: 'Sozialschutzquote 2013–2023', v: SERIES.sozialschutz!, s: 'sozialstaat-bremse-oder-stuetze', tone: 'paper' as const },
  { t: 'Schuldenquote 2010–2025', v: SERIES.schulden!, s: 'schuldenbremse-wie-viel-schulden', tone: 'ink' as const },
  { t: 'Bürgergeld-Regelsatz 2022–2026', v: SERIES.regelsatz!, s: 'buergergeld-grundsicherung', tone: 'paper' as const },
];

export default function LabHeroPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#0e1326]">
        <FlowHero
          values={SERIES.verteidigung!}
          seed="zeitenwende-in-zahlen"
          tone="ink"
          className="absolute inset-0 h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e1326] via-[#0e1326]/65 to-[#0e1326]/10" />
        <div className="relative z-10 mx-auto max-w-5xl px-6 py-28 sm:py-40">
          <p className="font-mono text-xs uppercase tracking-widest text-white/60">
            Verteidigung · datengetriebenes Bild
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.04] text-white sm:text-6xl">
            Erst 2024 an der NATO-Marke von zwei Prozent.
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg text-white/80">
            Das Feld ist kein Schmuck — es codiert die echte Reihe: Die Spuren steigen dort, wo die
            Ausgaben steigen.
          </p>
          <p className="mt-12 font-mono text-[11px] uppercase tracking-widest text-white/45">
            Quelle: NATO · Verteidigungsausgaben in % des BIP, 2014–2024
          </p>
        </div>
      </section>

      <Container width="full">
        <Section>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            Neue Richtung · Datengetriebene Identität (Flow-Feld)
          </p>
          <Heading level={2} className="mt-3 text-3xl">
            Andere Daten — anderes Bild
          </Heading>
          <p className="mt-4 max-w-2xl text-pretty text-muted">
            Dasselbe System, gespeist mit der echten Reihe je Beitrag: Silhouette aus den Werten,
            Dichte aus der Streuung, Farbe aus der Magnitude, Basisfeld aus dem Slug. Ehrlich statt
            dekorativ — die Marke wächst mit den Daten.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {VARIANTS.map((x) => (
              <figure key={x.s}>
                <FlowHero values={x.v} seed={x.s} tone={x.tone} className="h-56 border border-line" />
                <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-widest text-subtle">
                  {x.t}
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="mt-14 max-w-2xl text-sm text-muted">
            Discovery-Notiz: Hier zuerst der <strong>Kern</strong> — der datengebundene generative
            Hero (Flow-Feld, animiert; <code>prefers-reduced-motion</code> → statisch; pausiert
            außerhalb Viewport). Nächster Schritt nach Freigabe: die <em>kk.dk-Shell</em> drumherum
            (ruhige Struktur, „Verstehen"-Index statt Feed, prominente Suche, Accessibility-first).
          </p>
        </Section>
      </Container>
    </>
  );
}
