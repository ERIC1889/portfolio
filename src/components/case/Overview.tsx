'use client'

import type { ReactNode } from 'react'
import { useLang } from '@/components/providers/LanguageProvider'
import { Rich } from '@/components/common/Rich'
import { SmartLink, StackList, StatusBadge } from '@/components/common/bits'
import { hasNewShape, pageTitle } from '@/content/select'
import type { L, Project } from '@/content/types'
import { CASE_PARTS, OVERVIEW_LABELS, SHOWCASE_LABELS, WORK_PARTS } from '@/content/ui'
import { ProductTable, ScopeRows } from './parts'

function Fact({ label, children }: { label: L; children: ReactNode }) {
  const { t } = useLang()
  return (
    <div className="fact">
      <dt>{t(label)}</dt>
      <dd>{children}</dd>
    </div>
  )
}

export function Overview({ project }: { project: Project }) {
  const { t } = useLang()
  const isWork = project.kind === 'work'
  const modern = hasNewShape(project)
  const links = project.links ?? []
  const headerLinks = links.slice(0, 2)
  const hasJump = isWork ? Boolean(project.products?.length) : Boolean(project.cases?.length)
  const jump = isWork ? { href: '#products', label: WORK_PARTS.products } : { href: '#cases', label: CASE_PARTS.cases }
  const overview = project.overview
  const scope = project.contribution
  const showScope = !isWork && (scope !== undefined || Boolean(overview?.scope?.length))
  return (
    <header className="overview">
      {project.showcase && <p className="kicker">{t(SHOWCASE_LABELS[project.showcase])}</p>}
      <h1>{t(pageTitle(project))}</h1>
      <p className="case-product">{t(isWork ? project.summary : (project.product ?? project.summary))}</p>
      <dl className="facts">
        {project.audience && <Fact label={OVERVIEW_LABELS.audience}>{t(project.audience)}</Fact>}
        <Fact label={OVERVIEW_LABELS.period}>
          <span className="mono">{project.period}</span>
        </Fact>
        {project.team && <Fact label={OVERVIEW_LABELS.team}>{t(project.team)}</Fact>}
        {project.role && <Fact label={OVERVIEW_LABELS.role}>{t(project.role)}</Fact>}
        {project.status && (
          <Fact label={OVERVIEW_LABELS.status}>
            <StatusBadge project={project} />
          </Fact>
        )}
        {showScope && (
          <Fact label={OVERVIEW_LABELS.scope}>
            {scope ? <ScopeRows contribution={scope} /> : overview?.scope?.map((paragraph) => <p key={paragraph.ko}>{t(paragraph)}</p>)}
          </Fact>
        )}
        {overview && overview.highlights.length > 0 && (
          <Fact label={OVERVIEW_LABELS.highlights}>
            <ol className="highlights">
              {overview.highlights.map((item) => (
                <li key={item.ko}>
                  <Rich text={t(item)} />
                </li>
              ))}
            </ol>
          </Fact>
        )}
        <Fact label={OVERVIEW_LABELS.stack}>
          <StackList items={project.stack} />
        </Fact>
        {overview?.aiUse && <Fact label={OVERVIEW_LABELS.aiUse}>{t(overview.aiUse)}</Fact>}
      </dl>
      {isWork && project.products && project.products.length > 0 && <ProductTable products={project.products} />}
      {(headerLinks.length > 0 || (modern && hasJump)) && (
        <div className="actions">
          {headerLinks.map((link, i) => (
            <SmartLink key={link.href} href={link.href} className={i === 0 ? 'btn btn-primary' : 'btn'}>
              {t(link.label)}
            </SmartLink>
          ))}
          {modern && hasJump && (
            <a href={jump.href} className="btn">
              {t(jump.label)} <span aria-hidden="true">↓</span>
            </a>
          )}
        </div>
      )}
    </header>
  )
}
