# Weekly Status Report – Week 3 (Sprint 3)

**Project:** E-Commercial Book Store – Release 1.0 · **Team:** 6 "Page Turners" · **To:** Sponsor Dr. Bùi Minh Phụng (Ms. Le) · **From:** Hồ Du Tuấn Đạt (Leader S3) · **Period:** 06/11 – 12/11/2026 · **Data as of:** Thu 12/11/2026 18:55 (D7, GMT+7)

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 0.1-draft | 11/11/2026 | Hồ Du Tuấn Đạt (AI-assisted) | First draft from the Sprint Backlog, Jira (read 11/11 18:40), GitHub and `po-acceptance.md`; to be reviewed by Đạt and the PO before it is final. EVM is S3-T21 |
| 1.0 | 12/11/2026 | Hồ Du Tuấn Đạt (AI-assisted) | Final for Sprint 3 (S3-T17): data as of 12/11 18:55 – 60/62 SP accepted, SPI 0.97, CPI 1.50, all hosted cases Pass, CR-07 pending CCB |

## 1. Overall status: **Green** (schedule Amber only for NFR-03)
Every Sprint 3 item is built, tested on the hosted site by the member who did not write the cases, and accepted by the PO on 12/11. Release 1.0 has **60 of 62 SP** accepted; NFR-03 (hosting, 2 SP) can only be checked on 17/11.

| Area | Status | Evidence |
|---|---|---|
| **Scope** | Green | US-11, US-12, US-13, NFR-05, US-25 accepted 12/11 (15 SP, PR #61); the 7 S2 carry-overs accepted (NFR-04 re-accepted 12/11 after DEF-S3-03) → 60/62 SP |
| **Schedule** | Amber | SPI 0.97 (NFR-03 waits for 17/11). Burndown D7 10.5 h left at 18:55: closing documents, Daily D7, and Daily D2–D3 not held |
| **Cost** | Green | CPI 1.50: 85.23 h logged of 132 h planned (S3: 20.23 of 39.5 h, part AI-assisted) |
| **Quality** | Green | 114/114 automated tests; hosted F4/F5/US-25 14/14, NFR-05 medians 0.50 s / 0.38 s, smoke 15/15; DEF-S3-01…03 fixed |

## 2. Done this week
- **F4 / US-11:** book detail page with friendly "not available", Back to list keeps page, search and filter (PR #22, #29).
- **F5 / US-12:** search by title or author, case-insensitive, `%` and `'` treated as text (PR #30).
- **US-13:** filter bar UI (PR #38, Chính); server filter by category and inclusive price range, min > max refused (PR #47, Đạt – in review).
- **CR-06 / US-25:** "Last updated by <name> at <time>" stored and shown (PR #23).
- **S2 carry-over:** hosted admin and Staff run (S3-T02); PO accepted US-05, US-06, US-24, US-08, US-09 (19 SP).
- **Home page UI** (outside the Release 1.0 backlog): banners, book rails, footer (PR #37, #40) – released to `main` (#45, #46).

## 3. Next (12/11 evening → 17/11)
| # | Action | Owner | Due |
|---|---|---|---|
| 1 | Sprint Review 3 video; Daily D7; export c0, c2, c3 (S3-T22) and submit c0, c2, c3, c5 | Both | 12/11 23:59 |
| 2 | Release `develop → main` and tag `v1.0` (S3-T19) | Đạt | 12/11 |
| 3 | UAT with the Sponsor (UAT script 73 steps, c5 minutes) and Review 3 in class | Both | 13/11 |
| 4 | CCB on CR-07 (re-baseline S3 SP after Planning Poker Session 3) | PO, Sponsor | 13/11 |
| 5 | Code freeze except UAT fixes; final submission | Both | 15/11 23:59 |
| 6 | NFR-03 check (site online one week, TC-F1-24); final presentation | Both | 17/11 |

## 4. Risks and issues (top)
| ID | Item | Status | Response |
|---|---|---|---|
| I-06 | PRs merged without a recorded approval (#47–#50, incl. release #50 just after action A2 was agreed) | Open | Action A2 kept since 12/11: the 15 PRs merged on 12/11 were all approved by the other member before the merge (GitHub reviews) |
| I-07 / R09 | Đạt busy on 10/11: S3-T11 moved to D6 | Closed 12/11 | T11 released 11/11 21:00 |
| I-05 | Daily channel; Daily D2, D3 not held | Closed 11/11 | Discord 22:00 (A1) |
| I-04 | No real Planning Poker votes | Closed 11/11 | Session 3 held 11/11 (after the build) → CR-07 |
| R03 | Free hosting may start slowly | Open | Open the site 15 min before UAT and the presentation |

## 5. Help needed from the Sponsor
None this week.
