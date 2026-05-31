import Link from 'next/link';
import { Container, Heading, Lead, Section, Tag } from '@gurt/ui';
import { getArticles } from '../content/repository';
import { formatDate } from '../lib/format';

export default async function HomePage() {
  const articles = await getArticles();

  return (
    <Container width="full">
      <Section className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">gurt.report</p>
        <Heading level={1} className="mt-4">
          Politik verständlich machen.
        </Heading>
        <Lead className="mt-5">
          Datenvisualisierung und anschauliche Beispiele, die aktuelle politische Leitlinien
          erklären — und kritisch einordnen. Mehrere Dinge können gleichzeitig richtig sein.
        </Lead>
      </Section>

      <Section className="border-t border-line">
        <h2 className="font-mono text-xs uppercase tracking-widest text-subtle">Beiträge</h2>
        <ul className="mt-6 divide-y divide-line">
          {articles.map((article) => {
            const datum = formatDate(article.veroeffentlicht);
            return (
              <li key={article._id}>
                <Link href={`/beitrag/${article.slug}`} className="group block py-8">
                  {article.themen?.length ? (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {article.themen.map((thema) => (
                        <Tag key={thema.name}>{thema.name}</Tag>
                      ))}
                    </div>
                  ) : null}
                  <h3 className="max-w-3xl font-display text-2xl font-semibold tracking-tight group-hover:text-accent sm:text-3xl">
                    {article.titel}
                  </h3>
                  {article.standfirst ? (
                    <p className="mt-3 max-w-2xl text-muted">{article.standfirst}</p>
                  ) : null}
                  {datum ? <p className="mt-3 text-sm text-subtle">{datum}</p> : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>
    </Container>
  );
}
