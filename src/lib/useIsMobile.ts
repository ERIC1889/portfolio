'use client'

import { useCallback, useSyncExternalStore } from 'react'

export function useIsMobile(breakpoint = 768): boolean {
  const query = `(max-width: ${breakpoint - 1}px)`

  const subscribe = useCallback(
    (onChange: () => void) => {
      const mediaQuery = window.matchMedia(query)
      mediaQuery.addEventListener('change', onChange)
      return () => mediaQuery.removeEventListener('change', onChange)
    },
    [query],
  )

  // The server cannot know the viewport, so it renders the desktop variant.
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false)
}
