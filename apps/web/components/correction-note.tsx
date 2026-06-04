import { CORRECTIONS_EMAIL, SITE_URL } from '../lib/site';

export interface CorrectionNoteProps {
  /** Titel des Beitrags (für den E-Mail-Betreff). */
  title: string;
  /** Pfad des Beitrags, z. B. „/beitrag/slug" (für den Link in der E-Mail). */
  path: string;
}

/**
 * Niedrigschwellige Einladung an Leser:innen, Hinweise oder Korrekturen zu melden
 * — passend zur Korrektur-/Transparenz-Policy (docs/08). Variante A: `mailto` mit
 * vorbefülltem Betreff/Text (keine Infrastruktur, kein Spam-Risiko). Ein In-house-
 * Formular nach Sanity ist als spätere Ausbaustufe vorgesehen.
 */
export function CorrectionNote({ title, path }: CorrectionNoteProps) {
  const subject = `Hinweis/Korrektur: ${title}`;
  const body = `Beitrag: ${SITE_URL}${path}\n\nMein Hinweis oder meine Korrektur (mit Quelle, wenn möglich):\n`;
  const href = `mailto:${CORRECTIONS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <aside className="mt-12 border-t border-line pt-6 text-sm text-muted">
      <strong className="font-semibold text-ink">Fehler entdeckt?</strong>{' '}
      <a href={href} className="font-medium text-accent underline underline-offset-2 hover:no-underline">
        Hinweis oder Korrektur senden
      </a>
      .
    </aside>
  );
}
