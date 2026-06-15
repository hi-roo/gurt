import './globals.css';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity';
import { isSanityConfigured } from '../sanity/env';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { ServiceWorkerCleanup } from '../components/sw-register';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '../lib/site';

export const metadata: Metadata = {
  title: {
    default: 'GURT — Politik verständlich machen, ohne sie einfach zu machen',
    template: '%s · GURT',
  },
  description: SITE_DESCRIPTION,
  applicationName: 'GURT',
  appleWebApp: { capable: true, title: 'GURT', statusBarStyle: 'default' },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': '/feed.xml' },
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'de_DE',
    url: SITE_URL,
    title: 'GURT — Politik verständlich machen, ohne sie einfach zu machen',
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GURT — Politik verständlich machen, ohne sie einfach zu machen',
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ece9e0' },
    { media: '(prefers-color-scheme: dark)', color: '#0c111d' },
  ],
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  // draftMode() nur abfragen, wenn Sanity konfiguriert ist — so bleibt der
  // Demo-/Seed-Modus vollständig statisch generierbar.
  const isDraft = isSanityConfigured ? (await draftMode()).isEnabled : false;

  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        {/* No-Flash: setzt die Darstellung vor dem ersten Paint (explizite Wahl > System). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();",
          }}
        />
        <link rel="preconnect" href="https://use.typekit.net" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="anonymous" />
        {/* ?v bricht den Browser-Cache des Typekit-Kits nach Kit-Änderungen (zuletzt: Aufräumen
            auf unit + unit-slab, je 400/500/700). */}
        <link rel="stylesheet" href="https://use.typekit.net/nkg1woj.css?v=20260612" />
      </head>
      {/* p-[--page-gutter]: umlaufender „Canvas“-Rahmen — die Flächen schweben auf dem Papier. */}
      <body className="flex min-h-screen flex-col bg-paper p-[var(--page-gutter)] text-ink antialiased">
        {/* Canvas-Karte: zentriert, max. 82rem (= 1476px bei 18px-Root, deckungsgleich mit dem
            Inhalts-Grid). main ist die gerundete Karte (0.75rem) — die erste/letzte farbige
            Fläche (Hero oben, CTA-Bahn unten) zeigt die Ecken sichtbar; der Footer liegt darunter. */}
        <div className="mx-auto flex w-full max-w-[82rem] flex-1 flex-col">
          <SiteHeader />
          <main className="flex-1 overflow-clip rounded-xl">{children}</main>
          <SiteFooter />
        </div>
        {isDraft ? <VisualEditing /> : null}
        <ServiceWorkerCleanup />
      </body>
    </html>
  );
}
