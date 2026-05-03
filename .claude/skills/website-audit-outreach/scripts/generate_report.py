#!/usr/bin/env python3
"""
Generate a branded HTML audit report from scored audit JSON.
Usage: python3 generate_report.py <scored.json> --company "Company Name" [--output report.html]
"""
import json
import argparse
from datetime import date


GRADE_COLORS = {
    "A": "#16a34a", "B": "#65a30d", "C": "#ca8a04", "D": "#ea580c", "F": "#dc2626"
}
SEVERITY_COLORS = {
    "critical": "#dc2626", "high": "#ea580c", "medium": "#ca8a04", "low": "#3b82f6"
}
CATEGORY_LABELS = {
    "seo": "SEO",
    "performance": "Performance",
    "ux_mobile": "UX / Mobile",
    "trust_security": "Trust & Security",
    "features": "Features",
}


def badge(severity):
    color = SEVERITY_COLORS.get(severity, "#6b7280")
    return (
        f'<span style="background:{color};color:white;padding:2px 8px;'
        f'border-radius:9999px;font-size:11px;font-weight:700;white-space:nowrap">'
        f"{severity.upper()}</span>"
    )


def score_bar(score, max_score):
    pct = round((score / max_score) * 100) if max_score else 0
    if pct >= 80:
        color = "#16a34a"
    elif pct >= 60:
        color = "#ca8a04"
    elif pct >= 40:
        color = "#ea580c"
    else:
        color = "#dc2626"
    return f"""
        <div style="display:flex;justify-content:space-between;margin-bottom:4px">
            <span style="font-size:13px;color:#6b7280">{score}/{max_score}</span>
            <span style="font-size:13px;font-weight:600;color:{color}">{pct}%</span>
        </div>
        <div style="background:#e5e7eb;border-radius:9999px;height:10px">
            <div style="background:{color};width:{pct}%;height:10px;border-radius:9999px;transition:width 0.3s"></div>
        </div>"""


