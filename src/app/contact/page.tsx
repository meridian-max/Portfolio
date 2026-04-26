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
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site";

type FormState = {
  name: string;
  email: string;
  project: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  project: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<string>("");

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setStatus("Add your name, email, and project note before sending.");
      return;
    }

    const subject = encodeURIComponent(`Project inquiry from ${form.name}`);
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Project type: ${form.project || "Not specified"}`,
        "",
        form.message,
      ].join("\n"),
    );

    setStatus(`Opening your email app with a draft addressed to ${siteConfig.primaryContactName}.`);
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  }

  return (
    <div className="container py-20">
      <div className="mb-14 max-w-3xl">
        <Badge variant="secondary" className="mb-4 rounded-md">
          Contact
        </Badge>
        <h1 className="font-serif text-5xl font-semibold tracking-normal sm:text-6xl">
          Start with the outcome you need to ship.
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          The contact flow is intentionally email-first. The form below prepares a safe mail draft,
          so there is no hidden backend, fake success state, or invented calendar link.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="flex flex-col gap-6">
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle>Email the public contact</CardTitle>
              <CardDescription>
                There is no public studio booking page yet, so the site routes first contact through email.
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
                work should be a website, SaaS product, AI flow, automation pass, or deployment engagement.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-none">
            <CardHeader>
              <CardTitle>Published profiles</CardTitle>
              <CardDescription>
                Public links for the three people behind the portfolio.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {siteConfig.team.map((member) => (
                <div key={member.name}>
                  <p className="text-sm font-medium text-foreground">{member.name}</p>
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

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Project note</CardTitle>
            <CardDescription>
              This opens your email app with the message prefilled. No data is stored.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium" htmlFor="name">
                  Name
                  <Input
                    id="name"
                    name="name"
                    autoComplete="name"
                    required
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    placeholder="Your name"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium" htmlFor="email">
                  Email
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    placeholder="you@example.com"
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
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium" htmlFor="message">
                What are you trying to ship?
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={form.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  placeholder="Tell us about the outcome, audience, constraints, timeline, and any public proof or links you already have."
                  className="min-h-40 resize-y"
                />
              </label>

              {status ? (
                <p className="text-sm text-muted-foreground" aria-live="polite">
                  {status}
                </p>
              ) : null}

              <Button type="submit" className="w-full sm:w-fit">
                <Send data-icon="inline-start" />
                Prepare email draft
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
