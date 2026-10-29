'use client'

import Link from 'next/link'
import { useLang } from '@/components/providers/LanguageProvider'
import type { Archive, Award } from '@/content/types'
import { HOME_IDS, SECTION_TITLES, UI, paperSummary } from '@/content/ui'
import { SectionHead } from './SectionHead'

type Counts = { conference: number; international: number; firstAuthor: number }

export function Experience({ archive, topAwards, paperCounts }: { archive: Archive; topAwards: Award[]; paperCounts: Counts }) {
  const { t } = useLang()
  const { education } = archive
  return (
    <section className="section" aria-labelledby={HOME_IDS.experience}>
      <div className="wrap">
        <SectionHead id={HOME_IDS.experience} title={SECTION_TITLES.experience} />
        <div className="exp-grid">
          <div className="exp-block exp-work">
            <h3 className="label">{t(UI.work)}</h3>
            <ul className="exp-list">
              {archive.experience.map((job) => (
                <li key={job.org.ko}>
                  <p className="exp-title">
                    <strong>{t(job.org)}</strong> · {t(job.title)} <span className="mono muted">{job.period}</span>
                  </p>
                  <p className="muted">{t(job.context)}</p>
                  {job.responsibilities.length > 0 && (
                    <ul className="dash-list">
                      {job.responsibilities.map((item) => (
                        <li key={item.ko}>{t(item)}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="exp-block">
            <h3 className="label">{t(UI.education)}</h3>
            <p className="exp-title">
              <strong>{t(education.school)}</strong> · {t(education.major)}
            </p>
            <p className="muted">
              <span className="mono">{education.period}</span> · {t(education.note)} · {t(UI.gpa)} <span className="mono">{education.gpa}</span>
            </p>
          </div>
          <div className="exp-block">
            <h3 className="label">{t(UI.topAwards)}</h3>
            <ul className="exp-list is-tight">
              {topAwards.map((award) => (
                <li key={award.name.ko}>
                  {t(award.name)} {award.team && <span className="badge">{t(UI.team)}</span>}
                  <span className="muted block">
                    {t(award.org)} · <span className="mono">{award.date}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="more-link">
              <Link href="/archive#awards">
                {t(UI.awardsCount)} {archive.awards.length} <span aria-hidden="true">→</span>
              </Link>
            </p>
          </div>
          <div className="exp-block">
            <h3 className="label">{t(UI.papers)}</h3>
            <p>{t(paperSummary(paperCounts))}</p>
            <p className="more-link">
              <Link href="/archive#papers">
                {t(UI.allPapers)} <span aria-hidden="true">→</span>
              </Link>
            </p>
          </div>
        </div>
        <div className="actions">
          <Link href="/archive" className="btn">
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
