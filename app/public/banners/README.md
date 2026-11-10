# Banner images (home page)

UI polish outside the Release 1.0 backlog. The home page reads these paths from `src/lib/home-content.js`.
Until a file is uploaded the banner shows its colour gradient, so the page never looks broken.

**Rules for every banner**
- JPG (or WebP with the same name and `.webp`, then update `home-content.js`), sRGB, ≤ 300 KB.
- **No text inside the image.** Title, text and button are HTML on top (sharp on every screen, readable by screen readers).
- Keep the left 45 % calm (slightly dark or plain): the text box sits there.
- Use only images you own, made yourself, or with a licence that allows reuse (e.g. Unsplash/Pexels licence, CC0). Write the source in the table below.

| # | File name | Where | Size (px) | Idea | Source / licence |
|---|---|---|---|---|---|
| 1 | `banner-hero-new-arrivals.jpg` | Hero slide 1 | 1920 × 640 | New books on a wooden table, morning light | TBD |
| 2 | `banner-hero-vietnamese-literature.jpg` | Hero slide 2 | 1920 × 640 | Áo dài / lanterns / old Hà Nội street with books | TBD |
| 3 | `banner-hero-staff-picks.jpg` | Hero slide 3 | 1920 × 640 | Bookseller hands holding a stack of books | TBD |
| 4 | `banner-hero-book-fair.jpg` | Hero slide 4 | 1920 × 640 | Outdoor book fair, stalls and readers | TBD |
| 5 | `promo-children-corner.jpg` | Tile 1 | 800 × 450 | Child reading a picture book | TBD |
| 6 | `promo-fantasy-scifi.jpg` | Tile 2 | 800 × 450 | Night sky / map / castle illustration | TBD |
| 7 | `promo-self-help.jpg` | Tile 3 | 800 × 450 | Notebook, coffee, calm desk | TBD |
| 8 | `banner-side-reading-challenge.jpg` | Beside "Staff picks" (replaces the promo video) | 600 × 800 | Person reading by a window, portrait | TBD |
| 9 | `banner-strip-member-benefits.jpg` | Full-width strip near the footer | 1920 × 360 | Long shelf of book spines | TBD |

Optional extras if you want more slides later (add them to `HERO_SLIDES` / `PROMO_TILES`):
`banner-hero-back-to-school.jpg`, `banner-hero-summer-reading.jpg`, `banner-hero-tet-gift-books.jpg`,
`promo-mystery-thriller.jpg`, `promo-business-books.jpg`, `og-share.jpg` (1200 × 630, link preview).
