import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { ResearchFigure } from "@/components/visuals/ResearchFigure";
import { research, researchStatusLabels } from "@/data/research";
import { pad } from "@/lib/utils";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="font-mono text-[11px] uppercase tracking-label text-slate-500">{label}</dt>
      <dd className="mt-1.5 text-sm leading-relaxed text-slate-300">{children}</dd>
    </div>
  );
}

export function Research() {
  return (
    <section id="research" aria-labelledby="research-title" className="border-t border-line py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index="03"
          label="Research"
          id="research-title"
          title="Research directions"
          description="Areas I have applied deep learning to, as described in my CV. Entries are labeled by status. No publications, results or citations are claimed."
        />

        <Reveal>
          <ul className="mb-12 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-label text-slate-500" aria-label="Status legend">
            {Object.values(researchStatusLabels).map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </Reveal>

        <div className="border-t border-line">
          {research.map((entry, i) => (
            <Reveal key={entry.id}>
              <article aria-labelledby={`${entry.id}-title`} className="grid gap-8 border-b border-line py-12 lg:grid-cols-12 lg:gap-12">
                <header className="lg:col-span-4">
                  <p className="font-mono text-xs text-slate-600">R–{pad(i + 1)}</p>
                  <h3 id={`${entry.id}-title`} className="mt-3 text-xl font-semibold leading-snug text-white">
                    {entry.title}
                  </h3>
                  <p className="mt-4 inline-block border border-signal/40 px-2 py-1 font-mono text-[11px] uppercase tracking-label text-signal">
                    {researchStatusLabels[entry.status]}
                  </p>
                  <p className="mt-3 text-sm text-slate-500">{entry.statusNote}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Topics">
                    {entry.tags.map((t) => (
                      <li key={t}>
                        <Tag>{t}</Tag>
                      </li>
                    ))}
                  </ul>
                </header>

                <div className="lg:col-span-4">
                  <ResearchFigure kind={entry.figure} />
                </div>

                <dl className="space-y-5 lg:col-span-4">
                  <Field label="Research question">{entry.question}</Field>
                  <Field label="Methodology">{entry.methodology}</Field>
                  <Field label="Results">
                    {entry.results.length > 0 ? (
                      <ul className="list-disc space-y-1 pl-4">
                        {entry.results.map((r) => (
                          <li key={r}>{r}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-slate-500">No verified results reported.</span>
                    )}
                  </Field>
                  <Field label="Limitations">{entry.limitations}</Field>
                  <Field label="Future directions">{entry.futureDirections}</Field>
                  {(entry.paperUrl || entry.repoUrl) && (
                    <div className="flex gap-4 text-sm">
                      {entry.paperUrl && (
                        <ExternalLink href={entry.paperUrl} className="text-signal hover:text-white">
                          Paper
                        </ExternalLink>
                      )}
                      {entry.repoUrl && (
                        <ExternalLink href={entry.repoUrl} className="text-signal hover:text-white">
                          Repository
                        </ExternalLink>
                      )}
                    </div>
                  )}
                </dl>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
