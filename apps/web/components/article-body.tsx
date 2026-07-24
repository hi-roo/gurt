import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { Callout, Caption, Figure, Prose, linkClass, quietLinkClass } from '@gurt/ui';
import { DataTable, type Column, type Row } from '@gurt/visualizations';
import type {
  BodyBlock,
  DatentabelleBlock,
  DiskursBlock,
  QuellenNote,
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
      const quelle = block.datensatz.quelle;
      return (
        <Figure
          label="Datentabelle"
          caption={block.caption}
          source={
            quelle ? (
              quelle.url ? (
                <a href={quelle.url} className={quietLinkClass} target="_blank" rel="noopener noreferrer">
                  {quelle.titel}
                </a>
              ) : (
                quelle.titel
              )
            ) : undefined
          }
          bleed
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
            „{block.zitat}“
          </blockquote>
          {block.quelle ? (
            <Caption className="mt-3">
              —{' '}
              {block.quelle.url ? (
                <a href={block.quelle.url} className={quietLinkClass} target="_blank" rel="noopener noreferrer">
                  {block.quelle.titel}
                </a>
              ) : (
                block.quelle.titel
              )}
            </Caption>
          ) : null}
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
    diskursBlock: ({ value }) => {
      const block = value as DiskursBlock;
      return (
        <section
          className="my-10 bg-surface p-5 sm:p-6"
          aria-label={block.titel ? `Diskurs: ${block.titel}` : 'Diskurs'}
        >
          <div className="font-caption text-xs font-medium uppercase tracking-widest text-accent">
            Im Diskurs
          </div>
          {block.titel ? (
            <div className="mt-1 font-display text-xl tracking-tight text-ink">{block.titel}</div>
          ) : null}
          {block.frage ? <div className="mt-1 italic text-muted">{block.frage}</div> : null}
          {block.einleitung ? <div className="mt-3 text-pretty text-muted">{block.einleitung}</div> : null}

          <div role="list" className="mt-5 space-y-4">
            {block.perspektiven?.map((p, i) => (
              <div role="listitem" key={i} className="border-l-2 border-line pl-4">
                <div className="font-semibold text-ink">{p.label}</div>
                <div className="mt-1 text-pretty">{p.aussage}</div>
                {p.quelle ? (
                  <div className="mt-1 font-caption text-sm text-subtle">
                    Quelle:{' '}
                    {p.quelle.url ? (
                      <a href={p.quelle.url} className={quietLinkClass} target="_blank" rel="noopener noreferrer">
                        {p.quelle.titel}
                      </a>
                    ) : (
                      <span>{p.quelle.titel}</span>
                    )}
                    {p.quelle.herausgeber ? <span> · {p.quelle.herausgeber}</span> : null}
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          {block.einordnung ? (
            <div className="mt-5 border-t border-line pt-4 text-pretty text-muted">
              <span className="font-semibold text-ink">Einordnung: </span>
              {block.einordnung}
            </div>
          ) : null}
        </section>
      );
    },
    image: () => null,
  },
  marks: {
    link: ({ children, value }) => {
      const href = (value as { href?: string })?.href ?? '#';
      // Externe Quellen-Links im neuen Tab öffnen; interne Verweise (z. B. /methodik) im selben.
      const external = /^https?:\/\//i.test(href);
      return (
        <a
          href={href}
          className={linkClass}
          rel="noopener noreferrer"
          {...(external ? { target: '_blank' as const } : {})}
        >
          {children}
        </a>
      );
    },
  },
};

export function ArticleBody({ body }: { body: BodyBlock[] }) {
  return (
    <Prose>
      <PortableText value={body} components={components} />
    </Prose>
  );
}
