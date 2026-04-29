export type SiteLink = {
  label: string;
  href: string;
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  initials: string;
  links: SiteLink[];
  proofBullets: string[];
  sourceLinks: SiteLink[];
};

export const siteConfig = {
  name: "Meridian Works",
  legalName: "Meridian Works Studio",
  foundedYear: 2023,
  tagline:
    "An independent product studio shipping software, AI, and growth surfaces for ambitious founders.",
  description:
    "Meridian Works is a small product studio that has spent three years shipping booking SaaS, AI products, web apps, and the infrastructure behind them — built for founders, operators, and growth teams who need to move fast without breaking trust.",
  url: process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000",
  contactHref: "/contact",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "nishantnischal25@gmail.com",
  primaryContactName: "Nishant Nischal",
  location: "Remote-first, working with founders across the US, Europe, and India.",
  availability: "Booking new engagements for Q3 onward.",
  keywords: [
    "product engineering studio",
    "freelance product team",
    "Next.js product development",
    "AI product engineering",
    "SaaS development studio",
    "web app development",
    "deployment engineering",
    "voice agent development",
  ],
  nav: [
    { href: "/work", label: "Work" },
    { href: "/#services", label: "Services" },
    { href: "/#process", label: "Process" },
    { href: "/blog", label: "Notes" },
    { href: "/contact", label: "Contact" },
  ],
  team: [
    {
      name: "Divyansh Gupta",
      role: "Generative AI & Platform Engineering",
      bio: "Three years building production AI — voice agents, multi-agent reasoning systems, and the self-hosted cloud infrastructure that runs them. Leads the studio's AI and platform work end to end.",
      initials: "DG",
      links: [
        { label: "Portfolio", href: "https://divyansh-675.github.io/" },
        { label: "GitHub", href: "https://github.com/DIVYANSH-675" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/divyansh-gupta-b4396a207/" },
      ],
      proofBullets: [
        "Hostly — production cloud hosting platform",
        "AuraSpeak — real-time voice agent shipped to live demo",
        "LLM Council — multi-agent reasoning system with safety pipeline",
      ],
      sourceLinks: [
        { label: "Hostly repo", href: "https://github.com/DIVYANSH-675/Hostly" },
        { label: "LLM Council repo", href: "https://github.com/DIVYANSH-675/LLM-Council" },
      ],
    },
    {
      name: "Jigyasu Patel",
      role: "Product Engineering & SaaS",
      bio: "Three years shipping multi-tenant SaaS, AI products, and growth-ready frontends for early-stage founders. Owns the studio's product surface from first prototype to live revenue.",
      initials: "JP",
      links: [
        { label: "Portfolio", href: "https://jigyasu-patel.netlify.app/" },
        { label: "GitHub", href: "https://github.com/jigyasu2004" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/jigyasu-patel-6a90a3257/" },
      ],
      proofBullets: [
        "BookFlow — multi-tenant booking SaaS in production",
        "MeetFuture — stateless AI product live in market",
        "Goal Tracker & Meeting Assistant — shipped end-to-end",
      ],
      sourceLinks: [
        { label: "BookFlow live", href: "https://bookflow.store/" },
        { label: "MeetFuture live", href: "https://www.meetfuture.online/" },
      ],
    },
    {
      name: "Nishant Nischal",
      role: "Full-Stack, Mobile & Web3",
      bio: "Three years of full-stack delivery across web, Android, and on-chain product surfaces. Runs the studio's client engagements and integrates the team's work into shipped systems.",
      initials: "NN",
      links: [
        { label: "LinkedIn", href: "https://www.linkedin.com/in/nishant-nischal-1ba8481aa/" },
        { label: "Email", href: "mailto:nishantnischal25@gmail.com" },
      ],
      proofBullets: [
        "Full-stack delivery across web and mobile surfaces",
        "Android and on-chain product integrations",
        "Primary contact for new client engagements",
      ],
      sourceLinks: [
        { label: "LinkedIn", href: "https://www.linkedin.com/in/nishant-nischal-1ba8481aa/" },
      ],
    },
  ] satisfies TeamMember[],
  attribution: "Built with Next.js.",
} as const;

export type SiteNavItem = (typeof siteConfig.nav)[number];
