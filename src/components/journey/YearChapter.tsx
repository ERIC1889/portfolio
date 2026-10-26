'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { useLang } from '@/components/providers/LanguageProvider'
import { PageNav } from '@/components/shell/PageNav'
import type { Chapter, Project, Year } from '@/content/types'
import { projectName } from '@/content/select'
import { UI } from '@/content/ui'
import { ProjectCard } from './ProjectCard'
import { ProjectLine } from './ProjectLine'
import { YearSwitcher } from './YearSwitcher'

type YearChapterProps = {
  chapter: Chapter
  years: Year[]
  featured: Project[]
  cards: Project[]
  lines: Project[]
  prevYear?: Year
  nextYear?: Year
  variant?: 'page' | 'modal'
}

export function YearChapter({ chapter, years, featured, cards, lines, prevYear, nextYear, variant = 'page' }: YearChapterProps) {
  const { t } = useLang()
  const inModal = variant === 'modal'
  const Root = inModal ? 'div' : 'main'

  // A popup is its own scroll container, so jump to "#slug" (from a throughline card) by hand.
  useEffect(() => {
    if (!inModal) return
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (id) document.getElementById(id)?.scrollIntoView({ block: 'start' })
  }, [inModal])

  return (
    <Root className={inModal ? 'year-page in-modal' : 'year-page'}>
      <section className="sec year-hero">
        <div className="sec-inner">
          <YearSwitcher years={years} current={chapter.year} mode={inModal ? 'replace' : 'hard'} />
          <p className="mono log-cmd">
            <span className="term-prompt">$</span> git show {chapter.year}
          </p>
          <h1 className="year-title">
            <span className="mono log-year">{chapter.year}</span> {t(chapter.name)}
          </h1>
          <p className="year-lesson">{t(chapter.lesson)}</p>
          <article className="glass year-essay">
            {chapter.essay.map((paragraph, i) => (
              <p key={i}>{t(paragraph)}</p>
            ))}
          </article>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="case-section">
          <div className="sec-inner">
            <div className="case-section-head">
              <h2>{t(UI.yearFeatured)}</h2>
            </div>
            <div className="year-featured-list">
              {featured.map((project) => (
                <Link key={project.slug} href={`/projects/${project.slug}`} replace={inModal} className="glass year-featured">
                  <span className="project-name">{t(projectName(project))}</span>
                  <span className="project-summary">{t(project.question ?? project.summary)}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {cards.length > 0 && (
        <section className="case-section">
          <div className="sec-inner">
            <div className="case-section-head">
              <h2>{t(UI.yearCards)}</h2>
            </div>
            <div className="year-cards">
              {cards.map((project) => (
                <ProjectCard key={project.slug} project={project} year={chapter.year} />
              ))}
            </div>
          </div>
        </section>
      )}

      {lines.length > 0 && (
        <section className="case-section">
          <div className="sec-inner">
            <div className="case-section-head">
              <h2>{t(UI.yearLines)}</h2>
            </div>
            <ul className="year-lines">
              {lines.map((project) => (
                <ProjectLine key={project.slug} project={project} />
              ))}
            </ul>
          </div>
        </section>
      )}

      <PageNav
        prev={prevYear && { href: `/journey/${prevYear}`, label: String(prevYear) }}
        center={inModal ? undefined : { href: '/', label: UI.home }}
        next={nextYear && { href: `/journey/${nextYear}`, label: String(nextYear) }}
        mode={inModal ? 'replace' : 'hard'}
      />
    </Root>
  )
}
