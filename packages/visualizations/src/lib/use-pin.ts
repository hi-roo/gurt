'use client';

import { useCallback, useEffect, useState, type RefObject } from 'react';

/** Toggle: derselbe Index hebt den Pin auf, sonst neu setzen. Reine Logik. */
export function togglePinned(current: number | null, i: number): number | null {
  return current === i ? null : i;
}

/**
 * Fokus-Index als Vorschau verschieben, geklemmt auf 0..count-1; fällt auf den Pin
 * zurück, wenn noch kein Hover. Vorwärts ohne Start ab 0, rückwärts ab 0. Reine Logik.
 */
export function clampFocus(
  current: number | null,
  pinned: number | null,
  delta: number,
  count: number,
): number | null {
  if (count <= 0) return null;
  const base = current ?? pinned ?? (delta > 0 ? -1 : 0);
  return Math.max(0, Math.min(count - 1, base + delta));
}

export interface UsePin {
  /** Angehefteter Index — überlebt Leave/Blur/Scroll. */
  pinned: number | null;
  /** Flüchtig gehoverter/fokussierter Index (nur Vorschau). */
  hovered: number | null;
  /** Die eine Render-Regel: pinned ?? hovered. */
  active: number | null;
  setHover: (i: number | null) => void;
  togglePin: (i: number) => void;
  clearPin: () => void;
  /** Tastatur: Fokus als Vorschau verschieben (pinnt NICHT). */
  moveFocus: (delta: number) => void;
}

/**
 * Geteilter Pin-/Hover-State für Tap-to-Pin — KEIN UI. `pinned` ist persistent und
 * fällt nur durch Toggle/clearPin/Escape/Tap-daneben; `hovered` ist flüchtige Vorschau
 * (Hover/Tastatur-Fokus). Ein document-level pointerdown außerhalb des Containers löst
 * den Pin (mit sauberem Cleanup, nur aktiv solange gepinnt).
 */
export function usePin(count: number, containerRef: RefObject<HTMLElement | null>): UsePin {
  const [pinned, setPinned] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const setHover = useCallback((i: number | null) => setHovered(i), []);
  const togglePin = useCallback((i: number) => setPinned((p) => togglePinned(p, i)), []);
  const clearPin = useCallback(() => setPinned(null), []);
  const moveFocus = useCallback(
    (delta: number) => setHovered((h) => clampFocus(h, pinned, delta, count)),
    [pinned, count],
  );

  useEffect(() => {
    if (pinned === null) return undefined;
    const onDown = (e: PointerEvent) => {
      const el = containerRef.current;
      if (el && !el.contains(e.target as Node)) setPinned(null);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [pinned, containerRef]);

  return { pinned, hovered, active: pinned ?? hovered, setHover, togglePin, clearPin, moveFocus };
}
