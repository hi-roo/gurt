import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface ProseProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/**
 * Editorialer Fließtext-Kontext für gerenderten Rich-Text (Portable Text).
 * Setzt konsistente vertikale Rhythmik und Lesbarkeit ohne Plugin-Abhängigkeit.
 */
export function Prose({ className, children, ...rest }: ProseProps) {
  return (
    <div
      className={cn(
        'max-w-[68ch] text-base leading-relaxed',
        '[&_p]:my-5',
        '[&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold',
        '[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold',
        '[&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:no-underline',
        '[&_strong]:font-semibold',
        '[&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-muted',
        '[&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-2',
        '[&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
