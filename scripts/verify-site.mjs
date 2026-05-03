import { chromium } from "@playwright/test";

const baseUrl = process.env.SITE_URL ?? "http://localhost:3000";
const expectedContactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@greedup.com";
const expectedGmailComposeHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  expectedContactEmail,
)}`;

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

const desktopViewport = { name: "desktop", width: 1440, height: 1000 };
const mobileViewport = { name: "mobile", width: 390, height: 844 };

const viewports = [
  desktopViewport,
  mobileViewport,
  { name: "tablet", width: 768, height: 1024 },
  { name: "small-laptop", width: 1024, height: 768 },
  { name: "short-laptop", width: 1280, height: 720 },
  { name: "laptop", width: 1366, height: 768 },
  { name: "wide-desktop", width: 1536, height: 864 },
  { name: "full-hd", width: 1920, height: 1080 },
];

const browser = await chromium.launch({ headless: true });
const results = [];

try {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport });

    for (const path of pages) {
      await page.goto(`${baseUrl}${path}`, { waitUntil: "domcontentloaded" });
      await page.locator("body").waitFor({ state: "attached" });
      try {
        await page.waitForFunction(
          () => Boolean(document.querySelector('meta[name="description"]')?.getAttribute("content")),
          undefined,
          { timeout: 10_000 },
        );
      } catch {
        throw new Error(`${viewport.name} ${path}: meta description did not render`);
      }

      const title = await page.title();
      const metaDescription = await page.evaluate(
        () => document.querySelector('meta[name="description"]')?.getAttribute("content") ?? null,
      );
      const bodyText = await page.locator("body").innerText();
      const h1Count = await page.locator("h1").count();
      const missingAlt = await page.locator("img").evaluateAll((images) =>
        images
          .filter((image) => image.getAttribute("alt") === null)
          .map((image) => image.getAttribute("src") ?? "unknown"),
      );
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      const clippedText = await page.evaluate(() => {
        const selectors = "h1,h2,h3,p,a,button,span,li,label,textarea,input";

        return [...document.querySelectorAll(selectors)]
          .filter((element) => {
            if (element.closest(".sr-only") || element.closest("[aria-hidden='true']")) {
              return false;
            }

            const rect = element.getBoundingClientRect();
            const style = window.getComputedStyle(element);
            const text = (
              element.textContent ||
              element.getAttribute("placeholder") ||
              element.getAttribute("aria-label") ||
              ""
            )
              .trim()
              .replace(/\s+/g, " ");

            if (!text || rect.width <= 2 || rect.height <= 2) return false;
            if (style.visibility === "hidden" || style.display === "none") return false;

            const clips = [style.overflow, style.overflowX, style.overflowY].some((value) =>
              ["hidden", "clip", "auto", "scroll"].includes(value),
            );

            return (
              clips &&
              (element.scrollWidth > element.clientWidth + 2 ||
                element.scrollHeight > element.clientHeight + 2)
            );
          })
          .slice(0, 5)
          .map((element) =>
            (
              element.textContent ||
              element.getAttribute("placeholder") ||
              element.getAttribute("aria-label") ||
              ""
            )
              .trim()
              .replace(/\s+/g, " ")
              .slice(0, 80),
          );
      });
      const heroChatOverlap =
        path === "/"
          ? await page.evaluate(() => {
              const chat = document.querySelector("[data-chat-trigger='studio-intake']");
              const visual = document.querySelector("[data-hero-visual='product-orbit']");

              if (!chat || !visual) return 0;

              const a = chat.getBoundingClientRect();
              const b = visual.getBoundingClientRect();
              const width = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
              const height = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));

              return Math.round(width * height);
            })
          : 0;
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

      if (clippedText.length > 0) {
        throw new Error(
          `${viewport.name} ${path}: clipped visible text found: ${clippedText.join(" | ")}`,
        );
      }

      if (heroChatOverlap > 0) {
        throw new Error(
          `${viewport.name} ${path}: chat trigger overlaps hero visual by ${heroChatOverlap}px²`,
        );
      }

      if (staleHits.length > 0) {
        throw new Error(`${viewport.name} ${path}: stale template text found: ${staleHits.join(", ")}`);
      }

      results.push(`${viewport.name} ${path}: ok`);
    }

    await page.close();
  }

  const keyboard = await browser.newPage({ viewport: desktopViewport });
  await keyboard.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
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

  const mobileNav = await browser.newPage({ viewport: mobileViewport });
  await mobileNav.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
  await mobileNav.getByRole("button", { name: /open navigation menu/i }).click();

  const workLinkVisible = await mobileNav
    .getByRole("link", { name: "Work", exact: true })
    .isVisible();

  if (!workLinkVisible) {
    throw new Error("Mobile navigation did not reveal the Work link.");
  }

  await mobileNav.close();
  results.push("mobile navigation: ok");

  const blog = await browser.newPage({ viewport: desktopViewport });
  await blog.goto(`${baseUrl}/blog`, { waitUntil: "domcontentloaded" });
  const noteCards = await blog.getByRole("link").filter({ hasText: /BookFlow|MeetFuture/i }).count();

  if (noteCards < 2) {
    throw new Error("Blog page did not expose both source-backed notes.");
  }

  await blog.close();
  results.push("blog count: ok");

  const contact = await browser.newPage({ viewport: desktopViewport });
  await contact.route("https://api.web3forms.com/submit", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    });
  });
  await contact.goto(`${baseUrl}/contact`, { waitUntil: "domcontentloaded" });
  await contact.waitForLoadState("load");
  await contact.waitForTimeout(750);

  const primaryEmailHref = await contact
    .getByRole("link", { name: /email nishant nischal/i })
    .getAttribute("href");

  if (primaryEmailHref !== expectedGmailComposeHref) {
    throw new Error(
      `Contact page primary email CTA is not wired to Gmail compose for ${expectedContactEmail}.`,
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

  await contact.getByRole("button", { name: /send project note/i }).click();

  const statusVisible = await contact
    .getByText(/project note sent/i)
    .isVisible()
    .catch(() => false);

  if (!statusVisible) {
    throw new Error("Contact project brief success status did not appear after submit.");
  }

  await contact.close();
  results.push("contact project brief: ok");

  console.log(results.join("\n"));
} finally {
  await browser.close();
}
