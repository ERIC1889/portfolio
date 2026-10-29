'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { useLang } from '@/components/providers/LanguageProvider'
import { Gallery } from '@/components/common/Media'
import { SmartLink, StackList, StatusBadge } from '@/components/common/bits'
import { PageNav } from '@/components/shell/PageNav'
import { projectTitle } from '@/content/select'
import type { L, Project } from '@/content/types'
import { SHOWCASE_LABELS, UI } from '@/content/ui'
import { CaseSection } from './CaseSection'
import { ContributionTable, FlowDiagram } from './parts'

type Neighbour = { slug: string; name: L }

/** Section anchors: the section's own anchor, or its id (numbered when an id repeats). */
export function sectionAnchors(project: Project): string[] {
  const seen = new Map<string, number>()
  return (project.sections ?? []).map((section) => {
    if (section.anchor) return section.anchor
    const n = (seen.get(section.id) ?? 0) + 1
    seen.set(section.id, n)
    return n === 1 ? section.id : `${section.id}-${n}`
  })
}

function Fact({ label, children }: { label: L; children: ReactNode }) {
  const { t } = useLang()
  return (
    <div className="fact">
      <dt>{t(label)}</dt>
      <dd>{children}</dd>
    </div>
  )
}

export function CaseStudy({ project, prev, next }: { project: Project; prev?: Neighbour; next?: Neighbour }) {
  const { t } = useLang()
  const sections = project.sections ?? []
  const anchors = sectionAnchors(project)
  const validationIndex = sections.findIndex((section) => section.id === 'validation')
  const evidenceIndex = sections.findIndex((section) => section.id === 'evidence')
  const links = project.links ?? []
  const headerLinks = links.slice(0, 2)

  const toc: { href: string; label: L }[] = [
    ...(project.media?.length ? [{ href: '#screens', label: UI.mediaHeading }] : []),
    ...(project.features?.length ? [{ href: '#features', label: UI.featuresHeading }] : []),
    ...(project.contribution ? [{ href: '#contribution', label: UI.contributionHeading }] : []),
    ...(project.flow ? [{ href: '#flow', label: project.flow.title }] : []),
    ...sections.map((section, i) => ({ href: `#${anchors[i]}`, label: section.title })),
  ]

  return (
    <main id="main" className="case">
      <div className="wrap">
        <p className="breadcrumb">
          <Link href="/#projects">
            <span aria-hidden="true">←</span> {t(UI.backToProjects)}
          </Link>
        </p>

        <header className="case-header">
          {project.showcase && <p className="kicker">{t(SHOWCASE_LABELS[project.showcase])}</p>}
          <h1>{t(projectTitle(project))}</h1>
          <p className="case-product">{t(project.product ?? project.summary)}</p>
          <dl className="facts">
            {project.audience && <Fact label={UI.audience}>{t(project.audience)}</Fact>}
            <Fact label={UI.period}>
              <span className="mono">{project.period}</span>
            </Fact>
            {project.team && <Fact label={UI.team}>{t(project.team)}</Fact>}
            {project.role && <Fact label={UI.role}>{t(project.role)}</Fact>}
            {project.status && (
              <Fact label={UI.status}>
                <StatusBadge project={project} />
              </Fact>
            )}
            <Fact label={UI.stack}>
              <StackList items={project.stack} />
            </Fact>
          </dl>
          {(headerLinks.length > 0 || validationIndex !== -1) && (
            <div className="actions">
              {headerLinks.map((link, i) => (
                <SmartLink key={link.href} href={link.href} className={i === 0 ? 'btn btn-primary' : 'btn'}>
                  {t(link.label)}
                </SmartLink>
              ))}
              {validationIndex !== -1 && (
                <a href={`#${anchors[validationIndex]}`} className="btn">
                  {t(sections[validationIndex].title)} <span aria-hidden="true">↓</span>
                </a>
              )}
              {links.length > headerLinks.length && evidenceIndex !== -1 && (
                <a href={`#${anchors[evidenceIndex]}`} className="btn">
                  {t(sections[evidenceIndex].title)} <span aria-hidden="true">↓</span>
                </a>
              )}
            </div>
          )}
        </header>

        <div className="case-layout">
          <nav className="toc" aria-labelledby="toc-title">
            <p id="toc-title" className="label">
              {t(UI.onThisPage)}
            </p>
            <ol>
              {toc.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{t(item.label)}</a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="case-main">
            {project.media && project.media.length > 0 && (
              <section id="screens" className="case-block" aria-labelledby="screens-title">
                <h2 id="screens-title">{t(UI.mediaHeading)}</h2>
                <Gallery media={project.media} />
              </section>
            )}
            {project.features && project.features.length > 0 && (
              <section id="features" className="case-block" aria-labelledby="features-title">
                <h2 id="features-title">{t(UI.featuresHeading)}</h2>
                <ol className="feature-list">
                  {project.features.map((feature) => (
                    <li key={feature.ko}>{t(feature)}</li>
                  ))}
                </ol>
              </section>
            )}
            {project.contribution && (
              <section id="contribution" className="case-block" aria-labelledby="contribution-title">
                <h2 id="contribution-title">{t(UI.contributionHeading)}</h2>
                <ContributionTable contribution={project.contribution} />
              </section>
            )}
            {project.flow && (
              <section id="flow" className="case-block" aria-labelledby="flow-title">
                <h2 id="flow-title">{t(project.flow.title)}</h2>
                <FlowDiagram flow={project.flow} />
              </section>
            )}
            {sections.map((section, i) => (
              <CaseSection
                key={anchors[i]}
                section={section}
                anchor={anchors[i]}
                metrics={i === validationIndex ? project.metrics : undefined}
                links={i === evidenceIndex ? links : undefined}
              />
            ))}
          </div>
        </div>

        <PageNav
          prev={prev && { href: `/projects/${prev.slug}`, label: prev.name }}
          center={{ href: '/#projects', label: UI.backToProjects }}
          next={next && { href: `/projects/${next.slug}`, label: next.name }}
        />
      </div>
    </main>
  )
}
