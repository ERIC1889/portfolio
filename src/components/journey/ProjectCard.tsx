'use client'

import { useLang } from '@/components/providers/LanguageProvider'
import { DiffBlock } from '@/components/term/DiffBlock'
import { projectName } from '@/content/select'
import type { Project, Year } from '@/content/types'

export function ProjectCard({ project, year }: { project: Project; year: Year }) {
  const { t } = useLang()
  const name = t(projectName(project))
  return (
    <div id={project.slug} className="glass project-card year-card">
      <div className="project-tags">
        {project.team && <span className="tag-sm">{t(project.team)}</span>}
        {project.role && <span className="tag-sm">{t(project.role)}</span>}
      </div>
      <h3 className="project-name">{name}</h3>
      <p className="project-summary">{t(project.summary)}</p>
      <p className="mono project-period">{project.period}</p>
      {project.scene && <DiffBlock hunk={`${year} ${name}`} scene={project.scene} />}
      <p className="mono case-evidence">→ {project.evidence ?? project.stack.join(' · ')}</p>
      {project.links?.map((link) => (
        <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="mono year-card-link">
          → {t(link.label)}
        </a>
      ))}
    </div>
  )
}
