'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { useLang } from '@/components/providers/LanguageProvider'
import { SmartLink } from '@/components/common/bits'
import { projectName } from '@/content/select'
import type { Archive, L, PaperKind, Project } from '@/content/types'
import { ARCHIVE_HEADINGS, PAPER_KINDS, UI, authorOrderLabel } from '@/content/ui'

const PAPER_ORDER: PaperKind[] = ['international', 'domestic', 'contest', 'campus']

function Block({ id, title, children }: { id: string; title: L; children: ReactNode }) {
  const { t } = useLang()
  return (
    <section id={id} className="archive-block" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`}>{t(title)}</h2>
      {children}
    </section>
  )
}

export function ArchiveView({ archive, projects }: { archive: Archive; projects: Project[] }) {
  const { t } = useLang()
  const { education } = archive
  return (
    <main id="main" className="page">
      <div className="wrap narrow">
        <header className="page-header">
          <h1>{t(UI.archiveTitle)}</h1>
          <p className="page-lead">{t(UI.archiveLead)}</p>
        </header>

        <Block id="projects" title={ARCHIVE_HEADINGS.projects}>
          <ul className="record-list">
            {projects.map((project) => (
              <li key={project.slug}>
                <p className="record-title">
                  {project.tier === 'featured' ? (
                    <Link href={`/projects/${project.slug}`}>
                      <strong>{t(projectName(project))}</strong>
                    </Link>
                  ) : (
                    <strong>{t(projectName(project))}</strong>
                  )}{' '}
                  <span className="mono muted">{project.period}</span>
                </p>
                <p>{t(project.summary)}</p>
                <p className="mono record-stack">{project.stack.join(' · ')}</p>
                {project.tier !== 'featured' &&
                  project.links?.map((link) => (
                    <p key={link.href}>
                      <SmartLink href={link.href}>{t(link.label)}</SmartLink>
                    </p>
                  ))}
              </li>
            ))}
          </ul>
        </Block>

        <Block id="papers" title={ARCHIVE_HEADINGS.papers}>
          {PAPER_ORDER.map((kind) => {
            const papers = archive.papers.filter((paper) => paper.kind === kind)
            if (papers.length === 0) return null
            return (
              <div key={kind} className="record-group">
                <h3 className="label">
                  {t(PAPER_KINDS[kind])} <span className="mono">{papers.length}</span>
                </h3>
                <ul className="record-list">
                  {papers.map((paper) => (
                    <li key={`${paper.year}-${paper.title}-${paper.venue.ko}`}>
                      <p className="record-title">
                        {paper.href ? <SmartLink href={paper.href}>{t({ ko: paper.title, en: paper.titleEn ?? paper.title })}</SmartLink> : t({ ko: paper.title, en: paper.titleEn ?? paper.title })}
                        {paper.authorOrder && <span className="badge">{t(authorOrderLabel(paper.authorOrder))}</span>}
                      </p>
                      <p className="muted">
                        {t(paper.venue)} · <span className="mono">{paper.year}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </Block>

        <Block id="awards" title={ARCHIVE_HEADINGS.awards}>
          <ul className="record-list">
            {archive.awards.map((award) => (
              <li key={`${award.date}-${award.name.ko}`}>
                <p className="record-title">
                  {t(award.name)} {award.team && <span className="badge">{t(UI.team)}</span>}
                </p>
                <p className="muted">
                  {t(award.org)} · <span className="mono">{award.date}</span>
                </p>
              </li>
            ))}
          </ul>
        </Block>

        <Block id="work" title={ARCHIVE_HEADINGS.experience}>
          <ul className="record-list">
            {archive.experience.map((job) => (
              <li key={job.org.ko}>
                <p className="record-title">
                  <strong>{t(job.org)}</strong> · {t(job.title)} <span className="mono muted">{job.period}</span>
                </p>
                <p className="muted">{t(job.context)}</p>
              </li>
            ))}
          </ul>
        </Block>

        <Block id="activities" title={ARCHIVE_HEADINGS.activities}>
          <ul className="record-list">
            {archive.activities.map((activity) => (
              <li key={`${activity.period}-${activity.name.ko}`}>
                <p className="record-title">{t(activity.name)}</p>
                <p className="muted">
                  {t(activity.org)} · <span className="mono">{activity.period}</span>
                </p>
                <p>{t(activity.desc)}</p>
              </li>
            ))}
          </ul>
        </Block>

        <Block id="education" title={ARCHIVE_HEADINGS.education}>
          <p className="record-title">
            <strong>{t(education.school)}</strong> · {t(education.major)}
          </p>
          <p className="muted">
            <span className="mono">{education.period}</span> · {t(education.note)} · {t(UI.gpa)} <span className="mono">{education.gpa}</span>
          </p>
        </Block>

        <Block id="certs" title={ARCHIVE_HEADINGS.certs}>
          <ul className="record-list">
            {archive.certs.map((cert) => (
              <li key={cert.name.ko}>
                <p className="record-title">
                  {t(cert.name)} <span className="mono muted">{t(cert.detail)}</span>
                </p>
              </li>
            ))}
          </ul>
        </Block>
      </div>
    </main>
  )
}
