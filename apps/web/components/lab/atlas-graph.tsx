'use client';

import { useMemo, useState, type ReactNode } from 'react';

/**
 * DISCOVERY — „Der Atlas": Navigation als Traversierung des Inhaltsgraphen (OOUX).
 *
 * Objekte (Bereiche/Beiträge) sind Knoten; ihre echten Beziehungen sind Kanten:
 * Beitrag → Bereich (1:1, Nabe) und Beitrag → Beitrag über geteilte Themen (n:m, das
 * „Gewebe" zwischen Ressorts). Die Form des Graphen entsteht aus den Daten — Naben-
 * Größe ∝ Anzahl Beiträge, Knoten-Größe ∝ Anzahl Themen (Beziehungsdichte).
 *
 * A11y (Carbon-Prinzip): jeder Knoten ist ein fokussierbarer Link mit aria-label;
 * Tab/Hover aktualisieren die Objekt-Linse; ein vollständiger Listen-Fallback liegt
 * unter dem Graphen. Motion nur bei `prefers-reduced-motion: no-preference`.
 */

export interface AtlasRessort {
  slug: string;
  name: string;
  count: number;
  color: string;
}
export interface AtlasArticle {
  slug: string;
  titel: string;
  ressort: string;
  standfirst?: string;
  themen: { slug: string; name: string }[];
}

const W = 1000;
const H = 640;
const CX = 500;
const CY = 322;
const RX = 322;
const RY = 206;

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

interface Hub {
  id: string;
  name: string;
  color: string;
  x: number;
  y: number;
  r: number;
  count: number;
  angle: number;
}
interface Art {
  id: string;
  titel: string;
  ressort: string;
  color: string;
  x: number;
  y: number;
  r: number;
  themen: { slug: string; name: string }[];
  standfirst?: string;
  hubId: string;
}
type Active = { kind: 'ressort'; id: string } | { kind: 'article'; id: string } | null;

