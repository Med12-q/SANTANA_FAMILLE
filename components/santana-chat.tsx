'use client'
import { useChat } from '@ai-sdk/react'
import { useState, useRef, useEffect } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FAQ_SUGGESTIONS } from '@/lib/site-config'

export function SantanaChat({ className }: { className?: string }) {
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({ api: '/api/chat' })
  const scrollRef = useRef<HTMLDivElement>(null)
  const busy = status === 'streaming' || status === 'submitted'

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, status])

  const quickSend = (text: string) => {
    if (busy) return
    const syntheticEvent = { preventDefault: () => {} } as React.FormEvent<HTMLFormElement>
    handleInputChange({ target: { value: text } } as React.ChangeEvent<HTMLInputElement>)
    setTimeout(() => handleSubmit(syntheticEvent), 50)
  }

  return (
    <div className={cn('flex h-full flex-col', className)}>
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 && (
          <div className="space-y-3">
            <div className="rounded-xl border border-primary/20 bg-card/50 p-4 text-xs text-muted-foreground leading-relaxed">
              Je suis <span className="font-bold text-primary">SANTANA AI</span>. Posez-moi vos questions sur la famille, les grades, le règlement ou le recrutement.
            </div>
            <div className="flex flex-wrap gap-2">
              {FAQ_SUGGESTIONS.map(q => (
                <button key={q} onClick={() => quickSend(q)}
                  className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-[11px] text-primary transition-colors hover:bg-primary/15">
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map(m => (
          <div key={m.id} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
            <div className={cn('max-w-[85%] whitespace-pre-wrap rounded-xl px-4 py-2.5 text-xs leading-relaxed',
              m.role === 'user'
                ? 'bg-primary text-primary-foreground'
                : 'border border-white/[0.08] bg-white/[0.03] text-card-foreground')}>
              {m.content}
            </div>
          </div>
        ))}
        {busy && messages[messages.length - 1]?.role === 'user' && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-xs text-muted-foreground">
              <div className="flex gap-1">
                {[0,1,2].map(i => <div key={i} className="h-1 w-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: `${i*120}ms` }} />)}
              </div>
              SANTANA AI réfléchit…
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-white/[0.06] p-3">
        <input value={input} onChange={handleInputChange} placeholder="Écrivez votre message…"
          className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/30" />
        <button type="submit" disabled={busy || !input.trim()}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white transition-opacity disabled:opacity-40" aria-label="Envoyer">
          {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
        </button>
      </form>
    </div>
  )
}
