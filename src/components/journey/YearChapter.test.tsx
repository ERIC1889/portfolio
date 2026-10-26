import { afterEach, describe, expect, it, vi } from 'vitest'
import { screen, within } from '@testing-library/react'
import { renderWithProviders } from '@/test/render'
import { FIXTURE_CHAPTERS, FIXTURE_PROJECTS } from '@/test/fixtures'
import { YearChapter } from './YearChapter'

const chapter = FIXTURE_CHAPTERS[0]
const featured = FIXTURE_PROJECTS.filter((p) => p.slug === 'pitches')
const cards = FIXTURE_PROJECTS.filter((p) => p.slug === 'media-pulse')
const lines = FIXTURE_PROJECTS.filter((p) => p.slug === 'patentry')

function renderChapter() {
  return renderWithProviders(
    <YearChapter chapter={chapter} years={[2023, 2024, 2025, 2026]} featured={featured} cards={cards} lines={lines} />,
  )
}

describe('YearChapter', () => {
  it('starts with a year switcher that marks the current year and links the others', () => {
    renderChapter()
    const switcher = screen.getByRole('navigation', { name: '연도' })
    expect(within(switcher).getByText('2023')).toHaveAttribute('aria-current', 'page')
    expect(within(switcher).queryByRole('link', { name: '2023' })).not.toBeInTheDocument()
    expect(
      within(switcher)
        .getAllByRole('link')
        .map((a) => a.getAttribute('href')),
    ).toEqual(['/journey/2024', '/journey/2025', '/journey/2026'])
  })

  it('prints every paragraph of the reflection', () => {
    renderChapter()
    const essay = screen.getByRole('article')
    expect(within(essay).getAllByText(/문단/)).toHaveLength(3)
    expect(essay.querySelectorAll('p')).toHaveLength(3)
  })

  it('anchors each card at its slug so the throughline can link to it', () => {
    const { container } = renderChapter()
    const card = container.querySelector('#media-pulse')
    expect(card).not.toBeNull()
    expect(card).toHaveTextContent('Media Pulse')
    expect(card).toHaveTextContent('기준점으로 엮었다')
  })

  it('links featured projects to their case page', () => {
    renderChapter()
    expect(screen.getByRole('link', { name: /Pitches/ })).toHaveAttribute('href', '/projects/pitches')
  })

  it('reads in order: reflection, featured, cards, then one-liners', () => {
    renderChapter()
    const order = [
      screen.getByRole('article'),
      screen.getByRole('link', { name: /Pitches/ }),
      screen.getByText('Media Pulse'),
      screen.getByText('Patentry'),
    ]
    for (let i = 1; i < order.length; i++) {
      expect(order[i - 1].compareDocumentPosition(order[i]) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    }
  })
})

describe('YearChapter in a popup', () => {
  afterEach(() => {
    window.location.hash = ''
    // @ts-expect-error -- jsdom has no scrollIntoView; remove the test stand-in
    delete Element.prototype.scrollIntoView
  })

  it('drops the home link and the page landmark', () => {
    renderWithProviders(
      <YearChapter variant="modal" chapter={chapter} years={[2023, 2024, 2025, 2026]} featured={featured} cards={cards} lines={lines} />,
    )
    expect(screen.queryByRole('main')).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: '홈' })).not.toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: '연도' })).toBeInTheDocument()
  })

  it('scrolls to the project named in the address', () => {
    window.location.hash = '#media-pulse'
    const scrollIntoView = vi.fn()
    Element.prototype.scrollIntoView = scrollIntoView
    renderWithProviders(
      <YearChapter variant="modal" chapter={chapter} years={[2023, 2024, 2025, 2026]} featured={featured} cards={cards} lines={lines} />,
    )
    expect(scrollIntoView).toHaveBeenCalledTimes(1)
    expect(scrollIntoView.mock.contexts[0]).toBe(document.getElementById('media-pulse'))
  })
})
