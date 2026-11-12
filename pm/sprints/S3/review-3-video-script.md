# Sprint Review 3 – recorded video script (13–15 min)

*Team 6 "Page Turners" · Sprint 3 (Fri 06/11 – Thu 12/11/2026) · Presented by **Hồ Du Tuấn Đạt** (Sprint Leader S3 / Scrum Master, Developer) and **Nguyễn Minh Chính** (Product Owner, Developer). The content follows the required parts of a Sprint Review [03 §8]: Sprint Goal and result, demo against the ACs, burndown with the flat and rising parts explained, planned vs actual hours, risks and issues, Retro action items, next plan.*

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 12/11/2026 | Nguyễn Minh Chính (PO) | Script for the recorded Review 3: 9 parts, 14:00 target, speaker and screen per part; figures as of 12/11 19:10 |

## Figures used (check before recording)
Figures marked ⟳ change tonight (S3-T17, T19, T21, T22, Daily D7 are still open). Read the final value from `sprint-report.md` / Jira just before recording; if the video is recorded before the final update, say "as of 12/11, 19:10".

| Figure | Value | Source |
|---|---|---|
| Committed | 39 SP: 15 SP new (US-11 3, US-12 3, US-13 5, NFR-05 2, US-25 2) + 24 SP carried from S2 | `sprint-backlog.md` |
| Accepted in Sprint 3 | 39 of 39 SP (24 carried on 09–10/11, 15 new on 12/11) | `po-acceptance.md` v1.4 |
| Cumulative accepted | 60 of 62 SP (NFR-03 Hosting checked on 17/11) | `po-acceptance.md` |
| Planned task hours S3 | 39.5 h (31 tasks incl. 7 Daily) | `sprint-backlog.md` |
| Actual hours S3 (Jira) ⟳ | 20.2 h (Đạt 8.9 · Chính 11.3), 12/11 19:10 | Jira ECBS-147…176 |
| Burndown actual remaining | Start 39.5 · D1 39 · D2 39 · D3 35 · D4 25.5 · D5 24.5 · D6 17.5 · D7 10.5 ⟳ (plan 37.5 · 31.5 · 26 · 21 · 14.5 · 7.5 · 0) | `tools/s3_tracker.py burndown` |
| EVM (baseline v1.1, BAC 26,400,000 VND, PSP 62) ⟳ | PV 26,400,000 · EV 25,548,387 (60/62) · AC 17,046,000 (85.2 h) → **SPI 0.97, CPI 1.50** | formulas [03 §6.4] |
| Tests | 114/114 automated (`npm test`); hosted: F4 4/4, F5 7/7, NFR-05 2/2 (0.50 s / 0.38 s), US-25 3/3 (AC-03 rename by automated test), F2/CR re-runs and smoke 1–14 Pass | test-case files, `regression-F1-F3.md` |

## Run sheet

| # | Time | Part | Speaker | On screen |
|---|---|---|---|---|
| 1 | 0:00 – 0:45 | Opening and agenda | Đạt | Title slide or Jira board Sprint 3 |
| 2 | 0:45 – 2:00 | Sprint Goal and result | Đạt → Chính | `sprint-backlog.md` (goal) · `po-acceptance.md` |
| 3 | 2:00 – 3:15 | Committed items and PO decisions | Chính | Jira board (Done column) · acceptance table |
| 4 | 3:15 – 8:45 | Demo against the ACs (pass **and** fail cases) | Chính (F4, filter bar) · Đạt (F5 server rules, US-25, NFR-05) | https://pagetunnel.vercel.app/ |
| 5 | 8:45 – 10:15 | Burndown, planned vs actual hours, EVM | Đạt | `evidence/burndown-S3.png` · EVM table |
| 6 | 10:15 – 11:30 | Risks, issues, defects | Đạt | Issue log / release notes *Known issues* |
| 7 | 11:30 – 12:15 | Changes: CR-07 and Planning Poker Session 3 | Chính | `change-log.md` · `planning-poker-log.md` |
| 8 | 12:15 – 13:15 | Retro 2 action items – status | Đạt | `S2/review-retro.md` (A1–A4) |
| 9 | 13:15 – 14:00 | Next: UAT, release v1.0, final week · close | Chính → Đạt | UAT script / timeline |

