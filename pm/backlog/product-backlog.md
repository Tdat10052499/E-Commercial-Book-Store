# Product Backlog v1.0 – Release 1.0 (Book Catalogue)

**Owner:** Product Owner Nguyễn Minh Chính (proposed, Master Plan v0.4) · **Estimation:** Fibonacci SP (1, 2, 3, 5, 8, 13) by Planning Poker · **Priority:** MoSCoW · **AC format:** Given–When–Then, numbered `US-xx/AC-0n`, covering main (M), exception (E) and boundary (B) flows.
**Numbering:** IDs kept from TA Product Backlog v0; new items numbered from US-24 (aligned with `HK261_SPM_FP_Team6_MasterPlan.xlsx` v0.4, sheet 3).

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 0 (TA) | 15/10/2026 | Team 6 | 23 items, 99 SP, numbered conditions as AC, 2-week Sprints [04 §4] |
| 1.0-draft | 30/10/2026 | Hồ Du Tuấn Đạt (AI-assisted) | Rebaselined to F1–F5 [03 §2.2]; GWT ACs; DoR; out-of-scope items → Won't (R1.0) [05 §1, §4]; SP cleared until Planning Poker [03 §6.1-3] |
| 1.0-draft2 | 30/10/2026 | Hồ Du Tuấn Đạt (AI-assisted), aligned to PO workbook | Re-aligned to Master Plan v0.4 (Chính, PO) as the single source: **v0 IDs restored** (draft 1 had renumbered them); 29 items = 14 R1.0 + 2 CR-06 + 13 Won't. Merges: server-side guard → US-03; hashing/validation → US-01; ≥ 30 books and < 2 s → NFR-01; search + filter → US-06. New: US-24 categories, US-25 authors, NFR-01, NFR-02 hosting; CR-06 = US-26, US-27 |

## Summary
| Group | Items | SP (plan) |
|---|---|---|
| Release 1.0 – Must | 14 | TBD after Planning Poker |
| CR-06 – pending CCB 30/10 | 2 (US-26, US-27) | TBD |
| Won't (R1.0) | 13 | not estimated for R1.0 (v0 SP kept for reference) |
| **Total items** | **29** (≥ 15 required) | **PSP = TBD** |

