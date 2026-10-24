import { Tilt } from "@/components/ui/Tilt";

/**
 * Conceptual 3D illustration for AIMScribe: unstructured text → highlighted spans → ranked list.
 * Three layers float at different depths and animate on a loop. NOT a screenshot and contains no real data.
 */
const lines = [0, 1, 2, 3, 4, 5, 6];
const highlighted: Record<number, { x: number; w: number }> = {
  1: { x: 70, w: 54 },
  3: { x: 40, w: 70 },
  5: { x: 96, w: 48 },
};
const ranked = [150, 118, 92, 64];

const layer = "absolute inset-0 h-full w-full";

export function AimscribeVisual() {
  return (
    <figure>
      <Tilt max={9}>
        <div
          className="relative aspect-[560/330] w-full [transform-style:preserve-3d]"
          role="img"
          aria-label="Conceptual 3D illustration: free text with highlighted clinical terms feeding a ranked list of recommendations"
        >
          {/* back plate */}
          <div className="absolute inset-0 overflow-hidden rounded-sm border border-line bg-navy-800 [transform:translateZ(-30px)]">
            <div className="grid-bg absolute inset-0 opacity-60" />
          </div>

          {/* layer 1: source text */}
          <svg viewBox="0 0 560 330" className={layer} style={{ transform: "translateZ(24px)" }} aria-hidden="true">
            <rect x="24" y="30" width="190" height="270" fill="#080d18" stroke="#2dd4bf" strokeOpacity="0.4" />
            <text x="36" y="22" fill="#64748b" fontSize="10" fontFamily="var(--font-geist-mono)">TEXT</text>
            {lines.map((i) => (
              <rect key={i} x="40" y={56 + i * 32} width={150 - (i % 3) * 14} height="6" fill="#334155" />
            ))}
          </svg>

          {/* layer 2: highlights + flow */}
          <svg viewBox="0 0 560 330" className={layer} style={{ transform: "translateZ(56px)" }} aria-hidden="true">
            {lines.map((i) => {
              const h = highlighted[i];
              if (!h) return null;
              const y = 56 + i * 32;
              return (
                <rect
                  key={i}
                  className="anim-hl"
                  style={{ animationDelay: `${i * 0.28}s` }}
                  x={h.x}
                  y={y - 5}
                  width={h.w}
                  height="16"
                  fill="#2dd4bf"
                  fillOpacity="0.2"
                  stroke="#2dd4bf"
                />
              );
            })}
            <g stroke="#2dd4bf" strokeOpacity="0.7" fill="none" strokeWidth="1.3">
              <path className="anim-flow" d="M214 120 C 260 120, 260 165, 306 165" />
              <path className="anim-flow" d="M214 184 C 260 184, 260 165, 306 165" />
              <path className="anim-flow" d="M214 248 C 260 248, 260 165, 306 165" />
              <path className="anim-flow" d="M313 165 H 346" />
            </g>
            <circle cx="306" cy="165" r="8" fill="#05070c" stroke="#2dd4bf" strokeWidth="1.5" />
            <circle cx="306" cy="165" r="2.8" fill="#2dd4bf" />
          </svg>

          {/* layer 3: ranked output */}
          <svg viewBox="0 0 560 330" className={layer} style={{ transform: "translateZ(90px)" }} aria-hidden="true">
            <rect x="356" y="86" width="180" height="158" fill="#080d18" stroke="#2dd4bf" strokeOpacity="0.5" />
            <text x="356" y="78" fill="#64748b" fontSize="10" fontFamily="var(--font-geist-mono)">RANKED OUTPUT</text>
            {ranked.map((w, i) => (
              <g key={w}>
                <text x="370" y={118 + i * 34} fill="#475569" fontSize="10" fontFamily="var(--font-geist-mono)">{`0${i + 1}`}</text>
                <rect
                  className="anim-bar"
                  style={{ animationDelay: `${0.6 + i * 0.25}s` }}
                  x="394"
                  y={110 + i * 34}
                  width={w}
                  height="10"
                  fill="#2dd4bf"
                  fillOpacity={1 - i * 0.2}
                />
              </g>
            ))}
          </svg>
        </div>
      </Tilt>
      <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-label text-slate-500">
        Conceptual 3D illustration · not a screenshot of the app
      </figcaption>
    </figure>
  );
}
