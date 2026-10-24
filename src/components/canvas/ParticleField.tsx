"use client";

import { useCallback, useRef } from "react";
import { AnimatedCanvas, type DrawFn } from "./AnimatedCanvas";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  z: number;
}

/** Quiet neural-network style backdrop: drifting nodes joined by faint lines, gently drawn toward the cursor. */
export function ParticleField({ className }: { className?: string }) {
  const nodes = useRef<Node[]>([]);
  const size = useRef({ w: 0, h: 0 });

  const draw = useCallback<DrawFn>((ctx, w, h, t, p) => {
    if (size.current.w !== w || size.current.h !== h || nodes.current.length === 0) {
      size.current = { w, h };
      const count = Math.round(Math.min(90, Math.max(28, (w * h) / 16000)));
      let seed = 7;
      const rand = () => {
        seed = (seed * 16807) % 2147483647;
        return seed / 2147483647;
      };
      nodes.current = Array.from({ length: count }, () => ({
        x: rand() * w,
        y: rand() * h,
        vx: (rand() - 0.5) * 0.25,
        vy: (rand() - 0.5) * 0.25,
        z: 0.4 + rand() * 0.6,
      }));
    }
    const list = nodes.current;
    const link = 130;

    for (const n of list) {
      const dx = p.px - n.x;
      const dy = p.py - n.y;
      const d = Math.hypot(dx, dy);
      if (d < 180 && d > 1) {
        n.vx += (dx / d) * 0.012;
        n.vy += (dy / d) * 0.012;
      }
      n.vx *= 0.995;
      n.vy *= 0.995;
      n.x += n.vx + Math.sin(t * 0.4 + n.y * 0.01) * 0.04;
      n.y += n.vy + Math.cos(t * 0.4 + n.x * 0.01) * 0.04;
      if (n.x < -10) n.x = w + 10;
      if (n.x > w + 10) n.x = -10;
      if (n.y < -10) n.y = h + 10;
      if (n.y > h + 10) n.y = -10;
    }

    for (let i = 0; i < list.length; i++) {
      const a = list[i];
      if (!a) continue;
      for (let j = i + 1; j < list.length; j++) {
        const b = list[j];
        if (!b) continue;
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < link) {
          ctx.strokeStyle = `rgba(45,212,191,${(1 - d / link) * 0.22})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      ctx.fillStyle = `rgba(94,234,212,${0.25 + a.z * 0.45})`;
      ctx.beginPath();
      ctx.arc(a.x, a.y, 1 + a.z * 1.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);

  return <AnimatedCanvas draw={draw} className={className} />;
}
