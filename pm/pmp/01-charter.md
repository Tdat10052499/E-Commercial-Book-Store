# PMP Part 1 – Project Charter

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 0 | – | – | Lab 1 (SMART, stakeholders) and Lab 2 (Charter) were not submitted; no prior version exists [05 #21–22] |
| 1.0-draft | 30/10/2026 | Hồ Du Tuấn Đạt (AI-assisted) | Charter written new for Release 1.0 from the Final Project brief [03 §2] and TA baseline [04]. Objectives and stakeholders to be confirmed by the team |

## 1.1 Project identification
| Item | Value |
|---|---|
| Project | E-Commercial Book Store – Release 1.0 "Book Catalogue" |
| Customer / Sponsor | Ms. Le, owner of a multi-store book company (role played by Dr. Bùi Minh Phụng) |
| Performing team | Team 6 "Page Turners" – Hồ Du Tuấn Đạt, Nguyễn Minh Chính |
| Course | Software Project Management (72ITSE41503), class 261_72ITSE41503_01, Van Lang University |
| Duration | 23/10/2026 – 17/11/2026, 3 one-week Sprints + closure |
| Budget (BAC) | Planned person-hours × 200,000 VND – **TBD** (scenario 24,000,000 VND, see PMP-3 §3.6) |

## 1.2 Business case
Ms. Le's company sells through physical stores only. She wants an online bookshop with its own style that works on desktop, phone and tablet [03 §2]. Release 1.0 delivers the catalogue foundation (accounts, book management, browsing, details, search) on which ordering features can be added later.

## 1.3 SMART objectives
| # | Objective | Measure | Deadline |
|---|---|---|---|
| O1 | Deliver F1–F5 on a free public host | 100 % of Release 1.0 ACs pass in UAT | 13/11/2026 |
| O2 | Meet the NFRs | ≥ 30 sample books; list page < 2 s (median of 3); passwords hashed; client + server validation; responsive at 360/768/1280 px | 12/11/2026 |
| O3 | Control schedule and cost | SPI and CPI ≥ 0.9 at the end of S3 (AgileEVM) | 12/11/2026 |
| O4 | Control change | Every CR goes through the 5-step process with a CCB decision recorded within 1 working day of the CCB meeting | per CR |
| O5 | Run a transparent process | Board updated daily, Daily log every working day, every task has Original Estimate and Completed Work | each Sprint |

## 1.4 Scope
**In scope (Release 1.0):** F1 accounts & roles (register, login, logout, admin creates/locks accounts, ≥ 2 roles, server-side guard); F2 books, categories, authors (soft delete, price > 0, validation); F3 grid 12/page newest first, responsive; F4 detail with friendly not-found and Back-to-same-page; F5 search by title/author, filter by category and price range with pagination; NFRs; hosting until 17/11/2026 [03 §2.2]. CR-06 (Store Staff role) is added only if approved at CCB on 30/10.

**Out of scope:** shopping cart, payment, social login [03 §2.2]; orders, promotions, multi-store inventory, reviews, wishlist, recommendations (Release 2, see backlog section C).

## 1.5 Milestones
See PMP-3 §3.2 (M0 23/10 … M11 17/11).

## 1.6 Stakeholders
| Stakeholder | Role | Interest / influence | Key needs |
|---|---|---|---|
| Ms. Le (Dr. Bùi Minh Phụng) | Sponsor, Customer, CCB chair, UAT signer | High / High | Working increments, controlled change, honest data |
| Store staff of Ms. Le's company | Future users (CR-06) | High / Low | Update catalogue daily without full admin rights |
| Online customers | End users | High / Low | Find books fast on any device |
| Nguyễn Minh Chính | Product Owner + Developer, Leader S2 *(to confirm)* | High / High | Clear priorities, accepted items |
| Hồ Du Tuấn Đạt | Developer, Leader S1 & S3 *(to confirm)* | High / High | Realistic plan, stable hosting |
| Faculty of IT, VLU | Academic oversight | Low / Medium | Academic integrity |

## 1.7 Constraints
- Team of 2 must deliver all of F1–F5; features are not cut, workload is managed through capacity and the Release Plan [03 §2.2].
- Fixed dates: submissions every Thursday 23:59; late penalty −10 % per 5 h [03 §4.2].
- Free hosting only; site online until 17/11/2026.
- Rate 200,000 VND per person-hour; N = 3 Sprints.

## 1.8 Assumptions
- Each member can contribute the capacity recorded in `plan/INPUTS.md` §2 (TBD).
- Jira Free supports Original Estimate and Time Spent for the team-managed project (to verify [05 #18]).
- The free host and database tiers stay available until 17/11/2026.
- The Sponsor's CCB decision on CR-06 is given on 30/10/2026.

## 1.9 Success criteria
- UAT minutes signed with every Release 1.0 AC passed (and CR-06 ACs if approved).
- Tag `v1.0` and release notes on the repository; site reachable by the lecturer.
- All submissions on time with consistent SP, hours and EVM figures across Workbook, Sprint Reports, Final Report and slides.

## 1.10 Approval
| Name | Role | Decision | Date |
|---|---|---|---|
| Dr. Bùi Minh Phụng | Sponsor | TBD | TBD |
| Nguyễn Minh Chính | Product Owner | TBD | TBD |
| Hồ Du Tuấn Đạt | Sprint Leader S1 | TBD | TBD |
