import Link from 'next/link';
import { SEARCH_MAX } from '@lib/catalog-validation';

const first = (v) => (Array.isArray(v) ? v[0] : v) ?? '';

// US-12 search box + US-13 category and price range. A plain GET form: works without JavaScript, every value
// stays in the URL (US-13/AC-02), and the server validates it again (US-13/AC-03: min > max is refused there).
export default function FilterBar({ params = {}, filters = {}, categories = [], error = null, active = false }) {
  const value = (key) => String(filters[key] ?? first(params[key]));
  return (
    <form className="filter-bar" action="/books" method="get" role="search" aria-label="Search and filter books">
      <div className="filter-field filter-search">
        <label htmlFor="filter-q">Search</label>
        <input id="filter-q" name="q" type="search" maxLength={SEARCH_MAX} placeholder="Title or author"
          defaultValue={value('q')} />
      </div>
      <div className="filter-field">
        <label htmlFor="filter-category">Category</label>
        <select id="filter-category" name="category" defaultValue={value('category')}>
          <option value="">All categories</option>
          {categories.map((c) => <option key={c.id} value={String(c.id)}>{c.name}</option>)}
        </select>
      </div>
      <fieldset className="filter-field filter-price" aria-describedby={error ? 'filter-error' : undefined}>
        <legend>Price (VND)</legend>
        <div className="filter-price-inputs">
          <label className="sr-only" htmlFor="filter-min">Minimum price</label>
          <input id="filter-min" name="min" type="number" inputMode="numeric" min={0} step={1000} placeholder="Min"
            defaultValue={value('min')} aria-invalid={error ? 'true' : 'false'} />
          <span aria-hidden="true">–</span>
          <label className="sr-only" htmlFor="filter-max">Maximum price</label>
          <input id="filter-max" name="max" type="number" inputMode="numeric" min={0} step={1000} placeholder="Max"
            defaultValue={value('max')} aria-invalid={error ? 'true' : 'false'} />
        </div>
      </fieldset>
      <div className="filter-actions">
        <button type="submit">Apply</button>
        {active && <Link className="btn-ghost" href="/books">Clear filters</Link>}
      </div>
      {error && <p id="filter-error" className="field-error filter-error" role="alert">{error}</p>}
    </form>
  );
}
