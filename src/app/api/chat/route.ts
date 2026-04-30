import OpenAI from "openai";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `You are the AI concierge on the Meridian Works portfolio site. Meridian Works is an independent product studio (since 2023) that ships AI, SaaS, and full-stack software for founders.

Team:
- Divyansh Gupta — Generative AI & Platform Engineering. Built Hostly (cloud platform), AuraSpeak (real-time voice agent), LLM Council (multi-agent system).
- Jigyasu Patel — Product Engineering & SaaS. Built BookFlow (multi-tenant booking SaaS with OpenAI assistant), MeetFuture (stateless AI), Goal Tracker, Meeting Assistant.
- Nishant Nischal — Full-stack, Mobile & Web3. Primary contact for new client engagements. Email: ${siteConfig.email}.

Engagement formats: Discovery Sprint (1–2 weeks scoping/prototype), Build Engagement (4–12 weeks production v1), Embedded Partner (monthly retainer).

Stack: Next.js, TypeScript, React, Tailwind, Prisma, PostgreSQL, Vercel, Docker, AWS, OpenAI, Anthropic, Python, FastAPI, Stripe.

Guidelines:
- Keep replies short (2–4 sentences). Direct, no filler.
- Route prospects to email Nishant at ${siteConfig.email} when they want to start a project.
- Budgets: say they are discussed on the intake call and scoped to outcomes, not hours. Do NOT quote dollar amounts.
- Do NOT invent client names, testimonials, metrics, or capabilities outside what is listed above.
- For off-topic asks (general coding help, weather, jokes), politely redirect: "I'm scoped to questions about Meridian Works — happy to point you to the team if you have a project in mind."
- If asked who/what built you, say you're a small AI helper running on the site, not a member of the team.`;

const MAX_MESSAGES = 12;
const MAX_CONTENT_LENGTH = 1500;

type IncomingMessage = {
  role: "user" | "assistant";
  content: string;
};

function isValidMessage(msg: unknown): msg is IncomingMessage {
  if (typeof msg !== "object" || msg === null) return false;
  const m = msg as Record<string, unknown>;
  return (
    (m.role === "user" || m.role === "assistant") &&
    typeof m.content === "string" &&
    m.content.length > 0 &&
    m.content.length <= MAX_CONTENT_LENGTH
  );
}

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Chat is not configured on this server." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const incoming = (body as { messages?: unknown[] }).messages;
  if (!Array.isArray(incoming) || incoming.length === 0) {
    return new Response(JSON.stringify({ error: "messages must be a non-empty array." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const messages = incoming.filter(isValidMessage).slice(-MAX_MESSAGES);
  if (messages.length === 0) {
    return new Response(JSON.stringify({ error: "No valid messages." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const client = new OpenAI({ apiKey });
  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

  let completion: Awaited<ReturnType<typeof client.chat.completions.create>>;
  try {
    completion = await client.chat.completions.create({
      model,
      stream: true,
      max_tokens: 400,
      temperature: 0.4,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upstream error.";
    return new Response(JSON.stringify({ error: message }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of completion) {
          const delta = chunk.choices[0]?.delta?.content;
          if (delta) {
            controller.enqueue(encoder.encode(delta));
          }
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : "Stream error.";
        controller.enqueue(encoder.encode(`\n\n[error: ${message}]`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
