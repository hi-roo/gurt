import clsx, { type ClassValue } from 'clsx';

/** Kombiniert Klassennamen konditional. Dünne Hülle um clsx. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
