import { describe, expect, it } from 'vitest'
import { featuredProject, l } from '@/test/fixtures'
import type { Media, Project, SectionId } from './types'
import {
  checkBanned,
  checkEn,
  checkFeaturedShape,
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

function withSections(ids: SectionId[]): Project {
  return featuredProject('sample', 'Sample', [2025], { sections: ids.map((id) => ({ id, title: l(id), body: [l('본문')] })) })
}

const FULL_ORDER: SectionId[] = ['problem', 'implementation', 'validation', 'result', 'retro', 'evidence']

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
    'https://github.com/ERIC1889/InnoView', // private repositories behind the public profile
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
  // Built at run time so this file never contains a phone number itself.
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

  it('also checks section bodies and plain-string fields such as the stack', () => {
    expect(checkBanned(withSections(FULL_ORDER), ['본문'])).toHaveLength(FULL_ORDER.length)
    expect(checkBanned(card({ stack: ['Canvas'] }), ['Canvas'])).toHaveLength(1)
  })
})

describe('checkFeaturedShape', () => {
  it('accepts the full case-study order', () => {
    expect(checkFeaturedShape(withSections(FULL_ORDER))).toEqual([])
  })

  it('accepts an optional paper section between result and retro, and repeated implementation sections', () => {
    const ids: SectionId[] = ['problem', 'implementation', 'implementation', 'validation', 'result', 'paper', 'retro', 'evidence']
    expect(checkFeaturedShape(withSections(ids))).toEqual([])
  })

  it('reports a missing retro section', () => {
    expect(checkFeaturedShape(withSections(FULL_ORDER.filter((id) => id !== 'retro')))).toEqual(['sample: missing section retro'])
  })

  it('reports evidence placed before the problem', () => {
    expect(checkFeaturedShape(withSections(['evidence', ...FULL_ORDER.filter((id) => id !== 'evidence')]))).toHaveLength(1)
  })

  it('requires what it is, who made it, its status with a check date, a showcase and media', () => {
    const bare = { ...withSections(FULL_ORDER), title: undefined, product: undefined, team: undefined, statusCheckedAt: '2026/10/29', showcase: undefined, media: [] }
    expect(checkFeaturedShape(bare)).toEqual([
      'sample: missing title',
      'sample: missing product',
      'sample: missing team',
      'sample: missing showcase',
      'sample: statusCheckedAt must be YYYY-MM-DD',
      'sample: missing media',
    ])
  })

  it('reports a section anchor used twice', () => {
    const project = withSections(FULL_ORDER)
    project.sections![1] = { ...project.sections![1], anchor: 'x' }
    project.sections![2] = { ...project.sections![2], anchor: 'x' }
    expect(checkFeaturedShape(project)).toEqual(['sample: section anchors repeat'])
  })
})

describe('checkMedia', () => {
  const shot: Media = { kind: 'screenshot', src: '/media/a.webp', width: 10, height: 10, alt: l('화면', 'Screen'), caption: l('화면 · 실제 화면', 'Screen · real'), capturedAt: '2026-10-29' }

  it('accepts a captioned, dated screenshot, including ones inside sections', () => {
    const project = featuredProject('a', 'A', [2026], { media: [shot], sections: [{ id: 'implementation', title: l('t'), body: [], media: [shot] }] })
    expect(checkMedia(project)).toEqual([])
  })

  it('requires a poster for a video, a date, a site path and both captions', () => {
    const video: Media = { ...shot, kind: 'video', src: 'media/v.mp4', capturedAt: '2026-10', caption: l('영상', '') }
    expect(checkMedia(featuredProject('a', 'A', [2026], { media: [video] }))).toHaveLength(4)
  })

  it('makes a mockup say so in both languages', () => {
    const mockup: Media = { ...shot, kind: 'mockup' }
    expect(checkMedia(featuredProject('a', 'A', [2026], { media: [mockup] }))).toEqual(['a /media/a.webp: a mockup must be labelled as one'])
    const labelled: Media = { ...mockup, caption: l('디자인 목업', 'Design mockup') }
    expect(checkMedia(featuredProject('a', 'A', [2026], { media: [labelled] }))).toEqual([])
  })
})

describe('checkMetrics', () => {
  it('requires a value, what was measured, the conditions and a check date', () => {
    const metric = { label: l('지표'), value: '', target: l(''), condition: l('조건'), source: 'measured' as const, checkedAt: 'yesterday' }
    expect(checkMetrics(featuredProject('a', 'A', [2026], { metrics: [metric] }))).toEqual([
      'a 지표: missing value',
      'a 지표: missing target',
      'a 지표: checkedAt must be YYYY-MM-DD',
    ])
  })
})
