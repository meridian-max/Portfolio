import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { additionalCaseStudies, caseStudies, type CaseStudy } from "@/data/case-studies";
import { earlierWorkItems } from "@/data/earlier-work";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Source-backed product work from Meridian Works, including public case studies, additional products, and earlier proof.",
};

const featuredCaseStudies = caseStudies.filter((study) => study.featured);

export default function WorkPage() {
  return (
    <div className="container py-20">
      <div className="mb-14 max-w-3xl">
        <Badge variant="secondary" className="mb-4 rounded-md">
          Selected work
        </Badge>
        <h1 className="font-serif text-5xl font-semibold tracking-normal sm:text-6xl">
          Public product work across booking, AI, desktop tooling, software, and deployment.
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          The first section is reserved for public products with enough live and repo material to
          support a full case-study layout. Named client proof stays off the page unless it can be
          verified publicly.
        </p>
      </div>

      <section className="space-y-6">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl font-semibold tracking-normal sm:text-4xl">
            Featured case studies
          </h2>
          <p className="mt-3 text-muted-foreground">
            These products have both a public surface and enough implementation detail to support
            problem, solution, role, stack, and evidence notes.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredCaseStudies.map((study) => (
            <ProductCard key={study.slug} study={study} />
          ))}
        </div>
      </section>

      <section className="mt-20 space-y-6">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl font-semibold tracking-normal sm:text-4xl">
            Additional products
          </h2>
          <p className="mt-3 text-muted-foreground">
            Still public, still real, just with lighter supporting material than the featured
            case-study set.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {additionalCaseStudies.map((study) => (
            <ProductCard key={study.slug} study={study} />
          ))}
        </div>
      </section>

      <section id="earlier-work" className="mt-20 space-y-6">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl font-semibold tracking-normal sm:text-4xl">
            Earlier work and smaller public proof
          </h2>
          <p className="mt-3 text-muted-foreground">
            These cards pull from public CV and README material. They stay lightweight on purpose
            rather than pretending to be fully documented client engagements.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {earlierWorkItems.map((item) => (
            <Card key={item.title} className="h-full shadow-none">
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <Badge variant="outline" className="rounded-md">
                    {item.eyebrow}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{item.contributor}</span>
                </div>
                <CardTitle className="text-2xl">{item.title}</CardTitle>
                <CardDescription>{item.summary}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-sm leading-6 text-muted-foreground">{item.evidenceNote}</p>
                <div className="flex flex-wrap gap-2">
                  {item.techStack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="rounded-md">
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
                      className="inline-flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4"
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
      </section>

      <div className="mt-16 flex flex-col items-start gap-6 border-t border-border pt-10 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl font-semibold tracking-normal">
            Need a tighter project brief?
          </h2>
          <p className="mt-3 text-muted-foreground">
            The contact flow is email-first for now, so the team can respond without pretending
            there is a shared booking link or backend intake system.
          </p>
        </div>
        <Button asChild>
          <Link href={siteConfig.contactHref}>
            Contact Meridian Works
            <ExternalLink data-icon="inline-end" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function ProductCard({ study }: { study: CaseStudy }) {
  return (
    <Link href={`/work/${study.slug}`} className="group">
      <Card className="h-full overflow-hidden shadow-none transition-colors hover:bg-accent/50">
        <div className="relative aspect-[16/10] border-b border-border bg-muted">
          <Image
            src={study.visual.src}
            alt={study.visual.alt}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover grayscale transition duration-500 group-hover:scale-[1.02] group-hover:grayscale-0"
          />
        </div>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="rounded-md">
              {study.eyebrow}
            </Badge>
            <Badge variant="secondary" className="rounded-md">
              {study.proofLevel === "public-repo" ? "Live + repo proof" : "Public site proof"}
            </Badge>
          </div>
          <CardTitle className="text-2xl">{study.title}</CardTitle>
          <CardDescription>{study.summary}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {study.contributors.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {study.contributors.map((contributor) => (
                <Badge key={contributor} variant="outline" className="rounded-md">
                  {contributor}
                </Badge>
              ))}
            </div>
          ) : null}
          <div className="flex flex-wrap gap-2">
            {study.services.map((service) => (
              <Badge key={service} variant="secondary" className="rounded-md">
                {service}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
