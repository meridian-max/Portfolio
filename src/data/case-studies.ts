import type { SiteLink } from "@/config/site";

export type CaseStudy = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  problem: string;
  solution: string;
  role: string;
  techStack: string[];
  services: string[];
  visual: {
    src: string;
    alt: string;
  };
  contributors: string[];
  links: {
    live?: SiteLink;
    repo?: SiteLink;
    source: SiteLink[];
  };
  proofLevel: "public-repo" | "public-site";
  evidenceNote: string;
  result?: string;
  quote?: {
    text: string;
    attribution: string;
  };
  featured?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "bookflow",
    title: "BookFlow",
    eyebrow: "Multi-tenant booking SaaS",
    summary:
      "Booking pages, business website, lead inbox, and AI assistant flows packaged into one public SaaS product.",
    problem:
      "Solo operators and small teams usually stitch together a storefront, scheduling tool, and CRM across separate products. BookFlow's public positioning is to keep those jobs in one system.",
    solution:
      "The shipped app combines a public storefront, scheduling engine, lead capture, dashboard, auth, and AI chat routes inside a single multi-tenant Next.js product.",
    role:
      "Jigyasu Patel's public repo frames this as a design-handoff-to-production port: app shell, tenant flows, dashboard, booking APIs, auth, Prisma data model, and AI assistant integration.",
    techStack: ["Next.js 14", "TypeScript", "Prisma", "NextAuth", "OpenAI"],
    services: ["SaaS", "Booking", "AI", "Web app"],
    visual: {
      src: "/work/bookflow.png",
      alt: "Public homepage screenshot of the BookFlow booking SaaS product",
    },
    contributors: ["Jigyasu Patel"],
    links: {
      live: { label: "Live product", href: "https://bookflow.store/" },
      repo: { label: "GitHub repo", href: "https://github.com/jigyasu2004/BookFlow" },
      source: [
        { label: "Live site", href: "https://bookflow.store/" },
        { label: "README and code", href: "https://github.com/jigyasu2004/BookFlow" },
      ],
    },
    proofLevel: "public-repo",
    evidenceNote:
      "The live site, repo description, README route list, and package.json all publicly support this product summary.",
    featured: true,
  },
  {
    slug: "meetfuture",
    title: "MeetFuture",
    eyebrow: "Stateless AI product",
    summary:
      "A reflective product where users answer deep questions, generate one future-self timeline, and chat with that simulated future self.",
    problem:
      "Most personal AI products either stop at one prompt or depend on storing sensitive history. The public product instead centers a guided session without persistence.",
    solution:
      "MeetFuture uses a questionnaire, generation endpoint, and chat endpoint to produce one possible future-self narrative and continue the conversation inside a stateless workspace.",
    role:
      "Jigyasu Patel's public repo exposes the questionnaire flow, prompt system, validation, and OpenAI-backed generation and chat routes.",
    techStack: ["Next.js 15", "TypeScript", "OpenAI", "React 19", "Tailwind CSS"],
    services: ["AI", "Web app", "UX flows"],
    visual: {
      src: "/work/meetfuture.png",
      alt: "Public homepage screenshot of the MeetFuture AI interaction product",
    },
    contributors: ["Jigyasu Patel"],
    links: {
      live: { label: "Live product", href: "https://www.meetfuture.online/" },
      repo: { label: "GitHub repo", href: "https://github.com/jigyasu2004/MeetFuture" },
      source: [
        { label: "Live site", href: "https://www.meetfuture.online/" },
        { label: "README and code", href: "https://github.com/jigyasu2004/MeetFuture" },
      ],
    },
    proofLevel: "public-repo",
    evidenceNote:
      "The live site, repo README, package.json, and public app route tree all document the stateless future-self flow.",
    featured: true,
  },
  {
    slug: "meeting-assistant",
    title: "Meeting Assistant",
    eyebrow: "Desktop meeting overlay",
    summary:
      "An always-on-top Windows assistant for live speech-to-text, translation, and meeting help during Zoom, Meet, and Teams calls.",
    problem:
      "Live meetings are hard to follow when transcription, translation, and note taking live outside the call surface.",
    solution:
      "The public repo describes a desktop overlay that stays visible during meetings, transcribes audio with Whisper, translates speech, and can be packaged as a Windows EXE.",
    role:
      "Jigyasu Patel's public repo includes the Python app shell, UI modules, audio pipeline, keyboard hooks, and packaging instructions.",
    techStack: ["Python", "OpenAI Whisper", "PySide6", "PyInstaller", "pywin32"],
    services: ["Desktop app", "AI", "Transcription"],
    visual: {
      src: "/work/meeting-assistant.png",
      alt: "Public GitHub overview for the Meeting Assistant desktop overlay project",
    },
    contributors: ["Jigyasu Patel"],
    links: {
      live: {
        label: "Public build folder",
        href: "https://drive.google.com/drive/folders/1Lsg8HkqLl2vg7EAO4YAqVhHz6wVjDyL1",
      },
      repo: { label: "GitHub repo", href: "https://github.com/jigyasu2004/Meeting-Assistant" },
      source: [
        { label: "Public build folder", href: "https://drive.google.com/drive/folders/1Lsg8HkqLl2vg7EAO4YAqVhHz6wVjDyL1" },
        { label: "README and code", href: "https://github.com/jigyasu2004/Meeting-Assistant" },
      ],
    },
    proofLevel: "public-repo",
    evidenceNote:
      "The public repo, requirements.txt, README, and build-folder link provide the strongest published proof for this desktop tool.",
    featured: true,
  },
  {
    slug: "goal-tracker",
    title: "Goal Tracker",
    eyebrow: "Goal tracking product",
    summary:
      "A full-stack goal planner for daily, short-term, and long-term goals with recurring tasks, notes, and reminders.",
    problem:
      "Personal planning often fragments across notes, calendars, and habit trackers, making it hard to see daily work and longer-term goals together.",
    solution:
      "The public app brings calendars, notes, recurring goals, auth, and reminders into one Next.js product with a database-backed account system.",
    role:
      "Jigyasu Patel's public repo covers the app surface, auth, Prisma data model, reminder pipeline, and deployment-ready Next.js build.",
    techStack: ["Next.js 14", "Prisma", "PostgreSQL", "NextAuth", "Nodemailer"],
    services: ["Productivity app", "Web app", "Automation"],
    visual: {
      src: "/work/goal-tracker.png",
      alt: "Public homepage screenshot of the Goal Tracker web app",
    },
    contributors: ["Jigyasu Patel"],
    links: {
      live: { label: "Live product", href: "https://goal-tracker-cyan.vercel.app/" },
      repo: { label: "GitHub repo", href: "https://github.com/jigyasu2004/Goal-Tracker" },
      source: [
        { label: "Live site", href: "https://goal-tracker-cyan.vercel.app/" },
        { label: "README and code", href: "https://github.com/jigyasu2004/Goal-Tracker" },
      ],
    },
    proofLevel: "public-repo",
    evidenceNote:
      "The live product, public repo description, README features, and package.json support the current summary and stack list.",
  },
  {
    slug: "ghostcollab",
    title: "GhostCollab",
    eyebrow: "Anonymous chat product",
    summary:
      "A low-friction public chat product positioned around talking to strangers without the usual signup overhead.",
    problem:
      "Starting a one-to-one chat product often gets buried under account creation and setup before the conversation even starts.",
    solution:
      "The live product message is simple: open the site and chat instantly, reducing the usual friction around anonymous conversations.",
    role:
      "This product appears in the provided team product list, with the public site currently serving as the strongest published source.",
    techStack: [],
    services: ["Web product"],
    visual: {
      src: "/work/ghostcollab.png",
      alt: "Public homepage screenshot of the GhostCollab chat product",
    },
    contributors: [],
    links: {
      live: { label: "Live product", href: "https://ghostcollab.com/" },
      source: [{ label: "Live site", href: "https://ghostcollab.com/" }],
    },
    proofLevel: "public-site",
    evidenceNote:
      "The live site and its public title and description are verifiable. Deeper implementation details are not publicly documented.",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

export const featuredCaseStudies = caseStudies.filter((study) => study.featured);
export const additionalCaseStudies = caseStudies.filter((study) => !study.featured);
