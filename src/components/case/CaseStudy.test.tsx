import { describe, expect, it } from 'vitest'
import { screen, within } from '@testing-library/react'
import { renderWithProviders } from '@/test/render'
import { featuredProject, l } from '@/test/fixtures'
import type { Project } from '@/content/types'
import { CaseStudy, sectionAnchors } from './CaseStudy'

const sectionNamed = (name: string) => screen.getByRole('heading', { level: 2, name }).closest('section') as HTMLElement

const project: Project = featuredProject('skillpilot', 'SkillPilot', [2025], {
  audience: l('IT 취업 준비생'),
  links: [
    { kind: 'code', label: l('API 클라이언트'), href: 'https://github.com/Hanshin-OSS-Hub/capstone25-skillpilot/blob/main/client.js' },
    { kind: 'code', label: l('저장소'), href: 'https://github.com/Hanshin-OSS-Hub/capstone25-skillpilot' },
    { kind: 'slides', label: l('발표 자료'), href: 'https://github.com/Hanshin-OSS-Hub/capstone25-skillpilot/blob/main/a.pdf' },
  ],
  contribution: { direct: [l('백엔드 전체')], others: [l('디자인 시안')], notYet: [l('자동 테스트')] },
  flow: {
    title: l('동기화 흐름'),
    caption: l('코드 기준'),
    steps: [
      { owner: 'mine', label: l('동기화 시작') },
      { owner: 'external', label: l('공공 API') },
      { owner: 'mine', label: l('응답 확인'), branches: [{ when: l('오류 문구'), then: l('재시도') }] },
    ],
  },
  metrics: [{ label: l('대조'), value: '21/21', target: l('기준 사례'), condition: l('±10원'), source: 'measured', checkedAt: '2026-10-29' }],
  sections: [
    { id: 'problem', title: l('문제와 선택'), body: [l('문제 본문')] },
    { id: 'implementation', title: l('구현'), body: [l('구현 본문')] },
    { id: 'implementation', title: l('같은 회사의 다른 작업'), body: [l('앱 본문')], anchor: 'refund-app' },
    { id: 'implementation', title: l('세 번째 구현'), body: [l('세 번째 본문')] },
    { id: 'validation', title: l('검증'), body: [l('검증 본문')] },
    { id: 'result', title: l('결과'), body: [l('결과 본문')] },
    { id: 'retro', title: l('남은 한계와 다음'), body: [l('회고 본문')] },
    { id: 'evidence', title: l('코드·자료'), body: [l('근거 본문')] },
  ],
})

describe('sectionAnchors', () => {
  it('uses a section’s own anchor and numbers a repeated id', () => {
    expect(sectionAnchors(project)).toEqual(['problem', 'implementation', 'refund-app', 'implementation-2', 'validation', 'result', 'retro', 'evidence'])
  })
})

describe('CaseStudy header', () => {
  it('names the product, then says what it is, for whom, by whom and its checked status', () => {
    renderWithProviders(<CaseStudy project={project} />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('SkillPilot 제품')
    expect(screen.getByText('SkillPilot는 이런 서비스')).toBeInTheDocument()
    const facts = document.querySelector('dl.facts') as HTMLElement
    expect(within(facts).getAllByRole('term').map((dt) => dt.textContent)).toEqual(['대상', '기간', '팀', '역할', '상태', '기술'])
    expect(facts).toHaveTextContent('미출시 · 2026-10-29 확인')
  })

  it('puts the first two links and jumps to the checks and to all material at the top', () => {
    renderWithProviders(<CaseStudy project={project} />)
    const top = document.querySelector('.case-header .actions') as HTMLElement
    expect(within(top).getAllByRole('link').map((a) => a.getAttribute('href'))).toEqual([
      'https://github.com/Hanshin-OSS-Hub/capstone25-skillpilot/blob/main/client.js',
      'https://github.com/Hanshin-OSS-Hub/capstone25-skillpilot',
      '#validation',
      '#evidence',
    ])
  })
})

describe('CaseStudy body', () => {
  it('lists every part of the page in the table of contents, each pointing at an element that exists', () => {
    const { container } = renderWithProviders(<CaseStudy project={project} />)
    const toc = screen.getByRole('navigation', { name: '이 페이지' })
    const hrefs = within(toc)
      .getAllByRole('link')
      .map((a) => a.getAttribute('href') as string)
    expect(hrefs).toEqual([
      '#screens',
      '#features',
      '#contribution',
      '#flow',
      '#problem',
      '#implementation',
      '#refund-app',
      '#implementation-2',
      '#validation',
      '#result',
      '#retro',
      '#evidence',
    ])
    for (const href of hrefs) expect(container.querySelector(href), href).not.toBeNull()
  })

  it('captions each picture with what it is and when it was captured, and opens it at full size', () => {
    renderWithProviders(<CaseStudy project={project} />)
    const figure = within(sectionNamed('화면과 시연')).getByRole('figure')
    expect(figure).toHaveTextContent('SkillPilot 화면 · 실제 화면 · 2026-10-01 촬영')
    expect(within(figure).getByRole('link')).toHaveAttribute('target', '_blank')
    expect(within(figure).getByRole('img', { name: 'SkillPilot 화면' })).toBeInTheDocument()
  })

  it('splits my part from other people’s work in a labelled table', () => {
    renderWithProviders(<CaseStudy project={project} />)
    const table = within(sectionNamed('내 역할과 협업 범위')).getByRole('table')
    expect(within(table).getAllByRole('rowheader').map((th) => th.textContent)).toEqual(['직접 구현', '다른 사람 구현', '아직 안 한 일'])
  })

  it('draws the flow with each step marked as mine or external, and the branches spelled out', () => {
    renderWithProviders(<CaseStudy project={project} />)
    const flow = sectionNamed('동기화 흐름')
    const steps = within(flow).getAllByRole('listitem').filter((li) => li.classList.contains('flow-step'))
    expect(steps.map((li) => li.querySelector('.flow-owner')?.textContent)).toEqual(['직접 구현', '외부', '직접 구현'])
    expect(flow).toHaveTextContent('오류 문구→재시도')
  })

  it('shows the numbers inside the verification section with what, how, source and date', () => {
    renderWithProviders(<CaseStudy project={project} />)
    const validation = sectionNamed('검증')
    const table = within(validation).getByRole('table')
    expect(within(table).getAllByRole('columnheader').map((th) => th.textContent)).toEqual(['항목', '값', '무엇을 쟀나', '조건', '출처 · 확인일'])
    expect(table).toHaveTextContent('21/21')
    expect(table).toHaveTextContent('직접 측정 · 2026-10-29')
  })

  it('lists every link in the evidence section', () => {
    renderWithProviders(<CaseStudy project={project} />)
    const evidence = sectionNamed('코드·자료')
    expect(within(evidence).getAllByRole('link')).toHaveLength(3)
    expect(within(evidence).getByRole('link', { name: /발표 자료/ })).toHaveAttribute('target', '_blank')
  })

  it('links back to the list and to the neighbouring cases', () => {
    renderWithProviders(<CaseStudy project={project} prev={{ slug: 'suzihouse', name: l('수지하우스') }} next={{ slug: 'closetmate', name: l('ClosetMate') }} />)
    const nav = screen.getByRole('navigation', { name: '페이지 이동' })
    expect(within(nav).getAllByRole('link').map((a) => a.getAttribute('href'))).toEqual(['/projects/suzihouse', '/#projects', '/projects/closetmate'])
  })
})
