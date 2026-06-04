import type { Metadata } from 'next';
import { Container, Heading, Section } from '@gurt/ui';
import { SearchView } from '../../components/search-view';
import { getSearchIndex } from '../../content/repository';

// ISR: Volltext-Index stündlich aktualisieren (neue Beiträge aus Sanity).
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Suche',
  description: 'Durchsuche alle GURT-Beiträge — nach Titel, Thema und Volltext.',
};

export default async function SuchePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const [docs, params] = await Promise.all([getSearchIndex(), searchParams]);
  const initialQuery = typeof params.q === 'string' ? params.q : '';

  return (
    <Container width="full">
      <Section className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Suche</p>
        <Heading level={1} className="mt-3">
          Beiträge durchsuchen
        </Heading>
        <p className="mt-4 text-muted">
          Volltextsuche über alle Beiträge — Titel, Themen und Fließtext. Tippen genügt; die Treffer
          aktualisieren sich sofort.
        </p>
      </Section>

      <Section className="max-w-3xl border-t border-line">
        <SearchView docs={docs} initialQuery={initialQuery} />
      </Section>
    </Container>
  );
}
