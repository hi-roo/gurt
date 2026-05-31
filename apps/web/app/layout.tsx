import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity';
import { isSanityConfigured } from '../sanity/env';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';

export const metadata: Metadata = {
  title: {
    default: 'Gurt — Politik verständlich machen',
    template: '%s · Gurt',
  },
  description:
    'Gurt erklärt politische Leitlinien aus Deutschland und der EU durch Datenvisualisierung und anschauliche Beispiele — kritisch und nicht propagandistisch.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  // draftMode() nur abfragen, wenn Sanity konfiguriert ist — so bleibt der
  // Demo-/Seed-Modus vollständig statisch generierbar.
  const isDraft = isSanityConfigured ? (await draftMode()).isEnabled : false;

  return (
    <html lang="de">
      <body className="flex min-h-screen flex-col bg-paper text-ink antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        {isDraft ? <VisualEditing /> : null}
      </body>
    </html>
  );
}
