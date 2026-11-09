import { describe, expect, it } from 'vitest'
import { screen, within } from '@testing-library/react'
import { renderWithProviders } from '@/test/render'
import { featuredProject, l, paar } from '@/test/fixtures'
import type { Media, Project } from '@/content/types'
import { CaseStudy, sectionAnchors } from './CaseStudy'

const sectionNamed = (name: string) => screen.getByRole('heading', { level: 2, name }).closest('section') as HTMLElement

const shot = (src: string): Media => ({ kind: 'screenshot', src, width: 1600, height: 900, alt: l(`${src} 화면`), caption: l(`${src} · 실제 화면`), capturedAt: '2026-10-01' })

const project: Project = featuredProject('skillpilot', 'SkillPilot', [2025], {
  audience: l('IT 취업 준비생'),
  links: [
    { kind: 'code', label: l('API 클라이언트'), href: 'https://github.com/Hanshin-OSS-Hub/capstone25-skillpilot/blob/main/client.js' },
    { kind: 'code', label: l('저장소'), href: 'https://github.com/Hanshin-OSS-Hub/capstone25-skillpilot' },
    { kind: 'slides', label: l('발표 자료'), href: 'https://github.com/Hanshin-OSS-Hub/capstone25-skillpilot/blob/main/a.pdf' },
  ],
  contribution: { direct: [l('백엔드 전체')], others: [l('디자인 시안')], verified: [l('수동 실행으로 확인')] },
  metrics: [{ label: l('대조'), value: '21/21', target: l('기준 사례'), condition: l('±10원'), source: 'measured', checkedAt: '2026-10-29' }],
  architecture: {
    diagram: {
      columns: [
        { title: l('앱'), nodes: [{ id: 'app', title: l('React 앱'), owner: 'mine', links: [{ to: 'api', label: l('HTTPS') }] }] },
        { title: l('서버'), nodes: [{ id: 'api', title: l('Express API'), owner: 'mine' }] },
      ],
      caption: l('코드 기준'),
    },
    body: [l('구조 설명 문단')],
    decisions: [l('DB 분리: 연결되는 데이터는 MySQL에')],
    table: { head: [l('구분'), l('구조')], rows: [[l('팀 버전'), l('Flask')]] },
  },
  cases: [paar('HTTP 200 속의 실패'), { title: l('녹음 처리'), problem: { body: [l('헤더가 없습니다.')] }, action: { body: [l('헤더를 붙입니다.')] } }],
})

const work: Project = featuredProject('finz', 'Finz', [2026], {
  kind: 'work',
  showcase: 'work',
  workTitle: l('주식회사 Finz Labs · 개발 총괄'),
  links: undefined,
  duties: [l('맡은 일 문단')],
  contribution: { direct: [l('웹 전체')], joint: [l('세무사와 로직 정리')] },
  products: [
    {
      id: 'calculators',
      name: l('개인 세금 계산기'),
      status: l('운영 중'),
      role: l('설계·개발·운영'),
      intro: [l('계산기 소개')],
      features: [l('기능 하나')],
      media: [shot('/media/finz/web.webp')],
      architecture: { body: [l('계산기 구조')], decisions: [l('엔진을 웹 안으로')] },
      cases: [paar('옮긴 엔진')],
    },
    { id: 'refund-app', name: l('Finz 모바일 앱'), status: l('미출시'), role: l('앱·백엔드'), intro: [l('앱 소개')] },
    { id: 'finz-saas', name: l('세무사용 FINZ'), status: l('출시 전'), role: l('검증'), intro: [l('역할 문단')] },
  ],
})

const legacy: Project = {
  slug: 'media-pulse',
  name: 'Media Pulse',
  years: [2023],
  tier: 'card',
  showcase: 'other',
  period: '2023.03–2023.10',
  stack: ['Express'],
  summary: l('요약'),
  product: l('첫 웹 서비스'),
  sections: [
    { id: 'implementation', title: l('담당 역할 및 기여'), body: [l('팀장')], lead: true, anchor: 'role' },
    { id: 'implementation', title: l('인상적인 문제'), body: [l('HTTP 200 속의 실패. 문제: 상태 코드만 보면 틀립니다. 해결: 본문도 검사합니다.'), l('녹음 처리. 헤더를 직접 붙였습니다.')], anchor: 'problem' },
    { id: 'implementation', title: l('하나 더'), body: [l('본문')] },
    { id: 'implementation', title: l('또 하나'), body: [l('본문 둘')] },
  ],
}

