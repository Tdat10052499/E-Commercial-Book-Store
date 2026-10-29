# Sprint 2 Backlog (`S2_Backlog`) – DRAFT for Sprint Planning 2

**Sprint:** S2 – Execution, monitoring & change control · Fri 30/10 – Thu 05/11/2026 · **Leader:** Nguyễn Minh Chính (PO) · Submission 23:59 Thu 05/11 · Review 2 Fri 06/11 [03 §5]

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 0.1-draft | 30/10/2026 | Nguyễn Minh Chính (AI-assisted) | Proposal prepared before Sprint Planning 2. Task hours are **proposals**; items, SP and the final selection are decided at Planning 2 with the **actual** Sprint 1 velocity [03 §6.2 item 1] |

## Sprint Goal (proposal – measurable)
By 05/11/2026, on the hosted URL: an administrator can add, edit and hide books (price > 0, required fields validated on client and server) and manage categories and authors; a customer browses a responsive grid of ≥ 30 sample books, 12 per page, newest first; if the CCB approves CR-06 (Option B), a Store Staff account can add/edit books but gets HTTP 403 on delete and on account management.

## Inputs for Planning 2 (fill at the meeting)
| Input | Value | Source |
|---|---|---|
| Actual velocity Sprint 1 (SP meeting DoD) | TBD | Jira / `plan/INPUTS.md` §4 |
| Actual hours Sprint 1 | TBD | Jira Completed Work |
| CCB decision on CR-06 | TBD | `plan/INPUTS.md` §5 |
| Capacity S2 | 40 h (Đạt 20 + Chính 20, plan) | `plan/INPUTS.md` §2 |

## Selected items (proposal)
US-05 Add book · US-06 Edit book · US-07 Hide book · US-08 Manage categories · US-09 Manage authors · NFR-02 Seed ≥ 30 books · US-10 Book grid 12/page newest first · NFR-04 Responsive UI · **if CR-06 approved (Option B):** US-24 Store Staff role & permissions. SP: 24 for the eight items (5+3+2+3+3+2+3+3), +5 for US-24 → 29 SP (PO estimates, `planning-poker-log.md` v1.1).

## Tasks (each ≤ 1 person-day = 8 h; hours are proposals)
| Task | Item | Description | Owner | Est. h (plan) | Actual h (Jira) | Status |
|---|---|---|---|---|---|---|
| S2-T01 | Scrum | Review & Retro 1 (30/10, in class) + Sprint Planning 2 (≤ 45 min) → S2_Backlog → Jira | Both | 1.5 | TBD | TBD |
| S2-T02 | Scrum | Daily Scrum S2 (≤ 10 min/day, logged) + daily board update | Both | 1.0 | TBD | TBD |
| S2-T03 | CR-06 | Record CCB decision; rebaseline backlog, AC, Release Plan, risk register; tag `baseline-v1.1` if approved; inform stakeholders | Chính | 2.0 | TBD | TBD |
| S2-T04 | PM | Weekly Status Report (G/A/R); update risk register and issue log | Chính | 2.0 | TBD | TBD |
| S2-T05 | CR-06 | `c4_ChangeRequest_CR01.docx` (form, impact analysis, CCB decision, baseline update) | Chính | 2.0 | TBD | TBD |
| S2-T06 | PM | Workbook `c2_SprintBacklog_S2`, `c3_SprintReport_S2`, `c0_Eval_S2`, upload | Chính | 1.75 | TBD | TBD |
| S2-T07 | US-05..09 | Data model: books, categories, authors, hidden flag; migration | Đạt | 2.0 | TBD | TBD |
| S2-T08 | US-08 | Manage categories (screens + API + validation) | Chính | 2.0 | TBD | TBD |
| S2-T09 | US-09 | Manage authors (screens + API + validation) | Chính | 2.0 | TBD | TBD |
| S2-T10 | US-05 | Add book: form, cover image, price > 0, client + server validation | Đạt | 3.0 | TBD | TBD |
| S2-T11 | US-06 | Edit book | Đạt | 1.5 | TBD | TBD |
| S2-T12 | US-07 | Hide book (soft delete) – hidden from customers | Đạt | 1.0 | TBD | TBD |
| S2-T13 | NFR-02 | Seed ≥ 30 sample books (cover, category, author) | Đạt | 1.5 | TBD | TBD |
| S2-T14 | US-10 | Book grid: cover, title, author, price; 12 per page; newest first | Chính | 3.0 | TBD | TBD |
| S2-T15 | NFR-04 | Responsive check of new pages (360 / 768 / 1280 px) | Chính | 1.0 | TBD | TBD |
| S2-T16 | US-24 (CR) | C1 `staff` role + migration, audit columns | Đạt | 1.0 | TBD | TBD |
| S2-T17 | US-24 (CR) | C2 permission matrix on the server (403 on delete and account management) | Đạt | 2.0 | TBD | TBD |
| S2-T18 | US-24 (CR) | C3 Admin assigns/changes role incl. Staff | Đạt | 1.5 | TBD | TBD |
| S2-T19 | US-24 (CR) | C4 Staff access to book/category/author screens; hide Delete | Đạt | 2.0 | TBD | TBD |
| S2-T20 | US-24 (CR) | C6 (part) CR test cases + F1 regression | Đạt | 1.0 | TBD | TBD |
| S2-T21 | CR-06 | C7 CR documentation in the baseline | Chính | 1.0 | TBD | TBD |
| S2-T22 | Test | F2/F3 test cases from AC (≥ 1 per AC) | Chính | 2.0 | TBD | TBD |
| S2-T23 | Test | Run F2/F3 test cases on the hosted URL + F1 regression; record results and defects | Đạt | 2.0 | TBD | TBD |
| | | **Total (plan)** | Đạt 19.75 · Chính 20.0 | **39.75** | **TBD** | |

"Both" tasks are counted half per member. CR-06 tasks S2-T16…T21 (8.5 h, Option B, S2 part) are planned **only if the CCB approves**; if it rejects or defers, those 8.5 h are released and the PO pulls the next backlog item at Planning 2.

> **Check against capacity:** 39.75 h planned ≤ 40 h capacity (Đạt 19.75 ≤ 20, Chính 20.0 ≤ 20). Re-check at Planning 2 with the actual Sprint 1 velocity; if Sprint 1 velocity is lower than planned, move NFR-04 polish or US-07 to Sprint 3 rather than exceed capacity.
