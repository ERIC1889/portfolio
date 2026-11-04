'use client'

import Link from 'next/link'
import { useLang } from '@/components/providers/LanguageProvider'
import type { L, Project } from '@/content/types'
import { UI, seeAllProjectsLabel } from '@/content/ui'
import { ProjectRow } from './ProjectRow'
import { SectionHead } from './SectionHead'

type Props = { id: string; title: L; projects: Project[]; more?: boolean; total?: number; hideHeading?: boolean }

export function Showcase({ id, title, projects, more = false, total, hideHeading = false }: Props) {
  const { t } = useLang()
  if (projects.length === 0) return null
  return (
    <section className="section" {...(hideHeading ? { 'aria-label': t(title) } : { 'aria-labelledby': id })}>
      <div className="wrap">
        {!hideHeading && <SectionHead id={id} title={title} />}
        <div className="project-rows">
          {projects.map((project) => (
            <ProjectRow key={project.slug} project={project} />
          ))}
        </div>
        {more && (
          <p className="more-link">
            <Link href="/archive#projects">
              {t(total ? seeAllProjectsLabel(total) : UI.seeAllProjects)} <span aria-hidden="true">→</span>
            </Link>
          </p>
        )}
      </div>
    </section>
  )
}
