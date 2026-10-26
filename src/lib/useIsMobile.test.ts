import { afterEach, describe, expect, it } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useIsMobile } from './useIsMobile'

// jsdom has no matchMedia; this stand-in evaluates "(max-width: Npx)" against a settable width.
function stubViewport(initialWidth: number) {
  let width = initialWidth
  const listeners = new Set<() => void>()
  window.matchMedia = ((query: string) => {
    const max = Number(/max-width:\s*(\d+)px/.exec(query)?.[1])
    return {
      matches: width <= max,
      media: query,
      addEventListener: (_type: string, listener: () => void) => listeners.add(listener),
      removeEventListener: (_type: string, listener: () => void) => listeners.delete(listener),
    } as unknown as MediaQueryList
  }) as typeof window.matchMedia
  return {
    resize(nextWidth: number) {
      width = nextWidth
      listeners.forEach((listener) => listener())
    },
  }
}

describe('useIsMobile', () => {
  afterEach(() => {
    // @ts-expect-error -- remove the stub so other tests see jsdom's default
    delete window.matchMedia
  })

  it('is true below the 768px breakpoint', () => {
    stubViewport(375)
    expect(renderHook(() => useIsMobile()).result.current).toBe(true)
  })

  it('is false at exactly 768px', () => {
    stubViewport(768)
    expect(renderHook(() => useIsMobile()).result.current).toBe(false)
  })

  it('follows the viewport when it crosses the breakpoint', () => {
    const viewport = stubViewport(1440)
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)
    act(() => viewport.resize(375))
    expect(result.current).toBe(true)
  })

  it('respects a custom breakpoint', () => {
    stubViewport(900)
    expect(renderHook(() => useIsMobile(1024)).result.current).toBe(true)
  })
})
