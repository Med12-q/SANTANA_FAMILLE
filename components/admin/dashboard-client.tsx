'use client'
import { useState, useTransition } from 'react'
import { updateStatus, removeCandidate, logoutAdmin } from '@/app/actions/admin'
import type { Candidate } from '@/lib/db'
import { Users, Clock, CheckCircle, XCircle, LogOut, Trash2, Download, RefreshCw } from 'lucide-react'
import { candidatesToCsv } from '@/lib/export'

const STATUS_LABELS: Record<string, string> = { pending: 'En attente', approved: 'Approuvé', rejected: 'Rejeté', testing: 'En test' }
const STATUS_STYLES: Record<string, string> = {
  pending: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
  approved: 'border-green-500/30 bg-green-500/10 text-green-400',
  rejected: 'border-red-500/30 bg-red-500/10 text-red-400',
  testing: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
}

export function DashboardClient({ candidates: init, stats }: { candidates: Candidate[]; stats: { total: number; pending: number; approved: number; rejected: number } }) {
  const [candidates, setCandidates] = useState(init)
  const [selected, setSelected] = useState<Candidate | null>(null)
  const [notes, setNotes] = useState('')
  const [pending, start] = useTransition()

  const handleStatus = (id: string, status: string) => {
    start(async () => {
      await updateStatus(id, status, notes)
      setCandidates(c => c.map(x => x.id === id ? { ...x, status, notes } : x))
      if (selected?.id === id) setSelected(s => s ? { ...s, status, notes } : null)
    })
  }

  const handleDelete = (id: string) => {
    if (!confirm('Supprimer cette candidature ?')) return
    start(async () => {
      await removeCandidate(id)
      setCandidates(c => c.filter(x => x.id !== id))
      if (selected?.id === id) setSelected(null)
    })
  }

  const downloadCsv = () => {
    const blob = new Blob([candidatesToCsv(candidates)], { type: 'text/csv;charset=utf-8;' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `santana-candidatures-${new Date().toISOString().slice(0,10)}.csv`
    a.click()
  }

  const STATS_CARDS = [
    { label: 'Total', value: stats.total, icon: Users, color: 'text-white' },
    { label: 'En attente', value: stats.pending, icon: Clock, color: 'text-amber-400' },
    { label: 'Approuvés', value: stats.approved, icon: CheckCircle, color: 'text-green-400' },
    { label: 'Rejetés', value: stats.rejected, icon: XCircle, color: 'text-red-400' },
  ]

  return (
    <div className="min-h-screen bg-[#060609] text-white">
      <header className="border-b border-white/[0.05] px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-sm font-black tracking-wider">SANTANA <span className="text-primary">FAMILLE</span></h1>
          <p className="text-[10px] text-gray-600 tracking-widest">ADMINISTRATION</p>
        </div>
        <div className="flex gap-2">
          <button onClick={downloadCsv} className="flex items-center gap-1.5 rounded-md border border-white/[0.08] px-3 py-1.5 text-xs text-gray-400 hover:text-white transition-colors">
            <Download className="h-3.5 w-3.5" /> CSV
          </button>
          <button onClick={() => window.location.reload()} className="flex items-center gap-1.5 rounded-md border border-white/[0.08] px-3 py-1.5 text-xs text-gray-400 hover:text-white transition-colors">
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
          <form action={logoutAdmin}>
            <button type="submit" className="flex items-center gap-1.5 rounded-md border border-white/[0.08] px-3 py-1.5 text-xs text-gray-400 hover:text-red-400 transition-colors">
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </header>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {STATS_CARDS.map(s => (
            <div key={s.label} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
              <s.icon className={`h-4 w-4 mb-2 ${s.color}`} />
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-[10px] text-gray-600 uppercase tracking-wider mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 mb-3">Candidatures ({candidates.length})</p>
            {candidates.length === 0 && <p className="text-sm text-gray-600 py-8 text-center">Aucune candidature pour l&apos;instant.</p>}
            {candidates.map(c => (
              <div key={c.id} onClick={() => { setSelected(c); setNotes(c.notes||'') }}
                className={`cursor-pointer rounded-lg border p-4 transition-all hover:bg-white/[0.04] ${selected?.id === c.id ? 'border-primary/40 bg-primary/5' : 'border-white/[0.06] bg-white/[0.02]'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-white">{c.full_name}</p>
                    <p className="text-xs text-gray-500">{c.pseudo} · {c.country||'—'} · {c.email||'—'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${STATUS_STYLES[c.status]||''}`}>
                      {STATUS_LABELS[c.status]||c.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selected && (
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5 h-fit space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-black text-white">{selected.full_name}</h3>
                  <p className="text-xs text-gray-500">{selected.pseudo}</p>
                </div>
                <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${STATUS_STYLES[selected.status]||''}`}>
                  {STATUS_LABELS[selected.status]||selected.status}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                {[['Âge', selected.age],['Pays', selected.country],['Email', selected.email],['WhatsApp', selected.whatsapp],['Niveau', selected.technical_level],['Disponibilité', selected.availability]].filter(([,v])=>v).map(([k,v]) => (
                  <div key={k} className="flex gap-2"><span className="w-20 shrink-0 text-gray-600">{k}</span><span className="text-gray-300">{v}</span></div>
                ))}
              </div>

              {selected.motivation && (
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-gray-600 mb-1">Motivation</p>
                  <p className="text-xs text-gray-400 leading-relaxed">{selected.motivation}</p>
                </div>
              )}

              <div>
                <label className="text-[10px] uppercase tracking-[0.18em] text-gray-600 mb-1 block">Notes internes</label>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2}
                  className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs text-white outline-none focus:border-primary/30" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                {['approved','testing','pending','rejected'].map(s => (
                  <button key={s} onClick={() => handleStatus(selected.id, s)} disabled={pending}
                    className={`rounded-md border px-3 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors disabled:opacity-40 ${STATUS_STYLES[s]||'border-white/[0.08] text-gray-400 hover:text-white'}`}>
                    {STATUS_LABELS[s]||s}
                  </button>
                ))}
              </div>

              <button onClick={() => handleDelete(selected.id)} disabled={pending}
                className="w-full flex items-center justify-center gap-2 rounded-md border border-red-500/20 py-2 text-[10px] text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-40">
                <Trash2 className="h-3.5 w-3.5" /> Supprimer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
