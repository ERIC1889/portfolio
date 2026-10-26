import { YEARS, getByYear, getChapter, getFeatured, getProject } from '@/content'
import { projectName } from '@/content/select'

/** A featured case with its previous and next case in FEATURED_ORDER, or nothing for an unknown slug. */
export function getCasePage(slug: string) {
  const project = getProject(slug)
  if (!project) return undefined
  const order = getFeatured()
  const index = order.findIndex((p) => p.slug === slug)
  const pick = (p: (typeof order)[number] | undefined) => p && { slug: p.slug, name: projectName(p) }
  return { project, prev: pick(order[index - 1]), next: pick(order[index + 1]) }
}

/** A chapter with its projects and neighbouring years, or nothing when the year is not part of the story. */
export function getYearPage(value: string) {
  const year = YEARS.find((y) => String(y) === value)
  const chapter = year && getChapter(year)
  if (!year || !chapter) return undefined
  const index = YEARS.indexOf(year)
  return { chapter, ...getByYear(year), prevYear: YEARS[index - 1], nextYear: YEARS[index + 1] }
}
