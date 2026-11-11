import { describe, expect, it } from 'vitest'
import { screen, within } from '@testing-library/react'
import { renderWithProviders } from '@/test/render'
import nextConfig from '../../next.config'
import * as ProjectRoute from './projects/[slug]/page'
import StoryPage, { metadata as storyMetadata } from './story/page'
import ArchivePage from './archive/page'
import DaangnResumePage from './resume/daangn/page'
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
    expect(rootMetadata.description).toBe('허준영 · 백엔드 중심 풀스택 개발자.')
    expect(rootMetadata.alternates?.canonical).toBe('/')
    expect(rootMetadata.openGraph).toMatchObject({ images: [expect.objectContaining({ url: '/og.png', width: 1200, height: 630 })] })
  })

  it('lists every page in the sitemap and points robots at it', () => {
    expect(sitemap().map((entry) => entry.url)).toEqual([
      'https://junyoung-portfolio.vercel.app',
      'https://junyoung-portfolio.vercel.app/projects/finz',
      'https://junyoung-portfolio.vercel.app/projects/skillpilot',
      'https://junyoung-portfolio.vercel.app/projects/pitches',
      'https://junyoung-portfolio.vercel.app/projects/closetmate',
      'https://junyoung-portfolio.vercel.app/projects/edumatrix',
      'https://junyoung-portfolio.vercel.app/projects/innoview',
      'https://junyoung-portfolio.vercel.app/projects/label-light',
      'https://junyoung-portfolio.vercel.app/projects/media-pulse',
      'https://junyoung-portfolio.vercel.app/story',
      'https://junyoung-portfolio.vercel.app/archive',
      'https://junyoung-portfolio.vercel.app/resume',
    ])
    expect(robots().sitemap).toBe('https://junyoung-portfolio.vercel.app/sitemap.xml')
  })
})

