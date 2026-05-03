---
name: website-audit-outreach
description: Audits a prospect's website for technical issues (SEO, performance, mobile, security, features), generates a branded HTML report, and writes personalized outreach messages. Use when Simon wants to convert a website URL into a sales lead for Elastic Technologies.
argument-hint: "<url> [company name] [service: software|erp|automation]"
user-invocable: true
disable-model-invocation: false
---

# Website Audit → Outreach

Turn a prospect's website URL into a sales lead with a professional audit report and ready-to-send messages.

**Input:** $ARGUMENTS

---

## Context

**Company:** Elastic Technologies Ltd — Simon Kazooba, Kampala, Uganda
**Pitch angle:** We found problems on your website. We can fix them.
**Services:** Custom software, websites, mobile apps, ERP, automation

**When to use this skill:**
- Before cold outreach — gives Simon something concrete to say
- When a prospect has an obviously broken/outdated website
- To add credibility to ERP pitches (show you did your homework)

---

## Step 1 — Parse Input

Extract from $ARGUMENTS:
- **URL** — required. If missing, ask Simon for it.
- **Company name** — try to infer from URL if not given (e.g. "acme.co.ug" → "Acme")
- **Service angle** — default: `software`. Options: `erp`, `automation`, `any`

Confirm before proceeding:
```
Auditing: [URL]
Company: [Name]
Service angle: [software|erp|automation]
```

---

## Step 2 — Fetch and Analyze Website

Run:
```bash
cd /Users/kazoobasimon/Claude/Zoe/.claude/skills/website-audit-outreach/scripts
python3 audit_website.py "<url>" --output /tmp/audit_raw.json
```

This fetches the live website and extracts: title, meta description, H1s, images (alt text), load time, SSL, contact info, social links, forms, viewport tag.

If the site is unreachable, tell Simon and stop. Don't fabricate results.

---

## Step 3 — Score the Audit

Run:
```bash
python3 score_audit.py /tmp/audit_raw.json --output /tmp/audit_scored.json
```

Categories (25 points each, 100 total):
- **SEO** — title, description, H1s
- **Performance** — load time, image alt text
- **UX / Mobile** — viewport, content depth
- **Trust & Security** — HTTPS, contact info
- **Features** — contact forms, analytics

Grades: A (80+), B (70+), C (60+), D (40+), F (<40)

---

## Step 4 — Generate HTML Report

Determine output path:
```
/Users/kazoobasimon/Claude/Zoe/output/reports/audit-[company-slug]-[date].html
```

Run:
```bash
python3 generate_report.py /tmp/audit_scored.json \
  --company "[Company Name]" \
  --output /Users/kazoobasimon/Claude/Zoe/output/reports/audit-[slug]-[date].html
```

The report includes: grade, score breakdown bars, findings with severity badges, recommendations, and Elastic Technologies contact CTA.

---

## Step 5 — Generate Outreach Messages

Run:
```bash
python3 generate_outreach.py /tmp/audit_scored.json \
  --company "[Company Name]" \
  --service [software|erp|automation] \
  --output /tmp/outreach.json
```

Generates 3 messages:
1. **WhatsApp** — under 100 words, personal, specific issue hook
2. **Email** — subject line + body, top 3 issues listed
3. **LinkedIn note** — under 300 chars

---

## Step 6 — Save Lead and Create Task

Run:
```bash
python3 save_lead.py \
  --company "[Company Name]" \
  --url "[url]" \
  --report /Users/kazoobasimon/Claude/Zoe/output/reports/audit-[slug]-[date].html \
  --outreach /tmp/outreach.json \
  --scored /tmp/audit_scored.json
```

Saves to: `pipeline/client-acquisition/leads/[date]-[slug].md`
Creates Google Task: "Follow up with [Company] — send website audit" (due: 2 days)

---

## Step 7 — Present Results

Output to Simon in this format:

```
## Website Audit — [Company Name]
URL: [url]
Score: [X]/100 ([Grade])

### Top Issues
- [CRITICAL/HIGH] issue 1
- [HIGH] issue 2
- ...

### Outreach — WhatsApp
> [message]

### Outreach — Email
Subject: [subject]
> [body]

### Outreach — LinkedIn
> [note]

---
Report saved: output/reports/audit-[slug]-[date].html
Lead saved: pipeline/client-acquisition/leads/[file]
Task created: ✓ (due [date])
```

---

## Rules

- Never fabricate audit findings. Only report what the scripts detect.
- If a site loads but returns partial HTML, note it and score conservatively.
- Keep outreach messages specific — name the actual issue found, not generic problems.
- If Simon provides multiple URLs, audit them one at a time in order.
- Grade D or F = lead is strong — more pain = more reason to call us.
