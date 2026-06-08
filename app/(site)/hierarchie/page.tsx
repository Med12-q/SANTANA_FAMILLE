import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { RankCards } from '@/components/rank-cards'

export const metadata: Metadata = {
  title: 'Hiérarchie — SANTANA FAMILLE',
  description: 'Découvrez la structure hiérarchique de la SANTANA FAMILLE et les différents grades.',
}

export default function HierarchiePage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="STRUCTURE OFFICIELLE"
        title="Hiérarchie"
        subtitle="Chaque grade est gagné par le mérite, la discipline et la loyauté. Découvrez la structure officielle de la SANTANA FAMILLE."
      />
      <div className="px-5">
        <RankCards />
      </div>
    </div>
  )
}
