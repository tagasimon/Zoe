# Polish My CV

AI-powered CV optimization SaaS. Users upload their CV (PDF/DOCX), paste a job description, pay, and receive an ATS-optimized PDF in under 90 seconds.

**Codebase:** `/Users/kazoobasimon/Code/cv_spark`
**Live name:** polishmycv (rebranded from cv_spark)
**Status:** Production-ready. Actively deployed on Vercel. Live monetisation with two payment rails.
**Last updated:** 2026-03-25

---

## What It Does

Upload CV (PDF/DOCX) → paste job description → pay → AI rewrites CV for ATS + job match → download optimized PDF. Optional: generate tailored interview questions after optimization.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| AI | OpenRouter (Claude 3.5 Sonnet) |
| PDF Generation | Puppeteer-core + @sparticuz/chromium + pdf-lib |
| CV Parsing | pdf-parse (PDF) + mammoth (DOCX) |
| Payments (East Africa) | Relworx (MTN MoMo, Airtel Money) |
| Payments (Global) | Stripe (v2026-02-25) |
| Analytics | Vercel Analytics |
| Hosting | Vercel (serverless) |

---

## Pricing

**East Africa:**
- Price: 2,500 UGX (launch — 50% off 5,000 UGX)
- Currency: Converts live to KES / TZS / RWF via exchangerate-api.com

**Global:**
- Price: USD 4.99 (launch — 50% off USD 9.99)
- Payment: Stripe card

**Promo Codes (10 active):**

| Code | Discount |
|------|----------|
| LAUNCH50 | 50% |
| EARLYBIRD40 | 40% |
| STUDENT30 | 30% |
| PARTNER25 / POLISH25 | 25% |
| FRIEND20 / GRADUATE20 / EASTAFRICA20 | 20% |
| KAMPALA15 / NAIROBI15 | 15% |
| WELCOME10 | 10% |

---

## What's Built (Working)

- CV upload (PDF/DOCX, max 5MB)
- Job description input with validation
- CV parsing (text extraction from PDF and DOCX)
- AI CV rewrite via Claude 3.5 — ATS optimization, keyword injection, annotations showing changes
- PDF download via Puppeteer (A4, 60s timeout)
- Interview prep: 4 questions × 4 categories (technical, behavioral, project-based, skill-gap) + tips
- Relworx mobile money flow (phone input → initiate → poll every 2s → confirm)
- Stripe card payment (PaymentIntent → 3D Secure/SCA → confirm)
- Multi-country support: UG, KE, TZ, RW with live currency conversion
- Promo code system with discount stacking
- Exit intent popup (mouse-leave-top)
- Sticky CTA bar (activates after 700px scroll)
- Social proof notification toasts
- Vercel Analytics

---

## Payment Flow

**East Africa:**
Phone number → Relworx initiates push to MTN/Airtel → client polls payment-status every 2s → on success → trigger CV optimization → download PDF

**Global:**
Stripe PaymentElement mounts → `stripe.confirmPayment()` → on success → trigger CV optimization → download PDF

---

## API Routes

| Route | Purpose |
|-------|---------|
| `POST /api/optimize` | Parse CV + AI rewrite (Claude 3.5) |
| `POST /api/checkout` | Initiate mobile money payment (Relworx) |
| `POST /api/payment-status` | Poll Relworx payment status |
| `POST /api/download` | Generate PDF via Puppeteer |
| `POST /api/interview-questions` | Generate interview prep |
| `POST /api/validate-promo` | Validate promo code |
| `POST /api/stripe/create-intent` | Create Stripe PaymentIntent |
| `POST /api/stripe/webhook` | Stripe webhook (audit trail) |

---

## What's Not Built Yet

- **No database** — all state is client-side. If user closes page after paying, they lose their result.
- No email receipts or confirmations
- No payment recovery UX (re-download link after session lost)
- IP-based geo detection (partially implemented, not fully wired)
- Custom event tracking (Vercel Analytics enabled but no conversion events)
- No user accounts or history

---

## Known Gaps

| Issue | Impact |
|-------|--------|
| No backend persistence | High — paying users lose CV if they refresh |
| No email on purchase | Medium — no receipt, no follow-up |
| Stripe webhook is audit-only | Low — delivery handled client-side, webhook doesn't trigger actions |
| Phone validation only covers Uganda formats | Low — KE/TZ/RW phones accepted at API but regex may reject at UI |

---

## Recent Git History

| Commit | Message |
|--------|---------|
| 0793818 | redesign: apply Apple-inspired design simplification to home page |
| c7f88ed | fix: Rename exported function to proxy in proxy.ts |
| 3e18dde | fix: Rename middleware.ts to proxy.ts + use x-vercel-ip-country for geo |
| e64ef03 | fix: Update Stripe API version to 2026-02-25.clover |
| 7f4ec0f | fixes the payment and added stripe |
| fbb37e5 | feat: Merge redesign/homepage-2026 — full homepage redesign |
| 647cf51 | feat: Add interview prep, promo codes, and UX improvements |
| 8cd0a35 | feat: Add dynamic currency conversion with country selector |
| 55980ac | rebrand: Rename to polishmycv and expand to East Africa |

---

## Next Steps (Priority Order)

1. Add backend persistence — save CV output + payment reference to Supabase so users can re-download
2. Send email receipt on successful payment (Resend or similar)
3. Wire Stripe webhook to trigger CV delivery confirmation (not just audit)
4. Fix IP-based geo detection so East Africa users auto-route to mobile money
5. Add custom conversion events to Vercel Analytics
6. Test phone validation for Kenya, Tanzania, Rwanda numbers
7. Set up custom domain (polishmycv.com or similar)
