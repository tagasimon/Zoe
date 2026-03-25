# Vee Eye Pee Agency

**Type:** Web platform — luxury private concierge modelling agency (East Africa)
**Codebase:** `/Users/kazoobasimon/Code/vee-eye-pee`
**Repo:** https://github.com/tagasimon/Vee-Eye-Pee-Agency
**Team:** Simon, Alvin, Raymond

---

## What It Is

A luxury modelling agency platform for East Africa. Publicly presented as a modelling agency. Clients browse a curated roster, submit private booking requests (via WhatsApp), and models can apply through the site. Admin dashboard handles all management.

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16.2.1 (App Router) |
| Language | TypeScript |
| Database | Supabase (PostgreSQL + RLS) |
| Storage | Supabase Storage (model images, application photos) |
| Auth | Supabase email auth (admin-only, basic) |
| Styling | Tailwind CSS 4 + Framer Motion |
| Email | Resend (admin notifications) |
| Booking | WhatsApp link generation |

## Current State (as of 2026-03-25)

### Done
- Public homepage with film grain/spotlight luxury aesthetic
- Models directory with location/gender filtering
- Individual model profile pages (gallery, stats, bio, booking form)
- Booking request form → generates pre-filled WhatsApp link + saves to DB
- Model application form (multi-photo upload, age validation, email alert to admin)
- Admin dashboard (stats, models CRUD, view bookings, review applications)
- Supabase schema with RLS (public read models, public insert bookings/applications, admin full access)
- Image upload to Supabase Storage

### Missing / Not Done
- Proper admin auth (currently just email match — no JWT/session)
- Email notifications for booking requests (only applications send email)
- Pagination/filtering in admin booking and application lists
- ISR/caching for model pages
- SEO (sitemap, robots.txt, structured data)
- Analytics/tracking
- Two-way WhatsApp messaging (currently just generates links)
- Payment processing

## Design System

- Black backgrounds (`#080808`, `#0d0d0d`)
- Gold accent (`#c9a84c`)
- Fonts: Cormorant Garamond (headings) + Inter (body)
- Heavy letter-spacing uppercase style throughout

## Key Files

```
app/page.tsx                  Homepage
app/models/page.tsx           Models directory
app/models/[slug]/page.tsx    Individual profile
app/apply/page.tsx            Model application
app/admin/                    Admin dashboard
app/api/apply/route.ts        Application submission
app/api/booking/route.ts      Booking submission
lib/supabase/                 DB clients
supabase/schema.sql           Full DB schema
```

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
ADMIN_EMAIL=admin@veeeyepee.com
NEXT_PUBLIC_WHATSAPP_NUMBER=256773383412
RESEND_API_KEY
NEXT_PUBLIC_APP_URL
```

## Next Priorities

1. Fix admin auth (JWT sessions, proper middleware protection)
2. Add booking email notifications to admin
3. Deploy to Vercel (production URL not set up yet)
4. ISR for model profile pages
