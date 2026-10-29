# CR-06 – Impact Analysis and CCB Options

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 1.0-draft | 30/10/2026 | Hồ Du Tuấn Đạt (AI-assisted) | First analysis for CCB 30/10. Hour estimates are **planning proposals**; SP require Planning Poker (session 2 in the log) |
| 1.0-draft2 | 30/10/2026 | Hồ Du Tuấn Đạt (AI-assisted) | Aligned to Master Plan v0.4 (PO): CR items renumbered US-26/US-27; effort **+22 h / +4,400,000 VND** (PO estimate) replaces the 12 h draft; per-task split left to the PO |

## 1. Request
Source: [CR-06 §1–§4]. Add *Store Staff* role (add/edit books, manage categories/authors; no book delete; no account management; admin assigns roles) and a "Last updated by <name> at <time>" audit on each book. Customer priority High; wanted in Release 1.0. F1 was due in S1, so the change touches work that is meant to be Done → rework and regression must be counted [CR-06 §4].

## 2. Impact
### 2.1 Scope
| Change | Items |
|---|---|
| New | US-26 Store Staff role & permissions (5 ACs incl. CR AC1–AC4) · US-27 Last-updated audit (3 ACs incl. CR AC5) |
| Rework | US-03 (role list Administrator/Customer → + Staff; admin changes role; server guard becomes a permission matrix) |
| Regression | F1 test cases US-01…US-03, NFR-02 (24 test cases) |
| Data | `users.role` adds `staff`; `books.updated_by`, `books.updated_at` |

Permission matrix after the change:
| Function | Administrator | Store Staff | Customer | Visitor |
|---|---|---|---|---|
| Browse/search/detail | ✔ | ✔ | ✔ | ✔ |
| Add / edit book | ✔ | ✔ | ✘ | ✘ |
| Delete (hide) book | ✔ | ✘ | ✘ | ✘ |
| Manage categories / authors | ✔ | ✔ (remove: TBD) | ✘ | ✘ |
| Manage accounts, assign roles | ✔ | ✘ | ✘ | ✘ |

### 2.2 Effort, cost and schedule (plan – PO estimate, Master Plan v0.4)
**Total: +22 h × 200,000 VND = +4,400,000 VND** (proposal; confirm after Planning Poker session 2). Scope of work covered by the estimate:

| # | Task | Item | Est. hours |
|---|---|---|---|
| C1 | Add `staff` role + migration; audit columns `updated_by`, `updated_at` | US-26/27 | TBD (PO split) |
| C2 | Refactor server guard into a permission matrix | US-03 rework | TBD |
| C3 | Admin UI: assign/change role incl. Staff | US-03 rework | TBD |
| C4 | Staff access to book/category/author screens; hide delete; 403 on delete & accounts | US-26 | TBD |
| C5 | Store and display "Last updated by … at …" | US-27 | TBD |
| C6 | Test cases CR AC1–AC5 + team ACs; F1 regression | US-26/27 | TBD |
| C7 | Rebaseline backlog, Release Plan, risk register; c4 form | PM | TBD |
| | **Total** | | **22 h** |

SP: **TBD** (Planning Poker session 2). If approved: BAC v1.1 = (152.5 + 22) h × 200,000 = **34,900,000 VND**; baseline v1.0 (30,500,000 VND) is kept [03 §6.2-3].

### 2.3 Quality
Security-sensitive: every permission is checked on the server (not only by hiding buttons). Regression of F1 is mandatory; new test cases ≥ 1 per AC.

### 2.4 Risk
- Raises R05 (S2 overload) and R08 (permission defect).
- New risk: ambiguous scope "manage categories/authors" (delete or not) → clarify at CCB.
- If deferred: customer business need (daily updates by staff without admin rights) remains unmet in Release 1.0.

## 3. Options for the CCB (≥ 2 required [CR-06 §5])
| | Option A – Approve, full delivery in S2 | Option B – Approve, phased (recommended draft) | Option C – Defer to Release 2 |
|---|---|---|---|
| Content | US-26 + US-27 built together with F2 in S2 | S2: US-26 (roles & permissions, built with F2). S3: US-27 (audit) with F4 | No change in R1.0; log as R2 item |
| Hours (plan) | +22 h in S2 | +22 h split S2 (C1–C4, C7) / S3 (C5, part of C6) – split TBD by PO | 0 h |
| Cost (plan) | +4.4 M VND | +4.4 M VND total | 0 |
| Schedule | S2 load highest (F2 + F3 + CR) → risk to F3 | Spreads load; S3 still has buffer before UAT | No impact |
| Quality/risk | Regression once; highest overload risk | Two smaller regressions; moderate risk | Customer need unmet; no rework |
| Customer value | Full CR in R1.0 | Full CR in R1.0 by 12/11 | Not in R1.0 |

**Team recommendation (draft, PO to confirm):** Option B – it delivers the whole CR in Release 1.0 as the customer asked, while keeping S2 capacity for F2 and F3; permissions are built together with F2 so no F2 screen is rebuilt later.

## 4. CCB record (fill in at the meeting – do not pre-fill)
| Field | Value |
|---|---|
| Date / attendees | TBD |
| Option chosen | TBD |
| Decision | Approve / Reject / Defer – TBD |
| Reason given by Sponsor | TBD |
| Answers to open questions (delete categories/authors? revoke active sessions on role change? file name CR01 vs CR06?) | TBD |
