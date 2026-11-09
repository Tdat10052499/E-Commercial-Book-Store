# Sprint 3 – Daily plan

*What each member finishes each day. Generated from `sprint-backlog.md` (the source); if the backlog changes, run `python tools/s3_tracker.py plan`.*

## D1 – Fri 06/11  (Chính 1 h · Đạt 1 h)

**Both**
- [ ] S3-T01 · ECBS-147 (1.5 h) – Review 2 + Retro 2 + Sprint Planning 3: S3 goal, Planning Poker Session 3 votes, this backlog into Jira Sprint 3
- [x] S3-D1 · ECBS-170 (0.5 h) – Daily Scrum (≤ 10 min) + move the cards + log the hours in Jira before 22:00

*End of D1: plan remaining 37.5 h.*

## D2 – Sat 07/11  (Chính 2.75 h · Đạt 3.25 h)

**Chính**
- [ ] S3-T03 · ECBS-149 (0.5 h) – PO acceptance of US-05…09, NFR-04, US-24 against the Story DoD; Product Backlog and Jira statuses
- [ ] S3-T04 · ECBS-150 (2 h) – Test cases F4, F5, US-25 from the ACs (≥ 1 per AC: main, exception, boundary) → `test-cases-F4F5.md`

**Đạt**
- [ ] S3-T02 · ECBS-148 (1.5 h) – Hosted run of the admin and Staff cases left *Blocked* in S2 (TC-F2, TC-CR) with the Staff test account; results and screenshots into `test-cases-F2F3.md`
- [ ] S3-T05 · ECBS-151 (1.5 h) – Data model: `books.updated_by_name` + migration safe to run twice; seed books show "System"

**Both**
- [ ] S3-D2 · ECBS-171 (0.5 h) – Daily Scrum (≤ 10 min) + move the cards + log the hours in Jira before 22:00

*End of D2: plan remaining 31.5 h.*

## D3 – Sun 08/11  (Chính 2.75 h · Đạt 2.75 h)

**Chính**
- [ ] S3-T06 · ECBS-152 (2.5 h) – Detail page `/books/[id]`: cover, title, author, category, price, description, stock (AC-01); friendly "Sorry, this book is not available" page with HTTP 404 for a missing, hidden or non-numeric id (AC-03); book cards link to it

**Đạt**
- [ ] S3-T07 · ECBS-153 (2.5 h) – Add/edit book actions store the user's name and time; admin edit page shows "Last updated by <name> at dd/mm/yyyy HH:mm" (AC-01…03); tests; PR merged

**Both**
- [ ] S3-D3 · ECBS-172 (0.5 h) – Daily Scrum (≤ 10 min) + move the cards + log the hours in Jira before 22:00

*End of D3: plan remaining 26 h.*

## D4 – Mon 09/11  (Chính 2.25 h · Đạt 2.75 h)

**Chính**
- [ ] S3-T08 · ECBS-154 (2 h) – "Back to list" returns to the same page with the same search and filter (AC-02), page 1 when opened directly (AC-04); tests; PR merged and deployed

**Đạt**
- [ ] S3-T09 · ECBS-155 (2.5 h) – Search in `listBooksPage`: keyword on title **or** author, case-insensitive, partial, trimmed, ≤ 100 chars, `%` `_` `'` treated as text (AC-01, AC-03); integration tests

**Both**
- [ ] S3-D4 · ECBS-173 (0.5 h) – Daily Scrum (≤ 10 min) + move the cards + log the hours in Jira before 22:00

*End of D4: plan remaining 21 h.*

## D5 – Tue 10/11  (Chính 3.75 h · Đạt 2.75 h)

**Chính**
- [ ] S3-T10 · ECBS-156 (2.5 h) – Filter bar on `/books`: search box, category list, min/max price; "No books match your search" + Clear filters (US-12/AC-02); "Minimum price must not exceed maximum price" (US-13/AC-03); parameters kept in the URL and the page links (US-13/AC-02); 360/768/1280 px
- [ ] S3-T12 · ECBS-158 (1 h) – UAT script part 1: every AC of F1–F3 and US-24 as a step with expected result and Pass/Fail → `pm/uat/uat-script.md`

**Đạt**
- [ ] S3-T11 · ECBS-157 (2.5 h) – Filter in `listBooksPage`: category + price range, bounds inclusive (AC-01, AC-04); min > max refused on the server (AC-03); works with search and paging; integration tests; PR merged and deployed

**Both**
- [ ] S3-D5 · ECBS-174 (0.5 h) – Daily Scrum (≤ 10 min) + move the cards + log the hours in Jira before 22:00

*End of D5: plan remaining 14.5 h.*

## D6 – Wed 11/11  (Chính 4.25 h · Đạt 2.75 h)

**Chính**
- [ ] S3-T14 · ECBS-160 (2 h) – Hosted run of the F4, F5, US-25 test cases; results and defects (a Low defect is fixed the same day)
- [ ] S3-T15 · ECBS-161 (1 h) – Load time on the host with DevTools, 3 runs, median: page 1, and page 3 with search + filter (AC-01, AC-02); add an index only if > 2 s
- [ ] S3-T23 · ECBS-169 (1 h) – Export script for the S3 files (`tools/export_s3.py`, based on `export_s2.py`)

**Đạt**
- [ ] S3-T16 · ECBS-162 (1.5 h) – Regression F1–F3: full automated suite + hosted smoke list (login, admin, Staff, grid)
- [ ] S3-T17 · ECBS-163 (1 h) – Weekly Status S3 (Green/Amber/Red), risk register and issue log

**Both**
- [ ] S3-D6 · ECBS-175 (0.5 h) – Daily Scrum (≤ 10 min) + move the cards + log the hours in Jira before 22:00

*End of D6: plan remaining 7.5 h.*

## D7 – Thu 12/11  (Chính 2.75 h · Đạt 4.75 h)

**Chính**
- [ ] S3-T13 · ECBS-159 (1 h) – UAT script part 2: F4, F5, NFR-05, US-25 ACs; list of test accounts for the session
- [ ] S3-T18 · ECBS-164 (0.5 h) – PO acceptance of the S3 items that passed; Product Backlog and Jira
- [ ] S3-T20 · ECBS-166 (1 h) – UAT minutes form for 13/11 (result per AC, Sponsor sign-off) → `c5_UAT.docx`

**Đạt**
- [ ] S3-T19 · ECBS-165 (1.5 h) – Release v1.0: `develop` → `main`, tag `v1.0`, release notes (features, known issues, how to run)
- [ ] S3-T21 · ECBS-167 (1.5 h) – EVM S3, burndown and Sprint Report `c3_SprintReport_S3` (test cases F4/F5, release notes)
- [ ] S3-T22 · ECBS-168 (1.5 h) – Workbook `c2_SprintBacklog_S3` (cumulative) + `c0_Eval_S3`; upload before 23:59

**Both**
- [ ] S3-D7 · ECBS-176 (0.5 h) – Daily Scrum (≤ 10 min) + move the cards + log the hours in Jira before 22:00

*End of D7: plan remaining 0 h.*
