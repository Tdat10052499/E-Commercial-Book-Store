import { requireCatalogEditor } from '@/lib/current-user';
import { listAuthors } from '@lib/catalog';
import AddAuthorForm from './AddAuthorForm';
import AuthorRow from './AuthorRow';

export const metadata = { title: 'Authors – Admin' };

// US-09: add, edit and remove authors.
export default async function AuthorsPage() {
  await requireCatalogEditor('/admin/authors');
  const authors = await listAuthors();
  return (
    <section>
      <h1>Authors</h1>
      <p className="muted">An author can be removed only when no visible book uses them.</p>
      <div className="grid-2">
        <AddAuthorForm />
        <div className="card table-wrap">
          {authors.length === 0 ? <p className="muted">No authors yet.</p> : (
            <table className="table-stack">
              <thead><tr><th>Author</th><th>Visible books</th><th>Action</th></tr></thead>
              <tbody>{authors.map((a) => <AuthorRow key={a.id} author={a} />)}</tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}
