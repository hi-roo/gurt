import { cn, quietLinkClass } from '@gurt/ui';
import type { Article } from '../content/types';
import { collectSources } from '../content/sources';
import { ThemeTags } from './theme-tags';

const labelClass = 'font-mono text-xs uppercase tracking-widest text-subtle';

/**
 * UX-2 (Prototyp) · Kontext- und Weiterlesen-Block UNTER dem Beitrag: Medien-Resonanz
 * (schematisch — Live-Quelle folgt), Themen, im Beitrag belegte Quellen und Abo-Links.
 * Ergänzende Landmark (`complementary`), bewusst nach dem Lesebereich — keine Ablenkung im Text.
 * Vollständig gestapelt: keine Marginalspalte, kein Modal (unten ist Platz für die ganze Liste).
 */
export function ArticleContext({ article, className }: { article: Article; className?: string }) {
  const sources = collectSources(article.body);

  return (
    <aside aria-label="Kontext und Weiterlesen" className={cn('text-sm', className)}>
      <div className="space-y-8">
        {/* Medien-Resonanz — Prototyp: schematische Kurve, Live-Daten folgen (UX-2 DoD). */}
        <section>
          <div className="flex items-center gap-2">
            <h2 className={labelClass}>Medien-Resonanz</h2>
            <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-subtle">
              Prototyp
            </span>
          </div>
          <svg
            viewBox="0 0 120 34"
            className="mt-3 h-9 w-full max-w-xs text-accent"
            role="img"
            aria-label="Schematische Resonanzkurve (Platzhalter, keine Live-Daten)"
          >
            <polyline
              points="0,26 18,20 36,24 54,12 72,16 90,7 108,13 120,9"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
              opacity="0.55"
            />
          </svg>
          <p className="mt-2 text-xs text-subtle">
            Schematisch. Live-Werte zur Nennung in den Leitmedien folgen über eine Medien-API.
          </p>
        </section>

        {/* Themen — real, verlinkt auf die Themen-Hubs. */}
        {article.themen?.length ? (
          <section>
            <h2 className={labelClass}>Themen</h2>
            <ThemeTags themen={article.themen} className="mt-3" />
          </section>
        ) : null}

        {/* Quellen und Weiterlesen — real und vollständig, aus den Belegen des Beitrags aggregiert. */}
        {sources.length ? (
          <section>
            <h2 className={labelClass}>Quellen und Weiterlesen</h2>
            <ul className="mt-3 space-y-2">
              {sources.map((q, i) => (
                <li key={(q.url ?? q.titel) + i} className="leading-snug">
                  {q.url ? (
                    <a href={q.url} className={quietLinkClass} target="_blank" rel="noopener noreferrer">
                      {q.titel}
                    </a>
                  ) : (
                    <span className="text-muted">{q.titel}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* Abonnieren — real. */}
        <section>
          <h2 className={labelClass}>Abonnieren</h2>
          <ul className="mt-3 space-y-2">
            <li>
              <a href="/feed.xml" className={quietLinkClass}>
                RSS-Feed
              </a>
            </li>
            <li>
              <a href="/suche" className={quietLinkClass}>
                Beiträge durchsuchen
              </a>
            </li>
          </ul>
        </section>
      </div>
    </aside>
  );
}
