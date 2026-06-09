import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { getArticles } from '../../../content/repository';
import { ressortName } from '../../../content/ressorts';
import { FlowHero } from '../../../components/lab/flow-hero';
import { CarbonUnitTheme } from '../../../components/lab/carbon-unit-theme';

export const metadata: Metadata = { title: 'Carbon · FF Unit + enigmatische Palette (Discovery)' };

/**
 * Discovery-Variante zur konservierten Carbon-Prüf-Folie (/lab/carbon).
 * — Typografie: FF Unit. — Farbe: Neutral + EIN Kupfer-Ember (Hell-Default, Dunkel umschaltbar).
 * — Grid: EINE durchgehende Achse über die ganze Seite. Jede Sektion teilt denselben Container
 *   (GUT) und dasselbe 12-Spalten-Raster; alle Inhalte fluchten linksbündig auf Spalte 1.
 *   Hero, CTA und Sektions-Überschriften sind axial deckungsgleich. Kontraste per Node verifiziert.
 */
// Gemeinsamer Container = die durchgehende Grid-Achse.
const GUT = 'mx-auto w-full max-w-[82rem] px-6 sm:px-10';

const THEME_CSS = `
[data-cu-theme="dark"]{--cu-bg:#0c111d;--cu-surface:#17243a;--cu-surfaceAlt:#22344c;--cu-line:#5f86a8;--cu-text:#f1e8da;--cu-text2:#b7ac9b;--cu-primary:#f2852c;--cu-primaryHover:#ff9a44;--cu-onPrimary:#1c0e03;--cu-primaryText:#f2852c;--cu-hover:rgba(255,255,255,.06);}
[data-cu-theme="light"]{--cu-bg:#ece9e0;--cu-surface:#e1ddd1;--cu-surfaceAlt:#d6d1c2;--cu-line:#7c7563;--cu-text:#16202f;--cu-text2:#5a5346;--cu-primary:#f2852c;--cu-primaryHover:#ff9a44;--cu-onPrimary:#1c0e03;--cu-primaryText:#9a4a0c;--cu-hover:rgba(0,0,0,.05);}
`;

const ON_COPPER = '#1c0e03';
const ON_COPPER_SOFT = 'rgba(28,14,3,0.74)';
const COPPER_BTN_TEXT = '#f5ecdd';
const INK = '#0e1326';
const UNIT_W = { thin: 100, light: 200, regular: 400, medium: 500, bold: 700 };
const label: CSSProperties = { fontWeight: UNIT_W.bold, letterSpacing: '0.07em', textTransform: 'uppercase' };

function ArrowRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="shrink-0">
      <path d="M8 0L6.59 1.41 12.17 7H0v2h12.17l-5.58 5.59L8 16l8-8z" />
    </svg>
  );
}

function UButton({ href, text, kind }: { href: string; text: string; kind: 'onCopperSolid' | 'onCopperGhost' | 'primary' }) {
  const style: Record<string, CSSProperties> = {
    onCopperSolid: { background: ON_COPPER, color: COPPER_BTN_TEXT },
    onCopperGhost: { background: 'transparent', color: ON_COPPER, boxShadow: `inset 0 0 0 1px ${ON_COPPER}` },
    primary: { background: 'var(--cu-primary)', color: 'var(--cu-onPrimary)' },
  };
  return (
    <a href={href} style={{ ...style[kind], minWidth: 220, height: 48, paddingLeft: 16, paddingRight: 16, fontWeight: UNIT_W.medium }} className="inline-flex items-center justify-between text-sm leading-none transition-opacity hover:opacity-90">
      <span className="pr-12">{text}</span>
      <ArrowRight />
    </a>
  );
}

