# PMP Part 4 – Quality Plan

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 0 (TA) | 15/10/2026 | Team 6 | Single-level DoD, 7 items (DoD-1…DoD-7) [04 §2] |
| 1.0-draft | 30/10/2026 | Hồ Du Tuấn Đạt (AI-assisted) | Split into 3-level DoD (Story / Sprint / Release) with evidence and checker [05 #12]; DoD-2 changed from "merged to main" to "merged to develop via reviewed PR" [05 #13]; added metrics and test approach |

## 4.1 Definition of Done – 3 levels
### Story DoD (each backlog item)
| # | Criterion | Evidence | Checker |
|---|---|---|---|
| SD-1 | Every AC of the item passes (from v0 DoD-1) | Test case file with actual result = Pass | PO |
| SD-2 | Code reviewed by the other member and merged into `develop` through a PR (v0 DoD-2, revised) | Approved PR link | Reviewer |
| SD-3 | Automated tests for new logic pass (v0 DoD-3) | Test run output / CI | Developer |
| SD-4 | Works at 360/768/1280 px on Chrome and one other browser (v0 DoD-4) | Screenshots | Reviewer |
| SD-5 | Client and server validation present; no secret in code | PR checklist | Reviewer |
| SD-6 | Jira task Done with Completed Work logged (v0 DoD-7) | Jira | Leader |

### Sprint DoD (end of each Sprint)
| # | Criterion | Evidence | Checker |
|---|---|---|---|
| SpD-1 | All committed items meet Story DoD; unfinished items returned to the Product Backlog | Sprint Backlog status | PO |
| SpD-2 | No open high-severity defect (v0 DoD-5) | Defect list | Leader |
| SpD-3 | Increment deployed on the hosted URL and demonstrated against ACs | URL + Review demo | Sponsor |
| SpD-4 | Regression of earlier features passes | Regression test results | Developer |
| SpD-5 | Workbook, Sprint Report and Jira figures reconciled; files submitted on time | Submission receipt | Leader |

### Release DoD (Release 1.0)
| # | Criterion | Evidence | Checker |
|---|---|---|---|
| RD-1 | F1–F5 (+ approved CRs) all ACs pass in UAT | Signed UAT minutes | Sponsor |
| RD-2 | NFRs met: ≥ 30 books, list < 2 s, hashing, validation, responsive | NFR test records | PO |
| RD-3 | `develop` merged into `main`, tag `v1.0`, release notes | GitHub release | Leader S3 |
| RD-4 | Docs updated: README (how to run), release notes, user notes (v0 DoD-6) | Repo | Reviewer |
| RD-5 | Site online until 17/11/2026 with demo accounts | URL check | Leader S3 |

## 4.2 Quality metrics
| Metric | Formula | Target | Collected |
|---|---|---|---|
| AC pass rate | ACs passed ÷ ACs tested | 100 % at Sprint end | Each Sprint, test case file |
| Test case coverage | ACs with ≥ 1 test case ÷ total ACs | 100 % | Each Sprint |
| Defects by severity | Count of Critical / High / Medium / Low | 0 open Critical/High at Sprint end | Defect list |
| Reopen rate | Items reopened after Done ÷ items Done | ≤ 10 % | Each Sprint |
| Page load | Median of 3 loads of list page | < 2 s | S2, S3 |

## 4.3 Test approach
- **Test cases from ACs:** at least one test case per AC, format GWT → steps → expected → actual → Pass/Fail [03 §6.1-7].
- **Levels:** automated tests for validation, auth and permission logic; manual functional tests per AC; regression of earlier features each Sprint; performance check of the list page; UAT script mapped to every AC in S3.
- **Defect severity:** Critical (blocks a Must AC or security), High (AC fails, workaround exists), Medium (non-AC behaviour), Low (cosmetic).
