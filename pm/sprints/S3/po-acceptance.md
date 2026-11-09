# Sprint 3 – PO acceptance record

*Product Owner: Nguyễn Minh Chính. An item is accepted (Done) only when every AC passes on the hosted site, the code is reviewed and merged into `develop`, and the automated tests pass (Story DoD). Test results: `pm/sprints/S2/test-cases-F2F3.md` (carried items) and `pm/sprints/S3/test-cases-F4F5.md` (S3 items).*

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 09/11/2026 | Nguyễn Minh Chính (PO) | S3-T03, part 1: US-05, US-06, US-24 accepted after Đạt's hosted run of 08–09/11 (S3-T02); four carried items wait for one missing check each |

## Carried items from Sprint 2 (S3-T03)
| Item | SP | Hosted evidence | Decision (09/11/2026) | What is missing |
|---|---|---|---|---|
| US-05 Add book | 5 | TC-F2-01…04 Pass (08/11, Đạt) | **Accepted – Done** | – |
| US-06 Edit book | 3 | TC-F2-05…08 Pass (08/11, Đạt) | **Accepted – Done** | – |
| US-24 Store Staff role (CR-06) | 5 | TC-CR-01…05 Pass (09/11, Đạt); DEF-S3-01 fixed (PR #25) and closed | **Accepted – Done** | – |
| US-07 Hide book | 2 | TC-F2-09, 10 Pass; TC-F2-11 Blocked | Not yet | TC-F2-11: hidden book's detail URL → "not available" – needs PR #22 merged and released to `main` |
| US-08 Manage categories | 3 | TC-F2-13…16 Pass; TC-F2-12 not run | Not yet | TC-F2-12: add a category with spaces around the name → saved trimmed |
| US-09 Manage authors | 3 | TC-F2-17, 18, 20 Pass; TC-F2-19 half run | Not yet | TC-F2-19: remove an author used by a visible book → refused "in use by N books" |
| NFR-04 Responsive UI | 3 | `/books` Pass at 360/768/1280 px (05/11) | Not yet | Admin pages (books, categories, authors, accounts) at 360/768/1280 px, as Admin and as Staff |
| **Accepted now** | **13** | | | |
| **Waiting** | **11** | | | |

## Effect on the cumulative accepted SP
| | SP |
|---|---|
| Before (06/11): F1 US-01…04 + NFR-01, S2 US-10 + NFR-02 | 21 |
| Accepted 09/11: US-05, US-06, US-24 | 13 |
| **Cumulative accepted (09/11)** | **34 of 62** |

EV and SPI/CPI are recalculated at the Sprint end (S3-T21) from the cumulative accepted SP and the hours in Jira.
