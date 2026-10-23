# SharkTrack - Professional Sales Tracking Platform

## 🚀 Setup Instructions (Local Development)

### 1. Prerequisites
- Node.js 18+ or Bun
- PostgreSQL Database (or Supabase Project)

### 2. Environment Configuration
Create a `.env` file in the root directory based on `.env.example`.

### 3. Installation
```bash
# Using Bun (Recommended)
bun install
bun run db:push  # Sync schema to database
bun run dev

# Using NPM
npm install
npm run db:push
npm run dev
```

### 4. Deployment (Production)
- Use **Vercel** for the frontend and API.
- Use **Supabase** for the PostgreSQL database.
- Configure **VAPID keys** for Web Push notifications.

## 🛠️ Architecture Overview

- **Frontend**: Next.js 14 (App Router), Tailwind CSS, shadcn/ui.
- **Database**: PostgreSQL with Drizzle ORM.
- **Real-time**: Supabase Realtime.
- **Webhooks**: Adapter-based architecture for platform normalization.
- **Push**: Web Push API + VAPID.

## 📋 Integration Endpoints
- `POST /api/public/webhook/sharkbot`
- `POST /api/public/webhook/atenaspay`
