# Project Management Plan, Part 6 – Configuration Management Plan

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 1.0-draft | 30/10/2026 | Hồ Du Tuấn Đạt | New: how the code is organised in versions, following the team's way of working on GitHub; change control process as set by the course [03 §6.2-3] |
| 1.1 | 17/11/2026 | Hồ Du Tuấn Đạt | Rewritten in plain language: abbreviations and GitHub terms replaced by plain descriptions; no change of content |

## 6.1 Items under version control
Every item below is kept with a version history, so that any earlier version can be found again.

| Identifier | Item | Type | Where it is kept | Owner | First fixed version |
|---|---|---|---|---|---|
| CI-01 | Project Management Plan (7 parts) | Document | Text sources in the project folder, exported as the submitted Project Management Plan file | Sprint Leader | Plan version 1.0 |
| CI-02 | Project workbook | Spreadsheet | One Excel workbook per Sprint, each adding to the previous one | Sprint Leader | Plan version 1.0 |
| CI-03 | Product Backlog and Definition of Ready | Document | Backlog folder of the project | Product Owner | Plan version 1.0 |
| CI-04 | Release Plan and budget | Document | Part 3 of this plan | Product Owner and Sprint Leader | Plan version 1.0 |
| CI-05 | Sprint reports | Document | One folder per Sprint, exported as the submitted Sprint report | Sprint Leader | Each Sprint |
| CI-06 | Change Log and change request forms | Document | Change folder of the project, exported as the submitted change request form | Product Owner | Each change request |
| CI-07 | Source code of the website | Code | Application folder | Developers | One version label per release |
| CI-08 | Database structure and sample data | Database | Database folder of the application | Đạt | One version label per release |
| CI-09 | Test cases and acceptance test script | Document | Sprint folders and acceptance test folder | Developers | Each Sprint |
| CI-10 | Website hosting settings (without passwords or secret keys) | Settings | Installation guide of the application and the hosting service | Đạt | Version 1.0 |

## 6.2 Naming and version numbers
- Submitted files: "HK261_SPM_FP_Team6_" followed by the file code and name set by the course, and the Sprint number where needed [03 §7]. Each Excel workbook adds to the previous one.
- Document versions: 0.x for drafts, 1.0 for the first agreed version, 1.x for approved changes, then "Final". Every document carried over from earlier work has a version history table.
- Software versions: v0.1 (Sprint 1), v0.2 (Sprint 2), v0.3 (Sprint 3), v1.0 (release).

## 6.3 How the code is organised on GitHub
- **Release version** (named "main" on GitHub): only receives finished work from the shared working version, and each release gets a version label. **Nobody saves changes directly into it** [03 §4.2].
- **Shared working version** (named "develop"): where the work of both members comes together. A change enters it only after the other member has reviewed and approved it.
- **Personal working copies:** each task is done in its own copy of the code, named after the task (one kind for code, one for project documents, one for fixes), and then submitted for review.
- GitHub is set so that the release version and the shared working version only accept reviewed changes, with at least one approval.

## 6.4 How saved changes are described
Each saved change starts with its type and the area it touches, for example "new feature for accounts: add login", "documents for the project plan: draft risk register", "fix in the book list: page numbering off by one", and ends with the number of the work phase it belongs to. Each member saves changes regularly in every Sprint.

## 6.5 Fixed versions and version labels
| Label | When | Contents |
|---|---|---|
| "baseline-v1.0" | After the Sprint 1 submission | Plan version 1.0, Product Backlog version 1.0, first Release Plan, accounts feature (F1) |
| "baseline-v1.1" | After the Change Control Board approves a change request | Updated Product Backlog, updated Release Plan, risk register |
| "v1.0" | 12/11/2026 | Code of Release 1.0 and release notes |

## 6.6 Change control process
1. **Record:** every request, from the Sponsor or the team, is entered in the Change Log with an identifier, date, requester, description and priority.
2. **Analyse the impact:** on scope (items and acceptance criteria), schedule (which Sprint), cost (hours × 200,000 VND), quality (repeat tests) and risk; the size in story points is estimated with Planning Poker.
3. **Change Control Board decision:** the board is the Product Owner, the Sprint Leader and the Sponsor. The team presents at least two options; the Sponsor approves, rejects or postpones, with a reason.
4. **Update the plan (if approved):** Product Backlog, acceptance criteria, Release Plan (total story points and budget; the old version is kept and the new one added) and risk register; a new version label "baseline-v1.x" is added to the code.
5. **Inform** the stakeholders within 24 hours, as described in Part 7.

No change enters a Sprint without a decision of the Change Control Board, and the team does not build the requested change before it is approved.
