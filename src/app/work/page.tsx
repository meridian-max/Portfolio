import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WorkFilter } from "@/components/work/work-filter";
import { caseStudies } from "@/data/case-studies";
import { earlierWorkItems } from "@/data/earlier-work";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Portfolio work from Meridian Works — websites, SaaS, AI systems, automation, and deployment platforms.",
};

export default function WorkPage() {
  return (
    <div>
      <section className="studio-section section-wash section-wash-violet">
        <div className="container relative py-16 text-center">
          <div aria-hidden="true" className="dot-matrix animate-drift absolute left-4 top-12 h-24 w-24 opacity-50" />
          <p className="section-kicker">Selected work</p>
          <h1 className="outline-heading mx-auto mt-5 max-w-5xl text-6xl font-black uppercase leading-none sm:text-7xl">
            Portfolio
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">
            Live products, public proof, and open-source systems from a small product engineering studio.
            Filter by capability, then open any project for problem, solution, role, stack, and source links.
          </p>
          <p className="marginalia mt-4">↳ public, inspectable, in production</p>
        </div>
      </section>

      <section className="studio-section">
        <div className="container py-16">
          <WorkFilter studies={caseStudies} />
        </div>
      </section>

      <section className="studio-section">
        <div className="container py-16">
          <div className="max-w-3xl">
            <p className="section-kicker">Proof in the open</p>
            <h2 className="mt-4 text-4xl font-black uppercase leading-none sm:text-5xl">
              Open-source builds we ship between client work.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Cloud platforms, voice agents, and multi-agent systems that show the architecture underneath the claims.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {earlierWorkItems.map((item) => (
              <Card key={item.title} className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <Badge variant="outline">{item.eyebrow}</Badge>
                    <span className="text-xs font-bold text-muted-foreground">{item.contributor}</span>
                  </div>
                  <CardTitle className="text-2xl">{item.title}</CardTitle>
                  <CardDescription>{item.summary}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-5">
                  <p className="text-sm leading-6 text-muted-foreground">{item.evidenceNote}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.techStack.slice(0, 6).map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {item.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.04em] underline underline-offset-4"
                      >
                        {link.label}
                        <ExternalLink className="size-3" aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="studio-section">
        <div className="container py-16">
          <div className="rounded-[2rem] border-2 border-border bg-secondary p-8 shadow-[8px_8px_0_hsl(var(--foreground)/0.18)] md:flex md:items-center md:justify-between md:gap-8">
            <div className="max-w-2xl">
              <p className="section-kicker">Have a project in mind?</p>
              <h2 className="mt-3 text-4xl font-black uppercase leading-none">
                Bring the outcome. We will keep the path clear.
              </h2>
            </div>
            <Button asChild className="mt-6 md:mt-0">
              <Link href={siteConfig.contactHref}>
                Contact Meridian Works
                <ExternalLink data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
