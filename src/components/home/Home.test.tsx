import { describe, expect, it } from 'vitest'
import { screen, within } from '@testing-library/react'
import { renderWithProviders } from '@/test/render'
import Home from '@/app/page'

const sectionOf = (name: string) => screen.getByRole('heading', { level: 2, name }).closest('section') as HTMLElement

describe('home page (real content)', () => {
  it('leads with the name as the largest heading, then the role and the owner’s line', () => {
    renderWithProviders(<Home />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('허준영')
    expect(screen.getByText('백엔드 중심 풀스택 개발자 · 2027년 2월 졸업 예정')).toBeInTheDocument()
    expect(screen.getByText(/익숙한 기술에 머물기보다,/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /대표 프로젝트 보기/ })).toHaveAttribute('href', '#projects')
    expect(screen.getByRole('link', { name: '이력서' })).toHaveAttribute('href', '/resume')
  })

  it('shows no counts line in the first screen', () => {
    renderWithProviders(<Home />)
    const intro = screen.getByRole('heading', { level: 1 }).closest('section') as HTMLElement
    expect(intro).not.toHaveTextContent('수상')
    expect(intro).not.toHaveTextContent('논문')
  })

  it('orders the sections: main projects, skills, supporting projects, experience, contact', () => {
    renderWithProviders(<Home />)
    expect(screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)).toEqual([
      '대표 프로젝트',
      '기술',
      '보조 프로젝트',
      '경험',
      '연락',
    ])
  })

  it('presents the flagship with its demo video, four features and both links, without a verification block', () => {
    renderWithProviders(<Home />)
    const flagship = sectionOf('대표 프로젝트')
    expect(within(flagship).getByRole('heading', { level: 3 })).toHaveTextContent('Finz 개인 세금 계산기')
    expect(flagship.querySelector('video')).toHaveAttribute('poster', '/media/finz/web-demo-poster.webp')
    expect(flagship.querySelectorAll('ol.feature-list > li')).toHaveLength(4)
    expect(within(flagship).queryByText('검증')).toBeNull()
    expect(within(flagship).getByRole('link', { name: /자세히 보기/ })).toHaveAttribute('href', '/projects/finz')
    expect(within(flagship).getByRole('link', { name: /개인 세금 계산기 열기/ })).toHaveAttribute('href', 'https://www.finz.kr/personal')
    expect(within(flagship).queryAllByRole('img')).toHaveLength(0)
  })

  it('lays out skills as a table with a header row and six areas, without an evidence column', () => {
    renderWithProviders(<Home />)
    const table = within(sectionOf('기술')).getByRole('table')
    expect(within(table).getAllByRole('columnheader').map((th) => th.textContent)).toEqual(['역량', '기술', '무엇을 했나'])
    expect(within(table).getAllByRole('rowheader')).toHaveLength(6)
    expect(within(table).queryAllByRole('link')).toHaveLength(0)
  })

  it('follows the flagship with SkillPilot, Pitches and ClosetMate', () => {
    renderWithProviders(<Home />)
    const main = screen.getAllByRole('region', { name: '대표 프로젝트' })[1]
    expect(within(main).getAllByRole('heading', { level: 3 }).map((h) => h.textContent)).toEqual(['SkillPilot 자격증·커리어 플랫폼', 'Pitches 발표 코칭', 'ClosetMate 옷장·코디 추천 앱'])
    expect(main).toHaveTextContent('Express 5')
    expect(within(main).getByRole('link', { name: /API 클라이언트/ })).toHaveAttribute('href', expect.stringContaining('client.js'))
  })

  it('lists the supporting projects with a way to all projects, leaving the rest off the home page', () => {
    renderWithProviders(<Home />)
    const supporting = sectionOf('보조 프로젝트')
    expect(within(supporting).getAllByRole('heading', { level: 3 }).map((h) => h.textContent)).toEqual(['EduMatrix', 'InnoView', 'Label Light'])
    expect(within(supporting).getByRole('link', { name: /전체 프로젝트 보기/ })).toHaveAttribute('href', '/archive#projects')
    expect(screen.queryByRole('heading', { name: '그 밖의 프로젝트' })).toBeNull()
    expect(screen.queryByText('Media Pulse')).toBeNull()
  })

  it('lists work then school as dated rows, without the coding-instructor job', () => {
    renderWithProviders(<Home />)
    const experience = sectionOf('경험')
    const rows = [...experience.querySelectorAll('.exp-row')]
    expect(rows.map((row) => row.querySelector('.exp-when')?.textContent)).toEqual(['2026.01–', '2023.03–2027.02'])
    expect(rows[0]).toHaveTextContent('주식회사 Finz Labs (finz.kr)')
    expect(rows[1]).toHaveTextContent('3.7 / 4.5')
    expect(experience).not.toHaveTextContent('컴세바')
  })

  it('shows the record as three big numbers and the three top awards', () => {
    renderWithProviders(<Home />)
    const experience = sectionOf('경험')
    const stats = within(experience).getByLabelText('기록 요약')
    expect([...stats.querySelectorAll('.stat')].map((s) => [s.querySelector('dt')?.textContent, s.querySelector('.stat-value')?.textContent])).toEqual([
      ['프로젝트', '18'],
      ['학술대회 논문', '7'],
      ['수상', '13'],
    ])
    expect(experience).toHaveTextContent('국제 1 · 1저자 3')
    expect(experience.querySelectorAll('.award-rows > li')).toHaveLength(3)
    expect(experience.querySelector('.award-rows > li')).toHaveTextContent('2024.10캡스톤 디자인 및 AI 해커톤 대상(1등)')
    const awardLinks = [...experience.querySelectorAll('.award-rows a')].map((a) => a.getAttribute('href'))
    expect(awardLinks).toEqual(['/projects/pitches', '/projects/pitches', '/projects/finz'])
    expect(within(experience).getByRole('link', { name: /전체 기록 보기/ })).toHaveAttribute('href', '/archive')
    expect(within(experience).getByRole('link', { name: /4년 이야기/ })).toHaveAttribute('href', '/story')
  })

  it('lists contact links on one line, without a phone number or address', () => {
    renderWithProviders(<Home />)
    const contact = sectionOf('연락')
    expect(within(contact).getAllByRole('link').map((a) => a.getAttribute('href'))).toEqual([
      'mailto:eric1889@naver.com',
      'https://github.com/ERIC1889',
      'https://www.linkedin.com/in/%EC%A4%80%EC%98%81-%ED%97%88-8142a130a/',
      'https://junyoung-dev-notes.vercel.app',
    ])
    expect(document.querySelector('a[href^="tel:"]')).toBeNull()
  })

  it('switches to English for an English browser', async () => {
    renderWithProviders(<Home />, 'en-US')
    expect(await screen.findByRole('heading', { level: 1, name: 'Heo Jun Young' })).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)).toEqual([
      'Main projects',
      'Skills',
      'Supporting projects',
      'Experience',
      'Contact',
    ])
  })
})
