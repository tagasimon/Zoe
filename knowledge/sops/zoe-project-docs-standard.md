# Zoe Project Documentation Standard

_Last updated: 2026-05-03_

Every active project, client, venture, or career workflow should have enough documentation that Simon or any AI can continue without re-explaining the whole story.

## The Rule

Every active workstream needs:
1. A short README.
2. A tracker row.
3. A next action.
4. A review date.
5. A clear owner.

If it does not have those, it is not truly active.

## Client Folder Standard

Path:

```text
clients/client-name/
```

Required files:

```text
brief.md
proposal.md
contract.md
notes.md
deliverables/
```

Minimum `brief.md` sections:

```markdown
# Client Name

## Status

## Contact

## Project Scope

## Payment

## Deadlines

## Current Blockers

## Next Action

## Communication Log
```

Tracker:

```text
clients/client-crm.csv
```

Rule:
- If money is agreed, the work belongs in `clients/`.
- If money is not agreed, it belongs in `pipeline/`.

## Lead / Prospect Standard

Path:

```text
pipeline/client-acquisition/leads/YYYY-MM-DD-company-name.md
```

Minimum sections:

```markdown
# Company Name

## Snapshot

## Pain Found

## Offer Angle

## Decision Maker

## Outreach Draft

## Follow-Up Plan

## Status
```

Tracker:

```text
pipeline/client-acquisition/crm.csv
```

Rule:
- Every lead needs `Next Follow Up`.
- A lead without a next follow-up date is abandoned.

## Venture Standard

Path:

```text
ventures/venture-name/
```

Required file:

```text
README.md
```

Recommended sections:

```markdown
# Venture Name

## What It Is

## Current Stage

## Target User

## Revenue Model

## Current Product State

## Next Revenue Test

## Next Build Action

## Kill Or Pause Criteria

## Codebase

## Log
```

Tracker:

```text
ventures/venture-tracker.csv
```

Rule:
- A venture without a next revenue test should be paused.

## Job Application Standard

Path:

```text
career/applications/jobs/YYYY-MM-DD/company-role/
```

Required files:

```text
job-description.md
fit-summary.md
tailored-cv.md
cover-letter.md
application-email.md
follow-up-email.md
portal-instructions.md
```

Tracker:

```text
career/applications/job-application-tracker.csv
```

Rule:
- `Prepared` means Zoe created the packet.
- `Applied` means Simon confirmed submission.
- Zoe must not silently submit applications.

## Content Standard

Path:

```text
brand/content/
```

Recommended folders:

```text
ideas/
scripts/
posts/
performance/
```

Tracker:

```text
brand/content/content-tracker.csv
```

Rule:
- Content should come from real work Simon did.
- Avoid generic motivational content unless it supports the brand story.

## Life Standard

Path:

```text
life/
```

Use for:
- habits
- health
- journal
- lessons
- mistakes
- learning
- routines

Tracker:

```text
life/habits/habit-tracker.csv
```

Rule:
- Track life basics because they affect execution.
- Do not use life notes to avoid money actions.

## Decision Standard

Path:

```text
decisions/log.md
```

Format:

```text
[YYYY-MM-DD] DECISION: ... | REASONING: ... | CONTEXT: ...
```

Log decisions about:
- income strategy
- client pricing
- job search direction
- venture pause/kill/continue
- folder architecture
- major personal operating rules

## Session Summary Standard

Use:

```text
templates/session-summary.md
```

Save important summaries to:

```text
memory/summaries/
```

Minimum summary:

```markdown
# Session Summary — YYYY-MM-DD

## What Happened

## Files Updated

## Decisions Made

## Next Actions

## What Zoe Should Remember
```

## Documentation Health Check

Run this monthly:

```text
Review all active folders and tell me which projects have no next action, no owner, no revenue test, or stale docs.
```

Zoe should then recommend:
- keep active
- pause
- archive
- merge
- update docs
