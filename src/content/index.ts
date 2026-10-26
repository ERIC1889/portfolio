import { archive } from './archive'
import { chapters } from './chapters'
import { profile } from './profile'
import { projects } from './projects'
import {
  FEATURED_ORDER,
  YEARS,
  selectByYear,
  selectChapter,
  selectFeatured,
  selectProject,
  selectThroughline,
} from './select'
import type { L, Year } from './types'
import { UI } from './ui'

export { archive, chapters, profile, projects, FEATURED_ORDER, YEARS }

export const getFeatured = () => selectFeatured(projects)
export const getProject = (slug: string) => selectProject(projects, slug)
export const getThroughline = () => selectThroughline(projects)
export const getByYear = (year: Year) => selectByYear(projects, year)
export const getChapter = (year: Year) => selectChapter(chapters, year)
export const getLines = () => projects.filter((p) => p.tier === 'line')

/** The hero's small line of counts, taken from the data so it never drifts. */
export const getHeroStats = (): { label: L; value: number }[] => [
  { label: UI.statAwards, value: archive.awards.length },
  { label: UI.statPapers, value: archive.papers.length },
  { label: UI.statProjects, value: projects.length },
]

