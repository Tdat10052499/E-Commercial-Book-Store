# Page Turners Book Store – app

Release 1.0 of the E-Commercial Book Store (Team 6). Stack chosen at P04 (30/10/2026): **Next.js 15 (App Router) + PostgreSQL on Supabase, hosted on Vercel**.

| Sprint | Feature | Status |
|---|---|---|
| S1 | F1 accounts & roles: register, login/logout, admin creates and locks accounts, server-side admin guard, bcrypt hashing | Implemented, tests below |
| S2 | F2 books/categories/authors, F3 catalogue grid | Data model, seed (30 books), categories, authors, catalogue grid implemented (Chính, PR P15); book add/edit/hide (US-05…07) and CR-06 Staff role by Đạt |
| S3 | F4 detail, F5 search/filter | – |

## Run locally
```bash
cd app
npm install
cp .env.example .env.local        # set DATABASE_URL and the first admin
npm run db:migrate                 # creates tables + first admin (reads env from your shell)
npm run db:seed                    # loads the 30 sample books (NFR-02); safe to run again
npm run dev                        # http://localhost:3000
```
`db:migrate` reads variables from the shell, e.g. `set -a; . ./.env.local; set +a; npm run db:migrate`.

## Extra demo books and home banners (UI polish, outside the Release 1.0 backlog)
- `npm run db:seed-demo` adds 54 more books (8 categories) with Open Library covers; `node db/seed-demo.js --remove` takes them out again. On Vercel set `SEED_DEMO_BOOKS=1` to load them during the build. `db:seed` and the tests still use only the 30 seed books.
- Home banners: drop the images listed in `public/banners/README.md` into `public/banners/`; texts and links are in `src/lib/home-content.js`.

## Tests
- `npm test` – unit + integration tests (needs a PostgreSQL database in `TEST_DATABASE_URL`, default `postgresql://bookstore:bookstore@localhost:5432/bookstore_test`; the tables are truncated).
- `npm run e2e` – browser test of every F1 AC against a running app (`BASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`).

## Deploy (Supabase + Vercel)
1. Supabase → new project → *Project Settings → Database → Connection string → Transaction pooler* (port 6543). Copy it.
2. Vercel → *Add New Project* → import this repo → **Root Directory: `app`**.
3. Environment variables: `DATABASE_URL` (step 1), `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`.
4. Deploy. The `vercel-build` script runs `db/migrate.js` and `db/seed.js` (both idempotent) before `next build`, so tables, the first admin and the sample books are created automatically.
5. Record the URL in `plan/INPUTS.md` §3. Never commit real passwords or connection strings.

## Structure
- `lib/` – framework-free logic (validation shared by client and server, password hashing, users, sessions).
- `db/` – schema, migration, sample data (`seed-data.js`, `seed.js`) and the cover generator (`make-covers.js` → `public/covers/`).
- `src/app/` – Next.js pages and server actions; `src/lib/current-user.js` holds the server-side guards (`requireAdmin`, `requireCatalogEditor`; CR-06 adds `staff` to `CATALOG_EDITORS`).
- `tests/`, `e2e/` – automated tests.
