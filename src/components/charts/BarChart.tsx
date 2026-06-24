import { useEffect, useRef } from 'react';
import * as Plot from '@observablehq/plot';

export interface BarDatum {
  subscale: string;
  reporter: 'Child' | 'Parent';
  medianScore: number;
}

interface Props {
  data: BarDatum[];
  width?: number;
}

export default function BarChart({ data, width = 500 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chart = Plot.plot({
      width,
      height: 300,
      marginLeft: 120,
      marginBottom: 50,
      x: { label: 'Median Score', grid: true },
      y: { label: null },
      color: { legend: true, range: ['#60a5fa', '#f472b6'] },
      marks: [
        Plot.barX(data, {
          x: 'medianScore',
          y: 'subscale',
          fill: 'reporter',
          tip: true,
          offset: 'dodge',
        }),
        Plot.ruleX([0]),
      ],
    });

    ref.current.appendChild(chart);
    return () => chart.remove();
  }, [data, width]);

  return <div ref={ref} />;
}
