import { describe, expect, it } from 'vitest'
import { screen, within } from '@testing-library/react'
import { renderWithProviders } from '@/test/render'
import Home from '@/app/page'

const sectionOf = (name: string) => screen.getByRole('heading', { level: 2, name }).closest('section') as HTMLElement

describe('home page (real content)', () => {
  it('leads with the name as the largest heading, then the role and the owner’s line', () => {
    renderWithProviders(<Home />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('허준영')
    expect(screen.getByText('백엔드 중심 풀스택 개발자')).toBeInTheDocument()
    expect(screen.getByText(/문제를 이해하는 것에서 시작해,/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /대표 프로젝트 보기/ })).toHaveAttribute('href', '#projects')
    expect(screen.getByRole('link', { name: '이력서' })).toHaveAttribute('href', '/resume')
  })

  it('shows no counts line in the first screen', () => {
    renderWithProviders(<Home />)
    const intro = screen.getByRole('heading', { level: 1 }).closest('section') as HTMLElement
    expect(intro).not.toHaveTextContent('수상')
    expect(intro).not.toHaveTextContent('논문')
  })

  it('orders the sections: work, main projects, skills, AI, supporting projects, awards and activities, contact', () => {
    renderWithProviders(<Home />)
    expect(screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)).toEqual([
      '실무 경험',
      '대표 프로젝트',
      '기술',
      'AI와 일하는 방식',
      '보조 프로젝트',
      '수상과 활동',
      '연락',
    ])
  })

  it('presents the work experience with the finz.kr demo, the company and title, a product table, four results and two links', () => {
    renderWithProviders(<Home />)
    const work = sectionOf('실무 경험')
    expect(within(work).getByRole('heading', { level: 3 })).toHaveTextContent('주식회사 Finz Labs · 개발 총괄')
    expect(work).toHaveTextContent('2026.01–')
    expect(work.querySelector('video')).toHaveAttribute('poster', '/media/finz/web-demo-poster.webp')
    const table = within(work).getByRole('table')
    expect(within(table).getAllByRole('columnheader').map((th) => th.textContent)).toEqual(['제품', '상태', '내 역할'])
    expect(within(table).getAllByRole('rowheader').map((th) => th.textContent)).toEqual(['개인 세금 계산기', 'Finz 모바일 앱', '세무사용 FINZ'])
    expect(work).toHaveTextContent('직원 5명')
    expect(within(table).getAllByRole('link').map((a) => a.getAttribute('href'))).toEqual(['/projects/finz#calculators', '/projects/finz#refund-app', '/projects/finz#finz-saas'])
    expect([...work.querySelectorAll('.highlights > li')].map((li) => li.textContent)).toEqual([
      'finz.kr에서 계산기 4종 운영',
      '저장소 테스트 192개',
      '배포 9번 연속 실패 원인 재현',
      '2026 AI·블록체인 BM 경진대회 우수상 (Finz 앱)',
    ])
    expect(within(work).getByRole('link', { name: /실무 상세 보기/ })).toHaveAttribute('href', '/projects/finz')
    expect(within(work).getByRole('link', { name: /회사 웹 finz.kr/ })).toHaveAttribute('href', 'https://www.finz.kr')
    expect(work.querySelector('.feature-list')).toBeNull()
  })

  it('lays out skills as a table with a header row and six areas, without an evidence column', () => {
    renderWithProviders(<Home />)
    const table = within(sectionOf('기술')).getByRole('table')
    expect(within(table).getAllByRole('columnheader').map((th) => th.textContent)).toEqual(['역량', '기술', '무엇을 했나'])
    expect(within(table).getAllByRole('rowheader')).toHaveLength(6)
    expect(within(table).queryAllByRole('link')).toHaveLength(0)
  })

  it('lists SkillPilot, Pitches and ClosetMate as the main projects, each card leading with its key results instead of a feature list', () => {
    renderWithProviders(<Home />)
    const main = sectionOf('대표 프로젝트')
    expect(within(main).getAllByRole('heading', { level: 3 }).map((h) => h.textContent)).toEqual(['SkillPilot 자격증·커리어 플랫폼', 'Pitches 발표 코칭', 'ClosetMate 옷장·코디 추천 앱'])
    expect([...main.querySelectorAll('.project-row h4.label')].map((h) => h.textContent)).toEqual(['주요 성과', '주요 성과', '주요 성과'])
    expect([...main.querySelectorAll('.project-row')].map((row) => row.querySelectorAll('.feature-list > li').length)).toEqual([3, 3, 3])
    expect(main).toHaveTextContent('캡스톤 디자인 및 AI 해커톤 대상(1등, 2024.10)')
    expect(main).not.toHaveTextContent('AI 기반의 맞춤형 자격증 추천')
    expect(main).toHaveTextContent('Express 5')
    expect(within(main).getByRole('link', { name: /공개 저장소/ })).toHaveAttribute('href', 'https://github.com/Hanshin-OSS-Hub/capstone25-skillpilot')
  })

  it('explains how I work with AI: three tools, a six-step flow, three cards, the simple-authentication case and the blog post', () => {
    renderWithProviders(<Home />)
    const ai = sectionOf('AI와 일하는 방식')
    expect(ai).toHaveTextContent('Claude Code · Codex · Antigravity를 거의 매일')
    expect([...ai.querySelectorAll('.ai-tools > li > strong')].map((el) => el.textContent)).toEqual(['Claude Code', 'Codex', 'Antigravity'])
    expect([...ai.querySelectorAll('.ai-flow > li > strong')].map((el) => el.textContent)).toEqual(['기획', '설계', '구현 · 디자인', '교차 리뷰', '직접 검토 · 보완', '검증'])
    expect([...ai.querySelectorAll('.ai-card h3')].map((el) => el.textContent)).toEqual(['맡기는 일과 제가 정하는 일', '교차 리뷰 다음은 제 검증', '통제와 보안'])
    expect(ai).toHaveTextContent('내보낸 결과는 제가 책임집니다')
    expect(ai).toHaveTextContent('설명할 수 없는 코드는 제 이름으로 내보내지 않습니다')
    expect(within(ai).getByRole('link', { name: /사례 보기/ })).toHaveAttribute('href', '/projects/finz#refund-app')
    expect(ai).toHaveTextContent('휴대폰 인증 5번 → 1번')
    expect(within(ai).getByRole('link', { name: /기술 블로그/ })).toHaveAttribute('href', 'https://junyoung-dev-notes.vercel.app/posts/ai-tools-in-the-workflow')
    expect(ai).not.toHaveTextContent('165')
  })

  it('lists the supporting projects with their results and a way to all projects, leaving the rest off the home page', () => {
    renderWithProviders(<Home />)
    const supporting = sectionOf('보조 프로젝트')
    expect(within(supporting).getAllByRole('heading', { level: 3 }).map((h) => h.textContent)).toEqual(['EduMatrix', 'InnoView', 'Label Light'])
    expect([...supporting.querySelectorAll('.project-row h4.label')].map((h) => h.textContent)).toEqual(['주요 성과', '주요 성과', '주요 성과'])
    expect(within(supporting).getByRole('link', { name: /프로젝트 18개 모두 보기/ })).toHaveAttribute('href', '/archive#projects')
    expect(screen.queryByRole('heading', { name: '그 밖의 프로젝트' })).toBeNull()
    expect(screen.queryByText('Media Pulse')).toBeNull()
  })

  it('shows the record as three big numbers, the top awards and activities and the school, without repeating the job', () => {
    renderWithProviders(<Home />)
    const record = sectionOf('수상과 활동')
    const stats = within(record).getByLabelText('기록 요약')
    expect([...stats.querySelectorAll('.stat')].map((s) => [s.querySelector('dt')?.textContent, s.querySelector('.stat-value')?.textContent])).toEqual([
      ['프로젝트', '18'],
      ['학술대회 논문', '7'],
      ['수상', '13'],
    ])
    expect(record).toHaveTextContent('국제 1 · 1저자 6')
    expect(record.querySelectorAll('.award-rows:not(.activity-rows) > li')).toHaveLength(3)
    expect(record.querySelector('.award-rows > li')).toHaveTextContent('2024.10캡스톤 디자인 및 AI 해커톤 대상(1등)')
    expect([...record.querySelectorAll('.award-rows a')].map((a) => a.getAttribute('href'))).toEqual(['/projects/pitches', '/projects/pitches', '/projects/finz'])
    expect([...record.querySelectorAll('.activity-rows > li .award-name')].map((el) => el.textContent)).toEqual(['WebDB 랩장', 'SW 인재 페스티벌', 'CES 2026 참관'])
    expect([...record.querySelectorAll('.activity-rows > li .award-date')].map((el) => el.textContent)).toEqual(['2025.01–2026.07', '2024.12', '2026.01'])
    const rows = [...record.querySelectorAll('.exp-row')]
    expect(rows.map((row) => row.querySelector('.exp-when')?.textContent)).toEqual(['2023.03–2027.02'])
    expect(rows[0]).toHaveTextContent('3.7 / 4.5')
    expect(record).not.toHaveTextContent('Finz Labs')
    expect(record).not.toHaveTextContent('컴세바')
    expect(within(record).getByRole('link', { name: /전체 기록 보기/ })).toHaveAttribute('href', '/archive')
    expect(within(record).getByRole('link', { name: /4년 이야기/ })).toHaveAttribute('href', '/story')
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
      'Work experience',
      'Main projects',
      'Skills',
      'How I work with AI',
      'Supporting projects',
      'Awards and activities',
      'Contact',
    ])
  })
})
