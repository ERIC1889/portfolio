'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLang } from '@/components/providers/LanguageProvider'
import { ScrollSection, TiltCard, fadeUp, stagger } from '@/components/motion'
import { DiffLines } from '@/components/term/DiffBlock'
import { useIsMobile } from '@/lib/useIsMobile'
import type { Project, Scene } from '@/content/types'
import { projectName } from '@/content/select'
import { SECTION_TITLES, UI } from '@/content/ui'
import { SectionHead } from './SectionHead'

export function throughlineHref(project: Project): string {
  return project.tier === 'featured' ? `/projects/${project.slug}` : `/journey/${project.years[0]}#${project.slug}`
}

export function Throughline({ items }: { items: (Project & { scene: Scene })[] }) {
  const { t } = useLang()
  const isMobile = useIsMobile(768)
  return (
    <ScrollSection className="sec" id="throughline">
      <div className="sec-inner">
        <SectionHead num="02" title={SECTION_TITLES.throughline} />
        <p className="mono diff-legend">{t(UI.diffLegend)}</p>
        <motion.div className="project-grid case-grid throughline-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {items.map((project) => (
            <motion.div key={project.slug} variants={fadeUp}>
              <TiltCard className="glass project-card throughline-card" disableTilt={isMobile}>
                <Link href={throughlineHref(project)} className="case-link">
                  <div className="project-tags">
                    <span className="tag-sm mono">{project.years[0]}</span>
                  </div>
                  <h3 className="project-name">{t(projectName(project))}</h3>
                  <div className="throughline-diff">
                    <DiffLines scene={project.scene} />
                  </div>
                  <p className="mono case-evidence">{t(UI.details)} →</p>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </ScrollSection>
  )
}
