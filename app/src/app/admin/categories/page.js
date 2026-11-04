import { requireCatalogEditor } from '@/lib/current-user';
import { listCategories } from '@lib/catalog';
import AddCategoryForm from './AddCategoryForm';
import CategoryRow from './CategoryRow';

export const metadata = { title: 'Categories – Admin' };

// US-08: add, rename and remove categories.
export default async function CategoriesPage() {
  await requireCatalogEditor('/admin/categories');
  const categories = await listCategories();
  return (
    <section>
      <h1>Categories</h1>
      <p className="muted">A category can be removed only when no visible book uses it.</p>
      <div className="grid-2">
        <AddCategoryForm />
        <div className="card table-wrap">
          {categories.length === 0 ? <p className="muted">No categories yet.</p> : (
            <table className="table-stack">
              <thead><tr><th>Name</th><th>Visible books</th><th>Action</th></tr></thead>
              <tbody>{categories.map((c) => <CategoryRow key={c.id} category={c} />)}</tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}
