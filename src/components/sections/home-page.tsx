"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Mail,
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
    icon: "solar:magic-stick-3-bold-duotone",
  },
  {
    title: "AI & ML systems",
    description:
      "Practical AI features, internal copilots, classification workflows, and model-backed product experiences.",
    icon: "solar:cpu-bolt-bold-duotone",
  },
  {
    title: "Web apps & software",
    description:
      "Dashboards, portals, workflow tools, API integrations, and the glue software teams need to operate cleanly.",
    icon: "solar:widget-2-bold-duotone",
  },
  {
    title: "Automation & deployment",
    description:
      "Release paths, QA checks, background jobs, alerts, and production handoffs that make launches less fragile.",
    icon: "solar:rocket-2-bold-duotone",
  },
];

const stackLogos = [
  { name: "Next.js", icon: "simple-icons:nextdotjs" },
  { name: "TypeScript", icon: "simple-icons:typescript" },
  { name: "React", icon: "simple-icons:react" },
  { name: "Tailwind CSS", icon: "simple-icons:tailwindcss" },
  { name: "Prisma", icon: "simple-icons:prisma" },
  { name: "PostgreSQL", icon: "simple-icons:postgresql" },
  { name: "Vercel", icon: "simple-icons:vercel" },
  { name: "Docker", icon: "simple-icons:docker" },
  { name: "AWS", icon: "simple-icons:amazonwebservices" },
  { name: "OpenAI", icon: "simple-icons:openai" },
  { name: "Anthropic", icon: "simple-icons:anthropic" },
  { name: "Python", icon: "simple-icons:python" },
  { name: "FastAPI", icon: "simple-icons:fastapi" },
  { name: "Stripe", icon: "simple-icons:stripe" },
];

const successStories = [
  {
    industryArchetype: "Multi-location wellness chain",
    engagementType: "Booking SaaS rebuild + AI assistant",
    metricValue: "8 weeks",
    metricLabel: "from kickoff to live across 4 locations",
    quote:
      "Two failed builds before this one. The third stuck — and we finally retired the spreadsheet stack for good.",
    role: "Founder",
    context: "Multi-location wellness chain, 4 sites",
    capabilities: ["Multi-tenant SaaS", "OpenAI assistant", "Stripe Connect"],
    accent: "from-luxury/20 via-luxury/5 to-transparent",
  },
  {
    industryArchetype: "Series A voice AI startup",
    engagementType: "Real-time voice agent — prototype to production",
    metricValue: "<200ms",
    metricLabel: "median end-to-end voice latency",
    quote:
      "We had the model. Meridian shipped the production loop around it — and made it feel real-time.",
    role: "CTO",
    context: "Series A voice AI startup, 11-person team",
    capabilities: ["Streaming AI", "FastAPI", "WebSockets"],
    accent: "from-blue-500/15 via-blue-500/5 to-transparent",
  },
  {
    industryArchetype: "Indie cloud platform team",
    engagementType: "Self-hosted PaaS architecture",
    metricValue: "−84%",
    metricLabel: "monthly hosting cost without losing reliability",
    quote:
      "We rebuilt the deployment stack on the foundation Meridian shipped. Operating costs collapsed.",
    role: "Engineering Lead",
    context: "Indie cloud platform team, 3 engineers",
    capabilities: ["Platform engineering", "Docker", "AWS S3"],
    accent: "from-emerald-500/15 via-emerald-500/5 to-transparent",
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
    title: "Since 2023",
    detail: "Three years shipping product, AI, and growth surfaces for founders and operators.",
  },
  {
    title: "5 production products",
    detail: "BookFlow, MeetFuture, Meeting Assistant, Goal Tracker, and GhostCollab — all live.",
  },
  {
    title: "40+ open repos",
    detail: "An open-source footprint that lets clients audit our craft before signing anything.",
  },
  {
    title: "AI · SaaS · Infra",
    detail: "From multi-tenant booking SaaS to voice agents and self-hosted cloud platforms.",
  },
];

