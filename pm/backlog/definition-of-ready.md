# Definition of Ready (DoR) v1.0

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 1.0-draft | 30/10/2026 | Hồ Du Tuấn Đạt (AI-assisted) | New; the TA baseline had no DoR [05 #15] |

An item may enter Sprint Planning only when every check is true. The PO checks; the Sprint Leader confirms at Planning.

| # | Check | Evidence |
|---|---|---|
| DoR-1 | Written as *As a… I want… so that…* and satisfies INVEST | Product Backlog row |
| DoR-2 | ACs in Given–When–Then, numbered `US-xx/AC-0n`, covering main, exception and boundary flows | Section D of the backlog |
| DoR-3 | Estimated in Fibonacci SP by Planning Poker; ≤ 13 SP (otherwise split) | Planning Poker log |
| DoR-4 | MoSCoW priority set and ranked by the PO | Backlog rank |
| DoR-5 | Dependencies identified (e.g. F3 needs F2 data) and none blocking | Backlog notes |
| DoR-6 | Within Release 1.0 scope (not cart/payment/social login) or approved by CCB | [03 §2.2], Change Log |
| DoR-7 | Testable: each AC can be turned into ≥ 1 test case | Test case file |
