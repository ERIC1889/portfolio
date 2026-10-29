import { describe, expect, it } from 'vitest'
import { screen, within } from '@testing-library/react'
import { renderWithProviders } from '@/test/render'
import nextConfig from '../../next.config'
import * as ProjectRoute from './projects/[slug]/page'
import StoryPage, { metadata as storyMetadata } from './story/page'
import ArchivePage from './archive/page'
import ResumePage from './resume/page'
import NotFound from './not-found'
import sitemap from './sitemap'
import robots from './robots'
import { metadata as rootMetadata } from './layout'

const slugParams = (slug: string) => ({ params: Promise.resolve({ slug }) })
const NOT_FOUND = { digest: expect.stringContaining('404') }

function pageNavHrefs() {
  const nav = screen.getByRole('navigation', { name: '페이지 이동' })
  return within(nav)
    .getAllByRole('link')
    .map((a) => a.getAttribute('href'))
}

describe('site metadata', () => {
  it('describes the site, sets its address and shares one card image', () => {
    expect(rootMetadata.metadataBase?.toString()).toBe('https://junyoung-portfolio.vercel.app/')
    expect(rootMetadata.description).toBe('허준영 · 백엔드 중심 풀스택 개발자. Finz 부동산 세금 비교, SkillPilot, ClosetMate.')
    expect(rootMetadata.alternates?.canonical).toBe('/')
    expect(rootMetadata.openGraph).toMatchObject({ images: [expect.objectContaining({ url: '/og.png', width: 1200, height: 630 })] })
  })

  it('lists every page in the sitemap and points robots at it', () => {
    expect(sitemap().map((entry) => entry.url)).toEqual([
      'https://junyoung-portfolio.vercel.app',
      'https://junyoung-portfolio.vercel.app/projects/finz',
      'https://junyoung-portfolio.vercel.app/projects/skillpilot',
      'https://junyoung-portfolio.vercel.app/projects/closetmate',
      'https://junyoung-portfolio.vercel.app/projects/pitches',
      'https://junyoung-portfolio.vercel.app/story',
      'https://junyoung-portfolio.vercel.app/archive',
      'https://junyoung-portfolio.vercel.app/resume',
    ])
    expect(robots().sitemap).toBe('https://junyoung-portfolio.vercel.app/sitemap.xml')
  })
})

describe('/projects/[slug]', () => {
  it('pre-renders exactly the four featured cases, flagship first', () => {
    expect(ProjectRoute.generateStaticParams()).toEqual([{ slug: 'finz' }, { slug: 'skillpilot' }, { slug: 'closetmate' }, { slug: 'pitches' }])
    expect(ProjectRoute.dynamicParams).toBe(false)
  })

  it('sends an unknown slug and a card-only project to the 404 page', async () => {
    await expect(ProjectRoute.default(slugParams('foo'))).rejects.toMatchObject(NOT_FOUND)
    await expect(ProjectRoute.default(slugParams('media-pulse'))).rejects.toMatchObject(NOT_FOUND)
  })

  it('titles and describes the page by the product, with its own canonical address', async () => {
    const meta = await ProjectRoute.generateMetadata(slugParams('finz'))
    expect(meta.title).toBe('Finz 부동산 세금 비교')
    expect(meta.description).toContain('세금 여섯 가지를 중과 유예 전후로 비교')
    expect(meta.alternates?.canonical).toBe('/projects/finz')
    expect(meta.openGraph).toMatchObject({ url: '/projects/finz', images: [expect.objectContaining({ url: '/og.png' })] })
  })

  it('shows the product name as the page heading', async () => {
    renderWithProviders(await ProjectRoute.default(slugParams('skillpilot')))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('SkillPilot 자격증·커리어 플랫폼')
  })

  it('links the flagship to the list and the next case, with no previous link', async () => {
    renderWithProviders(await ProjectRoute.default(slugParams('finz')))
    expect(pageNavHrefs()).toEqual(['/#projects', '/projects/skillpilot'])
  })

  it('links the last case to the previous one and the list, with no next link', async () => {
    renderWithProviders(await ProjectRoute.default(slugParams('pitches')))
    expect(pageNavHrefs()).toEqual(['/projects/closetmate', '/#projects'])
  })

  it('renders every featured case with each table-of-contents entry pointing at a real section', async () => {
    for (const { slug } of ProjectRoute.generateStaticParams()) {
      const { container, unmount } = renderWithProviders(await ProjectRoute.default(slugParams(slug)))
      const toc = within(screen.getByRole('navigation', { name: '이 페이지' }))
      for (const link of toc.getAllByRole('link')) {
        const href = link.getAttribute('href') as string
        expect(container.querySelector(href), `${slug} ${href}`).not.toBeNull()
      }
      unmount()
    }
  })
})