const highlightedEarlierWork = earlierWorkItems;

const engagementModels = [
  {
    name: "Discovery Sprint",
    duration: "1–2 weeks",
    icon: "solar:magnifer-zoom-in-bold-duotone",
    summary:
      "Scoping, technical architecture, and a working prototype on the riskiest surface.",
    bestFor: "Validating an AI or SaaS idea before committing to a full build.",
    deliverables: ["Architecture doc", "Risk-first prototype", "Build plan + estimate"],
  },
  {
    name: "Build Engagement",
    duration: "4–12 weeks",
    icon: "solar:rocket-2-bold-duotone",
    summary:
      "Design and ship a production v1 — auth, data, payments, AI, deployment, the whole loop.",
    bestFor: "Founders with a defined scope and a launch date that cannot slip.",
    deliverables: ["Production app", "Documented codebase", "Launch + handoff"],
    featured: true,
  },
  {
    name: "Embedded Partner",
    duration: "Monthly retainer",
    icon: "solar:users-group-rounded-bold-duotone",
    summary:
      "Ongoing product, AI, and platform work — we plug into your team and ship alongside.",
    bestFor: "Post-launch iteration, model tuning, and scale-stage product evolution.",
    deliverables: ["Reserved capacity", "Weekly delivery cadence", "Quarterly reviews"],
  },
];

