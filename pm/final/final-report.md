# Final Report – E-Commercial Book Store, Release 1.0

| Field | Value |
|---|---|
| Course | Software Project Management (course code 72ITSE41503), Semester 261 – Final Project |
| Team | Team 6 "Page Turners": Hồ Du Tuấn Đạt (Developer, Sprint Leader of Sprint 1 and Sprint 3) and Nguyễn Minh Chính (Product Owner, Developer, Sprint Leader of Sprint 2) |
| Sponsor and customer | Dr. Bùi Minh Phụng, in the role of Ms. Le, owner of the bookstore chain |
| Period | Friday 23/10/2026 to Tuesday 17/11/2026, in three Sprints of one week each |
| Website | https://pagetunnel.vercel.app/ (hosted free of charge on Vercel, with the database on Supabase) |
| Source code | https://github.com/Tdat10052499/E-Commercial-Book-Store |
| Task board | https://tdat100524.atlassian.net/jira/software/projects/ECBS/boards/2 (Jira project "ECBS") |
| Figures as of | Sunday 15/11/2026, 12:30 Vietnam time. Hours come from the time logged in Jira, read on 15/11 at 12:30 (last entry 12/11, 18:46) |

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 0.1 | 15/11/2026 | Nguyễn Minh Chính (Product Owner) | First full draft, built from the Sprint records, the Product Owner's acceptance record, the acceptance test of 13/11, the board decision on change request CR-07 and Jira. Fields marked "to be confirmed" need data from the team |
| 0.2 | 16/11/2026 | Nguyễn Minh Chính (Product Owner) | Final set of documents completed: Project Management Plan, presentation slides and peer evaluation forms built from the same figures. No figure changed |
| 0.3 | 17/11/2026 | Hồ Du Tuấn Đạt | Added the release label "v1.0" of the source code (created 16/11) in the milestones, the closure checklist and the links. No figure changed |
| 0.4 | 17/11/2026 | Hồ Du Tuấn Đạt | Whole report rewritten in plain language for readers who do not use GitHub or Jira: abbreviations written out in full, GitHub terms replaced by plain descriptions. Only identifiers of user stories, test cases, requirements, change requests, defects, risks, issues and lessons are kept. No figure changed |
| 0.5 | 18/11/2026 | Hồ Du Tuấn Đạt | Link of the Sprint Review 3 video added. No figure changed |

**How to read the figures.** "Plan" means the values in the agreed plan (the baseline: Release Plan and Sprint Backlogs). "Actual" means what really happened, taken from the hours logged in Jira, the history of the source code on GitHub and the Product Owner's acceptance record. Work is costed at 200,000 VND per person-hour, and the project has 3 Sprints, as set by the course [03 §6.4]. Story points measure the relative size of a piece of work. A story's points count as "Done" only when the story meets the team's Definition of Done: every acceptance criterion passes on the live website, the other member has reviewed the code, all automated tests pass and the Product Owner has accepted the story.

## 1. Project summary and result of Release 1.0
**Goal.** Deliver an online, responsive book catalogue that works on phones, tablets and computers. Administrators manage accounts, roles and books. Customers browse, open, search and filter at least 30 sample books. The Sponsor accepts the product in the acceptance test on 13/11/2026.

**Result.**
- **The Sponsor accepted the product in the user acceptance test on 13/11/2026: all 73 of 73 acceptance criteria passed.** No defect was found and no new change was requested (acceptance test minutes, file c5).
- Scope delivered: the five features F1 to F5 (F1 accounts and roles, F2 book management, F3 book list, F4 book details, F5 search and filter) plus the approved change CR-06 (a new Store Staff role and a "Last updated by" record on every book). In total 20 items of the Product Backlog. Nothing was cut. Shopping cart, checkout and sign-in with social media accounts were outside the scope set by the lecturer [03 §2.2].
- **66 of the 68 planned story points meet the Definition of Done** (plan version 1.2, after change request CR-07). The remaining 2 story points belong to requirement NFR-03 (the website stays online until 17/11); the Product Owner accepts it after the check on 17/11.
- Earned value at closure: **schedule performance 0.97 and cost performance 1.50** (section 3.3).
- Quality: all 114 automated tests pass. Six defects were found during the Sprints and all were fixed; none was rated critical or high. No defect is open.
- Two change requests went through the Change Log and the Change Control Board (the Sponsor and the team): CR-06 from the Sponsor (approved, option B) and CR-07 from the Product Owner (new size estimate for the Sprint 3 work, approved).

