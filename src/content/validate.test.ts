import { describe, expect, it } from 'vitest'
import { featuredProject, l, paar } from '@/test/fixtures'
import type { Media, Project } from './types'
import {
  checkBanned,
  checkCaseShape,
  checkEn,
  checkKo,
  checkLinks,
  checkMedia,
  checkMetrics,
  checkNoLocalPaths,
  checkNoPhoneNumbers,
  collectStrings,
} from './validate'

function card(overrides: Partial<Project> = {}): Project {
  return {
    slug: 'sample',
    name: 'Sample',
    years: [2025],
    tier: 'card',
    period: '2025.01–2025.02',
    stack: ['React'],
    summary: l('요약', 'Summary'),
    ...overrides,
  }
}

const sample = (extra: Partial<Project> = {}) => featuredProject('sample', 'Sample', [2025], extra)

describe('collectStrings', () => {
  it('finds every bilingual string with its path', () => {
    const found = collectStrings({ a: l('가', 'A'), list: [{ b: l('나', 'B') }] })
    expect(found).toEqual([
      { path: 'a', lang: 'ko', value: '가' },
      { path: 'a', lang: 'en', value: 'A' },
      { path: 'list[0].b', lang: 'ko', value: '나' },
      { path: 'list[0].b', lang: 'en', value: 'B' },
    ])
  })
})

describe('checkKo / checkEn', () => {
  it('reports a Korean string that is only whitespace, naming its path', () => {
    const errors = checkKo({ a: l(' ', 'x') })
    expect(errors).toHaveLength(1)
    expect(errors[0]).toContain('a')
  })

  it('reports empty English strings separately', () => {
    expect(checkKo({ a: l('가'), b: [l('나')] })).toEqual([])
    expect(checkEn({ a: l('가', ''), b: l('나', 'B') })).toHaveLength(1)
  })
})

describe('checkLinks', () => {
  it.each([
    '/projects/finz',
    '/projects/finz#refund-app',
    '#validation',
    'https://finz.kr',
    'https://www.finz.kr/personal/property',
    'https://github.com/Hanshin-OSS-Hub/capstone25-skillpilot/blob/main/SkillPilot-backend/src/integrations/dataGoKr/client.js',
    'https://github.com/ERIC1889/portfolio',
    'https://junyoung-dev-notes.vercel.app/posts/1',
    'https://github.com/ERIC1889',
    'https://www.linkedin.com/in/%EC%A4%80%EC%98%81-%ED%97%88-8142a130a/',
    'mailto:eric1889@naver.com',
  ])('allows %s', (href) => {
    expect(checkLinks({ links: [{ href }] })).toEqual([])
  })

  it.each([
    'https://github.com/ERIC1889/InnoView',
    'https://finz.kr.evil.example',
    '//evil.example/path',
    'mailto:someone@else.example',
    'http://finz.kr',
    'tel:+82',
  ])('rejects %s', (href) => {
    expect(checkLinks({ links: [{ href }] })).toHaveLength(1)
  })
})

describe('checkNoLocalPaths', () => {
  it('rejects strings that expose a local filesystem path', () => {
    expect(checkNoLocalPaths({ x: l('/Users/someone/a') })).toHaveLength(1)
    expect(checkNoLocalPaths({ evidence: '~/Desktop/Business/app.ts' })).toHaveLength(1)
    expect(checkNoLocalPaths({ x: l('23.04 ~ 23.07') })).toEqual([])
  })
})

describe('checkNoPhoneNumbers', () => {
  const mobile = ['010', '1234', '5678'].join('-')
  const international = ['+82', '10', '1234', '5678'].join(' ')

  it.each([mobile, international, `tel:${mobile}`])('finds %s', (value) => {
    expect(checkNoPhoneNumbers({ x: l(value) })).toHaveLength(1)
  })

  it.each(['2026-10-29', '24.10.24 ~ 24.10.27', '1600x1097', '4,804ms', '2023.03–2027.02'])('leaves %s alone', (value) => {
    expect(checkNoPhoneNumbers({ x: l(value) })).toEqual([])
  })
})

describe('checkBanned', () => {
  it('flags a banned phrase anywhere in the project, in either language', () => {
    expect(checkBanned(card({ summary: l('GPT-4o 파인튜닝') }), ['파인튜닝'])).toHaveLength(1)
    expect(checkBanned(card({ summary: l('요약', 'fine-tuned GPT-4o') }), ['fine-tun'])).toHaveLength(1)
  })

  it('applies regular expressions', () => {
    const rule = /GPT-4o(?!-mini)/
    expect(checkBanned(card({ summary: l('GPT-4o-mini 기반') }), [rule])).toEqual([])
    expect(checkBanned(card({ summary: l('GPT-4o 기반') }), [rule])).toHaveLength(1)
  })

  it('also checks case bodies, product text and plain-string fields such as the stack', () => {
    expect(checkBanned(sample({ cases: [paar('X')] }), [/^X 행동$/])).toHaveLength(1)
    const work = sample({ kind: 'work', duties: [l('일')], products: [{ id: 'p', name: l('제품'), status: l('상태'), role: l('역할'), intro: [l('금지된 소개')] }] })
    expect(checkBanned(work, ['금지된'])).toHaveLength(1)
    expect(checkBanned(card({ stack: ['Canvas'] }), ['Canvas'])).toHaveLength(1)
  })
})

