'use server';
import { redirect } from 'next/navigation';
import { registerUser } from '@lib/users';
import { startSession } from '@/lib/start-session';

// US-01: server-side validation repeats the client rules (NFR-01/AC-02).
export async function registerAction(_prev, formData) {
  const values = { name: formData.get('name'), email: formData.get('email'), password: formData.get('password') };
  const { user, errors } = await registerUser(values);
  if (errors) return { errors, values: { name: values.name, email: values.email } };
  await startSession(user.id);
  redirect('/');
}
