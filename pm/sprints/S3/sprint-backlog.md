# Sprint 3 – Sprint Backlog (plan, day by day)

*Sprint 3 – Complete & acceptance · Fri 06/11 → Thu 12/11/2026 · Leader: Hồ Du Tuấn Đạt · PO: Nguyễn Minh Chính.*

**Status of this plan:** proposed by the PO on 07/11/2026; the Leader S3 confirms or changes it at the Daily on Sat 07/11. Estimates are plan values; the SP come from Session 1 until the Session 3 votes are recorded in `planning-poker-log.md`.

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 0.2 | 07/11/2026 | Nguyễn Minh Chính (PO) | Tasks entered in Jira Sprint 3 (ECBS-147…176): Original Estimate, owner, due date = planned day, label S3_Backlog, links to the stories; Jira column added |
| 0.1 | 07/11/2026 | Nguyễn Minh Chính (PO) | Day-by-day plan: S3 items split into tasks of ≤ 2.5 h, one owner each, a planned day for every task, a Daily task each day (Retro 2 action: no Sprint-end crunch) |

## Sprint goal
"Customers open book details and search/filter by title, author, category and price range together with pagination; Release v1.0 passes UAT." [03 §6.3]

## Items
| Item | SP (plan) | Feature | Note |
|---|---|---|---|
| US-11 Book detail | 3 | F4 |  |
| US-12 Search by title/author | 3 | F5 |  |
| US-13 Filter by category and price + pagination | 5 | F5 |  |
| NFR-05 List page < 2 s | 2 | F3/F5 |  |
| US-25 "Last updated by" audit | 2 | F2 (CR-06) | Approved 30/10, Option B |
| **Total S3** | **15** | | Release total PSP 62 SP |
| Carried from S2 (built, waiting for the hosted admin/Staff run) | 24 | F2, CR-06 | US-05…09, NFR-04, US-24 – S3-T02, S3-T03 |
| Carried from S1 | 2 | F1 | NFR-03 – TC-F1-24 runs on 17/11 (outside S3) |

## Capacity and plan hours
| Member | Capacity (h, plan) | Planned task hours |
|---|---|---|
| Hồ Du Tuấn Đạt | 20 | 20 |
| Nguyễn Minh Chính | 20 | 19.5 |
| **Team** | **40** | **39.5** |

A "Both" task counts half for each member. Weekend days are light (≈ 3 h); the 20 h per member are kept, only spread over 7 days instead of 5.

## Working rules for this Sprint
1. Every task is small (≤ 2.5 h) and has one planned day – finish it that day.
2. Code goes through a PR the same day; the other member reviews and approves it on GitHub within 12 h, then it is merged (issue I-06).
3. When a task is finished: fill **Done on** and **Actual h** below, move the Jira card, log the hours in Jira – before 22:00.
4. A task that slips: keep the planned day, write the new day in *Status* and say it at the next Daily.
5. Daily Scrum every day, ≤ 10 min, logged in `daily-log.md` (channel agreed at Retro 2, issue I-05).
6. Burndown: `python tools/s3_tracker.py burndown`; today's tasks: `python tools/s3_tracker.py today`.

## Tasks
Planned day = the day the task should be finished. **Done on** (dd/mm) and **Actual h** are filled by the owner when the task is finished.

