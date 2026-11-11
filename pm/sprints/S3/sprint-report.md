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
| Data as of | **TBD** (final). Snapshot below: 11/11/2026 19:00 (D6, GMT+7) |

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 0.1-draft | 11/11/2026 | Hồ Du Tuấn Đạt (AI-assisted) | Structure and a D6 snapshot (EVM, burndown, status) from Jira (read 11/11 18:40), the Sprint Backlog and `po-acceptance.md`; final values TBD after the last acceptance (S3-T21) |

## Status summary (Green / Amber / Red) – final: TBD
| Area | Status | Evidence |
|---|---|---|
| Scope | TBD | S3 items built: US-11, US-12, US-25, filter bar (merged); US-13 server filter PR #47 (in review at the snapshot). Accepted in S3: US-05, 06, 08, 09, 24 (19 SP, 09/11); US-07, NFR-04 and the S3 items: **TBD** |
| Schedule | TBD (Red at D6) | Burndown below; SPI at D6 snapshot 0.65 |
| Cost | TBD (Green at D6) | CPI at D6 snapshot 1.08 |
| Quality | TBD | 104/104 automated on `develop` 8ebbd0b (11/11), 114/114 with #47; hosted runs **TBD** |
| Process | TBD | Daily D2, D3 not held; PRs merged without approval (I-06); runner ≠ writer applied from D6 |

## EVM – Sprint 3 (n = 3, N = 3, baseline v1.1)
Formulas [03 §6.4]. Baseline v1.1: BAC = 132 h × 200,000 = 26,400,000 VND; PSP = 62 SP. At the end of the last Sprint PV = BAC.

| Metric | Formula | D6 snapshot (11/11 19:00) | Final (TBD) |
|---|---|---|---|
| PV | BAC × 3/3 | 26,400,000 VND | 26,400,000 VND |
| SP meeting DoD (cumulative) | accepted items | **40 SP** = 21 (S2 end) + 19 (09/11: US-05, 06, 08, 09, 24) | TBD |
| EV | BAC × SP / 62 | 17,032,258 VND | TBD |
| AC | hours × 200,000 | 78.57 h (S1 41 · S2 24 · S3 13.57 Jira) → 15,713,333 VND | TBD (S3 hours from Jira at the end) |
| SV / SPI | EV − PV / EV ÷ PV | −9,367,742 VND / **0.65** | TBD |
| CV / CPI | EV − AC / EV ÷ AC | +1,318,925 VND / **1.08** | TBD |
| EAC / ETC | BAC ÷ CPI / EAC − AC | 24,355,667 / 8,642,333 VND | TBD |

Upper bound if every S3 item and the two S2 carry-overs are accepted by the end: 60 SP (NFR-03 waits for TC-F1-24 on 17/11) → EV 25,548,387 VND, SPI 0.97. Interpretation: **TBD** (written from the final values).

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
| D6 Wed 11/11 | 7.5 | TBD | |
| D7 Thu 12/11 | 0 | TBD | |

Why the line looks like this and what the team did: **TBD** (Leader S3, from the final data).

## Plan vs actual (Sprint 3)
| | Plan | Actual |
|---|---|---|
| Items / SP | 5 S3 items / 15 SP + 7 S2 carry-overs (24 SP) | TBD |
| Tasks | 31 tasks / 39.5 h | TBD |
| Task hours | 39.5 h | TBD (Jira) |
| Test cases | ≥ 1 per AC for US-11, 12, 13, NFR-05, US-25 | TBD |
| Defects | 0 open High | TBD (DEF-S3-01, DEF-S3-02 fixed) |
| Release | `v1.0` tag + release notes | TBD (`pm/release/release-notes-v1.0.md`) |

## Review 3 and Retrospective 3
Filled after the Sprint Review (video) and the Retro: demo per AC, PO acceptance, notes taken by the secretary, actions with owners. **TBD**.
