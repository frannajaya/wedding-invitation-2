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
| PUT    | /api/rsvp   | Update an RSVP by token  |
| GET    | /api/rsvp   | List all RSVPs (admin)   |
| POST   | /api/wishes | Submit a guest wish      |
| GET    | /api/wishes | List all wishes (admin)  |

The backend stores data in a local SQLite file at `backend/data/wedding-invitation.sqlite` by default.
Override the location with `WEDDING_DB_PATH` if needed.

Guest count validation is controlled by the environment:

```env
RSVP_MIN_GUESTS=1
RSVP_MAX_GUESTS=6
```

The RSVP form uses an `editToken` returned by `POST /api/rsvp` so a guest can update their submission later without an account.

### Frontend

```bash
cd frontend
npm install
npm run dev          # starts on http://localhost:3000
```

Create `frontend/.env.local` to point at the backend:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_RSVP_MAX_GUESTS=6
```

The frontend loads Great Vibes for script headings and Cormorant Garamond for body copy, then composes the invitation from these sections:

`Hero` → `CollageBanner` → `Celebration` → `Itinerary` → `FAQ` → `Gallery` → `RSVP` → `Wishes`

---

## Component Architecture

```
page.tsx
 ├── <Hero />            – opening script heading + polaroid
 ├── <CollageBanner />   – wide banner + note card
 ├── <Celebration />     – story block + mixed photos
 ├── <Itinerary />       – schedule + registry note
 ├── <FAQ />             – two-column question list
 ├── <Gallery />         – gallery banner + two polaroids
 ├── <RSVP />            – attendance + guest count form
 └── <Wishes />          – separate guest message form
```

Reusable UI primitives live in `components/ui/` and can be imported by any section or page.  
Page-level sections live in `components/sections/` and each map to a visual block on the invitation.