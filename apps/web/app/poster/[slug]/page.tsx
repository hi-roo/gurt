import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container, Section } from '@gurt/ui';
import { SignaturePoster } from '@gurt/visualizations';
import { getArticleBySlug, getArticleSlugs } from '../../../content/repository';
import { posterData } from '../../../content/poster';

export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const metadata: Metadata = {
  title: 'Signatur-Poster (PoC)',
  robots: { index: false },
};

export default async function PosterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();
  const data = posterData(article);

  return (
    <Container width="full">
      <Section>
        <div className="mx-auto max-w-[760px]">
          <p className="font-caption text-xs uppercase tracking-widest text-accent">Signatur-Poster · Proof of Concept</p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">{article.titel}</h1>
          <p className="mt-2 text-muted">
            Quadratischer Poster-Frame (1:1) aus den Beitragsdaten — als Share-Bild oder Aushang. Erzeugt aus der
            „GURT Vibrant"-Palette.
          </p>

          <div className="mt-8 overflow-hidden shadow-sm">
            {data ? (
              <SignaturePoster {...data} />
            ) : (
              <div className="aspect-square w-full bg-surface p-8 text-subtle">
                Für diesen Beitrag liegt kein „Anteil am Ganzen"-Datensatz für ein Poster vor.
              </div>
            )}
          </div>
        </div>
      </Section>
    </Container>
  );
}
