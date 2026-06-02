import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'GURT — Politik verständlich machen';

/** Standard-Share-Bild der Seite (Startseite & Seiten ohne eigenes OG-Bild). */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #190a33 0%, #2c0a4d 50%, #5e0a3c 100%)',
          color: '#ffffff',
          padding: 72,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 54, fontWeight: 800, letterSpacing: -1 }}>GURT</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 1010 }}>
          <div style={{ display: 'flex', fontSize: 60, fontWeight: 800, lineHeight: 1.05, letterSpacing: -1.5 }}>
            Politik verständlich machen.
          </div>
          <div style={{ display: 'flex', fontSize: 38, fontWeight: 500, lineHeight: 1.15, letterSpacing: -0.5, color: '#e9ddf3' }}>
            Mehrere Dinge können gleichzeitig richtig sein.
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', width: '100%', height: 16, background: 'linear-gradient(90deg, #ffbd00, #ff5400, #ff0054, #9e0059, #390099)' }} />
          <div style={{ display: 'flex', fontSize: 26, color: '#d8c7e6' }}>
            gurt.info · gemeinnütziger Datenjournalismus aus DE & EU
          </div>
        </div>
      </div>
    ),
    size,
  );
}
