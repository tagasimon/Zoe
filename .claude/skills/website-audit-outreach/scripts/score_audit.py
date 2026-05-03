#!/usr/bin/env python3
"""
Score website audit findings from audit_website.py output.
Usage: python3 score_audit.py <audit.json> [--output <scored.json>]
"""
import json
import argparse


SEVERITY_ORDER = {"critical": 0, "high": 1, "medium": 2, "low": 3}


def score_audit(data):
    findings = []
    recommendations = []
    scores = {"seo": 0, "performance": 0, "ux_mobile": 0, "trust_security": 0, "features": 0}
    max_scores = {"seo": 25, "performance": 25, "ux_mobile": 25, "trust_security": 25, "features": 25}

    def add(category, issue, severity, rec=None):
        findings.append({"category": category, "issue": issue, "severity": severity})
        if rec:
            recommendations.append(rec)

    if not data.get("accessible"):
        add("critical", f"Website not accessible: {data.get('error', 'unknown error')}", "critical",
            "Ensure the website is live and accessible before reaching out")
        return build_result(data, scores, max_scores, findings, recommendations)

    # --- SEO (25 pts) ---
    title = data.get("title", "")
    if not title:
        add("seo", "Missing page title — Google shows URL instead of brand name", "high",
            "Add a descriptive <title> tag (50–70 chars) to every page")
    elif len(title) < 20:
        add("seo", f"Page title too short ({len(title)} chars): '{title}'", "medium",
            "Expand the title to 50–70 chars — include the business name and main service")
        scores["seo"] += 10
    elif len(title) > 70:
        add("seo", f"Page title too long ({len(title)} chars) — truncated in Google results", "low")
        scores["seo"] += 18
    else:
        scores["seo"] += 22

    description = data.get("meta", {}).get("description", "")
    if not description:
        add("seo", "Missing meta description — Google generates its own (usually bad)", "high",
            "Write a 120–160 char meta description per page that includes keywords and a CTA")
    elif len(description) < 50:
        add("seo", f"Meta description too short ({len(description)} chars)", "medium",
            "Expand meta description to 120–160 chars")
        scores["seo"] += 2
    else:
        scores["seo"] += 3

    h1s = data.get("h1s", [])
    if not h1s:
        add("seo", "No H1 heading found — search engines can't identify the page topic", "high",
            "Add exactly one H1 heading per page describing the main content")
    elif len(h1s) > 1:
        add("seo", f"Multiple H1 headings ({len(h1s)}) — confuses search engines", "medium",
            "Use only one H1 per page")
        scores["seo"] = min(scores["seo"], 22)
    else:
        pass  # good H1

    scores["seo"] = min(scores["seo"], 25)

    # --- Performance (25 pts) ---
    load_time = data.get("load_time_ms")
    if load_time is None:
        add("performance", "Could not measure page load time", "medium")
    elif load_time > 5000:
        add("performance", f"Critical load speed: {load_time}ms (Google target: <2000ms)", "critical",
            "Optimize hosting, compress images, and enable server-side caching — slow sites lose 50%+ of visitors")
        scores["performance"] += 3
    elif load_time > 3000:
        add("performance", f"Slow load time: {load_time}ms (target: <2000ms)", "high",
            "Enable image compression and browser caching to reduce load time")
        scores["performance"] += 10
    elif load_time > 2000:
        add("performance", f"Slightly slow: {load_time}ms", "low")
        scores["performance"] += 18
    else:
        scores["performance"] += 22

    missing_alt = data.get("images_missing_alt", 0)
    total_images = data.get("images_total", 0)
    if missing_alt > 0:
        add("performance", f"{missing_alt}/{total_images} images missing alt text (hurts SEO + accessibility)", "medium",
            "Add descriptive alt text to every image — Google uses it to understand image content")
    else:
        scores["performance"] = min(scores["performance"] + 3, 25)

    scores["performance"] = min(scores["performance"], 25)

    # --- UX / Mobile (25 pts) ---
    viewport = data.get("meta", {}).get("viewport", "")
    if not viewport:
        add("ux_mobile", "No mobile viewport tag — site almost certainly breaks on phones", "critical",
            "Add <meta name='viewport' content='width=device-width, initial-scale=1'> — 70%+ of traffic is mobile")
        scores["ux_mobile"] += 3
    elif "width=device-width" in viewport:
        scores["ux_mobile"] += 20
    else:
        add("ux_mobile", "Viewport tag present but may not be correctly configured", "low")
        scores["ux_mobile"] += 12

    html_len = data.get("html_length", 0)
    if html_len < 2000:
        add("ux_mobile", "Page content is very thin — may be incomplete or broken", "high",
            "Ensure all page content loads correctly and is not hidden behind JavaScript")
        scores["ux_mobile"] = min(scores["ux_mobile"] + 0, 25)
    elif html_len > 5000:
        scores["ux_mobile"] = min(scores["ux_mobile"] + 5, 25)

    scores["ux_mobile"] = min(scores["ux_mobile"], 25)

    # --- Trust & Security (25 pts) ---
    if not data.get("ssl"):
        add("trust_security", "No HTTPS — browser shows 'Not Secure' warning to visitors", "critical",
            "Install an SSL certificate — free via Let's Encrypt. Google penalises non-HTTPS sites")
    else:
        scores["trust_security"] += 15

    contact_info = data.get("contact_info", {})
    if not contact_info:
        add("trust_security", "No contact info (email/phone) visible in page HTML", "high",
            "Add email and phone number to the homepage and contact page — builds trust and gets leads")
    elif len(contact_info) == 1:
        add("trust_security", "Only one contact method found — add both email and phone", "low")
        scores["trust_security"] += 7
    else:
        scores["trust_security"] += 10

    social_links = data.get("social_links", [])
    if not social_links:
        add("trust_security", "No social media links found", "low",
            "Link to active social media profiles — builds credibility and keeps visitors engaged")
    else:
        scores["trust_security"] = min(scores["trust_security"] + 0, 25)

    scores["trust_security"] = min(scores["trust_security"], 25)

    # --- Features (25 pts) ---
    if data.get("forms_count", 0) == 0:
        add("features", "No contact form found — visitors can't inquire without leaving the site", "high",
            "Add a simple contact/inquiry form — this is the primary lead capture mechanism on most business sites")
        scores["features"] += 5
    else:
        scores["features"] += 20

    # Analytics heuristic: check if any links reference analytics domains
    links_str = " ".join(data.get("social_links", []))
    if "analytics" not in links_str and "gtag" not in links_str:
        add("features", "No analytics detected — no data on who visits or what they do", "medium",
            "Install Google Analytics 4 — essential for understanding what's working and what's not")
    else:
        scores["features"] = min(scores["features"] + 5, 25)

    scores["features"] = min(scores["features"], 25)

    return build_result(data, scores, max_scores, findings, recommendations)


