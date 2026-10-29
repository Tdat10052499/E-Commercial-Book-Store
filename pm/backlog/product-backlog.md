# Product Backlog v1.0 – Release 1.0 (Book Catalogue)

**Owner:** Product Owner (Nguyễn Minh Chính) · **Estimation:** Fibonacci SP (1, 2, 3, 5, 8, 13) by Planning Poker · **Priority:** MoSCoW · **AC format:** Given–When–Then, numbered `US-xx/AC-0n`, covering main (M), exception (E) and boundary (B) flows.

## Version history
| Version | Date | Author | Change |
|---|---|---|---|
| 0 (TA) | 15/10/2026 | Team 6 | 23 items, 99 SP, numbered conditions as AC, 2-week Sprints [04 §4] |
| 1.0-draft | 30/10/2026 | Hồ Du Tuấn Đạt (AI-assisted), PO review pending | Rebaselined to F1–F5 [03 §2.2]: rewrote US-03 to Administrator/Customer with account locking; added server-side access guard, category CRUD, author CRUD; F3 changed from 20 to **12 books/page, newest first**; F4 added friendly not-found and Back-to-same-page; F5 changed to title/author search + category & price-range filter combined with pagination; email confirmation/reset, ISBN-mandatory and Add-to-cart removed from R1.0 ACs; added NFR items (hashing, validation, seed ≥30, hosting, responsive, < 2 s); cart, checkout, orders, promotions, multi-store, reviews, wishlist, recommendations moved to *Won't (this release)* because they are out of scope [03 §2.2], [05 §1, §4]; all ACs rewritten in GWT; IDs renumbered (v0 ID kept for traceability); CR-06 items added as *pending CCB*. **SP cleared for every changed item until re-estimated by Planning Poker** [03 §6.1-3] |

## Summary
| Group | Items | SP (plan) |
|---|---|---|
| Release 1.0 – Must | 18 (US-01…US-13, NFR-01…NFR-05) | TBD after Planning Poker |
| CR-06 – pending CCB 30/10 | 2 (US-24, US-25) | TBD |
| Won't (this release) | 10 | not estimated for R1.0 (v0 SP kept for reference) |
| **Total items** | **30** | **PSP = TBD** |

## A. Release 1.0 items
| Rank | ID | v0 ID | F | User story | SP | MoSCoW | Sprint (plan) |
|---|---|---|---|---|---|---|---|
| 1 | US-01 | US-01 | F1 | As a **visitor**, I want to register with my name, email and password so that I can sign in as a customer. | TBD | Must | S1 |
| 2 | US-02 | US-02 | F1 | As a **registered user**, I want to log in and log out so that only I can use my account. | TBD | Must | S1 |
| 3 | US-03 | US-03 | F1 | As an **administrator**, I want to create accounts with a role and lock/unlock accounts so that I control who can use the system. | TBD | Must | S1 |
| 4 | US-04 | new | F1 | As the **store owner**, I want admin functions to be blocked for anyone who is not an administrator so that catalogue and account data stay safe. | TBD | Must | S1 |
| 5 | NFR-01 | new | F1 | As the **store owner**, I want passwords stored as hashes and every form validated on client and server so that customer data is protected. | TBD | Must | S1 |
| 6 | NFR-03 | new | All | As the **customer (Ms. Le)**, I want the site hosted on a free public URL until 17/11/2026 so that I can review each increment. | TBD | Must | S1 |
| 7 | US-05 | US-08 | F2 | As an **administrator**, I want to add a book (title, author, category, price, description, cover image, stock) so that it appears in the catalogue. | TBD | Must | S2 |
| 8 | US-06 | US-09 | F2 | As an **administrator**, I want to edit a book's information so that the catalogue stays correct. | TBD | Must | S2 |
| 9 | US-07 | US-10 | F2 | As an **administrator**, I want to delete (hide) a book without losing its record so that discontinued books disappear from the shop. | TBD | Must | S2 |
| 10 | US-08 | new | F2 | As an **administrator**, I want to add, rename and remove categories so that books can be grouped. | TBD | Must | S2 |
| 11 | US-09 | new | F2 | As an **administrator**, I want to add, edit and remove authors so that books reference consistent author data. | TBD | Must | S2 |
| 12 | NFR-02 | (T-16) | F2/F3 | As the **customer (Ms. Le)**, I want at least 30 sample books loaded so that the catalogue can be demonstrated and performance measured. | TBD | Must | S2 |
| 13 | US-10 | US-05 | F3 | As a **customer**, I want to browse books in a grid of 12 per page, newest first, so that I can see what is new. | TBD | Must | S2 |
| 14 | NFR-04 | US-21 | F3 | As a **customer**, I want every page to work on phone, tablet and desktop so that I can shop from any device. | TBD | Must | S2 |
| 15 | US-11 | US-07 | F4 | As a **customer**, I want to open a book's detail page and go back to the same list page so that I can compare books without losing my place. | TBD | Must | S3 |
| 16 | US-12 | US-06 | F5 | As a **customer**, I want to search by title or author so that I can find a specific book quickly. | TBD | Must | S3 |
| 17 | US-13 | US-06 | F5 | As a **customer**, I want to filter by category and price range together with search and pagination so that I only see relevant books. | TBD | Must | S3 |
| 18 | NFR-05 | (US-06 AC) | F3/F5 | As a **customer**, I want the book list to load in under 2 seconds so that browsing feels fast. | TBD | Must | S3 |

