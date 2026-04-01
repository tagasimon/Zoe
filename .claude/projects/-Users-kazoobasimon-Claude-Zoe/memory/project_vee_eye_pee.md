---
name: Vee Eye Pee Agency — project state
description: Luxury modelling/escort agency platform for East Africa. MVP built. Team is Simon, Alvin, Raymond. Codebase at /Users/kazoobasimon/Code/vee-eye-pee.
type: project
---

Vee Eye Pee Agency is a venture Simon is building with Alvin and Raymond. It's a luxury private concierge modelling agency platform targeting East Africa, presented publicly as a modelling agency.

**Codebase:** `/Users/kazoobasimon/Code/vee-eye-pee`
**Repo:** https://github.com/tagasimon/Vee-Eye-Pee-Agency
**Venture notes:** `ventures/vee-eye-pee/README.md`

**Stack:** Next.js 16 (App Router), TypeScript, Supabase (Postgres + Storage + RLS), Tailwind CSS 4, Framer Motion, Resend (email), WhatsApp link generation.

**What's done:**
- Full public site: homepage, models directory, individual model profiles, booking form, apply form
- Admin dashboard: model CRUD, view bookings, review applications, image upload to Supabase Storage
- DB schema with RLS (public read models, public insert bookings/applications)
- Luxury dark + gold design system (Cormorant Garamond + Inter)

**What's missing:**
- Proper admin auth (currently just email match — no JWT/session/middleware protection)
- Email notifications for booking requests (only applications trigger email)
- Vercel deployment not set up yet
- ISR for model pages, SEO (sitemap, structured data), analytics

**Why:** Revenue-generating venture — bookings handled via WhatsApp, so no payment integration needed initially.
**How to apply:** When Simon mentions vee-eye-pee or the agency, refer to this context. Always check the README for latest state before suggesting work.
