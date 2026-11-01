'use client'

import Link from 'next/link'
import { useLang } from '@/components/providers/LanguageProvider'
import type { L, Project } from '@/content/types'
import { UI } from '@/content/ui'
import { ProjectRow } from './ProjectRow'
import { SectionHead } from './SectionHead'

/** A group of projects on the home page; `more` points on to the list of all projects. */
export function Showcase({ id, title, projects, more = false, hideHeading = false }: { id: string; title: L; projects: Project[]; more?: boolean; hideHeading?: boolean }) {
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
              {t(UI.seeAllProjects)} <span aria-hidden="true">→</span>
            </Link>
          </p>
        )}
      </div>
    </section>
  )
}
