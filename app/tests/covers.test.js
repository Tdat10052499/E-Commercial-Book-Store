// DEF-F2-01 / DEF-F2-02: the seed covers keep their text inside the frame and use fonts with Vietnamese glyphs.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { AUTHORS, BOOKS } = require('../db/seed-data');
const { coverSvg, TITLE, AUTHOR, TEXT_WIDTH } = require('../db/make-covers');

const lines = (svg, y) => [...svg.matchAll(new RegExp(`<text x="24" y="${y}"[^>]*>(.*?)</text>`, 'g'))]
  .flatMap((m) => [...m[1].matchAll(/<tspan([^>]*)>([^<]*)<\/tspan>/g)].map(([, attrs, text]) => ({ attrs, text })));

test('DEF-F2-02 every title and author line fits the 152 px text area (or is squeezed with textLength)', () => {
  BOOKS.forEach(([key, title, authorKey], i) => {
    const svg = coverSvg(title, AUTHORS[authorKey].name, i);
    const title_ = lines(svg, 70);
    const author = lines(svg, '\\d+').filter((l) => !title_.includes(l)).slice(title_.length);
    for (const l of title_) {
      assert.ok(l.text.length * TITLE.charWidth <= TEXT_WIDTH || l.attrs.includes(`textLength="${TEXT_WIDTH}"`), `${key} title "${l.text}"`);
    }
    for (const l of author) {
      assert.ok(l.text.length * AUTHOR.charWidth <= TEXT_WIDTH || l.attrs.includes(`textLength="${TEXT_WIDTH}"`), `${key} author "${l.text}"`);
    }
  });
});

test('DEF-F2-02 a long author name wraps to two lines: HANS CHRISTIAN / ANDERSEN', () => {
  const svg = coverSvg('Fairy Tales', 'Hans Christian Andersen', 0);
  assert.match(svg, /<tspan x="24" dy="0">HANS CHRISTIAN<\/tspan><tspan x="24" dy="14">ANDERSEN<\/tspan>/);
});

test('DEF-F2-01 covers use Vietnamese-capable fonts (no Georgia) and NFC text; files on disk are up to date', () => {
  BOOKS.forEach(([key, title, authorKey], i) => {
    const svg = coverSvg(title, AUTHORS[authorKey].name, i);
    assert.ok(!svg.includes('Georgia'), key);
    assert.ok(svg.normalize('NFC') === svg, `${key} not NFC`);
    const onDisk = fs.readFileSync(path.join(__dirname, '..', 'public', 'covers', `${key}.svg`), 'utf8');
    assert.strictEqual(onDisk, svg, `${key}.svg is stale – run node db/make-covers.js`);
  });
  assert.match(coverSvg('Dế Mèn phiêu lưu ký', 'Tô Hoài', 0), /Dế Mèn phiêu/);
});
