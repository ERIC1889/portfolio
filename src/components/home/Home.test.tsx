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

  it('orders the sections: flagship, skills, more projects, other work, experience, contact', () => {
    renderWithProviders(<Home />)
    expect(screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)).toEqual([
      '대표 프로젝트',
      '기술',
      '다른 프로젝트',
      '그 밖의 작업',
      '경험',
      '연락',
    ])
  })

  it('presents the flagship with its demo video, three features, the workbook check and both links', () => {
    renderWithProviders(<Home />)
    const flagship = sectionOf('대표 프로젝트')
    expect(within(flagship).getByRole('heading', { level: 3 })).toHaveTextContent('Finz 부동산 세금 비교')
    expect(flagship.querySelector('video')).toHaveAttribute('poster', '/media/finz/web-demo-poster.webp')
    expect(flagship.querySelectorAll('ol.feature-list > li')).toHaveLength(3)
    expect(flagship).toHaveTextContent('21/21')
    expect(within(flagship).getByRole('link', { name: /자세히 보기/ })).toHaveAttribute('href', '/projects/finz')
    expect(within(flagship).getByRole('link', { name: /부동산 6Way 열기/ })).toHaveAttribute('href', 'https://www.finz.kr/personal/property')
    // the demo video carries the visuals here; the screens live on the case page
    expect(within(flagship).queryAllByRole('img')).toHaveLength(0)
  })

  it('lays out skills as a table with a header row and six areas, each with evidence links', () => {
    renderWithProviders(<Home />)
    const table = within(sectionOf('기술')).getByRole('table')
    expect(within(table).getAllByRole('columnheader').map((th) => th.textContent)).toEqual(['역량', '기술', '무엇을 했나', '근거'])
    expect(within(table).getAllByRole('rowheader')).toHaveLength(6)
    expect(within(table).getByRole('link', { name: /SkillPilot API 클라이언트/ })).toHaveAttribute('href', expect.stringContaining('client.js'))
  })

  it('shows SkillPilot and ClosetMate with their stack and a way into each case', () => {
    renderWithProviders(<Home />)
    const more = sectionOf('다른 프로젝트')
    expect(within(more).getAllByRole('heading', { level: 3 }).map((h) => h.textContent)).toEqual([
      'SkillPilot 자격증·커리어 플랫폼',
      'ClosetMate 옷장·코디 추천 앱',
    ])
    expect(more).toHaveTextContent('Express 5')
    expect(within(more).getByRole('link', { name: /API 클라이언트/ })).toHaveAttribute('href', expect.stringContaining('client.js'))
  })

  it('keeps Pitches under other work, with its picture labelled as a mockup', () => {
    renderWithProviders(<Home />)
    const other = sectionOf('그 밖의 작업')
    expect(other).toHaveTextContent('Pitches 발표 코칭')
    expect(within(other).getByText('목업')).toBeInTheDocument()
    expect(within(other).getByRole('link', { name: /전체 기록 보기/ })).toHaveAttribute('href', '/archive')
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
      ['프로젝트', '19'],
      ['학술대회 논문', '7'],
      ['수상', '13'],
    ])
    expect(experience).toHaveTextContent('국제 1 · 1저자 3')
    expect(experience.querySelectorAll('.award-rows > li')).toHaveLength(3)
    expect(experience.querySelector('.award-rows > li')).toHaveTextContent('2024.10캡스톤 디자인 및 AI 해커톤 대상(1등)')
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
      'Main project',
      'Skills',
      'More projects',
      'Other work',
      'Experience',
      'Contact',
    ])
  })
})
