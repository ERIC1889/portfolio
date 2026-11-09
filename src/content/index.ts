import { aiWork } from './ai'
import { archive } from './archive'
import { chapters } from './chapters'
import { profile } from './profile'
import { projects } from './projects'
import {
  CASE_ORDER,
  YEARS,
  selectByYear,
  selectChapter,
  selectCases,
  selectResumeProjects,
  selectPaperCounts,
  selectProject,
  selectShowcase,
  selectTopAwards,
  selectTopActivities,
  projectName,
} from './select'
import type { L, Showcase, Stat, Year } from './types'
import { STAT_LABELS, STAT_NOTES, paperNote } from './ui'

export { aiWork, archive, chapters, profile, projects, CASE_ORDER, YEARS }

export const SITE_URL = 'https://junyoung-portfolio.vercel.app'

export const getCases = () => selectCases(projects)
export const getResumeProjects = () => selectResumeProjects(projects)
export const getShowcase = (showcase: Showcase) => selectShowcase(projects, showcase)
export const getWork = () => selectShowcase(projects, 'work')[0]
export const getProject = (slug: string) => selectProject(projects, slug)
export const getByYear = (year: Year) => selectByYear(projects, year)
export const getChapter = (year: Year) => selectChapter(chapters, year)
export const getPaperCounts = () => selectPaperCounts(archive.papers)
export const getTopAwards = () => selectTopAwards(archive)
export const getTopActivities = () => selectTopActivities(archive)

export const getCaseNames = (): Record<string, L> => Object.fromEntries(getCases().map((p) => [p.slug, projectName(p)]))

export function getRecordStats(): Stat[] {
  const papers = getPaperCounts()
  return [
    { value: projects.length, label: STAT_LABELS.projects, note: STAT_NOTES.years },
    { value: papers.conference, label: STAT_LABELS.papers, note: paperNote(papers) },
    { value: archive.awards.length, label: STAT_LABELS.awards, note: STAT_NOTES.grandPrize },
    { value: archive.activities.length, label: STAT_LABELS.activities, note: STAT_NOTES.years },
  ]
}
