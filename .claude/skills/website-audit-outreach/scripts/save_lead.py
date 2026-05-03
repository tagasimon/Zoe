#!/usr/bin/env python3
"""
Save an audited lead to the pipeline and create a Google Task.
Usage: python3 save_lead.py --company "Name" --url URL --report /path/report.html
       --outreach /path/outreach.json --scored /path/scored.json
"""
import json
import argparse
import subprocess
from datetime import date, timedelta
from pathlib import Path


PIPELINE_DIR = Path("/Users/kazoobasimon/Claude/Zoe/pipeline/client-acquisition/leads")


def slugify(text):
    slug = text.lower().strip()
    for char in " '\"&/\\()":
        slug = slug.replace(char, "-")
    while "--" in slug:
        slug = slug.replace("--", "-")
    return slug.strip("-")


def create_google_task(title, due_date_str):
    try:
        subprocess.run(
            ["python3", "/Users/kazoobasimon/Claude/Zoe/credentials/gws_auth.py"],
            capture_output=True, text=True, timeout=10
        )
    except Exception:
        pass

    try:
        result = subprocess.run(
            ["gws", "tasks", "create", title, "--due", due_date_str],
            capture_output=True, text=True, timeout=15
        )
        if result.returncode == 0:
            return True, f"Task created: {title} (due {due_date_str})"
        return False, f"gws error: {result.stderr.strip()}"
    except FileNotFoundError:
        return False, "gws CLI not found — create task manually"
    except Exception as e:
        return False, str(e)


def save_lead(company, url, report_path, outreach_data, scored_data):
    today = date.today()
    slug = slugify(company)
    filepath = PIPELINE_DIR / f"{today.isoformat()}-{slug}.md"
    PIPELINE_DIR.mkdir(parents=True, exist_ok=True)

    score = scored_data.get("percentage", 0)
    grade = scored_data.get("grade", "?")
    top_issues = scored_data.get("top_issues", [])
    service = outreach_data.get("service_angle", "software")

    whatsapp = outreach_data.get("whatsapp", "")
    email_subject = outreach_data.get("email_subject", "")
    email_body = outreach_data.get("email_body", "")
    linkedin = outreach_data.get("linkedin_note", "")

    issue_lines = "\n".join(
        f"- [{f['severity'].upper()}] {f['issue']}"
        for f in top_issues if f.get("issue")
    ) or "- No critical issues found"

    md = f"""# Lead: {company}

| Field | Value |
|-------|-------|
| Website | {url} |
| Audit Date | {today.isoformat()} |
| Score | {score}/100 ({grade}) |
| Service Angle | {service} |
| Report | {report_path} |
| Status | new |

---

## Top Issues

{issue_lines}

---

## Outreach — WhatsApp

{whatsapp}

---

## Outreach — Email

**Subject:** {email_subject}

{email_body}

---

## Outreach — LinkedIn

{linkedin}

---

## Activity Log

- {today.isoformat()} — Lead created via `/website-audit-outreach`
"""

    filepath.write_text(md)
    print(f"Lead saved: {filepath}")

    due = (today + timedelta(days=2)).isoformat()
    task_title = f"Follow up with {company} — send website audit"
    ok, msg = create_google_task(task_title, due)
    print(msg)

    return str(filepath), ok


def main():
    parser = argparse.ArgumentParser(description="Save audited lead to pipeline")
    parser.add_argument("--company", required=True)
    parser.add_argument("--url", required=True)
    parser.add_argument("--report", required=True)
    parser.add_argument("--outreach", required=True)
    parser.add_argument("--scored", required=True)
    args = parser.parse_args()

    with open(args.outreach) as f:
        outreach_data = json.load(f)
    with open(args.scored) as f:
        scored_data = json.load(f)

    save_lead(args.company, args.url, args.report, outreach_data, scored_data)


if __name__ == "__main__":
    main()
