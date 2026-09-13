# Pranav Labs Design System

> Version: 1.0
> Last Updated: September 2026

---

# Design Philosophy

The Pranav Labs design language is based on one principle:

> Engineering over decoration.

Every interface should feel calm, premium, highly usable, and intentionally minimal.

Users should immediately think:

"This company builds serious software."

—not—

"This company knows cool animations."

---

# Design Keywords

- Minimal
- Premium
- Technical
- Modern
- Spacious
- Professional
- Fast
- Intelligent
- Confident

---

# Visual Principles

## Less is More

Remove anything that doesn't improve clarity.

---

## Function First

Every visual element should have a purpose.

---

## Consistency

Spacing, typography, animations, borders, and colors must feel like one unified system.

---

## Performance Matters

The website should load extremely fast.

Avoid unnecessary JavaScript.

Prefer Server Components whenever possible.

---

# Layout

## Max Width

```css
1440px
```

---

## Content Width

```css
1280px
```

---

## Padding

Desktop

```css
px-8
```

Tablet

```css
px-6
```

Mobile

```css
px-5
```

---

## Section Spacing

Desktop

```css
py-32
```

Tablet

```css
py-24
```

Mobile

```css
py-20
```

---

# Grid System

Desktop

12 Columns

Tablet

8 Columns

Mobile

4 Columns

---

# Border Radius

Small

```css
rounded-lg
```

Medium

```css
rounded-xl
```

Large

```css
rounded-2xl
```

Never use excessive rounding.

---

# Color Palette

## Primary

```css
#2563EB
```

---

## Black

```css
#111111
```

---

## White

```css
#FFFFFF
```

---

## Background

```css
neutral-50
```

---

## Border

```css
neutral-200
```

---

## Text Primary

```css
neutral-900
```

---

## Text Secondary

```css
neutral-600
```

---

## Success

```css
#22C55E
```

---

## Warning

```css
#F59E0B
```

---

## Error

```css
#EF4444
```

---

# Typography

## Primary Font

Geist

Fallback

Inter

---

# Heading Scale

## Display

```css
text-7xl
font-bold
tracking-tight
```

---

## H1

```css
text-6xl
font-bold
```

---

## H2

```css
text-5xl
font-bold
```

---

## H3

```css
text-4xl
font-semibold
```

---

## H4

```css
text-3xl
font-semibold
```

---

## Body Large

```css
text-xl
leading-8
```

---

## Body

```css
text-lg
leading-7
```

---

## Small

```css
text-sm
```

---

# Buttons

## Primary

Background

Primary Blue

Text

White

Hover

Slightly darker blue

Shadow

None

Transition

200ms

---

## Secondary

White background

Neutral border

Dark text

Hover

Light gray

---

## Ghost

Transparent

Text only

Hover

Neutral background

---

# Cards

Background

White

Border

Neutral 200

Radius

Rounded 2xl

Shadow

Very subtle

Padding

24px

Hover

Slight lift

Tiny shadow increase

Never dramatic.

---

# Forms

Use shadcn/ui.

Input height

```css
h-12
```

Rounded

```css
rounded-xl
```

Border

```css
neutral-300
```

Focus

Primary Blue

---

# Icons

Library

Lucide React

Style

Outline

Size

20–24px

Never mix icon packs.

---

# Motion

Animation should never distract.

---

## Allowed

Fade

Slide Up

Opacity

Hover Scale (1.02)

Button Ripple

Text Reveal

Aurora Background

Animated Grid

---

## Avoid

Parallax

Spinning Elements

Floating Cards

Particle Systems

Complex 3D

Heavy Blur

Large Bounce Effects

---

# Animation Timing

Fast

150ms

Normal

250ms

Slow

400ms

Never exceed 600ms.

---

# Shadows

Small

```css
shadow-sm
```

Medium

```css
shadow-md
```

Large

```css
shadow-lg
```

Avoid shadow-xl unless absolutely necessary.

---

# Components

Use in this priority.

1.

shadcn/ui

Core UI

---

2.

Magic UI

Hero

Background

Bento

Text Effects

---

3.

Motion Primitives

Micro Interactions

Transitions

---

4.

Aceternity UI

Only if no alternative exists.

---

# Icons

Lucide React only.

---

# Images

Use

- Product screenshots
- Code snippets
- Software UI
- Architecture
- Engineering environments

Avoid

- Generic stock people
- Fake AI art
- Overly saturated imagery

---

# Sections

Every page follows:

Hero

↓

Problem

↓

Solution

↓

Features

↓

Proof

↓

CTA

↓

Footer

---

# Responsive Breakpoints

```css
sm
640px

md
768px

lg
1024px

xl
1280px

2xl
1536px
```

---

# Accessibility

Minimum contrast ratio

4.5:1

Keyboard accessible

Visible focus states

Alt text required

ARIA labels where appropriate

Semantic HTML

---

# Performance Budget

Lighthouse

100 Performance

100 Accessibility

100 Best Practices

100 SEO

---

# Development Standards

- Use TypeScript strictly.
- No `any`.
- Prefer Server Components.
- Use lazy loading where appropriate.
- Optimize all images.
- Avoid unnecessary dependencies.
- Reuse components.
- Keep files under ~300 lines when practical.

---

# Folder Structure

```
app/
components/
components/ui/
components/sections/
components/layout/
components/shared/
lib/
hooks/
types/
styles/
public/
docs/
```

---

# Naming Convention

Components

```
Hero.tsx
Navbar.tsx
Footer.tsx
```

Hooks

```
useTheme.ts
```

Utilities

```
formatDate.ts
```

---

# Design Goal

Every page should feel like it belongs to the same ecosystem.

Whether someone opens the homepage, a product page, or documentation, the experience should be unmistakably **Pranav Labs**.

Minimal.

Fast.

Beautiful.

Engineered.