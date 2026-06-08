import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import { getArticles } from '../../../content/repository';
import { ressortName } from '../../../content/ressorts';
import { FlowHero } from '../../../components/lab/flow-hero';

export const metadata: Metadata = { title: 'Carbon — IBM-Design-Sprache (Discovery)' };

const plexSans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['300', '400', '600', '700'], variable: '--plex-sans', display: 'swap' });
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--plex-mono', display: 'swap' });

// Carbon Design System — Farb-Tokens (IBM Design Language, White-Theme).
const C = {
  white: '#ffffff',
  layer: '#f4f4f4', // gray-10
  layerHover: '#e8e8e8',
  border: '#e0e0e0', // gray-20
  text: '#161616', // gray-100
  textSec: '#525252', // gray-70
  textOnColor: '#ffffff',
  blue: '#0f62fe', // blue-60 — interactive / primary
  blueHover: '#0353e9',
  blue70: '#0043ce',
  inverse: '#161616', // gray-100 (UI-Shell)
  inverseHover: '#2c2c2c',
  inverseBorder: '#393939',
};

function ArrowRight({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill={color} aria-hidden="true" className="shrink-0">
      <path d="M8 0L6.59 1.41 12.17 7H0v2h12.17l-5.58 5.59L8 16l8-8z" />
    </svg>
  );
}

// Carbon-Button (rechteckig, Label links / Pfeil rechts, 48 px hoch).
function CButton({
  href,
  label,
  kind = 'primary',
}: {
  href: string;
  label: string;
  kind?: 'primary' | 'white' | 'ghostWhite' | 'tertiary';
}) {
  const style: Record<string, CSSProperties> = {
    primary: { background: C.blue, color: C.white },
    white: { background: C.white, color: C.text },
    ghostWhite: { background: 'transparent', color: C.white, boxShadow: `inset 0 0 0 1px ${C.white}` },
    tertiary: { background: 'transparent', color: C.blue, boxShadow: `inset 0 0 0 1px ${C.blue}` },
  };
  const hover: Record<string, string> = {
    primary: 'hover:bg-[#0353e9]',
    white: 'hover:bg-[#e8e8e8]',
    ghostWhite: 'hover:bg-[#ffffff1a]',
    tertiary: 'hover:bg-[#0f62fe14]',
  };
  return (
    <a
      href={href}
      style={{ ...style[kind], minWidth: 224, height: 48, paddingLeft: 16, paddingRight: 16 }}
      className={`inline-flex items-center justify-between text-sm leading-none transition-colors ${hover[kind]}`}
    >
      <span className="pr-12">{label}</span>
      <ArrowRight />
    </a>
  );
}

