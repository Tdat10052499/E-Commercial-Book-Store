# Sprint 2 – Sprint Report

| Field | Value |
|---|---|
| Sprint | S2 – Execution, monitoring & change control · Fri 30/10 – Thu 05/11/2026 |
| Sprint Leader | Nguyễn Minh Chính |
| Product Owner | Nguyễn Minh Chính |
| Repository | https://github.com/Tdat10052499/E-Commercial-Book-Store (PR #8, #9 Chính; PR #11, #12, #16 Đạt – all merged into `develop` and `main`) |
| Jira board | https://tdat100524.atlassian.net/jira/software/projects/ECBS/boards/2 (project ECBS, sprint id 6) |
| Hosted URL | https://pagetunnel.vercel.app/ (Vercel + Supabase) |
| Data as of | 05/11/2026 23:59 (Sprint end, GMT+7); Đạt's S2 hours reported 06/11 (13.5 h) |

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 1.0-draft | 05/11/2026 | Nguyễn Minh Chính (Leader S2) | First S2 report: status, EVM snapshot on baseline v1.1, plan vs actual, change control summary. Actual S2 hours, Daily log and Review/Retro 2 content: TBD (team) |
| 1.1 | 06/11/2026 | Nguyễn Minh Chính (Leader S2) | Final S2 status at the Sprint end: all items built and deployed, PO accepted US-10 and NFR-02, hosted run of public pages, EVM recalculated (19 SP, SPI 0.46, CPI 0.79 provisional) |
| 1.2 | 06/11/2026 | Hồ Du Tuấn Đạt | Đạt's S2 hours added (9 tasks × 1.5 h = 13.5 h, reported 06/11, reconstructed); AC 13.0 M, CPI 0.62, EAC 42.4 M; TC-F1-19 passed on the hosted DB |

## Status summary (Green / Amber / Red) – at the Sprint end, 05/11/2026 23:59
| Area | Status | Evidence |
|---|---|---|
| Scope | Amber | All 9 committed items (29 SP) are **built, merged and deployed** (PR #8 Chính; PR #11, #12, #16 Đạt). PO accepted **US-10 and NFR-02 (5 SP)**; 7 items (24 SP) stay In Review until their hosted admin/Staff cases pass. CR-06 US-24 built in S2 as planned (Option B) |
| Schedule | Red | Most work was merged on the last day (12:55 and 22:52 on 05/11); burndown 39.75 → 30.75 h on day 4 → **6.25 h** on day 5; actual velocity S2 = 5 SP vs 29 SP planned; Jira board updated only from 05/11 |
| Cost | Red | EV 8.09 M vs AC 13.0 M VND → **CPI 0.62**; EAC 42.4 M vs BAC 26.4 M. Đạt's 13.5 h are reported by the member (reconstructed) and still to be logged in Jira |
| Quality | Green | `npm test` on `develop`: **71/71 pass**; 33/33 ACs have a test case; hosted run 7 Pass / 0 Fail; 2 UI defects (DEF-F2-01, DEF-F2-02) found on the host and fixed the same evening; F1 regression automated 16/16 |
| Change | Green | CR-06 processed in 5 steps; US-24 built; team decisions on the open details recorded in c4 |

## EVM snapshot – Sprint 2 (n = 2, N = 3, baseline v1.1, data as of 05/11/2026 23:59)
Formulas [03 §6.4]. Baseline v1.1: BAC = 132 h × 200,000 = 26,400,000 VND; PSP = 62 SP.

| Metric | Formula | Value |
|---|---|---|
| PV | BAC × n / N = 26,400,000 × 2/3 | 17,600,000 VND |
| SP meeting DoD (cumulative) | F1: US-01…04 (14 SP) · S2: US-10, NFR-02 (5 SP) | **19 SP** |
| EV | BAC × 19 / 62 | 8,090,323 VND |
| AC | (41 h S1 + 24 h S2: Chính 10.5 · Đạt 13.5) × 200,000 | 13,000,000 VND |
| SV / SPI | EV − PV / EV ÷ PV | −9,509,677 VND / **0.46** |
| CV / CPI | EV − AC / EV ÷ AC | −4,909,677 VND / **0.62** |
| EAC / ETC | BAC ÷ CPI / EAC − AC | 42,421,053 / 29,421,053 VND |

Interpretation: **behind schedule (SPI 0.46) and over budget for the value earned (CPI 0.62)**. The increment is much further along than EV shows: every S2 item is built and deployed, but only 5 SP passed the PO acceptance because the hosted admin run was left to the last hour. Root cause: integration and testing at the end of the Sprint (issue I-02, I-06). **Scenario, not actual:** if the 24 SP in review pass their hosted cases at Review 2, cumulative EV = 26,400,000 × 43/62 = 18,309,677 VND and SPI = 1.04. With Đạt's 13.5 h added, CPI fell from 0.79 to 0.62; EAC would fall again once the 24 SP in review are accepted (scenario: CPI = 18,309,677 / 13,000,000 = 1.41).

## Plan vs actual (Sprint 2)
| | Plan | Actual (05/11 23:59) |
|---|---|---|
| Items / SP | 9 items / 29 SP | 9 built and deployed; **5 SP Done** (US-10, NFR-02); 24 SP In Review → Sprint 3 |
| Tasks | 23 tasks / 39.75 h | 19 Done · 4 In Progress (T01, T02, T06, T23) |
| Task hours | 39.75 h (Đạt 16.25 · Chính 23.5 after re-assignment) | **24 h**: Chính 10.5 h (Jira) · Đạt 13.5 h (9 × 1.5 h, reported 06/11) |
| Test cases | ≥ 1 per AC | 33/33 ACs (+ 24 F1 regression); 71/71 automated pass; hosted 7 Pass / 0 Fail, admin cases pending |
| Defects | 0 open High | 2 found (Medium, Low), both fixed |
| CR-06 | CCB, rebaseline, c4, US-24 | All done; US-24 In Review |

## Change control summary (CR-06)
| Step [03 §6.2-3] | Result | Where |
|---|---|---|
| 1. Change Log | Recorded 30/10 | `pm/change/change-log.md`, Workbook sheet ChangeLog |
| 2. Impact analysis | +2 items, +7 SP, +12 h, +2.4 M VND; rework US-03/US-04; 3 options | `pm/change/CR-06-impact-analysis.md`, c4 |
| 3. CCB | 30/10/2026 – **Approve, Option B** (US-24 S2, US-25 S3) | c4 §4 |
| 4. Rebaseline + tag | Product Backlog v1.2 (PSP 62), Release Plan v1.3 (BAC 26.4 M), risk register v1.1; tags `baseline-v1.0`, `baseline-v1.1` | repo, Workbook |
| 5. Communication | Sponsor: c4 + Weekly Status (S2 submission, Review 2); team: Jira (US-24 → Sprint 2, US-25 → Sprint 3), PR, hand-over note 05/11 | PMP-7 |
| Implementation | US-24 built in PR #11 (Staff role, permission matrix, 403 on delete and accounts), 5 CR test cases in PR #12; US-25 planned for S3 | `test-cases-F2F3.md` |
