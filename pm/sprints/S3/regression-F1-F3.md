# Sprint 3 – Regression F1–F3 (S3-T16)

*Checks that the Sprint 3 work (F4 detail, F5 search and filter, US-25 audit, home page UI) did not break the features accepted in Sprint 1 and Sprint 2.*

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 0.1 | 11/11/2026 | Hồ Du Tuấn Đạt (AI-assisted) | Automated part run on `develop` `8ebbd0b`; hosted smoke list prepared, results TBD |
| 0.2 | 12/11/2026 | Hồ Du Tuấn Đạt (AI-assisted) | Hosted smoke items 6–10 run by Đạt with Claude in Chrome (12/11 ~18:18–18:28, Đạt with Claude in Chrome (Admin session opened by Đạt)): 5/5 Pass; item 11 TBD (DevTools); items 1–5, 12–14 are Chính's |

## 1. Automated part (run 11/11/2026)
Environment: PostgreSQL 16 in the Claude sandbox, `npm test` on `develop` at `8ebbd0b` (after PR #38). Run by Đạt with AI assistance; the test code was written in S1–S3 by both members (see each PR).

| Suite | Feature / ACs | Tests | Result |
|---|---|---|---|
| `users.test.js` | F1: US-01, US-02, US-03, NFR-01 | 10 | 10 Pass |
| `validation.test.js` | F1: US-01/AC-03…04, US-03/AC-01, NFR-01/AC-03 | 6 | 6 Pass |
| `books.test.js` | F2: US-05, US-06, US-07 | 16 | 16 Pass |
| `catalog.test.js` | F2: US-08, US-09 · F3: US-10 · NFR-02 | 19 | 19 Pass |
| `catalog-validation.test.js` | F2/F3 limits, paging | 8 | 8 Pass |
| `staff.test.js` | CR-06: US-24 | 9 | 9 Pass |
| `covers.test.js` | DEF-F2-01/02 seed covers | 3 | 3 Pass |
| **Regression F1–F3 subtotal** | | **71** | **71 Pass, 0 Fail** |
| `audit.test.js`, `detail.test.js`, `back-to-list.test.js`, `search.test.js`, `filter-bar.test.js` | S3: US-25, US-11, US-12, US-13 (UI) | 33 | 33 Pass |
| **All** | | **104** | **104 Pass, 0 Fail** |

Not in this run: `tests/filter.test.js` (S3-T11, 10 tests) is in PR #47 – 114/114 when #47 is merged on top (simulated 11/11).

## 2. Hosted smoke list (https://pagetunnel.vercel.app/)
To run **after** the `develop → main` release that brings #38 and #47. Use test accounts only. Hard refresh (Ctrl + F5) first.
**Runner:** Đạt for F1 and F2/F3 cases written by Chính; Chính for the TC-CR cases written by Đạt (runner ≠ writer).

| # | Area | TC (source) | Steps | Expected | Run by | Result | Date |
|---|---|---|---|---|---|---|---|
| 1 | Login | TC-F1-05 (F1) | Log in with a Customer test account | Logged in, redirected to `/` | TBD | TBD | TBD |
| 2 | Logout + protected page | TC-F1-08 (F1) | Log out, open `/admin` | Sent to Login | TBD | TBD | TBD |
| 3 | Admin creates account | TC-F1-10 (F1) | Admin → Accounts → create a Customer | Account listed with the role | TBD | TBD | TBD |
| 4 | Admin cannot lock self | TC-F1-12 (F1) | Admin tries to lock own account | Refused with a message | TBD | TBD | TBD |
| 5 | Access control | TC-F1-16 (F1) | Customer opens `/admin/books` | HTTP 403 | TBD | TBD | TBD |
| 6 | Add book | TC-F2-01 (F2F3) | Admin adds a valid book with a JPG cover | Saved; first card on `/books` page 1 | Đạt | Pass – "Smoke test 12/11" (JPG cover, 50,000) added → "Book … added", first card on /books page 1 | 12/11 |
| 7 | Edit book | TC-F2-05 (F2F3) | Change the price of that book | New price on `/books` and the detail page | Đạt | Pass – price changed to 60,000 → "Changes saved"; 60.000 ₫ on /books and the detail page; "Last updated by Administrator at 12/11/2026 18:25" | 12/11 |
| 8 | Hide book | TC-F2-09 (F2F3) | Delete → confirm in the popup | Gone from `/books`, detail and search | Đạt | Pass – Delete → popup "Delete “Smoke test 12/11”?" → Delete: gone from the admin list, /books and search; /books/35 → HTTP 404 "Sorry, this book is not available" (clean-up done) | 12/11 |
| 9 | Category | TC-F2-12 (F2F3) | Add a category | Listed; offered in the book form | Đạt | Pass – "  Test 12-11 " → "Category “Test 12-11” added", name trimmed, offered in the book form; then removed (clean-up done) | 12/11 |
| 10 | Grid | TC-F3-01 (F2F3) | Open `/books` | 12 cards, newest first, prices in VND | Đạt | Pass – 12 cards, prices in ₫, newest first, no horizontal scroll (wide window, 4 columns) | 12/11 |
| 11 | Responsive | TC-F3-05 (F2F3) | 360 / 768 / 1280 px | 2 / 3 / 4 columns, no horizontal scroll | Đạt | TBD – window resize had no effect in the Chrome tool; check 360 / 768 / 1280 px in DevTools (Đạt) | 12/11 |
| 12 | Staff adds book | TC-CR-01 (F2F3) | Staff test account adds a book | Saved | TBD | TBD | TBD |
| 13 | Staff no delete | TC-CR-02 (F2F3) | Staff opens the book list | No Delete button | TBD | TBD | TBD |
| 14 | Staff no accounts | TC-CR-03 (F2F3) | Staff opens `/admin/accounts` | HTTP 403 "Access denied" | TBD | TBD | TBD |
| 15 | Clean-up | – | Hide the test books and categories added above | Shop shows only real catalogue data | TBD | TBD | TBD |

Result: TBD / 15. Defects found go to the defect table of `test-cases-F4F5.md` with the date and the runner.
