# Project Management Plan, Part 2 – Tailored Scrum Process

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 (team assignment) | 02/10/2026 | Team 6 | Scrum for the earlier team assignment: one Sprint of two weeks, 4 hours per member per day, decisions recorded in a Slack channel, Jira task board |
| 1.0-draft for the Final Project | 30/10/2026 | Hồ Du Tuấn Đạt | Adapted to the Final Project: Sprints of one week from Friday to Thursday (3 Sprints), Sprint Leader rotating (Sprints 1 and 3 one member, Sprint 2 the Product Owner), time tracked per task, a change control step, review of every code change by the other member [03 §4–§5] |
| 1.1-draft | 01/11/2026 | Hồ Du Tuấn Đạt | Jira project name corrected to "ECBS" |
| 1.2 | 16/11/2026 | Nguyễn Minh Chính (Product Owner) | Final version: place and time of the daily meeting (Discord, 22:00) |
| 1.3 | 17/11/2026 | Hồ Du Tuấn Đạt | Rewritten in plain language without abbreviations; no change of content |

## 2.1 Roles and people
| Role | Person | Responsibilities |
|---|---|---|
| Sponsor and customer | Dr. Bùi Minh Phụng (as Ms. Le) | Approves the first version of the plan, issues change requests, chairs the Change Control Board, attends the Sprint Reviews, signs the acceptance test |
| Product Owner (fixed) and Developer | Nguyễn Minh Chính | Orders the Product Backlog, writes and clarifies the acceptance criteria, accepts items as Done, represents the team on the Change Control Board |
| Sprint Leader (acting as Scrum Master) | Sprint 1: Hồ Du Tuấn Đạt; Sprint 2: Nguyễn Minh Chính; Sprint 3: Hồ Du Tuấn Đạt | Runs the Sprint Planning, daily meetings and Retrospective; keeps the task board up to date; submits the Sprint documents; presents the Sprint Review |
| Developers | Both members | Split the work into tasks, estimate hours, build, test and log the hours actually spent |

## 2.2 Meetings and time limits
| Meeting | When | Time limit | Result |
|---|---|---|---|
| Sprint Planning | Friday after the Sprint Review (Sprint 1: catch-up on 28/10) | At most 45 minutes | Sprint Goal, available hours, selected items, tasks of at most one person-day, first in the Excel workbook and then in Jira |
| Daily meeting | Every day of the Sprint at 22:00 on Discord (from 11/11, an action of the Sprint 2 Retrospective); a written update is allowed | At most 10 minutes | Daily record: done yesterday, plan for today, blockers, hours logged |
| Backlog refinement | Middle of the Sprint (Tuesday) | 30 minutes | The next items meet the Definition of Ready; Planning Poker for new or changed items |
| Sprint Review | Friday in class | 30 minutes together with the Retrospective, plus about 10 minutes of presentation | Demonstration against the acceptance criteria, burndown chart, planned versus actual hours |
| Sprint Retrospective | Friday in class after the Sprint Review | Included above | At least two actions, followed up in the next Sprint |
| Change Control Board meeting | When a change request is issued (CR-06: 30/10) | 15 minutes | Approve, reject or postpone, with the reason |

## 2.3 Project records
Product Backlog (kept as a text document and copied into the workbook), a Sprint Backlog for each Sprint, the working product on the live website, burndown charts (Jira and workbook), daily meeting records, risk register, issue log, Change Log, list of items under version control, earned value sheet, Definition of Ready and the three-level Definition of Done (Part 4).

## 2.4 Tools
| Purpose | Tool |
|---|---|
| Task board, estimates, actual hours | Jira Software Cloud, free plan, project "ECBS" (https://tdat100524.atlassian.net); the lecturer is invited with read-only access (to be confirmed) |
| Planning workbook | Excel file "HK261_SPM_FP_Team6_c2_SprintBacklog" for each Sprint, adding to the previous one |
| Source code and version control | GitHub (https://github.com/Tdat10052499/E-Commercial-Book-Store); every code change is reviewed by the other member |
| Website hosting | Free plans: Vercel for the website, Supabase for the database |
| Communication | Discord (daily meeting at 22:00); email to the Sponsor; class meetings |

## 2.5 Choices made for this team and the risks they bring
| Choice | Reason | Risk it brings | How the risk is reduced |
|---|---|---|---|
| Sprints of one week, Friday to Thursday | Fixed by the course brief | Little spare time in each Sprint | Small tasks (at most one person-day), plan reviewed every day |
| Written daily update allowed | Two members with different timetables | Blockers noticed late | A fixed template; every message answered within 24 hours (Part 7) |
| The Product Owner is also a Developer and the Sprint 2 Leader | Team of two [03 §4.1] | Conflict between building an item and accepting it | The Definition of Done of each story is checked by the other member |
| Excel workbook first, then Jira | Required by the course brief [03 §4.2] | Figures that do not match | The Sprint Leader compares the workbook and Jira at every Sprint Planning |
| Code reviewed by the only other member | Two members | A late review blocks other work | Review within 12 hours; small code changes |
| AI tools used to help write documents and code | Allowed if declared [03 §4.2] | Content that the members do not understand | Every use recorded in the AI usage log and reviewed by the other member |
