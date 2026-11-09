'use client'

import { useLang } from '@/components/providers/LanguageProvider'
import { Rich } from '@/components/common/Rich'
import type { Architecture } from '@/content/types'
import { ARCH_LABELS } from '@/content/ui'
import { ArchDiagram } from './ArchDiagram'
import { SectionTable } from './parts'

export function ArchitectureBlock({ architecture, level = 3 }: { architecture: Architecture; level?: 3 | 4 }) {
  const { t } = useLang()
  const Label = `h${level}` as const
  return (
    <>
      {architecture.diagram && <ArchDiagram diagram={architecture.diagram} />}
      {architecture.body?.map((paragraph) => (
        <p key={paragraph.ko}>
          <Rich text={t(paragraph)} />
        </p>
      ))}
      {architecture.decisions && architecture.decisions.length > 0 && (
        <>
          <Label className="label">{t(ARCH_LABELS.decisions)}</Label>
          <ol className="feature-list decisions">
            {architecture.decisions.map((decision) => (
              <li key={decision.ko}>
                <Rich text={t(decision)} />
              </li>
            ))}
          </ol>
        </>
      )}
      {architecture.table && (
        <>
          <Label className="label">{t(ARCH_LABELS.versions)}</Label>
          <SectionTable table={architecture.table} />
        </>
      )}
    </>
  )
}
