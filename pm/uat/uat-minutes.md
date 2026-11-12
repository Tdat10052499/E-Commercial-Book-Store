# UAT Minutes – Release 1.0 (E-Commercial Book Store)

*Form for the User Acceptance Test with the Sponsor/Customer on Fri 13/11/2026. Prepared by Nguyễn Minh Chính (PO) before the session (S3-T20); every field marked TBD or left empty is filled in during or right after the session – nothing is filled in advance.*

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
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
| Build under test | Release v1.0 – tag TBD (S3-T19), https://pagetunnel.vercel.app/ |
| Script | UAT script v0.2 – 73 ACs (Part I of this document) |
| Test data | 30 seed books; UAT accounts by role (Admin, UAT Staff, UAT Customer, UAT Customer 2) |

## 2. Result per feature
The verdict of every AC (Pass / Fail) and the Sponsor's remarks are written in the *Result* and *Comment* columns of the UAT script during the session. This table adds them up.

| Feature | Stories | ACs | Pass | Fail | Not run | Accepted by the Sponsor |
|---|---|---|---|---|---|---|
| F1 Accounts, login, administration | US-01…04, NFR-01, NFR-03 | 24 | | | | ☐ Yes ☐ No |
| F2 Book management | US-05…09 | 20 | | | | ☐ Yes ☐ No |
| F3 Book list | US-10, NFR-02, NFR-04 | 8 | | | | ☐ Yes ☐ No |
| F4 Book detail | US-11 | 4 | | | | ☐ Yes ☐ No |
| F5 Search and filter | US-12, US-13 | 7 | | | | ☐ Yes ☐ No |
| Performance | NFR-05 | 2 | | | | ☐ Yes ☐ No |
| CR-06 Store Staff and audit | US-24, US-25 | 8 | | | | ☐ Yes ☐ No |
| **Total** | 20 items | **73** | | | | |

## 3. Defects found in the session
Severity as in the Quality Plan: Critical (blocks a Must AC or security), High (AC fails, workaround exists), Medium (non-AC behaviour), Low (cosmetic). Release DoD RD-1: all ACs pass in UAT, and no Critical or High defect is open.

| ID | UAT step | AC | What happened | Severity | Owner | Fix by | Status |
|---|---|---|---|---|---|---|---|
| DEF-UAT-01 | | | | | | | |
| DEF-UAT-02 | | | | | | | |
| DEF-UAT-03 | | | | | | | |

## 4. Known issues shown to the Sponsor
Items from the *Known issues* part of the release notes v1.0, shown before the session starts.

| Known issue | Sponsor's remark |
|---|---|
| (from the release notes v1.0) | |
| | |

## 5. Change requests raised in the session
New requests are not decided in the session: they go to the Change Log and the CCB (Change Management Plan).

| CR ID | Request | Raised by | Next step |
|---|---|---|---|
| | | | Change Log → impact analysis → CCB |
| | | | |

## 6. Decision
- ☐ **Accepted** – Release 1.0 meets its acceptance criteria.
- ☐ **Accepted with conditions** – conditions and due dates: ……………………………………………
- ☐ **Not accepted** – reasons: ……………………………………………

Sponsor's comments: ……………………………………………

## 7. Sign-off
| Role | Name | Signature | Date |
|---|---|---|---|
| Sponsor / Customer | Dr. Bùi Minh Phụng | | |
| Product Owner | Nguyễn Minh Chính | | |
| Sprint Leader S3 | Hồ Du Tuấn Đạt | | |
