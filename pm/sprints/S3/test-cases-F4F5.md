# Sprint 3 – Test Cases F4, F5, NFR-05 and US-25 (CR-06)

Format: GWT → steps → expected → actual [03 §6.1-7, §6.2-2]. **One test case per AC** (16 ACs → 16 test cases); boundary ACs test both sides of each limit in the same case. AC text: `pm/backlog/product-backlog.md`. Test data: the 30 seed books (`app/db/seed-data.js`), so every expected result can be checked by count and title.

Written before the code (S3-T04), so the developers can build against them. The *Actual* columns are filled when the item is built (local automated run, by the developer) and on the hosted run (S3-T14, Chính; NFR-05: S3-T15, Chính).

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 1.1 | 10/11/2026 | Nguyễn Minh Chính | TC-F4-03 hosted Pass after release PR #35 |
| 1.0 | 08/11/2026 | Nguyễn Minh Chính | Test cases for US-11, US-12, US-13, NFR-05, US-25 from the ACs, with expected results from the seed data; planned test level per case; regression list for S3 |

## Seed data used
| Data | Values (from `seed-data.js`) |
|---|---|
| Category *Novel*, price 50,000–150,000 VND | Pride and Prejudice 129,000 · Jane Eyre 145,000 · Emma 119,000 · A Tale of Two Cities 139,000 → **4 books** (Great Expectations 152,000, Anna Karenina 210,000, Les Misérables 235,000, The Count of Monte Cristo 198,000 are outside) |
| Author *Jane Austen* | Pride and Prejudice, Emma |
| Author *Charles Darwin* | On the Origin of Species, The Voyage of the Beagle |
| Book with stock 0 | A Tale of Two Cities |
| Cheapest / most expensive | As a Man Thinketh 49,000 · The Decline and Fall of the Roman Empire 260,000 |

## F4 – Book detail (US-11)

