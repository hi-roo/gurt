import type { ReactNode } from 'react';
import { Figure, quietLinkClass } from '@gurt/ui';
import { BarChart, LineChart, AreaChart, BeeswarmChart, WaffleChart, TreemapChart, SankeyChart, ChordChart, RatioArray, ShareBars, PositionMatrix, type Column, type Row } from '@gurt/visualizations';
import type { ResolvedVisualisierung } from '../content/types';

const TYP_LABEL: Record<ResolvedVisualisierung['typ'], string> = {
  balken: 'Balkendiagramm',
  waffle: 'Waffle-Diagramm',
  treemap: 'Treemap',
  sankey: 'Sankey-Diagramm',
  chord: 'Chord-Diagramm',
  verhaeltnis: 'Verhältnis (je 100)',
  anteilsbalken: 'Anteilsvergleich',
  linie: 'Liniendiagramm',
  flaeche: 'Flächendiagramm',
  beeswarm: 'Verteilung (Beeswarm)',
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
    case 'treemap': {
      const treemapLabel = encoding.kategorieFeld ?? encoding.xFeld ?? 'kategorie';
      const treemapDesc: Record<string, string> = {};
      for (const row of rows) {
        const info = row.beschreibung;
        if (typeof info === 'string' && info) treemapDesc[String(row[treemapLabel])] = info;
      }
      chart = (
        <TreemapChart
          data={rows}
          label={treemapLabel}
          value={encoding.yFeld ?? 'wert'}
          ariaLabel={viz.beschreibung}
          columns={columns}
          descriptions={Object.keys(treemapDesc).length ? treemapDesc : undefined}
        />
      );
      break;
    }
    case 'sankey':
      chart = (
        <SankeyChart
          data={rows}
          source={encoding.kategorieFeld ?? 'von'}
          target={encoding.serieFeld ?? 'nach'}
          value={encoding.yFeld ?? 'wert'}
          ariaLabel={viz.beschreibung}
          columns={columns}
        />
      );
      break;
    case 'chord': {
      const chordValue = encoding.yFeld ?? 'wert';
      // Farb-Zuordnung „Label:#hex“ → Map (dokumentierte Identitätsfarben-Ausnahme).
      const chordColors: Record<string, string> = {};
      for (const entry of encoding.farben ?? []) {
        const idx = entry.indexOf(':');
        if (idx > 0) chordColors[entry.slice(0, idx).trim()] = entry.slice(idx + 1).trim();
      }
      chart = (
        <ChordChart
          data={rows}
          source={encoding.kategorieFeld ?? 'von'}
          target={encoding.serieFeld ?? 'nach'}
          value={chordValue}
          unit={columns.find((c) => c.key === chordValue)?.unit ?? '%'}
          colorByLabel={Object.keys(chordColors).length ? chordColors : undefined}
          ariaLabel={viz.beschreibung}
          columns={columns}
        />
      );
      break;
    }
    case 'verhaeltnis':
      chart = (
        <RatioArray
          data={rows}
          label={encoding.xFeld ?? 'jahr'}
          value={encoding.yFeld ?? 'wert'}
          base={100}
          baseLabel={encoding.kategorieFeld ?? 'je 100'}
          valueLabel={encoding.serieFeld ?? ''}
          ariaLabel={viz.beschreibung}
          columns={columns}
          zweifarbig={encoding.zweifarbig}
        />
      );
      break;
    case 'anteilsbalken':
      chart = (
        <ShareBars
          data={rows}
          barField={encoding.kategorieFeld ?? 'bar'}
          groupField={encoding.serieFeld ?? 'gruppe'}
          valueField={encoding.yFeld ?? 'anteil'}
          ariaLabel={viz.beschreibung}
          unit={columns.find((c) => c.key === (encoding.yFeld ?? 'anteil'))?.unit ?? '%'}
          columns={columns}
        />
      );
      break;
    case 'linie':
      chart = (
        <LineChart
          data={rows}
          x={encoding.xFeld ?? 'x'}
          y={encoding.yFeld ?? 'y'}
          series={encoding.serieFeld}
          dashedSeries={encoding.gestrichelteReihen}
          ariaLabel={viz.beschreibung}
          columns={columns}
          xLabel={encoding.xFeld}
        />
      );
      break;
    case 'flaeche':
      chart = (
        <AreaChart
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
    case 'beeswarm':
      chart = (
        <BeeswarmChart
          data={rows}
          value={encoding.yFeld ?? 'wert'}
          label={encoding.kategorieFeld ?? 'kategorie'}
          highlight={encoding.highlight}
          refValue={encoding.refWert}
          refLabel={encoding.refLabel}
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
      <a href={datensatz.quelle.url} className={quietLinkClass}>
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
