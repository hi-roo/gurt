import { Container } from '@gurt/ui';

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <Container width="full" className="flex flex-col gap-2 py-10 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-display font-semibold text-ink">Gurt</span> — Politik verständlich
          machen. Gemeinnützig & quelloffen.
        </p>
        <p>
          Code: MIT · Inhalte: CC BY 4.0. Quellen je Datensatz ausgewiesen.
        </p>
      </Container>
    </footer>
  );
}
