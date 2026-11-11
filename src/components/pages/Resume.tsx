'use client'

import type { ReactNode } from 'react'
import { useLang } from '@/components/providers/LanguageProvider'
import { CASE_ORDER, projectTitle, selectPaperCounts } from '@/content/select'
import type { Archive, L, PaarStep, Profile, Project, ResumeVariant } from '@/content/types'
import { PAPER_KINDS, RESUME_SECTIONS, UI, authorOrderLabel } from '@/content/ui'

type Props = { profile: Profile; archive: Archive; projects: Project[]; siteUrl: string; variant: ResumeVariant }

/** '24.10.24 ~ 24.10.27' → '24.10.24'; YY.MM.DD strings sort correctly as text */
const startOf = (range: string) => range.split('~')[0].trim()
const host = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '')
const newestFirst = <T,>(items: T[], key: (item: T) => string) => [...items].sort((a, b) => startOf(key(b)).localeCompare(startOf(key(a))))
/** A PAAR step's bold lead, or its first sentence when it has none */
const leadOf = (step?: PaarStep): L | undefined => step?.lead ?? step?.body[0]
/** Contacts the résumé keeps: email, GitHub and the portfolio; the blog and LinkedIn stay on the site */
const RESUME_CONTACTS = ['email', 'github']

/** Numbered section; the number comes from a CSS counter so the heading text stays clean. `newPage` starts it on a fresh printed page. */
function Part({ title, newPage, children }: { title: L; newPage?: boolean; children: ReactNode }) {
  const { t } = useLang()
  return (
    <section className={`resume-part${newPage ? ' is-break' : ''}`}>
      <h2>{t(title)}</h2>
      {children}
    </section>
  )
}

function Head({ title, period }: { title: ReactNode; period: string }) {
  return (
    <p className="resume-item-head">
      <span className="resume-item-title">{title}</span> <span className="mono resume-period">{period}</span>
    </p>
  )
}

/** Labelled rows under an entry: 내용 · 개발 환경 · 문제 해결 · 결과 */
function Row({ label, children }: { label: L; children: ReactNode }) {
  const { t } = useLang()
  return (
    <div className="resume-kv-row">
      <dt>{t(label)}</dt>
      <dd>{children}</dd>
    </div>
  )
}

function Paragraphs({ items }: { items: L[] }) {
  const { t } = useLang()
  return (
    <div className="resume-prose">
      {items.map((item) => (
        <p key={item.ko}>{t(item).replace(/\n/g, ' ')}</p>
      ))}
    </div>
  )
}

/** A main project: what it is, the stack, one problem and how it was solved, and the two result lines the site keeps for the résumé */
function ProjectEntry({ project }: { project: Project }) {
  const { t } = useLang()
  const repo = project.links?.find((link) => link.kind === 'code')?.href
  const meta = [project.team, project.role].flatMap((part) => (part ? [t(part)] : [])).join(' · ')
  const first = project.cases?.[0]
  const problem = leadOf(first?.problem)
  const action = leadOf(first?.action)
  const results = project.resumeItems ?? (project.results ?? []).slice(0, 2)
  return (
    <div className="resume-item resume-project">
      <Head
        title={
          <>
            <strong>{t(projectTitle(project))}</strong>
            {project.status && <span className="resume-status">{t(project.status)}</span>}
          </>
        }
        period={project.period}
      />
      <p className="muted resume-meta">
        {meta}
        {repo && (
          <>
            {' · '}
            <a href={repo} className="mono resume-repo">
              {host(repo)}
            </a>
          </>
        )}
      </p>
      <dl className="resume-kv">
        <Row label={UI.resumeContent}>{t(project.product ?? project.summary)}</Row>
        <Row label={UI.resumeEnv}>{(project.resumeStack ?? project.stack).join(' · ')}</Row>
        {first && problem && action && (
          <Row label={UI.resumeSolve}>
            <span className="resume-solve">
              <strong>{t(first.title)}</strong> — {t(problem)} → {t(action)}
            </span>
          </Row>
        )}
        {results.length > 0 && (
          <Row label={UI.resumeResult}>
            <ul className="resume-bullets">
              {results.map((item) => (
                <li key={item.ko}>{t(item)}</li>
              ))}
            </ul>
          </Row>
        )}
      </dl>
    </div>
  )
}

