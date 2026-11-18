# Project Management Plan, Part 3 – Master Plan and Release Plan

**Project:** E-Commercial Book Store – Release 1.0 (Book Catalogue, features F1 to F5)
**Team:** Team 6 "Page Turners". **Sponsor and customer:** Dr. Bùi Minh Phụng (as Ms. Le)
**Period:** Friday 23/10/2026 to Tuesday 17/11/2026 (Vietnam time)

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 0.1 (team assignment) | 15/10/2026 | Team 6 | Release planning of the earlier team assignment: velocity assumed at 22 story points per two-week Sprint; "Must have" and "Should have" items totalling 79 story points over about 4 Sprints [04 §4] |
| 1.0-draft | 30/10/2026 | Hồ Du Tuấn Đạt | Plan redone for the Final Project brief: three Sprints of one week, scope limited to features F1 to F5, shopping cart, payment and social media sign-in out of scope [03 §2.2, §5]; velocity based on available hours; budget formula at 200,000 VND per hour; change request CR-06 recorded as waiting for the Change Control Board |
| 1.1-draft | 30/10/2026 | Nguyễn Minh Chính (Product Owner) | Roles confirmed; 20 hours per member per Sprint adopted as the plan value (40 hours per Sprint, 120 hours in total, budget 24.0 million VND); option B recommended for CR-06; Excel version added |
| 1.2-draft | 30/10/2026 | Nguyễn Minh Chính (Product Owner) | Story points filled in from the Product Owner's estimates (estimation log version 1.1, no voting rounds): 55 story points in total, expected velocity 18.3 story points per Sprint; first plan version completed |
| 1.3 (plan version 1.1) | 04/11/2026 | Nguyễn Minh Chính (Product Owner, Sprint 2 Leader) | **New plan version after the Change Control Board of 30/10 (CR-06 approved, option B):** user story US-24 (5 story points) in Sprint 2, US-25 (2 story points) in Sprint 3; total story points 55 to 62; planned hours 120 to 132 (12 hours for the change); budget 24.0 to 26.4 million VND; Planned Value of each Sprint recalculated. Actual velocity of Sprint 1 (0 story points, accounts still under review) recorded for the Sprint 2 Planning. Labels "baseline-v1.0" and "baseline-v1.1" created |
| 1.4 (plan version 1.2) | 15/11/2026 | Nguyễn Minh Chính (Product Owner) | **New plan version after the Change Control Board of 13/11 (CR-07 approved):** Sprint 3 story points estimated again in Planning Poker session 3 (US-12 from 3 to 5, NFR-05 from 2 to 5, US-25 from 2 to 3); total story points 62 to 68; hours and budget unchanged (132 hours, 26,400,000 VND). Release 1.0 accepted in the acceptance test on 13/11 |
| 1.5 | 17/11/2026 | Hồ Du Tuấn Đạt | Rewritten in plain language without abbreviations; no change of figures |

> **About the figures.** Every number marked "(plan)" is a planning value. Values that need data from the team (available hours, Planning Poker votes, actual hours from Jira) are kept in the team's input record. No actual figure appears in this document.

## 3.1 Release goal
Deliver an online, responsive book catalogue in which administrators manage accounts, roles and books, and customers browse, open, search and filter at least 30 sample books, accepted by the Sponsor in the acceptance test on 13/11/2026 [03 §2, §6.3].

## 3.2 Milestones (fixed by the course brief)
| # | Milestone | Date and time (Vietnam time) | Evidence | Source |
|---|---|---|---|---|
| M0 | Project start, brief issued | Friday 23/10 | None | [03 §5] |
| M1 | Change request CR-06 issued by the Sponsor | Tuesday 27/10 | CR-06 in the Change Log | [CR-06] |
| M2 | **Sprint 1 submission** (project plan, workbook, Sprint report, Sprint evaluation) | Thursday 29/10, 23:59 | Upload on eLearning | [03 §7] |
| M3 | Sprint Review and Retrospective 1, and **Change Control Board meeting on CR-06** | Friday 30/10 | Review slides, board decision | [03 §5], [CR-06 §5] |
| M4 | First plan version labelled "baseline-v1.0" | Friday 30/10 | Version label on GitHub | Part 6 |
| M5 | **Sprint 2 submission** (workbook, Sprint report, change request form, Sprint evaluation) | Thursday 05/11, 23:59 | Upload on eLearning | [03 §7] |
| M6 | Sprint Review and Retrospective 2 | Friday 06/11 | Review slides | [03 §5] |
| M7 | Release labelled "v1.0", with release notes | Thursday 12/11 | Version label, release notes | [03 §6.3] |
| M8 | **Sprint 3 submission** (workbook, Sprint report, acceptance test document, Sprint evaluation) | Thursday 12/11, 23:59 | Upload on eLearning | [03 §7] |
| M9 | Sprint Review 3 and **acceptance test with the customer** | Friday 13/11 | Signed acceptance test minutes | [03 §6.3] |
| M10 | **Final submission** (final project plan, final workbook, Final Report, slides, peer evaluation forms) | Sunday 15/11, 23:59 | Upload on eLearning | [03 §7] |
| M11 | Final presentation; website online until the end of the day | Tuesday 17/11, 07:00 | Live demonstration | [03 §8] |

