import { isAdminAuthenticated } from '@/lib/admin-auth'
import { redirect } from 'next/navigation'
import { LoginForm } from '@/components/admin/login-form'

export default async function AdminPage() {
  const auth = await isAdminAuthenticated()
  if (auth) redirect('/administration/dashboard')
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#060609] px-4">
      <LoginForm />
    </div>
  )
}
