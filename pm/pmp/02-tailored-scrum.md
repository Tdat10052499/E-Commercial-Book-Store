# PMP Part 2 – Tailored Scrum Process

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 (TA) | 02/10/2026 | Team 6 | Scrum for the Team Assignment: one 2-week Sprint, 4 h/member/day, Slack #decisions, Jira board [TA Process.docx] |
| 1.0-FP-draft | 30/10/2026 | Hồ Du Tuấn Đạt (AI-assisted) | Adapted to the Final Project: 1-week Sprints Fri→Thu (N = 3), leader rotation S1/S3 vs S2 = PO, time tracking per task, CR/CCB step, Git PR review [03 §4–§5] |

## 2.1 Roles and people
| Role | Person | Responsibilities |
|---|---|---|
| Sponsor / Customer | Dr. Bùi Minh Phụng (Ms. Le) | Approves PMP v1.0, issues CRs, chairs CCB, attends Reviews, signs UAT |
| Product Owner (fixed) + Developer | Nguyễn Minh Chính *(to confirm)* | Orders backlog, writes/clarifies ACs, accepts items as Done, represents team at CCB |
| Sprint Leader / Scrum Master | S1 Hồ Du Tuấn Đạt · S2 Nguyễn Minh Chính · S3 Hồ Du Tuấn Đạt *(to confirm)* | Runs Planning, Daily, Retro; keeps board current; submits Sprint files; presents Review |
| Developers | Both | Split tasks, estimate hours, build, test, log actual hours |

## 2.2 Events and timeboxes
| Event | When | Timebox | Output |
|---|---|---|---|
| Sprint Planning | Friday after Review (S1: 28/10 catch-up) | ≤ 45 min | Sprint Goal, capacity, items, tasks ≤ 1 person-day in Excel `Sx_Backlog`, then Jira |
| Daily Scrum | Every working day, asynchronous allowed (channel TBD: Zalo/Teams/Slack) | ≤ 10 min | Daily log (yesterday / today / blockers / hours logged) |
| Backlog refinement | Mid-Sprint (Tuesday) | 30 min | Next items meet DoR; Planning Poker for new/changed items |
| Sprint Review | Friday in class | with Retro 30 min + ~10 min presentation | Demo against ACs, burndown, plan vs actual hours |
| Sprint Retrospective | Friday in class after Review | (incl. above) | ≥ 2 action items tracked in the next Sprint |
| CCB meeting | When a CR is issued (CR-06: 30/10) | 15 min | Approve / Reject / Defer with reason |

## 2.3 Artifacts
Product Backlog (`pm/backlog/product-backlog.md` → Workbook sheet), Sprint Backlog per Sprint, Increment on the hosted URL, burndown (Jira + Workbook), Daily log, Risk Register, Issue Log, Change Log, Config Items, EVM sheet; DoR and 3-level DoD (PMP-4).

## 2.4 Tools
| Purpose | Tool |
|---|---|
| Board, estimates, actual hours | Jira Software Cloud (Free, team-managed, key BOOK) – lecturer invited as Reader (TBD) |
| Planning workbook | Excel `HK261_SPM_FP_Team6_c2_SprintBacklog_Sx.xlsx` (cumulative) |
| Source & configuration | GitHub repo `Tdat10052499/E-Commercial-Book-Store`, PR review |
| Hosting | Free tier (decided at P04) |
| Communication | Daily channel TBD; email to Sponsor; class meetings |

## 2.5 Tailoring decisions and related risks
| Decision | Reason | Risk introduced | Mitigation |
|---|---|---|---|
| 1-week Sprints, Fri→Thu | Fixed by the brief | Little buffer per Sprint | Small tasks (≤ 1 person-day), daily re-plan |
| Asynchronous Daily Scrum allowed | 2 members, different schedules | Blockers noticed late | Log template; 24 h response rule (PMP-7) |
| PO is also a Developer and Leader S2 | Team of 2 [03 §4.1] | Conflict between accepting and building | Story-DoD checked by the *other* member |
| Excel first, then Jira | Required by the brief [03 §4.2] | Data inconsistency | Leader reconciles Excel and Jira each Planning |
| Code review by the only other member | 2 members | Review delays block merges | Review within 12 h; small PRs |
| AI assistance for drafting | Allowed with declaration [03 §4.2] | Content not understood by members | Every AI-assisted change logged in `pm/ai-usage-log.md` and reviewed in PR |
