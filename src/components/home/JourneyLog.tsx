'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLang } from '@/components/providers/LanguageProvider'
import { ScrollSection, fadeUp, stagger } from '@/components/motion'
import type { Chapter } from '@/content/types'
import { SECTION_TITLES } from '@/content/ui'
import { SectionHead } from './SectionHead'

export function JourneyLog({ chapters }: { chapters: Chapter[] }) {
  const { t } = useLang()
  return (
    <ScrollSection className="sec" id="journey">
      <div className="sec-inner">
        <SectionHead num="01" title={SECTION_TITLES.journey} />
        <div className="glass term-log">
          <p className="mono log-cmd">
            <span className="term-prompt">$</span> git log --reverse --oneline
          </p>
          <motion.ol className="log-rows" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {chapters.map((chapter) => (
              <motion.li key={chapter.year} variants={fadeUp}>
                <Link href={`/journey/${chapter.year}`} className="log-row">
                  <span className="mono log-year">{chapter.year}</span>
                  <span className="mono log-name">{t(chapter.name)}</span>
                  <span className="log-lesson">{t(chapter.lesson)}</span>
                </Link>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </ScrollSection>
  )
}
