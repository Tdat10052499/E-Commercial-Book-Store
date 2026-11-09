# Sprint 3 – Daily Scrum Log

Timebox ≤ 10 min; asynchronous allowed but logged [03 §4.2]. Channel: **Discord** (used for the meeting on 06/11; issue I-05). A day without a Daily is logged as *Not held*. *Planned today* comes from `daily-plan.md`; the other columns are filled by each member at the Daily.

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 0.1 | 07/11/2026 | Nguyễn Minh Chính | Empty log for S3 with the planned tasks per day |
| 0.2 | 08/11/2026 | Nguyễn Minh Chính | D1–D3 recorded: D1 held on Discord (22:00, about 45 min); D2 and D3 not held |
| 0.3 | 09/11/2026 | Hồ Du Tuấn Đạt | Late asynchronous update from Đạt for D2 and D3, written 09/11 ~01:15 from the commit, PR and Jira timestamps. The meetings stay *Not held* |
| 0.4 | 09/11/2026 | Hồ Du Tuấn Đạt | D4 held; Đạt's row from his summary of the meeting |

## D1 – Fri 06/11
Time: 22:00, about 45 min (over the 10-min Daily timebox) · Channel: Discord · Held: **yes**

| Member | Planned today | Done since last Daily | Doing today | Blockers |
|---|---|---|---|---|
| Hồ Du Tuấn Đạt | S3-T01, S3-D1 | Not recorded | Not recorded | Not recorded |
| Nguyễn Minh Chính | S3-T01, S3-D1 | Not recorded | Not recorded | Not recorded |

Notes: the content of the call was not written down at the time.

## D2 – Sat 07/11
Held: **Not held** · Channel: –

| Member | Planned today | Done since last Daily | Doing today | Blockers |
|---|---|---|---|---|
| Hồ Du Tuấn Đạt | S3-T02, S3-T05, S3-D2 | – | – | – |
| Nguyễn Minh Chính | S3-T03, S3-T04, S3-D2 | – | – | – |

## D3 – Sun 08/11
Held: **Not held** · Channel: –

| Member | Planned today | Done since last Daily | Doing today | Blockers |
|---|---|---|---|---|
| Hồ Du Tuấn Đạt | S3-T07, S3-D3 | – | – | – |
| Nguyễn Minh Chính | S3-T06, S3-D3 | – | – | – |

**Late asynchronous update – Đạt (written 09/11 ~01:15, after the day; not a Daily meeting)**

| Day | Done (evidence) | Next | Blockers / risks |
|---|---|---|---|
| D2 Sat 07/11 | TBD – Đạt to confirm. No commit, PR or Jira worklog from Đạt on 07/11; S3-T02 and S3-T05 planned for D2 were not started that day | – | – |
| D3 Sun 08/11 | S3-T05 + S3-T07 (US-25 "Last updated by") done: PR #23 merged 23:23, ECBS-151/153 Done. Sprint 3 started in Jira 23:26. S3-T02 hosted run started 23:27: Admin TC-F2-01…20 and Staff TC-CR-01…05 recorded (PR #24), DEF-S3-01 found and fixed (PR #25). After the release `develop → main` (PR #26, 09/11 00:39) TC-CR-06/07 Pass and DEF-S3-01 closed (PR #27) | D4: S3-T09 search; finish TC-F2-11/12/19 when PR #22 is deployed; review PRs #18, #20, #21, #22 | (1) S3-T02 was 1 day late (planned D2) and blocked US-25 checks until the release – resolved 09/11 00:39. (2) Vercel preview builds run migrations on the production DB – for the issue log (S3-T17). (3) TC-F2-11 blocked until PR #22 is deployed. (4) Production holds test data to clean before UAT 13/11 (incl. category *Novel* renamed *Horror*) |

Hours logged in Jira for this work (reconstructed from timestamps, confirmed by Đạt 09/11): ECBS-148 1h20m, ECBS-151 15m, ECBS-153 20m. No hours on ECBS-171/172, since the Dailies were not held.

## D4 – Mon 09/11
Held: **yes** (Đạt and Chính) · Time: TBD · Channel: TBD (Discord?)

| Member | Planned today | Done since last Daily | Doing today | Blockers |
|---|---|---|---|---|
| Hồ Du Tuấn Đạt | S3-T09, S3-D4 | Hosted test run of the admin/Staff functions passed (S3-T02); "Last updated by" shown on the book edit page (US-25, S3-T05/T07); fixed a display error seen in Supabase (Đạt's words: "fix lỗi hiển thị trong Supabase") | S3-T09 search (PR #30); merge the open S3 PRs | – |
| Nguyễn Minh Chính | S3-T08, S3-D4 | Not recorded | Not recorded | Not recorded |

Notes: Đạt's row is written from his summary of the meeting (09/11 23:20). Chính's row, the time and the channel are to be filled by Chính.

## D5 – Tue 10/11
Time: TBD · Channel: TBD

| Member | Planned today | Done since last Daily | Doing today | Blockers |
|---|---|---|---|---|
| Hồ Du Tuấn Đạt | S3-T11, S3-D5 | | | |
| Nguyễn Minh Chính | S3-T10, S3-T12, S3-D5 | | | |

## D6 – Wed 11/11
Time: TBD · Channel: TBD

| Member | Planned today | Done since last Daily | Doing today | Blockers |
|---|---|---|---|---|
| Hồ Du Tuấn Đạt | S3-T16, S3-T17, S3-D6 | | | |
| Nguyễn Minh Chính | S3-T14, S3-T15, S3-T23, S3-D6 | | | |

## D7 – Thu 12/11
Time: TBD · Channel: TBD

| Member | Planned today | Done since last Daily | Doing today | Blockers |
|---|---|---|---|---|
| Hồ Du Tuấn Đạt | S3-T19, S3-T21, S3-T22, S3-D7 | | | |
| Nguyễn Minh Chính | S3-T13, S3-T18, S3-T20, S3-D7 | | | |
