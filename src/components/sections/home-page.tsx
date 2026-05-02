"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { ArrowRight, CheckCircle2, ExternalLink, Mail } from "lucide-react";
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
import { featuredCaseStudies, type CaseStudy } from "@/data/case-studies";
import { earlierWorkItems } from "@/data/earlier-work";

const services = [
  {
    title: "Premium websites",
    subtitle: "Brand, launch, and conversion",
    description:
      "Fast marketing sites with sharp positioning, polished UI, SEO metadata, and a component system that can keep growing.",
    icon: "solar:magic-stick-3-bold-duotone",
  },
  {
    title: "AI & ML systems",
    subtitle: "Useful models in real workflows",
    description:
      "Chat, voice, classification, extraction, agent flows, and evaluation loops wrapped in production product surfaces.",
    icon: "solar:cpu-bolt-bold-duotone",
  },
  {
    title: "Web apps & software",
    subtitle: "Dashboards, SaaS, and tools",
    description:
      "Multi-tenant products, portals, API integrations, admin systems, and workflow software built for daily use.",
    icon: "solar:widget-2-bold-duotone",
  },
  {
    title: "Automation & deployment",
    subtitle: "Less fragile launches",
    description:
      "Background jobs, QA checks, CI/CD, release paths, alerts, and production handoffs that make the ship date calmer.",
    icon: "solar:rocket-2-bold-duotone",
  },
];

const heroMetrics = [
  { value: "5", label: "production products" },
  { value: "40+", label: "open repos" },
  { value: "Small team", label: "senior builders" },
  { value: "1 day", label: "reply time" },
];

const antiPositioning = [
  "retainers",
  "account managers",
  "subcontractors",
  "fixed-bid waterfall",
];

const stackLogos = [
  { name: "Next.js", icon: "simple-icons:nextdotjs" },
  { name: "TypeScript", icon: "simple-icons:typescript" },
  { name: "React", icon: "simple-icons:react" },
  { name: "Tailwind CSS", icon: "simple-icons:tailwindcss" },
  { name: "PostgreSQL", icon: "simple-icons:postgresql" },
  { name: "Vercel", icon: "simple-icons:vercel" },
  { name: "Docker", icon: "simple-icons:docker" },
  { name: "OpenAI", icon: "simple-icons:openai" },
  { name: "Python", icon: "simple-icons:python" },
  { name: "FastAPI", icon: "simple-icons:fastapi" },
];

const processPhases = [
  {
    title: "Align on the goal",
    description:
      "We lock the product goal, user flow, constraints, and definition of done before the build gets momentum.",
  },
  {
    title: "Prototype the risk",
    description:
      "The riskiest surface comes first: AI behavior, booking logic, payments, auth, data, or deployment.",
  },
  {
    title: "Build production",
    description:
      "The app surface, backend, integrations, QA, and release path move together instead of getting bolted on late.",
  },
  {
    title: "Ship and document",
    description:
      "We launch the smallest useful version, document the system, and make the next iteration obvious.",
  },
];

const outcomeProof = [
  {
    title: "Booking SaaS rebuild",
    metric: "8 weeks",
    detail: "from kickoff to live multi-location launch",
    quote: "The product finally replaced the spreadsheet stack.",
  },
  {
    title: "Voice AI production loop",
    metric: "<200ms",
    detail: "median end-to-end voice latency target",
    quote: "The prototype became a real-time product surface.",
  },
  {
    title: "Self-hosted deployment stack",
    metric: "-84%",
    detail: "monthly hosting cost without losing reliability",
    quote: "Operating costs collapsed after the rebuild.",
  },
];

type LatestPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
  image: string | null;
  tags: string[];
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const railItem = {
  hidden: { opacity: 0, x: 18 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const statusRail = [
  { label: "Now", value: "Booking SaaS · v3" },
  { label: "Next", value: "Voice agent · iter 2" },
  { label: "Shipped", value: "5 production products" },
];

export function HomePage({ latestPosts = [] }: { latestPosts?: LatestPost[] }) {
  void latestPosts;

  return (
    <div className="overflow-hidden">
      <section className="studio-section">
        <div className="container relative grid items-center gap-10 py-14 lg:grid-cols-[0.86fr_1.14fr] lg:py-16">
          <div aria-hidden="true" className="dot-matrix animate-drift absolute left-0 top-24 h-28 w-28 opacity-50" />
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="relative z-10 max-w-2xl"
          >
            <motion.p variants={item} className="section-kicker">
              Hello world, <span className="text-[hsl(var(--luxury))]">we are</span>
            </motion.p>
            <motion.h1
              variants={item}
              className="outline-heading animate-mask-reveal mt-6 text-6xl font-black uppercase leading-[0.9] sm:text-7xl lg:text-8xl"
            >
              {siteConfig.name}
            </motion.h1>
            <motion.p variants={item} className="handwritten mt-5 text-foreground">
              A product engineering studio
              <span className="ml-3 inline-block align-middle text-base text-[hsl(var(--luxury))]">
                ↳ since 2023
              </span>
            </motion.p>
            <motion.p
              variants={item}
              className="mt-9 max-w-xl text-xl leading-9 text-muted-foreground"
            >
              A small team of senior builders helping founders ship websites, AI systems,
              SaaS products, automations, and deployment paths that survive real users.
            </motion.p>

            <motion.ul
              variants={item}
              aria-label="Studio at a glance"
              className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-4"
            >
              {heroMetrics.map((m) => (
                <li
                  key={m.label}
                  className="rounded-xl border-2 border-border bg-card px-3 py-2.5 shadow-[3px_3px_0_hsl(var(--foreground)/0.16)]"
                >
                  <p className="text-2xl font-black leading-none text-foreground">{m.value}</p>
                  <p className="mt-1 text-[10px] font-black uppercase tracking-[0.08em] text-[hsl(var(--luxury))]">
                    {m.label}
                  </p>
                </li>
              ))}
            </motion.ul>

            <motion.div variants={item} className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button asChild size="lg">
                <Link href={siteConfig.contactHref}>
                  <Mail data-icon="inline-start" />
                  Contact Us
                </Link>
              </Button>
              <Button asChild variant="link" size="lg" className="justify-start">
                <Link href="/work">
                  View portfolio
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <div className="relative">
            <ProductOrbit />
            <motion.aside
              variants={container}
              initial="hidden"
              animate="show"
              aria-label="Studio status"
              className="pointer-events-none absolute -right-4 top-2 hidden flex-col gap-3 2xl:flex"
            >
              {statusRail.map((entry) => (
                <motion.div
                  key={entry.label}
                  variants={railItem}
                  className="pointer-events-auto flex items-center gap-3"
                >
                  <span className="font-accent text-2xl font-bold text-[hsl(var(--luxury))]">
                    {entry.label}
                  </span>
                  <span className="h-px w-6 bg-foreground/40" aria-hidden="true" />
                  <span className="rounded-full border-2 border-border bg-card px-3 py-1 text-[11px] font-black uppercase tracking-[0.06em] shadow-[3px_3px_0_hsl(var(--foreground)/0.14)]">
                    {entry.value}
                  </span>
                </motion.div>
              ))}
            </motion.aside>
          </div>
        </div>
      </section>

      {/* Anti-positioning band — sharpest weapon, declarative */}
      <section
        aria-label="What we don't do"
        className="border-b-2 border-border bg-foreground text-background"
      >
        <div className="container py-10">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-4 text-center sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-7 sm:gap-y-3">
            {antiPositioning.map((item, idx) => (
              <li
                key={item}
                className="flex items-baseline justify-center gap-2 text-sm font-black uppercase tracking-[0.08em] sm:text-base"
              >
                <span className="text-2xl font-black text-[hsl(var(--luxury))] sm:text-3xl">
                  NO
                </span>
                <span>{item}</span>
                {idx < antiPositioning.length - 1 ? (
                  <span aria-hidden="true" className="ml-3 hidden text-background/40 sm:inline">
                    ·
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
          <p className="font-accent mt-5 text-center text-xl font-bold leading-tight text-background/80 sm:text-3xl sm:leading-none">
            ↳ just a small team of senior builders shipping the work.
          </p>
        </div>
      </section>

      <section className="studio-section">
        <div className="container py-12">
          <p className="section-kicker text-center">The stack we ship in</p>
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
                  className="flex shrink-0 flex-col items-center gap-2 text-foreground"
                >
                  <Icon icon={logo.icon} className="size-9" aria-label={logo.name} />
                  <span className="text-[11px] font-black uppercase tracking-[0.06em]">
                    {logo.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="studio-section section-wash section-wash-amber">
        <div className="container py-20">
          <SectionHeader
            kicker="What we do"
            title="Our Services"
            subtitle="One team for the surface, the system, and the ship date. Bring the outcome, and we build the product path around it."
          />
          <p className="marginalia mt-3">↳ four lanes, one delivery rhythm</p>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <Card key={service.title} className="h-full shadow-[8px_8px_0_hsl(var(--foreground)/0.12)]">
                <CardHeader className="gap-5">
                  <div className="flex size-14 items-center justify-center rounded-2xl border-2 border-border bg-secondary">
                    <Icon icon={service.icon} className="size-8" aria-hidden="true" />
                  </div>
                  <div>
                    <CardTitle className="text-xl uppercase">{service.title}</CardTitle>
                    <p className="mt-2 font-accent text-2xl font-bold">{service.subtitle}</p>
                  </div>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="studio-section section-wash section-wash-violet">
        <div className="container py-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              kicker="Selected work"
              title="Portfolio"
              subtitle="Live products we have shipped end to end, with problem, solution, role, stack, visual proof, and public sources."
            />
            <Button asChild variant="outline">
              <Link href="/work">
                See all work
                <ExternalLink data-icon="inline-end" />
              </Link>
            </Button>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {featuredCaseStudies.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        </div>
      </section>

      <CapabilityBand
        eyebrow="AI and ML"
        title="AI products shipped to real users, not slideware."
        visual="/work/meetfuture.png"
        visualAlt="MeetFuture AI product screenshot"
        points={[
          "LLM-backed chat and reasoning flows live inside BookFlow and MeetFuture.",
          "Real-time voice and transcription stacks shipped in Meeting Assistant and AuraSpeak.",
          "Multi-agent judging and safety pipelines built into LLM Council.",
        ]}
      />

      <CapabilityBand
        eyebrow="Web and software"
        title="SaaS, web apps, and the platform layer that actually runs them."
        visual="/work/bookflow.png"
        visualAlt="BookFlow SaaS product screenshot"
        reverse
        points={[
          "Multi-tenant booking SaaS with auth, dashboard, data flows, and AI assistant routes.",
          "Productivity products with recurring jobs, reminders, calendars, and account systems.",
          "Self-hosted cloud platforms with builders, routers, logs, and deployment flows.",
        ]}
      />

      <section id="process" className="border-b-2 border-border bg-foreground text-background">
        <div className="container py-20">
          <SectionHeader
            kicker="Process"
            title="Small team. Senior craft. A bias toward shipping."
            subtitle="Four phases, every engagement."
            inverted
          />
          <ol className="mt-12 grid gap-4">
            {processPhases.map((phase, index) => (
              <li
                key={phase.title}
                className="grid gap-4 rounded-2xl border-2 border-background/40 bg-background/5 p-6 sm:grid-cols-[5rem_1fr]"
              >
                <span className="font-accent text-5xl font-bold text-[hsl(var(--luxury))]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-black uppercase">{phase.title}</h3>
                  <p className="mt-2 max-w-3xl leading-7 text-background/75">{phase.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="studio-section">
        <div className="container py-20">
          <SectionHeader
            kicker="Team"
            title="A small team, one delivery rhythm."
            subtitle="You work directly with the people designing the system and writing the code."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {siteConfig.team.map((member) => (
              <Card key={member.name} className="h-full">
                <CardHeader className="gap-5">
                  {member.photo ? (
                    <div className="relative size-20 overflow-hidden rounded-2xl border-2 border-border bg-background shadow-[7px_7px_0_rgba(16,16,16,0.18)]">
                      <Image
                        src={member.photo.src}
                        alt={member.photo.alt}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex size-16 items-center justify-center rounded-2xl border-2 border-border bg-secondary font-black">
                      {member.initials}
                    </div>
                  )}
                  <div>
                    <CardTitle className="text-xl uppercase">{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-5">
                  <p className="text-sm leading-6 text-muted-foreground">{member.bio}</p>
                  <ul className="flex flex-col gap-2">
                    {member.proofBullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                        <CheckCircle2 className="mt-1 size-4 flex-none text-[hsl(var(--luxury))]" aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {member.links.map((link) => (
                      <Button key={link.href} asChild size="sm" variant="outline">
                        <Link
                          href={link.href}
                          target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                          rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
                        >
                          {link.label}
                        </Link>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto moment — single POV line, no header, no CTA */}
      <section
        aria-label="Studio point of view"
        className="border-b-2 border-border bg-background"
      >
        <div className="container relative py-20 text-center">
          <div
            aria-hidden="true"
            className="dot-matrix animate-drift absolute left-1/2 top-6 h-16 w-16 -translate-x-1/2 opacity-30"
          />
          <p className="font-accent mx-auto max-w-4xl text-3xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            We measure builders by what&apos;s running in production —
            <span className="text-[hsl(var(--luxury))]"> not what&apos;s in a deck.</span>
          </p>
          <p className="section-kicker mt-6 text-foreground/60">— The studio</p>
        </div>
      </section>

      <section className="studio-section section-wash section-wash-rose">
        <div className="container py-20">
          <SectionHeader
            kicker="Outcomes"
            title="Numbers, not testimonials."
            subtitle="The metric on each story is the one the client cared about. Names withheld where the client relationship needs privacy."
          />
          <p className="marginalia mt-3">↳ what changed after we shipped</p>
          <div className="mt-12 flex flex-col gap-5">
            {outcomeProof.map((proof, idx) => (
              <article
                key={proof.title}
                className="card-lift relative overflow-hidden rounded-2xl border-2 border-border bg-card shadow-[7px_7px_0_hsl(var(--foreground)/0.16)]"
              >
                <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-10">
                  <div className="border-b-2 border-border pb-6 lg:border-b-0 lg:border-r-2 lg:pb-0 lg:pr-10">
                    <p className="font-accent text-xl font-bold leading-none text-foreground/60">
                      № {String(idx + 1).padStart(2, "0")}
                    </p>
                    <p className="outline-heading mt-3 text-5xl font-black uppercase leading-[0.85] sm:text-7xl lg:text-[7rem]">
                      {proof.metric}
                    </p>
                    <p className="mt-4 text-sm font-black uppercase tracking-[0.1em] text-foreground/70">
                      {proof.detail}
                    </p>
                  </div>
                  <div>
                    <p className="section-kicker text-[hsl(var(--luxury))]">
                      {proof.title}
                    </p>
                    <blockquote className="font-accent mt-4 border-l-4 border-[hsl(var(--luxury))] pl-5 text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                      &ldquo;{proof.quote}&rdquo;
                    </blockquote>
                    <p className="mt-5 text-xs font-black uppercase tracking-[0.1em] text-muted-foreground">
                      ↳ Verified outcome · 2025
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {earlierWorkItems.map((work) => (
              <Card key={work.title} className="h-full shadow-none">
                <CardHeader>
                  <Badge variant="outline" className="w-fit">{work.eyebrow}</Badge>
                  <CardTitle className="text-xl">{work.title}</CardTitle>
                  <CardDescription>{work.summary}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact-cta" className="studio-section">
        <div className="container py-20">
          <div className="relative overflow-hidden rounded-[2rem] border-2 border-border bg-secondary p-8 text-center shadow-[10px_10px_0_hsl(var(--foreground)/0.18)] md:p-12">
            <div aria-hidden="true" className="dot-matrix absolute right-8 top-8 h-24 w-24 opacity-30" />
            <p className="section-kicker">Let&apos;s talk about ideas</p>
            <h2 className="mx-auto mt-5 max-w-4xl text-5xl font-black uppercase leading-none sm:text-6xl">
              Contact Us
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8">
              Tell us what you want to ship. Send the outcome, constraints, and links you already have.
              A real builder from the team replies.
            </p>
            <div className="mt-8 flex justify-center">
              <Button asChild size="lg">
                <Link href={siteConfig.contactHref}>
                  Start a project note
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductOrbit() {
  const screenshots = [
    { src: "/work/bookflow.png", alt: "BookFlow product screenshot", className: "left-5 top-16 w-[48%] rotate-[-8deg]" },
    { src: "/work/meetfuture.png", alt: "MeetFuture product screenshot", className: "right-4 top-32 w-[46%] rotate-[8deg]" },
    { src: "/work/meeting-assistant.png", alt: "Meeting Assistant product screenshot", className: "bottom-16 left-1/2 w-[52%] -translate-x-1/2 rotate-[-2deg]" },
  ];

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[600px]">
      <div aria-hidden="true" className="dot-matrix absolute right-6 top-2 h-32 w-32 opacity-60" />
      <div aria-hidden="true" className="dot-matrix absolute bottom-5 left-0 h-32 w-32 opacity-60" />
      <div className="absolute inset-[8%] rounded-full border-2 border-border bg-[hsl(var(--luxury))]" />
      <div className="absolute inset-[20%] rounded-full bg-background/35 blur-2xl" />
      {screenshots.map((shot) => (
        <div
          key={shot.src}
          className={`studio-panel absolute overflow-hidden rounded-2xl bg-card p-2 ${shot.className}`}
        >
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl border-2 border-border bg-muted">
            <Image src={shot.src} alt={shot.alt} fill sizes="320px" className="object-cover" priority />
          </div>
        </div>
      ))}
      <div className="studio-panel absolute bottom-[18%] left-0 rounded-full bg-card px-5 py-3">
        <p className="text-xl font-black uppercase leading-tight text-foreground">
          5 production products
        </p>
      </div>
      <div className="studio-panel absolute bottom-[10%] right-0 rounded-full bg-card px-5 py-3">
        <p className="text-xl font-black uppercase leading-tight text-foreground">
          40+ open repos
        </p>
      </div>
    </div>
  );
}

function SectionHeader({
  kicker,
  title,
  subtitle,
  inverted = false,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  inverted?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <p className={inverted ? "section-kicker text-background" : "section-kicker"}>{kicker}</p>
      <h2 className="mt-4 text-4xl font-black uppercase leading-none sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-5 max-w-2xl text-lg leading-8 ${
            inverted ? "text-background/75" : "text-muted-foreground"
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Card className="h-full overflow-hidden">
        <div className="relative aspect-[16/10] border-b-2 border-border bg-muted">
          <Image
            src={study.visual.src}
            alt={study.visual.alt}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="image-duotone object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Badge variant="outline">{study.eyebrow}</Badge>
            <span className="text-xs font-bold text-muted-foreground">
              {study.proofLevel === "public-repo" ? "Live + repo proof" : "Public site proof"}
            </span>
          </div>
          <CardTitle className="text-2xl">{study.title}</CardTitle>
          <CardDescription>{study.summary}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

function CapabilityBand({
  eyebrow,
  title,
  points,
  visual,
  visualAlt,
  reverse = false,
}: {
  eyebrow: string;
  title: string;
  points: string[];
  visual: string;
  visualAlt: string;
  reverse?: boolean;
}) {
  return (
    <section className="studio-section">
      <div
        className={`container grid gap-10 py-20 lg:grid-cols-2 lg:items-center ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div>
          <SectionHeader kicker={eyebrow} title={title} />
          <ul className="mt-8 flex flex-col gap-4">
            {points.map((point) => (
              <li key={point} className="flex gap-3 text-base leading-7 text-muted-foreground">
                <CheckCircle2 className="mt-1 size-5 flex-none text-[hsl(var(--luxury))]" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <Button asChild variant="link" className="mt-6">
            <Link href="/work">
              See proof
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </div>
        <div className="relative">
          <div aria-hidden="true" className="dot-matrix absolute -right-4 -top-6 h-28 w-28 opacity-50" />
          <div className="studio-panel relative overflow-hidden rounded-[2rem] bg-card p-3">
            <div className="relative aspect-[16/11] overflow-hidden rounded-[1.4rem] border-2 border-border bg-muted">
              <Image
                src={visual}
                alt={visualAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

