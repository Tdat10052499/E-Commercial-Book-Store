# Sprint 2 – Review & Retrospective script (Fri 06/11/2026, ~10 min)

**Presenter:** Nguyễn Minh Chính (Leader S2, PO) · **Demo:** Hồ Du Tuấn Đạt (book screens, Staff role) · Structure follows the lecturer's Review/Retro template and [03 §4.2, §9.2 S6].

Figures are the values at the Sprint end (05/11 23:59). Re-check them against Jira in the morning; if the admin/Staff hosted run is done before class, update the accepted SP.

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 05/11/2026 | Nguyễn Minh Chính | Speaking script and demo order for Review 2, built from the S2 files; retro items are prompts for the team, not answers |

## Before class (checklist)
- [ ] PR #8 merged and deployed; https://pagetunnel.vercel.app/books shows "30 titles · page 1 of 3"
- [ ] Admin session open in one browser, customer session in a private window (passwords typed by you, not stored)
- [ ] Jira board on Sprint 2, burndown image `pm/sprints/S2/evidence/burndown-S2.png` re-generated with day 5
- [ ] Phone (or DevTools 360 px) ready for the responsive check

## 1. Sprint Goal and result (1 min)
> "Our Sprint 2 goal was: by 05/11, on the hosted site, an administrator manages books, categories and authors, a customer browses at least 30 books, twelve per page, newest first, on any device — and, after the CCB approved CR-06, a Store Staff account can add and edit books but gets 403 on delete and on account management.
> Result: **Partly met**. All 9 items are built and live on the hosted site, but only **2 of 9 items, 5 of 29 SP** – the book grid and the sample data – passed the Definition of Done, because we did not reach the hosted test of the admin and Staff screens before the deadline."

## 2. Demo against the acceptance criteria (4 min)
| # | Show | AC | Say |
|---|---|---|---|
| 1 | `/books` – 12 cards, cover, title, author, price; newest first; page 3 has 6 books | US-10/AC-01, AC-02, NFR-02/AC-01 | "30 sample books in 6 categories are loaded by a seed script that runs on every deploy; running it twice adds nothing." |
| 2 | Type `?page=0`, `?page=abc`, `?page=999` | US-10/AC-03 | "Invalid page numbers fall back to page 1 or the last page – no error." |
| 3 | Admin → Categories: add `Poetry`, add `poetry` again, rename, remove a category in use | US-08/AC-01, 03, 04 | "Duplicates are refused regardless of case; a category used by visible books cannot be removed – the message says how many." |
| 4 | Admin → Authors: add with 101 characters, then edit an author and show the new name on `/books` | US-09/AC-04, AC-02 | "Same rules on client and server." |
| 5 | Admin → Books: add a book with a cover (price 0 refused), edit it, hide it (styled confirm, Cancel first) | US-05…US-07 | (Đạt) "This demo is also our hosted test of these items." |
| 6 | Staff account: add a book; no Delete button; open `/admin/accounts` → 403 | US-24/AC-01…03 | (Đạt) "Every permission is checked on the server, not only by hiding the button." |
| 7 | Resize to 360 / 768 / 1280 px | NFR-04/AC-01 | "Two, three and four columns; no horizontal scrolling; tap targets at least 44 px on touch screens." |

Then ask the Sponsor for feedback and write it in table I.4 (who, feedback, action/backlog item, owner).

## 3. Metrics (1.5 min)
- **Burndown:** "39.75 hours planned. The line stays flat until Tuesday and drops on Wednesday night, then to 6.25 hours on Thursday, when the pull requests were merged. It is flat because no task was finished early and the board was not updated during the week – the tasks were entered in Jira only on 05/11. That is our main process problem this Sprint."
- **Velocity:** "Sprint 1 actual velocity was **0** SP at Planning 2 because F1 was still In Review; after our hosted run on 5 November we accepted 14 SP of F1. We therefore sized Sprint 2 by hours: 39.75 h against 40 h capacity. Sprint 2 velocity: **5 SP** against 29 planned."
- **Hours:** "Plan 39.75 h – Đạt 16.25, Chính 23.5 after Chính took the data model and the seed. Actual from Jira: Chính 10.5 h; Đạt's hours **[update – logged?]**."
- **EVM (baseline v1.1):** "BAC 26.4 million VND, PV 17.6 million, EV 8.09 million for 19 accepted SP, so SPI is 0.46 and CPI 0.79 – provisional until Đạt's hours are in. We are behind schedule; the lever is closing items, not writing more code."

## 4. Change control – CR-06 (1.5 min)
> "CR-06 asked for a Store Staff role and a 'last updated by' audit. We followed the five steps: one, recorded in the Change Log; two, impact analysis – plus 7 SP, 12 hours, 2.4 million VND, rework of US-03 and US-04; three, at the CCB on 30/10 you approved Option B – Staff role in Sprint 2, audit in Sprint 3; four, we rebaselined: PSP from 55 to 62 SP, BAC from 24.0 to 26.4 million, tags `baseline-v1.0` and `baseline-v1.1`; five, we informed you through the c4 form and the Weekly Status Report."
> "Two details were not fixed by the CR text, so the team decided them as PO and recorded them in the c4 form: Staff may add and rename categories and authors but not remove them, and a new role takes effect at the user's next login, as acceptance criterion 4 says."

## 5. Risks and issues (0.5 min)
- I-02 / R12: F2 book screens and CR code started late → foundations first, drop order agreed.
- I-03 / R05: CR-06 load in S2 → phased option, sized by hours.
- I-04: no real Planning Poker votes yet → real round at Planning 3 today.

## 6. Retrospective (2 min, team only)
**Previous action items (from Retro 1 record):**
| Action | Result to report |
|---|---|
| A1 Daily logged every day before 22:00 | Not done – one entry; channel still to agree (I-05) |
| A2 Draft files by Wednesday 20:00 | Partly – drafted Wednesday late evening |
| A3 Log hours in Jira the same day | Not done – hours logged at the end, Đạt's still missing (I-06) |

**Start – Stop – Continue:** each member gives one item per column (write them in table II.3). Prompts:
- Start: move the Jira card the moment work starts; merge small PRs every two days.
- Stop: leaving review, merge and hosted testing to the last day.
- Continue: automated tests for every AC; delivering foundations first.

**Five whys** on the main issue "no S2 item reached the DoD by the last day" – ask *why* five times as a team and write each answer in table II.4. Do not read prepared answers.

**Action items for Sprint 3 (at least 2, measurable):**
1. Each member moves their card and logs Completed Work before 22:00 every working day – owner Leader S3 – done when the S3 burndown has no flat segment longer than one day.
2. Merge a reviewed PR at least every two days – owner Both – done when at least 2 S3 items are Done before 11/11.
3. Real Planning Poker round for US-25 and the S3 items, votes logged – owner PO – today at Planning 3.

## 7. Hand-over to Sprint 3 (0.5 min)
> "Sprint 3 is led by Đạt: F4 detail page, F5 search and filter, US-25 audit, regression of F1–F3, release v1.0 and UAT on 13/11. Items not Done in Sprint 2 go back to the Product Backlog and are re-planned now: **[list – update]**."
