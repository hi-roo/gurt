'use client';

import * as Plot from '@observablehq/plot';
import { useEffect, useRef } from 'react';

export interface ObservablePlotProps {
  options: Plot.PlotOptions;
  ariaLabel: string;
}

/**
 * Dünne React-Hülle um Observable Plot. Rendert das Chart als DOM-Knoten in
 * einen Ref-Container. Client-only (Plot braucht document).
 */
export function ObservablePlot({ options, ariaLabel }: ObservablePlotProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Observable Plot setzt per Default `font-family: system-ui` und eine sehr
    // kleine Schrift (10px) auf sein SVG. Wir überschreiben auf die Marken-Schrift
    // FF Unit (Token --font-sans), heben die Achsen-/Tick-Schrift auf 12px und
    // geben unten etwas mehr Platz, damit die Achsenbeschriftung (z. B. „jahr →“)
    // nicht an den Tick-Labels klebt. Chart-eigene Optionen behalten Vorrang.
    const chart = Plot.plot({
      ...options,
      marginBottom: options.marginBottom ?? 44,
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: '12px',
        ...(options.style && typeof options.style === 'object' ? options.style : {}),
      },
    });
    el.replaceChildren(chart);
    // Die Farb-Legende rendert Plot als separates `.plot-…-swatch(es)`-Element mit
    // eigener system-ui-Schrift (eigenes Stylesheet, überschreibt Vererbung). Daher
    // hier gezielt auf die Marken-Schrift angleichen.
    el.querySelectorAll<HTMLElement>('[class*="-swatch"]').forEach((node) => {
      node.style.fontFamily = 'var(--font-sans)';
      node.style.fontSize = '13px';
    });
    return () => el.replaceChildren();
  }, [options]);

  return <div ref={ref} role="img" aria-label={ariaLabel} className="overflow-x-auto" />;
}
