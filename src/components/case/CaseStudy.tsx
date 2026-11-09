'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { useLang } from '@/components/providers/LanguageProvider'
import { Gallery } from '@/components/common/Media'
import { Rich } from '@/components/common/Rich'
import { LinkList } from '@/components/common/bits'
import { PageNav } from '@/components/shell/PageNav'
import { caseGallery, hasNewShape } from '@/content/select'
import type { Case, L, Product, Project } from '@/content/types'
import { CASE_PARTS, UI, WORK_PARTS } from '@/content/ui'
import { ArchitectureBlock } from './Architecture'
import { CaseSection } from './CaseSection'
import { Overview } from './Overview'
import { PaarCard } from './PaarCard'
import { MetricsTable, ScopeRows } from './parts'

type Neighbour = { slug: string; name: L }
type Part = { id: string; title: L; content: ReactNode }

export function sectionAnchors(project: Project): string[] {
  const seen = new Map<string, number>()
  return (project.sections ?? []).map((section) => {
    if (section.anchor) return section.anchor
    const n = (seen.get(section.id) ?? 0) + 1
    seen.set(section.id, n)
    return n === 1 ? section.id : `${section.id}-${n}`
  })
}

function Paragraphs({ items }: { items?: L[] }) {
  const { t } = useLang()
  return (
    <>
      {items?.map((paragraph) => (
        <p key={paragraph.ko}>
          <Rich text={t(paragraph)} />
        </p>
      ))}
    </>
  )
}

function Features({ items }: { items: L[] }) {
  const { t } = useLang()
  return (
    <ol className="feature-list">
      {items.map((feature) => (
        <li key={feature.ko}>
          <Rich text={t(feature)} />
        </li>
      ))}
    </ol>
  )
}

function Cases({ items, prefix, level = 3 }: { items: Case[]; prefix: string; level?: 3 | 4 }) {
  return (
    <div className="paar-list">
      {items.map((item, i) => (
        <PaarCard key={item.title.ko} item={item} id={`${prefix}-${i + 1}`} level={level} />
      ))}
    </div>
  )
}

