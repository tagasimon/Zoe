# Career Applications System

This folder is Zoe's job-application operating system for Simon.

## Operating Rules

- Prepare applications aggressively, but never submit silently.
- A job is `Applied` only after Simon confirms the email or portal form was submitted.
- Sensitive data stops the workflow: references, salary history, national ID, extra certificates, or documents beyond CV/cover letter require Simon approval.
- Long unpaid tests before a serious screening call are a red flag and should be rejected or escalated to Simon.
- Lead with Simon as Founder + Software Developer: Elastic Technologies is proof of product, client, and automation execution.

## Folder Structure

| Path | Purpose |
|------|---------|
| `tracker.xlsx` | Local application tracker spreadsheet |
| `log.md` | Lightweight Markdown application log |
| `jobs/YYYY-MM-DD/company-role/` | Per-job packets |
| `profile/` | Master profile and application rules |
| `templates/` | CV, cover letter, email, and follow-up templates |
| `scripts/job_hunt.py` | Repeatable packet generator and tracker updater |
| `samples/` | Sample jobs used for dry runs |

## Daily Workflow

1. Collect job listings from Hiring Cafe, LinkedIn, Wellfound, RemoteOK, WeWorkRemotely, BrighterMonday, Fuzu, and UgandanJobline.
2. Convert promising listings into JSON with the fields shown in `samples/sample_jobs.json`.
3. Run:

```bash
python3 career/applications/scripts/job_hunt.py --input career/applications/samples/sample_jobs.json --limit 10
```

4. Review the generated folders under `jobs/YYYY-MM-DD/`.
5. Send email applications or complete portal applications manually.
6. Update `tracker.xlsx` and `log.md` from `Drafted` or `Needs Manual Portal` to `Applied` only after submission.

## Statuses

`Found`, `Ready`, `Drafted`, `Needs Manual Portal`, `Applied`, `Followed Up`, `Interview`, `Rejected`, `Withdrawn`, `No Response`

