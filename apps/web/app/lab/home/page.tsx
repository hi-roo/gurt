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

// Layout-Konstante: begrenzte Lesebreite (~70rem).
const SHELL = 'mx-auto w-full max-w-[70rem] px-6';

export default async function LabHomePage() {
  const [ressorts, themes, articles] = await Promise.all([getRessorts(), getThemes(), getArticles()]);
  const recent = articles.slice(0, 5);

  return (
    <>
      {/* 100%-breite Bühne (volle Seitenbreite, farblich hinterlegt) — Hero-Inhalt darin auf ~70rem begrenzt */}
      <section className="relative isolate flex h-[80vh] max-h-[860px] min-h-[440px] flex-col justify-end overflow-hidden bg-[#0e1326]">
        <FlowHero values={FEATURE.values} seed={FEATURE.slug} tone="ink" motion="always" className="absolute inset-0 h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1326] via-[#0e1326]/45 to-[#0e1326]/10" />
        <div className={`relative z-10 pb-14 sm:pb-20 ${SHELL}`}>
          <p className="font-mono text-xs uppercase tracking-widest text-white/60">Im Fokus · {FEATURE.ressort}</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.04] text-white sm:text-6xl">
            {FEATURE.titel}
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-lg text-white/80">{FEATURE.standfirst}</p>
          <Link href={`/beitrag/${FEATURE.slug}`} className="mt-7 inline-block font-mono text-sm uppercase tracking-widest text-white underline underline-offset-4 hover:no-underline">
            Beitrag lesen →
          </Link>
        </div>
      </section>

      {/* Restlicher Inhalt — auf ~70rem begrenzt */}
      <div className={SHELL}>
        {/* „Verstehen"-Suche */}
        <section className="py-12 sm:py-16">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Was willst du verstehen?</p>
          <Link href="/suche" className="mt-4 flex items-center gap-4 border border-line px-5 py-5 transition-colors hover:border-ink">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-subtle">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="font-display text-xl text-muted sm:text-2xl">Thema, Begriff oder Frage suchen …</span>
          </Link>
        </section>

        {/* „Verstehen"-Index — bedarfsorientiert nach Bereich */}
        <section className="border-t border-line py-12 sm:py-16">
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

        {/* „Feine Spuren" — Themen */}
        {themes.length ? (
          <section className="border-t border-line py-12 sm:py-16">
            <p className="font-mono text-xs uppercase tracking-widest text-subtle">Feine Spuren</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {themes.map((t) => (
                <Link key={t.slug} href={`/thema/${t.slug}`} className="border border-line px-3 py-1.5 text-sm text-muted transition-colors hover:border-ink hover:text-ink">
                  {t.name} <span className="text-subtle">{t.count}</span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {/* „Zuletzt" — bewusst sekundär */}
        <section className="border-t border-line py-12 sm:py-16">
          <p className="font-mono text-xs uppercase tracking-widest text-subtle">Zuletzt erschienen</p>
          <ul className="mt-4 border-t border-line">
            {recent.map((a) => (
              <li key={a.slug} className="border-b border-line">
                <Link href={`/beitrag/${a.slug}`} className="group flex items-baseline gap-4 py-4">
                  <span className="w-24 shrink-0 font-mono text-[11px] uppercase tracking-widest text-subtle">{a.ressort ?? '—'}</span>
                  <span className="font-display text-lg text-ink group-hover:text-accent">{a.titel}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