function Results({ project }: { project: Project }) {
  const { t } = useLang()
  const verified = project.contribution?.verified
  return (
    <>
      <Paragraphs items={project.results} />
      {project.metrics && project.metrics.length > 0 && (
        <>
          <h3 className="label">{t(UI.metricsHeading)}</h3>
          <MetricsTable metrics={project.metrics} />
        </>
      )}
      {verified && verified.length > 0 && (
        <>
          <h3 className="label">{t(UI.verifiedHeading)}</h3>
          <ul className="dash-list verified-list">
            {verified.map((item) => (
              <li key={item.ko}>{t(item)}</li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}

function ProductBlock({ product, index, part }: { product: Product; index: number; part: number }) {
  const { t } = useLang()
  return (
    <article id={product.id} className="product-block" aria-labelledby={`${product.id}-title`}>
      <h3 id={`${product.id}-title`} className="product-title">
        <span className="case-num mono">
          {part}-{index + 1}
        </span>{' '}
        {t(product.name)}
      </h3>
      <p className="product-meta muted">
        {t(product.status)} · {t(product.role)}
      </p>
      <Paragraphs items={product.intro} />
      {product.features && product.features.length > 0 && (
        <>
          <h4 className="label">{t(CASE_PARTS.features)}</h4>
          <Features items={product.features} />
        </>
      )}
      {product.media && product.media.length > 0 && <Gallery media={product.media} />}
      {product.architecture && (
        <>
          <h4 className="label">{t(CASE_PARTS.architecture)}</h4>
          <ArchitectureBlock architecture={product.architecture} level={4} />
        </>
      )}
      {product.cases && product.cases.length > 0 && (
        <>
          <h4 className="label">{t(CASE_PARTS.cases)}</h4>
          <Cases items={product.cases} prefix={`${product.id}-case`} level={4} />
        </>
      )}
    </article>
  )
}

function useParts(project: Project): Part[] {
  const gallery = caseGallery(project)
  const links = project.links ?? []
  const tail: Part[] = [
    ...(project.results?.length || project.metrics?.length || project.contribution?.verified?.length
      ? [{ id: 'results', title: CASE_PARTS.results, content: <Results project={project} /> }]
      : []),
    ...(project.retro?.length ? [{ id: 'retro', title: CASE_PARTS.retro, content: <Paragraphs items={project.retro} /> }] : []),
    ...(project.material?.length || links.length
      ? [
          {
            id: 'material',
            title: CASE_PARTS.material,
            content: (
              <>
                <Paragraphs items={project.material} />
                {links.length > 0 && <LinkList links={links} />}
              </>
            ),
          },
        ]
      : []),
  ]
  if (project.kind === 'work') {
    const productsPart = 1 + (project.background?.length ? 1 : 0) + (project.duties?.length || project.contribution ? 1 : 0)
    return [
      ...(project.background?.length ? [{ id: 'company', title: WORK_PARTS.company, content: <Paragraphs items={project.background} /> }] : []),
      ...(project.duties?.length || project.contribution
        ? [
            {
              id: 'duties',
              title: WORK_PARTS.duties,
              content: (
                <>
                  <Paragraphs items={project.duties} />
                  {project.contribution && <ScopeRows contribution={project.contribution} />}
                </>
              ),
            },
          ]
        : []),
      ...(project.products?.length
        ? [
            {
              id: 'products',
              title: WORK_PARTS.products,
              content: (
                <div className="product-list">
                  {project.products.map((product, i) => (
                    <ProductBlock key={product.id} product={product} index={i} part={productsPart} />
                  ))}
                </div>
              ),
            },
          ]
        : []),
      ...tail,
    ]
  }
  return [
    ...(project.background?.length ? [{ id: 'background', title: CASE_PARTS.background, content: <Paragraphs items={project.background} /> }] : []),
    ...(project.features?.length || gallery.length
      ? [
          {
            id: 'features',
            title: CASE_PARTS.features,
            content: (
              <>
                {project.features && project.features.length > 0 && <Features items={project.features} />}
                {gallery.length > 0 && <Gallery media={gallery} />}
              </>
            ),
          },
        ]
      : []),
    ...(project.architecture ? [{ id: 'architecture', title: CASE_PARTS.architecture, content: <ArchitectureBlock architecture={project.architecture} /> }] : []),
    ...(project.cases?.length ? [{ id: 'cases', title: CASE_PARTS.cases, content: <Cases items={project.cases} prefix="case" /> }] : []),
    ...tail,
  ]
}

export function CaseStudy({ project, prev, next }: { project: Project; prev?: Neighbour; next?: Neighbour }) {
  const { t } = useLang()
  const modern = hasNewShape(project)
  const parts = useParts(project)
  const back = project.kind === 'work' ? { href: '/#work', label: UI.backToWork } : { href: '/#projects', label: UI.backToProjects }
  const sections = project.sections ?? []
  const anchors = sectionAnchors(project)
  const toc: { href: string; label: string }[] = modern
    ? parts.map((part, i) => ({ href: `#${part.id}`, label: `${i + 1}. ${t(part.title)}` }))
    : sections.map((section, i) => ({ href: `#${anchors[i]}`, label: t(section.title) }))

  return (
    <main id="main" className="case">
      <div className="wrap">
        <p className="breadcrumb">
          <Link href={back.href}>
            <span aria-hidden="true">←</span> {t(back.label)}
          </Link>
        </p>

        <Overview project={project} />

        <div className="case-layout">
          <nav className="toc" aria-labelledby="toc-title">
            <p id="toc-title" className="label">
              {t(UI.onThisPage)}
            </p>
            <ol>
              {toc.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="case-main">
            {modern
              ? parts.map((part, i) => (
                  <section key={part.id} id={part.id} className="case-block" aria-labelledby={`${part.id}-title`}>
                    <h2 id={`${part.id}-title`}>
                      <span className="case-num mono">{i + 1}.</span> {t(part.title)}
                    </h2>
                    {part.content}
                  </section>
                ))
              : sections.map((section, i) => <CaseSection key={anchors[i]} section={section} anchor={anchors[i]} />)}
          </div>
        </div>

        <PageNav
          prev={prev && { href: `/projects/${prev.slug}`, label: prev.name }}
          center={back}
          next={next && { href: `/projects/${next.slug}`, label: next.name }}
        />
      </div>
    </main>
  )
}
