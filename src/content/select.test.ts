import { describe, expect, it } from 'vitest'
import type { Chapter, Project, Tier, Year } from './types'
import { projectName, selectByYear, selectChapter, selectFeatured, selectProject, selectThroughline } from './select'

const l = (ko: string) => ({ ko, en: '' })

function p(slug: string, tier: Tier, years: Year[], throughline?: number): Project {
  return {
    slug,
    name: slug,
    years,
    tier,
    period: '',
    stack: [],
    summary: l(slug),
    ...(throughline ? { throughline, scene: { minus: l('-'), plus: l('+') } } : {}),
  }
}

const PROJECTS: Project[] = [
  p('pitches', 'featured', [2024, 2026], 2),
  p('media-pulse', 'card', [2023], 1),
  p('skillpilot', 'featured', [2025], 3),
  p('patentry', 'line', [2024]),
  p('suzihouse', 'featured', [2026], 6),
  p('closetmate', 'featured', [2026], 5),
  p('label-light', 'card', [2024]),
]

describe('selectFeatured', () => {
  it('returns only featured projects in the fixed order suzihouse, closetmate, skillpilot, pitches', () => {
    expect(selectFeatured(PROJECTS).map((x) => x.slug)).toEqual(['suzihouse', 'closetmate', 'skillpilot', 'pitches'])
  })
})

describe('selectProject', () => {
  it('finds a featured project by slug', () => {
    expect(selectProject(PROJECTS, 'skillpilot')?.slug).toBe('skillpilot')
  })

  it('returns nothing for a card or an unknown slug (no case page exists for them)', () => {
    expect(selectProject(PROJECTS, 'label-light')).toBeUndefined()
    expect(selectProject(PROJECTS, 'foo')).toBeUndefined()
  })
})

describe('selectThroughline', () => {
  it('orders scene projects by their throughline number and skips the rest', () => {
    expect(selectThroughline(PROJECTS).map((x) => x.slug)).toEqual(['media-pulse', 'pitches', 'skillpilot', 'closetmate', 'suzihouse'])
  })
})

describe('selectByYear', () => {
  it('groups a year by size, and lists a multi-year project in each of its years', () => {
    const y2024 = selectByYear(PROJECTS, 2024)
    expect(y2024.featured.map((x) => x.slug)).toEqual(['pitches'])
    expect(y2024.cards.map((x) => x.slug)).toEqual(['label-light'])
    expect(y2024.lines.map((x) => x.slug)).toEqual(['patentry'])
    expect(selectByYear(PROJECTS, 2026).featured.map((x) => x.slug)).toEqual(['suzihouse', 'closetmate', 'pitches'])
  })
})

describe('projectName', () => {
  it('uses the English name for English readers when one exists', () => {
    expect(projectName({ ...p('suzihouse', 'featured', [2026]), name: '수지하우스', nameEn: 'SuziHouse' })).toEqual({
      ko: '수지하우스',
      en: 'SuziHouse',
    })
  })

  it('keeps a brand name as-is in both languages', () => {
    expect(projectName(p('pitches', 'featured', [2024]))).toEqual({ ko: 'pitches', en: 'pitches' })
  })
})

describe('selectChapter', () => {
  it('finds the chapter for a year and nothing for a year without one', () => {
    const chapters: Chapter[] = [{ year: 2023, name: l('배우다'), lesson: l('-'), essay: [] }]
    expect(selectChapter(chapters, 2023)?.name.ko).toBe('배우다')
    expect(selectChapter(chapters, 2024)).toBeUndefined()
  })
})
