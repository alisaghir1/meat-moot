import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import AdminLayout from '@/app/components/admin/AdminLayout'

export const dynamic = 'force-dynamic'

export default async function AdminRootLayout({ children }) {
  // Middleware already guards /admin/*, but server components must re-check
  // (defense in depth — never trust an upstream redirect alone).
  const session = await getSession()
  if (!session) redirect('/admin/login')

  return <AdminLayout userEmail={session.email}>{children}</AdminLayout>
}
