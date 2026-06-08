'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LINKS, SITE } from '@/lib/site-config'

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header className={cn('sticky top-0 z-50 transition-all duration-300',
      scrolled ? 'border-b border-white/[0.05] bg-[#060609]/90 backdrop-blur-2xl' : 'bg-transparent')}>
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 select-none" onClick={() => setOpen(false)}>
          <div className="relative h-7 w-7 overflow-hidden rounded-full border border-primary/40 shadow-[0_0_10px_rgba(220,38,38,0.2)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SITE.logo} alt="SANTANA FAMILLE" className="h-full w-full object-cover" />
          </div>
          <span className="text-sm font-bold tracking-tight text-white">
            SANTANA<span className="text-primary"> FAMILLE</span>
          </span>
        </Link>

        <div className="hidden items-center gap-0.5 md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}
              className={cn('rounded-md px-3 py-1.5 text-xs font-medium transition-all',
                pathname === link.href ? 'text-white' : 'text-gray-500 hover:text-gray-200')}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Link href="/recrutement"
            className="rounded-md bg-primary px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-primary/85 hover:shadow-[0_0_16px_rgba(220,38,38,0.3)]">
            Postuler
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="text-gray-400 hover:text-white md:hidden" aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/[0.05] bg-[#060609]/95 backdrop-blur-xl px-5 pb-6 pt-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
              className={cn('block rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                pathname === link.href ? 'text-white' : 'text-gray-500')}>
              {link.label}
            </Link>
          ))}
          <Link href="/recrutement" onClick={() => setOpen(false)}
            className="mt-3 block w-full rounded-md bg-primary py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-white">
            Postuler
          </Link>
        </div>
      )}
    </header>
  )
}
