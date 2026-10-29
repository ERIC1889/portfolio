'use client'

import type { ReactNode } from 'react'
import { useLang } from '@/components/providers/LanguageProvider'
import { projectTitle } from '@/content/select'
import type { Archive, Award, L, Profile, Project } from '@/content/types'
import { ARCHIVE_HEADINGS, PAPER_KINDS, SECTION_TITLES, UI, authorOrderLabel } from '@/content/ui'

type Props = { profile: Profile; archive: Archive; projects: Project[]; topAwards: Award[]; siteUrl: string }

function Part({ title, children }: { title: L; children: ReactNode }) {
  const { t } = useLang()
  return (
    <section className="resume-part">
      <h2>{t(title)}</h2>
      {children}
    </section>
  )
}

/** The résumé, built from the same content as the site; public/resume.pdf is printed from this page. */
export function Resume({ profile, archive, projects, topAwards, siteUrl }: Props) {
  const { t } = useLang()
  const conference = archive.papers.filter((paper) => paper.kind === 'international' || paper.kind === 'domestic')
  const otherAwards = archive.awards.length - topAwards.length
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
          <p className="resume-role">{t(profile.role)}</p>
          <ul className="resume-contacts">
            {profile.contacts.map((contact) => (
              <li key={contact.kind}>
                <a href={contact.href}>{contact.value}</a>
              </li>
            ))}
            <li>
              <a href={siteUrl}>{siteUrl.replace('https://', '')}</a>
            </li>
          </ul>
          <p className="resume-intro">
            {t(profile.quote).replace('\n', ' ')} {t(profile.intro)}
          </p>
        </header>

        <Part title={SECTION_TITLES.skills}>
          <dl className="resume-skills">
            {archive.skills.map((row) => (
              <div key={row.area.ko}>
                <dt>{t(row.area)}</dt>
                <dd>
                  <span className="mono">{row.items.join(', ')}</span> — {t(row.did)}
                </dd>
              </div>
            ))}
          </dl>
        </Part>

        <Part title={ARCHIVE_HEADINGS.experience}>
          {archive.experience.map((job) => (
            <div key={job.org.ko} className="resume-item">
              <p className="resume-item-head">
                <strong>{t(job.org)}</strong> · {t(job.title)} <span className="mono">{job.period}</span>
              </p>
              <p className="muted">{t(job.context)}</p>
              {job.responsibilities.length > 0 && (
                <ul>
                  {job.responsibilities.map((item) => (
                    <li key={item.ko}>{t(item)}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Part>

        <Part title={{ ko: '프로젝트', en: 'Projects' }}>
          {projects.map((project) => (
            <div key={project.slug} className="resume-item">
              <p className="resume-item-head">
                <strong>{t(projectTitle(project))}</strong> <span className="mono">{project.period}</span>
              </p>
              <p className="muted">
                {[project.team, project.role, project.showcase === 'flagship' ? project.status : undefined]
                  .flatMap((part) => (part ? [t(part)] : []))
                  .join(' · ')}
              </p>
              <ul>
                {(project.features ?? [project.summary]).map((item) => (
                  <li key={item.ko}>{t(item)}</li>
                ))}
                {/* Only the flagship's check fits on one line; other numbers need the context on their case page. */}
                {project.showcase === 'flagship' &&
                  project.metrics?.slice(0, 1).map((metric) => (
                    <li key={metric.label.ko}>
                      {t(metric.label)}: <span className="mono">{metric.value}</span> ({t(metric.condition)})
                    </li>
                  ))}
              </ul>
              <p className="mono resume-stack">{project.stack.join(' · ')}</p>
            </div>
          ))}
        </Part>

        <Part title={ARCHIVE_HEADINGS.education}>
          <p>
            <strong>{t(archive.education.school)}</strong> · {t(archive.education.major)} <span className="mono">{archive.education.period}</span>
          </p>
          <p className="muted">
            {t(archive.education.note)} · {t(UI.gpa)} {archive.education.gpa}
          </p>
        </Part>

        <Part title={ARCHIVE_HEADINGS.awards}>
          <ul>
            {topAwards.map((award) => (
              <li key={award.name.ko}>
                {t(award.name)} — {t(award.org)} <span className="mono">{award.date}</span>
              </li>
            ))}
          </ul>
          {otherAwards > 0 && (
            <p className="muted">{t({ ko: `외 ${otherAwards}건 (전체 목록: 포트폴리오 /archive)`, en: `${otherAwards} more (full list: portfolio /archive)` })}</p>
          )}
        </Part>

        <Part title={UI.papers}>
          <ul>
            {conference.map((paper) => (
              <li key={`${paper.year}-${paper.title}`}>
                {t({ ko: paper.title, en: paper.titleEn ?? paper.title })} — {t(paper.venue)}, <span className="mono">{paper.year}</span> · {t(PAPER_KINDS[paper.kind])}
                {paper.authorOrder && ` · ${t(authorOrderLabel(paper.authorOrder))}`}
              </li>
            ))}
          </ul>
        </Part>

        <Part title={ARCHIVE_HEADINGS.certs}>
          <ul>
            {archive.certs.map((cert) => (
              <li key={cert.name.ko}>
                {t(cert.name)} <span className="mono">{t(cert.detail)}</span>
              </li>
            ))}
          </ul>
        </Part>
      </div>
    </main>
  )
}
