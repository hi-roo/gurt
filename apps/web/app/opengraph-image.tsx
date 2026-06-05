import { ImageResponse } from 'next/og';
import { ogFonts } from './og-fonts';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'GURT — Politik verständlich machen';

/** Standard-Share-Bild der Seite (Startseite & Seiten ohne eigenes OG-Bild). */
export default async function Image() {
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
          padding: 72,
          fontFamily: 'Fira Sans',
        }}
      >
        <div style={{ display: 'flex', fontSize: 48, fontWeight: 700, letterSpacing: -1 }}>GURT</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 1010 }}>
          <div style={{ display: 'flex', fontSize: 62, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1.5 }}>
            Politik verständlich machen.
          </div>
          <div style={{ display: 'flex', fontSize: 37, fontWeight: 400, lineHeight: 1.2, letterSpacing: -0.3, color: '#57534e' }}>
            Mehrere Dinge können gleichzeitig richtig sein.
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', width: '100%', height: 16, background: 'linear-gradient(90deg, #ffbd00, #ff5400, #ff0054, #9e0059, #390099)' }} />
          <div style={{ display: 'flex', fontSize: 24, fontFamily: 'Fira Mono', color: '#57534e' }}>
            gurt.info · nicht-kommerzieller Datenjournalismus aus DE & EU
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
