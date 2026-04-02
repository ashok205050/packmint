## Packmint

Production-ready full-stack website for low MOQ custom packaging services targeting skincare startups in India.

### Stack

- Next.js (App Router)
- MongoDB + Mongoose
- Tailwind CSS
- Nodemailer
- API routes in Next.js

### Features

- Premium, responsive marketing website
- Inquiry form with validation, loading/error states
- MongoDB persistence via `Inquiry` model
- Admin email notification on inquiry submission
- Protected `/admin` dashboard with inquiry list + delete
- SEO metadata + OpenGraph

### Project Structure

- `src/app` - routes and API handlers
- `src/components` - reusable UI/client components
- `src/models` - Mongoose schemas
- `src/lib` - db connection, auth, validation, email helpers

### Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment file:

```bash
cp .env.example .env.local
```

3. Add your MongoDB Atlas and SMTP credentials in `.env.local`.

4. Run development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### API

- `POST /api/inquiry` - Validate + save inquiry + send admin email
- `GET /api/inquiry` - Admin-only inquiry list
- `DELETE /api/inquiry/:id` - Admin-only delete
- `POST /api/admin/login` - Sets admin cookie
- `POST /api/admin/logout` - Clears admin cookie

### Admin Access

Visit `/admin` and use the password from `ADMIN_PASSWORD`.

### Strong Admin Auth (JWT Session)

- Login verifies `ADMIN_PASSWORD`, then issues a signed JWT session cookie.
- JWT is `httpOnly`, `sameSite=lax`, secure in production, and expires in 8 hours.
- Admin API endpoints verify JWT signature + audience/issuer before allowing access.
- Required envs:
  - `ADMIN_PASSWORD`
  - `ADMIN_JWT_SECRET` (long random secret, at least 32 chars)

### Login Rate Limiting

- `/api/admin/login` includes server-side brute-force protection.
- Rate-limit strategy:
  - 5 failed attempts in 15 minutes -> temporary block
  - Block duration: 30 minutes
- Enforcement is persisted in MongoDB, so it works across serverless instances.
- On successful login, failed-attempt state for the client IP is cleared.

### Deploy on Vercel + Mongo Atlas

1. Create a MongoDB Atlas cluster and database user.
2. In Atlas Network Access, allow Vercel egress (`0.0.0.0/0`) or restricted IP ranges.
3. Copy your Atlas SRV connection string into `MONGODB_URI`.
4. In Vercel project settings, add env vars:
   - `MONGODB_URI`
   - `ADMIN_PASSWORD`
   - `ADMIN_JWT_SECRET`
   - `ADMIN_EMAIL`
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
   - `NEXT_PUBLIC_SITE_URL`
5. Deploy with Vercel. `vercel.json` already sets API function max duration.
