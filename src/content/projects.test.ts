import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { projects } from './projects'
import { CASE_ORDER } from './select'
import { findHolds } from './release'
import { checkBanned, checkFeaturedShape, checkMedia, checkMetrics, collectStrings } from './validate'

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

const PLACEMENT = [
  ['finz', 'featured', 'flagship', [2026]],
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
  closetmate: ['온디바이스', 'on-device', '97.49', '86.68', '67.29', '딥러닝 기초', '수업', 'deep learning course', 'course project'],
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

  it('gives case-study sections only to the projects in the page order', () => {
    for (const project of projects.filter((p) => !(CASE_ORDER as readonly string[]).includes(p.slug))) {
      expect(project.sections, project.slug).toBeUndefined()
      expect(project.showcase, project.slug).toBeUndefined()
    }
  })
})

describe('featured case studies', () => {
  it.each(FEATURED)('%s follows the case-study shape', (slug) => {
    expect(checkFeaturedShape(bySlug(slug))).toEqual([])
  })

  it.each(FEATURED)('%s captions and dates every picture and video', (slug) => {
    expect(checkMedia(bySlug(slug))).toEqual([])
  })

  it.each(FEATURED)('%s points every picture, video and poster at a file that exists', (slug) => {
    const project = bySlug(slug)
    const media = [...(project.media ?? []), ...(project.sections ?? []).flatMap((s) => s.media ?? [])]
    for (const path of media.flatMap((m) => [m.src, ...(m.poster ? [m.poster] : [])])) {
      expect(existsSync(join(PUBLIC, path)), path).toBe(true)
    }
  })

  it('gives every number what was measured, the conditions, a source and a date', () => {
    for (const project of projects) expect(checkMetrics(project)).toEqual([])
  })

  it('holds nothing back, so production can ship', () => {
    expect(findHolds(projects)).toEqual([])
  })
})

describe('flagship: Finz personal tax calculators', () => {
  const finz = bySlug('finz')

  it('is the one flagship, named by its product', () => {
    expect(projects.filter((p) => p.showcase === 'flagship').map((p) => p.slug)).toEqual(['finz'])
    expect(finz.title?.ko).toBe('Finz 개인 세금 계산기')
    expect(finz.team?.ko).toContain('주식회사 Finz Labs')
  })

  it('shows at least three screens and a demo video', () => {
    const media = finz.media ?? []
    expect(media.filter((m) => m.kind === 'screenshot').length).toBeGreaterThanOrEqual(3)
    expect(media.filter((m) => m.kind === 'video')).toHaveLength(1)
    expect(media[0].kind).toBe('video')
  })

  it('says what I built and what I did with others, without "built by others" or "not done yet" rows', () => {
    expect(finz.contribution?.direct.length).toBeGreaterThan(0)
    expect(finz.contribution?.others).toBeUndefined()
    expect(koText(finz.contribution?.joint)).toContain('세무사')
    expect(finz.contribution?.notYet).toBeUndefined()
  })

  it('backs the calculation with measured checks against the reference workbook', () => {
    const [workbook, webTests, engine, security] = finz.metrics ?? []
    expect(webTests.value).toBe('184 통과')
    expect(workbook).toMatchObject({ value: '21/21', source: 'measured' })
    expect(koText(workbook.condition)).toContain('±10원')
    expect(engine.value).toContain('58')
    expect(koText(security.condition)).toContain('웹 계산 기능과는 별개')
  })

  it('keeps the app section to the refund flow and its demo video, with no phone screenshots and no demo-screen claims', () => {
    const app = finz.sections?.find((s) => s.anchor === 'refund-app')
    expect(koText(app?.body)).not.toContain('금융 교육 퀴즈')
    expect(app?.media?.map((m) => m.kind)).toEqual(['video'])
  })

  it('keeps the SaaS section to my role: one paragraph, no screens and no feature descriptions', () => {
    const saas = finz.sections?.find((s) => s.anchor === 'finz-saas')
    expect(saas?.media).toBeUndefined()
    expect(saas?.body).toHaveLength(1)
    expect(koText(saas?.body)).toContain('출시 전이라 기능 설명과 화면은 싣지 않습니다')
  })

  it('keeps the calculator gallery to the demo video and four calculator screens', () => {
    expect(finz.media?.map((m) => m.src)).toEqual([
      '/media/finz/web-demo.mp4',
      '/media/finz/web-crypto.webp',
      '/media/finz/web-stock.webp',
      '/media/finz/web-stock-gift.webp',
      '/media/finz/web-six-way.webp',
    ])
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
  })

  it('credits the crypto engine and the valuation module to the company SaaS it was adapted from', () => {
    const direct = koText(finz.contribution?.direct)
    expect(direct).toContain('회사 세무 SaaS의 코드를 개인용으로 옮기고')
    expect(koText(finz.features)).not.toMatch(/가상자산 (계산 )?엔진을 (직접 )?(만들|작성)/)
  })

  it('keeps the app and the SaaS in their own sections, describing the SaaS work as verification, not fixes or code', () => {
    const anchors = finz.sections?.map((s) => s.anchor)
    expect(anchors).toContain('refund-app')
    expect(anchors).toContain('finz-saas')
    const saas = koText(finz.sections?.find((s) => s.anchor === 'finz-saas'))
    expect(saas).toContain('개발사와 함께 정하며 개발에 참여')
    const solved = koText(finz.sections?.find((s) => s.anchor === 'solved-saas'))
    for (const fact of ['269건', '233건', '36건', '45건', '7개 모두']) expect(solved).toContain(fact)
    expect(koText(finz.sections)).not.toMatch(/\d+건 해결|해결률/)
  })

  it('groups problem solving by product, right after each product', () => {
    const anchors = finz.sections?.filter((s) => !s.lead).map((s) => s.anchor)
    expect(anchors).toEqual(['decisions', 'solved', 'refund-app', 'solved-app', 'finz-saas', 'solved-saas', undefined, undefined])
  })

  it('tells the CODEF session story with the five-year check against Hometax records', () => {
    const solved = koText(finz.sections?.find((s) => s.anchor === 'solved-app'))
    for (const fact of ['첫 연도만 조회되고', '인증 세션', '간편인증 한 번에 5개 연도', '홈택스에서 받은 자료와 대조', '인증 단계와 조회 단계'])
      expect(solved).toContain(fact)
    expect(koText(finz.contribution?.verified)).toContain('5개 연도')
  })
})

