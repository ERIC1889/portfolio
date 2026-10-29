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
} from './select'
import type { Showcase, Year } from './types'

export { archive, chapters, profile, projects, FEATURED_ORDER, YEARS }

export const SITE_URL = 'https://junyoung-portfolio.vercel.app'

export const getFeatured = () => selectFeatured(projects)
export const getShowcase = (showcase: Showcase) => selectShowcase(projects, showcase)
export const getProject = (slug: string) => selectProject(projects, slug)
export const getByYear = (year: Year) => selectByYear(projects, year)
export const getChapter = (year: Year) => selectChapter(chapters, year)
export const getPaperCounts = () => selectPaperCounts(archive.papers)
export const getTopAwards = () => selectTopAwards(archive)
