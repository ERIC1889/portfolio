import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { projects } from './projects'
import { findHolds } from './release'
import { CASE_ORDER, allMedia, hasNewShape } from './select'
import type { Case, Project } from './types'
import { checkBanned, checkCaseShape, checkMedia, checkMetrics, collectStrings } from './validate'

const PUBLIC = join(__dirname, '..', '..', 'public')

const bySlug = (slug: string) => {
  const project = projects.find((p) => p.slug === slug)
  if (!project) throw new Error(`missing project ${slug}`)
  return project
}

const koText = (value: unknown) =>
  collectStrings(value)
    .filter((s) => s.lang === 'ko')
    .map((s) => s.value)
    .join(' ')

const allCases = (project: Project): Case[] => [...(project.cases ?? []), ...(project.products ?? []).flatMap((p) => p.cases ?? [])]

const PLACEMENT = [
  ['finz', 'featured', 'work', [2026]],
  ['skillpilot', 'featured', 'main', [2025]],
  ['closetmate', 'featured', 'main', [2026]],
  ['pitches', 'featured', 'main', [2024, 2025, 2026]],
  ['media-pulse', 'card', 'other', [2023]],
  ['label-light', 'supporting', 'supporting', [2024]],
  ['wildfire', 'card', undefined, [2025]],
  ['edumatrix', 'supporting', 'supporting', [2025]],
  ['innoview', 'supporting', 'supporting', [2025]],
  ['restplanner', 'card', undefined, [2025]],
  ['ai-hiring-textmining', 'card', undefined, [2026]],
  ['jarvis', 'card', undefined, [2026]],
  ['dev-blog', 'card', undefined, [2026]],
  ['llm-dolbom', 'line', undefined, [2024]],
  ['patentry', 'line', undefined, [2024]],
  ['dreamtrack', 'line', undefined, [2025]],
  ['teamflow', 'line', undefined, [2025, 2026]],
  ['unifit', 'line', undefined, [2026]],
] as const

const FEATURED = ['finz', 'skillpilot', 'pitches', 'closetmate']
const MAIN = ['skillpilot', 'pitches', 'closetmate']
const SUPPORTING = ['edumatrix', 'innoview', 'label-light']

const BANNED: Record<string, (string | RegExp)[]> = {
  'label-light': ['80%', '진단', 'diagnos'],
  'llm-dolbom': ['심리 상태 분석', 'psychological state'],
  edumatrix: ['집중도', '성과 예측', 'performance prediction', '상태 머신', 'state machine', 'TypeScript', '실시간 모니터링', 'real-time monitoring', 'implemented', '구현'],
  innoview: ['1인 개발', 'solo developer'],
  restplanner: ['강화학습', 'reinforcement', 'Agent-to-Agent', /A2A(?! 협업 기반 웰니스 일정 관리 시스템| Collaboration)/],
  teamflow: ['SaaS'],
  unifit: ['AI'],
  patentry: ['특허 데이터', 'patent data'],
  pitches: ['Canvas', '200ms', '프론트엔드 주도', 'frontend lead', '이중 시간축', 'dual time', '150ms 미만', 'under 150', 'T4', '진행 중'],
  finz: ['21개 테이블', '24개 API', '120개 테스트', '86.6', 'API 키 노출', 'API key exposure', '해결한', 'resolved', '래미안', '아크로', '외주 개발', '외주사'],
  closetmate: [/온디바이스(?! 추론으로의 확장성)/, /on-device(?! inference in mind)/, '97.49', '86.68', '67.29', '딥러닝 기초', '수업', 'deep learning course', 'course project'],
  skillpilot: ['대신 관리자', '테스트를 대신', 'instead of tests', 'substitute for tests', '적중률', 'hit rate', '비용 절감', 'cost saving'],
  wildfire: ['0.909', '0.77', '정확도', 'accuracy'],
  jarvis: ['1초', '1 second'],
}

