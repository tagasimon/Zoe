# Zoe — Simon's AI Executive Assistant

Zoe is a Claude Code-powered executive assistant for Simon Kazooba, Founder of Elastic Technologies Ltd. She keeps Simon organised, moving fast, and closing clients.

**Top priority:** Get Elastic Technologies to its first paying clients and revenue.

---

## How It Works

Zoe runs inside [Claude Code](https://claude.ai/code) (the CLI). The `CLAUDE.md` file is her brain — it loads automatically every session and tells her who Simon is, what matters, and how to behave. Skills extend her with repeatable workflows. Context files keep her up to date.

```
Open Claude Code in this directory → Zoe is live
```

---

## Operating Docs

- `AI_HANDOFF.md` — how any AI assistant should pick up Zoe
- `ZOE_OPERATING_MANUAL.md` — how Simon should use Zoe daily and weekly
- `knowledge/sops/zoe-folder-architecture.md` — required folders, merge recommendations, cleanup order
- `knowledge/sops/zoe-skills-and-commands.md` — skills catalog and when to use each skill
- `knowledge/sops/zoe-project-docs-standard.md` — documentation standard for clients, ventures, jobs, content, and sessions
- `knowledge/sops/zoe-life-coach-questions.md` — questions Zoe should use to sharpen Simon's operating system

---

## Directory Structure

```
Zoe/
├── CLAUDE.md                  # Zoe's core instructions — loaded every session
├── CLAUDE.local.md            # Local overrides (gitignored)
│
├── context/                   # Who Simon is and what matters right now
│   ├── me.md                  # Simon's profile
│   ├── work.md                # Elastic Technologies, services, tools
│   ├── team.md                # Alvin (accountant), Phillip (BD)
│   ├── current-priorities.md  # What Simon is focused on this week
│   └── goals.md               # Q1 2026 goals
│
├── projects/                  # Revenue-generating products only
│   ├── statuscash/            # WhatsApp Status advertising marketplace
│   └── polish-my-cv/          # SaaS CV polishing product
│
├── pipeline/                  # Sales & business development
│   ├── client-acquisition/    # Finding and closing clients
│   └── erp-proposals/         # ERP pitches to businesses
│
├── career/                    # Personal development & finance
│   ├── personal-finance/      # Debt tracking, budget, savings plan
│   ├── toastmasters/          # Speeches (subfolders per date)
│   └── applications/          # Job applications
│
├── operations/                # Internal tools & audits
│   └── brain-scan/            # Weekly Claude session audit reports
│
├── teams/
│   └── marketing/             # Social media, content, campaigns
│
├── brand-assets/              # Elastic Technologies logos, profile, guidelines
├── context/                   # Live context files (updated regularly)
├── decisions/log.md           # Append-only decision log
├── templates/                 # Reusable document templates
├── references/                # SOPs and style guides
├── archives/                  # Old work — never deleted, just moved here
├── output/                    # Generated files (gitignored)
│   ├── presentations/         # PPTX, slide decks
│   ├── reports/               # PDFs, markdown reports
│   ├── exports/               # Spreadsheets, data exports
│   └── drafts/                # Work-in-progress documents
└── .claude/
    ├── skills/                # Repeatable workflows (see Skills section)
    └── memory/                # Persistent memory across sessions
```

---

## Skills

Skills are repeatable workflows Zoe can run on demand. They live in `.claude/skills/`.

| Skill | What it does |
|-------|-------------|
| `daily-briefing` | Morning briefing — tasks, calendar, emails → prioritised day plan |
| `personal-finance` | Debt tracking, 48-hour spending protocol, budget, savings plan |
| `brain-scan` | Weekly audit of Claude sessions → surfaces skills and improvements to build |
| `client-prospecting` | Search web for leads, score fit, write outreach, create Google Tasks |
| `weekly-standup` | End-of-week summary → WhatsApp update for Alvin and Phillip |
| `toastmasters-speech-writer` | Draft 5-7 min prepared speeches (humorous, storytelling) |
| `tiktok-writer` | Write TikTok scripts for AI Challenge and brand content |
| `career-job-applications` | Search job boards, score fit, prepare tailored CV/cover letter packets, and update the tracker without submitting silently |

### Skills Backlog
- `email-triage` — Read inbox, sort by priority, create tasks
- `proposal-builder` — Generate proposal or pitch deck from a client brief
- `dev-session-handoff` — StatusCash codebase state → what's done and what's next
- `website-to-pitch` — URL → marketing analysis → PPTX in one step

---

## Context Files

Update these as things change — Zoe reads them every session.

| File | Update when |
|------|-------------|
| `context/current-priorities.md` | Focus shifts |
| `context/goals.md` | New quarter starts |
| `decisions/log.md` | A decision is made (append-only) |

---

## Tool Integrations

- **Google Workspace** via `gws` CLI — Gmail, Tasks, Drive, Calendar, Sheets
- **MCP servers** — none connected yet

---

## Output Files

All generated files (presentations, reports, exports) are saved to `output/` and are **gitignored** — they never get committed to GitHub.

---

## What's Gitignored

- `credentials/` — OAuth tokens and API keys
- `CLAUDE.local.md` — local personal overrides
- `output/` — all generated files
- `*.pptx`, `*.pdf`, `*.docx`, `*.xlsx`, `*.zip` — generated documents
- `.env` and `.claude/settings.local.json`

---

## Keeping Zoe Sharp

- New recurring workflow → build a skill in `.claude/skills/`
- Major structural change → update this README and `CLAUDE.md`
- Decision made → log in `decisions/log.md`
- Focus shifted → update `context/current-priorities.md`

---

_Last updated: 2026-03-18_
