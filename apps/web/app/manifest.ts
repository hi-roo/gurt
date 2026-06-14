import type { MetadataRoute } from 'next';
import { SITE_DESCRIPTION } from '../lib/site';

/**
 * Web App Manifest → macht GURT installierbar (Homescreen/Desktop, eigenes Icon, Splash).
 * Next verlinkt es automatisch als `<link rel="manifest">`. Icons kommen aus `/pwa-icon`
 * (next/og), Farben aus den Marken-Tokens (Paper). Theme-Color je Modus setzt das Layout
 * (`viewport.themeColor`).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'GURT — Datenjournalismus',
    short_name: 'GURT',
    description: SITE_DESCRIPTION,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    lang: 'de',
    dir: 'ltr',
    background_color: '#ece9e0',
    theme_color: '#ece9e0',
    categories: ['news', 'education', 'politics'],
    icons: [
      { src: '/pwa-icon?size=192', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/pwa-icon?size=512', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/pwa-icon?size=512&maskable=1', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
