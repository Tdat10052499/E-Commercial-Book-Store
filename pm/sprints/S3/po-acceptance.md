# Sprint 3 – PO acceptance record

*Product Owner: Nguyễn Minh Chính. An item is accepted (Done) only when every AC passes on the hosted site, the code is reviewed and merged into `develop`, and the automated tests pass (Story DoD). Test results: `pm/sprints/S2/test-cases-F2F3.md` (carried items) and `pm/sprints/S3/test-cases-F4F5.md` (S3 items).*

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 1.4 | 12/11/2026 | Nguyễn Minh Chính (PO) | NFR-04 accepted again after Đạt's TC-F3-06 re-run (DEF-S3-03 fixed) → cumulative 60 of 62 SP |
| 1.3 | 12/11/2026 | Nguyễn Minh Chính (PO) | S3-T18: Sprint 3 items accepted after Đạt's hosted run (S3-T14, S3-T15) – US-11, US-12, US-13, NFR-05, US-25 (15 SP, baseline v1.1); NFR-04 re-check pending after DEF-S3-03 |
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

## Sprint 3 items (S3-T18, 12/11/2026)
Hosted run by Đạt on 12/11 (runner ≠ writer, cases written by Chính): `test-cases-F4F5.md`. Code reviewed and merged into `develop`, released to `main` (#50, #57); automated suite 114/114 Pass.

| Item | SP (baseline v1.1) | Hosted evidence | Decision (12/11/2026) | Note |
|---|---|---|---|---|
| US-11 Book detail | 3 | TC-F4-01…04 Pass (12/11 ~17:20, Đạt) | **Accepted – Done** | – |
| US-12 Search | 3 | TC-F5-01…03 Pass (12/11 ~17:20, Đạt) | **Accepted – Done** | – |
| US-13 Filter and pagination | 5 | TC-F5-04…07 Pass (12/11 ~17:20, Đạt) | **Accepted – Done** | TC-F5-04 gave 3 books because *Emma* was 167,000 ₫ on the host after earlier tests; correct for that price, and *Emma* is back at 119,000 since 18:01 |
| NFR-05 Performance | 2 | TC-NFR05-01 median 0.50 s, TC-NFR05-02 median 0.38 s (12/11, Đạt) | **Accepted – Done** | both < 2 s |
| US-25 Last-updated audit (CR-06) | 2 | TC-CR-06, TC-CR-07 Pass; TC-CR-08 lock step Pass (12/11 18:01–18:10, Đạt) | **Accepted – Done** | AC-03 rename part: Release 1.0 has no account rename screen; checked by the automated test `audit.test.js` (Pass); TC-CR-08 reworded by its writer |
| NFR-04 Responsive UI | (3, accepted 10/11) | DEF-S3-03 (footer links 36–41 px wide, found 12/11 01:45 by Đạt) fixed in #52, released in #57; TC-F3-06 re-run Pass (12/11 18:10–18:13 mouse, ~18:38 touch mode 360 px, Đạt); smoke 11 Pass (2 / 3 / 4 columns) | **Accepted again – Done (12/11)** | DEF-S3-03 closed |
| **Accepted on 12/11** | **15** (+ NFR-04 kept) | | | |

| Cumulative accepted SP (baseline v1.1, PSP 62) | SP |
|---|---|
| Up to 10/11 | 45 |
| NFR-04 on hold 12/11 01:45 (DEF-S3-03) and accepted again 12/11 18:38 | ± 0 |
| Accepted 12/11: US-11, US-12, US-13, NFR-05, US-25 | + 15 |
| **Cumulative accepted (12/11)** | **60 of 62** (NFR-03 Hosting, 2 SP: its AC needs the site online until 17/11 – checked on 17/11) |

CR-07 (Change Log): the PO asks the CCB on 13/11 to re-baseline the S3 story points to the Planning Poker Session 3 result (PSP 62 → 68). Until the CCB decides, the figures above use baseline v1.1.
