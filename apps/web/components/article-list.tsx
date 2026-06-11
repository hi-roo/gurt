import Link from 'next/link';
import { ThemeTags } from './theme-tags';
import { formatDate } from '../lib/format';
import type { ArticleSummary } from '../content/types';

interface ArticleListProps {
  articles: ArticleSummary[];
  /** Kompakt (z. B. für „verwandte Beiträge"): ohne Standfirst/Themen. */
  compact?: boolean;
}

/** Wiederverwendbare Beitragsliste (Start, Themen-Hub, verwandte Beiträge). */
export function ArticleList({ articles, compact = false }: ArticleListProps) {
  return (
    <ul className="divide-y divide-line">
      {articles.map((article) => {
        const datum = formatDate(article.veroeffentlicht);
        return (
          <li key={article._id}>
            <article className={compact ? 'py-5' : 'py-8'}>
              {!compact ? <ThemeTags themen={article.themen} className="mb-3" /> : null}
              <Link href={`/beitrag/${article.slug}`} className="group block">
                <h3
                  className={
                    compact
                      ? 'font-display text-xl tracking-tight group-hover:text-accent'
                      : 'max-w-3xl font-display text-2xl tracking-tight group-hover:text-accent sm:text-3xl'
                  }
                >
                  {article.titel}
                </h3>
                {!compact && article.standfirst ? (
                  <p className="mt-3 max-w-2xl text-muted">{article.standfirst}</p>
                ) : null}
              </Link>
              {datum ? <p className="mt-3 text-sm text-subtle">{datum}</p> : null}
            </article>
          </li>
        );
      })}
    </ul>
  );
}
