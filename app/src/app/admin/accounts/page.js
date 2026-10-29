import { requireAdmin } from '@/lib/current-user';
import { listUsers } from '@lib/users';
import CreateAccountForm from './CreateAccountForm';
import StatusButton from './StatusButton';

export const metadata = { title: 'Accounts – Admin' };

const ROLE_LABEL = { admin: 'Administrator', customer: 'Customer' };

export default async function AccountsPage() {
  await requireAdmin('/admin/accounts');
  const users = await listUsers();
  return (
    <section>
      <h1>Accounts</h1>
      <div className="grid-2">
        <CreateAccountForm />
        <div className="card table-wrap">
          <table>
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{ROLE_LABEL[u.role] || u.role}</td>
                  <td><span className={`badge ${u.status}`}>{u.status === 'active' ? 'Active' : 'Locked'}</span></td>
                  <td>
                    {u.status === 'active'
                      ? <StatusButton id={u.id} status="locked" label="Lock" />
                      : <StatusButton id={u.id} status="active" label="Unlock" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