## 3.3 Sprint plan and Sprint Leader rotation
Each Sprint runs from Friday to Thursday, one week each, three Sprints in total [03 §5]. In a team of two, the Product Owner leads Sprint 2 and the other member leads Sprints 1 and 3 [03 §4.1].

| Sprint | Dates | Leader | Sprint Goal (plan) | Result | Project management focus (grading criterion S4) |
|---|---|---|---|---|---|
| Sprint 1 – agreed plan and accounts | 23/10 to 29/10 | Hồ Du Tuấn Đạt | "Users can register, log in and log out; an administrator can create and lock accounts; users who are not administrators are blocked from administrator functions by the server." | Accounts (F1) | Project Management Plan version 1.0 |
| Sprint 2 – building, monitoring and change | 30/10 to 05/11 | Nguyễn Minh Chính (Product Owner) | "Administrators manage books, categories and authors (a deleted book is hidden, not erased), and customers browse 12 books per page, newest first, on any device." Plus user story US-24, the Store Staff role (CR-06, approved 30/10) | Book management (F2), book list (F3) and US-24 | Change requests, risks and issues |
| Sprint 3 – completion and acceptance | 06/11 to 12/11 | Hồ Du Tuấn Đạt | "Customers open the details of a book and search or filter by title, author, category and price range, page by page; Release 1.0 passes the acceptance test." | Book details (F4), search and filter (F5) | Acceptance test and release |
| Closure | 13/11 to 17/11 | Both | Final Report, earned value, lessons learned, slides, video | Release 1.0 online | None |

The features follow the reference Sprints of the course brief [03 §2.2]. Any change is decided at Sprint Planning and recorded in section 3.8.

## 3.4 Items of the Product Backlog in each Sprint (plan)
Story points come from the estimation log (version 1.1). On 30/10/2026 they were set by the Product Owner without voting rounds; a later real voting session replaced them.

| Sprint | Items | Story points (plan) |
|---|---|---|
| Sprint 1 | US-01 register; US-02 log in and log out; US-03 administrator creates and locks accounts; US-04 role checks on the server; NFR-01 encrypted passwords and input checks; NFR-03 first version of the website online | 18 |
| Sprint 2 | US-05 add a book; US-06 edit a book; US-07 hide a book (it is not erased); US-08 manage categories; US-09 manage authors; NFR-02 at least 30 sample books; US-10 book list with 12 books per page, newest first; NFR-04 layout for every screen size | 24 |
| Sprint 2, change request CR-06 (approved 30/10, option B) | US-24 Store Staff role and its permissions | 5 |
| Sprint 3, change request CR-06 (approved 30/10, option B) | US-25 "Last updated by" record | 2 in plan version 1.1, **3** in plan version 1.2 |
| Sprint 3 | US-11 book details page (with a friendly message when a book is not found, and a Back button that keeps the page); US-12 search by title or author; US-13 filter by category and price range, page by page; NFR-05 book list loads in under 2 seconds | 13 in plan version 1.1, **18** in plan version 1.2 (US-11: 3, US-12: 5, US-13: 5, NFR-05: 5) |
| Total for Release 1.0 | | **68 story points** in plan version 1.2 (after CR-07): Sprint 1 18, Sprint 2 29, Sprint 3 21. It was 62 in plan version 1.1 (Sprint 3: 15) and 55 in plan version 1.0 |

