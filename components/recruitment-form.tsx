'use client'
import { useState, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, Loader2, AlertCircle, ExternalLink, ChevronRight, User, FileText, Send } from 'lucide-react'
import { submitCandidature, type CandidateInput } from '@/app/actions/candidatures'

const WA_GROUP = 'https://chat.whatsapp.com/DRVPRL8tyU71T4sndCdVQ3'

const WA_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

type Step = 'email' | 'profile' | 'details'

const EMPTY: CandidateInput = {
  fullName: '', pseudo: '', age: '', country: '', technicalLevel: '', previousClans: '',
  experience: '', yearsActive: '', motivation: '', availability: '', email: '', whatsapp: '', skills: '', website: '',
}

function SuccessScreen() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="mx-auto max-w-lg py-16 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
        className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10">
        <CheckCircle2 className="h-8 w-8 text-primary" />
      </motion.div>
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-3">Candidature enregistrée</p>
      <h2 className="text-2xl font-black text-white mb-3">Candidature soumise !</h2>
      <p className="text-sm text-gray-400 mb-8 leading-relaxed">
        Votre candidature a été transmise avec succès. Nos chefs l&apos;examineront sous peu.
        Préparez-vous — les tests sont exigeants.
      </p>

      {/* WhatsApp CTA — visible only after submission */}
      <div className="rounded-xl border border-[#25D366]/25 bg-[#25D366]/5 p-6 mb-8">
        <div className="flex items-center justify-center gap-2 mb-3 text-[#25D366]">
          {WA_ICON}
          <span className="text-sm font-bold uppercase tracking-wider">Groupe d&apos;évaluation</span>
        </div>
        <p className="text-xs text-gray-400 mb-5 leading-relaxed">
          Rejoignez le groupe WhatsApp officiel pour suivre votre candidature et participer aux tests d&apos;évaluation de la SANTANA FAMILLE.
        </p>
        <a href={WA_GROUP} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[#22c55e] hover:shadow-[0_0_20px_rgba(37,211,102,0.25)]">
          Rejoindre le groupe <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <Link href="/" className="inline-flex items-center gap-2 text-xs font-medium text-primary hover:gap-3 transition-all">
        Retour à l&apos;accueil <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  )
}

