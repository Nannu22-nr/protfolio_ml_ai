import { PipelineExplorer } from "@/components/lab/PipelineExplorer";
import { SignalBench } from "@/components/lab/SignalBench";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TechnicalLab() {
  return (
    <section id="lab" aria-labelledby="lab-title" className="border-t border-line py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index="05"
          label="Technical Lab"
          id="lab-title"
          title="How I think about ML systems"
          description="Interactive notes on system design and signal processing. Diagrams are generic illustrations, and the signal bench runs on synthetic data."
        />

        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal className="min-w-0">
            <h3 className="label mb-4">A · System patterns</h3>
            <PipelineExplorer />
          </Reveal>
          <Reveal delay={0.08} className="min-w-0">
            <h3 className="label mb-4">B · Signal smoothing bench</h3>
            <SignalBench />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
