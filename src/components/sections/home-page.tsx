"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Code2,
  ExternalLink,
  Layers3,
  Mail,
  Rocket,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { featuredCaseStudies } from "@/data/case-studies";
import { earlierWorkItems } from "@/data/earlier-work";

const services = [
  {
    title: "Premium websites",
    description:
      "Conversion-minded sites with fast pages, sharp content structure, and a component system that can keep growing.",
    icon: Sparkles,
  },
  {
    title: "ML systems",
    description:
      "Practical AI features, internal copilots, classification workflows, and model-backed product experiences.",
    icon: BrainCircuit,
  },
  {
    title: "Web apps and software",
    description:
      "Dashboards, portals, workflow tools, API integrations, and the glue software teams need to operate cleanly.",
    icon: Layers3,
  },
  {
    title: "Automation and deployment",
    description:
      "Release paths, QA checks, background jobs, alerts, and production handoffs that make launches less fragile.",
    icon: Workflow,
  },
];

const process = [
  "Start from the public product goal, the user flow, and the technical constraints.",
  "Prototype the riskiest surface first, whether that is AI behavior, booking logic, or account flow.",
  "Build the production path with auth, data, QA, and deployment in view.",
  "Ship the smallest useful version, document the proof, and make the next iteration obvious.",
];

const proofItems = [
  {
    title: "5 public products",
    detail: "BookFlow, MeetFuture, Meeting Assistant, Goal Tracker, and GhostCollab.",
  },
  {
    title: "40 public repos",
    detail: "Across the public GitHub profiles of Divyansh Gupta and Jigyasu Patel.",
  },
  {
    title: "RGIPT footprint",
    detail: "All three team profiles tie back to RGIPT-based public sources.",
  },
  {
    title: "Public hackathon proof",
    detail: "Jigyasu's public CV cites an IIT Mandi win and IIT Bombay HERE finalist finish.",
  },
];