| Item | Plan | Actual |
|---|---|---|
| Scope | 20 items. Total planned size 55 story points (plan version 1.0), then 62 (version 1.1, after CR-06), then **68** (version 1.2, after CR-07) | All 20 items delivered; 66 of 68 story points Done; 73 of 73 acceptance criteria passed in the acceptance test |
| Schedule | 3 Sprints, acceptance test on 13/11, final submission on 15/11 | Acceptance test held on 13/11 and accepted. In each Sprint, acceptance came late (sections 2 and 3.2) |
| Cost | Budget 26,400,000 VND (132 hours) | Actual cost 17,046,000 VND (85.23 hours logged). Section 3.3 explains the limits of this figure |
| Quality | No open critical or high defect; every acceptance criterion covered by a test case | No open defect; each of the 73 acceptance criteria has at least one test case |

## 2. Results of each Sprint
| | Sprint 1: agreed plan and accounts (F1) | Sprint 2: building, monitoring and change | Sprint 3: completion and acceptance |
|---|---|---|---|
| Dates and Sprint Leader | 23/10 to 29/10, Hồ Du Tuấn Đạt | 30/10 to 05/11, Nguyễn Minh Chính | 06/11 to 12/11, Hồ Du Tuấn Đạt |
| Sprint Goal | Users register, log in and log out; the administrator creates and locks accounts; users who are not administrators are blocked by the server | Administrators manage books, categories and authors (a deleted book is hidden, not erased); customers browse 12 books per page, newest first, on any device; plus user story US-24, the Store Staff role (change request CR-06) | Customers open the details of a book and search or filter by title, author, category and price range, page by page; Release 1.0 passes the acceptance test |
| Goal met? | **Partly.** Accounts were built and put online, but no item was accepted by the end of the Sprint | **Partly.** All 9 items were built and put online, but only 2 were accepted by the end of the Sprint | **Met.** 5 new items and 7 items carried over from Sprint 2 were accepted; the acceptance test passed on 13/11 |
| Story points committed | 18 | 29 (24, plus 5 for user story US-24) | 15 at first, then **21** after the new estimate, plus 24 story points carried over from Sprint 2 |
| Story points Done by the end of the Sprint (velocity) | **0** | **5** (user story US-10 and requirement NFR-02) | **45** (21 new and 24 carried over) |
| Story points accepted later | 16, during the week of Sprint 2 (user stories US-01 to US-04 on 05/11, requirement NFR-01 on 06/11); 2 for requirement NFR-03 on 17/11 | 24, during Sprint 3 (09/11 to 12/11) | None |
| Task hours, planned and actual | 48 planned, **41** actual | 39.75 planned, **24** actual | 39.5 planned, **20.23** actual (hours after 12/11, 19:59 still to be logged) |
| Burndown chart (section 3.2) | Flat at 48 hours, because the hours were entered after the Sprint | 39.75, then 30.75, then **6.25 hours**: most work was added to the shared code on the last day | Flat on days 1, 2 and 5, steep on days 4 and 6, and not at zero on day 7 (the daily meetings of days 2 and 3 were not held) |
| Main problems | Sprint 1 documents were not in the shared folder by 29/10, 23:59 (issue I-01); no Planning Poker votes (issue I-04); hours entered after the Sprint | Book management (F2) started late (issue I-02); the test of the administrator pages on the live website was left to the last hour; code changes were added without review by the other member (issue I-06); daily meetings were not held (issue I-05) | The Sprint 2 Retrospective and the Sprint 3 Planning were held 5 days late; Đạt was busy on 10/11 (issue I-07); design work done outside the Product Backlog caused defect DEF-S3-03; Planning Poker took place after the work was built (change request CR-07) |
| How they were solved | Catch-up session on 29 and 30/10; three actions from the Sprint 1 Retrospective (hold a daily meeting, start drafts early, log hours on the same day) | The Product Owner took over the database design task (issue I-02); Sprint 2 was planned in hours instead of story points; the carried-over items were accepted in Sprint 3 after testing on the live website | A daily plan with one daily meeting task per day; the person who runs a test is never the person who wrote it; approval by the other member before a code change is added; tasks updated on the same day |

