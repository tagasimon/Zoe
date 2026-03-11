---
name: daily-briefing
description: Morning briefing for Simon. Pulls today's calendar events, urgent + action-required tasks, and unread emails. Outputs a prioritised day plan. Run at the start of each day.
argument-hint: "[optional: date, default today]"
user-invocable: true
disable-model-invocation: true
---

# Daily Briefing

Good morning. Here's what's on Simon's plate today.

**Date:** $ARGUMENTS (default: today)

---

## Step 1 — Pull Today's Calendar Events

```bash
gws calendar events list --params '{
  "calendarId": "primary",
  "maxResults": 10,
  "singleEvents": true,
  "orderBy": "startTime",
  "timeMin": "[TODAY]T00:00:00+03:00",
  "timeMax": "[TODAY]T23:59:59+03:00"
}'
```

Extract: event title, start time, location/meeting link if present.

---

## Step 2 — Pull Tasks (URGENT + Action Required lists)

```bash
# URGENT list
gws tasks tasks list --params '{
  "tasklist": "MTgyOTQ4MTE4NDQ1MTI1ODkwNjM6MDow",
  "showCompleted": false,
  "maxResults": 20
}'

# Action Required list
gws tasks tasks list --params '{
  "tasklist": "WWRWVjRqQXRaN29PU0MxZA",
  "showCompleted": false,
  "maxResults": 20
}'
```

Extract: task title, due date (flag if overdue), notes if present.

---

## Step 3 — Pull Unread Emails (top 10)

```bash
gws gmail users messages list --params '{
  "userId": "me",
  "q": "is:unread -category:promotions -category:social",
  "maxResults": 10
}'
```

For each message ID returned, fetch subject + sender:
```bash
gws gmail users messages get --params '{
  "userId": "me",
  "id": "[MESSAGE_ID]",
  "format": "metadata",
  "metadataHeaders": ["Subject", "From", "Date"]
}'
```

For each email, classify priority:
- **HIGH** — client reply, proposal, payment, SSL/hosting expiry, anything with a deadline or financial impact
- **NORMAL** — newsletters you need to act on, community updates requiring a response
- **SKIP** — pure newsletters, notifications, social digests

---

## Step 3b — Create Tasks for HIGH Priority Emails

For every email classified as HIGH, automatically create a task in the **Action Required** list:

```bash
gws tasks tasks insert --params '{"tasklist": "WWRWVjRqQXRaN29PU0MxZA"}' --json '{
  "title": "Reply: [subject] — [sender name]",
  "notes": "From: [full sender]\nReceived: [date]\nSnippet: [first 100 chars of email]",
  "due": "[TODAY]T00:00:00.000Z"
}'
```

Create one task per HIGH priority email. Skip if a task for that email already exists (check existing Action Required tasks for the sender name before inserting).

---

## Step 4 — Compose the Briefing

Output in this format:

---

### Good morning, Simon — [DAY], [DATE]

**Today's Schedule**

| Time | Event |
|------|-------|
| HH:MM | [event] |
| ... | ... |

> No events today — clear calendar. *(if empty)*

---

**Priority Tasks**

🔴 Overdue:
- [task] (was due [date])

🟡 Due today:
- [task]

⚪ Upcoming:
- [task] (due [date])

> No open tasks — inbox zero. *(if empty)*

---

**Emails to Action** *(unread, non-promotional)*

| Priority | From | Subject |
|----------|------|---------|
| HIGH | ... | ... |
| NORMAL | ... | ... |

> No unread emails. *(if empty)*

---

**Focus Recommendation**

Based on what's loaded today, suggest Simon's top 1–2 priorities in one sentence. Be direct.

Example: *"Clear the overdue ERP proposal for Kampala Breweries first — it's been sitting 3 days. Then prep for the 2PM call."*

---

## Step 5 — Confirm Tasks Created

After creating tasks, list them at the bottom of the briefing:

```
Tasks created from emails:
- "Reply: Your SSL will pause in -3 days — Namecheap" → Action Required, due today
- "Reply: 10 Days Left — District Conference Awards" → Action Required, due today
```

If no HIGH emails were found, say: *"No new tasks created from emails."*

---

## Step 6 — Flag Blockers

If any of these exist, call them out explicitly:
- Overdue task older than 2 days
- Email from a client or prospect that hasn't been replied to
- Calendar event in the next 2 hours with no prep done

Keep the briefing under one screen. No padding, no filler.
