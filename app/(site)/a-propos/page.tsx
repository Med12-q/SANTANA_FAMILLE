import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { SITE } from '@/lib/site-config'
import { Crown, Target, Flame, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'À propos — SANTANA FAMILLE',
  description: "Histoire et vision de la SANTANA FAMILLE — Les Démons de la Terreur.",
}

export default function AProposPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="NOTRE HISTOIRE"
        title="À propos"
        subtitle="La SANTANA FAMILLE — plus qu'un clan, une vision, une famille, une légende."
      />
      <div className="mx-auto max-w-5xl px-5 space-y-6">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-xl border border-white/[0.07] bg-white/[0.02] p-7">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/25 bg-primary/8 mb-4">
              <Crown className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-lg font-black text-white mb-3">Notre fondation</h2>
            <div className="space-y-3 text-sm text-gray-400 leading-relaxed">
              <p>
                La SANTANA FAMILLE a été fondée par Lord Santana, Purgeur de la deuxième génération. Sa bravoure
                exceptionnelle et son parcours remarquable l&apos;ont conduit à créer une organisation unique où
                la discipline, la loyauté et l&apos;excellence ne sont pas de simples valeurs, mais des exigences absolues.
              </p>
              <p>
                En quelques années, la famille est devenue une organisation d&apos;élite reconnue et respectée.
                Chaque membre a été sélectionné non pour ses aptitudes seules, mais pour son caractère, sa loyauté
                et sa capacité à s&apos;intégrer dans un collectif soudé.
              </p>
              <p className="italic text-gray-500 border-l-2 border-primary/30 pl-4">
                &ldquo;{SITE.slogan}&rdquo;
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-white/[0.07]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SITE.logo} alt="SANTANA FAMILLE" className="h-48 w-full object-cover lg:h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-xs font-bold text-white">SANTANA FAMILLE</p>
              <p className="text-[10px] text-gray-400">{SITE.nickname}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Target, title: 'Notre mission', desc: "Forger des individus d'exception à travers l'adversité, la discipline et la cohésion collective." },
            { icon: Flame, title: 'Notre vision', desc: "Devenir la référence absolue : une organisation où l'élite se reconnaît et se dépasse." },
            { icon: ShieldCheck, title: 'Notre engagement', desc: "Protéger, soutenir et élever chaque membre vers son plein potentiel, sans exception." },
          ].map(item => (
            <div key={item.title} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/25 bg-primary/8 mb-4">
                <item.icon className="h-4 w-4 text-primary" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-7">
          <h2 className="text-lg font-black text-white mb-4">Lord Santana — Le fondateur</h2>
          <div className="flex gap-6 items-start">
            <div className="shrink-0 h-20 w-20 overflow-hidden rounded-xl border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={SITE.leaderPhoto} alt="Lord Santana" className="h-full w-full object-cover object-top" />
            </div>
            <div className="space-y-2 text-sm text-gray-400 leading-relaxed">
              <p>Purgeur de la deuxième génération, Lord Santana incarne tout ce que la SANTANA FAMILLE représente : discipline, vision et leadership naturel.</p>
              <p>Sous sa direction, la famille s&apos;est développée avec des valeurs claires et un système hiérarchique solide, permettant à chaque membre de trouver sa place et d&apos;évoluer.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
