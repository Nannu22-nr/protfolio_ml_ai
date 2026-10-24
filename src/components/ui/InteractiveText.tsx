"use client";

import { useEffect, useRef } from "react";

interface InteractiveTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  id?: string;
  /** Distance (px) at which the cursor starts to affect a letter. */
  radius?: number;
  /** Maximum lift in px. Kept small on purpose for a professional feel. */
  lift?: number;
  /** Maximum extra scale (0.12 = 12%). */
  grow?: number;
}

/**
 * Cursor-reactive typography. Letters near the pointer lift slightly, scale up and tint toward the accent colour,
 * then ease back. Words never break, screen readers get the plain text, and the effect is disabled
 * on touch devices and when the user prefers reduced motion.
 */
export function InteractiveText({ text, as = "span", className, id, radius = 110, lift = 7, grow = 0.14 }: InteractiveTextProps) {
  const Comp = as;
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const chars = Array.from(root.querySelectorAll<HTMLElement>("[data-c]"));
    let visible = false;
    let raf = 0;
    let px = -9999;
    let py = -9999;
    let touched = false;

    const reset = () => {
      if (!touched) return;
      touched = false;
      for (const el of chars) {
        el.style.transform = "";
        el.style.color = "";
      }
    };

    const apply = () => {
      raf = 0;
      if (!visible) return;
      const box = root.getBoundingClientRect();
      const near =
        px > box.left - radius && px < box.right + radius && py > box.top - radius && py < box.bottom + radius;
      if (!near) {
        reset();
        return;
      }
      touched = true;
      for (const el of chars) {
        const r = el.getBoundingClientRect();
        const dx = px - (r.left + r.width / 2);
        const dy = py - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy);
        const f = Math.max(0, 1 - d / radius);
        const e = f * f * (3 - 2 * f); // smoothstep
        if (e < 0.01) {
          el.style.transform = "";
          el.style.color = "";
        } else {
          el.style.transform = `translate3d(0, ${(-lift * e).toFixed(2)}px, 0) scale(${(1 + grow * e).toFixed(3)})`;
          el.style.color = `color-mix(in srgb, #2dd4bf ${Math.round(e * 100)}%, currentColor)`;
        }
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || !visible) return;
      px = e.clientX;
      py = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      px = -9999;
      py = -9999;
      reset();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
        if (!visible) reset();
      },
      { rootMargin: "100px" },
    );
    io.observe(root);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [text, radius, lift, grow]);

  const words = text.split(" ");

  return (
    <Comp id={id} className={className}>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true">
        {words.map((word, wi) => (
          <span key={`${word}-${wi}`}>
            <span className="inline-block whitespace-nowrap">
              {Array.from(word).map((ch, ci) => (
                <span
                  key={ci}
                  data-c=""
                  className="inline-block transition-[transform,color] duration-150 ease-out will-change-transform"
                >
                  {ch}
                </span>
              ))}
            </span>
            {wi < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </Comp>
  );
}

