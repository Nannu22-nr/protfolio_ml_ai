import { InteractiveText } from "@/components/ui/InteractiveText";
import { Reveal } from "@/components/ui/Reveal";

interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  description?: string;
  id?: string;
}

export function SectionHeading({ index, label, title, description, id }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 max-w-3xl sm:mb-16">
      <p className="label flex items-center gap-3">
        <span className="text-slate-500">{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-signal/60" />
        <span>{label}</span>
      </p>
      <InteractiveText
        as="h2"
        text={title}
        id={id}
        className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
        radius={100}
        lift={6}
      />
      {description && <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400">{description}</p>}
    </Reveal>
  );
}
