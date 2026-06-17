import { revalidatePath } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

/**
 * On-Demand-Revalidierung. Der Sanity-Webhook ruft diese Route beim Publizieren/Ändern eines
 * Dokuments auf. Die Signatur wird gegen `SANITY_REVALIDATE_SECRET` geprüft (Header
 * `sanity-webhook-signature`); danach werden gecachte Seiten, der RSS-Feed und die Sitemap
 * sofort aufgefrischt — ohne auf den nächsten Build oder das 1-Stunden-ISR-Fenster zu warten.
 *
 * Einrichtung (einmalig):
 * 1. `SANITY_REVALIDATE_SECRET` (langer Zufallsstring) in Vercel und lokal in `.env.local` setzen.
 * 2. In sanity.io/manage einen Webhook anlegen: URL `<SITE_URL>/api/revalidate`, Methode POST,
 *    Dataset `production`, Trigger Create/Update/Delete, im Feld „Secret“ denselben Wert.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { revalidated: false, message: 'SANITY_REVALIDATE_SECRET ist nicht gesetzt.' },
      { status: 500 },
    );
  }

  let isValidSignature: boolean | null = null;
  let body: { _type?: string } | null = null;
  try {
    ({ isValidSignature, body } = await parseBody<{ _type?: string }>(request, secret));
  } catch {
    return NextResponse.json({ revalidated: false, message: 'Webhook-Body nicht lesbar.' }, { status: 400 });
  }

  if (!isValidSignature) {
    return NextResponse.json({ revalidated: false, message: 'Ungültige Signatur.' }, { status: 401 });
  }

  // Inhalt hat sich geändert → alle Seiten (Liste/Detail/Ressort/Thema/Suche) sowie die
  // Routen-Handler Feed und Sitemap neu erzeugen.
  revalidatePath('/', 'layout');
  revalidatePath('/feed.xml');
  revalidatePath('/sitemap.xml');

  return NextResponse.json({ revalidated: true, type: body?._type ?? null });
}
