# StatusCash

**Status:** Pre-development — concept stage
**Last updated:** 2026-03-10

## What It Is

A WhatsApp Status advertising marketplace. Businesses pay for ad exposure; everyday users earn money by posting those ads on their WhatsApp Status and submitting view proof.

## The Two Sides

| Role | What they do |
|------|-------------|
| Advertiser | Creates a campaign, sets budget and pay-per-100-views rate |
| Poster | Browses ads, posts on WhatsApp Status for 24h, submits screenshot + screen recording |

## How Money Flows

- Advertiser sets: budget + price per 100 views (e.g. 2,000 UGX / 100 views = 20 UGX/view)
- Poster earns: views × rate (e.g. 120 views × 20 UGX = 2,400 UGX)
- Platform takes: 5% commission on every campaign

## Key Technical Pieces

| Component | Details |
|-----------|---------|
| Proof submission | Screenshot + screen recording of WhatsApp Status showing ad + view count |
| Fraud detection | AI check + manual review; fake submissions = permanent ban |
| Payouts | Relworx API → MTN Uganda Mobile Money, Airtel Uganda Money |
| Campaign limits | Daily cap on how many campaigns a poster can join (anti-spam) |

## Target Market (Phase 1)

Uganda — Kampala urban. Advertisers: restaurants, retail, event organizers, real estate, betting companies, online services.

## Revenue Model

5% platform commission. Scales through volume.

## Long-Term Vision

Performance-based social advertising network built on messaging platforms. Expand to other African markets. Add click tracking, audience targeting, influencer tiers.

---

## Open Questions / Next Steps

- [ ] Technical stack decision (web app, mobile app, or both?)
- [ ] How to handle WhatsApp view count — manual screenshot only, or any automation possible?
- [ ] Minimum payout threshold
- [ ] KYC / identity verification for posters
- [ ] Legal structure for operating in Uganda
- [ ] MVP scope — what's the smallest version that works?
