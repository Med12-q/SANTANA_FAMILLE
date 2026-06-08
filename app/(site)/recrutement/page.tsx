import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { RecruitmentForm } from '@/components/recruitment-form'

export const metadata: Metadata = {
  title: 'Recrutement — SANTANA FAMILLE',
  description: "Postulez pour rejoindre la SANTANA FAMILLE. L'élite ne se rejoint pas. Elle se mérite.",
}

export default function RecrutementPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="REJOINDRE L'ÉLITE"
        title="Formulaire de recrutement"
        subtitle="Tout candidat doit passer par la plateforme officielle. Remplissez ce formulaire avec honnêteté et précision."
      />
      <div className="px-4">
        <RecruitmentForm />
      </div>
    </div>
  )
}
