# AlikoHub Foundation Backend

Express + Sequelize + MySQL API (CommonJS).

## Setup

```bash
cd backend
npm install
npm run dev
```

Required `.env`:

```env
PORT=4000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=your_password
DB_NAME=alikohub_foundation
JWT_SECRET=change-me
```

## Main routes

- Public: `/api/health`, `/api/auth/*`, `/api/inquiries`, `/api/newsletter/subscribe`, `/api/public/*`
- Admin (Bearer + admin role): `/api/admin/*`
- Uploads: `/uploads/*`

Postman collection: `postman/AlikoHub-Foundation-API.postman_collection.json`
