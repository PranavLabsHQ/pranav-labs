# Pranav Labs Website Architecture

> Version: 1.0
> Last Updated: September 2026

---

# Purpose

This document defines the architecture of the Pranav Labs website.

The goal is to build a scalable, maintainable, high-performance website that can evolve from a company website into a complete software ecosystem.

The architecture should support:

- Company Website
- Product Pages
- Documentation
- Blog
- Open Source
- Careers
- Contact
- Future SaaS Products

---

# Design Principles

The website should feel like a modern software company.

Not a freelancer portfolio.

Not a marketing agency.

Not a template.

Visitors should immediately understand:

> This company builds software.

---

# Technical Stack

Framework

- Next.js 15
- App Router

Language

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

Analytics

- Vercel Analytics

Future CMS

- MDX

Future Database

- Supabase

---

# Folder Structure

app/

components/

components/layout/

components/sections/

components/ui/

components/shared/

components/icons/

components/providers/

lib/

hooks/

types/

styles/

public/

content/

docs/

---

# App Structure

/

About

Services

Work

Products

Open Source

Blog

Contact

404

Privacy

Terms

---

# Navigation

Primary

Home

Services

Work

Products

Blog

Contact

Secondary

GitHub

LinkedIn

Email

---

# Homepage Structure

1.

Navbar

↓

2.

Hero

↓

3.

Trusted Technologies

↓

4.

Services

↓

5.

Featured Work

↓

6.

Why Pranav Labs

↓

7.

Development Process

↓

8.

Technology Stack

↓

9.

Call To Action

↓

10.

Footer

---

# About Page

Hero

↓

Mission

↓

Vision

↓

Core Principles

↓

Engineering Philosophy

↓

Timeline

↓

CTA

---

# Services Page

Hero

↓

Services Grid

↓

Process

↓

FAQs

↓

CTA

---

# Work Page

Project Grid

↓

Case Studies

↓

Results

↓

CTA

---

# Products Page

Current Products

↓

Upcoming Products

↓

Roadmap

↓

CTA

---

# Open Source

Repositories

↓

Libraries

↓

Developer Tools

↓

GitHub CTA

---

# Blog

Categories

↓

Articles

↓

Search

↓

Newsletter

---

# Contact

Simple Form

↓

Email

↓

WhatsApp

↓

Social Links

---

# Layout Hierarchy

Root Layout

↓

Page Layout

↓

Section

↓

Component

↓

UI Element

Every layer should have one responsibility.

---

# Component Philosophy

Components must be:

Reusable

Composable

Accessible

Independent

Small

Avoid large monolithic components.

---

# Naming Convention

Good

Hero.tsx

Navbar.tsx

Footer.tsx

ProjectCard.tsx

ServiceCard.tsx

Bad

HomePageEverything.tsx

BigSection.tsx

---

# Data Strategy

Static content

MDX

Future

CMS

Future

Supabase

Avoid hardcoding repeated data.

---

# SEO

Every page should have:

Title

Description

Open Graph

Twitter Card

Structured Data

Canonical URL

Robots

Sitemap

---

# Performance

Target

Lighthouse

100

100

100

100

Optimize

Fonts

Images

Scripts

Animations

Hydration

Use Server Components wherever possible.

---

# Accessibility

Keyboard navigation

Visible focus states

Semantic HTML

Proper heading hierarchy

ARIA labels

Alt text

Minimum contrast ratio

---

# Responsive Strategy

Mobile First

Breakpoints

sm

md

lg

xl

2xl

Every page must work perfectly on mobile.

---

# Motion Principles

Motion should guide attention.

Never distract.

Allowed

Fade

Slide

Hover

Reveal

Aurora

Grid

Avoid

Parallax

Heavy blur

Particles

3D scenes

Auto-playing animations

---

# Future Expansion

The architecture should support:

Client Portal

Dashboard

Authentication

Documentation

API Docs

Knowledge Base

Careers

Product Pages

Pricing

Changelog

Release Notes

Status Page

Without major restructuring.

---

# Development Workflow

Step 1

Architecture

↓

Step 2

Global Layout

↓

Step 3

Navigation

↓

Step 4

Homepage

↓

Step 5

Remaining Pages

↓

Step 6

SEO

↓

Step 7

Accessibility

↓

Step 8

Performance

↓

Step 9

Deployment

---

# Success Criteria

The website should:

Load fast.

Feel premium.

Scale easily.

Be maintainable.

Represent the Pranav Labs brand consistently.

Every new page should fit naturally into the existing architecture without redesigning the system.

---

# Final Principle

Build the website as if it will serve the company for the next 5 years.

Optimize for maintainability over shortcuts.

The website is not a project.

It is part of the product ecosystem.