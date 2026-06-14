'use client';

import * as Plot from '@observablehq/plot';
import { useEffect, useRef } from 'react';

export interface ObservablePlotProps {
  options: Plot.PlotOptions;
  ariaLabel: string;
  /**
   * Optionaler Zugriff auf die gerenderte Plot-Figur nach jedem (Re-)Plot — liefert
   * u. a. `plot.scale('x'|'y')` (Datenwert→Pixel) für die Tap-to-Pin-Overlay-Schicht.
   * Rein additiv: ohne Callback verhält sich die Hülle unverändert. Über einen Ref
   * geführt, damit ein wechselnder Callback den Plot NICHT neu rendert.
   */
  onPlot?: (plot: ReturnType<typeof Plot.plot>) => void;
}

/**
 * Dünne React-Hülle um Observable Plot. Rendert das Chart als DOM-Knoten in
 * einen Ref-Container. Client-only (Plot braucht document).
 */
export function ObservablePlot({ options, ariaLabel, onPlot }: ObservablePlotProps) {
  const ref = useRef<HTMLDivElement>(null);
  const onPlotRef = useRef(onPlot);
  useEffect(() => {
    onPlotRef.current = onPlot;
  }, [onPlot]);

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
    // Skalen/Plot-Figur nach außen reichen (Tap-to-Pin-Overlay) — nach jedem (Re-)Plot.
    onPlotRef.current?.(chart);
    return () => el.replaceChildren();
  }, [options]);

  return <div ref={ref} role="img" aria-label={ariaLabel} className="overflow-x-auto" />;
}
