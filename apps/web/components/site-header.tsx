import Link from 'next/link';
import { Container } from '@gurt/ui';
import { getThemes } from '../content/repository';

export async function SiteHeader() {
  const themes = await getThemes();

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur">
      <Container width="full" className="flex items-center justify-between gap-6 py-4">
        <Link href="/" className="font-display text-xl font-bold tracking-tight">
          GURT
        </Link>
        <nav className="flex items-center gap-5 text-sm text-muted">
          <Link href="/themen" className="hover:text-ink">
            Themen
          </Link>
          <Link href="/ueber" className="hover:text-ink">
            Über
          </Link>
        </nav>
      </Container>

      {themes.length ? (
        <div className="border-t border-line/60">
          <Container width="full">
            <nav
              aria-label="Themen"
              className="flex gap-5 overflow-x-auto py-2.5 text-sm text-subtle [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {themes.map((thema) => (
                <Link
                  key={thema.slug}
                  href={`/thema/${thema.slug}`}
                  className="whitespace-nowrap transition-colors hover:text-ink"
                >
                  {thema.name}
                </Link>
              ))}
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
