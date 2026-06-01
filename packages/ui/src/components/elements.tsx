import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../lib/cn';

/** Kleines Schlagwort / Themen-Chip. */
export function Tag({ className, children, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-line px-3 py-1 text-xs font-medium text-muted',
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

/** Horizontaler Trenner. */
export function Divider({ className, ...rest }: HTMLAttributes<HTMLHRElement>) {
  return <hr className={cn('my-10 border-0 border-t border-line', className)} {...rest} />;
}

type CalloutTone = 'neutral' | 'accent';

export interface CalloutProps {
  tone?: CalloutTone;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}

const toneClass: Record<CalloutTone, string> = {
  neutral: 'border-line bg-surface',
  accent: 'border-accent/30 bg-accent/5',
};

/** Hervorgehobener Hinweis-Block (z. B. Methodik-Note). */
export function Callout({ tone = 'neutral', title, children, className }: CalloutProps) {
  return (
    <aside className={cn('my-8 p-5', toneClass[tone], className)}>
      {title ? <div className="mb-1 font-semibold">{title}</div> : null}
      <div className="text-sm leading-relaxed text-muted">{children}</div>
    </aside>
  );
}
