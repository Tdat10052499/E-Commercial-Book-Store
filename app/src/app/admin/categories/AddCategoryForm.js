'use client';
import { useActionState, useState } from 'react';
import Field from '@/components/Field';
import { CATALOG_LIMITS, validateCategory } from '@lib/catalog-validation';
import { createCategoryAction } from './actions';

export default function AddCategoryForm() {
  const [state, formAction, pending] = useActionState(createCategoryAction, {});
  const [clientErrors, setClientErrors] = useState({});
  const errors = { ...state.errors, ...clientErrors };

  function onSubmit(e) {
    const found = validateCategory(Object.fromEntries(new FormData(e.currentTarget)));
    setClientErrors(found);
    if (Object.keys(found).length) e.preventDefault();
  }

  return (
    <form key={state.key} action={formAction} onSubmit={onSubmit} noValidate className="card form">
      <h2>Add category</h2>
      {state.message && <p className="success" role="status">{state.message}</p>}
      <Field label="Category name" name="name" required maxLength={CATALOG_LIMITS.categoryName}
        defaultValue={state.values?.name} error={errors.name} />
      <button type="submit" disabled={pending}>{pending ? 'Adding…' : 'Add category'}</button>
    </form>
  );
}
