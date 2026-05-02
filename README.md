# wedding-invitation-2

A monorepo containing both the **Frontend** (Next.js) and **Backend** (Node.js / Express) for the Wedding Invitation web application.

---

## Repository Structure

```
wedding-invitation-2/
├── backend/                      # Node.js + Express API
│   ├── src/
│   │   ├── controllers/
│   │   │   └── rsvpController.ts   # Request handlers for RSVP endpoints
│   │   ├── middleware/
│   │   │   └── errorHandler.ts     # Global error-handling middleware
│   │   ├── models/
│   │   │   └── rsvp.ts             # RSVP TypeScript interface / model
│   │   ├── routes/
│   │   │   └── rsvpRoutes.ts       # Express router for /api/rsvp
│   │   └── index.ts                # App entry point
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                     # Next.js 15 (App Router)
│   ├── public/                   # Static assets (images, fonts, etc.)
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx          # Root layout (HTML shell, global CSS)
│   │   │   └── page.tsx            # Home page – composes all sections
│   │   ├── components/
│   │   │   ├── sections/           # Full-page sections (one per wedding topic)
│   │   │   │   ├── Couple.tsx
│   │   │   │   ├── Gallery.tsx
│   │   │   │   ├── Hero.tsx
│   │   │   │   └── RSVP.tsx
│   │   │   └── ui/                 # Small, reusable UI primitives
│   │   │       ├── Button.tsx
│   │   │       └── Card.tsx
│   │   ├── lib/
│   │   │   └── api.ts              # Typed fetch helpers for the backend API
│   │   └── styles/
│   │       └── globals.css         # Global CSS reset + base styles
│   ├── next.config.js
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9 (or `yarn` / `pnpm`)

### Backend

```bash
cd backend
npm install
npm run dev          # starts on http://localhost:4000
```

Available endpoints:

| Method | Path        | Description              |
|--------|-------------|--------------------------|
| GET    | /health     | Health check             |
| POST   | /api/rsvp   | Submit a guest RSVP      |
| GET    | /api/rsvp   | List all RSVPs (admin)   |

### Frontend

```bash
cd frontend
npm install
npm run dev          # starts on http://localhost:3000
```

Create `frontend/.env.local` to point at the backend:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

## Component Architecture

```
page.tsx
 ├── <Hero />        – couple names & wedding date
 ├── <Couple />      – bride & groom introduction
 ├── <Gallery />     – photo gallery (placeholder)
 └── <RSVP />        – guest attendance form
         └── uses <Button /> (ui primitive)
```

Reusable UI primitives live in `components/ui/` and can be imported by any section or page.  
Page-level sections live in `components/sections/` and each map to a visual block on the invitation.