# Sprint 2 – Sprint Report

| Field | Value |
|---|---|
| Sprint | S2 – Execution, monitoring & change control · Fri 30/10 – Thu 05/11/2026 |
| Sprint Leader | Nguyễn Minh Chính |
| Product Owner | Nguyễn Minh Chính |
| Repository | https://github.com/Tdat10052499/E-Commercial-Book-Store (PR #8 `feat/P15-catalogue` → `develop`) |
| Jira board | https://tdat100524.atlassian.net/jira/software/projects/ECBS/boards/2 (project ECBS, sprint id 6) |
| Hosted URL | https://pagetunnel.vercel.app/ (Vercel + Supabase) |
| Data as of | 05/11/2026 00:30 (GMT+7) – update the status column and the hours before upload |

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 1.0-draft | 05/11/2026 | Nguyễn Minh Chính (Leader S2, AI-assisted) | First S2 report: status, EVM snapshot on baseline v1.1, plan vs actual, change control summary. Actual S2 hours, Daily log and Review/Retro 2 content: TBD (team) |

## Status summary (Green / Amber / Red)
| Area | Status | Evidence |
|---|---|---|
| Scope | Amber | 5 of 9 committed items built (US-08, US-09, NFR-02, US-10, NFR-04 – 14 SP, In Review in PR #8); US-05, US-06, US-07 and US-24 (15 SP) To Do at 05/11 00:30. CR-06 approved and baselined |
| Schedule | Red | Burndown 39.75 h → 30.75 h by day 4 against an ideal of 9.9 h; F1: 14 of 18 SP accepted only on 05/11; tasks entered in Jira only on 05/11 (issue I-02, Retro 1 action A3 not met) |
| Cost | Red | CPI 0.58 (provisional – Đạt's S2 hours not logged yet): AC 10.3 M VND vs EV 5.96 M VND; S1 hours rose from 19.5 to 41 h after 21.5 h were logged on S1-T12 on 05/11 |
| Quality | Amber | 43/43 automated tests pass (27 new + 16 F1 regression); 28/28 ACs have a test case; 0 defects; F1 hosted run complete (21/24 Pass, 0 Fail, 3 not runnable yet); hosted run of F2/F3 not done yet |
| Change | Green | CR-06 processed in 5 steps: Change Log → impact analysis → CCB 30/10 Approve (Option B) → baseline v1.1 + tags → stakeholders informed (c4, Weekly Status, Jira) |

## EVM snapshot – Sprint 2 (n = 2, N = 3, baseline v1.1, data as of 05/11/2026 00:30)
Formulas [03 §6.4]. Baseline v1.1: BAC = 132 h × 200,000 = 26,400,000 VND; PSP = 62 SP.

| Metric | Formula | Value |
|---|---|---|
| PV | BAC × n / N = 26,400,000 × 2/3 | 17,600,000 VND |
| SP meeting DoD (cumulative) | US-01…US-04 accepted 05/11 (14 SP); NFR-01, NFR-03 In Review; S2 items In Review / To Do | **14 SP** |
| EV | BAC × 14 / 62 | 5,961,290 VND |
| AC | (41 h S1 + 10.5 h S2 so far) × 200,000 | 10,300,000 VND + Đạt's S2 hours (TBD) |
| SV | EV − PV | −11,638,710 VND |
| SPI | EV / PV | 0.34 |
| CV | EV − AC | −4,338,710 VND (provisional) |
| CPI | EV / AC | 0.58 (provisional) |
| EAC / ETC | BAC / CPI / EAC − AC | 45,614,286 / 35,314,286 VND (provisional) |

Interpretation: SPI 0.34 – behind schedule; CPI 0.58 – over budget for the value earned so far (the figures will fall further when Đạt's S2 hours are added, unless more items are accepted). Main cause: 21.5 h were spent on the F1 test task (S1-T12) and items are accepted late, so effort is spent before value is earned. Work exists (F1 deployed, F2/F3 foundations in PR #8), but items reach the Story DoD late because merge, hosted test and PO acceptance are left to the end; F1 was accepted only on 05/11. **Scenario, not actual:** if the 5 S2 items in PR #8 (14 SP) are also accepted, EV = 26,400,000 × 28/62 = 11,922,581 VND and SPI = 0.68. The main lever is therefore not more coding but closing items: review → merge → hosted test → acceptance.

## Plan vs actual (Sprint 2)
| | Plan | Actual (05/11 00:30) |
|---|---|---|
| Items / SP committed | 9 items / 29 SP | 0 S2 SP Done; 14 SP In Review; 15 SP To Do (F1 carry-over: 14 SP accepted 05/11) |
| Task hours | 39.75 h (Đạt 16.25 · Chính 23.5 after re-assignment; Chính's own plan was 20) | Chính 10.5 h (Jira, 05/11) · Đạt TBD |
| Test cases | ≥ 1 per AC (28) | 28 written; 18 pass locally, 10 blocked; hosted 0/28 |
| CR-06 | CCB 30/10, baseline update, c4 | Done (baseline v1.1, `baseline-v1.1`, c4) |

## Change control summary (CR-06)
| Step [03 §6.2-3] | Result | Where |
|---|---|---|
| 1. Change Log | Recorded 30/10 | `pm/change/change-log.md`, Workbook sheet ChangeLog |
| 2. Impact analysis | +2 items, +7 SP, +12 h, +2.4 M VND; rework US-03/US-04; 3 options | `pm/change/CR-06-impact-analysis.md`, c4 |
| 3. CCB | 30/10/2026 – **Approve, Option B** (US-24 S2, US-25 S3) | c4 §4 |
| 4. Rebaseline + tag | Product Backlog v1.2 (PSP 62), Release Plan v1.3 (BAC 26.4 M), risk register v1.1; tags `baseline-v1.0`, `baseline-v1.1` | repo, Workbook |
| 5. Communication | Sponsor: c4 + Weekly Status (S2 submission, Review 2); team: Jira (US-24 → Sprint 2, US-25 → Sprint 3), PR | PMP-7 |
