"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Icon } from "@iconify/react";
import { Send, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const SUGGESTED_PROMPTS = [
  "What kinds of projects do you take on?",
  "How long does a typical Build Engagement take?",
  "Who would I work with day-to-day?",
];

const INITIAL_GREETING: ChatMessage = {
  id: "greet",
  role: "assistant",
  content:
    "Hi — I'm the studio's AI concierge. Ask about engagement formats, the team, our stack, or how to start a project. For anything past a quick scope check, I'll point you to Nishant.",
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
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open chat with the studio AI"
        className="fixed bottom-6 right-6 z-40 flex size-14 items-center justify-center rounded-full bg-foreground text-background shadow-xl ring-1 ring-luxury/30 transition hover:scale-105 hover:shadow-2xl"
      >
        <Icon
          icon="solar:chat-round-dots-bold-duotone"
          className="size-7"
          aria-hidden="true"
        />
        <span className="absolute -top-0.5 -right-0.5 flex size-3.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-luxury opacity-75" />
          <span className="relative inline-flex size-3.5 rounded-full bg-luxury ring-2 ring-background" />
        </span>
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="flex w-full flex-col gap-0 p-0 sm:max-w-md"
        >
          <SheetHeader className="border-b border-border bg-muted/30 px-6 py-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-foreground text-background">
                  <Icon
                    icon="solar:cpu-bolt-bold-duotone"
                    className="size-5 text-luxury"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <SheetTitle className="font-serif text-lg">Ask the studio</SheetTitle>
                  <SheetDescription className="text-xs">
                    AI concierge · scoped to {siteConfig.name}
                  </SheetDescription>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition hover:bg-accent hover:text-foreground"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
          </SheetHeader>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-5">
            <ul className="flex flex-col gap-4">
              {messages.map((msg) => (
                <li
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-6 ${
                      msg.role === "user"
                        ? "bg-foreground text-background"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {msg.content || (streaming ? "…" : "")}
                  </div>
                </li>
              ))}
            </ul>

            {messages.length <= 1 && !streaming ? (
              <div className="mt-6 flex flex-col gap-2">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Try asking
                </p>
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => void send(prompt)}
                    className="rounded-lg border border-border bg-background px-3 py-2 text-left text-sm text-foreground transition hover:border-luxury/40 hover:bg-accent"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            ) : null}

            {error ? (
              <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive">
                {error}
              </p>
            ) : null}
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-border bg-background px-4 py-4"
          >
            <div className="flex items-end gap-2 rounded-2xl border border-border bg-muted/30 px-3 py-2 focus-within:border-luxury/40">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void send(input);
                  }
                }}
                placeholder={streaming ? "Replying…" : "Ask about scope, timing, the team…"}
                rows={1}
                disabled={streaming}
                className="min-h-[2.25rem] flex-1 resize-none bg-transparent text-sm leading-6 text-foreground placeholder:text-muted-foreground/70 focus:outline-none disabled:opacity-60"
              />
              <Button
                type="submit"
                size="icon"
                disabled={streaming || !input.trim()}
                className="size-9 shrink-0 rounded-full"
                aria-label="Send message"
              >
                <Send className="size-4" aria-hidden="true" />
              </Button>
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">
              Powered by AI · for anything serious, email{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="underline underline-offset-2 hover:text-foreground"
              >
                {siteConfig.primaryContactName}
              </a>
              .
            </p>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}
