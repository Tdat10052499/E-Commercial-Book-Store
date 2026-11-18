# Project Management Plan, Part 1 – Project Charter

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 0 | None | None | The earlier labs on objectives, stakeholders and the charter were not submitted, so no previous version exists [05 #21–22] |
| 1.0-draft | 30/10/2026 | Hồ Du Tuấn Đạt | Charter written for Release 1.0 from the Final Project brief [03 §2] and the team assignment [04]. Objectives and stakeholders to be confirmed by the team |
| 1.1-draft | 01/11/2026 | Hồ Du Tuấn Đạt | Budget and available hours filled in with the plan values confirmed on 30/10 (20 hours per member per Sprint, 24,000,000 VND) |
| 1.2 | 17/11/2026 | Hồ Du Tuấn Đạt | Rewritten in plain language without abbreviations; no change of content |
| 1.3 | 18/11/2026 | Hồ Du Tuấn Đạt | Approval table (1.10) completed: team approval with baseline version 1.0 on 30/10; no written Sponsor signature, acceptance at the acceptance test on 13/11 |

## 1.1 Project identification
| Item | Value |
|---|---|
| Project | E-Commercial Book Store – Release 1.0 "Book Catalogue" |
| Customer and Sponsor | Ms. Le, owner of a company with several bookstores (role played by Dr. Bùi Minh Phụng) |
| Project team | Team 6 "Page Turners": Hồ Du Tuấn Đạt and Nguyễn Minh Chính |
| Course | Software Project Management (course code 72ITSE41503), class 261_72ITSE41503_01, Van Lang University |
| Duration | 23/10/2026 to 17/11/2026: three Sprints of one week each, then closure |
| Budget | 24,000,000 VND in the first plan = 120 planned person-hours × 200,000 VND (Part 3, section 3.6) |

## 1.2 Business case
Ms. Le's company sells only through physical stores. She wants an online bookshop with its own style that works on computers, phones and tablets [03 §2]. Release 1.0 delivers the foundation of the catalogue (accounts, book management, browsing, book details and search), on which ordering features can be added later.

## 1.3 Objectives (specific, measurable, achievable, relevant and time-bound)
| # | Objective | Measure | Deadline |
|---|---|---|---|
| O1 | Deliver features F1 to F5 on a free public website | All acceptance criteria of Release 1.0 pass in the acceptance test with the Sponsor | 13/11/2026 |
| O2 | Meet the non-functional requirements | At least 30 sample books; the book list loads in under 2 seconds (middle value of 3 measurements); passwords stored in encrypted form; input checked in the browser and on the server; layout works at screen widths of 360, 768 and 1280 pixels | 12/11/2026 |
| O3 | Keep schedule and cost under control | Schedule Performance Index and Cost Performance Index both at least 0.9 at the end of Sprint 3 (Earned Value Management for Agile projects) | 12/11/2026 |
| O4 | Keep changes under control | Every change request goes through the five-step change process, and the Change Control Board decision is recorded within one working day of its meeting | For each change request |
| O5 | Run a transparent process | Task board updated every day, daily meeting record on every working day, every task has an estimated time and the time actually spent | Every Sprint |

## 1.4 Scope
**In scope (Release 1.0):**
- F1 accounts and roles: register, log in, log out; the administrator creates and locks accounts; at least two roles; access checked on the server.
- F2 books, categories and authors: a deleted book is hidden, not erased; the price must be greater than zero; input is checked.
- F3 book list: 12 books per page, newest first, working on every screen size.
- F4 book details: a friendly message when a book is not found, and a Back button that returns to the same page of the list.
- F5 search by title or author and filter by category and price range, page by page.
- The non-functional requirements, and the website online until 17/11/2026 [03 §2.2].
- Change request CR-06 (Store Staff role) only if the Change Control Board approves it on 30/10.

**Out of scope:** shopping cart, payment and sign-in with social media accounts [03 §2.2]; orders, promotions, stock across several stores, reviews, wish lists and recommendations (Release 2, see section C of the Product Backlog).

## 1.5 Milestones
See Part 3, section 3.2 (milestone M0 on 23/10 to milestone M11 on 17/11).

## 1.6 Stakeholders
| Stakeholder | Role | Interest and influence | Key needs |
|---|---|---|---|
| Ms. Le (Dr. Bùi Minh Phụng) | Sponsor and customer, chair of the Change Control Board, signs the acceptance test | High interest, high influence | Working results every Sprint, changes under control, honest data |
| Store staff of Ms. Le's company | Future users (change request CR-06) | High interest, low influence | Update the catalogue every day without full administrator rights |
| Online customers | End users | High interest, low influence | Find books quickly on any device |
| Nguyễn Minh Chính | Product Owner and Developer, Sprint Leader of Sprint 2 | High interest, high influence | Clear priorities, accepted items |
| Hồ Du Tuấn Đạt | Developer, Sprint Leader of Sprints 1 and 3 | High interest, high influence | A realistic plan, a stable website |
| Faculty of Information Technology, Van Lang University | Academic oversight | Low interest, medium influence | Academic integrity |

## 1.7 Constraints
- A team of two must deliver all features F1 to F5. Features are not cut; the workload is managed through the available hours and the Release Plan [03 §2.2].
- Fixed dates: submissions every Thursday at 23:59; a late submission loses 10% of the Sprint grade for every 5 hours late [03 §4.2].
- Free hosting only; the website stays online until 17/11/2026.
- Work is costed at 200,000 VND per person-hour; the project has 3 Sprints.

## 1.8 Assumptions
- Each member can work 20 hours per Sprint (plan value, confirmed by both members on 30/10/2026).
- The free version of Jira can record the estimated time and the time spent for this project (to be checked [05 #18]).
- The free plans of the website host and the database stay available until 17/11/2026.
- The Sponsor gives the Change Control Board decision on change request CR-06 on 30/10/2026.

## 1.9 Success criteria
- Acceptance test minutes signed, with every acceptance criterion of Release 1.0 passed (and those of CR-06 if it is approved).
- The release label "v1.0" and the release notes are on GitHub; the lecturer can open the website.
- Every submission on time, with the same story points, hours and earned value figures in the workbook, the Sprint reports, the Final Report and the slides.

## 1.10 Approval
| Name | Role | Decision | Date |
|---|---|---|---|
| Dr. Bùi Minh Phụng | Sponsor | No written signature. The Sponsor accepted the product built to this charter at the acceptance test on 13/11/2026 (73 of 73 acceptance criteria passed) | 13/11/2026 |
| Nguyễn Minh Chính | Product Owner | Approved: charter baselined with plan version 1.0 (version label "baseline-v1.0") | 30/10/2026 |
| Hồ Du Tuấn Đạt | Sprint Leader of Sprint 1 | Approved: charter baselined with plan version 1.0 (version label "baseline-v1.0") | 30/10/2026 |
