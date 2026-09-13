# Pranav Labs Documentation

> Single source of truth for the Pranav Labs engineering team.

Version: 1.0

Last Updated: September 2026

---

# Purpose

This documentation defines how Pranav Labs designs, engineers, writes, builds, and ships software.

Every engineer, contributor, and AI assistant must follow these documents before making architectural or implementation decisions.

If two documents conflict, follow the priority order below.

---

# Documentation Priority

The documents are ordered from highest authority to lowest.

## Company

### 01-brand.md

Defines:

- Company identity
- Mission
- Vision
- Values
- Brand personality

Read first.

---

### 02-content-style.md

Defines:

- Writing style
- Tone
- Website copy
- Documentation language
- Blog style

---

### 03-logo-guidelines.md

Defines:

- Logo usage
- Colors
- Safe spacing
- Export rules

---

### 04-product-strategy.md

Defines:

- What we build
- What we do not build
- Product direction
- Customer focus

---

### 05-roadmap.md

Defines:

- Company roadmap
- Current priorities
- Long-term vision

---

### 06-engineering-philosophy.md

Defines:

- Engineering culture
- Decision making
- Long-term principles

---

# Engineering

### 01-design-system.md

Defines:

- Colors
- Typography
- Layout
- Components
- Motion
- Spacing

---

### 02-website-architecture.md

Defines:

- Folder structure
- Routes
- Components
- Layout hierarchy
- Website architecture

---

### 03-engineering-standards.md

Defines:

- Engineering practices
- Code quality
- Performance
- Security
- Accessibility

---

### 04-coding-conventions.md

Defines:

- Formatting
- Naming
- Imports
- TypeScript style
- Git conventions

---

# How AI Should Work

AI is an engineering assistant.

Not an autonomous decision maker.

Before writing code:

1. Read this README.
2. Read the relevant documentation.
3. Explain the implementation plan.
4. Wait for approval if the architecture changes.
5. Implement incrementally.
6. Self-review the code.
7. Suggest improvements.

Never rewrite large parts of the codebase without approval.

---

# Decision Hierarchy

If unsure about a decision, use this order:

1. Brand
2. Product Strategy
3. Engineering Philosophy
4. Design System
5. Website Architecture
6. Engineering Standards
7. Coding Conventions

Earlier documents take priority.

---

# Core Principles

Every decision should improve at least one of:

- Simplicity
- Reliability
- Performance
- Accessibility
- Maintainability
- Developer Experience

Never sacrifice long-term quality for short-term speed.

---

# Tech Stack

Framework

- Next.js 15
- React 19
- TypeScript

Styling

- Tailwind CSS v4

UI

- shadcn/ui
- Magic UI
- Motion Primitives

Animation

- Framer Motion

Icons

- Lucide React

Deployment

- Vercel

Database

- PostgreSQL
- Supabase

Automation

- n8n

AI

- OpenAI

---

# Project Structure

```
docs/
app/
components/
lib/
hooks/
types/
styles/
public/
content/
```

---

# Component Priority

Always use components in this order:

1. shadcn/ui

↓

2. Magic UI

↓

3. Motion Primitives

↓

4. Aceternity UI

Avoid introducing new UI libraries unless necessary.

---

# Development Workflow

Planning

↓

Architecture

↓

Implementation

↓

Self Review

↓

Performance Review

↓

Accessibility Review

↓

Deployment

---

# Definition of Done

A task is complete only if:

✓ Types pass

✓ Lint passes

✓ Build succeeds

✓ Responsive

✓ Accessible

✓ Performance acceptable

✓ Matches design system

✓ Matches brand

✓ Documentation updated

---

# AI Rules

AI must:

- Think before coding.
- Explain trade-offs.
- Prefer reusable components.
- Avoid unnecessary dependencies.
- Never use `any`.
- Never ignore TypeScript errors.
- Never disable lint rules without justification.
- Never introduce breaking changes without approval.
- Keep code simple and maintainable.

---

# Repository Philosophy

This repository represents the engineering standards of Pranav Labs.

Every commit should improve the project.

Every feature should solve a real problem.

Every line of code should be understandable six months from now.

---

# North Star

Build software that earns trust.

Everything else follows.