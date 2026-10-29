'use server';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/current-user';
import { createAccount, setUserStatus } from '@lib/users';

// Every action re-checks the role on the server (US-04/AC-02).
export async function createAccountAction(_prev, formData) {
  await requireAdmin('/admin/accounts');
  const values = Object.fromEntries(['name', 'email', 'password', 'role'].map((k) => [k, formData.get(k)]));
  const { user, errors } = await createAccount(values);
  if (errors) return { errors, values: { name: values.name, email: values.email, role: values.role } };
  revalidatePath('/admin/accounts');
  return { message: `Account ${user.email} created`, key: Date.now() };
}

export async function setStatusAction(formData) {
  const admin = await requireAdmin('/admin/accounts');
  const result = await setUserStatus(admin.id, formData.get('id'), formData.get('status'));
  revalidatePath('/admin/accounts');
  return result;
}
