# UAT Script – Release 1.0 (E-Commercial Book Store)

*User Acceptance Test with the Sponsor/Customer, Dr. Bùi Minh Phụng · Fri 13/11/2026, in class · Hosted site https://pagetunnel.vercel.app/ · Prepared by Nguyễn Minh Chính (PO). Part 1 (this version): F1, F2, F3 and US-24 (CR-06). Part 2 (S3-T13, 12/11): F4, F5, NFR-05, US-25 and the test accounts.*

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 0.1 | 10/11/2026 | Nguyễn Minh Chính (PO) | Part 1 (S3-T12): one UAT step per AC for F1 (US-01…04, NFR-01, NFR-03), F2 (US-05…09), F3 (US-10, NFR-02, NFR-04) and US-24 – 57 ACs |

## How the session runs
1. The team shares the screen. The Sponsor says what to do, or does it; the team member at the keyboard follows the *Step* column.
2. **Live** = done in front of the Sponsor on the hosted site. **Evidence** = an AC that cannot be shown live (database content, a fixed date, a file of exactly 2 MB, an empty catalogue); the team shows the recorded test result and the Sponsor accepts or rejects it.
3. The Sponsor's verdict goes in *Result* (Pass / Fail) and any remark in *Comment*. A Fail becomes a defect with a severity; Release 1.0 is accepted when no High defect is open (Release DoD).
4. Accounts (names only, passwords are given in the session, never written here): **Admin** = Administrator, **Staff** = Store Staff, **Cust** = Customer, **Cust2** = a second Customer used for lock tests. The list is in Part 2.
5. Data: the 30 seed books (`app/db/seed-data.js`). Test data made during UAT is hidden or removed afterwards.

## F1 – Accounts, login, administration

| UAT | AC | Account | Step | Expected result | Way | Result | Comment |
|---|---|---|---|---|---|---|---|
| UAT-F1-01 | US-01/AC-01 | – | Register with a new name, a new email and password `uat2026ok` | Account created as *Customer*, signed in, name shown in the header | Live | | |
| UAT-F1-02 | US-01/AC-02 | – | Register again with the same email in UPPER case | "Email is already registered" next to the email; no second account | Live | | |
| UAT-F1-03 | US-01/AC-03 | – | Register with email `abc@` and an empty name | Field errors on the form; nothing created (server check: automated test TC-F1-03) | Live + Evidence | | |
| UAT-F1-04 | US-01/AC-04 | – | Register with password `abc1234` (7 chars), then `abc12345` (8 chars) | 7 characters refused; 8 accepted | Live | | |
| UAT-F1-05 | US-02/AC-01 | Cust | Log in with the correct email and password | Signed in; name and *Log out* shown | Live | | |
| UAT-F1-06 | US-02/AC-02 | – | Log in with a wrong password; then with an unknown email | Both: "Invalid email or password" – same message | Live | | |
| UAT-F1-07 | US-02/AC-03 | Cust2 (locked in UAT-F1-12) | Log in with correct credentials | "This account is locked. Please contact the administrator." | Live | | |
| UAT-F1-08 | US-02/AC-04 | Cust | Log out, then open `/admin` | Session ended; redirected to Login | Live | | |
| UAT-F1-09 | US-02/AC-05 | Cust | Log in with the email in mixed case and with spaces around it | Signed in | Live | | |
| UAT-F1-10 | US-03/AC-01 | Admin | Accounts → create a *Store Staff* account with a new email | Account listed with role *Store Staff*, status *Active* | Live | | |
| UAT-F1-11 | US-03/AC-04 | Admin | Create another account with the same email | Field error; no account created | Live | | |
| UAT-F1-12 | US-03/AC-02 | Admin | Lock *Cust2* → (UAT-F1-07) → Unlock *Cust2* → Cust2 logs in | Status *Locked*, login refused; after Unlock, login works | Live | | |
| UAT-F1-13 | US-03/AC-03 | Admin | Try to lock the Admin's own account | "You cannot lock your own account" | Live | | |
| UAT-F1-14 | US-03/AC-05 | Admin + Cust2 | Cust2 signed in (second browser); Admin locks Cust2; Cust2 opens any page | Cust2 is signed out and sent to Login | Live | | |
| UAT-F1-15 | US-04/AC-01 | – (signed out) | Open https://pagetunnel.vercel.app/admin/books | Redirected to Login | Live | | |
| UAT-F1-16 | US-04/AC-02 | Cust | Open `/admin` and `/admin/accounts` directly | "Access denied" (403); nothing changes (hosted TC-F1-16). Direct POST bypassing the UI: automated integration test | Live + Evidence | | |
| UAT-F1-17 | US-04/AC-03 | Admin | Open `/admin` | Admin dashboard shown | Live | | |
| UAT-F1-18 | US-04/AC-04 | Cust | Look at the header and menus on the home page and `/books` | No admin menu item | Live | | |
| UAT-F1-19 | NFR-01/AC-01 | – | Show the `password_hash` column of `users` (Supabase screenshot, TC-F1-19) | Only bcrypt hashes `$2a$10$…`, no plain password | Evidence | | |
| UAT-F1-20 | NFR-01/AC-02 | – | Show the automated server-validation tests (bypassing the form) | Requests refused with an error; nothing stored | Evidence | | |
| UAT-F1-21 | NFR-01/AC-03 | – | Register with a 101-character name (paste) | Refused with a field error (64-char password and 254-char email: automated tests) | Live + Evidence | | |
| UAT-F1-22 | NFR-03/AC-01 | – | Open https://pagetunnel.vercel.app/ | Home page over HTTPS (padlock) | Live | | |
| UAT-F1-23 | NFR-03/AC-02 | – | Open the URL after the site has been idle | Site responds; the URL is in the Final Report | Live | | |
| UAT-F1-24 | NFR-03/AC-03 | – | Open the site on 17/11/2026 (final presentation, TC-F1-24) | Site online | Evidence (on 17/11) | | |

