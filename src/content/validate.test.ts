import { describe, expect, it } from 'vitest'
import type { CaseSection, Project, SectionId } from './types'
import {
  checkBanned,
  checkEn,
  checkFeaturedShape,
  checkKo,
  checkLinks,
  checkNoLocalPaths,
  checkThroughline,
  collectStrings,
} from './validate'

const l = (ko: string, en = '') => ({ ko, en })

function project(overrides: Partial<Project> = {}): Project {
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

function sections(ids: SectionId[]): CaseSection[] {
  return ids.map((id) => ({ id, title: l(id), body: [l('본문')] }))
}

const FULL_ORDER: SectionId[] = ['overview', 'problem', 'decision', 'implementation', 'validation', 'result', 'retro', 'evidence']

function featured(ids: SectionId[] = FULL_ORDER): Project {
  return project({ tier: 'featured', question: l('질문?'), status: l('미출시'), role: l('백엔드'), sections: sections(ids) })
}

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

  it('accepts filled Korean strings even when English is still empty', () => {
    expect(checkKo({ a: l('가'), b: [l('나')] })).toEqual([])
  })

  it('reports empty English strings separately', () => {
    expect(checkEn({ a: l('가', ''), b: l('나', 'B') })).toHaveLength(1)
  })
})

describe('checkLinks', () => {
  it.each([
    '/projects/pitches',
    '/#cases',
    '#top',
    'tel:+821035061889',
    'https://finz.kr',
    'https://finz.kr/simulator',
    'https://github.com/Hanshin-OSS-Hub/capstone25-skillpilot/blob/main/README.md',
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
  ])('rejects %s', (href) => {
    expect(checkLinks({ links: [{ href }] })).toHaveLength(1)
  })
})

describe('checkNoLocalPaths', () => {
  it('rejects strings that expose a local filesystem path', () => {
    expect(checkNoLocalPaths({ x: l('/Users/eric1889/a') })).toHaveLength(1)
    expect(checkNoLocalPaths({ evidence: '~/Desktop/Business/app.ts' })).toHaveLength(1)
  })

  it('allows the whoami shell prompt', () => {
    expect(checkNoLocalPaths({ x: l('~/junyoung $ whoami') })).toEqual([])
  })
})

describe('checkBanned', () => {
  it('flags a banned phrase anywhere in the project, in either language', () => {
    expect(checkBanned(project({ summary: l('GPT-4o 파인튜닝') }), ['파인튜닝'])).toHaveLength(1)
    expect(checkBanned(project({ summary: l('요약', 'fine-tuned GPT-4o') }), ['fine-tun'])).toHaveLength(1)
  })

  it('applies regular expressions', () => {
    const rule = /GPT-4o(?!-mini)/
    expect(checkBanned(project({ summary: l('GPT-4o-mini 기반') }), [rule])).toEqual([])
    expect(checkBanned(project({ summary: l('GPT-4o 기반') }), [rule])).toHaveLength(1)
  })

  it('also checks section bodies and plain-string fields such as the stack', () => {
    expect(checkBanned(featured(), ['본문'])).toHaveLength(FULL_ORDER.length)
    expect(checkBanned(project({ stack: ['Canvas'] }), ['Canvas'])).toHaveLength(1)
  })
})

describe('checkFeaturedShape', () => {
  it('accepts the full case-study order', () => {
    expect(checkFeaturedShape(featured())).toEqual([])
  })

  it('accepts an optional paper section between result and retro, and repeated implementation sections', () => {
    const ids: SectionId[] = ['overview', 'problem', 'decision', 'implementation', 'implementation', 'validation', 'result', 'paper', 'retro', 'evidence']
    expect(checkFeaturedShape(featured(ids))).toEqual([])
  })

  it('reports a missing retro section', () => {
    expect(checkFeaturedShape(featured(FULL_ORDER.filter((id) => id !== 'retro')))).toHaveLength(1)
  })

  it('reports evidence placed before the overview', () => {
    expect(checkFeaturedShape(featured(['evidence', ...FULL_ORDER.filter((id) => id !== 'evidence')]))).toHaveLength(1)
  })

  it('requires the question, status and role', () => {
    const bare = { ...featured(), question: undefined, status: undefined, role: undefined }
    expect(checkFeaturedShape(bare)).toHaveLength(3)
  })
})

describe('checkThroughline', () => {
  const scene = { minus: l('막힘'), plus: l('해결') }
  const scenes = (orders: number[]) => orders.map((n, i) => project({ slug: `p${i}`, throughline: n, scene }))

  it('accepts exactly one scene for each of 1..7', () => {
    expect(checkThroughline(scenes([1, 2, 3, 4, 5, 6, 7]))).toEqual([])
  })

  it('reports a missing number when only six scenes exist', () => {
    expect(checkThroughline(scenes([1, 2, 3, 4, 5, 6]))).toHaveLength(1)
  })

  it('reports a number used twice', () => {
    expect(checkThroughline(scenes([1, 2, 3, 3, 4, 5, 6, 7]))).toHaveLength(1)
  })

  it('reports a throughline project without a scene', () => {
    const list = scenes([1, 2, 3, 4, 5, 6, 7])
    list[2] = { ...list[2], scene: undefined }
    expect(checkThroughline(list)).toHaveLength(1)
  })
})
