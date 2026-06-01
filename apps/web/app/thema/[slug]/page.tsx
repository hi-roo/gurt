import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container, Heading, Section } from '@gurt/ui';
import { ArticleList } from '../../../components/article-list';
import { Breadcrumbs } from '../../../components/breadcrumbs';
import { getThemeBySlug, getThemes } from '../../../content/repository';

export const dynamicParams = true;

export async function generateStaticParams() {
  const themes = await getThemes();
  return themes.map((thema) => ({ slug: thema.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getThemeBySlug(slug);
  if (!data) return {};
  return {
    title: data.theme.name,
    description: `Beiträge zum Thema ${data.theme.name}.`,
  };
}

export default async function ThemePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getThemeBySlug(slug);
  if (!data) notFound();

  const { theme, articles } = data;

  return (
    <Container width="full">
      <Section className="max-w-3xl">
        <Breadcrumbs
          items={[
            { label: 'Start', href: '/' },
            { label: 'Themen', href: '/themen' },
            { label: theme.name },
          ]}
        />
        <p className="mt-6 font-mono text-xs uppercase tracking-widest text-accent">Thema</p>
        <Heading level={1} className="mt-3">
          {theme.name}
        </Heading>
        <p className="mt-4 text-muted">
          {theme.count} {theme.count === 1 ? 'Beitrag' : 'Beiträge'}
        </p>
      </Section>

      <Section className="border-t border-line">
        <ArticleList articles={articles} />
      </Section>
    </Container>
  );
}
