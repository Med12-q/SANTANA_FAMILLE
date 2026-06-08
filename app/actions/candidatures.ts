'use server'
import { initDb, createCandidate } from '@/lib/db'
import { sendCandidateConfirmationEmail, sendAdminNotificationEmail } from '@/lib/email'
import { rateLimit } from '@/lib/rate-limit'
import { headers } from 'next/headers'

export type CandidateInput = {
  fullName: string
  pseudo: string
  age?: string
  country?: string
  technicalLevel?: string
  previousClans?: string
  experience?: string
  yearsActive?: string
  motivation: string
  availability?: string
  email?: string
  whatsapp?: string
  skills?: string
  website?: string
}

export async function submitCandidature(data: CandidateInput): Promise<{ ok: boolean; error: string }> {
  // Honeypot check
  if (data.website) return { ok: false, error: 'Spam détecté.' }

  const hdrs = await headers()
  const ip = hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const rl = rateLimit(`candidature:${ip}`, 3, 3_600_000)
  if (!rl.ok) return { ok: false, error: 'Trop de tentatives. Réessayez dans 1 heure.' }

  const fullName = data.fullName?.trim()
  const pseudo = data.pseudo?.trim()
  const motivation = data.motivation?.trim()
  const email = data.email?.trim()

  if (!fullName || fullName.length < 2) return { ok: false, error: 'Nom complet invalide.' }
  if (!pseudo || pseudo.length < 2) return { ok: false, error: 'Pseudo invalide.' }
  if (!motivation || motivation.length < 10) return { ok: false, error: 'Motivation trop courte (minimum 10 caractères).' }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'Adresse e-mail invalide.' }

  try {
    await initDb()
    await createCandidate({
      full_name: fullName,
      pseudo,
      age: data.age || '',
      country: data.country || '',
      technical_level: data.technicalLevel || '',
      previous_clans: data.previousClans || '',
      experience: data.experience || '',
      years_active: data.yearsActive || '',
      motivation,
      availability: data.availability || '',
      email: email || '',
      whatsapp: data.whatsapp?.trim() || '',
      skills: data.skills?.trim() || '',
      status: 'pending',
      notes: '',
    })

    // Fire-and-forget emails (don't block on failure)
    await Promise.allSettled([
      email ? sendCandidateConfirmationEmail(email, fullName, pseudo) : Promise.resolve(),
      sendAdminNotificationEmail(fullName, pseudo, email || '—', data.whatsapp || '—', motivation),
    ])

    return { ok: true, error: '' }
  } catch (err) {
    console.error('[submitCandidature]', err)
    return { ok: false, error: 'Une erreur est survenue. Veuillez réessayer.' }
  }
}
