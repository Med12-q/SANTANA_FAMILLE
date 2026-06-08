import type { ReactNode } from 'react'
  import dynamic from 'next/dynamic'
  import { Navbar } from '@/components/navbar'
  import { Footer } from '@/components/footer'
  import { CyberBackground } from '@/components/background-fx'

  const FloatingChat = dynamic(
    () => import('@/components/floating-chat').then(m => m.FloatingChat),
    { ssr: false }
  )

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
  