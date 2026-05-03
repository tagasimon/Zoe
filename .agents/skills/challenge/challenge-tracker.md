---
name: challenge-tracker
description: Tracks Simon's $0 → $1,000 challenge. Reads logs and revenue, updates progress, kills dead ideas, and outputs the next 3 actions that have the best shot at making money fast.
argument-hint: "[optional: log an update — 'sold X for $Y' or 'built X' or 'posted X']"
user-invocable: true
disable-model-invocation: true
---

# Challenge Tracker — $0 → $1,000

**Update provided:** $ARGUMENTS (if empty — read and report only)

---

## Step 1 — Read Current State

Read all three files:

- `challenge/zero-to-1000/revenue.md` — total earned, breakdown by source
- `challenge/zero-to-1000/log.md` — all activity entries
- `challenge/zero-to-1000/rules.md` — what counts as valid revenue

Extract:
- Total revenue earned to date
- Revenue this month
- Last activity entry (date + what was done)
- Days since last entry
- How far from $1,000 target

---

## Step 2 — Log the Update (if $ARGUMENTS provided)

If Simon provided an update (e.g. "sold a template for $20" or "posted video 3" or "launched product page"), append it to `challenge/zero-to-1000/log.md`:

```
[TODAY] ACTION: [what was done] | RESULT: [outcome or "pending"]
```

If the update includes revenue (e.g. "earned $20"), also update `challenge/zero-to-1000/revenue.md`:
- Add to the monthly total table
- Update the all-time total
- Add a row to the revenue by source table

If no $ARGUMENTS — skip this step, read only.

---

## Step 3 — Scan the Builds Folder

List all files in `challenge/zero-to-1000/builds/`.

For each build found, assess:
- What is it?
- Has it made any money? (check revenue.md)
- How long has it existed without revenue?

**Kill criteria — flag any build that:**
- Has existed for 14+ days with $0 revenue
- Was mentioned in the log but never launched
- Has not been mentioned in the last 7 days of log entries

Label each as: `WORKING` / `TOO EARLY` / `KILL IT`

---

## Step 4 — Analyse What's Working

From revenue.md and log.md, identify:

- Which revenue source has produced the most money (if any)
- Which content or product got the most traction
- Which actions in the log had a result vs which had "pending" or no follow-up

If revenue is $0 and log entries exist:
- List every action taken
- Identify what was tried and abandoned vs what is still active
- Note: trying many things without finishing any is a pattern — call it out

If revenue is $0 and log is empty:
- The challenge has not started. Say this plainly.

---

## Step 5 — Generate Next Actions

Based on everything read, output the 3 best next actions to reach $1,000 faster.

**Ranking criteria — favour actions that:**
1. Can generate money within 7 days
2. Require less than 4 hours of work
3. Leverage what's already built (don't start from scratch)
4. Have been proven to work (in the log or by others in the niche)

**Avoid recommending:**
- New product ideas if existing ones haven't launched yet
- More content if content already posted has zero sales
- Research or planning tasks (do, don't plan)

Each action must be:
- Specific (not "post more content" — "post a TikTok showing [specific product] with a buy link in bio")
- Completable within 1–2 days
- Directly connected to revenue or building the audience that produces revenue

---

## Step 6 — Output the Report

Output in this exact format:

---

### Challenge Tracker — $0 → $1,000 | [DATE]

**Progress**

| Metric | Value |
|--------|-------|
| Total earned | $[X] |
| This month | $[X] |
| Remaining to goal | $[X] |
| Last activity | [X days ago — DATE] |
| Challenge status | [Not started / Active / Stalled / On track] |

---

**Revenue Breakdown**

| Source | Earned |
|--------|--------|
| [source] | $[X] |
| **Total** | $[X] |

---

**Build Review**

| Build | Status | Revenue | Verdict |
|-------|--------|---------|---------|
| [name] | [launched/not launched] | $[X] | [WORKING / TOO EARLY / KILL IT] |

*If no builds exist yet: "No builds found. The first step is shipping something."*

---

**What's Working**

[1–3 sentences. If revenue exists: what produced it and why. If $0: what was tried and the honest assessment of why nothing has worked yet.]

---

**Kill List**

[List any builds or ideas that should be dropped immediately. Be direct.
Example: "The [product] idea has been in the log for 11 days with no launch and no revenue. Kill it or launch it today — no middle ground."]

*If nothing to kill: "Nothing to cut yet."*

---

**Next 3 Actions**

| # | Action | Est. time | Money impact |
|---|--------|-----------|--------------|
| 1 | [specific action] | [Xh] | [direct / indirect] |
| 2 | [specific action] | [Xh] | [direct / indirect] |
| 3 | [specific action] | [Xh] | [direct / indirect] |

---

**One Line**

[The single thing Simon should do in the next 24 hours to move the number. No options. One thing.]

---

## Tracker Rules

- Never recommend more than 3 next actions
- Never recommend planning, research, or "thinking about" tasks
- If the challenge log has been empty for 7+ days, call it out before anything else
- Revenue is the only metric that matters — follower counts and content views are secondary unless directly tied to a product
- A stalled challenge is a decision: restart with urgency or admit it's dead
