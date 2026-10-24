import { ArrowRight, ExternalLink as ExternalIcon } from "lucide-react";
import Link from "next/link";
import { ProjectVisual } from "@/components/visuals/ProjectVisual";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { featuredProjects } from "@/data/projects";
import { cn, pad } from "@/lib/utils";
import type { Project } from "@/types";

function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;
  return (
    <Reveal>
      <article
        aria-labelledby={`${project.slug}-title`}
        className="grid items-center gap-10 border-t border-line py-14 lg:grid-cols-12 lg:gap-14"
      >
        <div className={cn("lg:col-span-7", flip && "lg:order-2")}>
          <ProjectVisual project={project} />
        </div>

        <div className={cn("lg:col-span-5", flip && "lg:order-1")}>
          <p className="label flex flex-wrap items-center gap-x-3">
            <span className="text-slate-500">Project {pad(index + 1)}</span>
            <span aria-hidden="true">/</span>
            <span>{project.category}</span>
          </p>
          <h3 id={`${project.slug}-title`} className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {project.title}
          </h3>
          {project.subtitle && <p className="mt-1 font-serif text-xl italic text-slate-400">{project.subtitle}</p>}
          <p className="mt-5 text-base leading-relaxed text-slate-400">{project.summary}</p>

          {project.highlights && (
            <ul className="mt-6 space-y-2.5 text-sm text-slate-300">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-signal" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
            {project.technologies.map((t) => (
              <li key={t}>
                <Tag>{t}</Tag>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.liveUrl && (
              <ExternalLink href={project.liveUrl} className="btn-primary" hideIcon>
                {project.liveLabel ?? "Live Demo"}
                <ExternalIcon aria-hidden="true" className="h-4 w-4" />
              </ExternalLink>
            )}
            {project.repoUrl && (
              <ExternalLink href={project.repoUrl} className="btn-ghost">
                Source code
              </ExternalLink>
            )}
            {project.caseStudy && (
              <Link href={`/projects/${project.slug}`} className="btn-ghost">
                Case study
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="border-t border-line bg-navy-900 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index="02"
          label="Projects"
          id="projects-title"
          title="Selected works"
          description="Two deployed medical AI applications, shown as live 3D schematics. More projects from my CV are listed further down."
        />

        {featuredProjects.map((p, i) => (
          <FeaturedProject key={p.slug} project={p} index={i} />
        ))}

      </div>
    </section>
  );
}
