'use server'
import { signAdminToken, setAdminCookie, clearAdminCookie } from '@/lib/admin-auth'
import { updateCandidateStatus, deleteCandidate } from '@/lib/db'
import { redirect } from 'next/navigation'

export async function loginAdmin(password: string): Promise<{ ok: boolean; error?: string }> {
  if (password !== process.env.ADMIN_PASSWORD) return { ok: false, error: 'Mot de passe incorrect.' }
  const token = await signAdminToken()
  await setAdminCookie(token)
  return { ok: true }
}

export async function logoutAdmin() {
  await clearAdminCookie()
  redirect('/administration')
}

export async function updateStatus(id: string, status: string, notes?: string) {
  await updateCandidateStatus(id, status, notes)
}

export async function removeCandidate(id: string) {
  await deleteCandidate(id)
}
