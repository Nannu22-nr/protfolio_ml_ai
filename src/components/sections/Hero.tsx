import { Download } from "lucide-react";
import { Brain3D } from "@/components/canvas/Brain3D";
import { ParticleField } from "@/components/canvas/ParticleField";
import { CountUp } from "@/components/ui/CountUp";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { InteractiveText } from "@/components/ui/InteractiveText";
import { Reveal } from "@/components/ui/Reveal";
import { HeroVisual } from "@/components/visuals/HeroVisual";
import { links, siteConfig } from "@/config/site";
import { profile, skillGroups } from "@/data/profile";
import { featuredProjects, visibleProjects } from "@/data/projects";
import { research } from "@/data/research";

const marqueeItems = skillGroups.flatMap((g) => g.items).slice(0, 26);

const stats = [
  { value: visibleProjects.length, label: "Projects" },
  { value: featuredProjects.length, label: "Live medical AI apps" },
  { value: research.length, label: "Research directions" },
  { value: 4, label: "Years at KUET" },
];

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="aurora absolute inset-0" aria-hidden="true" />
      <div className="grid-bg absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" aria-hidden="true" />
      <ParticleField className="absolute inset-0 h-full w-full opacity-70 [mask-image:linear-gradient(to_bottom,black_40%,transparent)]" />
      <Brain3D
        backdrop
        className="pointer-events-none absolute right-[6%] top-1/2 h-[min(900px,110%)] w-[min(900px,75vw)] -translate-y-1/2 opacity-30 sm:opacity-40"
      />

      <div className="container-x relative grid items-center gap-14 pb-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:pb-20">
        <div>
          <Reveal>
            <p className="label">{siteConfig.role}</p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 id="hero-title" className="mt-6">
              <InteractiveText
                as="span"
                text={siteConfig.name}
                radius={140}
                lift={10}
                grow={0.12}
                className="block text-[clamp(2.4rem,11vw,3rem)] font-semibold leading-[1] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[4.5rem]"
              />
            </h1>
            <p className="mt-5 text-2xl leading-tight text-slate-200 sm:text-3xl lg:text-4xl">
              <InteractiveText as="span" text={profile.headline.line1} radius={100} lift={6} className="block font-medium" />
              <InteractiveText
                as="span"
                text={profile.headline.line2}
                radius={100}
                lift={6}
                className="mt-1 block font-serif font-normal italic text-signal"
              />
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">{profile.intro}</p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#projects" className="btn-primary">
                Explore Projects
              </a>
              <a href="#research" className="btn-ghost">
                View Research
              </a>
              {links.resume && (
                <a href={links.resume} download className="btn-ghost">
                  <Download aria-hidden="true" className="h-4 w-4" />
                  Download Resume
                </a>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <ul className="mt-8 flex items-center gap-3">
              {links.github && (
                <li>
                  <ExternalLink
                    href={links.github}
                    hideIcon
                    aria-label="GitHub profile (opens in a new tab)"
                    className="grid h-11 w-11 place-items-center rounded-sm border border-line text-slate-300 transition-colors hover:border-signal hover:text-signal"
                  >
                    <GithubIcon className="h-5 w-5" />
                  </ExternalLink>
                </li>
              )}
              {links.linkedin && (
                <li>
                  <ExternalLink
                    href={links.linkedin}
                    hideIcon
                    aria-label="LinkedIn profile (opens in a new tab)"
                    className="grid h-11 w-11 place-items-center rounded-sm border border-line text-slate-300 transition-colors hover:border-signal hover:text-signal"
                  >
                    <LinkedinIcon className="h-5 w-5" />
                  </ExternalLink>
                </li>
              )}
              <li className="ml-2 font-mono text-[11px] uppercase tracking-label text-slate-500">{siteConfig.location}</li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <HeroVisual />
        </Reveal>
      </div>

      {/* facts strip */}
      <div className="relative border-y border-line bg-ink/60 backdrop-blur-sm">
        <dl className="container-x grid grid-cols-2 gap-y-6 py-8 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col sm:border-l sm:border-line sm:pl-6 first:sm:border-l-0 first:sm:pl-0">
              <dt className="order-2 mt-1 font-mono text-[11px] uppercase tracking-label text-slate-500">{s.label}</dt>
              <dd className="order-1 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                <CountUp value={s.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* skills marquee */}
      <div className="marquee-wrap relative overflow-hidden border-b border-line py-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]" aria-hidden="true">
        <div className="anim-marquee flex w-max gap-10 font-mono text-xs uppercase tracking-label text-slate-500">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center gap-10">
              {item}
              <span className="h-1 w-1 rounded-full bg-signal/60" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}