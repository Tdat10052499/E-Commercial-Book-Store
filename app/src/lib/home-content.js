// Home page content (UI polish, outside the Release 1.0 backlog). Edit this file to change banners and rails
// without touching the page code. Banner image files live in public/banners/ – see public/banners/README.md
// for the list of files, sizes and the safe area. A missing image is not an error: the gradient behind it shows.

export const ANNOUNCEMENT = 'Welcome to Page Turners · new titles added every week';

// Hero carousel: 1920 × 640 px (3 : 1). Keep the artwork free of text – the title and button are HTML on top,
// so they stay sharp, translatable and readable by screen readers.
export const HERO_SLIDES = [
  {
    image: '/banners/banner-hero-new-arrivals.jpg',
    gradient: 'linear-gradient(120deg, #1f3b4d 0%, #2f5d62 55%, #9bb7a4 100%)',
    eyebrow: 'Just in',
    title: 'New arrivals on the shelf',
    text: 'Fresh titles from our stores, every week.',
    cta: 'Browse new books', href: '/books',
  },
  {
    image: '/banners/banner-hero-vietnamese-literature.jpg',
    gradient: 'linear-gradient(120deg, #7a1f1f 0%, #c8553d 60%, #f2c14e 100%)',
    eyebrow: 'Văn học Việt Nam',
    title: 'Classics of Vietnamese literature',
    text: 'From Truyện Kiều to Nam Cao – the stories every reader should know.',
    cta: 'Explore the collection', href: '/#rail-vietnamese-literature',
  },
  {
    image: '/banners/banner-hero-staff-picks.jpg',
    gradient: 'linear-gradient(120deg, #2d2a26 0%, #6b4e71 60%, #d9cfc1 100%)',
    eyebrow: 'Staff picks',
    title: 'Books our booksellers love',
    text: 'Hand-picked reads from the team at Ms. Le’s bookshops.',
    cta: 'See the picks', href: '/#rail-staff-picks',
  },
  {
    image: '/banners/banner-hero-book-fair.jpg',
    gradient: 'linear-gradient(120deg, #3b2f1e 0%, #a0522d 55%, #e8c39e 100%)',
    eyebrow: 'Event',
    title: 'Page Turners Book Fair',
    text: 'Meet authors, swap books and find your next favourite.',
    cta: 'Browse books', href: '/books',
  },
];

// Three tiles under the hero: 800 × 450 px (16 : 9).
export const PROMO_TILES = [
  { image: '/banners/promo-children-corner.jpg', gradient: 'linear-gradient(135deg, #f2c14e, #f08a4b)', title: 'Children’s corner', text: 'Picture books and first novels', href: '/#rail-children' },
  { image: '/banners/promo-fantasy-scifi.jpg', gradient: 'linear-gradient(135deg, #1b1f3b, #4b3f8f)', title: 'Fantasy & Sci-Fi', text: 'Other worlds, one page away', href: '/#rail-fantasy-sci-fi' },
  { image: '/banners/promo-self-help.jpg', gradient: 'linear-gradient(135deg, #1f7a4d, #9bb7a4)', title: 'Better habits', text: 'Self-help and business reads', href: '/#rail-self-help' },
];

// Portrait banner beside the "Staff picks" rail (replaces the promo video): 600 × 800 px (3 : 4).
export const SIDE_BANNER = {
  image: '/banners/banner-side-reading-challenge.jpg',
  gradient: 'linear-gradient(160deg, #c8553d, #6b4e71)',
  eyebrow: 'Reading challenge',
  title: '12 books in 12 months',
  text: 'Pick one book a month from our staff picks.',
  cta: 'Start reading', href: '/books',
};

// Full-width strip near the bottom: 1920 × 360 px.
export const STRIP_BANNER = {
  image: '/banners/banner-strip-member-benefits.jpg',
  gradient: 'linear-gradient(90deg, #111111, #3a3a3a)',
  title: 'Become a Page Turners member',
  text: 'Create a free account to keep track of the books you love.',
  cta: 'Create an account', href: '/register',
};

// Hand-picked books for the "Staff picks" rail (seed keys from db/seed-data.js and db/demo-books.json).
export const STAFF_PICKS = ['demo-01', 'seed-08', 'demo-15', 'seed-26', 'demo-30', 'seed-14', 'demo-44', 'seed-01', 'demo-11', 'demo-20'];

// Category rails shown on the home page, in this order. Categories with no visible books are skipped.
export const CATEGORY_RAILS = ['Novel', 'Vietnamese Literature', 'Fantasy & Sci-Fi', 'Children', 'Mystery & Thriller', 'Self-help'];

// Four customer benefits under the hero. Each one is something the site really does today
// (no cart, payment or delivery in Release 1.0 [03 §2.2], so none of those are promised).
export const SERVICES = [
  { icon: 'book', title: 'Hand-picked by booksellers', text: 'Every title is chosen by our store staff, not by an algorithm.' },
  { icon: 'eye', title: 'Know before you choose', text: 'Cover, description, price and stock on every book page.' },
  { icon: 'heart', title: 'Save your favourites', text: 'Tap the heart on any book to keep a shortlist on this device.' },
  { icon: 'shield', title: 'Your account, protected', text: 'Passwords are stored hashed and never shown to anyone, staff included.' },
];

export const slug = (name) => String(name).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