export default async function LabCarbonUnitPage() {
  const articles = await getArticles();
  const feature = articles[0];
  const tiles = articles.slice(1, 6);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: THEME_CSS }} />
      <CarbonUnitTheme>
        {/* ── UI-Shell-Header — Inhalt auf der Grid-Achse ── */}
        <header style={{ background: 'var(--cu-surfaceAlt)', borderBottom: '1px solid var(--cu-line)' }} className="sticky top-0 z-40">
          <div className="mx-auto flex h-12 w-full max-w-[82rem] items-stretch">
            <a href="/lab/carbon-unit" className="flex items-center pl-6 pr-4 text-sm transition-colors hover:bg-[var(--cu-hover)] sm:pl-10" style={{ borderRight: '1px solid var(--cu-line)' }}>
              <span style={{ fontWeight: UNIT_W.bold }}>GURT</span>
              <span className="ml-1.5" style={{ color: 'var(--cu-text2)', fontWeight: UNIT_W.light }}>Daten-Journalismus</span>
            </a>
            <nav className="hidden items-stretch md:flex" aria-label="Hauptnavigation">
              {['Beiträge', 'Bereiche', 'Themen', 'Methodik'].map((n, i) => (
                <a key={n} href={i === 3 ? '#vorschlag' : '#beitraege'} className="relative flex items-center px-4 text-sm transition-colors hover:bg-[var(--cu-hover)]" style={i === 0 ? { color: 'var(--cu-text)', boxShadow: 'inset 0 -3px 0 0 var(--cu-primary)' } : { color: 'var(--cu-text2)' }}>
                  {n}
                </a>
              ))}
            </nav>
            <div className="ml-auto flex items-stretch pr-2 sm:pr-7" style={{ color: 'var(--cu-text2)' }}>
              {['Suche', 'Konto'].map((l) => (
                <button key={l} aria-label={l} className="flex w-12 items-center justify-center transition-colors hover:bg-[var(--cu-hover)]">
                  {l === 'Suche' ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" /><path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" /><path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.5" /></svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </header>

        <main>
          {/* ── Lead space — Kupfer-Bahn, Inhalt auf dem 12-Spalten-Raster (Headline = Achse Spalte 1) ── */}
          <section style={{ background: 'var(--cu-primary)', color: ON_COPPER, borderBottom: '1px solid var(--cu-line)' }}>
            <div className={GUT}>
              <div className="grid items-stretch lg:grid-cols-12">
                <div className="flex flex-col justify-between py-12 lg:col-span-7 lg:py-20 lg:pr-12">
                  <div className="flex items-center gap-4">
                    <span style={{ fontWeight: UNIT_W.bold, color: ON_COPPER }} className="text-sm">01</span>
                    <span style={{ height: 1, background: ON_COPPER, opacity: 0.5 }} className="w-12" />
                    <span style={{ ...label, color: ON_COPPER_SOFT }} className="text-xs">Daten-Journalismus · DE / EU</span>
                  </div>
                  <h1 style={{ fontWeight: UNIT_W.thin, letterSpacing: '-0.01em', lineHeight: 1.06 }} className="mt-10 max-w-[16ch] text-4xl sm:text-5xl lg:text-6xl">
                    Politik verständlich machen, ohne sie einfach zu machen.
                  </h1>
                  <div className="mt-12 max-w-md">
                    <p style={{ fontWeight: UNIT_W.regular, color: ON_COPPER_SOFT }} className="text-base leading-relaxed">
                      Politische Leitlinien — erklärt mit Datenvisualisierung, offengelegten Quellen und anschaulichen Beispielen.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-px">
                      <UButton href="#beitraege" text="Beiträge ansehen" kind="onCopperSolid" />
                      <UButton href="/methodik" text="Methodik" kind="onCopperGhost" />
                    </div>
                  </div>
                </div>
                {/* Key-Visual — raster-gebundener Block (Spalten 8–12), rechte Kante = rechte Achse */}
                <div className="relative min-h-[18rem] overflow-hidden lg:col-span-5 lg:min-h-[34rem]" style={{ background: INK }}>
                  {feature ? <FlowHero values={[1.16, 1.18, 1.23, 1.33, 1.49, 1.43, 1.61, 2.0]} seed={feature.slug} tone="ink" motion="always" className="absolute inset-0 h-full" /> : null}
                  <div aria-hidden="true" className="absolute inset-0" style={{ background: 'var(--cu-primary)', mixBlendMode: 'hue' }} />
                  <div aria-hidden="true" className="absolute inset-0" style={{ background: 'var(--cu-primary)', opacity: 0.16 }} />
                  <span style={{ ...label, color: 'rgba(255,255,255,.55)' }} className="absolute right-4 top-4 z-10 text-[11px]">Key Visual · generativ</span>
                </div>
              </div>
            </div>
          </section>

          {/* ── Tiles — gemischte Größen, linke Kante = Achse ── */}
          <section id="beitraege" className={`${GUT} py-16`}>
            <div className="flex items-baseline justify-between">
              <h2 style={{ fontWeight: UNIT_W.regular, letterSpacing: '-0.01em' }} className="text-3xl">Aktuelle Beiträge</h2>
              <a href="#" className="hidden items-center gap-2 text-sm transition-opacity hover:opacity-80 sm:inline-flex" style={{ color: 'var(--cu-primaryText)' }}>
                Alle Beiträge <ArrowRight size={14} />
              </a>
            </div>
            <div className="mt-8 grid gap-px sm:grid-cols-2 lg:grid-cols-3" style={{ background: 'var(--cu-line)' }}>
              {tiles.map((a, i) => {
                const copper = i === 1;
                const wide = i === 0;
                return (
                  <a key={a.slug} href={`/beitrag/${a.slug}`} className={`group relative flex min-h-[13rem] flex-col justify-between p-5 transition-colors hover:bg-[var(--cu-hover)] ${wide ? 'lg:col-span-2 lg:min-h-[16rem]' : ''}`} style={{ background: copper ? 'var(--cu-primary)' : 'var(--cu-surface)', color: copper ? 'var(--cu-onPrimary)' : 'var(--cu-text)' }}>
                    <p style={{ ...label, color: copper ? ON_COPPER_SOFT : 'var(--cu-text2)' }} className="text-[11px]">{ressortName(a.ressort)}</p>
                    <div>
                      <h3 style={{ fontWeight: UNIT_W.regular, lineHeight: 1.22 }} className={`pr-8 ${wide ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>{a.titel}</h3>
                      <span className="absolute bottom-5 right-5 transition-transform group-hover:translate-x-1"><ArrowRight size={20} /></span>
                    </div>
                  </a>
                );
              })}
            </div>
          </section>

          {/* ── „Thema vorschlagen" — 12-Spalten (5/7), linke Kante = Achse ── */}
          <section id="vorschlag" style={{ background: 'var(--cu-surface)', borderTop: '1px solid var(--cu-line)', borderBottom: '1px solid var(--cu-line)' }}>
            <div className={`${GUT} py-16 lg:py-20`}>
              <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <p style={{ ...label, color: 'var(--cu-primaryText)' }} className="text-xs">Mitmachen</p>
                  <h2 style={{ fontWeight: UNIT_W.thin, letterSpacing: '-0.01em', lineHeight: 1.1 }} className="mt-5 text-4xl sm:text-5xl">Ein Thema vorschlagen</h2>
                  <p style={{ color: 'var(--cu-text2)' }} className="mt-5 max-w-sm text-base leading-relaxed">
                    GURT lebt von guten Fragen. Welche politische Leitlinie sollen wir uns als Nächstes vornehmen — mit Daten, Quellen und Zielkonflikten?
                  </p>
                </div>
                <form action="mailto:hinweise@gurt.info?subject=Themenvorschlag" method="post" encType="text/plain" className="flex flex-col justify-end gap-4 lg:col-span-7">
                  <label className="block">
                    <span style={{ ...label, color: 'var(--cu-text2)' }} className="text-[11px]">Dein Thema oder deine Frage</span>
                    <input name="Themenvorschlag" type="text" required placeholder="z. B. Wer verdient am Strompreis?" style={{ background: 'var(--cu-surfaceAlt)', color: 'var(--cu-text)', borderBottom: '2px solid var(--cu-line)' }} className="mt-2 w-full px-4 py-3.5 text-base outline-none transition-colors placeholder:opacity-60 focus:border-b-[color:var(--cu-primary)]" />
                  </label>
                  <div className="flex flex-wrap items-center gap-3">
                    <button type="submit" style={{ background: 'var(--cu-primary)', color: 'var(--cu-onPrimary)', minWidth: 220, height: 48, fontWeight: UNIT_W.medium }} className="inline-flex items-center justify-between px-4 text-sm leading-none transition-opacity hover:opacity-90">
                      <span className="pr-12">Vorschlag senden</span>
                      <ArrowRight />
                    </button>
                    <span style={{ color: 'var(--cu-text2)' }} className="text-xs">Öffnet dein Mailprogramm · oder per Themen-Radar kuratiert.</span>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {['Lobbyregister', 'Pflegefinanzierung', 'Netzausbau'].map((t) => (
                      <span key={t} style={{ borderColor: 'var(--cu-line)', color: 'var(--cu-text2)' }} className="border px-3 py-1 text-xs">{t}</span>
                    ))}
                  </div>
                </form>
              </div>
            </div>
          </section>

          {/* ── CTA-Bahn — Kupfer, Headline axial deckungsgleich zur Hero-Headline (Achse Spalte 1) ── */}
          <section style={{ background: 'var(--cu-primary)', color: ON_COPPER }}>
            <div className={`${GUT} py-20`}>
              <div className="lg:max-w-[58%]">
                <p style={{ ...label, color: ON_COPPER_SOFT }} className="text-xs">Haltung zur Methode</p>
                <p style={{ fontWeight: UNIT_W.thin, lineHeight: 1.1, letterSpacing: '-0.01em' }} className="mt-6 max-w-[18ch] text-4xl sm:text-6xl">
                  Mehrere Dinge können gleichzeitig richtig sein. Aber nicht alles.
                </p>
                <div className="mt-10"><UButton href="/ueber" text="Worauf GURT steht" kind="onCopperSolid" /></div>
              </div>
            </div>
          </section>

          {/* ── Footer — Inhalt auf der Achse ── */}
          <footer style={{ background: 'var(--cu-surfaceAlt)', color: 'var(--cu-text2)', borderTop: '1px solid var(--cu-line)' }}>
            <div className={`${GUT} py-16`}>
              <div className="grid gap-10 sm:grid-cols-3">
                <div>
                  <p style={{ color: 'var(--cu-text)' }}><span style={{ fontWeight: UNIT_W.bold }}>GURT</span> Daten-Journalismus</p>
                  <p className="mt-3 max-w-xs text-sm">Nicht-kommerziell, quelloffen, im öffentlichen Interesse.</p>
                </div>
                {[
                  { h: 'Entdecken', items: ['Beiträge', 'Bereiche', 'Themen'] },
                  { h: 'Transparenz', items: ['Methodik', 'Impressum', 'Datenschutz'] },
                ].map((col) => (
                  <div key={col.h}>
                    <p style={{ ...label, color: 'var(--cu-text2)' }} className="text-[11px]">{col.h}</p>
                    <ul className="mt-4 space-y-2 text-sm">
                      {col.items.map((it) => (
                        <li key={it}><a href="#" className="transition-opacity hover:opacity-70" style={{ color: 'var(--cu-text2)' }}>{it}</a></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </footer>
        </main>
      </CarbonUnitTheme>
    </>
  );
}
