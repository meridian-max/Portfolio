# Meridian Works Portfolio

Premium portfolio website for a three-person product engineering studio offering websites, ML systems, web apps, software, automation, and deployment.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- MDX
- Framer Motion

## Local Development

```bash
pnpm install
pnpm dev
```

Useful checks:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Content To Replace Before Launch

- Studio name, booking URL, email, socials, and team bios in `src/config/site.ts`
- Case-study proof, screenshots, results, and client quotes in `src/data/case-studies.ts`
- Metadata base URL via `NEXT_PUBLIC_BASE_URL`
- Booking link via `NEXT_PUBLIC_BOOKING_URL`
- Contact email via `NEXT_PUBLIC_CONTACT_EMAIL`

## Attribution

This implementation was built from the `byigitt/portfolio` starter. The starter README stated MIT usage, but GitHub did not detect a license file when the project was downloaded, so re-check licensing before public launch.
