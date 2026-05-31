import Link from 'next/link';
import { Container } from '@gurt/ui';

export function SiteHeader() {
  return (
    <header className="border-b border-line">
      <Container width="full" className="flex items-center justify-between py-4">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight">
          Gurt
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted">
          <Link href="/" className="hover:text-ink">
            Beiträge
          </Link>
          <a
            href="https://github.com"
            className="hover:text-ink"
            rel="noopener noreferrer"
          >
            Über
          </a>
        </nav>
      </Container>
    </header>
  );
}
