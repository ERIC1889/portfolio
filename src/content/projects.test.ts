import { describe, expect, it } from 'vitest'
import { projects } from './projects'
import { findHolds } from './release'
import { checkBanned, checkFeaturedShape, checkThroughline, collectStrings } from './validate'

const bySlug = (slug: string) => {
  const project = projects.find((p) => p.slug === slug)
  if (!project) throw new Error(`missing project ${slug}`)
  return project
}

// spec §4.5 — size, years and throughline order
const PLACEMENT = [
  ['suzihouse', 'featured', [2026], 6],
  ['closetmate', 'featured', [2026], 5],
  ['skillpilot', 'featured', [2025], 3],
  ['pitches', 'featured', [2024, 2026], 2],
  ['media-pulse', 'card', [2023], 1],
  ['label-light', 'card', [2024], undefined],
  ['wildfire', 'card', [2025], 4],
  ['edumatrix', 'card', [2025], undefined],
  ['innoview', 'card', [2025], undefined],
  ['restplanner', 'card', [2025], undefined],
  ['ai-hiring-textmining', 'card', [2026], undefined],
  ['jarvis', 'card', [2026], 7],
  ['dev-blog', 'card', [2026], undefined],
  ['llm-dolbom', 'line', [2024], undefined],
  ['patentry', 'line', [2024], undefined],
  ['dreamtrack', 'line', [2025], undefined],
  ['teamflow', 'line', [2026], undefined],
  ['unifit', 'line', [2026], undefined],
  ['formcoach', 'line', [2026], undefined],
] as const

// spec §4.4 — the seven throughline scenes, word for word
const SCENES: Record<string, [string, string]> = {
  'media-pulse': ['검색어 트렌드 API가 비율(%)만 준다', '광고 API의 실제 월간 검색 수를 기준점으로 엮어 월별 실제 검색량을 복원'],
  pitches: [
    '실시간 피드백에 Whisper는 너무 느리다(10초 음성에 0.5~1.3초)',
    '10초를 70ms에 처리하는 SenseVoice-Small을 고르고, LLM은 실시간 경로에서 빼서 발표 후 한 번만 → 무거운 분석은 요청 밖으로, 2026년엔 큐·재시도로 다시 설계',
  ],
  skillpilot: ['공공 API가 HTTP 200으로 에러 문자열을 보내거나 JSON 대신 XML을 준다', '에러 문구 감지 → XML로 다시 해석 → 간격 두고 재시도'],
  wildfire: ['실제 화재가 너무 드물어 직접 예측이 불가능', '목표를 공식 위험 등급으로 바꾸고, 실제 화재일에 맞는지 따로 확인'],
  closetmate: [
    'LLM이 옷장에 없는 옷을 추천할 수 있다 / Expo Go가 기기 모델을 못 돌린다',
    '옷 ID·후보 조합을 서버에서 대조, 실패 시 보조 모델 후 재검증 / 분류는 서버 ONNX로',
  ],
  suzihouse: ['CODEF·국토부 API가 느리고 제약이 많다', '인증 세션 재사용·간격 조회·주간 캐시, 기다림이 보이는 진행 화면'],
  jarvis: ['로컬 LLM 답이 끝날 때까지 기다리면 말이 늦다', '답을 문장 단위로 끊어 나오는 대로 읽기'],
}

// spec §4.7 / §5 / §6 — claims the code does not support
const BANNED: Record<string, (string | RegExp)[]> = {
  'label-light': ['파인튜닝', 'fine-tun', /GPT-4o(?!-mini)/],
  'llm-dolbom': ['심리 상태 분석', 'psychological state'],
  edumatrix: ['집중도', '성과 예측', 'performance prediction', '상태 머신', 'state machine', 'TypeScript'],
  innoview: ['감정 분석', 'emotion analysis', '음성 분석', 'voice analysis', '표정', 'facial'],
  restplanner: ['강화학습', 'reinforcement', 'Agent-to-Agent', 'A2A'],
  teamflow: ['SaaS'],
  unifit: ['AI'],
  patentry: ['특허 데이터', 'patent data'],
  pitches: ['Canvas', '200ms', '프론트엔드 주도', 'frontend lead', '이중 시간축', 'dual time', '150ms 미만', 'under 150', 'A10G', 'T4'],
  suzihouse: ['21개 테이블', '24개 API', '120개 테스트', '86.6', 'API 키 노출', 'API key exposure'],
  closetmate: ['온디바이스', 'on-device', '97.49', '86.68', '67.29'],
  wildfire: ['0.909', '0.77', '정확도', 'accuracy'],
  jarvis: ['1초', '1 second'],
}

describe('project placement', () => {
  it('matches the agreed size, years and throughline for every project', () => {
    expect(projects.map((p) => [p.slug, p.tier, p.years, p.throughline])).toEqual(PLACEMENT.map((row) => [...row]))
  })

  it('gives every card a single −/+ scene', () => {
    for (const card of projects.filter((p) => p.tier === 'card')) {
      expect(card.scene, card.slug).toBeDefined()
    }
  })
})

describe('featured case studies', () => {
  it.each(['suzihouse', 'closetmate', 'skillpilot', 'pitches'])('%s follows the case-study shape', (slug) => {
    expect(checkFeaturedShape(bySlug(slug))).toEqual([])
  })

  // The owner released the FINZ section on 2026-10-26; nothing is on hold for production.
  it('holds nothing back, so production can ship', () => {
    expect(findHolds(projects)).toEqual([])
  })

  it('presents the APIC-IST paper of Pitches as paper-reported results', () => {
    const paper = bySlug('pitches').sections?.find((s) => s.id === 'paper')
    expect(paper).toBeDefined()
    const text = collectStrings(paper)
      .filter((s) => s.lang === 'ko')
      .map((s) => s.value)
      .join(' ')
    for (const needle of ['APIC-IST 2025', '125ms', '20', '논문']) expect(text).toContain(needle)
  })

  it('dates ClosetMate 2026.03–2026.06 and links no repository', () => {
    const closetmate = bySlug('closetmate')
    expect(closetmate.period).toBe('2026.03–2026.06')
    expect(closetmate.links).toBeUndefined()
  })
})

describe('throughline', () => {
  it('has exactly one scene for each of 1..7', () => {
    expect(checkThroughline(projects)).toEqual([])
  })

  it.each(Object.entries(SCENES))('%s uses the approved wording', (slug, [minus, plus]) => {
    const scene = bySlug(slug).scene
    expect(scene?.minus.ko).toBe(minus)
    expect(scene?.plus.ko).toBe(plus)
  })
})

describe('claims the code does not support', () => {
  it.each(Object.entries(BANNED))('%s avoids them in both languages', (slug, rules) => {
    expect(checkBanned(bySlug(slug), rules)).toEqual([])
  })
})
