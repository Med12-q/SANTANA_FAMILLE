import { isAdminAuthenticated } from '@/lib/admin-auth'
import { redirect } from 'next/navigation'
import { getAllCandidates, getStats, initDb } from '@/lib/db'
import { DashboardClient } from '@/components/admin/dashboard-client'

export default async function DashboardPage() {
  const auth = await isAdminAuthenticated()
  if (!auth) redirect('/administration')
  await initDb()
  const [candidates, stats] = await Promise.all([getAllCandidates(), getStats()])
  return <DashboardClient candidates={candidates} stats={stats} />
}
