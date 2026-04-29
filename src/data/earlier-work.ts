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
    title: "Hostly",
    eyebrow: "Production cloud platform",
    contributor: "Divyansh Gupta",
    summary:
      "A self-hosted, GitHub-connected cloud platform with one-click deployments, automatic builds, custom subdomains, and live build logs — shipped end to end across web app, builder service, and router.",
    techStack: ["Next.js", "tRPC", "Drizzle ORM", "Postgres", "Redis", "AWS S3", "Docker", "Hono"],
    evidenceNote:
      "Architecture is documented across three services with full source available — the kind of platform work clients typically outsource to a much larger team.",
    links: [
      { label: "GitHub repo", href: "https://github.com/DIVYANSH-675/Hostly" },
      { label: "Live demo", href: "http://44.212.3.234/" },
    ],
  },
  {
    title: "AuraSpeak",
    eyebrow: "Real-time voice agent",
    contributor: "Divyansh Gupta",
    summary:
      "An API-first voice agent built for real-time conversational interaction. WebSocket transport, streaming STT and TTS, and a hosted browser demo running in production today.",
    techStack: ["FastAPI", "WebSockets", "Deepgram", "OpenAI", "Groq", "JavaScript"],
    evidenceNote:
      "Public live demo, full repo, and a frontend-backend-launch architecture that mirrors what we ship to clients shipping voice products.",
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
      "A multi-agent decision system where specialized agents, judges, and a synthesis pass cooperate to answer prompts. Ships with a built-in safety gate and an audit pipeline for evaluation.",
    techStack: ["Python", "Gradio", "YAML config", "GPT-4o", "Claude"],
    evidenceNote:
      "The MALT pipeline, agent roles, safety gate, and audit flow are documented and reproducible — production patterns we reuse on client AI work.",
    links: [
      { label: "GitHub repo", href: "https://github.com/DIVYANSH-675/LLM-Council" },
    ],
  },
];
