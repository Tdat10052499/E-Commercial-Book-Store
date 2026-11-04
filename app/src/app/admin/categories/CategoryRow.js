'use client';
import { useActionState, useState, useTransition } from 'react';
import { CATALOG_LIMITS, validateCategory } from '@lib/catalog-validation';
import { renameCategoryAction, removeCategoryAction } from './actions';

export default function CategoryRow({ category }) {
  const [state, formAction, saving] = useActionState(renameCategoryAction, {});
  const [clientErrors, setClientErrors] = useState({});
  const [removeError, setRemoveError] = useState(null);
  const [removing, startRemove] = useTransition();
  const errors = { ...state.errors, ...clientErrors };
  const inputId = `cat-${category.id}`;

  function onSubmit(e) {
    const found = validateCategory(Object.fromEntries(new FormData(e.currentTarget)));
    setClientErrors(found);
    if (Object.keys(found).length) e.preventDefault();
  }

  function onRemove() {
    if (!window.confirm(`Remove category “${category.name}”?`)) return;
    const fd = new FormData();
    fd.set('id', category.id);
    startRemove(async () => {
      const result = await removeCategoryAction(fd);
      setRemoveError(result?.error || null);
    });
  }

  return (
    <tr>
      <td data-label="Name">
        <form action={formAction} onSubmit={onSubmit} noValidate className="inline-form">
          <input type="hidden" name="id" value={category.id} />
          <label htmlFor={inputId} className="sr-only">Name of {category.name}</label>
          <input id={inputId} name="name" required maxLength={CATALOG_LIMITS.categoryName}
            defaultValue={state.values?.name ?? category.name} aria-invalid={!!errors.name} />
          <button type="submit" className="btn-ghost small" disabled={saving}>{saving ? 'Saving…' : 'Rename'}</button>
        </form>
        {errors.name && <p className="error" role="alert">{errors.name}</p>}
        {errors.form && <p className="error" role="alert">{errors.form}</p>}
        {state.message && !errors.name && <p className="success small" role="status">{state.message}</p>}
      </td>
      <td data-label="Books">{category.book_count}</td>
      <td data-label="Action">
        <button type="button" className="danger" onClick={onRemove} disabled={removing}>{removing ? 'Removing…' : 'Remove'}</button>
        {removeError && <p className="error" role="alert">{removeError}</p>}
      </td>
    </tr>
  );
}
