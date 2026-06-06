import Link from 'next/link';
import { Heading } from '@gurt/ui';
import { getArticles, getRessorts, getThemes } from '../../../content/repository';
import { FlowHero } from '../../../components/lab/flow-hero';

const FEATURE = {
  titel: 'Erst 2024 an der NATO-Marke von zwei Prozent.',
  ressort: 'Verteidigung',
  slug: 'zeitenwende-in-zahlen',
  standfirst: 'Deutschland lag das ganze Jahrzehnt unter der Marke — das Feld codiert die echte Reihe.',
  values: [1.16, 1.16, 1.18, 1.21, 1.23, 1.33, 1.49, 1.43, 1.48, 1.61, 2.0],
};

type Teaser = { title: string; ressort: string; v: number[]; s: string; tone: 'paper' | 'ink'; tags: string[] };
const TEASERS: Teaser[] = [
  { title: 'Sozialstaat: Bremse oder Stütze?', ressort: 'Wirtschaft', v: [28.7, 28.6, 28.9, 29.2, 29, 29.2, 29.6, 32.5, 31.5, 29.9, 29.9], s: 'sozialstaat-bremse-oder-stuetze', tone: 'paper', tags: ['Sozialschutz', 'EU-Vergleich'] },
  { title: 'Wie viel Schulden verträgt Deutschland?', ressort: 'Finanzen', v: [82, 80, 79, 77, 75, 71, 69, 61, 59.6, 68.8, 69, 66, 63, 62.5, 63.5], s: 'schuldenbremse-wie-viel-schulden', tone: 'ink', tags: ['Schuldenbremse', 'Maastricht'] },
  { title: 'Wie hoch ist das Bürgergeld wirklich?', ressort: 'Soziales', v: [449, 502, 563, 563, 563], s: 'buergergeld-grundsicherung', tone: 'ink', tags: ['Regelsatz', 'Inflation'] },
];

const RESSORT_DESC: Record<string, string> = {
  finanzen: 'Haushalt, Steuern, Schulden.',
  wirtschaft: 'Wachstum, Arbeit, Märkte.',
  soziales: 'Rente, Bürgergeld, Sozialstaat.',
  umwelt: 'Klima, Energie, Ressourcen.',
  inneres: 'Migration, Sicherheit, Verwaltung.',
  verteidigung: 'Bündnis, Bundeswehr, Ausgaben.',
  wohnen: 'Bau, Mieten, Boden.',
  parlament: 'Abstimmungen, Akteure, Verfahren.',
};

// Diagonale Schraffur als „Bühnen"-Hintergrund.
const STAGE_BG = {
  backgroundColor: '#f4f4f5',
  backgroundImage:
    'repeating-linear-gradient(45deg, rgba(15,19,38,0.045) 0, rgba(15,19,38,0.045) 1px, transparent 1px, transparent 11px)',
};

