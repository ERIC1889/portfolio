'use client'

import type { ReactNode } from 'react'
import { useLang } from '@/components/providers/LanguageProvider'
import { CASE_ORDER, projectTitle, selectPaperCounts } from '@/content/select'
import type { Archive, Case, L, PaarStep, Profile, Project, ResumeVariant } from '@/content/types'
import { PAPER_KINDS, RESUME_SECTIONS, UI, authorOrderLabel } from '@/content/ui'

type Props = { profile: Profile; archive: Archive; projects: Project[]; siteUrl: string; variant: ResumeVariant }

/** '24.10.24 ~ 24.10.27' → '24.10.24'; YY.MM.DD strings sort correctly as text */
const startOf = (range: string) => range.split('~')[0].trim()
const host = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '')
const newestFirst = <T,>(items: T[], key: (item: T) => string) => [...items].sort((a, b) => startOf(key(b)).localeCompare(startOf(key(a))))
/** A PAAR step's bold lead, or its first sentence when it has none */
const leadOf = (step?: PaarStep): L | undefined => step?.lead ?? step?.body[0]

/** Numbered section; the number comes from a CSS counter so the heading text stays clean. `breakBefore` starts a new printed page. */
function Part({ title, breakBefore, children }: { title: L; breakBefore?: boolean; children: ReactNode }) {
  const { t } = useLang()
  return (
    <section className={`resume-part${breakBefore ? ' is-break' : ''}`}>
      <h2>{t(title)}</h2>
      {children}
    </section>
  )
}

function Count({ n, unit }: { n: number; unit: L }) {
  const { t } = useLang()
  return <span className="resume-count">{t({ ko: `${n}${unit.ko}`, en: `${n}${unit.en}` })}</span>
}

const ITEMS: L = { ko: '건', en: '' }
const PAPERS: L = { ko: '편', en: '' }

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

