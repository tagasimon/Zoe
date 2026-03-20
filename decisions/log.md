# Decision Log

Append-only. When a meaningful decision is made, log it here.

Format: [YYYY-MM-DD] DECISION: ... | REASONING: ... | CONTEXT: ...

[2026-03-15] DECISION: Pivot primary client acquisition focus from ERP solutions to mobile apps and websites | REASONING: ERP has long sales cycles, large procurement budgets, and complex buying committees — too slow for a pre-revenue business needing first client fast. Websites and mobile apps are faster decisions, lower ticket friction, and Simon already has the skills to deliver immediately | CONTEXT: Elastic Technologies is pre-revenue, 6 months without income, urgent need to close first paying client

---

[2026-03-20] DECISION: Restore operator-mode as a standalone skill | REASONING: operator-mode and daily-briefing serve different purposes — operator-mode decides what to work on today (strategy), daily-briefing handles logistics (calendar, email, tasks). Merging them caused confusion about execution priority. Reinstating as separate skill makes the daily workflow explicit: operator-mode first, then daily-briefing for support | CONTEXT: Skill system cleanup pass

[2026-03-20] DECISION: Archive job-hunter skill | REASONING: Job hunting directly conflicts with the primary goal — building Elastic Technologies and closing clients. Having it as an active skill creates an escape hatch that undermines focus. Archived to archives/skills/job-hunter/ in case situation changes | CONTEXT: Skill system alignment with goals

[2026-03-20] DECISION: Define and start building Rotarise monetisation layer | REASONING: App is live at v1.3.3+33 with donation flow, club shop, and payment integration already built — platform makes $0. Three revenue streams confirmed: donation commission, club subscriptions, shop commission. Fastest path to revenue is adding fee deduction logic to existing payment flows (low code effort, immediate impact) | CONTEXT: Rotarise venture review session

[2026-03-20] DECISION: Add explicit daily and weekly workflow order to CLAUDE.md | REASONING: Without a defined order, skills compete for attention. The workflow (operator-mode → daily-briefing → execute → content-engine) removes ambiguity about what to run and when | CONTEXT: Skill system cleanup pass

---

[2026-03-20] DECISION: Upgrade Zoe from a simple assistant workspace to a full Life OS | REASONING: Simon is building a personal brand, running a startup, managing a challenge, and living a life — the old structure (context/, projects/, career/, teams/) was too flat and didn't reflect the real scope of what Zoe manages. A dedicated system for each domain (identity, brand, challenge, ventures, clients, life, knowledge, memory, operations) makes it scalable and gives each area its own clear home | CONTEXT: Personal brand strategy completed (5-year plan), Zero to 1000 challenge planned, Elastic Technologies restructuring from ERP to mobile/web apps

[2026-03-20] DECISION: Migrate context/ files to identity/ and rename | REASONING: "context" describes what Zoe reads; "identity" describes what Simon IS — the rename is more meaningful and accurate. Original files preserved in context/ for backwards compatibility until fully deprecated | CONTEXT: Life OS restructure

[2026-03-20] DECISION: Split projects/ into ventures/ and clients/ | REASONING: SaaS products (StatusCash, Polish My CV) and client service work are fundamentally different — different goals, different cadences, different failure modes. Mixing them in one folder caused confusion | CONTEXT: Life OS restructure

[2026-03-20] DECISION: Move references/ content to knowledge/ | REASONING: "references" is a passive label; "knowledge" signals that this is a living, growing system — SOPs, notes, research, examples all belong under one knowledge umbrella | CONTEXT: Life OS restructure

---
