# Weekly Status Report – Week 2 (Sprint 2)

**Project:** E-Commercial Book Store – Release 1.0 · **Team:** 6 "Page Turners" · **To:** Sponsor Dr. Bùi Minh Phụng (Ms. Le) · **From:** Nguyễn Minh Chính (Leader S2, PO) · **Period:** 30/10 – 05/11/2026 · **Data as of:** 05/11/2026 23:59 (GMT+7) [03 §6.2-4, PMP-7 §7.1]

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 04/11/2026 | Nguyễn Minh Chính | First weekly status report (S2), data as of 04/11 23:50 |
| 1.1 | 05/11/2026 | Nguyễn Minh Chính | F1 hosted run part 2 and acceptance of US-01…04; Chính's hours; CR-06 details decided by the team |
| 1.2 | 06/11/2026 | Nguyễn Minh Chính | Status at the Sprint end: all S2 items built and deployed, US-10 and NFR-02 accepted, EVM recalculated |
| 1.3 | 06/11/2026 | Hồ Du Tuấn Đạt, Nguyễn Minh Chính | Đạt's S2 hours logged in Jira (13.5 h); NFR-01 accepted by the PO (TC-F1-19 Pass); EVM: SPI 0.51, CPI 0.69 |

## 1. Overall status: **Amber**
Every Sprint 2 item – F2 book, category and author management, F3 book grid and the CR-06 Store Staff role – is built, merged and live on https://pagetunnel.vercel.app/. Only 5 of 29 SP are accepted, because the hosted test of the admin screens is still open.

| Area | Status | Evidence |
|---|---|---|
| **Scope** | Amber | 9/9 committed items built and deployed (PR #8, #11, #12, #16). PO accepted US-10 and NFR-02 (5 SP); US-05…09, NFR-04 and US-24 (24 SP) In Review → hosted admin run at Review 2, then Sprint 3 |
| **Schedule** | Red | Most code merged on the last day; burndown 39.75 → 6.25 h; actual velocity S2 5 SP vs 29 SP planned; SPI 0.51 |
| **Cost** | Red | BAC 26.4 M VND; PV 17.6 M; EV 8.94 M (21 SP cumulative); AC 13.0 M (65 h) → **CPI 0.69**, EAC 38.4 M |
| **Quality** | Green | 71/71 automated tests pass; 33/33 ACs have a test case; hosted run 7 Pass, 0 Fail; 2 UI defects found on the host and fixed the same day; 0 open defects |

## 2. Done this week
- **CR-06:** CCB 30/10 approved Option B; baseline v1.1 (PSP 62 SP, BAC 26.4 M VND), tags `baseline-v1.0` and `baseline-v1.1`; c4 form; US-24 Store Staff role built (Staff adds and edits books and manages categories/authors; delete and account management return 403).
- **F2:** add, edit and hide books with cover upload (≤ 2 MB) and validation on client and server; manage categories and authors; 30 sample books in 6 categories.
- **F3:** responsive book grid, 12 per page, newest first, safe pagination (2/3/4 columns at 360/768/1280 px).
- **F1:** hosted run part 2 (21/24 Pass, 0 Fail) → US-01…04 accepted; TC-F1-19 Pass on the hosted DB (06/11) → NFR-01 accepted.
- **Tests:** 33 F2/F3/CR-06 test cases from the ACs + F1 regression; 71 automated tests.

## 3. Next (Sprint 3, 06/11 – 12/11, Leader Đạt)
| # | Action | Owner | Due |
|---|---|---|---|
| 1 | Hosted run of the admin and Staff cases (US-05…09, NFR-04 admin part, US-24) → PO acceptance of the 24 SP in review | Đạt + Chính | 06/11 (Review 2) |
| 2 | Log the S2 hours in Jira (Đạt) | Đạt | 06/11 |
| 3 | Planning 3 with a real Planning Poker round (US-11, US-12, US-13, NFR-05, US-25) | Đạt, PO | 06/11 |
| 4 | Build F4 (detail), F5 (search and filter), US-25 (last-updated audit); regression F1–F3 | Both | 11/11 |
| 5 | Release v1.0 (tag, release notes), UAT script | Đạt, Chính | 12/11 |

## 4. Risks and issues (top)
| ID | Item | Status | Response |
|---|---|---|---|
| I-02 / R12 | F2 book screens and CR-06 code started late | Closed 05/11 – delivered 22:52 | Lesson: merge small PRs every two days (Retro 2 action) |
| I-06 | PRs merged without a recorded GitHub review; Đạt's S2 hours logged only on 06/11 (after the Sprint); board moved late | Open | Review on GitHub before merge; log hours the same day (A3) |
| I-05 | Daily channel not agreed; Daily log incomplete | Open | Decide at Retro 2 |
| R05 / I-03 | CR-06 load in S2 | Occurred, handled | Phased option; all S2 CR work built |

## 5. Help needed from the Sponsor
None this week.
