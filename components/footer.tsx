import Link from 'next/link'
import { Mail } from 'lucide-react'
import { NAV_LINKS, SITE } from '@/lib/site-config'

const GH = <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
const WA = <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
const TG = <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative z-10 border-t border-white/[0.05] bg-[#060609]">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-3">
              <div className="h-7 w-7 overflow-hidden rounded-full border border-primary/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={SITE.logo} alt="" className="h-full w-full object-cover" />
              </div>
              <span className="text-sm font-bold tracking-tight text-white">SANTANA<span className="text-primary"> FAMILLE</span></span>
            </Link>
            <p className="text-xs text-gray-600 mb-1">{SITE.nickname}</p>
            <p className="text-xs italic text-gray-700 max-w-xs leading-relaxed">&ldquo;{SITE.slogan}&rdquo;</p>
            <div className="mt-5 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              <span className="text-xs text-green-500 font-medium">Recrutement ouvert</span>
            </div>
          </div>
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">Navigation</p>
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map(link => (
                <Link key={link.href} href={link.href} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">{link.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">Contact</p>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${SITE.contactEmail}`} className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors">
                <Mail className="h-3.5 w-3.5 shrink-0" />{SITE.contactEmail}
              </a>
            </div>
            <Link href="/recrutement" className="mt-5 inline-block rounded-md bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-primary/85 transition-all">
              Postuler
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.04] pt-8 sm:flex-row">
          <p className="text-[10px] text-gray-700">© {year} SANTANA FAMILLE — Tous droits réservés.</p>
          <div className="flex flex-col items-center gap-3 sm:items-end">
            <div className="flex items-center gap-3">
              <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-white transition-colors" aria-label="GitHub">{GH}</a>
              <a href={SITE.whatsappChannel} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-[#25D366] transition-colors" aria-label="WhatsApp">{WA}</a>
              <a href={SITE.telegram} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-[#2AABEE] transition-colors" aria-label="Telegram">{TG}</a>
              <a href={`mailto:${SITE.devEmail}`} className="text-gray-700 hover:text-primary transition-colors" aria-label="Email">
                <Mail className="h-4 w-4" />
              </a>
            </div>
            <p className="text-[10px] tracking-widest text-gray-800 font-mono select-none">{SITE.devSignature}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
