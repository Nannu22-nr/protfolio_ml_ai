import { Tilt } from "@/components/ui/Tilt";

/**
 * 3D interface map for the Medical AI Assistant.
 * Module names are the navigation labels shown on the live application; they orbit the chat surface.
 * It is a diagram of the app's structure, not a screenshot.
 */
const modules = [
  "Home",
  "Chat",
  "Voice",
  "Symptoms",
  "X-Ray/MRI",
  "Wearable",
  "Mental Health",
  "Medications",
  "2nd Opinion",
  "Emergency",
  "Nutrition",
  "Drugs",
  "Records",
  "Risk",
];

export function AssistantVisual() {
  const step = 360 / modules.length;
  return (
    <figure>
      <Tilt max={8}>
        <div
          className="orbit-wrap relative aspect-[16/11] w-full overflow-visible rounded-sm border border-cyanline/30 bg-navy-900 [transform-style:preserve-3d] [--r:clamp(120px,26vw,250px)]"
          role="img"
          aria-label="Conceptual 3D illustration: the fourteen modules of the Medical AI Assistant orbiting a conversation surface"
        >
          <div className="grid-bg absolute inset-0 opacity-40" aria-hidden="true" />

          {/* header bar */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-cyanline/20 px-4 py-3 [transform:translateZ(10px)]" aria-hidden="true">
            <p className="font-mono text-xs text-cyanline">Smart AI — Advanced Medical Assistant</p>
            <span className="anim-blink h-2 w-2 rounded-full bg-cyanline" />
          </div>

          {/* centre chat surface */}
          <div
            className="absolute left-1/2 top-1/2 w-[34%] border border-cyanline/40 bg-navy-800/95 p-3 shadow-[0_0_60px_-10px_rgba(34,211,238,0.35)] [transform:translate(-50%,-50%)_translateZ(30px)]"
            aria-hidden="true"
          >
            <p className="mb-2 font-mono text-[9px] uppercase tracking-label text-slate-500">Conversation</p>
            <div className="space-y-2">
              <div className="h-1.5 w-2/3 bg-slate-700" />
              <div className="h-1.5 w-1/2 bg-slate-800" />
              <div className="ml-auto h-6 w-3/4 border border-cyanline/40 bg-cyanline/5" />
              <div className="h-1.5 w-5/6 bg-slate-700" />
              <div className="flex items-center gap-1.5 border border-cyanline/25 px-2 py-1.5">
                <span className="h-1.5 flex-1 bg-slate-800" />
                <span className="h-3 w-3 border border-cyanline/60" />
              </div>
            </div>
          </div>

          {/* orbiting modules */}
          <div className="anim-orbit absolute left-1/2 top-1/2 h-0 w-0 [transform-style:preserve-3d]" aria-hidden="true">
            {modules.map((m, i) => {
              const a = i * step;
              return (
                <div
                  key={m}
                  className="absolute left-0 top-0 [transform-style:preserve-3d]"
                  style={{ transform: `rotateY(${a}deg) translateZ(var(--r))` }}
                >
                  <div className="-translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]">
                    <span
                      className="anim-counter block whitespace-nowrap rounded-sm border border-cyanline/35 bg-navy-900/90 px-2.5 py-1 font-mono text-[11px] text-slate-200 shadow-[0_0_18px_-6px_rgba(34,211,238,0.6)]"
                      style={{ ["--a" as string]: `${a}deg` }}
                    >
                      {m}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Tilt>
      <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-label text-slate-500">
        Interface map · module names from the live app · not a screenshot
      </figcaption>
    </figure>
  );
}
