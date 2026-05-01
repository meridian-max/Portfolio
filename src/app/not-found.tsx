import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export default function NotFound() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-start justify-center gap-8 py-20">
      <div className="max-w-2xl">
        <p className="section-kicker">
          404
        </p>
        <h1 className="mt-4 text-5xl font-black uppercase leading-none sm:text-6xl">
          This page is not part of the studio map.
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          {siteConfig.name} is focused around home, work, notes, and contact.
          The personal-template routes have been removed.
        </p>
      </div>
      <Button asChild>
        <Link href="/">
          <ArrowLeft data-icon="inline-start" />
          Back home
        </Link>
      </Button>
    </div>
  );
}