| TC | AC | Type | Given | When (steps) | Then (expected) | Level (planned) | Actual – local automated | Actual – hosted, manual |
|---|---|---|---|---|---|---|---|---|
| TC-F4-01 | US-11/AC-01 | M | Customer on `/books?page=2` | Click the first card on page 2 | Detail page of that book shows cover, title, author, category, price (VND), description and stock; also check *A Tale of Two Cities* shows stock **0** | INT (data) + E2E | Not run – built in S3-T06 | Pass (12/11 17:2x, Đạt with Claude in Chrome (Đạt watching)) – first card on page 2 (Andersen’s Fairy Tales): cover, title, author, category, price in ₫, description, stock shown; A Tale of Two Cities shows stock "Out of stock" (0) |
| TC-F4-02 | US-11/AC-02 | M | Customer on `/books?page=2&q=e&min=50000&max=250000` (search + filter: 22 books, 2 pages) | Open a book → click **Back to list** | Returns to `/books` page 2 with the same `q`, `min` and `max` in the URL, the search box and the filter still filled | E2E | Not run – built in S3-T08 | Pass (12/11 17:2x, Đạt with Claude in Chrome (Đạt watching)) – opened a book from page 2 of q=e, 50,000–250,000: Back to list goes to /books page 2 with the same q, min, max |
| TC-F4-03 | US-11/AC-03 | E | Book id 99999 does not exist; a hidden book X; id `abc` | Open `/books/99999`, `/books/<X>`, `/books/abc`, `/books/-1` | Each time: "Sorry, this book is not available" + link to the catalogue; HTTP **404**; no stack trace or SQL text | INT (data) + HTTP check | Not run – built in S3-T06 | Pass (10/11 00:11, Chính, after release PR #35) – `/books/99999`, `/books/abc`, `/books/31`, `/books/34` and the hidden test book `/books/33` → HTTP 404 "Sorry, this book is not available" + Browse the catalogue; no technical details · **Re-run by Đạt (runner ≠ writer): Pass (12/11 17:2x, Đạt with Claude in Chrome (Đạt watching))** – /books/99999, /books/abc, /books/-1, hidden /books/33 → HTTP 404 "Sorry, this book is not available" + Browse the catalogue; no stack trace or SQL |
| TC-F4-04 | US-11/AC-04 | B | No previous list (URL typed or opened in a new tab) | Open `/books/<id>` directly → click **Back to list** | Goes to `/books` page 1, no search or filter | E2E | Not run – built in S3-T08 | Pass (12/11 17:2x, Đạt with Claude in Chrome (Đạt watching)) – /books/<id> opened directly: Back to list goes to /books with no page, search or filter |

## F5 – Search and filter (US-12, US-13)

| TC | AC | Type | Given | When (steps) | Then (expected) | Level (planned) | Actual – local automated | Actual – hosted, manual |
|---|---|---|---|---|---|---|---|---|
| TC-F5-01 | US-12/AC-01 | M | 30 seed books | Search `AUSTEN`, then `darwin`, then `expect` | `AUSTEN` → Pride and Prejudice, Emma (author match, upper case); `darwin` → 2 Darwin books; `expect` → Great Expectations (partial title). Newest first, ≤ 12 per page | INT | Not run – built in S3-T09 | Pass (12/11 17:2x, Đạt with Claude in Chrome (Đạt watching)) – AUSTEN: Emma, Pride and Prejudice · darwin: The Voyage of the Beagle, On the Origin of Species · expect: Great Expectations |
| TC-F5-02 | US-12/AC-02 | E | 30 seed books | Search `zzqx` | "No books match your search" + a **Clear filters** link; the link returns to all 30 books | INT + E2E | Not run – built in S3-T09/T10 | Pass (12/11 17:2x, Đạt with Claude in Chrome (Đạt watching)) – zzqx: "No books match your search" + Clear filters; the link goes to /books with no parameters → 30 titles · page 1 of 3 |
| TC-F5-03 | US-12/AC-03 | B | 30 seed books | (a) empty keyword; (b) three spaces; (c) a keyword of exactly 100 characters; (d) 101 characters; (e) `%`; (f) `'`; (g) `_` | (a), (b) all 30 books (30 titles, page 1 of 3); (c) search runs, no error (no match message); (d) cut to 100 characters or refused with a message – no error page; (e), (f), (g) treated as text: no match message, no SQL error, no "all books" | UNIT + INT | Not run – built in S3-T09 | Pass (12/11 17:2x, Đạt with Claude in Chrome (Đạt watching)) – (a), (b) 30 titles · page 1 of 3; (c) 100 and (d) 101 characters: no-match message, HTTP 200, no error; (e) %, (f) ', (g) _: no-match message, HTTP 200, no SQL error |
| TC-F5-04 | US-13/AC-01 | M | 30 seed books | Category **Novel**, price **50,000 – 150,000** → Apply | Exactly 4 books: Pride and Prejudice, Jane Eyre, Emma, A Tale of Two Cities; Great Expectations (152,000) not shown | INT | Not run – built in S3-T11 | Pass with data note (12/11 17:2x, Đạt with Claude in Chrome (Đạt watching)) – Novel + 50,000–150,000 → 3 books: A Tale of Two Cities 139,000, Jane Eyre 145,000, Pride and Prejudice 129,000. Emma is 167,000 ₫ on the host (edited during earlier hosted tests; seed 119,000), so it is correctly outside the range; all 8 Novel books checked · After TC-CR-06 (18:01) Emma is back at 119,000, so the seed expectation of 4 books holds again |
| TC-F5-05 | US-13/AC-02 | M | 30 seed books | Search `e`, price 50,000 – 250,000 (22 books → 2 pages) → page 2 | Page 2 URL keeps `q`, `min`, `max`; the search box and price fields stay filled; page 2 shows the remaining 10 books of the same result set; "page 2 of 2" | INT + E2E | Not run – built in S3-T10/T11 | Pass (12/11 17:2x, Đạt with Claude in Chrome (Đạt watching)) – q=e, 50,000–250,000: 22 results · page 2 of 2, 10 cards; search and price fields keep e / 50000 / 250000; Previous and 1 links keep q, min, max |
| TC-F5-06 | US-13/AC-03 | E | 30 seed books | Min **200,000**, max **100,000** → Apply (also by typing the URL `?min=200000&max=100000`) | "Minimum price must not exceed maximum price"; filter not applied (the list stays as before / all books); same result when the URL is typed (server check) | UNIT + INT | Not run – built in S3-T10/T11 | Pass (12/11 17:2x, Đạt with Claude in Chrome (Đạt watching)) – URL typed with min 200,000 max 100,000: "Minimum price must not exceed maximum price", filter not applied (30 results · page 1 of 3) |
| TC-F5-07 | US-13/AC-04 | B | 30 seed books | (a) min = max = **129,000**; (b) min **49,000** max **49,000**; (c) min **260,000**, no max | (a) Pride and Prejudice only; (b) As a Man Thinketh only; (c) The Decline and Fall of the Roman Empire only – bounds are inclusive | INT | Not run – built in S3-T11 | Pass (12/11 17:2x, Đạt with Claude in Chrome (Đạt watching)) – (a) 129,000–129,000: Pride and Prejudice only; (b) 49,000–49,000: As a Man Thinketh only; (c) min 260,000: The Decline and Fall of the Roman Empire only |

## NFR-05 – Performance

| TC | AC | Type | Given | When (steps) | Then (expected) | Level (planned) | Actual – hosted, manual (median of 3) |
|---|---|---|---|---|---|---|---|
| TC-NFR05-01 | NFR-05/AC-01 | M | Hosted site warm (open it once first), 30 books | DevTools → Network, *Disable cache* off → load `/books` 3 times; record *Load* time of each run | Median < 2 s | Manual | Pass (12/11 17:2x, Đạt with Claude in Chrome (Đạt watching)) – warm site, 3 loads of /books: 596 / 498 / 462 ms (Navigation Timing loadEventEnd) → median **0.50 s** < 2 s |
| TC-NFR05-02 | NFR-05/AC-02 | B | Same | Load `/books?page=3&q=n&min=50000&max=250000` 3 times (25 books → page 3 exists) | Median < 2 s | Manual | Pass (12/11 17:2x, Đạt with Claude in Chrome (Đạt watching)) – 3 loads of page 3 with q=n, 50,000–250,000 (25 results · page 3 of 3): 381 / 386 / 359 ms → median **0.38 s** < 2 s |

## US-25 – "Last updated by" audit (CR-06)

| TC | AC | Type | Given | When (steps) | Then (expected) | Level (planned) | Actual – local automated | Actual – hosted, manual |
|---|---|---|---|---|---|---|---|---|
| TC-CR-06 | US-25/AC-01 | M | Staff account *staff1* (name "Staff One") | Edit the price of *Emma* → Save → open the book's admin page | "Last updated by Staff One at dd/mm/yyyy HH:mm" (GMT+7, time of the save) | INT | Not run – built in S3-T07 | Pass (12/11 ~18:01–18:10, Đạt (screens taken by Đạt)) – Store Staff account "Staff" (staff01) edited the price of Emma to 119,000 → "Changes saved"; the Admin view of Emma shows "Last updated by Staff at 12/11/2026 18:01" (GMT+7, time of the save). Note: the hosted Staff account is named "Staff", not "Staff One". The save also brings Emma back to its seed price (test-data clean-up asked by the PO 11/11) |
| TC-CR-07 | US-25/AC-02 | B | A seed book never edited (e.g. *Meditations*) | Open its admin page | "Last updated by System at <seed time>" | INT | Not run – built in S3-T05/T07 | Pass (12/11 ~18:01–18:10, Đạt (screens taken by Đạt)) – Meditations (seed, never edited): "Last updated by System at 27/10/2026 09:00" |
| TC-CR-08 | US-25/AC-03 | E | *Emma* last edited by "Staff One" | Admin renames the account to "Staff Two" and then locks it → open *Emma*'s admin page | Still "Last updated by Staff One at …" (name stored at update time) | INT | Not run – built in S3-T07 | Partial (12/11 ~18:01–18:10, Đạt (screens taken by Đạt)) – **lock step Pass**: Admin locked "Staff" (status LOCKED) → Emma still shows "Last updated by Staff at 12/11/2026 18:01". **Rename step not executable**: Release 1.0 has no screen to rename an account (US-03 covers create, role, lock) → covered only by the automated test `audit.test.js` ("renaming and then locking the editor keeps the stored name", Pass). Test case to be reworded by its writer (Chính). Staff account to be unlocked again for UAT: TBD |

## Regression to run in S3 (S3-T14 hosted, S3-T16 automated)
| What | Why |
|---|---|
| TC-F2-11 (US-07/AC-03): open a hidden book's detail URL | Was *Blocked* in S2 – needs the S3 detail page; expected = TC-F4-03 message |
| TC-F3-01…05 (grid, paging, responsive) | `/books` changes for search and filter |
| TC-F2-05 (US-06/AC-01): edited values on the detail page | The S2 case could only check the list; now also the detail page |
| Full automated suite (`npm test`) | Every PR before merge |

## Summary (08/11/2026)
| Metric | Value |
|---|---|
| ACs in scope (US-11, US-12, US-13, NFR-05, US-25) | 4 + 3 + 4 + 2 + 3 = **16** |
| Test cases written (coverage) | 16 / 16 = **100 %** |
| Local automated | 0 run – features not built yet |
| Hosted manual | 0 run – S3-T14, S3-T15 |
| Defects | 0 |
