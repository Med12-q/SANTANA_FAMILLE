interface PageHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
}

export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <div className="border-b border-white/[0.05] px-5 py-16 text-center">
      <div className="mx-auto max-w-3xl">
        {eyebrow && <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">{eyebrow}</p>}
        <h1 className="text-2xl font-black text-white sm:text-3xl md:text-4xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-4 max-w-lg text-sm text-gray-400 leading-relaxed">{subtitle}</p>}
      </div>
    </div>
  )
}