export function AtlasGraph({
  ressorts,
  articles,
}: {
  ressorts: AtlasRessort[];
  articles: AtlasArticle[];
}) {
  const [active, setActive] = useState<Active>(null);

  const { hubs, arts, hubById, artById } = useMemo(() => {
    const n = Math.max(1, ressorts.length);
    const hubs: Hub[] = ressorts.map((r, i) => {
      const angle = -Math.PI / 2 + (i / n) * Math.PI * 2;
      return {
        id: r.slug,
        name: r.name,
        color: r.color,
        x: CX + Math.cos(angle) * RX,
        y: CY + Math.sin(angle) * RY,
        r: 11 + Math.min(r.count, 8) * 2.6,
        count: r.count,
        angle,
      };
    });
    const hubById = new Map(hubs.map((h) => [h.id, h]));

    const byRessort = new Map<string, AtlasArticle[]>();
    for (const a of articles) {
      const list = byRessort.get(a.ressort);
      if (list) list.push(a);
      else byRessort.set(a.ressort, [a]);
    }

    const arts: Art[] = [];
    for (const [slug, list] of byRessort) {
      const hub = hubById.get(slug);
      if (!hub) continue;
      const k = list.length;
      list.forEach((a, j) => {
        const local = hub.angle + (j - (k - 1) / 2) * 0.62;
        const orbit = 72 + (j % 2) * 30;
        arts.push({
          id: a.slug,
          titel: a.titel,
          ressort: a.ressort,
          color: hub.color,
          x: clamp(hub.x + Math.cos(local) * orbit, 44, W - 44),
          y: clamp(hub.y + Math.sin(local) * orbit, 44, H - 44),
          r: 4.5 + Math.min(a.themen.length, 5) * 1.4,
          themen: a.themen,
          standfirst: a.standfirst,
          hubId: hub.id,
        });
      });
    }
    const artById = new Map(arts.map((a) => [a.id, a]));
    return { hubs, arts, hubById, artById };
  }, [ressorts, articles]);

  // Themen-Index → geteilte-Thema-Nachbarschaft (das Ressort-übergreifende Gewebe).
  const sharedBySlug = useMemo(() => {
    const themeIndex = new Map<string, string[]>();
    for (const a of articles) {
      for (const t of a.themen) {
        const list = themeIndex.get(t.slug);
        if (list) list.push(a.slug);
        else themeIndex.set(t.slug, [a.slug]);
      }
    }
    const out = new Map<string, Set<string>>();
    for (const a of articles) {
      const set = new Set<string>();
      for (const t of a.themen) {
        for (const other of themeIndex.get(t.slug) ?? []) if (other !== a.slug) set.add(other);
      }
      out.set(a.slug, set);
    }
    return out;
  }, [articles]);

  // Aktive Beziehungsmenge (zum Hervorheben/Dimmen).
  const related = useMemo(() => {
    if (!active) return null;
    if (active.kind === 'article') {
      const a = artById.get(active.id);
      const set = new Set<string>([active.id]);
      if (a) set.add(a.hubId);
      for (const s of sharedBySlug.get(active.id) ?? []) set.add(s);
      return set;
    }
    const set = new Set<string>([active.id]);
    for (const a of arts) if (a.ressort === active.id) set.add(a.id);
    return set;
  }, [active, artById, arts, sharedBySlug]);

  const isLit = (id: string) => !related || related.has(id);

  // Kreuz-Kanten (geteiltes Thema) nur für den aktiven Beitrag.
  const crossEdges = useMemo(() => {
    if (active?.kind !== 'article') return [];
    const a = artById.get(active.id);
    if (!a) return [];
    const out: { x1: number; y1: number; x2: number; y2: number }[] = [];
    for (const s of sharedBySlug.get(active.id) ?? []) {
      const b = artById.get(s);
      if (b) out.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y });
    }
    return out;
  }, [active, artById, sharedBySlug]);

  const reduce = '@media (prefers-reduced-motion: no-preference)';

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_19rem]">
      {/* Graph-Bühne */}
      <div className="relative overflow-hidden rounded-lg ring-1 ring-white/10" style={{ background: 'radial-gradient(120% 120% at 50% 0%, #131826 0%, #0a0c12 70%)' }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block h-auto w-full"
          role="group"
          aria-label="Inhaltsgraph: Bereiche (Naben) und Beiträge (Knoten), verbunden über geteilte Themen. Mit Tab erkundbar."
        >
          <style>{`
            .atlas-edge { transition: stroke-opacity .35s ease, stroke .35s ease; }
            .atlas-node circle { transition: transform .25s ease, fill-opacity .3s ease; transform-box: fill-box; transform-origin: center; }
            .atlas-node:hover circle.dot, .atlas-node:focus-visible circle.dot { transform: scale(1.55); }
            .atlas-node:focus-visible { outline: none; }
            .atlas-node:focus-visible circle.ring { stroke: #fff; stroke-opacity: .9; }
            ${reduce} {
              .atlas-dot { animation: atlasTwinkle 4.2s ease-in-out infinite; }
              .atlas-pulse { animation: atlasPulse 3.4s ease-out infinite; transform-box: fill-box; transform-origin: center; }
            }
            @keyframes atlasTwinkle { 0%,100% { opacity: .82 } 50% { opacity: 1 } }
            @keyframes atlasPulse { 0% { transform: scale(1); opacity: .45 } 70%,100% { transform: scale(2.4); opacity: 0 } }
          `}</style>

          {/* Kreuz-Kanten (geteiltes Thema) */}
          {crossEdges.map((e, i) => (
            <line key={`x${i}`} className="atlas-edge" x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke="#cdd6ea" strokeOpacity={0.5} strokeWidth={1} />
          ))}

          {/* Naben-Kanten Beitrag → Bereich */}
          {arts.map((a) => {
            const hub = hubById.get(a.hubId);
            if (!hub) return null;
            const lit = isLit(a.id) && isLit(hub.id);
            return (
              <line
                key={`e${a.id}`}
                className="atlas-edge"
                x1={a.x}
                y1={a.y}
                x2={hub.x}
                y2={hub.y}
                stroke={a.color}
                strokeOpacity={related ? (lit ? 0.55 : 0.06) : 0.2}
                strokeWidth={1.2}
              />
            );
          })}

          {/* Naben (Bereiche) */}
          {hubs.map((h) => {
            const lit = isLit(h.id);
            return (
              <a
                key={h.id}
                href={`/ressort/${h.id}`}
                className="atlas-node"
                aria-label={`Bereich ${h.name}, ${h.count} ${h.count === 1 ? 'Beitrag' : 'Beiträge'}`}
                onPointerEnter={() => setActive({ kind: 'ressort', id: h.id })}
                onFocus={() => setActive({ kind: 'ressort', id: h.id })}
                style={{ cursor: 'pointer', opacity: lit ? 1 : 0.32 }}
              >
                <circle className="ring" cx={h.x} cy={h.y} r={h.r + 6} fill="none" stroke={h.color} strokeOpacity={0.5} strokeWidth={1.2} />
                <circle className="atlas-pulse" cx={h.x} cy={h.y} r={h.r + 6} fill="none" stroke={h.color} strokeWidth={1.4} />
                <circle className="dot" cx={h.x} cy={h.y} r={h.r} fill={h.color} fillOpacity={0.95} />
                <text
                  x={h.x}
                  y={h.y - h.r - 11}
                  textAnchor="middle"
                  fill="#e7eaf0"
                  fontSize={15}
                  fontWeight={600}
                  style={{ fontFamily: 'var(--font-sans)', pointerEvents: 'none' }}
                >
                  {h.name}
                </text>
              </a>
            );
          })}

          {/* Knoten (Beiträge) */}
          {arts.map((a, i) => {
            const lit = isLit(a.id);
            return (
              <a
                key={a.id}
                href={`/beitrag/${a.id}`}
                className="atlas-node"
                aria-label={`Beitrag ${a.titel}, Bereich ${a.ressort}, ${a.themen.length} Themen`}
                onPointerEnter={() => setActive({ kind: 'article', id: a.id })}
                onFocus={() => setActive({ kind: 'article', id: a.id })}
                style={{ cursor: 'pointer', opacity: lit ? 1 : 0.26 }}
              >
                <circle className="dot atlas-dot" cx={a.x} cy={a.y} r={a.r} fill={a.color} style={{ animationDelay: `${(i % 7) * 0.5}s` }} />
              </a>
            );
          })}
        </svg>

        {/* Listen-Fallback (Carbon-A11y: gleiche Information ohne Graph) */}
        <details className="border-t border-white/10 px-4 py-3 text-sm text-[#9aa3b2]">
          <summary className="cursor-pointer select-none text-[#cdd6ea]">Als Liste (barrierefrei)</summary>
          <ul className="mt-3 space-y-3">
            {ressorts.map((r) => (
              <li key={r.slug}>
                <a href={`/ressort/${r.slug}`} className="inline-flex items-center gap-2 font-medium text-[#e7eaf0] hover:underline">
                  <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: r.color }} />
                  {r.name} <span className="text-[#6b7282]">· {r.count}</span>
                </a>
                <ul className="ml-5 mt-1 space-y-1">
                  {articles
                    .filter((a) => a.ressort === r.slug)
                    .map((a) => (
                      <li key={a.slug}>
                        <a href={`/beitrag/${a.slug}`} className="text-[#9aa3b2] hover:text-[#e7eaf0] hover:underline">
                          {a.titel}
                        </a>
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        </details>
      </div>

      {/* Objekt-Linse (die „Nested Object Matrix", begehbar) */}
      <ObjectLens active={active} hubById={hubById} artById={artById} arts={arts} sharedBySlug={sharedBySlug} onClear={() => setActive(null)} />
    </div>
  );
}

function ObjectLens({
  active,
  hubById,
  artById,
  arts,
  sharedBySlug,
  onClear,
}: {
  active: Active;
  hubById: Map<string, Hub>;
  artById: Map<string, Art>;
  arts: Art[];
  sharedBySlug: Map<string, Set<string>>;
  onClear: () => void;
}) {
  const base = 'rounded-lg bg-[#11141c] p-4 ring-1 ring-white/10';

  if (!active) {
    return (
      <aside className={base} aria-live="polite">
        <p className="font-mono text-[11px] uppercase tracking-widest text-[#6b7282]">Objekt-Linse</p>
        <p className="mt-3 text-sm text-[#9aa3b2]">
          Jeder Knoten ist ein <strong className="text-[#e7eaf0]">Objekt</strong>, nicht eine Seite. Fahre über eine
          Nabe (Bereich) oder einen Knoten (Beitrag) — oder geh mit <kbd className="rounded bg-white/10 px-1">Tab</kbd>{' '}
          hindurch. Hier erscheinen die <em>verknüpften</em> Objekte zum Weiterspringen.
        </p>
        <p className="mt-4 text-xs text-[#6b7282]">Naben-Größe ∝ Beiträge · Knoten-Größe ∝ Themen · Linien = geteilte Themen.</p>
      </aside>
    );
  }

  if (active.kind === 'ressort') {
    const hub = hubById.get(active.id);
    if (!hub) return null;
    const inRessort = arts.filter((a) => a.ressort === active.id);
    const themen = new Map<string, string>();
    for (const a of inRessort) for (const t of a.themen) themen.set(t.slug, t.name);
    return (
      <aside className={base} aria-live="polite">
        <Header color={hub.color} kind="Bereich" onClear={onClear} />
        <h3 className="mt-2 font-display text-xl font-semibold text-white">{hub.name}</h3>
        <p className="mt-1 text-sm text-[#9aa3b2]">{hub.count} {hub.count === 1 ? 'Beitrag' : 'Beiträge'}</p>
        <Pivot label="Beiträge">
          {inRessort.map((a) => (
            <a key={a.id} href={`/beitrag/${a.id}`} className="block truncate text-sm text-[#cdd6ea] hover:text-white hover:underline">
              {a.titel}
            </a>
          ))}
        </Pivot>
        {themen.size > 0 ? (
          <Pivot label="Themen">
            <div className="flex flex-wrap gap-1.5">
              {[...themen].map(([slug, name]) => (
                <a key={slug} href={`/thema/${slug}`} className="rounded-full border border-white/15 px-2 py-0.5 text-xs text-[#9aa3b2] hover:border-white/40 hover:text-white">
                  {name}
                </a>
              ))}
            </div>
          </Pivot>
        ) : null}
        <a href={`/ressort/${hub.id}`} className="mt-5 inline-block font-mono text-xs uppercase tracking-widest text-white underline underline-offset-4 hover:no-underline">
          Bereich öffnen →
        </a>
      </aside>
    );
  }

  const a = artById.get(active.id);
  if (!a) return null;
  const shared = [...(sharedBySlug.get(a.id) ?? [])].map((s) => artById.get(s)).filter(Boolean) as Art[];
  const ressorts = new Set(shared.map((s) => s.ressort));
  return (
    <aside className={base} aria-live="polite">
      <Header color={a.color} kind={`Beitrag · ${a.ressort}`} onClear={onClear} />
      <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-white">{a.titel}</h3>
      {a.standfirst ? <p className="mt-2 line-clamp-3 text-sm text-[#9aa3b2]">{a.standfirst}</p> : null}
      {a.themen.length > 0 ? (
        <Pivot label="Themen">
          <div className="flex flex-wrap gap-1.5">
            {a.themen.map((t) => (
              <a key={t.slug} href={`/thema/${t.slug}`} className="rounded-full border border-white/15 px-2 py-0.5 text-xs text-[#9aa3b2] hover:border-white/40 hover:text-white">
                {t.name}
              </a>
            ))}
          </div>
        </Pivot>
      ) : null}
      {shared.length > 0 ? (
        <Pivot label={`Verwoben mit ${shared.length} Beiträgen · ${ressorts.size} Bereiche`}>
          {shared.slice(0, 5).map((s) => (
            <a key={s.id} href={`/beitrag/${s.id}`} className="block truncate text-sm text-[#cdd6ea] hover:text-white hover:underline">
              {s.titel}
            </a>
          ))}
        </Pivot>
      ) : null}
      <a href={`/beitrag/${a.id}`} className="mt-5 inline-block font-mono text-xs uppercase tracking-widest text-white underline underline-offset-4 hover:no-underline">
        Beitrag öffnen →
      </a>
    </aside>
  );
}

function Header({ color, kind, onClear }: { color: string; kind: string; onClear: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#9aa3b2]">
        <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: color }} />
        {kind}
      </span>
      <button onClick={onClear} className="text-[#6b7282] hover:text-white" aria-label="Auswahl zurücksetzen">
        ×
      </button>
    </div>
  );
}

function Pivot({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mt-4 border-t border-white/10 pt-3">
      <p className="font-mono text-[10px] uppercase tracking-widest text-[#6b7282]">{label}</p>
      <div className="mt-2 space-y-1">{children}</div>
    </div>
  );
}
