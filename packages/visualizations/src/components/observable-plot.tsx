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
    const chart = Plot.plot(options);
    el.replaceChildren(chart);
    return () => el.replaceChildren();
  }, [options]);

  return <div ref={ref} role="img" aria-label={ariaLabel} className="overflow-x-auto" />;
}
