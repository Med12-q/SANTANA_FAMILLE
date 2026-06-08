import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { Shield, AlertTriangle, ArrowRight } from 'lucide-react'
import { RULES } from '@/lib/site-config'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Règlement — SANTANA FAMILLE',
  description: 'Règlement officiel de la SANTANA FAMILLE. Chaque membre doit le connaître et le respecter.',
}

export default function ReglementPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="CODE D'HONNEUR"
        title="Règlement officiel"
        subtitle="Ces règles fondamentales régissent la vie de la SANTANA FAMILLE. Leur respect est non négociable."
      />
      <div className="mx-auto max-w-4xl px-5 space-y-3">
        {RULES.map((rule, i) => (
          <div key={rule.title} className="flex gap-5 rounded-xl border border-white/[0.07] bg-white/[0.02] p-6 transition-all hover:border-primary/20 hover:bg-white/[0.04]">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/8">
              <Shield className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="flex gap-4">
              <span className="text-2xl font-black leading-none text-primary/10 select-none pt-0.5">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="text-sm font-bold text-white">{rule.title}</h3>
                <p className="mt-1.5 text-xs text-gray-500 leading-relaxed">{rule.text}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-8 flex gap-4 rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
          <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-amber-400">Avertissement</p>
            <p className="mt-1 text-xs text-gray-500 leading-relaxed">
              Tout manquement grave au règlement est passible d&apos;exclusion définitive. La décision finale appartient toujours au Chef Suprême.
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/recrutement" className="inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-primary/85 transition-all">
            Postuler <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