describe('pictures outside the case pages', () => {
  it('captions every card thumbnail, so the full record never shows a picture without saying what it is', () => {
    for (const project of projects.filter((p) => p.image)) {
      expect(project.imageCaption?.ko, project.slug).toBeTruthy()
      expect(project.imageCaption?.en, project.slug).toBeTruthy()
      expect(existsSync(join(PUBLIC, project.image!)), project.image).toBe(true)
    }
  })
})

describe('project placement', () => {
  it('matches the agreed size, home section and years for every project', () => {
    expect(projects.map((p) => [p.slug, p.tier, p.showcase, p.years])).toEqual(PLACEMENT.map((row) => [...row]))
  })

  it('gives a case page only to the projects in the page order', () => {
    for (const project of projects.filter((p) => !(CASE_ORDER as readonly string[]).includes(p.slug))) {
      expect(project.sections, project.slug).toBeUndefined()
      expect(project.showcase, project.slug).toBeUndefined()
      expect(hasNewShape(project), project.slug).toBe(false)
    }
  })
})

describe('case pages', () => {
  it.each([...FEATURED, ...SUPPORTING])('%s follows the case-page shape', (slug) => {
    expect(checkCaseShape(bySlug(slug))).toEqual([])
  })

  it('captions and dates every picture and video on every page', () => {
    for (const project of projects) expect(checkMedia(project), project.slug).toEqual([])
  })

  it('points every picture, video and poster at a file that exists', () => {
    for (const project of projects) {
      for (const path of allMedia(project).flatMap((m) => [m.src, ...(m.poster ? [m.poster] : [])])) {
        expect(existsSync(join(PUBLIC, path)), path).toBe(true)
      }
    }
  })

  it('gives every number what was measured, the conditions, a source and a date', () => {
    for (const project of projects) expect(checkMetrics(project)).toEqual([])
  })

  it('holds nothing back, so production can ship', () => {
    expect(findHolds(projects)).toEqual([])
  })

  it.each(MAIN)('%s has a background, features with screens, a drawn architecture, PAAR cases, results, a reflection and material', (slug) => {
    const project = bySlug(slug)
    expect(project.background?.length).toBeGreaterThan(0)
    expect(project.features?.length).toBeGreaterThan(0)
    expect(project.media?.[0].kind).toBe('video')
    expect(project.architecture?.diagram?.columns.length).toBeGreaterThanOrEqual(3)
    expect(project.cases?.length).toBe(2)
    for (const item of project.cases ?? []) {
      expect(item.analysis?.body.length, item.title.ko).toBeGreaterThan(0)
      expect(item.result?.body.length, item.title.ko).toBeGreaterThan(0)
    }
    expect(project.results?.length).toBeGreaterThan(0)
    expect(project.retro?.length).toBeGreaterThan(0)
    expect(project.material?.length).toBeGreaterThan(0)
    expect(project.sections).toBeUndefined()
  })

  it.each(SUPPORTING)('%s has a background, an architecture, at least one case, results and a reflection, with my role in the overview', (slug) => {
    const project = bySlug(slug)
    expect(project.overview?.highlights).toHaveLength(2)
    expect(project.overview?.scope?.length).toBeGreaterThan(0)
    expect(project.background?.length).toBeGreaterThan(0)
    expect(project.architecture?.body?.length).toBeGreaterThan(0)
    expect(project.cases?.length).toBeGreaterThan(0)
    expect(project.results?.length).toBeGreaterThan(0)
    expect(project.retro?.length).toBeGreaterThan(0)
  })

  it('keeps Media Pulse to a role and one problem in the old shape', () => {
    const mediaPulse = bySlug('media-pulse')
    expect(mediaPulse.sections?.map((s) => s.title.ko)).toEqual(['담당 역할 및 기여', '인상적인 문제'])
    expect(hasNewShape(mediaPulse)).toBe(false)
  })
})

