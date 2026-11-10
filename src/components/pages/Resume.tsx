'use client'

import type { ReactNode } from 'react'
import { useLang } from '@/components/providers/LanguageProvider'
import type { Activity } from '@/content/select'
import { projectTitle, selectPaperCounts } from '@/content/select'
import type { Archive, Award, L, Profile, Project, ResumeVariant } from '@/content/types'
import { ARCHIVE_HEADINGS, PAPER_KINDS, RESUME_SECTIONS, UI, authorOrderLabel } from '@/content/ui'

type Props = { profile: Profile; archive: Archive; projects: Project[]; topAwards: Award[]; topActivities: Activity[]; siteUrl: string; variant: ResumeVariant }

/** '24.10.24 ~ 24.10.27' → '24.10.24'; YY.MM.DD strings sort correctly as text */
const startOf = (range: string) => range.split('~')[0].trim()
const host = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '')

/** Numbered section; the number comes from a CSS counter so the heading text stays clean */
function Part({ title, children }: { title: L; children: ReactNode }) {
  const { t } = useLang()
  return (
    <section className="resume-part">
      <h2>{t(title)}</h2>
      {children}
    </section>
  )
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="resume-chips">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function Head({ title, period }: { title: ReactNode; period: string }) {
  return (
    <p className="resume-item-head">
      <span className="resume-item-title">{title}</span> <span className="mono resume-period">{period}</span>
    </p>
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
  const others = variant.otherExperiences.flatMap((name) => archive.activities.filter((activity) => activity.name.ko === name))
  const otherAwards = archive.awards.length - topAwards.length
  const archiveUrl = `${siteUrl}/archive`
  const contacts = profile.contacts.filter((contact) => contact.kind !== 'linkedin')
  return (
    <main id="main" className="page resume">
      <div className="wrap narrow">
        <p className="resume-actions no-print">
          <a href="/resume.pdf" className="btn btn-primary" download>
            {t(UI.resumePdf)}
          </a>
        </p>

        <header className="resume-head">
          <p className="resume-title">{t(profile.quote).replace('\n', ' ')}</p>
          <h1 className="resume-role">
            {t(variant.role ?? profile.role)} <span className="resume-name">{t(profile.name)}</span>
          </h1>
        </header>

        <Part title={RESUME_SECTIONS.profile}>
          <dl className="resume-facts">
            {variant.phone && (
              <div>
                <dt>{t(UI.resumePhone)}</dt>
                <dd>
                  <a href={`tel:${variant.phone.replace(/[^+\d]/g, '')}`}>{variant.phone}</a>
                </dd>
              </div>
            )}
            {contacts.map((contact) => (
              <div key={contact.kind}>
                <dt>{t(contact.label)}</dt>
                <dd>
                  <a href={contact.href}>{contact.value}</a>
                </dd>
              </div>
            ))}
            <div>
              <dt>{t(UI.resumeSite)}</dt>
              <dd>
                <a href={siteUrl}>{host(siteUrl)}</a>
              </dd>
            </div>
            {variant.service && (
              <div className="is-wide">
                <dt>{t(UI.resumeService)}</dt>
                <dd className="resume-service">{t(variant.service)}</dd>
              </div>
            )}
          </dl>
        </Part>

        <Part title={RESUME_SECTIONS.intro}>
          <ul className="resume-summary">
            {variant.summary.map((line) => (
              <li key={line.ko}>{t(line)}</li>
            ))}
          </ul>
        </Part>

        <Part title={RESUME_SECTIONS.education}>
          <div className="resume-item">
            <Head
              title={
                <>
                  <strong>{t(archive.education.school)}</strong> · {t(archive.education.major)}
                </>
              }
              period={archive.education.period}
            />
            <p className="muted resume-meta">
              {t(archive.education.note)} · {t(UI.gpa)} {archive.education.gpa}
              {archive.certs.map((cert) => (
                <span key={cert.name.ko}>
                  {' · '}
                  {t(cert.name)} <span className="mono">{t(cert.detail)}</span>
                </span>
              ))}
            </p>
          </div>
        </Part>

        <Part title={RESUME_SECTIONS.career}>
          {archive.experience.map((job) => {
            const linked = work.find((project) => project.slug === job.project)
            const site = linked?.links?.find((link) => link.kind === 'site')?.href
            return (
              <div key={job.org.ko} className="resume-item">
                <Head
                  title={
                    <>
                      <strong>{t(job.org)}</strong> · {t(job.title)}
                    </>
                  }
                  period={job.period}
                />
                <p className="muted resume-meta">
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

        <Part title={RESUME_SECTIONS.projects}>
          {own.map((project) => {
            const repo = project.links?.find((link) => link.kind === 'code')?.href
            const meta = [project.team, project.role].flatMap((part) => (part ? [t(part)] : [])).join(' · ')
            return (
              <div key={project.slug} className="resume-item">
                <Head
                  title={
                    <>
                      <strong>{t(projectTitle(project))}</strong>
                      {project.status && <span className="resume-status">{t(project.status)}</span>}
                    </>
                  }
                  period={project.period}
                />
                <p className="muted resume-meta">{meta}</p>
                {repo && (
                  <p className="mono resume-links">
                    <a href={repo} className="resume-repo">
                      {host(repo)}
                    </a>
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

        <Part title={RESUME_SECTIONS.activities}>
          <div className="resume-group">
            <h3>{t(UI.resumeAwards)}</h3>
            <ul className="resume-rows">
              {awards.map((award) => {
                const name = nameOf(award.project)
                return (
                  <li key={award.name.ko}>
                    <span>
                      {t(award.name)}
                      {name && ` (${name})`} — {t(award.org)}
                    </span>{' '}
                    <span className="mono resume-date">{award.date}</span>
                  </li>
                )
              })}
            </ul>
            {otherAwards > 0 && (
              <p className="muted resume-meta">
                {t({ ko: `외 ${otherAwards}건 · 전체 기록 `, en: `${otherAwards} more · full record ` })}
                <a href={archiveUrl}>{host(archiveUrl)}</a>
              </p>
            )}
          </div>
          <div className="resume-group">
            <h3>{t(UI.papers)}</h3>
            <p className="resume-meta">
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
          </div>
          <div className="resume-group">
            <h3>{t(UI.resumeActivities)}</h3>
            <ul className="resume-rows">
              {activities.map((activity) => (
                <li key={activity.name.ko}>
                  <span>
                    {t(activity.name)} — {t(activity.org)}
                  </span>{' '}
                  <span className="mono resume-date">{activity.period}</span>
                </li>
              ))}
            </ul>
          </div>
        </Part>

        <Part title={RESUME_SECTIONS.other}>
          <ul className="resume-rows">
            {others.map((activity) => (
              <li key={activity.name.ko}>
                <span>
                  <strong>{t(activity.name)}</strong> — {t(activity.org)}
                </span>{' '}
                <span className="mono resume-date">{activity.period}</span>
              </li>
            ))}
          </ul>
        </Part>

        <Part title={RESUME_SECTIONS.skills}>
          <dl className="resume-skills">
            {variant.skills.map((row) => (
              <div key={row.area.ko}>
                <dt>{t(row.area)}</dt>
                <dd>
                  <Chips items={row.items} />
                </dd>
              </div>
            ))}
          </dl>
        </Part>
      </div>
    </main>
  )
}