export default async function LabHomePage() {
  const [ressorts, themes, articles] = await Promise.all([getRessorts(), getThemes(), getArticles()]);
  const recent = articles.slice(0, 5);

  return (
    <div style={STAGE_BG} className="py-10 sm:py-14">
      <div className="mx-auto max-w-[70rem] space-y-10 px-4 sm:px-6">
        {/* HERO als Bühne — Text links, Generatives rechts, weicher Übergang */}
        <section className="grid overflow-hidden bg-paper shadow-sm ring-1 ring-line lg:grid-cols-[1.05fr_1fr]">
          <div className="order-2 flex flex-col justify-center p-8 sm:p-12 lg:order-1">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">Im Fokus · {FEATURE.ressort}</p>
            <h1 className="mt-4 font-display text-3xl font-bold leading-[1.05] text-ink sm:text-5xl">{FEATURE.titel}</h1>
            <p className="mt-5 max-w-md text-pretty text-muted">{FEATURE.standfirst}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={`/beitrag/${FEATURE.slug}`} className="bg-accent px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-paper transition-opacity hover:opacity-90">
                Beitrag lesen →
              </Link>
              <Link href="/suche" className="border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:border-ink">
                Was willst du verstehen? →
              </Link>
            </div>
            <div className="mt-8 space-y-3 border-t border-line pt-6 text-sm">
              <p className="text-muted">
                <span className="font-semibold text-ink">Quellennah</span> — jede Zahl trägt eine ausgewiesene Quelle.
              </p>
              <p className="text-muted">
                <span className="font-semibold text-ink">Anti-binär</span> — Zielkonflikte sichtbar, Pro und Contra getrennt.
              </p>
            </div>
          </div>
          {/* Generatives mit weicher Maske in den Text/Karte */}
          <div className="relative order-1 min-h-[240px] lg:order-2 lg:min-h-0">
            <FlowHero values={FEATURE.values} seed={FEATURE.slug} tone="ink" motion="always" className="absolute inset-0 h-full" />
            <div className="absolute inset-0 lg:hidden" style={{ background: 'linear-gradient(to top, var(--color-paper) 0%, transparent 42%)' }} />
            <div className="absolute inset-0 hidden lg:block" style={{ background: 'linear-gradient(to right, var(--color-paper) 0%, transparent 32%)' }} />
          </div>
        </section>

        {/* TEASER zurück in der Shell — Artikel-Karten mit Bild (Hover-Motion) */}
        <section>
          <div className="flex items-baseline justify-between">
            <Heading level={2} className="text-2xl">Im Blick</Heading>
            <Link href="/themen" className="font-mono text-xs uppercase tracking-widest text-subtle hover:text-ink">Alle Themen →</Link>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            {TEASERS.map((x) => (
              <Link key={x.s} href={`/beitrag/${x.s}`} className="group block bg-paper shadow-sm ring-1 ring-line">
                <figure className="relative aspect-[4/3] overflow-hidden">
                  <FlowHero values={x.v} seed={x.s} tone={x.tone} motion="hover" className="absolute inset-0 h-full" />
                  <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t ${x.tone === 'ink' ? 'from-[#0e1326] via-[#0e1326]/55' : 'from-white via-white/60'} to-transparent`} />
                  <figcaption className="absolute inset-x-0 bottom-0 p-4">
                    <p className={`font-mono text-[10px] uppercase tracking-widest ${x.tone === 'ink' ? 'text-white/60' : 'text-subtle'}`}>{x.ressort}</p>
                    <h3 className={`mt-1 font-display text-base font-semibold leading-tight ${x.tone === 'ink' ? 'text-white' : 'text-ink'}`}>{x.title}</h3>
                  </figcaption>
                </figure>
                <div className="flex flex-wrap gap-1.5 p-4">
                  {x.tags.map((t) => (
                    <span key={t} className="rounded-full bg-[color-mix(in_srgb,var(--color-accent)_12%,white)] px-2.5 py-0.5 text-xs text-ink">{t}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* VERSTEHEN-INDEX — ruhig-typografisch (kein Generatives) */}
        <section className="bg-paper p-8 shadow-sm ring-1 ring-line sm:p-10">
          <Heading level={2} className="text-2xl">Verstehen nach Bereich</Heading>
          <div className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {ressorts.map((r) => (
              <Link key={r.slug} href={`/ressort/${r.slug}`} className="group flex flex-col bg-paper p-5 transition-colors hover:bg-[color-mix(in_srgb,var(--color-accent)_6%,var(--color-paper))]">
                <span className="font-display text-lg font-semibold text-ink group-hover:text-accent">{r.name}</span>
                <span className="mt-1 text-sm text-muted">{RESSORT_DESC[r.slug] ?? ''}</span>
                <span className="mt-6 font-mono text-xs uppercase tracking-widest text-subtle">{r.count} {r.count === 1 ? 'Beitrag' : 'Beiträge'} →</span>
              </Link>
            ))}
          </div>
        </section>

        {/* SPUREN — als Bühne wiederholt */}
        {themes.length ? (
          <section className="bg-paper p-8 shadow-sm ring-1 ring-line sm:p-10">
            <p className="font-mono text-xs uppercase tracking-widest text-subtle">Feine Spuren</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {themes.map((t) => (
                <Link key={t.slug} href={`/thema/${t.slug}`} className="border border-line px-3 py-1.5 text-sm text-muted transition-colors hover:border-ink hover:text-ink">
                  {t.name} <span className="text-subtle">{t.count}</span>
                </Link>
              ))}
            </div>
            <div className="mt-8 border-t border-line pt-6">
              <p className="font-mono text-xs uppercase tracking-widest text-subtle">Zuletzt erschienen</p>
              <ul className="mt-3">
                {recent.map((a) => (
                  <li key={a.slug} className="border-b border-line last:border-b-0">
                    <Link href={`/beitrag/${a.slug}`} className="group flex items-baseline gap-4 py-3">
                      <span className="w-24 shrink-0 font-mono text-[11px] uppercase tracking-widest text-subtle">{a.ressort ?? '—'}</span>
                      <span className="font-display text-ink group-hover:text-accent">{a.titel}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <p className="text-sm text-muted">
          Discovery-Notiz: ~70rem-Bühne auf schraffiertem Grund; Hero & „Spuren" als Karten; Generatives
          mit weicher Maske in den Text; Teaser zurück (Hover-Motion); Index bleibt ruhig-typografisch.
        </p>
      </div>
    </div>
  );
}
