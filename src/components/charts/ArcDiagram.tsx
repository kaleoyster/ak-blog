import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export interface Node {
  id: string;
  label: string;
  subscale: string;
}

export interface Link {
  source: string;
  target: string;
  weight: number;
}

interface Props {
  nodes: Node[];
  links: Link[];
  width?: number;
}

const SUBSCALE_COLORS: Record<string, string> = {
  'GAD':     '#60a5fa',
  'SAD':     '#34d399',
  'Social':  '#f472b6',
  'Somatic': '#fb923c',
  'School':  '#a78bfa',
};

export default function ArcDiagram({ nodes, links, width = 700 }: Props) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current || nodes.length === 0) return;

    const height = 260;
    const nodeRadius = 6;
    const margin = { left: 40, right: 40, top: 20, bottom: 60 };
    const innerWidth = width - margin.left - margin.right;

    const svg = d3.select(ref.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove();

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // x position for each node along the bottom axis
    const x = d3.scalePoint()
      .domain(nodes.map((n) => n.id))
      .range([0, innerWidth])
      .padding(0.5);

    const arcY = height - margin.top - margin.bottom;

    // Draw arcs
    const maxWeight = d3.max(links, (l) => l.weight) ?? 1;
    const strokeScale = d3.scaleLinear().domain([0, maxWeight]).range([0.5, 2.5]);
    const opacityScale = d3.scaleLinear().domain([0, maxWeight]).range([0.15, 0.7]);

    g.selectAll('.arc')
      .data(links)
      .join('path')
      .attr('class', 'arc')
      .attr('d', (d) => {
        const sx = x(d.source) ?? 0;
        const tx = x(d.target) ?? 0;
        const midX = (sx + tx) / 2;
        const arcHeight = Math.abs(tx - sx) * 0.5;
        return `M${sx},${arcY} Q${midX},${arcY - arcHeight} ${tx},${arcY}`;
      })
      .attr('fill', 'none')
      .attr('stroke', '#94a3b8')
      .attr('stroke-width', (d) => strokeScale(d.weight))
      .attr('opacity', (d) => opacityScale(d.weight));

    // Draw nodes
    const nodeG = g.selectAll('.node')
      .data(nodes)
      .join('g')
      .attr('class', 'node')
      .attr('transform', (d) => `translate(${x(d.id) ?? 0},${arcY})`);

    nodeG.append('circle')
      .attr('r', nodeRadius)
      .attr('fill', (d) => SUBSCALE_COLORS[d.subscale] ?? '#94a3b8')
      .attr('stroke', 'white')
      .attr('stroke-width', 1.5);

    nodeG.append('text')
      .attr('y', nodeRadius + 14)
      .attr('text-anchor', 'end')
      .attr('transform', `rotate(-55)`)
      .attr('font-size', '10px')
      .attr('fill', 'currentColor')
      .attr('opacity', 0.7)
      .text((d) => d.label);

    // Legend
    const legendEntries = Object.entries(SUBSCALE_COLORS);
    const legend = svg.append('g').attr('transform', `translate(${margin.left}, 8)`);
    legendEntries.forEach(([label, color], i) => {
      const lg = legend.append('g').attr('transform', `translate(${i * 90}, 0)`);
      lg.append('circle').attr('r', 5).attr('fill', color).attr('cy', 5);
      lg.append('text').attr('x', 10).attr('y', 9).attr('font-size', '11px').attr('fill', 'currentColor').text(label);
    });
  }, [nodes, links, width]);

  return <svg ref={ref} style={{ maxWidth: '100%', overflow: 'visible' }} />;
}
