import { ImageResponse } from 'next/og';
import { ogFonts } from './og-fonts';
import { GurtWordmark } from '../lib/gurt-wordmark';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'GURT — Politik verständlich machen';

// Kupfer-Bühne wie der Site-Hero (theme-invariant): feste dunkle Farben auf --primary.
const COPPER = '#f2852c';
const ON_COPPER = '#1c0e03';
const ON_COPPER_SOFT = 'rgba(28,14,3,0.8)';
const FRAME = 'rgba(28, 14, 3, 0.24)';

// Zentriertes Quadrat als Schutzzone (siehe Beitrags-OG): Inhalt in einem mittigen 560-px-Quadrat,
// damit ein 4:3-/quadratischer Mitten-Crop (z. B. Feedly) nichts abschneidet.
const SAFE_SQUARE = 560;

/** Standard-Share-Bild der Seite (Startseite & Seiten ohne eigenes OG-Bild). */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: COPPER,
          color: ON_COPPER,
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', fontSize: 18, letterSpacing: 3, textTransform: 'uppercase', color: ON_COPPER_SOFT }}>
              Datenjournalismus · DE &amp; EU
            </div>
            <GurtWordmark height={26} color={ON_COPPER} />
          </div>

          <div
            style={{
              display: 'flex',
              fontFamily: 'Roboto Slab',
              fontWeight: 400,
              fontSize: 44,
              lineHeight: 1.1,
              letterSpacing: -1,
              marginTop: 30,
            }}
          >
            Politik verständlich machen, ohne sie einfach zu machen.
          </div>

          <div style={{ display: 'flex', flexGrow: 1 }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', width: '100%', height: 2, background: ON_COPPER, opacity: 0.25 }} />
            <div style={{ display: 'flex', fontSize: 18, color: ON_COPPER_SOFT }}>gurt.info · Politik verständlich machen</div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
