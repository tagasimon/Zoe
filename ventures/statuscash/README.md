# StatusCash

WhatsApp Status advertising marketplace. Posters earn money by posting sponsored ads on their WhatsApp Status for 24 hours. Advertisers pay to reach WhatsApp users through their Status.

**Codebase:** `/Users/kazoobasimon/Code/statuscash`
**Status:** Functional MVP — core marketplace working. Completing admin + withdrawal flows before beta.
**Last updated:** 2026-03-20

---

## What It Does

**Poster side:** Sign up → browse campaigns → join → post ad on WhatsApp Status → submit proof (screenshot + screen recording) → get paid via mobile money.

**Advertiser side:** Sign up → create campaign → posters join and post → review proofs → track performance.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| Database | Supabase (PostgreSQL 17 with RLS) |
| Auth | Supabase Auth (email/password) |
| Payments | Relworx (MTN/Airtel UGX) + Stripe (USD fallback) |
| AI Verification | OpenRouter (GPT-4o) |
| UI | shadcn/ui + TailwindCSS 4 |
| Hosting | Vercel |

---

## Business Model

- Advertisers pay 1,000 UGX per 100 views (fixed price)
- Platform fee: 5% of each payout
- Min campaign budget: 10,000 UGX
- Min withdrawal: 5,000 UGX
- Poster limit: 3 campaign joins per day

---

## What's Built (Working)

- Email/password auth with role selection (poster vs advertiser)
- Role-based route protection (Next.js proxy.ts middleware)
- Campaign creation with media upload
- Campaign marketplace with pagination (12 per page)
- Poster join flow with daily limit enforcement
- Two-stage proof submission: initial (28h window) + final (3 days after campaign end)
- Earnings calculation with 5% platform fee
- Trust score system (start 100, -10 per rejection, -30 per fraud, min 20 to join)
- Relworx mobile money integration (MTN/Airtel Uganda + East Africa)
- Promo code system (11 codes: LAUNCH50, EARLYBIRD40, STATUSCASH25, etc.)
- Dashboard views for both roles
- Profile management (both roles)
- Payment status tracking and Relworx webhook support
- 25 database migrations with full RLS policies
- Admin dashboard skeleton

---

## What's Partial / In Progress

- AI verification — GPT-4o connected via OpenRouter, not yet wired to submission processing
- Admin submission review UI — API routes exist, UI not built
- Withdrawal flow — schema and constants ready, API + UI pending
- Fraud detection — fraud_flags table exists, logic pending
- Join request approval UI — API routes exist, UI pending

---

## What's Not Built Yet

- Email notifications for key events
- Real-time updates (Supabase realtime not subscribed in UI)
- User banning workflow UI
- Advertiser reporting and export
- SMS/push notifications

---

## Key Constants

```
Price per 100 views:    1,000 UGX
Platform fee:           5%
Min campaign budget:    10,000 UGX
Min withdrawal:         5,000 UGX
Max poster joins/day:   3
Initial proof window:   28 hours (24h + 4h buffer)
Final proof window:     3 days after campaign ends
AI confidence min:      85%
Trust score start:      100
Trust score minimum:    20 (required to join campaigns)
```

---

## Database Tables

`profiles`, `campaigns`, `campaign_posts`, `submissions`, `earnings`, `withdrawals`, `fraud_flags`, `campaign_payments`, `join_requests`

---

## Open Questions → Answered

| Question | Answer |
|----------|--------|
| Stack decision | Next.js web app on Vercel |
| View count verification | Manual screenshot + screen recording + AI check |
| Minimum payout threshold | 5,000 UGX |
| KYC | Phone number required at signup (MTN/Airtel), trust score system in place |
| MVP scope | Two-sided marketplace with proof submission — built |

---

## Next Steps (Priority Order)

1. Wire GPT-4o AI verification to submission processing
2. Build admin submission review UI
3. Complete withdrawal request API + UI
4. Build join request approval UI (advertiser side)
5. Move secrets from .env.local to Vercel env vars (security)
6. Full end-to-end test: signup → campaign → proof → payout
7. Email notifications (campaign joined, proof approved, payout sent)

---

## Long-Term Vision

Performance-based social advertising network built on messaging platforms. Expand to Kenya, Tanzania, Rwanda. Add click tracking, audience targeting, influencer tiers.

---

## Recent Git History

| Commit | Message |
|--------|---------|
| 98430fe | fixes |
| a9729b0 | Fix onboarding: use admin client to bypass RLS on profile update |
| cfea9a8 | Simplify campaign creation: fixed price, 1-week duration, optional max posters |
| 4078bae | Add campaign flow, two-stage proof system, and profile updates |
| 3a821f8 | Require phone number at earner signup |
