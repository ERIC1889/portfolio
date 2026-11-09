import type { Archive, Award, Case, Chapter, L, Media, Project, Showcase, Year } from './types'

export function projectName(project: Pick<Project, 'name' | 'nameEn'>): L {
  return { ko: project.name, en: project.nameEn ?? project.name }
}

export function projectTitle(project: Pick<Project, 'name' | 'nameEn' | 'title'>): L {
  return project.title ?? projectName(project)
}

export function pageTitle(project: Pick<Project, 'name' | 'nameEn' | 'title' | 'workTitle'>): L {
  return project.workTitle ?? projectTitle(project)
}

export const YEARS: Year[] = [2023, 2024, 2025, 2026]

export const CASE_ORDER = ['finz', 'skillpilot', 'pitches', 'closetmate', 'edumatrix', 'innoview', 'label-light', 'media-pulse'] as const

export const RESUME_ORDER = ['finz', 'skillpilot', 'pitches', 'closetmate'] as const

const hasPage = (project: Project) => project.showcase !== undefined

function inOrder(projects: Project[], order: readonly string[]): Project[] {
  return order.map((slug) => projects.find((p) => p.slug === slug && hasPage(p))).filter((p): p is Project => p !== undefined)
}

export const selectCases = (projects: Project[]) => inOrder(projects, CASE_ORDER)
export const selectResumeProjects = (projects: Project[]) => inOrder(projects, RESUME_ORDER)

export function selectShowcase(projects: Project[], showcase: Showcase): Project[] {
  return selectCases(projects).filter((p) => p.showcase === showcase)
}

export function selectProject(projects: Project[], slug: string): Project | undefined {
  return selectCases(projects).find((p) => p.slug === slug)
}

export function hasNewShape(project: Project): boolean {
  return Boolean(project.overview || project.background || project.cases || project.products)
}

const caseMedia = (cases?: Case[]) => (cases ?? []).flatMap((c) => c.media ?? [])

export function allMedia(project: Project): Media[] {
  return [
    ...(project.media ?? []),
    ...caseMedia(project.cases),
    ...(project.products ?? []).flatMap((product) => [...(product.media ?? []), ...caseMedia(product.cases)]),
    ...(project.sections ?? []).flatMap((section) => section.media ?? []),
  ]
}

export function casePictures(project: Project): Media[] {
  const media = allMedia(project)
  if (media.length) return media
  if (!project.image || !project.imageCaption || !project.imageSize) return []
  const [width, height] = project.imageSize
  return [{ kind: 'screenshot', src: project.image, width, height, alt: project.imageCaption, caption: project.imageCaption }]
}

export const caseDemo = (project: Project): Media | undefined => project.media?.find((m) => m.kind === 'video')

export const caseGallery = (project: Project): Media[] => (project.media ?? []).filter((m) => m.kind !== 'video')

export function selectByYear(projects: Project[], year: Year) {
  const inYear = projects.filter((p) => p.years.includes(year))
  return {
    featured: selectCases(inYear),
    cards: inYear.filter((p) => p.tier === 'card' && !hasPage(p)),
    lines: inYear.filter((p) => p.tier === 'line'),
  }
}

export function selectChapter(chapters: Chapter[], year: Year): Chapter | undefined {
  return chapters.find((c) => c.year === year)
}

export function selectPaperCounts(papers: Archive['papers']) {
  const conference = papers.filter((p) => p.kind === 'international' || p.kind === 'domestic')
  return {
    conference: conference.length,
    international: conference.filter((p) => p.kind === 'international').length,
    firstAuthor: conference.filter((p) => p.authorOrder === 1).length,
  }
}

export function selectTopAwards(archive: Pick<Archive, 'awards' | 'topAwards'>): Award[] {
  return archive.topAwards.map((name) => archive.awards.find((a) => a.name.ko === name)).filter((a): a is Award => a !== undefined)
}

export type Activity = Archive['activities'][number]

export function selectTopActivities(archive: Pick<Archive, 'activities' | 'topActivities'>): Activity[] {
  return archive.topActivities.map((name) => archive.activities.find((a) => a.name.ko === name)).filter((a): a is Activity => a !== undefined)
}
