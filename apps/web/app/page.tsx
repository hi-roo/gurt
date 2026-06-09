import Link from 'next/link';
import { Container, Heading, Lead, Section } from '@gurt/ui';
import { ArticleList } from '../components/article-list';
import { HomeGenerative } from '../components/home-generative';
import { getArticles } from '../content/repository';

// ISR: Liste stündlich regenerieren, damit neue (auch rein in Sanity gepflegte)
// Beiträge automatisch erscheinen — ohne manuellen Deploy.
export const revalidate = 3600;

export default async function HomePage() {
  const articles = await getArticles();

  return (
    <>
      <HomeGenerative />
      <Container width="full">
      <Section className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">gurt.info</p>
        <Heading level={1} className="mt-4">
          Politik verständlich machen, ohne sie einfach zu machen.
        </Heading>
        <Lead className="mt-5">
          GURT erklärt politische Leitlinien aus Deutschland und der EU mit Datenvisualisierung,
          Quellen und anschaulichen Beispielen.
        </Lead>
        <div className="mt-6 space-y-4 text-pretty text-muted">
          <p>
            Denn politische Entscheidungen entstehen selten in einem einfachen
            Richtig-oder-Falsch. Oft treffen berechtigte Ziele aufeinander: Entlastung und
            Finanzierung, Freiheit und Schutz, Tempo und Sorgfalt, Gegenwart und Zukunft.
          </p>
          <p>
            GURT macht diese Zielkonflikte sichtbar — kritisch, nachvollziehbar und ohne
            parteipolitische Erzählung.
          </p>
        </div>
        <p className="mt-6 font-display text-xl font-semibold text-ink">
          Mehrere Dinge können gleichzeitig richtig sein. Aber nicht alles.
        </p>
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
    </>
  );
}
