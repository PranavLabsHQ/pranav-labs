# Website Implementation Notes

> Last Updated: September 2026

This document records the first production implementation of the Pranav Labs
website.

## Stack

- Next.js 15 App Router
- React 19
- TypeScript strict mode
- Tailwind CSS v4
- shadcn-compatible UI primitives
- Framer Motion
- Lucide React
- next-themes
- Vercel Analytics

## Implemented Routes

- `/`
- `/about`
- `/services`
- `/work`
- `/products`
- `/open-source`
- `/blog`
- `/contact`
- `/privacy`
- `/terms`
- `/robots.txt`
- `/sitemap.xml`

## Design Direction

The website follows the documented Pranav Labs design system:

- minimal and engineering-first
- calm neutral surfaces
- primary blue as the only strong brand accent
- generous whitespace
- restrained reveal and hover motion
- no particles, parallax, 3D, or decorative noise

## Production Checks

The current implementation should pass:

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npm audit`

Desktop and mobile browser checks should verify:

- no horizontal overflow
- no console errors
- mobile navigation opens
- contact page form labels are accessible
