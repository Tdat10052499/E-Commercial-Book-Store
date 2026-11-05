# Sprint 1 Report – Plan baseline & F1

| Item | Value |
|---|---|
| Team | Team 6 "Page Turners" |
| Sprint | S1, 23/10 – 29/10/2026 |
| Sprint Leader | Hồ Du Tuấn Đạt |
| Product Owner | Nguyễn Minh Chính |
| Repository | https://github.com/Tdat10052499/E-Commercial-Book-Store |
| Jira board | https://tdat100524.atlassian.net/jira/software/projects/ECBS/boards/2 (project ECBS) |
| Hosted URL | https://pagetunnel.vercel.app/ (Vercel + Supabase) |

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 1.0-draft | 30/10/2026 | Hồ Du Tuấn Đạt (AI-assisted) | First report. Actual hours, burndown, Daily log and Retro content to be filled by the team |
| 1.1-draft | 01/11/2026 | Hồ Du Tuấn Đạt (AI-assisted) | Hosted URL and hosted test status added; CR-06 recorded in Change Log only (analysis and CCB in Sprint 2) |
| 1.2 | 02/11/2026 | Nguyễn Minh Chính (PO, AI-assisted) | Jira board added; actual hours from Jira worklogs (19.5 h vs 48 h); cost status; T04, T09, T11 reassigned to Đạt |
| 1.3 | 02/11/2026 | Hồ Du Tuấn Đạt (AI-assisted) | Merged with the lecturer's Review/Retro template; EVM snapshot for S1; hours re-checked in Jira; formatted for submission |

## Status summary (Green / Amber / Red)
| Area | Status | Evidence |
|---|---|---|
| Scope | Amber | F1 implemented and deployed to https://pagetunnel.vercel.app/. Local automated run: 21/21 executed ACs pass (3 hosting ACs need the live site). Hosted manual run so far: 5 Pass, 1 Partial, 18 still to run. Jira (02/11): 6 F1 stories (18 SP) In Review, 10/14 tasks Done |
| Schedule | Red | Sprint 1 artefacts not complete at 29/10 23:59 (issue I-01) |
| Cost | Red | 19.5 h logged vs 48 h plan for S1 tasks; AC = 3,900,000 VND vs PV = 8,000,000 VND. EV = 0 until the F1 stories meet the DoD (hosted run + PO acceptance), so SPI = CPI = 0 at 02/11 (see EVM snapshot). Hours were reconstructed after the Sprint |
| Quality | Green | 16/16 unit/integration tests, 18/18 e2e checks pass locally; defect DEF-F1-01 found and fixed; 0 open defects |
| Change | Info | CR-06 received Tue 27/10 and recorded in the Change Log; impact analysis and CCB are Sprint 2 work [03 §6.1-8, §6.2-3] |

## EVM snapshot at the end of Sprint 1 (n = 1, N = 3, data as of 02/11/2026)
Formulas [03 §6.4]. BAC = 120 h (plan) × 200,000 VND = 24,000,000 VND; PSP = 55 SP (PMP-3 §3.5–3.6).

| Metric | Formula | Value |
|---|---|---|
| PV | BAC × n / N = 24,000,000 × 1/3 | 8,000,000 VND |
| SP meeting DoD | Jira: US-01…04, NFR-01, NFR-03 are In Review, PO acceptance pending | 0 SP (actual velocity S1 = 0 SP) |
| EV | BAC × 0 / 55 | 0 VND |
| AC | 19.5 h × 200,000 (Jira Time spent) | 3,900,000 VND |
| SV / CV | EV − PV / EV − AC | −8,000,000 / −3,900,000 VND |
| SPI / CPI | EV / PV / EV / AC | 0.00 / 0.00 |
| EAC / ETC | BAC / CPI / EAC − AC | not meaningful while CPI = 0 |

Interpretation: the increment exists and passes the local tests, but no item has passed the Story DoD yet, so no value is earned. If the PO accepts the 6 F1 items (18 SP) after the hosted run, EV would become 24,000,000 × 18/55 = 7,854,545 VND (SPI ≈ 0.98, CPI ≈ 2.01). That is a scenario, not an actual. The low AC (19.5 h vs 48 h) is partly real (AI-assisted drafting was fast) and partly uncertain, because the hours were reconstructed from memory after the Sprint; the team treats it as a data-quality risk and logs hours daily from S2 (action A3).
