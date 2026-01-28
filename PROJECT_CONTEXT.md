## 📌 LMS Project Context (Admin Dashboard) ##

**Tech stack:**

- Next.js (App Router)

- Supabase (Auth + DB)

- shadcn/ui + Tailwind

**Auth:**

- Roles: admin, teacher, student

- Middleware-based role protection

**Routes:**

- /login

- /dashboards/admin

- /dashboards/admin/students

- /dashboards/admin/students/[studentId]

**Admin layout:**

- Fixed navbar

- Fixed sidebar

- Scrollable main content

**Admin features implemented:**

- Sidebar with: Overview, Students, Teachers, Courses, Classes, Reports, Settings

- Overview dashboard with stats + charts placeholders

- Students list page with:

- Class & section filter

- Table

- Actions (View, Disable, Delete)

- Student profile page with:

- Student info

- Course progress

- Assignments & marks

- Feedback

- Admin actions

**Current state:**

- UI-first

- Using dummy data

- Supabase integration pending for students