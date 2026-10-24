import { Briefcase, Compass, Crown, GraduationCap, Rocket, Users, Wrench, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tilt } from "@/components/ui/Tilt";
import { experience } from "@/data/experience";
import type { ExperienceEntry } from "@/types";

const byKind = (kind: ExperienceEntry["kind"]) => experience.filter((e) => e.kind === kind);

const workIcons: Record<string, LucideIcon> = {
  "visual-content-manager": Compass,
  "fablab-operator": Wrench,
};

const leadershipIcons: Record<string, LucideIcon> = {
  "krs-president": Crown,
  "durbar-autonomous-lead": Rocket,
  "try-kuet-vp": Users,
};

function BlockHeader({ index, title, note, count }: { index: string; title: string; note: string; count: number }) {
  return (
    <Reveal>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-xs text-signal">{index}</span>
          <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h3>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-label text-slate-500">
          {note} · {String(count).padStart(2, "0")}
        </p>
      </div>
    </Reveal>
  );
}

function Points({ points }: { points: string[] }) {
  if (points.length === 0) return null;
  return (
    <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-slate-300">
      {points.map((p) => (
        <li key={p} className="flex gap-3">
          <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-signal" />
          <span>{p}</span>
        </li>
      ))}
    </ul>
  );
}

export function Experience() {
  const work = byKind("work");
  const education = byKind("education");
  const leadership = byKind("leadership");

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative border-t border-line bg-navy-900 py-24 sm:py-32">
      <div className="aurora pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="container-x relative">
        <SectionHeading
          index="04"
          label="Experience"
          id="experience-title"
          title="Experience, education & leadership"
          description="Taken from my CV. Dates appear only where the CV states them."
        />

        {/* ───────── 1 · Experience ───────── */}
        <div>
          <BlockHeader index="01" title="Experience" note="Work & lab roles" count={work.length} />
          <div className="grid gap-6 md:grid-cols-2">
            {work.map((e, i) => {
              const Icon = workIcons[e.id] ?? Briefcase;
              return (
                <Reveal key={e.id} delay={i * 0.08}>
                  <Tilt max={5} glare className="h-full">
                    <article className="card-surface flex h-full flex-col p-7 sm:p-8">
                      <div className="flex items-start justify-between gap-4">
                        <span className="grid h-12 w-12 place-items-center rounded-sm border border-signal/40 bg-signal/10 text-signal [transform:translateZ(30px)]">
                          <Icon aria-hidden="true" className="h-6 w-6" />
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-label text-slate-500">Role {String(i + 1).padStart(2, "0")}</span>
                      </div>
                      <h4 className="mt-6 text-xl font-semibold text-white">{e.role}</h4>
                      <p className="mt-1 text-slate-400">{e.organization}</p>
                      <Points points={e.points} />
                    </article>
                  </Tilt>
                </Reveal>
              );
            })}
          </div>
        </div>

        <div className="section-rule my-20" aria-hidden="true" />

        {/* ───────── 2 · Education ───────── */}
        <div>
          <BlockHeader index="02" title="Education" note="Degrees & schooling" count={education.length} />
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            {education.map((e, i) => (
              <Reveal key={e.id} delay={i * 0.08}>
                <Tilt max={4} glare className="h-full">
                  <article className="card-surface relative flex h-full flex-col overflow-hidden p-7 sm:p-8">
                    <GraduationCap
                      aria-hidden="true"
                      className="absolute -right-4 -top-4 h-36 w-36 text-signal/[0.06]"
                      strokeWidth={1}
                    />
                    <p className="font-mono text-[11px] uppercase tracking-label text-signal">
                      {i === 0 ? "Undergraduate" : "Higher secondary"}
                    </p>
                    {e.period && (
                      <p className="mt-5 font-mono text-4xl font-semibold tracking-tight text-white sm:text-5xl [transform:translateZ(30px)]">
                        {e.period}
                      </p>
                    )}
                    <h4 className={`${e.period ? "mt-5" : "mt-6"} text-xl font-semibold text-white`}>{e.role}</h4>
                    <p className="mt-1 text-slate-400">{e.organization}</p>
                    <Points points={e.points} />
                  </article>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="section-rule my-20" aria-hidden="true" />

        {/* ───────── 3 · Leadership ───────── */}
        <div>
          <BlockHeader index="03" title="Leadership" note="Societies & teams" count={leadership.length} />
          <div className="grid gap-6 md:grid-cols-3">
            {leadership.map((e, i) => {
              const Icon = leadershipIcons[e.id] ?? Users;
              return (
                <Reveal key={e.id} delay={i * 0.08}>
                  <Tilt max={7} glare className="h-full">
                    <article className="card-surface flex h-full flex-col items-start p-7">
                      <span className="grid h-14 w-14 place-items-center rounded-full border border-signal/40 bg-signal/10 text-signal [transform:translateZ(36px)]">
                        <Icon aria-hidden="true" className="h-6 w-6" />
                      </span>
                      <p className="mt-6 font-mono text-[11px] uppercase tracking-label text-signal">{e.role}</p>
                      <h4 className="mt-2 text-lg font-semibold leading-snug text-white">{e.organization}</h4>
                      <Points points={e.points} />
                    </article>
                  </Tilt>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
