import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { LanguageProvider } from '@/components/providers/LanguageProvider'
import type { Year } from '@/content/types'
import { Nav } from './Nav'

const YEARS: Year[] = [2023, 2024, 2025, 2026]
const CASES = [
  { slug: 'suzihouse', name: { ko: '수지하우스', en: 'SuziHouse' } },
  { slug: 'closetmate', name: { ko: 'ClosetMate', en: 'ClosetMate' } },
  { slug: 'skillpilot', name: { ko: 'SkillPilot', en: 'SkillPilot' } },
  { slug: 'pitches', name: { ko: 'Pitches', en: 'Pitches' } },
]
const JOURNEY_HREFS = ['/#journey', '/journey/2023', '/journey/2024', '/journey/2025', '/journey/2026']
const CASE_HREFS = ['/#cases', '/projects/suzihouse', '/projects/closetmate', '/projects/skillpilot', '/projects/pitches']

function renderNav() {
  vi.spyOn(navigator, 'language', 'get').mockReturnValue('ko-KR')
  return render(
    <ThemeProvider>
      <LanguageProvider>
        <Nav years={YEARS} cases={CASES} />
      </LanguageProvider>
    </ThemeProvider>,
  )
}

const hrefs = (container: HTMLElement) =>
  within(container)
    .getAllByRole('link')
    .map((a) => a.getAttribute('href'))

describe('Nav', () => {
  beforeEach(() => {
    document.documentElement.dataset.theme = 'dark'
  })

  afterEach(() => {
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true })
  })

  it('opens the 4년 menu with the overview and every year', async () => {
    renderNav()
    const trigger = screen.getByRole('button', { name: '4년' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    const menu = screen.getByRole('list', { name: '4년' })
    expect(hrefs(menu)).toEqual(JOURNEY_HREFS)
    expect(within(menu).getByRole('link', { name: '한눈에 보기' })).toHaveAttribute('href', '/#journey')
  })

  it('opens the 사례 menu with the case list and each case by name', async () => {
    renderNav()
    await userEvent.click(screen.getByRole('button', { name: '사례' }))
    const menu = screen.getByRole('list', { name: '사례' })
    expect(hrefs(menu)).toEqual(CASE_HREFS)
    expect(within(menu).getByRole('link', { name: '수지하우스' })).toHaveAttribute('href', '/projects/suzihouse')
  })

  it('keeps one menu open at a time and closes it with Escape', async () => {
    renderNav()
    await userEvent.click(screen.getByRole('button', { name: '4년' }))
    await userEvent.click(screen.getByRole('button', { name: '사례' }))
    expect(screen.queryByRole('list', { name: '4년' })).not.toBeInTheDocument()
    expect(screen.getByRole('list', { name: '사례' })).toBeInTheDocument()
    await userEvent.keyboard('{Escape}')
    expect(screen.queryByRole('list', { name: /4년|사례/ })).not.toBeInTheDocument()
  })

  it('closes the menu once a destination is chosen', async () => {
    renderNav()
    await userEvent.click(screen.getByRole('button', { name: '4년' }))
    await userEvent.click(screen.getByRole('link', { name: '2024' }))
    expect(screen.queryByRole('list', { name: /4년|사례/ })).not.toBeInTheDocument()
  })

  it('links the archive and contact sections directly, and the logo home', () => {
    renderNav()
    expect(screen.getByRole('link', { name: '아카이브' })).toHaveAttribute('href', '/#archive')
    expect(screen.getByRole('link', { name: '연락처' })).toHaveAttribute('href', '/#contact')
    expect(screen.getByRole('link', { name: 'JY.DEV' })).toHaveAttribute('href', '/')
  })

  it('switches the labels to English after pressing EN', async () => {
    renderNav()
    expect(await screen.findByRole('button', { name: '4년' })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'EN' }))
    expect(screen.getByRole('button', { name: 'Journey' })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Cases' }))
    expect(screen.getByRole('link', { name: 'SuziHouse' })).toBeInTheDocument()
  })

  it('switches the page theme from the theme button', async () => {
    renderNav()
    await userEvent.click(screen.getByRole('button', { name: '테마 전환' }))
    expect(document.documentElement.dataset.theme).toBe('light')
  })

  it('takes the scrolled style only after scrolling past 50px', () => {
    renderNav()
    const nav = screen.getByRole('navigation')
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 40, configurable: true })
      fireEvent.scroll(window)
    })
    expect(nav).not.toHaveClass('nav-scrolled')
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 60, configurable: true })
      fireEvent.scroll(window)
    })
    expect(nav).toHaveClass('nav-scrolled')
  })

  it('shows the same destinations, grouped, in the mobile menu and closes it once one is chosen', async () => {
    renderNav()
    await userEvent.click(screen.getByRole('button', { name: '메뉴' }))
    const mobile = screen.getByTestId('nav-mobile')
    expect(hrefs(mobile)).toEqual([...JOURNEY_HREFS, ...CASE_HREFS, '/#archive', '/#contact'])
    await userEvent.click(within(mobile).getByRole('link', { name: 'Pitches' }))
    await waitFor(() => expect(screen.queryByTestId('nav-mobile')).not.toBeInTheDocument())
  })
})
