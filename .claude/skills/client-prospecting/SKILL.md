---
name: client-prospecting
description: Searches for business leads in Uganda/East Africa matching a target profile. Outputs a shortlist with company info, decision makers, recommended service, and a ready-to-send outreach message. Use when Simon needs to find new clients for Elastic Technologies.
argument-hint: "[industry or company type] [service: erp|software|automation|any]"
user-invocable: true
disable-model-invocation: true
---

# Client Prospecting

Find qualified leads for Elastic Technologies Ltd and prepare outreach.

**Target profile input:** $ARGUMENTS

---

## Context

**Company:** Elastic Technologies Ltd — Simon Kazooba, Kampala, Uganda
**Services:**
- Custom Software: websites, mobile apps, workflow automations
- ERP Solutions: enterprise resource planning for SMEs and corporates
- Polish My CV: SaaS (not a B2B service — skip for prospecting)

**Ideal client profile:**
- Based in Uganda (Kampala first, then other regions)
- Has 10+ employees or visible operational complexity
- Likely has manual processes, spreadsheet chaos, or an outdated system
- Has budget to invest in software (not micro-businesses)
- Decision maker is accessible (LinkedIn, company website, WhatsApp)

---

## Step 1 — Parse Input

If $ARGUMENTS is provided, extract:
- **Industry/sector** (e.g. "logistics", "healthcare", "manufacturing")
- **Service to pitch** (erp | software | automation | any)
- **Location** (default: Kampala, Uganda)

If $ARGUMENTS is empty or vague, ask Simon:
1. What industry or type of business should we target?
2. Which service — ERP, custom software, automation, or open?
3. Any specific location beyond Kampala?
4. Any companies he already has in mind to research?

---

## Step 2 — Search for Leads

Use web search to find matching companies. Run searches like:

- `"[industry] companies Kampala Uganda"`
- `"[industry] Uganda 2024 top companies"`
- `"[industry] Uganda LinkedIn"`
- `"[company type] Uganda contact"`

For each promising result, look for:
- Company name and website
- What they do and approximate size
- LinkedIn presence or key people
- Phone number or email (website contact page, LinkedIn)
- Signs they need the service (e.g. no online presence → needs website; complex ops → needs ERP)

Aim for **8–12 raw candidates**, then filter to the **top 5–7**.

---

## Step 3 — Score and Filter

For each candidate, score fit (1–3):

| Signal | Score |
|--------|-------|
| Matches industry target exactly | +1 |
| 10+ employees or visible scale | +1 |
| Has an obvious pain point matching service | +1 |
| Decision maker findable (LinkedIn/website) | +1 |
| Based in Kampala | +1 |

Keep only leads scoring 3+. If fewer than 5 qualify, broaden the search.

---

## Step 4 — Build the Lead Shortlist

Output a table:

| # | Company | Industry | Size | Why they fit | Service to pitch | Contact | Decision maker |
|---|---------|----------|------|-------------|-----------------|---------|----------------|
| 1 | ... | ... | ... | ... | ... | ... | ... |

For each lead, add a short **Research note** (1–2 sentences on what you found about their current tech/ops situation).

---

## Step 5 — Write Outreach Messages

For the top 3 leads, write a WhatsApp or email outreach message.

**Rules:**
- Short — under 100 words
- Reference something specific about their business (shows research)
- Lead with a relevant pain point or outcome, not a service pitch
- End with a soft CTA: a question or a request for a short call
- Tone: professional but warm — Simon is local, not a foreign vendor

Use the template from [examples/outreach-templates.md](examples/outreach-templates.md).

---

## Step 6 — Save and Create Tasks

1. Save the full shortlist to:
   `pipeline/client-acquisition/leads/[YYYY-MM-DD]-[industry-slug].md`

2. For each top 3 lead, create a Google Task via gws:
   ```bash
   python3 /Users/kazoobasimon/Claude/Zoe/credentials/gws_auth.py
   # then use gws tasks create "Follow up with [Company] re ERP" --due [3 days from now]
   ```

3. Tell Simon: here are your leads, here are your messages, tasks are created.

---

## Output Format

```
## Lead Shortlist — [Industry] — [Date]

[Table of leads]

---

### Top 3 — Ready to Contact

**1. [Company Name]**
- Research note: [what you found]
- Outreach message:
  > [message text]

**2. ...**
**3. ...**

---

Tasks created in Google Tasks: ✓
Saved to: pipeline/client-acquisition/leads/[file]
```
