'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { useLang } from '@/components/providers/LanguageProvider'
import { SmartLink } from '@/components/common/bits'
import { StatTiles } from '@/components/common/StatTiles'
import { projectName } from '@/content/select'
import type { Archive, L, PaperKind, Project, Stat } from '@/content/types'
import { ARCHIVE_HEADINGS, PAPER_KINDS, SHOWCASE_LABELS, UI, authorOrderLabel } from '@/content/ui'

const PAPER_ORDER: PaperKind[] = ['international', 'domestic', 'contest', 'campus']

/** Awards are written YY.MM.DD, so newest first is a reverse string sort. */
const newestFirst = <T extends { date: string }>(items: T[]) => [...items].sort((a, b) => b.date.localeCompare(a.date))

function Block({ id, title, count, children }: { id: string; title: L; count?: number; children: ReactNode }) {
  const { t } = useLang()
  return (
    <section id={id} className="archive-block" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`}>
        {t(title)} {count !== undefined && <span className="count mono">{count}</span>}
      </h2>
      {children}
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const { t } = useLang()
  const featured = project.tier === 'featured'
  // Only real screens get a thumbnail here; mockups need their label and stay on the case page.
  const picture = featured ? project.media?.find((m) => m.kind === 'screenshot') : undefined
  return (
    <li className={`archive-card${featured ? ' is-featured' : ''}`}>
      {picture && (
        <div className="archive-card-media">
          <Image src={picture.src} alt={t(picture.alt)} width={picture.width} height={picture.height} sizes="(max-width: 640px) 100vw, 320px" />
        </div>
      )}
      <div className="archive-card-body">
        <p className="archive-card-head">
          <strong>{t(projectName(project))}</strong>
          {project.showcase && <span className="badge badge-accent">{t(SHOWCASE_LABELS[project.showcase])}</span>}
        </p>
        <p className="mono archive-card-period">{project.period}</p>
        <p className="archive-card-summary">{t(project.summary)}</p>
        <p className="mono record-stack">{project.stack.join(' · ')}</p>
        {featured ? (
          <p className="archive-card-link">
            <Link href={`/projects/${project.slug}`}>
              {t(UI.details)} <span aria-hidden="true">→</span>
            </Link>
          </p>
        ) : (
          project.links?.map((link) => (
            <p key={link.href} className="archive-card-link">
              <SmartLink href={link.href}>{t(link.label)}</SmartLink>
            </p>
          ))
        )}
      </div>
    </li>
  )
}

type Props = { archive: Archive; projects: Project[]; stats: Stat[] }

/** Everything on one page: the numbers first, then each record laid out to scan. */
export function ArchiveView({ archive, projects, stats }: Props) {
  const { t } = useLang()
  const years = [...new Set(projects.map((p) => p.years[0]))].sort((a, b) => b - a)
  const top = new Set(archive.topAwards)
  const jumps: { id: string; label: L }[] = [
    { id: 'projects', label: ARCHIVE_HEADINGS.projects },
    { id: 'papers', label: ARCHIVE_HEADINGS.papers },
    { id: 'awards', label: ARCHIVE_HEADINGS.awards },
    { id: 'background', label: ARCHIVE_HEADINGS.background },
    { id: 'activities', label: ARCHIVE_HEADINGS.activities },
  ]
  const { education } = archive

  return (
    <main id="main" className="page archive-page">
      <div className="wrap">
        <header className="page-header">
          <h1>{t(UI.archiveTitle)}</h1>
          <p className="page-lead">{t(UI.archiveLead)}</p>
          <StatTiles stats={stats} label={UI.recordStats} />
          <nav className="jump-chips" aria-label={t(UI.archiveJump)}>
            {jumps.map((jump) => (
              <a key={jump.id} href={`#${jump.id}`}>
                {t(jump.label)}
              </a>
            ))}
          </nav>
        </header>

        <Block id="projects" title={ARCHIVE_HEADINGS.projects} count={projects.length}>
          {years.map((year) => (
            <div key={year} className="year-group">
              <h3 className="year-label mono">{year}</h3>
              <ul className="archive-grid">
                {projects
                  .filter((p) => p.years[0] === year)
                  .map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                  ))}
              </ul>
            </div>
          ))}
        </Block>

        <Block id="papers" title={ARCHIVE_HEADINGS.papers} count={archive.papers.length}>
          <div className="paper-groups">
            {PAPER_ORDER.map((kind) => {
              const papers = archive.papers.filter((paper) => paper.kind === kind)
              if (papers.length === 0) return null
              return (
                <section key={kind} className={`paper-group is-${kind}`} aria-labelledby={`papers-${kind}`}>
                  <h3 id={`papers-${kind}`} className="paper-group-title">
                    {t(PAPER_KINDS[kind])} <span className="count mono">{papers.length}</span>
                  </h3>
                  <ol className="record-rows">
                    {papers.map((paper) => {
                      const title = t({ ko: paper.title, en: paper.titleEn ?? paper.title })
                      return (
                        <li key={`${paper.year}-${paper.title}-${paper.venue.ko}`}>
                          <span className="mono row-date">{paper.year}</span>
                          <div>
                            <p className="row-title">
                              {paper.href ? <SmartLink href={paper.href}>{title}</SmartLink> : title}
                              {paper.authorOrder && (
                                <span className={`badge${paper.authorOrder === 1 ? ' badge-accent' : ''}`}>{t(authorOrderLabel(paper.authorOrder))}</span>
                              )}
                            </p>
                            <p className="muted">{t(paper.venue)}</p>
                          </div>
                        </li>
                      )
                    })}
                  </ol>
                </section>
              )
            })}
          </div>
        </Block>

        <Block id="awards" title={ARCHIVE_HEADINGS.awards} count={archive.awards.length}>
          <ol className="record-rows award-list">
            {newestFirst(archive.awards).map((award) => (
              <li key={`${award.date}-${award.name.ko}`} className={top.has(award.name.ko) ? 'is-top' : undefined}>
                <span className="mono row-date">{award.date}</span>
                <div>
                  <p className="row-title">
                    {t(award.name)}
                    {top.has(award.name.ko) && <span className="badge badge-accent">{t(UI.featuredAward)}</span>}
                    {award.team && <span className="badge">{t(UI.team)}</span>}
                  </p>
                  <p className="muted">{t(award.org)}</p>
                </div>
              </li>
            ))}
          </ol>
        </Block>

        <Block id="background" title={ARCHIVE_HEADINGS.background}>
          <div className="background-grid">
            {archive.experience.map((job) => (
              <div key={job.org.ko} className="background-card">
                <p className="label">{t(ARCHIVE_HEADINGS.experience)}</p>
                <p className="row-title">
                  {t(job.org)} · {t(job.title)}
                </p>
                <p className="muted">
                  <span className="mono">{job.period}</span> · {t(job.context)}
                </p>
              </div>
            ))}
            <div className="background-card">
              <p className="label">{t(ARCHIVE_HEADINGS.education)}</p>
              <p className="row-title">
                {t(education.school)} · {t(education.major)}
              </p>
              <p className="muted">
                <span className="mono">{education.period}</span> · {t(education.note)} · {t(UI.gpa)} {education.gpa}
              </p>
            </div>
            <div className="background-card">
              <p className="label">{t(ARCHIVE_HEADINGS.certs)}</p>
              {archive.certs.map((cert) => (
                <p key={cert.name.ko} className="row-title">
                  {t(cert.name)} <span className="mono muted">{t(cert.detail)}</span>
                </p>
              ))}
            </div>
          </div>
        </Block>

        <Block id="activities" title={ARCHIVE_HEADINGS.activities} count={archive.activities.length}>
          <ul className="activity-grid">
            {archive.activities.map((activity) => (
              <li key={`${activity.period}-${activity.name.ko}`}>
                <p className="row-title">{t(activity.name)}</p>
                <p className="muted">
                  {t(activity.org)} · <span className="mono">{activity.period}</span>
                </p>
                <p className="activity-desc">{t(activity.desc)}</p>
              </li>
            ))}
          </ul>
        </Block>
      </div>
    </main>
  )
}
