import type { Archive, Award, Chapter, L, Project, Showcase, Year } from './types'

export function projectName(project: Pick<Project, 'name' | 'nameEn'>): L {
  return { ko: project.name, en: project.nameEn ?? project.name }
}

/** The product title for headings, falling back to the project name. */
export function projectTitle(project: Pick<Project, 'name' | 'nameEn' | 'title'>): L {
  return project.title ?? projectName(project)
}

export const YEARS: Year[] = [2023, 2024, 2025, 2026]

/** Featured projects in page order: the flagship, the two supporting projects, then other work. */
export const FEATURED_ORDER = ['finz', 'skillpilot', 'closetmate', 'pitches'] as const

export function selectFeatured(projects: Project[]): Project[] {
  return FEATURED_ORDER.map((slug) => projects.find((p) => p.slug === slug && p.tier === 'featured')).filter(
    (p): p is Project => p !== undefined,
  )
}

export function selectShowcase(projects: Project[], showcase: Showcase): Project[] {
  return selectFeatured(projects).filter((p) => p.showcase === showcase)
}

/** Only featured projects have their own page. */
export function selectProject(projects: Project[], slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug && p.tier === 'featured')
}

export function selectByYear(projects: Project[], year: Year) {
  const inYear = projects.filter((p) => p.years.includes(year))
  return {
    featured: selectFeatured(inYear),
    cards: inYear.filter((p) => p.tier === 'card'),
    lines: inYear.filter((p) => p.tier === 'line'),
  }
}

export function selectChapter(chapters: Chapter[], year: Year): Chapter | undefined {
  return chapters.find((c) => c.year === year)
}

/** Conference papers only (international and domestic); contest and campus entries are listed but not counted. */
export function selectPaperCounts(papers: Archive['papers']) {
  const conference = papers.filter((p) => p.kind === 'international' || p.kind === 'domestic')
  return {
    conference: conference.length,
    international: conference.filter((p) => p.kind === 'international').length,
    firstAuthor: conference.filter((p) => p.authorOrder === 1).length,
  }
}

/** The awards named in `topAwards`, in that order. */
export function selectTopAwards(archive: Pick<Archive, 'awards' | 'topAwards'>): Award[] {
  return archive.topAwards.map((name) => archive.awards.find((a) => a.name.ko === name)).filter((a): a is Award => a !== undefined)
}
