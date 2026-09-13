# Pranav Labs Coding Conventions

> Version: 1.0
> Last Updated: September 2026

---

# Purpose

This document defines the coding conventions used across all Pranav Labs projects.

The objective is simple:

Code should look like it was written by one engineering team.

Consistency is more valuable than personal preference.

---

# General Principles

Prioritize:

- Readability
- Consistency
- Simplicity
- Predictability

Avoid:

- Clever code
- Unnecessary abstractions
- Inconsistent formatting

---

# Language

Primary:

TypeScript

Secondary:

Python

Shell

SQL

---

# Formatting

Formatter:

Prettier

Linter:

ESLint

Formatting is automatic.

Never manually format code differently.

---

# Indentation

2 spaces

Never use tabs.

---

# Quotes

Strings

```ts
"hello"
```

Use double quotes.

---

# Semicolons

Always use semicolons.

Example

```ts
const name = "Pranav";
```

---

# Trailing Commas

Always.

Example

```ts
const project = {
  name: "Aaspas",
  type: "Web App",
};
```

---

# Line Length

Target

100 characters

Maximum

120

Wrap long expressions.

---

# Blank Lines

Separate logical blocks.

Don't write huge walls of code.

---

# Naming

## Variables

camelCase

```ts
userProfile
```

---

## Functions

camelCase

```ts
formatDate()
```

---

## Components

PascalCase

```tsx
HeroSection
```

---

## Types

PascalCase

```ts
Project
```

---

## Interfaces

PascalCase

```ts
ProjectCardProps
```

---

## Enums

PascalCase

```ts
ProjectStatus
```

Members

UPPER_CASE

---

## Constants

UPPER_SNAKE_CASE

```ts
MAX_FILE_SIZE
```

---

## Files

React Components

PascalCase

```
Hero.tsx
```

Utilities

camelCase

```
formatDate.ts
```

Hooks

camelCase

```
useTheme.ts
```

Types

camelCase

```
project.ts
```

---

# Imports

Order imports consistently.

1.

React / Next

↓

2.

Third-party packages

↓

3.

Internal components

↓

4.

Utilities

↓

5.

Types

↓

6.

Styles

Example

```ts
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { formatDate } from "@/lib/formatDate";

import type { Project } from "@/types/project";
```

---

# Components

One component.

One responsibility.

Prefer

```tsx
<ProjectCard />
```

Over

```tsx
<ProjectEverything />
```

---

# Props

Always destructure.

Good

```tsx
function ProjectCard({
  title,
  description,
}: ProjectCardProps) {
```

Avoid

```tsx
function ProjectCard(props) {
```

---

# Functions

Keep functions focused.

Good

```ts
calculatePrice()
```

Avoid

```ts
doEverything()
```

---

# Boolean Variables

Start with

is

has

can

should

Examples

```ts
isLoading

hasAccess

canEdit

shouldRetry
```

---

# Event Handlers

Prefix with

handle

Example

```ts
handleSubmit()

handleDelete()

handleClick()
```

---

# Async Functions

Suffix

Async only when necessary.

Prefer

```ts
fetchProjects()
```

Not

```ts
fetchProjectsAsync()
```

---

# Custom Hooks

Always begin with

use

Example

```ts
useTheme()

useProjects()

useScrollPosition()
```

---

# CSS

Use Tailwind.

Avoid custom CSS unless reusable.

Never use inline styles unless dynamic.

---

# Conditional Rendering

Prefer

```tsx
{isLoading ? <Spinner /> : <Content />}
```

Avoid nested ternaries.

---

# Lists

Always provide keys.

Good

```tsx
projects.map(project => (
  <ProjectCard
    key={project.id}
  />
))
```

Never use array index unless static.

---

# Types

Prefer

```ts
type
```

for unions and aliases.

Use

```ts
interface
```

for object contracts that may extend.

---

# Optional Values

Use optional chaining.

```ts
user?.name
```

Use nullish coalescing.

```ts
value ?? defaultValue
```

Avoid unnecessary non-null assertions.

---

# Error Handling

Never leave empty catch blocks.

Bad

```ts
catch {}
```

Good

```ts
catch (error) {
  console.error(error);
}
```

---

# Comments

Only explain

WHY

Never explain

WHAT

Bad

```ts
// Increment counter
count++;
```

Good

```ts
// Prevent duplicate submissions during slow network requests.
```

---

# Magic Numbers

Avoid

```ts
if (age > 18)
```

Prefer

```ts
const MINIMUM_AGE = 18;
```

---

# Accessibility

Buttons

Always use

```tsx
<button>
```

Never clickable divs.

Images

Always include

alt

Inputs

Always include labels.

---

# Icons

Lucide React only.

Maintain consistent size.

20–24px.

---

# Logging

Development

```ts
console.log()
```

Production

Use structured logging.

Remove debug logs before merging.

---

# Environment Variables

Public

```
NEXT_PUBLIC_*
```

Private

```
.env.local
```

Never expose secrets.

---

# Folder Naming

Lowercase.

Examples

```
components

hooks

lib

types

styles
```

---

# Route Naming

Use lowercase.

Examples

```
/services

/contact

/work

/blog
```

Avoid camelCase URLs.

---

# Commit Convention

Follow Conventional Commits.

```
feat:

fix:

docs:

refactor:

style:

test:

perf:

build:

chore:
```

Examples

```
feat: add hero section

fix: resolve navbar overflow

docs: update coding conventions

refactor: simplify service cards
```

---

# Pull Request Checklist

- Code builds
- Types pass
- Lint passes
- Responsive
- Accessible
- No console logs
- No TODOs
- Documentation updated if needed

---

# AI Coding Rules

Every AI-generated implementation must:

- Follow this document.
- Follow Engineering Standards.
- Follow Design System.
- Never introduce unnecessary dependencies.
- Explain architectural decisions before major changes.
- Prefer modifying existing components over rewriting them.
- Never rename files or folders without approval.

---

# Final Principle

Readable code is professional code.

Write code that a teammate—or your future self six months from now—can understand in minutes, not hours.