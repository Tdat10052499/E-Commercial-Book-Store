# Project Management Plan, Part 4 – Quality Plan

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 0 (team assignment) | 15/10/2026 | Team 6 | A single Definition of Done with 7 items [04 §2] |
| 1.0-draft | 30/10/2026 | Hồ Du Tuấn Đạt | Split into a Definition of Done at three levels (story, Sprint, release), each with its evidence and the person who checks it [05 #12]. The second item changed from "added to the release version of the code" to "added to the shared working version after a review by the other member" [05 #13]. Quality measures and test approach added |
| 1.1 | 17/11/2026 | Hồ Du Tuấn Đạt | Rewritten in plain language without abbreviations; no change of content |

## 4.1 Definition of Done at three levels
### Story level (each item of the Product Backlog)
| # | Criterion | Evidence | Checked by |
|---|---|---|---|
| Story 1 | Every acceptance criterion of the item passes | Test case document with the actual result "Pass" | Product Owner |
| Story 2 | The other member has reviewed and approved the code before it is added to the shared working version | Link to the approved code change on GitHub | Reviewer |
| Story 3 | The automated tests for the new logic pass | Result of the automated test run | Developer |
| Story 4 | Works at screen widths of 360, 768 and 1280 pixels in Chrome and one other browser | Screenshots | Reviewer |
| Story 5 | Input is checked in the browser and on the server; no password or secret key in the code | Review checklist | Reviewer |
| Story 6 | The Jira task is Done and the time spent is logged | Jira | Sprint Leader |

### Sprint level (end of each Sprint)
| # | Criterion | Evidence | Checked by |
|---|---|---|---|
| Sprint 1 | All committed items meet the story level; unfinished items go back to the Product Backlog | Status in the Sprint Backlog | Product Owner |
| Sprint 2 | No open high-severity defect | Defect list | Sprint Leader |
| Sprint 3 | The new version is on the live website and demonstrated against the acceptance criteria | Website address and Sprint Review demonstration | Sponsor |
| Sprint 4 | Repeat tests of earlier features pass | Results of the repeat tests | Developer |
| Sprint 5 | Figures in the workbook, the Sprint report and Jira match; documents submitted on time | Submission receipt | Sprint Leader |

### Release level (Release 1.0)
| # | Criterion | Evidence | Checked by |
|---|---|---|---|
| Release 1 | All acceptance criteria of features F1 to F5 and of the approved change requests pass in the acceptance test | Signed acceptance test minutes | Sponsor |
| Release 2 | Non-functional requirements met: at least 30 books, book list in under 2 seconds, passwords encrypted, input checked, layout works on all screen sizes | Test records of the non-functional requirements | Product Owner |
| Release 3 | The shared working version is copied into the release version of the code, labelled "v1.0", with release notes | Release page on GitHub | Sprint 3 Leader |
| Release 4 | Documents updated: installation guide, release notes, user notes | Source code folder | Reviewer |
| Release 5 | Website online until 17/11/2026, with demo accounts | Check of the website address | Sprint 3 Leader |

## 4.2 Quality measures
| Measure | How it is calculated | Target | When it is collected |
|---|---|---|---|
| Acceptance criteria passed | Acceptance criteria passed ÷ acceptance criteria tested | 100% at the end of the Sprint | Every Sprint, from the test case documents |
| Test coverage | Acceptance criteria with at least one test case ÷ all acceptance criteria | 100% | Every Sprint |
| Defects by severity | Number of critical, high, medium and low defects | No open critical or high defect at the end of the Sprint | Defect list |
| Items reopened | Items reopened after Done ÷ items Done | At most 10% | Every Sprint |
| Page load time | Middle value of 3 loads of the book list | Under 2 seconds | Sprints 2 and 3 |

## 4.3 Test approach
- **Test cases from acceptance criteria:** at least one test case for each acceptance criterion, written as Given–When–Then, then steps, expected result, actual result and Pass or Fail [03 §6.1-7].
- **Test levels:** automated tests for input checks, sign-in and permission logic; manual tests of each acceptance criterion; repeat tests of earlier features every Sprint; a speed check of the book list; an acceptance test script in Sprint 3 that covers every acceptance criterion.
- **Defect severity:** critical (blocks a "Must have" acceptance criterion, or a security problem), high (an acceptance criterion fails but there is a workaround), medium (behaviour outside the acceptance criteria), low (appearance only).
