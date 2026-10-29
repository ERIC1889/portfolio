import type { Metadata } from 'next'
import { YEARS, getByYear, getChapter, getFeatured, getProject } from '@/content'
import { projectName } from '@/content/select'

export const SITE_NAME = '허준영 포트폴리오'
export const OG_IMAGE = { url: '/og.png', width: 1200, height: 630, alt: '허준영 · 백엔드 중심 풀스택 개발자' }

/** Title, description, canonical URL and share card for a page; every page shares the same card image. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: 'website', siteName: SITE_NAME, locale: 'ko_KR', url: path, title, description, images: [OG_IMAGE] },
    twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE.url] },
  }
}

/** A featured case with its previous and next case in FEATURED_ORDER, or nothing for an unknown slug. */
export function getCasePage(slug: string) {
  const project = getProject(slug)
  if (!project) return undefined
  const order = getFeatured()
  const index = order.findIndex((p) => p.slug === slug)
  const pick = (p: (typeof order)[number] | undefined) => p && { slug: p.slug, name: projectName(p) }
  return { project, prev: pick(order[index - 1]), next: pick(order[index + 1]) }
}

/** Every chapter with the projects of its year, for the story page. */
export function getStoryYears() {
  return YEARS.flatMap((year) => {
    const chapter = getChapter(year)
    return chapter ? [{ chapter, ...getByYear(year) }] : []
  })
}
