'use client'

import Link from 'next/link'
import { useLang } from '@/components/providers/LanguageProvider'
import { MediaFigure } from '@/components/common/Media'
import { StackList, StatusBadge } from '@/components/common/bits'
import { projectTitle } from '@/content/select'
import type { Project } from '@/content/types'
import { HOME_IDS, SECTION_TITLES, UI } from '@/content/ui'
import { SectionHead } from './SectionHead'

/** The demo video beside what it is and where to go, then what I built across the full width so neither column runs long. */
export function Flagship({ project }: { project: Project }) {
  const { t } = useLang()
  const video = project.media?.find((m) => m.kind === 'video')
  const live = project.links?.find((link) => link.kind === 'live')
  return (
    <section className="section" aria-labelledby={HOME_IDS.flagship}>
      <div className="wrap">
        <SectionHead id={HOME_IDS.flagship} title={SECTION_TITLES.flagship} />
        <article className="flagship">
          <div className="flagship-top">
            {video && (
              <div className="flagship-media">
                <MediaFigure media={video} sizes="(max-width: 900px) 100vw, 560px" />
              </div>
            )}
            <div className="flagship-head">
              <StatusBadge project={project} />
              <h3 className="project-title">{t(projectTitle(project))}</h3>
              {project.product && <p className="project-product">{t(project.product)}</p>}
              <h4 className="label">{t(UI.stack)}</h4>
              <StackList items={project.stack} />
              <div className="actions">
                <Link href={`/projects/${project.slug}`} className="btn btn-primary">
                  {t(UI.details)} <span aria-hidden="true">→</span>
                </Link>
                {live && (
                  <a href={live.href} className="btn" target="_blank" rel="noopener noreferrer">
                    {t(live.label)} <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </div>
          </div>
          {project.features && (
            <div className="flagship-features">
              <h4 className="label">{t(UI.whatIBuilt)}</h4>
              <ol className="feature-list is-grid">
                {project.features.map((feature) => (
                  <li key={feature.ko}>{t(feature)}</li>
                ))}
              </ol>
            </div>
          )}
        </article>
      </div>
    </section>
  )
}
