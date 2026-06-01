import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Callout, Container, Heading, Lead } from '@gurt/ui';
import { ArticleBody } from '../../../components/article-body';
import { ArticleList } from '../../../components/article-list';
import { Breadcrumbs } from '../../../components/breadcrumbs';
import { ThemeTags } from '../../../components/theme-tags';
import { getArticleBySlug, getArticleSlugs, getRelatedArticles } from '../../../content/repository';
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
  const related = await getRelatedArticles(slug, article.themen);
  const primaryTheme = article.themen?.find((thema) => thema.slug);

  return (
    <article className="pb-24">
      <Container width="prose" as="header" className="pt-12">
        <Breadcrumbs
          items={[
            { label: 'Start', href: '/' },
            ...(primaryTheme?.slug
              ? [{ label: primaryTheme.name, href: `/thema/${primaryTheme.slug}` }]
              : []),
          ]}
        />
        {article.themen?.length ? <ThemeTags themen={article.themen} className="mt-5" /> : null}
        <Heading level={1} className="mt-4">
          {article.titel}
        </Heading>
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

      {related.length ? (
        <Container width="full" className="mt-20 border-t border-line pt-10">
          <h2 className="font-mono text-xs uppercase tracking-widest text-subtle">
            Verwandte Beiträge
          </h2>
          <div className="mt-2">
            <ArticleList articles={related} compact />
          </div>
        </Container>
      ) : null}
    </article>
  );
}
