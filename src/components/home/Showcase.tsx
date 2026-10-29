'use client'

import Link from 'next/link'
import { useLang } from '@/components/providers/LanguageProvider'
import type { L, Project } from '@/content/types'
import { UI } from '@/content/ui'
import { ProjectRow } from './ProjectRow'
import { SectionHead } from './SectionHead'

/** The supporting projects, or the other featured work with a way to the full record. */
export function Showcase({ id, title, lead, projects, compact = false }: { id: string; title: L; lead?: L; projects: Project[]; compact?: boolean }) {
  const { t } = useLang()
  if (projects.length === 0) return null
  return (
    <section className="section" aria-labelledby={id}>
      <div className="wrap">
        <SectionHead id={id} title={title} lead={lead} />
        <div className="project-rows">
          {projects.map((project) => (
            <ProjectRow key={project.slug} project={project} compact={compact} />
          ))}
        </div>
        {compact && (
          <p className="more-link">
            <Link href="/archive">
              {t(UI.allProjects)} <span aria-hidden="true">→</span>
            </Link>
          </p>
        )}
      </div>
    </section>
  )
}