| Task | Jira | Item | Description | Owner | Est. h (plan) | Planned day | Done on | Actual h (Jira) | Status |
|---|---|---|---|---|---|---|---|---|---|
| S3-T01 | ECBS-147 | Scrum | Review 2 + Retro 2 + Sprint Planning 3: S3 goal, Planning Poker Session 3 votes, this backlog into Jira Sprint 3 | Both | 1.5 | D1 Fri 06/11 |  |  | To Do |
| S3-T02 | ECBS-148 | Carried | Hosted run of the admin and Staff cases left *Blocked* in S2 (TC-F2, TC-CR) with the Staff test account; results and screenshots into `test-cases-F2F3.md` | Đạt | 1.5 | D2 Sat 07/11 |  | 1.33 (Đạt, reconstructed, logged 09/11) | In Review – PR #24 merged, #27; TC-F2-11/12/19 left |
| S3-T03 | ECBS-149 | Carried | PO acceptance of US-05…09, NFR-04, US-24 against the Story DoD; Product Backlog and Jira statuses | Chính | 0.5 | D2 Sat 07/11 |  |  | In Progress – US-05, US-06, US-24 accepted 09/11 (13 SP); US-07, US-08, US-09, NFR-04 wait (see po-acceptance.md) |
| S3-T04 | ECBS-150 | Test | Test cases F4, F5, US-25 from the ACs (≥ 1 per AC: main, exception, boundary) → `test-cases-F4F5.md` | Chính | 2 | D2 Sat 07/11 |  | 1 (Chính, logged 08/11) | In Review – PR #21 |
| S3-T05 | ECBS-151 | US-25 | Data model: `books.updated_by_name` + migration safe to run twice; seed books show "System" | Đạt | 1.5 | D2 Sat 07/11 | 08/11 | 0.25 (Đạt, reconstructed, logged 09/11) | Done – PR #23 merged |
| S3-T06 | ECBS-152 | US-11 | Detail page `/books/[id]`: cover, title, author, category, price, description, stock (AC-01); friendly "Sorry, this book is not available" page with HTTP 404 for a missing, hidden or non-numeric id (AC-03); book cards link to it | Chính | 2.5 | D3 Sun 08/11 |  | 1 (Chính, logged 08/11) | In Review – PR #22 |
| S3-T07 | ECBS-153 | US-25 | Add/edit book actions store the user's name and time; admin edit page shows "Last updated by <name> at dd/mm/yyyy HH:mm" (AC-01…03); tests; PR merged | Đạt | 2.5 | D3 Sun 08/11 | 08/11 | 0.33 (Đạt, reconstructed, logged 09/11) | Done – PR #23 merged |
| S3-T08 | ECBS-154 | US-11 | "Back to list" returns to the same page with the same search and filter (AC-02), page 1 when opened directly (AC-04); tests; PR merged and deployed | Chính | 2 | D4 Mon 09/11 |  |  | In Review – PR #29 (stacked on #22) |
| S3-T09 | ECBS-155 | US-12 | Search in `listBooksPage`: keyword on title **or** author, case-insensitive, partial, trimmed, ≤ 100 chars, `%` `_` `'` treated as text (AC-01, AC-03); integration tests | Đạt | 2.5 | D4 Mon 09/11 |  |  | To Do |
| S3-T10 | ECBS-156 | US-12/13 | Filter bar on `/books`: search box, category list, min/max price; "No books match your search" + Clear filters (US-12/AC-02); "Minimum price must not exceed maximum price" (US-13/AC-03); parameters kept in the URL and the page links (US-13/AC-02); 360/768/1280 px | Chính | 2.5 | D5 Tue 10/11 |  |  | To Do |
| S3-T11 | ECBS-157 | US-13 | Filter in `listBooksPage`: category + price range, bounds inclusive (AC-01, AC-04); min > max refused on the server (AC-03); works with search and paging; integration tests; PR merged and deployed | Đạt | 2.5 | D5 Tue 10/11 |  |  | To Do |
| S3-T12 | ECBS-158 | UAT | UAT script part 1: every AC of F1–F3 and US-24 as a step with expected result and Pass/Fail → `pm/uat/uat-script.md` | Chính | 1 | D5 Tue 10/11 |  |  | To Do |
| S3-T13 | ECBS-159 | UAT | UAT script part 2: F4, F5, NFR-05, US-25 ACs; list of test accounts for the session | Chính | 1 | D7 Thu 12/11 |  |  | To Do |
| S3-T14 | ECBS-160 | Test | Hosted run of the F4, F5, US-25 test cases; results and defects (a Low defect is fixed the same day) | Chính | 2 | D6 Wed 11/11 |  |  | To Do |
| S3-T15 | ECBS-161 | NFR-05 | Load time on the host with DevTools, 3 runs, median: page 1, and page 3 with search + filter (AC-01, AC-02); add an index only if > 2 s | Chính | 1 | D6 Wed 11/11 |  |  | To Do |
| S3-T16 | ECBS-162 | Test | Regression F1–F3: full automated suite + hosted smoke list (login, admin, Staff, grid) | Đạt | 1.5 | D6 Wed 11/11 |  |  | To Do |
| S3-T17 | ECBS-163 | PM | Weekly Status S3 (Green/Amber/Red), risk register and issue log | Đạt | 1 | D6 Wed 11/11 |  |  | To Do |
| S3-T18 | ECBS-164 | PO | PO acceptance of the S3 items that passed; Product Backlog and Jira | Chính | 0.5 | D7 Thu 12/11 |  |  | To Do |
| S3-T19 | ECBS-165 | Release | Release v1.0: `develop` → `main`, tag `v1.0`, release notes (features, known issues, how to run) | Đạt | 1.5 | D7 Thu 12/11 |  |  | To Do |
| S3-T20 | ECBS-166 | UAT | UAT minutes form for 13/11 (result per AC, Sponsor sign-off) → `c5_UAT.docx` | Chính | 1 | D7 Thu 12/11 |  |  | To Do |
| S3-T21 | ECBS-167 | PM | EVM S3, burndown and Sprint Report `c3_SprintReport_S3` (test cases F4/F5, release notes) | Đạt | 1.5 | D7 Thu 12/11 |  |  | To Do |
| S3-T22 | ECBS-168 | PM | Workbook `c2_SprintBacklog_S3` (cumulative) + `c0_Eval_S3`; upload before 23:59 | Đạt | 1.5 | D7 Thu 12/11 |  |  | To Do |
| S3-T23 | ECBS-169 | PM | Export script for the S3 files (`tools/export_s3.py`, based on `export_s2.py`) | Chính | 1 | D6 Wed 11/11 |  |  | To Do |
| S3-D1 | ECBS-170 | Scrum | Daily Scrum (≤ 10 min) + move the cards + log the hours in Jira before 22:00 | Both | 0.5 | D1 Fri 06/11 | 06/11 | 0.75 Chính · Đạt TBD | Done – held on Discord 22:00, ~45 min |
| S3-D2 | ECBS-171 | Scrum | Daily Scrum (≤ 10 min) + move the cards + log the hours in Jira before 22:00 | Both | 0.5 | D2 Sat 07/11 |  |  | Not held (07/11) |
| S3-D3 | ECBS-172 | Scrum | Daily Scrum (≤ 10 min) + move the cards + log the hours in Jira before 22:00 | Both | 0.5 | D3 Sun 08/11 |  |  | Not held (08/11) |
| S3-D4 | ECBS-173 | Scrum | Daily Scrum (≤ 10 min) + move the cards + log the hours in Jira before 22:00 | Both | 0.5 | D4 Mon 09/11 |  |  | To Do |
| S3-D5 | ECBS-174 | Scrum | Daily Scrum (≤ 10 min) + move the cards + log the hours in Jira before 22:00 | Both | 0.5 | D5 Tue 10/11 |  |  | To Do |
| S3-D6 | ECBS-175 | Scrum | Daily Scrum (≤ 10 min) + move the cards + log the hours in Jira before 22:00 | Both | 0.5 | D6 Wed 11/11 |  |  | To Do |
| S3-D7 | ECBS-176 | Scrum | Daily Scrum (≤ 10 min) + move the cards + log the hours in Jira before 22:00 | Both | 0.5 | D7 Thu 12/11 |  |  | To Do |
| **Total** | | | | | **39.5** | | | | |

## Planned burndown (plan line)
Remaining plan hours at the end of each day if every task is finished on its planned day.

| | Start | D1 Fri 06/11 | D2 Sat 07/11 | D3 Sun 08/11 | D4 Mon 09/11 | D5 Tue 10/11 | D6 Wed 11/11 | D7 Thu 12/11 |
|---|---|---|---|---|---|---|---|---|
| Plan remaining (h) | 39.5 | 37.5 | 31.5 | 26 | 21 | 14.5 | 7.5 | 0 |

## Dependencies
- S3-T08 (Back keeps the filter) is built with the URL parameters of S3-T10/T11; its filter part is re-checked in S3-T14.
- S3-T14, T15 need T08–T11 deployed (Tue night). S3-T19 needs T14–T16 passed. S3-T21, T22 need T23.