export function Resume({ profile, archive, projects, siteUrl, variant }: Props) {
  const { t } = useLang()
  const order = CASE_ORDER as readonly string[]
  const ordered = [...projects].sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug))
  const work = ordered.filter((project) => project.showcase === 'work')
  const own = ordered.filter((project) => project.showcase === 'main')
  const nameOf = (slug?: string) => projects.find((project) => project.slug === slug)?.name
  const counts = selectPaperCounts(archive.papers)
  const awards = newestFirst(
    variant.topAwards.flatMap((name) => archive.awards.filter((award) => award.name.ko === name)),
    (award) => award.date,
  )
  const papers = variant.topPapers.flatMap((title) => archive.papers.filter((paper) => paper.title === title))
  const activities = newestFirst(archive.activities, (activity) => activity.period)
  const archiveUrl = `${siteUrl}/archive`
  const contacts = profile.contacts.filter((contact) => RESUME_CONTACTS.includes(contact.kind))
  const moreAwards = archive.awards.length - awards.length
  const morePapers = archive.papers.length - papers.length
  return (
    <main id="main" className="page resume">
      <div className="wrap narrow">
        <p className="resume-actions no-print">
          <a href="/resume.pdf" className="btn btn-primary" download>
            {t(UI.resumePdf)}
          </a>
        </p>

        <header className="resume-head">
          <div className="resume-head-text">
            <p className="resume-title">{t(profile.quote).replace('\n', ' ')}</p>
            <h1 className="resume-role">
              {t(variant.role ?? profile.role)} <span className="resume-name">{t(profile.name)}</span>
            </h1>
          </div>
          {variant.photo ? (
            <img className="resume-photo" src={variant.photo} alt={t(UI.resumePhotoAlt)} width={96} height={128} />
          ) : (
            <div className="resume-photo is-placeholder" aria-hidden="true">
              {t(UI.resumePhotoSlot)}
            </div>
          )}
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
              <div>
                <dt>{t(UI.resumeService)}</dt>
                <dd className="resume-service">{t(variant.service)}</dd>
              </div>
            )}
          </dl>
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
                </p>
                <dl className="resume-kv">
                  {linked && <Row label={UI.resumeContent}>{t(linked.summary)}</Row>}
                  {linked && (
                    <Row label={UI.resumeEnv}>{(linked.resumeStack ?? linked.stack).join(' · ')}</Row>
                  )}
                  {job.responsibilities.length > 0 && (
                    <Row label={UI.resumeCareerResults}>
                      <ul className="resume-bullets">
                        {job.responsibilities.map((item) => (
                          <li key={item.ko}>{t(item)}</li>
                        ))}
                      </ul>
                    </Row>
                  )}
                </dl>
              </div>
            )
          })}
        </Part>

        <Part title={RESUME_SECTIONS.projects}>
          {own.map((project) => (
            <ProjectEntry key={project.slug} project={project} />
          ))}
        </Part>

        <Part title={RESUME_SECTIONS.awards}>
          <ul className="resume-rows">
            {awards.map((award) => {
              const name = nameOf(award.project)
              return (
                <li key={`${award.date}-${award.name.ko}`}>
                  <span>
                    {t(award.name)}
                    {name && ` (${name})`} — {t(award.org)}
                  </span>{' '}
                  <span className="mono resume-date">{startOf(award.date)}</span>
                </li>
              )
            })}
          </ul>
          {moreAwards > 0 && (
            <p className="resume-more">
              <strong>{t({ ko: `외 ${moreAwards}건`, en: `and ${moreAwards} more` })}</strong>
              <span className="muted">
                {' · '}
                {t({ ko: '전체 기록 ', en: 'full record ' })}
                <a href={archiveUrl}>{host(archiveUrl)}</a>
              </span>
            </p>
          )}
        </Part>

        <Part title={RESUME_SECTIONS.experiences}>
          <div className="resume-group">
            <h3>{t(UI.resumeActivityList)}</h3>
            <ul className="resume-rows resume-activities">
              {activities.map((activity) => (
                <li key={activity.name.ko}>
                  <span>
                    <strong>{t(activity.name)}</strong>
                    <span className="resume-activity-org"> · {t(activity.org)}</span>
                  </span>{' '}
                  <span className="mono resume-date">{activity.period}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="resume-group">
            <h3>{t(UI.resumePaperList)}</h3>
            <p className="resume-meta">
              {t({
                ko: `학술대회 논문 ${counts.conference}편 (국제 ${counts.international}편 · 1저자 ${counts.firstAuthor}편) · 공모전·교내 발표 ${archive.papers.length - counts.conference}편`,
                en: `${counts.conference} conference papers (${counts.international} international · ${counts.firstAuthor} first-author) · ${archive.papers.length - counts.conference} contest and campus papers`,
              })}
            </p>
            <ul className="resume-rows">
              {papers.map((paper) => (
                <li key={`${paper.year}-${paper.title}`}>
                  <span>
                    {t({ ko: paper.title, en: paper.titleEn ?? paper.title })} — {t(paper.venue)}
                    {paper.kind === 'international' && ` · ${t(PAPER_KINDS[paper.kind])}`}
                    {paper.authorOrder && ` · ${t(authorOrderLabel(paper.authorOrder))}`}
                  </span>{' '}
                  <span className="mono resume-date">{paper.year}</span>
                </li>
              ))}
            </ul>
            {morePapers > 0 && (
              <p className="resume-more">
                <strong>{t({ ko: `외 ${morePapers}편`, en: `and ${morePapers} more` })}</strong>
              </p>
            )}
          </div>
        </Part>

        <Part title={RESUME_SECTIONS.intro} newPage>
          <Paragraphs items={[profile.intro, ...variant.summary]} />
          {variant.motivation && variant.motivation.length > 0 && (
            <div className="resume-group resume-motivation">
              <h3>{t(UI.resumeMotivation)}</h3>
              <Paragraphs items={variant.motivation} />
            </div>
          )}
        </Part>
      </div>
    </main>
  )
}