describe('work: Finz Labs', () => {
  const finz = bySlug('finz')

  it('is the one work page, headed by the company and title, with the calculator as the product title', () => {
    expect(projects.filter((p) => p.showcase === 'work').map((p) => p.slug)).toEqual(['finz'])
    expect(finz.kind).toBe('work')
    expect(finz.workTitle?.ko).toBe('주식회사 Finz Labs · 개발 총괄')
    expect(finz.title?.ko).toBe('Finz 개인 세금 계산기')
    expect(finz.team?.ko).toBe('직원 5명')
    expect(finz.period).toBe('2026.01–')
  })

  it('keeps the four results the owner chose, in order', () => {
    expect(finz.overview?.highlights.map((h) => h.ko)).toEqual(['finz.kr에서 계산기 4종 운영', '저장소 테스트 192개', '배포 9번 연속 실패 원인 재현', '2026 AI·블록체인 BM 경진대회 우수상 (Finz 앱)'])
  })

  it('describes the three products in order with their status and role', () => {
    expect(finz.products?.map((p) => p.id)).toEqual(['calculators', 'refund-app', 'finz-saas'])
    expect(finz.products?.map((p) => p.name.ko)).toEqual(['개인 세금 계산기', 'Finz 모바일 앱', '세무사용 FINZ'])
    expect(finz.products?.map((p) => p.status.ko)).toEqual(['운영 중', '미출시', '출시 전, 협력 개발사와 공동 개발'])
    expect(finz.products?.map((p) => p.role.ko)).toEqual(['설계·개발·운영', '앱·백엔드', '사양·검증·장애 분석·실배포 준비'])
  })

  it('puts the web demo and the four calculator screens at the top and keeps the app video under the app', () => {
    expect(finz.media?.map((m) => m.src)).toEqual(['/media/finz/web-demo.mp4', '/media/finz/web-crypto.webp', '/media/finz/web-stock.webp', '/media/finz/web-stock-gift.webp', '/media/finz/web-six-way.webp'])
    const [calculators, app, saas] = finz.products ?? []
    expect(calculators.media).toBeUndefined()
    expect(app.media?.map((m) => m.kind)).toEqual(['video'])
    expect(saas.media).toBeUndefined()
  })

  it('keeps the SaaS product to my role: one paragraph, no features, no screens', () => {
    const saas = finz.products?.find((p) => p.id === 'finz-saas')
    expect(saas?.intro).toHaveLength(1)
    expect(saas?.features).toBeUndefined()
    expect(koText(saas)).toContain('개발사와 함께 정하며 개발에 참여')
    expect(koText(saas)).not.toContain('위저드')
  })

  it('keeps the app product to the refund flow, with no life-stage screens', () => {
    const app = finz.products?.find((p) => p.id === 'refund-app')
    expect(koText(app?.intro)).not.toContain('금융 교육 퀴즈')
    expect(koText(app?.intro)).toContain('청년 세금 환급 MVP')
  })

  it('tells the CODEF story as the AI case, with the five-year check against Hometax', () => {
    const app = finz.products?.find((p) => p.id === 'refund-app')
    const [codef] = app?.cases ?? []
    expect(codef.title.ko).toContain('간편인증')
    const text = koText(codef)
    for (const fact of ['AI에게 CODEF 문서를 주고', '첫 연도만 조회', '인증 세션', '5개 연도', '홈택스에서 받은 자료와 대조', '인증 단계와 조회 단계']) expect(text).toContain(fact)
    expect(koText(finz.contribution?.verified)).toContain('5개 연도')
  })

  it('writes every case in four PAAR steps, and shows no architecture under the products', () => {
    const cases = allCases(finz)
    expect(cases.map((c) => c.title.ko)).toEqual(['옮긴 계산 엔진이 같은 값을 내는지', 'AI 초안이 첫 연도에서 멈춘 간편인증', '배포 9번 연속 실패'])
    for (const item of cases) {
      expect(item.analysis?.body.length, item.title.ko).toBeGreaterThan(0)
      expect(item.result?.body.length, item.title.ko).toBeGreaterThan(0)
    }
    expect(finz.products?.every((product) => product.architecture === undefined)).toBe(true)
  })

  it('links to the live calculators: the hub first, then 6Way (the one in the demo), then the rest', () => {
    const live = finz.links?.filter((l) => l.kind === 'live').map((l) => l.href)
    expect(live).toEqual([
      'https://www.finz.kr/personal',
      'https://www.finz.kr/personal/property',
      'https://www.finz.kr/personal/digital-asset/calculator',
      'https://www.finz.kr/personal/foreign-stock/capital-gains',
      'https://www.finz.kr/personal/foreign-stock/valuation',
    ])
    expect(finz.links?.[1].kind).toBe('site')
  })

  it('backs the calculation with measured checks against the reference workbook', () => {
    const [workbook, webTests, engine, security] = finz.metrics ?? []
    expect(webTests.value).toBe('192 통과')
    expect(workbook).toMatchObject({ value: '21/21', source: 'measured' })
    expect(koText(workbook.condition)).toContain('±10원')
    expect(engine.value).toContain('58')
    expect(koText(security.condition)).toContain('웹 계산 기능과는 별개')
  })

  it('credits the crypto engine and the valuation module to the company SaaS it was adapted from', () => {
    expect(koText(finz.contribution?.direct)).toContain('회사 세무 SaaS의 코드를 개인용으로 옮기고')
    expect(koText(finz.products?.[0].features)).not.toMatch(/가상자산 (계산 )?엔진을 (직접 )?(만들|작성)/)
    expect(finz.features).toBeUndefined()
    expect(finz.resumeItems).toBeUndefined()
    expect(koText(finz.contribution?.direct)).toContain('세무사와 함께')
    expect(koText(finz.contribution?.direct)).toContain('협력 개발사와 함께')
  })

  it('reports the vendor re-verification as a result, never as fixes or a fix rate', () => {
    const results = koText(finz.results)
    for (const fact of ['269건', '233건', '36건', '45건', '7개 모두']) expect(results).toContain(fact)
    expect(koText(finz)).not.toMatch(/\d+건 해결|해결률/)
  })
})