Velocity, meaning the story points accepted as Done within each Sprint, was 0 in Sprint 1, 5 in Sprint 2 and 45 in Sprint 3. Over the release, 66 story points were Done in 3 Sprints, an average of **22 story points per Sprint**, against an expected 18.3 (plan version 1.0) to 22.7 (plan version 1.2). The values of Sprint 1 and Sprint 2 are low because items were accepted one Sprint after they were built, not because the work was missing.

## 3. Plan versus actual
### 3.1 Scope
| | Plan version 1.0 (30/10) | Plan version 1.1 (04/11, after CR-06) | Plan version 1.2 (15/11, after CR-07) | Actual (15/11) |
|---|---|---|---|---|
| Items | 18 (features F1 to F5 and the non-functional requirements) | 20 (user stories US-24 and US-25 added) | 20 | 20 delivered |
| Total planned story points | 55 | 62 | 68 | 66 Done, plus 2 (requirement NFR-03) on 17/11 |
| Story points of Sprint 1 / Sprint 2 / Sprint 3 | 18 / 24 / 13 | 18 / 29 / 15 | 18 / 29 / 21 | 0 / 5 / 45 Done within each Sprint, plus 16 story points of Sprint 1 accepted in the week of Sprint 2 |
| Added by change requests | None | CR-06: 7 story points, 12 hours, 2,400,000 VND | CR-07: 6 story points, no hours, no cost (new estimate only) | Both change requests delivered |
| Out of scope | Shopping cart, checkout, payment, sign-in with social media | Same | Same | Not built. Visual improvements of the home page (banners, rows of books, a Favorite button) were built **without an item in the Product Backlog**. This is recorded as lesson LL-04 and as a known issue |

Version 1.4 of the Product Backlog and the Release Plan (Project Management Plan, Part 3, sections 3.4 and 3.8) keep all three versions of the plan.

### 3.2 Schedule
| Milestone | Plan | Actual |
|---|---|---|
| M2: Sprint 1 submission | 29/10, 23:59 | Sprint 1 documents completed in the shared folder on 30/10 (issue I-01); upload time on eLearning not recorded |
| M3: Sprint Review 1 and board meeting on CR-06 | 30/10 | Held on 30/10: CR-06 approved, option B |
| M4: version label for plan version 1.0 | 30/10 | Label "baseline-v1.0" created on 02/11 |
| M5: Sprint 2 submission | 05/11, 23:59 | Submitted; Sprint documents saved in the shared folder on 06/11 at 09:24 (upload time to be confirmed) |
| M6: Sprint Review 2 | 06/11 | Held on 06/11 in class (Đạt presented); Sprint 2 Retrospective held on 11/11, 5 days late |
| M7: Release 1.0 and release notes | 12/11 | Release notes written on 12/11; the release version of the code was completed on 12/11; the label "v1.0" was added to it on 16/11 |
| M8: Sprint 3 submission | 12/11, 23:59 | Submitted on time (workbook, Sprint report, acceptance test document, Sprint evaluation) |
| M9: Sprint Review 3 and acceptance test | 13/11 | Sprint Review 3 video recorded and submitted; acceptance test on 13/11 **accepted** (73 of 73); board approved CR-07 |
| M10: final submission | 15/11, 23:59 | This report, the final Project Management Plan, the final workbook, the slides and the peer evaluation forms |
| M11: final presentation | 17/11, 07:00 | Planned; requirement NFR-03 is checked on the same day |

**Burndown charts (task hours remaining, planned versus actual).**

![Sprint 1 burndown](../sprints/S1/evidence/burndown-S1.png)

Sprint 1: the line stays flat because the hours were entered in Jira only after the Sprint (on 02/11 and 05/11). The plan line therefore cannot be compared day by day. This is the first lesson about data quality (lesson LL-02).

