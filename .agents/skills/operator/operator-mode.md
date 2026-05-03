---
name: operator-mode
description: Full life OS briefing. Reads goals, challenge, clients, loans, bills, tasks, emails, and weekly review. Outputs today's execution plan covering everything important in Simon's life. Strict and direct. No fluff.
argument-hint: "[optional: focus area — money|builds|content|clients|finance]"
user-invocable: true
disable-model-invocation: true
---

# Operator Mode

**Focus:** $ARGUMENTS (default: scan everything, output today's full briefing)

---

## Step 1 — Read All Sources

Read every source below. Do not skip any.

**Goals & Progress**
- `identity/goals.md` — Q1 goals
- `challenge/zero-to-1000/log.md` — last 7 days of entries
- `challenge/zero-to-1000/revenue.md` — total revenue to date
- `operations/weekly-review/logs/` — list files, read the most recent one

**Clients**
- `clients/README.md` — active clients list
- Every file in `clients/*/brief.md` — read the full `## Payment` section of each

**Finance**
- `career/personal-finance/expenses.md` — all bills, loans, and trials
- `career/personal-finance/snapshot.md` — full debt/asset picture

**Live Data (run these commands)**
- Run: `gws tasks tasklists list --format table` — get all task list IDs
- Run for each task list: `gws tasks tasks list --params '{"tasklist":"[ID]","showCompleted":false}' --format table` — get all pending tasks
- Run: `gws gmail users messages list --params '{"userId":"me","q":"is:unread is:important","maxResults":10}' --format table` — get important unread email IDs
- For each email ID returned, run: `gws gmail users messages get --params '{"userId":"me","id":"[ID]","format":"metadata","metadataHeaders":["Subject","From","Date"]}' --format table` — get subject, sender, date

Extract from all sources:
- Q1 goals and which are active vs ignored
- Challenge log activity in last 7 days
- Revenue to date
- Last weekly review "Next Week Focus" items — done or not
- Each client: outstanding balance, deadline, overdue status
- Loan balances, monthly payments, overdue amounts
- Bills due within 14 days
- Trials to cancel within 14 days
- All pending Google Tasks (all lists)
- All important unread emails (subject, sender, date)

---

## Step 2 — Identify Gaps

Compare what should be happening vs what is.

**Flag every gap:**
- Q1 goal with no challenge log activity this week → `IGNORED`
- "Next Week Focus" item not started → `CARRY OVER`
- Revenue at $0 with no active revenue attempt → `CRITICAL`
- Challenge log silent 3+ days → state exact days silent
- No content posted despite ideas in backlog → `CONTENT STALLED`
- Builds started but not shipped → `STALLED BUILD — [name]`
- Loan payment overdue or due within 7 days → `LOAN DUE`
- Client deadline within 7 days → `CLIENT DEADLINE`
- Client with no brief.md → `NO BRIEF`
- Important emails sitting unread for 2+ days → `EMAIL IGNORED`
- Google Tasks overdue (past due date) → `TASK OVERDUE`

Name exactly what was avoided. Do not soften.

---

## Step 3 — Prioritise Tasks

Rank by this order, strictly:

1. **Money** — client work due soon, outreach, proposals, closing deals, collecting payments
2. **Build progress** — moving an active venture forward
3. **Urgent admin** — overdue loan payments, overdue tasks, time-sensitive emails
4. **Content** — recording or posting

Cut to max 5 tasks. Cut lower-priority items if more exist.

---

## Step 4 — Output

Output in this exact format:

---

### Operator Mode — [DATE]

**Revenue to date:** $[X] / $1,000

---

**Client Deadlines & Balances:**

| Client | Project | Balance (UGX) | Deadline | Days Left | Status |
|--------|---------|--------------|----------|-----------|--------|
| [name] | [project] | [amount] | [date] | [N] | OVERDUE / CRITICAL / DUE SOON / OK |

- Mark CRITICAL if deadline ≤ 3 days
- Mark DUE SOON if deadline ≤ 7 days
- Mark OVERDUE if past deadline
- Skip table only if no active clients

---

**Loans & Debt:**

| Loan | Balance (UGX) | Payment Due (UGX) | Due Date | Status |
|------|--------------|-------------------|----------|--------|
| [name] | [balance] | [payment] | [date] | OVERDUE / DUE SOON / OK |

- Always show this table — debt is part of daily context
- Mark OVERDUE in bold if past due date
- Mark DUE SOON if due within 7 days

---

**Upcoming Bills (next 14 days):**

| Bill | Amount (UGX) | Due Date | Status |
|------|-------------|----------|--------|
| [name] | [amount] | [date] | OVERDUE / DUE SOON / UPCOMING |

*(Skip if nothing due in 14 days)*

---

**Trials to Cancel:**

| Trial | Cost if Charged | Cancel By | Days Left |
|-------|----------------|-----------|-----------|
| [name] | [cost] | [date] | [N days] |

*(Only show if cancel date is within 14 days. Flag CANCEL TODAY if ≤1 day left)*

---

**Google Tasks:**

List all pending tasks grouped by list name. Show due date if set. Flag OVERDUE if past due date.

| List | Task | Due | Status |
|------|------|-----|--------|
| [list name] | [task] | [date or —] | OVERDUE / PENDING |

*(Skip if no pending tasks)*

---

**Important Emails:**

| From | Subject | Date | Action Needed |
|------|---------|------|---------------|
| [sender] | [subject] | [date] | [one-line — reply / review / ignore] |

*(Skip if inbox is clear. Flag any proposal, payment, or client email as high priority)*

---

**Gaps identified:**
- [gap 1 — specific]
- [gap 2]
*(skip section if no gaps)*

---

**Today's Focus**

> [One sentence. The single most important thing to do today. Clients and money come first.]

---

**Tasks**

| # | Task | Priority | Why |
|---|------|----------|-----|
| 1 | [task] | MONEY / BUILD / ADMIN / CONTENT | [one-line reason] |
| 2 | [task] | MONEY / BUILD / ADMIN / CONTENT | [one-line reason] |
| 3 | [task] | MONEY / BUILD / ADMIN / CONTENT | [one-line reason] |
| 4 | [task] | MONEY / BUILD / ADMIN / CONTENT | [one-line reason] |

Limit to 3–4 tasks. Do not pad.

---

**Day Plan**

```
07:00–09:30 → [Deep work — client build or highest-priority item]
09:30–10:00 → Break
10:00–11:00 → [Money action — outreach, payment collection, email reply]
11:00–12:00 → [Build continued or content]
12:00–13:00 → Break / lunch
14:00–15:00 → [Optional — third task or admin]
15:00–15:30 → Quick tasks, replies, logging
```

Rules:
- Client work with a deadline within 7 days always gets the first block
- Money actions second — never "when there's time"
- Content goes last
- Max 6 hours productive work
- Call out if plan looks like yesterday with no progress on revenue or clients

---

**Warning** *(only if off track)*

> [Direct statement. What is the risk if today looks the same as yesterday? What pattern is forming?]

---

## Step 5 — Generate Presentation

After the text output, generate a PPTX using the `example-skills:pptx` skill.

Save to: `output/presentations/operator-[DATE].pptx`

### Slide structure

1. **Title** — "Operator Mode — [DATE]" / "Daily Briefing"
2. **Status Snapshot** — Revenue $X/$1,000 · Active clients · Challenge log last entry
3. **Client Deadlines** — table with deadlines, balances, days left, status
4. **Financial Picture** — two panels: Loans table (left) + Bills due (right)
5. **Google Tasks** — pending tasks grouped by list, overdue flagged red
6. **Important Emails** — sender, subject, date, action needed
7. **Gaps** — bullet list of all gaps with flag labels
8. **Today's Focus + Tasks** — focus sentence + task table
9. **Day Plan** — time block schedule
10. **Warning** *(only if off track)* — warning text in large bold

### Presentation rules
- Dark background, clean layout
- Red for OVERDUE / CRITICAL / WARNING
- Amber for DUE SOON / CARRY OVER
- Green for OK / positive stats
- No decorative images — data and text only
- After saving, state the file path

---

## Operator Rules

- Tasks must be specific and actionable
- If revenue is $0 and no active client pursuit — Task 1 is always client outreach or revenue attempt
- Client deadline within 3 days → it goes in Task 1 regardless of anything else
- Do not output motivational language — output tasks and a schedule
- Same gap two weeks in a row → call it a pattern, not a bad day
- Operator mode decides what gets done today. daily-briefing handles calendar logistics.
- Goals and calendar conflict → goals win
- The Day Plan is not aspirational — it is the actual schedule
- Loans and debt are always visible — financial pressure is context for every decision
