---
name: weekly-standup
description: End-of-week summary for Simon and his team. Pulls completed tasks, overdue items, and what Alvin and Phillip need to know. Produces a team WhatsApp message draft. Run every Friday.
argument-hint: "[optional: week ending date, default today]"
user-invocable: true
disable-model-invocation: true
---

# Weekly Standup

End-of-week review for Elastic Technologies Ltd.

**Week ending:** $ARGUMENTS (default: today)

---

## Team Context

| Name | Role | Loop in when... |
|------|------|-----------------|
| Simon | Founder & Developer | Everything |
| Alvin | Accountant | Financial matters, invoicing, payments |
| Phillip | Business Development | New leads, proposals, client meetings |

---

## Step 1 — Pull Completed Tasks This Week

For each task list, fetch tasks completed in the last 7 days:

```bash
# URGENT
gws tasks tasks list --params '{
  "tasklist": "MTgyOTQ4MTE4NDQ1MTI1ODkwNjM6MDow",
  "showCompleted": true,
  "showHidden": true,
  "maxResults": 30
}'

# Action Required
gws tasks tasks list --params '{
  "tasklist": "WWRWVjRqQXRaN29PU0MxZA",
  "showCompleted": true,
  "showHidden": true,
  "maxResults": 30
}'

# Meetings & Events
gws tasks tasks list --params '{
  "tasklist": "a3RqNzRpQXRaN29PU0MxZA",
  "showCompleted": true,
  "showHidden": true,
  "maxResults": 20
}'
```

Filter to tasks where `completed` date is within the last 7 days.

---

## Step 2 — Pull Overdue / Still Open Tasks

From same lists, extract tasks where:
- `status` = `needsAction`
- `due` date is in the past

---

## Step 3 — Pull This Week's Calendar Events

```bash
gws calendar events list --params '{
  "calendarId": "primary",
  "maxResults": 20,
  "singleEvents": true,
  "orderBy": "startTime",
  "timeMin": "[7 DAYS AGO]T00:00:00+03:00",
  "timeMax": "[TODAY]T23:59:59+03:00"
}'
```

Extract meetings, calls, or notable events that happened this week.

---

## Step 4 — Compose the Standup Report

Output in this format:

---

### Weekly Standup — Week of [DATE RANGE]
**Elastic Technologies Ltd**

---

#### What Moved This Week

- [completed task or milestone]
- [completed task or milestone]
- ...

> Quiet week — nothing completed. *(if empty)*

---

#### Still Open / Overdue

| Task | Due | Days overdue |
|------|-----|-------------|
| ... | ... | ... |

---

#### For Alvin
*(Only include if there are financial items — invoicing, payments, costs)*

- [item Alvin needs to know or act on]

> Nothing financial this week. *(if none)*

---

#### For Phillip
*(Only include if there are lead, proposal, or BD items)*

- [item Phillip needs to know or act on — new prospect, proposal status, client meeting outcome]

> Nothing for Phillip this week. *(if none)*

---

#### Focus for Next Week

Top 3 priorities based on open tasks and current goals:

1. [priority]
2. [priority]
3. [priority]

---

## Step 5 — Draft WhatsApp Message

Write a short team WhatsApp message Simon can send to Alvin and Phillip.

Rules:
- Under 100 words
- Casual tone — this is a team chat, not a corporate email
- Only include what's relevant to them
- No bullet wall — write it like a real message

Format:
```
Hey guys, quick week update 👋

[2-3 sentences on what moved]

Alvin — [what Alvin needs to do/know, if anything]
Phillip — [what Phillip needs to do/know, if anything]

Next week: [top 1-2 focus areas]
```

---

## Step 6 — Save the Report

Save to: `projects/client-acquisition/weekly-standups/[YYYY-MM-DD]-standup.md`

Create the folder if it doesn't exist.
