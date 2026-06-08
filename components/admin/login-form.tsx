'use client'
import { useState, useTransition } from 'react'
import { loginAdmin } from '@/app/actions/admin'
import { useRouter } from 'next/navigation'
import { Loader2, Lock } from 'lucide-react'

export function LoginForm() {
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')
  const [pending, start] = useTransition()
  const router = useRouter()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    start(async () => {
      const r = await loginAdmin(pw)
      if (r.ok) router.push('/administration/dashboard')
      else setError(r.error || 'Erreur')
    })
  }

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
          <Lock className="h-5 w-5 text-primary" />
        </div>
        <h1 className="text-xl font-black text-white">Administration</h1>
        <p className="mt-1 text-xs text-gray-600">SANTANA FAMILLE — Accès restreint</p>
      </div>
      <form onSubmit={submit} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-7 space-y-4">
        <div>
          <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">Mot de passe</label>
          <input type="password" value={pw} onChange={e => setPw(e.target.value)} required autoFocus
            className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none transition focus:border-primary/40 focus:ring-1 focus:ring-primary/15" />
        </div>
        {error && <p className="text-xs text-destructive">{error}</p>}
        <button type="submit" disabled={pending || !pw}
          className="w-full flex items-center justify-center gap-2 rounded-md bg-primary py-3 text-xs font-bold uppercase tracking-wider text-white disabled:opacity-50">
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Accéder'}
        </button>
      </form>
    </div>
  )
}
