import { NextResponse } from 'next/server';
import { getSearchIndex } from '../../../content/repository';

/**
 * Liefert den flachen Volltext-Index (alle veröffentlichten Beiträge) als JSON.
 * Das modale Suchfeld lädt ihn beim ersten Öffnen lazy — so wird er nicht auf jeder Seite
 * mitgeschickt. Stündlich gecacht (wie /suche), neue Beiträge erscheinen automatisch.
 */
export const revalidate = 3600;

export async function GET() {
  const docs = await getSearchIndex();
  return NextResponse.json(docs);
}
