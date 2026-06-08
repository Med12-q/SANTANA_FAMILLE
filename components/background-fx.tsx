'use client'

export function CyberBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[#060609]" />
      <div className="grid-bg absolute inset-0 opacity-100" />
      <div className="absolute -top-80 right-0 h-[900px] w-[900px] rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #dc2626 0%, transparent 65%)' }} />
      <div className="absolute -bottom-80 -left-20 h-[700px] w-[700px] rounded-full opacity-[0.03]"
        style={{ background: 'radial-gradient(circle, #dc2626 0%, transparent 65%)' }} />
    </div>
  )
}

export function ParticleField() { return null }
export function BackgroundGradient() { return <CyberBackground /> }
