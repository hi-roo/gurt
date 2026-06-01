import Link from 'next/link';

interface Crumb {
  label: string;
  href?: string;
}

/** Brotkrumen zur Orientierung. Der letzte Eintrag ist die aktuelle Seite. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Brotkrumen" className="text-sm text-subtle">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => (
          <li key={`${index}-${item.label}`} className="flex items-center gap-1.5">
            {item.href ? (
              <Link href={item.href} className="hover:text-ink">
                {item.label}
              </Link>
            ) : (
              <span className="text-muted" aria-current="page">
                {item.label}
              </span>
            )}
            {index < items.length - 1 ? (
              <span aria-hidden className="text-line">
                ›
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
