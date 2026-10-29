# Sprint 1 – Test Cases F1

Format: GWT → steps → expected → actual [03 §6.1-7]. One test case per AC (24 ACs → 24 test cases).

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 30/10/2026 | Hồ Du Tuấn Đạt (AI-assisted) | Test cases from F1 ACs; automated results from a real local run |
| 1.1 | 30/10/2026 | Hồ Du Tuấn Đạt (AI-assisted) | Manual run found defect DEF-F1-01 (TC-F1-15); expected result made precise; E2E assertion tightened |

**Evidence of automated run** (local build, PostgreSQL 16, 30/10/2026): `npm test` → 16/16 pass (UNIT = `tests/validation.test.js`, INT = `tests/users.test.js`); `npm run e2e` → 18/18 pass (E2E = `app/e2e/f1.e2e.js`, Chromium). Log: `pm/sprints/S1/evidence/test-run-2026-10-30.txt`.
**Manual run on the hosted URL** must be done by a team member before the Review and written in the last column (Pass/Fail, date, tester).

| TC | AC | Given | When (steps) | Then (expected) | Automated | Actual – local automated | Actual – hosted, manual |
|---|---|---|---|---|---|---|---|
| TC-F1-01 | US-01/AC-01 | Register page open | Submit valid name, new email, password `Reader2026` | Account created as Customer, signed in, redirected home | E2E + INT | Pass (30/10) | TBD |
| TC-F1-02 | US-01/AC-02 | Customer `x@y.com` exists | Register with `X@Y.COM` | "Email is already registered" by email field; no new account | E2E + INT | Pass (30/10) | TBD |
| TC-F1-03 | US-01/AC-03 | Register page open | Submit `not-an-email`; then empty fields; then POST bypassing client | Field errors on client; server also rejects | E2E + INT | Pass (30/10) | TBD |
| TC-F1-04 | US-01/AC-04 | Register page open | Password `abc1234` (7) then `abcd1234` (8) | 7 rejected, 8 accepted | E2E + UNIT | Pass (30/10) | TBD |
| TC-F1-05 | US-02/AC-01 | Active account | Log in with correct credentials | Signed in; name and Log out shown | E2E + INT | Pass (30/10) | TBD |
| TC-F1-06 | US-02/AC-02 | Active account | Log in with wrong password; with unknown email | Same generic "Invalid email or password" | E2E + INT | Pass (30/10) | TBD |
| TC-F1-07 | US-02/AC-03 | Account locked by admin | Log in with correct credentials | "This account is locked…" | E2E + INT | Pass (30/10) | TBD |
| TC-F1-08 | US-02/AC-04 | Signed in | Click Log out; open /admin | Session ended; redirected to Login | E2E | Pass (30/10) | TBD |
| TC-F1-09 | US-02/AC-05 | Account `e@x.com` | Log in with `  E@X.COM ` | Signed in | E2E + INT + UNIT | Pass (30/10) | TBD |
| TC-F1-10 | US-03/AC-01 | Signed in as admin | Create account with role Customer | Appears in list, role Customer, Active | E2E + INT | Pass (30/10) | TBD |
| TC-F1-11 | US-03/AC-02 | Admin; another active account | Lock, then Unlock | Locked user cannot log in; after unlock can | E2E + INT | Pass (30/10) | TBD |
| TC-F1-12 | US-03/AC-03 | Signed in as admin | Click Lock on own row | "You cannot lock your own account" | E2E + INT | Pass (30/10) | TBD |
| TC-F1-13 | US-03/AC-04 | Admin; email exists | Create account with that email | Field error; no account | E2E + INT | Pass (30/10) | TBD |
| TC-F1-14 | US-03/AC-05 | User signed in in another browser | Admin locks that user; user reloads | User is signed out | E2E + INT | Pass (30/10) | TBD |
| TC-F1-15 | US-03/AC-06 | Not signed in | Open /admin/accounts | Redirect to /login?next=%2Fadmin%2Faccounts; after login back on that page | E2E | Pass (30/10) | TBD |
| TC-F1-16 | US-03/AC-07 | Signed in as Customer | Open /admin/accounts directly | HTTP 403 "Access denied" | E2E | Pass (30/10) | TBD |
| TC-F1-17 | US-03/AC-08 | Signed in as admin | Open /admin | Admin dashboard shown | E2E | Pass (30/10) | TBD |
| TC-F1-18 | US-03/AC-09 | Signed in as Customer | Look at header on any page | No Admin menu | E2E | Pass (30/10) | TBD |
| TC-F1-19 | US-01/AC-05 | New account saved | Inspect `users.password_hash` in DB | bcrypt hash `$2…$10$…`, not plain text | INT | Pass (30/10) | TBD |
| TC-F1-20 | US-01/AC-06 | Any form | Send invalid data bypassing client | Server rejects, nothing stored | INT | Pass (30/10) | TBD |
| TC-F1-21 | US-01/AC-07 | Register form | Name 101 chars; password 65 chars | Rejected (100 / 64 accepted) | UNIT | Pass (30/10) | TBD |
| TC-F1-22 | NFR-02/AC-01 | `develop` deployed | Open public URL | Home page over HTTPS | — | Not run (needs hosting) | TBD |
| TC-F1-23 | NFR-02/AC-02 | Site idle ≥ 15 min | Open URL | Responds; URL recorded | — | Not run (needs hosting) | TBD |
| TC-F1-24 | NFR-02/AC-03 | 17/11/2026 | Open URL | Online | — | Not run (needs hosting) | TBD |

## Defects found
| ID | TC | Found | Description | Fix | Status |
|---|---|---|---|---|---|
| DEF-F1-01 | TC-F1-15 | 30/10/2026, manual run (Đạt) | Any admin URL redirected to `/login?next=%2Fadmin`: the admin layout guard used a fixed default path, so after login the user landed on the dashboard instead of the page requested. The automated check only tested for `next=` and missed it | `src/middleware.js` passes the requested path; `requireAdmin` uses it; E2E now asserts the exact `next` | Fixed, re-verified locally (curl); manual re-test TBD |

## Summary (local automated)
| ACs | Test cases | Executed | Pass | Fail | Not run |
|---|---|---|---|---|---|
| 24 | 24 | 21 | 21 | 0 | 3 (NFR-02 hosting) |
