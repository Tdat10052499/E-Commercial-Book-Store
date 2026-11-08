# Sprint 2 – Test Cases F2, F3, CR-06 (US-24) and F1 regression

Format: GWT → steps → expected → actual [03 §6.1-7, §6.2-2]. **One test case per AC** (28 ACs → 28 test cases); boundary ACs test both sides of each limit in the same case. AC text: `pm/backlog/product-backlog.md` v1.2.

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 04/11/2026 | Nguyễn Minh Chính | Test cases for F2 (US-05…US-09, NFR-02) and F3 (US-10, NFR-04) from the ACs; automated results from a real local run of PR #8. CR-06 test cases (US-24) are S2-T20 (Đạt) and are added by Đạt |
| 1.1 | 05/11/2026 | Hồ Du Tuấn Đạt | Local automated results for US-05/06/07 (branch `feat/P17-books-staff`); new section CR-06 (TC-CR-01…05, one per US-24 AC) and F1 regression table (S2-T20). Hosted results stay TBD until S2-T23 |
| 1.2 | 05/11/2026 | Hồ Du Tuấn Đạt | Defects DEF-F2-01 and DEF-F2-02 found by Đạt on the hosted site (23:10) and fixed in `fix/ui-covers-confirm`; confirmation steps now use a styled popup instead of `window.confirm` (team UI decision) |
| 1.3 | 05/11/2026 | Nguyễn Minh Chính | Hosted run of the public pages at 23:55 (S2-T23, part done by Chính): NFR-02, US-10 and the `/books` part of NFR-04 pass on https://pagetunnel.vercel.app/; F1 guard re-checked for the new admin URLs. Admin-side hosted cases (US-05…09, US-24) still need a login → TBD |
| 1.4 | 08/11/2026 | Hồ Du Tuấn Đạt | S3-T02 (ECBS-148), part 1: hosted run of the **Admin** cases TC-F2-01…20 on https://pagetunnel.vercel.app/ (08/11 ~23:30–24:00, Admin account). 16 Pass, 2 Pass with observation (TC-F2-16, TC-F2-20: the input `maxLength` stops the extra character, no field error shown), TC-F2-11 Blocked (detail page not deployed), TC-F2-12 not run, TC-F2-19 partly run. Screenshots in `evidence/hosted-admin-0811/`. Store Staff cases (TC-CR-01…05) follow in part 2 |

