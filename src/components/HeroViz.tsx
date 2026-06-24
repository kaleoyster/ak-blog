import { useEffect, useRef } from 'react';

/**
 * Signature hero visualization: a gently drifting network of nodes with
 * signals that pulse along the edges — a nod to neural networks and the
 * "flow of attribution" idea behind explainable AI.
 *
 * Self-contained canvas animation. Theme-aware (light/dark) and respects
 * prefers-reduced-motion (renders a single static frame instead).
 */

const ACCENTS = ['#60a5fa', '#34d399', '#f472b6', '#fb923c', '#a78bfa'];

interface VizNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
}

interface Pulse {
  a: number; // source node index
  b: number; // target node index
  t: number; // progress 0..1
  speed: number;
  color: string;
}

export default function HeroViz({ height = 300 }: { height?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = canvas.clientWidth;
    let nodes: VizNode[] = [];
    let pulses: Pulse[] = [];
    let raf = 0;

    const isDark = () => document.documentElement.classList.contains('dark');
    const linkColor = () => (isDark() ? 'rgba(148,163,184,' : 'rgba(100,116,139,');

    const LINK_DIST = 130;

    function resize() {
      width = canvas.clientWidth;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    function build() {
      const count = Math.max(14, Math.min(34, Math.round(width / 26)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 1.5 + Math.random() * 2.5,
        color: ACCENTS[(Math.random() * ACCENTS.length) | 0],
      }));
      pulses = [];
    }

    function spawnPulse() {
      if (nodes.length < 2) return;
      const a = (Math.random() * nodes.length) | 0;
      // pick a nearby node as target
      let b = -1;
      let best = LINK_DIST;
      for (let i = 0; i < nodes.length; i++) {
        if (i === a) continue;
        const d = Math.hypot(nodes[a].x - nodes[i].x, nodes[a].y - nodes[i].y);
        if (d < best && Math.random() < 0.5) {
          best = d;
          b = i;
        }
      }
      if (b === -1) return;
      pulses.push({ a, b, t: 0, speed: 0.012 + Math.random() * 0.02, color: nodes[a].color });
    }

    function drawFrame(animate: boolean) {
      ctx.clearRect(0, 0, width, height);

      // edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < LINK_DIST) {
            const alpha = (1 - d / LINK_DIST) * 0.5;
            ctx.strokeStyle = linkColor() + alpha.toFixed(3) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // pulses
      if (animate) {
        for (const p of pulses) {
          const na = nodes[p.a];
          const nb = nodes[p.b];
          const px = na.x + (nb.x - na.x) * p.t;
          const py = na.y + (nb.y - na.y) * p.t;
          ctx.beginPath();
          ctx.arc(px, py, 2.4, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // nodes
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.globalAlpha = 0.9;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    function tick() {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
        n.x = Math.max(0, Math.min(width, n.x));
        n.y = Math.max(0, Math.min(height, n.y));
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i].t += pulses[i].speed;
        if (pulses[i].t >= 1) pulses.splice(i, 1);
      }
      if (pulses.length < 6 && Math.random() < 0.06) spawnPulse();

      drawFrame(true);
      raf = requestAnimationFrame(tick);
    }

    resize();

    if (reduceMotion) {
      drawFrame(false);
    } else {
      raf = requestAnimationFrame(tick);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // redraw on theme change so link colors stay correct
    const mo = new MutationObserver(() => {
      if (reduceMotion) drawFrame(false);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
    };
  }, [height]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height, display: 'block' }}
      aria-hidden="true"
    />
  );
}
