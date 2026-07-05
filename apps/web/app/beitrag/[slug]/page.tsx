import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Callout, Container, Heading, Lead } from '@gurt/ui';
import { ArticleBody } from '../../../components/article-body';
import { ArticleList } from '../../../components/article-list';
import { Breadcrumbs } from '../../../components/breadcrumbs';
import { CorrectionNote } from '../../../components/correction-note';
import { ArticleContext } from '../../../components/article-context';
import { ThemeTags } from '../../../components/theme-tags';
import { getArticleBySlug, getArticleSlugs, getRelatedArticles } from '../../../content/repository';
import { ressortBySlug } from '../../../content/ressorts';
import { formatDate } from '../../../lib/format';
import { SITE_NAME, SITE_URL } from '../../../lib/site';

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
  const path = `/beitrag/${article.slug}`;
  return {
    title: article.titel,
    description: article.standfirst,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}${path}`,
      title: article.titel,
      description: article.standfirst,
      publishedTime: article.veroeffentlicht,
      authors: article.autoren?.map((autor) => autor.name),
      section: article.themen?.[0]?.name,
    },
    twitter: { card: 'summary_large_image', title: article.titel, description: article.standfirst },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const datum = formatDate(article.veroeffentlicht);
  const autoren = article.autoren?.map((autor) => autor.name).join(', ');
  const related = await getRelatedArticles(slug, article.themen);
  const ressort = ressortBySlug(article.ressort);

  const path = `/beitrag/${article.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.titel,
    description: article.standfirst,
    inLanguage: 'de-DE',
    datePublished: article.veroeffentlicht,
    image: `${SITE_URL}${path}/opengraph-image`,
    mainEntityOfPage: `${SITE_URL}${path}`,
    author: (article.autoren ?? []).map((autor) => ({ '@type': 'Organization', name: autor.name })),
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    articleSection: article.themen?.map((thema) => thema.name),
  };

  return (
    <article className="pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container width="prose" as="header" className="pt-12">
        <Breadcrumbs
          items={[
            { label: 'Start', href: '/' },
            ...(ressort ? [{ label: ressort.name, href: `/ressort/${ressort.slug}` }] : []),
          ]}
        />
        {article.themen?.length ? <ThemeTags themen={article.themen} className="mt-5" /> : null}
        <Heading level={1} className="mt-4 hyphens-auto">
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
        <CorrectionNote title={article.titel} path={path} />
        <ArticleContext article={article} className="mt-12 border-t border-line pt-8" />
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
