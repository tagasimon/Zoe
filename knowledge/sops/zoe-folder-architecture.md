# Zoe Folder Architecture

_Last updated: 2026-05-03_

This document explains which folders Zoe needs, which ones can be merged, and how to keep the project simple.

## Design Principle

Every folder should answer one question:

**"When I open this folder, what decision or action does it help me make?"**

If a folder only stores old context, duplicates another folder, or has no active decision attached to it, it should be merged or archived.

## Recommended Simple Structure

```text
Zoe/
├── AGENTS.md                 # Agent behavior and instructions
├── AI_HANDOFF.md             # How any AI picks up Zoe
├── ZOE_OPERATING_MANUAL.md   # How Simon uses Zoe
├── README.md                 # Public project overview
├── identity/                 # Who Simon is and where he is going
├── operations/               # Daily/weekly execution system
├── clients/                  # Paid client work
├── pipeline/                 # Future client revenue
├── career/                   # Jobs, finance, career growth
├── ventures/                 # Products and digital businesses
├── brand/                    # Personal brand and content
├── life/                     # Health, habits, learning, reflection
├── knowledge/                # SOPs, research, examples, docs
├── memory/                   # People, history, summaries
├── decisions/                # Append-only decision log
├── templates/                # Reusable templates
├── brand-assets/             # Elastic Technologies external assets
├── output/                   # Generated files, reports, decks, exports
└── archives/                 # Old work, never deleted
```

## Required Folders

### `identity/`

Use for stable identity and direction:
- who Simon is
- goals
- values
- vision
- personality

Keep it small. Do not store daily tasks here.

### `operations/`

Use for running the week:
- dashboard
- daily execution
- weekly reviews
- brain scans

This is Zoe's cockpit. If Simon is lost, start here.

### `clients/`

Use for signed or active paid clients only.

If no money has been agreed, it does not belong here yet. It belongs in `pipeline/`.

### `pipeline/`

Use for future revenue:
- prospects
- website audits
- proposals
- follow-ups
- CRM

Every lead needs a next follow-up date. No exceptions.

### `career/`

Use for income and career stability:
- job applications
- CV/profile
- personal finance
- Toastmasters

Job hunting is currently legitimate survival work because income is unstable.

### `ventures/`

Use for owned products:
- StatusCash
- Polish My CV
- Rotarise
- Vee Eye Pee

Every venture needs a next revenue test or a pause decision.

### `brand/`

Use for personal brand and content:
- strategy
- content ideas
- scripts
- posts
- metrics

Content should support trust, sales, job opportunities, and Elastic Technologies.

### `life/`

Use for personal operating conditions:
- habits
- health
- journal
- learning
- mistakes
- philosophy
- routines

This should not become a dumping ground. Use it to improve execution.

### `knowledge/`

Use for SOPs, examples, research, and how-to docs.

This is where project documentation lives.

### `memory/`

Use for context that helps future sessions:
- people
- summaries
- history

Memory is for recall, not active task management.

## Folders To Merge Or Archive

### Merge `context/` into `identity/`

Current issue:
- `context/current-priorities.md` exists alongside `identity/goals.md`.
- Some context files are stale and can conflict with newer identity files.

Recommendation:
- Move useful content from `context/` into `identity/` or `operations/dashboard/`.
- Archive `context/` once nothing depends on it.

Suggested mapping:
- `context/me.md` -> `identity/me.md`
- `context/goals.md` -> `identity/goals.md`
- `context/current-priorities.md` -> `operations/dashboard/current-dashboard.csv`
- `context/work.md` -> `identity/work.md` or `knowledge/sops/elastic-services.md`
- `context/team.md` -> `memory/people/`

### Merge `references/` into `knowledge/`

Current issue:
- Both `references/` and `knowledge/` exist.
- `knowledge/` is the stronger name and already matches AGENTS.md.

Recommendation:
- Move any useful `references/examples/` into `knowledge/examples/`.
- Move any useful `references/sops/` into `knowledge/sops/`.
- Archive or remove empty `references/` after confirming.

### Consolidate `.claude/skills/` and `.agents/skills/`

Current issue:
- Most skills exist in both folders.
- Duplication creates drift.

Decision:
- Simon uses both Claude and Codex.
- Keep both `.claude/skills/` and `.agents/skills/`.
- Treat them as dual-runtime mirrors.

Rule:
- When a Zoe-owned skill changes, update the matching skill in both folders intentionally.
- Do not let one runtime become smarter than the other.
- If only one runtime supports a skill, document that in `knowledge/sops/zoe-skills-and-commands.md`.

### Merge `teams/marketing/` into `brand/` over time

Current issue:
- `teams/marketing/` is large and overlaps with `brand/`.
- Simon is not running a separate marketing department right now.

Recommendation:
- Keep current files for now.
- Move active personal brand work into `brand/`.
- Move reusable templates into `templates/` or `knowledge/examples/`.
- Archive old team-style folders once active content has moved.

Suggested mapping:
- `teams/marketing/02-Content/` -> `brand/content/`
- `teams/marketing/03-Social-Media/` -> `brand/platforms/`
- `teams/marketing/templates/` -> `templates/marketing/`
- `teams/marketing/06-Reports-and-Analytics/` -> `brand/content/performance/` or `operations/reports/`

### Keep `challenge/` only as an archive unless restarted

Current status:
- Simon said the Zero to $1,000 challenge has ended.

Recommendation:
- Keep `challenge/` as an archive/history folder.
- Do not use it to drive daily priorities.
- Actual venture work stays in `ventures/`.
- Actual content stays in `brand/`.
- Actual income stays in `career/personal-finance/` or the relevant revenue tracker.
- If Simon restarts a challenge, create a new campaign README with start date, rules, and end condition.

## Folders Not To Merge

Do not merge these:
- `clients/` and `pipeline/`: signed work and prospects are different.
- `ventures/` and `clients/`: products and service work behave differently.
- `memory/` and `knowledge/`: memory is personal context; knowledge is reusable procedure.
- `output/` and source folders: generated files should stay separate.
- `brand-assets/` and `brand/`: assets are external-facing files; brand is strategy/content.

## The Minimum Viable Zoe

If Zoe ever feels too heavy, use only these files:

1. `AI_HANDOFF.md`
2. `ZOE_OPERATING_MANUAL.md`
3. `operations/dashboard/current-dashboard.csv`
4. `clients/client-crm.csv`
5. `pipeline/client-acquisition/crm.csv`
6. `career/applications/job-application-tracker.csv`
7. `career/personal-finance/income-expense-tracker.csv`
8. `operations/daily-execution/daily-execution-tracker.csv`
9. `operations/weekly-review/weekly-review-tracker.csv`
10. `decisions/log.md`

Everything else supports those files.

## Cleanup Order

Do cleanup in this order:
1. Decide canonical skill folder.
2. Move useful `context/` content into `identity/` or `operations/`.
3. Move useful `references/` content into `knowledge/`.
4. Simplify `teams/marketing/` into `brand/`.
5. Review ventures and mark each as active, paused, or archived.

Do not clean folders instead of doing money actions. Cleanup is maintenance, not survival work.
