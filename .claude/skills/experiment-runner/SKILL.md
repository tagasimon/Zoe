---
name: experiment-runner
description: Turns an idea or opportunity into a structured 1-3 day experiment with a clear hypothesis, test plan, success metric, and kill criteria. Stops Simon from building before validating. Use when a new idea appears and needs to be tested cheaply before getting attention.
argument-hint: "<idea or opportunity to test>"
user-invocable: true
disable-model-invocation: false
---

# Experiment Runner

Turn an idea into a fast, cheap test. No building until validated.

**Input:** $ARGUMENTS

---

## Context

**Who this is for:** Simon Kazooba — Elastic Technologies Ltd, Kampala, Uganda
**Known failure mode:** New ideas get built before any real user wants them. Weeks of work, zero revenue signal.
**Rule:** No writing code, no designing, no building anything until the experiment says go.

**Current active experiments (max 2):**
- Website audit outreach to Kampala hotels/NGOs
- Polish My CV organic traffic

If both slots are full, this new idea goes to the backlog in `income/experiments.md` — it does not run until one experiment ends.

---

## Step 1 — Define the Hypothesis

One sentence. Format: "If I do [specific action], then [specific result] will happen, because [assumption about the user or market]."

The hypothesis must be falsifiable — you need to be able to say definitively whether it was true or false after the test.

Bad hypothesis: "This could work for businesses in Kampala."
Good hypothesis: "If I send 10 personalized website audit messages to Kampala restaurants, at least 1 will reply with interest within 48 hours."

---

## Step 2 — Build the Test Plan

Max 3 days. No code. No design. Use what already exists.

Format:
- Day 1: [Action]
- Day 2: [Action]
- Day 3: [Action — measure and decide]

The test must involve real users or real market contact. Reading articles, making plans, or "researching" does not count as a test.

Cheapest valid test options:
- Send a WhatsApp message to 5–10 real prospects
- Post on a relevant group and count responses
- Offer the service manually before building anything
- Show a mockup to 3 real potential customers and ask if they'd pay

---

## Step 3 — Set the Success Metric

One number. Clear and unambiguous. Either hit or not.

Examples:
- 1 reply expressing interest out of 10 messages
- 1 person willing to pay (even a verbal yes counts)
- 3 signups in 48 hours
- 1 paying customer before any code is written

If you can't set a number — the hypothesis is too vague. Go back to Step 1.

---

## Step 4 — Set Kill Criteria

What ends the experiment:
- **Kill if:** [specific condition that means the idea is not working]
- **Continue if:** [specific condition that means there's a signal worth pursuing]

Kill criteria must be as specific as the success metric.

---

## Step 5 — Assign the Next Step

The single action Simon takes today to start the experiment. Not tomorrow. Today.

Must be concrete: "Send a WhatsApp to 5 Kampala restaurants using the audit template" not "start reaching out."

---

## Output Format

## Idea:
[Restated clearly in one sentence]

## Hypothesis:
[If I do X, then Y will happen, because Z]

## Test Plan:
- Day 1: [Action]
- Day 2: [Action]
- Day 3: [Measure and decide]

## Success Metric:
[The one number that means this is working]

## Kill Criteria:
[The specific condition that ends this experiment]

## Next Step:
[The one action to take today to start — no prep, no planning, just do it]

---

## Rules

- No building before validation. If the test requires writing code, the test is wrong.
- Max 3 days per experiment. If it takes longer to test, it's not a test — it's a project.
- Real users only. You cannot validate an idea by thinking about it.
- If 2 experiments are already active — this goes to the backlog. Name it and park it.
- An experiment that keeps getting extended is a failed experiment. Kill it.
