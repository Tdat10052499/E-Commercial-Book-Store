import { requireAdmin } from '@/lib/current-user';
import { listUsers } from '@lib/users';
import CreateAccountForm from './CreateAccountForm';
import StatusButton from './StatusButton';
import RoleSelect from './RoleSelect';
import { ROLE_LABEL } from '@lib/validation';

export const metadata = { title: 'Accounts – Admin' };

export default async function AccountsPage() {
  const admin = await requireAdmin('/admin/accounts');
  const users = await listUsers();
  return (
    <section>
      <h1>Accounts</h1>
      <div className="grid-2">
        <CreateAccountForm />
        <div className="card table-wrap">
          <table className="table-stack">
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td data-label="Name">{u.name}</td>
                  <td data-label="Email">{u.email}</td>
                  <td data-label="Role">{u.id === admin.id ? ROLE_LABEL[u.role] : <RoleSelect id={u.id} role={u.role} name={u.name} />}</td>
                  <td data-label="Status"><span className={`badge ${u.status}`}>{u.status === 'active' ? 'Active' : 'Locked'}</span></td>
                  <td data-label="Action">
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
