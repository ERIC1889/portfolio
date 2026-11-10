'use client'

import type { ReactNode } from 'react'
import { useLang } from '@/components/providers/LanguageProvider'
import type { Activity } from '@/content/select'
import { projectTitle, selectPaperCounts } from '@/content/select'
import type { Archive, Award, L, Profile, Project, ResumeVariant } from '@/content/types'
import { ARCHIVE_HEADINGS, PAPER_KINDS, SECTION_TITLES, UI, authorOrderLabel } from '@/content/ui'

type Props = { profile: Profile; archive: Archive; projects: Project[]; topAwards: Award[]; topActivities: Activity[]; siteUrl: string; variant: ResumeVariant }

/** '24.10.24 ~ 24.10.27' → '24.10.24'; YY.MM.DD strings sort correctly as text */
const startOf = (range: string) => range.split('~')[0].trim()
const host = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '')

function Part({ title, children }: { title: L; children: ReactNode }) {
  const { t } = useLang()
  return (
    <section className="resume-part">
      <h2>{t(title)}</h2>
      {children}
    </section>
  )
}

export function Resume({ profile, archive, projects, topAwards, topActivities, siteUrl, variant }: Props) {
  const { t } = useLang()
  // Work goes under 경력; the project list keeps the owner's own projects
  const work = projects.filter((project) => project.showcase === 'work')
  const own = projects.filter((project) => project.showcase !== 'work')
  const nameOf = (slug?: string) => projects.find((project) => project.slug === slug)?.name
  const conference = archive.papers.filter((paper) => paper.kind === 'international' || paper.kind === 'domestic')
  const counts = selectPaperCounts(archive.papers)
  const selectedPapers = variant.topPapers.flatMap((title) => conference.filter((paper) => paper.title === title))
  // Newest first on the résumé; the home page keeps the owner's own order
  const awards = [...topAwards].sort((a, b) => startOf(b.date).localeCompare(startOf(a.date)))
  const activities = [...topActivities].sort((a, b) => startOf(b.period).localeCompare(startOf(a.period)))
  const otherAwards = archive.awards.length - topAwards.length
  const archiveUrl = `${siteUrl}/archive`
  return (
    <main id="main" className="page resume">
      <div className="wrap narrow">
        <p className="resume-actions no-print">
          <a href="/resume.pdf" className="btn btn-primary" download>
            {t(UI.resumePdf)}
          </a>
        </p>

        <header className="resume-head">
          <h1>{t(profile.name)}</h1>
          <p className="resume-role">{t(variant.role ?? profile.role)}</p>
          <ul className="resume-contacts">
            {profile.contacts.map((contact) => (
              <li key={contact.kind}>
                <a href={contact.href}>{contact.value}</a>
              </li>
            ))}
            <li>
              <a href={siteUrl}>{host(siteUrl)}</a>
            </li>
          </ul>
          {variant.service && <p className="resume-service">{t(variant.service)}</p>}
          <ul className="resume-summary" aria-label={t(UI.resumeSummary)}>
            {variant.summary.map((line) => (
              <li key={line.ko}>{t(line)}</li>
            ))}
          </ul>
        </header>

        <Part title={SECTION_TITLES.skills}>
          <dl className="resume-skills">
            {variant.skills.map((row) => (
              <div key={row.area.ko}>
                <dt>{t(row.area)}</dt>
                <dd className="mono">{row.items.join(' · ')}</dd>
              </div>
            ))}
          </dl>
        </Part>

        <Part title={ARCHIVE_HEADINGS.experience}>
          {archive.experience.map((job) => {
            const linked = work.find((project) => project.slug === job.project)
            const site = linked?.links?.find((link) => link.kind === 'site')?.href
            return (
              <div key={job.org.ko} className="resume-item">
                <p className="resume-item-head">
                  <strong>{t(job.org)}</strong> · {t(job.title)} <span className="mono">{job.period}</span>
                </p>
                <p className="muted">
                  {t(job.context)}
                  {site && (
                    <>
                      {' · '}
                      <a href={site}>{host(site)}</a>
                    </>
                  )}
                  {linked && (
                    <>
                      {' · '}
                      <a href={`${siteUrl}/projects/${linked.slug}`}>{host(`${siteUrl}/projects/${linked.slug}`)}</a>
                    </>
                  )}
                </p>
                {job.responsibilities.length > 0 && (
                  <ul>
                    {job.responsibilities.map((item) => (
                      <li key={item.ko}>{t(item)}</li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </Part>

        <Part title={{ ko: '프로젝트', en: 'Projects' }}>
          {own.map((project) => {
            const repo = project.links?.find((link) => link.kind === 'code')?.href
            const meta = [project.team, project.role].flatMap((part) => (part ? [t(part)] : [])).join(' · ')
            return (
              <div key={project.slug} className="resume-item">
                <p className="resume-item-head">
                  <strong>{t(projectTitle(project))}</strong> <span className="mono">{project.period}</span>
                  {project.status && (
                    <>
                      {' · '}
                      <span className="resume-status">{t(project.status)}</span>
                    </>
                  )}
                </p>
                <p className="muted">{meta}</p>
                {repo && (
                  <p className="mono resume-links">
                    <a href={repo}>{host(repo)}</a>
                  </p>
                )}
                <ul>
                  {(project.resumeItems ?? project.features ?? [project.summary]).map((item) => (
                    <li key={item.ko}>{t(item)}</li>
                  ))}
                </ul>
                <p className="mono resume-stack">{(project.resumeStack ?? project.stack).join(' · ')}</p>
              </div>
            )
          })}
        </Part>

        <Part title={ARCHIVE_HEADINGS.educationAndCerts}>
          <p>
            <strong>{t(archive.education.school)}</strong> · {t(archive.education.major)} <span className="mono">{archive.education.period}</span>
          </p>
          <p className="muted">
            {t(archive.education.note)} · {t(UI.gpa)} {archive.education.gpa}
            {archive.certs.map((cert) => (
              <span key={cert.name.ko}>
                {' · '}
                {t(cert.name)} <span className="mono">{t(cert.detail)}</span>
              </span>
            ))}
          </p>
        </Part>

        <Part title={{ ko: '수상·활동', en: 'Awards and activities' }}>
          <ul>
            {awards.map((award) => {
              const name = nameOf(award.project)
              return (
                <li key={award.name.ko}>
                  {t(award.name)}
                  {name && ` (${name})`} — {t(award.org)} <span className="mono">{award.date}</span>
                </li>
              )
            })}
            {activities.map((activity) => (
              <li key={activity.name.ko}>
                {t(activity.name)} — {t(activity.org)} <span className="mono">{activity.period}</span>
              </li>
            ))}
          </ul>
          {otherAwards > 0 && (
            <p className="muted">
              {t({ ko: `수상 외 ${otherAwards}건 · 전체 기록 `, en: `${otherAwards} more awards · full record ` })}
              <a href={archiveUrl}>{host(archiveUrl)}</a>
            </p>
          )}
        </Part>

        <Part title={UI.papers}>
          <p>
            {t({
              ko: `학술대회 논문 ${counts.conference}편 (국제 ${counts.international}편 · 1저자 ${counts.firstAuthor}편)`,
              en: `${counts.conference} conference papers (${counts.international} international · ${counts.firstAuthor} first-author)`,
            })}
          </p>
          <ul>
            {selectedPapers.map((paper) => (
              <li key={`${paper.year}-${paper.title}`}>
                {t({ ko: paper.title, en: paper.titleEn ?? paper.title })} — {t(paper.venue)}, <span className="mono">{paper.year}</span>
                {paper.kind === 'international' && ` · ${t(PAPER_KINDS[paper.kind])}`}
                {paper.authorOrder && ` · ${t(authorOrderLabel(paper.authorOrder))}`}
              </li>
            ))}
          </ul>
        </Part>
      </div>
    </main>
  )
}
