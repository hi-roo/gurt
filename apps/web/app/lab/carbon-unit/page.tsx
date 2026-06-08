import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { getArticles } from '../../../content/repository';
import { ressortName } from '../../../content/ressorts';
import { FlowHero } from '../../../components/lab/flow-hero';

export const metadata: Metadata = { title: 'Carbon · FF Unit + enigmatische Palette (Discovery)' };

/**
 * Discovery-Variante zur konservierten Carbon-Prüf-Folie (/lab/carbon):
 * — Typografie: FF Unit ("unit", via Typekit nkg1woj) statt IBM Plex.
 * — Farbe: „enigmatische" Palette als bewusster Kontrapunkt zu Carbon-Blau.
 *
 * PAL = PROVISORISCH (poline-fundiert, dunkel). Wird durch die Synthese des
 * Workflows „enigmatic-palette" ersetzt, sobald dieser fertig ist.
 */
// „Glut im Dunkel" — poline-Kontrapunkt-Palette (Workflow-Synthese, Kontraste per Node verifiziert).
// Kalt-indigoblaues Anthrazit-Feld + ein glühender Kupfer-Ember (Primär) + kühler Aqua-Gegenglint.
// AUFLAGEN: Text auf `primary` ist DUNKEL (`onPrimary`), nie weiß. `line`/`accentB` nur Fläche/Strich, nie Fließtext.
const PAL = {
  background: '#0c111d', // fast-schwarzes Indigo
  surface: '#17243a',
  surfaceAlt: '#22344c',
  line: '#5f86a8', // sichtbar auf jeder Fläche (≥3:1)
  textPrimary: '#f1e8da', // warmes Off-White (15,53:1 auf background)
  textSecondary: '#b7ac9b',
  primary: '#f2852c', // Kupfer/Bernstein — dominanter, warmer Ember (Kontrapunkt zu #0f62fe)
  primaryHover: '#ff9a44',
  onPrimary: '#1c0e03', // dunkelbraun, 7,33:1 auf primary
  accentA: '#9feae3', // Aqua-Gegenglint
  accentB: '#317890', // Petrol — nur Fläche/Strich
};
const ON_PRIMARY_SOFT = 'rgba(28,14,3,0.74)'; // gedämpfter Text auf Kupfer

const UNIT = '"unit", sans-serif';
// FF-Unit-Schnitte (Typekit-Kit liefert 100/200/400/500/700/800/900):
const W = { thin: 100, light: 200, regular: 400, medium: 500, bold: 700 };

const label: CSSProperties = { fontWeight: W.bold, letterSpacing: '0.07em', textTransform: 'uppercase' };

function ArrowRight({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill={color} aria-hidden="true" className="shrink-0">
      <path d="M8 0L6.59 1.41 12.17 7H0v2h12.17l-5.58 5.59L8 16l8-8z" />
    </svg>
  );
}

function UButton({
  href,
  text,
  kind = 'primary',
}: {
  href: string;
  text: string;
  kind?: 'primary' | 'onColor' | 'ghostOnColor' | 'outline';
}) {
  const style: Record<string, CSSProperties> = {
    primary: { background: PAL.primary, color: PAL.onPrimary },
    onColor: { background: PAL.background, color: PAL.textPrimary },
    ghostOnColor: { background: 'transparent', color: PAL.onPrimary, boxShadow: `inset 0 0 0 1px ${PAL.onPrimary}` },
    outline: { background: 'transparent', color: PAL.primary, boxShadow: `inset 0 0 0 1px ${PAL.primary}` },
  };
  return (
    <a
      href={href}
      style={{ ...style[kind], minWidth: 224, height: 48, paddingLeft: 16, paddingRight: 16, fontWeight: W.medium }}
      className="inline-flex items-center justify-between text-sm leading-none transition-opacity hover:opacity-90"
    >
      <span className="pr-12">{text}</span>
      <ArrowRight />
    </a>
  );
}

