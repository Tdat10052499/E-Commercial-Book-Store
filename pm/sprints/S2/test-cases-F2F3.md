# Sprint 2 – Test Cases F2, F3

Format: GWT → steps → expected → actual [03 §6.1-7, §6.2-2]. **One test case per AC** (28 ACs → 28 test cases); boundary ACs test both sides of each limit in the same case. AC text: `pm/backlog/product-backlog.md` v1.2.

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 04/11/2026 | Nguyễn Minh Chính (AI-assisted) | Test cases for F2 (US-05…US-09, NFR-02) and F3 (US-10, NFR-04) from the ACs; automated results from a real local run of PR #8. CR-06 test cases (US-24) are S2-T20 (Đạt) and are added by Đạt |

**Automated run** (04/11/2026, PostgreSQL 16, branch `feat/P15-catalogue`, PR #8): `npm test` → **43/43 pass** – 8 UNIT (`tests/catalog-validation.test.js`), 19 INT (`tests/catalog.test.js`), plus 16 F1 regression (`tests/validation.test.js`, `tests/users.test.js`). RESP = component render of the grid and admin tables in Chromium at 360/768/1280 px (horizontal scroll width and grid columns measured).
**Hosted manual run** (S2-T23, Đạt): after PR #8 is merged and deployed to https://pagetunnel.vercel.app/. Write Pass/Fail, date and tester in the last column. Items not implemented at the time of the run are marked *Blocked* and returned to the Product Backlog if still open at the Sprint end.

## F2 – Book, category and author management

| TC | AC | Type | Given | When (steps) | Then (expected) | Automated | Actual – local automated (04/11) | Actual – hosted, manual |
|---|---|---|---|---|---|---|---|---|
| TC-F2-01 | US-05/AC-01 | M | Admin on Add Book; category *Novel* and author *Jane Austen* exist | Enter title, author, category, price 129000, description, JPG cover 500 KB, stock 5 → Save | Book saved; first card on `/books` page 1 | – | Blocked – US-05 not built (S2-T10) | TBD |
| TC-F2-02 | US-05/AC-02 | E | Admin on Add Book | Price `0`, then `-5`, then `abc` → Save (also POST without client checks) | "Price must be greater than 0"; nothing saved (client and server) | – | Blocked – S2-T10 | TBD |
| TC-F2-03 | US-05/AC-03 | E | Admin on Add Book | Leave title, author, category empty → Save | Field-level errors; nothing saved | – | Blocked – S2-T10 | TBD |
| TC-F2-04 | US-05/AC-04 | B | Admin on Add Book | (a) price 0.01, stock 0, cover exactly 2 MB → accepted; (b) cover 2 MB + 1 byte → rejected; (c) `.pdf` renamed `.jpg` → rejected | (a) saved; (b), (c) error, nothing saved | – | Blocked – S2-T10 (DB check `price > 0`, `stock >= 0`, `cover_mime` JPG/PNG already in schema) | TBD |
| TC-F2-05 | US-06/AC-01 | M | Existing book | Edit price and title with valid values → Save | New values on `/books` and detail page | – | Blocked – S2-T11 | TBD |
| TC-F2-06 | US-06/AC-02 | E | Existing book | Change price to `0` → Save | Edit refused; old values remain | – | Blocked – S2-T11 | TBD |
| TC-F2-07 | US-06/AC-03 | E | Book id 99999 does not exist; book X is hidden | Open `/admin/books/99999/edit`, then X's edit URL | "Book not found" both times | – | Blocked – S2-T11 | TBD |
| TC-F2-08 | US-06/AC-04 | B | Existing book | Open edit, change nothing → Save | Book unchanged; confirmation shown | – | Blocked – S2-T11 | TBD |
| TC-F2-09 | US-07/AC-01 | M | Visible book X | Click Delete → confirm | X disappears from `/books` (and later detail/search); DB row kept with `is_deleted = true` | INT (hidden books excluded from grid) | Pass – grid part: hidden book not listed (`catalog.test.js` "25 books…hidden books excluded"); Delete button not built (S2-T12) | TBD |
| TC-F2-10 | US-07/AC-02 | E | Visible book X | Click Delete → Cancel | Nothing changes | – | Blocked – S2-T12 | TBD |
| TC-F2-11 | US-07/AC-03 | B | Book X hidden | Customer opens X's old detail URL | Friendly "Book not found" page | – | Blocked – detail page is US-11 (S3) | TBD |
| TC-F2-12 | US-08/AC-01 | M | Admin on `/admin/categories` | Add `  Novel ` → Add category | "Category “Novel” added"; listed (trimmed); offered in the book form list | INT | Pass | TBD |
| TC-F2-13 | US-08/AC-02 | M | Category *Sci* used by book *Cosmos* | Rename to *Science* | *Cosmos* shows category *Science* | INT | Pass | TBD |
| TC-F2-14 | US-08/AC-03 | E | Category *Novel* exists | Add `NOVEL`; rename another category to `novel` | "Category already exists"; nothing changed | INT | Pass | TBD |
| TC-F2-15 | US-08/AC-04 | E | Category *Poetry* used by 2 visible books | Remove *Poetry* | "Category is in use by 2 books"; category kept. A category used only by hidden books **can** be removed (hidden books keep their record) | INT | Pass | TBD |
| TC-F2-16 | US-08/AC-05 | B | Admin on `/admin/categories` | Names of 1, 50, 0 (or spaces only) and 51 characters | 1 and 50 accepted; 0 and 51 rejected with a field error (client and server) | UNIT + INT | Pass | TBD |
| TC-F2-17 | US-09/AC-01 | M | Admin on `/admin/authors` | Add *Nam Cao* with empty bio | "Author “Nam Cao” added"; bio stored empty; selectable in the book form list | INT | Pass | TBD |
| TC-F2-18 | US-09/AC-02 | M | Author *To Hoai* linked to book *De Men* | Edit name to *Tô Hoài* → Save | *De Men* shows *Tô Hoài* on `/books` | INT | Pass | TBD |
| TC-F2-19 | US-09/AC-03 | E | Author linked to 1 visible book | Remove the author | "Author is in use by 1 book"; author kept. Unused author is removed; removing it again → "Author not found" | INT | Pass | TBD |
| TC-F2-20 | US-09/AC-04 | B | Admin on `/admin/authors` | Names of 100 and 101 characters | 100 accepted; 101 rejected (client and server) | UNIT + INT | Pass | TBD |
| TC-F2-21 | NFR-02/AC-01 | M | Empty database | Run `npm run db:seed` (also runs on every Vercel deploy) | "Seed done: 30 of 30 sample books added"; 30 visible books in 6 categories, each with cover, price > 0, stock ≥ 0 | INT | Pass | TBD (count on `/books`: "30 titles") |
| TC-F2-22 | NFR-02/AC-02 | B | Seed already run | Run the seed again | "Seed done: 0 of 30 …"; still 30 books, 6 categories | INT | Pass | TBD |

## F3 – Book grid

| TC | AC | Type | Given | When (steps) | Then (expected) | Automated | Actual – local automated (04/11) | Actual – hosted, manual |
|---|---|---|---|---|---|---|---|---|
| TC-F3-01 | US-10/AC-01 | M | ≥ 13 visible books (seed: 30) | Open `/books` | 12 cards (cover, title, author, price in VND), newest first (*A Tale of Two Cities* first after the seed), pagination Previous · 1 2 3 · Next | INT + RESP | Pass – 25-book set: page 1 = Book 25…Book 14; seeded set: first = *A Tale of Two Cities*, 3 pages | TBD |
| TC-F3-02 | US-10/AC-02 | B | (a) exactly 12 visible books; (b) 25 visible books | Open `/books`; then `/books?page=3` | (a) one page, no pagination/Next link; (b) page 3 shows 1 book | UNIT + INT | Pass | TBD |
| TC-F3-03 | US-10/AC-03 | E | 30 visible books (3 pages) | Open `?page=0`, `?page=-2`, `?page=abc`, `?page=999` | Pages 1, 1, 1 and 3 shown; no error | UNIT + INT | Pass | TBD |
| TC-F3-04 | US-10/AC-04 | E | No visible book (only hidden ones) | Open `/books` | "No books available yet"; no pagination | INT | Pass | TBD |
| TC-F3-05 | NFR-04/AC-01 | M | Widths 360, 768, 1280 px | Open `/books`, `/admin/categories`, `/admin/authors` (detail page: S3) | No horizontal scrolling; grid 2 / 3 / 4 columns; admin tables become cards on phones | RESP | Pass – scroll width = viewport at all 3 widths; columns 2/3/4 | TBD (Chrome + 1 other browser, SD-4) |
| TC-F3-06 | NFR-04/AC-02 | B | Touch device (phone emulation, 360 px) | Measure buttons, pagination links and nav links | Every tap target ≥ 44 × 44 px | RESP | Pass – no target under 44 px at 360 px with touch | TBD |

## Summary (04/11/2026)
| Metric | Value |
|---|---|
| ACs in scope (F2 + F3) | 28 |
| Test cases written (coverage) | 28 / 28 = **100 %** |
| Local automated: Pass / Blocked | 18 Pass (TC-F2-09 grid part only) · 10 Blocked (US-05, US-06, US-07 not built yet; US-07/AC-03 needs the S3 detail page) |
| Hosted manual run | 0 / 28 run (S2-T23, after merge) |
| Defects found | 0 |
| F1 regression (automated) | 16 / 16 pass |
