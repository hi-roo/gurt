import Link from 'next/link';
import type { CSSProperties } from 'react';
import { getArticles, getRessorts, getThemes } from '../content/repository';
import { ressortName } from '../content/ressorts';
import { FlowHero } from '../components/flow-hero';

// ISR: Liste stündlich regenerieren, damit neue (auch rein in Sanity gepflegte)
// Beiträge automatisch erscheinen — ohne manuellen Deploy.
export const revalidate = 3600;

// Die Kupfer-Bühne (var(--color-primary)) ist theme-invariant → ihr Inhalt nutzt feste Farben
// (dunkler Text/Buttons), nicht die mode-aware Tokens.
const ON_COPPER = '#1c0e03';
const ON_COPPER_SOFT = 'rgba(28,14,3,0.74)';
const COPPER_BTN_BG = '#1c0e03';
const COPPER_BTN_TEXT = '#f5ecdd';
const INK_PANEL = '#0c111d';
const label: CSSProperties = { fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' };
const HERO_SERIES = [1.16, 1.18, 1.23, 1.33, 1.49, 1.43, 1.61, 2.0];

function ArrowRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="shrink-0">
      <path d="M8 0L6.59 1.41 12.17 7H0v2h12.17l-5.58 5.59L8 16l8-8z" />
    </svg>
  );
}

function CopperButton({ href, text, variant = 'solid' }: { href: string; text: string; variant?: 'solid' | 'ghost' }) {
  const style: CSSProperties =
    variant === 'solid'
      ? { background: COPPER_BTN_BG, color: COPPER_BTN_TEXT }
      : { background: 'transparent', color: ON_COPPER, boxShadow: `inset 0 0 0 1px ${ON_COPPER}` };
  return (
    <Link href={href} style={{ ...style, minWidth: 220, height: 48 }} className="inline-flex items-center justify-between px-4 text-sm font-medium leading-none transition-opacity hover:opacity-90">
      <span className="pr-10">{text}</span>
      <ArrowRight />
    </Link>
  );
}

export default async function HomePage() {
  const [articles, ressorts, themes] = await Promise.all([getArticles(), getRessorts(), getThemes()]);
  void ressorts;
  const tiles = articles.slice(0, 5);

  return (
    <>
      {/* ── HERO-BÜHNE (Kupfer, theme-invariant) ── */}
      <section style={{ background: 'var(--color-primary)', color: ON_COPPER, borderBottom: '1px solid var(--color-line)' }}>
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
                  <CopperButton href="/ueber" text="Worauf GURT steht" variant="ghost" />
                </div>
              </div>
            </div>
            {/* Key-Visual — fester dunkler Block (Kupfer-getönt) */}
            <div className="relative h-[21rem] overflow-hidden sm:h-[24rem] lg:col-span-4 lg:h-auto lg:min-h-[34rem]" style={{ background: INK_PANEL }}>
              <FlowHero values={HERO_SERIES} seed="gurt" tone="ink" bgColor={INK_PANEL} motion="always" className="absolute inset-0 h-full" />
              <div aria-hidden="true" className="absolute inset-0" style={{ background: 'var(--color-primary)', mixBlendMode: 'hue' }} />
              <div aria-hidden="true" className="absolute inset-0" style={{ background: 'var(--color-primary)', opacity: 0.16 }} />
              <span style={{ ...label, color: 'rgba(255,255,255,.55)' }} className="absolute right-4 top-4 z-10 text-[11px]">Key Visual · generativ</span>
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
                className={`group relative flex min-h-[13rem] flex-col justify-between p-5 transition-colors hover:bg-[color-mix(in_srgb,var(--color-ink)_5%,transparent)] ${wide ? 'lg:col-span-2 lg:min-h-[16rem]' : ''}`}
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
          <form action="mailto:hinweise@gurt.info?subject=Themenvorschlag" method="post" encType="text/plain" className="flex flex-col justify-end gap-4 lg:col-span-6">
            <label className="block">
              <span style={{ ...label }} className="text-[11px] text-muted">Dein Thema oder deine Frage</span>
              <input
                name="Themenvorschlag"
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

      {/* ── CTA-BAHN (Kupfer) ── */}
      <section style={{ background: 'var(--color-primary)', color: ON_COPPER }}>
        <div className="mx-auto w-full max-w-[82rem] px-6 py-20 sm:px-10">
          <p style={{ ...label, color: ON_COPPER_SOFT }} className="text-xs">Haltung zur Methode</p>
          <p style={{ fontWeight: 400 }} className="mt-6 max-w-[18ch] font-display text-4xl leading-[1.1] tracking-tight sm:text-6xl">
            Mehrere Dinge können gleichzeitig richtig sein. Aber nicht alles.
          </p>
          <div className="mt-10">
            <CopperButton href="/ueber" text="Worauf GURT steht" />
          </div>
        </div>
      </section>
    </>
  );
}
