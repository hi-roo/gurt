import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Callout, Container, Heading, Lead, Tag } from '@gurt/ui';
import { ArticleBody } from '../../../components/article-body';
import { getArticleBySlug, getArticleSlugs } from '../../../content/repository';
import { formatDate } from '../../../lib/format';

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return { title: article.titel, description: article.standfirst };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const datum = formatDate(article.veroeffentlicht);
  const autoren = article.autoren?.map((autor) => autor.name).join(', ');

  return (
    <article className="pb-24">
      <Container width="prose" as="header" className="pt-16">
        {article.themen?.length ? (
          <div className="mb-4 flex flex-wrap gap-2">
            {article.themen.map((thema) => (
              <Tag key={thema.name}>{thema.name}</Tag>
            ))}
          </div>
        ) : null}
        <Heading level={1}>{article.titel}</Heading>
        {article.standfirst ? <Lead className="mt-5">{article.standfirst}</Lead> : null}
        {(autoren || datum) && (
          <p className="mt-6 text-sm text-subtle">
            {autoren ? <span>Von {autoren}</span> : null}
            {autoren && datum ? <span> · </span> : null}
            {datum ? <span>{datum}</span> : null}
          </p>
        )}
      </Container>

      <Container width="prose" className="mt-10">
        <ArticleBody body={article.body} />
        {article.methodik ? (
          <Callout title="Methodik & Transparenz" tone="accent" className="mt-12">
            {article.methodik}
          </Callout>
        ) : null}
      </Container>
    </article>
  );
}
