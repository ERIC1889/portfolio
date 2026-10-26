import { render } from '@testing-library/react'
import { vi } from 'vitest'
import type { ReactElement } from 'react'
import { LanguageProvider } from '@/components/providers/LanguageProvider'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

/** Render inside the real providers with a Korean (or English) browser and nothing stored. */
export function renderWithProviders(ui: ReactElement, browserLanguage = 'ko-KR') {
  vi.spyOn(navigator, 'language', 'get').mockReturnValue(browserLanguage)
  return render(
    <ThemeProvider>
      <LanguageProvider>{ui}</LanguageProvider>
    </ThemeProvider>,
  )
}
