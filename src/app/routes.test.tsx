import { describe, expect, it, vi } from 'vitest'
import { screen, within } from '@testing-library/react'
import { renderWithProviders } from '@/test/render'

vi.mock('@/content', async () => {
  const select = await import('@/content/select')
  const { FIXTURE_CHAPTERS, FIXTURE_PROJECTS } = await import('@/test/fixtures')
  return {
    YEARS: select.YEARS,
    FEATURED_ORDER: select.FEATURED_ORDER,
    getFeatured: () => select.selectFeatured(FIXTURE_PROJECTS),
    getProject: (slug: string) => select.selectProject(FIXTURE_PROJECTS, slug),
    getByYear: (year: Parameters<typeof select.selectByYear>[1]) => select.selectByYear(FIXTURE_PROJECTS, year),
    getChapter: (year: Parameters<typeof select.selectChapter>[1]) => select.selectChapter(FIXTURE_CHAPTERS, year),
  }
})

vi.mock('next/navigation', async (importOriginal) => ({
  ...(await importOriginal<typeof import('next/navigation')>()),
  useRouter: () => ({ back: vi.fn(), replace: vi.fn(), push: vi.fn(), prefetch: vi.fn() }),
}))

import * as ProjectRoute from './projects/[slug]/page'
import * as CaseModal from './@modal/(.)projects/[slug]/page'
import * as YearModal from './@modal/(.)journey/[year]/page'
import ModalSlotDefault from './@modal/default'
import ModalSlotHome from './@modal/page'
import * as JourneyRoute from './journey/[year]/page'
import NotFound from './not-found'

const slugParams = (slug: string) => ({ params: Promise.resolve({ slug }) })
const yearParams = (year: string) => ({ params: Promise.resolve({ year }) })
const NOT_FOUND = { digest: expect.stringContaining('404') }

function pageNavHrefs() {
  const nav = screen.getByRole('navigation', { name: '페이지 이동' })
  return within(nav)
    .getAllByRole('link')
    .map((a) => a.getAttribute('href'))
}

describe('/projects/[slug]', () => {
  it('pre-renders exactly the four featured cases and nothing else', () => {
    expect(ProjectRoute.generateStaticParams()).toEqual([
      { slug: 'suzihouse' },
      { slug: 'closetmate' },
      { slug: 'skillpilot' },
      { slug: 'pitches' },
    ])
    expect(ProjectRoute.dynamicParams).toBe(false)
  })

  it('sends an unknown slug to the 404 page', async () => {
    await expect(ProjectRoute.default(slugParams('foo'))).rejects.toMatchObject(NOT_FOUND)
  })

  it('has no page for a project that only has a card', async () => {
    await expect(ProjectRoute.default(slugParams('media-pulse'))).rejects.toMatchObject(NOT_FOUND)
  })

  it('builds share metadata from the case question and image', async () => {
    const meta = await ProjectRoute.generateMetadata(slugParams('pitches'))
    expect(meta.title).toBe('Pitches — 허준영')
    expect(meta.description).toBe('Pitches에서 무엇을 확인했나?')
    expect(meta.openGraph).toMatchObject({
      title: 'Pitches — 허준영',
      description: 'Pitches에서 무엇을 확인했나?',
      images: ['/images/projects/pitches.png'],
    })
  })

  it('shows the question as the page heading', async () => {
    renderWithProviders(await ProjectRoute.default(slugParams('skillpilot')))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('SkillPilot에서 무엇을 확인했나?')
  })

  it('links to the case list and the next case from the first case, with no previous link', async () => {
    renderWithProviders(await ProjectRoute.default(slugParams('suzihouse')))
    expect(pageNavHrefs()).toEqual(['/#cases', '/projects/closetmate'])
  })

  it('links to the previous case and the case list from the last case, with no next link', async () => {
    renderWithProviders(await ProjectRoute.default(slugParams('pitches')))
    expect(pageNavHrefs()).toEqual(['/projects/skillpilot', '/#cases'])
  })
})

describe('/journey/[year]', () => {
  it('pre-renders the four years of the story', () => {
    expect(JourneyRoute.generateStaticParams()).toEqual([{ year: '2023' }, { year: '2024' }, { year: '2025' }, { year: '2026' }])
    expect(JourneyRoute.dynamicParams).toBe(false)
  })

  it.each(['2022', '2027', 'abc'])('sends %s to the 404 page', async (year) => {
    await expect(JourneyRoute.default(yearParams(year))).rejects.toMatchObject(NOT_FOUND)
  })

  it('titles the page with the year and chapter name', async () => {
    const meta = await JourneyRoute.generateMetadata(yearParams('2025'))
    expect(meta.title).toBe('2025 함께하다 — 허준영')
  })

  it('links home and to the following year from the first year', async () => {
    renderWithProviders(await JourneyRoute.default(yearParams('2023')))
    expect(pageNavHrefs()).toEqual(['/', '/journey/2024'])
  })

  it('links to both neighbours from a middle year', async () => {
    renderWithProviders(await JourneyRoute.default(yearParams('2025')))
    expect(pageNavHrefs()).toEqual(['/journey/2024', '/', '/journey/2026'])
  })
})

describe('not-found', () => {
  it('offers a way back home', () => {
    renderWithProviders(<NotFound />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('404')
    expect(screen.getByRole('link', { name: /홈/ })).toHaveAttribute('href', '/')
  })
})

describe('popups (@modal slot)', () => {
  it('opens a case as a dialog named after it', async () => {
    renderWithProviders(await CaseModal.default(slugParams('skillpilot')))
    const dialog = screen.getByRole('dialog', { name: 'SkillPilot' })
    expect(within(dialog).getByRole('heading', { level: 1 })).toHaveTextContent('SkillPilot에서 무엇을 확인했나?')
  })

  it('opens a year as a dialog named after it', async () => {
    renderWithProviders(await YearModal.default(yearParams('2024')))
    expect(screen.getByRole('dialog', { name: '2024 만들다' })).toBeInTheDocument()
  })

  it('sends unknown popups to the 404 page', async () => {
    await expect(CaseModal.default(slugParams('foo'))).rejects.toMatchObject(NOT_FOUND)
    await expect(YearModal.default(yearParams('2022'))).rejects.toMatchObject(NOT_FOUND)
  })

  it('pre-renders the same cases and years as the full pages', () => {
    expect(CaseModal.generateStaticParams()).toEqual(ProjectRoute.generateStaticParams())
    expect(YearModal.generateStaticParams()).toEqual(JourneyRoute.generateStaticParams())
  })

  it('renders nothing in the popup slot on the home page or on a direct visit', () => {
    expect(ModalSlotDefault()).toBeNull()
    expect(ModalSlotHome()).toBeNull()
  })
})
