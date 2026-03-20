# Rotarise

Social networking app for Rotary and Rotaract members. Brings all Rotary clubs into one platform — news feed, events, projects, chat, shop, and club management.

**Flutter App codebase:** `/Users/kazoobasimon/Code/rotaract/`
**Marketing website:** `/Users/kazoobasimon/AndroidStudioProjects/rotarise_website/`
**Live domain:** https://rotarise.com
**Google Play:** https://play.google.com/store/apps/details?id=com.rotarise.app
**Status:** Live and running. Version 1.3.3+33. **Active development — monetisation layer in progress.**
**Last updated:** 2026-03-20

---

## What It Does

A social platform built specifically for Rotary/Rotaract clubs. Members can:
- Follow clubs, join events, collaborate on projects
- Post to a news feed, comment, like, tag members
- Chat directly with other members
- Browse and buy from club shops
- Donate to club initiatives
- Receive meeting day reminders via push notifications

Club admins can:
- Manage members, roles, and buddy groups
- Create and run events and projects
- Manage a club shop with products and services
- Track club assets and manage sponsors
- Export member data (CSV)

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Flutter (Dart >=3.4.4) |
| State Management | Flutter Riverpod 2.5.1 |
| Database | Firebase Firestore (real-time, offline persistence) |
| Auth | Firebase Auth (email/phone) |
| Storage | Firebase Storage |
| Push Notifications | Firebase Messaging (FCM) + Flutter Local Notifications |
| Backend Logic | 15 Firebase Cloud Functions (TypeScript, Node.js 20, 2nd Gen) |
| Payments | Flutterwave + Relworx (MTN/Airtel Uganda) |
| Code Push | Shorebird (OTA updates without app store review) |
| Analytics | Firebase |
| PDF/Export | pdf + printing packages, CSV export |
| Platforms | Android, iOS, Web (Firebase Hosting) |

---

## App Version

**Current:** 1.3.3+33
**Code push:** Shorebird enabled — OTA updates without app store submission

---

## Features

### Working
- Firebase Auth login (email/phone)
- Club home screen (stats, projects, events, posts, sponsors, donations)
- News feed (posts, comments, likes, mentions, @tagging, video/image media)
- Events (create, list, filter, details, registration)
- Projects (add/edit/search, partner orgs, updates, featured)
- Direct chat with unread counter and FCM notifications
- Member management (listing, profiles, CSV export, analytics/insights)
- Club shop (products, cart, checkout, order history)
- Donations with mobile money
- Club management (roles, buddy groups, asset register)
- Admin tools (sponsors, products, services dashboard)
- Push notifications (in-app + FCM + meeting day scheduler)
- Theme/dark mode with persistence
- Club discovery and search
- User profiles (view + edit)
- Settings screen
- Shorebird OTA code push

### Partially Built
- Notification settings — event reminders and club announcement preferences not wired up
- Chat — image/file messages display not implemented; read receipts incomplete
- Discover tab — Projects tab has a known bug (TODO: Fix this)
- Reports screen — screen exists, functionality not built

### Not Built
- Monetisation layer (defined but not implemented — see below)
- No web-specific UI optimisations (mobile-first layout on web)
- No A/B testing or growth tooling

---

## Cloud Functions (15 deployed)

| Function | Trigger |
|----------|---------|
| sendMeetingDayNotifications | Daily cron at 10AM UTC — FCM to members on meeting days |
| chatNotificationServices | Firestore write — new chat message |
| notificationServices | General notification dispatch |
| updateClubMembersCount | Member join/leave |
| updateClubEventsCount | Event created/deleted |
| updateClubProjectsCount | Project created/deleted |
| updatePostLikesCount | Like added/removed |
| updatePostsOnMemberChange | Member profile change |
| updatePostViewCount | Post viewed |
| updateClubRank | Club activity |
| updatePostRank | Post engagement |
| updateMeetupFields | Event/meetup update |
| updatePostReportsAsSpamCount | Post reported as spam |
| updateUserClubId | User joins club |
| randomViews | Background engagement simulation |

---

## Payment Integration

- **Flutterwave** — cards and mobile money across Africa
- **Relworx** — Uganda-specific MTN Mobile Money and Airtel Money
  - Base URL: https://payments.relworx.com/api
  - Phone validation: 07XXXXXXXX / 256XXXXXXXXX / 2567XXXXXXXX

Used for: club donations, club shop purchases

---

## Marketing Website

Single-page scrollable site at https://rotarise.com

**Sections:** Hero → Features → Benefits → Screenshot carousel → Testimonials → Download CTA → Footer

**Built with:** Vanilla HTML/CSS/JS (no dependencies)
**Status:** Deployed as of August 2025
**SEO:** Sitemap, robots.txt, OG tags, Twitter cards all configured

**App Store CTA Status:**
- Google Play link: live (`com.rotarise.app`)
- App Store link: needs verification (ID may be placeholder)

---

## Known Issues / TODOs

| Area | Issue |
|------|-------|
| Chat | Image and file messages not displayed |
| Chat | Read receipts incomplete |
| Discover | Projects tab has a bug — currently hidden |
| Settings | Event reminder and club announcement prefs not wired |
| Reports | Screen exists, no functionality |
| App Store | iOS App Store ID may be placeholder — verify |
| Website | App Store link needs to be confirmed with real ID |

