import type { ReactNode } from 'react';
import { Figure } from '@gurt/ui';
import { BarChart, LineChart, WaffleChart, PositionMatrix, type Column, type Row } from '@gurt/visualizations';
import type { ResolvedVisualisierung } from '../content/types';

const TYP_LABEL: Record<ResolvedVisualisierung['typ'], string> = {
  balken: 'Balkendiagramm',
  waffle: 'Waffle-Diagramm',
  linie: 'Liniendiagramm',
  flaeche: 'Flächendiagramm',
  'position-matrix': 'Positions-Matrix',
  zeitachse: 'Zeitachse',
  bespoke: 'Visualisierung',
};

/**
 * Brücke: wandelt eine aufgelöste `visualisierung` aus dem CMS in die passende
 * Komponente aus `@gurt/visualizations`. Hier — und nur hier — trifft Content-
 * Modell auf Visualisierungs-Schicht (siehe docs/01-architecture.md).
 */
export function VisualizationRenderer({ viz }: { viz: ResolvedVisualisierung }) {
  const encoding = viz.encoding ?? {};
  const datensatz = viz.datensatz;
  const columns: Column[] = (datensatz?.spalten ?? []).map((spalte) => ({
    key: spalte.name,
    label: spalte.einheit ? `${spalte.name}` : spalte.name,
    unit: spalte.einheit,
    align: spalte.typ === 'number' ? 'right' : 'left',
  }));
  const rows = (datensatz?.daten ?? []) as Row[];

  let chart: ReactNode;
  switch (viz.typ) {
    case 'position-matrix':
      chart = <PositionMatrix positions={viz.positionen ?? []} ariaLabel={viz.beschreibung} />;
      break;
    case 'waffle':
      chart = (
        <WaffleChart
          data={rows}
          category={encoding.kategorieFeld ?? encoding.xFeld ?? 'kategorie'}
          value={encoding.yFeld ?? 'wert'}
          ariaLabel={viz.beschreibung}
          columns={columns}
        />
      );
      break;
    case 'linie':
    case 'flaeche':
      chart = (
        <LineChart
          data={rows}
          x={encoding.xFeld ?? 'x'}
          y={encoding.yFeld ?? 'y'}
          series={encoding.serieFeld}
          ariaLabel={viz.beschreibung}
          columns={columns}
          xLabel={encoding.xFeld}
        />
      );
      break;
    case 'balken':
    default:
      chart = (
        <BarChart
          data={rows}
          category={encoding.kategorieFeld ?? encoding.xFeld ?? 'kategorie'}
          value={encoding.yFeld ?? 'wert'}
          ariaLabel={viz.beschreibung}
          columns={columns}
        />
      );
  }

  const source: ReactNode = datensatz?.quelle ? (
    datensatz.quelle.url ? (
      <a href={datensatz.quelle.url} className="underline underline-offset-2">
        {datensatz.quelle.titel}
      </a>
    ) : (
      datensatz.quelle.titel
    )
  ) : undefined;

  return (
    <Figure label={TYP_LABEL[viz.typ]} caption={viz.caption} source={source} bleed>
      {chart}
    </Figure>
  );
}
