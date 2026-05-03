#!/usr/bin/env python3
"""
Generate personalized outreach messages from scored audit JSON.
Usage: python3 generate_outreach.py <scored.json> --company "Company Name" [--service software|erp|automation|any]
"""
import json
import argparse


SERVICE_LABELS = {
    "software": "custom website and software development",
    "erp": "ERP and business management systems",
    "automation": "business process automation",
    "any": "software and digital solutions",
}

SEVERITY_ORDER = {"critical": 0, "high": 1, "medium": 2, "low": 3}


def pick_lead_issue(top_issues):
    """Return the single most compelling issue to open with."""
    for severity in ("critical", "high", "medium"):
        for f in top_issues:
            if f.get("severity") == severity:
                return f.get("issue", "")
    return ""


def generate_outreach(data, company_name, service="software"):
    top_issues = data.get("top_issues", [])
    pct = data.get("percentage", 0)
    grade = data.get("grade", "D")
    url = data.get("url", "")
    accessible = data.get("total_score", -1) != 0 or any(
        f.get("severity") not in ("critical",) for f in top_issues
    )
    site_down = not data.get("ssl") is None and pct == 0 and any(
        "not accessible" in f.get("issue", "") for f in top_issues
    )
    service_label = SERVICE_LABELS.get(service, SERVICE_LABELS["software"])
    lead_issue = pick_lead_issue(top_issues)

    # Translate technical errors into human language
    from urllib.parse import urlparse
    domain = urlparse(url).netloc or url
    if site_down:
        hook = "your website is currently down — visitors can't reach it at all"
        human_issue = f"Your website ({domain}) appears to be completely offline — anyone searching for your organisation online gets an error page."
    elif lead_issue and "Connection failed" not in lead_issue and "not accessible" not in lead_issue:
        hook = lead_issue[0].lower() + lead_issue[1:]
        human_issue = lead_issue
    else:
        hook = "several technical gaps holding it back from Google ranking and lead capture"
        human_issue = "Several technical issues affecting your Google ranking and lead capture"

    # Score display — hide 0/100 for down sites, show plain text instead
    score_display = f"score: {pct}/100" if pct > 0 else "with what we found"

    # --- WhatsApp (under 100 words) ---
    whatsapp = f"""Hi, I'm Simon from Elastic Technologies — we build software for businesses in Uganda.

I checked {url} and noticed {hook}.

I put together a free audit report showing exactly what's holding it back — happy to share it.

Worth a quick 15-minute call to walk through it? No pitch — just the findings.

— Simon Kazooba, Elastic Technologies"""

    # --- Email ---
    # Use human-readable issue bullets, skip raw technical errors
    clean_issues = [
        f for f in top_issues[:3]
        if f.get("issue") and "Connection failed" not in f["issue"] and "not accessible" not in f["issue"]
    ]
    if site_down:
        issue_bullets = f"• {human_issue}"
    elif clean_issues:
        issue_bullets = "\n".join(f"• {f['issue']}" for f in clean_issues)
    else:
        issue_bullets = "• Several technical issues affecting SEO and user experience"

    score_line = f"Overall score: {pct}/100 (Grade: {grade})." if pct > 0 else "The audit flagged critical issues that need immediate attention."

    email_subject = f"Quick website audit for {company_name}" if pct == 0 else f"Free website audit for {company_name} — {pct}/100 score"

    email_body = f"""Hi,

I'm Simon Kazooba, founder of Elastic Technologies Ltd. We specialise in {service_label} for businesses in Uganda and East Africa.

I ran a check on {url} and found a few things worth your attention:

{issue_bullets}

{score_line}

I've put together a short report with findings and recommendations — happy to share it and walk through it with you. No commitment, just the facts.

Would 15 minutes this week work for a quick call?

Best,
Simon Kazooba
Elastic Technologies Ltd
simonkazooba@elastic.ug | Kampala, Uganda"""

    # --- LinkedIn connection note (300 char limit) ---
    n_issues = len(top_issues)
    issue_word = "issue" if n_issues == 1 else "issues"
    linkedin = (
        f"Hi, I audited {company_name}'s website and found {n_issues} {issue_word} "
        f"affecting Google ranking and leads. Happy to share a free report — would that be useful?"
    )[:300]

    return {
        "company": company_name,
        "url": url,
        "score": pct,
        "grade": grade,
        "service_angle": service,
        "lead_issue": lead_issue,
        "whatsapp": whatsapp,
        "email_subject": email_subject,
        "email_body": email_body,
        "linkedin_note": linkedin,
    }


def main():
    parser = argparse.ArgumentParser(description="Generate outreach messages from scored audit")
    parser.add_argument("scored_file", help="Scored JSON file from score_audit.py")
    parser.add_argument("--company", required=True, help="Company name")
    parser.add_argument("--service", default="software",
                        choices=["software", "erp", "automation", "any"],
                        help="Service angle for messaging")
    parser.add_argument("--output", help="Output JSON file path (default: stdout)")
    args = parser.parse_args()

    with open(args.scored_file) as f:
        data = json.load(f)

    outreach = generate_outreach(data, args.company, args.service)
    output = json.dumps(outreach, indent=2)

    if args.output:
        with open(args.output, "w") as f:
            f.write(output)
        print(f"Outreach saved to {args.output}")
    else:
        print(output)


if __name__ == "__main__":
    main()
