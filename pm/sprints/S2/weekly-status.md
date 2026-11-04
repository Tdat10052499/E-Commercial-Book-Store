# Weekly Status Report – Week 2 (Sprint 2)

**Project:** E-Commercial Book Store – Release 1.0 · **Team:** 6 "Page Turners" · **To:** Sponsor Dr. Bùi Minh Phụng (Ms. Le) · **From:** Nguyễn Minh Chính (Leader S2, PO) · **Period:** 30/10 – 05/11/2026 · **Data as of:** 04/11/2026 23:50 (GMT+7) [03 §6.2-4, PMP-7 §7.1]

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 04/11/2026 | Nguyễn Minh Chính (AI-assisted) | First weekly status report (S2). Figures from the repo, PR #8, Jira and the rebaselined plan v1.1. Actual S2 hours: TBD – members log them in Jira before submission |

## 1. Overall status: **Amber**
F2 foundations and F3 are built and tested locally; the book form (US-05…07) and the Store Staff role (CR-06) still have to be built and the hosted test run is pending, with one day left.

| Area | Status | Evidence |
|---|---|---|
| **Scope** | Amber | Of the 9 committed items (29 SP): US-08, US-09, NFR-02, US-10, NFR-04 built (PR #8, In Review); US-05, US-06, US-07, US-24 not started at 04/11 evening. CR-06 approved and the baseline updated (v1.1) |
| **Schedule** | Red | Day 5 of 5: 5/23 tasks Done, 9 In Review/In Progress, 9 To Do. Actual S1 velocity 0 SP (F1 still In Review). Issue I-02 (F2 started late) |
| **Cost** | Amber | BAC v1.1 = 26,400,000 VND; PV(S2) = 17,600,000 VND; EV = 5,961,290 VND (14 SP – US-01…04 accepted 05/11); SPI = 0.34. AC to date = 19.5 h (S1) + S2 hours TBD from Jira × 200,000; CPI after the S2 hours are logged |
| **Quality** | Amber | Automated: 43/43 pass (27 new F2/F3 + 16 F1 regression); 0 open defects. Test cases: 28/28 ACs covered. F1 hosted run complete on 05/11: 21/24 Pass, 0 Fail (TC-19, 20, 24 not runnable yet). Hosted run of F2/F3 pending |

## 2. Done this week
- CCB on 30/10: CR-06 **approved, Option B**; Change Log, impact analysis, Product Backlog v1.2, Release Plan v1.3 and risk register v1.1 updated; tags `baseline-v1.0` and `baseline-v1.1` (rebaseline: PSP 55 → 62 SP, BAC 24.0 → 26.4 M VND).
- Sprint Planning 2 recorded with the actual S1 data (velocity 0 SP, 19.5 h) and sized by hours (39.75 h ≤ 40 h).
- F2/F3 code in PR #8: data model, 30-book seed in 6 categories, category and author management, responsive book grid (12 per page, newest first).
- 28 F2/F3 test cases written from the ACs (100 % AC coverage); 18 pass in the local automated run, 10 blocked until US-05…07 exist.
- c4 Change Request form drafted.

## 3. Next (05/11 → Sprint 3)
| # | Action | Owner | Due |
|---|---|---|---|
| 1 | Review and merge PR #8 into `develop`, deploy | Đạt | 05/11 |
| 2 | Build US-05 add book, US-06 edit, US-07 hide on top of PR #8 | Đạt | 05/11 |
| 3 | Build US-24 Store Staff role (permission matrix, 403 on delete and accounts) | Đạt | 05/11 |
| 4 | Hosted test run F2/F3 + F1 regression (F1 part 2 done 05/11, US-01…04 accepted) | Đạt | 05/11 |
| 5 | Log S2 actual hours in Jira; submit c0, c2, c3, c4 before 23:59 | Both / Chính | 05/11 |
| 6 | Review/Retro 2, Planning 3 (US-25 + F4/F5, real Planning Poker round) | Đạt (Leader S3) | 06/11 |

## 4. Risks and issues (top)
| ID | Item | Status | Response |
|---|---|---|---|
| R12 / I-02 | F2 book screens and CR-06 code started late | Open | Foundations delivered first; drop order NFR-04 polish → US-07 (returned to backlog, not hidden) |
| R05 / I-03 | CR-06 adds 5 SP / 8.5 h to S2 | Occurred | Rebaseline v1.1; S2 sized by hours |
| R11 | Staff remove rights and session handling not specified in the CR | Closed 05/11 | Team decision recorded in c4: no remove for Staff; new role at next login |
| I-04 | No Planning Poker voting rounds so far | Open | Real round at Planning 3 |

## 5. Help needed from the Sponsor
None this week. CR-06 details that the CR text left open were decided by the team (PO) and recorded in the c4 form §4.
