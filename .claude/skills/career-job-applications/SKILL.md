---
name: career-job-applications
description: Runs Simon's career job-application workflow. Use when Simon asks to find jobs, run the job hunt, apply for jobs, tailor his CV/cover letter, process job URLs, update the job tracker, or prepare daily application packets.
argument-hint: "[optional: job URLs, search terms, or path to jobs JSON]"
user-invocable: true
disable-model-invocation: true
---

# Career Job Applications

Find strong roles for Simon, prepare tailored application packets, and update the tracker. Never submit an application without Simon's explicit confirmation.

## Source Files

- System guide: `career/applications/README.md`
- Search guide: `career/applications/sources.md`
- Master profile: `career/applications/profile/master-profile.md`
- Application rules: `career/applications/profile/application-rules.md`
- Packet generator: `career/applications/scripts/job_hunt.py`
- Tracker: `career/applications/tracker.xlsx`
- Markdown log: `career/applications/log.md`

## Safety Rules

- Do not send emails, submit portal forms, upload files, or enter sensitive data unless Simon explicitly confirms at action time.
- `Applied` means Simon confirmed submission. A generated packet or draft is not an application.
- Stop before handling references, salary history, national ID, passport, certificates, or extra documents beyond CV/cover letter.
- Reject or flag jobs that require long unpaid tests before a serious screening call.
- Do not invent experience, skills, titles, dates, employers, or metrics.

## Default Search Scope

Search broadly across:

- Hiring Cafe
- LinkedIn
- Wellfound
- RemoteOK
- WeWorkRemotely
- BrighterMonday Uganda
- Fuzu
- UgandanJobline

Prioritise software/mobile roles first, then AI automation, data/BI, ERP, systems analysis, and IT leadership. Boost product companies, SaaS, fintech, marketplaces, and engineering-led teams.

## Workflow

### 1. Parse Input

If Simon provides job URLs, process those jobs directly.

If Simon provides search terms, search those terms plus the default role families.

If Simon provides nothing, run the default daily search for up to 10 high-fit roles.

### 2. Gather Current Jobs

Use web search/browser tools for current listings. Capture each promising job as JSON with:

```json
{
  "company": "Company Name",
  "role": "Role Title",
  "source": "Hiring Cafe",
  "url": "https://example.com/job",
  "location": "Remote",
  "job_type": "Full-time",
  "apply_method": "portal",
  "apply_url": "https://example.com/apply",
  "email": "",
  "salary": "Unknown",
  "description": "Full job description or useful summary..."
}
```

Save collected jobs to:

`career/applications/jobs/YYYY-MM-DD/source-jobs.json`

### 3. Generate Packets

Run:

```bash
python3 career/applications/scripts/job_hunt.py --input career/applications/jobs/YYYY-MM-DD/source-jobs.json --limit 10
```

Only add `--create-gmail-drafts` if Simon explicitly asks for Gmail drafts. This creates drafts only; it never sends.

### 4. Review Output

For each selected job, confirm the generated folder contains:

- `job-description.md`
- `fit-summary.md`
- `tailored-cv.md`
- `cover-letter.md`
- `application-email.md`
- `follow-up-email.md`
- `portal-instructions.md`

The script updates `tracker.xlsx` and `log.md`.

### 5. Report Back

Summarise:

- jobs searched
- packets generated
- top roles and fit scores
- statuses: `Drafted`, `Needs Manual Portal`, or `Ready`
- any sensitive-data or unpaid-test flags
- exact folder path for the day's packets

Do not say anything was applied unless Simon confirmed submission.

## Direct URL Mode

For one or more pasted job URLs:

1. Browse the URL.
2. Extract company, role, location, job type, application method, salary if shown, and the full JD.
3. Save a JSON input file for those URLs.
4. Run the packet generator.
5. Report the packet path and tracker status.

## Daily Automation Prompt

For an 11:00 AM daily automation, use this task prompt:

```text
Run the career-job-applications workflow for Simon. Search current listings across Hiring Cafe, LinkedIn, Wellfound, RemoteOK, WeWorkRemotely, BrighterMonday Uganda, Fuzu, and UgandanJobline. Prioritise software/mobile roles first, then AI automation, data/BI, ERP, systems analysis, and IT leadership. Prepare up to 10 high-fit application packets under career/applications/jobs/YYYY-MM-DD/, update tracker.xlsx and log.md, and report the top roles, statuses, flags, and packet folder. Do not submit applications or send emails.
```

