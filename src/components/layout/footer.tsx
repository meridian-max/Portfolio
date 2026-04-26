import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/25">
      <div className="container py-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.75fr_1.15fr]">
          <div className="max-w-md">
            <Link href="/" className="font-serif text-2xl font-semibold tracking-normal">
              {siteConfig.name}
            </Link>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {siteConfig.tagline}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold">Navigate</h2>
            <nav className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              {siteConfig.nav.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-foreground">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-semibold">Team Links</h2>
            <div className="mt-4 grid gap-4">
              {siteConfig.team.map((member) => (
                <div key={member.name}>
                  <p className="text-sm font-medium text-foreground">{member.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{member.role}</p>
                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    {member.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                        rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
                        className="underline underline-offset-4 hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            Copyright {currentYear} {siteConfig.legalName}. All rights reserved.
          </p>
          <p>{siteConfig.attribution}</p>
        </div>
      </div>
    </footer>
  );
}