describe('checkCaseShape', () => {
  it('accepts a project with the new shape', () => {
    expect(checkCaseShape(sample())).toEqual([])
  })

  it('accepts a work page with duties and products', () => {
    const work = sample({
      kind: 'work',
      duties: [l('맡은 일')],
      products: [
        { id: 'a', name: l('제품 A'), status: l('운영 중'), role: l('설계'), intro: [l('소개')], cases: [paar('A 사례')] },
        { id: 'b', name: l('제품 B'), status: l('미출시'), role: l('개발'), intro: [l('소개')] },
      ],
    })
    expect(checkCaseShape(work)).toEqual([])
  })

  it('requires at least two highlights, a background, results and a reflection', () => {
    expect(checkCaseShape(sample({ overview: { highlights: [l('하나')] } }))).toEqual(['sample: overview needs at least 2 highlights'])
    expect(checkCaseShape(sample({ background: [] }))).toEqual(['sample: missing background'])
    expect(checkCaseShape(sample({ results: undefined }))).toEqual(['sample: missing results'])
    expect(checkCaseShape(sample({ retro: [] }))).toEqual(['sample: missing retro'])
  })

  it('requires duties, products and distinct product ids on a work page', () => {
    expect(checkCaseShape(sample({ kind: 'work' }))).toEqual(['sample: missing duties', 'sample: missing products'])
    const twice = sample({
      kind: 'work',
      duties: [l('일')],
      products: [
        { id: 'same', name: l('A'), status: l('s'), role: l('r'), intro: [l('i')] },
        { id: 'same', name: l('B'), status: l('s'), role: l('r'), intro: [] },
      ],
    })
    expect(checkCaseShape(twice)).toEqual(['sample: product ids repeat', 'sample: product same needs an intro'])
  })

  it('refuses legacy sections next to the new shape, and a page with neither', () => {
    expect(checkCaseShape(sample({ sections: [{ id: 'problem', title: l('문제'), body: [l('본문')] }] }))).toEqual(['sample: legacy sections with the new shape'])
    const legacyOnly = sample({ overview: undefined, background: undefined, cases: undefined, products: undefined })
    expect(checkCaseShape(legacyOnly)).toEqual(['sample: missing the case shape (overview, background, cases or products)'])
  })

  it('names a case that lacks a problem or an action', () => {
    const broken = { ...paar('빈 사례'), action: { body: [] } }
    expect(checkCaseShape(sample({ cases: [broken] }))).toEqual(['sample: case "빈 사례" needs problem and action'])
  })

  it('requires what it is, who made it, its status with a check date, a showcase and a picture', () => {
    const bare = { ...sample(), product: undefined, team: undefined, statusCheckedAt: '2026/10/29', showcase: undefined, media: [] }
    expect(checkCaseShape(bare)).toEqual([
      'sample: missing product',
      'sample: missing team',
      'sample: missing showcase',
      'sample: statusCheckedAt must be YYYY-MM-DD',
      'sample: missing media or image',
    ])
    expect(checkCaseShape({ ...sample(), media: undefined, image: '/images/x.png', imageSize: [10, 10], imageCaption: l('x', 'x') })).toEqual([])
  })
})

describe('checkMedia', () => {
  const shot: Media = { kind: 'screenshot', src: '/media/a.webp', width: 10, height: 10, alt: l('화면', 'Screen'), caption: l('화면 · 실제 화면', 'Screen · real'), capturedAt: '2026-10-29' }

  it('accepts a captioned, dated screenshot wherever it sits: top level, a case or a product', () => {
    const project = sample({
      media: [shot],
      cases: [{ ...paar('사례'), media: [shot] }],
      kind: 'work',
      duties: [l('일')],
      products: [{ id: 'p', name: l('제품'), status: l('s'), role: l('r'), intro: [l('i')], media: [shot], cases: [{ ...paar('제품 사례'), media: [shot] }] }],
    })
    expect(checkMedia(project)).toEqual([])
  })

  it('finds an undated picture inside a product', () => {
    const undated = { ...shot, capturedAt: undefined }
    const project = sample({ media: [shot], kind: 'work', duties: [l('일')], products: [{ id: 'p', name: l('제품'), status: l('s'), role: l('r'), intro: [l('i')], media: [undated] }] })
    expect(checkMedia(project)).toEqual(['sample /media/a.webp: capturedAt must be YYYY-MM-DD'])
  })

  it('requires a poster for a video, a date, a site path and both captions', () => {
    const video: Media = { ...shot, kind: 'video', src: 'media/v.mp4', capturedAt: '2026-10', caption: l('영상', '') }
    expect(checkMedia(sample({ media: [video] }))).toHaveLength(4)
  })

  it('makes a mockup say so in both languages', () => {
    const mockup: Media = { ...shot, kind: 'mockup' }
    expect(checkMedia(sample({ media: [mockup] }))).toEqual(['sample /media/a.webp: a mockup must be labelled as one'])
    const labelled: Media = { ...mockup, caption: l('디자인 목업', 'Design mockup') }
    expect(checkMedia(sample({ media: [labelled] }))).toEqual([])
  })
})

describe('checkMetrics', () => {
  it('requires a value, what was measured, the conditions and a check date', () => {
    const metric = { label: l('지표'), value: '', target: l(''), condition: l('조건'), source: 'measured' as const, checkedAt: 'yesterday' }
    expect(checkMetrics(sample({ metrics: [metric] }))).toEqual([
      'sample 지표: missing value',
      'sample 지표: missing target',
      'sample 지표: checkedAt must be YYYY-MM-DD',
    ])
  })
})