![Sprint 2 burndown](../sprints/S2/evidence/burndown-S2.png)

Sprint 2: the remaining work went from 39.75 hours to 30.75 hours on day 4 and to 6.25 hours on day 5 (05/11). Most of the work was added to the shared code on the last day (at 12:55 and 22:52), so the line drops steeply at the end. The lecturer commented on this at Sprint Review 2, and the Sprint 2 Retrospective added an action to update tasks on the same day.

![Sprint 3 burndown](../sprints/S3/evidence/burndown-S3.png)

Sprint 3: flat on days 1 and 2 (the first task was not done and the daily meetings of days 2 and 3 were not held) and on day 5 (Đạt was busy, issue I-07); steep on day 4 (9.5 hours less) and day 6 (7.5 hours less). The day 7 tasks were done on day 7, so the line does not fall all at once as in Sprint 2. It does not reach zero, because the daily meetings of days 2 and 3 were not held and are kept as deviations.

### 3.3 Cost – Earned Value Management
Earned Value Management compares the plan, the progress and the cost in money. The course formulas [03 §6.4] are:
- **Planned Value** = budget × (Sprints finished ÷ 3).
- **Earned Value** = budget × (story points Done ÷ total planned story points).
- **Actual Cost** = hours logged × 200,000 VND.
- **Schedule Performance Index** = Earned Value ÷ Planned Value. Below 1 means behind schedule.
- **Cost Performance Index** = Earned Value ÷ Actual Cost. Above 1 means less money spent than value delivered.
- **Estimate at Completion** = budget ÷ Cost Performance Index; **Estimate to Complete** = Estimate at Completion − Actual Cost.

| Point in time (plan version: budget, total story points) | Planned Value (VND) | Earned Value (VND) and story points Done | Actual Cost (VND) and hours | Schedule Performance Index | Cost Performance Index | Estimate at Completion (VND) |
|---|---|---|---|---|---|---|
| End of Sprint 1, 02/11 (version 1.0: 24.0 million, 55) | 8,000,000 | 0 (0 of 55) | 3,900,000 (19.5 hours) | 0.00 | 0.00 | Not computable |
| End of Sprint 2, 06/11 (version 1.1: 26.4 million, 62) | 17,600,000 | 8,941,935 (21 of 62) | 13,000,000 (65 hours) | 0.51 | 0.69 | 38,380,952 |
| End of Sprint 3, 12/11 at 18:55 (version 1.1: 26.4 million, 62) | 26,400,000 | 25,548,387 (60 of 62) | 17,046,000 (85.23 hours) | 0.97 | 1.50 | 17,614,200 |
| **Closure, 15/11 (version 1.2: 26.4 million, 68)** | **26,400,000** | **25,623,529 (66 of 68)** | **17,046,000 (85.23 hours)** | **0.97** | **1.50** | **17,562,545** |

At closure, the schedule variance (Earned Value − Planned Value) is −776,471 VND, the cost variance (Earned Value − Actual Cost) is +8,577,529 VND, and the estimate to complete is 516,545 VND. The Sprint 1 hours were later corrected from 19.5 to 41 hours (the second part of the test on the live website was logged on 05/11), which is why the Actual Cost at the end of Sprint 2 uses 65 hours.

**What the figures mean.**
- **Schedule:** the Schedule Performance Index is 0.97 at closure, meaning about 97% of the planned progress. The only gap is requirement NFR-03 (2 story points), which cannot be checked before 17/11. During the project the index was far lower (0.00 after Sprint 1, 0.51 after Sprint 2), because items were accepted one Sprint after they were built. The value came late; it was not missing.
- **Cost:** the Cost Performance Index of 1.50 means the team logged far fewer hours (85.23) than planned (132). This is not only efficiency:
  - the hours of Sprint 1 and Sprint 2 were partly entered from memory after the Sprint (lesson LL-02);
  - part of the testing and the documentation was done with help from AI tools (Appendix D), so estimates made without AI were too high (lesson LL-06);
  - some Sprint 3 hours after 12/11, 19:59 are not yet in Jira (to be confirmed).
  - The index should be read as "the project used less logged effort than its budget", not as proof that the team works 50% faster than planned.
