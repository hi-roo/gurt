import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Heading, Section } from '@gurt/ui';
import { getThemes } from '../../content/repository';

// ISR: stündlich regenerieren (neue Themen/Beiträge aus Sanity automatisch).
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Themen',
  description: 'Alle Themenfelder von GURT — Politik aus Deutschland und der EU, datenbasiert erklärt.',
};

export default async function ThemesPage() {
  const themes = await getThemes();

  return (
    <Container width="full">
      <Section className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Übersicht</p>
        <Heading level={1} className="mt-3">
          Themen
        </Heading>
        <p className="mt-4 text-muted">Alle Themenfelder, nach Anzahl der Beiträge.</p>
      </Section>

      <Section className="border-t border-line">
        {themes.length ? (
          <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
            {themes.map((thema) => (
              <li key={thema.slug}>
                <Link
                  href={`/thema/${thema.slug}`}
                  className="group flex items-baseline justify-between gap-4 bg-paper p-6"
                >
                  <span className="font-display text-xl tracking-tight group-hover:text-accent">
                    {thema.name}
                  </span>
                  <span className="shrink-0 text-sm text-subtle">
                    {thema.count} {thema.count === 1 ? 'Beitrag' : 'Beiträge'}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">Noch keine Themen.</p>
        )}
      </Section>
    </Container>
  );
}
