import { useEffect, useRef } from 'react';
import * as Plot from '@observablehq/plot';

export interface ScatterPoint {
  symptom: string;
  child: number;
  parent: number;
  subscale: string;
}

interface Props {
  data: ScatterPoint[];
  width?: number;
}

export default function ScatterPlot({ data, width = 500 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chart = Plot.plot({
      width,
      height: width,
      marginLeft: 50,
      marginBottom: 50,
      grid: true,
      x: { label: 'Child Score', domain: [0, 3] },
      y: { label: 'Parent Score', domain: [0, 3] },
      color: { legend: true, label: 'Subscale' },
      marks: [
        // diagonal reference line (perfect agreement)
        Plot.line(
          [{ x: 0, y: 0 }, { x: 3, y: 3 }],
          { x: 'x', y: 'y', stroke: '#cbd5e1', strokeDasharray: '4,4' }
        ),
        Plot.dot(data, {
          x: 'child',
          y: 'parent',
          fill: 'subscale',
          r: 5,
          tip: true,
          title: (d: ScatterPoint) => `${d.symptom}\nChild: ${d.child}, Parent: ${d.parent}`,
        }),
      ],
    });

    ref.current.appendChild(chart);
    return () => chart.remove();
  }, [data, width]);

  return <div ref={ref} />;
}
