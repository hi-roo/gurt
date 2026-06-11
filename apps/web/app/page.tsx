import Link from 'next/link';
import { getArticles, getThemes } from '../content/repository';
import { ressortName } from '../content/ressorts';
import { FlowHero } from '../components/flow-hero';
import { ArrowRight, CopperButton, CopperCTA, ON_COPPER, ON_COPPER_SOFT, copperLabel as label } from '../components/copper';

// ISR: Liste stündlich regenerieren, damit neue (auch rein in Sanity gepflegte)
// Beiträge automatisch erscheinen — ohne manuellen Deploy.
export const revalidate = 3600;

// Hero-spezifisch: der dunkle Ink-Block hinter dem generativen Key-Visual.
const INK_PANEL = '#0c111d';
const HERO_SERIES = [1.16, 1.18, 1.23, 1.33, 1.49, 1.43, 1.61, 2.0];

// Zitat des Tages für die CTA-Bahn: deterministisch nach Kalendertag (UTC) gewählt,
// serverseitig — bewusst KEIN Karussell (auto-wechselnder Text bräuchte Pause/Stop,
// WCAG 2.2.2, und widerspräche reduced-motion). ISR (1 h) zieht den Tageswechsel nach.
// Pool erweiterbar; Zuschreibung = Zitatnachweis, Eyebrow = GURT-Konzept-Label.
const ZITATE = [
  {
    eyebrow: 'Dauer durch Wandel',
    statement: '„Es soll sich regen, schaffend handeln, erst sich gestalten, dann verwandeln“',
    attribution: '— J. W. v. Goethe',
  },
  {
    // „Über den Begriff der Geschichte", These II (1940) — deutsches Original.
    eyebrow: 'Pendelbewegungen aushalten',
    statement: '„Billig ist dieser Anspruch nicht abzufertigen.“',
    attribution: '— Walter Benjamin',
  },
] as const;

