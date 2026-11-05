'use client';
import { useActionState, useState } from 'react';
import Field from '@/components/Field';
import { CATALOG_LIMITS, COVER, validateBook, validateCover } from '@lib/catalog-validation';

// Shared by Add (US-05) and Edit (US-06). The same rules run here and again on the server (NFR-01/AC-02).
export default function BookForm({ action, options, book, submitLabel, pendingLabel }) {
  const [state, formAction, pending] = useActionState(action, {});
  const [clientErrors, setClientErrors] = useState({});
  const errors = { ...state.errors, ...clientErrors };
  const v = state.values || book || {};
  const isEdit = !!book;

  function onSubmit(e) {
    const fd = new FormData(e.currentTarget);
    const found = validateBook(Object.fromEntries(fd));
    const cover = fd.get('cover');
    const coverError = validateCover(cover);
    if (coverError) found.cover = coverError;
    else if (!isEdit && (!cover || !cover.size)) found.cover = 'Cover image is required';
    setClientErrors(found);
    if (Object.keys(found).length) e.preventDefault();
  }

  const select = (name, label, items) => (
    <div className="field">
      <label htmlFor={`f-${name}`}>{label}</label>
      <select id={`f-${name}`} name={name} defaultValue={v[name] ?? ''} aria-invalid={!!errors[name]} required>
        <option value="">– Choose –</option>
        {items.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
      </select>
      {errors[name] && <p className="error" role="alert">{errors[name]}</p>}
    </div>
  );

  return (
    <form key={state.key} action={formAction} onSubmit={onSubmit} noValidate className="card form" encType="multipart/form-data">
      {state.message && <p className="success" role="status">{state.message}</p>}
      {errors.form && <p className="error" role="alert">{errors.form}</p>}
      {isEdit && <input type="hidden" name="id" value={book.id} />}
      <Field label="Title" name="title" required maxLength={CATALOG_LIMITS.bookTitle} defaultValue={v.title} error={errors.title} />
      {select('author_id', 'Author', options.authors)}
      {select('category_id', 'Category', options.categories)}
      <Field label="Price (VND)" name="price" inputMode="decimal" required defaultValue={v.price} error={errors.price} />
      <Field label="Stock" name="stock" inputMode="numeric" required defaultValue={v.stock ?? 0} error={errors.stock} />
      <div className="field">
        <label htmlFor="f-description">Description</label>
        <textarea id="f-description" name="description" rows={4} maxLength={CATALOG_LIMITS.bookDescription}
          defaultValue={v.description ?? ''} aria-invalid={!!errors.description} />
        {errors.description && <p className="error" role="alert">{errors.description}</p>}
      </div>
      <div className="field">
        <label htmlFor="f-cover">Cover image (JPG or PNG, max 2 MB){isEdit ? ' – leave empty to keep the current cover' : ''}</label>
        <input id="f-cover" name="cover" type="file" accept={COVER.types.join(',')} aria-invalid={!!errors.cover} />
        {errors.cover && <p className="error" role="alert">{errors.cover}</p>}
      </div>
      <button type="submit" disabled={pending}>{pending ? pendingLabel : submitLabel}</button>
    </form>
  );
}
