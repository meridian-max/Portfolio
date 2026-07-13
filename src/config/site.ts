export type SiteLink = {
  label: string;
  href: string;
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  initials: string;
  photo?: {
    src: string;
    alt: string;
  };
  links: SiteLink[];
  proofBullets: string[];
  sourceLinks: SiteLink[];
};

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@greedup.com";
const gmailComposeHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  contactEmail,
)}`;

export const siteConfig = {
  name: "GreedUp",
  legalName: "GreedUp Studio",
  foundedYear: 2025,
  tagline:
    "An independent product studio shipping software, AI, and growth surfaces for ambitious founders.",
  description:
    "GreedUp is a small product studio that has spent three years shipping booking SaaS, AI products, web apps, and the infrastructure behind them — built for founders, operators, and growth teams who need to move fast without breaking trust.",
  url: process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.greedup.com",
  contactHref: "/contact",
  email: contactEmail,
  gmailComposeHref,
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
  socialLinks: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/nishant-nischal-1ba8481aa/" },
    { label: "Email", href: gmailComposeHref },
  ],
  team: [
    {
      name: "Divyansh Gupta",
      role: "Generative AI & Platform Engineering",
      bio: "Three years building production AI — voice agents, multi-agent reasoning systems, and the self-hosted cloud infrastructure that runs them. Leads the studio's AI and platform work end to end.",
      initials: "DG",
      photo: {
        src: "/team/divyansh-gupta.jpg",
        alt: "Divyansh Gupta profile photo",
      },
      links: [
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
      role: "Co-founder, ML Engineer & AI Engineer",
      bio: "Co-founder at GreedUp and ML Engineer at Shipd by Datacurve (YC W24), focused on AI products, SaaS systems, and production-ready product interfaces.",
      initials: "JP",
      photo: {
        src: "/team/jigyasu-patel.jpg",
        alt: "Jigyasu Patel profile photo",
      },
      links: [
        { label: "LinkedIn", href: "https://www.linkedin.com/in/jigyasu-patel-6a90a3257/" },
      ],
      proofBullets: [
        "GreedUp — co-founder shipping founder-facing products",
        "Shipd by Datacurve (YC W24) — ML engineering",
        "BookFlow, MeetFuture, Goal Tracker, and Meeting Assistant",
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
      photo: {
        src: "/team/nishant-nischal.jpg",
        alt: "Nishant Nischal profile photo",
      },
      links: [
        { label: "LinkedIn", href: "https://www.linkedin.com/in/nishant-nischal-1ba8481aa/" },
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
