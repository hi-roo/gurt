import Link from 'next/link';
import { Container, Heading } from '@gurt/ui';

export default function NotFound() {
  return (
    <Container width="prose" className="py-24">
      <Heading level={1}>Nicht gefunden</Heading>
      <p className="mt-4 text-muted">Diese Seite existiert nicht (mehr).</p>
      <Link href="/" className="mt-6 inline-block text-accent underline underline-offset-2">
        Zur Startseite
      </Link>
    </Container>
  );
}
