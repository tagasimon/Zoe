# SchoolConnect — Client Brief

## Client
- **Name:** TBD (school client)
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

## Notes
- Multi-tenant — every table has `school_id`, RLS enforced
- Parents access only via `parent_student` join table
- SMS fires automatically on absent attendance or announcements
