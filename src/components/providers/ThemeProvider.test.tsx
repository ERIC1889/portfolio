import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider, useTheme } from './ThemeProvider'

function Probe() {
  const { theme, toggleTheme } = useTheme()
  return <button onClick={toggleTheme}>{theme}</button>
}

function renderProbe() {
  return render(
    <ThemeProvider>
      <Probe />
    </ThemeProvider>,
  )
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    document.documentElement.dataset.theme = 'dark'
  })

  it('starts from the theme the init script already applied', async () => {
    document.documentElement.dataset.theme = 'light'
    renderProbe()
    expect(await screen.findByRole('button', { name: 'light' })).toBeInTheDocument()
  })

  it('toggles dark → light, updates <html data-theme> and persists it', async () => {
    renderProbe()
    await userEvent.click(screen.getByRole('button', { name: 'dark' }))
    expect(screen.getByRole('button', { name: 'light' })).toBeInTheDocument()
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('toggles back to dark on a second click', async () => {
    renderProbe()
    const button = screen.getByRole('button')
    await userEvent.click(button)
    await userEvent.click(button)
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
  })
})
