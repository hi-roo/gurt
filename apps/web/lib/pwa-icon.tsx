import { ImageResponse } from 'next/og';
import { GURT_WORDMARK_PATHS } from './gurt-wordmark';

// Das App-Icon ist die Wortmarke „GURT“ (FF Unit, Outline-Pfade). Pfad-Quelle: lib/gurt-wordmark
// (identisch zu app/icon.svg). Das Favicon ist die statische `app/icon.svg`; Apple-Touch- und
// Manifest-Icons rastert next/og dieselben Pfade zu PNG.

/**
 * Rendert das App-Icon als PNG (next/og rastert das inline-SVG). `maskable` verkleinert das
 * Zeichen in die OS-Maskenzone (innere ~80 %); der weiße Grund füllt randlos weiter.
 */
export async function renderIcon(size: number, maskable = false): Promise<ImageResponse> {
  const inner = maskable ? Math.round(size * 0.82) : size;
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ffffff',
        }}
      >
        <svg width={inner} height={inner} viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
          <rect width="50" height="50" fill="white" />
          {GURT_WORDMARK_PATHS.map((d) => (
            <path key={d.slice(0, 12)} d={d} fill="black" />
          ))}
        </svg>
      </div>
    ),
    {
      width: size,
      height: size,
      // NICHT immutable: Icon-Inhalt kann sich ändern, ohne dass die Route-URL wechselt — sonst
      // hängt ein altes Icon bis zu einem Jahr im Cache. Kurz cachen, dann revalidieren.
      headers: { 'Cache-Control': 'public, max-age=3600, must-revalidate' },
    },
  );
}
