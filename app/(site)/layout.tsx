import type { ReactNode } from 'react'
  import { Navbar } from '@/components/navbar'
  import { Footer } from '@/components/footer'
  import { CyberBackground } from '@/components/background-fx'
  import { FloatingChat } from '@/components/floating-chat'

  export default function SiteLayout({ children }: { children: ReactNode }) {
    return (
      <div className="relative flex min-h-screen flex-col">
        <CyberBackground />
        <Navbar />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
        <FloatingChat />
      </div>
    )
  }
  