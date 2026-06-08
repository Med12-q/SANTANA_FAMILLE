'use client'
import { motion } from 'framer-motion'
import { Crown, Star, Zap, Shield, User, Users } from 'lucide-react'
import { RANKS } from '@/lib/site-config'
import { cn } from '@/lib/utils'

const ICONS = [Crown, Star, Zap, Shield, User, Users]
const LEVEL_STYLES: Record<number, string> = {
  1: 'border-amber-400/30 bg-amber-400/5',
  2: 'border-red-500/25 bg-red-500/5',
  3: 'border-orange-500/25 bg-orange-500/5',
  4: 'border-primary/20 bg-primary/5',
  5: 'border-blue-500/20 bg-blue-500/5',
  6: 'border-white/10 bg-white/[0.02]',
}
const ICON_STYLES: Record<number, string> = {
  1: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
  2: 'text-red-400 border-red-500/25 bg-red-500/8',
  3: 'text-orange-400 border-orange-500/25 bg-orange-500/8',
  4: 'text-primary border-primary/25 bg-primary/8',
  5: 'text-blue-400 border-blue-500/25 bg-blue-500/8',
  6: 'text-gray-400 border-white/10 bg-white/[0.04]',
}

export function RankCards() {
  return (
    <div className="mx-auto max-w-5xl grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {RANKS.map((rank, i) => {
        const Icon = ICONS[i]
        return (
          <motion.div key={rank.name}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.05 }} viewport={{ once: true }}
            className={cn('rounded-xl border p-5 transition-all hover:scale-[1.01]', LEVEL_STYLES[rank.level])}>
            <div className={cn('mb-4 flex h-10 w-10 items-center justify-center rounded-lg border', ICON_STYLES[rank.level])}>
              <Icon className="h-4.5 w-4.5" />
            </div>
            <div className="mb-3 flex items-start justify-between gap-2">
              <h3 className="text-sm font-bold text-white leading-tight">{rank.name}</h3>
              <span className="shrink-0 rounded-full bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-gray-500">
                Niv. {rank.level}
              </span>
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-600 mb-2">{rank.holder}</p>
            <p className="text-xs text-gray-500 leading-relaxed">{rank.description}</p>
            <div className="mt-4 pt-3 border-t border-white/[0.05]">
              <p className="text-[9px] text-gray-700 leading-relaxed">{rank.access}</p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
