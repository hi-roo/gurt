import { ImageResponse } from 'next/og';
import { dataPalette } from '@gurt/ui/tokens';
import { getArticleBySlug, getArticleSlugs } from '../../../content/repository';
import { posterData } from '../../../content/poster';
import { ogFonts } from '../../og-fonts';
import { GurtWordmark } from '../../../lib/gurt-wordmark';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'GURT — Politik verständlich machen';

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Palette „Glut im Dunkel“ (Hell): Bone-Papier, Ink, Kupfer-Akzent (AA-geprüfte Paare).
const PAPER = '#ece9e0';
const INK = '#16202f';
const MUTED = '#5a5346';
const ACCENT = '#984809';
const COPPER = '#f2852c';
const FRAME = 'rgba(22, 32, 47, 0.18)';

// Zentriertes Quadrat als Schutzzone: Manche Tools (z. B. Feedly) schneiden das 1200×630-Bild
// mittig auf 4:3 oder quadratisch zu. Ein quadratischer Mitten-Crop behält die mittleren 630 px;
// das gesamte Bild-Layout sitzt deshalb in einem zentrierten 560-px-Quadrat (Puffer je Seite),
// damit in JEDEM Mitten-Crop (quadratisch, 4:3, voll) nichts abgeschnitten wird.
const SAFE_SQUARE = 560;

/**
 * Share-/OG-Bild je Beitrag: Bone-Papier, Kicker/Meta in FF-Unit-Stellvertreter
 * (Fira Sans, Tief-Kupfer), Wortmarke, Slab-Headline (Roboto Slab) und proportionale
 * Daten-Segmente aus dem Beitrag — alles in einem zentrierten, crop-sicheren Quadrat.
 * Wird von Next automatisch als og:image / twitter:image eingebunden.
 */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  const data = article ? posterData(article) : null;

  const kicker = data?.kicker ?? article?.themen?.[0]?.name ?? 'Datenjournalismus';
  const title = data?.title ?? article?.titel ?? 'GURT';
  const segments = [...(data?.segments ?? [])].sort((a, b) => b.value - a.value);
  const total = segments.reduce((acc, s) => acc + s.value, 0) || 1;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: PAPER,
          color: INK,
          fontFamily: 'Fira Sans',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: SAFE_SQUARE,
            height: SAFE_SQUARE,
            border: `1px solid ${FRAME}`,
            padding: 44,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', fontSize: 20, letterSpacing: 4, textTransform: 'uppercase', color: ACCENT }}>
              {kicker}
            </div>
            <GurtWordmark height={26} color={INK} />
          </div>

          <div
            style={{
              display: 'flex',
              fontFamily: 'Roboto Slab',
              fontWeight: 400,
              fontSize: 40,
              lineHeight: 1.12,
              letterSpacing: -0.5,
              marginTop: 30,
            }}
          >
            {title}
          </div>

          <div style={{ display: 'flex', flexGrow: 1 }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', width: '100%', height: 40, overflow: 'hidden' }}>
              {segments.length
                ? segments.map((s, i) => (
                    <div
                      key={s.label}
                      style={{ display: 'flex', flexGrow: s.value / total, flexBasis: 0, background: dataPalette[i % dataPalette.length] }}
                    />
                  ))
                : [<div key="c" style={{ display: 'flex', width: '100%', background: COPPER }} />]}
            </div>
            <div style={{ display: 'flex', fontSize: 18, color: MUTED }}>gurt.info · Politik verständlich machen</div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
