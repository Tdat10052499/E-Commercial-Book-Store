// Catalogue rules shared by client components and server code, so both sides apply the same checks (NFR-01/AC-02).
const CATALOG_LIMITS = { categoryName: 50, authorName: 100, authorBio: 1000, bookTitle: 200, bookDescription: 5000, maxPrice: 9999999999.99, maxStock: 1000000 };
// US-05/AC-04: JPG or PNG, at most 2 MB (2 MB accepted, 2 MB + 1 byte rejected).
const COVER = { maxBytes: 2 * 1024 * 1024, types: ['image/jpeg', 'image/png'] };
const PAGE_SIZE = 12; // US-10/AC-01

const clean = (value) => String(value ?? '').trim();

// US-08/AC-05: 1–50 characters after trimming.
function validateCategory({ name }) {
  const errors = {};
  const n = clean(name);
  if (!n) errors.name = 'Category name is required';
  else if (n.length > CATALOG_LIMITS.categoryName) errors.name = `Category name must be at most ${CATALOG_LIMITS.categoryName} characters`;
  return errors;
}

// US-09/AC-01, AC-04: name 1–100 characters, bio optional (≤ 1000).
function validateAuthor({ name, bio }) {
  const errors = {};
  const n = clean(name);
  if (!n) errors.name = 'Author name is required';
  else if (n.length > CATALOG_LIMITS.authorName) errors.name = `Author name must be at most ${CATALOG_LIMITS.authorName} characters`;
  if (clean(bio).length > CATALOG_LIMITS.authorBio) errors.bio = `Bio must be at most ${CATALOG_LIMITS.authorBio} characters`;
  return errors;
}

const toNumberText = (v) => clean(v).replace(',', '.');

// US-05/AC-02…AC-04, US-06/AC-02: book fields. Works on plain values from a form or a FormData entry list.
function validateBook({ title, author_id, category_id, price, description, stock }) {
  const errors = {};
  const t = clean(title);
  if (!t) errors.title = 'Title is required';
  else if (t.length > CATALOG_LIMITS.bookTitle) errors.title = `Title must be at most ${CATALOG_LIMITS.bookTitle} characters`;
  if (!/^\d+$/.test(clean(author_id))) errors.author_id = 'Author is required';
  if (!/^\d+$/.test(clean(category_id))) errors.category_id = 'Category is required';
  const p = toNumberText(price);
  if (!/^\d+(\.\d{1,2})?$/.test(p) || Number(p) <= 0) errors.price = 'Price must be greater than 0';
  else if (Number(p) > CATALOG_LIMITS.maxPrice) errors.price = 'Price is too large';
  const st = clean(stock);
  if (!/^\d+$/.test(st)) errors.stock = 'Stock must be a whole number of 0 or more';
  else if (Number(st) > CATALOG_LIMITS.maxStock) errors.stock = `Stock must be at most ${CATALOG_LIMITS.maxStock}`;
  if (clean(description).length > CATALOG_LIMITS.bookDescription) errors.description = `Description must be at most ${CATALOG_LIMITS.bookDescription} characters`;
  return errors;
}

// Cover check on size and declared type (client and server); the server also checks the file signature.
function validateCover(file) {
  if (!file || !file.size) return null; // optional on edit; no file chosen
  if (!COVER.types.includes(file.type)) return 'Cover must be a JPG or PNG image';
  if (file.size > COVER.maxBytes) return 'Cover must be at most 2 MB';
  return null;
}

const inUseMessage = (what, n) => `${what} is in use by ${n} ${n === 1 ? 'book' : 'books'}`;

// US-10/AC-03: page 0, negative, non-numeric → page 1; beyond the last page → last page.
function resolvePage(raw, totalItems, pageSize = PAGE_SIZE) {
  const lastPage = Math.max(1, Math.ceil(Number(totalItems || 0) / pageSize));
  const text = String(Array.isArray(raw) ? raw[0] : raw ?? '').trim();
  let page = /^\d+$/.test(text) ? Number(text) : 1;
  if (!Number.isSafeInteger(page) || page > lastPage) page = lastPage; // huge numbers count as "too large"
  if (page < 1) page = 1;
  return { page, lastPage, offset: (page - 1) * pageSize };
}

// US-12, US-13: list filters, shared by the /books form and the server (S3-T09 keyword; category and price come in S3-T11).
// US-12/AC-03: the keyword is trimmed and cut to 100 characters, so an over-long keyword still searches instead of failing.
const SEARCH_MAX = 100;
const firstValue = (v) => (Array.isArray(v) ? v[0] : v);
function validateFilters(raw = {}) {
  const q = clean(firstValue(raw.q)).slice(0, SEARCH_MAX);
  return { filters: { q }, error: null };
}

const priceFormat = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0, maximumFractionDigits: 2 });
const formatPrice = (price) => priceFormat.format(Number(price));

module.exports = {
  CATALOG_LIMITS, COVER, PAGE_SIZE, validateCategory, validateAuthor, validateBook, validateCover,
  inUseMessage, resolvePage, formatPrice, SEARCH_MAX, validateFilters,
};
