import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { SITE } from '@/lib/site-config'
import { Mail, ShieldCheck, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact — SANTANA FAMILLE',
  description: 'Contactez la SANTANA FAMILLE. Le recrutement se fait exclusivement via la plateforme officielle.',
}

export default function ContactPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="CANAUX OFFICIELS"
        title="Contact"
        subtitle="Le recrutement ne se fait plus par messages privés. Toute demande passe exclusivement par les canaux officiels ci-dessous."
      />
      <div className="mx-auto max-w-4xl px-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="group rounded-xl border border-white/[0.07] bg-white/[0.02] p-6 transition-all hover:border-primary/25 hover:bg-white/[0.04]">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/25 bg-primary/8 group-hover:bg-primary/15 transition-all">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <h3 className="mt-4 text-sm font-bold text-white">E-mail officiel</h3>
            <p className="mt-2 text-xs text-gray-500">Pour toute demande administrative et officielle.</p>
            <a href={`mailto:${SITE.contactEmail}`}
              className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline">
              {SITE.contactEmail}
            </a>
          </div>

          <div className="group rounded-xl border border-white/[0.07] bg-white/[0.02] p-6 transition-all hover:border-primary/25 hover:bg-white/[0.04]">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/25 bg-primary/8 group-hover:bg-primary/15 transition-all">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <h3 className="mt-4 text-sm font-bold text-white">Groupe d&apos;évaluation</h3>
            <p className="mt-2 text-xs text-gray-500">
              Le lien du groupe est partagé exclusivement après soumission de votre candidature officielle.
            </p>
            <p className="mt-3 text-xs text-gray-600 italic">Accessible après inscription.</p>
          </div>

          <div className="sm:col-span-2 relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-white/[0.03] to-transparent p-10 text-center">
            <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
            <div className="relative">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 mx-auto mb-4">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-black text-white">La seule voie officielle</h3>
              <p className="mx-auto mt-3 max-w-md text-sm text-gray-400 leading-relaxed">
                Pour rejoindre la SANTANA FAMILLE, soumettez votre candidature via la plateforme officielle.
                Prouvez que vous méritez votre place parmi les élites.
              </p>
              <Link href="/recrutement"
                className="mt-7 inline-flex items-center gap-2 rounded-md bg-primary px-8 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-primary/85 hover:shadow-[0_0_20px_rgba(220,38,38,0.3)] transition-all">
                POSTULER MAINTENANT <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
