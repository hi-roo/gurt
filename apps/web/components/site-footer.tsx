import Link from 'next/link';
import { Container, quietLinkClass } from '@gurt/ui';

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <Container width="full" className="flex flex-col gap-2 py-10 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-sans font-bold text-ink">GURT</span> — Politik verständlich
          machen, ohne sie einfach zu machen. Nicht-kommerziell & quelloffen.
        </p>
        <nav className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <Link href="/impressum" className={quietLinkClass}>
            Impressum
          </Link>
          <Link href="/datenschutz" className={quietLinkClass}>
            Datenschutz
          </Link>
          <Link href="/methodik" className={quietLinkClass}>
            Methodik
          </Link>
          <a
            href="https://github.com/hi-roo/gurt"
            target="_blank"
            rel="noopener noreferrer"
            className={quietLinkClass}
          >
            GitHub
          </a>
        </nav>
      </Container>
    </footer>
  );
}
