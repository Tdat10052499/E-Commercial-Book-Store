# Change Request CR-06 – Store Staff role

Source document for `HK261_SPM_FP_Team6_c4_ChangeRequest_CR01.docx` [CR-06 §5-5]. The brief's template `FP_Template_ChangeRequest.docx` is not in the team's materials (`plan/INPUTS.md` §6), so this form follows the five CR steps of [03 §6.2-3] and the fields asked for in [CR-06 §5].

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 30/10/2026 | Hồ Du Tuấn Đạt (AI-assisted) | Change Log entry and impact analysis with options A/B/C (`CR-06-impact-analysis.md` v1.0) |
| 1.1 | 30/10/2026 | Nguyễn Minh Chính (PO, AI-assisted) | Option B confirmed as the team recommendation |
| 2.1 | 06/11/2026 | Nguyễn Minh Chính (PO + Leader S2, AI-assisted) | Implementation status at the Sprint end: US-24 built and deployed (PR #11, #12) |
| 2.0 | 05/11/2026 | Nguyễn Minh Chính (PO + Leader S2, AI-assisted) | CCB decision (Approve, Option B), baseline update v1.1 and communication added; issued as the c4 form |

## 1. Change Request form
| Field | Value |
|---|---|
| CR ID | CR-06 (form file name `c4_ChangeRequest_CR01` as instructed in [CR-06 §5-5]) |
| Title | Add a Store Staff role with limited catalogue rights and a "last updated by" audit |
| Project / Team | E-Commercial Book Store – Release 1.0 · Team 6 "Page Turners" |
| Requester | Ms. Le (Sponsor), played by Dr. Bùi Minh Phụng |
| Date received | Tue 27/10/2026 (during Sprint 1) |
| Recorded in Change Log | 30/10/2026, Hồ Du Tuấn Đạt (deadline 29/10 23:59; entry was late, see issue I-01) |
| Affected features | F1 (roles, account management, access guard), F2 (book, category, author management) |
| Customer priority | High; wanted in Release 1.0 |
| Description | A third role **Store Staff** may add and edit books and manage categories and authors, but may **not delete books** and may **not open account management**. The administrator assigns roles. Every book records **who updated it last and when**, shown on the book's admin page [CR-06 §1] |
| Business reason | Store staff update books every day, but the owner does not want to give them full administrator rights [CR-06 §2] |
| Customer acceptance criteria | AC1 Staff adds a valid book → saved · AC2 Staff deletes a book → refused (no button or "not permitted") · AC3 Staff opens account management → denied · AC4 Admin changes a Customer to Staff → after logging in again the user has exactly Staff rights · AC5 Staff edits a book → admin page shows "Last updated by [name] at [time]" [CR-06 §3] |
| Note from customer | F1 was delivered in Sprint 1, so the change touches work that has (or should have) met the DoD → rework and regression must be counted [CR-06 §4] |

## 2. Impact analysis
### 2.1 Scope
| Change | Items | SP (PO estimate) |
|---|---|---|
| New | US-24 Store Staff role & permissions (5 ACs: CR AC1–AC4 + Staff manages categories/authors) | 5 |
| New | US-25 "Last updated by" audit (3 ACs: CR AC5 + seed books + renamed users) | 2 |
| Rework | US-03 (role list Administrator/Customer → + Staff; admin changes role) · US-04 (guard becomes a permission matrix) | effort only (in C2, C3, C6) |
| Regression | F1 test cases US-01…US-04, NFR-01 | effort only (in C6) |
| Data | `users.role` adds `staff`; `books.updated_by`, `books.updated_at` | – |
| **Total** | +2 items | **+7 SP → PSP 55 → 62** |

Permission matrix after the change:

| Function | Administrator | Store Staff | Customer | Visitor |
|---|---|---|---|---|
| Browse / search / detail | Yes | Yes | Yes | Yes |
| Add / edit book | Yes | Yes | No | No |
| Delete (hide) book | Yes | No (403) | No | No |
| Manage categories / authors | Yes | Add, rename (no remove – team decision) | No | No |
| Manage accounts, assign roles | Yes | No (403) | No | No |

### 2.2 Schedule and cost (plan)
| # | Task | Item | Hours (plan) | Sprint (Option B) |
|---|---|---|---|---|
| C1 | `staff` role + migration; audit columns | US-24/25 | 1.0 | S2 |
| C2 | Guard → permission matrix (server side) | US-04 rework | 2.0 | S2 |
| C3 | Admin assigns/changes role incl. Staff | US-03 rework | 1.5 | S2 |
| C4 | Staff access to book/category/author screens; hide Delete; 403 on delete and accounts | US-24 | 2.0 | S2 |
| C5 | Store and show "Last updated by … at …" | US-25 | 1.5 | S3 |
| C6 | Test cases CR AC1–AC5 + team ACs; F1 regression | US-24/25 | 3.0 (1.0 S2 + 2.0 S3) | S2, S3 |
| C7 | Rebaseline backlog, Release Plan, risk register; c4 form | PM | 1.0 | S2 |
| | **Total** | | **12.0 h = 2,400,000 VND** (200,000 VND/h) | S2 8.5 h · S3 3.5 h |

Milestones are not moved: Sprint 2 submission 05/11, Release v1.0 12/11, UAT 13/11 [03 §5]. With Option B, US-24 is built with F2 in Sprint 2 and US-25 with F4 in Sprint 3.

### 2.3 Quality
Security-sensitive: every permission is checked on the server, not only by hiding buttons (US-24/AC-02, AC-03 expect HTTP 403 for direct requests). F1 regression is mandatory; at least one test case per new AC.

### 2.4 Risk
| Risk | Effect | Response |
|---|---|---|
| R05 S2 overload (Occurred → I-03) | S2 commitment 29 SP vs expected 18.3 SP | Phased delivery (Option B); S2 sized by hours (39.75 h ≤ 40 h) |
| R08 permission defect (P 2 → 3) | AC/NFR fail at UAT | Server-side matrix; tests for every 403 |
| R11 unclear Staff scope (new, closed 05/11) | Rework at UAT | Team decision: no remove for Staff; new role at next login |

## 3. Options presented to the CCB (30/10/2026)
| | Option A – Approve, full in S2 | **Option B – Approve, phased (team recommendation)** | Option C – Defer to Release 2 |
|---|---|---|---|
| Content | US-24 + US-25 with F2 in S2 | S2: US-24 with F2 · S3: US-25 with F4 | No change in R1.0 |
| Hours | +12 h in S2 | +8.5 h S2 · +3.5 h S3 | ≈ 0.5 h to record |
| Cost | +2.4 M VND | +2.4 M VND | ≈ 0 |
| Schedule | S2 highest load → risk to F3 | Load spread; S3 keeps buffer before UAT | No impact |
| Quality / risk | One regression; highest overload risk | Two smaller regressions; moderate risk | Customer need unmet |
| Customer value | Full CR in R1.0 | Full CR in R1.0 by 12/11 | Not in R1.0 |

## 4. CCB decision
| Field | Value |
|---|---|
| Date, place | Fri 30/10/2026, in class |
| CCB members [03 §6.2-3] | Sponsor Dr. Bùi Minh Phụng (as Ms. Le) · PO Nguyễn Minh Chính · Sprint Leader S1 Hồ Du Tuấn Đạt |
| **Decision** | **Approve** |
| **Option** | **B – phased: US-24 in Sprint 2, US-25 in Sprint 3** |
| Reason | The Sponsor agreed with the team's reasoning: the whole change is delivered in Release 1.0, as the customer asked, while Sprint 2 keeps enough capacity for F2 and F3; permissions are built together with F2, so no F2 screen has to be rebuilt later |
| Details decided by the team | Team decision (PO, 05/11/2026): Staff may add and rename categories and authors but not remove them (remove stays Admin-only); a role change applies from the user's next login, matching CR AC4; the form is named `c4_ChangeRequest_CR01.docx` as written in [CR-06 §5-5] |

## 5. Baseline update (step 4)
| Artefact | Baseline v1.0 (30/10) | Baseline v1.1 (04/11/2026) |
|---|---|---|
| Product Backlog | v1.1: 18 items, PSP 55 SP; US-24/25 pending | **v1.2**: US-24 (S2), US-25 (S3) in the baseline; **PSP 62 SP** |
| Release Plan | v1.2: 120 h, BAC 24,000,000 VND; PV 8.0 / 16.0 / 24.0 M | **v1.3**: 132 h, **BAC 26,400,000 VND**; PV 8.8 / 17.6 / 26.4 M |
| Sprint allocation | S1 18 · S2 24 · S3 13 SP | S1 18 · **S2 29** · **S3 15** SP |
| Sprint 2 Backlog | draft 0.1 | v1.0: tasks S2-T16…T21 (8.5 h) for CR-06; Jira ECBS-139…144; US-24 (ECBS-122) moved into Sprint 2, US-25 (ECBS-123) into Sprint 3 |
| Risk register | v1.0 | v1.1: R05 Occurred → I-03, R08 re-scored, R11 added |
| Configuration | – | Git tags **`baseline-v1.0`** (S1 submission set) and **`baseline-v1.1`** (this rebaseline) |

## 6. Communication (step 5) [PMP-7 §7.1]
| Stakeholder | What | Channel | When | By |
|---|---|---|---|---|
| Sponsor | Decision record, impact, baseline v1.1 (this form) | eLearning – S2 submission | 05/11/2026 | PO |
| Sponsor | Weekly Status Report incl. CR status | eLearning + Review 2 | 05/11, 06/11 | Leader S2 |
| Team | Decision, new tasks, owners | Jira (ECBS-122, ECBS-139…144), PR description | 05/11/2026 | PO |

## 7. Implementation status (end of Sprint 2, 05/11/2026 23:59)
| Part | Status |
|---|---|
| C7 documentation, baseline v1.1, tags | Done (Chính) |
| C1–C4: `staff` role + migration, permission matrix (`lib/permissions.js`), Admin changes roles, Staff access to book/category/author screens, 403 on delete and accounts | Done – merged PR #11 (Đạt), deployed 05/11 |
| C6 part: 5 CR test cases (TC-CR-01…05) + F1 regression table | Done – PR #12 (Đạt); automated 71/71 pass; hosted Staff run pending → US-24 In Review |
| C5, rest of C6 (US-25 last-updated audit) | Planned for Sprint 3 |

## 8. Sign-off
| Role | Name | Signature / date |
|---|---|---|
| Sponsor | Dr. Bùi Minh Phụng | |
| Product Owner | Nguyễn Minh Chính | |
| Sprint Leader S2 | Nguyễn Minh Chính | |
