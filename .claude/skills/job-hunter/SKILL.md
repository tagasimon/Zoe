---
name: job-hunter
description: Scrapes Uganda job boards (or a provided URL) for matching roles, rewrites Simon's CV to fit the job, writes a cover letter, and creates Gmail application drafts for Simon's review. Use when Simon wants to find and apply for jobs.
argument-hint: "[search keywords or job URL]"
user-invocable: true
disable-model-invocation: true
---

# Job Hunter

Scrape jobs → score fit → tailor CV → write cover letter → create Gmail drafts.

**Input:** $ARGUMENTS (search keywords, role name, or a direct job posting URL)

---

## Simon's Profile

**Name:** Kazooba Simon
**Phone:** +256773383412
**Email:** smkabz@gmail.com
**LinkedIn:** https://www.linkedin.com/in/simon-sayz/
**Location:** Kampala, Uganda

**Education:** BSc Computer Science — Makerere University (2011–2014)

**Core Skills:**
- Full-stack web & mobile development (Python/Django, ASP.NET Core, Flutter/Dart, Kotlin)
- Android & iOS mobile development (Flutter cross-platform, Kotlin native Android)
- Front-end: HTML5, CSS3, Bootstrap, Material Design, jQuery
- Database: SQL, T-SQL, PL/SQL, Google Cloud Firestore, Oracle, MS SQL Server
- ERP Integration: Microsoft Dynamics 365 Business Central, SAP
- RESTful API Design & Implementation
- Automation & Process Optimization (bots, RPA)
- Cloud: Google Cloud Platform
- Data Analytics: Power BI, R, machine learning models
- Testing: pytest, PyUnit, NUnit
- Version Control: GitHub, Git

**Experience Summary:**
- Founder & Lead Developer — Elastic Technologies Ltd (Nov 2024 – Present)
- Group Software Officer — Mulwana Group of Companies (Nov 2023 – Nov 2024)
- Business Systems Analyst & Software Developer — Nice House of Plastics (Nov 2019 – Nov 2023)
- Head of IT — The Culinary School Uganda (Aug 2017 – Sept 2018)
- Head of IT — Liquid Silk (Dec 2015 – July 2017)
- Web Development Intern — Nextel Systems (Jul 2015 – Dec 2015)

**Key Achievements:**
- ERP extensions that reduced manual data entry by 50%+
- Automation tools that cut repetitive task time by 70%
- Sales force automation system with real-time tracking and reporting
- Python-based chatbot handling 1,000+ daily queries
- Cloud migration of on-premise databases to GCP

**CV File:** `career/KAZOOBA_SIMON_CV_2025.pdf`

---

## Target Roles

1. Mobile Developer / Android Developer / iOS Developer / Flutter Developer
2. Software Developer / Full-Stack Developer / Applications Developer
3. Data Analyst / Business Intelligence Developer
4. Systems Analyst / Business Systems Analyst
5. IT Manager / Group IT Officer / Head of IT / IT Director

---

## Step 1 — Parse Input

