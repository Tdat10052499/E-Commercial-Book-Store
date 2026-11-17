// Vercel build step: loads the extra demo books only when SEED_DEMO_BOOKS=1 is set in the project's environment.
// Without it the build behaves exactly as before (30 seed books only).
if (process.env.SEED_DEMO_BOOKS === '1') {
  const { pool } = require('../lib/db');
  require('./seed-demo').seedDemo()
    .then(({ added, total }) => { console.log(`Demo seed done: ${added} of ${total} demo books added`); return pool.end(); })
    .catch((err) => { console.error(err); process.exit(1); });
} else {
  console.log('Demo seed skipped (set SEED_DEMO_BOOKS=1 to load the extra demo books)');
}
