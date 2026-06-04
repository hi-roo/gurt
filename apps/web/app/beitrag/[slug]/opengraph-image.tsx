import { ImageResponse } from 'next/og';
import { dataPalette } from '@gurt/ui/tokens';
import { getArticleBySlug, getArticleSlugs } from '../../../content/repository';
import { posterData } from '../../../content/poster';
import { ogFonts } from '../../og-fonts';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'GURT — Politik verständlich machen';

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

/**
 * Share-/OG-Bild je Beitrag: heller Hintergrund, Marken-Schrift-Ersatz (Fira),
 * Kicker/Meta in Mono („Correspondence"-Charakter), Wortmarke, Kernaussage und
 * proportionale Verlaufsbalken aus den Beitragsdaten. Wird von Next automatisch
 * als og:image / twitter:image eingebunden.
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
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #f7f6f4 0%, #ecebe8 100%)',
          color: '#1c1917',
          padding: 64,
          fontFamily: 'Fira Sans',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', fontSize: 25, fontFamily: 'Fira Mono', letterSpacing: 4, textTransform: 'uppercase', color: '#9e0059' }}>
            {kicker}
          </div>
          <div style={{ display: 'flex', fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>GURT</div>
        </div>

        <div style={{ display: 'flex', fontSize: 64, fontWeight: 700, lineHeight: 1.04, letterSpacing: -1.5, maxWidth: 1040 }}>
          {title}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', width: '100%', height: 64, overflow: 'hidden' }}>
            {segments.length
              ? segments.map((s, i) => (
                  <div
                    key={s.label}
                    style={{ display: 'flex', flexGrow: s.value / total, flexBasis: 0, background: dataPalette[i % dataPalette.length] }}
                  />
                ))
              : [
                  <div key="g" style={{ display: 'flex', width: '100%', background: 'linear-gradient(90deg, #ffbd00, #ff5400, #ff0054, #9e0059, #390099)' }} />,
                ]}
          </div>
          <div style={{ display: 'flex', fontSize: 24, fontFamily: 'Fira Mono', color: '#57534e' }}>gurt.info · Politik verständlich machen</div>
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