Target 14:00 (allowed 13:00 – 15:00). Speaking pace about 120–130 words per minute; the demo part carries the slack: if you are at 12:30 at the end of part 8, keep part 9 at 45 s; if you are under 12:30, add the optional demo steps marked (+).

## 1. Opening and agenda – Đạt (0:00 – 0:45)
**Screen:** Jira board, Sprint 3.

> Hello, we are Team 6, Page Turners. This is our Sprint 3 Review for the E-Commercial Book Store, Release 1.0. Sprint 3 ran from Friday the 6th to Thursday the 12th of November. I am Hồ Du Tuấn Đạt, the Sprint Leader and Scrum Master for this Sprint, and a developer. With me is Nguyễn Minh Chính, our Product Owner, who is also a developer.
> In the next fourteen minutes we will show the Sprint Goal and what we delivered, a live demo checked against the acceptance criteria, our burndown, planned versus actual hours and EVM, the risks and issues we met, the change request we are raising, the status of our Retrospective actions, and our plan for the UAT and the final week.

## 2. Sprint Goal and result – Đạt, then Chính (0:45 – 2:00)
**Screen:** `sprint-backlog.md` → *Sprint goal*; then `po-acceptance.md`.

**Đạt:**
> Our Sprint Goal was: "Customers open book details and search and filter by title, author, category and price range together with pagination; Release 1.0 passes UAT."
> The first part of the goal is met. Book details, search, and the category and price filter are live on the hosted site, and the filters work together with paging. The second part, the UAT, takes place tomorrow, the 13th, with our Sponsor. The UAT script and the minutes form are ready.

**Chính:**
> As Product Owner, I accepted every committed item. That is the 15 new story points of Sprint 3, and the 24 points we carried over from Sprint 2, so 39 out of 39 committed points. In total, Release 1.0 now has 60 of its 62 points accepted. The last 2 points are NFR-03, hosting. It can only be checked when the site has stayed online until the 17th.

## 3. Committed items and PO decisions – Chính (2:00 – 3:15)
**Screen:** Jira board, Done column; then the acceptance table in `po-acceptance.md`.

> These are the items we committed. The carried items were checked first. US-05 to US-09, NFR-04 and US-24, the Store Staff role from our change request, were accepted on the 9th and 10th, after hosted test runs.
> The new items were accepted today, the 12th. They are US-11 book detail, US-12 search, US-13 filter and pagination, NFR-05 performance and US-25, the "last updated by" audit.
> My rule is the Story Definition of Done. Every AC has to pass on the hosted site, the code has to be reviewed and merged, and the automated tests have to pass. For US-25, one AC asks that the audit keeps the editor's old name after the account is renamed. Release 1.0 has no screen to rename an account, so we tested the lock live, and the rename is covered by an automated test.
> NFR-04, the responsive layout, was put on hold this morning because of a regression, defect DEF-S3-03. It was accepted again after the fix and a re-test this evening.

## 4. Demo against the ACs – Chính, then Đạt (3:15 – 8:45)
Prepare before recording: one browser window signed out (customer view), a second browser profile signed in as **Admin**, DevTools ready. Never type a password on camera.

### 4a. US-11 Book detail – Chính (3:15 – 4:45)
| Step | Say / show | AC |
|---|---|---|
| Open `/books`, go to page 2, click the first card | "From page 2, I open a book: cover, title, author, category, price in VND, description and stock." | US-11/AC-01 |
| Open *A Tale of Two Cities* | "A book with no stock still opens and shows stock 0 – out of stock." | AC-01 |
| Click **Back to list** | "Back to list returns to page 2, not to page 1." | AC-02 |
| Open `/books/99999`, then `/books/abc` | "A missing or non-numeric id shows 'Sorry, this book is not available', with HTTP 404 in DevTools and no technical details. A hidden book's old link behaves the same." | AC-03 (fail case) |
| Paste a detail URL in a new tab → Back to list | "Opened directly, Back to list goes to page 1." | AC-04 |

