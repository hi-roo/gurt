import { Container, Heading, Section } from '@gurt/ui';
import { FlowHero } from '../../../components/lab/flow-hero';

const SERIES: Record<string, number[]> = {
  verteidigung: [1.16, 1.16, 1.18, 1.21, 1.23, 1.33, 1.49, 1.43, 1.48, 1.61, 2.0],
  sozialschutz: [28.7, 28.6, 28.9, 29.2, 29.0, 29.2, 29.6, 32.5, 31.5, 29.9, 29.9],
  schulden: [82, 80, 79, 77, 75, 71, 69, 61, 59.6, 68.8, 69, 66, 63, 62.5, 63.5],
  regelsatz: [449, 502, 563, 563, 563],
};

type Variant = { title: string; ressort: string; v: number[]; s: string; tone: 'paper' | 'ink' };
const VARIANTS: Variant[] = [
  { title: 'Sozialstaat: Bremse oder Stütze?', ressort: 'Wirtschaft', v: SERIES.sozialschutz!, s: 'sozialstaat-bremse-oder-stuetze', tone: 'paper' },
  { title: 'Wie viel Schulden verträgt Deutschland?', ressort: 'Finanzen', v: SERIES.schulden!, s: 'schuldenbremse-wie-viel-schulden', tone: 'ink' },
  { title: 'Wie hoch ist das Bürgergeld wirklich?', ressort: 'Soziales', v: SERIES.regelsatz!, s: 'buergergeld-grundsicherung', tone: 'ink' },
];

export default function LabHeroPage() {
  return (
    <>
      {/* Hero ≤ 100vh, Text IM Bild (unten verankert) */}
      <section className="relative isolate flex h-[86vh] max-h-[900px] min-h-[460px] flex-col justify-end overflow-hidden bg-[#0e1326]">
        <FlowHero values={SERIES.verteidigung!} seed="zeitenwende-in-zahlen" tone="ink" motion="always" className="absolute inset-0 h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1326] via-[#0e1326]/45 to-[#0e1326]/10" />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-14 sm:pb-20">
          <p className="font-mono text-xs uppercase tracking-widest text-white/60">Verteidigung</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.04] text-white sm:text-6xl">
            Erst 2024 an der NATO-Marke von zwei Prozent.
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-lg text-white/80">
            Das Feld codiert die echte Reihe — die Spuren steigen dort, wo die Ausgaben steigen.
          </p>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-widest text-white/45">
            NATO · Verteidigungsausgaben in % des BIP, 2014–2024
          </p>
        </div>
      </section>

      <Container width="full">
        <Section>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            Datengetriebene Identität (Flow-Feld)
          </p>
          <Heading level={2} className="mt-3 text-3xl">
            Jeder Beitrag, ein eigenes Bild
          </Heading>
          <p className="mt-4 max-w-2xl text-pretty text-muted">
            Aus der echten Reihe je Beitrag: Silhouette aus den Werten, Dichte aus der Streuung, Farbe
            aus der Magnitude — Richtung, Wirbelgröße und Töne aus dem Slug. Titel im Bild,{' '}
            <strong>Bewegung nur beim Überfahren</strong> (ruhiger, leichter).
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {VARIANTS.map((x) => (
              <figure key={x.s} className="group relative aspect-[4/5] overflow-hidden border border-line">
                <FlowHero values={x.v} seed={x.s} tone={x.tone} motion="hover" className="absolute inset-0 h-full" />
                <div
                  className={`pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t ${
                    x.tone === 'ink' ? 'from-[#0e1326] via-[#0e1326]/55' : 'from-white via-white/60'
                  } to-transparent`}
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-4">
                  <p className={`font-mono text-[10px] uppercase tracking-widest ${x.tone === 'ink' ? 'text-white/60' : 'text-subtle'}`}>
                    {x.ressort}
                  </p>
                  <h3 className={`mt-1 font-display text-lg font-semibold leading-tight ${x.tone === 'ink' ? 'text-white' : 'text-ink'}`}>
                    {x.title}
                  </h3>
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="mt-14 max-w-2xl text-sm text-muted">
            Discovery-Notiz: Param-Streuung je Seed (Richtung, Wirbelgröße/-zahl, kontrastierende Töne)
            gegen den „beliebig"-Eindruck. Nächster Schritt nach Freigabe: die <em>kk.dk-Shell</em>
            drumherum (ruhige Struktur, „Verstehen"-Index statt Feed, prominente Suche).
          </p>
        </Section>
      </Container>
    </>
  );
}
