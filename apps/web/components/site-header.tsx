import Link from 'next/link';
import { Container } from '@gurt/ui';
import { getRessorts } from '../content/repository';
import { ThemeToggle } from './theme-toggle';
import { SiteMobileNav } from './site-mobile-nav';
import { SearchModal } from './search-modal';

export async function SiteHeader() {
  const ressorts = await getRessorts();

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur">
      <Container width="full" className="flex items-center gap-3 py-3">
        <SiteMobileNav ressorts={ressorts} />
        <Link href="/" className="inline-flex min-h-11 items-center font-sans text-xl font-bold tracking-tight">
          GURT
        </Link>
        <div className="ml-auto flex items-center gap-3 md:gap-5">
          <nav className="hidden items-center gap-5 text-sm text-muted md:flex">
            <Link href="/themen" className="inline-flex min-h-11 items-center hover:text-ink">
              Themen
            </Link>
            <Link href="/ueber" className="inline-flex min-h-11 items-center hover:text-ink">
              Über
            </Link>
          </nav>
          <SearchModal />
          <ThemeToggle />
        </div>
      </Container>

      {ressorts.length ? (
        <div className="hidden border-t border-line/60 md:block">
          <Container width="full">
            <nav
              aria-label="Ressorts"
              className="flex gap-5 overflow-x-auto py-1 text-sm text-subtle [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {ressorts.map((ressort) => (
                <Link
                  key={ressort.slug}
                  href={`/ressort/${ressort.slug}`}
                  className="inline-flex min-h-11 items-center whitespace-nowrap transition-colors hover:text-ink"
                >
                  {ressort.name}
                </Link>
              ))}
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
