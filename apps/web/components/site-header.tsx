import Link from 'next/link';
import { Container } from '@gurt/ui';
import { getThemes } from '../content/repository';

export async function SiteHeader() {
  const themes = await getThemes();

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur">
      <Container width="full" className="flex items-center justify-between gap-6 py-4">
        <Link href="/" className="inline-flex min-h-11 items-center font-display text-xl font-bold tracking-tight">
          GURT
        </Link>
        <nav className="flex items-center gap-5 text-sm text-muted">
          <Link href="/themen" className="inline-flex min-h-11 items-center hover:text-ink">
            Themen
          </Link>
          <Link href="/ueber" className="inline-flex min-h-11 items-center hover:text-ink">
            Über
          </Link>
          <Link
            href="/suche"
            className="inline-flex min-h-11 items-center gap-1.5 hover:text-ink"
            aria-label="Suche"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            Suche
          </Link>
        </nav>
      </Container>

      {themes.length ? (
        <div className="border-t border-line/60">
          <Container width="full">
            <nav
              aria-label="Themen"
              className="flex gap-5 overflow-x-auto py-1 text-sm text-subtle [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {themes.map((thema) => (
                <Link
                  key={thema.slug}
                  href={`/thema/${thema.slug}`}
                  className="inline-flex min-h-11 items-center whitespace-nowrap transition-colors hover:text-ink"
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
