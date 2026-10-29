# Sprint 1 Backlog (`S1_Backlog`)

**Sprint:** S1 – Plan baseline & F1 · 23/10 – 29/10/2026 · **Leader:** Hồ Du Tuấn Đạt · **PO:** Nguyễn Minh Chính

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 0 (TA) | 15/10/2026 | Team 6 | 2-week Sprint, 6 stories / 22 SP, 68 h plan [04 §5] |
| 1.0-draft | 30/10/2026 | Hồ Du Tuấn Đạt (AI-assisted) | Re-planned to 1-week S1 = F1 + PM baseline only [05 #11]. Task hours are **proposals**; Jira Original Estimate must match after the team confirms |

## Sprint Goal (measurable)
By 29/10/2026, on the hosted URL: a visitor can register and log in/out; an administrator can create accounts with a role and lock/unlock them; a non-admin gets 403 on every `/admin` URL; passwords are stored as bcrypt hashes — verified by 24 F1 test cases (one per AC) all passing. In parallel, PMP v1.0, Product Backlog v1.0, Release Plan/BAC and the CR-06 Change Log entry are baselined.

## Capacity
| Member | Available days | Focus h/day | Capacity (h) |
|---|---|---|---|
| Hồ Du Tuấn Đạt | 5 | 4 | 20 (plan) |
| Nguyễn Minh Chính | 5 | 4 | 20 (plan) |
| **Total** | | | **40 (plan)** – `plan/INPUTS.md` §2, PO 30/10/2026 |

## Selected items
US-01, US-02, US-03, US-04, NFR-01, NFR-03 (SP TBD → velocity S1 plan = Σ SP).

## Tasks (each ≤ 1 person-day = 8 h)
| Task | Item | Description | Owner | Est. h (plan) | Actual h (Jira) | Status |
|---|---|---|---|---|---|---|
| S1-T01 | PM | Product Backlog v1.0 + DoR (GWT ACs) | Chính | 4 | TBD | TBD |
| S1-T02 | PM | Planning Poker session + Release Plan + BAC | Chính | 2 | TBD | TBD |
| S1-T03 | PM | PMP v1.0 parts 1, 3, 5, 6 | Đạt | 6 | TBD | TBD |
| S1-T04 | PM | PMP v1.0 parts 2, 4, 7 | Chính | 4 | TBD | TBD |
| S1-T05 | CR-06 | Change Log entry + impact analysis + CCB options | Chính | 3 | TBD | TBD |
| S1-T06 | NFR-03 | Scaffold app, DB schema, deploy skeleton | Đạt | 4 | TBD | TBD |
| S1-T07 | US-01, NFR-01 | Register (form, client + server validation, bcrypt) | Đạt | 4 | TBD | TBD |
| S1-T08 | US-02 | Login/logout, sessions, locked-account check | Đạt | 3 | TBD | TBD |
| S1-T09 | US-03 | Admin account list, create account with role, lock/unlock | Chính | 5 | TBD | TBD |
| S1-T10 | US-04 | Server-side role guard, 403 page, hide admin menu | Đạt | 2 | TBD | TBD |
| S1-T11 | NFR-04 (base) | Responsive base layout and styles | Chính | 3 | TBD | TBD |
| S1-T12 | Test | F1 test cases (24) + automated tests + run | Chính | 3 | TBD | TBD |
| S1-T13 | PM | Workbook c2, Sprint Report c3, submission | Đạt | 3 | TBD | TBD |
| S1-T14 | PM | Review/Retro 1 preparation | Đạt | 2 | TBD | TBD |
| | | **Total (plan)** | Đạt 24 · Chính 24 | **48** | **TBD** | |

> **Check against capacity:** 48 h (plan) exceeds the 40 h capacity by 8 h (20 %). **PO note (30/10/2026):** Sprint 1 had already ended when capacity was confirmed, so the overload is recorded, not hidden: it is one cause of issue I-01 (late Sprint 1 artefacts). Lesson for Sprint Planning 2: select work only up to 40 h.