export default async function LabCarbonPage() {
  const articles = await getArticles();
  const feature = articles[0];
  const tiles = articles.slice(1, 7);

  return (
    <div className={`${plexSans.variable} ${plexMono.variable} bg-white`} style={{ fontFamily: 'var(--plex-sans)', color: C.text }}>
      {/* ── UI-Shell-Header (Carbon, 48 px, dunkel) ── */}
      <header style={{ height: 48, background: C.inverse, borderBottom: `1px solid ${C.inverseBorder}` }} className="sticky top-0 z-40 flex items-stretch text-white">
        <a href="/lab/carbon" className="flex items-center px-4 text-sm hover:bg-[#2c2c2c]" style={{ borderRight: `1px solid ${C.inverseBorder}` }}>
          <span className="font-semibold">GURT</span>
          <span className="ml-1.5 text-[#c6c6c6]">Daten-Journalismus</span>
        </a>
        <nav className="hidden items-stretch md:flex" aria-label="Hauptnavigation">
          {['Beiträge', 'Bereiche', 'Themen', 'Methodik'].map((n, i) => (
            <a
              key={n}
              href="#beitraege"
              className="relative flex items-center px-4 text-sm text-[#c6c6c6] hover:bg-[#2c2c2c] hover:text-white"
              style={i === 0 ? { color: '#fff', boxShadow: `inset 0 -3px 0 0 ${C.blue}` } : undefined}
            >
              {n}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-stretch">
          {['Suche', 'Konto'].map((label) => (
            <button key={label} aria-label={label} className="flex w-12 items-center justify-center hover:bg-[#2c2c2c]">
              {label === 'Suche' ? (
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
        {/* ── Lead space (Carbon-Muster), Primärfarbe dominiert ── */}
        <section className="relative grid lg:grid-cols-2" style={{ borderBottom: `1px solid ${C.border}` }}>
          {/* Text-Hälfte — Blue 60 */}
          <div style={{ background: C.blue, color: C.textOnColor }} className="flex flex-col justify-between px-6 pt-12 pb-10 sm:px-10 lg:min-h-[34rem] lg:pt-20">
            <div>
              <p style={{ fontFamily: 'var(--plex-mono)' }} className="text-xs uppercase tracking-wide text-white/80">
                Daten-Journalismus · DE / EU
              </p>
              <h1 style={{ fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.08 }} className="mt-6 max-w-[15ch] text-4xl sm:text-5xl lg:text-[3.5rem]">
                Politik verständlich machen, ohne sie einfach zu machen.
              </h1>
            </div>
            <div className="mt-10 max-w-md">
              <p className="text-base leading-relaxed text-white/85">
                Politische Leitlinien — erklärt mit Datenvisualisierung, offengelegten Quellen und anschaulichen Beispielen.
              </p>
              <div className="mt-8 flex flex-wrap gap-px">
                <CButton href="#beitraege" label="Beiträge ansehen" kind="white" />
                <CButton href="/methodik" label="Methodik" kind="ghostWhite" />
              </div>
            </div>
          </div>
          {/* Key-Visual-Hälfte — generative Grafik auf Gray-100 */}
          <div className="relative min-h-[20rem] overflow-hidden bg-[#161616] lg:min-h-[34rem]">
            {feature ? <FlowHero values={[1.16, 1.18, 1.23, 1.33, 1.49, 1.43, 1.61, 2.0]} seed={feature.slug} tone="ink" motion="always" className="absolute inset-0 h-full" /> : null}
            {/* Primärfarbe dominiert auch das Key-Visual: Spuren in Blue 60 umfärben + leichter Wash */}
            <div aria-hidden="true" className="absolute inset-0" style={{ background: C.blue, mixBlendMode: 'hue' }} />
            <div aria-hidden="true" className="absolute inset-0" style={{ background: C.blue, opacity: 0.14 }} />
            <span style={{ fontFamily: 'var(--plex-mono)' }} className="absolute bottom-4 left-4 z-10 text-[11px] uppercase tracking-wide text-white/55">
              Key Visual · generativ aus Daten
            </span>
          </div>
        </section>

        {/* ── Tile-Gruppe (Carbon ClickableTiles) ── */}
        <section id="beitraege" className="mx-auto max-w-[82rem] px-6 py-16 sm:px-10">
          <div className="flex items-baseline justify-between">
            <h2 style={{ fontWeight: 400, letterSpacing: '-0.01em' }} className="text-3xl">Aktuelle Beiträge</h2>
            <a href="#" className="hidden items-center gap-2 text-sm text-[#0f62fe] hover:underline sm:inline-flex">
              Alle Beiträge <ArrowRight size={14} />
            </a>
          </div>

          <div className="mt-8 grid gap-px sm:grid-cols-2 lg:grid-cols-3" style={{ background: C.border }}>
            {tiles.map((a, i) => {
              const blue = i === 1;
              return (
                <a
                  key={a.slug}
                  href={`/beitrag/${a.slug}`}
                  className="group relative flex min-h-[13rem] flex-col justify-between p-4 transition-colors focus:[outline:2px_solid_#0f62fe] focus:[outline-offset:-2px]"
                  style={{ background: blue ? C.blue : C.layer, color: blue ? C.textOnColor : C.text }}
                >
                  <p style={{ fontFamily: 'var(--plex-mono)', color: blue ? 'rgba(255,255,255,.8)' : C.textSec }} className="text-[11px] uppercase tracking-wide">
                    {ressortName(a.ressort)}
                  </p>
                  <div>
                    <h3 style={{ fontWeight: 400, lineHeight: 1.25 }} className="pr-8 text-xl">{a.titel}</h3>
                    <span className="absolute bottom-4 right-4 transition-transform group-hover:translate-x-1">
                      <ArrowRight size={20} color={blue ? '#fff' : '#161616'} />
                    </span>
                  </div>
                  <span aria-hidden="true" className="pointer-events-none absolute inset-0 transition-colors group-hover:bg-[#00000010]" />
                </a>
              );
            })}
          </div>
        </section>

        {/* ── Voll-breite CTA-Bahn — Primärfarbe ── */}
        <section style={{ background: C.blue, color: C.textOnColor }}>
          <div className="mx-auto max-w-[82rem] px-6 py-20 sm:px-10">
            <p style={{ fontFamily: 'var(--plex-mono)' }} className="text-xs uppercase tracking-wide text-white/80">Haltung zur Methode</p>
            <p style={{ fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.01em' }} className="mt-6 max-w-[18ch] text-4xl sm:text-6xl">
              Mehrere Dinge können gleichzeitig richtig sein. Aber nicht alles.
            </p>
            <div className="mt-10">
              <CButton href="/ueber" label="Worauf GURT steht" kind="white" />
            </div>
          </div>
        </section>

        {/* ── Carbon-Footer (Gray-100) ── */}
        <footer style={{ background: C.inverse, color: '#c6c6c6', borderTop: `1px solid ${C.inverseBorder}` }}>
          <div className="mx-auto grid max-w-[82rem] gap-10 px-6 py-16 sm:grid-cols-3 sm:px-10">
            <div>
              <p className="text-white"><span className="font-semibold">GURT</span> Daten-Journalismus</p>
              <p className="mt-3 max-w-xs text-sm">Nicht-kommerziell, quelloffen, im öffentlichen Interesse.</p>
            </div>
            {[
              { h: 'Entdecken', items: ['Beiträge', 'Bereiche', 'Themen'] },
              { h: 'Transparenz', items: ['Methodik', 'Impressum', 'Datenschutz'] },
            ].map((col) => (
              <div key={col.h}>
                <p style={{ fontFamily: 'var(--plex-mono)' }} className="text-[11px] uppercase tracking-wide text-[#6f6f6f]">{col.h}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {col.items.map((it) => (
                    <li key={it}><a href="#" className="hover:text-white hover:underline">{it}</a></li>
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
