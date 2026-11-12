# Sprint 3 – PO acceptance record

*Product Owner: Nguyễn Minh Chính. An item is accepted (Done) only when every AC passes on the hosted site, the code is reviewed and merged into `develop`, and the automated tests pass (Story DoD). Test results: `pm/sprints/S2/test-cases-F2F3.md` (carried items) and `pm/sprints/S3/test-cases-F4F5.md` (S3 items).*

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 1.2 | 10/11/2026 | Nguyễn Minh Chính (PO) | S3-T03, part 3: after release PR #35, TC-F2-11 and TC-F3-06 Pass on the host → US-07 and NFR-04 accepted (5 SP); all 24 carried SP accepted, S3-T03 Done |
| 1.1 | 09/11/2026 | Nguyễn Minh Chính (PO) | S3-T03, part 2: hosted checks run by the PO 23:24–23:27 → US-08 and US-09 accepted (6 SP); NFR-04 waits for DEF-S3-02 (PR #33); US-07 waits for the detail page in production |
| 1.0 | 09/11/2026 | Nguyễn Minh Chính (PO) | S3-T03, part 1: US-05, US-06, US-24 accepted after Đạt's hosted run of 08–09/11 (S3-T02); four carried items wait for one missing check each |

## Carried items from Sprint 2 (S3-T03)
| Item | SP | Hosted evidence | Decision (09/11/2026) | What is missing |
|---|---|---|---|---|
| US-05 Add book | 5 | TC-F2-01…04 Pass (08/11, Đạt) | **Accepted – Done** | – |
| US-06 Edit book | 3 | TC-F2-05…08 Pass (08/11, Đạt) | **Accepted – Done** | – |
| US-24 Store Staff role (CR-06) | 5 | TC-CR-01…05 Pass (09/11, Đạt); DEF-S3-01 fixed (PR #25) and closed | **Accepted – Done** | – |
| US-07 Hide book | 2 | TC-F2-09, 10 Pass (08/11, Đạt); TC-F2-11 Pass (10/11 00:11, Chính, after release PR #35) | **Accepted – Done (10/11)** | – |
| US-08 Manage categories | 3 | TC-F2-12 Pass (09/11 23:24, Chính); TC-F2-13…16 Pass (08/11, Đạt) | **Accepted – Done (09/11)** | – |
| US-09 Manage authors | 3 | TC-F2-17, 18, 20 Pass (08/11, Đạt); TC-F2-19 Pass (09/11 23:25, Chính) | **Accepted – Done (09/11)** | – |
| NFR-04 Responsive UI | 3 | AC-01 Pass: `/books` (05/11) and admin pages (09/11); AC-02 Pass after DEF-S3-02 fix (PR #33, released PR #35): TC-F3-06 re-run 10/11 00:10, Chính | **Accepted – Done (10/11)** | – |
| **Accepted** | **24** | | 13 SP (09/11, part 1) + 6 SP (09/11, part 2) + 5 SP (10/11, part 3) | |

## Effect on the cumulative accepted SP
| | SP |
|---|---|
| Before (06/11): F1 US-01…04 + NFR-01, S2 US-10 + NFR-02 | 21 |
| Accepted 09/11 part 1: US-05, US-06, US-24 | 13 |
| Accepted 09/11 part 2: US-08, US-09 | 6 |
| Accepted 10/11 part 3: US-07, NFR-04 | 5 |
| **Cumulative accepted (10/11)** | **45 of 62** |

EV and SPI/CPI are recalculated at the Sprint end (S3-T21) from the cumulative accepted SP and the hours in Jira.
