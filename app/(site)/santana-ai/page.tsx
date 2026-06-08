import type { Metadata } from 'next'
  import { PageHeader } from '@/components/page-header'
  import { SantanaChatClient } from '@/components/santana-chat-client'

  export const metadata: Metadata = {
    title: 'Santana AI — Assistant officiel',
    description: "Posez vos questions à Santana AI, l'assistant intelligent de la SANTANA FAMILLE, disponible 24h/24.",
  }

  export default function SantanaAiPage() {
    return (
      <div className="pb-24">
        <PageHeader
          eyebrow="INTELLIGENCE ARTIFICIELLE"
          title="Santana AI"
          subtitle="L'assistant officiel de la famille, disponible 24h/24. Interrogez-le sur le clan, les règles, les grades et le recrutement."
        />
        <div className="mx-auto max-w-3xl px-5">
          <div className="flex h-[min(600px,72vh)] flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm">
            <div className="flex items-center gap-2.5 border-b border-white/[0.06] px-5 py-3.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="text-xs font-bold tracking-widest text-foreground">SANTANA <span className="text-primary">AI</span></span>
              <span className="ml-auto text-[10px] text-muted-foreground">En ligne 24h/24</span>
            </div>
            <SantanaChatClient className="flex-1 min-h-0" />
          </div>
        </div>
      </div>
    )
  }
  