**Automated run** (04/11/2026, PostgreSQL 16, branch `feat/P15-catalogue`, PR #8): `npm test` → **43/43 pass** – 8 UNIT (`tests/catalog-validation.test.js`), 19 INT (`tests/catalog.test.js`), plus 16 F1 regression (`tests/validation.test.js`, `tests/users.test.js`). RESP = component render of the grid and admin tables in Chromium at 360/768/1280 px (horizontal scroll width and grid columns measured).
**Automated run 2** (05/11/2026, PostgreSQL 16, local run, branch `feat/P17-books-staff` merged with `develop` locally): `npm test` → **68/68 pass** – the 43 above, plus 16 INT `tests/books.test.js` (US-05/06/07) and 9 INT `tests/staff.test.js` (US-24). One F1 test (`validation.test.js`, US-03/AC-01) had to be updated: it still expected the role `staff` to be rejected, which CR-06 changed on purpose. E2E checks for US-07/AC-02 and US-24 were added to `e2e/f1.e2e.js` but **not run** (no browser in the sandbox) → run them on the host.
**Hosted manual run** (S2-T23, Đạt): after PR #8 is merged and deployed to https://pagetunnel.vercel.app/. Write Pass/Fail, date and tester in the last column. Items not implemented at the time of the run are marked *Blocked* and returned to the Product Backlog if still open at the Sprint end.

## F2 – Book, category and author management

| TC | AC | Type | Given | When (steps) | Then (expected) | Automated | Actual – local automated (04/11; US-05…07 on 05/11) | Actual – hosted, manual |
|---|---|---|---|---|---|---|---|---|
| TC-F2-01 | US-05/AC-01 | M | Admin on Add Book; category *Novel* and author *Jane Austen* exist | Enter title, author, category, price 129000, description, JPG cover 500 KB, stock 5 → Save | Book saved; first card on `/books` page 1 | INT | Pass (05/11) – saved, first in admin list and `/books` page 1 | Pass (08/11, Đạt) – *TEST BOOK*, Jane Austen / Novel, 129 000 ₫, stock 5 is the first row [`evidence/hosted-admin-0811/01`] |
| TC-F2-02 | US-05/AC-02 | E | Admin on Add Book | Price `0`, then `-5`, then `abc` → Save (also POST without client checks) | "Price must be greater than 0"; nothing saved (client and server) | INT | Pass (05/11) – `0`, `0.00`, `-5`, `abc`, empty → message; count unchanged (server). Client check: host run | Pass (08/11, Đạt) |
| TC-F2-03 | US-05/AC-03 | E | Admin on Add Book | Leave title, author, category empty → Save | Field-level errors; nothing saved | INT | Pass (05/11) – 3 field errors; also unknown author id → form error; nothing saved | Pass (08/11, Đạt) – field errors for title, author, category [`evidence/hosted-admin-0811/03`, on the Edit form] |
| TC-F2-04 | US-05/AC-04 | B | Admin on Add Book | (a) price 0.01, stock 0, cover exactly 2 MB → accepted; (b) cover 2 MB + 1 byte → rejected; (c) `.pdf` renamed `.jpg` → rejected | (a) saved; (b), (c) error, nothing saved | INT | Pass (05/11) – (a) 0.01/0/2 097 152 B saved; (b) 2 097 153 B rejected; (c) PDF, GIF and text sent as `image/png` rejected by the file signature | Pass (08/11, Đạt) – (a) Pass, (b) Pass, (c) Pass |
| TC-F2-05 | US-06/AC-01 | M | Existing book | Edit price and title with valid values → Save | New values on `/books` and detail page | INT | Pass (05/11) – list and grid show new values (detail page: S3) | Pass (08/11, Đạt) – price 0.01 and stock 0 saved, list shows 0,01 ₫ / 0 [`evidence/hosted-admin-0811/04`, `05`]; detail page: S3 |
| TC-F2-06 | US-06/AC-02 | E | Existing book | Change price to `0` → Save | Edit refused; old values remain | INT | Pass (05/11) – price 0/−1, empty title, cover > 2 MB refused; title, price, stock, `updated_at` unchanged | Pass (08/11, Đạt) – "Price must be greater than 0" on Edit [`evidence/hosted-admin-0811/02`] |
| TC-F2-07 | US-06/AC-03 | E | Book id 99999 does not exist; book X is hidden | Open `/admin/books/99999/edit`, then X's edit URL | "Book not found" both times | INT | Pass (05/11) – 99999, hidden id, `abc` → "Book not found" (data layer; the page calls `notFound()`) | Pass (08/11, Đạt) – `/admin/books/99999/edit` → "Book not found" [`evidence/hosted-admin-0811/06`] |
| TC-F2-08 | US-06/AC-04 | B | Existing book | Open edit, change nothing → Save | Book unchanged; confirmation shown | INT | Pass (05/11) – `unchanged`, `updated_at` kept; confirmation text: host run | Pass (08/11, Đạt) – "No changes – the book is unchanged" [`evidence/hosted-admin-0811/07`] |
| TC-F2-09 | US-07/AC-01 | M | Visible book X | Click Delete → confirm | X disappears from `/books` (and later detail/search); DB row kept with `is_deleted = true` | INT | Pass (05/11) – gone from grid, admin list, edit, cover route; row kept, `is_deleted = true` | Pass (08/11, Đạt) |
| TC-F2-10 | US-07/AC-02 | E | Visible book X | Click Delete → Cancel | Nothing changes | E2E | Not run – e2e check written (`US-07/AC-02`), no browser in the sandbox | Pass (08/11, Đạt) |
| TC-F2-11 | US-07/AC-03 | B | Book X hidden | Customer opens X's old detail URL | Friendly "Book not found" page | INT (data layer) | Blocked – detail page is US-11 (S3); data layer returns not found for a hidden id (Pass 05/11) | Blocked (08/11, Đạt) – the customer detail page (US-11) is not deployed yet (PR #22 open); re-run in S3-T14 |
| TC-F2-12 | US-08/AC-01 | M | Admin on `/admin/categories` | Add `  Novel ` → Add category | "Category “Novel” added"; listed (trimmed); offered in the book form list | INT | Pass | Not run on 08/11 (adding a new category with spaces around the name) – TBD |
| TC-F2-13 | US-08/AC-02 | M | Category *Sci* used by book *Cosmos* | Rename to *Science* | *Cosmos* shows category *Science* | INT | Pass | Pass (08/11, Đạt) – rename accepted, "Renamed to …" [`evidence/hosted-admin-0811/08`] |
| TC-F2-14 | US-08/AC-03 | E | Category *Novel* exists | Add `NOVEL`; rename another category to `novel` | "Category already exists"; nothing changed | INT | Pass | Pass (08/11, Đạt) – adding `NOVEL` → "Category already exists" |
| TC-F2-15 | US-08/AC-04 | E | Category *Poetry* used by 2 visible books | Remove *Poetry* | "Category is in use by 2 books"; category kept. A category used only by hidden books **can** be removed (hidden books keep their record) | INT | Pass | Pass (08/11, Đạt) – Remove → "Category is in use by 8 books", category kept [`evidence/hosted-admin-0811/08`] |
| TC-F2-16 | US-08/AC-05 | B | Admin on `/admin/categories` | Names of 1, 50, 0 (or spaces only) and 51 characters | 1 and 50 accepted; 0 and 51 rejected with a field error (client and server) | UNIT + INT | Pass | Pass with observation (08/11, Đạt) – 1 and 50 characters accepted; a 51st character cannot be typed because the input stops at 50 (`maxLength`), so no field error is shown and the saved name has 50 characters [`evidence/hosted-admin-0811/09`]. Server rejection of 51: automated test. 0 characters: not run |
| TC-F2-17 | US-09/AC-01 | M | Admin on `/admin/authors` | Add *Nam Cao* with empty bio | "Author “Nam Cao” added"; bio stored empty; selectable in the book form list | INT | Pass | Pass (08/11, Đạt) – "Author “Tuấn Đạt” added" with empty bio [`evidence/hosted-admin-0811/10`] |
| TC-F2-18 | US-09/AC-02 | M | Author *To Hoai* linked to book *De Men* | Edit name to *Tô Hoài* → Save | *De Men* shows *Tô Hoài* on `/books` | INT | Pass | Pass (08/11, Đạt) – "Saved “Minh Chính”" [`evidence/hosted-admin-0811/11`] |
| TC-F2-19 | US-09/AC-03 | E | Author linked to 1 visible book | Remove the author | "Author is in use by 1 book"; author kept. Unused author is removed; removing it again → "Author not found" | INT | Pass | Partly run (08/11, Đạt) – an author with 0 books was removed (Pass); removing an author used by a visible book: not run – TBD |
| TC-F2-20 | US-09/AC-04 | B | Admin on `/admin/authors` | Names of 100 and 101 characters | 100 accepted; 101 rejected (client and server) | UNIT + INT | Pass | Pass with observation (08/11, Đạt) – 100 characters accepted; the 101st character cannot be typed (`maxLength` 100), no field error shown [`evidence/hosted-admin-0811/12`]. Server rejection of 101: automated test |
| TC-F2-21 | NFR-02/AC-01 | M | Empty database | Run `npm run db:seed` (also runs on every Vercel deploy) | "Seed done: 30 of 30 sample books added"; 30 visible books in 6 categories, each with cover, price > 0, stock ≥ 0 | INT | Pass | Pass (05/11 23:55, Chính, public pages) – `/books` shows "30 titles · page 1 of 3", every card has a cover, price in VND |
| TC-F2-22 | NFR-02/AC-02 | B | Seed already run | Run the seed again | "Seed done: 0 of 30 …"; still 30 books, 6 categories | INT | Pass | Pass (05/11 23:55, Chính, public pages) – still 30 titles after several deploys on 05/11 (seed runs in every `vercel-build`) |

## F3 – Book grid

| TC | AC | Type | Given | When (steps) | Then (expected) | Automated | Actual – local automated (04/11) | Actual – hosted, manual |
|---|---|---|---|---|---|---|---|---|
| TC-F3-01 | US-10/AC-01 | M | ≥ 13 visible books (seed: 30) | Open `/books` | 12 cards (cover, title, author, price in VND), newest first (*A Tale of Two Cities* first after the seed), pagination Previous · 1 2 3 · Next | INT + RESP | Pass – 25-book set: page 1 = Book 25…Book 14; seeded set: first = *A Tale of Two Cities*, 3 pages | Pass (05/11 23:55, Chính, public pages) – 12 cards, *A Tale of Two Cities* first, "Previous 1 2 3 Next"; median load 0.24 s |
| TC-F3-02 | US-10/AC-02 | B | (a) exactly 12 visible books; (b) 25 visible books | Open `/books`; then `/books?page=3` | (a) one page, no pagination/Next link; (b) page 3 shows 1 book | UNIT + INT | Pass | Pass – (b) variant on host (05/11 23:55, Chính, public pages): 30 books → page 3 shows 6 cards and no Next link; (a) 12-book case covered by INT only |
| TC-F3-03 | US-10/AC-03 | E | 30 visible books (3 pages) | Open `?page=0`, `?page=-2`, `?page=abc`, `?page=999` | Pages 1, 1, 1 and 3 shown; no error | UNIT + INT | Pass | Pass (05/11 23:55, Chính, public pages) – `?page=0`, `-2`, `abc` → page 1; `?page=999` → page 3; no error |
| TC-F3-04 | US-10/AC-04 | E | No visible book (only hidden ones) | Open `/books` | "No books available yet"; no pagination | INT | Pass | Not run on host (would need every book hidden) – INT Pass |
| TC-F3-05 | NFR-04/AC-01 | M | Widths 360, 768, 1280 px | Open `/books`, `/admin/categories`, `/admin/authors` (detail page: S3) | No horizontal scrolling; grid 2 / 3 / 4 columns; admin tables become cards on phones | RESP | Pass – scroll width = viewport at all 3 widths; columns 2/3/4 | Pass for `/books` (05/11 23:55, Chính, public pages): 360 px → 2 columns, 768 px → 3, 1280 px → 4; scroll width ≤ viewport. Admin pages need a login → TBD |
| TC-F3-06 | NFR-04/AC-02 | B | Touch device (phone emulation, 360 px) | Measure buttons, pagination links and nav links | Every tap target ≥ 44 × 44 px | RESP | Pass – no target under 44 px at 360 px with touch | Pass (05/11 23:55, Chính, public pages) – 360 px touch emulation: no button, pagination or nav link under 44 × 44 px |

## CR-06 – Store Staff role (US-24, S2-T20)

Precondition for the hosted run: one Store Staff account (create it on `/admin/accounts` with role *Store Staff*, or change a test Customer to Staff). Use test accounts only.

| TC | AC | Type | Given | When (steps) | Then (expected) | Automated | Actual – local automated (05/11) | Actual – hosted, manual |
|---|---|---|---|---|---|---|---|---|
| TC-CR-01 | US-24/AC-01 | M | Signed in as Staff | `/admin/books` → Add book → valid title, author, category, price 0.01, stock 0, JPG cover → Save | Book saved; first row in the book list and first card on `/books` | INT + E2E | Pass (INT) – Staff-role user adds and edits a book; E2E not run | TBD |
| TC-CR-02 | US-24/AC-02 | E | Signed in as Staff; at least 1 visible book | Open `/admin/books`; then send the Delete server action directly (DevTools → copy the Admin request, replay with the Staff cookie) | No Delete button; direct request → 403, book still visible | UNIT (matrix) + E2E | Pass (UNIT) – `hideBook` is Admin-only in `lib/permissions.js`; E2E (no button) not run; direct POST: manual only | TBD |
| TC-CR-03 | US-24/AC-03 | E | Signed in as Staff | Look at the back-office menu and footer; open `/admin/accounts` | No Accounts link; HTTP 403 "Access denied" | UNIT (matrix) + E2E | Pass (UNIT); E2E not run | TBD |
| TC-CR-04 | US-24/AC-04 | M | Admin; Customer C signed in in another browser | Admin changes C's role to *Store Staff* (confirm) → C reloads → C logs in again | C's open session ends (sent to Login); after login C sees "Back office · Store Staff" with Books, Categories, Authors only. Admin cannot change own role; same role again → "No change" | INT + E2E | Pass (INT) – all sessions of C deleted; next login role = staff; own role/invalid role/unknown id refused; same role keeps sessions; Staff → Customer removes rights. Also: old two-role CHECK is replaced by the migration (C1). E2E not run | TBD |
| TC-CR-05 | US-24/AC-05 | M | Signed in as Staff | Add category *Staff test*, rename it; add author, edit it; look for Remove; send the Remove action directly | Add/rename/edit saved; no Remove button; direct Remove → 403 | INT + UNIT (matrix) | Pass (INT add/edit, UNIT matrix); Remove button and direct 403: host run | TBD |

## F1 regression after CR-06 (S2-T20)

Re-run of the Sprint 1 test cases (`pm/sprints/S1/test-cases-F1.md`) on the Sprint 2 code. "Automated" = covered by `npm test` on 05/11 (68/68 pass); the rest needs the browser or the host.

| TC | AC | Automated (05/11) | Actual – hosted, manual |
|---|---|---|---|
| TC-F1-01 | US-01/AC-01 | Pass (INT) | TBD |
| TC-F1-02 | US-01/AC-02 | Pass (INT) | TBD |
| TC-F1-03 | US-01/AC-03 | Pass (UNIT, server side) | TBD |
| TC-F1-04 | US-01/AC-04 | Pass (UNIT) | TBD |
| TC-F1-05 | US-02/AC-01 | Pass (INT) | TBD |
| TC-F1-06 | US-02/AC-02 | Pass (INT) | TBD |
| TC-F1-07 | US-02/AC-03 | Pass (INT) | TBD |
| TC-F1-08 | US-02/AC-04 | E2E only – not run | TBD |
| TC-F1-09 | US-02/AC-05 | Pass (UNIT + INT) | TBD |
| TC-F1-10 | US-03/AC-01 | Pass (INT; UNIT updated for 3 roles, see note) | TBD (check the role list shows Administrator, Store Staff, Customer) |
| TC-F1-11 | US-03/AC-02 | Pass (INT) | TBD |
| TC-F1-12 | US-03/AC-03 | Pass (INT) | TBD |
| TC-F1-13 | US-03/AC-04 | Pass (INT) | TBD |
| TC-F1-14 | US-03/AC-05 | Pass (INT) | TBD |
| TC-F1-15 | US-04/AC-01 | E2E only – not run | Pass (05/11 23:55, Chính, public pages) – `/admin`, `/admin/books`, `/admin/books/new`, `/admin/categories`, `/admin/authors`, `/admin/accounts` without a session → `/login?next=…` with the exact path |
| TC-F1-16 | US-04/AC-02 | E2E only – not run (Customer must still get 403 on every `/admin` URL now that Staff is allowed in) | TBD |
| TC-F1-17 | US-04/AC-03 | E2E only – not run | TBD |
| TC-F1-18 | US-04/AC-04 | E2E only – not run | TBD |
| TC-F1-19 | NFR-01/AC-01 | Pass (INT, `$2…$10$`) | Pass (06/11, Đạt) – Supabase `users.password_hash` holds bcrypt hashes `$2a$10$…` for every account, incl. the Staff account; evidence `pm/sprints/S1/evidence/hosted/TC-F1-19_password-hash-supabase.png` |
| TC-F1-20 | NFR-01/AC-02 | Pass (INT) | TBD |
| TC-F1-21 | NFR-01/AC-03 | Pass (UNIT) | TBD |
| TC-F1-22 | NFR-03/AC-01 | Host only | Pass (05/11 23:55, Chính, public pages) – home page over HTTPS |
| TC-F1-23 | NFR-03/AC-02 | Host only | TBD |
| TC-F1-24 | NFR-03/AC-03 | Host only (17/11) | TBD |

**Note TC-F1-10:** the AC text of US-03/AC-01 still says "role (Administrator or Customer)". Since CR-06 the role list also has *Store Staff*. The PO should decide whether to update the AC text in the Product Backlog (not changed here).

## Summary (04/11/2026)
| Metric | Value |
|---|---|
| ACs in scope (F2 + F3) | 28 |
| Test cases written (coverage) | 28 / 28 = **100 %** |
| Local automated: Pass / Blocked | 18 Pass (TC-F2-09 grid part only) · 10 Blocked (US-05, US-06, US-07 not built yet; US-07/AC-03 needs the S3 detail page) |
| Hosted manual run | 0 / 28 run (S2-T23, after merge) |
| Defects found | 0 |
| F1 regression (automated) | 16 / 16 pass |

## Summary update (05/11/2026)
| Metric | Value |
|---|---|
| ACs in scope (F2 + F3 + US-24) | 28 + 5 = 33 |
| Test cases written (coverage) | 33 / 33 = **100 %** (+ 24 F1 regression) |
| Local automated: Pass / Not run / Blocked | F2/F3: 26 Pass (incl. TC-F2-09 now full) · 1 Not run (TC-F2-10, e2e) · 1 Blocked (TC-F2-11, S3 detail page); CR-06: 5 Pass on data layer / permission matrix, browser parts not run |
| Hosted manual run | TBD (S2-T23) |
| Defects found | 0 (one outdated F1 unit test updated for CR-06; not a product defect) |
| F1 regression (automated) | 16 / 16 automated F1 tests pass (16 of 24 TCs covered); 5 e2e-only and 3 host-only TCs TBD |

## Summary at the Sprint end (05/11/2026 23:59)
| Metric | Value |
|---|---|
| ACs in scope (F2 + F3 + US-24) | 33; test cases 33 / 33 = **100 %** (+ 24 F1 regression) |
| Local automated (`npm test` on `develop`, re-run 05/11 23:50) | **71 / 71 pass** (+3 cover tests after DEF-F2-01/02) |
| Hosted run – public pages (23:55) | TC-F2-21, 22, TC-F3-01, 02, 03, 05 (`/books`), 06 → **7 Pass, 0 Fail**; TC-F1-15 and TC-F1-22 regression Pass |
| Hosted run – admin pages (US-05…09, US-24, admin part of NFR-04) | **Not run** – needs an Admin and a Staff login; carried to Review 2 / S3 regression |
| PO acceptance (05/11 23:59, Nguyễn Minh Chính) | **US-10 and NFR-02 Done (5 SP)**; US-05…09, NFR-04, US-24 stay In Review until their hosted admin cases pass |
| PO acceptance (06/11, Nguyễn Minh Chính) | F1 item **NFR-01 Done (2 SP)** after TC-F1-19 passed on the hosted DB |
| Defects | 2 found (DEF-F2-01 Medium, DEF-F2-02 Low), both fixed and deployed 05/11 |

## Defects (05/11/2026)
| ID | Found | TC / AC | Severity | Description | Cause | Fix | Status |
|---|---|---|---|---|---|---|---|
| DEF-F2-01 | Đạt, hosted site, 05/11 23:10 (screenshot) | TC-F3-01 / US-10/AC-01 | Medium | Vietnamese titles on seed covers render with detached accents ("Dê´ Mèn", "Tă´t đèn") | Cover SVGs are shown through `<img>` (no web font) and the title font Georgia has no Vietnamese glyphs; text itself is correct NFC | `db/make-covers.js`: Vietnamese-capable font stacks; covers regenerated; `tests/covers.test.js` | Fixed in branch – hosted re-test TBD |
| DEF-F2-02 | Đạt, hosted site, 05/11 23:10 (screenshot) | TC-F3-01, TC-F3-05 / US-10/AC-01, NFR-04/AC-01 | Low | Long author names run out of the cover frame ("HANS CHRISTIAN ANDERSE…", "FRANCES HODGSON BURNE…") | Author line never wrapped; ≈ 200 px text in a 152 px area | Author wraps to 2 lines; any line still too long is squeezed with `textLength`; test checks all 30 covers | Fixed in branch – hosted re-test TBD |
