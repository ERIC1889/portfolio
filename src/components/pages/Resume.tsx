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
/** Contacts the résumé keeps: email and GitHub; the portfolio address is added separately */
const RESUME_CONTACTS = ['email', 'github']
/** Months from a 'YYYY.MM' start to this month, inclusive */
const monthsSince = (period: string) => {
  const m = period.match(/(\d{4})\.(\d{2})/)
  if (!m) return 0
  const now = new Date()
  return (now.getFullYear() - Number(m[1])) * 12 + (now.getMonth() + 1 - Number(m[2])) + 1
}
/** '2026.01–' → '2026.01 ~ 재직 중'; '2025.09–2026.06' → '2025.09 ~ 2026.06' */
const rangeOf = (period: string, open: string) => {
  const [from, to] = period.split('–')
  return `${from} ~ ${to ? to : open}`
}

/** A titled section with a thick rule: the title, an accent tag beside it, then its entries */
function Section({ title, tag, newPage, children }: { title: L; tag?: ReactNode; newPage?: boolean; children: ReactNode }) {
  const { t } = useLang()
  return (
    <section className={`resume-section${newPage ? ' is-break' : ''}`}>
      <h2 className="resume-section-head">
        <span className="resume-section-title">{t(title)}</span>
        {tag && <span className="resume-section-tag">{tag}</span>}
      </h2>
      {children}
    </section>
  )
}

/** One entry: the period column on the left, the content on the right */
function Entry({ period, sub, title, tags, compact, children }: { period: string; sub?: string; title: ReactNode; tags?: ReactNode[]; compact?: boolean; children?: ReactNode }) {
  return (
    <div className={`resume-entry${compact ? ' is-compact' : ''}`}>
      <div className="resume-entry-period">
        <span className="mono">{period}</span>
        {sub && <span className="resume-entry-sub">{sub}</span>}
      </div>
      <div className="resume-entry-body">
        <p className="resume-entry-title">
          <strong>{title}</strong>
          {tags && tags.length > 0 && (
            <span className="resume-entry-tags">
              {tags.map((tag, i) => (
                <span key={i}>{tag}</span>
              ))}
            </span>
          )}
        </p>
        {children}
      </div>
    </div>
  )
}

/** "학점 | 3.7 / 4.5" style row */
function KV({ label, children }: { label: L; children: ReactNode }) {
  const { t } = useLang()
  return (
    <p className="resume-kv">
      <span className="resume-kv-label">{t(label)}</span>
      <span className="resume-kv-value">{children}</span>
    </p>
  )
}

