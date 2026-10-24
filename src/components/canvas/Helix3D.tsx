"use client";

import { useCallback } from "react";
import { AnimatedCanvas, type DrawFn } from "./AnimatedCanvas";
import { project } from "./math3d";

const PAIRS = 30;
const BASES: Array<[string, string]> = [
  ["A", "U"],
  ["G", "C"],
  ["C", "G"],
  ["U", "A"],
];
const COLORS: Record<string, string> = { A: "#5eead4", U: "#22d3ee", G: "#a7f3d0", C: "#7dd3fc" };

/** Rotating RNA/DNA double helix with a pulse travelling along the sequence. Synthetic. */
export function Helix3D({ className }: { className?: string }) {
  const draw = useCallback<DrawFn>((ctx, w, h, t, p) => {
    const yaw = -0.35 + Math.sin(t * 0.3) * 0.15 + p.x * 0.4;
    const pitch = 0.18 + p.y * 0.25;
    const scale = Math.min(w * 0.34, h * 0.9);
    const cx = w * 0.5;
    const cy = h * 0.5;
    const radius = 0.36;
    const length = 1.55;
    const head = (t * 0.22) % 1;

    type Item = { z: number; run: () => void };
    const items: Item[] = [];
    const strand: Array<Array<{ x: number; y: number; z: number; s: number }>> = [[], []];

    for (let i = 0; i < PAIRS; i++) {
      const u = i / (PAIRS - 1);
      const x = (u - 0.5) * 2 * length;
      const ang = i * 0.56 + t * 1.1;
      const a = project({ x, y: Math.cos(ang) * radius, z: Math.sin(ang) * radius }, yaw, pitch, cx, cy, scale);
      const b = project({ x, y: -Math.cos(ang) * radius, z: -Math.sin(ang) * radius }, yaw, pitch, cx, cy, scale);
      strand[0]?.push({ x: a.x, y: a.y, z: a.z, s: a.s });
      strand[1]?.push({ x: b.x, y: b.y, z: b.z, s: b.s });

      const pair = BASES[i % BASES.length] ?? ["A", "U"];
      const lit = Math.max(0, 1 - Math.abs(u - head) * 7);

      items.push({
        z: (a.z + b.z) / 2,
        run: () => {
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, COLORS[pair[0]] ?? "#5eead4");
          grad.addColorStop(1, COLORS[pair[1]] ?? "#22d3ee");
          ctx.strokeStyle = grad;
          ctx.globalAlpha = 0.35 + lit * 0.55;
          ctx.lineWidth = 1.2 + lit * 1.2;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        },
      });

      for (const [pt, base] of [
        [a, pair[0]],
        [b, pair[1]],
      ] as const) {
        items.push({
          z: pt.z,
          run: () => {
            const front = pt.z < 0;
            const r = (3.4 + lit * 2.2) * pt.s;
            ctx.globalAlpha = front ? 1 : 0.5;
            if (lit > 0.2) {
              const g = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, r * 3.2);
              g.addColorStop(0, "rgba(94,234,212,0.55)");
              g.addColorStop(1, "rgba(94,234,212,0)");
              ctx.fillStyle = g;
              ctx.beginPath();
              ctx.arc(pt.x, pt.y, r * 3.2, 0, Math.PI * 2);
              ctx.fill();
            }
            ctx.fillStyle = COLORS[base] ?? "#5eead4";
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
            ctx.fill();
            if (front && r > 3.6) {
              ctx.font = `${Math.round(6.5 * pt.s)}px ui-monospace, SFMono-Regular, Menlo, monospace`;
              ctx.fillStyle = "#05070c";
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillText(base, pt.x, pt.y + 0.5);
            }
            ctx.globalAlpha = 1;
          },
        });
      }
    }

    // backbones
    for (const s of strand) {
      ctx.beginPath();
      s.forEach((q, i) => (i === 0 ? ctx.moveTo(q.x, q.y) : ctx.lineTo(q.x, q.y)));
      ctx.strokeStyle = "rgba(94,234,212,0.35)";
      ctx.lineWidth = 1.4;
      ctx.lineJoin = "round";
      ctx.stroke();
    }

    items.sort((m, n) => n.z - m.z).forEach((it) => it.run());
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";

    ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
    ctx.fillStyle = "rgba(204,251,241,0.85)";
    ctx.fillText(`READING  5′ → 3′  ·  ${String(Math.floor(head * PAIRS) + 1).padStart(2, "0")}/${PAIRS}`, 12, h - 12);
  }, []);

  return <AnimatedCanvas draw={draw} className={className} label="Animated 3D RNA/DNA double helix (schematic)" />;
}
