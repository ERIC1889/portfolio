import { describe, expect, it } from 'vitest'
import { screen, within } from '@testing-library/react'
import { renderWithProviders } from '@/test/render'
import { l } from '@/test/fixtures'
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
        prev={{ href: '/projects/finz', label: l('Finz') }}
        center={{ href: '/#projects', label: l('프로젝트 목록') }}
        next={{ href: '/projects/closetmate', label: l('ClosetMate') }}
      />,
    )
    expect(linksIn()).toEqual([
      ['/projects/finz', '← Finz'],
      ['/#projects', '프로젝트 목록'],
      ['/projects/closetmate', 'ClosetMate →'],
    ])
  })

  it('keeps the center link when there is no previous or next page', () => {
    renderWithProviders(<PageNav center={{ href: '/', label: l('홈') }} />)
    expect(linksIn()).toEqual([['/', '홈']])
  })
})
