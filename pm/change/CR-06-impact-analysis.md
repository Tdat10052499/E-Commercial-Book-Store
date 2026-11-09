# CR-06 – Impact Analysis and CCB Options

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 1.0-draft | 30/10/2026 | Hồ Du Tuấn Đạt | First analysis for CCB 30/10. Hour estimates are **planning proposals**; SP require Planning Poker (session 2 in the log) |
| 1.1 | 30/10/2026 | Nguyễn Minh Chính (PO) | PO confirmed Option B as the team recommendation for the CCB |
| 1.2 | 04/11/2026 | Nguyễn Minh Chính (PO) | CCB record filled from the PO's account of the 30/10 meeting: Approve Option B; baseline v1.1 |

## 1. Request
Source: [CR-06 §1–§4]. Add *Store Staff* role (add/edit books, manage categories/authors; no book delete; no account management; admin assigns roles) and a "Last updated by <name> at <time>" audit on each book. Customer priority High; wanted in Release 1.0. F1 was due in S1, so the change touches work that is meant to be Done → rework and regression must be counted [CR-06 §4].

## 2. Impact
### 2.1 Scope
| Change | Items |
|---|---|
| New | US-24 Store Staff role & permissions (5 ACs incl. CR AC1–AC4) · US-25 Last-updated audit (3 ACs incl. CR AC5) |
| Rework | US-03 (role list Administrator/Customer → + Staff; admin changes role) · US-04 (guard becomes a permission matrix) |
| Regression | F1 test cases US-01…US-04, NFR-01 |
| Data | `users.role` adds `staff`; `books.updated_by`, `books.updated_at` |

Permission matrix after the change:
| Function | Administrator | Store Staff | Customer | Visitor |
|---|---|---|---|---|
| Browse/search/detail | ✔ | ✔ | ✔ | ✔ |
| Add / edit book | ✔ | ✔ | ✘ | ✘ |
| Delete (hide) book | ✔ | ✘ | ✘ | ✘ |
| Manage categories / authors | ✔ | ✔ (remove: TBD) | ✘ | ✘ |
| Manage accounts, assign roles | ✔ | ✘ | ✘ | ✘ |

### 2.2 Effort, cost and schedule (plan – to be confirmed by the team)
| # | Task | Item | Est. hours (plan) |
|---|---|---|---|
| C1 | Add `staff` role + migration; audit columns | US-24/25 | 1.0 |
| C2 | Refactor guard into permission matrix (server side) | US-04 rework | 2.0 |
| C3 | Admin UI: assign/change role incl. Staff | US-03 rework | 1.5 |
| C4 | Staff access to book/category/author screens; hide delete; 403 on delete & accounts | US-24 | 2.0 |
| C5 | Store and display "Last updated by … at …" | US-25 | 1.5 |
| C6 | Test cases CR AC1–AC5 + team ACs; F1 regression | US-24/25 | 3.0 |
| C7 | Rebaseline backlog, Release Plan, risk register; c4 form | PM | 1.0 |
| | **Total** | | **12.0 h ≈ 2,400,000 VND** |

SP (PO estimate 30/10/2026, no voting rounds – `planning-poker-log.md` session 2): **US-24 = 5, US-25 = 2 → +7 SP**; PSP 55 → 62 if approved. The F1 rework (3 SP) is effort only, already counted in C2, C3 and C6. PSP and BAC are rebaselined after approval; the original baseline is kept.

### 2.3 Quality
Security-sensitive: every permission is checked on the server (not only by hiding buttons). Regression of F1 is mandatory; new test cases ≥ 1 per AC.

### 2.4 Risk
- Raises R05 (S2 overload) and R08 (permission defect).
- New risk: ambiguous scope "manage categories/authors" (delete or not) → clarify at CCB.
- If deferred: customer business need (daily updates by staff without admin rights) remains unmet in Release 1.0.

## 3. Options for the CCB (≥ 2 required [CR-06 §5])
| | Option A – Approve, full delivery in S2 | Option B – Approve, phased (recommended draft) | Option C – Defer to Release 2 |
|---|---|---|---|
| Content | US-24 + US-25 built together with F2 in S2 | S2: US-24 (roles & permissions, built with F2). S3: US-25 (audit) with F4 | No change in R1.0; log as R2 item |
| Hours (plan) | +12 h in S2 | +8.5 h in S2 (C1–C4, part of C6, C7) · +3.5 h in S3 (C5, rest of C6) | 0 h (≈ 0.5 h to record) |
| Cost (plan) | +2.4 M VND | +2.4 M VND total | ≈ 0 |
| Schedule | S2 load highest (F2 + F3 + CR) → risk to F3 | Spreads load; S3 still has buffer before UAT | No impact |
| Quality/risk | Regression once; highest overload risk | Two smaller regressions; moderate risk | Customer need unmet; no rework |
| Customer value | Full CR in R1.0 | Full CR in R1.0 by 12/11 | Not in R1.0 |

**Team recommendation (confirmed by the PO, Nguyễn Minh Chính, 30/10/2026):** Option B – it delivers the whole CR in Release 1.0 as the customer asked, while keeping S2 capacity for F2 and F3; permissions are built together with F2 so no F2 screen is rebuilt later.

## 4. CCB record
| Field | Value |
|---|---|
| Date / attendees | Fri 30/10/2026, in class – Sponsor Dr. Bùi Minh Phụng (as Ms. Le), PO Nguyễn Minh Chính, Sprint Leader S1 Hồ Du Tuấn Đạt [03 §6.2-3]. Attendance list: as reported by the PO |
| Option chosen | **Option B – Approve, phased** |
| Decision | **Approve** |
| Reason given by Sponsor | Agreed with the team's recommendation: the whole CR is delivered in Release 1.0, and permissions are built together with F2 while S2 keeps capacity for F2/F3 |
| Details not fixed by the CR | Team decision (PO, 05/11/2026): Staff may add and rename categories and authors but not remove them (remove stays Admin-only); a role change applies from the user's next login, matching CR AC4; the form is named `c4_ChangeRequest_CR01.docx` as written in [CR-06 §5-5] |

## 5. Baseline update after approval (step 4) and communication (step 5)
| Artefact | Before (v1.0) | After (v1.1, 04/11/2026) |
|---|---|---|
| Product Backlog | 18 R1.0 items, PSP 55 SP; US-24/25 *pending CCB* | v1.2: US-24 (5 SP, S2) and US-25 (2 SP, S3) in the baseline, ACs confirmed; **PSP 62 SP** |
| Release Plan / BAC | 120 h, BAC 24,000,000 VND | v1.3: 120 h + 12 h CR = 132 h (plan), **BAC 26,400,000 VND**; PV(S2) = 17.6 M, PV(S3) = 26.4 M |
| Sprint plan | S2 24 SP, S3 13 SP | S2 29 SP (C1–C4, part of C6, C7 = 8.5 h), S3 15 SP (C5, rest of C6 = 3.5 h) |
| Risk register | R05 Open | v1.1: R05 Occurred → I-03; R11 (unclear Staff scope) added |
| Code | role `admin`/`customer` | `CATALOG_EDITORS` guard ready; `staff` role added in S2-T16…T19 |
| Tag | `baseline-v1.0` (created 04/11 on the S1 submission commit) | `baseline-v1.1` |

Communication [PMP-7 §7.1]: Sponsor – c4 form and Weekly Status Report in the S2 submission (05/11) and at Review 2 (06/11); team – PR description and Jira (US-24 moved into Sprint 2, US-25 into Sprint 3).
