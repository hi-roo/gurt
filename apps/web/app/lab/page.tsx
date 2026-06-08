import Link from 'next/link';
import { Container, Heading, Lead, Section, linkClass } from '@gurt/ui';

type Track = { n: number; t: string; d: string; href: string | null };

const TRACKS: Track[] = [
  { n: 1, t: 'Datengetriebene Identität (Flow-Feld)', d: 'Generativer Hero aus den echten Daten — kk.dk × Patrik Hübner. NEU.', href: '/lab/hero' },
  { n: 2, t: 'Feature-Hero', d: 'Hervorgehobener Beitrag (behutsamer Erstversuch — verworfen).', href: '/lab/feature' },
  { n: 3, t: 'Dossier', d: 'Themen-Sammlung als kuratierte Strecke.', href: null },
  { n: 4, t: 'Aktivierende Einstiege', d: 'Quiz/Schätzfrage vor dem Beitrag — neutral.', href: null },
  { n: 5, t: 'Shell-Konzept (kk.dk)', d: '„Verstehen"-Index statt Feed, Suche, Bereichs-Navigation.', href: '/lab/home' },
  { n: 6, t: 'Dark Mode', d: 'Gleichwertige dunkle Variante.', href: null },
  { n: 7, t: 'Brand-Icon / Favicon', d: 'Eigenes Mark (G+, G/ … ).', href: null },
  { n: 8, t: 'Atlas — Navigation als Inhaltsgraph (OOUX)', d: 'Mutiger Sprung: Objekte statt Seiten, datengetriebener Graph, dark. Carbon-A11y × Payload-Ästhetik. NEU.', href: '/lab/atlas' },
];

export default function LabPage() {
  return (
    <Container width="prose">
      <Section>
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Discovery</p>
        <Heading level={1} className="mt-3">
          Interface-Lab
        </Heading>
        <Lead className="mt-5">
          Isolierte Spielwiese für die behutsame Weiterentwicklung des Interfaces — getrennt von der
          Live-Version. Prototypen erscheinen hier; reife Bausteine wandern erst nach Freigabe nach Live.
        </Lead>

        <ul className="mt-10 border-y border-line">
          {TRACKS.map((x) => (
            <li key={x.n} className="flex items-baseline gap-4 border-b border-line py-4 last:border-b-0">
              <span className="font-mono text-sm tabular-nums text-subtle">
                {String(x.n).padStart(2, '0')}
              </span>
              <div>
                <div className="font-display text-lg font-semibold text-ink">
                  {x.href ? (
                    <Link href={x.href} className={linkClass}>
                      {x.t}
                    </Link>
                  ) : (
                    x.t
                  )}
                </div>
                <p className="text-sm text-muted">{x.d}</p>
              </div>
              <span className="ml-auto font-mono text-xs uppercase tracking-widest text-subtle">
                {x.href ? 'offen' : 'geplant'}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-sm text-muted">
          Richtung &amp; Reihenfolge: <code>docs/design-discovery.md</code>. Diese Seite ist{' '}
          <strong>noindex</strong> und nicht in der Navigation verlinkt.
        </p>
      </Section>
    </Container>
  );
}