describe('sectionAnchors', () => {
  it('uses a section’s own anchor and numbers a repeated id', () => {
    expect(sectionAnchors(legacy)).toEqual(['role', 'problem', 'implementation', 'implementation-2'])
  })
})

describe('overview card', () => {
  it('names the product, says what it is and lists period, team, role, status, scope, results and stack in that order', () => {
    renderWithProviders(<CaseStudy project={project} />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('SkillPilot 제품')
    expect(screen.getByText('SkillPilot는 이런 서비스')).toBeInTheDocument()
    const facts = document.querySelector('dl.facts') as HTMLElement
    expect([...facts.querySelectorAll(':scope > .fact > dt')].map((dt) => dt.textContent)).toEqual(['대상', '기간', '팀 구성', '담당 역할', '상태', '기여 범위', '주요 성과', '기술 스택'])
    expect(facts).toHaveTextContent('미출시')
    expect([...facts.querySelectorAll('.scope-rows dt')].map((dt) => dt.textContent)).toEqual(['직접 맡음', '다른 사람'])
    expect([...facts.querySelectorAll('.highlights > li')].map((li) => li.textContent)).toEqual(['SkillPilot 성과 하나', 'SkillPilot 성과 둘'])
  })

  it('puts the first two links and a jump to the cases at the top, and the demo video beside the facts', () => {
    renderWithProviders(<CaseStudy project={project} />)
    const top = document.querySelector('.overview .actions') as HTMLElement
    expect(within(top).getAllByRole('link').map((a) => a.getAttribute('href'))).toEqual([
      'https://github.com/Hanshin-OSS-Hub/capstone25-skillpilot/blob/main/client.js',
      'https://github.com/Hanshin-OSS-Hub/capstone25-skillpilot',
      '#cases',
    ])
    const demo = document.querySelector('.overview-demo') as HTMLElement
    expect(demo).toHaveTextContent('대표 시연')
    expect(demo.querySelector('video')).toHaveAttribute('poster', '/media/skillpilot/demo-poster.webp')
  })
})

describe('numbered parts', () => {
  it('lists the seven parts in the table of contents with numbers, each pointing at a section that exists', () => {
    const { container } = renderWithProviders(<CaseStudy project={project} />)
    const toc = screen.getByRole('navigation', { name: '이 페이지' })
    const links = within(toc).getAllByRole('link')
    expect(links.map((a) => a.getAttribute('href'))).toEqual(['#background', '#features', '#architecture', '#cases', '#results', '#retro', '#material'])
    expect(links.map((a) => a.textContent)).toEqual(['1. 배경 및 목적', '2. 주요 기능', '3. 시스템 아키텍처', '4. 주요 문제 해결 사례', '5. 결과 및 성과', '6. 회고', '7. 관련 자료'])
    for (const a of links) expect(container.querySelector(a.getAttribute('href') as string)).not.toBeNull()
    expect(screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)).toEqual(links.map((a) => a.textContent))
    expect(container.querySelector('#screens')).toBeNull()
  })

  it('puts the numbered feature list and the screen gallery (without the demo video) under 2. 주요 기능', () => {
    renderWithProviders(<CaseStudy project={project} />)
    const features = sectionNamed('2. 주요 기능')
    expect(features.querySelectorAll('ol.feature-list > li')).toHaveLength(2)
    const figures = within(features).getAllByRole('figure')
    expect(figures).toHaveLength(1)
    expect(figures[0].querySelector('figcaption')).toHaveTextContent(/^SkillPilot 화면 · 실제 화면$/)
    expect(features.querySelector('video')).toBeNull()
  })

  it('draws the architecture as a diagram with its explanation, design decisions and the structure-by-period table', () => {
    renderWithProviders(<CaseStudy project={project} />)
    const architecture = sectionNamed('3. 시스템 아키텍처')
    expect(within(architecture).getAllByRole('region').map((r) => r.getAttribute('aria-label'))).toEqual(['앱', '서버'])
    expect(architecture).toHaveTextContent('구조 설명 문단')
    expect(within(architecture).getByRole('heading', { level: 3, name: '설계 판단' })).toBeInTheDocument()
    expect(architecture.querySelectorAll('ol.decisions > li')).toHaveLength(1)
    expect(within(architecture).getByRole('heading', { level: 3, name: '시기별 구조' })).toBeInTheDocument()
    expect(within(architecture).getByRole('table')).toHaveTextContent('Flask')
  })

  it('shows a full case as Problem · Analysis · Action · Result with its lead lines, and a problem/fix card with 문제 · 해결', () => {
    renderWithProviders(<CaseStudy project={project} />)
    const cases = sectionNamed('4. 주요 문제 해결 사례')
    const [full, short] = [...cases.querySelectorAll('.paar')]
    expect(full.querySelector('h3')).toHaveTextContent('HTTP 200 속의 실패')
    expect([...full.querySelectorAll('.paar-label')].map((b) => b.textContent)).toEqual(['Problem', 'Analysis', 'Action', 'Result'])
    expect(full.querySelector('.paar-lead')).toHaveTextContent('HTTP 200 속의 실패 문제 요약')
    expect(full).toHaveTextContent('HTTP 200 속의 실패 분석')
    expect(short.classList.contains('is-legacy')).toBe(true)
    expect([...short.querySelectorAll('.paar-label')].map((b) => b.textContent)).toEqual(['문제', '해결'])
    expect(short).toHaveTextContent('헤더를 붙입니다.')
  })

  it('shows the numbers table and the verified list inside 5. 결과 및 성과, without check dates', () => {
    renderWithProviders(<CaseStudy project={project} />)
    const results = sectionNamed('5. 결과 및 성과')
    expect(results).toHaveTextContent('SkillPilot 결과')
    const table = within(results).getByRole('table')
    expect(within(table).getAllByRole('columnheader').map((th) => th.textContent)).toEqual(['항목', '값', '무엇을 쟀나', '조건', '출처'])
    expect(table).toHaveTextContent('21/21')
    expect(table).toHaveTextContent('직접 측정')
    expect(table).not.toHaveTextContent('2026-10-29')
    expect(within(results).getByRole('heading', { level: 3, name: '직접 검증' })).toBeInTheDocument()
    expect(results.querySelector('.verified-list')).toHaveTextContent('수동 실행으로 확인')
  })

  it('lists every link under 7. 관련 자료', () => {
    renderWithProviders(<CaseStudy project={project} />)
    const material = sectionNamed('7. 관련 자료')
    expect(material).toHaveTextContent('SkillPilot 자료')
    expect(within(material).getAllByRole('link')).toHaveLength(3)
    expect(within(material).getByRole('link', { name: /발표 자료/ })).toHaveAttribute('target', '_blank')
  })
})

