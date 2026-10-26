'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLang } from '@/components/providers/LanguageProvider'
import { ScrollSection, TiltCard, fadeUp, stagger } from '@/components/motion'
import { useIsMobile } from '@/lib/useIsMobile'
import type { Project } from '@/content/types'
import { projectName } from '@/content/select'
import { SECTION_TITLES } from '@/content/ui'
import { SectionHead } from './SectionHead'

export function evidenceLine(project: Project): string {
  return `→ ${project.evidence ?? project.stack.join(' · ')}`
}

export function FeaturedCases({ projects }: { projects: Project[] }) {
  const { t } = useLang()
  const isMobile = useIsMobile(768)
  return (
    <ScrollSection className="sec" id="cases">
      <div className="sec-inner">
        <SectionHead num="03" title={SECTION_TITLES.cases} />
        <motion.div className="project-grid case-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {projects.map((project) => (
            <motion.div key={project.slug} variants={fadeUp}>
              <TiltCard className="glass project-card" disableTilt={isMobile}>
                <Link href={`/projects/${project.slug}`} className="case-link">
                  <div className="project-tags">
                    {project.years.map((year) => (
                      <span key={year} className="tag-sm">
                        {year}
                      </span>
                    ))}
                    {project.role && <span className="tag-sm">{t(project.role)}</span>}
                  </div>
                  <h3 className="project-name">{t(projectName(project))}</h3>
                  <p className="project-summary">{t(project.question ?? project.summary)}</p>
                  <p className="project-period">{project.period}</p>
                  <p className="mono case-evidence">{evidenceLine(project)}</p>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </ScrollSection>
  )
}