## A. Release 1.0 items
| Rank | ID | F | User story | SP | MoSCoW | Sprint (plan) | Main developer | Change vs. v0 |
|---|---|---|---|---|---|---|---|---|
| 1 | US-01 | F1 | As a **visitor**, I want to register with my name, email and password so that I can sign in as a customer; my password is stored hashed and every field is validated on client and server. | TBD | Must | S1 | Hồ Du Tuấn Đạt | Email confirmation dropped; hashing + validation added [v0: 3 SP] |
| 2 | US-02 | F1 | As a **registered user**, I want to log in and log out so that only I can use my account. | TBD | Must | S1 | Hồ Du Tuấn Đạt | Reset/lockout not required by F1 (PO to confirm) [v0: 3 SP] |
| 3 | US-03 | F1 | As an **administrator**, I want to create accounts with a role (Administrator/Customer) and lock/unlock them, with admin functions blocked on the server for everyone else, so that I control who uses the system. | TBD | Must | S1 | Nguyễn Minh Chính | Rewritten; Store Manager/Staff removed from R1.0 [05 #6] [v0: 5 SP] |
| 4 | NFR-02 | NFR | As the **customer (Ms. Le)**, I want the release hosted on a free public URL until 17/11/2026 so that I can review every increment. | TBD | Must | S1 | Hồ Du Tuấn Đạt | New |
| 5 | US-08 | F2 | As an **administrator**, I want to add a book (title, author, category, price > 0, description, cover image, stock) so that it appears in the catalogue. | TBD | Must | S2 | Hồ Du Tuấn Đạt | ISBN no longer mandatory; description/stock added [v0: 5 SP] |
| 6 | US-09 | F2 | As an **administrator**, I want to edit a book's information so that the catalogue stays correct. | TBD | Must | S2 | Hồ Du Tuấn Đạt | Price-change log removed [v0: 3 SP] |
| 7 | US-10 | F2 | As an **administrator**, I want to delete (hide) a book without losing its record so that discontinued books disappear from the shop. | TBD | Must | S2 | Hồ Du Tuấn Đạt | Kept [v0: 2 SP] |
| 8 | US-24 | F2 | As an **administrator**, I want to add, rename and remove categories so that books can be grouped. | TBD | Must | S2 | Nguyễn Minh Chính | New – required by F2 [05 #5] |
| 9 | US-25 | F2 | As an **administrator**, I want to add, edit and remove authors so that books reference consistent author data. | TBD | Must | S2 | Nguyễn Minh Chính | New – required by F2 [05 #5] |
| 10 | US-05 | F3 | As a **customer**, I want to browse books in a card grid (cover, title, author, price), 12 per page, newest first, so that I can see what is new. | TBD | Must | S2 | Nguyễn Minh Chính | 20 → 12 per page; sort options removed [05 #2] [v0: 3 SP] |
| 11 | NFR-01 | F3 | As the **customer (Ms. Le)**, I want at least 30 sample books and a list page that loads in under 2 seconds so that the catalogue can be demonstrated and feels fast. | TBD | Must | S2 | Hồ Du Tuấn Đạt | New [05 #8] |
| 12 | US-21 | NFR | As a **customer**, I want every page to work on phone, tablet and desktop in common browsers so that I can shop from any device. | TBD | Must | S2 | Hồ Du Tuấn Đạt | Kept; checked with F3 [v0: 5 SP] |
| 13 | US-07 | F4 | As a **customer**, I want to open a book's detail page and go back to the same list page so that I can compare books without losing my place. | TBD | Must | S3 | Nguyễn Minh Chính | Add to cart removed; 2 ACs added [05 #4] [v0: 3 SP] |
| 14 | US-06 | F5 | As a **customer**, I want to search by title or author and filter by category and price range together with pagination so that I only see relevant books. | TBD | Must | S3 | Hồ Du Tuấn Đạt | ISBN/genre removed; price range + pagination added [05 #3] [v0: 5 SP] |

## B. CR-06 items (pending CCB on 30/10/2026 – not in baseline until approved)
| ID | F | User story | SP | MoSCoW | Sprint | Main developer |
|---|---|---|---|---|---|---|
| US-26 | F1, F2 | As a **store staff member**, I want to add and edit books and manage categories and authors, without deleting books or managing accounts, so that I can update the catalogue daily without full admin rights. [CR-06 §1] | TBD | CCB decides | per CCB option | Hồ Du Tuấn Đạt |
| US-27 | F2 | As an **administrator**, I want each book to show "Last updated by <name> at <time>" so that I know who changed it. [CR-06 §1] | TBD | CCB decides | per CCB option | Hồ Du Tuấn Đạt |

## C. Won't (R1.0) – kept for a later release
| ID | Epic | Story (short) | v0 SP | Reason |
|---|---|---|---|---|
| US-04 | EP-01 | Profile and delivery addresses | 2 | Depends on checkout – out of R1.0 scope |
| US-11 | EP-04 | Shopping cart | 5 | Out of scope [03 §2.2] |
| US-12 | EP-04 | Checkout and online payment | 8 | Out of scope [03 §2.2] |
| US-13 | EP-04 | Order history and tracking | 3 | Depends on orders |
| US-14 | EP-04 | Staff process orders | 5 | Depends on orders |
| US-15 | EP-05 | Create promotions | 5 | Not in F1–F5 |
| US-16 | EP-05 | Apply a promotion code at checkout | 3 | Depends on checkout |
| US-17 | EP-06 | Manage stores and stock per store | 8 | Not in F1–F5 |
| US-18 | EP-06 | Store availability and pickup | 5 | Not in F1–F5 |
| US-19 | EP-07 | Ratings and reviews | 5 | Requires purchase data |
| US-20 | EP-07 | Wishlist | 2 | Not in F1–F5 |
| US-22 | EP-08 | Distinctive brand theme | 3 | PO to decide – "own style" partly covered by the UI design |
| US-23 | EP-07 | Book recommendations | 8 | Already Won't in v0 |

---

## D. Acceptance Criteria (Given–When–Then)

### US-01 Register (incl. password hashing and validation)
- **US-01/AC-01 (M)** Given I am on the Register page, When I submit a valid name, a new email and a password of at least 8 characters containing letters and digits, Then my account is created with role *Customer*, I am signed in and redirected to the home page.
- **US-01/AC-02 (E)** Given an account with email `a@b.com` already exists, When I register with `a@b.com` (any letter case), Then registration is refused with "Email is already registered" next to the email field and no account is created.
- **US-01/AC-03 (E)** Given I am on the Register page, When I submit an invalid email format or leave a required field empty, Then the form shows a field-level error on the client, and the server also rejects the request if client validation is bypassed.
- **US-01/AC-04 (B)** Given the password rule "8–64 characters, at least one letter and one digit", When I enter exactly 7 characters, Then it is rejected; When I enter exactly 8 characters, Then it is accepted.
- **US-01/AC-05 (M)** Given a new account, When it is saved, Then the database stores only a bcrypt hash (cost ≥ 10), never the plain password.
- **US-01/AC-06 (E)** Given any form, When required fields are empty or invalid and client validation is bypassed, Then the server rejects the request with an error message and stores nothing.
- **US-01/AC-07 (B)** Given a text field with a maximum length (name 100, email 254, password 64), When input exceeds the maximum by 1 character, Then it is rejected.

### US-02 Log in / log out
- **US-02/AC-01 (M)** Given an active account, When I log in with the correct email and password, Then I am signed in and see my name and a Log out link.
- **US-02/AC-02 (E)** Given I enter a wrong password or an unknown email, When I submit, Then I see the generic message "Invalid email or password" (not revealing which one is wrong).
- **US-02/AC-03 (E)** Given my account has been locked by an administrator, When I log in with correct credentials, Then login is refused with "This account is locked. Please contact the administrator."
- **US-02/AC-04 (M)** Given I am signed in, When I click Log out, Then my session ends and opening a protected page redirects me to the Login page.
- **US-02/AC-05 (B)** Given the email field, When I enter my email with different letter case or surrounding spaces, Then I am still recognised (email is trimmed and case-insensitive).

### US-03 Administrator creates and locks accounts; roles; server-side access control
- **US-03/AC-01 (M)** Given I am signed in as Administrator, When I create an account with a valid name, unique email, initial password and role (Administrator or Customer), Then the account appears in the account list with that role and status *Active*.
- **US-03/AC-02 (M)** Given an active account that is not mine, When I click Lock, Then its status becomes *Locked* and that user can no longer log in; When I click Unlock, Then the user can log in again.
- **US-03/AC-03 (E)** Given I am signed in as Administrator, When I try to lock my own account, Then the action is refused with "You cannot lock your own account".
- **US-03/AC-04 (E)** Given I create an account with an email that already exists, Then it is refused with a field-level error and no account is created.
- **US-03/AC-05 (B)** Given a user is signed in, When an administrator locks that account, Then the user's next request ends the session and redirects to Login.
- **US-03/AC-06 (E)** Given I am not signed in, When I open any `/admin` URL directly, Then I am redirected to the Login page.
- **US-03/AC-07 (E)** Given I am signed in as Customer, When I open or POST to any `/admin` URL directly (bypassing the UI), Then the server responds 403 "Access denied" and no data changes.
- **US-03/AC-08 (M)** Given I am signed in as Administrator, When I open `/admin`, Then the admin dashboard is shown.
- **US-03/AC-09 (B)** Given I am a Customer, When I view any page, Then no admin menu item is rendered.

### NFR-02 Hosting
- **NFR-02/AC-01 (M)** Given the `develop` build passes, When it is deployed, Then the public URL opens the home page over HTTPS.
- **NFR-02/AC-02 (E)** Given the free host has slept, When the lecturer opens the URL, Then the site responds (warm-up/keep-alive in place) and the URL is recorded in the Final Report.
- **NFR-02/AC-03 (B)** Given the date 17/11/2026, When the site is opened at any time that day, Then it is still online.

### US-08 Add book
- **US-08/AC-01 (M)** Given I am an Administrator on Add Book, When I submit title, author, category, price > 0, description, a JPG/PNG cover ≤ 2 MB and stock ≥ 0, Then the book is saved and appears first in the newest-first list.
- **US-08/AC-02 (E)** Given price is 0, negative or not a number, When I submit, Then the form shows "Price must be greater than 0" and nothing is saved (client and server).
- **US-08/AC-03 (E)** Given title, author or category is missing, When I submit, Then field-level errors are shown and nothing is saved.
- **US-08/AC-04 (B)** Given price 0.01 / stock 0 / a cover of exactly 2 MB, Then the book is accepted; given a cover of 2 MB + 1 byte or a non-image file, Then it is rejected.

### US-09 Edit book
- **US-09/AC-01 (M)** Given an existing book, When I change any field with valid values and save, Then the change is visible in the list and detail pages.
- **US-09/AC-02 (E)** Given I enter invalid data (e.g. price ≤ 0), When I save, Then the edit is refused and the old values remain.
- **US-09/AC-03 (E)** Given a book ID that does not exist or is hidden, When I open its edit URL, Then I see "Book not found".
- **US-09/AC-04 (B)** Given I save without changing anything, Then the book is unchanged and a confirmation is shown.

### US-10 Delete (hide) book
- **US-10/AC-01 (M)** Given a visible book, When I click Delete and confirm, Then the book no longer appears in the catalogue, detail or search, but its record remains in the database with `is_deleted = true`.
- **US-10/AC-02 (E)** Given the confirmation dialog, When I click Cancel, Then nothing changes.
- **US-10/AC-03 (B)** Given a hidden book, When a customer opens its old detail URL, Then the friendly "Book not found" page is shown.

### US-24 Manage categories
- **US-24/AC-01 (M)** Given I am an Administrator, When I add a category with a unique name, Then it is available in the book form and the category filter.
- **US-24/AC-02 (M)** Given an existing category, When I rename it, Then all its books show the new name.
- **US-24/AC-03 (E)** Given a category name that already exists (case-insensitive), When I save, Then it is refused.
- **US-24/AC-04 (E)** Given a category used by at least one visible book, When I try to remove it, Then it is refused with "Category is in use by N books".
- **US-24/AC-05 (B)** Given a name of 1 character or of 50 characters, Then it is accepted; 0 or 51 characters, Then it is rejected.

### US-25 Manage authors
- **US-25/AC-01 (M)** Given I am an Administrator, When I add an author with a name (and optional bio), Then the author can be selected in the book form.
- **US-25/AC-02 (M)** Given an existing author, When I edit the name, Then the book list and detail show the new name.
- **US-25/AC-03 (E)** Given an author linked to at least one visible book, When I try to remove the author, Then it is refused with "Author is in use by N books".
- **US-25/AC-04 (B)** Given a name of 100 characters, Then it is accepted; 101 characters, Then it is rejected.

### US-05 Book grid – 12 per page, newest first
- **US-05/AC-01 (M)** Given at least 13 visible books, When I open the catalogue, Then I see a grid of 12 cards (cover, title, author, price), newest first, and pagination controls.
- **US-05/AC-02 (B)** Given exactly 12 visible books, Then there is one page and no Next link; given 25 books, Then page 3 shows 1 book.
- **US-05/AC-03 (E)** Given `?page=0`, a negative, a non-numeric or a too-large page number, When I open the URL, Then page 1 (or the last page) is shown without an error.
- **US-05/AC-04 (E)** Given there are no visible books, Then the page shows "No books available yet".

### NFR-01 Sample data ≥ 30 books and list page < 2 s
- **NFR-01/AC-01 (M)** Given a fresh database, When the seed script runs, Then at least 30 visible books across at least 4 categories with covers, prices and stock exist.
- **NFR-01/AC-02 (B)** Given the seed script is run twice, Then no duplicate books are created.
- **NFR-01/AC-03 (M)** Given ≥ 30 sample books on the hosted site (warm), When the catalogue page is loaded, Then it finishes in < 2 s, measured with browser DevTools on 3 runs (median recorded).
- **NFR-01/AC-04 (B)** Given page 3 with search and filter applied, Then it also loads in < 2 s.

### US-21 Responsive, cross-browser UI
- **US-21/AC-01 (M)** Given widths of 360, 768 and 1280 px, When I open the catalogue, admin forms and detail pages, Then content fits without horizontal scrolling and the grid adapts (1–2 / 3 / 4 columns).
- **US-21/AC-02 (B)** Given a touch device, Then tap targets are at least 44 × 44 px.

### US-07 Book detail page
- **US-07/AC-01 (M)** Given I am on catalogue page N, When I click a book, Then its detail page shows cover, title, author, category, price, description and stock.
- **US-07/AC-02 (M)** Given I opened a detail page from page N (with any search/filter), When I click Back to list, Then I return to page N with the same search and filter.
- **US-07/AC-03 (E)** Given a book ID that does not exist, is hidden or is not a number, When I open `/books/<id>`, Then a friendly "Sorry, this book is not available" page with a link to the catalogue is shown (HTTP 404, no stack trace).
- **US-07/AC-04 (B)** Given I opened the detail page directly (no previous list), When I click Back to list, Then I go to catalogue page 1.

### US-06 Search, filter and pagination
- **US-06/AC-01 (M)** Given books exist, When I search "harry", Then books whose title **or** author contains "harry" (case-insensitive, partial) are listed, newest first, 12 per page.
- **US-06/AC-02 (E)** Given no book matches, When I search, Then I see "No books match your search" and a link to clear filters.
- **US-06/AC-03 (B)** Given an empty or whitespace-only keyword, Then all visible books are listed; given a keyword of 100 characters, Then the search still works; special characters (`%`, `'`) are treated as text.
- **US-06/AC-04 (M)** Given I choose category "Novel" and price 50,000–150,000 VND, When I apply, Then only visible books in that category with price within the range (inclusive) are shown.
- **US-06/AC-05 (M)** Given a search and filters return more than 12 books, When I go to page 2, Then search and filters are kept in the URL and on page 2.
- **US-06/AC-06 (E)** Given min price > max price, When I apply, Then I see "Minimum price must not exceed maximum price" and the filter is not applied.
- **US-06/AC-07 (B)** Given a book priced exactly at the min or max bound, Then it is included.

### US-26 Store Staff role (CR-06, pending)
Customer ACs from [CR-06 §3] plus team additions (to be confirmed at CCB):
- **US-26/AC-01 (M)** Given a Staff account, When it adds a valid book, Then the book is saved. [CR AC1]
- **US-26/AC-02 (E)** Given a Staff account, When it tries to delete a book (UI or direct request), Then no delete button is shown and the server answers 403. [CR AC2]
- **US-26/AC-03 (E)** Given a Staff account, When it opens the account-management page, Then access is denied (403). [CR AC3]
- **US-26/AC-04 (M)** Given an administrator changes an account from Customer to Staff, When that user logs in again, Then they have exactly the Staff permissions. [CR AC4]
- **US-26/AC-05 (M)** Given a Staff account, When it adds/edits categories and authors, Then the changes are saved (whether Staff may *remove* categories/authors: TBD – question to Sponsor).

### US-27 Last-updated audit (CR-06, pending)
- **US-27/AC-01 (M)** Given a Staff member edits a book, When the book's admin page is opened, Then it shows "Last updated by <name> at <dd/mm/yyyy HH:mm>". [CR AC5]
- **US-27/AC-02 (B)** Given a book created by seed data and never edited, Then it shows "Last updated by System at <seed time>".
- **US-27/AC-03 (E)** Given the updating user is later renamed or locked, Then the audit still shows the name stored at update time.
