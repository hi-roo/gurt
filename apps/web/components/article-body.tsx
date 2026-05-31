import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { Callout, Caption, Figure, Grid, Prose } from '@gurt/ui';
import { DataTable, type Column, type Row } from '@gurt/visualizations';
import type {
  BodyBlock,
  DatentabelleBlock,
  QuellenNote,
  VergleichBlock,
  VisualisierungBlock,
  ZitatBlock,
} from '../content/types';
import { VisualizationRenderer } from './visualization-renderer';

function columnsFor(datensatz: DatentabelleBlock['datensatz']): Column[] {
  return (datensatz.spalten ?? []).map((spalte) => ({
    key: spalte.name,
    label: spalte.name,
    unit: spalte.einheit,
    align: spalte.typ === 'number' ? 'right' : 'left',
  }));
}

const components: PortableTextComponents = {
  types: {
    visualisierungBlock: ({ value }) => (
      <VisualizationRenderer viz={(value as VisualisierungBlock).visualisierung} />
    ),
    datentabelleBlock: ({ value }) => {
      const block = value as DatentabelleBlock;
      return (
        <Figure
          label="Datentabelle"
          caption={block.caption}
          source={block.datensatz.quelle?.titel}
        >
          <div className="overflow-x-auto">
            <DataTable columns={columnsFor(block.datensatz)} rows={block.datensatz.daten as Row[]} />
          </div>
        </Figure>
      );
    },
    zitatBlock: ({ value }) => {
      const block = value as ZitatBlock;
      return (
        <figure className="my-10 border-l-2 border-accent pl-6">
          <blockquote className="font-display text-2xl leading-snug text-pretty">
            „{block.zitat}"
          </blockquote>
          {block.quelle ? <Caption className="mt-3">— {block.quelle.titel}</Caption> : null}
        </figure>
      );
    },
    quellenNote: ({ value }) => {
      const block = value as QuellenNote;
      return (
        <Callout title="Quellen-Hinweis">
          {block.text}
          {block.quelle ? <span className="text-subtle"> ({block.quelle.titel})</span> : null}
        </Callout>
      );
    },
    vergleichBlock: ({ value }) => {
      const block = value as VergleichBlock;
      return (
        <figure className="my-10">
          {block.titel ? <div className="mb-2 font-display text-xl font-semibold">{block.titel}</div> : null}
          {block.einleitung ? <p className="mb-4 text-muted">{block.einleitung}</p> : null}
          <Grid cols={2}>
            <div className="rounded-md border border-line bg-surface p-5">
              <div className="font-mono text-xs uppercase tracking-widest text-accent">Maßnahme A</div>
              <div className="mt-1 font-medium">{block.links?.titel}</div>
            </div>
            <div className="rounded-md border border-line bg-surface p-5">
              <div className="font-mono text-xs uppercase tracking-widest text-accent">Maßnahme B</div>
              <div className="mt-1 font-medium">{block.rechts?.titel}</div>
            </div>
          </Grid>
        </figure>
      );
    },
    image: () => null,
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={(value as { href?: string })?.href ?? '#'}
        className="text-accent underline underline-offset-2"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

export function ArticleBody({ body }: { body: BodyBlock[] }) {
  return (
    <Prose>
      <PortableText value={body} components={components} />
    </Prose>
  );
}
