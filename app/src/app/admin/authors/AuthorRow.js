'use client';
import { useActionState, useState, useTransition } from 'react';
import { CATALOG_LIMITS, validateAuthor } from '@lib/catalog-validation';
import { updateAuthorAction, removeAuthorAction } from './actions';

export default function AuthorRow({ author }) {
  const [state, formAction, saving] = useActionState(updateAuthorAction, {});
  const [clientErrors, setClientErrors] = useState({});
  const [removeError, setRemoveError] = useState(null);
  const [removing, startRemove] = useTransition();
  const errors = { ...state.errors, ...clientErrors };
  const formId = `author-form-${author.id}`;

  function onSubmit(e) {
    const found = validateAuthor(Object.fromEntries(new FormData(e.currentTarget)));
    setClientErrors(found);
    if (Object.keys(found).length) e.preventDefault();
  }

  function onRemove() {
    if (!window.confirm(`Remove author “${author.name}”?`)) return;
    const fd = new FormData();
    fd.set('id', author.id);
    startRemove(async () => {
      const result = await removeAuthorAction(fd);
      setRemoveError(result?.error || null);
    });
  }

  return (
    <tr>
      <td data-label="Author">
        <form id={formId} action={formAction} onSubmit={onSubmit} noValidate className="stack-form">
          <input type="hidden" name="id" value={author.id} />
          <label htmlFor={`${formId}-name`} className="sr-only">Name</label>
          <input id={`${formId}-name`} name="name" required maxLength={CATALOG_LIMITS.authorName}
            defaultValue={state.values?.name ?? author.name} aria-invalid={!!errors.name} />
          {errors.name && <p className="error" role="alert">{errors.name}</p>}
          <label htmlFor={`${formId}-bio`} className="sr-only">Bio</label>
          <textarea id={`${formId}-bio`} name="bio" rows={2} maxLength={CATALOG_LIMITS.authorBio} placeholder="Bio (optional)"
            defaultValue={state.values?.bio ?? author.bio ?? ''} aria-invalid={!!errors.bio} />
          {errors.bio && <p className="error" role="alert">{errors.bio}</p>}
          {errors.form && <p className="error" role="alert">{errors.form}</p>}
          {state.message && !errors.name && !errors.bio && <p className="success small" role="status">{state.message}</p>}
        </form>
      </td>
      <td data-label="Books">{author.book_count}</td>
      <td data-label="Action">
        <div className="row-actions">
          <button type="submit" form={formId} className="btn-ghost small" disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
          <button type="button" className="danger" onClick={onRemove} disabled={removing}>{removing ? 'Removing…' : 'Remove'}</button>
        </div>
        {removeError && <p className="error" role="alert">{removeError}</p>}
      </td>
    </tr>
  );
}
