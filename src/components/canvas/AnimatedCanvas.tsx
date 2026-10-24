"use client";

import { useEffect, useRef } from "react";

export interface PointerState {
  /** Smoothed pointer position relative to the canvas, -1 … 1 (0 when the pointer is away). */
  x: number;
  y: number;
  /** Pointer position in CSS pixels relative to the canvas, or -9999 when away. */
  px: number;
  py: number;
  inside: boolean;
}

export type DrawFn = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number, pointer: PointerState) => void;

interface AnimatedCanvasProps {
  draw: DrawFn;
  className?: string;
  /** Accessible description. Omit for purely decorative canvases. */
  label?: string;
  /** Pointer is tracked on the whole window so canvases behind content can still react. */
  trackWindow?: boolean;
}

/**
 * Generic animated canvas:
 *  - handles devicePixelRatio and resizing
 *  - only animates while on screen
 *  - follows the pointer with smoothing
 *  - draws one calm static frame when the user prefers reduced motion
 */
export function AnimatedCanvas({ draw, className, label, trackWindow = true }: AnimatedCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef(draw);

  useEffect(() => {
    drawRef.current = draw;
  }, [draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer: PointerState = { x: 0, y: 0, px: -9999, py: -9999, inside: false };
    const target = { x: 0, y: 0 };
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const start = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) renderFrame(2.4);
    };

    const renderFrame = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      drawRef.current(ctx, w, h, t, pointer);
    };

    const loop = (now: number) => {
      raf = 0;
      if (!visible) return;
      pointer.x += (target.x - pointer.x) * 0.07;
      pointer.y += (target.y - pointer.y) * 0.07;
      renderFrame((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (!raf && !reduce) raf = requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
        if (visible) startLoop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      const inside = px >= 0 && py >= 0 && px <= rect.width && py <= rect.height;
      pointer.inside = inside;
      pointer.px = px;
      pointer.py = py;
      if (inside || trackWindow) {
        target.x = Math.max(-1.2, Math.min(1.2, (px / rect.width) * 2 - 1));
        target.y = Math.max(-1.2, Math.min(1.2, (py / rect.height) * 2 - 1));
      }
      if (!inside && !trackWindow) {
        target.x = 0;
        target.y = 0;
      }
    };
    const onLeave = () => {
      pointer.inside = false;
      pointer.px = -9999;
      pointer.py = -9999;
      target.x = 0;
      target.y = 0;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    startLoop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [trackWindow]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}
