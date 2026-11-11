'use client'

import type { ReactNode } from 'react'
import { useLang } from '@/components/providers/LanguageProvider'
import { CASE_ORDER, projectTitle, selectPaperCounts } from '@/content/select'
import type { Archive, L, Profile, Project, ResumeVariant } from '@/content/types'
import { PAPER_KINDS, RESUME_SECTIONS, UI, authorOrderLabel } from '@/content/ui'

type Props = { profile: Profile; archive: Archive; projects: Project[]; siteUrl: string; variant: ResumeVariant }

/** '24.10.24 ~ 24.10.27' → '24.10.24'; YY.MM.DD strings sort correctly as text */
const startOf = (range: string) => range.split('~')[0].trim()
const host = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '')
const newestFirst = <T,>(items: T[], key: (item: T) => string) => [...items].sort((a, b) => startOf(key(b)).localeCompare(startOf(key(a))))

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

/** "외 8건 · 전체 기록 …" under a shortened list */
function More({ count, unit, href }: { count: number; unit: L; href: string }) {
  const { t } = useLang()
  if (count <= 0) return null
  return (
    <p className="muted resume-meta resume-more">
      {t({ ko: `외 ${count}${unit.ko} · 전체 기록 `, en: `and ${count} more${unit.en} · full record ` })}
      <a href={href}>{host(href)}</a>
    </p>
  )
}

const ITEMS: L = { ko: '건', en: '' }
const PAPERS: L = { ko: '편', en: '' }

/** A main project in a few lines: what it is, the two result-bearing bullets the site keeps for the résumé, and the stack */
function ProjectEntry({ project }: { project: Project }) {
  const { t } = useLang()
  const repo = project.links?.find((link) => link.kind === 'code')?.href
  const meta = [project.team, project.role].flatMap((part) => (part ? [t(part)] : [])).join(' · ')
  const bullets = project.resumeItems ?? (project.results ?? []).slice(0, 2)
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
      <p className="resume-product">{t(project.product ?? project.summary)}</p>
      {bullets.length > 0 && (
        <ul className="resume-bullets">
          {bullets.map((item) => (
            <li key={item.ko}>{t(item)}</li>
          ))}
        </ul>
      )}
      <p className="mono resume-stack">{(project.resumeStack ?? project.stack).join(' · ')}</p>
    </div>
  )
}

export function Resume({ profile, archive, projects, siteUrl, variant }: Props) {
  const { t } = useLang()
  const order = CASE_ORDER as readonly string[]
  const ordered = [...projects].sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug))
  // Work goes under 경력; the main projects get a few lines each and the supporting ones a line
  const work = ordered.filter((project) => project.showcase === 'work')
  const own = ordered.filter((project) => project.showcase === 'main')
  const supporting = ordered.filter((project) => project.showcase === 'supporting')
  const nameOf = (slug?: string) => projects.find((project) => project.slug === slug)?.name
  const counts = selectPaperCounts(archive.papers)
  const conference = archive.papers.filter((paper) => paper.kind === 'international' || paper.kind === 'domestic')
  const awards = newestFirst(
    variant.topAwards.flatMap((name) => archive.awards.filter((award) => award.name.ko === name)),
    (award) => award.date,
  )
  const papers = variant.topPapers.flatMap((title) => archive.papers.filter((paper) => paper.title === title))
  const activities = newestFirst(archive.activities, (activity) => activity.period)
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
              <div className="is-wide">
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
                {linked?.products && linked.products.length > 0 && (
                  <p className="resume-products">
                    <span className="resume-products-label">{t(UI.resumeProducts)}</span>{' '}
                    {linked.products.map((product, i) => (
                      <span key={product.id}>
                        {i > 0 && ' · '}
                        <strong>{t(product.name)}</strong> ({t(product.status)} · {t(product.role)})
                      </span>
                    ))}
                  </p>
                )}
                {job.responsibilities.length > 0 && (
                  <ul className="resume-bullets">
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
          {own.map((project) => (
            <ProjectEntry key={project.slug} project={project} />
          ))}
          {supporting.length > 0 && (
            <div className="resume-group">
              <h3>{t(UI.resumeSupporting)}</h3>
              <ul className="resume-rows resume-supporting">
                {supporting.map((project) => (
                  <li key={project.slug}>
                    <span>
                      <strong>{t(projectTitle(project))}</strong> — {t(project.product ?? project.summary)}
                    </span>{' '}
                    <span className="mono resume-date">{project.period}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
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
                  <span className="mono resume-date">{award.date}</span>
                </li>
              )
            })}
          </ul>
          <More count={archive.awards.length - awards.length} unit={ITEMS} href={archiveUrl} />
        </Part>

        <Part title={RESUME_SECTIONS.papers}>
          <p className="resume-meta">
            {t({
              ko: `학술대회 논문 ${counts.conference}편 (국제 ${counts.international}편 · 1저자 ${counts.firstAuthor}편) · 공모전·교내 발표 ${archive.papers.length - conference.length}편`,
              en: `${counts.conference} conference papers (${counts.international} international · ${counts.firstAuthor} first-author) · ${archive.papers.length - conference.length} contest and campus papers`,
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
          <More count={archive.papers.length - papers.length} unit={PAPERS} href={archiveUrl} />
        </Part>

        <Part title={RESUME_SECTIONS.activities}>
          <ul className="resume-activities">
            {activities.map((activity) => (
              <li key={activity.name.ko}>
                <p className="resume-item-head">
                  <span className="resume-item-title">
                    <strong>{t(activity.name)}</strong> · {t(activity.org)}
                  </span>{' '}
                  <span className="mono resume-period">{activity.period}</span>
                </p>
                <p className="resume-activity-desc">{t(activity.desc)}</p>
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

        <Part title={RESUME_SECTIONS.intro}>
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
