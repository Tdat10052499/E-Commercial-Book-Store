# PMP Part 5 – Risk Management Plan

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 1.0-draft | 30/10/2026 | Hồ Du Tuấn Đạt | New; inputs from gap analysis [05 §5]. **P and I scores are proposals to be confirmed by the team** |
| 1.1 | 04/11/2026 | Nguyễn Minh Chính (Leader S2) | S2 monitoring [03 §6.2-5]: R04 closed (Jira time tracking works, 17 worklogs); R05 occurred → I-03; R06 occurred for Planning Poker → I-04; R08 re-scored (P 2 → 3); R03, R10 status updated; R11 (unclear Staff scope) and R12 (late integration of F2) added; I-01 updated, I-02…I-04 opened |
| 1.2 | 06/11/2026 | Nguyễn Minh Chính (Leader S2) | Sprint 2 end: R12 occurred → I-02 closed (F2 and CR-06 delivered 05/11 22:52); I-06 added (PRs without recorded review, Đạt's hours not logged); I-05 kept open |
| 1.3 | 06/11/2026 | Nguyễn Minh Chính (Leader S2) | I-06: Đạt's S2 hours logged in Jira 06/11 |
| 1.4-draft | 11/11/2026 | Hồ Du Tuấn Đạt (AI-assisted) | I-07 added (R09 occurred: Đạt busy on 10/11, S3-T11 moved to D6) – S3-T17 |
| 1.5-draft | 11/11/2026 | Hồ Du Tuấn Đạt (AI-assisted) | I-05 closed: Daily channel Discord at 22:00 (Daily D6) |
| 1.6-draft | 11/11/2026 | Hồ Du Tuấn Đạt (AI-assisted) | I-04 closed: Planning Poker Session 3 held 11/11 |

## 5.1 Process
1. **Identify** at Planning, Daily (blockers) and Retro; anyone may add a risk.
2. **Assess** probability P (1–5) and impact I (1–5); score = P × I. 1–6 Low, 8–12 Medium, 15–25 High.
3. **Plan response:** Avoid, Mitigate, Transfer, Accept; each risk has an owner and a trigger.
4. **Monitor** every Sprint (status Open / Watching / Occurred / Closed). When a risk occurs it moves to the **Issue Log** with the action taken [03 §6.2-5].
5. **Report** the top risks in each Sprint Review and Weekly Status Report.

## 5.2 Risk register v1.1 (status at 04/11/2026; v1.0 status 30/10 in brackets where changed)
| ID | Risk (cause → event → effect) | Cat. | P | I | P×I | Strategy & response | Owner | Trigger | Status |
|---|---|---|---|---|---|---|---|---|---|
| R01 | Only 2 members must deliver F1–F5 plus heavy PM documentation → workload exceeds capacity → items slip | Resource | 4 | 4 | 16 | Mitigate: tasks ≤ 1 person-day, capacity-based plan, fast drafting with review | Leader | Burndown flat for 2 days | Occurred → I-01 |
| R02 | Lab 1/Lab 2/TA week 2 not submitted → PMP must be written from scratch → S1 late | Schedule | 5 | 3 | 15 | Mitigate: reuse TA files, draft PMP early | Leader S1 | PMP not ready 24 h before deadline | Occurred → I-01 |
| R03 | Free host sleeps (cold start) → list page > 2 s or lecturer cannot open site | Technical | 3 | 4 | 12 | Mitigate: pick host without long sleep or add keep-alive ping; measure warm & cold | Đạt | First load > 5 s | Watching – Vercel (serverless) + Supabase chosen; list-page timing NFR-05 measured in S3 |
| R04 | Jira Free lacks time tracking fields → no actual hours → EVM AC invalid | Tool | 2 | 5 | 10 | Mitigate: verify in S1; fallback: hours sheet in Workbook | Leader | Fields missing on issue | **Closed** 02/11 – Jira Free supports Original Estimate and worklogs (17 worklogs logged) |
| R05 | CR-06 approved → extra scope and F1 rework → S2 overloaded | Scope | 4 | 3 | 12 | Mitigate: ≥ 2 options at CCB incl. phased delivery; rebaseline PSP/BAC | PO | CCB Approve | **Occurred** 30/10 → I-03 (was Open) |
| R06 | Planning Poker evidence or regular commits missing → B4, S5 and individual factor reduced | Quality/Process | 3 | 4 | 12 | Avoid: photo of each reveal; commit at least daily per member | Both | No commit by a member in 2 days | **Occurred** (Planning Poker) → I-04; commits: watching |
| R07 | eLearning dates differ from the brief → wrong item or time used for upload | Schedule | 3 | 3 | 9 | Mitigate: ask lecturer; submit by brief date | Leader | Upload slot not found | Open |
| R08 | Security defect (plain passwords, missing server-side role check) → AC/NFR fail at UAT | Quality | 3 | 5 | 15 | Avoid: bcrypt, server guards, permission tests | Đạt | Test fails | Open – P 2 → 3 with the Staff role (CR-06): permission matrix on the server, tests for every 403 (US-24/AC-02, AC-03) |
| R09 | A member is sick or busy with other exams → capacity drops | Resource | 3 | 3 | 9 | Mitigate: shared knowledge via PR reviews; buffer in S3 | Leader | Member reports unavailability | Open |
| R10 | Integration of F3/F4/F5 (pagination + search + Back) breaks state → F4/F5 ACs fail | Technical | 3 | 3 | 9 | Mitigate: keep page/filter in URL query from S2 | Chính | Back loses page in test | Watching – S2 grid keeps the page in `?page=` (US-10) |
| R11 | CCB did not answer whether Staff may remove categories/authors or whether role change ends open sessions → wrong permission built → rework at UAT | Scope | 3 | 3 | 9 | Avoid: team decision by the PO 05/11 (no remove for Staff; new role at next login), recorded in c4 and US-24/AC-05; implemented on the server | PO | UAT comment on Staff permissions | **Closed** 05/11 (new 04/11) |
| R12 | F2 book screens (US-05…07) and CR-06 code start late in S2 → little time for review, hosted test and fixes before 05/11 | Schedule | 4 | 4 | 16 | Mitigate: data model, seed, category/author and grid delivered first (PR #8); book form and Staff role on top; drop order NFR-04 polish → US-07 if needed | Leader S2 | Any F2/CR task not In Review by 05/11 12:00 | **Occurred** → I-02 (new 04/11) |

## 5.3 Issue Log (risks that occurred)
| ID | From risk | Date | Description | Impact | Action | Owner | Status |
|---|---|---|---|---|---|---|---|
| I-01 | R01, R02 | 30/10/2026 | Sprint 1 artefacts not completed in the repository by 29/10 23:59 | Possible late penalty (−10 % / 5 h); less time for F1 | Catch-up night 29–30/10; record submission time; discuss in Retro 1. eLearning upload window for S1 was 02/11 17:05–17:35; submission time to be confirmed by Leader S1 | Leader S1 | Open – confirm upload time; lesson for S2: action A2 (draft files by Wednesday) |
| I-02 | R12 | 04/11/2026 | No F2 commit in the repo by the evening of 04/11; Chính's category, author and grid tasks depended on the data model (S2-T07) | Chính's tasks blocked; S2 load shifts | PO took S2-T07 and S2-T13 (3.5 h): Chính 23.5 h planned (> 20 h capacity), Đạt 16.25 h; Đạt builds US-05…07 and US-24 on top of PR #8 | Leader S2 | Closed 05/11 22:52 – Đạt delivered US-05…07 and US-24 (PR #11, #12, #16); the late start left no time for the hosted admin run (24 SP In Review) |
| I-06 | R01, R06 | 05/11/2026 | PRs #8, #9, #11, #12, #16, #17 were merged without a recorded GitHub review; Đạt's S2 hours were logged only on 06/11, after the Sprint (13.5 h, reconstructed); the board was moved only on 05/11 | Rubric S3 (tracking) and S5 (PR review) weaker | From S3: approve the PR on GitHub before merging; move the card and log *Completed Work* the same day (action A3 again, owner Leader S3); Đạt logs S2 hours on 06/11. Board brought in line with GitHub by Chính 06/11 00:25 (Sprint 1 completed, Sprint 2 started) | Leader S3 | Open |
| I-03 | R05 | 30/10/2026 | CR-06 approved (Option B): +5 SP / +8.5 h in S2, +2 SP / +3.5 h in S3 | S2 commitment 29 SP vs expected velocity 18.3 SP and actual S1 velocity 0 SP | Rebaseline v1.1 (PSP 62, BAC 26.4 M); S2 sized by hours (39.75 h ≤ 40 h); drop order agreed | PO | Open – review at Review 2 |
| I-05 | R06 | 05/11/2026 | Daily Scrum channel not agreed (c1 v1.0 says Slack #daily-standup, PMP-2 source says TBD) and no Daily was logged in S1 or before 05/11 in S2 (Retro 1 action A1 not met) | Rubric S3 needs a Daily log; plan and practice differ | Team agrees the real channel at Review/Retro 2 (06/11); PMP-2, PMP-7 and the Daily logs updated to match; daily entries from S3 on | Leader S2 → Leader S3 | Closed 11/11 – Daily on Discord at 22:00, agreed at Daily D6 |
| I-04 | R06 | 30/10/2026 | Story points were set by the PO alone, without Planning Poker voting rounds | Rubric B4 needs a Planning Poker log | Hold a real Planning Poker round for the S3 items and US-25 at Planning 3 (06/11) and log the votes | PO | Closed 11/11 – Planning Poker Session 3 held with real votes (late, after the build; no photo). Lesson: vote before the work starts |
| I-07 | R09 | 10/11/2026 | Đạt was busy on Tue 10/11 (D5): S3-T11 (category + price filter, 2.5 h) did not start; S3-T10 (Chính) waited on a merge conflict and review. Burndown flat on D5 (25.5 → 25 h after sync) | S3-T11 moved to D6; S3-T14/T15 (hosted F5 run, NFR-05) start one day later; schedule risk for the S3 end (12/11) | T11 built 11/11 (PR #47, 114/114 tests); #38 conflict resolved; owner swap proposed for the test runs (runner ≠ writer); priority to the tasks that block others | Leader S3 | Open – close when #47 is merged and deployed |
