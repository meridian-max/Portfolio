"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ExternalLink, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/config/site";

type FormState = {
  name: string;
  email: string;
  project: string;
  message: string;
  botcheck: string;
};

type SubmitState = "idle" | "sending" | "success" | "error";

const initialState: FormState = {
  name: "",
  email: "",
  project: "",
  message: "",
  botcheck: "",
};

const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "500fc247-c97a-4b2e-a097-fc4afb60c469";

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setSubmitState("error");
      setStatusMessage("Add your name, email, and project note before sending.");
      return;
    }

    setSubmitState("sending");
    setStatusMessage("Sending your project note…");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Project inquiry from ${form.name}`,
          from_name: `${siteConfig.name} contact form`,
          name: form.name,
          email: form.email,
          project_type: form.project || "Not specified",
          message: form.message,
          botcheck: form.botcheck,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
      };

      if (response.ok && data.success) {
        setSubmitState("success");
        setStatusMessage(
          `Project note sent. ${siteConfig.primaryContactName} will reply within one business day.`,
        );
        setForm(initialState);
        return;
      }

      throw new Error(data.message ?? `Request failed (${response.status}).`);
    } catch (err) {
      setSubmitState("error");
      const fallback =
        err instanceof Error ? err.message : "Something went wrong while sending.";
      setStatusMessage(`${fallback} You can also email ${siteConfig.email} directly.`);
    }
  }

  return (
    <div>
      <section className="studio-section section-wash section-wash-amber">
        <div className="container relative py-16 text-center">
          <div aria-hidden="true" className="dot-matrix animate-drift absolute right-4 top-12 h-24 w-24 opacity-50" />
          <p className="section-kicker">Let&apos;s talk about ideas</p>
          <h1 className="outline-heading mx-auto mt-5 max-w-5xl text-6xl font-black uppercase leading-none sm:text-7xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">
            Send the outcome, constraints, timeline, and links you already have.
            We reply to every project note within one business day.
          </p>
          <p className="marginalia mt-4">↳ replies within one business day</p>
        </div>
      </section>

      <div className="container py-16">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Email the studio</CardTitle>
              <CardDescription>
                The fastest way to start. Replies within one business day.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Button asChild size="lg">
                <Link href={`mailto:${siteConfig.email}`}>
                  <Mail data-icon="inline-start" />
                  Email {siteConfig.primaryContactName}
                </Link>
              </Button>
              <p className="text-sm leading-6 text-muted-foreground">
                Use this for scope, urgency, tech constraints, stack questions, or whether the
                engagement should be a website, SaaS product, AI flow, automation pass, or platform build.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team</CardTitle>
              <CardDescription>
                The small team you will work with directly.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {siteConfig.team.map((member) => (
                <div key={member.name}>
                  <p className="text-sm font-black text-foreground">{member.name}</p>
                  <div className="mt-2 flex flex-wrap gap-3">
                    {member.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                        rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground underline underline-offset-4"
                      >
                        {link.label}
                        {!link.href.startsWith("mailto:") ? (
                          <ExternalLink className="size-3" aria-hidden="true" />
                        ) : null}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Project brief</CardTitle>
            <CardDescription>
              Fill this in and the note lands in our inbox directly. Reply within one business day.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              {/* Honeypot — hidden from real users, bots tend to fill every field */}
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                checked={Boolean(form.botcheck)}
                onChange={(event) =>
                  updateField("botcheck", event.target.checked ? "true" : "")
                }
                style={{
                  position: "absolute",
                  left: "-9999px",
                  width: 1,
                  height: 1,
                  opacity: 0,
                }}
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium" htmlFor="name">
                  Name
                  <Input
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    placeholder="Your name"
                    disabled={submitState === "sending"}
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium" htmlFor="email">
                  Email
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    placeholder="you@example.com"
                    disabled={submitState === "sending"}
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2 text-sm font-medium" htmlFor="project">
                Project type
                <Input
                  id="project"
                  name="project"
                  value={form.project}
                  onChange={(event) => updateField("project", event.target.value)}
                  placeholder="Website, booking SaaS, AI flow, automation, deployment"
                  disabled={submitState === "sending"}
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium" htmlFor="message">
                What are you trying to ship?
                <Textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  placeholder="Tell us about the outcome, audience, constraints, timeline, and any public proof or links you already have."
                  className="min-h-40 resize-y"
                  disabled={submitState === "sending"}
                />
              </label>

              {statusMessage ? (
                <p
                  aria-live="polite"
                  className={
                    submitState === "success"
                      ? "rounded-xl border-2 border-[hsl(var(--luxury))] bg-[hsl(var(--luxury))]/10 px-4 py-3 text-sm font-bold text-foreground"
                      : submitState === "error"
                        ? "rounded-xl border-2 border-destructive/40 bg-destructive/5 px-4 py-3 text-sm font-bold text-destructive"
                        : "text-sm text-muted-foreground"
                  }
                >
                  {statusMessage}
                </p>
              ) : null}

              <Button
                type="submit"
                className="w-full sm:w-fit"
                disabled={submitState === "sending"}
              >
                <Send data-icon="inline-start" />
                {submitState === "sending"
                  ? "Sending…"
                  : submitState === "success"
                    ? "Sent"
                    : "Send project note"}
              </Button>
            </form>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
}
