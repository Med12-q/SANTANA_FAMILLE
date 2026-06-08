'use client'
  import { useState, lazy, Suspense } from 'react'
  import { MessageSquare, X } from 'lucide-react'
  import { cn } from '@/lib/utils'
  import { motion, AnimatePresence } from 'framer-motion'

  const SantanaChat = lazy(() =>
    import('./santana-chat').then((m) => ({ default: m.SantanaChat }))
  )

  function ChatFallback({ className }: { className?: string }) {
    return (
      <div className={cn('flex flex-1 items-center justify-center', className)}>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: `${i * 120}ms` }} />
          ))}
        </div>
      </div>
    )
  }

  export function FloatingChat() {
    const [open, setOpen] = useState(false)
    return (
      <>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => setOpen((o) => !o)} aria-label="Ouvrir SANTANA AI"
          className={cn('fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-[#060609] text-primary shadow-lg transition-all hover:bg-primary/10')}>
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <MessageSquare className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }} transition={{ duration: 0.2 }}
              className="fixed bottom-20 right-5 z-50 flex h-[min(540px,70vh)] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#060609]/95 backdrop-blur-2xl shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  <span className="text-xs font-bold tracking-widest text-foreground">SANTANA <span className="text-primary">AI</span></span>
                </div>
                <span className="text-[10px] text-muted-foreground">En ligne 24h/24</span>
              </div>
              <Suspense fallback={<ChatFallback className="flex-1 min-h-0" />}>
                <SantanaChat className="flex-1 min-h-0" />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )
  }
  