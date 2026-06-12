import { dataPalette } from '@gurt/ui/tokens';

export interface SignatureSegment {
  label: string;
  value: number;
}

export interface SignaturePosterProps {
  /** Großer Titel (Kernaussage). */
  title: string;
  /** Kicker / Thema über dem Titel. */
  kicker?: string;
  /** Anteils-Segmente — werden zu Verlaufsbalken (absteigend sortiert). */
  segments: SignatureSegment[];
  /** Einheit der Werte (z. B. „TWh“). */
  unit?: string;
  /** Quellenzeile. */
  source?: string;
}

const fmt = (n: number): string => n.toLocaleString('de-DE', { maximumFractionDigits: 1 });

/** Lesbare Textfarbe (schwarz/weiß) je nach Helligkeit. */
function ink(hex: string): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.62 ? '#0c0a09' : '#ffffff';
}

/**
 * Signatur-Poster (PoC): ein quadratischer, „vibrierender“ Poster-Frame aus echten
 * Beitragsdaten — Verlaufsbalken (Anteile), große Display-Typo, Punktraster, Wortmarke.
 * Skaliert über Container-Query-Einheiten (cqw), funktioniert daher in jeder Größe
 * (Bildschirm, Export 1080×1080). Marken-Ausdruck, kein präzises Analyse-Diagramm —
 * der Tabellen-Fallback der regulären Charts bleibt die barrierefreie Datenquelle.
 */
export function SignaturePoster({ title, kicker, segments, unit, source }: SignaturePosterProps) {
  const total = segments.reduce((acc, s) => acc + s.value, 0) || 1;
  const sorted = [...segments].sort((a, b) => b.value - a.value);

  const dotted = {
    backgroundImage: 'radial-gradient(currentColor 1.4px, transparent 1.5px)',
    backgroundSize: '2.4cqw 2.4cqw',
  } as const;

  return (
    <div className="@container relative isolate aspect-square w-full overflow-hidden bg-paper text-ink">
      {/* Punktraster in der Negativfläche (Homage an die Referenz) */}
      <div aria-hidden className="pointer-events-none absolute right-[7%] top-[9%] h-[20%] w-[26%] text-line" style={dotted} />
      <div aria-hidden className="pointer-events-none absolute right-[16%] top-[40%] h-[12%] w-[16%] text-line" style={dotted} />

      {/* Kopf: Kicker + Titel */}
      <header className="absolute inset-x-[6%] top-[7%] z-10">
        {kicker ? (
          <div className="font-caption text-[1.5cqw] font-medium uppercase tracking-[0.22em] text-accent">{kicker}</div>
        ) : null}
        <h2 className="mt-[1.2cqw] max-w-[82%] font-display text-[5.4cqw] font-bold leading-[1.02] tracking-tight text-balance">
          {title}
        </h2>
      </header>

      {/* Wortmarke */}
      <div className="absolute right-[6%] top-[7%] z-10 font-display text-[2.6cqw] font-bold tracking-tight">GURT</div>

      {/* Verlaufsbalken (Anteile am Ganzen) */}
      <div className="absolute inset-x-[6%] bottom-[7%] flex h-[60%] items-stretch gap-[0.6cqw]">
        {sorted.map((s, i) => {
          const color = dataPalette[i % dataPalette.length] ?? dataPalette[0];
          const share = s.value / total;
          return (
            <div
              key={s.label}
              className="relative flex h-full min-w-0 items-start justify-start overflow-hidden"
              style={{
                flexGrow: share,
                flexBasis: 0,
                background: `linear-gradient(168deg, ${color} 0%, color-mix(in srgb, ${color} 64%, #000) 100%)`,
                color: ink(color),
              }}
            >
              <div className="px-[0.7cqw] py-[1cqw] text-[1.45cqw] font-semibold leading-tight [writing-mode:vertical-rl] rotate-180">
                <span>{s.label}</span>
                <span className="font-normal opacity-80">
                  {'  '}
                  {fmt(s.value)}
                  {unit ? ` ${unit}` : ''} · {(share * 100).toFixed(0)} %
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quellenzeile */}
      {source ? (
        <div className="absolute inset-x-[6%] bottom-[2.5%] z-10 font-caption text-[1.25cqw] text-subtle">
          Quelle: {source}
        </div>
      ) : null}
    </div>
  );
}
