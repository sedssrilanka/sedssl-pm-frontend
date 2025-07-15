# SEDSSL Membership & Project Management App – Module Checklist

This document outlines the required modules for the SEDSSL membership and project management application, built with Next.js App Router, Supabase (auth, database, storage), and hosted on Cloudflare Workers/R2.

---

## Architecture Overview

- 🟩 **Frontend:** Next.js (App Router)
- 🟩 **Backend/Database:** Supabase (Postgres, Auth, Storage)
- 🟨 **Storage:** Supabase Storage (CVs, files), Cloudflare R2 (optional for large assets)
- 🟩 **Hosting:** Cloudflare Workers
- 🟩 **Authentication:** Supabase Auth (email/password, OAuth)
- 🟩 **Deployment:** Cloudflare Pages/Workers

![Architecture Diagram](/architecture.png)

---

## Core Modules

### Membership Management

- 🟨 **User Registration**
  - Form validation (Zod)
  - CV upload (PDF only)
  - Terms acceptance
  - Supabase Auth integration

- 🟨 **Login & Authentication**
  - Email/password login
  - OAuth (Google, GitHub)
  - Session management (middleware)  
    _Supabase Auth and session middleware present_

- ⬜ **Profile Management**
  - Edit profile details
  - View membership status
  - Upload/update CV

- 🟩 **Membership Status Tracking**
  - Application progress UI
  - Status badges (pending, under review, approved, rejected)
  - Alerts/notifications  
    _Implemented in [`src/components/members/membership-status-progress.tsx`](src/components/members/membership-status-progress.tsx)_

- ⬜ **Admin Membership Review**
  - List of applicants
  - Approve/reject actions
  - Membership database updates

### Project Management

- 🟨 **Kanban Board**
  - Task cards (drag & drop)
  - Assign members
  - Task status (todo, in progress, done)
  - Comments/discussion  
    _UI present in [`src/app/(admin)/projects/kanban-board.tsx`](<src/app/(admin)/projects/kanban-board.tsx>)_

- 🟨 **Project Directory**
  - List projects
  - Project details page
  - Member assignments  
    _Sidebar and details UI present in [`src/components/project-sidebar.tsx`](src/components/project-sidebar.tsx)_

- ⬜ **Task Management**
  - Create/edit/delete tasks
  - Assign tasks to members
  - Due dates, priorities

- ⬜ **Reports & Analytics**
  - Project progress
  - Member contributions
  - Export data (CSV/PDF)

### Member Directory & Roles

- ⬜ **Member Directory**
  - List/search members
  - View profiles

- ⬜ **Roles & Permissions**
  - Role assignment (admin, member, guest)
  - Access control for modules

- ⬜ **Chapters & Hierarchy**
  - Chapter listing
  - Member hierarchy visualization

### Notifications & Communication

- ⬜ **Email Notifications**
  - Membership updates
  - Project/task assignments

- ⬜ **In-app Alerts**
  - Status changes
  - Deadlines

### Storage & File Management

- ⬜ **CV/Document Storage**
  - Supabase Storage integration
  - Cloudflare R2 for large files

- ⬜ **Public/Private File Access**
  - Secure URLs for CVs
  - Admin-only access for sensitive docs

---

## Hosting & Deployment

- ⬜ **Cloudflare Worker Setup**
  - API endpoints
  - Edge functions

- 🟨 **Supabase Integration**
  - Database schema
  - Auth setup
  - Storage buckets  
    _.env.local and bindings present_

- ⬜ **Next.js App Router**
  - Route structure
  - SSR/SSG configuration

- 🟩 **Environment Configuration**
  - .env.local for secrets
  - Cloudflare environment bindings

---

## Additional/Optional Modules

- ⬜ **Audit Logs**
  - Track changes/actions

- ⬜ **API Documentation**
  - Swagger/OpenAPI for endpoints

- ⬜ **Mobile Responsiveness**
  - UI adapts to mobile devices

- ⬜ **Accessibility**
  - WCAG compliance

---

## Progress Tracking

- Use the squares above to mark completed modules.
- Add notes or links to implementation details as modules are finished.

---

**Legend:**  
🟩 = Done  
🟨 = Partially Done  
⬜ = Not Done
