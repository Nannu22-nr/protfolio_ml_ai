import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  /** Hide the arrow indicator (e.g. when the child already contains an icon). */
  hideIcon?: boolean;
  "aria-label"?: string;
}

/** Safe external anchor: new tab, no opener/referrer leakage, visible indicator, screen-reader hint. */
export function ExternalLink({ href, children, className, hideIcon, ...rest }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("inline-flex items-center gap-1.5", className)}
      aria-label={rest["aria-label"]}
    >
      {children}
      {!hideIcon && <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />}
      {!rest["aria-label"] && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
