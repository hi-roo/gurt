import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container, Heading, Section } from '@gurt/ui';
import { ArticleList } from '../../../components/article-list';
import { Breadcrumbs } from '../../../components/breadcrumbs';
import { getRessortBySlug, getRessorts } from '../../../content/repository';

export const dynamicParams = true;

// ISR: stündlich regenerieren, damit neue Beiträge eines Ressorts automatisch erscheinen.
export const revalidate = 3600;

export async function generateStaticParams() {
  const ressorts = await getRessorts();
  return ressorts.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getRessortBySlug(slug);
  if (!data) return {};
  return {
    title: data.ressort.name,
    description: `Beiträge im Ressort ${data.ressort.name}.`,
  };
}

export default async function RessortPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getRessortBySlug(slug);
  if (!data) notFound();

  const { ressort, articles } = data;

  return (
    <Container width="full">
      <Section className="max-w-3xl">
        <Breadcrumbs items={[{ label: 'Start', href: '/' }, { label: ressort.name }]} />
        <p className="mt-6 font-mono text-xs uppercase tracking-widest text-accent">Ressort</p>
        <Heading level={1} className="mt-3">
          {ressort.name}
        </Heading>
        <p className="mt-4 text-muted">
          {articles.length} {articles.length === 1 ? 'Beitrag' : 'Beiträge'}
        </p>
      </Section>

      <Section className="border-t border-line">
        <ArticleList articles={articles} />
      </Section>
    </Container>
  );
}