### 4b. Filter bar – Chính (4:45 – 5:30)
| Step | Say / show | AC |
|---|---|---|
| Show the filter bar at full width, then narrow the window to phone width | "This is the filter bar I built: a keyword, a category, a minimum and a maximum price. It stacks on a phone." | US-12/13 UI, NFR-04 |
| Search `zzqx` | "No match shows 'No books match your search' and a Clear filters link." → click it, all books return | US-12/AC-02 (fail case) |

### 4c. US-12 / US-13 search and filter rules – Đạt (5:30 – 7:15)
| Step | Say / show | AC |
|---|---|---|
| Search `AUSTEN` | "The search matches the title or the author, in any case: Pride and Prejudice and Emma." | US-12/AC-01 |
| (+) Search `expect` | "Part of a title works too: Great Expectations." | AC-01 |
| Search `%` | "Special characters are treated as text: no match, and no error page." | US-12/AC-03 (boundary) |
| Category **Novel**, price **50000 – 150000** → Apply | "Exactly four books, and Great Expectations at 152,000 is not shown." | US-13/AC-01 |
| Search `e`, price 50000 – 250000 → page 2 | "Page 2 keeps the keyword and both prices in the URL and in the form." | US-13/AC-02 |
| Min **200000**, max **100000** → Apply | "A minimum above the maximum gives 'Minimum price must not exceed maximum price', and the price filter is not applied. The server does the same check when the URL is typed by hand." | US-13/AC-03 (fail case) |
| Min = max = **129000** | "The bounds are inclusive: Pride and Prejudice at exactly 129,000 is found." | US-13/AC-04 (boundary) |

### 4d. US-25 audit and NFR-05 – Đạt (7:15 – 8:45)
| Step | Say / show | AC |
|---|---|---|
| Admin profile → `/admin/books` → *Emma* | "Each book shows who changed it last: 'Last updated by Staff at 12/11/2026 18:01', in our time zone." | US-25/AC-01 |
| Open *Meditations* | "A seed book nobody edited says 'Last updated by System'." | US-25/AC-02 |
| Say only (no live change) | "If the editor is later locked, the stored name stays. We tested that on the host today, and the rename case by an automated test." | US-25/AC-03 |
| DevTools → Network, reload `/books` | "The book list loads in about half a second. The median of three runs was 0.50 seconds, and 0.38 seconds for page 3 with a search and a filter. The target was under 2 seconds." | NFR-05/AC-01, AC-02 |

## 5. Burndown, planned vs actual hours, EVM – Đạt (8:45 – 10:15)
**Screen:** `pm/sprints/S3/evidence/burndown-S3.png`, then the EVM table.

> This is the Sprint 3 burndown in task hours. The plan line goes from 39.5 hours to zero.
> On day 1 and day 2 the actual line is flat at 39 hours. Only the Daily on day 1 was done. Review 2, Retro 2 and Planning 3 were not completed on day 1, and the Daily on days 2 and 3 was not held.
> Days 3 and 4 are the catch-up. US-25 and the detail page, back to list, search and the test cases were finished, and the line drops about 10 hours on Monday.
> Day 5 is flat again. That is issue I-07: I was busy on Tuesday, so the server filter, S3-T11, moved to day 6, and the filter bar waited for it.
> Days 6 and 7 fall steeply, because the filter, the release, the hosted test runs and the acceptance were all done then. The remaining hours at the end are the closing tasks of tonight: weekly status, release v1.0, the EVM and the workbook.
> Planned versus actual: we planned 39.5 task hours. Jira shows ⟳ 20.2 hours logged so far, 8.9 for me and 11.3 for Chính. Many tasks took less time than estimated, and some of the early hours were logged late, which we fixed with Retro action A4.
> For EVM on baseline 1.1: the budget at completion is 26.4 million dong. With 60 of 62 points accepted, the earned value is 25.5 million. The actual cost is 17.0 million. That gives an SPI of 0.97, slightly behind the plan, and a CPI of 1.50. These figures are as of tonight, and the final ones are in the Sprint Report.

## 6. Risks, issues, defects – Đạt (10:15 – 11:30)
**Screen:** issue log (`05-risk-plan.md`), release notes *Known issues*.

