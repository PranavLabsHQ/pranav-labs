# Pranav Labs Design Refinement Report

> Date: 13 September 2026

## Scope

This pass refined the existing website. It did not redesign the layout or change
the overall page structure.

## Findings and Fixes

### 1. Brand identity mismatch

What felt weak:

The site was still using a placeholder icon that did not match the supplied
Pranav Labs logo system.

Why it felt weak:

The first thing visitors see is the mark in the navbar. A mismatched mark makes
the company feel less established and weakens brand trust.

How it was improved:

- Extracted production-ready transparent and app-icon PNG assets from the
  official attached mark.
- Updated the navbar logo to use the official brand mark.
- Updated favicon, Apple icon, Open Graph image, and web app manifest to use the
  same identity.

### 2. Navbar balance and logo clear space

What felt weak:

The original navbar mark sat inside a square icon treatment, which made the logo
feel like a generic app tile rather than a brand system.

Why it felt weak:

The supplied logo uses generous clear space and a light, precise mark. The
header needed to respect that spacing.

How it was improved:

- Increased navbar height slightly.
- Removed the square icon container in favor of the official transparent mark.
- Tuned logo size, wordmark spacing, nav link spacing, and header blur.

### 3. Component weight felt too uniform

What felt weak:

Cards, badges, buttons, and pills had similar visual emphasis across sections.

Why it felt weak:

Premium software sites use subtle hierarchy. When every surface has the same
weight, the page feels generated rather than directed.

How it was improved:

- Normalized radius from large rounded corners to a tighter design-system radius.
- Reduced grid/background intensity.
- Tuned card hover, button shadow, badge size, and pill treatment.
- Made cards feel quieter while preserving interaction feedback.

### 4. Copy was clear but slightly generic

What felt weak:

Some phrases sounded like general SaaS marketing instead of an engineering
company speaking precisely.

Why it felt weak:

Pranav Labs should communicate engineering, reliability, and long-term thinking
without buzzwords.

How it was improved:

- Replaced "modern software" in key brand copy with clearer categories such as
  business software and future software infrastructure.
- Tightened service descriptions and project descriptions.
- Made hero copy more direct and systems-focused.

### 5. Mobile rhythm needed tightening

What felt weak:

The first version had a strong mobile layout, but the hero spacing and controls
felt a little oversized.

Why it felt weak:

On mobile, oversized spacing delays the reader from understanding what the
company does.

How it was improved:

- Reduced hero vertical spacing on small screens.
- Improved type tracking and balanced headings.
- Kept CTAs large enough for touch without making them feel inflated.

### 6. Motion needed a softer finish

What felt weak:

Reveal motion was functional, but it did not yet feel as refined as the visual
system.

Why it felt weak:

Motion should guide attention without drawing attention to itself.

How it was improved:

- Updated reveal easing to a softer curve.
- Added a subtle blur-to-clear transition.
- Kept animation duration under the design-system limit.

### 7. SEO and metadata needed brand depth

What felt weak:

The first version had metadata, robots, and sitemap, but brand previews did not
yet use the supplied identity.

Why it felt weak:

Production polish includes how the brand appears outside the page itself.

How it was improved:

- Added canonical metadata.
- Added branded Open Graph and Twitter images.
- Added Organization structured data.
- Added `manifest.webmanifest` with the official app icon.

### 8. Theme toggle hydration mismatch

What felt weak:

The theme toggle could produce a hydration warning when the resolved client
theme differed from the server-rendered label.

Why it felt weak:

Console errors reduce confidence and can hide real production issues.

How it was improved:

- Replaced dynamic server/client aria-label text with a stable accessible label.
- Preserved the same visual and interaction behavior.

## Verification

Passed:

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npm audit --audit-level=moderate`

Browser QA:

- Desktop homepage checked at 1440 x 900.
- Mobile homepage checked at 390 x 844.
- No horizontal overflow found.
- Navbar, logo, hero, buttons, and manifest links verified.

## Remaining Opportunities

- Replace the contact `mailto:` form with a real server-side submission flow.
- Add a dedicated Open Graph social card if a brand-specific preview image is
  requested.
- Add case-study detail pages once real project material is ready.
- Add automated visual regression screenshots before launch.
