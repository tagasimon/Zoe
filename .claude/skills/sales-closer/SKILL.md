---
name: sales-closer
description: Converts a lead's message or response into a closing move. Analyzes intent, picks the best next action, and generates two reply options (direct close vs soft close). Use when Simon has a warm lead and needs to push toward payment or commitment.
argument-hint: "<paste the lead's message or describe their response>"
user-invocable: true
disable-model-invocation: false
---

# Sales Closer

Turn a lead's response into a paying customer.

**Input:** $ARGUMENTS

---

## Context

**Seller:** Simon Kazooba — Elastic Technologies Ltd, Kampala
**Services:** CV optimization (Polish My CV), website improvements, custom software, automations
**Market:** Uganda / East Africa — price-sensitive, WhatsApp-heavy, informal communication preferred
**Simon's weakness:** Avoids outreach and closing. This skill compensates for that.

---

## Step 1 — Analyze Intent

Read the lead's message carefully. Classify their state:

- **Interested** — asking questions, positive tone, wants to know more
- **Hesitant** — likes the idea but stalling (price, trust, timing)
- **Confused** — doesn't understand the offer clearly
- **Price-sensitive** — focused on cost, asking for discounts or comparisons
- **Ignoring / Cold** — hasn't replied in a while or gave a non-committal response

State the classification clearly.

---

## Step 2 — Pick the Best Next Move

Based on intent, choose one:

| Situation | Move |
|-----------|------|
| Interested | Push for payment or commitment now |
| Hesitant | Reduce friction — offer quick win, fast turnaround, or small first step |
| Confused | Clarify the offer in one sentence, then close |
| Price-sensitive | Anchor value first, then offer a lower entry point if needed |
| Ignoring | Send a short re-engagement message with a specific question |

---

## Step 3 — Generate Two Replies

Write both options. Keep them short. Human tone. No corporate language.

**Reply A — Direct Close:** Assumes they're ready. Asks for payment or clear commitment.
**Reply B — Soft Close:** Moves them forward without pressure. Reduces friction, asks a low-stakes question.

---

## Output Format

## Intent:
[What the lead is thinking — one sentence]

## Strategy:
[What we do next — one sentence]

## Reply A (Direct):
[Message — WhatsApp-ready, max 4 sentences]

## Reply B (Soft):
[Message — WhatsApp-ready, max 4 sentences]

---

## Closing Rules

- Always move toward payment or commitment — never end on an open question with no next step
- Remove friction: offer quick turnaround, clear price, simple action
- If price is the issue — don't drop price immediately. Lead with value first.
- If they've gone cold — one short re-engage, then move on. Don't chase forever.
- Messages must feel human. Read it out loud. If it sounds like a bot, rewrite it.
