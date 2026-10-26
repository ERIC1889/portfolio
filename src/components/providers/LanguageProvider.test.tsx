import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LanguageProvider, useLang } from './LanguageProvider'

function Probe() {
  const { t, setLang } = useLang()
  return (
    <>
      <p>{t({ ko: '가', en: 'A' })}</p>
      <button onClick={() => setLang('en')}>to-en</button>
    </>
  )
}

function renderWithBrowserLanguage(browserLanguage: string) {
  vi.spyOn(navigator, 'language', 'get').mockReturnValue(browserLanguage)
  return render(
    <LanguageProvider>
      <Probe />
    </LanguageProvider>,
  )
}

describe('LanguageProvider', () => {
  it('switches to the stored language after mount', async () => {
    localStorage.setItem('lang', 'en')
    renderWithBrowserLanguage('ko-KR')
    expect(await screen.findByText('A')).toBeInTheDocument()
  })

  it('uses English for an English browser when nothing is stored', async () => {
    renderWithBrowserLanguage('en-US')
    expect(await screen.findByText('A')).toBeInTheDocument()
  })

  it('uses Korean for a Korean browser when nothing is stored', async () => {
    renderWithBrowserLanguage('ko-KR')
    expect(await screen.findByText('가')).toBeInTheDocument()
    expect(screen.queryByText('A')).not.toBeInTheDocument()
  })

  it('ignores an unsupported stored value and falls back to the browser language', async () => {
    localStorage.setItem('lang', 'fr')
    renderWithBrowserLanguage('ko-KR')
    expect(await screen.findByText('가')).toBeInTheDocument()
  })

  it('shows the Korean text when the English text is still empty', async () => {
    localStorage.setItem('lang', 'en')
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('en-US')
    function EmptyEnglishProbe() {
      const { t } = useLang()
      return <p>{t({ ko: '번역 전', en: '' })}</p>
    }
    render(
      <LanguageProvider>
        <EmptyEnglishProbe />
      </LanguageProvider>,
    )
    expect(await screen.findByText('번역 전')).toBeInTheDocument()
  })

  it('persists a chosen language and updates <html lang>', async () => {
    renderWithBrowserLanguage('ko-KR')
    await userEvent.click(screen.getByRole('button', { name: 'to-en' }))
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(localStorage.getItem('lang')).toBe('en')
    expect(document.documentElement.lang).toBe('en')
  })
})
