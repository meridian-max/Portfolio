"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { CaseStudy } from "@/data/case-studies";

const filters = ["All", "AI", "SaaS", "Web app", "Automation", "Desktop"];

gsap.registerPlugin(useGSAP);

export function WorkFilter({ studies }: { studies: CaseStudy[] }) {
  const [active, setActive] = useState("All");
  const gridRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(() => {
    if (active === "All") return studies;
    return studies.filter((study) => {
      const haystack = [
        study.eyebrow,
        study.summary,
        ...study.services,
        ...study.techStack,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(active.toLowerCase());
    });
  }, [active, studies]);

  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;

      const cards = Array.from(grid.querySelectorAll("[data-work-card]"));
      if (!cards.length) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(cards, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          clearProps: "transform,opacity,visibility,willChange",
        });
        return;
      }

      gsap.fromTo(
        cards,
        {
          autoAlpha: 0,
          y: 18,
          scale: 0.985,
          willChange: "transform, opacity",
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.48,
          ease: "power3.out",
          stagger: 0.055,
          overwrite: "auto",
          clearProps: "willChange",
        },
      );
    },
    { dependencies: [active, filtered.length], scope: gridRef, revertOnUpdate: true },
  );

  return (
    <div data-animate="panel">
      <div className="flex flex-wrap justify-center gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            aria-pressed={active === filter}
            className={`rounded-full border-2 border-border px-4 py-2 text-xs font-black uppercase tracking-[0.06em] transition ${
              active === filter
                ? "bg-secondary shadow-[4px_4px_0_hsl(var(--foreground)/0.18)]"
                : "bg-background hover:bg-accent"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div ref={gridRef} className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((study, index) => (
          <Link
            key={study.slug}
            href={`/work/${study.slug}`}
            data-animate="work-card"
            data-work-card=""
            className="group rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Card className="h-full overflow-hidden transition-transform group-hover:-translate-y-1">
              <div className="relative aspect-[16/10] border-b-2 border-border bg-muted">
                <Image
                  src={study.visual.src}
                  alt={study.visual.alt}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge variant="outline">{study.eyebrow}</Badge>
                  <span className="text-xs font-bold text-muted-foreground">
                    {study.proofLevel === "public-repo" ? "Live + repo proof" : "Public site proof"}
                  </span>
                </div>
                <CardTitle className="text-2xl">{study.title}</CardTitle>
                <CardDescription>{study.summary}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  {study.services.slice(0, 4).map((service) => (
                    <Badge key={service} variant="secondary">
                      {service}
                    </Badge>
                  ))}
                </div>
                <span className="inline-flex w-fit items-center gap-2 text-sm font-black uppercase tracking-[0.04em] underline underline-offset-4">
                  See project
                  <ExternalLink className="size-4" aria-hidden="true" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
