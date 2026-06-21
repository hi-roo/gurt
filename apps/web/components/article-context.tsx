import { cn, quietLinkClass } from '@gurt/ui';
import type { Article } from '../content/types';
import { collectSources } from '../content/sources';
import { ThemeTags } from './theme-tags';

const labelClass = 'font-mono text-xs uppercase tracking-widest text-subtle';

/**
 * UX-2 · Kontext- und Weiterlesen-Block UNTER dem Beitrag: Themen, die im Beitrag belegten
 * Quellen und Abo-Links. Ergänzende Landmark (`complementary`), bewusst nach dem Lesebereich —
 * keine Ablenkung im Text. Vollständig gestapelt: keine Marginalspalte, kein Modal.
 */
export function ArticleContext({ article, className }: { article: Article; className?: string }) {
  const sources = collectSources(article.body);

  return (
    <aside aria-label="Kontext und Weiterlesen" className={cn('text-sm', className)}>
      <div className="space-y-8">
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
