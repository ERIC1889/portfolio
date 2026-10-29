import { beforeEach, describe, expect, it, vi } from 'vitest'
import { themeInitScript } from './theme'

function runScript() {
  new Function(themeInitScript())()
}

describe('themeInitScript', () => {
  beforeEach(() => {
    delete document.documentElement.dataset.theme
  })

  it('applies a stored dark theme before the first paint', () => {
    localStorage.setItem('theme', 'dark')
    runScript()
    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  it('falls back to light when nothing is stored', () => {
    runScript()
    expect(document.documentElement.dataset.theme).toBe('light')
  })

  it('ignores an unknown stored value', () => {
    localStorage.setItem('theme', 'blue')
    runScript()
    expect(document.documentElement.dataset.theme).toBe('light')
  })

  it('still sets light when storage access throws (private mode)', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    expect(runScript).not.toThrow()
    expect(document.documentElement.dataset.theme).toBe('light')
  })
})
