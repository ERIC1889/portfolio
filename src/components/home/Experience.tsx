'use client'

import Link from 'next/link'
import { useLang } from '@/components/providers/LanguageProvider'
import { StatTiles } from '@/components/common/StatTiles'
import type { Activity } from '@/content/select'
import type { Archive, Award, L, Stat } from '@/content/types'
import { HOME_IDS, SECTION_TITLES, UI } from '@/content/ui'
import { SectionHead } from './SectionHead'

export const awardMonth = (date: string) => `20${date.slice(0, 5)}`

export function activityMonths(period: string): string {
  const months = period.match(/\d{2}\.\d{2}/g) ?? []
  const first = months[0]
  const last = months[months.length - 1]
  if (!first) return period
  return first === last ? `20${first}` : `20${first}–20${last}`
}

type Props = { archive: Archive; topAwards: Award[]; topActivities: Activity[]; stats: Stat[]; caseNames: Record<string, L> }

export function Experience({ archive, topAwards, topActivities, stats, caseNames }: Props) {
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
              <span className="award-name">
                {t(award.name)}
                {award.project && caseNames[award.project] && (
                  <Link href={`/projects/${award.project}`} className="award-project">
                    {t(caseNames[award.project])} <span aria-hidden="true">→</span>
                  </Link>
                )}
              </span>
              <span className="award-org">
                {t(award.org)}
                {award.team && <span className="badge">{t(UI.team)}</span>}
              </span>
            </li>
          ))}
        </ol>

        <h3 className="label exp-awards-title">{t(UI.topActivities)}</h3>
        <ol className="award-rows activity-rows">
          {topActivities.map((activity) => (
            <li key={activity.name.ko}>
              <span className="mono award-date">{activityMonths(activity.period)}</span>
              <span className="award-name">{t(activity.name)}</span>
              <span className="award-org">{t(activity.org)}</span>
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
