# Pranav Labs Engineering Standards

> Version: 1.0
> Last Updated: September 2026

---

# Purpose

This document defines the engineering standards followed across every Pranav Labs project.

The goal is consistency.

Every engineer and every AI assistant should produce code that feels like it was written by the same engineering team.

---

# Engineering Philosophy

We optimize for:

- Maintainability
- Simplicity
- Readability
- Performance
- Reliability
- Scalability

Not cleverness.

Code is read far more often than it is written.

---

# Golden Rule

Every pull request should leave the codebase better than it was before.

---

# Code Quality

Every piece of code should be:

✓ Simple

✓ Readable

✓ Predictable

✓ Reusable

✓ Testable

---

# General Principles

Prefer clarity over cleverness.

Prefer composition over inheritance.

Prefer small components over large files.

Prefer explicit code over magic.

Avoid unnecessary abstractions.

---

# TypeScript

Always use:

```ts
strict: true
```

Never use:

```ts
any
```

Instead:

- unknown
- generics
- proper interfaces
- proper types

---

# File Length

Target:

Component

<250 lines

Maximum

400 lines

Split large components.

---

# Function Length

Ideal

10–30 lines

Maximum

60 lines

If longer,

extract smaller functions.

---

# Component Rules

Every component should have one responsibility.

Good

Navbar

Hero

Footer

ProjectCard

Bad

Homepage.tsx with 1200 lines

---

# Naming

Components

```tsx
Hero.tsx
```

Hooks

```ts
useTheme.ts
```

Utilities

```ts
formatCurrency.ts
```

Constants

```ts
APP_NAME
```

Types

```ts
Project
```

Interfaces

```ts
ProjectCardProps
```

---

# Folder Structure

```
app/

components/

components/layout/

components/ui/

components/sections/

components/shared/

hooks/

lib/

types/

styles/

public/

docs/
```

---

# Imports

Prefer absolute imports.

Example

```ts
import { Button } from "@/components/ui/button"
```

Avoid deep relative imports.

---

# Comments

Write comments only when necessary.

Good

Explain WHY.

Bad

Explain WHAT.

Bad

```ts
// Increment counter
counter++
```

Good

```ts
// Required because Safari caches this request.
```

---

# State Management

Prefer

Server Components

↓

Props

↓

Local State

↓

Context

Avoid global state unless necessary.

---

# API Design

Never expose secrets.

Always validate inputs.

Return predictable responses.

Handle failures gracefully.

---

# Error Handling

Never ignore errors.

Every async function should handle:

- loading
- success
- error

Users should always receive meaningful feedback.

---

# Logging

Development

```ts
console.log()
```

Production

Structured logging only.

Never leave debug logs in production.

---

# Environment Variables

All secrets belong in:

```
.env.local
```

Never commit:

- API keys
- Passwords
- Tokens

---

# Git Workflow

Main

Production

Develop

Integration

Feature

One feature per branch

Example

```
feature/navbar
```

Bug

```
fix/mobile-menu
```

---

# Commit Messages

Good

```
feat: add hero section

fix: resolve mobile navbar overflow

refactor: simplify service cards

docs: update engineering standards
```

Bad

```
update

changes

fixed stuff

done
```

---

# Pull Requests

Every PR should include

- Summary
- Screenshots (UI)
- Testing Notes
- Checklist

---

# Performance

Target

First Contentful Paint

<1.5s

Largest Contentful Paint

<2.5s

CLS

<0.1

---

# React

Prefer

Server Components

Use Client Components only when required.

Avoid unnecessary hydration.

---

# Styling

Use Tailwind.

Never use inline styles unless dynamic.

Use CSS variables for design tokens.

---

# Accessibility

Every feature must support:

Keyboard

Screen Readers

Focus States

Proper Labels

Semantic HTML

---

# Testing

Minimum

Manual testing

Preferred

Vitest

React Testing Library

Playwright

Critical business logic must be tested.

---

# Dependencies

Before adding a package ask:

Does Next.js already solve this?

Can we build this ourselves?

Is the package maintained?

Avoid dependency bloat.

---

# Security

Never trust user input.

Escape output.

Validate data.

Use HTTPS.

Protect secrets.

Follow least privilege.

---

# Documentation

Every reusable component should have:

Purpose

Props

Example

Edge cases

Complex utilities require documentation.

---

# AI Usage

AI accelerates development.

AI does not replace engineering judgment.

Every AI-generated change must be:

Reviewed

Tested

Refactored if needed

---

# Code Review Checklist

Before merging ask:

- Is it readable?
- Is it reusable?
- Is it accessible?
- Is it responsive?
- Is it secure?
- Is it tested?
- Is it documented?
- Does it match the design system?
- Does it improve the codebase?

If not,

revise it.

---

# Definition of Done

A task is complete only if:

✓ Code works

✓ Types pass

✓ Lint passes

✓ Build passes

✓ Responsive

✓ Accessible

✓ Performance acceptable

✓ Documented

✓ Reviewed

---

# Final Principle

Engineering is not about writing more code.

Engineering is about building systems that remain understandable, reliable, and valuable years after they are first written.

Every line of code should move Pranav Labs closer to becoming a world-class engineering company.