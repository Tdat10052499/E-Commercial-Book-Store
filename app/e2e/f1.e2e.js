// End-to-end check of F1 ACs plus the browser-only parts of US-07 and US-24 (CR-06) in a real browser.
// Needs the seeded catalogue (npm run db:seed) so /admin/books has rows.
// Usage: BASE_URL=http://localhost:3000 ADMIN_EMAIL=... ADMIN_PASSWORD=... node e2e/f1.e2e.js
const { chromium } = require('playwright');

const BASE = process.env.BASE_URL || 'http://localhost:3000';
const ADMIN = { email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD };
const stamp = Date.now();
const customer = { name: 'E2E Customer', email: `e2e.${stamp}@example.com`, password: 'Reader2026' };
const created = { name: 'Created By Admin', email: `created.${stamp}@example.com`, password: 'Created2026' };

const results = [];
async function check(id, fn) {
  try { await fn(); results.push({ id, ok: true }); }
  catch (err) { results.push({ id, ok: false, msg: err.message.split('\n')[0] }); }
}
function expect(cond, msg) { if (!cond) throw new Error(msg); }

async function fillRegister(page, u) {
  await page.goto(`${BASE}/register`);
  await page.fill('#f-name', u.name);
  await page.fill('#f-email', u.email);
  await page.fill('#f-password', u.password);
  await page.click('button[type=submit]');
}
async function login(page, email, password) {
  await page.goto(`${BASE}/login`);
  await page.fill('#f-email', email);
  await page.fill('#f-password', password);
  await page.click('form.card button[type=submit]');
}
async function logout(page) {
  await page.click('text=Log out');
  await page.waitForURL(/\/login/);
}

