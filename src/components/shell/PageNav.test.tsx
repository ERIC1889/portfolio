import { describe, expect, it } from 'vitest'
import { screen, within } from '@testing-library/react'
import { renderWithProviders } from '@/test/render'
import { PageNav } from './PageNav'

function linksIn() {
  return within(screen.getByRole('navigation', { name: '페이지 이동' }))
    .getAllByRole('link')
    .map((a) => [a.getAttribute('href'), a.textContent?.trim()])
}

describe('PageNav', () => {
  it('reads previous · center · next from left to right', () => {
    renderWithProviders(
      <PageNav
        prev={{ href: '/projects/skillpilot', label: 'SkillPilot' }}
        center={{ href: '/#cases', label: { ko: '사례 목록', en: 'All cases' } }}
        next={{ href: '/projects/pitches', label: 'Pitches' }}
      />,
    )
    expect(linksIn()).toEqual([
      ['/projects/skillpilot', '← SkillPilot'],
      ['/#cases', '사례 목록'],
      ['/projects/pitches', 'Pitches →'],
    ])
  })

  it('keeps the center link when there is no previous or next page', () => {
    renderWithProviders(<PageNav center={{ href: '/', label: { ko: '홈', en: 'Home' } }} />)
    expect(linksIn()).toEqual([['/', '홈']])
  })
})