describe('supporting: SkillPilot', () => {
  const skillpilot = bySlug('skillpilot')

  it('leaves the study-companion picture out', () => {
    expect(skillpilot.media?.some((m) => m.src.includes('mate'))).toBe(false)
  })

  it('describes the error handling as the two branches in client.js', () => {
    const text = koText(skillpilot.sections?.filter((s) => s.id === 'implementation'))
    expect(text).toContain('0.5초, 1초 간격으로 최대 2번 다시 시도')
    expect(text).toContain('XML과 JSON 응답을 모두 해석')
  })

  it('links the repository first, then the client, sync and AI-reuse code and the final presentation directly', () => {
    const hrefs = skillpilot.links?.map((l) => l.href) ?? []
    expect(hrefs[0]).toBe('https://github.com/Hanshin-OSS-Hub/capstone25-skillpilot')
    expect(hrefs[1]).toMatch(/integrations\/dataGoKr\/client\.js$/)
    expect(hrefs.some((h) => h.endsWith('certificationSync.service.js'))).toBe(true)
    expect(hrefs.some((h) => h.endsWith('ai.service.js'))).toBe(true)
    expect(hrefs.some((h) => h.endsWith('.pdf'))).toBe(true)
  })

  it('does not lead with a login screen', () => {
    expect(skillpilot.media?.some((m) => /login/i.test(m.src))).toBe(false)
  })
})

describe('supporting: ClosetMate', () => {
  const closetmate = bySlug('closetmate')

  it('states the benchmark setup and that 43 images are a flow check, not accuracy', () => {
    const [timing, , flowCheck] = closetmate.metrics ?? []
    expect(koText(timing.condition)).toContain('Apple M5 CPU')
    expect(koText(timing.condition)).toContain('워밍업 5회·측정 30회')
    expect(flowCheck.value).toBe('43장')
    expect(koText(flowCheck.condition)).toContain('정확도 수치 아님')
  })

  it('dates the project and links no repository', () => {
    expect(closetmate.period).toBe('2026.03–2026.06')
    expect(closetmate.links).toBeUndefined()
  })

})

describe('other work: Pitches', () => {
  const pitches = bySlug('pitches')

  it('presents the APIC-IST paper as paper-reported results', () => {
    const text = koText(pitches.sections?.find((s) => s.id === 'result'))
    for (const needle of ['APIC-IST 2025', '125ms', '20세션', '논문']) expect(text).toContain(needle)
  })

  it('marks 70ms as a public benchmark and labels the demo as the iOS simulator', () => {
    expect(koText(pitches)).toContain('공개 벤치마크')
    const media = pitches.media ?? []
    expect(media[0].kind).toBe('video')
    for (const m of media) expect(m.caption.ko).toContain('iOS 시뮬레이터')
    expect(pitches.contribution?.notYet).toBeUndefined()
  })

  it('separates the three versions in one table', () => {
    const table = pitches.sections?.find((s) => s.table)?.table
    expect(table?.rows.map((row) => row[0].ko)).toEqual(['2024–25 팀 버전', 'APIC-IST 2025 논문', '2026 개인 리뉴얼'])
  })
})

describe('the agreed page shape', () => {
  const titles = (slug: string) => (bySlug(slug).sections ?? []).map((s) => s.title.ko)

  it.each(FEATURED)('%s has every part of a main project', (slug) => {
    const sections = bySlug(slug).sections ?? []
    expect(sections.filter((s) => s.lead).map((s) => s.title.ko)).toEqual(['핵심 성과', '문제 정의'])
    for (const part of ['주요 의사 결정', '핵심 기술 문제 해결', '회고', '관련 자료']) {
      expect(titles(slug).some((title) => title === part || title.startsWith(`${part} · `)), `${slug}: ${part}`).toBe(true)
    }
    expect(bySlug(slug).contribution).toBeDefined()
  })

  it.each(SUPPORTING)('%s explains results, the problem, my role, the structure, decisions and a reflection', (slug) => {
    expect(titles(slug).slice(0, 3)).toEqual(['핵심 성과', '문제 정의', '담당 역할 및 기여'])
    expect(titles(slug)).toEqual(expect.arrayContaining(['시스템 구조', '주요 의사 결정', '회고']))
  })

  it('keeps Media Pulse to a role and one problem', () => {
    expect(titles('media-pulse')).toEqual(['담당 역할 및 기여', '인상적인 문제'])
  })
})

describe('wording the site avoids', () => {
  it.each(Object.entries(BANNED))('%s avoids them in both languages', (slug, rules) => {
    expect(checkBanned(bySlug(slug), rules)).toEqual([])
  })
})
