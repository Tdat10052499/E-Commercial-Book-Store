# Planning Poker Log – Release 1.0

**Scale:** 1, 2, 3, 5, 8, 13 (? and ☕ allowed). **Reference stories** (from TA [04 §2]): 2 SP = hide a book (v0 US-10) · 3 SP = view book details (v0 US-07) · 5 SP = search & filter (v0 US-06).
**Procedure:** PO reads story and ACs → each member picks a card privately → reveal together → if different, highest and lowest explain → re-vote (max 3 rounds; if still different, take the higher value) → compare with reference stories → items > 13 are split [04 §2].
**Evidence:** keep a photo/screenshot of each reveal (Planning Poker app or cards) in `pm/backlog/evidence/` – the lecturer asks for it [03 §8].

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 1.0-draft | 30/10/2026 | Hồ Du Tuấn Đạt (AI-assisted) | Log table prepared. **Votes must be entered by the team; none are filled in by AI.** |
| 1.1 | 30/10/2026 | Nguyễn Minh Chính (PO, AI-assisted) | Estimates recorded as **PO estimates from AI-suggested values – no voting rounds held** (see note). Vote columns left empty on purpose. Release PSP = 55 SP; CR-06 = 7 SP |

> **Method used on 30/10/2026 (deviation from the procedure above):** no Planning Poker voting rounds were held. The PO (Nguyễn Minh Chính) set each estimate from values suggested by Claude, sized against the reference stories (2 / 3 / 5 SP). There are no individual cards, no reveal and no photo evidence for this session. Đạt has not yet confirmed the estimates; if the team later runs a real session (shared page: Team 6 Planning Poker), the votes replace these values and this note is updated.

## Session 1 – Release 1.0 baseline (date: 30/10/2026, method: PO estimate from AI suggestion – no voting rounds, facilitator: PO)
| Item | Round | Đạt | Chính | Basis of the estimate | Result SP |
|---|---|---|---|---|---|
| US-01 Register | – | – | – | One form; duplicate-email check; client + server validation. Same size as reference 3 (book detail) | 3 |
| US-02 Log in/out | – | – | – | Session handling + locked-account and generic-error cases; similar to US-01 | 3 |
| US-03 Admin creates & locks accounts | – | – | – | List, create, lock/unlock, cannot lock self, session ends on lock; as large as reference 5 (search & filter) | 5 |
| US-04 Server-side access control | – | – | – | One shared server guard, but a 403 check is needed on every /admin route | 3 |
| NFR-01 Hashing & validation | – | – | – | bcrypt library + max-length rules; size of reference 2 (hide book) | 2 |
| NFR-03 Hosting | – | – | – | Vercel + Supabase set-up and keep-alive; size of reference 2 | 2 |
| US-05 Add book | – | – | – | Most fields of any form + cover upload (JPG/PNG ≤ 2 MB) + boundary checks; reference 5 | 5 |
| US-06 Edit book | – | – | – | Reuses the add form; adds not-found and no-change cases | 3 |
| US-07 Hide book | – | – | – | Reference story (2 SP) | 2 |
| US-08 Manage categories | – | – | – | Add/rename/remove + unique name + 'in use by N books' rule | 3 |
| US-09 Manage authors | – | – | – | Same pattern as US-08 | 3 |
| NFR-02 Seed ≥ 30 books | – | – | – | Seed script that is safe to run twice | 2 |
| US-10 Book grid | – | – | – | Grid + pagination edge cases (page 0, too large, empty) | 3 |
| NFR-04 Responsive UI | – | – | – | Three breakpoints checked on every page + 44 px tap targets | 3 |
| US-11 Book detail | – | – | – | Reference story (3 SP); Back keeps page/search/filter | 3 |
| US-12 Search | – | – | – | One case-insensitive query on title or author; special characters as text | 3 |
| US-13 Filter + pagination | – | – | – | Category + price range + search kept in the URL across pages; reference 5 | 5 |
| NFR-05 Performance < 2 s | – | – | – | Measure 3 runs on the hosted site; add an index only if needed | 2 |

## Session 2 – CR-06 impact estimate (30/10/2026, before CCB; same method)
| Item | Round | Đạt | Chính | Basis of the estimate | Result SP |
|---|---|---|---|---|---|
| US-24 Store Staff role | – | – | – | New role touches every admin route and screen; server-side checks; as large as US-03 | 5 |
| US-25 Last-updated audit | – | – | – | Two audit columns + one display line | 2 |
| Rework/regression of F1 (US-03, US-04) | – | – | – | Rework of existing items; effort is counted in hours (CR-06 C2, C3, C6), **not added to PSP** | 3 |

**Totals:** Session 1 = 55 SP (S1 18 · S2 24 · S3 13). Session 2 = 7 SP added to PSP if CR-06 is approved (US-24 5 + US-25 2); the F1 rework (3 SP) is effort only.

If a real voting session is held later, add rows for round 2/3 whenever votes differ.
