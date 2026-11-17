# UAT Minutes – Release 1.0 (E-Commercial Book Store)

*Minutes of the User Acceptance Test with the Sponsor/Customer on Fri 13/11/2026. Form prepared by Nguyễn Minh Chính (PO) before the session (S3-T20); results entered on 15/11/2026 as reported by the PO. Fields marked TBD are completed by the team from the session record.*

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 15/11/2026 | Nguyễn Minh Chính (PO) | Session results: 73/73 ACs Pass, no defect, no new change request, decision **Accepted**; CR-07 decided by the CCB the same day (Approve) |
| 0.1 | 12/11/2026 | Nguyễn Minh Chính (PO) | Form: session data, result per feature (73 ACs of the UAT script v0.2), defects, known issues, change requests, decision, sign-off |

## 1. Session
| Field | Value |
|---|---|
| Date | Fri 13/11/2026 |
| Time | TBD (start – end) |
| Place | TBD (in class) |
| Sponsor / Customer | Dr. Bùi Minh Phụng |
| Team | Hồ Du Tuấn Đạt (Leader S3), Nguyễn Minh Chính (Product Owner) |
| At the keyboard | TBD |
| Build under test | Release 1.0 deployed from `main` (release PR #57, 12/11), https://pagetunnel.vercel.app/; tag `v1.0`: TBD (S3-T19) |
| Script | UAT script v0.2 – 73 ACs (Part I of this document) |
| Test data | 30 seed books; UAT accounts by role (Admin, UAT Staff, UAT Customer, UAT Customer 2) |

## 2. Result per feature
The verdict of every AC (Pass / Fail) and the Sponsor's remarks are written in the *Result* and *Comment* columns of the UAT script during the session. This table adds them up.

| Feature | Stories | ACs | Pass | Fail | Not run | Accepted by the Sponsor |
|---|---|---|---|---|---|---|
| F1 Accounts, login, administration | US-01…04, NFR-01, NFR-03 | 24 | 24 | 0 | 0 | ☒ Yes ☐ No |
| F2 Book management | US-05…09 | 20 | 20 | 0 | 0 | ☒ Yes ☐ No |
| F3 Book list | US-10, NFR-02, NFR-04 | 8 | 8 | 0 | 0 | ☒ Yes ☐ No |
| F4 Book detail | US-11 | 4 | 4 | 0 | 0 | ☒ Yes ☐ No |
| F5 Search and filter | US-12, US-13 | 7 | 7 | 0 | 0 | ☒ Yes ☐ No |
| Performance | NFR-05 | 2 | 2 | 0 | 0 | ☒ Yes ☐ No |
| CR-06 Store Staff and audit | US-24, US-25 | 8 | 8 | 0 | 0 | ☒ Yes ☐ No |
| **Total** | 20 items | **73** | **73** | **0** | **0** | **All accepted** |

## 3. Defects found in the session
Severity as in the Quality Plan: Critical (blocks a Must AC or security), High (AC fails, workaround exists), Medium (non-AC behaviour), Low (cosmetic). Release DoD RD-1: all ACs pass in UAT, and no Critical or High defect is open.

| ID | UAT step | AC | What happened | Severity | Owner | Fix by | Status |
|---|---|---|---|---|---|---|---|
| – | – | – | No defect found in the session | – | – | – | – |

## 4. Known issues shown to the Sponsor
Items from the *Known issues* part of the release notes v1.0, shown before the session starts.

| Known issue | Sponsor's remark |
|---|---|
| NFR-03/AC-03: site still online on 17/11 (TC-F1-24). Step UAT-F1-24 is recorded as Pass; the PO accepts NFR-03 (2 SP) after the check on 17/11 (`po-acceptance.md`). **Closed 17/11:** TC-F1-24 Pass at 22:33, NFR-03 accepted | TBD |
| Free Supabase database pauses after a week without traffic (keep-alive in `app/README.md`) | TBD |
| Favorite button on the book cards (UI outside the Release 1.0 backlog, stored only in the browser) | TBD |

## 5. Change requests raised in the session
New requests are not decided in the session: they go to the Change Log and the CCB (Change Management Plan).

| CR ID | Request | Raised by | Next step |
|---|---|---|---|
| – | No new change request in the session | – | – |
| CR-07 (raised 12/11, before the session) | Re-baseline the S3 SP after Planning Poker Session 3 | PO | CCB 13/11: **Approve** → baseline v1.2 (PSP 68), Change Log v1.4 |

## 6. Decision
- ☒ **Accepted** – Release 1.0 meets its acceptance criteria.
- ☐ **Accepted with conditions** – conditions and due dates: ……………………………………………
- ☐ **Not accepted** – reasons: ……………………………………………

Sponsor's comments: TBD

## 7. Sign-off
| Role | Name | Signature | Date |
|---|---|---|---|
| Sponsor / Customer | Dr. Bùi Minh Phụng | TBD | 13/11/2026 |
| Product Owner | Nguyễn Minh Chính | | |
| Sprint Leader S3 | Hồ Du Tuấn Đạt | | |
