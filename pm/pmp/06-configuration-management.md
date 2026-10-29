# PMP Part 6 – Configuration Management Plan

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 1.0-draft | 30/10/2026 | Hồ Du Tuấn Đạt (AI-assisted) | New; branching per CLAUDE.md §5; CR/CCB process per [03 §6.2-3] |

## 6.1 Configuration items (CI)
| CI-ID | Item | Type | Location | Owner | Baseline |
|---|---|---|---|---|---|
| CI-01 | Project Management Plan (7 parts) | Document | `pm/pmp/` → `c1_ProjectPlan.docx` | Leader | baseline-v1.0 |
| CI-02 | Project Workbook | Spreadsheet | `deliverables/Sx/c2_SprintBacklog_Sx.xlsx` | Leader | baseline-v1.0 |
| CI-03 | Product Backlog & DoR | Document | `pm/backlog/` | PO | baseline-v1.0 |
| CI-04 | Release Plan & BAC | Document | `pm/pmp/03-master-release-plan.md` | PO + Leader | baseline-v1.0 |
| CI-05 | Sprint Reports | Document | `pm/sprints/Sx/` → `c3_SprintReport_Sx.docx` | Leader | per Sprint |
| CI-06 | Change Log & CR forms | Document | `pm/change/` → `c4_ChangeRequest_CR01.docx` | PO | per CR |
| CI-07 | Source code | Code | `app/` | Developers | tag per release |
| CI-08 | Database schema & seed | Database | `app/db/` | Đạt | tag per release |
| CI-09 | Test cases & UAT script | Document | `pm/sprints/Sx/`, `pm/uat/` | Developers | per Sprint |
| CI-10 | Hosting configuration (no secrets) | Config | `app/README.md`, host dashboard | Đạt | v1.0 |

## 6.2 Naming and versioning
- Submitted files: `HK261_SPM_FP_Team6_<code>_<Name>[_Sx].<ext>` [03 §7]; Excel files are cumulative.
- Document versions: `0.x` draft → `1.0` baseline → `1.x` approved changes → `Final`. Every inherited document has a version history table.
- Software versions: semantic tags `v0.1` (S1), `v0.2` (S2), `v0.3` (S3), `v1.0` (release).

## 6.3 Branching strategy
- `main`: release only; receives merges from `develop`; tagged. **No direct commits** [03 §4.2].
- `develop`: integration branch; changes enter only through PRs reviewed by the other member.
- Working branches: `feat/Pxx-<desc>` (code), `docs/Pxx-<desc>` (PM documents), `fix/<desc>`.
- Branch protection on `main` and `develop`: PR required, 1 approval.

## 6.4 Commit convention
Conventional Commits: `feat(F1): add login`, `docs(pmp): draft risk register`, `fix(F3): pagination off-by-one`, `chore(plan): mark P05 done`, followed by `Refs: Pxx`. Each member commits regularly in every Sprint.

## 6.5 Baselines and tags
| Tag | When | Contents |
|---|---|---|
| `baseline-v1.0` | After S1 submission | PMP v1.0, Backlog v1.0, Release Plan baseline, F1 |
| `baseline-v1.1` | After CCB approval of a CR | Updated backlog, Release Plan rebaseline, risk register |
| `v1.0` | 12/11/2026 | Release 1.0 code + release notes |

## 6.6 Change control process (CR and CCB)
1. **Record:** every request (from Sponsor or team) is logged in the Change Log with ID, date, requester, description, priority.
2. **Analyse impact:** scope (items, ACs), schedule (Sprint), cost (hours × 200,000 VND), quality (regression), risk; SP by Planning Poker.
3. **CCB decision:** CCB = PO + Sprint Leader + Sponsor. The team presents ≥ 2 options; the Sponsor decides Approve / Reject / Defer with a reason.
4. **Update baseline (if approved):** Product Backlog, ACs, Release Plan (PSP, BAC – baseline kept, rebaseline added), risk register; tag `baseline-v1.x`.
5. **Communicate** to stakeholders per PMP-7 within 24 h.
No change enters a Sprint without a CCB decision; the team does not build CR scope before approval.