> The main issues this Sprint:
> One. Time, risk R09. We each had a day where other work stopped the planned task: days 1 and 2, and day 5. Our answer is Retro action A4: update each task and its hours the same day, and keep day 7 tasks on day 7.
> Two. A UI regression. The footer was reworked, and some links became narrower than 44 pixels, which broke NFR-04 again. That is defect DEF-S3-03. We found it in the re-test, fixed it in PR 52, released it, and re-tested it. It is closed.
> Three. Process. Some PRs were merged without a recorded review, which is issue I-06. The last ones were on the 11th. Since the 12th, every PR has been approved by the other member before it is merged.
> Four. Scope. A Favorite button was added during UI polish. It is outside the Release 1.0 scope, so the Product Owner asked to list it as a known issue in the release notes. It only stores data in the visitor's browser.
> One open risk: the preview and the live site share the same database, so test data reaches the live shop. We clean the test data after each run, and before the UAT.

## 7. Changes: CR-07 and Planning Poker Session 3 – Chính (11:30 – 12:15)
**Screen:** `planning-poker-log.md` Session 3, then `change-log.md` CR-07.

> We held Planning Poker Session 3 on the 11th. It came late, after the items were built, so we use it as a calibration. Our votes were: US-11 3, US-12 5, US-13 5, NFR-05 5 and US-25 3. That is 21 points, against 15 in the original Product Owner estimate. Search and performance were the most under-estimated.
> As Product Owner, I raised CR-07 to use the team's estimates as the new baseline. The product backlog would go from 62 to 68 points. The scope, hours and cost do not change. The decision belongs to the CCB, chaired by our Sponsor, at the session tomorrow. Until then, all our figures stay on baseline 1.1.

## 8. Retro 2 action items – status – Đạt (12:15 – 13:15)
**Screen:** `pm/sprints/S2/review-retro.md`, action table.

| Action | Owner | Status to say |
|---|---|---|
| A1 Daily on Discord at 22:00, logged the same day | Đạt | Done from D6. D6 was held and logged, and D7 is tonight at 22:00 |
| A2 One branch per task; the other member approves before merge | Both | Partly on 11/11 (#47–#50 merged without a recorded approval); **done on 12/11**: every PR merged today has the other member's approval (#44, #52–#59) |
| A3 Writer and Run by columns; runner ≠ writer | Chính | Done 12/11. Đạt ran Chính's F4/F5/US-25 cases, and Chính re-ran Đạt's Store Staff cases and smoke tests. All Pass |
| A4 Update a task and its hours as soon as it is finished | Both | Done from D6. The steep D6–D7 line comes from same-day updates |

> Our Retrospective 3 will check these four actions again, and set new actions for the final week.

## 9. Next steps and close – Chính, then Đạt (13:15 – 14:00)
**Screen:** UAT script, Part I summary.

**Chính:**
> Next: tomorrow, the 13th, we run the UAT with our Sponsor. The script maps all 73 acceptance criteria of Release 1.0 to a live step or to recorded evidence. The minutes form records the result of each AC, any defect, the decision and the sign-off. The CCB also decides CR-07 there.

**Đạt:**
> After the UAT, we tag the release v1.0 with its release notes, and then we write the Final Report and Lessons Learned by the 15th. The final presentation is on the 17th, and the site stays online until then. Thank you for watching.

## Recording checklist
| Before | During | After |
|---|---|---|
| Both rehearse once with a timer (13–15 min) | Share the screen; both voices; cameras on if possible | Check the length (13:00–15:00) and the sound |
| Hosted site warm (open it once); test data clean (30 titles) | Do not type a password on camera; use the profile already signed in as Admin | Upload; put the link in `plan/INPUTS.md` (*Link video Review 3*) and in the Sprint Report |
| Final figures ⟳ read from Jira / `sprint-report.md` | Say "as of 12/11, 19:10" if the figures are not final | Log the meeting time in Jira (S3-T21 or a Review 3 task) for each member |
| Tabs open: site, admin profile, Jira board, burndown PNG, `po-acceptance.md`, `change-log.md`, `review-retro.md`, UAT script | Keep the run-sheet times; the demo carries the slack | Note any feedback for the Review record (c3 §8) |
