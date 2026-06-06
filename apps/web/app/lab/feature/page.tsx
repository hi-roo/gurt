import Link from 'next/link';
import { Container, Heading, Section, linkClass } from '@gurt/ui';
import { getArticles } from '../../../content/repository';
import { BrandedTeaser } from '../../../components/lab/branded-teaser';

// Discovery-Prototyp (Spur 01 + 02). noindex erbt aus /lab/layout.
export default async function LabFeaturePage() {
  const articles = await getArticles();
  const feature = articles[0];
  const more = articles.slice(1, 4);
  const topics = ['Energie', 'Rente', 'Verteidigung', 'Wohnen', 'Klima', 'Schuldenbremse', 'Bürgergeld', 'Migration'];

  return (
    <Container width="full">
      <Section>
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          Spur 01 + 02 · Branded Interaction + Feature-Hero
        </p>

        {feature ? (
          <article className="mt-8 grid items-center gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-subtle">
                Im Fokus{feature.ressort ? ` · ${feature.ressort}` : ''}
              </p>
              <Heading level={2} className="mt-4 text-4xl leading-[1.05] lg:text-6xl">
                {feature.titel}
              </Heading>
              {feature.standfirst ? (
                <p className="mt-6 max-w-xl text-pretty text-lg text-muted">{feature.standfirst}</p>
              ) : null}
              <Link href={`/beitrag/${feature.slug}`} className={`mt-7 inline-block ${linkClass}`}>
                Beitrag lesen →
              </Link>
            </div>
            <BrandedTeaser seed={feature.slug} ratio="aspect-[4/3]" className="w-full" />
          </article>
        ) : null}

        {more.length ? (
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {more.map((a) => (
              <Link key={a.slug} href={`/beitrag/${a.slug}`} className="group block">
                <BrandedTeaser seed={a.slug} ratio="aspect-[3/2]" className="w-full" />
                <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-subtle">
                  {a.ressort ?? 'Beitrag'}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold text-ink group-hover:text-accent">
                  {a.titel}
                </h3>
              </Link>
            ))}
          </div>
        ) : null}

        <div className="mt-20 border-t border-line pt-10">
          <p className="font-mono text-xs uppercase tracking-widest text-subtle">
            Generative Themen-Bilder — deterministisch je Seed (gleicher Seed → gleiches Bild)
          </p>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {topics.map((t) => (
              <div key={t}>
                <BrandedTeaser seed={t} ratio="aspect-square" className="w-full" />
                <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-subtle">{t}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-12 max-w-2xl text-sm text-muted">
          Discovery-Notiz: Die Teaser sind <strong>deterministisch</strong> aus Slug/Thema — jeder
          Beitrag bekommt ein stabiles, marken-konformes Bild ohne Foto. Nächste Verfeinerung:
          optionaler <em>Kennzahl-Anker</em> im Feature-Hero (Astrum-Stil) und eine sanft animierte
          Variante mit <code>prefers-reduced-motion</code>-Fallback.
        </p>
      </Section>
    </Container>
  );
}
