'use client'

import Link from 'next/link'
import { useLang } from '@/components/providers/LanguageProvider'
import { StatTiles } from '@/components/common/StatTiles'
import type { Archive, Award, Stat } from '@/content/types'
import { HOME_IDS, SECTION_TITLES, UI } from '@/content/ui'
import { SectionHead } from './SectionHead'

/** "24.10.24 ~ 24.10.27" → "2024.10" */
export const awardMonth = (date: string) => `20${date.slice(0, 5)}`

/** One column of dated rows (work, then school), the record in numbers, and the three awards that matter most. */
export function Experience({ archive, topAwards, stats }: { archive: Archive; topAwards: Award[]; stats: Stat[] }) {
  const { t } = useLang()
  const { education } = archive
  return (
    <section className="section" aria-labelledby={HOME_IDS.experience}>
      <div className="wrap">
        <SectionHead id={HOME_IDS.experience} title={SECTION_TITLES.experience} />
        <ol className="exp-timeline">
          {archive.experience.map((job) => (
            <li key={job.org.ko} className="exp-row">
              <p className="exp-when mono">{job.period}</p>
              <div className="exp-what">
                <h3 className="exp-title">
                  {t(job.org)} <span className="exp-role">· {t(job.title)}</span>
                </h3>
                <p className="muted">{t(job.context)}</p>
                {job.responsibilities.length > 0 && (
                  <ul className="dash-list">
                    {job.responsibilities.map((item) => (
                      <li key={item.ko}>{t(item)}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
          <li className="exp-row">
            <p className="exp-when mono">{education.period}</p>
            <div className="exp-what">
              <h3 className="exp-title">
                {t(education.school)} <span className="exp-role">· {t(education.major)}</span>
              </h3>
              <p className="muted">
                {t(education.note)} · {t(UI.gpa)} <span className="mono">{education.gpa}</span>
              </p>
            </div>
          </li>
        </ol>

        <StatTiles stats={stats} label={UI.recordStats} />

        <h3 className="label exp-awards-title">{t(UI.topAwards)}</h3>
        <ol className="award-rows">
          {topAwards.map((award) => (
            <li key={award.name.ko}>
              <span className="mono award-date">{awardMonth(award.date)}</span>
              <span className="award-name">{t(award.name)}</span>
              <span className="award-org">
                {t(award.org)}
                {award.team && <span className="badge">{t(UI.team)}</span>}
              </span>
            </li>
          ))}
        </ol>

        <div className="actions">
          <Link href="/archive" className="btn btn-primary">
            {t(UI.allProjects)} <span aria-hidden="true">→</span>
          </Link>
          <Link href="/story" className="btn">
            {t(UI.story)} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