describe('main: SkillPilot', () => {
  const skillpilot = bySlug('skillpilot')

  it("lists the owner's five features and two PAAR cases word for word", () => {
    expect(skillpilot.team?.ko).toBe('프론트엔드 2, AI 1, 백엔드·총괄 1')
    expect(skillpilot.features?.map((f) => f.ko)).toEqual(['AI 기반의 맞춤형 자격증 추천', '주차별 학습 로드맵 자동 생성', '실전 CBT 모의고사 및 오답 분석', '포트폴리오 구축', '모의면접'])
    expect(skillpilot.cases?.map((c) => c.title.ko)).toEqual(['HTTP 200 응답에 포함된 공공 API 오류 처리', 'XML, JSON 등 제각각인 응답구조'])
    const [http200, shapes] = skillpilot.cases ?? []
    expect(koText(http200.action)).toContain('0.5초, 1초 간격으로 최대 2회 재시도')
    expect(koText(http200.analysis)).toContain('`SERVICE ERROR`')
    expect(koText(shapes.result)).toContain('자격증 34종목과 시험 일정 87건')
  })

  it('links the repository first, then the client, sync and AI-reuse code and the final presentation directly', () => {
    const hrefs = skillpilot.links?.map((l) => l.href) ?? []
    expect(hrefs[0]).toBe('https://github.com/Hanshin-OSS-Hub/capstone25-skillpilot')
    expect(hrefs[1]).toMatch(/integrations\/dataGoKr\/client\.js$/)
    expect(hrefs.some((h) => h.endsWith('certificationSync.service.js'))).toBe(true)
    expect(hrefs.some((h) => h.endsWith('ai.service.js'))).toBe(true)
    expect(hrefs.some((h) => h.endsWith('.pdf'))).toBe(true)
  })

  it('leads with the demo video, leaves the study-companion and login screens out, and draws four layers', () => {
    expect(skillpilot.media?.[0].kind).toBe('video')
    expect(skillpilot.media?.some((m) => m.src.includes('mate'))).toBe(false)
    expect(skillpilot.media?.some((m) => /login/i.test(m.src))).toBe(false)
    expect(skillpilot.architecture?.diagram?.columns).toHaveLength(3)
    expect(skillpilot.architecture?.diagram?.footer?.nodes.map((n) => n.id)).toEqual(['mongo', 'mysql'])
    expect(skillpilot.architecture?.decisions).toHaveLength(2)
  })
})

