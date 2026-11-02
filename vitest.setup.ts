import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
class NoopIntersectionObserver {
  readonly root = null
  readonly rootMargin = ''
  readonly thresholds = []
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}

beforeEach(() => {
  if (!window.matchMedia) {
    window.matchMedia = ((query: string) =>
      ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener() {},
        removeEventListener() {},
        addListener() {},
        removeListener() {},
        dispatchEvent: () => false,
      }) as MediaQueryList) as typeof window.matchMedia
  }
  if (!('IntersectionObserver' in window)) {
    Object.defineProperty(window, 'IntersectionObserver', { value: NoopIntersectionObserver, configurable: true, writable: true })
  }
})

afterEach(() => {
  cleanup()
  localStorage.clear()
  vi.restoreAllMocks()
})
