# CR-06 – Impact Analysis and CCB Options

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 1.0-draft | 30/10/2026 | Hồ Du Tuấn Đạt (AI-assisted) | First analysis for CCB 30/10. Hour estimates are **planning proposals**; SP require Planning Poker (session 2 in the log) |
| 1.1 | 30/10/2026 | Nguyễn Minh Chính (PO, AI-assisted) | PO confirmed Option B as the team recommendation for the CCB |

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

SP: **TBD** (Planning Poker session 2). PSP and BAC are rebaselined after approval; the original baseline is kept.

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

## 4. CCB record (fill in at the meeting – do not pre-fill)
| Field | Value |
|---|---|
| Date / attendees | TBD |
| Option chosen | TBD |
| Decision | Approve / Reject / Defer – TBD |
| Reason given by Sponsor | TBD |
| Answers to open questions (delete categories/authors? revoke active sessions on role change? file name CR01 vs CR06?) | TBD |
