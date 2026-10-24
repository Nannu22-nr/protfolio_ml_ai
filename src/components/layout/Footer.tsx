import { navItems } from "@/config/navigation";
import { links, siteConfig } from "@/config/site";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-navy-900">
      <div className="container-x grid gap-10 py-12 md:grid-cols-[1.2fr_2fr_1fr]">
        <div>
          <p className="text-sm font-medium text-white">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-slate-500">{siteConfig.role}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`/#${item.id}`} className="inline-flex min-h-[44px] items-center text-sm text-slate-400 hover:text-signal">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex gap-3 md:justify-end">
          {links.github && (
            <li>
              <ExternalLink
                href={links.github}
                hideIcon
                aria-label="GitHub (opens in a new tab)"
                className="grid h-11 w-11 place-items-center rounded-sm border border-line text-slate-300 hover:border-signal hover:text-signal"
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
                aria-label="LinkedIn (opens in a new tab)"
                className="grid h-11 w-11 place-items-center rounded-sm border border-line text-slate-300 hover:border-signal hover:text-signal"
              >
                <LinkedinIcon className="h-5 w-5" />
              </ExternalLink>
            </li>
          )}
        </ul>
      </div>
      <div className="border-t border-line">
        <p className="container-x py-5 font-mono text-[11px] text-slate-500">
          © {year} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
