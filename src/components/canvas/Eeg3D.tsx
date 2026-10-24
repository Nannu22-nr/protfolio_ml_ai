"use client";

import { useCallback } from "react";
import { AnimatedCanvas, type DrawFn } from "./AnimatedCanvas";
import { project } from "./math3d";

const CH = 6;
const N = 120;

/** Synthetic EEG-like value: a few oscillation bands plus a slow drift. */
function eeg(ch: number, u: number, t: number) {
  const k = ch + 1;
  return (
    Math.sin(u * 11 + t * (1.3 + k * 0.15) + k) * 0.28 +
    Math.sin(u * 27 - t * (2.1 + k * 0.1) + k * 2) * 0.13 +
    Math.sin(u * 57 + t * 3.4 + k * 5) * 0.06 +
    Math.sin(u * 4 + t * 0.5 + k) * 0.18
  );
}

/** Multi-channel EEG as layered 3D ribbons with a sweeping analysis window. Synthetic data. */
export function Eeg3D({ className }: { className?: string }) {
  const draw = useCallback<DrawFn>((ctx, w, h, t, p) => {
    const yaw = -0.62 + Math.sin(t * 0.25) * 0.1 + p.x * 0.3;
    const pitch = 0.42 + p.y * 0.12;
    const scale = Math.min(w * 0.33, h * 0.62);
    const cx = w * 0.5;
    const cy = h * 0.52;
    const half = 1.5;
    const gap = 0.36;
    const zAt = (c: number) => (c - (CH - 1) / 2) * gap;

    // sweeping analysis window
    const sweep = ((t * 0.18) % 1) * 2 - 1;
    const sx = sweep * half;

    for (let c = CH - 1; c >= 0; c--) {
      const z = zAt(c);
      const pts: { x: number; y: number }[] = [];
      for (let i = 0; i < N; i++) {
        const u = i / (N - 1);
        const x = -half + u * half * 2;
        const q = project({ x, y: -eeg(c, u, t), z }, yaw, pitch, cx, cy, scale);
        pts.push({ x: q.x, y: q.y });
      }
      const a = project({ x: -half, y: 0.2, z }, yaw, pitch, cx, cy, scale);
      const b = project({ x: half, y: 0.2, z }, yaw, pitch, cx, cy, scale);
      const first = pts[0];
      const last = pts[pts.length - 1];
      if (!first || !last) continue;
      const alpha = 0.95 - (CH - 1 - c) * 0.07;

      ctx.beginPath();
      pts.forEach((q, i) => (i === 0 ? ctx.moveTo(q.x, q.y) : ctx.lineTo(q.x, q.y)));
      ctx.lineTo(b.x, b.y);
      ctx.lineTo(a.x, a.y);
      ctx.closePath();
      const fill = ctx.createLinearGradient(0, Math.min(first.y, a.y) - 30, 0, a.y + 10);
      fill.addColorStop(0, `rgba(45,212,191,${0.2 * alpha})`);
      fill.addColorStop(1, "rgba(45,212,191,0)");
      ctx.fillStyle = fill;
      ctx.fill();

      ctx.beginPath();
      pts.forEach((q, i) => (i === 0 ? ctx.moveTo(q.x, q.y) : ctx.lineTo(q.x, q.y)));
      ctx.strokeStyle = c % 2 === 0 ? `rgba(45,212,191,${alpha})` : `rgba(34,211,238,${alpha})`;
      ctx.lineWidth = 1.3;
      ctx.lineJoin = "round";
      ctx.stroke();

      // channel label
      ctx.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.fillStyle = `rgba(148,163,184,${0.9 * alpha})`;
      ctx.fillText(`CH${c + 1}`, Math.max(2, a.x - 28), a.y + 3);
    }

    // analysis window plane
    const corners = [
      project({ x: sx, y: -0.62, z: zAt(0) - 0.15 }, yaw, pitch, cx, cy, scale),
      project({ x: sx, y: -0.62, z: zAt(CH - 1) + 0.15 }, yaw, pitch, cx, cy, scale),
      project({ x: sx, y: 0.3, z: zAt(CH - 1) + 0.15 }, yaw, pitch, cx, cy, scale),
      project({ x: sx, y: 0.3, z: zAt(0) - 0.15 }, yaw, pitch, cx, cy, scale),
    ];
    ctx.beginPath();
    corners.forEach((q, i) => (i === 0 ? ctx.moveTo(q.x, q.y) : ctx.lineTo(q.x, q.y)));
    ctx.closePath();
    ctx.fillStyle = "rgba(204,251,241,0.06)";
    ctx.fill();
    ctx.strokeStyle = "rgba(204,251,241,0.55)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
    ctx.fillStyle = "rgba(204,251,241,0.85)";
    ctx.fillText(`WINDOW ${(((sweep + 1) / 2) * 4).toFixed(2)} s`, 12, h - 12);
  }, []);

  return <AnimatedCanvas draw={draw} className={className} label="Animated 3D multi-channel EEG traces (synthetic)" />;
}
