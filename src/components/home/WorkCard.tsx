'use client'

import Link from 'next/link'
import { useLang } from '@/components/providers/LanguageProvider'
import { ProductTable } from '@/components/case/parts'
import { MediaFigure } from '@/components/common/Media'
import { Rich } from '@/components/common/Rich'
import { caseDemo, pageTitle } from '@/content/select'
import type { Project } from '@/content/types'
import { HOME_IDS, OVERVIEW_LABELS, SECTION_TITLES, UI } from '@/content/ui'
import { SectionHead } from './SectionHead'

export function WorkCard({ project }: { project: Project }) {
  const { t } = useLang()
  const demo = caseDemo(project)
  const site = project.links?.find((link) => link.kind === 'site') ?? project.links?.find((link) => link.kind === 'live')
  const href = `/projects/${project.slug}`
  return (
    <section className="section" aria-labelledby={HOME_IDS.work}>
      <div className="wrap">
        <SectionHead id={HOME_IDS.work} title={SECTION_TITLES.work} />
        <article className="work-card">
          <div className="work-card-top">
            {demo && (
              <div className="work-card-media">
                <MediaFigure media={demo} sizes="(max-width: 900px) 100vw, 560px" />
              </div>
            )}
            <div className="work-card-head">
              <h3 className="project-title">{t(pageTitle(project))}</h3>
              <p className="project-meta">
                <span className="mono">{project.period}</span>
                {project.team && <> · {t(project.team)}</>}
              </p>
              <p className="project-product">{t(project.summary)}</p>
              {project.products && project.products.length > 0 && <ProductTable products={project.products} hrefBase={href} />}
            </div>
          </div>
          {project.overview && project.overview.highlights.length > 0 && (
            <div className="work-card-results">
              <h4 className="label">{t(OVERVIEW_LABELS.highlights)}</h4>
              <ol className="highlights is-grid">
                {project.overview.highlights.map((item) => (
                  <li key={item.ko}>
                    <Rich text={t(item)} />
                  </li>
                ))}
              </ol>
            </div>
          )}
          <div className="actions">
            <Link href={href} className="btn btn-primary">
              {t(UI.workDetails)} <span aria-hidden="true">→</span>
            </Link>
            {site && (
              <a href={site.href} className="btn" target="_blank" rel="noopener noreferrer">
                {t(site.label)} <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </article>
      </div>
    </section>
  )
}
