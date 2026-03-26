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
- `clients/README.md` — active clients list
- Every file in `clients/*/brief.md` — read the `## Payment` section of each
- `career/personal-finance/expenses.md` — all recurring bills and one-off expenses

Extract:
- What are the active Q1 goals?
- What has happened in the challenge in the last 7 days?
- How much revenue has been made?
- What were the "Next Week Focus" items from the last weekly review?
- Are those focus items done or not?
- Which clients have an outstanding balance? What is the amount and deadline?
- Which bills/expenses are due within the next 7 days? Which are OVERDUE?
- Are there any active trials in the `## Trials` section that need to be cancelled within 7 days?

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

**Client Balances Outstanding:**

| Client | Project | Balance (UGX) | Deadline | Status |
|--------|---------|--------------|----------|--------|
| [name] | [project] | [amount] | [date] | OVERDUE / DUE SOON / OK |

*(Skip table if all clients are paid up. Mark OVERDUE if past deadline. Mark DUE SOON if deadline is within 7 days.)*

**Upcoming Bills (next 14 days):**

| Bill | Amount (UGX) | Due Date | Status |
|------|-------------|----------|--------|
| [name] | [amount] | [date] | OVERDUE / DUE SOON / UPCOMING |

*(Skip table if nothing due in 14 days. Flag OVERDUE in bold. Flag DUE SOON if within 7 days.)*

**Trials to Cancel:**

| Trial | Cost if Charged | Cancel By | Days Left |
|-------|----------------|-----------|-----------|
| [name] | [cost] | [date] | [N days] |

*(Only show if cancel date is within 14 days. Flag CANCEL TODAY if ≤1 day left.)*

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

Limit to 3–4 tasks. Do not pad with low-value work.

---

**Day Plan**

Map tasks to time blocks. Use realistic working hours. Prioritise deep work first. No task switching within a block.

```
07:00–09:00 → [Deep work — build task or highest-priority item]
09:00–09:30 → Break
09:30–11:00 → [Second priority — money action or continued build]
11:00–12:00 → [Content recording, testing, or outreach]
12:00–13:00 → Break / lunch
```

Add afternoon blocks only if the work genuinely requires it:

```
14:00–15:30 → [Optional — third task if not done]
15:30–16:00 → Admin, replies, quick actions
```

Rules for the Day Plan:
- Deep work (building) always gets the first block — best focus window
- Money actions (outreach, proposals, follow-ups) go in the second block
- Content goes last — it feeds off what was done, not before
- Do not schedule more than 6 hours of productive work total
- If a task can't fit — cut it, don't extend the day
- Call out if the plan looks like yesterday with no progress on revenue

---

**Warning** *(only if off track)*

> [Direct statement. What is the risk if today looks like yesterday? What pattern is forming?]

---

## Operator Rules

- Tasks must be specific and actionable ("Send proposal to [Company]" not "work on proposals")
- If revenue is $0 and there is no active client pursuit — Task 1 is always client outreach or a revenue attempt
- Do not output motivational language — output tasks and a schedule
- If the same gap appears for the second week in a row — call it a pattern, not a bad day
- This skill decides what gets done today. daily-briefing handles logistics (calendar, email). Operator mode handles execution.
- If goals and calendar conflict — goals win
- The Day Plan is not aspirational — it is the actual schedule. Build it to be followed.
