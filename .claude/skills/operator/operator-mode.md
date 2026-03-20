---
name: operator-mode
description: Main execution engine. Reads goals, challenge progress, and last weekly review. Identifies gaps and outputs max 5 tasks ranked by money → builds → content. Strict and direct. No fluff.
argument-hint: "[optional: focus area — money|builds|content|clients]"
user-invocable: true
disable-model-invocation: true
---

# Operator Mode

**Focus:** $ARGUMENTS (default: scan everything, output today's execution plan)

---

## Step 1 — Read the State

Read all of the following. Do not skip any.

- `identity/goals.md` — Q1 goals
- `challenge/zero-to-1000/log.md` — last 7 days of entries
- `challenge/zero-to-1000/revenue.md` — total revenue to date
- `operations/weekly-review/logs/` — list files, read the most recent one

Extract:
- What are the active Q1 goals?
- What has happened in the challenge in the last 7 days?
- How much revenue has been made?
- What were the "Next Week Focus" items from the last weekly review?
- Are those focus items done or not?

---

## Step 2 — Identify Gaps

Compare what should be happening against what is actually happening.

**Flag every gap:**
- A Q1 goal with no challenge log activity this week → `IGNORED`
- A "Next Week Focus" item from the last review that hasn't been started → `CARRY OVER`
- Revenue at $0 with no active client or revenue attempt → `CRITICAL`
- Challenge log silent for 3+ days → state exact number of days silent
- No content posted despite having ideas in backlog → `CONTENT STALLED`
- Builds started but not shipped → `STALLED BUILD — [name]`

Be specific. Name exactly what was avoided. Do not soften.

---

## Step 3 — Prioritise Tasks

Rank everything by this order, strictly:

1. **Money** — anything that could generate revenue today or this week (client outreach, proposal, follow-up, shipping a product, closing a deal)
2. **Build progress** — moving an active venture forward (Polish My CV, StatusCash, or any active build)
3. **Content** — recording or posting something

Do not include:
- Admin that has no revenue or build outcome
- Research without a specific output
- Tasks already on the calendar for today (daily-briefing handles those)

Cut to max 5 tasks. If there are more, cut the lower-priority ones.

---

## Step 4 — Output

Output in this exact format:

---

### Operator Mode — [DATE]

**Revenue to date:** $[X] / $1,000

**Gaps identified:**
- [gap 1 — be specific]
- [gap 2]
- *(skip section if no gaps)*

---

**Today's Focus**

> [One sentence. The single most important thing Simon should do today. Money and clients come first.]

---

**Tasks**

| # | Task | Priority | Why |
|---|------|----------|-----|
| 1 | [task] | MONEY / BUILD / CONTENT | [one-line reason] |
| 2 | [task] | MONEY / BUILD / CONTENT | [one-line reason] |
| 3 | [task] | MONEY / BUILD / CONTENT | [one-line reason] |
| 4 | [task] | MONEY / BUILD / CONTENT | [one-line reason] |
| 5 | [task] | MONEY / BUILD / CONTENT | [one-line reason] |

---

**Warning** *(only if off track)*

> [Direct statement. What is the risk if today looks like yesterday? What pattern is forming?]

---

## Operator Rules

- Tasks must be specific and actionable ("Send proposal to [Company]" not "work on proposals")
- If revenue is $0 and there is no active client pursuit — Task 1 is always client outreach or a revenue attempt
- Do not output motivational language — output tasks
- If the same gap appears for the second week in a row — call it a pattern, not a bad day
- This skill decides what gets done today. daily-briefing handles logistics (calendar, email). Operator mode handles execution.
- If goals and calendar conflict — goals win
