import { describe, expect, it, vi } from 'vitest'
import { screen, within } from '@testing-library/react'
import type { ReactNode } from 'react'

// jsdom has no layout, so the scroll-linked fade would keep every section at opacity 0.
// Replace only that wrapper; visibility below then reflects the components' own behavior.
vi.mock('@/components/motion', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/components/motion')>()),
  ScrollSection: ({ children, className, id }: { children: ReactNode; className?: string; id?: string }) => (
    <section className={className} id={id}>
      {children}
    </section>
  ),
}))
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/test/render'
import type { Archive as ArchiveData, Chapter, Profile, Project } from '@/content/types'
import { Hero } from './Hero'
import { JourneyLog } from './JourneyLog'
import { Throughline } from './Throughline'
import { FeaturedCases } from './FeaturedCases'
import { Archive } from './Archive'
import { Contact } from './Contact'

const l = (ko: string, en = '') => ({ ko, en })

const profile: Profile = {
  whoami: l('~/junyoung $ whoami → 허준영 · full-stack · AI 서비스'),
  quote: l('주어진 상황 안에서 가만히 있지는 않았습니다.'),
  intro: l('지금은 결과를 끝까지 확인하는 개발자입니다.'),
  photo: '/profile.jpeg',
  contacts: [
    { kind: 'email', label: l('이메일'), value: l('eric1889@naver.com'), href: 'mailto:eric1889@naver.com' },
    { kind: 'github', label: l('GitHub'), value: l('github.com/ERIC1889'), href: 'https://github.com/ERIC1889' },
    { kind: 'address', label: l('주소'), value: l('서울특별시') },
  ],
}

const chapters: Chapter[] = [
  { year: 2023, name: l('배우다'), lesson: l('성과 없이 남은 작은 경험'), essay: [] },
  { year: 2024, name: l('만들다'), lesson: l('첫 대상, 그리고 브라이튼'), essay: [] },
  { year: 2025, name: l('함께하다'), lesson: l('랩장, 과부하, 한계'), essay: [] },
  { year: 2026, name: l('책임지다'), lesson: l('실무, 검증의 무게'), essay: [] },
]

function project(slug: string, name: string, tier: Project['tier'], years: Project['years'], extra: Partial<Project> = {}): Project {
  return { slug, name, tier, years, period: '2025.01–2025.02', stack: ['React', 'Express'], summary: l(`${name} 요약`), ...extra }
}

const scene = (minus: string, plus: string) => ({ minus: l(minus), plus: l(plus) })

const stats = [
  { label: l('수상'), value: 13 },
  { label: l('논문'), value: 8 },
  { label: l('프로젝트'), value: 19 },
]

describe('Hero', () => {
  it('opens with the whoami line, the one sentence and the intro', () => {
    renderWithProviders(<Hero profile={profile} stats={stats} />)
    const whoami = screen.getByText(/whoami/).closest('p')
    expect(whoami?.textContent?.replace(/\s+/g, ' ').trim()).toBe('~/junyoung $ whoami → 허준영 · full-stack · AI 서비스')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('주어진 상황 안에서 가만히 있지는 않았습니다.')
    expect(screen.getByText(profile.intro.ko)).toBeInTheDocument()
  })

  it('shows a small line of counts under the intro, in the order given', () => {
    const { container } = renderWithProviders(<Hero profile={profile} stats={stats} />)
    const items = [...container.querySelectorAll('.hero-stats > div')].map((item) => item.textContent)
    expect(items).toEqual(['수상 13', '논문 8', '프로젝트 19'])
  })

  it('offers exactly three ways in: the story, the cases and GitHub', () => {
    renderWithProviders(<Hero profile={profile} stats={stats} />)
    const hrefs = screen.getAllByRole('link').map((a) => a.getAttribute('href'))
    expect(hrefs).toEqual(['/#journey', '/#cases', 'https://github.com/ERIC1889'])
  })

  it('has no resume button and no counters', () => {
    const { container } = renderWithProviders(<Hero profile={profile} stats={stats} />)
    expect(container.textContent).not.toMatch(/이력서|Resume/i)
    expect(container.textContent).not.toMatch(/\d+\+/)
  })
})

describe('JourneyLog', () => {
  it('prints a git log with one row per year, each linking to that year', () => {
    renderWithProviders(<JourneyLog chapters={chapters} />)
    expect(screen.getByText('git log --reverse --oneline', { exact: false })).toBeInTheDocument()
    const rows = within(screen.getByRole('list')).getAllByRole('link')
    expect(rows.map((a) => a.getAttribute('href'))).toEqual(['/journey/2023', '/journey/2024', '/journey/2025', '/journey/2026'])
    expect(rows[2]).toHaveTextContent('2025')
    expect(rows[2]).toHaveTextContent('함께하다')
    expect(rows[2]).toHaveTextContent('랩장, 과부하, 한계')
  })
})

