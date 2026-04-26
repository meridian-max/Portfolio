import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import { ArrowLeft, ExternalLink, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { caseStudies, getCaseStudy } from "@/data/case-studies";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";
export const dynamicParams = false;

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) return {};

  return {
    title: study.title,
    description: study.summary,
    openGraph: {
      title: `${study.title} | ${siteConfig.name}`,
      description: study.summary,
      type: "article",
      images: [
        {
          url: study.visual.src,
          width: 1200,
          height: 630,
          alt: study.visual.alt,
        },
      ],
    },
  };
}

export default async function WorkDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) return notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: study.title,
    description: study.summary,
    url: study.links.live?.href ?? `${siteConfig.url}/work/${study.slug}`,
    image: `${siteConfig.url}${study.visual.src}`,
    creator: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    citation: study.links.source.map((link) => link.href),
    about: study.services,
  };

  return (
    <>
      <Script id={`case-study-${study.slug}`} type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
      <article className="container py-16">
        <Button asChild variant="ghost" className="mb-10 px-0">
          <Link href="/work">
            <ArrowLeft data-icon="inline-start" />
            Back to work
          </Link>
        </Button>

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="flex flex-col gap-8">
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="rounded-md">
                  {study.eyebrow}
                </Badge>
                <Badge variant="secondary" className="rounded-md">
                  {study.proofLevel === "public-repo" ? "Live + repo proof" : "Public site proof"}
                </Badge>
              </div>
              <h1 className="font-serif text-5xl font-semibold tracking-normal sm:text-6xl">
                {study.title}
              </h1>
              <p className="mt-6 text-xl leading-9 text-muted-foreground">
                {study.summary}
              </p>
              {study.contributors.length > 0 ? (
                <div className="mt-6 flex flex-wrap gap-2">
                  {study.contributors.map((contributor) => (
                    <Badge key={contributor} variant="outline" className="rounded-md">
                      {contributor}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <InfoCard title="Problem" text={study.problem} />
              <InfoCard title="Solution" text={study.solution} />
              <InfoCard title="Our role" text={study.role} />
              <InfoCard title="Evidence note" text={study.evidenceNote} />
              {study.result ? <InfoCard title="Result" text={study.result} /> : null}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="relative aspect-[16/11] overflow-hidden rounded-lg border border-border bg-muted">
              <Image
                src={study.visual.src}
                alt={study.visual.alt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <Card className="shadow-none">
              <CardHeader>
                <CardTitle>Links and sources</CardTitle>
                <CardDescription>
                  Every button below points to a public source used in the writeup.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-3">
                  {study.links.live ? (
                    <Button asChild size="sm">
                      <Link href={study.links.live.href} target="_blank" rel="noreferrer">
                        {study.links.live.label}
                        <ExternalLink data-icon="inline-end" />
                      </Link>
                    </Button>
                  ) : null}
                  {study.links.repo ? (
                    <Button asChild size="sm" variant="outline">
                      <Link href={study.links.repo.href} target="_blank" rel="noreferrer">
                        {study.links.repo.label}
                        <ExternalLink data-icon="inline-end" />
                      </Link>
                    </Button>
                  ) : null}
                </div>
                <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                  {study.links.source.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 underline underline-offset-4"
                    >
                      {link.label}
                      <ExternalLink className="size-3" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-none">
              <CardHeader>
                <CardTitle>Stack and services</CardTitle>
                <CardDescription>
                  Only publicly documented technologies are listed.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                {study.techStack.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {study.techStack.map((tech) => (
                      <Badge key={tech} variant="outline" className="rounded-md">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm leading-6 text-muted-foreground">
                    Public stack details have not been published for this product.
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {study.services.map((service) => (
                    <Badge key={service} variant="secondary" className="rounded-md">
                      {service}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {study.quote ? (
              <Card className="shadow-none">
                <CardContent className="p-6">
                  <blockquote className="flex flex-col gap-4">
                    <p className="font-serif text-2xl leading-9">
                      &ldquo;{study.quote.text}&rdquo;
                    </p>
                    <footer className="text-sm text-muted-foreground">
                      {study.quote.attribution}
                    </footer>
                  </blockquote>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start gap-6 border-t border-border pt-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-serif text-3xl font-semibold tracking-normal">
              Want this shape of project?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Bring the outcome, constraints, and the public proof you already have.
            </p>
          </div>
          <Button asChild>
            <Link href={siteConfig.contactHref}>
              <Mail data-icon="inline-start" />
              Start the contact note
            </Link>
          </Button>
        </div>
      </article>
    </>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-muted-foreground">{text}</p>
      </CardContent>
    </Card>
  );
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}