describe('/projects/[slug]', () => {
  it('pre-renders exactly the eight cases, flagship first', () => {
    expect(ProjectRoute.generateStaticParams()).toEqual(['finz', 'skillpilot', 'pitches', 'closetmate', 'edumatrix', 'innoview', 'label-light', 'media-pulse'].map((slug) => ({ slug })))
    expect(ProjectRoute.dynamicParams).toBe(false)
  })

  it('sends an unknown slug and a card-only project to the 404 page', async () => {
    await expect(ProjectRoute.default(slugParams('foo'))).rejects.toMatchObject(NOT_FOUND)
    await expect(ProjectRoute.default(slugParams('wildfire'))).rejects.toMatchObject(NOT_FOUND)
  })

  it('titles and describes the page by the product, with its own canonical address', async () => {
    const meta = await ProjectRoute.generateMetadata(slugParams('finz'))
    expect(meta.title).toBe('주식회사 Finz Labs · 개발 총괄')
    expect(meta.description).toContain('해외주식 양도세·증여 평가')
    expect(meta.alternates?.canonical).toBe('/projects/finz')
    expect(meta.openGraph).toMatchObject({ url: '/projects/finz', images: [expect.objectContaining({ url: '/og.png' })] })
  })

  it('shows the product name as the page heading', async () => {
    renderWithProviders(await ProjectRoute.default(slugParams('skillpilot')))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('SkillPilot 자격증·커리어 플랫폼')
  })

  it('links the work page back to the work section and on to the next case, with no previous link', async () => {
    renderWithProviders(await ProjectRoute.default(slugParams('finz')))
    expect(pageNavHrefs()).toEqual(['/#work', '/projects/skillpilot'])
  })

  it('links the last case to the previous one and the list, with no next link', async () => {
    renderWithProviders(await ProjectRoute.default(slugParams('media-pulse')))
    expect(pageNavHrefs()).toEqual(['/projects/label-light', '/#projects'])
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

  it('describes each project of a year in one line, not with its full summary', () => {
    renderWithProviders(<StoryPage />)
    for (const year of ['y2024', 'y2026']) {
      const pitches = within(document.getElementById(year) as HTMLElement).getByRole('link', { name: 'Pitches' }).closest('li') as HTMLElement
      expect(pitches).toHaveTextContent('발표하는 동안 말 속도, 감정, 음량을 분석해')
      expect(pitches).not.toHaveTextContent('해커톤 대상과 창업 경진대회 특별상')
    }
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
    expect([...stats.querySelectorAll('.stat-value')].map((v) => v.textContent)).toEqual(['18', '7', '13', '17'])
    const jump = screen.getByRole('navigation', { name: '기록 바로가기' })
    expect(within(jump).getAllByRole('link').map((a) => a.getAttribute('href'))).toEqual(['#projects', '#papers', '#awards', '#background', '#activities'])
  })

  it('groups projects by year, newest first, with the featured ones linking to their case pages', () => {
    renderWithProviders(<ArchivePage />)
    const list = document.getElementById('projects') as HTMLElement
    expect(within(list).getAllByRole('heading', { level: 3 }).map((h) => h.textContent)).toEqual(['2026', '2025', '2024', '2023'])
    expect(within(list).getAllByRole('listitem')).toHaveLength(18)
    const closetmate = within(list).getByText('ClosetMate').closest('li') as HTMLElement
    expect(within(closetmate).getByRole('link', { name: /자세히 보기/ })).toHaveAttribute('href', '/projects/closetmate')
  })

  it('shows a captioned picture for every project that has one, labelling where a demo ran', () => {
    renderWithProviders(<ArchivePage />)
    const list = document.getElementById('projects') as HTMLElement
    const figures = [...list.querySelectorAll('figure')]
    expect(figures).toHaveLength(13)
    for (const figure of figures) expect(figure.querySelector('figcaption')?.textContent?.trim()).toBeTruthy()
    const pitches = within(list).getByText('Pitches').closest('li') as HTMLElement
    expect(pitches.querySelector('figcaption')).toHaveTextContent('iOS 시뮬레이터')
  })

  it('groups papers by kind, marking author order where it is known', () => {
    renderWithProviders(<ArchivePage />)
    const papers = document.getElementById('papers') as HTMLElement
    expect(within(papers).getAllByRole('heading', { level: 3 }).map((h) => h.textContent)).toEqual([
      '국제학술대회 1',
      '국내학술대회 6',
      '논문 공모전 1',
      '교내 발표 2',
    ])
    expect(within(papers).getAllByText('제1저자')).toHaveLength(9)
    expect(within(papers).getAllByText('제2저자')).toHaveLength(1)
  })

  it('lists awards newest first, marking the three selected ones and team awards', () => {
    renderWithProviders(<ArchivePage />)
    const awards = document.getElementById('awards') as HTMLElement
    const items = within(awards).getAllByRole('listitem')
    expect(items).toHaveLength(13)
    expect(items[0]).toHaveTextContent('26.07.22')
    expect(within(awards).getAllByText('대표')).toHaveLength(3)
    const activities = document.getElementById('activities') as HTMLElement
    expect(within(activities).getAllByText('대표')).toHaveLength(3)
    expect(within(awards).getAllByText('팀')).toHaveLength(5)
  })
})

describe('/resume', () => {
  it('reads top to bottom as 제목 → 직무명 → 인적 사항 → 학력 → 경력 → 대표 프로젝트 → 수상 → 경험 및 활동 → 자기 소개서, with three contacts and no certificate', () => {
    const { container } = renderWithProviders(<ResumePage />)
    expect(container.querySelector('.resume-title')).toHaveTextContent('문제를 이해하는 것에서 시작해, 신뢰할 수 있는 결과로 완성합니다.')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('백엔드 중심 풀스택 개발자 허준영')
    expect(screen.getByRole('link', { name: 'PDF 내려받기' })).toHaveAttribute('href', '/resume.pdf')
    expect([...container.querySelectorAll('.resume-part > h2')].map((h) => h.textContent)).toEqual(['인적 사항', '학력 및 교육 사항', '경력', '대표 프로젝트', '수상', '경험 및 활동', '자기 소개서'])
    expect([...container.querySelectorAll('.resume-facts dt')].map((dt) => dt.textContent)).toEqual(['이메일', 'GitHub', '포트폴리오'])
    expect(container.querySelector('.resume-facts')).toHaveTextContent('eric1889@naver.com')
    expect(container.querySelector('.resume-service')).toBeNull()
    expect(container).not.toHaveTextContent('TOPCIT')
    expect(container).not.toHaveTextContent('junyoung-dev-notes')
    expect(container.querySelector('.resume-photo.is-placeholder')).toHaveTextContent('사진')
    expect(container.textContent).not.toMatch(/010[\s-]?\d{4}|\+82/)
  })

  it('tells the job and each main project in labelled rows: 내용 · 개발 환경 · (문제 해결) · 결과', () => {
    const { container } = renderWithProviders(<ResumePage />)
    const parts = [...container.querySelectorAll('.resume-part')]
    const experience = parts.find((part) => part.querySelector('h2')?.textContent === '경력') as HTMLElement
    expect(experience).toHaveTextContent('주식회사 Finz Labs (finz.kr) · 개발 총괄 2026.01–')
    expect(experience).toHaveTextContent('직원 5명 스타트업 · www.finz.kr')
    expect([...experience.querySelectorAll('.resume-kv-row dt')].map((dt) => dt.textContent)).toEqual(['내용', '개발 환경', '결과 및 성과'])
    expect(experience.querySelectorAll('.resume-bullets li')).toHaveLength(5)
    expect(experience).toHaveTextContent('배포 9번 연속 실패 원인 재현')
    const projectsPart = parts.find((part) => part.querySelector('h2')?.textContent === '대표 프로젝트') as HTMLElement
    const entries = [...projectsPart.querySelectorAll('.resume-project')]
    expect(entries.map((item) => item.querySelector('.resume-item-head strong')?.textContent)).toEqual(['SkillPilot 자격증·커리어 플랫폼', 'Pitches 발표 코칭', 'ClosetMate 옷장·코디 추천 앱'])
    expect(entries.map((item) => [...item.querySelectorAll('.resume-kv-row dt')].map((dt) => dt.textContent))).toEqual([
      ['내용', '개발 환경', '문제 해결', '결과'],
      ['내용', '개발 환경', '문제 해결', '결과'],
      ['내용', '개발 환경', '문제 해결', '결과'],
    ])
    expect(entries.map((item) => item.querySelectorAll('.resume-bullets li').length)).toEqual([2, 2, 2])
    expect(entries[0].querySelector('.resume-solve')).toHaveTextContent('HTTP 200 응답에 포함된 공공 API 오류 처리 — 상태 코드만으로 API 성공 여부를 판단하기 어려웠습니다. → 공통 API 클라이언트에 본문 검사와 재시도 처리를 추가했습니다.')
    expect([...projectsPart.querySelectorAll('.resume-repo')].map((a) => a.getAttribute('href'))).toEqual([
      'https://github.com/Hanshin-OSS-Hub/capstone25-skillpilot',
      'https://github.com/ERIC1889/pitches',
      'https://github.com/ERIC1889/ClosetMate',
    ])
    expect(container).not.toHaveTextContent('EduMatrix —')
  })

  it('shows five awards with a bold count of the rest, every activity in one line and three papers with the rest counted', () => {
    const { container } = renderWithProviders(<ResumePage />)
    const parts = [...container.querySelectorAll('.resume-part')]
    const awards = parts.find((part) => part.querySelector('h2')?.textContent === '수상') as HTMLElement
    const awardLines = [...awards.querySelectorAll('.resume-rows li')].map((li) => li.textContent ?? '')
    expect(awardLines).toHaveLength(5)
    expect(awardLines[0]).toContain('AI·블록체인 비즈니스모델 경진대회 우수상 (Finz)')
    expect(awardLines[4]).toContain('캡스톤 디자인 및 AI 해커톤 대상(1등) (Pitches)')
    expect(awards.querySelector('.resume-more strong')).toHaveTextContent('외 8건')
    expect(awards).toHaveTextContent('전체 기록 junyoung-portfolio.vercel.app/archive')
    const experiences = parts.find((part) => part.querySelector('h2')?.textContent === '경험 및 활동') as HTMLElement
    const groups = [...experiences.querySelectorAll('.resume-group')]
    expect(groups.map((group) => group.querySelector('h3')?.textContent)).toEqual(['활동', '논문'])
    const activityLines = [...groups[0].querySelectorAll('li')].map((li) => li.textContent ?? '')
    expect(activityLines).toHaveLength(17)
    expect(activityLines[0]).toContain('CES 2026 참관 · CES')
    expect(groups[0].querySelector('.resume-activity-desc')).toBeNull()
    expect(groups[1]).toHaveTextContent('학술대회 논문 7편 (국제 1편 · 1저자 6편) · 공모전·교내 발표 3편')
    expect(groups[1].querySelectorAll('li')).toHaveLength(3)
    expect(groups[1].querySelector('.resume-more strong')).toHaveTextContent('외 7편')
    expect(container).not.toHaveTextContent('컴세바')
  })

  it('closes with the personal statement on its own page: the site intro paragraph and three more, and no 지원 동기 on the public copy', () => {
    const { container } = renderWithProviders(<ResumePage />)
    const parts = [...container.querySelectorAll('.resume-part')]
    const intro = parts[parts.length - 1]
    expect(intro).toHaveClass('is-break')
    expect(intro.querySelector('h2')).toHaveTextContent('자기 소개서')
    const paragraphs = [...intro.querySelectorAll('.resume-prose p')].map((el) => el.textContent ?? '')
    expect(paragraphs).toHaveLength(4)
    expect(paragraphs[0]).toContain('사용자의 요구를 기술적 해결책으로 구체화하고')
    expect(paragraphs[3]).toContain('프로젝트 18개, 학술대회 논문 7편(국제 1편 · 1저자 6편), 수상 13건')
    expect(intro.querySelector('.resume-motivation')).toBeNull()
  })

  it('prints the submission copy with the backend title, phone, the 병역 row and 지원 동기 from the environment and the variant, which the public page never shows', () => {
    process.env.RESUME_SERVICE_KO = '보충역 신규 편입 (테스트)'
    process.env.RESUME_PHONE = '010-0000-0000'
    try {
      const { container } = renderWithProviders(<DaangnResumePage />)
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('백엔드 개발자 허준영')
      expect([...container.querySelectorAll('.resume-facts dt')].map((dt) => dt.textContent)).toEqual(['전화', '이메일', 'GitHub', '포트폴리오', '병역 · 입사'])
      expect(container.querySelector('.resume-facts a[href^="tel:"]')).toHaveAttribute('href', 'tel:01000000000')
      expect(container.querySelector('.resume-service')).toHaveTextContent('보충역 신규 편입 (테스트)')
      const motivation = container.querySelector('.resume-motivation') as HTMLElement
      expect(motivation.querySelector('h3')).toHaveTextContent('지원 동기')
      expect(motivation).toHaveTextContent('당근에 지원하는 이유는 세 가지입니다')
    } finally {
      delete process.env.RESUME_SERVICE_KO
      delete process.env.RESUME_PHONE
    }
  })
})

describe('not-found', () => {
  it('offers a way back home', () => {
    renderWithProviders(<NotFound />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('404')
    expect(screen.getByRole('link', { name: /홈/ })).toHaveAttribute('href', '/')
  })
})