const highlightedEarlierWork = [
  earlierWorkItems[0],
  earlierWorkItems[4],
  earlierWorkItems[2],
  earlierWorkItems[5],
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export function HomePage() {
  return (
    <div className="overflow-hidden">
      <section className="relative isolate min-h-[86svh] border-b border-border">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/50 via-background/75 to-background" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 opacity-20 dark:opacity-25">
          <Image
            src="/work/bookflow.png"
            alt="Public product visual from the BookFlow booking SaaS site"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top grayscale"
          />
          <div className="absolute inset-0 bg-background/70" />
        </div>

        <div className="container flex min-h-[86svh] flex-col justify-center py-24">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-5xl"
          >
            <motion.div variants={item}>
              <Badge variant="outline" className="mb-8 rounded-md border-luxury/30 text-luxury">
                Source-backed studio portfolio
              </Badge>
            </motion.div>
            <motion.h1
              variants={item}
              className="font-serif text-6xl font-semibold leading-[0.9] tracking-normal sm:text-7xl lg:text-8xl"
            >
              {siteConfig.name}
            </motion.h1>
            <motion.p
              variants={item}
              className="mt-8 max-w-3xl text-xl leading-8 text-muted-foreground sm:text-2xl sm:leading-9"
            >
              {siteConfig.description}
            </motion.p>
            <motion.p variants={item} className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
              Public work by Divyansh Gupta, Jigyasu Patel, and Nishant Nischal, presented
              without invented client names, fabricated metrics, or borrowed testimonials.
            </motion.p>
            <motion.div variants={item} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href={siteConfig.contactHref}>
                  <Mail data-icon="inline-start" />
                  Start a project note
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/work">
                  View selected work
                  <ExternalLink data-icon="inline-end" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section aria-label="Proof bar" className="border-b border-border bg-muted/30">
        <div className="container grid gap-px py-px sm:grid-cols-2 lg:grid-cols-4">
          {proofItems.map((proof) => (
            <div key={proof.title} className="bg-background px-5 py-5">
              <CheckCircle2 className="mb-3 size-5 text-luxury" aria-hidden="true" />
              <p className="text-sm font-medium text-foreground">{proof.title}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{proof.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="container py-24">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="flex flex-col gap-4">
            <Badge variant="secondary" className="w-fit rounded-md">
              Services
            </Badge>
            <h2 className="font-serif text-4xl font-semibold tracking-normal sm:text-5xl">
              One team for the surface, the system, and the ship date.
            </h2>
            <p className="text-lg leading-8 text-muted-foreground">
              The portfolio is intentionally narrow and public. We only present work that can
              be traced to shipped sites, repos, READMEs, CVs, or profile sources.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.title} className="shadow-none">
                  <CardHeader className="gap-4">
                    <div className="flex size-11 items-center justify-center rounded-md border border-border bg-muted">
                      <Icon className="size-5 text-luxury" aria-hidden="true" />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/25 py-24">
        <div className="container">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <Badge variant="secondary" className="mb-4 rounded-md">
                Featured work
              </Badge>
              <h2 className="font-serif text-4xl font-semibold tracking-normal sm:text-5xl">
                Public products with enough source material to stand up as case studies.
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link href="/work">
                See all work
                <ExternalLink data-icon="inline-end" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {featuredCaseStudies.map((study) => (
              <Link key={study.slug} href={`/work/${study.slug}`} className="group">
                <Card className="h-full overflow-hidden shadow-none transition-colors hover:bg-accent/50">
                  <div className="relative aspect-[16/10] border-b border-border bg-muted">
                    <Image
                      src={study.visual.src}
                      alt={study.visual.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover grayscale transition duration-500 group-hover:scale-[1.02] group-hover:grayscale-0"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between gap-3">
                      <Badge variant="outline" className="rounded-md">
                        {study.eyebrow}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {study.proofLevel === "public-repo" ? "Live + repo proof" : "Public site proof"}
                      </span>
                    </div>
                    <CardTitle className="text-2xl">{study.title}</CardTitle>
                    <CardDescription>{study.summary}</CardDescription>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {study.contributors.map((contributor) => (
                        <Badge key={contributor} variant="secondary" className="rounded-md">
                          {contributor}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container grid gap-16 py-24 lg:grid-cols-2">
        <CapabilityBlock
          eyebrow="AI and ML"
          title="AI work that already exists in public, not just in a deck."
          icon={BrainCircuit}
          points={[
            "LLM-backed chat flows in BookFlow and MeetFuture.",
            "Voice and transcription tooling in Meeting Assistant and AuraSpeak.",
            "Multi-agent reasoning and evaluation patterns in LLM Council.",
          ]}
        />
        <CapabilityBlock
          eyebrow="Web and software"
          title="Web apps, SaaS products, and infrastructure with visible implementation proof."
          icon={Code2}
          points={[
            "Booking SaaS, dashboards, auth, and Prisma-backed product flows.",
            "Goal planning, school-site work, and smaller MERN builds from earlier public sources.",
            "Hosting and deployment system work such as Hostly's builder and routing stack.",
          ]}
        />
      </section>

      <section id="process" className="border-y border-border bg-foreground text-background">
        <div className="container py-24">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="flex flex-col gap-5">
              <Badge variant="secondary" className="w-fit rounded-md bg-background text-foreground">
                Process
              </Badge>
              <h2 className="font-serif text-4xl font-semibold tracking-normal sm:text-5xl">
                Small team, visible sources, and a bias toward shipped product surfaces.
              </h2>
              <p className="text-lg leading-8 text-background/70">
                The shape of the work comes from what can be shown publicly: product flows,
                live links, repos, READMEs, and CV-backed earlier projects.
              </p>
            </div>
            <ol className="grid gap-px overflow-hidden rounded-lg border border-background/15 bg-background/15">
              {process.map((step, index) => (
                <li key={step} className="grid gap-4 bg-foreground p-6 sm:grid-cols-[4rem_1fr]">
                  <span className="font-serif text-4xl text-luxury">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-lg leading-8 text-background/80">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="container py-24">
        <div className="mb-12 max-w-3xl">
          <Badge variant="secondary" className="mb-4 rounded-md">
            Team
          </Badge>
          <h2 className="font-serif text-4xl font-semibold tracking-normal sm:text-5xl">
            Three specialists, one delivery rhythm.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {siteConfig.team.map((member) => (
            <Card key={member.name} className="shadow-none">
              <CardHeader className="gap-5">
                <div className="flex size-14 items-center justify-center rounded-md border border-border bg-muted font-serif text-xl">
                  {member.initials}
                </div>
                <div className="flex flex-col gap-2">
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <p className="text-sm leading-6 text-muted-foreground">{member.bio}</p>
                <ul className="flex flex-col gap-2">
                  {member.proofBullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 flex-none text-luxury" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {member.links.map((link) => (
                    <Button key={link.href} asChild size="sm" variant="outline">
                      <Link href={link.href} target="_blank" rel="noreferrer">
                        {link.label}
                      </Link>
                    </Button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {member.sourceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-muted-foreground underline underline-offset-4"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-muted/25 py-24">
        <div className="container grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <Badge variant="secondary" className="mb-4 rounded-md">
              Proof
            </Badge>
            <h2 className="font-serif text-4xl font-semibold tracking-normal">
              Earlier work and smaller public builds, kept separate from the main case studies.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              No client logos are shown here unless they are publicly verifiable. These cards stay
              grounded in CVs, READMEs, repos, and live links.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {highlightedEarlierWork.map((item) => (
              <Card key={item.title} className="shadow-none">
                <CardHeader className="gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <Badge variant="outline" className="rounded-md">
                      {item.eyebrow}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{item.contributor}</span>
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription>{item.summary}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <p className="text-sm leading-6 text-muted-foreground">{item.evidenceNote}</p>
                  <div className="flex flex-wrap gap-2">
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
        </div>
      </section>

      <section className="container py-24">
        <div className="flex flex-col items-start gap-8 border-y border-border py-16 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl font-semibold tracking-normal sm:text-5xl">
              Bring the outcome. We will keep the path clear.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Start with an email note. If there is a fit, the next step is a sharper
              scope conversation around risks, proof, and the smallest useful launch plan.
            </p>
          </div>
          <Button asChild size="lg">
            <Link href={siteConfig.contactHref}>
              <Rocket data-icon="inline-start" />
              Email the team
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function CapabilityBlock({
  eyebrow,
  title,
  icon: Icon,
  points,
}: {
  eyebrow: string;
  title: string;
  icon: LucideIcon;
  points: string[];
}) {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-md border border-border bg-muted">
          <Icon className="size-5 text-luxury" aria-hidden="true" />
        </div>
        <Badge variant="outline" className="rounded-md">
          {eyebrow}
        </Badge>
      </div>
      <h2 className="font-serif text-4xl font-semibold tracking-normal sm:text-5xl">
        {title}
      </h2>
      <ul className="flex flex-col gap-4">
        {points.map((point) => (
          <li key={point} className="flex gap-3 text-muted-foreground">
            <CheckCircle2 className="mt-1 size-5 flex-none text-luxury" aria-hidden="true" />
            <span className="leading-7">{point}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/work"
        className="inline-flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4"
      >
        See the source-backed work list
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
