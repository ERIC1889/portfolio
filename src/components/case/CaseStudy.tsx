'use client'

import { useLang } from '@/components/providers/LanguageProvider'
import { PageNav } from '@/components/shell/PageNav'
import type { L, Project } from '@/content/types'
import { projectName } from '@/content/select'
import { NAV_LABELS, UI } from '@/content/ui'
import { CaseSection } from './CaseSection'

type Neighbour = { slug: string; name: L }

function MetaRow({ label, children, mono }: { label: L; children: string; mono?: boolean }) {
  const { t } = useLang()
  return (
    <div className="case-meta-row">
      <dt>{t(label)}</dt>
      <dd className={mono ? 'mono' : undefined}>{children}</dd>
    </div>
  )
}

type Variant = 'page' | 'modal'

export function CaseStudy({
  project,
  prev,
  next,
  variant = 'page',
}: {
  project: Project
  prev?: Neighbour
  next?: Neighbour
  variant?: Variant
}) {
  const { t } = useLang()
  const name = t(projectName(project))
  const hunk = `${project.years.join('→')} ${name}`

  const Root = variant === 'page' ? 'main' : 'div'

  return (
    <Root className={variant === 'page' ? 'case-page' : 'case-page in-modal'}>
      <section className="sec case-hero">
        <div className="sec-inner">
          <p className="sec-num">{name}</p>
          <h1 className="case-question">{t(project.question ?? project.summary)}</h1>
          <dl className="glass case-meta">
            <MetaRow label={UI.period} mono>
              {project.period}
            </MetaRow>
            {project.team && <MetaRow label={UI.team}>{t(project.team)}</MetaRow>}
            {project.role && <MetaRow label={UI.role}>{t(project.role)}</MetaRow>}
            {project.status && <MetaRow label={UI.status}>{t(project.status)}</MetaRow>}
            <MetaRow label={UI.stack} mono>
              {project.stack.join(' · ')}
            </MetaRow>
          </dl>
          {project.image && (
            <figure className="case-figure">
              <img className="case-image" src={project.image} alt={name} />
              {project.imageCaption && <figcaption className="case-caption">{t(project.imageCaption)}</figcaption>}
            </figure>
          )}
        </div>
      </section>

      {project.sections?.map((section, i) => (
        <CaseSection
          key={`${section.id}-${i}`}
          section={section}
          hunk={hunk}
          links={section.id === 'evidence' ? project.links : undefined}
        />
      ))}

      {/* Full page: real page loads, with the case list in the middle. Popup: swap the popup in place. */}
      <PageNav
        prev={prev && { href: `/projects/${prev.slug}`, label: t(prev.name) }}
        center={variant === 'page' ? { href: '/#cases', label: NAV_LABELS.casesAll } : undefined}
        next={next && { href: `/projects/${next.slug}`, label: t(next.name) }}
        mode={variant === 'page' ? 'hard' : 'replace'}
      />
    </Root>
  )
}
