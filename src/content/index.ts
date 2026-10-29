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
  selectPaperCounts,
  selectProject,
  selectShowcase,
  selectTopAwards,
  projectName,
} from './select'
import type { L, Showcase, Stat, Year } from './types'
import { STAT_LABELS, STAT_NOTES, paperNote } from './ui'

export { archive, chapters, profile, projects, FEATURED_ORDER, YEARS }

export const SITE_URL = 'https://junyoung-portfolio.vercel.app'

export const getFeatured = () => selectFeatured(projects)
export const getShowcase = (showcase: Showcase) => selectShowcase(projects, showcase)
export const getProject = (slug: string) => selectProject(projects, slug)
export const getByYear = (year: Year) => selectByYear(projects, year)
export const getChapter = (year: Year) => selectChapter(chapters, year)
export const getPaperCounts = () => selectPaperCounts(archive.papers)
export const getTopAwards = () => selectTopAwards(archive)

/** slug → display name for the projects that have their own page. */
export const getCaseNames = (): Record<string, L> => Object.fromEntries(getFeatured().map((p) => [p.slug, projectName(p)]))

/** The record in four counts, taken from the data so they never drift. */
export function getRecordStats(): Stat[] {
  const papers = getPaperCounts()
  return [
    { value: projects.length, label: STAT_LABELS.projects, note: STAT_NOTES.years },
    { value: papers.conference, label: STAT_LABELS.papers, note: paperNote(papers) },
    { value: archive.awards.length, label: STAT_LABELS.awards, note: STAT_NOTES.grandPrize },
    { value: archive.activities.length, label: STAT_LABELS.activities, note: STAT_NOTES.years },
  ]
}
