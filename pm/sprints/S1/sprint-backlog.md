# Sprint 1 Backlog (`S1_Backlog`)

**Sprint:** S1 – Plan baseline & F1 · 23/10 – 29/10/2026 · **Leader:** Hồ Du Tuấn Đạt · **PO:** Nguyễn Minh Chính

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 0 (TA) | 15/10/2026 | Team 6 | 2-week Sprint, 6 stories / 22 SP, 68 h plan [04 §5] |
| 1.0-draft | 30/10/2026 | Hồ Du Tuấn Đạt | Re-planned to 1-week S1 = F1 + PM baseline only [05 #11]. Task hours are **proposals**; Jira Original Estimate must match after the team confirms |
| 1.1-draft | 01/11/2026 | Hồ Du Tuấn Đạt | Status column synced from Jira ECBS (snapshot `jira-snapshot-2026-11-01.md`); actual hours still not logged in Jira |
| 1.2 | 02/11/2026 | Nguyễn Minh Chính (PO) | Actual hours from Jira worklogs, reconstructed by members on 02/11 (time was not tracked during S1): 19.5 h vs 48 h plan. T04, T09, T11 reassigned to Đạt, who did the work; Jira keys added |
| 1.3 | 02/11/2026 | Hồ Du Tuấn Đạt | Re-checked against Jira Time spent on 02/11 (19.5 h confirmed); formatted for submission |

## Sprint Goal (measurable)
By 29/10/2026, on the hosted URL: a visitor can register and log in/out; an administrator can create accounts with a role and lock/unlock them; a non-admin gets 403 on every `/admin` URL; passwords are stored as bcrypt hashes — verified by 24 F1 test cases (one per AC) all passing. In parallel, PMP v1.0, Product Backlog v1.0, Release Plan/BAC and the CR-06 Change Log entry are baselined.

## Capacity
| Member | Available days | Focus h/day | Capacity (h) |
|---|---|---|---|
| Hồ Du Tuấn Đạt | 5 | 4 | 20 (plan) |
| Nguyễn Minh Chính | 5 | 4 | 20 (plan) |
| **Total** | | | **40 (plan)** – `plan/INPUTS.md` §2, PO 30/10/2026 |

## Selected items
US-01 (3), US-02 (3), US-03 (5), US-04 (3), NFR-01 (2), NFR-03 (2) = **18 SP → planned velocity S1 = 18 SP** (PO estimates, `planning-poker-log.md` v1.1). Actual velocity = SP of these items that meet the DoD at Review 1.

## Tasks (each ≤ 1 person-day = 8 h)
| Task | Item | Description | Owner | Est. h (plan) | Actual h (Jira Time spent) | Status |
|---|---|---|---|---|---|---|
| S1-T01 | PM | Product Backlog v1.0 + DoR (GWT ACs) | Chính | 4 | 3 | Done (ECBS-90, Jira 01/11) |
| S1-T02 | PM | Planning Poker session + Release Plan + BAC | Chính | 2 | 1 | In Progress (ECBS-91, Jira 01/11) |
| S1-T03 | PM | PMP v1.0 parts 1, 3, 5, 6 | Đạt | 6 | 1 | Done (ECBS-92, Jira 01/11) |
| S1-T04 | PM | PMP v1.0 parts 2, 4, 7 | Đạt (reassigned 02/11) | 4 | 1 | Done (ECBS-93, Jira 01/11) |
| S1-T05 | CR-06 | Change Log entry + impact analysis + CCB options | Chính | 3 | 2 | Done (ECBS-94, Jira 01/11) |
| S1-T06 | NFR-03 | Scaffold app, DB schema, deploy skeleton | Đạt | 4 | 1 | Done (ECBS-95, Jira 01/11) |
| S1-T07 | US-01, NFR-01 | Register (form, client + server validation, bcrypt) | Đạt | 4 | 1.5 | Done (ECBS-96, Jira 01/11) |
| S1-T08 | US-02 | Login/logout, sessions, locked-account check | Đạt | 3 | 1 | Done (ECBS-97, Jira 01/11) |
| S1-T09 | US-03 | Admin account list, create account with role, lock/unlock | Đạt (reassigned 02/11) | 5 | 1 | Done (ECBS-98, Jira 01/11) |
| S1-T10 | US-04 | Server-side role guard, 403 page, hide admin menu | Đạt | 2 | 1.5 | Done (ECBS-99, Jira 01/11) |
| S1-T11 | NFR-04 (base) | Responsive base layout and styles | Đạt (reassigned 02/11) | 3 | 1.5 | Done (ECBS-100, Jira 01/11) |
| S1-T12 | Test | F1 test cases (24) + automated tests + run | Chính | 3 | 2 | In Progress (ECBS-101, Jira 01/11) |
| S1-T13 | PM | Workbook c2, Sprint Report c3, submission | Đạt | 3 | 2 | In Progress (ECBS-102, Jira 01/11) |
| S1-T14 | PM | Review/Retro 1 preparation | Đạt | 2 | 0 | To Do (ECBS-103, Jira 01/11) |
| | | **Total** | Đạt 36 · Chính 12 (plan, after reassignment) | **48** | **19.5** (Đạt 13.5 · Chính 6) | 10 Done · 3 In Progress · 1 To Do |

> **Check against capacity:** 48 h (plan) exceeds the 40 h capacity by 8 h (20 %). **PO note (30/10/2026):** Sprint 1 had already ended when capacity was confirmed, so the overload is recorded, not hidden: it is one cause of issue I-01 (late Sprint 1 artefacts). Lesson for Sprint Planning 2: select work only up to 40 h.

> **Actual hours (02/11/2026):** S1 actual hours were reconstructed by members after the Sprint because time was not tracked during the Sprint, and logged in Jira with that comment. Per member: Đạt 13.5 h (T01 1, T03 1, T04 1, T05 1, T06 1, T07 1.5, T08 1, T09 1, T10 1.5, T11 1.5, T12 1, T13 1); Chính 6 h (T01 2, T02 1, T05 1, T12 1, T13 1). Most S1 work was done on 30/10, after the Sprint end (29/10 23:59). Source: `S1-hours-reconstruction.md`, Jira ECBS-90…103.
