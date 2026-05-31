import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

/** Beendet den Draft-Mode. */
export async function GET(): Promise<Response> {
  const draft = await draftMode();
  draft.disable();
  redirect('/');
}
