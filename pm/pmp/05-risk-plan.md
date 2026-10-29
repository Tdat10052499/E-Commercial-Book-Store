# PMP Part 5 – Risk Management Plan

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 1.0-draft | 30/10/2026 | Hồ Du Tuấn Đạt (AI-assisted) | New; inputs from gap analysis [05 §5]. **P and I scores are proposals to be confirmed by the team** |

## 5.1 Process
1. **Identify** at Planning, Daily (blockers) and Retro; anyone may add a risk.
2. **Assess** probability P (1–5) and impact I (1–5); score = P × I. 1–6 Low, 8–12 Medium, 15–25 High.
3. **Plan response:** Avoid, Mitigate, Transfer, Accept; each risk has an owner and a trigger.
4. **Monitor** every Sprint (status Open / Watching / Occurred / Closed). When a risk occurs it moves to the **Issue Log** with the action taken [03 §6.2-5].
5. **Report** the top risks in each Sprint Review and Weekly Status Report.

## 5.2 Risk register v1.0 (status at 30/10/2026)
| ID | Risk (cause → event → effect) | Cat. | P | I | P×I | Strategy & response | Owner | Trigger | Status |
|---|---|---|---|---|---|---|---|---|---|
| R01 | Only 2 members must deliver F1–F5 plus heavy PM documentation → workload exceeds capacity → items slip | Resource | 4 | 4 | 16 | Mitigate: tasks ≤ 1 person-day, capacity-based plan, AI-assisted drafting with review | Leader | Burndown flat for 2 days | Occurred → I-01 |
| R02 | Lab 1/Lab 2/TA week 2 not submitted → PMP must be written from scratch → S1 late | Schedule | 5 | 3 | 15 | Mitigate: reuse TA files, draft PMP early | Leader S1 | PMP not ready 24 h before deadline | Occurred → I-01 |
| R03 | Free host sleeps (cold start) → list page > 2 s or lecturer cannot open site | Technical | 3 | 4 | 12 | Mitigate: pick host without long sleep or add keep-alive ping; measure warm & cold | Đạt | First load > 5 s | Open |
| R04 | Jira Free lacks time tracking fields → no actual hours → EVM AC invalid | Tool | 2 | 5 | 10 | Mitigate: verify in S1; fallback: hours sheet in Workbook | Leader | Fields missing on issue | Open |
| R05 | CR-06 approved → extra scope and F1 rework → S2 overloaded | Scope | 4 | 3 | 12 | Mitigate: ≥ 2 options at CCB incl. phased delivery; rebaseline PSP/BAC | PO | CCB Approve | Open |
| R06 | Planning Poker evidence or regular commits missing → B4, S5 and individual factor reduced | Quality/Process | 3 | 4 | 12 | Avoid: photo of each reveal; commit at least daily per member | Both | No commit by a member in 2 days | Open |
| R07 | eLearning dates differ from the brief → wrong item or time used for upload | Schedule | 3 | 3 | 9 | Mitigate: ask lecturer; submit by brief date | Leader | Upload slot not found | Open |
| R08 | Security defect (plain passwords, missing server-side role check) → AC/NFR fail at UAT | Quality | 2 | 5 | 10 | Avoid: bcrypt, server guards, permission tests | Đạt | Test fails | Open |
| R09 | A member is sick or busy with other exams → capacity drops | Resource | 3 | 3 | 9 | Mitigate: shared knowledge via PR reviews; buffer in S3 | Leader | Member reports unavailability | Open |
| R10 | Integration of F3/F4/F5 (pagination + search + Back) breaks state → F4/F5 ACs fail | Technical | 3 | 3 | 9 | Mitigate: keep page/filter in URL query from S2 | Chính | Back loses page in test | Open |

## 5.3 Issue Log (risks that occurred)
| ID | From risk | Date | Description | Impact | Action | Owner | Status |
|---|---|---|---|---|---|---|---|
| I-01 | R01, R02 | 30/10/2026 | Sprint 1 artefacts not completed in the repository by 29/10 23:59 | Possible late penalty (−10 % / 5 h); less time for F1 | Catch-up night 29–30/10 with AI-assisted drafting; record submission time; discuss in Retro 1 | Leader S1 | Open |
