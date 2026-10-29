'use client'

import { useLang } from '@/components/providers/LanguageProvider'
import { Gallery } from '@/components/common/Media'
import { LinkList } from '@/components/common/bits'
import type { CaseSection as CaseSectionData, LinkItem, Metric } from '@/content/types'
import { UI } from '@/content/ui'
import { MetricsTable, SectionTable } from './parts'

export function CaseSection({ section, anchor, metrics, links }: { section: CaseSectionData; anchor: string; metrics?: Metric[]; links?: LinkItem[] }) {
  const { t } = useLang()
  return (
    <section id={anchor} className="case-block" aria-labelledby={`${anchor}-title`}>
      <h2 id={`${anchor}-title`}>
        {t(section.title)}
        {section.hold && <span className="badge badge-warn">{t(UI.onHold)}</span>}
      </h2>
      {section.body.map((paragraph) => (
        <p key={paragraph.ko}>{t(paragraph)}</p>
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
