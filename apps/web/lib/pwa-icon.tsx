import { ImageResponse } from 'next/og';

// Das App-Icon ist die vom Nutzer gelieferte Wortmarke „GURT“ (FF Unit, als Outline-Pfade). Das
// Favicon ist die statische `app/icon.svg`; Apple-Touch- und Manifest-Icons rastert next/og
// dieselben Pfade zu PNG. Die Pfade unten sind aus `app/icon.svg` gespiegelt (Reihenfolge T·R·U·G
// wie im SVG) — bei Änderung BEIDE angleichen.
const ICON_PATHS = [
  'M39.0127 31.744V21.538H36.3127V19.234H44.3767V21.538H41.6767V31.744H39.0127Z',
  'M27.3242 31.744V19.234H31.2482C34.4522 19.234 35.6402 20.512 35.6402 22.816C35.6402 24.868 34.8482 25.678 33.4262 26.074C34.2362 26.326 34.6862 27.1 35.0462 28.342L36.0362 31.744H33.1562L32.1842 28.18C31.8422 26.92 31.5362 26.65 30.5822 26.65H30.0242V31.744H27.3242ZM30.0242 24.652H31.3562C32.4542 24.652 32.7962 24.13 32.7962 22.96C32.7962 21.898 32.3822 21.502 31.3382 21.502H30.0242V24.652Z',
  'M20.3339 31.978C18.1379 31.978 16.7699 30.772 16.7699 27.622V19.234H19.4699V27.946C19.4699 29.116 19.6859 29.674 20.8559 29.674C21.6479 29.674 22.2239 29.404 22.5839 29.098V19.234H25.2839V31.744H23.3579L23.0159 30.88C22.4399 31.492 21.6479 31.978 20.3339 31.978Z',
  'M13.146 31.744L12.858 31.006C12.264 31.618 11.454 31.978 10.59 31.978C7.674 31.978 6 30.052 6 25.516C6 20.728 7.8 19 11.004 19C12.606 19 13.704 19.414 14.766 20.314L13.326 22.24C12.606 21.646 12.048 21.286 11.148 21.286C9.492 21.286 8.952 22.078 8.952 25.354C8.952 28.846 9.528 29.71 11.04 29.71C11.652 29.71 12.084 29.512 12.426 29.26V26.974H10.86V24.76H15.09V31.744H13.146Z',
];

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
          {ICON_PATHS.map((d) => (
            <path key={d.slice(0, 12)} d={d} fill="black" />
          ))}
        </svg>
      </div>
    ),
    {
      width: size,
      height: size,
      headers: { 'Cache-Control': 'public, max-age=31536000, immutable' },
    },
  );
}
