# PMP Part 3 – Master Plan & Release Plan

**Project:** E-Commercial Book Store – Release 1.0 (Book Catalogue, F1–F5)
**Team:** Team 6 "Page Turners" · **Sponsor/Customer:** Dr. Bùi Minh Phụng (as Ms. Le)
**Period:** Fri 23/10/2026 – Tue 17/11/2026 (GMT+7)

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 0.1 (TA) | 15/10/2026 | Team 6 | Team Assignment release planning: velocity assumed 22 SP per 2-week Sprint; Must + Should = 79 SP over ~4 Sprints [04 §4] |
| 1.0-draft | 30/10/2026 | Hồ Du Tuấn Đạt (AI-assisted) | Rebaselined to the Final Project brief: 3 one-week Sprints, scope F1–F5 only, cart/payment/social login out of scope [03 §2.2, §5]; capacity-based velocity; BAC formula at 200,000 VND/h; CR-06 recorded as pending CCB |
| 1.0-draft2 | 30/10/2026 | Hồ Du Tuấn Đạt (AI-assisted) | Aligned to Master Plan v0.4 (Chính, PO; `deliverables/MasterPlan/HK261_SPM_FP_Team6_MasterPlan.xlsx`) as the single source: v0 item IDs, Sprint Goals, WBS effort 152.5 h, capacity 28 h/person/Sprint, BAC 30,500,000 VND, expected velocity 15.4 SP, CR-06 +22 h. All are **proposals pending approval** (workbook decisions 0/9 approved) |

> **Status of figures.** Every number marked **(plan)** is a planning value. Values marked **TBD** need human input (capacity, Planning Poker votes, Jira actuals) and are tracked in `plan/INPUTS.md`. No actual figure appears in this document.

## 3.1 Release goal
Deliver a hosted, responsive Book Catalogue website in which administrators manage accounts, roles and books, and customers browse, view, search and filter at least 30 sample books, accepted by the Sponsor through UAT on 13/11/2026 [03 §2, §6.3].

## 3.2 Milestones (fixed by the brief)
| # | Milestone | Date / time (GMT+7) | Evidence | Source |
|---|---|---|---|---|
| M0 | Project start, brief issued | Fri 23/10 | – | [03 §5] |
| M1 | CR-06 issued by Sponsor | Tue 27/10 | CR-06 in Change Log | [CR-06] |
| M2 | **Sprint 1 submission** (c1, c2, c3, c0) | Thu 29/10 23:59 | eLearning upload | [03 §7] |
| M3 | Review/Retro 1 + **CCB for CR-06** | Fri 30/10 | Review slides, CCB decision | [03 §5], [CR-06 §5] |
| M4 | Baseline v1.0 tagged (`baseline-v1.0`) | Fri 30/10 | Git tag | PMP-6 |
| M5 | **Sprint 2 submission** (c2, c3, c4 CR, c0) | Thu 05/11 23:59 | eLearning upload | [03 §7] |
| M6 | Review/Retro 2 | Fri 06/11 | Review slides | [03 §5] |
| M7 | Release `v1.0` tagged + release notes | Thu 12/11 | Git tag, notes | [03 §6.3] |
| M8 | **Sprint 3 submission** (c2, c3, c5 UAT, c0) | Thu 12/11 23:59 | eLearning upload | [03 §7] |
| M9 | Review 3 + **UAT with customer** | Fri 13/11 | Signed UAT minutes | [03 §6.3] |
| M10 | **Final submission** (c1 Final, c2 Final, c6 Report, c6 Slides, Eval360) | Sun 15/11 23:59 | eLearning upload | [03 §7] |
| M11 | Final presentation; site online until end of day | Tue 17/11 07:00 | Live demo | [03 §8] |

## 3.3 Sprint plan and leader rotation
Sprints run Friday → Thursday, one week each, N = 3 [03 §5]. Rotation for a 2-person team: the PO leads S2, the other member leads S1 and S3 [03 §4.1].

| Sprint | Dates | Leader | Sprint Goal (plan) | Increment | PM focus (rubric S4) |
|---|---|---|---|---|---|
| S1 – Plan baseline & F1 | 23/10 – 29/10 | Hồ Du Tuấn Đạt *(proposed, Option A)* | An Administrator can create and lock accounts and a Customer can register, log in and log out, with admin functions blocked for every other role – F1 meets all its AC on the hosted URL; PMP v1.0 baselined. | F1 + hosting | PMP v1.0 |
| S2 – Execution, monitoring & change | 30/10 – 05/11 | Nguyễn Minh Chính (PO) *(proposed)* | An Administrator can manage books (soft delete), categories and authors, and a Customer can browse a responsive grid of ≥ 30 books, 12 per page, newest first – F2 and F3 meet all their AC; CR-06 processed through the CCB. | F2, F3 (+ CR-06 if approved) | CR + risk/issue |
| S3 – Complete & acceptance | 06/11 – 12/11 | Hồ Du Tuấn Đạt *(proposed)* | A Customer can open a book's details and search/filter the catalogue together with pagination – F4 and F5 meet all their AC, F1–F3 pass regression, v1.0 is tagged and ready for UAT. | F4, F5 + Release v1.0 | UAT + Release |
| Closure | 13/11 – 17/11 | Both | Final Report, EVM, Lessons Learned, slides, video | Release 1.0 online | – |

