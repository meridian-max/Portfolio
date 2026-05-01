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
    <div>
      <section className="studio-section">
        <div className="container relative py-16 text-center">
          <div aria-hidden="true" className="dot-matrix absolute right-4 top-12 h-24 w-24 opacity-50" />
          <p className="section-kicker">Let&apos;s talk about ideas</p>
          <h1 className="outline-heading mx-auto mt-5 max-w-5xl text-6xl font-black uppercase leading-none sm:text-7xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">
            Send the outcome, constraints, timeline, and links you already have.
            We reply to every project note within two business days.
          </p>
        </div>
      </section>

      <div className="container py-16">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Email the studio</CardTitle>
              <CardDescription>
                The fastest way to start. Replies within two business days.
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
                The three people you will work with directly.
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
              Fill this in and we will open your email app with a prefilled draft. No data is stored.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
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
    </div>
  );
}
