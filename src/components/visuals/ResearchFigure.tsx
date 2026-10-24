import { Brain3D } from "@/components/canvas/Brain3D";
import { Eeg3D } from "@/components/canvas/Eeg3D";
import { Helix3D } from "@/components/canvas/Helix3D";
import type { ResearchEntry } from "@/types";

const captions: Record<ResearchEntry["figure"], string> = {
  eeg: "Live 3D EEG channels · synthetic signal",
  tumor: "Live 3D MRI slice scan · schematic",
  rna: "Live 3D RNA/DNA helix · schematic",
};

/** Animated 3D schematics for each research direction. None of them is experimental data. */
export function ResearchFigure({ kind }: { kind: ResearchEntry["figure"] }) {
  const cls = "block h-full w-full";
  return (
    <figure>
      <div className="relative aspect-[16/11] overflow-hidden rounded-sm border border-line bg-navy-800 [background-image:radial-gradient(circle_at_50%_40%,rgba(45,212,191,0.1),transparent_65%)]">
        <div className="grid-bg absolute inset-0 opacity-40" aria-hidden="true" />
        {kind === "eeg" && <Eeg3D className={`relative ${cls}`} />}
        {kind === "tumor" && <Brain3D className={`relative ${cls}`} />}
        {kind === "rna" && <Helix3D className={`relative ${cls}`} />}
      </div>
      <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-label text-slate-500">{captions[kind]} · not experimental data</figcaption>
    </figure>
  );
}