## F2 – Catalogue administration (books, categories, authors)

| UAT | AC | Account | Step | Expected result | Way | Result | Comment |
|---|---|---|---|---|---|---|---|
| UAT-F2-01 | US-05/AC-01 | Admin | Books → Add: title *UAT Book*, author *Jane Austen*, category *Novel*, price 99000, a short description, a JPG cover < 2 MB, stock 3 | Saved; first card on `/books` (newest first) | Live | | |
| UAT-F2-02 | US-05/AC-02 | Admin | Add a book with price 0, then −5, then `abc` | "Price must be greater than 0"; nothing saved | Live | | |
| UAT-F2-03 | US-05/AC-03 | Admin | Add a book with no title and no category | Field errors; nothing saved | Live | | |
| UAT-F2-04 | US-05/AC-04 | Admin | Price 0.01 and stock 0 → accepted; cover of 2 MB + 1 byte or a PDF → refused (2 MB files: hosted result TC-F2-04) | Boundary values accepted / rejected as stated | Live + Evidence | | |
| UAT-F2-05 | US-06/AC-01 | Admin | Edit *UAT Book*: price 109000 → Save; open `/books` and its detail page | New price on the card and the detail page | Live | | |
| UAT-F2-06 | US-06/AC-02 | Admin | Edit *UAT Book*: price 0 → Save | Refused; old price 109000 stays | Live | | |
| UAT-F2-07 | US-06/AC-03 | Admin | Open `/admin/books/99999/edit` | "Book not found" | Live | | |
| UAT-F2-08 | US-06/AC-04 | Admin | Open *UAT Book* and save without changes | Confirmation shown; book unchanged | Live | | |
| UAT-F2-09 | US-07/AC-02 | Admin | Delete *UAT Book* → **Cancel** | Nothing changes; book still listed | Live | | |
| UAT-F2-10 | US-07/AC-01 | Admin | Delete *UAT Book* → confirm | Gone from `/books`, the detail page and search; record kept (hidden) | Live | | |
| UAT-F2-11 | US-07/AC-03 | Cust | Open the old detail URL of *UAT Book* | "Sorry, this book is not available" (404) | Live | | |
| UAT-F2-12 | US-08/AC-01 | Admin | Categories → add *UAT Poetry* | Listed; offered in the book form and the `/books` category filter | Live | | |
| UAT-F2-13 | US-08/AC-02 | Admin | Rename *UAT Poetry* → *UAT Verse* | New name in the list and the book form | Live | | |
| UAT-F2-14 | US-08/AC-03 | Admin | Add a category *novel* (lower case) | Refused (already exists) | Live | | |
| UAT-F2-15 | US-08/AC-04 | Admin | Remove *Novel* (8 visible books) | "Category is in use by 8 books"; not removed | Live | | |
| UAT-F2-16 | US-08/AC-05 | Admin | Add a 1-character name and a 50-character name; then 0 and 51 characters | 1 and 50 accepted; 0 and 51 refused. Remove the test categories afterwards | Live | | |
| UAT-F2-17 | US-09/AC-01 | Admin | Authors → add *UAT Author* with a short bio | Selectable in the book form | Live | | |
| UAT-F2-18 | US-09/AC-02 | Admin | Rename an author who has books (e.g. *Charles Darwin* → *C. Darwin*), check `/books`, then rename back | New name on the cards and the detail page | Live | | |
| UAT-F2-19 | US-09/AC-03 | Admin | Remove *Jane Austen* | "Author is in use by 2 books"; not removed | Live | | |
| UAT-F2-20 | US-09/AC-04 | Admin | Author name of 100 characters; then 101 characters | 100 accepted, 101 refused. Remove *UAT Author* afterwards | Live | | |