---

## Recent Git History (Flutter App)

| Version | Commits |
|---------|---------|
| v1.3.3+33 | fix the club home screen |
| v1.3.2+32 | — |
| v1.3.1+31 | fixed the issue with the projects details screens |
| v1.3.0+30 | fixed the sharing options, fixed chat screen, fixed create post modal |

---

## Current Work

**Sprint goal:** Wire the monetisation layer. The app is live but makes no money. All three core revenue streams are 80% built — they just need the fee logic added.

| Task | Status | Details |
|------|--------|---------|
| Donation commission (3–5%) | TODO | Add fee deduction to donation checkout before payout |
| Shop order commission (3–5%) | TODO | Add fee deduction to club shop order flow |
| Club Pro feature gates | TODO | Define which features are Pro, add tier check |
| Flutterwave recurring billing | TODO | Implement subscription plans for clubs |
| Fix Discover Projects bug | TODO | Projects tab hidden — needs fix |
| Chat image/file messages | TODO | Core chat feature incomplete |

---

## Monetisation Model

### Revenue Streams (Confirmed)

**1. Donation Commission**
- Clubs receive donations from members and supporters via the app
- Rotarise takes a % cut on every transaction processed through the platform
- Suggested rate: 3–5% per donation
- Already have: donation flow built, Flutterwave + Relworx integrated
- To build: platform fee deduction logic before payout to club

**2. Club Subscriptions**
- Clubs currently pay for multiple separate tools (attendance management, member registers, project tracking, event management, communication)
- Rotarise replaces all of these in one app
- Clubs pay a monthly or annual subscription for full access to the tools tier
- Pricing model (suggested):
  - Free tier: basic feed, events, projects (capped features)
  - Club Pro: UGX 50,000–100,000/month — attendance, member export, asset register, full shop, advanced notifications, reports
  - Multi-club / District: custom pricing for district-level access
- Already have: most tools built — attendance not yet explicitly built but member management is
- To build: subscription gate logic, payment recurring billing (Flutterwave supports subscriptions), feature flag per club tier

**3. Club Shop Commission**
- Clubs sell merchandise, uniforms, event tickets, and service packages through their club shops
- Rotarise takes a small cut per transaction (suggested: 3–5%)
- Already have: club shop, cart, checkout, Flutterwave + Relworx payments
- To build: commission deduction on each order before club payout

---

### Additional Revenue Ideas (To Evaluate)

**4. Event Ticketing**
- Clubs host charity dinners, fundraisers, installation ceremonies
- Sell tickets through the app — Rotarise takes a per-ticket or % fee
- Low build effort — events feature exists, just add ticketing + seat limits + QR check-in

**5. Sponsored Posts / Club Promotions**
- Businesses (hotels, caterers, printers) want to reach Rotary members
- Sponsored posts appear in the club feed as promoted content
- Clubs or businesses pay for placement
- Rotary ecosystem has professional demographics — high-value audience

**6. District / Rotary International Licensing**
- Once adoption grows, pitch the tool to Rotary District offices as their official district platform
- Flat annual licensing fee per district (can cover 20–40 clubs per district)
- District 9214 (Uganda/Rwanda/Burundi) is the immediate target

**7. Service Directory**
- Rotarians frequently do business with each other (it's part of the culture)
- Verified member service directory — plumbers, lawyers, designers, caterers
- Charge members for featured/boosted listings

---

### Revenue Priority

| Stream | Effort to Build | Revenue Potential | When |
|--------|----------------|------------------|------|
| Club Shop commission | Low (logic only) | Medium | Now |
| Donation commission | Low (logic only) | Medium | Now |
| Event ticketing | Medium | High | Next sprint |
| Club subscriptions | Medium (billing + gates) | High — recurring | Q2 2026 |
| Sponsored posts | Low | Medium | Q2 2026 |
| District licensing | High (sales, not tech) | High | Q3 2026 |

**Immediate actions:**
1. Add 3–5% platform fee to donation and shop checkout flows
2. Define what "Club Pro" includes and gate 2–3 features behind it
3. Implement Flutterwave subscription billing for club plans

---

## Next Steps (Priority Order)

**Monetisation (do this first — it's already mostly built):**
1. Add platform fee (3–5%) to donation checkout flow
2. Add platform fee (3–5%) to club shop order checkout
3. Define Club Pro feature set — pick 3 features to gate behind subscription
4. Implement Flutterwave recurring billing for club subscriptions

**Bug fixes and feature completion:**
5. Fix Discover tab Projects bug — feature is hidden from users
6. Finish chat media: implement image/file message display
7. Wire notification settings: event reminders + club announcements

**Growth:**
8. Verify iOS App Store link on marketing website (may be placeholder ID)
9. Build Reports screen — what does a club president need to see?
10. Pitch to one district office for licensing conversation

---

## Firebase Project

**Project ID:** rotaract-584b8
**Storage:** gs://rotaract-584b8.firebasestorage.app
**Functions runtime:** Node.js 20 (2nd Gen)
