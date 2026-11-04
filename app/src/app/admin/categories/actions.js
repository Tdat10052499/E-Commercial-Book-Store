'use server';
import { revalidatePath } from 'next/cache';
import { requireCatalogEditor } from '@/lib/current-user';
import { createCategory, renameCategory, removeCategory } from '@lib/catalog';

const PATH = '/admin/categories';

// Every action re-checks the role on the server (US-04/AC-02), whatever the page showed.
export async function createCategoryAction(_prev, formData) {
  await requireCatalogEditor(PATH);
  const name = formData.get('name');
  const { category, errors } = await createCategory({ name });
  if (errors) return { errors, values: { name } };
  revalidatePath(PATH);
  return { message: `Category “${category.name}” added`, key: Date.now() };
}

export async function renameCategoryAction(_prev, formData) {
  await requireCatalogEditor(PATH);
  const name = formData.get('name');
  const { category, errors } = await renameCategory(formData.get('id'), { name });
  if (errors) return { errors, values: { name } };
  revalidatePath(PATH);
  revalidatePath('/books');
  return { message: `Renamed to “${category.name}”` };
}

export async function removeCategoryAction(formData) {
  await requireCatalogEditor(PATH);
  const result = await removeCategory(formData.get('id'));
  if (result.ok) revalidatePath(PATH);
  return result;
}
