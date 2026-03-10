---
name: brain-scan
description: Scrapes all Claude sessions from the past 7 days, identifies recurring workflows, and recommends what to build as skills, MCP plugins, agents, or CLAUDE.md entries. Run weekly to keep the second brain sharp.
argument-hint: "[days-back, default 7]"
user-invocable: true
disable-model-invocation: true
---

# Workflow Discovery — Weekly Session Audit

Analyse Simon's recent Claude sessions and surface automation opportunities.

**Days to look back:** $ARGUMENTS (default: 7)

---

## Step 1 — Find All Session Files

Run this to locate JSONL session files modified in the target window:

```bash
find ~/.claude/projects/ -name "*.jsonl" -newer $(date -v-${DAYS}d +%Y-%m-%d 2>/dev/null || date -d "-${DAYS} days" +%Y-%m-%d) 2>/dev/null | sort
```

If the date flag fails on macOS, use:
```bash
find ~/.claude/projects/ -name "*.jsonl" -mtime -${DAYS}
```

Note the project folders — each maps to a working directory (e.g. `-Users-kazoobasimon-Claude-Zoe` = `/Users/kazoobasimon/Claude/Zoe`).

---

## Step 2 — Extract User Messages

For each JSONL file, parse out only `type: user` messages and extract the text content:

```python
import json, glob, os
from datetime import datetime, timedelta

days_back = int("$ARGUMENTS".strip() or "7")
cutoff = datetime.now() - timedelta(days=days_back)
sessions = []

for path in glob.glob(os.path.expanduser("~/.claude/projects/**/*.jsonl"), recursive=True):
    if datetime.fromtimestamp(os.path.getmtime(path)) < cutoff:
        continue
    messages = []
    with open(path) as f:
        for line in f:
            try:
                obj = json.loads(line)
                if obj.get("type") == "user":
                    content = obj.get("message", {}).get("content", "")
                    if isinstance(content, list):
                        for c in content:
                            if isinstance(c, dict) and c.get("type") == "text":
                                text = c["text"].strip()
                                # Skip system-injected context blocks
                                if text and not text.startswith("<") and len(text) > 20:
                                    messages.append(text)
                    elif isinstance(content, str) and len(content) > 20:
                        messages.append(content.strip())
            except:
                pass
    if messages:
        project = os.path.basename(os.path.dirname(path))
        sessions.append({"project": project, "file": os.path.basename(path), "messages": messages})

for s in sessions:
    print(f"\n=== {s['project']} / {s['file']} ===")
    for m in s['messages']:
        print(f"  - {m[:120]}")
```

Run this script and capture the output. Save it to a temp variable — you'll analyse it in the next step.

---

## Step 3 — Identify Patterns

Read all extracted messages and look for:

1. **Frequency** — Which tasks appear across multiple sessions or were asked more than once?
2. **Re-explaining** — Did Simon provide the same context more than once? (team info, business details, tone preferences)
3. **Output type** — Was the output always the same kind of thing? (a document, a list, an email, a script)
4. **Friction** — Did Simon have to correct the output or add instructions mid-task?
5. **External tools** — Did Simon need data from Gmail, Calendar, Drive, WhatsApp, or other systems?

Group what you find into a table:

| Pattern | Sessions seen | Output type | Friction? | External system? |
|---------|--------------|-------------|-----------|-----------------|
| ... | ... | ... | ... | ... |

---

## Step 4 — Classify Each Pattern

Use the decision framework in [examples/classification-framework.md](examples/classification-framework.md).

For each pattern, assign a category:
- **Skill** — repeating, structured workflow with clear I/O
- **MCP Plugin** — needs persistent external system access
- **Agent** — autonomous multi-step task
- **CLAUDE.md** — always-on preference or factual context

---

## Step 5 — Deliver the Report

Output the full report in this format:

---

### Weekly Workflow Discovery Report — [DATE]

**Sessions scanned:** [N]
**Period:** Last [N] days
**Projects:** [list of project folders]

---

#### Patterns Found

[Table from Step 3]

---

#### Recommendations

**Build as Skills:**
- `skill-name` — [what it does, why it's a skill, estimated frequency]

**Add to CLAUDE.md:**
- [preference or context to add, which file it should go in]

**Investigate as MCP Plugin:**
- [integration needed, what it would unlock]

**Consider as Agent:**
- [autonomous workflow, what it would do]

**Skip (one-off or too specific):**
- [list]

---

#### Suggested Next Actions

1. [Most impactful thing to build first]
2. [Second]
3. [Third]

---

## Step 6 — Save the Report

Save to:
`projects/workflow-discovery/[YYYY-MM-DD]-report.md`

Create the directory if it doesn't exist.

Also update the Skills Backlog in `CLAUDE.md` with any new skill ideas identified.
