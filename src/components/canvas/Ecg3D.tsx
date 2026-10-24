"use client";

import { useCallback } from "react";
import { AnimatedCanvas, type DrawFn } from "./AnimatedCanvas";
import { project } from "./math3d";

/** One synthetic heartbeat, t in [0, 1). Gaussian P, QRS and T waves. */
function beat(t: number) {
  const g = (m: number, s: number, a: number) => a * Math.exp(-((t - m) ** 2) / (2 * s * s));
  return g(0.17, 0.028, 0.14) + g(0.355, 0.008, -0.16) + g(0.385, 0.011, 1) + g(0.415, 0.01, -0.28) + g(0.62, 0.055, 0.3);
}

const ROWS = 6;
const SAMPLES = 150;

/**
 * Scrolling 3D ECG: several rows of the same synthetic trace in depth, so the pulse seems to travel
 * across a floor. Pointer tilts the camera. Synthetic data, decorative.
 */
export function Ecg3D({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const rgb = tone === "light" ? "15,118,110" : "45,212,191";

  const draw = useCallback<DrawFn>(
    (ctx, w, h, t, p) => {
      const yaw = -0.5 + p.x * 0.22;
      const pitch = 0.62 + p.y * 0.1;
      const scale = w * 0.37;
      const cx = w * 0.5;
      const cy = h * 0.5;
      const half = 1.55;
      const speed = 0.55;
      const beatsAcross = 2.4;

      // floor grid
      ctx.lineWidth = 1;
      for (let r = 0; r <= ROWS; r++) {
        const z = -0.2 + r * 0.42;
        const a = project({ x: -half, y: 0, z }, yaw, pitch, cx, cy, scale);
        const b = project({ x: half, y: 0, z }, yaw, pitch, cx, cy, scale);
        ctx.strokeStyle = `rgba(${rgb},${0.13 - r * 0.012})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      for (let i = 0; i <= 12; i++) {
        const x = -half + (i / 12) * half * 2;
        const a = project({ x, y: 0, z: -0.2 }, yaw, pitch, cx, cy, scale);
        const b = project({ x, y: 0, z: -0.2 + ROWS * 0.42 }, yaw, pitch, cx, cy, scale);
        ctx.strokeStyle = `rgba(${rgb},0.08)`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // rows back to front
      for (let r = ROWS - 1; r >= 0; r--) {
        const z = r * 0.42;
        const pts: { x: number; y: number }[] = [];
        for (let i = 0; i < SAMPLES; i++) {
          const u = i / (SAMPLES - 1);
          const x = -half + u * half * 2;
          const phase = (((u * beatsAcross - t * speed + r * 0.11) % 1) + 1) % 1;
          const y = -beat(phase) * 0.62;
          const q = project({ x, y, z }, yaw, pitch, cx, cy, scale);
          pts.push({ x: q.x, y: q.y });
        }
        const first = pts[0];
        const last = pts[pts.length - 1];
        if (!first || !last) continue;

        const base0 = project({ x: -half, y: 0, z }, yaw, pitch, cx, cy, scale);
        const base1 = project({ x: half, y: 0, z }, yaw, pitch, cx, cy, scale);
        const depthAlpha = 1 - r * 0.15;
        const grad = ctx.createLinearGradient(first.x, 0, last.x, 0);
        grad.addColorStop(0, `rgba(${rgb},0)`);
        grad.addColorStop(0.35, `rgba(${rgb},${0.85 * depthAlpha})`);
        grad.addColorStop(1, `rgba(${rgb},${depthAlpha})`);

        // soft filled ribbon down to the floor
        ctx.beginPath();
        pts.forEach((q, i) => (i === 0 ? ctx.moveTo(q.x, q.y) : ctx.lineTo(q.x, q.y)));
        ctx.lineTo(base1.x, base1.y);
        ctx.lineTo(base0.x, base0.y);
        ctx.closePath();
        const fill = ctx.createLinearGradient(first.x, 0, last.x, 0);
        fill.addColorStop(0, `rgba(${rgb},0)`);
        fill.addColorStop(1, `rgba(${rgb},${0.1 * depthAlpha})`);
        ctx.fillStyle = fill;
        ctx.fill();

        ctx.beginPath();
        pts.forEach((q, i) => (i === 0 ? ctx.moveTo(q.x, q.y) : ctx.lineTo(q.x, q.y)));
        ctx.strokeStyle = grad;
        ctx.lineWidth = r === 0 ? 2 : 1.3;
        ctx.lineJoin = "round";
        ctx.stroke();

        // glowing head on the front row
        if (r === 0) {
          const glow = ctx.createRadialGradient(last.x, last.y, 0, last.x, last.y, 16);
          glow.addColorStop(0, `rgba(${rgb},0.55)`);
          glow.addColorStop(1, `rgba(${rgb},0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(last.x, last.y, 16, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = tone === "light" ? "#0f766e" : "#ccfbf1";
          ctx.beginPath();
          ctx.arc(last.x, last.y, 2.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    },
    [rgb, tone],
  );

  return <AnimatedCanvas draw={draw} className={className} label="Animated 3D ECG trace (synthetic, decorative)" />;
}