export default async function HomePage() {
  const [articles, themes] = await Promise.all([getArticles(), getThemes()]);
  const tiles = articles.slice(0, 5);
  const zitat = ZITATE[Math.floor(Date.now() / 86_400_000) % ZITATE.length]!;

  return (
    <>
      {/* ── HERO-BÜHNE (Kupfer, theme-invariant) ── */}
      <section style={{ background: 'var(--color-primary)', color: ON_COPPER, borderBottom: '1px solid rgba(28,14,3,0.18)' }}>
        <div className="mx-auto w-full max-w-[82rem] px-6 sm:px-10">
          <div className="grid items-stretch lg:grid-cols-12">
            <div className="flex flex-col justify-between py-12 lg:col-span-8 lg:py-20 lg:pr-12">
              <div className="flex items-center gap-4">
                <span style={{ ...label, color: ON_COPPER }} className="text-sm">01</span>
                <span style={{ height: 1, background: ON_COPPER, opacity: 0.5 }} className="hidden w-12 sm:block" />
                <span style={{ ...label, color: ON_COPPER_SOFT }} className="text-xs">Daten-Journalismus · DE / EU</span>
              </div>
              <h1 style={{ fontWeight: 500 }} className="mt-10 max-w-[16ch] font-display text-4xl leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
                Politik verständlich machen, ohne sie einfach zu machen.
              </h1>
              <div className="mt-12 max-w-md">
                <p style={{ color: ON_COPPER_SOFT }} className="text-base leading-relaxed">
                  GURT erklärt politische Leitlinien aus Deutschland und der EU mit Datenvisualisierung, offengelegten Quellen und anschaulichen Beispielen.
                </p>
                <div className="mt-8 flex flex-wrap">
                  <CopperButton href="#beitraege" text="Beiträge ansehen" />
                  <CopperButton href="/ueber" text="Wofür GURT steht" variant="ghost" />
                </div>
              </div>
            </div>
            {/* Key-Visual — fester dunkler Block (Kupfer-getönt) */}
            <div className="relative h-[21rem] overflow-hidden sm:h-[24rem] lg:col-span-4 lg:h-auto lg:min-h-[34rem]" style={{ background: INK_PANEL }}>
              <FlowHero values={HERO_SERIES} seed="gurt" tone="ink" bgColor={INK_PANEL} motion="always" className="absolute inset-0 h-full" />
              <div aria-hidden="true" className="absolute inset-0" style={{ background: 'var(--color-primary)', mixBlendMode: 'hue' }} />
              <div aria-hidden="true" className="absolute inset-0" style={{ background: 'var(--color-primary)', opacity: 0.16 }} />
              {/* Deckende Platte: die Caption darf nicht über den hellen Flow-Strichen schweben (AA). */}
              <span style={{ ...label, color: 'rgba(255,255,255,.82)', background: INK_PANEL }} className="absolute right-3 top-3 z-10 px-1.5 py-0.5 text-[11px]">Key Visual · generativ</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── HALTUNG (Zielkonflikte) ── */}
      <section className="mx-auto w-full max-w-[82rem] px-6 py-14 sm:px-10">
        <div className="max-w-2xl space-y-4 text-pretty text-muted">
          <p>
            Politische Entscheidungen entstehen selten in einem einfachen Richtig-oder-Falsch. Oft treffen
            berechtigte Ziele aufeinander: Entlastung und Finanzierung, Freiheit und Schutz, Tempo und
            Sorgfalt, Gegenwart und Zukunft.
          </p>
          <p>GURT macht diese Zielkonflikte sichtbar — kritisch, nachvollziehbar und ohne parteipolitische Erzählung.</p>
        </div>
        <p className="mt-6 font-display text-2xl font-medium text-ink">
          Mehrere Dinge können gleichzeitig richtig sein. <span className="text-accent">Aber nicht alles.</span>
        </p>
      </section>

      {/* ── TILES (Aktuelle Beiträge) ── */}
      <section id="beitraege" className="mx-auto w-full max-w-[82rem] px-6 pb-16 sm:px-10">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-3xl font-medium tracking-tight text-ink">Aktuelle Beiträge</h2>
          <Link href="/themen" className="hidden items-center gap-2 text-sm text-accent transition-opacity hover:opacity-80 sm:inline-flex">
            Alle Themen <ArrowRight size={14} />
          </Link>
        </div>
        <div className="mt-8 grid gap-px sm:grid-cols-2 lg:grid-cols-3" style={{ background: 'var(--color-line)' }}>
          {tiles.map((a, i) => {
            const copper = i === 1;
            const wide = i === 0;
            return (
              <Link
                key={a.slug}
                href={`/beitrag/${a.slug}`}
                className={`group relative flex min-h-[13rem] flex-col justify-between p-5 transition-colors hover:bg-[color-mix(in_srgb,var(--color-ink)_5%,transparent)] ${wide ? 'sm:col-span-2 lg:min-h-[16rem]' : ''}`}
                style={copper ? { background: 'var(--color-primary)', color: ON_COPPER } : { background: 'var(--color-surface)' }}
              >
                <p style={{ ...label, color: copper ? ON_COPPER_SOFT : undefined }} className={`text-[11px] ${copper ? '' : 'text-muted'}`}>
                  {ressortName(a.ressort)}
                </p>
                <div>
                  <h3 className={`pr-8 font-display font-medium leading-snug ${copper ? '' : 'text-ink'} ${wide ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
                    {a.titel}
                  </h3>
                  <span className="absolute bottom-5 right-5 transition-transform group-hover:translate-x-1">
                    <ArrowRight size={20} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── THEMA VORSCHLAGEN ── */}
      <section style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-line)', borderBottom: '1px solid var(--color-line)' }}>
        <div className="mx-auto grid w-full max-w-[82rem] gap-10 px-6 py-16 sm:px-10 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-6">
            <p style={{ ...label }} className="text-xs text-accent">Mitmachen</p>
            <h2 className="mt-5 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">Ein Thema vorschlagen</h2>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-muted">
              GURT lebt von guten Fragen. Welche politische Leitlinie sollen wir uns als Nächstes vornehmen — mit Daten, Quellen und Zielkonflikten?
            </p>
            {themes.length ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {themes.slice(0, 5).map((t) => (
                  <Link key={t.slug} href={`/thema/${t.slug}`} className="border border-line px-3 py-1 text-xs text-muted transition-colors hover:border-ink hover:text-ink">
                    {t.name}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          {/* GET an mailto: Browser serialisiert die Felder zu ?subject=…&body=… → der Vorschlag landet
              verlässlich im Mail-Entwurf (POST+text/plain wurde von Mail-Handlern uneinheitlich übernommen). */}
          <form action="mailto:hinweise@gurt.info" className="flex flex-col justify-end gap-4 lg:col-span-6">
            <input type="hidden" name="subject" value="Themenvorschlag für GURT" />
            <label className="block">
              <span style={{ ...label }} className="text-[11px] text-muted">Dein Thema oder deine Frage</span>
              <input
                name="body"
                type="text"
                required
                placeholder="z. B. Wer verdient am Strompreis?"
                className="mt-2 w-full border-b-2 border-line bg-paper px-4 py-3.5 text-base text-ink outline-none transition-colors placeholder:text-subtle focus:border-b-accent"
              />
            </label>
            <button
              type="submit"
              style={{ background: 'var(--color-primary)', color: 'var(--color-on-primary)', minWidth: 220, height: 48 }}
              className="inline-flex items-center justify-between self-start px-4 text-sm font-medium leading-none transition-opacity hover:opacity-90"
            >
              <span className="pr-10">Vorschlag senden</span>
              <ArrowRight />
            </button>
            <span className="text-xs text-muted">Öffnet dein Mailprogramm · oder per Themen-Radar kuratiert.</span>
          </form>
        </div>
      </section>

      {/* ── CTA-BAHN (Kupfer) — wiederkehrende Marken-Signatur, Zitat des Tages ── */}
      <CopperCTA
        eyebrow={zitat.eyebrow}
        statement={zitat.statement}
        attribution={zitat.attribution}
        ctaText="Wofür GURT steht"
        ctaHref="/ueber"
      />
    </>
  );
}
