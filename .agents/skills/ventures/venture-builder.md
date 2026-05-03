---
name: venture-builder
description: Breaks a product idea into a fast MVP. Defines scope, stack, and step-by-step build instructions using Cursor, Claude, and APIs. Optimised for solo builders who need to ship in hours or days, not weeks.
argument-hint: "[idea or product name] [optional: target audience]"
user-invocable: true
disable-model-invocation: true
---

# Venture Builder — Fast MVP

**Idea:** $ARGUMENTS

---

## Step 1 — Parse the Idea

If $ARGUMENTS is provided, extract:
- What the product does (one sentence)
- Who it's for
- What problem it solves
- How it might make money

If $ARGUMENTS is vague or missing, ask Simon:
1. What does this product do in one sentence?
2. Who is the exact user? (not "everyone" — be specific)
3. What do they currently do instead of using this?
4. How does it make money? (one-time, subscription, usage-based, free → upsell)

Do not proceed until the core idea is clear.

---

## Step 2 — Apply the MVP Filter

Take the idea and apply brutal scope reduction.

**MVP = the smallest version that proves the idea works and can make money.**

For each feature the idea implies, ask: "Can we prove value without this?"

**Cut anything that is:**
- Nice to have but not core to the value proposition
- An edge case (less than 20% of users would use it)
- Infrastructure-heavy (auth, teams, billing) that can be faked at MVP stage
- A distraction from the one thing that proves the concept

**Keep only:**
- The single core action the user comes to do
- The output or result that makes them want to pay
- Enough UI to make it usable (not beautiful)

Document what was cut and why. Simon should know what he's deliberately not building.

---

## Step 3 — Define the Stack

Choose the stack based on these rules:

| Situation | Stack |
|-----------|-------|
| AI-powered tool, solo builder, needs to ship fast | Next.js + Claude API / OpenAI API + Vercel |
| Needs a database | Neon Postgres (serverless) or Supabase |
| Needs auth | Clerk (5 min setup) — skip if MVP can work without login |
| Needs payments | Stripe Checkout (hosted page — no custom UI needed at MVP) |
| Needs file storage | Vercel Blob or Cloudinary |
| No-code prototype first | Lovable, Bolt, or v0 + manual backend later |
| Pure automation / no UI needed | n8n or Make + Claude API |

**Default MVP stack for Simon:**
- Frontend: Next.js App Router (or v0-generated UI)
- AI: Claude API via Anthropic SDK (`@anthropic-ai/sdk`)
- Hosting: Vercel (free tier)
- Database: skip unless MVP requires persistence
- Auth: skip unless MVP requires user accounts
- Payments: Stripe Checkout link (can be added in day 2)

Justify every dependency. If it's not needed on day 1, cut it.

---

## Step 4 — Define MVP Scope

Output a clear, bounded MVP definition:

**What it does:**
[One paragraph — the exact user journey from open to result]

**Features included:**
- [feature 1 — core]
- [feature 2 — core]
- [feature 3 — only if essential]

**Explicitly not included (v1):**
- [cut feature]
- [cut feature]

**Definition of done:**
[One sentence — what does "it works" look like? e.g. "User pastes a CV, clicks Polish, gets a rewritten CV they can copy and use."]

**Monetisation at MVP:**
[How money is collected at this stage — Stripe link, waitlist + manual, free with email capture, etc.]

---

## Step 5 — Build Steps

Break the build into daily chunks. Each chunk must be completable in 2–4 hours.

Format each step as:

### Day X — [Name]

**Goal:** [What will exist by the end of this chunk that didn't exist before]

**Tasks:**
1. [Specific task — tool to use + what to build]
2. [Specific task]
3. [Specific task]

**Cursor/Claude prompt to use:**
```
[Paste-ready prompt for Cursor or Claude to scaffold or build the hardest part of this chunk]
```

**Done when:** [Specific, testable condition]

---

Rules for build steps:
- Day 1 must produce something Simon can show someone
- No step should take longer than 4 hours
- Every step must end with something that works (not "set up the project structure")
- If a step is getting complex — cut scope, don't add time

---

## Step 6 — Tools Cheatsheet

Output a reference block for the build:

```
TOOLS FOR THIS BUILD

AI / Logic:
  Claude API — model: claude-sonnet-4-6
  SDK: @anthropic-ai/sdk
  Prompt file: [suggest where to store prompts]

Frontend:
  Framework: Next.js App Router
  UI: shadcn/ui + Tailwind (npx shadcn@latest init)
  Generator: v0.dev (for fast UI scaffolding)

Backend:
  API routes: app/api/[endpoint]/route.ts
  Database: [Neon / skip]
  Auth: [Clerk / skip]

Deployment:
  Host: Vercel (vercel deploy)
  Env vars: .env.local → vercel env pull

Payments (if needed):
  Stripe Checkout: create a Payment Link in dashboard — no code needed at MVP
```

---

## Step 7 — Save the Plan

Save the full venture plan to:
`ventures/[venture-slug]/build-plan.md`

If the folder doesn't exist, create it.

If a build-plan.md already exists, append a new dated section — do not overwrite.

---

## Step 8 — Output the Summary

Output in this format:

---

### Venture Builder — [Product Name] | [DATE]

**The Idea**

[One sentence — what it does and who it's for]

**The MVP**

[One paragraph — exact scope, what's in, what's out]

**Definition of Done**

[One sentence]

**Stack**

| Layer | Choice | Why |
|-------|--------|-----|
| Frontend | | |
| AI | | |
| Database | | |
| Auth | | |
| Payments | | |
| Hosting | | |

**Build Plan**

| Day | Goal | Done when |
|-----|------|-----------|
| 1 | | |
| 2 | | |
| 3 | | |

**Estimated ship date:** [X days from today if Simon works 2–4h/day]

**Revenue on day 1:** [Yes / No / How]

---

Saved to: `ventures/[slug]/build-plan.md`

---

## Builder Rules

- Every MVP must be shippable in 3 days or less — if not, cut scope
- No build plan should require a feature Simon doesn't know how to build today
- If an idea needs a team to execute, flag it — Simon is a solo builder right now
- The goal is a working product with a payment method, not a polished product
- Speed of shipping is more valuable than quality of the first version
- If the idea has already been built by others — good. Validate the market, find the gap, ship faster.
