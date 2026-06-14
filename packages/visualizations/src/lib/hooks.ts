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

/**
 * Grob-Zeiger-Erkennung (Touch/Pen) für die Interaktions-Moduswahl: Tap-to-Pin auf
 * `coarse`-Geräten, Hover-Preview nur auf `fine` (Maus). SSR-sicher über das
 * useMounted-Idiom — VOR dem Mount `coarse: false` (Desktop/Hover-Pfad), damit Server-
 * und erstes Client-Render übereinstimmen (kein Hydration-Mismatch). Reaktiv via
 * matchMedia-Change (z. B. Maus an-/abstöpseln, Tablet-Modus).
 */
export function useViewport(): { mounted: boolean; coarse: boolean } {
  const [state, setState] = useState({ mounted: false, coarse: false });
  useEffect(() => {
    const mq = window.matchMedia('(hover: none) and (pointer: coarse)');
    const update = () => setState({ mounted: true, coarse: mq.matches });
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return state;
}