(async () => {
  const browser = await chromium.launch();
  const page = await (await browser.newContext()).newPage();

  await check('US-01/AC-04 7-char password rejected (client)', async () => {
    await fillRegister(page, { ...customer, password: 'abc1234' });
    expect(await page.isVisible('text=at least 8 characters'), 'no length error shown');
  });
  await check('US-01/AC-03 invalid email rejected (client)', async () => {
    await fillRegister(page, { ...customer, email: 'not-an-email' });
    expect(await page.isVisible('text=Email format is invalid'), 'no email error shown');
  });
  await check('US-01/AC-01 register valid customer, signed in', async () => {
    await fillRegister(page, customer);
    await page.waitForURL(`${BASE}/`);
    expect(await page.isVisible(`text=Hi, ${customer.name}`), 'not signed in after register');
  });
  await check('US-04/AC-04 customer sees no Admin menu', async () => {
    expect(!(await page.isVisible('header >> text=Admin')), 'Admin link visible to customer');
  });
  await check('US-04/AC-02 customer opening /admin gets HTTP 403', async () => {
    const res = await page.goto(`${BASE}/admin/accounts`);
    expect(res.status() === 403, `status ${res.status()}`);
    expect(await page.isVisible('text=Access denied'), 'no Access denied text');
  });
  await check('US-02/AC-04 logout ends session', async () => {
    await page.goto(`${BASE}/`);
    await logout(page);
    await page.goto(`${BASE}/admin`);
    expect(page.url().includes('/login'), 'protected page reachable after logout');
  });
  await check('US-04/AC-01 anonymous /admin redirects to login', async () => {
    await page.goto(`${BASE}/admin/accounts`);
    expect(page.url().includes('/login?next=%2Fadmin%2Faccounts'), `url ${page.url()}`);
  });
  await check('US-01/AC-02 duplicate email (different case) refused', async () => {
    await fillRegister(page, { ...customer, email: customer.email.toUpperCase() });
    await page.waitForSelector('text=Email is already registered');
  });
  await check('US-02/AC-02 wrong password gives generic error', async () => {
    await login(page, customer.email, 'Wrong12345');
    await page.waitForSelector('text=Invalid email or password');
  });
  await check('US-02/AC-01 + AC-05 login with mixed-case email', async () => {
    await login(page, `  ${customer.email.toUpperCase()} `, customer.password);
    await page.waitForURL(`${BASE}/`);
    expect(await page.isVisible(`text=Hi, ${customer.name}`), 'not signed in');
  });

  // Admin flows in a second context so the customer session stays open (US-03/AC-05).
  const adminPage = await (await browser.newContext()).newPage();
  await check('US-04/AC-03 admin opens dashboard', async () => {
    await login(adminPage, ADMIN.email, ADMIN.password);
    await adminPage.waitForURL(`${BASE}/`);
    await adminPage.goto(`${BASE}/admin`);
    await adminPage.waitForSelector('h1:has-text("Admin dashboard")');
  });
  await check('US-03/AC-01 admin creates account with role', async () => {
    await adminPage.goto(`${BASE}/admin/accounts`);
    await adminPage.fill('#f-name', created.name);
    await adminPage.fill('#f-email', created.email);
    await adminPage.fill('#f-password', created.password);
    await adminPage.selectOption('#f-role', 'customer');
    await adminPage.click('form.card button[type=submit]');
    await adminPage.waitForSelector(`td:has-text("${created.email}")`);
  });
  await check('US-03/AC-04 admin create with existing email refused', async () => {
    await adminPage.fill('#f-name', 'Dup');
    await adminPage.fill('#f-email', created.email);
    await adminPage.fill('#f-password', created.password);
    await adminPage.click('form.card button[type=submit]');
    await adminPage.waitForSelector('text=Email is already registered');
  });
  await check('US-03/AC-02 lock customer; US-03/AC-05 open session ends', async () => {
    const row = adminPage.locator('tr', { hasText: customer.email });
    await row.locator('button:has-text("Lock")').click();
    await row.locator('text=Locked').waitFor();
    await page.goto(`${BASE}/`);
    expect(!(await page.isVisible(`text=Hi, ${customer.name}`)), 'locked user still signed in');
  });
  await check('US-02/AC-03 locked account cannot log in', async () => {
    await login(page, customer.email, customer.password);
    await page.waitForSelector('text=This account is locked');
  });
  await check('US-03/AC-02 unlock restores login', async () => {
    const row = adminPage.locator('tr', { hasText: customer.email });
    await row.locator('button:has-text("Unlock")').click();
    await row.locator('text=Active').waitFor();
    await login(page, customer.email, customer.password);
    await page.waitForURL(`${BASE}/`);
  });
  await check('US-03/AC-03 admin cannot lock own account', async () => {
    const row = adminPage.locator('tr', { hasText: ADMIN.email });
    await row.locator('button:has-text("Lock")').click();
    await adminPage.waitForSelector('text=You cannot lock your own account');
  });
  // ---------- US-07/AC-02: Cancel in the confirm dialog changes nothing ----------
  await check('US-07/AC-02 Cancel in the Delete dialog keeps the book', async () => {
    await adminPage.goto(`${BASE}/admin/books`);
    const first = adminPage.locator('tbody tr').first();
    const title = (await first.locator('td[data-label="Title"]').innerText()).trim();
    await first.locator('button:has-text("Delete")').click();
    await adminPage.locator('dialog.confirm button:has-text("Cancel")').click();
    await adminPage.reload();
    expect(await adminPage.locator('td[data-label="Title"]', { hasText: title }).count() > 0, `"${title}" disappeared after Cancel`);
  });

  // ---------- US-24 (CR-06) Store Staff ----------
  await check('US-24/AC-04 admin changes Customer → Store Staff', async () => {
    await adminPage.goto(`${BASE}/admin/accounts`);
    const row = adminPage.locator('tr', { hasText: created.email });
    await row.locator('select').selectOption('staff');
    await adminPage.locator('dialog.confirm button:has-text("Change role")').click();
    await row.locator('text=Role changed').waitFor();
  });
  const staffPage = await (await browser.newContext()).newPage();
  await check('US-24/AC-04 after the next login the user has the Staff back office', async () => {
    await login(staffPage, created.email, created.password);
    await staffPage.waitForURL(`${BASE}/`);
    await staffPage.goto(`${BASE}/admin`);
    await staffPage.waitForSelector('h1:has-text("Back office")');
  });
  await check('US-24/AC-03 Staff sees no Accounts link', async () => {
    expect(await staffPage.locator('a[href="/admin/accounts"]').count() === 0, 'Accounts link visible to Staff');
  });
  await check('US-24/AC-03 Staff opening /admin/accounts gets HTTP 403', async () => {
    const res = await staffPage.goto(`${BASE}/admin/accounts`);
    expect(res.status() === 403, `status ${res.status()}`);
    expect(await staffPage.isVisible('text=Access denied'), 'no Access denied text');
  });
  await check('US-24/AC-02 Staff sees Edit but no Delete button on the book list', async () => {
    await staffPage.goto(`${BASE}/admin/books`);
    await staffPage.waitForSelector('h1:has-text("Books")');
    expect(await staffPage.locator('tbody a:has-text("Edit")').count() > 0, 'no Edit links (is the catalogue seeded?)');
    expect(await staffPage.locator('button:has-text("Delete")').count() === 0, 'Delete button visible to Staff');
  });
  await check('US-24/AC-01 Staff adds a valid book; it is first in the list', async () => {
    const title = `E2E Staff book ${stamp}`;
    await staffPage.goto(`${BASE}/admin/books/new`);
    await staffPage.fill('#f-title', title);
    await staffPage.selectOption('#f-author_id', { index: 1 });
    await staffPage.selectOption('#f-category_id', { index: 1 });
    await staffPage.fill('#f-price', '0.01');
    await staffPage.fill('#f-stock', '0');
    const jpg = Buffer.alloc(1024); Buffer.from([0xff, 0xd8, 0xff, 0xe0]).copy(jpg);
    await staffPage.setInputFiles('#f-cover', { name: 'cover.jpg', mimeType: 'image/jpeg', buffer: jpg });
    await staffPage.click('form button[type=submit]');
    await staffPage.waitForSelector('text=added');
    await staffPage.goto(`${BASE}/admin/books`);
    const firstTitle = (await staffPage.locator('tbody tr').first().locator('td[data-label="Title"]').innerText()).trim();
    expect(firstTitle === title, `first row is "${firstTitle}"`);
  });

  await check('NFR-04 no horizontal scroll at 360 px (accounts page)', async () => {
    await adminPage.setViewportSize({ width: 360, height: 740 });
    await adminPage.goto(`${BASE}/admin/accounts`);
    const overflow = await adminPage.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(!overflow, 'page wider than viewport');
  });

  await browser.close();
  const failed = results.filter((r) => !r.ok);
  for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.id}${r.msg ? ` – ${r.msg}` : ''}`);
  console.log(`\n${results.length - failed.length}/${results.length} passed`);
  process.exit(failed.length ? 1 : 0);
})();
