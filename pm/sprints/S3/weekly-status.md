# Weekly Status Report – Week 3 (Sprint 3)

**Project:** E-Commercial Book Store – Release 1.0 · **Team:** 6 "Page Turners" · **To:** Sponsor Dr. Bùi Minh Phụng (Ms. Le) · **From:** Hồ Du Tuấn Đạt (Leader S3) · **Period:** 06/11 – 12/11/2026 · **Data as of:** Wed 11/11/2026 19:00 (D6, GMT+7)

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 0.1-draft | 11/11/2026 | Hồ Du Tuấn Đạt (AI-assisted) | First draft from the Sprint Backlog, Jira (read 11/11 18:40), GitHub and `po-acceptance.md`; to be reviewed by Đạt and the PO before it is final. EVM is S3-T21 |

## 1. Overall status: **Amber / Red schedule**
F4 (book detail), F5 search, the filter bar and US-25 (last-updated audit) are built and merged into `develop`; the server-side filter (S3-T11) is in review (PR #47). The work is behind the day plan: 25 of 39.5 task hours remain on D6 against 7.5 h planned.

| Area | Status | Evidence |
|---|---|---|
| **Scope** | Amber | Built and merged: US-11, US-12, US-25, filter bar UI (PR #22, #29, #30, #23, #38). In review: US-13 server filter (PR #47). S2 carry-over: 19 of 24 SP accepted 09/11 (US-05, 06, 08, 09, 24); US-07 and NFR-04 (5 SP) wait for one hosted check each |
| **Schedule** | Red | Burndown D6: plan 7.5 h, actual 25 h remaining (see `evidence/burndown-S3.png`). Flat on D1–D2 (Review/Retro/Planning not completed, Daily D2–D3 not held) and on D5 (I-07); catch-up on D4 (−9.5 h) |
| **Cost** | Amber | 13.6 h logged in Jira on S3 tasks (read 11/11 18:40 + 3 h logged by Đạt 11/11), including tasks still open (T02, T03, T10, T11, T12); completed tasks carry 14.5 h of estimate. Some Daily hours are still TBD. EVM (SPI, CPI) is S3-T21 |
| **Quality** | Green | 104/104 automated tests pass on `develop` `8ebbd0b` (71 of them regression F1–F3, S3-T16); 114/114 with PR #47. DEF-S3-01 and DEF-S3-02 fixed the same day. Hosted smoke run: TBD |

## 2. Done this week
- **F4 / US-11:** book detail page with friendly "not available", Back to list keeps page, search and filter (PR #22, #29).
- **F5 / US-12:** search by title or author, case-insensitive, `%` and `'` treated as text (PR #30).
- **US-13:** filter bar UI (PR #38, Chính); server filter by category and inclusive price range, min > max refused (PR #47, Đạt – in review).
- **CR-06 / US-25:** "Last updated by <name> at <time>" stored and shown (PR #23).
- **S2 carry-over:** hosted admin and Staff run (S3-T02); PO accepted US-05, US-06, US-24, US-08, US-09 (19 SP).
- **Home page UI** (outside the Release 1.0 backlog): banners, book rails, footer (PR #37, #40) – released to `main` (#45, #46).

## 3. Next (D6 evening and D7, 12/11)
| # | Action | Owner | Due |
|---|---|---|---|
| 1 | Review and merge PR #47; release `develop → main` → S3-T10 and S3-T11 Done | Chính (review), Đạt (release) | 11/11 |
| 2 | Hosted re-check of TC-F2-11 and DEF-S3-02 → PO acceptance of US-07 and NFR-04 (S3-T03) | Đạt (run), Chính (accept) | 11/11 |
| 3 | Hosted smoke run F1–F3 (`regression-F1-F3.md`) and F4/F5/US-25 run (S3-T14), runner ≠ writer | Đạt, Chính | 12/11 |
| 4 | Review 2 / Retro 2 record, Planning 3 confirmation, Planning Poker Session 3 (S3-T01) – recorded with the real date | Both | 12/11 |
| 5 | Release v1.0 + tag, EVM S3 and Sprint Report, c2_S3, c0, UAT form – upload before 23:59 | Đạt, Chính | 12/11 |

## 4. Risks and issues (top)
| ID | Item | Status | Response |
|---|---|---|---|
| I-07 / R09 | Đạt busy on 10/11: S3-T11 moved to D6, F5 hosted run starts a day later | Open | T11 built 11/11; tasks that block others first; owner swap for test runs |
| I-06 | PRs merged without a recorded approval (also #37, #40, #45, #46 in S3) | Open | Post-merge review requested on each; approve before merge from now on |
| I-05 | Daily channel not agreed; Daily D2, D3 not held | Open | Decide at the S3-T01 meeting; Daily D6 and D7 held and logged |
| I-04 | No real Planning Poker votes yet | Open | Session 3 at the S3-T01 meeting, recorded as held after the build (calibration) |

## 5. Help needed from the Sponsor
None this week.