/** One row per problem-solving case: its title, then the bold leads of the problem, the action and the result */
function CaseTable({ cases }: { cases: Case[] }) {
  const { t } = useLang()
  const text = (step?: PaarStep) => {
    const lead = leadOf(step)
    return lead ? t(lead) : ''
  }
  return (
    <table className="resume-cases">
      <thead>
        <tr>
          <th scope="col">{t(UI.resumeCase)}</th>
          <th scope="col">{t(UI.resumeProblem)}</th>
          <th scope="col">{t(UI.resumeAction)}</th>
          <th scope="col">{t(UI.resumeOutcome)}</th>
        </tr>
      </thead>
      <tbody>
        {cases.map((item) => (
          <tr key={item.title.ko}>
            <th scope="row">{t(item.title)}</th>
            <td>{text(item.problem)}</td>
            <td>{text(item.action)}</td>
            <td>{text(item.result)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

/** A project told by its problems and results: the main projects get two cases and every result, the supporting ones one case and two results */
function ProjectEntry({ project, siteUrl, compact }: { project: Project; siteUrl: string; compact?: boolean }) {
  const { t } = useLang()
  const repo = project.links?.find((link) => link.kind === 'code')?.href
  const meta = [project.team, project.role].flatMap((part) => (part ? [t(part)] : [])).join(' · ')
  const cases = (project.cases ?? []).slice(0, compact ? 1 : 2)
  const results = (project.results ?? []).slice(0, compact ? 2 : 3)
  const text = (step?: PaarStep) => {
    const lead = leadOf(step)
    return lead ? t(lead) : ''
  }
  return (
    <div className={`resume-item resume-project${compact ? ' is-compact' : ''}`}>
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
      {!compact && <p className="resume-product">{t(project.product ?? project.summary)}</p>}
      {cases.length > 0 && !compact && (
        <>
          <h4 className="resume-h4">{t(UI.resumeCases)}</h4>
          <CaseTable cases={cases} />
        </>
      )}
      {cases.length > 0 && compact && (
        <p className="resume-case-line">
          <strong>{t(cases[0].title)}</strong> — {t(UI.resumeProblem)}: {text(cases[0].problem)} → {t(UI.resumeAction)}: {text(cases[0].action)} → {t(UI.resumeOutcome)}:{' '}
          {text(cases[0].result)}
        </p>
      )}
      {results.length > 0 && (
        <>
          <h4 className="resume-h4">{t(UI.resumeResults)}</h4>
          <ul className="resume-bullets">
            {results.map((item) => (
              <li key={item.ko}>{t(item)}</li>
            ))}
          </ul>
        </>
      )}
      <p className="mono resume-stack">{(project.resumeStack ?? project.stack).join(' · ')}</p>
    </div>
  )
}

export function Resume({ profile, archive, projects, siteUrl, variant }: Props) {
  const { t } = useLang()
  // Work goes under 경력; the main projects are told in full and the supporting ones briefly
  const order = CASE_ORDER as readonly string[]
  const ordered = [...projects].sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug))
  const work = ordered.filter((project) => project.showcase === 'work')
  const own = ordered.filter((project) => project.showcase === 'main')
  const supporting = ordered.filter((project) => project.showcase === 'supporting')
  const nameOf = (slug?: string) => projects.find((project) => project.slug === slug)?.name
  const conference = archive.papers.filter((paper) => paper.kind === 'international' || paper.kind === 'domestic')
  const counts = selectPaperCounts(archive.papers)
  const otherPapers = archive.papers.length - conference.length
  // Every award and activity, newest first; the three people-facing activities go under 기타 경력 및 경험
  const awards = newestFirst(archive.awards, (award) => award.date)
  const others = variant.otherExperiences.flatMap((name) => archive.activities.filter((activity) => activity.name.ko === name))
  const activities = newestFirst(
    archive.activities.filter((activity) => !variant.otherExperiences.includes(activity.name.ko)),
    (activity) => activity.period,
  )
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

        <Part title={RESUME_SECTIONS.intro}>
          <Paragraphs items={[profile.intro, ...variant.summary]} />
          {variant.motivation && variant.motivation.length > 0 && (
            <div className="resume-group resume-motivation">
              <h3>{t(UI.resumeMotivation)}</h3>
              <Paragraphs items={variant.motivation} />
            </div>
          )}
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
                  <>
                    <h4 className="resume-h4">{t(UI.resumeResults)}</h4>
                    <ul className="resume-bullets">
                      {job.responsibilities.map((item) => (
                        <li key={item.ko}>{t(item)}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )
          })}
        </Part>

        <Part title={RESUME_SECTIONS.projects}>
          {own.map((project) => (
            <ProjectEntry key={project.slug} project={project} siteUrl={siteUrl} />
          ))}
          {supporting.length > 0 && (
            <>
              <h3 className="resume-sub">{t(UI.resumeSupporting)}</h3>
              {supporting.map((project) => (
                <ProjectEntry key={project.slug} project={project} siteUrl={siteUrl} compact />
              ))}
            </>
          )}
        </Part>

        <Part title={RESUME_SECTIONS.activities}>
          <div className="resume-group">
            <h3>
              {t(UI.resumeAwards)} <Count n={awards.length} unit={ITEMS} />
            </h3>
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
          </div>
          <div className="resume-group">
            <h3>
              {t(UI.papers)} <Count n={archive.papers.length} unit={PAPERS} />
            </h3>
            <p className="resume-meta">
              {t({
                ko: `학술대회 논문 ${counts.conference}편 (국제 ${counts.international}편 · 1저자 ${counts.firstAuthor}편) · 공모전·교내 발표 ${otherPapers}편`,
                en: `${counts.conference} conference papers (${counts.international} international · ${counts.firstAuthor} first-author) · ${otherPapers} contest and campus papers`,
              })}
            </p>
            <ul className="resume-rows">
              {conference.map((paper) => (
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
          </div>
          <div className="resume-group">
            <h3>
              {t(UI.resumeActivities)} <Count n={activities.length} unit={ITEMS} />
            </h3>
            <ul className="resume-rows resume-activities">
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