## B. CR-06 items (pending CCB on 30/10/2026 – not in baseline until approved)
| ID | F | User story | SP | MoSCoW | Sprint |
|---|---|---|---|---|---|
| US-24 | F1, F2 | As a **store staff member**, I want to add and edit books and manage categories and authors, without deleting books or managing accounts, so that I can update the catalogue daily without full admin rights. [CR-06 §1] | TBD | Must (if approved) | per CCB option |
| US-25 | F2 | As an **administrator**, I want each book to show "Last updated by <name> at <time>" so that I know who changed it. [CR-06 §1] | TBD | Must (if approved) | per CCB option |

## C. Won't (this release) – kept for Release 2
| ID | v0 ID | Story (short) | v0 SP | Reason |
|---|---|---|---|---|
| R2-01 | US-04 | Customer profile and shipping addresses | 2 | Supports checkout, out of scope [03 §2.2] |
| R2-02 | US-11 | Shopping cart | 5 | Cart out of scope [03 §2.2] |
| R2-03 | US-12 | Checkout & online payment | 8 | Payment out of scope |
| R2-04 | US-13 | Order history & tracking | 3 | Depends on checkout |
| R2-05 | US-14 | Staff processes orders | 5 | Depends on checkout |
| R2-06 | US-15/16 | Promotions and discount codes | 5 + 3 | Depends on checkout |
| R2-07 | US-17/18 | Multi-store inventory and in-store pickup | 8 + 5 | Not in F1–F5 |
| R2-08 | US-19 | Ratings & reviews | 5 | Not in F1–F5 |
| R2-09 | US-20 | Wishlist | 2 | Not in F1–F5 |
| R2-10 | US-22, US-23, US-02 (reset) | Brand style guide, recommendations, password reset by email | 3 + 8 + – | Not in F1–F5; SMTP risk on free hosting [05 #7] |

---

## D. Acceptance Criteria (Given–When–Then)

### US-01 Register
- **US-01/AC-01 (M)** Given I am on the Register page, When I submit a valid name, a new email and a password of at least 8 characters containing letters and digits, Then my account is created with role *Customer*, I am signed in and redirected to the home page.
- **US-01/AC-02 (E)** Given an account with email `a@b.com` already exists, When I register with `a@b.com` (any letter case), Then registration is refused with "Email is already registered" next to the email field and no account is created.
- **US-01/AC-03 (E)** Given I am on the Register page, When I submit an invalid email format or leave a required field empty, Then the form shows a field-level error on the client, and the server also rejects the request if client validation is bypassed.
- **US-01/AC-04 (B)** Given the password rule "8–64 characters, at least one letter and one digit", When I enter exactly 7 characters, Then it is rejected; When I enter exactly 8 characters, Then it is accepted.

### US-02 Log in / log out
- **US-02/AC-01 (M)** Given an active account, When I log in with the correct email and password, Then I am signed in and see my name and a Log out link.
- **US-02/AC-02 (E)** Given I enter a wrong password or an unknown email, When I submit, Then I see the generic message "Invalid email or password" (not revealing which one is wrong).
- **US-02/AC-03 (E)** Given my account has been locked by an administrator, When I log in with correct credentials, Then login is refused with "This account is locked. Please contact the administrator."
- **US-02/AC-04 (M)** Given I am signed in, When I click Log out, Then my session ends and opening a protected page redirects me to the Login page.
- **US-02/AC-05 (B)** Given the email field, When I enter my email with different letter case or surrounding spaces, Then I am still recognised (email is trimmed and case-insensitive).

### US-03 Administrator creates and locks accounts
- **US-03/AC-01 (M)** Given I am signed in as Administrator, When I create an account with a valid name, unique email, initial password and role (Administrator or Customer), Then the account appears in the account list with that role and status *Active*.
- **US-03/AC-02 (M)** Given an active account that is not mine, When I click Lock, Then its status becomes *Locked* and that user can no longer log in; When I click Unlock, Then the user can log in again.
- **US-03/AC-03 (E)** Given I am signed in as Administrator, When I try to lock my own account, Then the action is refused with "You cannot lock your own account".
- **US-03/AC-04 (E)** Given I create an account with an email that already exists, Then it is refused with a field-level error and no account is created.
- **US-03/AC-05 (B)** Given a user is signed in, When an administrator locks that account, Then the user's next request ends the session and redirects to Login.

### US-04 Server-side access control
- **US-04/AC-01 (E)** Given I am not signed in, When I open any `/admin` URL directly, Then I am redirected to the Login page.
- **US-04/AC-02 (E)** Given I am signed in as Customer, When I open or POST to any `/admin` URL directly (bypassing the UI), Then the server responds 403 "Access denied" and no data changes.
- **US-04/AC-03 (M)** Given I am signed in as Administrator, When I open `/admin`, Then the admin dashboard is shown.
- **US-04/AC-04 (B)** Given I am a Customer, When I view any page, Then no admin menu item is rendered.

### NFR-01 Password hashing and validation
- **NFR-01/AC-01 (M)** Given a new account, When it is saved, Then the database stores only a bcrypt hash (cost ≥ 10), never the plain password.
- **NFR-01/AC-02 (E)** Given any form, When required fields are empty or invalid and client validation is bypassed, Then the server rejects the request with an error message and stores nothing.
- **NFR-01/AC-03 (B)** Given a text field with a maximum length (name 100, email 254, password 64), When input exceeds the maximum by 1 character, Then it is rejected.

### NFR-03 Hosting
- **NFR-03/AC-01 (M)** Given the `develop` build passes, When it is deployed, Then the public URL opens the home page over HTTPS.
- **NFR-03/AC-02 (E)** Given the free host has slept, When the lecturer opens the URL, Then the site responds (warm-up/keep-alive in place) and the URL is recorded in the Final Report.
- **NFR-03/AC-03 (B)** Given the date 17/11/2026, When the site is opened at any time that day, Then it is still online.

### US-05 Add book
- **US-05/AC-01 (M)** Given I am an Administrator on Add Book, When I submit title, author, category, price > 0, description, a JPG/PNG cover ≤ 2 MB and stock ≥ 0, Then the book is saved and appears first in the newest-first list.
- **US-05/AC-02 (E)** Given price is 0, negative or not a number, When I submit, Then the form shows "Price must be greater than 0" and nothing is saved (client and server).
- **US-05/AC-03 (E)** Given title, author or category is missing, When I submit, Then field-level errors are shown and nothing is saved.
- **US-05/AC-04 (B)** Given price 0.01 / stock 0 / a cover of exactly 2 MB, Then the book is accepted; given a cover of 2 MB + 1 byte or a non-image file, Then it is rejected.

### US-06 Edit book
- **US-06/AC-01 (M)** Given an existing book, When I change any field with valid values and save, Then the change is visible in the list and detail pages.
- **US-06/AC-02 (E)** Given I enter invalid data (e.g. price ≤ 0), When I save, Then the edit is refused and the old values remain.
- **US-06/AC-03 (E)** Given a book ID that does not exist or is hidden, When I open its edit URL, Then I see "Book not found".
- **US-06/AC-04 (B)** Given I save without changing anything, Then the book is unchanged and a confirmation is shown.

### US-07 Hide (soft delete) book
- **US-07/AC-01 (M)** Given a visible book, When I click Delete and confirm, Then the book no longer appears in the catalogue, detail or search, but its record remains in the database with `is_deleted = true`.
- **US-07/AC-02 (E)** Given the confirmation dialog, When I click Cancel, Then nothing changes.
- **US-07/AC-03 (B)** Given a hidden book, When a customer opens its old detail URL, Then the friendly "Book not found" page is shown.

### US-08 Manage categories
- **US-08/AC-01 (M)** Given I am an Administrator, When I add a category with a unique name, Then it is available in the book form and the category filter.
- **US-08/AC-02 (M)** Given an existing category, When I rename it, Then all its books show the new name.
- **US-08/AC-03 (E)** Given a category name that already exists (case-insensitive), When I save, Then it is refused.
- **US-08/AC-04 (E)** Given a category used by at least one visible book, When I try to remove it, Then it is refused with "Category is in use by N books".
- **US-08/AC-05 (B)** Given a name of 1 character or of 50 characters, Then it is accepted; 0 or 51 characters, Then it is rejected.

### US-09 Manage authors
- **US-09/AC-01 (M)** Given I am an Administrator, When I add an author with a name (and optional bio), Then the author can be selected in the book form.
- **US-09/AC-02 (M)** Given an existing author, When I edit the name, Then the book list and detail show the new name.
- **US-09/AC-03 (E)** Given an author linked to at least one visible book, When I try to remove the author, Then it is refused with "Author is in use by N books".
- **US-09/AC-04 (B)** Given a name of 100 characters, Then it is accepted; 101 characters, Then it is rejected.

### NFR-02 Sample data
- **NFR-02/AC-01 (M)** Given a fresh database, When the seed script runs, Then at least 30 visible books across at least 4 categories with covers, prices and stock exist.
- **NFR-02/AC-02 (B)** Given the seed script is run twice, Then no duplicate books are created.

### US-10 Book grid
- **US-10/AC-01 (M)** Given at least 13 visible books, When I open the catalogue, Then I see a grid of 12 cards (cover, title, author, price), newest first, and pagination controls.
- **US-10/AC-02 (B)** Given exactly 12 visible books, Then there is one page and no Next link; given 25 books, Then page 3 shows 1 book.
- **US-10/AC-03 (E)** Given `?page=0`, a negative, a non-numeric or a too-large page number, When I open the URL, Then page 1 (or the last page) is shown without an error.
- **US-10/AC-04 (E)** Given there are no visible books, Then the page shows "No books available yet".

### NFR-04 Responsive UI
- **NFR-04/AC-01 (M)** Given widths of 360, 768 and 1280 px, When I open the catalogue, admin forms and detail pages, Then content fits without horizontal scrolling and the grid adapts (1–2 / 3 / 4 columns).
- **NFR-04/AC-02 (B)** Given a touch device, Then tap targets are at least 44 × 44 px.

### US-11 Book detail
- **US-11/AC-01 (M)** Given I am on catalogue page N, When I click a book, Then its detail page shows cover, title, author, category, price, description and stock.
- **US-11/AC-02 (M)** Given I opened a detail page from page N (with any search/filter), When I click Back to list, Then I return to page N with the same search and filter.
- **US-11/AC-03 (E)** Given a book ID that does not exist, is hidden or is not a number, When I open `/books/<id>`, Then a friendly "Sorry, this book is not available" page with a link to the catalogue is shown (HTTP 404, no stack trace).
- **US-11/AC-04 (B)** Given I opened the detail page directly (no previous list), When I click Back to list, Then I go to catalogue page 1.

### US-12 Search
- **US-12/AC-01 (M)** Given books exist, When I search "harry", Then books whose title **or** author contains "harry" (case-insensitive, partial) are listed, newest first, 12 per page.
- **US-12/AC-02 (E)** Given no book matches, When I search, Then I see "No books match your search" and a link to clear filters.
- **US-12/AC-03 (B)** Given an empty or whitespace-only keyword, Then all visible books are listed; given a keyword of 100 characters, Then the search still works; special characters (`%`, `'`) are treated as text.

### US-13 Filter and pagination
- **US-13/AC-01 (M)** Given I choose category "Novel" and price 50,000–150,000 VND, When I apply, Then only visible books in that category with price within the range (inclusive) are shown.
- **US-13/AC-02 (M)** Given a search and filters return more than 12 books, When I go to page 2, Then search and filters are kept in the URL and on page 2.
- **US-13/AC-03 (E)** Given min price > max price, When I apply, Then I see "Minimum price must not exceed maximum price" and the filter is not applied.
- **US-13/AC-04 (B)** Given a book priced exactly at the min or max bound, Then it is included.

### NFR-05 Performance
- **NFR-05/AC-01 (M)** Given ≥ 30 sample books on the hosted site (warm), When the catalogue page is loaded, Then it finishes in < 2 s, measured with browser DevTools on 3 runs (median recorded).
- **NFR-05/AC-02 (B)** Given page 3 with search and filter applied, Then it also loads in < 2 s.

### US-24 Store Staff role (CR-06, pending)
Customer ACs from [CR-06 §3] plus team additions (to be confirmed at CCB):
- **US-24/AC-01 (M)** Given a Staff account, When it adds a valid book, Then the book is saved. [CR AC1]
- **US-24/AC-02 (E)** Given a Staff account, When it tries to delete a book (UI or direct request), Then no delete button is shown and the server answers 403. [CR AC2]
- **US-24/AC-03 (E)** Given a Staff account, When it opens the account-management page, Then access is denied (403). [CR AC3]
- **US-24/AC-04 (M)** Given an administrator changes an account from Customer to Staff, When that user logs in again, Then they have exactly the Staff permissions. [CR AC4]
- **US-24/AC-05 (M)** Given a Staff account, When it adds/edits categories and authors, Then the changes are saved (whether Staff may *remove* categories/authors: TBD – question to Sponsor).

### US-25 Last-updated audit (CR-06, pending)
- **US-25/AC-01 (M)** Given a Staff member edits a book, When the book's admin page is opened, Then it shows "Last updated by <name> at <dd/mm/yyyy HH:mm>". [CR AC5]
- **US-25/AC-02 (B)** Given a book created by seed data and never edited, Then it shows "Last updated by System at <seed time>".
- **US-25/AC-03 (E)** Given the updating user is later renamed or locked, Then the audit still shows the name stored at update time.
