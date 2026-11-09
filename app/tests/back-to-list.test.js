// Unit tests for US-11 "Back to list": the detail link carries the list state, and Back returns to it (AC-02)
// or to page 1 when the detail page was opened directly (AC-04). No database needed.
const test = require('node:test');
const assert = require('node:assert');
const { listQueryString, backToListHref, detailHref } = require('../lib/catalog-validation');

// What a card on /books?page=2&q=e&min=50000&max=250000 links to, then where Back goes.
const roundTrip = (params, id = 7) => {
  const href = detailHref(id, listQueryString(params));
  const from = new URL(href, 'http://x').searchParams.get('from') ?? undefined;
  return { href, back: backToListHref(from) };
};

test('US-11/AC-02 Back returns to the same page with the same search and filter (TC-F4-02)', () => {
  const { href, back } = roundTrip({ page: '2', q: 'e', min: '50000', max: '250000' });
  assert.strictEqual(href, '/books/7?from=q%3De%26min%3D50000%26max%3D250000%26page%3D2');
  assert.strictEqual(back, '/books?q=e&min=50000&max=250000&page=2');
  assert.strictEqual(roundTrip({ page: 3, category: '1' }).back, '/books?category=1&page=3');
});

test('US-11/AC-02 the keyword is kept as typed (trimmed), including spaces and symbols', () => {
  assert.strictEqual(roundTrip({ q: '  Jane Austen ' }).back, '/books?q=Jane+Austen');
  const back = roundTrip({ q: "50% off & 'quotes'" }).back;
  assert.strictEqual(new URL(back, 'http://x').searchParams.get('q'), "50% off & 'quotes'");
});

test('US-11/AC-04 opened directly (no list state) → Back goes to page 1 of the catalogue (TC-F4-04)', () => {
  for (const from of [undefined, null, '', '   ', []]) assert.strictEqual(backToListHref(from), '/books');
  assert.strictEqual(roundTrip({}).href, '/books/7', 'no list state → plain detail link');
  assert.strictEqual(roundTrip({ page: '1' }).back, '/books', 'page 1 is the default and is not repeated');
});

test('US-11 Back link only keeps known, valid list parameters and always stays on /books', () => {
  const cases = [
    ['page=abc&min=-5&category=x&max=1e9', '/books'],
    ['next=https://evil.example&q=e', '/books?q=e'],
    ['//evil.example', '/books'],
    ['javascript:alert(1)', '/books'],
    ['page=2&page=5', '/books?page=2'],
    ['?q=e&page=0002', '/books?q=e&page=2'],
    ['x'.repeat(401), '/books'],
  ];
  for (const [from, expected] of cases) assert.strictEqual(backToListHref(from), expected, `from=${from.slice(0, 40)}`);
  for (const from of ['//evil.example', 'javascript:alert(1)', 'next=https://evil.example']) {
    assert.ok(backToListHref(from).startsWith('/books'), 'never leaves the catalogue');
  }
});

test('US-11 / US-12/AC-03 a keyword longer than 100 characters is cut to 100 in the Back link', () => {
  const back = roundTrip({ q: 'a'.repeat(150) }).back;
  assert.strictEqual(new URL(back, 'http://x').searchParams.get('q').length, 100);
});

test('US-11 repeated parameters (arrays from Next.js searchParams) use the first value', () => {
  assert.strictEqual(listQueryString({ q: ['first', 'second'], page: ['3', '4'] }), 'q=first&page=3');
});