export function RecruitmentForm() {
  const [step, setStep] = useState<Step>('email')
  const [form, setForm] = useState<CandidateInput>(EMPTY)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [pending, startTransition] = useTransition()

  const update = (name: keyof CandidateInput, value: string) => setForm(f => ({ ...f, [name]: value }))

  if (done) return <SuccessScreen />

  const STEPS_META = [
    { id: 'email', label: 'Email', icon: Send },
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'details', label: 'Détails', icon: FileText },
  ]
  const stepIdx = STEPS_META.findIndex(s => s.id === step)

  const goToProfile = (e: React.FormEvent) => {
    e.preventDefault()
    const email = form.email?.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Adresse e-mail invalide.'); return }
    setError(''); setStep('profile')
  }

  const goToDetails = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.fullName?.trim() || form.fullName.trim().length < 2) { setError('Nom complet requis.'); return }
    if (!form.pseudo?.trim() || form.pseudo.trim().length < 2) { setError('Pseudo requis.'); return }
    setError(''); setStep('details')
  }

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.motivation?.trim()) { setError('La motivation est requise.'); return }
    setError('')
    startTransition(async () => {
      const res = await submitCandidature(form)
      if (res.ok) { setDone(true); window.scrollTo({ top: 0, behavior: 'smooth' }) }
      else setError(res.error)
    })
  }

  const field = (name: keyof CandidateInput, label: string, opts: { type?: string; required?: boolean; placeholder?: string; textarea?: boolean } = {}) => (
    <div key={name}>
      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
        {label} {opts.required && <span className="text-primary">*</span>}
      </label>
      {opts.textarea ? (
        <textarea required={opts.required} value={form[name]} onChange={e => update(name, e.target.value)}
          placeholder={opts.placeholder} rows={3}
          className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition focus:border-primary/40 focus:ring-1 focus:ring-primary/15 resize-none" />
      ) : (
        <input type={opts.type || 'text'} required={opts.required} value={form[name]}
          onChange={e => update(name, e.target.value)} placeholder={opts.placeholder}
          className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition focus:border-primary/40 focus:ring-1 focus:ring-primary/15" />
      )}
    </div>
  )

  return (
    <div className="mx-auto max-w-2xl">
      {/* Stepper */}
      <div className="flex items-center justify-center gap-0 mb-10">
        {STEPS_META.map((s, i) => {
          const done = i < stepIdx
          const active = i === stepIdx
          const Icon = s.icon
          return (
            <div key={s.id} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all ${
                  done ? 'bg-primary border-primary' : active ? 'border-primary/60 bg-primary/10' : 'border-white/10 bg-white/[0.02]'}`}>
                  {done ? <CheckCircle2 className="h-4 w-4 text-white" /> : <Icon className={`h-3.5 w-3.5 ${active ? 'text-primary' : 'text-gray-600'}`} />}
                </div>
                <span className={`text-[9px] uppercase tracking-[0.15em] font-semibold ${active ? 'text-primary' : done ? 'text-white' : 'text-gray-600'}`}>{s.label}</span>
              </div>
              {i < STEPS_META.length - 1 && <div className={`mx-3 mt-[-12px] h-px w-12 transition-colors ${i < stepIdx ? 'bg-primary/40' : 'bg-white/[0.06]'}`} />}
            </div>
          )
        })}
      </div>

      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7">
        <input name="website" type="text" value={form.website} onChange={e => update('website', e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" />

        <AnimatePresence mode="wait">
          {step === 'email' && (
            <motion.form key="email" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }} onSubmit={goToProfile} className="space-y-5">
              <div>
                <h3 className="text-base font-black text-white mb-1">Votre adresse e-mail</h3>
                <p className="text-xs text-gray-500">Saisissez votre e-mail pour démarrer votre candidature.</p>
              </div>
              {field('email', 'Adresse e-mail', { type: 'email', required: true, placeholder: 'vous@exemple.com' })}
              {error && <Error msg={error} />}
              <button type="submit" className="w-full flex items-center justify-center gap-2 rounded-md bg-primary py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-primary/85 transition-all">
                Continuer <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </motion.form>
          )}

          {step === 'profile' && (
            <motion.form key="profile" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }} onSubmit={goToDetails} className="space-y-4">
              <div>
                <h3 className="text-base font-black text-white mb-1">Votre profil</h3>
                <p className="text-xs text-gray-500">Informations de base sur votre identité en jeu.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {field('fullName', 'Nom complet', { required: true, placeholder: 'Votre nom complet' })}
                {field('pseudo', 'Pseudo principal', { required: true, placeholder: 'Votre pseudo' })}
                {field('age', 'Âge', { type: 'number', placeholder: '18' })}
                {field('country', 'Pays', { placeholder: 'Votre pays' })}
                {field('technicalLevel', 'Niveau technique', { placeholder: 'Débutant / Intermédiaire / Expert' })}
                {field('whatsapp', 'WhatsApp', { placeholder: '+33 6 12 34 56 78' })}
              </div>
              {error && <Error msg={error} />}
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setStep('email')}
                  className="flex-1 rounded-md border border-white/[0.08] py-3 text-xs font-medium text-gray-400 hover:text-white transition-colors">
                  Retour
                </button>
                <button type="submit" className="flex-1 flex items-center justify-center gap-2 rounded-md bg-primary py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-primary/85 transition-all">
                  Continuer <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.form>
          )}

          {step === 'details' && (
            <motion.form key="details" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }} onSubmit={submitForm} className="space-y-4">
              <div>
                <h3 className="text-base font-black text-white mb-1">Votre candidature</h3>
                <p className="text-xs text-gray-500">Partagez votre expérience et votre motivation.</p>
              </div>
              {field('previousClans', 'Anciennes familles ou clans', { placeholder: 'Listez vos anciens clans' })}
              {field('yearsActive', "Années d'activité", { placeholder: 'Ex: 3 ans' })}
              {field('availability', 'Disponibilité', { placeholder: 'Ex: Soirs & week-ends' })}
              {field('experience', 'Expérience', { textarea: true, placeholder: 'Décrivez votre expérience de jeu' })}
              {field('motivation', 'Motivation', { textarea: true, required: true, placeholder: 'Pourquoi rejoindre la SANTANA FAMILLE ?' })}
              {field('skills', 'Compétences particulières', { textarea: true, placeholder: 'Vos atouts, talents et spécialités' })}
              {error && <Error msg={error} />}
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setStep('profile')}
                  className="flex-1 rounded-md border border-white/[0.08] py-3 text-xs font-medium text-gray-400 hover:text-white transition-colors">
                  Retour
                </button>
                <button type="submit" disabled={pending}
                  className="flex-1 flex items-center justify-center gap-2 rounded-md bg-primary py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-primary/85 transition-all disabled:opacity-60">
                  {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Soumettre ma candidature'}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function Error({ msg }: { msg: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/8 px-4 py-3">
      <AlertCircle className="h-4 w-4 shrink-0 text-destructive" />
      <p className="text-xs text-destructive">{msg}</p>
    </div>
  )
}
