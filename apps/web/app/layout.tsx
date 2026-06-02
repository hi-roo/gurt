import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity';
import { isSanityConfigured } from '../sanity/env';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '../lib/site';

export const metadata: Metadata = {
  title: {
    default: 'GURT — Politik verständlich machen',
    template: '%s · GURT',
  },
  description: SITE_DESCRIPTION,
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
    title: 'GURT — Politik verständlich machen',
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GURT — Politik verständlich machen',
    description: SITE_DESCRIPTION,
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  // draftMode() nur abfragen, wenn Sanity konfiguriert ist — so bleibt der
  // Demo-/Seed-Modus vollständig statisch generierbar.
  const isDraft = isSanityConfigured ? (await draftMode()).isEnabled : false;

  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://use.typekit.net" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://use.typekit.net/nkg1woj.css" />
      </head>
      <body className="flex min-h-screen flex-col bg-paper text-ink antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        {isDraft ? <VisualEditing /> : null}
      </body>
    </html>
  );
}
