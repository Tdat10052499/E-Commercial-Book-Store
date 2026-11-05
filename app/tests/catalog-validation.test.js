// Unit tests for the shared catalogue rules (client and server use the same functions).
const test = require('node:test');
const assert = require('node:assert');
const { validateCategory, validateAuthor, inUseMessage, resolvePage, formatPrice } = require('../lib/catalog-validation');

test('US-08/AC-05 category name of 1 or 50 characters accepted', () => {
  assert.deepStrictEqual(validateCategory({ name: 'A' }), {});
  assert.deepStrictEqual(validateCategory({ name: 'x'.repeat(50) }), {});
});

test('US-08/AC-05 category name of 0 (or only spaces) or 51 characters rejected', () => {
  assert.strictEqual(validateCategory({ name: '' }).name, 'Category name is required');
  assert.strictEqual(validateCategory({ name: '   ' }).name, 'Category name is required');
  assert.strictEqual(validateCategory({ name: 'x'.repeat(51) }).name, 'Category name must be at most 50 characters');
});

test('US-09/AC-04 author name of 100 characters accepted, 101 rejected', () => {
  assert.deepStrictEqual(validateAuthor({ name: 'x'.repeat(100) }), {});
  assert.strictEqual(validateAuthor({ name: 'x'.repeat(101) }).name, 'Author name must be at most 100 characters');
  assert.strictEqual(validateAuthor({ name: '' }).name, 'Author name is required');
});

test('US-09/AC-01 bio is optional, at most 1000 characters', () => {
  assert.deepStrictEqual(validateAuthor({ name: 'Tô Hoài' }), {});
  assert.ok(validateAuthor({ name: 'Tô Hoài', bio: 'x'.repeat(1001) }).bio);
});

test('US-08/AC-04, US-09/AC-03 in-use message wording', () => {
  assert.strictEqual(inUseMessage('Category', 3), 'Category is in use by 3 books');
  assert.strictEqual(inUseMessage('Author', 1), 'Author is in use by 1 book');
});

test('US-10/AC-02 12 books = 1 page; 25 books = 3 pages, page 3 starts at offset 24', () => {
  assert.deepStrictEqual(resolvePage('1', 12), { page: 1, lastPage: 1, offset: 0 });
  assert.deepStrictEqual(resolvePage('3', 25), { page: 3, lastPage: 3, offset: 24 });
});

test('US-10/AC-03 page 0, negative, non-numeric → page 1; too large → last page', () => {
  for (const raw of ['0', '-1', 'abc', '1.5', '', undefined, '99999999999999999999']) {
    assert.strictEqual(resolvePage(raw, 30).page, raw === "99999999999999999999" ? 3 : 1, `raw=${raw}`);
  }
  assert.strictEqual(resolvePage('99', 30).page, 3);
  assert.strictEqual(resolvePage('5', 0).page, 1);
});

test('prices are shown in VND', () => {
  assert.match(formatPrice('129000'), /129\.000\s₫/);
});
