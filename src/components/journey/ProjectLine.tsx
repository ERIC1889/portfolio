'use client'

import { useLang } from '@/components/providers/LanguageProvider'
import { projectName } from '@/content/select'
import type { Project } from '@/content/types'

export function ProjectLine({ project }: { project: Project }) {
  const { t } = useLang()
  return (
    <li id={project.slug} className="year-line">
      <strong>{t(projectName(project))}</strong> — {t(project.summary)} <span className="mono archive-meta">{project.period}</span>
    </li>
  )
}
