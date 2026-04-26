import type { SiteLink } from "@/config/site";

export type EarlierWorkItem = {
  title: string;
  eyebrow: string;
  contributor: string;
  summary: string;
  techStack: string[];
  evidenceNote: string;
  links: SiteLink[];
};

export const earlierWorkItems: EarlierWorkItem[] = [
  {
    title: "Doctor ROBO",
    eyebrow: "Medical kiosk app",
    contributor: "Jigyasu Patel",
    summary:
      "A symptom-led Android medical kiosk where Jigyasu's public CV says he built the ML model and integrated the Python model into the app through an API.",
    techStack: ["Python", "ML", "API integration", "Android"],
    evidenceNote:
      "The project description and Jigyasu's role are stated in his public CV PDF.",
    links: [
      { label: "Public CV", href: "https://drive.google.com/open?id=1kSpK7SyC1_8J7boR3eDswtVWo_YhuxYC" },
    ],
  },
  {
    title: "e-Librarian",
    eyebrow: "MERN college project",
    contributor: "Jigyasu Patel",
    summary:
      "A library management system built as a college project, described in Jigyasu's public CV as a full MERN-stack application.",
    techStack: ["MongoDB", "Express", "React", "Node.js"],
    evidenceNote:
      "The public CV names the project and stack, but does not publish deeper implementation notes.",
    links: [
      { label: "Public CV", href: "https://drive.google.com/open?id=1kSpK7SyC1_8J7boR3eDswtVWo_YhuxYC" },
    ],
  },
  {
    title: "School Website",
    eyebrow: "Small-site build",
    contributor: "Jigyasu Patel",
    summary:
      "A dynamic website for a primary school, listed in Jigyasu's public CV as a MERN-stack build.",
    techStack: ["MongoDB", "Express", "React", "Node.js"],
    evidenceNote:
      "The public CV confirms the project and stack, which is why it appears here as earlier work rather than a detailed case study.",
    links: [
      { label: "Public CV", href: "https://drive.google.com/open?id=1kSpK7SyC1_8J7boR3eDswtVWo_YhuxYC" },
    ],
  },
  {
    title: "Federated Learning",
    eyebrow: "Earlier ML work",
    contributor: "Jigyasu Patel",
    summary:
      "Listed as an earlier project in Jigyasu's public CV, without a longer published writeup.",
    techStack: ["Machine Learning"],
    evidenceNote:
      "Included because it is publicly listed, but the current source does not expose enough detail for a full case study.",
    links: [
      { label: "Public CV", href: "https://drive.google.com/open?id=1kSpK7SyC1_8J7boR3eDswtVWo_YhuxYC" },
    ],
  },
  {
    title: "Hostly",
    eyebrow: "Cloud hosting platform",
    contributor: "Divyansh Gupta",
    summary:
      "A GitHub-connected cloud hosting platform with one-click deployments, automatic builds, custom subdomains, and live build logs.",
    techStack: ["Next.js", "tRPC", "Drizzle ORM", "Postgres", "Redis", "AWS S3", "Docker", "Hono"],
    evidenceNote:
      "The public README documents the architecture across the web app, builder service, and router.",
    links: [
      { label: "GitHub repo", href: "https://github.com/DIVYANSH-675/Hostly" },
      { label: "Live demo", href: "http://44.212.3.234/" },
    ],
  },
  {
    title: "AuraSpeak",
    eyebrow: "Voice agent demo",
    contributor: "Divyansh Gupta",
    summary:
      "An API-first voice agent demo built for real-time interaction, with a browser demo and a public FastAPI and WebSocket code path.",
    techStack: ["FastAPI", "WebSockets", "Deepgram", "OpenAI", "Groq", "JavaScript"],
    evidenceNote:
      "The public README describes the frontend, backend, and launch scripts, and links to a live browser demo.",
    links: [
      { label: "GitHub repo", href: "https://github.com/DIVYANSH-675/Auraspeak" },
      { label: "Live demo", href: "https://divyansh675-auraspeak.hf.space/" },
    ],
  },
  {
    title: "LLM Council",
    eyebrow: "Multi-agent AI system",
    contributor: "Divyansh Gupta",
    summary:
      "A multi-agent decision system where specialized agents, judges, and a synthesis pass work together to answer prompts with a public safety and evaluation pipeline.",
    techStack: ["Python", "Gradio", "YAML config", "GPT-4o", "Claude"],
    evidenceNote:
      "The public README lays out the MALT pipeline, agent roles, safety gate, and audit flow in detail.",
    links: [
      { label: "GitHub repo", href: "https://github.com/DIVYANSH-675/LLM-Council" },
    ],
  },
];