Feature allocation follows the brief's reference Sprints [03 §2.2]. Any change is decided at Sprint Planning and recorded in §3.8.

## 3.4 Allocation of backlog items to Sprints (plan)
SP come from the Planning Poker log (`pm/backlog/planning-poker-log.md`). Until votes are recorded, SP are **TBD**.

| Sprint | Items | SP (plan) |
|---|---|---|
| S1 (4 items) | US-01 Register (hashing, validation) · US-02 Log in/out · US-03 Admin creates & locks accounts, roles, server-side guard · NFR-02 Hosting | TBD |
| S2 (8 items) | US-08 Add book · US-09 Edit book · US-10 Delete (hide) book · US-24 Manage categories · US-25 Manage authors · US-05 Book grid 12/page newest first · NFR-01 ≥ 30 books, list < 2 s · US-21 Responsive | TBD |
| CR-06 (if approved, option per CCB) | US-26 Store Staff role & permissions · US-27 "Last updated by" audit | TBD |
| S3 (2 items) | US-07 Book detail (friendly not-found, Back keeps page) · US-06 Search, filter, pagination | TBD |
| Release 1.0 total | | **PSP = TBD** |

## 3.5 Capacity and expected velocity
Formula (per Sprint): **Capacity (h) = Σ members (available days × focus hours/day)**. Expected velocity is derived from capacity, not copied from the TA (22 SP / 2 weeks is not applicable to 1-week Sprints [05 #10]).

| Sprint | Đạt (h) | Chính (h) | Capacity (h) | Source |
|---|---|---|---|---|
| S1 | 28 | 28 | 56 | Master Plan v0.4 – PO assumption (4 h × 7 days), Đạt to confirm |
| S2 | 28 | 28 | 56 | idem |
| S3 | 28 | 28 | 56 | idem |
| **Total** | | | **168** | |

| Sprint | WBS planned effort (h) | Capacity (h) | Check |
|---|---|---|---|
| S1 | 61.5 | 56 | Over capacity by 5.5 h |
| S2 | 53.5 | 56 | Within |
| S3 | 37.5 | 56 | Within |
| **Total S1–S3** | **152.5** | 168 | |
| Closure (13–17/11, outside BAC) | 18 | – | |

**Expected velocity (plan)** = reference velocity × team capacity ÷ reference capacity = 22 SP × 56 h ÷ 80 h = **15.4 SP per Sprint** (TA Sprint 1 plan: 22 SP against 80 h [04 §5]). It is replaced by the **actual** velocity at Planning 2 and 3 [03 §6.2].

## 3.6 Budget (BAC) and EVM baseline
- **BAC = total planned person-hours of the release × 200,000 VND** [03 §6.4].
- WBS effort S1–S3: 152.5 h × 200,000 = **30,500,000 VND (plan, pending approval)**. Closure effort (18 h) is outside BAC because PV is defined over N = 3 Sprints.
- Baseline per Sprint: **PV(n) = BAC × n / 3** → 10,166,667 (S1) · 20,333,333 (S2) · 30,500,000 VND (S3).
- EV = BAC × (cumulative SP meeting DoD ÷ PSP); AC = actual cumulative hours from Jira Completed Work × 200,000. SV, CV, SPI, CPI, EAC, ETC follow [03 §6.4]. Actuals are collected per Sprint into `plan/INPUTS.md` §4.
- If CR-06 is approved, PSP and BAC are rebaselined; both baseline and rebaseline are kept (§3.8).

## 3.7 Master schedule (work packages by date)
Internal windows are the team's proposal and may be adjusted at Sprint Planning. Phase IDs refer to `plan/ROADMAP.md`.

| Phase | Work package | Start | Due | Owner | Depends on |
|---|---|---|---|---|---|
| **Sprint 1 (23–29/10)** ||||||
| P00 | Repo, branches, access (GV invited) | 27/10 | 27/10 | Đạt | – |
| P01 | Kick-off, roles, working agreement, capacity | 27/10 | 28/10 | Both | P00 |
| P02 | Product Backlog v1.0 (GWT, DoR) | 27/10 | 28/10 | PO | P01 |
| P03 | Planning Poker, Release Plan, BAC | 28/10 | 28/10 | PO + Leader | P02 |
| P04 | Stack, scaffold, deploy skeleton | 27/10 | 28/10 | Đạt | P01 |
| P05 | Sprint Planning 1 → Jira | 28/10 | 28/10 | Leader | P03 |
| P06–P07 | Build F1; F1 test cases | 28/10 | 29/10 | Both | P04, P05 |
| P08 | PMP v1.0 (7 parts) | 27/10 | 29/10 | Leader + PO | P01, P03 |
| P09 | CR-06 Change Log, impact analysis, options | 28/10 | 29/10 | PO | P03 |
| P10 | Daily log, burndown, actual hours | 23/10 | 29/10 | Leader | continuous |
| P11 | Package & submit S1 | 29/10 | 29/10 23:59 | Leader | above |
| P12 | Review/Retro 1 + CCB | 30/10 | 30/10 | Leader + PO | P11 |
| **Sprint 2 (30/10–05/11)** ||||||
| P13 | Sprint Planning 2 (actual velocity S1) | 30/10 | 30/10 | Leader | P12 |
| P14 | Update baseline per CCB, tag | 30/10 | 31/10 | PO | CCB decision |
| P15 | Build F2 (+ seed ≥30 books) | 31/10 | 03/11 | Both | P13 |
| P16 | Build F3 | 02/11 | 04/11 | Both | P15 |
| P17 | Build CR-06 (if approved) | 01/11 | 04/11 | Both | P14 |
| P18 | Test cases F2, F3, CR-06 + regression F1 | 03/11 | 05/11 | Both | P15–P17 |
| P19 | Weekly Status, risk & issue log | 30/10 | 05/11 | Leader | continuous |
| P20 | c4 Change Request form | 31/10 | 05/11 | PO | P14 |
| P21 | Package & submit S2 | 05/11 | 05/11 23:59 | Leader | above |
| P22 | Review/Retro 2 | 06/11 | 06/11 | Leader | P21 |
| **Sprint 3 (06–12/11)** ||||||
| P23 | Sprint Planning 3 (actual velocity S2) | 06/11 | 06/11 | Leader | P22 |
| P24–P25 | Build F4, F5 | 07/11 | 10/11 | Both | P23 |
| P26 | Tests F4, F5, regression F1–F3, performance | 10/11 | 11/11 | Both | P24, P25 |
| P27 | Release v1.0: merge to main, tag, notes | 11/11 | 12/11 | Leader | P26 |
| P28 | UAT script (all ACs) | 10/11 | 12/11 | PO | P26 |
| P29 | Monitoring + draft EVM | 06/11 | 12/11 | Leader | continuous |
| P30 | Package & submit S3 | 12/11 | 12/11 23:59 | Leader | above |
| P31 | Review 3 + UAT + minutes | 13/11 | 13/11 | Leader + PO | P30 |
| **Closure (13–17/11)** ||||||
| P32 | Final hosting, demo accounts, closure data | 13/11 | 14/11 | Đạt | P31 |
| P33 | Final Report, EVM, Lessons Learned, PMP/Workbook Final | 13/11 | 15/11 | Both | P31, P32 |
| P34 | Slides + demo video ≤ 3 min | 14/11 | 15/11 | Both | P33 |
| P35 | Final submission + Eval360 each | 15/11 | 15/11 23:59 | Both | P33, P34 |
| P36 | Final presentation | 16/11 | 17/11 07:00 | Both | P35 |

**Critical path:** P02 → P03 → P05 → P06 → P11 → P13 → P15 → P16 → P18 → P21 → P23 → P25 → P26 → P27 → P31 → P33 → P35. Event gates that cannot be moved: CCB (30/10), Reviews (30/10, 06/11, 13/11), UAT (13/11).

## 3.8 Baseline and change history of this plan
| Baseline | Date | Trigger | PSP | BAC | Tag |
|---|---|---|---|---|---|
| Baseline v1.0 | 30/10/2026 | Sprint 1 submission | TBD | 30,500,000 VND (152.5 h, plan) | `baseline-v1.0` |
| Rebaseline v1.1 | TBD | CCB decision on CR-06 (if Approve) | TBD | +22 h → 34,900,000 VND if fully approved (plan) | `baseline-v1.1` |

### Schedule variance observed (as of 30/10/2026 00:45)
- Sprint 1 artefacts were not yet in the repository at the 29/10 23:59 deadline. If the eLearning upload is also late, the penalty is −10 % of the Sprint score per 5 hours [03 §4.2]. Submission time: TBD (Leader to record). Logged as issue I-01 and as an input for Retro 1.
