# Sprint 3 – Sprint Report

| Field | Value |
|---|---|
| Sprint | S3 – Complete & acceptance · Fri 06/11 – Thu 12/11/2026 |
| Sprint Goal | "Customers open book details and search/filter by title, author, category and price range together with pagination; Release v1.0 passes UAT." [03 §5] |
| Sprint Leader | Hồ Du Tuấn Đạt |
| Product Owner | Nguyễn Minh Chính |
| Repository | https://github.com/Tdat10052499/E-Commercial-Book-Store |
| Jira board | https://tdat100524.atlassian.net/jira/software/projects/ECBS/boards/2 (ECBS-147…176) |
| Hosted URL | https://pagetunnel.vercel.app/ |
| Data as of | **12/11/2026 18:55 (D7, GMT+7)**, before the Sprint Review video. Hours of the last tasks (T17, T19, T21, T22, D7) are added at the Sprint end; the D6 snapshot (11/11 19:00) is kept for comparison |

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 0.1-draft | 11/11/2026 | Hồ Du Tuấn Đạt (AI-assisted) | Structure and a D6 snapshot (EVM, burndown, status) from Jira (read 11/11 18:40), the Sprint Backlog and `po-acceptance.md`; final values TBD after the last acceptance (S3-T21) |
| 0.2 | 12/11/2026 | Hồ Du Tuấn Đạt (AI-assisted) | D7 values (18:55): status, EVM from Jira hours (20.23 h S3) and 60/62 SP accepted, burndown D6–D7, interpretation, CR-07 pending; Review 3 / Retro 3 after the video |

