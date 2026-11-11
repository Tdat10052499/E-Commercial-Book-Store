# Release Notes – Page Turners Book Store v1.0

| Field | Value |
|---|---|
| Release | **v1.0** – Release 1.0 of the E-Commercial Book Store (milestone M7, [03 §6.3]) |
| Tag | `v1.0` on `main` at commit **TBD** (set by S3-T19 after the last S3 merge) |
| Date | **TBD** (planned Thu 12/11/2026) |
| Hosted URL | https://pagetunnel.vercel.app/ (Vercel + Supabase PostgreSQL) |
| Repository | https://github.com/Tdat10052499/E-Commercial-Book-Store |
| Team | Team 6 "Page Turners": Hồ Du Tuấn Đạt (Leader S1, S3), Nguyễn Minh Chính (Leader S2, Product Owner) |
| UAT | Fri 13/11/2026 with the Sponsor (`pm/uat/uat-script.md`, `c5_UAT.docx`) |

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 0.1-draft | 11/11/2026 | Hồ Du Tuấn Đạt (AI-assisted) | Draft from the Product Backlog, PRs and test records; tag, date, acceptance column and known issues to be confirmed at release (S3-T19) |

## 1. What is in v1.0
Release 1.0 scope: 20 items, **62 SP** (baseline v1.1, after CR-06). "Accepted" = every AC passed on the hosted site, code reviewed and merged, automated tests pass (Story DoD).

| Feature | Item | What the user can do | Built in | Accepted |
|---|---|---|---|---|
| F1 Accounts | US-01 Register | Create a Customer account with email and password | S1 | 05/11 |
| | US-02 Log in / out | Log in with a generic error on failure; locked accounts are refused | S1 | 05/11 |
| | US-03 Admin accounts | Admin creates accounts with a role, locks and unlocks them (not their own) | S1 | 05/11 |
| | US-04 Access control | Every `/admin` page and action is checked on the server (403) | S1 | 05/11 |
| | NFR-01 Security | Passwords stored as bcrypt hashes; server-side validation | S1 | 06/11 |
| F2 Catalogue management | US-05 Add book | Add a book with a JPG/PNG cover ≤ 2 MB, price > 0 | S2 | 09/11 |
| | US-06 Edit book | Edit a book; "Book not found" for hidden or unknown books | S2 | 09/11 |
| | US-07 Hide book | Soft delete after a confirmation popup; record kept | S2 | **TBD** |
| | US-08 Categories | Add, rename, remove (only when no visible book uses it) | S2 | 09/11 |
| | US-09 Authors | Add, edit, remove (only when no visible book uses it) | S2 | 09/11 |
| | NFR-02 Sample data | 30 sample books in 6 categories with covers, prices, stock | S2 | S2 end |
| F3 Browse | US-10 Book grid | 12 books per page, newest first, safe page numbers | S2 | S2 end |
| | NFR-04 Responsive UI | 2 / 3 / 4 columns at 360 / 768 / 1280 px, tap targets ≥ 44 px | S2 | **TBD** |
| F4 Book detail | US-11 Detail page | Full details, "Back to list" keeps page, search and filter; friendly "not available" | S3 | **TBD** |
| F5 Search & filter | US-12 Search | Title or author, case-insensitive, partial; `%` and `'` treated as text | S3 | **TBD** |
| | US-13 Filter + paging | Category and inclusive price range; min > max refused; filters kept across pages | S3 | **TBD** |
| | NFR-05 Performance | Catalogue page < 2 s on the host (median of 3 runs) | S3 | **TBD** |
| CR-06 | US-24 Store Staff | Staff adds and edits books, categories, authors; cannot delete books, remove categories/authors or manage accounts | S2 | 09/11 |
| | US-25 Last-updated audit | "Last updated by <name> at <time>" on each book | S3 | **TBD** |
| Hosting | NFR-03 Hosting | Public HTTPS site, kept alive | S1 | **TBD** – TC-F1-24 on 17/11 |

**Outside the Release 1.0 backlog** (UI polish, no SP): home page banners and book rails, card hover with View and Favorite (Favorite is stored in the visitor's browser only), reworked footer, optional 54-book demo catalogue (loaded only with `SEED_DEMO_BOOKS=1`).

## 2. Quality at release
| Check | Result |
|---|---|
| Automated tests (`npm test`) | **TBD** at the tag (114/114 on `develop` + PR #47, 11/11) |
| Test cases | One or more per AC for F1–F5, NFR, CR-06 (`test-cases-F1.md`, `test-cases-F2F3.md`, `test-cases-F4F5.md`) |
| Hosted runs | F1 21/24 (S1–S2), F2/F3 and CR-06 (S3-T02), F4/F5/US-25 (S3-T14): **TBD** |
| Regression F1–F3 | Automated 71/71 (11/11); hosted smoke: **TBD** (`regression-F1-F3.md`) |
| Defects | Found and fixed: DEF-F1-01, DEF-F2-01, DEF-F2-02, DEF-S3-01, DEF-S3-02. Open: **TBD** |

## 3. Known issues and limits
- **NFR-03/AC-03** (site still up after one week) can only be checked on 17/11 (TC-F1-24).
- The free Supabase database pauses after a week without traffic; the keep-alive described in `app/README.md` must stay on.
- No checkout or payment: Release 1.0 is a catalogue with accounts and back office (see the Product Backlog for later releases).
- Further items found at UAT (13/11): **TBD**.

## 4. How to run
Local (Node.js 20+, PostgreSQL 16):
```bash
cd app
npm install
cp .env.example .env.local   # DATABASE_URL and the first admin (ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD)
set -a; . ./.env.local; set +a
npm run db:migrate           # tables + first admin
npm run db:seed              # 30 sample books, safe to run again
npm run dev                  # http://localhost:3000
npm test                     # needs TEST_DATABASE_URL (default postgresql://bookstore:bookstore@localhost:5432/bookstore_test)
```
Hosted: Vercel builds `app/` with `vercel-build` (migrate → seed → optional demo seed → `next build`); environment variables `DATABASE_URL`, `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`. Details: `app/README.md`.

## 5. Accounts for UAT
Test accounts (Admin, Store Staff, Customer) are listed in the UAT script (S3-T13), not in this file.
