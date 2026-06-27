import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

export interface Extra {
  label: string;
  href: string;
}

export interface Pub {
  title: string;
  href: string;
  year: number;
  type: string;
  meta: string;
  extras?: Extra[];
}

/** Early-career → late-career order; blue→violet ramp from the site gradient. */
const TYPES = ['Poster', 'Research', 'Thesis', 'Conference', 'Journal', 'Dissertation'];
const COLORS: Record<string, string> = {
  Poster: '#93c5fd',
  Research: '#76acfe',
  Thesis: '#6292fc',
  Conference: '#5c75f6',
  Journal: '#6155eb',
  Dissertation: '#6d28d9',
};

interface Placed extends Pub {
  ox: number; // leader origin x (band center at its year)
  oy: number; // leader origin y
  y: number; // resolved label y (collision-free)
}

/**
 * A vertical streamgraph of publication output: time flows top → bottom, the
 * colored bands show the mix of work by type, and every publication is called
 * out with a leader line to an annotation on the right. Built with d3 so the
 * leader lines originate from each paper's own band and the labels are
 * collision-resolved.
 */
export default function PublicationsRiver({ pubs }: { pubs: Pub[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState(700);
  const [height, setHeight] = useState(720);
  const [labelX, setLabelX] = useState(280);
  const [placed, setPlaced] = useState<Placed[]>([]);

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

    const isNarrow = width < 560;
    const margin = { top: 30, bottom: 30, left: 38 };
    const h = Math.max(620, pubs.length * (isNarrow ? 104 : 86) + 90);

    const minYear = Math.min(...pubs.map((p) => p.year));
    const maxYear = Math.max(...pubs.map((p) => p.year));
    // Newest year at the top: max → margin.top, min → bottom.
    const yScale = d3.scaleLinear().domain([minYear, maxYear]).range([h - margin.bottom, margin.top]);

    // Year × type grid, stacked with a wiggle (streamgraph) offset.
    const byYear = d3.range(minYear, maxYear + 1).map((year) => {
      const row: Record<string, number> = { year };
      TYPES.forEach((t) => (row[t] = pubs.filter((p) => p.year === year && p.type === t).length));
      return row;
    });
    const series = d3
      .stack<Record<string, number>>()
      .keys(TYPES)
      .offset(d3.stackOffsetWiggle)
      .order(d3.stackOrderInsideOut)(byYear);

    const [vmin, vmax] = d3.extent(series.flat(2) as number[]) as [number, number];
    const streamLeft = margin.left + 10;
    const streamWidth = isNarrow ? 84 : 120;
    const xScale = d3.scaleLinear().domain([vmin, vmax]).range([streamLeft, streamLeft + streamWidth]);

    const area = d3
      .area<d3.SeriesPoint<Record<string, number>>>()
      .y((d) => yScale(d.data.year))
      .x0((d) => xScale(d[0]))
      .x1((d) => xScale(d[1]))
      .curve(d3.curveCatmullRom);

    const svg = d3.select(svgRef.current).attr('width', width).attr('height', h);
    svg.selectAll('*').remove();

    // Year ticks down the left edge.
    const ticks = svg.append('g');
    d3.range(minYear, maxYear + 1).forEach((y) => {
      ticks
        .append('text')
        .attr('x', margin.left - 12)
        .attr('y', yScale(y))
        .attr('dy', '0.32em')
        .attr('text-anchor', 'end')
        .attr('font-size', '11px')
        .attr('fill', 'currentColor')
        .attr('fill-opacity', 0.4)
        .text(y);
    });

    // The stream bands.
    svg
      .append('g')
      .selectAll('path')
      .data(series)
      .join('path')
      .attr('d', area)
      .attr('fill', (d) => COLORS[d.key])
      .attr('fill-opacity', 0.9)
      .attr('stroke', 'white')
      .attr('stroke-width', 0.6)
      .attr('stroke-opacity', 0.15);

    // Leader origin for each paper: center of its band at its year.
    const seriesByKey: Record<string, d3.Series<Record<string, number>, string>> = {};
    series.forEach((s) => (seriesByKey[s.key] = s));
    const origins: Placed[] = pubs.map((p) => {
      const seg = seriesByKey[p.type][p.year - minYear];
      return { ...p, ox: xScale((seg[0] + seg[1]) / 2), oy: yScale(p.year), y: yScale(p.year) };
    });

    // Place labels on the right, resolving vertical overlaps.
    const lx = streamLeft + streamWidth + (isNarrow ? 38 : 62);
    const gap = isNarrow ? 104 : 86;
    const sorted = [...origins].sort((a, b) => a.oy - b.oy);
    let last = -Infinity;
    sorted.forEach((l) => {
      l.y = Math.max(l.oy, last + gap);
      last = l.y;
    });
    const bottom = h - margin.bottom;
    if (sorted.length && sorted[sorted.length - 1].y > bottom) {
      let next = bottom;
      for (let i = sorted.length - 1; i >= 0; i--) {
        sorted[i].y = Math.min(sorted[i].y, next);
        next = sorted[i].y - gap;
      }
    }

    // Leader lines + origin dots.
    const leaders = svg.append('g');
    sorted.forEach((l) => {
      const x2 = lx - 10;
      const midX = (l.ox + x2) / 2;
      leaders
        .append('path')
        .attr('d', `M${l.ox},${l.oy} C${midX},${l.oy} ${midX},${l.y} ${x2},${l.y}`)
        .attr('fill', 'none')
        .attr('stroke', COLORS[l.type])
        .attr('stroke-width', 1.2)
        .attr('stroke-opacity', 0.5);
      leaders
        .append('circle')
        .attr('cx', l.ox)
        .attr('cy', l.oy)
        .attr('r', 3.5)
        .attr('fill', COLORS[l.type])
        .attr('stroke', 'white')
        .attr('stroke-width', 1)
        .attr('stroke-opacity', 0.3);
    });

    setHeight(h);
    setLabelX(lx);
    setPlaced(sorted);
  }, [pubs, width]);

  return (
    <div className="w-full">
      {/* Legend */}
      <div className="mb-3 flex flex-wrap gap-x-3 gap-y-1 text-[0.7rem] text-zinc-500 dark:text-zinc-400">
        {TYPES.map((t) => (
          <span key={t} className="inline-flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: COLORS[t] }} />
            {t}
          </span>
        ))}
      </div>

      <div ref={wrapRef} className="relative w-full" style={{ height }}>
        <svg ref={svgRef} style={{ color: 'inherit', overflow: 'visible' }} />

      {placed.map((l) => (
        <div
          key={l.title}
          className="group absolute"
          style={{ top: l.y, left: labelX, width: width - labelX - 2, transform: 'translateY(-50%)' }}
        >
          <div className="flex items-start gap-2">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ background: COLORS[l.type] }} />
            <div className="min-w-0">
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="line-clamp-2 text-[0.8rem] font-medium leading-snug text-blue-600 transition-colors hover:underline dark:text-blue-400"
              >
                {l.title}
              </a>
              <p
                className="mt-0.5 line-clamp-2 text-[0.7rem] leading-snug text-zinc-500 dark:text-zinc-400"
                dangerouslySetInnerHTML={{ __html: l.meta }}
              />
              {l.extras && l.extras.length > 0 && (
                <div className="mt-0.5 flex flex-wrap gap-x-3 gap-y-0.5 text-[0.65rem] text-zinc-400 dark:text-zinc-500">
                  {l.extras.map((e) => (
                    <a
                      key={e.href}
                      href={e.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-500"
                    >
                      {e.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}
