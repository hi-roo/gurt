import type { ReadoutEntry } from '../lib/types';

/**
 * Gemeinsame `aria-live`-Senke für Tap-to-Pin: sagt den aktiven Datenpunkt als
 * „Label, Wert Einheit, Serie“ an — EINE Sprache für alle Chart-Familien (Plot,
 * Server-SVG, Matrix) statt pro Typ nachgebaut. Standardmäßig visuell unsichtbar
 * (`sr-only`); die sichtbare Anzeige bleibt beim jeweiligen Chart (schwebendes Tooltip
 * bzw. Detail-Panel). SSR-sicher (kein Browser-API, keine Hooks).
 */
export function ChartReadout({ entry }: { entry: ReadoutEntry | string | null }) {
  const text =
    entry == null
      ? ''
      : typeof entry === 'string'
        ? entry
        : [entry.label, [entry.value, entry.unit].filter(Boolean).join(' '), entry.series]
            .filter(Boolean)
            .join(', ');
  return (
    <div role="status" aria-live="polite" className="sr-only">
      {text}
    </div>
  );
}
