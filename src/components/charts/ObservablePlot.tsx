import { useEffect, useRef } from 'react';

interface Props {
  // A function that returns a Plot SVG/HTMLElement.
  // Defined client-side so it never needs to serialize across the boundary.
  spec: () => SVGSVGElement | HTMLElement;
  className?: string;
}

export default function ObservablePlot({ spec, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chart = spec();
    ref.current.appendChild(chart);
    return () => chart.remove();
  }, [spec]);

  return <div ref={ref} className={className} />;
}