**If $ARGUMENTS is a URL:**
→ Skip to [URL Mode](#url-mode) — single job application flow.

**If $ARGUMENTS is keywords/role name:**
→ Continue to Step 2 — search all job boards.

**If $ARGUMENTS is empty:**
Ask Simon:
1. Are you looking for a specific role, or should I search across all target roles?
2. Any specific company or sector in mind?

---

## Step 2 — Search Job Boards

Search all of these platforms for matching roles. Run multiple searches in parallel.

**Job boards to search:**

| Board | Search pattern |
|-------|---------------|
| BrighterMonday Uganda | `site:brightermondayug.com [role] Uganda` |
| Fuzu Uganda | `site:fuzu.com/uganda [role]` |
| LinkedIn Jobs | `site:linkedin.com/jobs [role] Uganda` |
| Uganda Jobs | `site:ugandajobs.net [role]` |
| My Jobs Uganda | `site:myjobsuganda.com [role]` |
| NGO/INGO boards | `[role] jobs Kampala Uganda 2025` |

Search for each target role category. Collect raw results — aim for 20–30 listings.

For each listing, capture:
- Job title
- Company name
- Location (Kampala / remote / other)
- Employment type (full-time / contract / freelance)
- Application email or portal link
- Brief JD summary (key requirements)
- Posted date (prefer last 30 days)

---

## Step 3 — Score & Rank

Score each job out of 10:

| Signal | Points |
|--------|--------|
| Title matches a target role exactly | +3 |
| JD mentions Flutter, Kotlin, Android, iOS, or mobile | +2 |
| JD mentions Python, Django, .NET, ERP, GCP, or SQL | +1 |
| Mid-senior level (2+ years required) | +1 |
| Application via email (can create Gmail draft directly) | +1 |
| Full JD available (enough to tailor CV) | +1 |
| Posted within last 30 days | +1 |
| Disqualify: no JD, expired, clearly junior-only internship | -10 |

**Pick the top 10 by score.**

---

## Step 4 — Tailor CV for Each Job

For each of the top 10 jobs, rewrite the CV **in plain text** tailored to that JD:

**Rules:**
- Rewrite the Professional Summary (3–4 sentences) using keywords from the JD
- Reorder Core Competencies to lead with most relevant skills for that role
- Highlight bullet points in work history that directly match JD requirements — put those first
- Do NOT fabricate experience, titles, or dates — only reorder and emphasise
- Keep the full document — do not cut sections

Use Simon's full CV as the base. See [examples/cv-tailoring-guide.md](examples/cv-tailoring-guide.md) for examples.

---

## Step 5 — Write Cover Letter for Each Job

Max 3 paragraphs, under 250 words.

**Structure:**
- **Para 1:** Why this specific role and company. Reference something from the JD or company's work.
- **Para 2:** 2–3 of Simon's achievements that directly match the JD requirements (use numbers where possible).
- **Para 3:** Call to action — available for interview, eager to contribute.

**Sign-off:**
```
Yours sincerely,
Kazooba Simon
+256773383412 | smkabz@gmail.com
LinkedIn: https://www.linkedin.com/in/simon-sayz/
```

**Tone:** Professional, direct, no fluff. No "I am writing to apply for..." opener.

See [examples/cover-letter-template.md](examples/cover-letter-template.md).

---

## Step 6 — Write Application Email

Simple and short. Subject and body only.

**Subject:** `Application for [Job Title] — Kazooba Simon`

**Body:**
```
Dear [Hiring Manager / HR Team],

Please find attached my CV and cover letter for the [Job Title] position at [Company Name].

I am a software developer with 7+ years of experience in [1–2 skills directly from JD]. I am confident my background is a strong match for this role.

I look forward to hearing from you.

Yours sincerely,
Kazooba Simon
+256773383412 | smkabz@gmail.com
LinkedIn: https://www.linkedin.com/in/simon-sayz/
```

---

## Step 7 — Create Gmail Drafts

For each of the top 10 jobs, create a Gmail draft using the `gws` CLI.

Save the cover letter as a temp file first, then attach it along with the CV.

```bash
# Save cover letter to temp file
cat > /tmp/cover_letter_[company_slug].txt << 'EOF'
[cover letter text]
EOF

# Create Gmail draft
gws gmail draft \
  --to "[hiring email]" \
  --subject "Application for [Job Title] — Kazooba Simon" \
  --body "[application email body]" \
  --attachment "career/KAZOOBA_SIMON_CV_2025.pdf" \
  --attachment "/tmp/cover_letter_[company_slug].txt"
```

If the hiring email is not in the JD, use the company's general HR email if findable, or leave the `--to` field as `[TO BE FILLED]` and note it in the summary.

If `gws` does not support `--attachment`, create the draft with the email body only and note: "Attach CV + cover letter manually before sending."

---

## URL Mode

When Simon pastes a single job URL with no search needed:

1. **Fetch the URL** — extract full job description, company name, title, hiring contact
2. **Score the fit** — quick check against target roles and skills
3. **Tailor the CV** — rewrite professional summary + reorder skills for this JD
4. **Write cover letter** — tailored to this specific role and company
5. **Write application email**
6. **Create single Gmail draft**
7. **Present to Simon** for review

---

## Step 8 — Present Summary to Simon

Show a summary table first:

```
## Job Applications — [Date]

| # | Title | Company | Source | Score | Email | Draft |
|---|-------|---------|--------|-------|-------|-------|
| 1 | Android Developer | XYZ Ltd | BrighterMonday | 9/10 | hr@xyz.co.ug | Created |
| 2 | ... | ... | ... | ... | ... | ... |

10 Gmail drafts created — review and send from smkabz@gmail.com
```

Then for each job, show:

```
---
### [#] [Job Title] — [Company]
**Score:** X/10 | **Source:** [URL] | **Type:** Full-time/Contract

**Tailored Summary:**
[rewritten professional summary for this role]

**Cover Letter:**
[full cover letter text]

**Email drafted to:** [email address or "TO BE FILLED"]
---
```

---

## Step 9 — Log Applications

Append each application to `career/applications/log.md`:

```
| [DATE] | [Company] | [Job Title] | [Source URL] | Drafted | — |
```

Log format columns: Date | Company | Role | URL | Status | Notes
Statuses: Drafted → Sent → No Response / Interview / Rejected

---

## Output Summary

After all steps complete, tell Simon:
- How many jobs found
- How many drafts created
- Which ones are missing a hiring email (need manual TO field)
- File saved to `career/applications/log.md`
- Next step: review drafts in Gmail at smkabz@gmail.com
