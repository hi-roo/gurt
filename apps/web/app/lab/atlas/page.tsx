import type { Metadata } from 'next';
import { dataPalette } from '@gurt/ui/tokens';
import { getArticles, getRessorts, getThemes } from '../../../content/repository';
import { RESSORTS } from '../../../content/ressorts';
import { AtlasGraph, type AtlasArticle, type AtlasRessort } from '../../../components/lab/atlas-graph';

export const metadata: Metadata = { title: 'Atlas — Navigation als Inhaltsgraph (Discovery)' };

const PALETTE = dataPalette as readonly string[];
const colorForRessort = (slug: string) => {
  const i = RESSORTS.findIndex((r) => r.slug === slug);
  return PALETTE[(i < 0 ? 0 : i) % PALETTE.length] ?? '#9e0059';
};

// OOUX-Objektinventar — die Objekt-Typen als Einstiege, mit ihren Kern-Beziehungen.
const OBJECT_TYPES = [
  { name: 'Beitrag', rel: '→ Bereich · Themen · Datensätze · Quellen · Akteure', live: true, desc: 'Redaktionelle Einheit. Erbt die Farbe ihres Bereichs.', tone: '#e7eaf0' },
  { name: 'Bereich', rel: '→ Beiträge', live: true, desc: 'Feste, institutionelle Top-Ebene (Ministerien-orientiert).', tone: '#3d6fe0' },
  { name: 'Thema', rel: '↔ Beiträge (n:m)', live: true, desc: 'Offene Tags — das Gewebe quer zu den Bereichen.', tone: '#1f9e5a' },
  { name: 'Datensatz', rel: '→ Quelle · ← Visualisierung', live: false, desc: 'Zahlenbasis mit Provenienz. Jede Zahl hat eine Quelle.', tone: '#ffbd00' },
  { name: 'Quelle', rel: '← Beitrag · Datensatz · Position', live: false, desc: 'Belegt Aussagen und Daten — der Transparenz-Anker.', tone: '#ff5400' },
  { name: 'Akteur', rel: '↔ Maßnahme (Position)', live: false, desc: 'Person/Institution; verbindet Beiträge über Positionen.', tone: '#ff0054' },
];

