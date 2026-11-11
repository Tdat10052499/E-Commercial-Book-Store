# Sprint 3 – Daily Scrum Log

Timebox ≤ 10 min; asynchronous allowed but logged [03 §4.2]. Channel: **Discord** (used for the meeting on 06/11; issue I-05). A day without a Daily is logged as *Not held*. *Planned today* comes from `daily-plan.md`; the other columns are filled by each member at the Daily.

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 0.1 | 07/11/2026 | Nguyễn Minh Chính | Empty log for S3 with the planned tasks per day |
| 0.2 | 08/11/2026 | Nguyễn Minh Chính | D1–D3 recorded: D1 held on Discord (22:00, about 45 min); D2 and D3 not held |
| 0.3 | 09/11/2026 | Hồ Du Tuấn Đạt | Late asynchronous update from Đạt for D2 and D3, written 09/11 ~01:15 from the commit, PR and Jira timestamps. The meetings stay *Not held* |
| 0.4 | 09/11/2026 | Hồ Du Tuấn Đạt | D4 held; Đạt's row from his summary of the meeting |
| 0.5 | 10/11/2026 | Hồ Du Tuấn Đạt | D5: Đạt's asynchronous update (09:15); Chính's row left for Chính |

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
Held: **yes** (Đạt and Chính) · Duration: 15 min (start time not recorded) · Channel: TBD (Discord?)

| Member | Planned today | Done since last Daily | Doing today | Blockers |
|---|---|---|---|---|
| Hồ Du Tuấn Đạt | S3-T09, S3-D4 | Hosted test run of the admin/Staff functions passed (S3-T02); "Last updated by" shown on the book edit page (US-25, S3-T05/T07); fixed a display error seen in Supabase (Đạt's words: "fix lỗi hiển thị trong Supabase") | S3-T09 search (PR #30); merge the open S3 PRs | – |
| Nguyễn Minh Chính | S3-T08, S3-D4 | S3-T04 and S3-T06 in review (PR #21, #22); S3-T08 Back to list (PR #29); S3-T03 part 1 – US-05, US-06, US-24 accepted | Hosted checks TC-F2-12, TC-F2-19, NFR-04 admin pages → S3-T03 part 2; S3-T10 filter bar next | PRs waited for review all day; DEF-S3-02 found at 23:27 (fix PR #33) |

Notes: Đạt's row is written from his summary of the meeting (09/11 23:20). Chính's row is written from the PR and Jira record of 09/11 (23:35); start time not recorded.

## D5 – Tue 10/11
Time: 09:15 (Đạt) and 14:30 (Chính) · Channel: asynchronous (written in the repo) · Held: **asynchronous update** – both rows posted

| Member | Planned today | Done since last Daily | Doing today | Blockers |
|---|---|---|---|---|
| Hồ Du Tuấn Đạt | S3-T11, S3-D5 | Reviewed and merged PR #32 (Daily D4, 23:24), PR #33 (DEF-S3-02 44 px tap targets, 23:47) and PR #34 (S3-T03 hosted checks part 2, 23:54) on 09/11 | (1) Release `develop → main` in the morning so Chính can re-run TC-F2-11 and TC-F3-06; (2) S3-T11 category + price filter (US-13), merged and deployed before tonight; (3) clean the test data on production before UAT 13/11 (book id 33, category *Kids*, authors *Tuấn Đạt* / *Minh Chính*, Emma's price/stock, account *READER D*) | None. Risk: Chính's S3-T10 filter bar depends on S3-T11; if S3-T11 slips past tonight, S3-T10 and the D6 regression (S3-T16) slip too |
| Nguyễn Minh Chính | S3-T10, S3-T12, S3-D5 | After D4 (09/11): hosted checks part 2 – TC-F2-12, TC-F2-19, TC-F3-05 Pass, TC-F3-06 Fail → DEF-S3-02 fixed (PR #33); US-08, US-09 accepted (PR #34). 10/11: after release PR #35, re-ran TC-F2-11 and TC-F3-06 on the host → Pass, DEF-S3-02 closed; US-07, NFR-04 accepted → 45/62 SP (PR #36); S3-T10 filter bar (PR #38, 104/104 tests); S3-T12 UAT script part 1, 57 ACs (PR #39); lecturer templates added (PR #42) and the S1/S2 c2/c3 moved into them (PR #43, S3-T23) | Check the filter bar with category and price as soon as S3-T11 is live; review Đạt's PR #40 (Favorite button is out of scope → Request changes) and PR #41 | S3-T11 is not on GitHub yet: the category/price filter (TC-F5-04…07) cannot run, and S3-T14 tomorrow depends on it. PRs #36, #38, #39, #42, #43 wait for review |

Notes: Đạt's row is written from the git and PR record of 09/11 and today's plan. Chính's row is written by Chính from the PR and Jira record of 09/11–10/11 (14:30). Hours for S3-D5 are logged by each member in Jira (ECBS-174).

## D6 – Wed 11/11
Time: 20:15 (Chính) · Channel: asynchronous (written in the repo) · Held: **asynchronous update** – Chính's row posted; Đạt's row TBD (Đạt to add)

| Member | Planned today | Done since last Daily | Doing today | Blockers |
|---|---|---|---|---|
| Hồ Du Tuấn Đạt | S3-T16, S3-T17, S3-D6 (+ S3-T14, owner changed at D6) | TBD – Đạt | TBD – Đạt | TBD – Đạt |
| Nguyễn Minh Chính | S3-T15, S3-T23, S3-D6 (S3-T14 → Đạt) | Daily D5 row (PR #41); S3-T10 Done – PR #38 approved by Đạt and merged 18:32; `develop` merged into the open PRs #36, #39, #41, #42, #43 (conflicts with PR #48 solved, all mergeable); S3 export (S3-T23, PR #43) now also renders the Sprint 3 report, weekly status and regression; release PR #50 (`develop → main`) opened – 114/114 tests on `develop` | **PO decision:** the runner is not the writer – S3-T14 goes to Đạt; the S3-T02 cases that were left (TC-F2-11, -12, -19) were already run by Chính (all Pass). S3-T15 NFR-05 timing as soon as PR #50 is deployed | The hosted site has no filter bar yet (checked 20:05): S3-T14 and S3-T15 wait for PR #50 (Đạt's approval). PRs #36, #39, #42, #43 wait for review |

Notes: Chính's row is written by Chính from the PR and Jira record of 10/11–11/11 (20:15).

## D7 – Thu 12/11
Time: TBD · Channel: TBD

| Member | Planned today | Done since last Daily | Doing today | Blockers |
|---|---|---|---|---|
| Hồ Du Tuấn Đạt | S3-T19, S3-T21, S3-T22, S3-D7 | | | |
| Nguyễn Minh Chính | S3-T13, S3-T18, S3-T20, S3-D7 | | | |
