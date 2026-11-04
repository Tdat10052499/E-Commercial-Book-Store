'use client';
import { useActionState, useState } from 'react';
import Field from '@/components/Field';
import { CATALOG_LIMITS, validateAuthor } from '@lib/catalog-validation';
import { createAuthorAction } from './actions';

export default function AddAuthorForm() {
  const [state, formAction, pending] = useActionState(createAuthorAction, {});
  const [clientErrors, setClientErrors] = useState({});
  const errors = { ...state.errors, ...clientErrors };

  function onSubmit(e) {
    const found = validateAuthor(Object.fromEntries(new FormData(e.currentTarget)));
    setClientErrors(found);
    if (Object.keys(found).length) e.preventDefault();
  }

  return (
    <form key={state.key} action={formAction} onSubmit={onSubmit} noValidate className="card form">
      <h2>Add author</h2>
      {state.message && <p className="success" role="status">{state.message}</p>}
      <Field label="Author name" name="name" required maxLength={CATALOG_LIMITS.authorName}
        defaultValue={state.values?.name} error={errors.name} />
      <div className="field">
        <label htmlFor="f-bio">Bio (optional)</label>
        <textarea id="f-bio" name="bio" rows={3} maxLength={CATALOG_LIMITS.authorBio} defaultValue={state.values?.bio}
          aria-invalid={!!errors.bio} />
        {errors.bio && <p className="error" role="alert">{errors.bio}</p>}
      </div>
      <button type="submit" disabled={pending}>{pending ? 'Adding…' : 'Add author'}</button>
    </form>
  );
}