export default async function LabAtlasPage() {
  const [ressortSummaries, themes, articles] = await Promise.all([getRessorts(), getThemes(), getArticles()]);

  const ressorts: AtlasRessort[] = ressortSummaries.map((r) => ({
    slug: r.slug,
    name: r.name,
    count: r.count,
    color: colorForRessort(r.slug),
  }));

  const atlasArticles: AtlasArticle[] = articles.map((a) => ({
    slug: a.slug,
    titel: a.titel,
    ressort: a.ressort ?? '',
    standfirst: a.standfirst,
    themen: (a.themen ?? []).flatMap((t) => (t.slug ? [{ slug: t.slug, name: t.name }] : [])),
  }));

  const counts: Record<string, number> = { Beitrag: articles.length, Bereich: ressorts.length, Thema: themes.length };

  return (
    <div className="min-h-screen bg-[#0a0c12] text-[#e7eaf0]" style={{ fontFamily: 'var(--font-sans)' }}>
      {/* OOUX-Objekt-Shell (persistente Primärnavigation) */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0a0c12]/85 backdrop-blur">
        <div className="mx-auto flex max-w-[78rem] items-center gap-6 px-5 py-3">
          <span className="font-display text-sm font-bold tracking-wide">
            GURT<span className="text-[#6b7282]"> / Atlas</span>
          </span>
          <nav aria-label="Objekt-Typen" className="hidden flex-1 items-center gap-1 md:flex">
            {OBJECT_TYPES.map((o, i) => (
              <a
                key={o.name}
                href="#objekte"
                className={`rounded-full px-3 py-1 text-xs transition-colors ${
                  i === 0 ? 'bg-white/10 text-white' : 'text-[#9aa3b2] hover:bg-white/5 hover:text-white'
                }`}
              >
                {o.name}
              </a>
            ))}
          </nav>
          <button
            type="button"
            className="ml-auto inline-flex items-center gap-2 rounded-md border border-white/12 px-3 py-1.5 text-xs text-[#9aa3b2] transition-colors hover:border-white/30 hover:text-white"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Suchen
            <kbd className="rounded bg-white/10 px-1 font-mono text-[10px]">⌘K</kbd>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[78rem] px-5 pb-24">
        {/* Hero */}
        <section className="py-14 sm:py-20">
          <p className="font-mono text-xs uppercase tracking-widest text-[#6b7282]">Discovery · Konzept · OOUX</p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.05] sm:text-6xl">
            Navigation ist <span className="text-[#3d6fe0]">Beziehung</span>,<br className="hidden sm:block" /> nicht Hierarchie.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg text-[#9aa3b2]">
            Ein skalierbares Navigationskonzept nach <strong className="text-[#e7eaf0]">Object-Oriented UX</strong>: Nutzer
            denken in Objekten — Beiträgen, Bereichen, Themen, Datensätzen, Quellen, Akteuren — nicht in Seitenbäumen.
            GURTs Inhalte sind ein Graph. Diese Navigation macht den Graph begehbar; die <em>Daten</em> formen ihre Gestalt.
          </p>
          <div className="mt-7 flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-widest text-[#6b7282]">
            <span className="rounded border border-white/10 px-2.5 py-1">OOUX-Methodik</span>
            <span className="rounded border border-white/10 px-2.5 py-1">Carbon-A11y</span>
            <span className="rounded border border-white/10 px-2.5 py-1">Payload-Ästhetik</span>
            <span className="rounded border border-white/10 px-2.5 py-1">Dark-by-default</span>
          </div>
        </section>

        {/* Der Atlas */}
        <section aria-labelledby="atlas-h" className="border-t border-white/10 pt-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="atlas-h" className="font-display text-2xl font-semibold">Der Inhaltsgraph</h2>
              <p className="mt-2 max-w-xl text-sm text-[#9aa3b2]">
                Naben = Bereiche, Knoten = Beiträge, Linien = geteilte Themen. Größe und Verbindungen kommen aus den
                echten Beziehungen — nicht aus Dekoration.
              </p>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-[#6b7282]">
              {counts.Bereich} Bereiche · {counts.Beitrag} Beiträge · {counts.Thema} Themen
            </p>
          </div>
          <div className="mt-7">
            <AtlasGraph ressorts={ressorts} articles={atlasArticles} />
          </div>
        </section>

        {/* OOUX-Objektinventar */}
        <section id="objekte" aria-labelledby="obj-h" className="mt-20 border-t border-white/10 pt-12">
          <h2 id="obj-h" className="font-display text-2xl font-semibold">Objekte statt Seiten</h2>
          <p className="mt-2 max-w-2xl text-sm text-[#9aa3b2]">
            Jeder Objekt-Typ ist ein Einstieg. Die <span className="text-[#e7eaf0]">Nested Object Matrix</span> — welches
            Objekt auf welches verweist — wird zur Navigation: man springt entlang der Beziehungen.
          </p>
          <div className="mt-8 grid gap-px overflow-hidden rounded-lg bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {OBJECT_TYPES.map((o) => (
              <div key={o.name} className="bg-[#11141c] p-5">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 font-display text-lg font-semibold">
                    <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: o.tone }} />
                    {o.name}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[#6b7282]">
                    {o.live ? `${counts[o.name] ?? 0}` : 'im Modell'}
                  </span>
                </div>
                <p className="mt-3 text-sm text-[#9aa3b2]">{o.desc}</p>
                <p className="mt-3 font-mono text-[11px] text-[#6b7282]">{o.rel}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Drei Navigationsebenen */}
        <section aria-labelledby="ebenen-h" className="mt-20 border-t border-white/10 pt-12">
          <h2 id="ebenen-h" className="font-display text-2xl font-semibold">Drei Ebenen, eine Logik</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              { n: '01', t: 'Objekt-Shell', d: 'Persistente Primärnavigation aus den Objekt-Typen + Befehlspalette (⌘K). Skaliert, weil neue Inhalte neue Knoten sind, keine neuen Menüpunkte.' },
              { n: '02', t: 'Objekt-Linse', d: 'Jedes Objekt zeigt seine verknüpften Objekte als Pivots — vom Beitrag zu Quelle, Thema, Akteur. Springen statt zurück-navigieren.' },
              { n: '03', t: 'Atlas-Graph', d: 'Die Vogelperspektive: der Inhaltsgraph als Raum. Daten formen Größe, Nähe und Verbindung. Mit Tastatur- und Listen-Fallback.' },
            ].map((e) => (
              <div key={e.n} className="rounded-lg bg-[#11141c] p-5 ring-1 ring-white/10">
                <p className="font-mono text-xs text-[#3d6fe0]">{e.n}</p>
                <h3 className="mt-2 font-display text-lg font-semibold">{e.t}</h3>
                <p className="mt-2 text-sm text-[#9aa3b2]">{e.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Radikale Horizonte */}
        <section aria-labelledby="hor-h" className="mt-20 border-t border-white/10 pt-12">
          <h2 id="hor-h" className="font-display text-2xl font-semibold">Radikale Horizonte — und der nächste machbare Schritt</h2>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <div className="rounded-lg border border-dashed border-white/15 p-5">
              <p className="font-mono text-[11px] uppercase tracking-widest text-[#6b7282]">Horizont</p>
              <p className="mt-2 text-sm text-[#9aa3b2]">
                <strong className="text-[#e7eaf0]">Navigation als 3D-Raum:</strong> durch eine Daten-Konstellation fliegen,
                Cluster als Galaxien, Zeit als Tiefe. Beeindruckend — aber teuer für Performance, A11y und Mobile.
              </p>
            </div>
            <div className="rounded-lg bg-[#11141c] p-5 ring-1 ring-white/10">
              <p className="font-mono text-[11px] uppercase tracking-widest text-[#3ddc97]">Umgesetzt</p>
              <p className="mt-2 text-sm text-[#9aa3b2]">
                <strong className="text-[#e7eaf0]">2D-Konstellation, SVG, daten­getrieben:</strong> dieselbe Idee — Räumlichkeit
                aus Beziehungen — aber fokussierbar, tastaturbedienbar, mit Listen-Fallback und{' '}
                <code className="text-[#cdd6ea]">prefers-reduced-motion</code>. Ehrlichkeit vor Effekt.
              </p>
            </div>
          </div>
        </section>

        <p className="mt-16 border-t border-white/10 pt-6 text-xs text-[#6b7282]">
          Discovery-Prototyp unter <code>/lab/atlas</code> · <strong>noindex</strong>, nicht in der Navigation · von der
          Live-Version getrennt. Graph aus echten Inhalten; Datensatz/Quelle/Akteur sind im Modell vorhanden und der
          nächste Ausbau.
        </p>
      </main>
    </div>
  );
}
