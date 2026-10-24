import { Download, Mail, MapPin } from "lucide-react";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { links, siteConfig } from "@/config/site";

const rowClass =
  "group flex min-h-[64px] items-center justify-between gap-4 border-b border-line py-4 text-white transition-colors hover:text-signal";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line bg-navy-900 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index="07"
          label="Contact"
          id="contact-title"
          title="Let's talk"
          description="I am looking for AI/ML or Data Analytics roles and research collaborations. Email is the quickest way to reach me."
        />

        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <ul className="border-t border-line">
              {links.email && (
                <li>
                  <a href={`mailto:${links.email}`} className={rowClass}>
                    <span className="flex items-center gap-4">
                      <Mail aria-hidden="true" className="h-5 w-5 text-signal" />
                      <span>
                        <span className="block font-mono text-[11px] uppercase tracking-label text-slate-500">Email</span>
                        <span className="break-all text-lg">{links.email}</span>
                      </span>
                    </span>
                  </a>
                </li>
              )}
              {links.github && (
                <li>
                  <ExternalLink href={links.github} className={`${rowClass} w-full`}>
                    <span className="flex items-center gap-4">
                      <GithubIcon className="h-5 w-5 text-signal" />
                      <span>
                        <span className="block font-mono text-[11px] uppercase tracking-label text-slate-500">GitHub</span>
                        <span className="break-all text-lg">{links.github.replace("https://", "")}</span>
                      </span>
                    </span>
                  </ExternalLink>
                </li>
              )}
              {links.linkedin && (
                <li>
                  <ExternalLink href={links.linkedin} className={`${rowClass} w-full`}>
                    <span className="flex items-center gap-4">
                      <LinkedinIcon className="h-5 w-5 text-signal" />
                      <span>
                        <span className="block font-mono text-[11px] uppercase tracking-label text-slate-500">LinkedIn</span>
                        <span className="text-lg">Ohidul Alam</span>
                      </span>
                    </span>
                  </ExternalLink>
                </li>
              )}
              {links.resume && (
                <li>
                  <a href={links.resume} download className={rowClass}>
                    <span className="flex items-center gap-4">
                      <Download aria-hidden="true" className="h-5 w-5 text-signal" />
                      <span>
                        <span className="block font-mono text-[11px] uppercase tracking-label text-slate-500">Resume</span>
                        <span className="text-lg">Download CV (PDF)</span>
                      </span>
                    </span>
                  </a>
                </li>
              )}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="border border-line p-6">
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-label text-signal">
                <MapPin aria-hidden="true" className="h-4 w-4" />
                Based in
              </p>
              <p className="mt-3 text-lg text-white">{siteConfig.location}</p>
              <p className="mt-6 text-sm leading-relaxed text-slate-400">
                This site has no contact form or backend, so there is nothing to submit and no data is collected. Use the links to reach me directly.
              </p>
              {links.email && (
                <a href={`mailto:${links.email}?subject=Hello%20Ohidul`} className="btn-primary mt-6">
                  <Mail aria-hidden="true" className="h-4 w-4" />
                  Send an email
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
