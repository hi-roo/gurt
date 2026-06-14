import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cn } from '../lib/cn';

type Width = 'prose' | 'wide' | 'full';

const widthClass: Record<Width, string> = {
  prose: 'max-w-[68ch]', // schmale Lesespalte
  wide: 'max-w-5xl', // breite Spalte (Visualisierungen)
  full: 'max-w-none',
};

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  width?: Width;
  as?: ElementType;
  children?: ReactNode;
}

/** Zentrierter Inhalts-Container mit definierter Lesebreite. */
export function Container({ width = 'wide', as, className, children, ...rest }: ContainerProps) {
  const Tag = as ?? 'div';
  return (
    <Tag className={cn('mx-auto w-full px-3 sm:px-8', widthClass[width], className)} {...rest}>
      {children}
    </Tag>
  );
}

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

/** Vertikaler Abschnitt mit großzügigem editorialem Abstand. */
export function Section({ className, children, ...rest }: SectionProps) {
  return (
    <section className={cn('py-12 sm:py-16', className)} {...rest}>
      {children}
    </section>
  );
}

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3;
  children?: ReactNode;
}

const colsClass: Record<NonNullable<GridProps['cols']>, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-3',
};

/** Responsives Raster. */
export function Grid({ cols = 2, className, children, ...rest }: GridProps) {
  return (
    <div className={cn('grid gap-6', colsClass[cols], className)} {...rest}>
      {children}
    </div>
  );
}
