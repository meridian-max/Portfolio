"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/ui/logo-mark";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/config/site";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/88 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label={`${siteConfig.name} home`}>
          <LogoMark className="size-9" />
          <span className="hidden font-serif text-xl font-semibold tracking-normal sm:inline">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {siteConfig.nav.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {route.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ModeToggle />
          <Button asChild size="sm">
            <Link href={siteConfig.contactHref}>
              <Mail data-icon="inline-start" />
              Contact
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu aria-hidden="true" />
            </Button>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>{siteConfig.name}</SheetTitle>
                <SheetDescription>
                  Independent product studio — navigation menu.
                </SheetDescription>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-2" aria-label="Mobile navigation">
                {siteConfig.nav.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className="rounded-md px-3 py-3 text-base text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    {route.label}
                  </Link>
                ))}
                <Button asChild className="mt-4">
                  <Link href={siteConfig.contactHref} onClick={() => setIsOpen(false)}>
                    <Mail data-icon="inline-start" />
                    Contact the team
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
