---
name: toastmasters-speech-writer
description: Writes a Toastmasters prepared speech for Simon. Use when Simon asks to write, draft, or prepare a Toastmasters speech. Humorous, storytelling style, 5-7 minutes.
argument-hint: "[topic] [key-message]"
disable-model-invocation: true
---

# Toastmasters Speech Writer

Write a prepared Toastmasters speech for Simon Kazooba.

**Topic / Input:** $ARGUMENTS

## Speaker Profile
- **Name:** Simon Kazooba
- **Style:** Humorous, storytelling, personal
- **Target length:** 5-7 minutes (650–900 words)
- **Timing signals:** Green = 5 min | Yellow = 6 min | Red = 7 min

## Step 1 — Collect Input

If $ARGUMENTS is empty or incomplete, ask Simon for:
1. **Topic or theme** — What is the speech about?
2. **Key message** — The one thing the audience should leave with
3. **Personal story** — Any real experience to weave in? (If none, ask: "What's a moment in your life that connects to this?")
4. **Pathways project** — e.g., Icebreaker, Persuasive Influence, Engaging Humour (optional)
5. **Length preference** — Full script or keyword outline?

## Step 2 — Write the Speech

Follow the structure in [examples/speech-structure.md](examples/speech-structure.md).

Key rules:
- Open with impact — question, bold claim, or short funny anecdote — before the formal greeting
- Each body point = a short personal story using STAR (Situation → Tension → Action → Result)
- End each point with a punchy one-liner
- Callback to the opening before the close
- Final line must land — not "thank you"

## Step 3 — Add Delivery Notes

Embed these cues inline:
- `[PAUSE]` — deliberate pause for effect
- `[SLOW DOWN]` — important moment
- `[LOOK UP]` — make eye contact with room
- `[SMILE]` — signal a light beat
- `[TIMING: ~Xmin]` — checkpoints at 2 min, 4 min, 6 min

## Step 4 — Deliver Output

Provide all three:
1. **Full script** with delivery notes inline
2. **Keyword outline** — one-word memory prompts per beat
3. **Timing breakdown** — seconds per section

## Step 5 — Save the Speech

Save the completed speech to:
`career/toastmasters/[YYYY-MM-DD]/speech.md`

Also save the keyword outline to:
`career/toastmasters/[YYYY-MM-DD]/outline.md`

---

For speech structure reference, see [examples/speech-structure.md](examples/speech-structure.md).
