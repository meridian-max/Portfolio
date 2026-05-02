"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUp } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { LogoMark } from "@/components/ui/logo-mark";
import { siteConfig } from "@/config/site";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const SUGGESTED_PROMPTS = [
  { n: "01", text: "What kinds of projects do you take on?" },
  { n: "02", text: "How does a Build Engagement work?" },
  { n: "03", text: "What's your stack and where are you strongest?" },
  { n: "04", text: "What won't you take on?" },
];

const INITIAL_GREETING: ChatMessage = {
  id: "greet",
  role: "assistant",
  content:
    "You're at the intake desk. Ask about engagement formats, the team, our stack, or how to start. For anything load-bearing, I'll point you to Nishant — replies in two business days.",
};

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING]);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, streaming]);

  async function send(prompt: string) {
    const trimmed = prompt.trim();
    if (!trimmed || streaming) return;

    const userMsg: ChatMessage = {
      id: generateId(),
      role: "user",
      content: trimmed,
    };
    const assistantId = generateId();
    const next = [...messages, userMsg];

    setMessages([...next, { id: assistantId, role: "assistant", content: "" }]);
    setInput("");
    setError(null);
    setStreaming(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({ error: "Request failed." }));
        throw new Error(errBody.error ?? `Request failed (${response.status}).`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No stream returned.");
      const decoder = new TextDecoder();
      let acc = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((current) =>
          current.map((m) => (m.id === assistantId ? { ...m, content: acc } : m)),
        );
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : "Something went wrong.";
      setError(message);
      setMessages((current) => current.filter((m) => m.id !== assistantId));
    } finally {
      setStreaming(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void send(input);
  }

  return (
    <>
      {/* Trigger — studio plaque, not a generic helpdesk circle */}
      <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3">
        <span
          aria-hidden="true"
          className="hidden font-accent text-xl font-bold leading-tight text-foreground/70 sm:block sm:max-w-[10rem] sm:translate-y-1 sm:text-right"
        >
          ↳ a real reply within
          <br />
          two business days
        </span>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open studio intake desk"
          className="group relative inline-flex items-center gap-2.5 rounded-2xl border-2 border-border bg-background px-4 py-3 text-sm font-black uppercase tracking-[0.08em] text-foreground shadow-[5px_5px_0_hsl(var(--foreground)/0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_hsl(var(--foreground)/0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <LogoMark className="size-6" />
          <span className="leading-none">Ask the studio</span>
          <span className="relative ml-0.5 flex size-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--luxury))] opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-[hsl(var(--luxury))]" />
          </span>
        </button>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="section-wash section-wash-amber flex w-full flex-col gap-0 border-l-2 border-border bg-background p-0 sm:max-w-md"
        >
          {/* Header — editorial intake desk */}
          <SheetHeader className="relative overflow-hidden border-b-2 border-border bg-card px-6 py-6">
            <div
              aria-hidden="true"
              className="dot-matrix animate-drift pointer-events-none absolute -right-3 -top-3 h-24 w-24 opacity-40"
            />
            <div className="relative flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-2xl border-2 border-border bg-background">
                <LogoMark className="size-7" />
              </div>
              <div>
                <SheetTitle className="outline-heading text-2xl font-black uppercase leading-none">
                  Intake desk
                </SheetTitle>
                <SheetDescription className="font-accent mt-1 text-lg font-bold leading-none text-foreground/70">
                  scoped to {siteConfig.name}
                </SheetDescription>
              </div>
            </div>
            <div className="relative mt-4 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.12em] text-foreground/70">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--luxury))] opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-[hsl(var(--luxury))]" />
              </span>
              <span>{streaming ? "Composing reply…" : "Live · staffed by AI + humans"}</span>
            </div>
          </SheetHeader>

          {/* Conversation */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6">
            <ul className="flex flex-col gap-5">
              {messages.map((msg) => (
                <li
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" ? (
                    <div className="flex max-w-[88%] gap-2">
                      <span
                        aria-hidden="true"
                        className="select-none pt-1 text-xl font-black leading-none text-[hsl(var(--luxury))]"
                      >
                        ↳
                      </span>
                      <div className="whitespace-pre-wrap rounded-2xl rounded-tl-sm border-2 border-border bg-card px-4 py-3 text-sm leading-6 text-foreground">
                        {msg.content || (streaming ? <BlinkCaret /> : "")}
                      </div>
                    </div>
                  ) : (
                    <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tr-sm border-2 border-border bg-[hsl(var(--luxury))] px-4 py-3 text-sm font-bold leading-6 text-foreground shadow-[3px_3px_0_hsl(var(--foreground)/0.18)]">
                      {msg.content}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {messages.length <= 1 && !streaming ? (
              <div className="mt-8">
                <p className="section-kicker">Try asking</p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <li key={prompt.n}>
                      <button
                        type="button"
                        onClick={() => void send(prompt.text)}
                        className="group flex w-full items-start gap-3 rounded-xl border-2 border-border bg-background px-3.5 py-3 text-left shadow-[3px_3px_0_hsl(var(--foreground)/0.14)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_hsl(var(--foreground)/0.18)]"
                      >
                        <span className="font-accent text-2xl font-bold leading-none text-[hsl(var(--luxury))]">
                          {prompt.n}
                        </span>
                        <span className="text-sm font-bold leading-6 text-foreground">
                          {prompt.text}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {error ? (
              <p className="mt-4 rounded-xl border-2 border-destructive/40 bg-destructive/5 px-3 py-2 text-xs font-bold text-destructive">
                {error}
              </p>
            ) : null}
          </div>

          {/* Composer */}
          <form
            onSubmit={handleSubmit}
            className="border-t-2 border-border bg-background px-4 py-4"
          >
            <div className="flex items-end gap-2 rounded-2xl border-2 border-border bg-card p-2 shadow-[4px_4px_0_hsl(var(--foreground)/0.16)] focus-within:border-[hsl(var(--luxury))]">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void send(input);
                  }
                }}
                placeholder={streaming ? "Composing reply…" : "Tell us what you're shipping…"}
                rows={1}
                disabled={streaming}
                className="min-h-[2.5rem] flex-1 resize-none bg-transparent px-2 py-1 text-sm leading-6 text-foreground placeholder:text-muted-foreground/70 focus:outline-none disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={streaming || !input.trim()}
                aria-label="Send message"
                className="flex size-10 shrink-0 items-center justify-center rounded-xl border-2 border-border bg-foreground text-background shadow-[3px_3px_0_hsl(var(--luxury))] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:translate-y-0"
              >
                <ArrowUp className="size-4" aria-hidden="true" />
              </button>
            </div>
            <p className="font-accent mt-3 text-base font-bold leading-tight text-foreground/70">
              Built by {siteConfig.name} · for anything load-bearing, email{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-[hsl(var(--luxury))] underline decoration-2 underline-offset-4 hover:text-foreground"
              >
                {siteConfig.primaryContactName}
              </a>{" "}
              directly.
            </p>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}

function BlinkCaret() {
  return (
    <span
      aria-hidden="true"
      className="inline-block animate-pulse text-[hsl(var(--luxury))]"
    >
      ▍
    </span>
  );
}
