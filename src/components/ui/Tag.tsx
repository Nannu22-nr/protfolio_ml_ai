import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block rounded-sm border border-line px-2 py-1 font-mono text-[11px] text-slate-400",
        className,
      )}
    >
      {children}
    </span>
  );
}