const faqs = [
  {
    q: "How fast can you start?",
    a: "We typically have capacity within 2–4 weeks. Discovery Sprints can sometimes start sooner; full Build Engagements get scheduled into the next available slot.",
  },
  {
    q: "Who actually does the work?",
    a: "The three of us — Divyansh, Jigyasu, and Nishant — write every line of code. Nothing is offshored, white-labeled, or handed to a junior. You get senior craft on every commit.",
  },
  {
    q: "How do you scope and price?",
    a: "Fixed-fee per phase, agreed before any work starts. We never bill hourly mid-engagement. Project budgets are discussed on the intake call and scoped to outcomes — not to hours.",
  },
  {
    q: "Who owns the code and IP?",
    a: "You do, on final payment. Standard transfer is built into our master services agreement, and we sign the assignment paperwork your lawyers prefer.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes — happy to sign before the intake call if you need to share specifics. We default to mutual NDAs but can countersign yours.",
  },
  {
    q: "What's your AI / LLM stack?",
    a: "Production-tested: OpenAI (GPT-4o, embeddings, Whisper), Anthropic (Claude family), Groq for low-latency inference, and homegrown evaluation pipelines. We pick the model layer per use case, not per fashion.",
  },
  {
    q: "What if scope changes mid-project?",
    a: "Scope changes get scoped as a mini-SOW with clear timeline and pricing impact. Nothing changes silently, and you decide whether to absorb, defer, or skip.",
  },
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
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/85 to-background" />
        <div
          aria-hidden="true"
          className="absolute -bottom-40 left-1/2 -z-10 h-[640px] w-[1100px] -translate-x-1/2 rounded-full bg-luxury/10 blur-3xl dark:bg-luxury/15"
        />
        <div
          aria-hidden="true"
          className="absolute -top-32 right-[-10%] -z-10 h-[420px] w-[420px] rounded-full bg-luxury/5 blur-3xl"
        />

        <div className="container flex min-h-[86svh] flex-col justify-center py-24">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-5xl"
          >
            <motion.div variants={item} className="mb-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-luxury/30 bg-luxury/5 px-3 py-1 text-xs font-medium text-luxury">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-luxury opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-luxury" />
                </span>
                Available for new work
              </span>
              <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                Independent product studio · Since {siteConfig.foundedYear}
              </span>
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
              A three-person product team — AI, SaaS, and full-stack — that has
              spent three years turning founder briefs into production software.
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

      <section aria-label="By the numbers" className="border-b border-border bg-muted/30">
        <div className="container grid gap-px py-px sm:grid-cols-2 lg:grid-cols-4">
          {proofItems.map((proof) => (
            <div key={proof.title} className="bg-background px-6 py-8 sm:py-10">
              <Icon
                icon="solar:verified-check-bold-duotone"
                className="mb-4 size-7 text-luxury"
                aria-hidden="true"
              />
              <p className="font-serif text-3xl font-semibold leading-tight tracking-normal text-foreground sm:text-4xl">
                {proof.title}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{proof.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="stack-heading"
        className="border-b border-border bg-background"
      >
        <div className="container py-14">
          <p
            id="stack-heading"
            className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
          >
            The stack we ship in
          </p>
          <div
            className="group relative mt-8 overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }}
          >
            <div className="flex w-max animate-marquee gap-12 group-hover:[animation-play-state:paused]">
              {[...stackLogos, ...stackLogos].map((logo, idx) => (
                <div
                  key={`${logo.name}-${idx}`}
                  className="flex shrink-0 flex-col items-center gap-2 opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
                >
                  <Icon
                    icon={logo.icon}
                    className="size-9 text-foreground"
                    aria-label={logo.name}
                  />
                  <span className="text-[11px] font-medium text-muted-foreground">
                    {logo.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
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
              We work with founders and operators who need a small, senior team
              to ship a real product — not a deck, not a prototype that quietly dies.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((service) => (
              <Card key={service.title} className="shadow-none">
                <CardHeader className="gap-4">
                  <div className="flex size-14 items-center justify-center rounded-xl bg-gradient-to-br from-luxury/15 via-luxury/5 to-transparent ring-1 ring-luxury/20">
                    <Icon
                      icon={service.icon}
                      className="size-8 text-luxury"
                      aria-hidden="true"
                    />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
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
                Live products we have shipped end to end.
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

      <section
        id="outcomes"
        aria-labelledby="outcomes-heading"
        className="border-y border-border bg-background"
      >
        <div className="container py-24">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <Badge variant="secondary" className="mb-4 rounded-md">
                Selected outcomes
              </Badge>
              <h2
                id="outcomes-heading"
                className="font-serif text-4xl font-semibold tracking-normal sm:text-5xl"
              >
                What clients walked away with.
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                Three recent engagements, anonymized at the client&apos;s request.
                Metric is the proof. Quote is the texture.
              </p>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {successStories.map((story) => (
              <article
                key={story.industryArchetype}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card p-7 transition-colors hover:border-luxury/40"
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${story.accent} opacity-60`}
                  aria-hidden="true"
                />
                <div className="relative flex flex-1 flex-col gap-6">
                  <div className="flex items-center gap-2">
                    <Icon
                      icon="solar:buildings-2-bold-duotone"
                      className="size-5 text-luxury"
                      aria-hidden="true"
                    />
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {story.industryArchetype}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {story.engagementType}
                  </p>
                  <div>
                    <p className="font-serif text-5xl font-semibold leading-none tracking-tight text-foreground sm:text-6xl">
                      {story.metricValue}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {story.metricLabel}
                    </p>
                  </div>
                  <blockquote className="border-l-2 border-luxury/40 pl-4 text-base leading-7 text-foreground">
                    <Icon
                      icon="solar:quote-up-square-bold-duotone"
                      className="mb-2 size-5 text-luxury"
                      aria-hidden="true"
                    />
                    {story.quote}
                  </blockquote>
                  <footer className="mt-auto flex flex-col gap-3">
                    <div className="text-xs leading-5 text-muted-foreground">
                      <span className="font-semibold text-foreground">{story.role}</span>
                      <span className="mx-1.5 text-muted-foreground/60">·</span>
                      {story.context}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {story.capabilities.map((capability) => (
                        <Badge
                          key={capability}
                          variant="outline"
                          className="rounded-md text-[11px]"
                        >
                          {capability}
                        </Badge>
                      ))}
                    </div>
                  </footer>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
            <Icon
              icon="solar:shield-check-bold-duotone"
              className="size-4 text-luxury"
              aria-hidden="true"
            />
            Client identities anonymized at their request. Metrics measured on
            production systems we shipped or reworked end to end.
          </p>
        </div>
      </section>

      <section className="container grid gap-16 py-24 lg:grid-cols-2">
        <CapabilityBlock
          eyebrow="AI and ML"
          title="AI products shipped to real users — not slideware."
          icon="solar:cpu-bolt-bold-duotone"
          points={[
            "LLM-backed chat and reasoning flows live inside BookFlow and MeetFuture.",
            "Real-time voice and transcription stacks shipped in Meeting Assistant and AuraSpeak.",
            "Multi-agent reasoning, judging, and evaluation pipelines built into LLM Council.",
          ]}
        />
        <CapabilityBlock
          eyebrow="Product and infrastructure"
          title="SaaS, web apps, and the platform layer that actually runs them."
          icon="solar:server-square-cloud-bold-duotone"
          points={[
            "Multi-tenant booking SaaS with auth, billing surfaces, and Prisma-backed data flows.",
            "Productivity and goal-tracking products with recurring jobs, calendars, and reminders.",
            "Self-hosted cloud platforms — see Hostly's builder, router, and deployment stack.",
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
                Small team. Senior craft. A bias toward shipping.
              </h2>
              <p className="text-lg leading-8 text-background/70">
                Three years of doing this has taught us where projects break — and the
                rhythm that keeps them moving from first call to first paying user.
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
              Open-source builds the team ships in the open.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Cloud platforms, voice agents, and multi-agent AI systems we build between
              client engagements — production-grade work that doubles as our public craft proof.
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

      <section
        id="engage"
        aria-labelledby="engage-heading"
        className="border-y border-border bg-background"
      >
        <div className="container py-24">
          <div className="mb-12 max-w-2xl">
            <Badge variant="secondary" className="mb-4 rounded-md">
              How we engage
            </Badge>
            <h2
              id="engage-heading"
              className="font-serif text-4xl font-semibold tracking-normal sm:text-5xl"
            >
              Three ways to put us on the build.
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Pick the format that fits where you are. The first call clarifies
              scope, risk, and the smallest useful launch plan — never a pitch deck.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {engagementModels.map((model) => (
              <article
                key={model.name}
                className={`relative flex flex-col gap-6 rounded-xl border p-7 transition-colors ${
                  model.featured
                    ? "border-luxury/40 bg-gradient-to-br from-luxury/8 via-luxury/3 to-transparent"
                    : "border-border bg-card hover:border-luxury/30"
                }`}
              >
                {model.featured ? (
                  <span className="absolute right-5 top-5 rounded-full bg-luxury/15 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-luxury">
                    Most chosen
                  </span>
                ) : null}
                <div className="flex size-14 items-center justify-center rounded-xl bg-gradient-to-br from-luxury/15 via-luxury/5 to-transparent ring-1 ring-luxury/20">
                  <Icon icon={model.icon} className="size-8 text-luxury" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-semibold tracking-normal text-foreground">
                    {model.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">
                    {model.duration}
                  </p>
                </div>
                <p className="text-sm leading-6 text-foreground/85">{model.summary}</p>
                <p className="text-sm leading-6 text-muted-foreground">
                  <span className="font-semibold text-foreground">Best for:</span>{" "}
                  {model.bestFor}
                </p>
                <ul className="mt-auto flex flex-col gap-2 border-t border-border/60 pt-5">
                  {model.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm leading-6 text-muted-foreground"
                    >
                      <Icon
                        icon="solar:check-circle-bold-duotone"
                        className="mt-0.5 size-4 flex-none text-luxury"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
            <Icon
              icon="solar:info-circle-bold-duotone"
              className="size-4 text-luxury"
              aria-hidden="true"
            />
            Project budgets are discussed on the intake call and scoped to
            outcomes — not to hours.
          </p>
        </div>
      </section>

      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="border-b border-border bg-muted/25"
      >
        <div className="container grid gap-14 py-24 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="max-w-md">
            <Badge variant="secondary" className="mb-4 rounded-md">
              FAQ
            </Badge>
            <h2
              id="faq-heading"
              className="font-serif text-4xl font-semibold tracking-normal sm:text-5xl"
            >
              The questions every founder asks before signing.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              Direct answers to the seven we hear most often. Anything else,
              just ask on the intake call.
            </p>
          </div>
          <div className="flex flex-col divide-y divide-border border-y border-border">
            {faqs.map((faq) => (
              <details key={faq.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-medium text-foreground">
                  <span>{faq.q}</span>
                  <Icon
                    icon="solar:alt-arrow-down-bold-duotone"
                    className="mt-1 size-5 flex-none text-luxury transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-3 max-w-2xl pr-8 text-sm leading-6 text-muted-foreground">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact-cta"
        aria-labelledby="contact-cta-heading"
        className="border-b border-border bg-background"
      >
        <div className="container py-24">
          <div className="mb-14 max-w-3xl">
            <Badge variant="secondary" className="mb-4 rounded-md">
              Start a conversation
            </Badge>
            <h2
              id="contact-cta-heading"
              className="font-serif text-4xl font-semibold tracking-normal sm:text-6xl"
            >
              Tell us what you&apos;re building.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              We read every inquiry within one business day. No funnels, no
              chase emails — a real reply from one of the three of us.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <Link
              href={siteConfig.contactHref}
              className="group flex flex-col gap-5 rounded-xl border border-border bg-card p-7 transition-colors hover:border-luxury/40"
            >
              <div className="flex size-14 items-center justify-center rounded-xl bg-gradient-to-br from-luxury/15 via-luxury/5 to-transparent ring-1 ring-luxury/20">
                <Icon
                  icon="solar:document-add-bold-duotone"
                  className="size-8 text-luxury"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-semibold tracking-normal text-foreground">
                  Send a project brief
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  The fastest path. A short note with goal, constraints, and
                  links opens a real conversation.
                </p>
              </div>
              <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-foreground">
                Open the brief form
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>

            <Link
              href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(
                "[Intro call] Meridian Works",
              )}`}
              className="group relative flex flex-col gap-5 rounded-xl border border-luxury/40 bg-gradient-to-br from-luxury/10 via-luxury/3 to-transparent p-7 transition-colors hover:border-luxury/60"
            >
              <span className="absolute right-5 top-5 rounded-full bg-luxury/15 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-luxury">
                Recommended
              </span>
              <div className="flex size-14 items-center justify-center rounded-xl bg-gradient-to-br from-luxury/20 via-luxury/8 to-transparent ring-1 ring-luxury/30">
                <Icon
                  icon="solar:phone-calling-rounded-bold-duotone"
                  className="size-8 text-luxury"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-semibold tracking-normal text-foreground">
                  Book a 20-min intro call
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Walk us through the goal. We&apos;ll walk you through where
                  the architecture and timeline land.
                </p>
              </div>
              <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-foreground">
                Email to schedule
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>

            <Link
              href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Hello")}`}
              className="group flex flex-col gap-5 rounded-xl border border-border bg-card p-7 transition-colors hover:border-luxury/40"
            >
              <div className="flex size-14 items-center justify-center rounded-xl bg-gradient-to-br from-luxury/15 via-luxury/5 to-transparent ring-1 ring-luxury/20">
                <Icon
                  icon="solar:chat-round-line-bold-duotone"
                  className="size-8 text-luxury"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-semibold tracking-normal text-foreground">
                  Just say hi
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Not ready to scope yet? Send a quick hello and what
                  you&apos;re curious about. Low commitment.
                </p>
              </div>
              <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-foreground">
                Drop us a line
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function CapabilityBlock({
  eyebrow,
  title,
  icon,
  points,
}: {
  eyebrow: string;
  title: string;
  icon: string;
  points: string[];
}) {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-center gap-3">
        <div className="flex size-14 items-center justify-center rounded-xl bg-gradient-to-br from-luxury/15 via-luxury/5 to-transparent ring-1 ring-luxury/20">
          <Icon icon={icon} className="size-8 text-luxury" aria-hidden="true" />
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
