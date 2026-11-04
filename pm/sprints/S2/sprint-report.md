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
| Schedule | Red | Burndown 39.75 h → 30.75 h by day 4 against an ideal of 9.9 h; S1 velocity 0 SP; tasks entered in Jira only on 05/11 (issue I-02, Retro 1 action A3 not met) |
| Cost | Amber | AC for S2 not known until members log Completed Work; EV = 0 (see EVM) |
| Quality | Amber | 43/43 automated tests pass (27 new + 16 F1 regression); 28/28 ACs have a test case; 0 defects; hosted run of F2/F3 and F1 part 2 not done yet |
| Change | Green | CR-06 processed in 5 steps: Change Log → impact analysis → CCB 30/10 Approve (Option B) → baseline v1.1 + tags → stakeholders informed (c4, Weekly Status, Jira) |

## EVM snapshot – Sprint 2 (n = 2, N = 3, baseline v1.1, data as of 05/11/2026 00:30)
Formulas [03 §6.4]. Baseline v1.1: BAC = 132 h × 200,000 = 26,400,000 VND; PSP = 62 SP.

| Metric | Formula | Value |
|---|---|---|
| PV | BAC × n / N = 26,400,000 × 2/3 | 17,600,000 VND |
| SP meeting DoD (cumulative) | F1 items In Review (18 SP), S2 items In Review / To Do | **0 SP** |
| EV | BAC × 0 / 62 | 0 VND |
| AC | (19.5 h S1 + S2 hours from Jira) × 200,000 | 3,900,000 VND + TBD (S2 hours not logged yet) |
| SV | EV − PV | −17,600,000 VND |
| CV, SPI, CPI, EAC, ETC | EV − AC, EV / PV, EV / AC, BAC / CPI, EAC − AC | SPI = 0.00; CPI and EAC not meaningful while EV = 0 |

Interpretation: work exists (F1 deployed, F2/F3 foundations in PR #8) but no item has passed the Story DoD, because merge, hosted test and PO acceptance are the last steps and the team leaves them to the end. **Scenario, not actual:** if the 6 F1 items and the 5 S2 items in PR #8 (32 SP) are accepted, EV = 26,400,000 × 32/62 = 13,625,806 VND and SPI = 0.77. The main lever is therefore not more coding but closing items: review → merge → hosted test → acceptance.

## Plan vs actual (Sprint 2)
| | Plan | Actual (05/11 00:30) |
|---|---|---|
| Items / SP committed | 9 items / 29 SP | 0 SP Done; 14 SP In Review; 15 SP To Do |
| Task hours | 39.75 h (Đạt 16.25 · Chính 23.5 after re-assignment; Chính's own plan was 20) | TBD – from Jira Completed Work |
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
