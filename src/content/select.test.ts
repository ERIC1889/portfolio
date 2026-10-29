import { describe, expect, it } from 'vitest'
import { FIXTURE_PROJECTS, l } from '@/test/fixtures'
import type { Archive, Chapter } from './types'
import {
  projectName,
  projectTitle,
  selectByYear,
  selectChapter,
  selectFeatured,
  selectPaperCounts,
  selectProject,
  selectShowcase,
  selectTopAwards,
} from './select'

describe('selectFeatured', () => {
  it('returns only featured projects in page order: flagship, the two supporting projects, other work', () => {
    expect(selectFeatured(FIXTURE_PROJECTS).map((p) => p.slug)).toEqual(['suzihouse', 'skillpilot', 'closetmate', 'pitches'])
  })
})

describe('selectShowcase', () => {
  it('picks the projects of one home section, keeping page order', () => {
    expect(selectShowcase(FIXTURE_PROJECTS, 'flagship').map((p) => p.slug)).toEqual(['suzihouse'])
    expect(selectShowcase(FIXTURE_PROJECTS, 'supporting').map((p) => p.slug)).toEqual(['skillpilot', 'closetmate'])
    expect(selectShowcase(FIXTURE_PROJECTS, 'other').map((p) => p.slug)).toEqual(['pitches'])
  })
})

describe('selectProject', () => {
  it('finds a featured project by slug', () => {
    expect(selectProject(FIXTURE_PROJECTS, 'skillpilot')?.slug).toBe('skillpilot')
  })

  it('returns nothing for a card or an unknown slug (no case page exists for them)', () => {
    expect(selectProject(FIXTURE_PROJECTS, 'media-pulse')).toBeUndefined()
    expect(selectProject(FIXTURE_PROJECTS, 'foo')).toBeUndefined()
  })
})

describe('selectByYear', () => {
  it('groups a year by size, and lists a multi-year project in each of its years', () => {
    const y2024 = selectByYear(FIXTURE_PROJECTS, 2024)
    expect(y2024.featured.map((p) => p.slug)).toEqual(['pitches'])
    expect(y2024.lines.map((p) => p.slug)).toEqual(['patentry'])
    expect(selectByYear(FIXTURE_PROJECTS, 2026).featured.map((p) => p.slug)).toEqual(['suzihouse', 'closetmate', 'pitches'])
    expect(selectByYear(FIXTURE_PROJECTS, 2023).cards.map((p) => p.slug)).toEqual(['media-pulse'])
  })
})

describe('projectName / projectTitle', () => {
  const suzi = FIXTURE_PROJECTS[1]

  it('uses the English name for English readers when one exists', () => {
    expect(projectName({ name: '수지하우스', nameEn: 'SuziHouse' })).toEqual({ ko: '수지하우스', en: 'SuziHouse' })
    expect(projectName({ name: 'Pitches' })).toEqual({ ko: 'Pitches', en: 'Pitches' })
  })

  it('prefers the product title and falls back to the name', () => {
    expect(projectTitle(suzi).ko).toBe('수지하우스 제품')
    expect(projectTitle({ name: 'Patentry' })).toEqual({ ko: 'Patentry', en: 'Patentry' })
  })
})

describe('selectChapter', () => {
  it('finds the chapter for a year and nothing for a year without one', () => {
    const chapters: Chapter[] = [{ year: 2023, name: l('배우다'), lesson: l('-'), essay: [] }]
    expect(selectChapter(chapters, 2023)?.name.ko).toBe('배우다')
    expect(selectChapter(chapters, 2024)).toBeUndefined()
  })
})

describe('selectPaperCounts', () => {
  it('counts conference papers only, with international and first-author ones', () => {
    const paper = (kind: Archive['papers'][number]['kind'], authorOrder?: number) => ({ title: 't', venue: l('v'), year: 2025, kind, authorOrder })
    const counts = selectPaperCounts([paper('international', 2), paper('domestic', 1), paper('domestic'), paper('contest', 1), paper('campus')])
    expect(counts).toEqual({ conference: 3, international: 1, firstAuthor: 1 })
  })
})

describe('selectTopAwards', () => {
  it('returns the named awards in the chosen order and skips unknown names', () => {
    const award = (name: string) => ({ date: '24.10.24', name: l(name), org: l('주최') })
    const awards = [award('가'), award('나'), award('다')]
    expect(selectTopAwards({ awards, topAwards: ['다', '없음', '가'] }).map((a) => a.name.ko)).toEqual(['다', '가'])
  })
})
