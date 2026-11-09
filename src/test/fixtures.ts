import type { Case, Chapter, Project } from '@/content/types'

export const l = (ko: string, en = '') => ({ ko, en })

export function paar(title: string): Case {
  return {
    title: l(title),
    problem: { lead: l(`${title} 문제 요약`), body: [l(`${title} 문제`)] },
    analysis: { lead: l(`${title} 분석 요약`), body: [l(`${title} 분석`)] },
    action: { lead: l(`${title} 행동 요약`), body: [l(`${title} 행동`)] },
    result: { lead: l(`${title} 결과 요약`), body: [l(`${title} 결과`)] },
  }
}

export function featuredProject(slug: string, name: string, years: Project['years'], extra: Partial<Project> = {}): Project {
  return {
    slug,
    name,
    years,
    tier: 'featured',
    showcase: 'supporting',
    title: l(`${name} 제품`),
    product: l(`${name}는 이런 서비스`),
    period: '2025.01–2025.06',
    team: l('개인 프로젝트'),
    role: l('개발'),
    status: l('미출시'),
    statusCheckedAt: '2026-10-29',
    stack: ['Next.js', 'TypeScript'],
    summary: l(`${name} 요약`),
    overview: { highlights: [l(`${name} 성과 하나`), l(`${name} 성과 둘`)] },
    features: [l(`${name} 기능 하나`), l(`${name} 기능 둘`)],
    media: [
      {
        kind: 'screenshot',
        src: `/media/${slug}/screen.webp`,
        width: 1600,
        height: 900,
        alt: l(`${name} 화면`),
        caption: l(`${name} 화면 · 실제 화면`),
        capturedAt: '2026-10-01',
      },
      {
        kind: 'video',
        src: `/media/${slug}/demo.mp4`,
        poster: `/media/${slug}/demo-poster.webp`,
        width: 1280,
        height: 720,
        alt: l(`${name} 시연`),
        caption: l(`${name} 시연 · 실제 화면`),
        capturedAt: '2026-10-01',
      },
    ],
    background: [l(`${name} 배경`)],
    architecture: { body: [l(`${name} 구조`)], decisions: [l(`${name} 설계 판단`)] },
    cases: [paar(`${name} 사례`)],
    results: [l(`${name} 결과`)],
    retro: [l(`${name} 회고`)],
    material: [l(`${name} 자료`)],
    ...extra,
  }
}

export const FIXTURE_PROJECTS: Project[] = [
  featuredProject('pitches', 'Pitches', [2024, 2026], { showcase: 'main' }),
  featuredProject('finz', 'Finz', [2026], { showcase: 'work', kind: 'work' }),
  featuredProject('skillpilot', 'SkillPilot', [2025], { showcase: 'main' }),
  featuredProject('closetmate', 'ClosetMate', [2026], { showcase: 'main' }),
  {
    slug: 'media-pulse',
    name: 'Media Pulse',
    years: [2023],
    tier: 'card',
    period: '2023.03–2023.10',
    stack: ['Express', 'MongoDB'],
    summary: l('검색 트렌드 시각화'),
  },
  {
    slug: 'patentry',
    name: 'Patentry',
    years: [2024],
    tier: 'line',
    period: '2024.01–2024.04',
    stack: ['OpenAI'],
    summary: l('특허 문서 챗봇'),
  },
]

export const FIXTURE_CHAPTERS: Chapter[] = [
  { year: 2023, name: l('배우다'), lesson: l('작은 경험'), essay: [l('첫 문단'), l('둘째 문단'), l('셋째 문단')] },
  { year: 2024, name: l('만들다'), lesson: l('첫 대상'), essay: [l('문단')] },
  { year: 2025, name: l('함께하다'), lesson: l('한계'), essay: [l('문단')] },
  { year: 2026, name: l('책임지다'), lesson: l('검증'), essay: [l('문단')] },
]