def build_result(data, scores, max_scores, findings, recommendations):
    total = sum(scores.values())
    max_total = sum(max_scores.values())
    pct = round((total / max_total) * 100)

    if pct >= 80:
        grade, summary = "B", "Decent foundation. A few targeted fixes will push it to top performance."
    elif pct >= 65:
        grade, summary = "C", "Several gaps that are costing Google ranking and leads."
    elif pct >= 40:
        grade, summary = "D", "Significant problems. Likely losing customers due to poor online presence."
    else:
        grade, summary = "F", "Critical failures. This website is actively damaging the business."

    top_issues = sorted(
        [f for f in findings if f.get("severity") in ("critical", "high")],
        key=lambda f: SEVERITY_ORDER.get(f.get("severity", "low"), 99)
    )[:5]

    return {
        "url": data.get("url"),
        "title": data.get("title"),
        "load_time_ms": data.get("load_time_ms"),
        "ssl": data.get("ssl"),
        "scores": scores,
        "max_scores": max_scores,
        "total_score": total,
        "max_total": max_total,
        "percentage": pct,
        "grade": grade,
        "summary": summary,
        "findings": [f for f in findings if f.get("issue")],
        "recommendations": recommendations,
        "top_issues": top_issues,
    }


def main():
    parser = argparse.ArgumentParser(description="Score a raw website audit JSON")
    parser.add_argument("audit_file", help="JSON file from audit_website.py")
    parser.add_argument("--output", help="Output JSON file path (default: stdout)")
    args = parser.parse_args()

    with open(args.audit_file) as f:
        data = json.load(f)

    scored = score_audit(data)
    output = json.dumps(scored, indent=2)

    if args.output:
        with open(args.output, "w") as f:
            f.write(output)
        print(f"Scored audit saved to {args.output}")
    else:
        print(output)


if __name__ == "__main__":
    main()
