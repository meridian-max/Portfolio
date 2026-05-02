"use client";

import { type ReactNode, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const motionQueries = {
  reduce: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 1024px)",
  mobile: "(max-width: 767px)",
};

type MotionConditions = {
  reduce?: boolean;
  desktop?: boolean;
  mobile?: boolean;
};

type ScopedSelector = ReturnType<typeof gsap.utils.selector>;

function toElements(select: ScopedSelector, selector: string) {
  return select(selector) as Element[];
}

function showImmediately(targets: Element[]) {
  gsap.set(targets, {
    autoAlpha: 1,
    x: 0,
    y: 0,
    scale: 1,
    clearProps: "transform,opacity,visibility,willChange",
  });
}

function batchReveal(targets: Element[], options: { y?: number; x?: number; scale?: number; desktop?: boolean }) {
  if (!targets.length) return;

  gsap.set(targets, {
    autoAlpha: 0,
    x: options.x ?? 0,
    y: options.y ?? 24,
    scale: options.scale ?? 1,
    willChange: "transform, opacity",
  });

  ScrollTrigger.batch(targets, {
    start: "top 88%",
    once: true,
    interval: 0.08,
    batchMax: options.desktop ? 5 : 3,
    onEnter: (batch) => {
      gsap.to(batch, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.72,
        ease: "power3.out",
        stagger: 0.08,
        overwrite: "auto",
        clearProps: "willChange",
      });
    },
  });
}

function setupHero(select: ScopedSelector, desktop = false) {
  const heroKicker = toElements(select, '[data-animate="hero-kicker"]');
  const heroTitle = toElements(select, '[data-animate="hero-title"]');
  const heroSubtitle = toElements(select, '[data-animate="hero-subtitle"]');
  const heroBody = toElements(select, '[data-animate="hero-copy"]');
  const heroActions = toElements(select, '[data-animate="hero-actions"]');
  const heroCopy = toElements(
    select,
    [
      '[data-animate="hero-kicker"]',
      '[data-animate="hero-title"]',
      '[data-animate="hero-subtitle"]',
      '[data-animate="hero-copy"]',
      '[data-animate="hero-actions"]',
    ].join(","),
  );
  const heroMetrics = toElements(select, '[data-animate="hero-metric"]');
  const heroStatus = toElements(select, '[data-animate="hero-status"]');
  const heroOrbit = toElements(select, '[data-animate="hero-orbit"]');
  const heroShots = toElements(select, '[data-animate="hero-shot"]');
  const heroOrbs = toElements(select, '[data-animate="hero-orb"]');

  if (!heroCopy.length && !heroOrbit.length) return;

  gsap.set(heroCopy, { autoAlpha: 0, y: 22, willChange: "transform, opacity" });
  gsap.set(heroMetrics, { autoAlpha: 0, y: 16, scale: 0.96, willChange: "transform, opacity" });
  gsap.set(heroStatus, { autoAlpha: 0, x: desktop ? 18 : 0, y: desktop ? 0 : 10, willChange: "transform, opacity" });
  gsap.set(heroOrbit, {
    autoAlpha: 0,
    scale: desktop ? 0.9 : 0.94,
    rotation: desktop ? -3 : 0,
    willChange: "transform, opacity",
  });
  gsap.set(heroShots, {
    autoAlpha: 0,
    y: desktop ? 28 : 18,
    scale: 0.94,
    willChange: "transform, opacity",
  });
  gsap.set(heroOrbs, {
    autoAlpha: 0,
    scale: 0.82,
    willChange: "transform, opacity",
  });

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.to(heroKicker, { autoAlpha: 1, y: 0, duration: 0.42 })
    .to(heroTitle, { autoAlpha: 1, y: 0, duration: 0.72 }, "-=0.2")
    .to(heroSubtitle, { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.38")
    .to(heroBody, { autoAlpha: 1, y: 0, duration: 0.62 }, "-=0.3")
    .to(heroOrbit, { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.86, ease: "back.out(1.25)" }, 0.18)
    .to(heroOrbs, { autoAlpha: 1, scale: 1, duration: 0.68, stagger: 0.08 }, 0.26)
    .to(heroShots, { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.09 }, 0.42)
    .to(heroMetrics, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.05 }, "-=0.34")
    .to(heroActions, { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.24")
    .to(heroStatus, { autoAlpha: 1, x: 0, y: 0, duration: 0.45, stagger: 0.07 }, "-=0.42")
    .set([...heroCopy, ...heroMetrics, ...heroStatus, ...heroOrbit, ...heroShots, ...heroOrbs], {
      clearProps: "willChange",
    });
}

function setupMarquees(select: ScopedSelector) {
  const marquees = toElements(select, '[data-animate="marquee"]') as HTMLElement[];

  return marquees.map((marquee) => {
    const tween = gsap.to(marquee, {
      xPercent: -50,
      duration: 26,
      ease: "none",
      repeat: -1,
      overwrite: "auto",
    });
    const parent = marquee.parentElement;
    const pause = () => tween.pause();
    const play = () => tween.play();

    parent?.addEventListener("mouseenter", pause);
    parent?.addEventListener("mouseleave", play);
    parent?.addEventListener("focusin", pause);
    parent?.addEventListener("focusout", play);

    return () => {
      parent?.removeEventListener("mouseenter", pause);
      parent?.removeEventListener("mouseleave", play);
      parent?.removeEventListener("focusin", pause);
      parent?.removeEventListener("focusout", play);
      tween.kill();
    };
  });
}

export function SiteMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const select = gsap.utils.selector(root);
      const allTargets = toElements(select, "[data-animate]");
      if (!allTargets.length) return;

      const mm = gsap.matchMedia();

      mm.add(motionQueries, (context) => {
        const { reduce, desktop } = (context.conditions ?? {}) as MotionConditions;

        if (reduce) {
          showImmediately(allTargets);
          return;
        }

        gsap.defaults({ duration: 0.6, ease: "power3.out" });
        setupHero(select, desktop);
        batchReveal(toElements(select, '[data-animate="section"]'), { y: 28, desktop });
        batchReveal(toElements(select, '[data-animate="card"]'), { y: 24, scale: 0.985, desktop });
        batchReveal(toElements(select, '[data-animate="panel"]'), { y: 26, scale: 0.985, desktop });
        batchReveal(toElements(select, '[data-animate="image-panel"]'), { y: 22, scale: 0.975, desktop });
        batchReveal(toElements(select, '[data-animate="cta"]'), { y: 24, scale: 0.98, desktop });

        const marqueeCleanups = setupMarquees(select);
        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh, { once: true });

        return () => {
          window.removeEventListener("load", refresh);
          marqueeCleanups.forEach((cleanup) => cleanup());
        };
      });

      return () => mm.revert();
    },
    { dependencies: [pathname], scope: rootRef, revertOnUpdate: true },
  );

  return (
    <div ref={rootRef} data-gsap-root="">
      {children}
    </div>
  );
}