## F3 – Catalogue for customers

| UAT | AC | Account | Step | Expected result | Way | Result | Comment |
|---|---|---|---|---|---|---|---|
| UAT-F3-01 | US-10/AC-01 | – | Open `/books` | 12 cards (cover, title, author, price), newest first; pagination shown | Live | | |
| UAT-F3-02 | US-10/AC-02 | – | Go to the last page (30 books → page 3) | Page 3 shows 6 books and no Next link (12-book and 25-book cases: automated tests TC-F3-02) | Live + Evidence | | |
| UAT-F3-03 | US-10/AC-03 | – | Open `/books?page=0`, `?page=-1`, `?page=abc`, `?page=999` | Page 1 (or the last page), no error | Live | | |
| UAT-F3-04 | US-10/AC-04 | – | Show the automated test with an empty catalogue | "No books available yet" | Evidence | | |
| UAT-F3-05 | NFR-02/AC-01 | – | Count on `/books` | At least 30 visible books in at least 4 categories, all with covers, prices and stock | Live | | |
| UAT-F3-06 | NFR-02/AC-02 | – | Show the deploy log: the seed runs on every deploy and still 30 seed books | No duplicates | Evidence | | |
| UAT-F3-07 | NFR-04/AC-01 | – | DevTools device mode: `/books`, a detail page and an admin form at 360, 768, 1280 px | No horizontal scrolling; grid 2 / 3 / 4 columns | Live | | |
| UAT-F3-08 | NFR-04/AC-02 | – | At 360 px, tap the menu, pagination and buttons | Every tap target ≥ 44 × 44 px (measured: TC-F3-06, 10/11) | Live + Evidence | | |

## US-24 – Store Staff role (CR-06)

| UAT | AC | Account | Step | Expected result | Way | Result | Comment |
|---|---|---|---|---|---|---|---|
| UAT-CR-01 | US-24/AC-01 | Staff | Books → Add a valid book *UAT Staff Book* | Saved and listed | Live | | |
| UAT-CR-02 | US-24/AC-02 | Staff | Look for Delete on the books list (hosted TC-CR-02); show the automated test that sends the delete request directly | No Delete button; direct request → 403 | Live + Evidence | | |
| UAT-CR-03 | US-24/AC-03 | Staff | Open `/admin/accounts` | Access denied (403) | Live | | |
| UAT-CR-04 | US-24/AC-04 | Admin, then Cust | Admin changes *Cust* from Customer to Store Staff; Cust logs out and in again | Cust now has the Staff menu and Staff rights only | Live | | |
| UAT-CR-05 | US-24/AC-05 | Staff | Add a category and rename an author; then try Remove on a category | Add and rename saved; no Remove for Staff / 403 | Live | | |

## Summary – Part 1
| Feature | ACs | Live | Live + Evidence | Evidence only |
|---|---|---|---|---|
| F1 (US-01…04, NFR-01, NFR-03) | 24 | 18 | 3 | 3 |
| F2 (US-05…09) | 20 | 19 | 1 | 0 |
| F3 (US-10, NFR-02, NFR-04) | 8 | 4 | 2 | 2 |
| US-24 (CR-06) | 5 | 4 | 1 | 0 |
| **Total Part 1** | **57** | **45** | **7** | **5** |

*Clean-up after the session: hide *UAT Book* and *UAT Staff Book*, remove the UAT categories and author, set *Cust* back to Customer, unlock *Cust2*.*
