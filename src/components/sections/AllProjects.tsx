"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { Tilt } from "@/components/ui/Tilt";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { indexProjects, projectGroups } from "@/data/projects";
import { cn, pad } from "@/lib/utils";

export function AllProjects() {
  const [group, setGroup] = useState<(typeof projectGroups)[number]["id"]>("all");
  const shown = useMemo(() => indexProjects.filter((p) => group === "all" || p.group === group), [group]);

  return (
    <section id="all-projects" aria-labelledby="all-projects-title" className="relative border-t border-line bg-navy-900 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index="06"
          label="All Projects"
          id="all-projects-title"
          title="More projects, in detail"
          description="Further work from my CV. Each card shows the need it addresses, the general flow of the system and the skills it demonstrates."
        />

        <Reveal>
          <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
            {projectGroups.map((g) => (
              <button
                key={g.id}
                type="button"
                aria-pressed={group === g.id}
                onClick={() => setGroup(g.id)}
                className={cn(
                  "min-h-[44px] rounded-sm border px-4 font-mono text-[11px] uppercase tracking-label transition-colors",
                  group === g.id ? "border-signal bg-signal/10 text-signal" : "border-line text-slate-400 hover:border-slate-500 hover:text-white",
                )}
              >
                {g.label}
              </button>
            ))}
          </div>
        </Reveal>

        <ol className="grid gap-6 lg:grid-cols-2" aria-live="polite">
          {shown.map((p, i) => (
            <li key={p.slug} className="min-w-0">
              <Tilt max={4} glare className="h-full">
                <article className="card-surface flex h-full flex-col p-6 sm:p-8" aria-labelledby={`ap-${p.slug}`}>
                  <header className="flex items-start justify-between gap-4">
                    <p className="font-mono text-[11px] uppercase tracking-label text-signal">{p.category}</p>
                    <span className="font-mono text-xs text-slate-600">{pad(i + 1)}</span>
                  </header>

                  <h3 id={`ap-${p.slug}`} className="mt-4 text-xl font-semibold leading-snug text-white [transform:translateZ(24px)]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{p.summary}</p>

                  {p.details && (
                    <>
                      <div className="mt-6">
                        <p className="font-mono text-[11px] uppercase tracking-label text-slate-500">Why it matters</p>
                        <p className="mt-2 text-sm leading-relaxed text-slate-300">{p.details.problem}</p>
                      </div>

                      <div className="mt-6">
                        <p className="font-mono text-[11px] uppercase tracking-label text-slate-500">General flow</p>
                        <ol className="mt-3 flex flex-wrap items-center gap-y-2 text-xs">
                          {p.details.pipeline.map((step, si) => (
                            <li key={step} className="flex items-center">
                              <span className="rounded-sm border border-signal/30 bg-signal/5 px-2.5 py-1.5 text-slate-200">
                                <span className="mr-1.5 font-mono text-[10px] text-signal">{si + 1}</span>
                                {step}
                              </span>
                              {si < p.details!.pipeline.length - 1 && (
                                <span aria-hidden="true" className="mx-1.5 h-px w-4 bg-signal/50" />
                              )}
                            </li>
                          ))}
                        </ol>
                      </div>

                      <div className="mt-6">
                        <p className="font-mono text-[11px] uppercase tracking-label text-slate-500">What it demonstrates</p>
                        <ul className="mt-3 space-y-2 text-sm text-slate-300">
                          {p.details.demonstrates.map((d) => (
                            <li key={d} className="flex gap-3">
                              <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-signal" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}

                  <div className="mt-auto pt-6">
                    <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
                      {p.technologies.map((t) => (
                        <li key={t}>
                          <Tag>{t}</Tag>
                        </li>
                      ))}
                    </ul>
                    {(p.liveUrl || p.repoUrl) && (
                      <div className="mt-4 flex gap-4 text-sm">
                        {p.liveUrl && (
                          <ExternalLink href={p.liveUrl} className="text-signal hover:text-white">
                            Live
                          </ExternalLink>
                        )}
                        {p.repoUrl && (
                          <ExternalLink href={p.repoUrl} className="text-signal hover:text-white">
                            Source
                          </ExternalLink>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              </Tilt>
            </li>
          ))}
        </ol>

        <p className="mt-10 max-w-2xl border-l border-signal/50 pl-4 text-sm leading-relaxed text-slate-500">
          Descriptions are generalised from my CV. They show the type of problem and a general system flow, and do not claim specific models,
          datasets or results.
        </p>
      </div>
    </section>
  );
}
