import Link from 'next/link';
import { Container, Heading, Lead, Section } from '@gurt/ui';
import { ArticleList } from '../components/article-list';
import { getArticles } from '../content/repository';

export default async function HomePage() {
  const articles = await getArticles();

  return (
    <Container width="full">
      <Section className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">gurt.info</p>
        <Heading level={1} className="mt-4">
          Politik verständlich machen.
        </Heading>
        <Lead className="mt-5">
          Datenvisualisierung und anschauliche Beispiele, die aktuelle politische Leitlinien
          erklären — und kritisch einordnen. Mehrere Dinge können gleichzeitig richtig sein.
        </Lead>
      </Section>

      <Section className="border-t border-line">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-mono text-xs uppercase tracking-widest text-subtle">
            Aktuelle Beiträge
          </h2>
          <Link href="/themen" className="whitespace-nowrap text-sm text-muted hover:text-ink">
            Alle Themen →
          </Link>
        </div>
        <div className="mt-2">
          <ArticleList articles={articles} />
        </div>
      </Section>
    </Container>
  );
}