function Dashes({ items }: { items: L[] }) {
  const { t } = useLang()
  return (
    <ul className="resume-dashes">
      {items.map((item) => (
        <li key={item.ko}>{t(item)}</li>
      ))}
    </ul>
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

export function Resume({ profile, archive, projects, siteUrl, variant }: Props) {
  const { t } = useLang()
  const order = CASE_ORDER as readonly string[]
  const ordered = [...projects].sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug))
  const work = ordered.filter((project) => project.showcase === 'work')
  const own = ordered.filter((project) => project.showcase === 'main')
  const nameOf = (slug?: string) => projects.find((project) => project.slug === slug)?.name
  const job = archive.experience[0]
  const linked = work.find((project) => project.slug === job?.project)
  const site = linked?.links?.find((link) => link.kind === 'site')?.href
  const months = job ? monthsSince(job.period) : 0
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
  const count = (n: number, unit: L) => t({ ko: `${n}${unit.ko}`, en: `${n}${unit.en}` })
  const monthsText = t({ ko: `${months}${UI.resumeMonths.ko}`, en: `${months}${UI.resumeMonths.en}` })
  return (
    <main id="main" className="page resume">
      <div className="wrap narrow">
        <p className="resume-actions no-print">
          <a href="/resume.pdf" className="btn btn-primary" download>
            {t(UI.resumePdf)}
          </a>
        </p>

        {variant.applying && (
          <p className="resume-apply">
            <span>
              {t(UI.resumeApplyField)} : {t(variant.applying.field)}
            </span>
            {variant.applying.date && (
              <span>
                {t(UI.resumeApplyDate)} : {variant.applying.date}
              </span>
            )}
          </p>
        )}

        <header className="resume-head">
          <div className="resume-head-text">
            <h1 className="resume-name-line">
              <span className="resume-name">{t(profile.name)}</span>
              <span className="resume-badge">{t(variant.role ?? profile.role)}</span>
            </h1>
            <p className="resume-tagline">{t(profile.quote).replace('\n', ' ')}</p>
            <dl className="resume-contacts">
              {contacts.map((contact) => (
                <div key={contact.kind}>
                  <dt>{t(contact.label)}</dt>
                  <dd>
                    <a href={contact.href}>{contact.value}</a>
                  </dd>
                </div>
              ))}
              {variant.phone && (
                <div>
                  <dt>{t(UI.resumePhone)}</dt>
                  <dd>
                    <a href={`tel:${variant.phone.replace(/[^+\d]/g, '')}`}>{variant.phone}</a>
                  </dd>
                </div>
              )}
              <div>
                <dt>{t(UI.resumeSite)}</dt>
                <dd>
                  <a href={siteUrl}>{host(siteUrl)}</a>
                </dd>
              </div>
            </dl>
          </div>
          {variant.photo ? (
            <img className="resume-photo" src={variant.photo} alt={t(UI.resumePhotoAlt)} width={96} height={128} />
          ) : (
            <div className="resume-photo is-placeholder" aria-hidden="true">
              {t(UI.resumePhotoSlot)}
            </div>
          )}
        </header>

        <ul className="resume-cards">
          <li>
            <span className="resume-card-label">{t(UI.resumeCardEducation)}</span>
            <strong>{t(archive.education.school)}</strong>
            <span className="resume-card-sub">
              {t(UI.resumeUniversity)} {t(UI.resumeGraduating)}
            </span>
          </li>
          {job && (
            <li>
              <span className="resume-card-label">{t(UI.resumeCardCareer)}</span>
              <strong>{t(job.org).replace(/\s*\(.*\)$/, '')}</strong>
              <span className="resume-card-sub">
                {t(job.title)} · {t(UI.resumeTotal)} {monthsText}
              </span>
            </li>
          )}
          <li>
            <span className="resume-card-label">{t(UI.resumeCardRecord)}</span>
            <strong>
              {count(archive.awards.length, UI.resumeItems)} · {count(archive.papers.length, UI.resumePaperUnit)}
            </strong>
            <span className="resume-card-sub">
              {t({ ko: `국제 논문 ${counts.international}편 · 1저자 ${counts.firstAuthor}편`, en: `${counts.international} international · ${counts.firstAuthor} first-author` })}
            </span>
          </li>
          {variant.service ? (
            <li>
              <span className="resume-card-label">{t(UI.resumeCardService)}</span>
              <strong className="resume-service">{t(variant.service)}</strong>
            </li>
          ) : (
            <li>
              <span className="resume-card-label">{t(UI.resumeCardActivities)}</span>
              <strong>{count(archive.activities.length, UI.resumeItems)}</strong>
              <span className="resume-card-sub">{t({ ko: `프로젝트 ${projects.length}개`, en: `${projects.length} projects` })}</span>
            </li>
          )}
          <li>
            <span className="resume-card-label">{t(UI.resumeCardPortfolio)}</span>
            <strong className="resume-card-link">
              <a href={siteUrl}>{host(siteUrl)}</a>
            </strong>
            <span className="resume-card-sub">
              <a href={archiveUrl}>{t({ ko: '전체 기록', en: 'Full record' })}</a>
            </span>
          </li>
        </ul>

        <section className="resume-skillbox">
          <h2>{t(RESUME_SECTIONS.skills)}</h2>
          <ul className="resume-chips">
            {variant.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>

        <Section title={RESUME_SECTIONS.education} tag={`${t(UI.resumeUniversity)} ${t(UI.resumeGraduating)}`}>
          <Entry period={rangeOf(archive.education.period, t(UI.resumeGraduating))} sub={t(UI.resumeGraduating)} title={t(archive.education.school)} tags={[t(archive.education.major)]}>
            <KV label={UI.gpa}>{archive.education.gpa}</KV>
            <KV label={UI.resumeTrack}>{t(archive.education.note).replace(/^졸업 예정 · |^Expected graduation · /, '')}</KV>
          </Entry>
        </Section>

        {job && (
          <Section title={RESUME_SECTIONS.career} tag={`${t(UI.resumeTotal)} ${monthsText}`}>
            <Entry
              period={rangeOf(job.period, t(UI.resumeWorking))}
              sub={monthsText}
              title={t(job.org)}
              tags={[t(job.title), t(job.context), ...(site ? [<a key="site" href={site}>{host(site)}</a>] : [])]}
            >
              {linked && <p className="resume-entry-lead">{t(linked.summary)}</p>}
              <Dashes items={job.responsibilities} />
              {linked && <KV label={UI.resumeEnv}>{(linked.resumeStack ?? linked.stack).join(' · ')}</KV>}
            </Entry>
          </Section>
        )}

        <Section title={RESUME_SECTIONS.projects} tag={t({ ko: `${own.length}개`, en: `${own.length}` })}>
          {own.map((project) => {
            const repo = project.links?.find((link) => link.kind === 'code')?.href
            const first = project.cases?.[0]
            const problem = leadOf(first?.problem)
            const action = leadOf(first?.action)
            const results = project.resumeItems ?? (project.results ?? []).slice(0, 2)
            const tags = [project.team, project.role].flatMap((part) => (part ? [t(part)] : []))
            return (
              <Entry
                key={project.slug}
                period={project.period.replace('–', ' ~ ')}
                sub={project.status && t(project.status)}
                title={t(projectTitle(project))}
                tags={[...tags, ...(repo ? [<a key="repo" href={repo} className="resume-repo">{host(repo)}</a>] : [])]}
              >
                <p className="resume-entry-lead">{t(project.product ?? project.summary)}</p>
                {first && problem && action && (
                  <KV label={UI.resumeSolve}>
                    <span className="resume-solve">
                      <strong>{t(first.title)}</strong> — {t(problem)} → {t(action)}
                    </span>
                  </KV>
                )}
                <Dashes items={results} />
                <KV label={UI.resumeEnv}>{(project.resumeStack ?? project.stack).join(' · ')}</KV>
              </Entry>
            )
          })}
        </Section>

        <Section title={RESUME_SECTIONS.awards} tag={`${t(UI.resumeTotal)} ${count(archive.awards.length, UI.resumeItems)}`}>
          {awards.map((award) => {
            const name = nameOf(award.project)
            return <Entry key={`${award.date}-${award.name.ko}`} period={startOf(award.date)} title={t(award.name)} tags={[...(name ? [name] : []), t(award.org)]} compact />
          })}
          {moreAwards > 0 && (
            <p className="resume-more">
              <strong>{t({ ko: `외 ${moreAwards}건`, en: `and ${moreAwards} more` })}</strong>
              <span className="muted">
                {' · '}
                <a href={archiveUrl}>{host(archiveUrl)}</a>
              </span>
            </p>
          )}
        </Section>

        <Section
          title={RESUME_SECTIONS.experiences}
          tag={`${t(UI.resumeTotal)} ${count(archive.activities.length, UI.resumeItems)} · ${t(UI.resumePaperList)} ${count(archive.papers.length, UI.resumePaperUnit)}`}
        >
          {activities.map((activity) => (
            <Entry key={activity.name.ko} period={activity.period} title={t(activity.name)} tags={[t(activity.org)]} compact>
              <p className="resume-entry-note">{t(activity.desc)}</p>
            </Entry>
          ))}
          <h3 className="resume-subhead">
            {t(UI.resumePaperList)}
            <span className="resume-section-tag">
              {t({
                ko: `학술대회 ${counts.conference}편 (국제 ${counts.international} · 1저자 ${counts.firstAuthor}) · 공모전·교내 ${archive.papers.length - counts.conference}편`,
                en: `${counts.conference} conference (${counts.international} international · ${counts.firstAuthor} first-author) · ${archive.papers.length - counts.conference} contest and campus`,
              })}
            </span>
          </h3>
          {papers.map((paper) => (
            <Entry
              key={`${paper.year}-${paper.title}`}
              period={String(paper.year)}
              title={t({ ko: paper.title, en: paper.titleEn ?? paper.title })}
              tags={[t(paper.venue), ...(paper.kind === 'international' ? [t(PAPER_KINDS[paper.kind])] : []), ...(paper.authorOrder ? [t(authorOrderLabel(paper.authorOrder))] : [])]}
              compact
            />
          ))}
          {morePapers > 0 && (
            <p className="resume-more">
              <strong>{t({ ko: `외 ${morePapers}편`, en: `and ${morePapers} more` })}</strong>
            </p>
          )}
        </Section>

        <Section title={RESUME_SECTIONS.intro} newPage>
          <div className="resume-statement">
            <Paragraphs items={[profile.intro, ...variant.summary]} />
            {variant.motivation && variant.motivation.length > 0 && (
              <div className="resume-motivation">
                <h3 className="resume-subhead">{t(UI.resumeMotivation)}</h3>
                <Paragraphs items={variant.motivation} />
              </div>
            )}
          </div>
        </Section>
      </div>
    </main>
  )
}
