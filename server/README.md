# Backend — Contracts + Stripe

Express + Prisma + Postgres + Stripe. Serves the `/api` routes consumed by the React site.

---

## Local setup

```bash
cd server
cp .env.example .env   # fill in values
npm install
# Create the DB schema on your local Postgres
npm run db:migrate:dev -- --name init
# Create the admin user from ADMIN_USERNAME/ADMIN_PASSWORD
npm run db:seed
npm run dev
```

The server listens on `PORT` (default `4000`). Health check: `GET /api/health`.

### Testing Stripe webhooks locally

Install the Stripe CLI, then:

```bash
stripe login
stripe listen --forward-to localhost:4000/api/webhooks/stripe
# Copy the whsec_... it prints into STRIPE_WEBHOOK_SECRET in your .env, then restart.
```

---

## Railway deployment

You'll run **three** things in one Railway project:

1. **Postgres** — add via Railway's Postgres plugin. It exposes `DATABASE_URL` automatically.
2. **Backend service** (this `/server` directory).
3. **Frontend service** (the existing Vite site at the repo root).

### Backend service settings

- **Root directory**: `server`
- **Build command**: `npm install && npm run build && npx prisma migrate deploy && npm run db:seed`
- **Start command**: `npm run start`
- **Environment variables**:
  - `DATABASE_URL` — reference the Postgres plugin's variable
  - `JWT_SECRET` — `openssl rand -hex 64`
  - `ADMIN_USERNAME` — your admin username
  - `ADMIN_PASSWORD` — the plaintext admin password (hashed on first boot, stored in DB; rotate anytime by changing this var and redeploying)
  - `STRIPE_SECRET_KEY` — `sk_test_...` to start, swap to `sk_live_...` after testing
  - `STRIPE_WEBHOOK_SECRET` — paste after you create the webhook endpoint in Stripe (see below)
  - `PUBLIC_WEB_ORIGIN` — full URL of the frontend, e.g. `https://jaredmackay.com`
  - `CORS_ORIGINS` — same as above, comma-separated if multiple
  - `NODE_ENV` — `production`
  - `COOKIE_DOMAIN` — your apex domain if front + back share it (e.g. `jaredmackay.com`), otherwise leave blank

### Frontend service env

- `VITE_API_BASE_URL` — the full URL of the backend service, e.g. `https://api.jaredmackay.com`

### Stripe webhook

In Stripe Dashboard → Developers → Webhooks → Add endpoint:

- URL: `https://<your-backend>.up.railway.app/api/webhooks/stripe`
- Events to send:
  - `checkout.session.completed`
  - `invoice.payment_succeeded`
  - `invoice.payment_failed`
  - `customer.subscription.deleted`
- Copy the signing secret into `STRIPE_WEBHOOK_SECRET` and redeploy.

### Rotating the admin password

Change `ADMIN_PASSWORD` in Railway and redeploy. The seed script re-hashes on every boot and updates the DB row.

---

## API summary

| Method | Path                              | Auth  | Purpose                                          |
|--------|-----------------------------------|-------|--------------------------------------------------|
| POST   | `/api/auth/login`                 | —     | Body: `{username,password}` → sets cookie        |
| POST   | `/api/auth/logout`                | —     | Clears cookie                                    |
| GET    | `/api/auth/me`                    | admin | Returns current admin                            |
| GET    | `/api/contracts`                  | admin | List contracts                                   |
| POST   | `/api/contracts`                  | admin | Create contract                                  |
| GET    | `/api/contracts/:id`              | admin | Get contract                                     |
| PATCH  | `/api/contracts/:id`              | admin | Update contract                                  |
| DELETE | `/api/contracts/:id`              | admin | Delete + cancel Stripe subscription if any       |
| GET    | `/api/public/contract/:id`        | —     | Client-facing contract details                   |
| POST   | `/api/public/contract/:id/sign`   | —     | Body: `{agree:true,signerName}` → Stripe URL     |
| POST   | `/api/webhooks/stripe`            | sig   | Stripe webhook receiver                          |
