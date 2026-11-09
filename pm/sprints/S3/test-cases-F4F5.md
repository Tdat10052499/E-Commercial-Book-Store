# Sprint 3 – Test Cases F4, F5, NFR-05 and US-25 (CR-06)

Format: GWT → steps → expected → actual [03 §6.1-7, §6.2-2]. **One test case per AC** (16 ACs → 16 test cases); boundary ACs test both sides of each limit in the same case. AC text: `pm/backlog/product-backlog.md`. Test data: the 30 seed books (`app/db/seed-data.js`), so every expected result can be checked by count and title.

Written before the code (S3-T04), so the developers can build against them. The *Actual* columns are filled when the item is built (local automated run, by the developer) and on the hosted run (S3-T14, Chính; NFR-05: S3-T15, Chính).

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
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
| TC-F4-01 | US-11/AC-01 | M | Customer on `/books?page=2` | Click the first card on page 2 | Detail page of that book shows cover, title, author, category, price (VND), description and stock; also check *A Tale of Two Cities* shows stock **0** | INT (data) + E2E | Not run – built in S3-T06 | TBD (S3-T14) |
| TC-F4-02 | US-11/AC-02 | M | Customer on `/books?page=2&q=e&min=50000&max=250000` (search + filter: 22 books, 2 pages) | Open a book → click **Back to list** | Returns to `/books` page 2 with the same `q`, `min` and `max` in the URL, the search box and the filter still filled | E2E | Not run – built in S3-T08 | TBD (S3-T14) |
| TC-F4-03 | US-11/AC-03 | E | Book id 99999 does not exist; a hidden book X; id `abc` | Open `/books/99999`, `/books/<X>`, `/books/abc`, `/books/-1` | Each time: "Sorry, this book is not available" + link to the catalogue; HTTP **404**; no stack trace or SQL text | INT (data) + HTTP check | Not run – built in S3-T06 | TBD (S3-T14) |
| TC-F4-04 | US-11/AC-04 | B | No previous list (URL typed or opened in a new tab) | Open `/books/<id>` directly → click **Back to list** | Goes to `/books` page 1, no search or filter | E2E | Not run – built in S3-T08 | TBD (S3-T14) |

## F5 – Search and filter (US-12, US-13)

| TC | AC | Type | Given | When (steps) | Then (expected) | Level (planned) | Actual – local automated | Actual – hosted, manual |
|---|---|---|---|---|---|---|---|---|
| TC-F5-01 | US-12/AC-01 | M | 30 seed books | Search `AUSTEN`, then `darwin`, then `expect` | `AUSTEN` → Pride and Prejudice, Emma (author match, upper case); `darwin` → 2 Darwin books; `expect` → Great Expectations (partial title). Newest first, ≤ 12 per page | INT | Not run – built in S3-T09 | TBD (S3-T14) |
| TC-F5-02 | US-12/AC-02 | E | 30 seed books | Search `zzqx` | "No books match your search" + a **Clear filters** link; the link returns to all 30 books | INT + E2E | Not run – built in S3-T09/T10 | TBD (S3-T14) |
| TC-F5-03 | US-12/AC-03 | B | 30 seed books | (a) empty keyword; (b) three spaces; (c) a keyword of exactly 100 characters; (d) 101 characters; (e) `%`; (f) `'`; (g) `_` | (a), (b) all 30 books (30 titles, page 1 of 3); (c) search runs, no error (no match message); (d) cut to 100 characters or refused with a message – no error page; (e), (f), (g) treated as text: no match message, no SQL error, no "all books" | UNIT + INT | Not run – built in S3-T09 | TBD (S3-T14) |
| TC-F5-04 | US-13/AC-01 | M | 30 seed books | Category **Novel**, price **50,000 – 150,000** → Apply | Exactly 4 books: Pride and Prejudice, Jane Eyre, Emma, A Tale of Two Cities; Great Expectations (152,000) not shown | INT | Not run – built in S3-T11 | TBD (S3-T14) |
| TC-F5-05 | US-13/AC-02 | M | 30 seed books | Search `e`, price 50,000 – 250,000 (22 books → 2 pages) → page 2 | Page 2 URL keeps `q`, `min`, `max`; the search box and price fields stay filled; page 2 shows the remaining 10 books of the same result set; "page 2 of 2" | INT + E2E | Not run – built in S3-T10/T11 | TBD (S3-T14) |
| TC-F5-06 | US-13/AC-03 | E | 30 seed books | Min **200,000**, max **100,000** → Apply (also by typing the URL `?min=200000&max=100000`) | "Minimum price must not exceed maximum price"; filter not applied (the list stays as before / all books); same result when the URL is typed (server check) | UNIT + INT | Not run – built in S3-T10/T11 | TBD (S3-T14) |
| TC-F5-07 | US-13/AC-04 | B | 30 seed books | (a) min = max = **129,000**; (b) min **49,000** max **49,000**; (c) min **260,000**, no max | (a) Pride and Prejudice only; (b) As a Man Thinketh only; (c) The Decline and Fall of the Roman Empire only – bounds are inclusive | INT | Not run – built in S3-T11 | TBD (S3-T14) |

## NFR-05 – Performance

| TC | AC | Type | Given | When (steps) | Then (expected) | Level (planned) | Actual – hosted, manual (median of 3) |
|---|---|---|---|---|---|---|---|
| TC-NFR05-01 | NFR-05/AC-01 | M | Hosted site warm (open it once first), 30 books | DevTools → Network, *Disable cache* off → load `/books` 3 times; record *Load* time of each run | Median < 2 s | Manual | TBD (S3-T15) – runs: _ / _ / _ |
| TC-NFR05-02 | NFR-05/AC-02 | B | Same | Load `/books?page=3&q=n&min=50000&max=250000` 3 times (25 books → page 3 exists) | Median < 2 s | Manual | TBD (S3-T15) – runs: _ / _ / _ |

## US-25 – "Last updated by" audit (CR-06)

| TC | AC | Type | Given | When (steps) | Then (expected) | Level (planned) | Actual – local automated | Actual – hosted, manual |
|---|---|---|---|---|---|---|---|---|
| TC-CR-06 | US-25/AC-01 | M | Staff account *staff1* (name "Staff One") | Edit the price of *Emma* → Save → open the book's admin page | "Last updated by Staff One at dd/mm/yyyy HH:mm" (GMT+7, time of the save) | INT | Not run – built in S3-T07 | TBD (S3-T14) |
| TC-CR-07 | US-25/AC-02 | B | A seed book never edited (e.g. *Meditations*) | Open its admin page | "Last updated by System at <seed time>" | INT | Not run – built in S3-T05/T07 | TBD (S3-T14) |
| TC-CR-08 | US-25/AC-03 | E | *Emma* last edited by "Staff One" | Admin renames the account to "Staff Two" and then locks it → open *Emma*'s admin page | Still "Last updated by Staff One at …" (name stored at update time) | INT | Not run – built in S3-T07 | TBD (S3-T14) |

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
