# Job Source Intake Guide

Use this guide for the daily broad search. The first version of the system prepares packets from collected listings; it does not bypass job-board protections or submit forms.

## Sources

| Source | What to Search |
|--------|----------------|
| Hiring Cafe | Remote Flutter, mobile, full-stack, software engineer, automation engineer |
| LinkedIn | Uganda, remote, East Africa, Flutter, full-stack, software developer, AI automation |
| Wellfound | Startup/product roles: full-stack, mobile, automation, AI workflow |
| RemoteOK | Remote software, Flutter, Python, automation, API |
| WeWorkRemotely | Remote programming roles matching software/mobile/automation |
| BrighterMonday Uganda | Kampala software developer, IT officer, systems analyst, data analyst |
| Fuzu | Uganda/East Africa technology roles |
| UgandanJobline | Local software, data, IT, NGO technology roles |

## JSON Intake Format

Save collected jobs as a JSON list matching this shape:

```json
[
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
]
```

## Run Command

```bash
python3 career/applications/scripts/job_hunt.py --input career/applications/samples/sample_jobs.json --limit 10
```

Use `--create-gmail-drafts` only when you explicitly want Zoe to create Gmail drafts through `gws`. This still never sends email.

