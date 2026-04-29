import { chromium } from "@playwright/test";

const baseUrl = process.env.SITE_URL ?? "http://localhost:3000";
const expectedContactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "nishantnischal25@gmail.com";

const pages = [
  "/",
  "/work",
  "/work/bookflow",
  "/blog",
  "/blog/bookflow-small-team-booking-stack",
  "/contact",
];

const staleTerms = [
  "Baris",
  "Bayburt",
  "Full Stack Developer",
  "Spotify",
  "github-stars",
  "/projects",
  "/skills",
  "/education",
  "/experience",
  "/achievements",
  "placeholder quote",
  "placeholder proof",
  "book a discovery call",
];

const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
];

const browser = await chromium.launch({ headless: true });
const results = [];

try {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport });

    for (const path of pages) {
      await page.goto(`${baseUrl}${path}`, { waitUntil: "networkidle" });

      const title = await page.title();
      const metaDescription = await page
        .locator('meta[name="description"]')
        .getAttribute("content");
      const bodyText = await page.locator("body").innerText();
      const h1Count = await page.locator("h1").count();
      const missingAlt = await page.locator("img").evaluateAll((images) =>
        images
          .filter((image) => !image.getAttribute("alt"))
          .map((image) => image.getAttribute("src") ?? "unknown"),
      );
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      const staleHits = staleTerms.filter((term) =>
        bodyText.toLowerCase().includes(term.toLowerCase()) ||
        title.toLowerCase().includes(term.toLowerCase()) ||
        metaDescription?.toLowerCase().includes(term.toLowerCase()),
      );

      if (!metaDescription || metaDescription.length < 40) {
        throw new Error(`${viewport.name} ${path}: missing or thin meta description`);
      }

      if (h1Count !== 1) {
        throw new Error(`${viewport.name} ${path}: expected exactly one h1, found ${h1Count}`);
      }

      if (missingAlt.length > 0) {
        throw new Error(`${viewport.name} ${path}: images missing alt text: ${missingAlt.join(", ")}`);
      }

      if (overflow > 2) {
        throw new Error(`${viewport.name} ${path}: horizontal overflow ${overflow}px`);
      }

      if (staleHits.length > 0) {
        throw new Error(`${viewport.name} ${path}: stale template text found: ${staleHits.join(", ")}`);
      }

      results.push(`${viewport.name} ${path}: ok`);
    }

    await page.close();
  }

  const keyboard = await browser.newPage({ viewport: viewports[0] });
  await keyboard.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  await keyboard.keyboard.press("Tab");
  const focused = await keyboard.evaluate(() => {
    const element = document.activeElement;
    return element?.getAttribute("aria-label") || element?.textContent || element?.tagName;
  });

  if (!focused || focused === "BODY") {
    throw new Error("Keyboard focus did not move to an interactive element.");
  }

  await keyboard.close();
  results.push("keyboard focus: ok");

  const mobileNav = await browser.newPage({ viewport: viewports[1] });
  await mobileNav.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  await mobileNav.getByRole("button", { name: /open navigation menu/i }).click();

  const workLinkVisible = await mobileNav
    .getByRole("link", { name: "Work" })
    .isVisible();

  if (!workLinkVisible) {
    throw new Error("Mobile navigation did not reveal the Work link.");
  }

  await mobileNav.close();
  results.push("mobile navigation: ok");

  const blog = await browser.newPage({ viewport: viewports[0] });
  await blog.goto(`${baseUrl}/blog`, { waitUntil: "networkidle" });
  const noteCards = await blog.getByRole("link").filter({ hasText: /BookFlow|MeetFuture/i }).count();

  if (noteCards < 2) {
    throw new Error("Blog page did not expose both source-backed notes.");
  }

  await blog.close();
  results.push("blog count: ok");

  const contact = await browser.newPage({ viewport: viewports[0] });
  await contact.goto(`${baseUrl}/contact`, { waitUntil: "networkidle" });

  const primaryEmailHref = await contact
    .getByRole("link", { name: /email nishant nischal/i })
    .getAttribute("href");

  if (primaryEmailHref !== `mailto:${expectedContactEmail}`) {
    throw new Error(
      `Contact page primary email CTA is not wired to ${expectedContactEmail}.`,
    );
  }

  const allLinks = await contact.locator("a").evaluateAll((anchors) =>
    anchors.map((anchor) => anchor.getAttribute("href") ?? ""),
  );

  if (allLinks.some((href) => href.includes("cal.com"))) {
    throw new Error("Contact page still exposes a calendar placeholder link.");
  }

  await contact.getByLabel("Name").fill("QA Reviewer");
  await contact.getByLabel("Email").fill("qa@example.com");
  await contact.getByLabel("Project type").fill("Website and deployment");
  await contact
    .getByLabel("What are you trying to ship?")
    .fill("Checking the safe mail fallback flow.");

  await contact.getByRole("button", { name: /prepare email draft/i }).click();
  await contact.waitForTimeout(500);

  const statusVisible = await contact
    .getByText("Opening your email app with a draft addressed to Nishant Nischal.")
    .isVisible()
    .catch(() => false);

  if (!statusVisible) {
    throw new Error("Contact mail fallback status did not appear after submit.");
  }

  await contact.close();
  results.push("contact mail fallback: ok");

  console.log(results.join("\n"));
} finally {
  await browser.close();
}
