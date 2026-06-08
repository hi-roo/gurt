'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Blendet Chrome (Header/Footer/Ribbon) auf bestimmten Routen aus — z. B. damit ein
 * Discovery-Prototyp mit eigener UI-Shell (Carbon) die volle Seite besitzt, ohne den
 * globalen Header darüber. Server-Kinder werden durchgereicht (RSC-kompatibel).
 */
export function HideOn({ prefixes, children }: { prefixes: string[]; children: ReactNode }) {
  const pathname = usePathname();
  if (pathname && prefixes.some((p) => pathname.startsWith(p))) return null;
  return <>{children}</>;
}
