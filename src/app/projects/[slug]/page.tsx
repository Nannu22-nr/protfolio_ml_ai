import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Tag } from "@/components/ui/Tag";
import { ProjectVisual } from "@/components/visuals/ProjectVisual";
import { featuredProjects, getProject } from "@/data/projects";
import { pad } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return featuredProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Case study`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || !project.caseStudy) notFound();

  return (
    <article className="container-x pb-24 pt-28 sm:pt-32">
      <Link href="/#projects" className="inline-flex min-h-[44px] items-center gap-2 text-sm text-slate-400 hover:text-signal">
        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        All projects
      </Link>

      <header className="mt-6 max-w-3xl">
        <p className="label">{project.category}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-6xl">{project.title}</h1>
        {project.subtitle && <p className="mt-2 font-serif text-2xl italic text-slate-400">{project.subtitle}</p>}
        <p className="mt-6 text-lg leading-relaxed text-slate-300">{project.summary}</p>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
          {project.technologies.map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.liveUrl && (
            <ExternalLink href={project.liveUrl} className="btn-primary">
              {project.liveLabel ?? "Live Demo"}
            </ExternalLink>
          )}
          {project.repoUrl && (
            <ExternalLink href={project.repoUrl} className="btn-ghost">
              Source code
            </ExternalLink>
          )}
        </div>
      </header>

      <div className="mt-14 max-w-4xl">
        <ProjectVisual project={project} />
      </div>

      <p className="mt-10 max-w-3xl border-l border-signal/50 pl-4 text-sm leading-relaxed text-slate-400">
        <span className="font-medium text-slate-300">About this write-up. </span>
        {project.provenance}
      </p>

      <div className="mt-16 max-w-3xl border-t border-line">
        {project.caseStudy.map((section, i) => (
          <section key={section.id} aria-labelledby={`cs-${section.id}`} className="grid gap-4 border-b border-line py-10 md:grid-cols-[8rem_1fr]">
            <p className="font-mono text-xs text-slate-600">{pad(i + 1)}</p>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 id={`cs-${section.id}`} className="text-2xl font-semibold text-white">
                  {section.title}
                </h2>
                <span
                  className={
                    section.status === "verified"
                      ? "border border-signal/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-label text-signal"
                      : "border border-dashed border-slate-600 px-2 py-0.5 font-mono text-[10px] uppercase tracking-label text-slate-500"
                  }
                >
                  {section.status === "verified" ? "Verified" : "Not yet documented"}
                </span>
              </div>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-300">
                {section.body.map((p) => (
                  <p key={p} className={section.status === "pending" ? "text-slate-500" : undefined}>
                    {p}
                  </p>
                ))}
              </div>
              {section.source && <p className="mt-4 font-mono text-[11px] text-slate-500">Source: {section.source}</p>}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
