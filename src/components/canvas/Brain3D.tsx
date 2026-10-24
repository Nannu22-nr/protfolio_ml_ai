"use client";

import { useCallback, useMemo } from "react";
import { AnimatedCanvas, type DrawFn } from "./AnimatedCanvas";
import { project, type V3 } from "./math3d";

const RX = 1.12;
const RY = 0.86;
const RZ = 0.95;
const TUMOR: V3 = { x: 0.34, y: -0.12, z: 0.46 };
const TUMOR_R = 0.2;

/** Point on a slightly folded ellipsoid (gyri-like ripple). */
function brainPoint(theta: number, phi: number): V3 {
  const ripple = 1 + 0.045 * Math.sin(5 * theta + 3 * phi) + 0.03 * Math.sin(9 * phi - 2 * theta);
  return {
    x: RX * ripple * Math.sin(phi) * Math.cos(theta),
    y: RY * ripple * Math.cos(phi),
    z: RZ * ripple * Math.sin(phi) * Math.sin(theta),
  };
}

/** Rotating wire brain with an MRI slice plane that sweeps through and outlines a highlighted region. Synthetic. */
export function Brain3D({ className, backdrop = false }: { className?: string; backdrop?: boolean }) {
  // Fibonacci sphere used for the highlighted region.
  const tumorPts = useMemo(() => {
    const n = 150;
    return Array.from({ length: n }, (_, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const a = i * 2.399963;
      const jitter = 1 + 0.18 * Math.sin(i * 1.7);
      return { x: Math.cos(a) * rad * jitter, y: y * jitter, z: Math.sin(a) * rad * jitter };
    });
  }, []);

  const draw = useCallback<DrawFn>(
    (ctx, w, h, t, p) => {
      const yaw = t * 0.32 + p.x * 0.6;
      const pitch = 0.28 + p.y * 0.2;
      const scale = Math.min(w * 0.34, h * 0.6);
      const cx = w * 0.5;
      const cy = h * 0.5;

      // latitude rings
      const rings = 11;
      for (let i = 1; i < rings; i++) {
        const phi = (i / rings) * Math.PI;
        ctx.beginPath();
        for (let k = 0; k <= 48; k++) {
          const q = project(brainPoint((k / 48) * Math.PI * 2, phi), yaw, pitch, cx, cy, scale);
          if (k === 0) ctx.moveTo(q.x, q.y);
          else ctx.lineTo(q.x, q.y);
        }
        ctx.strokeStyle = "rgba(45,212,191,0.22)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      // meridians
      for (let m = 0; m < 14; m++) {
        const theta = (m / 14) * Math.PI * 2;
        ctx.beginPath();
        for (let k = 0; k <= 36; k++) {
          const q = project(brainPoint(theta, (k / 36) * Math.PI), yaw, pitch, cx, cy, scale);
          if (k === 0) ctx.moveTo(q.x, q.y);
          else ctx.lineTo(q.x, q.y);
        }
        ctx.strokeStyle = "rgba(45,212,191,0.13)";
        ctx.stroke();
      }

      // MRI slice plane
      const sliceY = Math.sin(t * 0.7) * RY * 0.8;
      const slicePhi = Math.acos(Math.max(-1, Math.min(1, sliceY / RY)));
      const ring: { x: number; y: number }[] = [];
      for (let k = 0; k <= 64; k++) {
        const q = project(brainPoint((k / 64) * Math.PI * 2, slicePhi), yaw, pitch, cx, cy, scale);
        ring.push({ x: q.x, y: q.y });
      }
      ctx.beginPath();
      ring.forEach((q, i) => (i === 0 ? ctx.moveTo(q.x, q.y) : ctx.lineTo(q.x, q.y)));
      ctx.closePath();
      ctx.fillStyle = "rgba(204,251,241,0.09)";
      ctx.fill();
      ctx.strokeStyle = "rgba(204,251,241,0.9)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // highlighted region (points)
      const pulse = 1 + Math.sin(t * 2.2) * 0.06;
      const proj = tumorPts.map((v) =>
        project(
          { x: TUMOR.x + v.x * TUMOR_R * pulse, y: TUMOR.y + v.y * TUMOR_R * pulse, z: TUMOR.z + v.z * TUMOR_R * pulse },
          yaw,
          pitch,
          cx,
          cy,
          scale,
        ),
      );
      const centre = project(TUMOR, yaw, pitch, cx, cy, scale);
      const glow = ctx.createRadialGradient(centre.x, centre.y, 0, centre.x, centre.y, scale * 0.38);
      glow.addColorStop(0, "rgba(45,212,191,0.4)");
      glow.addColorStop(1, "rgba(45,212,191,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(centre.x, centre.y, scale * 0.38, 0, Math.PI * 2);
      ctx.fill();
      for (const q of proj) {
        ctx.fillStyle = `rgba(167,243,208,${0.35 + 0.5 * Math.max(0, Math.min(1, (0.8 - q.z) / 1.4))})`;
        ctx.fillRect(q.x - 1, q.y - 1, 2, 2);
      }

      // segmentation outline where the slice crosses the region
      const dy = sliceY - TUMOR.y;
      let crossing = false;
      if (Math.abs(dy) < TUMOR_R) {
        crossing = true;
        const rr = Math.sqrt(TUMOR_R * TUMOR_R - dy * dy) * pulse;
        ctx.beginPath();
        for (let k = 0; k <= 40; k++) {
          const a = (k / 40) * Math.PI * 2;
          const wob = 1 + 0.12 * Math.sin(3 * a + t * 2);
          const q = project(
            { x: TUMOR.x + Math.cos(a) * rr * wob, y: sliceY, z: TUMOR.z + Math.sin(a) * rr * wob },
            yaw,
            pitch,
            cx,
            cy,
            scale,
          );
          if (k === 0) ctx.moveTo(q.x, q.y);
          else ctx.lineTo(q.x, q.y);
        }
        ctx.closePath();
        ctx.fillStyle = "rgba(45,212,191,0.35)";
        ctx.fill();
        ctx.strokeStyle = "#ecfeff";
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }

      if (!backdrop) {
        ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.fillStyle = "rgba(204,251,241,0.85)";
        ctx.fillText(`SLICE ${sliceY >= 0 ? "+" : "−"}${Math.abs(sliceY).toFixed(2)}`, 12, h - 12);
        if (crossing) {
          ctx.fillStyle = "#5eead4";
          ctx.fillText("REGION OUTLINED", 12, h - 28);
        }
      }
    },
    [tumorPts, backdrop],
  );

  return <AnimatedCanvas draw={draw} className={className} label="Animated 3D brain with an MRI slice sweeping through (schematic)" />;
}