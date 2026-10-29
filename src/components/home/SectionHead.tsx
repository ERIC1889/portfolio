'use client'

import { useLang } from '@/components/providers/LanguageProvider'
import type { L } from '@/content/types'

export function SectionHead({ id, title, lead }: { id: string; title: L; lead?: L }) {
  const { t } = useLang()
  return (
    <div className="section-head">
      <h2 id={id}>{t(title)}</h2>
      {lead && <p className="section-lead">{t(lead)}</p>}
    </div>
  )
}
