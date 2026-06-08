import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Suspense } from 'react'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: { default: 'SANTANA FAMILLE — Les Démons de la Terreur', template: '%s — SANTANA FAMILLE' },
  description: "Plateforme officielle de recrutement de la SANTANA FAMILLE. L'élite ne se rejoint pas. Elle se mérite.",
  keywords: ['SANTANA FAMILLE', 'recrutement', 'clan', 'élite', 'gaming', 'famille'],
  authors: [{ name: 'SANTANA FAMILLE' }],
  creator: 'SANTANA FAMILLE',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'SANTANA FAMILLE',
    title: 'SANTANA FAMILLE — Les Démons de la Terreur',
    description: "Plateforme officielle de recrutement. L'élite ne se rejoint pas. Elle se mérite.",
    images: [{ url: 'https://files.catbox.moe/sn4lrd.jpg', width: 1200, height: 630, alt: 'SANTANA FAMILLE' }],
  },
  twitter: { card: 'summary_large_image', title: 'SANTANA FAMILLE', description: "L'élite ne se rejoint pas. Elle se mérite.", images: ['https://files.catbox.moe/sn4lrd.jpg'] },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#060609',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`dark ${inter.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <Suspense fallback={null}>{children}</Suspense>
        <Toaster />
      </body>
    </html>
  )
}
