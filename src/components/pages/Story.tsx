'use client'

import Link from 'next/link'
import { useLang } from '@/components/providers/LanguageProvider'
import { projectName } from '@/content/select'
import type { Chapter, Project } from '@/content/types'
import { UI } from '@/content/ui'

export type StoryYear = { chapter: Chapter; featured: Project[]; cards: Project[]; lines: Project[] }

/** The four years on one page; /journey/{year} redirects to #y{year}. */
export function Story({ years }: { years: StoryYear[] }) {
  const { t } = useLang()
  return (
    <main id="main" className="page">
      <div className="wrap narrow">
        <header className="page-header">
          <h1>{t(UI.storyTitle)}</h1>
          <p className="page-lead">{t(UI.storyLead)}</p>
          <nav className="year-jump" aria-label={t(UI.storyYears)}>
            {years.map(({ chapter }) => (
              <a key={chapter.year} href={`#y${chapter.year}`} className="mono">
                {chapter.year}
              </a>
            ))}
          </nav>
        </header>
        <ol className="timeline">
          {years.map(({ chapter, featured, cards, lines }) => (
            <li key={chapter.year} id={`y${chapter.year}`} className="timeline-year">
              <section aria-labelledby={`y${chapter.year}-title`}>
                <p className="mono timeline-num">{chapter.year}</p>
                <h2 id={`y${chapter.year}-title`}>{t(chapter.name)}</h2>
                <p className="timeline-lesson">{t(chapter.lesson)}</p>
                {chapter.essay.map((paragraph) => (
                  <p key={paragraph.ko}>{t(paragraph)}</p>
                ))}
                {featured.length + cards.length + lines.length > 0 && (
                  <>
                    <h3 className="label">{t(UI.storyProjects)}</h3>
                    <ul className="timeline-projects">
                      {featured.map((project) => (
                        <li key={project.slug}>
                          <Link href={`/projects/${project.slug}`}>
                            <strong>{t(projectName(project))}</strong>
                          </Link>{' '}
                          — {t(project.summary)}
                        </li>
                      ))}
                      {[...cards, ...lines].map((project) => (
                        <li key={project.slug}>
                          <strong>{t(projectName(project))}</strong> — {t(project.summary)}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </section>
            </li>
          ))}
        </ol>
      </div>
    </main>
  )
}
