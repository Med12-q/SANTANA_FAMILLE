'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Shield, Eye, Users, Zap, Target, Flame, ArrowRight, CheckCircle2 } from 'lucide-react'

const VALUES = [
  { icon: Shield, title: 'Discipline', desc: "La discipline forge les grands. Chaque membre s'engage pleinement envers les règles et la hiérarchie." },
  { icon: Eye, title: 'Discrétion', desc: "Ce qui se passe dans la famille reste dans la famille. La confidentialité est absolue et non négociable." },
  { icon: Users, title: 'Cohésion', desc: "Nous avançons ensemble. La solidarité entre membres est notre plus grande force collective." },
  { icon: Target, title: 'Excellence', desc: "L'élite ne se rejoint pas, elle se mérite. Chaque membre vise l'excellence en permanence." },
  { icon: Zap, title: 'Loyauté', desc: "La loyauté envers la famille passe avant tout. Aucune trahison ne sera jamais tolérée." },
  { icon: Flame, title: 'Détermination', desc: "La persévérance distingue les vrais membres des autres. Nous n'abandonnons jamais." },
]

const STEPS = [
  { num: '01', title: 'Postulez en ligne', desc: "Remplissez le formulaire officiel sur la page Recrutement. Soyez honnête et précis dans vos réponses." },
  { num: '02', title: 'Candidature examinée', desc: "Votre candidature est analysée par nos chefs. Chaque profil est étudié avec soin et sérieux." },
  { num: '03', title: "Tests d'évaluation", desc: "Si votre profil convient, vous rejoignez le groupe de test pour démontrer votre niveau réel." },
  { num: '04', title: 'Intégration', desc: "Vous convainquez un chef ? Il vous transmettra le lien du QG principal. Bienvenue dans la famille." },
]

export function ValuesSection() {
  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="mb-14 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary mb-2">Nos valeurs</p>
          <h2 className="text-2xl font-black text-white sm:text-3xl">Ce qui nous définit</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-gray-500">La SANTANA FAMILLE repose sur des valeurs fondamentales qui guident chaque membre au quotidien.</p>
        </motion.div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }} viewport={{ once: true }}
              className="group rounded-xl border border-white/5 bg-white/[0.02] p-5 transition-all duration-300 hover:border-primary/20 hover:bg-white/[0.04]">
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                <v.icon className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-white">{v.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-500">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ProcessSection() {
  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="mb-14 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary mb-2">Processus</p>
          <h2 className="text-2xl font-black text-white sm:text-3xl">Comment rejoindre la famille</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-gray-500">Quatre étapes claires pour intégrer la SANTANA FAMILLE. Chaque étape compte.</p>
        </motion.div>
        <div className="grid gap-4 sm:grid-cols-2">
          {STEPS.map((step, i) => (
            <motion.div key={step.num} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }} viewport={{ once: true }}
              className="flex gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <span className="text-3xl font-black leading-none text-primary/15 select-none">{step.num}</span>
              <div>
                <h3 className="text-sm font-bold text-white">{step.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-gray-500">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function RecruitCta() {
  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl border border-primary/20 p-12 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
          <div className="relative">
            <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
              <CheckCircle2 className="h-5 w-5 text-primary" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Recrutement ouvert</p>
            <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">Prêt à rejoindre l&apos;élite ?</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-gray-400">
              Remplissez le formulaire officiel. Chaque candidature est examinée avec soin par nos chefs.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/recrutement"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-primary/85 hover:shadow-[0_0_24px_rgba(220,38,38,0.35)]">
                Postuler maintenant <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link href="/hierarchie"
                className="inline-flex items-center gap-2 rounded-md border border-white/10 px-7 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 transition-all hover:border-white/25 hover:text-white">
                Voir les grades
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
