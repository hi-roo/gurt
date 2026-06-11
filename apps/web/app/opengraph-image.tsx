import { ImageResponse } from 'next/og';
import { ogFonts } from './og-fonts';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'GURT — Politik verständlich machen';

// Kupfer-Bühne wie der Site-Hero (theme-invariant): feste dunkle Farben auf --primary.
const COPPER = '#f2852c';
const ON_COPPER = '#1c0e03';
const ON_COPPER_SOFT = 'rgba(28,14,3,0.8)';

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
          background: COPPER,
          color: ON_COPPER,
          padding: 72,
          fontFamily: 'Fira Sans',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{ display: 'flex', fontSize: 26, fontFamily: 'Fira Sans', letterSpacing: 2 }}>01</div>
            <div style={{ display: 'flex', width: 56, height: 2, background: ON_COPPER, opacity: 0.5 }} />
            <div style={{ display: 'flex', fontSize: 22, fontFamily: 'Fira Sans', letterSpacing: 3, textTransform: 'uppercase', color: ON_COPPER_SOFT }}>
              Daten-Journalismus · DE / EU
            </div>
          </div>
          <div style={{ display: 'flex', fontSize: 44, fontWeight: 700, letterSpacing: -1 }}>GURT</div>
        </div>

        <div style={{ display: 'flex', fontFamily: 'Gelasio', fontWeight: 500, fontSize: 76, lineHeight: 1.06, letterSpacing: -1.5, maxWidth: 1010 }}>
          Politik verständlich machen, ohne sie einfach zu machen.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', width: '100%', height: 2, background: ON_COPPER, opacity: 0.25 }} />
          <div style={{ display: 'flex', fontSize: 24, fontFamily: 'Fira Sans', color: ON_COPPER_SOFT }}>
            gurt.info · nicht-kommerzieller Datenjournalismus aus DE & EU
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
