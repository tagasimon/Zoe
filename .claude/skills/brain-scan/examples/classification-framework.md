# Workflow Classification Framework

Use this to decide what to build when a pattern is identified across sessions.

---

## The Four Categories

### 1. Skill (`/.claude/skills/`)
Build a skill when:
- It's a **recurring, multi-step workflow** Simon does repeatedly
- It has a clear input and a clear output
- It benefits from prompt structure (templates, examples, formatting rules)
- It doesn't require persistent background execution

> Examples: write a TikTok script, draft a proposal, prepare a speech, triage inbox

---

### 2. MCP Plugin / Tool Integration
Build an MCP server (or recommend one) when:
- Simon needs to **read or write to an external system** (email, calendar, CRM, Notion, Slack)
- The integration is needed across many different workflows
- A CLI like `gws` exists but is clunky to use repeatedly

> Examples: Google Calendar integration, WhatsApp sender, Notion sync, HubSpot CRM lookup

---

### 3. Agent (autonomous, multi-tool task)
Suggest an agent when:
- The task requires **many tool calls in sequence** without Simon directing each step
- It involves browsing, data gathering, or orchestrating other tools
- It runs to completion and reports back

> Examples: prospect 20 ERP leads and build a spreadsheet, monitor inbox and create tasks on a schedule, scrape competitor pricing weekly

---

### 4. CLAUDE.md Entry
Add to CLAUDE.md (or a context file) when:
- It's a **persistent preference or rule** Simon always wants applied
- It's factual context about Simon, his business, team, or workflows
- It doesn't need to be triggered — it should always be active

> Examples: "always use bullet points", "Phillip handles BD outreach", "ERP proposals go to Alvin for review", "never commit without asking"

---

## Decision Tree

```
Is it triggered by a specific request?
├── No  → CLAUDE.md or context file
└── Yes → Does it need external system access?
          ├── Yes, repeatedly across many workflows → MCP Plugin
          └── No → Does it run autonomously with many steps?
                    ├── Yes → Agent
                    └── No → Skill
```

---

## Priority Signals

High priority to build:
- Appears in **3+ sessions**
- Simon had to **re-explain context** each time
- The output was **always the same type** (document, email, list)
- Simon expressed **frustration** or said "I always have to..."

Low priority / skip:
- One-off requests
- Highly specific to a moment in time
- Requires unique judgment each time (no repeatable structure)
