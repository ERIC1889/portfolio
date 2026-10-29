'use client'

import Link from 'next/link'
import { useLang } from '@/components/providers/LanguageProvider'
import { MediaFigure } from '@/components/common/Media'
import { SmartLink, StackList, StatusBadge } from '@/components/common/bits'
import { projectTitle } from '@/content/select'
import type { Project } from '@/content/types'
import { UI } from '@/content/ui'

/** A supporting or other project on the home page: one picture beside what it is, my part and its stack. */
export function ProjectRow({ project, compact = false }: { project: Project; compact?: boolean }) {
  const { t } = useLang()
  const picture = project.media?.find((m) => m.kind !== 'video')
  const link = project.links?.[0]
  return (
    <article className={`project-row${compact ? ' is-compact' : ''}${picture && picture.height > picture.width ? ' has-tall' : ''}`}>
      {picture && (
        <div className="project-row-media">
          <MediaFigure media={picture} sizes="(max-width: 768px) 100vw, 400px" />
        </div>
      )}
      <div className="project-row-body">
        <StatusBadge project={project} />
        <h3 className="project-title">{t(projectTitle(project))}</h3>
        {project.product && <p className="project-product">{t(project.product)}</p>}
        {(project.team || project.role) && (
          <p className="project-meta">
            {project.team && t(project.team)}
            {project.team && project.role && ' · '}
            {project.role && t(project.role)}
          </p>
        )}
        {!compact && project.features && (
          <ul className="feature-list is-plain">
            {project.features.map((feature) => (
              <li key={feature.ko}>{t(feature)}</li>
            ))}
          </ul>
        )}
        <StackList items={project.stack} label={UI.stack} />
        <div className="actions">
          <Link href={`/projects/${project.slug}`} className="btn btn-primary">
            {t(UI.details)} <span aria-hidden="true">→</span>
          </Link>
          {link && (
            <SmartLink href={link.href} className="btn">
              {t(link.label)}
            </SmartLink>
          )}
        </div>
      </div>
    </article>
  )
}
