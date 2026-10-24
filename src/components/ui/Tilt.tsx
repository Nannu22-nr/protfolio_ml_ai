"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TiltProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  /** Maximum rotation in degrees. */
  max?: number;
  /** Adds a soft light that follows the pointer. */
  glare?: boolean;
}

/**
 * Pointer-driven 3D tilt. Children can use `translateZ` to float above the surface.
 * Does nothing on touch devices or with reduced motion.
 */
export function Tilt({ children, className, innerClassName, max = 8, glare = false }: TiltProps) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  const enabled = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !enabled()) return;
    const el = outer.current;
    const box = inner.current;
    if (!el || !box) return;
    const rect = el.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      box.style.transition = "transform 80ms linear";
      box.style.transform = `rotateX(${((0.5 - ny) * max * 2).toFixed(2)}deg) rotateY(${((nx - 0.5) * max * 2).toFixed(2)}deg)`;
      box.style.setProperty("--mx", `${(nx * 100).toFixed(1)}%`);
      box.style.setProperty("--my", `${(ny * 100).toFixed(1)}%`);
    });
  };

  const onLeave = () => {
    const box = inner.current;
    if (!box) return;
    cancelAnimationFrame(raf.current);
    box.style.transition = "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)";
    box.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div ref={outer} className={cn("group/tilt [perspective:1200px]", className)} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div ref={inner} className={cn("relative h-full [transform-style:preserve-3d]", innerClassName)}>
        {children}
        {glare && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 [background:radial-gradient(420px_circle_at_var(--mx,50%)_var(--my,50%),rgba(45,212,191,0.13),transparent_60%)] [transform:translateZ(1px)] group-hover/tilt:opacity-100"
          />
        )}
      </div>
    </div>
  );
}