- **Effect of change request CR-07:** the new estimate of the Sprint 3 items raised the total planned story points from 62 to 68. Earned Value rose by 75,142 VND (from 60 of 62 to 66 of 68 of the budget); both indexes stay at 0.97 and 1.50.

### 3.4 Quality
| Measure (Quality Plan, section 4.2) | Target | Actual |
|---|---|---|
| Acceptance criteria covered by test cases | All acceptance criteria | All 73 acceptance criteria have at least one test case (24 for accounts; 33 for book management, book list and user story US-24; 16 for book details, search and filter, requirement NFR-05 and user story US-25) |
| Acceptance criteria passed in the acceptance test | All | **73 of 73 passed (100%)** on 13/11 |
| Tests on the live website before the acceptance test | From Sprint 3, the person who runs a test is not the person who wrote it | Sprint 3 test cases were written by Chính and run by Đạt: 15 passed, and test case TC-CR-08 passed in part (there is no screen to rename a book's editor; that part is covered by an automated test) |
| Automated tests | All pass | 114 of 114 pass (run on 12/11) |
| Repeat tests of earlier features | Every Sprint | Accounts re-tested in Sprint 2 (16 of 16 automated tests); accounts, book management and book list re-tested in Sprint 3 (71 of 71 automated tests and 15 of 15 quick checks on the live website) |
| Defects by severity | No open critical or high defect | 6 found, all fixed, none open: DEF-F1-01 (Sprint 1, severity not recorded), DEF-F2-01 medium and DEF-F2-02 low (Sprint 2), DEF-S3-01, DEF-S3-02 and DEF-S3-03 low (Sprint 3); none found in the acceptance test |
| Items reopened after acceptance | At most 10% | 1 of 20 items (5%): requirement NFR-04 was put on hold on 12/11 because of defect DEF-S3-03 and accepted again the same day |
| Time to load the book list (requirement NFR-05) | Typical time under 2 seconds | 0.50 seconds for the book list; 0.38 seconds for page 3 with search and filter |

## 4. Risks and changes
### 4.1 Risks that occurred and how well the responses worked
| Risk | What happened | Response | Effect of the response |
|---|---|---|---|
| R01 workload of two members, R02 project plan written from scratch | Sprint 1 documents were late (issue I-01) | Catch-up night, earlier drafts from the team assignment reused, action from the Sprint 1 Retrospective | Partly effective: Sprint 2 and Sprint 3 documents were submitted; the Sprint 1 upload time was not recorded |
| R05 extra scope from change request CR-06 | 7 more story points and 12 more hours in Sprints 2 and 3 (issue I-03) | Option B, delivered in two steps (user story US-24 in Sprint 2, US-25 in Sprint 3); plan updated to version 1.1 | Effective: CR-06 delivered in Release 1.0; all 8 of its acceptance criteria passed in the acceptance test |
| R06 evidence of Planning Poker and of regular code work | No voting rounds in Sprints 1 and 2 (issue I-04); only one saved code change dated in the week of Sprint 1 | Planning Poker session 3 held on 11/11 | Late: the votes came after the work was built and led to change request CR-07 (lesson LL-03) |
| R12 late integration of book management (F2) | No book management code by 04/11 (issue I-02) | The Product Owner took the database design task; Sprint 2 planned in hours | Delivered on 05/11 at 22:52, but 24 story points had to be accepted in Sprint 3 (lesson LL-01) |
| R09 a member is busy | Đạt was busy on 10/11 (issue I-07) | Task moved to day 6, test owners swapped | Effective: user story US-13 accepted on 12/11 |
| Process problems | Code changes added without review (issue I-06); daily meetings not held (issue I-05) | Approval by the other member before a change is added; daily meeting on Discord at 22:00 | Effective from 12/11 (every code change approved); daily meetings of days 2 and 3 still missed |

Risks that did not occur: R03 slow first load of the free website (watched until 17/11), R04 time tracking in Jira, R07 eLearning dates, R08 security defect, R10 state of features F3 to F5, R11 scope of the Store Staff role. The final status of every risk and issue is in the final workbook, sheets "RiskRegister" and "IssueLog" (risk register version 1.8).

### 4.2 Change requests and their real impact
| Change request | Request | Board decision | Planned impact | Actual impact |
|---|---|---|---|---|
| CR-06 (from the Sponsor, 27/10) | A Store Staff role, and "Last updated by (name) at (time)" on every book | 30/10: **approved, option B** (user story US-24 in Sprint 2, US-25 in Sprint 3) | 7 more story points (total 55 to 62), 12 more hours, 2,400,000 VND more; rework of user stories US-03 and US-04 | US-24 accepted on 09/11 and US-25 on 12/11; all 8 acceptance criteria of CR-06 passed in the acceptance test. Logged hours stayed within the 40 hours available per Sprint. One defect (DEF-S3-01, low) |
| CR-07 (from the Product Owner, 12/11) | Use the votes of Planning Poker session 3 as the size of the Sprint 3 work (US-12 from 3 to 5, NFR-05 from 2 to 5, US-25 from 2 to 3) | 13/11: **approved**, plan version 1.2. Reason: to be confirmed | 6 more story points (total 62 to 68), no hours, no cost | Product Backlog version 1.4, Release Plan sections 3.4 and 3.8, earned value at closure calculated on 68 story points; label "baseline-v1.2" added to the code |

## 5. Closure checklist
| # | Closure activity | Status | Evidence |
|---|---|---|---|
| 1 | Customer acceptance (acceptance test) | Done on 13/11: accepted, 73 of 73 passed | Acceptance test minutes (file c5); Sponsor signature to be confirmed |
| 2 | Check of requirement NFR-03 (website online on 17/11) | Planned for 17/11 | Test case TC-F1-24 |
| 3 | Release version of the code, version label "v1.0" and release notes | Release version completed on 12/11; release notes 1.0; label "v1.0" added on 16/11; label "baseline-v1.2" added to the working version of the code | GitHub |
| 4 | Hand-over of the code | Source code with a guide on how to install and run it and how to load sample data; automated tests included | GitHub |
| 5 | Hand-over of the documents | All submitted documents on eLearning; the editable sources and the exported files kept with the code | GitHub, eLearning |
| 6 | Archive | Labels for all three plan versions ("baseline-v1.0", "baseline-v1.1", "baseline-v1.2"); Jira project kept; AI usage log kept | GitHub, Jira |
| 7 | Close Sprint 3 in Jira and log the last hours | **To be confirmed**: Sprint 3 was still open on 15/11, and the hours after 12/11, 19:59 were not yet logged | Jira |
| 8 | Release resources | The website and database (free plans on Vercel and Supabase) stay online until the end of 17/11 and then remain on the free plan; demo accounts kept until the lecturer has graded | Plan |
| 9 | Lecturer access to the code and the task board | To be confirmed (check that the lecturer can open both links) | None yet |
| 10 | Lessons learned and peer evaluation | Lessons learned in section 6; each member submits a peer evaluation form | This report, eLearning |

## 6. Lessons Learned
### LL-01 Integrate and test on the live website every day, not at the end
- **Situation:** In Sprint 2 most of the work was added to the shared code on the last day (05/11, at 12:55 and 22:52), and the test of the administrator pages on the live website started in the last hour.
- **Impact:** Only 5 of 29 story points were Done at the end of the Sprint; the Schedule Performance Index fell to 0.51; the burndown chart dropped steeply at the end and the lecturer criticised it; 24 story points had to be accepted in Sprint 3.
- **Cause:** The database design was late (issue I-02), so every task that depended on it waited; the test on the live website was planned as one block at the end.
- **Lesson:** Work that is built has no value until it is tested and accepted, and acceptance needs time inside the Sprint.
- **Recommendation:** Plan the test on the live website and the Product Owner's acceptance as tasks on the day after each piece of work is built; add small code changes every day; schedule the tasks that others depend on (such as the database design) on day 1.

### LL-02 Log hours on the same day
- **Situation:** The hours of Sprint 1 and Sprint 2 were entered after the Sprint, partly from memory (Sprint 1 first 19.5 hours, later corrected to 41 hours; Đạt's 13.5 hours of Sprint 2 logged on 06/11).
- **Impact:** The Sprint 1 burndown chart is flat and cannot be used for control; the Actual Cost changed after the reports were written; the Cost Performance Index is hard to trust.
- **Cause:** No habit of moving the task card and logging time; the daily meeting was not held in Sprints 1 and 2.
- **Lesson:** Earned Value Management is only as good as the actual hours behind it.
- **Recommendation:** Move the task card and log the time as soon as a task is finished; in the daily meeting, the Sprint Leader checks that every finished task has hours.

### LL-03 Estimate with Planning Poker before the work starts
- **Situation:** The story points of Sprints 1 and 2 were set by the Product Owner alone; the first real voting round (session 3) took place on 11/11, after the Sprint 3 items were built.
- **Impact:** The votes gave 21 story points instead of 15; a change request (CR-07) and a new plan version were needed in the last week; the evidence of estimation for grading was weak.
- **Cause:** Time pressure in Sprint 1, and the Sprint 3 Planning was held late.
- **Lesson:** Estimation is part of planning; done after the work is built, it only measures what already happened.
- **Recommendation:** Hold Planning Poker during Sprint Planning and keep a photo of every vote; no item enters a Sprint without the team's votes (Definition of Ready).

### LL-04 Do not build anything that is not in the Product Backlog
- **Situation:** Visual improvements of the home page (banners, rows of books, a Favorite button and a new footer) were built and released in Sprint 3 without an item in the Product Backlog.
- **Impact:** The new footer caused defect DEF-S3-03 (buttons too small to tap on a phone, under 44 pixels), which put the accepted requirement NFR-04 on hold on the last day; the Favorite button became a known issue in the release notes; the hours had not been planned.
- **Cause:** Enthusiasm for the look of the product, and no rule that every change needs an item in the Product Backlog.
- **Lesson:** Unplanned work is unmanaged risk, even when it looks small.
- **Recommendation:** Every change goes into the Product Backlog first (the Product Owner decides, through the Change Log if it changes the scope); repeat the earlier tests before releasing changes to the screens.

### LL-05 Make code reviews and test ownership visible
- **Situation:** In Sprint 2 and early Sprint 3, code changes were added to the shared code without a recorded approval from the other member (issue I-06), and the same person wrote and ran the test cases.
- **Impact:** Weaker evidence of version control and quality; defects could stay hidden behind the assumptions of the person who wrote the test.
- **Cause:** A small team, the wish to move fast, and no rule in GitHub that requires an approval.
- **Lesson:** With two people, the review by the other member is the only independent check.
- **Recommendation:** The other member approves every code change on GitHub before it is added (every change since 12/11 met this); every test document has a "Run by" column; the person who runs a test is never the person who wrote it.

### LL-06 Take AI assistance into account when estimating
- **Situation:** Part of the testing and documentation in Sprint 3 was done with help from AI tools; Sprint 3 logged 20.23 hours against 39.5 hours planned.
- **Impact:** The Cost Performance Index of 1.50 at closure looks like strong efficiency but mixes several causes; the plan line of the burndown chart was too high.
- **Cause:** Estimates were made as if all work was done by hand.
- **Lesson:** A tool that changes productivity changes the plan; its effect must be measured and declared.
- **Recommendation:** Record the use of AI for each task (as the AI usage log does) and estimate again with Planning Poker once the team knows how much time it saves; always keep time for human review in every estimate.

### LL-07 Hold the Scrum meetings on time
- **Situation:** The Sprint 2 Retrospective and the Sprint 3 Planning (planned for 06/11) were held on 11/11; the daily meetings of days 2 and 3 of Sprint 3 were not held.
- **Impact:** The actions of the Sprint 2 Retrospective started only on day 6; the Sprint 3 burndown chart stayed flat on days 1 and 2.
- **Cause:** No fixed place and time for meetings until 11/11 (issue I-05).
- **Lesson:** A fixed time and place is what makes meetings happen.
- **Recommendation:** Fix the daily meeting time (Discord, 22:00) and the times of the Sprint Review, Retrospective and Planning at the start of the project, and record each meeting on its day.

## Appendix A – Files submitted
All file names start with "HK261_SPM_FP_Team6_".

| Submission | Files |
|---|---|
| Sprint 1 | c1_ProjectPlan.docx (Project Management Plan), c2_SprintBacklog_S1.xlsx (workbook), c3_SprintReport_S1.docx (Sprint report), c0_Eval_S1.xlsx (Sprint evaluation) |
| Sprint 2 | c2_SprintBacklog_S2.xlsx (workbook), c3_SprintReport_S2.docx (Sprint report), c4_ChangeRequest_CR01.docx (change request form), c0_Eval_S2.xlsx (Sprint evaluation) |
| Sprint 3 | c2_SprintBacklog_S3.xlsx (workbook), c3_SprintReport_S3.docx (Sprint report), c5_UAT.docx (acceptance test scripts and minutes), c0_Eval_S3.xlsx (Sprint evaluation) |
| Final | c1_ProjectPlan_Final.docx (final Project Management Plan), c2_SprintBacklog_Final.xlsx (final workbook), c6_FinalReport.docx (this report), c6_Slides.pptx (presentation slides), Eval360_Team6_(student number).xlsx (one peer evaluation form per member) |

## Appendix B – Website, demo accounts and links
| Item | Value |
|---|---|
| Website address | https://pagetunnel.vercel.app/ |
| Administrator demo account | To be confirmed: user name and password are written only in the submitted file, never in the public source code |
| Store Staff demo account | To be confirmed, as above |
| Customer demo account | To be confirmed, as above (or register a new account on the website) |
| Source code | https://github.com/Tdat10052499/E-Commercial-Book-Store (version label "v1.0") |
| Task board | https://tdat100524.atlassian.net/jira/software/projects/ECBS/boards/2 |
| Demo video (at most 3 minutes, showing acceptance criteria that pass and fail) | To be confirmed |
| Sprint Review 3 video | https://youtu.be/EyRPk3jFoMA |

## Appendix C – Work allocation and hours (actual, from the time logged in Jira)
| Member | Role | Sprint 1 hours | Sprint 2 hours | Sprint 3 hours | Total hours | Code changes submitted for review |
|---|---|---|---|---|---|---|
| Hồ Du Tuấn Đạt | Developer, Sprint Leader of Sprints 1 and 3 | 13.5 | 13.5 | 8.90 | 35.90 | 42 |
| Nguyễn Minh Chính | Product Owner, Developer, Sprint Leader of Sprint 2 | 27.5 | 10.5 | 11.33 | 49.33 | 24 |
| **Team** | | **41** | **24** | **20.23** | **85.23** | **66** |

The Sprint 3 hours after 12/11, 19:59 (release tasks, the daily meeting of day 7 and the Sprint Review 3 video) are to be confirmed until they are logged in Jira. Regular code work: only one saved code change is dated in the week of Sprint 1 (the Sprint 1 work was saved on 30/10); both members saved code changes in Sprints 2 and 3. Code changes made with AI help are part of the members' own submissions for review.

## Appendix D – Declaration of AI use
The team used AI assistants for support only. Every use is recorded, one row per use, in the AI usage log kept with the code (date, member, tool, purpose, files affected and who checked the result). The member who used the tool reviewed the result, and the other member reviewed it again before it was added to the shared code. No actual data was produced by AI: hours, Planning Poker votes, board decisions, acceptance test results, acceptance decisions and evaluation scores come only from the team and the Sponsor.

| Member | Tools | Entries in the log (to 15/11) | Main uses |
|---|---|---|---|
| Hồ Du Tuấn Đạt | Claude (claude.ai website and Claude Code), the Atlassian connector for reading Jira, Google Gemini (images) | 42 | Folder structure and work roadmap; drafts of the Project Management Plan, Product Backlog, Sprint reports and status reports; code and automated tests for features F1 to F5; formatting of the submitted files; part of the tests on the live website, with the member watching |
| Nguyễn Minh Chính | Claude (Claude app, with its built-in browser) | 27, plus this report | Product Owner decisions written into the documents; drafts of the Sprint Backlogs, acceptance test script and minutes, change request CR-07 and this report; scripts that fill the lecturer's templates; part of the tests on the live website, with the member signed in (passwords typed by the member) |

The full log is attached to the final workbook and kept with the code.