export default async function LabCarbonUnitPage() {
  const articles = await getArticles();
  const feature = articles[0];
  const tiles = articles.slice(1, 7);

  return (
    <div style={{ fontFamily: UNIT, background: PAL.background, color: PAL.textPrimary }}>
      {/* ── UI-Shell-Header ── */}
      <header style={{ height: 48, background: PAL.surfaceAlt, borderBottom: `1px solid ${PAL.line}` }} className="sticky top-0 z-40 flex items-stretch">
        <a href="/lab/carbon-unit" className="flex items-center px-4 text-sm transition-colors hover:bg-white/5" style={{ borderRight: `1px solid ${PAL.line}` }}>
          <span style={{ fontWeight: W.bold }}>GURT</span>
          <span className="ml-1.5" style={{ color: PAL.textSecondary, fontWeight: W.light }}>Daten-Journalismus</span>
        </a>
        <nav className="hidden items-stretch md:flex" aria-label="Hauptnavigation">
          {['Beiträge', 'Bereiche', 'Themen', 'Methodik'].map((n, i) => (
            <a
              key={n}
              href="#beitraege"
              className="relative flex items-center px-4 text-sm transition-colors hover:bg-white/5"
              style={i === 0 ? { color: PAL.textPrimary, boxShadow: `inset 0 -3px 0 0 ${PAL.primary}` } : { color: PAL.textSecondary }}
            >
              {n}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-stretch" style={{ color: PAL.textSecondary }}>
          {['Suche', 'Konto'].map((l) => (
            <button key={l} aria-label={l} className="flex w-12 items-center justify-center transition-colors hover:bg-white/5 hover:text-white">
              {l === 'Suche' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
                  <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </header>

      <main>
        {/* ── Lead space — Primärton dominiert ── */}
        <section className="relative grid lg:grid-cols-2" style={{ borderBottom: `1px solid ${PAL.line}` }}>
          <div style={{ background: PAL.primary, color: PAL.onPrimary }} className="flex flex-col justify-between px-6 pt-12 pb-10 sm:px-10 lg:min-h-[34rem] lg:pt-20">
            <div>
              <p style={{ ...label, color: ON_PRIMARY_SOFT }} className="text-xs">Daten-Journalismus · DE / EU</p>
              <h1 style={{ fontWeight: W.thin, letterSpacing: '-0.01em', lineHeight: 1.08 }} className="mt-6 max-w-[15ch] text-4xl sm:text-5xl lg:text-[3.5rem]">
                Politik verständlich machen, ohne sie einfach zu machen.
              </h1>
            </div>
            <div className="mt-10 max-w-md">
              <p style={{ fontWeight: W.regular, color: ON_PRIMARY_SOFT }} className="text-base leading-relaxed">
                Politische Leitlinien — erklärt mit Datenvisualisierung, offengelegten Quellen und anschaulichen Beispielen.
              </p>
              <div className="mt-8 flex flex-wrap gap-px">
                <UButton href="#beitraege" text="Beiträge ansehen" kind="onColor" />
                <UButton href="/methodik" text="Methodik" kind="ghostOnColor" />
              </div>
            </div>
          </div>
          <div className="relative min-h-[20rem] overflow-hidden lg:min-h-[34rem]" style={{ background: PAL.background }}>
            {feature ? <FlowHero values={[1.16, 1.18, 1.23, 1.33, 1.49, 1.43, 1.61, 2.0]} seed={feature.slug} tone="ink" motion="always" className="absolute inset-0 h-full" /> : null}
            {/* Kühler Aqua-Gegenglint im Key-Visual — Spannung zur warmen Kupfer-Bühne */}
            <div aria-hidden="true" className="absolute inset-0" style={{ background: PAL.accentA, mixBlendMode: 'hue' }} />
            <div aria-hidden="true" className="absolute inset-0" style={{ background: PAL.accentA, opacity: 0.1 }} />
            <span style={{ ...label, color: 'rgba(255,255,255,.5)' }} className="absolute bottom-4 left-4 z-10 text-[11px]">Key Visual · generativ aus Daten</span>
          </div>
        </section>

        {/* ── Tiles ── */}
        <section id="beitraege" className="mx-auto max-w-[82rem] px-6 py-16 sm:px-10">
          <div className="flex items-baseline justify-between">
            <h2 style={{ fontWeight: W.regular, letterSpacing: '-0.01em' }} className="text-3xl">Aktuelle Beiträge</h2>
            <a href="#" className="hidden items-center gap-2 text-sm transition-colors hover:opacity-80 sm:inline-flex" style={{ color: PAL.primary }}>
              Alle Beiträge <ArrowRight size={14} />
            </a>
          </div>

          <div className="mt-8 grid gap-px sm:grid-cols-2 lg:grid-cols-3" style={{ background: PAL.line }}>
            {tiles.map((a, i) => {
              const prim = i === 1;
              return (
                <a
                  key={a.slug}
                  href={`/beitrag/${a.slug}`}
                  className="group relative flex min-h-[13rem] flex-col justify-between p-4 transition-opacity hover:opacity-95 focus:[outline-offset:-2px]"
                  style={{ background: prim ? PAL.primary : PAL.surface, color: prim ? PAL.onPrimary : PAL.textPrimary, outline: `2px solid transparent` }}
                >
                  <p style={{ ...label, color: prim ? ON_PRIMARY_SOFT : PAL.textSecondary }} className="text-[11px]">{ressortName(a.ressort)}</p>
                  <div>
                    <h3 style={{ fontWeight: W.regular, lineHeight: 1.25 }} className="pr-8 text-xl">{a.titel}</h3>
                    <span className="absolute bottom-4 right-4 transition-transform group-hover:translate-x-1">
                      <ArrowRight size={20} color={prim ? PAL.onPrimary : PAL.textPrimary} />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* ── CTA-Bahn — Primärton ── */}
        <section style={{ background: PAL.primary, color: PAL.onPrimary }}>
          <div className="mx-auto max-w-[82rem] px-6 py-20 sm:px-10">
            <p style={{ ...label, color: ON_PRIMARY_SOFT }} className="text-xs">Haltung zur Methode</p>
            <p style={{ fontWeight: W.thin, lineHeight: 1.1, letterSpacing: '-0.01em' }} className="mt-6 max-w-[18ch] text-4xl sm:text-6xl">
              Mehrere Dinge können gleichzeitig richtig sein. Aber nicht alles.
            </p>
            <div className="mt-10">
              <UButton href="/ueber" text="Worauf GURT steht" kind="onColor" />
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer style={{ background: PAL.surfaceAlt, color: PAL.textSecondary, borderTop: `1px solid ${PAL.line}` }}>
          <div className="mx-auto grid max-w-[82rem] gap-10 px-6 py-16 sm:grid-cols-3 sm:px-10">
            <div>
              <p style={{ color: PAL.textPrimary }}><span style={{ fontWeight: W.bold }}>GURT</span> Daten-Journalismus</p>
              <p className="mt-3 max-w-xs text-sm">Nicht-kommerziell, quelloffen, im öffentlichen Interesse.</p>
            </div>
            {[
              { h: 'Entdecken', items: ['Beiträge', 'Bereiche', 'Themen'] },
              { h: 'Transparenz', items: ['Methodik', 'Impressum', 'Datenschutz'] },
            ].map((col) => (
              <div key={col.h}>
                <p style={{ ...label, color: PAL.textSecondary }} className="text-[11px]">{col.h}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {col.items.map((it) => (
                    <li key={it}><a href="#" className="transition-colors hover:text-white" style={{ color: PAL.textSecondary }}>{it}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </footer>
      </main>
    </div>
  );
}
