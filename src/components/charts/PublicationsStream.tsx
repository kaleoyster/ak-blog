import { useEffect, useRef, useState } from 'react';
import * as Plot from '@observablehq/plot';

export interface Pub {
  title: string;
  href: string;
  year: number;
  type: string;
  meta: string;
}

// Ordered early-career → late-career. Colors are a blue→violet ramp derived
// (via HCL) from the site's signature gradient (#3b82f6 → #8b5cf6), so the
// bands flow from light-blue early posters to the deep-violet dissertation.
const TYPES = ['Poster', 'Thesis', 'Conference', 'Journal', 'Dissertation'];
const COLORS: Record<string, string> = {
  Poster: '#93c5fd',
  Thesis: '#70a6fe',
  Conference: '#5d84fa',
  Journal: '#5f5eef',
  Dissertation: '#6d28d9',
};

/**
 * A streamgraph of publication output by type over time, built with Observable
 * Plot. Flowing colored bands show how the *mix* of work shifts year to year —
 * poster-heavy early career opening into conference, journal, and the
 * dissertation. Hover a band for the per-year count.
 */
export default function PublicationsStream({ pubs }: { pubs: Pub[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(700);

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
    if (!wrapRef.current || pubs.length === 0) return;

    const minYear = Math.min(...pubs.map((p) => p.year));
    const maxYear = Math.max(...pubs.map((p) => p.year));
    const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);

    // Full year × type grid so the stream is continuous (zeros included).
    const data = years.flatMap((year) =>
      TYPES.map((type) => ({
        year,
        type,
        count: pubs.filter((p) => p.year === year && p.type === type).length,
      }))
    );

    const dark = document.documentElement.classList.contains('dark');
    const axisColor = dark ? '#a1a1aa' : '#52525b';

    const chart = Plot.plot({
      width,
      height: 260,
      marginTop: 8,
      marginBottom: 30,
      marginLeft: 14,
      marginRight: 14,
      style: { background: 'transparent', color: axisColor, fontSize: '12px' },
      x: {
        label: null,
        tickFormat: (d: number) => `${d}`,
        ticks: years,
        inset: 12,
        grid: false,
      },
      y: { axis: null },
      color: {
        domain: TYPES,
        range: TYPES.map((t) => COLORS[t]),
        legend: true,
        label: null,
      },
      marks: [
        Plot.areaY(data, {
          x: 'year',
          y: 'count',
          z: 'type',
          fill: 'type',
          order: TYPES,
          curve: 'catmull-rom',
          offset: 'wiggle',
          fillOpacity: 0.88,
          stroke: 'white',
          strokeWidth: 0.75,
          strokeOpacity: dark ? 0.12 : 0.4,
          tip: true,
          title: (d: { type: string; year: number; count: number }) =>
            `${d.type} · ${d.year}\n${d.count} ${d.count === 1 ? 'work' : 'works'}`,
        }),
      ],
    });

    // Plot prepends an HTML legend; style its text to match the theme.
    chart.querySelectorAll<HTMLElement>('[class*="swatches"]').forEach((el) => {
      el.style.color = axisColor;
      el.style.fontSize = '12px';
    });

    wrapRef.current.append(chart);
    return () => chart.remove();
  }, [pubs, width]);

  return <div ref={wrapRef} className="w-full" />;
}