describe('main: ClosetMate', () => {
  const closetmate = bySlug('closetmate')

  it('states the benchmark setup, the 23-run check and that 43 images are a flow check, not accuracy', () => {
    const [check, timing, , flowCheck] = closetmate.metrics ?? []
    expect(check.value).toBe('23회 중 최종 실패 0')
    expect(koText(timing.condition)).toContain('Apple M5 CPU')
    expect(koText(timing.condition)).toContain('워밍업 5회·측정 30회')
    expect(flowCheck.value).toBe('43장')
    expect(koText(flowCheck.condition)).toContain('정확도 수치 아님')
  })

  it("keeps the owner's two cases and the server-inference decision", () => {
    expect(closetmate.cases?.map((c) => c.title.ko)).toEqual(['옷장에 없는 옷을 추천하는 LLM', '분류 모델 선택과 적용'])
    expect(koText(closetmate.cases?.[1].result)).toContain('온디바이스 추론으로의 확장성')
    expect(closetmate.architecture?.decisions).toHaveLength(1)
  })

  it('dates the project and links the public repository first, then the server, the training code and the app', () => {
    expect(closetmate.period).toBe('2026.03–2026.06')
    expect(closetmate.links?.map((l) => l.href)).toEqual([
      'https://github.com/ERIC1889/ClosetMate',
      'https://github.com/ERIC1889/ClosetMate/tree/main/apps/web',
      'https://github.com/ERIC1889/ClosetMate/tree/main/ml',
      'https://github.com/ERIC1889/ClosetMate/tree/main/apps/mobile',
    ])
    expect(closetmate.links?.every((l) => l.kind === 'code')).toBe(true)
  })
})

describe('main: Pitches', () => {
  const pitches = bySlug('pitches')

  it('presents the APIC-IST figures as paper-reported results', () => {
    const text = koText(pitches.results)
    for (const needle of ['APIC-IST 2025', '125ms', '20세션', '논문']) expect(text).toContain(needle)
    expect(pitches.metrics?.[0].source).toBe('paper')
  })

  it('labels every screen as the iOS simulator and leads with the demo video', () => {
    const media = pitches.media ?? []
    expect(media[0].kind).toBe('video')
    for (const m of media) expect(m.caption.ko).toContain('iOS 시뮬레이터')
  })

  it('separates the three versions in one table under the architecture, with the 2026 diagram drawn', () => {
    expect(pitches.architecture?.table?.rows.map((row) => row[0].ko)).toEqual(['2024–25 팀 버전', 'APIC-IST 2025 논문', '2026 개인 리뉴얼'])
    expect(pitches.architecture?.diagram?.legend?.map((l) => l.kind)).toEqual(['sync', 'realtime', 'async', 'paid', 'local'])
    expect(pitches.architecture?.diagram?.footer?.nodes.map((n) => n.id)).toEqual(['db', 'redis', 'files'])
    expect(pitches.architecture?.decisions).toBeUndefined()
    expect(pitches.links?.[0]).toMatchObject({ kind: 'code', href: 'https://github.com/ERIC1889/pitches' })
    expect(koText(pitches.material)).toContain('2026 리뉴얼 코드는 공개 저장소에 있습니다')
  })

  it("keeps the owner's two cases with their numbers", () => {
    expect(pitches.cases?.map((c) => c.title.ko)).toEqual(['실시간 피드백이 멈추지 않는 구조', '무음, 잡음 구간 처리'])
    expect(koText(pitches.cases?.[0].result)).toContain('10개 중 5개')
    expect(koText(pitches.cases?.[1].result)).toContain('18%')
  })
})

describe('wording the site avoids', () => {
  it.each(Object.entries(BANNED))('%s avoids them in both languages', (slug, rules) => {
    expect(checkBanned(bySlug(slug), rules)).toEqual([])
  })
})
