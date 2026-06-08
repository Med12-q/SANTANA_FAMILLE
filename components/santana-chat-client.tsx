'use client'
  import { lazy, Suspense } from 'react'

  const SantanaChat = lazy(() =>
    import('./santana-chat').then((m) => ({ default: m.SantanaChat }))
  )

  function ChatFallback({ className }: { className?: string }) {
    return (
      <div className={`${className ?? ''} flex items-center justify-center`}>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: `${i * 120}ms` }}
            />
          ))}
        </div>
      </div>
    )
  }

  export function SantanaChatClient({ className }: { className?: string }) {
    return (
      <Suspense fallback={<ChatFallback className={className} />}>
        <SantanaChat className={className} />
      </Suspense>
    )
  }
  