describe('work page', () => {
  it('heads the page by the company and title, shows the product table instead of a scope row, and jumps to the products', () => {
    renderWithProviders(<CaseStudy project={work} />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('주식회사 Finz Labs · 개발 총괄')
    expect(document.querySelector('.kicker')).toHaveTextContent('실무 경험')
    expect(screen.getByText('Finz 요약')).toBeInTheDocument()
    const facts = document.querySelector('dl.facts') as HTMLElement
    expect([...facts.querySelectorAll(':scope > .fact > dt')].map((dt) => dt.textContent)).toEqual(['기간', '팀 구성', '담당 역할', '상태', '주요 성과', '기술 스택'])
    const table = document.querySelector('.overview .product-table') as HTMLElement
    expect(within(table).getAllByRole('rowheader').map((th) => th.textContent)).toEqual(['개인 세금 계산기', 'Finz 모바일 앱', '세무사용 FINZ'])
    expect(within(table).getAllByRole('link').map((a) => a.getAttribute('href'))).toEqual(['#calculators', '#refund-app', '#finz-saas'])
    const top = document.querySelector('.overview .actions') as HTMLElement
    expect(within(top).getAllByRole('link').map((a) => a.getAttribute('href'))).toEqual(['#products'])
  })

  it('numbers company, duties, products, results, reflection and material, with one block per product', () => {
    const { container } = renderWithProviders(<CaseStudy project={work} />)
    const toc = screen.getByRole('navigation', { name: '이 페이지' })
    const links = within(toc).getAllByRole('link')
    expect(links.map((a) => a.getAttribute('href'))).toEqual(['#company', '#duties', '#products', '#results', '#retro', '#material'])
    expect(links.map((a) => a.textContent)).toEqual(['1. 회사 소개', '2. 맡은 일', '3. 회사에서 만든 것', '4. 결과 및 성과', '5. 회고', '6. 관련 자료'])
    for (const a of links) expect(container.querySelector(a.getAttribute('href') as string)).not.toBeNull()
    const duties = sectionNamed('2. 맡은 일')
    expect(duties).toHaveTextContent('맡은 일 문단')
    expect([...duties.querySelectorAll('.scope-rows dt')].map((dt) => dt.textContent)).toEqual(['직접 맡음', '함께 진행'])
    const products = sectionNamed('3. 회사에서 만든 것')
    expect(within(products).getAllByRole('heading', { level: 3 }).map((h) => h.textContent)).toEqual(['3-1 개인 세금 계산기', '3-2 Finz 모바일 앱', '3-3 세무사용 FINZ'])
    expect([...products.querySelectorAll('.product-block')].map((el) => el.id)).toEqual(['calculators', 'refund-app', 'finz-saas'])
    const first = container.querySelector('#calculators') as HTMLElement
    expect(first).toHaveTextContent('운영 중 · 설계·개발·운영')
    expect(first.querySelectorAll('ol.feature-list:not(.decisions) > li')).toHaveLength(1)
    expect(first.querySelectorAll('ol.decisions > li')).toHaveLength(1)
    expect(within(first).getAllByRole('figure')).toHaveLength(1)
    expect(within(first).getByRole('heading', { level: 4, name: '설계 판단' })).toBeInTheDocument()
    expect([...first.querySelectorAll('.paar-label')].map((b) => b.textContent)).toEqual(['Problem', 'Analysis', 'Action', 'Result'])
    expect(container.querySelector('#finz-saas')?.querySelector('figure')).toBeNull()
  })
})

describe('variants', () => {
  it('shows the owner’s role paragraph under 기여 범위 when there is no contribution table, and the AI row only when given', () => {
    const supporting = featuredProject('edumatrix', 'EduMatrix', [2025], {
      contribution: undefined,
      overview: { highlights: [l('성과 하나'), l('성과 둘')], scope: [l('구조 설계를 맡았습니다.')], aiUse: l('명세를 먼저 쓰고 AI와 구현') },
    })
    renderWithProviders(<CaseStudy project={supporting} />)
    const facts = document.querySelector('dl.facts') as HTMLElement
    const scope = [...facts.querySelectorAll(':scope > .fact')].find((row) => row.querySelector('dt')?.textContent === '기여 범위') as HTMLElement
    expect(scope.querySelector('.scope-rows')).toBeNull()
    expect(scope).toHaveTextContent('구조 설계를 맡았습니다.')
    expect([...facts.querySelectorAll(':scope > .fact > dt')].map((dt) => dt.textContent)).toContain('AI 활용')
    expect(facts).toHaveTextContent('명세를 먼저 쓰고 AI와 구현')
  })

  it('offers no jump button when a page has no cases, and skips the cases part', () => {
    const noCases = featuredProject('edumatrix', 'EduMatrix', [2025], { cases: undefined, links: undefined })
    renderWithProviders(<CaseStudy project={noCases} />)
    expect(document.querySelector('.overview .actions')).toBeNull()
    const toc = screen.getByRole('navigation', { name: '이 페이지' })
    expect(within(toc).getAllByRole('link').map((a) => a.getAttribute('href'))).toEqual(['#background', '#features', '#architecture', '#results', '#retro', '#material'])
  })

  it('renders every label in English for an English browser', async () => {
    renderWithProviders(<CaseStudy project={project} />, 'en-US')
    const toc = await screen.findByRole('navigation', { name: 'On this page' })
    expect(within(toc).getAllByRole('link').map((a) => a.textContent)).toEqual([
      '1. Background and goals',
      '2. Key features',
      '3. System architecture',
      '4. Key problems solved',
      '5. Results',
      '6. Reflection',
      '7. Related material',
    ])
    const facts = document.querySelector('dl.facts') as HTMLElement
    expect([...facts.querySelectorAll(':scope > .fact > dt')].map((dt) => dt.textContent)).toEqual(['For', 'Period', 'Team', 'Role', 'Status', 'Scope of my work', 'Key results', 'Stack'])
    expect([...facts.querySelectorAll('.scope-rows dt')].map((dt) => dt.textContent)).toEqual(['My own work', 'By others'])
    const [full, short] = [...document.querySelectorAll('.paar')]
    expect([...full.querySelectorAll('.paar-label')].map((b) => b.textContent)).toEqual(['Problem', 'Analysis', 'Action', 'Result'])
    expect([...short.querySelectorAll('.paar-label')].map((b) => b.textContent)).toEqual(['Problem', 'Fix'])
    expect(screen.getByRole('heading', { level: 3, name: 'Design decisions' })).toBeInTheDocument()
  })

  it('sends the work page back to the work section', () => {
    renderWithProviders(<CaseStudy project={work} next={{ slug: 'skillpilot', name: l('SkillPilot') }} />)
    const nav = screen.getByRole('navigation', { name: '페이지 이동' })
    expect(within(nav).getAllByRole('link').map((a) => [a.getAttribute('href'), a.textContent?.trim()])).toEqual([
      ['/#work', '실무 경험으로'],
      ['/projects/skillpilot', 'SkillPilot →'],
    ])
    expect(document.querySelector('.breadcrumb a')).toHaveAttribute('href', '/#work')
  })
})

describe('legacy page', () => {
  it('keeps the old sections for a page without the new shape, with no jump button', () => {
    renderWithProviders(<CaseStudy project={legacy} />)
    const toc = screen.getByRole('navigation', { name: '이 페이지' })
    expect(within(toc).getAllByRole('link').map((a) => a.getAttribute('href'))).toEqual(['#role', '#problem', '#implementation', '#implementation-2'])
    expect(document.querySelector('.overview .actions')).toBeNull()
    expect(document.querySelector('.overview-demo')).toBeNull()
  })

  it('breaks a "title. 문제: … 해결: …" paragraph into a bold title and two lines, and leaves other paragraphs alone', () => {
    renderWithProviders(<CaseStudy project={legacy} />)
    const section = sectionNamed('인상적인 문제')
    const [first, second] = [...section.querySelectorAll(':scope > p')]
    expect(first.querySelector('strong')).toHaveTextContent('HTTP 200 속의 실패')
    expect([...first.querySelectorAll('.case-step-line')].map((el) => el.textContent)).toEqual(['문제: 상태 코드만 보면 틀립니다.', '해결: 본문도 검사합니다.'])
    expect(second.querySelector('strong')).toBeNull()
    expect(second).toHaveTextContent('녹음 처리. 헤더를 직접 붙였습니다.')
  })
})

describe('page navigation', () => {
  it('links back to the list and to the neighbouring cases', () => {
    renderWithProviders(<CaseStudy project={project} prev={{ slug: 'finz', name: l('Finz') }} next={{ slug: 'closetmate', name: l('ClosetMate') }} />)
    const nav = screen.getByRole('navigation', { name: '페이지 이동' })
    expect(within(nav).getAllByRole('link').map((a) => a.getAttribute('href'))).toEqual(['/projects/finz', '/#projects', '/projects/closetmate'])
  })
})
