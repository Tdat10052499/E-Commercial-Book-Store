# Lecturer templates [03 Appendix B]

| File | Received | Used for | Status |
|---|---|---|---|
| `FP_Template_Eval.xlsx` | 01/11/2026 | `c0_Eval_S#.xlsx` | In use since S1. The copy downloaded on 10/11/2026 has the same *Eval* sheet (checked cell by cell) plus a *Team_FinalProject* sheet with the class roster (student IDs, dates of birth, emails). The roster is **not** stored in this repo; the export keeps only the *Eval* sheet |
| `FP_Template_SprintReview_Retro.docx` | 01/11/2026 | Review/Retro record inside `c3` | In use since S1. The 10/11/2026 download is identical |
| `FP_Template_SprintReport.docx` | 10/11/2026 (downloaded by Nguyễn Minh Chính) | `c3_SprintReport_S#.docx` | **New** – use from Sprint 3 (S3-T23 export, S3-T21 report) |
| `SprintBacklog_Template.xlsx` | 10/11/2026 (downloaded by Nguyễn Minh Chính) | `c2_SprintBacklog_S#.xlsx` (cumulative workbook) | **New** – use from Sprint 3 (S3-T23 export, S3-T22 workbook). [03 Appendix B] calls it `FP_Template_ProjectWorkbook.xlsx` |

S1 and S2 files were submitted before these two templates were available, using the Review/Retro template and our own workbook layout. On 10/11/2026 they were re-exported into the new templates by `tools/export_templates.py` (S1, S2, S3) from the sources at the commits of the submitted files (S1 `04831ed`, S2 `469d2b9`), so no figure changes; the submitted versions stay in the git history at those commits. Sheets and parts the templates do not have are copied unchanged from the submitted files (c3: section 8 = Review/Retro record, section 9 = status, EVM, Weekly Status, Jira snapshot).

## FP_Template_SprintReport.docx – structure
Header `HK261_SPM_FP_Team#_c3_SprintReport_S#` → set to `Team6` and `S3`.

| Template part | Table | Source in this repo |
|---|---|---|
| Cover table (Team, Sprint dates, Leader – Scrum Master, PO, Members) | 5×2 | `plan/INPUTS.md` §1, `pm/sprints/S3/sprint-backlog.md` |
| Version history | 4×4 | Version history of the S3 files |
| 1. Sprint Planning – Goal, capacity, reference velocity, committed SP | 4×2 | `sprint-backlog.md` (Goal, Capacity) |
| 1. Sprint Backlog – ID, story, SP, task, owner, estimate, actual, state | 7×8 (add rows) | `sprint-backlog.md` task table |
| 2. Daily Scrum log – one row per member per day | 7×5 (add rows) | `pm/sprints/S3/daily-log.md` |
| 3. Sprint results – story, SP, AC passed x/y, DoD met, Done | 9×8 | `po-acceptance.md`, test case files |
| 4. Burndown chart + explanation of flat / rising / steep parts | 1×1 image | `tools/s3_tracker.py burndown` |
| 5. Risks and issues | 4×6 | Risk Register, Issue Log, Weekly Status S3 |
| 6. Changes in this Sprint – CR, CCB decision, actual impact | 3×4 | `pm/change/` |
| 7. Test cases from Acceptance Criteria | 6×6 (add rows) | `test-cases-F4F5.md` + regression |
| 10. Work allocation and hours – member, role, tasks, est. h, actual h, commits/PRs | 4×6 | `sprint-backlog.md`, GitHub |
| 11. Next Sprint plan | text | Release / UAT / Final plan |

Sections 8 and 9 are not in the template (numbering jumps from 7 to 10). The Sprint Review and Retrospective record (`FP_Template_SprintReview_Retro.docx`) fills that place, as an appendix of `c3`.

## SprintBacklog_Template.xlsx – structure
Yellow cells with blue text = input; black text = formula (do not edit); green rows = examples (remove).

| Sheet | Columns / formulas | Notes for our data |
|---|---|---|
| README | How to use | Keep |
| Team | Team, N = 3, **focus factor 0.8**; member, ID, fixed role, Leader of Sprint #, hours per Sprint; planned hours = hours × N; capacity per Sprint = Σ hours × focus factor | Our plan: 20 h per member per Sprint, already counted as focused hours (capacity 40 h per Sprint, `plan/INPUTS.md` §2). Set to **1.0** with a note, because 0.8 would give 32 h and break consistency with c1/c3 |
| ProductBacklog | Order, ID, Epic/Feature, User Story, MoSCoW, SP, AC (GWT, one per line), DoR, Sprint, Status, Related CR, Note; rows 5–40; totals PSP (Must + Should) and SP Done | 28 items fit |
| PlanningPoker | Date, Story, Round, votes M1–M3, Max, Min, Agreed SP, reasoning | 2 members → M3 empty. Votes only from the recorded log (`pm/backlog/`) |
| S1_Backlog / S2_Backlog / S3_Backlog | Task ID, Story, Task, Owner, Estimate, **remaining hours per task D1–D7**, Actual, State; Ideal and Actual remaining; line chart | Rows 5–29 = 25 tasks. S3 has 30 rows (23 tasks + 7 Daily) → extend the range and the formulas. Remaining per day = estimate while the task is not Done, 0 from its *Done on* day (same rule as the burndown we already report) |
| RiskRegister | ID, risk, cause, category, P, I (1–5), Score = P×I, Level (≥ 15 High, 8–14 Medium, < 8 Low), strategy, response, owner, trigger, status S1/S2/S3 | Check our P/I scale matches |
| IssueLog | ID, date, issue, risk ID, impact, action, owner, due, status | |
| ChangeLog | CR ID, received, requester, description, SP / hours / cost impact, decision, date, version, status | **Template bug:** cost formula is `=F5*Team!#REF!`. Fix with a rate cell (200,000 VND/h) on *Team* |
| ConfigItems | CI ID, name, type, location, owner, version, baseline/tag, last change | |

Not in the template but required by [03 Appendix B] or used in our earlier files: Release Plan, DoR, EVM, test cases, Weekly Status. They stay as extra sheets after the template sheets.
