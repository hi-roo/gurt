'use client';

import { useEffect, useRef, useState } from 'react';

/** True erst nach dem Mount — für client-only Charts mit SSR-Fallback. */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/** Misst die Containerbreite via ResizeObserver (responsive Charts). */
export function useResize<T extends HTMLElement>(): { ref: React.RefObject<T | null>; width: number } {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(640);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const measured = entries[0]?.contentRect.width;
      if (measured && measured > 0) setWidth(measured);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, width };
}