def generate_report(data, company_name):
    url = data.get("url", "")
    grade = data.get("grade", "?")
    pct = data.get("percentage", 0)
    summary = data.get("summary", "")
    findings = data.get("findings", [])
    recommendations = data.get("recommendations", [])
    scores = data.get("scores", {})
    max_scores = data.get("max_scores", {})
    load_time = data.get("load_time_ms")
    ssl = data.get("ssl", False)
    today = date.today().strftime("%B %d, %Y")
    grade_color = GRADE_COLORS.get(grade, "#6b7280")

    # Score breakdown rows
    score_rows = ""
    for key, label in CATEGORY_LABELS.items():
        s = scores.get(key, 0)
        ms = max_scores.get(key, 25)
        score_rows += f"""
        <div style="margin-bottom:20px">
            <div style="font-weight:600;margin-bottom:6px">{label}</div>
            {score_bar(s, ms)}
        </div>"""

    # Findings list
    findings_html = ""
    for f in findings:
        sev = f.get("severity", "low")
        border = SEVERITY_COLORS.get(sev, "#6b7280")
        findings_html += f"""
        <div style="border-left:4px solid {border};padding:10px 14px;margin-bottom:10px;background:#f9fafb;border-radius:0 6px 6px 0">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
                <span style="font-size:14px;line-height:1.4">{f.get('issue','')}</span>
                {badge(sev)}
            </div>
        </div>"""

    # Recommendations list
    rec_items = "".join(
        f'<li style="margin-bottom:10px;line-height:1.5">{r}</li>'
        for r in recommendations
    )

    # Stats row
    load_display = f"{load_time}ms" if load_time else "N/A"
    ssl_display = ("HTTPS" if ssl else "NO HTTPS")
    ssl_color = "#16a34a" if ssl else "#dc2626"

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Website Audit — {company_name}</title>
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f3f4f6; color: #111827; line-height: 1.5; }}
  .wrap {{ max-width: 820px; margin: 0 auto; padding: 32px 16px 48px; }}
  .card {{ background: #fff; border-radius: 12px; padding: 28px; margin-bottom: 24px; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }}
  h2 {{ font-size: 18px; font-weight: 700; margin-bottom: 18px; padding-bottom: 10px; border-bottom: 1px solid #e5e7eb; color: #111827; }}
  .meta {{ color: #6b7280; font-size: 13px; margin-top: 3px; }}
  a {{ color: #2563eb; text-decoration: none; }}
  a:hover {{ text-decoration: underline; }}
  .stat-pill {{ display:inline-flex;align-items:center;gap:6px;background:#f3f4f6;border-radius:9999px;padding:4px 12px;font-size:13px;font-weight:600;margin-top:12px;margin-right:8px; }}
</style>
</head>
<body>
<div class="wrap">

  <!-- Header -->
  <div class="card">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:16px;flex-wrap:wrap">
      <div style="flex:1;min-width:200px">
        <div style="font-size:13px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px">Website Audit Report</div>
        <div style="font-size:26px;font-weight:800;color:#111827">{company_name}</div>
        <div class="meta" style="margin-top:6px"><a href="{url}" target="_blank">{url}</a></div>
        <div class="meta">Audited by Elastic Technologies Ltd &middot; {today}</div>
        <div style="margin-top:14px;font-size:15px;color:#374151;font-style:italic">{summary}</div>
        <div style="margin-top:12px">
          <span class="stat-pill">Load: {load_display}</span>
          <span class="stat-pill" style="color:{ssl_color}">{ssl_display}</span>
        </div>
      </div>
      <div style="text-align:center;flex-shrink:0">
        <div style="width:90px;height:90px;border-radius:50%;background:{grade_color};display:flex;align-items:center;justify-content:center;font-size:42px;font-weight:900;color:#fff;margin:0 auto">{grade}</div>
        <div style="font-size:22px;font-weight:800;margin-top:6px">{pct}/100</div>
        <div style="font-size:12px;color:#6b7280">Overall Score</div>
      </div>
    </div>
  </div>

  <!-- Scores -->
  <div class="card">
    <h2>Score Breakdown</h2>
    {score_rows}
  </div>

  <!-- Findings -->
  {"<div class='card'><h2>Issues Found (" + str(len(findings)) + ")</h2>" + findings_html + "</div>" if findings_html else ""}

  <!-- Recommendations -->
  {"<div class='card'><h2>Recommendations</h2><ol style='padding-left:20px'>" + rec_items + "</ol></div>" if rec_items else ""}

  <!-- CTA -->
  <div class="card" style="background:#1e3a5f;color:#fff">
    <h2 style="color:#fff;border-color:#2d5a8f">Ready to Fix These Issues?</h2>
    <p style="color:#cbd5e1;margin-bottom:16px">Elastic Technologies Ltd builds websites, mobile apps, and software for businesses in Uganda and East Africa. We can address every item in this report.</p>
    <div style="font-size:14px;color:#93c5fd">
      Simon Kazooba &mdash; Founder<br>
      <a href="mailto:simonkazooba@elastic.ug" style="color:#93c5fd">simonkazooba@elastic.ug</a> &middot; Kampala, Uganda
    </div>
  </div>

  <div style="text-align:center;font-size:12px;color:#9ca3af;margin-top:8px">
    Elastic Technologies Ltd &mdash; elastictech.ug
  </div>

</div>
</body>
</html>"""


def main():
    parser = argparse.ArgumentParser(description="Generate HTML audit report")
    parser.add_argument("scored_file", help="Scored JSON file from score_audit.py")
    parser.add_argument("--company", required=True, help="Company name")
    parser.add_argument("--output", help="Output HTML file path (default: stdout)")
    args = parser.parse_args()

    with open(args.scored_file) as f:
        data = json.load(f)

    html = generate_report(data, args.company)

    if args.output:
        with open(args.output, "w") as f:
            f.write(html)
        print(f"Report saved to {args.output}")
    else:
        print(html)


if __name__ == "__main__":
    main()