## 3.5 Available hours and expected velocity
Formula for each Sprint: **available hours = sum over the members of (days available × focused hours per day)**. Expected velocity comes from the available hours; it is not copied from the earlier team assignment, whose 22 story points per two weeks do not apply to one-week Sprints [05 #10].

| Sprint | Đạt (hours) | Chính (hours) | Available hours | Source |
|---|---|---|---|---|
| Sprint 1 | 20 | 20 | 40 | Team input record (plan value, set by the Product Owner on 30/10/2026) |
| Sprint 2 | 20 | 20 | 40 | Same |
| Sprint 3 | 20 | 20 | 40 | Same |
| **Release** | **60** | **60** | **120** | |

**Planning assumption, adopted by the Product Owner on 30/10/2026 as the plan value.** The working agreement of the team assignment used 4 focused hours per member per day. With 5 working days per Sprint (Friday and Monday to Thursday) this gives 4 × 5 × 2 = **40 hours per Sprint (plan)** and 120 hours for the release.

Expected velocity (story points per Sprint) = total story points ÷ 3 when the work is spread evenly, checked against the hours that the tasks of the Sprint need (sum of task estimates no more than the available hours). With 55 story points: **expected velocity = 55 ÷ 3, about 18.3 story points per Sprint (plan)**. The split by feature gives Sprint 1 18, Sprint 2 24 and Sprint 3 13 story points, so Sprint 2 is above the average and Sprint 3 below it; the hours check (task estimates no more than 40 hours) is the real limit. Velocity is recalculated from the **actual** velocity at the Sprint 2 and Sprint 3 Planning [03 §6.2].

## 3.6 Budget and earned value plan
- **Budget = total planned person-hours of the release × 200,000 VND** [03 §6.4].
- Plan: 120 hours × 200,000 = **24,000,000 VND (plan; available hours confirmed by the Product Owner on 30/10/2026)**. The Excel version of this plan, the Master Plan workbook, has the same figures.
- Plan for each Sprint: **Planned Value after Sprint n = budget × n ÷ 3**, giving 8.0 million (Sprint 1), 16.0 million (Sprint 2) and 24.0 million VND (Sprint 3).
- Earned Value = budget × (story points Done so far ÷ total story points); Actual Cost = hours logged in Jira so far × 200,000 VND. Schedule variance, cost variance, Schedule Performance Index, Cost Performance Index, Estimate at Completion and Estimate to Complete follow the course formulas [03 §6.4]. Actual figures are collected each Sprint in the team input record.
- If change request CR-06 is approved, the total story points and the budget are recalculated, and both the old and the new plan versions are kept (section 3.8).

## 3.7 Master schedule (work packages by date)
Dates inside each Sprint are the team's proposal and may be adjusted at Sprint Planning. The numbers P00 to P36 identify the work packages of the team's roadmap.

| Number | Work package | Start | Due | Owner | Depends on |
|---|---|---|---|---|---|
| **Sprint 1 (23/10 to 29/10)** ||||||
| P00 | Code storage on GitHub and access for the lecturer | 27/10 | 27/10 | Đạt | None |
| P01 | Kick-off, roles, working agreement, available hours | 27/10 | 28/10 | Both | P00 |
| P02 | Product Backlog version 1.0 (Given–When–Then acceptance criteria, Definition of Ready) | 27/10 | 28/10 | Product Owner | P01 |
| P03 | Planning Poker, Release Plan, budget | 28/10 | 28/10 | Product Owner and Sprint Leader | P02 |
| P04 | Choice of technology, project skeleton, first version online | 27/10 | 28/10 | Đạt | P01 |
| P05 | Sprint 1 Planning, entered into Jira | 28/10 | 28/10 | Sprint Leader | P03 |
| P06 to P07 | Build accounts (F1); test cases for accounts | 28/10 | 29/10 | Both | P04, P05 |
| P08 | Project Management Plan version 1.0 (7 parts) | 27/10 | 29/10 | Sprint Leader and Product Owner | P01, P03 |
| P09 | Change Log entry, impact analysis and options for CR-06 | 28/10 | 29/10 | Product Owner | P03 |
| P10 | Daily record, burndown chart, actual hours | 23/10 | 29/10 | Sprint Leader | Continuous |
| P11 | Prepare and submit Sprint 1 | 29/10 | 29/10, 23:59 | Sprint Leader | All above |
| P12 | Sprint Review and Retrospective 1, Change Control Board | 30/10 | 30/10 | Sprint Leader and Product Owner | P11 |
| **Sprint 2 (30/10 to 05/11)** ||||||
| P13 | Sprint 2 Planning (with the actual velocity of Sprint 1) | 30/10 | 30/10 | Sprint Leader | P12 |
| P14 | Update the plan after the board decision; version label | 30/10 | 31/10 | Product Owner | Board decision |
| P15 | Build book management (F2) and load at least 30 sample books | 31/10 | 03/11 | Both | P13 |
| P16 | Build the book list (F3) | 02/11 | 04/11 | Both | P15 |
| P17 | Build user story US-24 of CR-06 (approved 30/10, option B) | 01/11 | 04/11 | Both | P14 |
| P18 | Test cases for book management, book list and CR-06; repeat tests of accounts | 03/11 | 05/11 | Both | P15 to P17 |
| P19 | Weekly status report, risk and issue log | 30/10 | 05/11 | Sprint Leader | Continuous |
| P20 | Change request form | 31/10 | 05/11 | Product Owner | P14 |
| P21 | Prepare and submit Sprint 2 | 05/11 | 05/11, 23:59 | Sprint Leader | All above |
| P22 | Sprint Review and Retrospective 2 | 06/11 | 06/11 | Sprint Leader | P21 |
| **Sprint 3 (06/11 to 12/11)** ||||||
| P23 | Sprint 3 Planning (with the actual velocity of Sprint 2) | 06/11 | 06/11 | Sprint Leader | P22 |
| P24 to P25 | Build book details (F4) and search and filter (F5) | 07/11 | 10/11 | Both | P23 |
| P26 | Tests of book details and search; repeat tests of features F1 to F3; speed check | 10/11 | 11/11 | Both | P24, P25 |
| P27 | Release 1.0: copy into the release version of the code, version label, release notes | 11/11 | 12/11 | Sprint Leader | P26 |
| P28 | Acceptance test script (all acceptance criteria) | 10/11 | 12/11 | Product Owner | P26 |
| P29 | Monitoring and draft earned value | 06/11 | 12/11 | Sprint Leader | Continuous |
| P30 | Prepare and submit Sprint 3 | 12/11 | 12/11, 23:59 | Sprint Leader | All above |
| P31 | Sprint Review 3, acceptance test and minutes | 13/11 | 13/11 | Sprint Leader and Product Owner | P30 |
| **Closure (13/11 to 17/11)** ||||||
| P32 | Final website, demo accounts, closure data | 13/11 | 14/11 | Đạt | P31 |
| P33 | Final Report, earned value, lessons learned, final project plan and workbook | 13/11 | 15/11 | Both | P31, P32 |
| P34 | Slides and demo video of at most 3 minutes | 14/11 | 15/11 | Both | P33 |
| P35 | Final submission and one peer evaluation form per member | 15/11 | 15/11, 23:59 | Both | P33, P34 |
| P36 | Final presentation | 16/11 | 17/11, 07:00 | Both | P35 |

**Critical path:** P02, P03, P05, P06, P11, P13, P15, P16, P18, P21, P23, P25, P26, P27, P31, P33, P35. Fixed events that cannot be moved: the Change Control Board (30/10), the Sprint Reviews (30/10, 06/11, 13/11) and the acceptance test (13/11).

## 3.8 Plan versions and change history
| Plan version | Date | Reason | Total story points | Budget | Version label |
|---|---|---|---|---|---|
| Version 1.0 | 30/10/2026 | Sprint 1 submission | 55 | 24,000,000 VND | "baseline-v1.0" |
| Version 1.1 | 04/11/2026 | Change Control Board on 30/10: CR-06 approved, option B | 62 | 26,400,000 VND (132 hours × 200,000; the 12 hours of the change add 2,400,000) | "baseline-v1.1" |
| Version 1.2 | 15/11/2026 | Change Control Board on 13/11: CR-07 approved (Sprint 3 story points from Planning Poker session 3) | 68 | 26,400,000 VND (unchanged) | "baseline-v1.2" |

**Planned Value after the new plan version (plan):** after Sprint 1, 8.8 million; after Sprint 2, 17.6 million; after Sprint 3, 26.4 million VND. The Sprint 1 earned value figures (02/11) keep the version 1.0 values (Planned Value 8.0 million), because they were calculated before the new version; from Sprint 2 on, version 1.1 is used. The 12 hours of the change fit into the planned task hours of Sprint 2 (39.75 hours, within 40) and Sprint 3 (13 plus 2 story points, with spare time before the acceptance test).

### Schedule deviation observed (30/10/2026, 00:45)
- The Sprint 1 documents were not yet in the shared folder at the deadline of 29/10, 23:59. If the eLearning upload was also late, the penalty is 10% of the Sprint grade for every 5 hours late [03 §4.2]. Submission time: to be recorded by the Sprint Leader. Recorded as issue I-01 and as an input for the Sprint 1 Retrospective.
