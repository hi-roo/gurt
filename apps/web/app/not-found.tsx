import Link from 'next/link';
import { Container, Heading, cn, linkClass } from '@gurt/ui';

export default function NotFound() {
  return (
    <Container width="prose" className="py-24">
      <Heading level={1}>Nicht gefunden</Heading>
      <p className="mt-4 text-muted">Diese Seite existiert nicht (mehr).</p>
      <Link href="/" className={cn(linkClass, 'mt-6 inline-block')}>
        Zur Startseite
      </Link>
    </Container>
  );
}
