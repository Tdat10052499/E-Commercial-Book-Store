// Catalogue rules shared by client components and server code, so both sides apply the same checks (NFR-01/AC-02).
const CATALOG_LIMITS = { categoryName: 50, authorName: 100, authorBio: 1000 };
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

const priceFormat = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0, maximumFractionDigits: 2 });
const formatPrice = (price) => priceFormat.format(Number(price));

module.exports = { CATALOG_LIMITS, PAGE_SIZE, validateCategory, validateAuthor, inUseMessage, resolvePage, formatPrice };
