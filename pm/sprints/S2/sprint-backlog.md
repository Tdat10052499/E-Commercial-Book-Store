# Sprint 2 Backlog (`S2_Backlog`)

**Sprint:** S2 – Execution, monitoring & change control · Fri 30/10 – Thu 05/11/2026 · **Leader:** Nguyễn Minh Chính (PO) · Submission 23:59 Thu 05/11 · Review 2 Fri 06/11 [03 §5]

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 0.1-draft | 30/10/2026 | Nguyễn Minh Chính (AI-assisted) | Proposal prepared before Sprint Planning 2. Task hours are **proposals** |
| 1.0 | 04/11/2026 | Nguyễn Minh Chính (PO + Leader S2, AI-assisted) | Inputs recorded: actual S1 velocity 0 SP meeting DoD (F1 In Review), actual S1 hours 19.5 h, CCB 30/10 = **Approve Option B** → US-24 (5 SP) added to S2, US-25 (2 SP) planned for S3. S2-T07 (data model) and S2-T13 (seed) moved from Đạt to Chính so the category, author and grid tasks were not blocked (no F2 commit in the repo by 04/11). Status from the repo and PR #8 at 04/11 23:50. Actual hours: TBD from Jira |

## Sprint Goal (measurable)
By 05/11/2026, on the hosted URL: an administrator can add, edit and hide books (price > 0, required fields validated on client and server) and manage categories and authors; a customer browses a responsive grid of ≥ 30 sample books, 12 per page, newest first; a Store Staff account can add/edit books but gets HTTP 403 on delete and on account management (CR-06, Option B). Verified by the F2/F3 test cases (≥ 1 per AC) and the F1 regression.

## Inputs for Planning 2 [03 §6.2-1]
| Input | Value | Source |
|---|---|---|
| Actual velocity Sprint 1 (SP meeting DoD) | **0 SP** – the 6 F1 items (18 SP) are built and deployed but still *In Review*: the hosted test run (part 2) and PO acceptance are pending (Story DoD SD-1, SD-6) | Jira ECBS-104…109, `pm/sprints/S1/sprint-report.md` |
| Planned velocity Sprint 1 | 18 SP | S1 Backlog |
| Actual hours Sprint 1 | 19.5 h (Đạt 13.5 · Chính 6) vs 48 h plan | Jira worklogs |
| CCB decision on CR-06 | Approve – Option B (phased: US-24 in S2, US-25 in S3) | `pm/change/change-log.md` |
| Capacity S2 | 40 h (Đạt 20 + Chính 20, plan) | `plan/INPUTS.md` §2 |

**How the actual velocity was used.** A velocity of 0 SP says nothing about how much work the team can finish, because the F1 work exists and only the acceptance step is missing. The PO therefore sized S2 by **hours** (Σ task estimates ≤ 40 h capacity) and not by the expected 18.3 SP. The commitment of 29 SP is above the expected velocity; this is recorded as risk R05 (Occurred → I-03) and the first item to drop if time runs out is NFR-04 polish, then US-07 (back to the Product Backlog, not hidden) [03 §6.2-1, Appendix A S2].

## Capacity
| Member | Available days | Focus h/day | Capacity (h) |
|---|---|---|---|
| Hồ Du Tuấn Đạt | 5 | 4 | 20 (plan) |
| Nguyễn Minh Chính | 5 | 4 | 20 (plan) |
| **Total** | | | **40 (plan)** |

## Selected items
US-05 Add book (5) · US-06 Edit book (3) · US-07 Hide book (2) · US-08 Manage categories (3) · US-09 Manage authors (3) · NFR-02 Seed ≥ 30 books (2) · US-10 Book grid (3) · NFR-04 Responsive UI (3) · **US-24 Store Staff role (5, CR-06)** = **29 SP (plan)**.

## Tasks (each ≤ 1 person-day = 8 h)
Status at 04/11/2026 23:50 (repo + PR). "In Review" = code in PR #8, waiting for Đạt's review and the hosted run.

