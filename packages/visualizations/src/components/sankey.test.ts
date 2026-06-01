import { describe, expect, it } from 'vitest';
import { layoutSankey, toSankeyLinks, type SankeyLink } from './sankey';

// 1→N-Fächer: Erdgas → Verbrauchsbereiche (AGEB 2023, TWh).
const gas: SankeyLink[] = [
  { source: 'Erdgas', target: 'Industrie', value: 246.6 },
  { source: 'Erdgas', target: 'Haushalte', value: 229.0 },
  { source: 'Erdgas', target: 'GHD', value: 99.4 },
  { source: 'Erdgas', target: 'Stromversorgung', value: 96.5 },
  { source: 'Erdgas', target: 'Fernwärme', value: 48.1 },
  { source: 'Erdgas', target: 'Verkehr', value: 2.2 },
];

describe('layoutSankey', () => {
  it('Quellknotenwert = Summe ausgehender Flüsse', () => {
    const { nodes } = layoutSankey(gas, { width: 800, height: 400 });
    const erdgas = nodes.find((n) => n.key === 'Erdgas');
    expect(erdgas?.value).toBeCloseTo(721.8, 5);
    expect(erdgas?.layer).toBe(0);
  });

  it('Zielknoten liegen in Layer 1 mit ihrem Flusswert', () => {
    const { nodes } = layoutSankey(gas, { width: 800, height: 400 });
    const strom = nodes.find((n) => n.key === 'Stromversorgung');
    expect(strom?.layer).toBe(1);
    expect(strom?.value).toBeCloseTo(96.5, 5);
  });

  it('Summe der Bandbreiten in einen Zielknoten = dessen Höhe', () => {
    const { nodes, links } = layoutSankey(gas, { width: 800, height: 400 });
    for (const node of nodes.filter((n) => n.layer === 1)) {
      const incoming = links.filter((l) => l.target === node.key).reduce((acc, l) => acc + l.width, 0);
      expect(incoming).toBeCloseTo(node.h, 5);
    }
  });

  it('mehrstufig: Längster-Pfad-Layering ordnet Knoten korrekt zu', () => {
    const chain: SankeyLink[] = [
      { source: 'A', target: 'B', value: 10 },
      { source: 'B', target: 'C', value: 10 },
    ];
    const { nodes } = layoutSankey(chain, { width: 600, height: 300 });
    expect(nodes.find((n) => n.key === 'A')?.layer).toBe(0);
    expect(nodes.find((n) => n.key === 'B')?.layer).toBe(1);
    expect(nodes.find((n) => n.key === 'C')?.layer).toBe(2);
  });

  it('alle Knoten liegen innerhalb der Höhe', () => {
    const H = 400;
    const { nodes } = layoutSankey(gas, { width: 800, height: H });
    for (const n of nodes) {
      expect(n.y).toBeGreaterThanOrEqual(-1e-6);
      expect(n.y + n.h).toBeLessThanOrEqual(H + 1e-6);
    }
  });

  it('liefert leer bei fehlenden Links', () => {
    expect(layoutSankey([], { width: 100, height: 100 })).toEqual({ nodes: [], links: [] });
  });

  it('toSankeyLinks baut Links aus Rohzeilen', () => {
    const links = toSankeyLinks(
      [{ q: 'Erdgas', z: 'Industrie', w: 246.6 }],
      'q',
      'z',
      'w',
    );
    expect(links).toEqual([{ source: 'Erdgas', target: 'Industrie', value: 246.6 }]);
  });
});
