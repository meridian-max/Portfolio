import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { LogoMark } from "@/components/ui/logo-mark";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t-2 border-border bg-background">
      {/* Endplate atmosphere — large faded brand mark anchored bottom-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -right-10 opacity-[0.06] sm:-right-4"
      >
        <LogoMark className="size-[28rem]" />
      </div>
      <div
        aria-hidden="true"
        className="dot-matrix animate-drift pointer-events-none absolute left-12 top-12 h-32 w-32 opacity-40"
      />

      <div className="container relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div data-animate="section" className="max-w-2xl">
            <p className="section-kicker text-[hsl(var(--luxury))]">The endplate</p>
            <h2 className="endplate-heading mt-5 text-6xl font-black uppercase leading-[0.9] sm:text-7xl lg:text-[6rem]">
              {siteConfig.name}
            </h2>
            <p className="font-accent mt-5 text-3xl font-bold leading-none text-foreground sm:text-4xl">
              Built deliberately.
              <span className="ml-2 text-[hsl(var(--luxury))]">Shipped on purpose.</span>
            </p>
            <p className="mt-6 max-w-lg text-sm leading-7 text-muted-foreground">
              {siteConfig.tagline}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={siteConfig.contactHref}
                className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-foreground px-5 py-2 text-sm font-black uppercase tracking-[0.06em] text-background shadow-[5px_5px_0_hsl(var(--luxury))] transition hover:-translate-y-0.5"
              >
                Start a project
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
              <span className="font-accent text-2xl font-bold text-foreground/70">
                ↳ replies within one business day
              </span>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              {siteConfig.socialLinks.map((link) => {
                const isMailto = link.href.startsWith("mailto:");
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target={isMailto ? undefined : "_blank"}
                    rel={isMailto ? undefined : "noreferrer"}
                    className="rounded-full border-2 border-border bg-card px-3 py-1 text-xs font-black uppercase tracking-[0.06em] shadow-[3px_3px_0_hsl(var(--foreground)/0.14)] transition hover:-translate-y-0.5 hover:bg-accent"
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>

          <div data-animate="panel" className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="section-kicker">Navigate</h3>
              <nav className="mt-5 flex flex-col gap-3 text-sm">
                {siteConfig.nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="link-slide w-fit font-bold text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h3 className="section-kicker">Team</h3>
              <div className="mt-5 grid gap-4">
                {siteConfig.team.map((member) => (
                  <div key={member.name}>
                    <p className="text-sm font-black text-foreground">{member.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{member.role}</p>
                    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      {member.links.map((link) => {
                        const isMailto = link.href.startsWith("mailto:");
                        return (
                          <a
                            key={link.href}
                            href={link.href}
                            target={isMailto ? undefined : "_blank"}
                            rel={isMailto ? undefined : "noreferrer"}
                            className="link-slide w-fit"
                          >
                            {link.label}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div data-animate="panel" className="mt-14 flex flex-col gap-3 border-t-2 border-border pt-6 text-xs font-bold uppercase tracking-[0.04em] text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <LogoMark className="size-7" />
            <p>
              Copyright {currentYear} {siteConfig.legalName}. All rights reserved.
            </p>
          </div>
          <p>{siteConfig.attribution}</p>
        </div>
      </div>
    </footer>
  );
}
