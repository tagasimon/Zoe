---
name: content-engine
description: Pulls content ideas directly from Simon's challenge logs, builds, and weekly activity. Generates 5–10 TikTok-style video ideas with strong hooks. No generic AI content — every idea comes from something Simon actually did or built. For full scripts, use tiktok-writer.
argument-hint: "[optional: topic focus — challenge|brand|clients|ai-tools|building]"
user-invocable: true
disable-model-invocation: true
---

# Content Engine

**Focus:** $ARGUMENTS (default: scan everything, extract best ideas)

Add `script` to the argument to generate a short script for the top idea.
Example: `/content-engine challenge script`

---

## Step 1 — Read the Source Material

Read all of the following:

- `challenge/zero-to-1000/log.md` — every action taken
- `challenge/zero-to-1000/builds/` — list all files, read any that exist
- `challenge/zero-to-1000/revenue.md` — money made, sources
- `operations/weekly-review/logs/` — list files, read the most recent one
- `brand/content/ideas/README.md` — existing idea backlog (avoid duplicating)

Extract raw material:
- Things Simon built or shipped recently
- Experiments that succeeded
- Experiments that failed or were killed
- Tools used to get something done faster
- Money made (even small amounts — $5 is content)
- Decisions made and why
- Struggles or blockers that were overcome

If all files are empty or the challenge hasn't started: flag it, then generate ideas based on what Simon *should* be doing given his identity and goals (read `identity/goals.md` and `identity/vision.md`).

---

## Step 2 — Filter for Content-Worthy Moments

Not everything is content. Apply this filter:

**Keep moments that are:**
- Surprising ("I made $X in Y hours doing Z")
- Instructional ("Here's exactly how I did X")
- Honest ("This failed and here's why")
- Contrarian ("Everyone says X but I tried Y instead")
- Progress-based ("Week 3 update — here's the real numbers")
- Tool-based ("I used [AI tool] to do X in [time]")

**Skip moments that are:**
- Too vague to demonstrate on screen
- Internal decisions with no visible output
- Admin tasks with no insight (setting up accounts, installing packages)

Aim to extract 8–12 raw moments, then cut to the best 5–10.

---

## Step 3 — Generate Video Ideas with Hooks

For each idea, output:

**Format:**
```
IDEA #[N]
Topic: [what the video is about in plain words]
Angle: [surprising / instructional / honest / contrarian / progress / tool]
Source: [which log entry or build this came from]

Hook: [opening line — spoken to camera, under 10 words, states the result or tension]
Hook (alt): [second option]

Video flow:
1. [Hook — 0–3 seconds]
2. [Problem or context — 5–10 seconds]
3. [The thing you did / built / tried — 20–40 seconds, show screen if possible]
4. [Result or lesson — 10 seconds]
5. [CTA or question — 5 seconds]

Recordable in: [under 1 min / 60–90 sec]
Requires screen recording: [yes / no]
```

---

## Step 4 — Hook Quality Check

For every hook generated, verify it passes this test:

- Does it state a result, tension, or surprise in the first 3 words?
- Would someone who doesn't know Simon stop scrolling?
- Is it specific (number, tool name, outcome) not vague ("I did something crazy")?
- Is it under 10 words?

If a hook fails — rewrite it. Do not output weak hooks.

**Hook patterns that work:**

| Pattern | Example |
|---------|---------|
| Number + result | "I made $47 with one Google Doc" |
| I did X in Y time | "I built this in 2 hours using Claude" |
| Surprising contrast | "This free tool beats $99/month software" |
| Honest failure | "I launched this and made $0 — here's why" |
| Challenge update | "Day 12 of my $0 → $1,000 challenge — real numbers" |
| Tool reveal | "I automated my entire client process with AI" |
| Local angle | "AI tools African businesses are sleeping on" |

---

## Step 5 — Save to Idea Backlog

> For a full recording script, run `/tiktok-writer [idea title]` after this skill.

Append the new ideas to `brand/content/ideas/README.md` under a dated section:

```md
## [DATE] — Content Engine Run

- [Idea 1 title]
- [Idea 2 title]
- ...
```

Do not duplicate ideas already in the backlog.

---

## Step 7 — Output

Output in this format:

---

### Content Engine — [DATE]

**Source:** [what was read — log entries / builds / weekly review]
**Ideas generated:** [X]

---

[IDEA #1]
[IDEA #2]
...
[IDEA #N]

---

**Script** *(if requested)*

[Full script for idea #1]

---

**Added to backlog:** `brand/content/ideas/README.md` ✓

---

## Content Rules

- Every idea must come from something Simon actually did — no fabricated scenarios
- If the challenge log is empty, say so. Generate ideas based on what Simon *should* document as he starts.
- Never generate "Top 5 AI tools" listicles unless they're grounded in tools Simon personally used this week
- Short = better. Ideas recordable under 60 seconds are prioritised
- The best content is embarrassingly simple — "I used AI to write a proposal" beats a 5-minute tutorial
- Always include the local/African angle where it fits naturally — it is the differentiator
