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
  tagline: "Public product work from three RGIPT builders across AI, SaaS, software, and deployment.",
  description:
    "Meridian Works is the public portfolio umbrella for Divyansh Gupta, Jigyasu Patel, and Nishant Nischal. The work spans booking SaaS, AI products, desktop tooling, websites, automation, and deployment.",
  url: process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000",
  contactHref: "/contact",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "nishantnischal25@gmail.com",
  primaryContactName: "Nishant Nischal",
  location: "Remote from India, with public work tied to RGIPT and online product launches",
  keywords: [
    "product engineering studio",
    "RGIPT developers",
    "Next.js product development",
    "AI product engineering",
    "booking SaaS development",
    "web app development",
    "deployment engineering",
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
      role: "Generative AI and applied ML",
      bio: "RGIPT final-year CSE undergrad focused on generative AI, deep learning, and LLM systems, with public work spanning voice agents, multi-agent reasoning, and hosting infrastructure.",
      initials: "DG",
      links: [
        { label: "Portfolio", href: "https://divyansh-675.github.io/" },
        { label: "GitHub", href: "https://github.com/DIVYANSH-675" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/divyansh-gupta-b4396a207/" },
      ],
      proofBullets: [
        "Hostly cloud hosting platform",
        "AuraSpeak voice agent demo",
        "LLM Council multi-agent system",
      ],
      sourceLinks: [
        { label: "GitHub profile README", href: "https://github.com/DIVYANSH-675/DIVYANSH-675" },
        { label: "Hostly README", href: "https://github.com/DIVYANSH-675/Hostly" },
      ],
    },
    {
      name: "Jigyasu Patel",
      role: "Product engineering and SaaS delivery",
      bio: "RGIPT CSE builder with public products across booking, reflective AI, desktop tooling, and goal tracking, plus earlier ML and MERN projects documented in his public CV.",
      initials: "JP",
      links: [
        { label: "Portfolio", href: "https://jigyasu-patel.netlify.app/" },
        { label: "GitHub", href: "https://github.com/jigyasu2004" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/jigyasu-patel-6a90a3257/" },
      ],
      proofBullets: [
        "BookFlow booking SaaS",
        "MeetFuture AI interaction product",
        "IIT Mandi hackathon win and IIT Bombay HERE finalist",
      ],
      sourceLinks: [
        { label: "RGIPT profile", href: "https://rgipt.ac.in/en/page/cse-2022-26" },
        { label: "Public CV", href: "https://drive.google.com/open?id=1kSpK7SyC1_8J7boR3eDswtVWo_YhuxYC" },
      ],
    },
    {
      name: "Nishant Nischal",
      role: "Full-stack, Android, and blockchain",
      bio: "RGIPT CSE student whose public profile ties together full-stack development, Android app development, blockchain, and developer-community involvement.",
      initials: "NN",
      links: [
        { label: "LinkedIn", href: "https://www.linkedin.com/in/nishant-nischal-1ba8481aa/" },
        { label: "Email", href: "mailto:nishantnischal25@gmail.com" },
      ],
      proofBullets: [
        "RGIPT profile lists full-stack development",
        "Android app development and blockchain focus",
      ],
      sourceLinks: [
        { label: "RGIPT profile", href: "https://rgipt.ac.in/en/page/cse-2022-26" },
        { label: "LinkedIn profile", href: "https://www.linkedin.com/in/nishant-nischal-1ba8481aa/" },
      ],
    },
  ] satisfies TeamMember[],
  attribution:
    "Built from the byigitt/portfolio starter. Re-check the starter license before publishing, since the original README said MIT but no license file was detected.",
} as const;

export type SiteNavItem = (typeof siteConfig.nav)[number];
