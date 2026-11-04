'use client'

import { useLang } from '@/components/providers/LanguageProvider'
import { Gallery } from '@/components/common/Media'
import { LinkList } from '@/components/common/bits'
import type { CaseSection as CaseSectionData, LinkItem, Metric } from '@/content/types'
import { UI } from '@/content/ui'
import { MetricsTable, SectionTable } from './parts'

const STEP = /^(.*?)\s*(문제:|Problem:)\s*(.*?)\s*(해결:|Fix:)\s*(.*)$/s

function Paragraph({ text }: { text: string }) {
  const match = STEP.exec(text)
  if (!match) return <p>{text}</p>
  const [, title, problemLabel, problem, fixLabel, fix] = match
  return (
    <p className="case-step">
      <strong className="case-step-title">{title.replace(/\.$/, '')}</strong>
      <span className="case-step-line">
        <b className="case-step-label">{problemLabel}</b> {problem}
      </span>
      <span className="case-step-line">
        <b className="case-step-label">{fixLabel}</b> {fix}
      </span>
    </p>
  )
}

export function CaseSection({ section, anchor, metrics, links }: { section: CaseSectionData; anchor: string; metrics?: Metric[]; links?: LinkItem[] }) {
  const { t } = useLang()
  return (
    <section id={anchor} className="case-block" aria-labelledby={`${anchor}-title`}>
      <h2 id={`${anchor}-title`}>
        {t(section.title)}
        {section.hold && <span className="badge badge-warn">{t(UI.onHold)}</span>}
      </h2>
      {section.body.map((paragraph) => (
        <Paragraph key={paragraph.ko} text={t(paragraph)} />
      ))}
      {section.table && <SectionTable table={section.table} />}
      {section.media && <Gallery media={section.media} />}
      {metrics && metrics.length > 0 && (
        <>
          <h3 className="label">{t(UI.metricsHeading)}</h3>
          <MetricsTable metrics={metrics} />
        </>
      )}
      {links && links.length > 0 && <LinkList links={links} />}
    </section>
  )
}
