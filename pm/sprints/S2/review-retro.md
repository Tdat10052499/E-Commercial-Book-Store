# Sprint 2 – Review & Retrospective

*Part of S3-T01 (ECBS-147). Review 2 was held in class on Fri 06/11/2026; Retro 2, the Planning 3 confirmation and Planning Poker Session 3 were held late, on Wed 11/11/2026 (Discord, 40 min, after Daily D6). Recorded with the real dates.*

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 1.1 | 12/11/2026 | Nguyễn Minh Chính (PO) | PO confirmation of the Retro 2 actions A1–A4 (PR #41 review) |
| 1.0 | 11/11/2026 | Hồ Du Tuấn Đạt (Leader S3, AI-assisted) | Review 2 and Retro 2 recorded from the team's account on 11/11; open points marked TBD |
| 1.1 | 11/11/2026 | Hồ Du Tuấn Đạt (Leader S3, AI-assisted) | Retro 2 actions: 6 proposed, merged into 4 by the team (Chính agreed) |
| 1.2 | 11/11/2026 | Hồ Du Tuấn Đạt (Leader S3, AI-assisted) | Planning 3 confirmed by the Leader S3; Planning Poker Session 3 held (T01 meeting 40 min) |
| 1.3 | 11/11/2026 | Hồ Du Tuấn Đạt (Leader S3, AI-assisted) | Added the verbal discussion of 09/11 ~22:00 (30 min, not recorded at the time, reported 11/11) |

## 1. Sprint Review 2 (Fri 06/11/2026, in class)
| Field | Record |
|---|---|
| Presenter | **Hồ Du Tuấn Đạt** – Chính (Leader S2) arrived late, so Đạt presented in his place |
| Script used | `pm/sprints/S2/review2-script.md` |
| PO acceptance at the Review | **None.** The S2 items in review were accepted later, after the hosted runs: US-05, US-06, US-24 (09/11, part 1) and US-08, US-09 (09/11, part 2) – see `pm/sprints/S3/po-acceptance.md` |
| Lecturer feedback | **Strong comment on the burndown chart: the S2 line dropped steeply at the end** (most work merged on the last day, 05/11). No other comments |

Follow-up of the feedback: action **A6** below; in Sprint 3 the burndown is produced daily by `tools/s3_tracker.py` from a day-by-day plan.

## 2. Retrospective 2 (Wed 11/11/2026, Discord)
First discussed **verbally on Mon 09/11 at about 22:00 (about 30 min, Retro 2 and Planning 3 topics)** – no record and no Jira entry at the time, no Discord message mentions it; reported by Đạt on 11/11. The decisions, actions and votes below were made and recorded on 11/11.

| Went well | To improve |
|---|---|
| Both members were more proactive about time this week | Time is still the main problem |
| Tasks that were worked on were finished correctly | Some days an unexpected job stopped the day's task, which moved to the next day: per the records **D1–D2** (S3-T01, T02, T03 not finished; Daily D2, D3 not held) and **D5** (S3-T10, T11, T12 – issue I-07) |

Action items – **6 proposed (A1–A6), the team merged them into 4** on 11/11 (Đạt proposed, Chính agreed), so that each one can be measured before the Sprint end and the UAT:

| # | Action | Owner | Due | Measure | Merged from |
|---|---|---|---|---|---|
| A1 | Daily on Discord at 22:00, logged in `daily-log.md` the same day | Đạt (Leader S3) | each day | Daily D7 logged on 12/11 | A1 |
| A2 | One new branch from `develop` per task; the other member approves the PR on GitHub before it is merged; nothing pushed after its PR is merged | Both | each PR | no PR merged without approval from 11/11 | A2 + A3 |
| A3 | "Run by" column in every test-case file; the runner is never the writer | Chính (PO) | 12/11, before UAT | every hosted result names a runner ≠ writer | A4 |
| A4 | Update a task as soon as it is finished: Done in Jira and the backlog, real hours the same day; D7 tasks stay on D7 – answer to the Review 2 burndown feedback | Both | from D6 | burndown D6–D7 follows the plan line; 100 % of Done tasks have hours on their day | A5 + A6 |

Confirmed by the PO, Nguyễn Minh Chính, on 12/11/2026 (review of PR #41): A1–A4 as written above.

## 3. Sprint Planning 3
- Sprint Backlog S3 proposed by the PO on 07/11 (`pm/sprints/S3/sprint-backlog.md` v0.1–0.2) and entered in Jira Sprint 3 (ECBS-147…176).
- **Confirmed by the Leader S3 (Đạt) on 11/11** at the T01 meeting: Sprint Goal and Sprint Backlog S3 unchanged.
- **Planning Poker Session 3 held 11/11** (after the build, calibration): US-11 3 · US-12 5 · US-13 5 · NFR-05 5 · US-25 3 = 21 SP vs 15 SP in Session 1/2. Rounds, reasons and the baseline question (PO decision) in `pm/backlog/planning-poker-log.md`.
