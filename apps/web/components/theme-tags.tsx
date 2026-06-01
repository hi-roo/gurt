import Link from 'next/link';
import { Tag, cn } from '@gurt/ui';

interface ThemeTagsProps {
  themen?: { name: string; slug?: string }[];
  className?: string;
}

/** Themen als klickbare Tags (verlinken auf den jeweiligen Themen-Hub). */
export function ThemeTags({ themen, className }: ThemeTagsProps) {
  if (!themen?.length) return null;
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {themen.map((thema) =>
        thema.slug ? (
          <Link
            key={thema.slug}
            href={`/thema/${thema.slug}`}
            className="inline-flex rounded-full transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Tag>{thema.name}</Tag>
          </Link>
        ) : (
          <Tag key={thema.name}>{thema.name}</Tag>
        ),
      )}
    </div>
  );
}
