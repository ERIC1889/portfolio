import { describe, expect, it, vi } from 'vitest'
import { featuredProject, l } from '@/test/fixtures'
import pkg from '../../package.json'
import { findHolds, runReleaseCheck, shouldBlock } from './release'

const held = featuredProject('suzihouse', '수지하우스', [2026], {
  sections: [
    { id: 'overview', title: l('개요'), body: [l('본문')] },
    { id: 'implementation', title: l('FINZ'), body: [l('본문')], hold: true, holdKey: 'finz' },
    { id: 'implementation', title: l('보류 키 없음'), body: [l('본문')], hold: true },
  ],
})
const clean = featuredProject('skillpilot', 'SkillPilot', [2025])

describe('findHolds', () => {
  it('names each held section by slug and hold key, falling back to the section id', () => {
    expect(findHolds([clean, held])).toEqual(['suzihouse#finz', 'suzihouse#implementation'])
  })

  it('finds nothing when no section is held', () => {
    expect(findHolds([clean])).toEqual([])
  })
})

describe('shouldBlock', () => {
  it('blocks only a production build that still has holds', () => {
    expect(shouldBlock('production', ['x'])).toBe(true)
    expect(shouldBlock('preview', ['x'])).toBe(false)
    expect(shouldBlock(undefined, ['x'])).toBe(false)
    expect(shouldBlock('production', [])).toBe(false)
  })
})

describe('runReleaseCheck', () => {
  it('fails a production build and says which content is on hold', () => {
    const log = { error: vi.fn(), warn: vi.fn() }
    expect(runReleaseCheck([held], 'production', log)).toBe(1)
    expect(log.error).toHaveBeenCalledWith(expect.stringContaining('공개 보류 항목이 남아 있어 운영 배포를 중단합니다'))
    expect(log.error).toHaveBeenCalledWith(expect.stringContaining('suzihouse#finz'))
  })

  it('lets a preview build through but warns about the holds', () => {
    const log = { error: vi.fn(), warn: vi.fn() }
    expect(runReleaseCheck([held], 'preview', log)).toBe(0)
    expect(log.error).not.toHaveBeenCalled()
    expect(log.warn).toHaveBeenCalledWith(expect.stringContaining('suzihouse#finz'))
  })

  it('passes a production build silently when nothing is held', () => {
    const log = { error: vi.fn(), warn: vi.fn() }
    expect(runReleaseCheck([clean], 'production', log)).toBe(0)
    expect(log.error).not.toHaveBeenCalled()
    expect(log.warn).not.toHaveBeenCalled()
  })
})

describe('build script', () => {
  // Part of `build` itself, not a `prebuild` hook, so a build-command override or a
  // package manager that skips pre-hooks cannot ship a held section silently.
  it('runs the release check before next build', () => {
    expect(pkg.scripts.build).toBe('tsx scripts/check-release.ts && next build')
    expect(pkg.scripts).not.toHaveProperty('prebuild')
  })
})