## Status summary (Green / Amber / Red) – 12/11 18:55
| Area | Status | Evidence |
|---|---|---|
| Scope | Green | All 5 S3 items built, hosted-tested (runner ≠ writer) and accepted 12/11 (US-11, US-12, US-13, NFR-05, US-25: 15 SP, PR #61); the 7 S2 carry-overs accepted (24 SP; NFR-04 re-accepted 12/11 after DEF-S3-03). Cumulative **60/62 SP**; NFR-03 (2 SP) can only be checked on 17/11 |
| Schedule | Amber | SPI **0.97** (60/62 SP). Burndown D7 10.5 h left at 18:55: the S3 closing documents (T17, T19, T21, T22), Daily D7, and Daily D2, D3 that were not held |
| Cost | Green | CPI **1.50**: 85.23 h logged for 132 h planned. S3 used 20.23 h of 39.5 h planned – part of the test runs and documents were AI-assisted (logged in `pm/ai-usage-log.md`) |
| Quality | Green | 114/114 automated tests (`develop`, 12/11); every hosted case Pass (TC-F4/F5/US-25 14/14, NFR-05 medians 0.50 s and 0.38 s, smoke 15/15); DEF-S3-01, -02, -03 found and fixed in the Sprint (DEF-S3-03 was a regression of the UI work outside the backlog) |
| Process | Amber | Daily D2, D3 not held; T01 done 5 days late; PRs #47–#50 merged without approval (I-06); from Retro 2 (11/11): runner ≠ writer applied (Run by column), Done + hours the same day |

## EVM – Sprint 3 (n = 3, N = 3, baseline v1.1)
Formulas [03 §6.4]. Baseline v1.1: BAC = 132 h × 200,000 = 26,400,000 VND; PSP = 62 SP. At the end of the last Sprint PV = BAC.

| Metric | Formula | D6 snapshot (11/11 19:00) | D7 (12/11 18:55) |
|---|---|---|---|
| PV | BAC × 3/3 | 26,400,000 VND | 26,400,000 VND |
| SP meeting DoD (cumulative) | accepted items | **40 SP** = 21 (S2 end) + 19 (09/11: US-05, 06, 08, 09, 24) | **60 SP** = 45 (10/11) + 15 (12/11: US-11, 12, 13, NFR-05, US-25); NFR-04 re-accepted 12/11 |
| EV | BAC × SP / 62 | 17,032,258 VND | **25,548,387 VND** |
| AC | hours × 200,000 | 78.57 h (S1 41 · S2 24 · S3 13.57 Jira) → 15,713,333 VND | **85.23 h** (S1 41 · S2 24 · S3 20.23 Jira, read 12/11 18:55) → **17,046,000 VND** |
| SV / SPI | EV − PV / EV ÷ PV | −9,367,742 VND / **0.65** | −851,613 VND / **0.97** |
| CV / CPI | EV − AC / EV ÷ AC | +1,318,925 VND / **1.08** | +8,502,387 VND / **1.50** |
| EAC / ETC | BAC ÷ CPI / EAC − AC | 24,355,667 / 8,642,333 VND | 17,614,200 / 568,200 VND |

Interpretation (12/11 18:55): the Release is **on schedule except NFR-03** (SPI 0.97: 2 SP that can only be checked on 17/11) and **under budget** (CPI 1.50). The high CPI means the team logged fewer hours than planned for S3 (20.23 of 39.5 h): estimates were high for work that was partly AI-assisted, and late logging (e.g. the 09/11 talk logged on 11/11) shows that some hours may still be missing. **CR-07** (PO, 12/11) asks the CCB on 13/11 to re-baseline the S3 SP after Planning Poker Session 3 (PSP 62 → 68; then 66/68 SP, SPI 0.97, CPI 1.50); until the CCB decides, baseline v1.1 is used.

## Burndown (task hours, plan vs actual – no ideal line)
Source: `tools/s3_tracker.py` reading `sprint-backlog.md`; chart `evidence/burndown-S3.png`.

| Day | Plan remaining h | Actual remaining h | What happened |
|---|---|---|---|
| Start | 39.5 | 39.5 | 31 tasks incl. 7 Daily |
| D1 Fri 06/11 | 37.5 | 39 | Daily D1 only; S3-T01 (Review 2 / Retro 2 / Planning 3) not completed |
| D2 Sat 07/11 | 31.5 | 39 | No task done; Daily D2 not held |
| D3 Sun 08/11 | 26 | 35 | T05, T07 (US-25) |
| D4 Mon 09/11 | 21 | 25.5 | Catch-up: T04, T06, T08, T09, D4 (−9.5 h) |
| D5 Tue 10/11 | 14.5 | 25 | Daily D5 only; T11 moved to D6 (I-07) |
| D6 Wed 11/11 | 7.5 | 17.5 | T01 (Retro 2, Planning Poker), T10, T11 (I-07), D6; release #50 at 21:00 (−7.5 h) |
| D7 Thu 12/11 | 0 | 10.5 (18:55) | T02, T03, T12–T16, T18, T20, T23 Done; left: T17, T19, T21, T22, D7 (+ D2, D3 not held) |

Why the line looks like this and what the team did: flat on D1–D2 (T01 not done, Daily D2 and D3 not held, PRs waiting) and on D5 (Đạt busy, I-07); big drops on D4 (−9.5 h, PRs merged) and D6 (−7.5 h: T11 built, conflict of #38 solved, release #50, Retro 2 and Planning Poker held); on D7 the remaining test runs and acceptance were done on D7 itself (Retro 2 action A4), so the line does not fall all at once on the last day as in S2. It cannot reach 0: Daily D2 and D3 were not held and are kept as deviations.

## Plan vs actual (Sprint 3)
| | Plan | Actual |
|---|---|---|
| Items / SP | 5 S3 items / 15 SP + 7 S2 carry-overs (24 SP) | 5 / 15 SP + 7 / 24 SP accepted (cumulative 60/62 SP) |
| Tasks | 30 rows (23 tasks + 7 Daily) / 39.5 h | 23 of 30 Done at 18:55; T17, T19, T21, T22, D7 on D7; D2, D3 not held |
| Task hours | 39.5 h | 20.23 h in Jira (Đạt 8.90, Chính 11.33) at 18:55; last tasks to add |
| Test cases | ≥ 1 per AC for US-11, 12, 13, NFR-05, US-25 | 16 cases (writer Chính), all run on the host by Đạt: 15 Pass, TC-CR-08 Partial (no rename screen; covered by `audit.test.js`) |
| Defects | 0 open High | 0 open: DEF-S3-01, DEF-S3-02, DEF-S3-03 (all Low) fixed and closed in the Sprint |
| Release | `v1.0` tag + release notes | Release notes 1.0 final; tag `v1.0` on `main` after the last release PR (S3-T19) |

## Review 3 and Retrospective 3
Filled after the Sprint Review (video) and the Retro: demo per AC, PO acceptance, notes taken by the secretary, actions with owners. **TBD**.
