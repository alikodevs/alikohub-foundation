# AlikoHub Foundation Backend

Express + Sequelize + PostgreSQL API (CommonJS).

## Setup

1. Install PostgreSQL and create the database:

```sql
CREATE DATABASE alikohub_foundation;
```

2. Configure `.env`, then:

```bash
cd backend
npm install
npm run dev
```

Required `.env` (Neon cloud example):

```env
PORT=4000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=change-me
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DBNAME?sslmode=require"
DB_SSL=true
```

Get `DATABASE_URL` from [Neon Console](https://console.neon.tech) → your project → **Connect**.

## Main routes

- Public: `/api/health`, `/api/auth/*`, `/api/inquiries`, `/api/newsletter/subscribe`, `/api/public/*`
- Admin (Bearer + admin role): `/api/admin/*`
- Uploads: `/uploads/*`

Postman collection: `postman/AlikoHub-Foundation-API.postman_collection.json`
