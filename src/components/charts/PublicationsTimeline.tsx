import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

export interface Pub {
  title: string;
  href: string;
  year: number;
  type: string;
  meta: string;
}

/** Shared accent palette (mirrors HeroViz / ArcDiagram). */
export const TYPE_COLORS: Record<string, string> = {
  Journal: '#60a5fa',
  Conference: '#34d399',
  Poster: '#f472b6',
  Thesis: '#fb923c',
  Dissertation: '#a78bfa',
};

interface Node extends Pub {
  x: number;
  y: number;
}

/**
 * A beeswarm timeline of every publication: each paper is a dot placed on its
 * year, force-packed vertically to avoid overlap, colored by type. Hover for a
 * title tooltip, click to open the paper. A compact, glanceable career arc that
 * doubles as navigation for the list below.
 */
export default function PublicationsTimeline({ pubs }: { pubs: Pub[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState(700);
  const [tip, setTip] = useState<{ x: number; y: number; pub: Pub } | null>(null);

  // Track container width for responsive sizing.
  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      if (w > 0) setWidth(w);
    });
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current || pubs.length === 0) return;

    const height = 200;
    const margin = { top: 22, right: 14, bottom: 36, left: 14 };
    const innerW = Math.max(0, width - margin.left - margin.right);
    const innerH = height - margin.top - margin.bottom;
    const radius = innerW < 360 ? 6 : 8;

    const [minYear, maxYear] = d3.extent(pubs, (d) => d.year) as [number, number];
    const x = d3
      .scaleLinear()
      .domain([minYear - 0.6, maxYear + 0.6])
      .range([0, innerW]);

    // Beeswarm: pin x to the year, spread on y, collide to de-overlap.
    const nodes: Node[] = pubs.map((p) => ({ ...p, x: x(p.year), y: innerH / 2 }));
    const sim = d3
      .forceSimulation(nodes as d3.SimulationNodeDatum[])
      .force('x', d3.forceX<Node>((d) => x(d.year)).strength(1))
      .force('y', d3.forceY(innerH / 2).strength(0.07))
      .force('collide', d3.forceCollide(radius + 1.5))
      .stop();
    for (let i = 0; i < 180; i++) sim.tick();

    const svg = d3.select(svgRef.current).attr('width', width).attr('height', height);
    svg.selectAll('*').remove();

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // Year axis along the bottom.
    const axisY = innerH + 14;
    const axis = g.append('g').attr('transform', `translate(0,${axisY})`);
    axis
      .append('line')
      .attr('x1', 0)
      .attr('x2', innerW)
      .attr('stroke', 'currentColor')
      .attr('stroke-opacity', 0.12);
    axis
      .selectAll('text')
      .data(d3.range(minYear, maxYear + 1))
      .join('text')
      .attr('x', (d) => x(d))
      .attr('y', 17)
      .attr('text-anchor', 'middle')
      .attr('font-size', '11px')
      .attr('fill', 'currentColor')
      .attr('fill-opacity', 0.45)
      .text((d) => d);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const circles = g
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y)
      .attr('fill', (d) => TYPE_COLORS[d.type] ?? '#94a3b8')
      .attr('stroke', 'white')
      .attr('stroke-width', 1.2)
      .attr('stroke-opacity', 0.3)
      .style('cursor', 'pointer')
      .style('filter', 'drop-shadow(0 1px 2px rgba(0,0,0,0.18))')
      .attr('r', reduceMotion ? radius : 0);

    if (!reduceMotion) {
      circles
        .transition()
        .delay((_, i) => i * 40)
        .duration(520)
        .ease(d3.easeBackOut.overshoot(1.4))
        .attr('r', radius);
    }

    circles
      .on('mouseenter', function (event, d) {
        d3.select(this).transition().duration(120).attr('r', radius + 3).attr('stroke-opacity', 0.7);
        const [mx, my] = d3.pointer(event, wrapRef.current);
        setTip({ x: mx, y: my, pub: d });
      })
      .on('mousemove', function (event) {
        const [mx, my] = d3.pointer(event, wrapRef.current);
        setTip((t) => (t ? { ...t, x: mx, y: my } : t));
      })
      .on('mouseleave', function () {
        d3.select(this).transition().duration(120).attr('r', radius).attr('stroke-opacity', 0.3);
        setTip(null);
      })
      .on('click', (_, d) => window.open(d.href, '_blank', 'noopener,noreferrer'));
  }, [pubs, width]);

  const flip = tip ? tip.x > width * 0.6 : false;

  return (
    <div ref={wrapRef} className="relative w-full">
      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mb-1 text-xs text-zinc-500 dark:text-zinc-400">
        {Object.entries(TYPE_COLORS).map(([label, color]) => (
          <span key={label} className="inline-flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: color }} />
            {label}
          </span>
        ))}
      </div>

      <svg ref={svgRef} style={{ maxWidth: '100%', overflow: 'visible', color: 'inherit' }} />

      {tip && (
        <div
          className="pointer-events-none absolute z-10 max-w-[16rem] rounded-md bg-zinc-900 px-2.5 py-1.5 text-xs text-white shadow-lg dark:bg-white dark:text-zinc-900"
          style={{
            top: tip.y - 6,
            left: flip ? undefined : tip.x + 14,
            right: flip ? width - tip.x + 14 : undefined,
          }}
        >
          <div className="font-medium leading-snug">{tip.pub.title}</div>
          <div className="mt-0.5 opacity-60">
            {tip.pub.type} · {tip.pub.year}
          </div>
        </div>
      )}
    </div>
  );
}
