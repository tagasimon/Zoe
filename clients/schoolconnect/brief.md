# SchoolConnect — Client Brief

## Client
- **Name:** Atubo Stephen
- **Project:** SchoolConnect — multi-tenant parent-school communication platform
- **Pilot school:** St Johns Primary School, Uganda (450 students)
- **Target go-live:** Term 2 2026

## Scope
- **Web platform** — Next.js 16, for school staff (admins, teachers, accountants)
- **Mobile app** — Flutter, for parents (Google Play Store)
- **Backend** — Supabase (auth + PostgreSQL), Africa's Talking SMS

## Codebase
`/Users/kazoobasimon/Code/school-mgt-platform`
- `web/` — Next.js web platform
- `mobile/` — Flutter parent app

## Current Build Order
1. Student bulk CSV upload
2. Teacher management
3. Attendance UI
4. SMS integration (Africa's Talking)
5. Results upload
6. Fee entry
7. Announcements with SMS broadcast

## Payment

| # | Date | Amount (UGX) | Status | Notes |
|---|------|-------------|--------|-------|
| 1 | 2026-03-25 | 1,500,000 | Received | First payment from Atubo Stephen |

- **Total received:** 1,500,000 UGX
- **Balance outstanding:** 1,000,000 UGX
- **Project deadline:** 2026-03-31
- **Total contract value:** 2,500,000 UGX *(received + balance)*

## Notes
- Multi-tenant — every table has `school_id`, RLS enforced
- Parents access only via `parent_student` join table
- SMS fires automatically on absent attendance or announcements
