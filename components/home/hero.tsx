'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { SITE } from '@/lib/site-config'
import { useEffect, useState } from 'react'

const PHRASES = [
  'Bienvenue dans la famille...',
  'Les Démons de la Terreur...',
  "L'élite vous attend...",
  'Êtes-vous à la hauteur ?',
]

function TypeWriter() {
  const [display, setDisplay] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const phrase = PHRASES[phraseIdx]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && charIdx < phrase.length) {
      timeout = setTimeout(() => setCharIdx(i => i + 1), 60)
    } else if (!deleting && charIdx === phrase.length) {
      timeout = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(i => i - 1), 32)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setPhraseIdx(i => (i + 1) % PHRASES.length)
    }

    return () => clearTimeout(timeout)
  }, [charIdx, deleting, phraseIdx])

  useEffect(() => {
    setDisplay(PHRASES[phraseIdx].slice(0, charIdx))
  }, [charIdx, phraseIdx])

  return (
    <div className="h-5 flex items-center justify-center">
      <span className="font-mono text-xs tracking-widest text-blue-400">
        {display}
        <span className="animate-pulse ml-0.5 text-blue-400">|</span>
      </span>
    </div>
  )
}

const STATS = [
  { value: '50+', label: 'Membres actifs' },
  { value: '5+', label: "Années d'expérience" },
  { value: '6', label: 'Niveaux de grade' },
  { value: '24/7', label: 'Support IA' },
]

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="h-full w-full object-cover"
          style={{ filter: 'brightness(0.22) saturate(0.6)' }}>
          <source src={SITE.heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#060609]/70 via-transparent to-[#060609]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060609]/50 via-transparent to-[#060609]/50" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-5 text-center">
        {/* Status badge */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-primary backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Recrutement ouvert
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
          className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl mb-3">
          SANTANA<span className="text-primary"> FAMILLE</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-primary/60">
          {SITE.nickname}
        </motion.p>

        {/* Typewriter line */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mb-8">
          <TypeWriter />
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.35 }}
          className="mb-10 max-w-md text-sm italic text-gray-500">
          &ldquo;{SITE.slogan}&rdquo;
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/recrutement"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-primary/85 hover:shadow-[0_0_24px_rgba(220,38,38,0.4)]">
            Postuler <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link href="/a-propos"
            className="inline-flex items-center gap-2 rounded-md border border-white/10 px-7 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 transition-all hover:border-white/25 hover:text-white backdrop-blur-sm">
            Découvrir
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-5 border-t border-white/[0.06] pt-10">
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-xl font-black text-white">{s.value}</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-gray-600">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2">
        <ChevronDown className="h-5 w-5 animate-bounce text-white/20" />
      </motion.div>
    </section>
  )
}