describe('Throughline', () => {
  const items = [
    project('media-pulse', 'Media Pulse', 'card', [2023], { throughline: 1, scene: scene('비율만 준다', '기준점으로 엮었다') }),
    project('pitches', 'Pitches', 'featured', [2024, 2026], { throughline: 2, scene: scene('Whisper가 느리다', 'SenseVoice를 골랐다') }),
  ] as (Project & { scene: NonNullable<Project['scene']> })[]

  it('names the project in English for English readers', async () => {
    const suzihouse = project('suzihouse', '수지하우스', 'featured', [2026], {
      nameEn: 'SuziHouse',
      throughline: 6,
      scene: scene('API가 느리다', '캐시를 뒀다'),
    }) as Project & { scene: NonNullable<Project['scene']> }
    renderWithProviders(<Throughline items={[suzihouse]} />, 'en-US')
    expect(await screen.findByRole('heading', { level: 3, name: 'SuziHouse' })).toBeInTheDocument()
  })

  it('shows each scene as a card like the featured cases: year, name, the constraint and what I did', () => {
    renderWithProviders(<Throughline items={items} />)
    const card = screen.getByRole('link', { name: /Media Pulse/ })
    expect(card.closest('.project-card')).not.toBeNull()
    expect(within(card).getByRole('heading', { level: 3 })).toHaveTextContent('Media Pulse')
    expect(within(card).getByText('2023')).toBeInTheDocument()
    expect(card).toHaveTextContent('- 막힌 지점: 비율만 준다')
    expect(card).toHaveTextContent('+ 내가 한 것: 기준점으로 엮었다')
  })

  it('opens featured projects as their case and the others in their year', () => {
    renderWithProviders(<Throughline items={items} />)
    const hrefs = screen.getAllByRole('link').map((a) => a.getAttribute('href'))
    expect(hrefs).toEqual(['/journey/2023#media-pulse', '/projects/pitches'])
  })
})

describe('FeaturedCases', () => {
  const featured = [
    project('suzihouse', '수지하우스', 'featured', [2026]),
    project('closetmate', 'ClosetMate', 'featured', [2026]),
    project('skillpilot', 'SkillPilot', 'featured', [2025], { evidence: 'certificationSync.service.js' }),
    project('pitches', 'Pitches', 'featured', [2024, 2026]),
  ]

  it('links each of the four cases to its own page', () => {
    renderWithProviders(<FeaturedCases projects={featured} />)
    const hrefs = screen.getAllByRole('link').map((a) => a.getAttribute('href'))
    expect(hrefs).toEqual(['/projects/suzihouse', '/projects/closetmate', '/projects/skillpilot', '/projects/pitches'])
  })

  it('shows an evidence line: the given evidence, or the stack when there is none', () => {
    renderWithProviders(<FeaturedCases projects={featured} />)
    expect(screen.getByText('→ certificationSync.service.js')).toBeInTheDocument()
    expect(screen.getAllByText('→ React · Express')).toHaveLength(3)
  })
})

describe('Archive', () => {
  const archive: ArchiveData = {
    papers: [{ title: 'Pitches: Real-Time Presentation Coaching', venue: l('APIC-IST 2025'), year: 2025, international: true }],
    awards: [{ date: '24.10.24 ~ 24.10.27', name: l('캡스톤 디자인 및 AI 해커톤 대상(1등)'), org: l('한국 컴퓨터 교육 학회') }],
    activities: [{ period: '25.01.01 ~ 26.07.01', name: l('WebDB 랩장'), org: l('한신대학교'), desc: l('연구실 운영') }],
    work: [{ company: l('컴세바 입시 컨설팅 학원'), role: l('코딩 강사'), period: '2025.07–2025.10' }],
    skills: [{ group: l('웹·API'), items: ['TypeScript', 'React'] }],
    education: { school: l('한신대학교'), major: l('AI·SW대학 소프트웨어전공'), period: '2023.03–2027.02', note: l('졸업 예정'), gpa: '3.7 / 4.5' },
    certs: [{ name: l('TOPCIT 2수준'), detail: l('2024') }],
  }
  const lines = [project('patentry', 'Patentry', 'line', [2024])]
  const HEADINGS = ['한 줄 프로젝트', '논문·발표', '수상', '활동', '경력', '기술', '학력', '자격']

  it('starts closed and reveals every group once opened', async () => {
    renderWithProviders(<Archive archive={archive} lines={lines} />)
    const details = screen.getByRole('group')
    expect(details).not.toHaveAttribute('open')
    for (const heading of HEADINGS) {
      expect(screen.getByRole('heading', { name: heading })).not.toBeVisible()
    }
    await userEvent.click(within(details).getByText('펼쳐 보기'))
    expect(details).toHaveAttribute('open')
    for (const heading of HEADINGS) {
      expect(screen.getByRole('heading', { name: heading })).toBeVisible()
    }
    expect(screen.getByText('Patentry')).toBeVisible()
    expect(screen.getByText('캡스톤 디자인 및 AI 해커톤 대상(1등)')).toBeVisible()
  })
})

describe('Contact', () => {
  it('lists each contact, opening outside links in a new tab', () => {
    renderWithProviders(<Contact profile={profile} />)
    expect(screen.getByRole('link', { name: 'eric1889@naver.com' })).toHaveAttribute('href', 'mailto:eric1889@naver.com')
    const github = screen.getByRole('link', { name: 'github.com/ERIC1889' })
    expect(github).toHaveAttribute('target', '_blank')
    expect(github).toHaveAttribute('rel', 'noopener noreferrer')
    expect(screen.getByText('서울특별시')).toBeInTheDocument()
  })
})
