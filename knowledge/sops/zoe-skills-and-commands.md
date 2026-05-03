# Zoe Skills And Commands

_Last updated: 2026-05-03_

This document explains what each Zoe skill does, when to use it, and what files it should update.

## Skill Rule

Use skills to reduce repeated thinking.

If Simon repeats a workflow three times, build or update a skill.

Simon uses both Claude and Codex:
- Keep `.claude/skills/` and `.agents/skills/`.
- When changing a Zoe-owned skill, mirror the change in both places.
- If a skill exists in only one runtime, document that limitation here.

## Daily Skills

### `operator-mode`

Use when:
- Starting the day.
- Simon feels scattered.
- There are many possible tasks.
- Money, clients, jobs, builds, and habits are competing.

Prompt:

```text
Run operator-mode for today. Be strict. Give me only the top 3 tasks.
```

Reads:
- `AI_HANDOFF.md`
- `identity/goals.md`
- `operations/dashboard/current-dashboard.csv`
- `clients/client-crm.csv`
- `career/applications/job-application-tracker.csv`
- `pipeline/client-acquisition/crm.csv`
- `operations/weekly-review/logs/`

Outputs:
- Today's focus.
- Top 3 tasks.
- Gaps and avoidance risks.
- A realistic day plan.

Updates:
- Usually none unless Simon asks Zoe to log the plan.

### `daily-briefing`

Use when:
- Calendar, Gmail, and Google Tasks matter today.
- Simon needs logistics, not strategy.

Prompt:

```text
Run daily-briefing for today.
```

Reads:
- Google Calendar
- Gmail
- Google Tasks
- finance snapshot
- current goals

Outputs:
- Calendar events.
- urgent tasks.
- important emails.
- finance warning.

Rule:
- Run after `operator-mode`, not before. Goals beat calendar noise.

## Money And Client Skills

### `client-prospecting`

Use when:
- Simon needs new client leads.
- A target industry is selected.
- Elastic needs outreach.

Prompt:

```text
Run client-prospecting for hotels in Kampala, service: websites and automation.
```

Outputs:
- Shortlist of leads.
- Decision makers if findable.
- Outreach messages.
- Saved lead file.

Updates:
- `pipeline/client-acquisition/leads/`
- `pipeline/client-acquisition/crm.csv`

### `website-audit-outreach`

Use when:
- Simon has a company website URL.
- The goal is to turn a website problem into a sales conversation.

Prompt:

```text
Run website-audit-outreach for https://example.com, Company Name, service: software.
```

Outputs:
- Website audit report.
- WhatsApp/email/LinkedIn outreach.
- Lead file.

Updates:
- `output/reports/`
- `pipeline/client-acquisition/leads/`
- `pipeline/client-acquisition/crm.csv`

## Career Skills

### `career-job-applications`

Use when:
- Simon needs income stability.
- Simon wants to find roles.
- Simon has job URLs.
- Simon wants tailored CV/cover letter packets.

Prompt:

```text
Run career-job-applications for mobile Flutter roles.
```

Outputs:
- Job shortlist.
- Tailored CV.
- Cover letter.
- Application email.
- Follow-up email.
- Portal instructions.

Updates:
- `career/applications/jobs/`
- `career/applications/job-application-tracker.csv`
- `career/applications/log.md`

Safety:
- Zoe must not submit applications silently.
- Simon must approve before anything is marked applied.

## Build And Venture Skills

### `venture-builder`

Use when:
- Simon has a product idea.
- A venture needs a 3-day MVP scope.
- A build has become vague.

Prompt:

```text
Run venture-builder for [idea]. Make it shippable in 3 days.
```

Outputs:
- MVP scope.
- Stack.
- day-by-day build plan.
- revenue test.

Updates:
- Relevant `ventures/[venture]/README.md`
- `ventures/venture-tracker.csv`

### `challenge-tracker`

Use when:
- Simon explicitly restarts a challenge.
- Historical challenge revenue, build, or content progress needs review.

Prompt:

```text
Run challenge-tracker for today's work.
```

Updates:
- `challenge/zero-to-1000/log.md`
- `challenge/zero-to-1000/revenue.md`
- `challenge/zero-to-1000/execution-tracker.csv`

Current status:
- Zero to $1,000 has ended.
- Do not run this as a daily priority unless Simon restarts it.

## Content Skills

### `content-engine`

Use when:
- Simon has done real work and needs content ideas from it.
- Build/client/job lessons can become TikTok or LinkedIn posts.

Prompt:

```text
Run content-engine from today's work.
```

Updates:
- `brand/content/content-tracker.csv`
- `brand/content/ideas/`

### `tiktok-writer`

Use when:
- Simon has a specific video topic.
- The idea needs a full script.

Prompt:

```text
Run tiktok-writer for: I built an AI Life OS to fight procrastination.
```

Outputs:
- Hook options.
- Script.
- Visual cues.
- Caption.
- Hashtags.

Updates:
- `brand/content/scripts/`
- `brand/content/content-tracker.csv`

## Reflection Skills

### `weekly-review`

Use when:
- It is Sunday.
- Zoe has gone stale.
- Simon feels like time disappeared.

Prompt:

```text
Run weekly-review for the week ending today. Save it.
```

Outputs:
- Evidence record.
- mistakes.
- lessons.
- top 3 actions for next week.

Updates:
- `operations/weekly-review/logs/`
- `operations/weekly-review/weekly-review-tracker.csv`

### `brain-scan`

Use when:
- There have been many AI sessions.
- Zoe needs to learn from recurring workflows.
- New skills or system improvements may be needed.

Prompt:

```text
Run brain-scan for the last 7 days.
```

Updates:
- `operations/brain-scan/`

## Life Skills

### `personal-finance`

Use when:
- Money arrives.
- Debts or bills are unclear.
- Simon needs a spending plan.
- A 48-hour spending protocol is needed.

Prompt:

```text
Run personal-finance. Update my current cash, debts, and next 48-hour plan.
```

Updates:
- `career/personal-finance/snapshot.md`
- `career/personal-finance/plan.md`
- `career/personal-finance/income-expense-tracker.csv`

### `toastmasters-speech-writer`

Use when:
- Simon needs a Toastmasters speech.
- The speech needs story, humor, structure, and timing.

Updates:
- `career/toastmasters/`

## Skill Priority

When unsure, use this order:
1. `operator-mode`
2. `daily-briefing`
3. money/client skill
4. career/job skill
5. build/venture skill
6. content skill
7. reflection skill

## Skill Creation Rule

Create a new skill only when:
- The workflow has repeated at least three times.
- The inputs and outputs are predictable.
- It saves real time.
- It reduces procrastination or decision fatigue.

Do not create skills as procrastination.
