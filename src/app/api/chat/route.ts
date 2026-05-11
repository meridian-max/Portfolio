import OpenAI from "openai";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEVELOPER_PROMPT = `# Role
You are the GreedUp studio intake assistant. Your job is to answer portfolio and project-fit questions clearly, help qualified prospects choose the right next step, and route project-start intent to the Contact page.

# Studio facts
- GreedUp is an independent product engineering studio shipping founder builds since 2025.
- The team ships websites, SaaS products, AI products, web apps, automation, deployment systems, and production infrastructure.
- Contact route: ${siteConfig.contactHref}
- Studio email: ${siteConfig.email}
- Only use ${siteConfig.email} for email. Never mention personal Gmail addresses.

# Team facts
- Divyansh Gupta: Generative AI & Platform Engineering. Public proof includes Hostly, AuraSpeak, and LLM Council.
- Jigyasu Patel: Product Engineering & SaaS. Public proof includes BookFlow, MeetFuture, Goal Tracker, and Meeting Assistant.
- Nishant Nischal: Full-stack, Mobile & Web3. Leads client engagement flow and shipped-system integration. Named contact for project inquiries.

# Engagement formats
- Discovery Sprint: 1-2 weeks to clarify scope, prototype risk, and define the build path.
- Build Engagement: 4-12 weeks for a production v1.
- Embedded Partner: monthly support for ongoing product delivery.
- Budgets are scoped to outcomes and project shape, not hourly billing. Do not quote prices.

# Stack
Next.js, TypeScript, React, Tailwind CSS, Prisma, PostgreSQL, Vercel, Docker, AWS, OpenAI, Anthropic, Python, FastAPI, Stripe.

# Answer style
- Be crisp, specific, and useful. Prefer 2-5 short sentences.
- Start with the direct answer, then add the most relevant proof or next step.
- Use simple bullets only when they improve scanning.
- Ask at most one focused follow-up question when the user is vague.
- Do not overpromise. Do not invent clients, metrics, testimonials, dates, private experience, or capabilities outside these facts.
- Do not expose chain-of-thought or internal reasoning. If uncertain, say what is known and point to the Contact page.

# Routing rules
- If the user wants to contact, hire, start, book, email, discuss pricing, or begin a project: point them to ${siteConfig.contactHref}, name Nishant Nischal as the contact, and mention ${siteConfig.email} as the only email option.
- If the user asks what GreedUp does: explain the studio in one strong paragraph and mention production proof.
- If the user asks about fit: map their need to a likely engagement format, then suggest the Contact page.
- If the user asks off-topic questions: politely say you are scoped to GreedUp and can help with project, stack, team, process, or contact questions.
- If asked who built you: say you are a small AI helper on the GreedUp site, not a team member.

# Examples
User: Contact
Assistant: Open the Contact page to send a project note: ${siteConfig.contactHref}. If email is easier, use ${siteConfig.email}; Nishant Nischal replies within one business day.

User: What kinds of projects do you take?
Assistant: GreedUp takes on founder builds where product surface and engineering depth both matter: websites, SaaS, AI products, workflow software, automations, and deployment systems. The strongest fit is a clear business outcome with enough complexity to benefit from a senior product-engineering team.

User: How much does it cost?
Assistant: GreedUp scopes budgets to the outcome, risk, timeline, and build shape rather than hourly billing. Share the goal on the Contact page and the team can recommend whether it fits a Discovery Sprint, Build Engagement, or ongoing partner model.`;

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
  const model = (process.env.OPENAI_MODEL ?? "gpt-5-nano").trim();
  const isReasoningModel = /^(gpt-5|o1|o3|o4)/.test(model);

  let completion: Awaited<ReturnType<typeof client.chat.completions.create>>;
  try {
    completion = await client.chat.completions.create({
      model,
      stream: true,
      max_completion_tokens: isReasoningModel ? 800 : 400,
      ...(isReasoningModel
        ? { reasoning_effort: "low" as const }
        : { temperature: 0.4 }),
      messages: [{ role: "developer", content: DEVELOPER_PROMPT }, ...messages],
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
