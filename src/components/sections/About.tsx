import { Award } from "lucide-react";
import { InteractiveText } from "@/components/ui/InteractiveText";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile, skillGroups } from "@/data/profile";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading index="01" label="About" id="about-title" title="Where biology meets machine learning" />

        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <InteractiveText
              as="p"
              text={profile.objective}
              radius={80}
              lift={3}
              grow={0.08}
              className="border-l-2 border-signal/50 pl-5 font-serif text-base leading-relaxed text-slate-100 sm:text-lg"
            />
            <div className="mt-8 space-y-5 text-base leading-relaxed text-slate-400">
              {profile.aboutParagraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6">
            <h3 className="label mb-4">Focus areas</h3>
            <dl className="divide-y divide-line border-y border-line">
              {profile.focusAreas.map((f, i) => (
                <div key={f.label} className="grid grid-cols-[2.5rem_1fr] gap-x-2 py-4 sm:grid-cols-[3rem_1fr_1.2fr]">
                  <dt className="font-mono text-xs text-slate-600 sm:pt-0.5">{String(i + 1).padStart(2, "0")}</dt>
                  <dd className="font-medium text-white">{f.label}</dd>
                  <dd className="col-start-2 mt-1 text-sm text-slate-400 sm:col-start-3 sm:mt-0">{f.detail}</dd>
                </div>
              ))}
            </dl>

            <h3 className="label mb-4 mt-10">Certifications</h3>
            <ul className="space-y-3">
              {profile.certifications.map((c) => (
                <li key={c.title} className="flex gap-3 text-sm">
                  <Award aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                  <span>
                    <span className="text-white">{c.title}</span>
                    <span className="text-slate-500"> — {c.issuer}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="mt-20">
          <h3 className="label mb-6">Skills &amp; abilities</h3>
          <dl className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((g) => (
              <div key={g.label} className="bg-ink p-5 transition-colors duration-300 hover:bg-navy-800">
                <dt className="text-sm font-medium text-white">{g.label}</dt>
                <dd className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-xs text-slate-400">
                  {g.items.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
