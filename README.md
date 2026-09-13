# Pranav Labs Website

Official website for Pranav Labs, built with Next.js 15, React 19, TypeScript,
Tailwind CSS v4, shadcn-compatible primitives, Framer Motion, Lucide React, and
Vercel Analytics.

## Commands

```bash
npm run dev
npm run typecheck
npm run lint
npm run build
```

## Architecture

- `app/` contains App Router routes, metadata, sitemap, robots, and layouts.
- `components/layout/` contains shared navigation, footer, logo, and theme UI.
- `components/sections/` contains homepage and reusable page sections.
- `components/ui/` contains shadcn-compatible primitives used across the site.
- `content/` contains structured copy and content data.
- `docs/` remains the source of truth for brand, design, engineering, and product direction.

## Quality Gates

Before release:

- TypeScript must pass.
- ESLint must pass.
- Production build must pass.
- npm audit should report zero known vulnerabilities.
- Desktop and mobile layouts should be checked for overflow, readable text, and usable navigation.

## Deployment

The documented deployment target is Vercel. Use the default Next.js build command:

```bash
npm run build
```

No required private environment variables are needed for the current static
company site.
