import { beforeEach, describe, expect, it } from 'vitest'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/test/render'
import { Nav } from './Nav'

const menuLinks = (name = '주 메뉴') =>
  within(screen.getByRole('navigation', { name }))
    .getAllByRole('link')
    .map((a) => [a.textContent, a.getAttribute('href')])

describe('Nav', () => {
  beforeEach(() => {
    document.documentElement.dataset.theme = 'light'
  })

  it('shows the name as the home link and four direct links, no dropdowns', () => {
    renderWithProviders(<Nav />)
    expect(screen.getByRole('link', { name: '허준영' })).toHaveAttribute('href', '/')
    expect(menuLinks()).toEqual([
      ['프로젝트', '/#projects'],
      ['기술', '/#skills'],
      ['경험', '/#experience'],
      ['이력서', '/resume'],
    ])
    expect(screen.queryByRole('button', { expanded: false })).toBeNull()
  })

  it('offers a skip link to the main content', () => {
    renderWithProviders(<Nav />)
    expect(screen.getByRole('link', { name: '본문으로 건너뛰기' })).toHaveAttribute('href', '#main')
  })

  it('switches the language and the menu follows', async () => {
    renderWithProviders(<Nav />)
    await userEvent.click(screen.getByRole('button', { name: 'Switch to English' }))
    expect(menuLinks('Main menu').map(([label]) => label)).toEqual(['Projects', 'Skills', 'Experience', 'Résumé'])
    expect(screen.getByRole('link', { name: 'Heo Jun Young' })).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('en')
  })

  it('switches between the light default and dark, naming what the button will do', async () => {
    renderWithProviders(<Nav />)
    await userEvent.click(screen.getByRole('button', { name: '어두운 화면으로 전환' }))
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(screen.getByRole('button', { name: '밝은 화면으로 전환' })).toBeInTheDocument()
  })
})