describe('/story', () => {
  it('puts the four years on one page with an anchor for each year', () => {
    const { container } = renderWithProviders(<StoryPage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('4년 이야기')
    expect([...container.querySelectorAll('.timeline-year')].map((el) => el.id)).toEqual(['y2023', 'y2024', 'y2025', 'y2026'])
    expect(screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)).toEqual(['배우다', '만들다', '함께하다', '책임지다'])
    expect(storyMetadata.alternates?.canonical).toBe('/story')
  })

  it('links a year’s featured project to its case page', () => {
    renderWithProviders(<StoryPage />)
    const year2025 = document.getElementById('y2025') as HTMLElement
    expect(within(year2025).getByRole('link', { name: 'SkillPilot' })).toHaveAttribute('href', '/projects/skillpilot')
  })

  it('redirects the old year pages to the matching year, and the old flagship address to the new one', async () => {
    const redirects = await nextConfig.redirects!()
    expect(redirects).toEqual([
      ...[2023, 2024, 2025, 2026].map((year) => ({ source: `/journey/${year}`, destination: `/story#y${year}`, permanent: true })),
      { source: '/projects/suzihouse', destination: '/projects/finz', permanent: true },
    ])
  })
})

describe('/archive', () => {
  it('opens with the record in four numbers and links to each part', () => {
    renderWithProviders(<ArchivePage />)
    const stats = document.querySelector('.stat-tiles') as HTMLElement
    expect([...stats.querySelectorAll('.stat-value')].map((v) => v.textContent)).toEqual(['19', '7', '13', '17'])
    const jump = screen.getByRole('navigation', { name: '기록 바로가기' })
    expect(within(jump).getAllByRole('link').map((a) => a.getAttribute('href'))).toEqual(['#projects', '#papers', '#awards', '#background', '#activities'])
  })

  it('groups projects by year, newest first, with the featured ones linking to their case pages', () => {
    renderWithProviders(<ArchivePage />)
    const list = document.getElementById('projects') as HTMLElement
    expect(within(list).getAllByRole('heading', { level: 3 }).map((h) => h.textContent)).toEqual(['2026', '2025', '2024', '2023'])
    expect(within(list).getAllByRole('listitem')).toHaveLength(19)
    const closetmate = within(list).getByText('ClosetMate').closest('li') as HTMLElement
    expect(within(closetmate).getByRole('link', { name: /자세히 보기/ })).toHaveAttribute('href', '/projects/closetmate')
  })

  it('groups papers by kind, marking author order where it is known', () => {
    renderWithProviders(<ArchivePage />)
    const papers = document.getElementById('papers') as HTMLElement
    expect(within(papers).getAllByRole('heading', { level: 3 }).map((h) => h.textContent)).toEqual([
      '국제 학술대회 1',
      '국내 학술대회 6',
      '논문 공모전 1',
      '교내 발표 2',
    ])
    expect(within(papers).getAllByText('1저자')).toHaveLength(3)
    expect(within(papers).getAllByText('2저자')).toHaveLength(1)
  })

  it('lists awards newest first, marking the three selected ones and team awards', () => {
    renderWithProviders(<ArchivePage />)
    const awards = document.getElementById('awards') as HTMLElement
    const items = within(awards).getAllByRole('listitem')
    expect(items).toHaveLength(13)
    expect(items[0]).toHaveTextContent('26.07.22')
    expect(within(awards).getAllByText('대표')).toHaveLength(3)
    expect(within(awards).getAllByText('팀')).toHaveLength(5)
  })
})

describe('/resume', () => {
  it('builds the résumé from site content with a PDF to download and no phone number', () => {
    const { container } = renderWithProviders(<ResumePage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('허준영')
    expect(screen.getByRole('link', { name: 'PDF 내려받기' })).toHaveAttribute('href', '/resume.pdf')
    expect(container).toHaveTextContent('Finz 부동산 세금 비교')
    expect(container).toHaveTextContent('주식회사 Finz Labs')
    expect(container).not.toHaveTextContent('컴세바')
    expect(container).toHaveTextContent('eric1889@naver.com')
    expect(container.textContent).not.toMatch(/010[\s-]?\d{4}|\+82/)
  })
})

describe('not-found', () => {
  it('offers a way back home', () => {
    renderWithProviders(<NotFound />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('404')
    expect(screen.getByRole('link', { name: /홈/ })).toHaveAttribute('href', '/')
  })
})