| Task | Item | Description | Owner | Est. h (plan) | Actual h (Jira) | Status |
|---|---|---|---|---|---|---|
| S2-T01 | Scrum | Review & Retro 1 (30/10) + Sprint Planning 2 (≤ 45 min) → S2_Backlog → Jira | Both | 1.5 | TBD | In Progress – Review 1 and CCB held 30/10; Retro 1 notes TBD (team); Planning 2 result = this file v1.0 |
| S2-T02 | Scrum | Daily Scrum S2 (≤ 10 min/day, logged) + daily board update | Both | 1.0 | TBD | In Progress – log entries TBD (`daily-log.md`) |
| S2-T03 | CR-06 | Record CCB decision; rebaseline backlog, AC, Release Plan, risk register; tag `baseline-v1.1`; inform stakeholders | Chính | 2.0 | TBD | Done (04/11) |
| S2-T04 | PM | Weekly Status Report (G/A/R); update risk register and issue log | Chính | 2.0 | TBD | Done (04/11) |
| S2-T05 | CR-06 | `c4_ChangeRequest_CR01.docx` (form, impact analysis, CCB decision, baseline update) | Chính | 2.0 | TBD | Done (04/11) |
| S2-T06 | PM | Workbook `c2_SprintBacklog_S2`, `c3_SprintReport_S2`, `c0_Eval_S2`, upload | Chính | 1.75 | TBD | In Progress – files drafted 04/11; upload 05/11 |
| S2-T07 | US-05..09 | Data model: books, categories, authors, hidden flag; migration | **Chính** (was Đạt) | 2.0 | TBD | In Review – PR #8 |
| S2-T08 | US-08 | Manage categories (screens + API + validation) | Chính | 2.0 | TBD | In Review – PR #8 |
| S2-T09 | US-09 | Manage authors (screens + API + validation) | Chính | 2.0 | TBD | In Review – PR #8 |
| S2-T10 | US-05 | Add book: form, cover image, price > 0, client + server validation | Đạt | 3.0 | TBD | To Do |
| S2-T11 | US-06 | Edit book | Đạt | 1.5 | TBD | To Do |
| S2-T12 | US-07 | Hide book (soft delete) – hidden from customers | Đạt | 1.0 | TBD | To Do |
| S2-T13 | NFR-02 | Seed ≥ 30 sample books (cover, category, author) | **Chính** (was Đạt) | 1.5 | TBD | In Review – PR #8 |
| S2-T14 | US-10 | Book grid: cover, title, author, price; 12 per page; newest first | Chính | 3.0 | TBD | In Review – PR #8 |
| S2-T15 | NFR-04 | Responsive check of new pages (360 / 768 / 1280 px) | Chính | 1.0 | TBD | In Review – PR #8 (local render check); hosted check after merge |
| S2-T16 | US-24 (CR) | C1 `staff` role + migration | Đạt | 1.0 | TBD | To Do |
| S2-T17 | US-24 (CR) | C2 permission matrix on the server (403 on delete and account management) | Đạt | 2.0 | TBD | To Do – hook prepared: `CATALOG_EDITORS` in `src/lib/current-user.js` |
| S2-T18 | US-24 (CR) | C3 Admin assigns/changes role incl. Staff | Đạt | 1.5 | TBD | To Do |
| S2-T19 | US-24 (CR) | C4 Staff access to book/category/author screens; hide Delete | Đạt | 2.0 | TBD | To Do |
| S2-T20 | US-24 (CR) | C6 (part) CR test cases + F1 regression | Đạt | 1.0 | TBD | To Do |
| S2-T21 | CR-06 | C7 CR documentation in the baseline | Chính | 1.0 | TBD | Done (04/11) |
| S2-T22 | Test | F2/F3 test cases from AC (≥ 1 per AC) | Chính | 2.0 | TBD | Done (04/11) – `test-cases-F2F3.md` |
| S2-T23 | Test | Run F2/F3 test cases on the hosted URL + F1 regression; record results and defects | Đạt | 2.0 | TBD | To Do – after PR #8 is merged and deployed |
| | | **Total (plan)** | Đạt 16.25 · Chính 23.5 | **39.75** | **TBD** | 5 Done · 9 In Review / In Progress · 9 To Do |

"Both" tasks are counted half per member. Moving T07 and T13 (3.5 h) to Chính puts Chính's planned load at **23.5 h > 20 h capacity** and Đạt's at 16.25 h; the total stays within 40 h. Recorded as issue I-02.

> **Check against capacity:** 39.75 h planned ≤ 40 h capacity. Actual hours are logged by each member in Jira (*Completed Work*) and copied here from Jira before submission – AI does not estimate them [CLAUDE.md §3.2].
