import type { Chapter, L, Project, Scene, Year } from './types'

export function projectName(project: Pick<Project, 'name' | 'nameEn'>): L {
  return { ko: project.name, en: project.nameEn ?? project.name }
}

export const YEARS: Year[] = [2023, 2024, 2025, 2026]

export const FEATURED_ORDER = ['suzihouse', 'closetmate', 'skillpilot', 'pitches'] as const

export function selectFeatured(projects: Project[]): Project[] {
  return FEATURED_ORDER.map((slug) => projects.find((p) => p.slug === slug && p.tier === 'featured')).filter(
    (p): p is Project => p !== undefined,
  )
}

/** Only featured projects have their own page. */
export function selectProject(projects: Project[], slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug && p.tier === 'featured')
}

export function selectThroughline(projects: Project[]): (Project & { scene: Scene })[] {
  return projects
    .filter((p): p is Project & { scene: Scene; throughline: number } => p.throughline !== undefined && p.scene !== undefined)
    .sort((a, b) => a.throughline - b.throughline)
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
