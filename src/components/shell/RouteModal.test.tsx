import { describe, expect, it, vi } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/test/render'

const router = vi.hoisted(() => ({ back: vi.fn() }))
vi.mock('next/navigation', () => ({ useRouter: () => router }))

import { RouteModal } from './RouteModal'

function renderModal() {
  router.back.mockClear()
  return renderWithProviders(
    <RouteModal label={{ ko: 'SkillPilot', en: 'SkillPilot' }}>
      <p>본문</p>
    </RouteModal>,
  )
}

describe('RouteModal', () => {
  it('shows its content in a labelled modal dialog', () => {
    renderModal()
    const dialog = screen.getByRole('dialog', { name: 'SkillPilot' })
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveTextContent('본문')
  })

  it('goes back (closing the popup) from the close button', async () => {
    renderModal()
    await userEvent.click(screen.getByRole('button', { name: '닫기' }))
    expect(router.back).toHaveBeenCalledTimes(1)
  })

  it('goes back on Escape', async () => {
    renderModal()
    await userEvent.keyboard('{Escape}')
    expect(router.back).toHaveBeenCalledTimes(1)
  })

  it('goes back when the dimmed backdrop is clicked, but not when the content is', () => {
    renderModal()
    fireEvent.click(screen.getByText('본문'))
    expect(router.back).not.toHaveBeenCalled()
    fireEvent.click(screen.getByTestId('modal-backdrop'))
    expect(router.back).toHaveBeenCalledTimes(1)
  })

  it('focuses the close button without scrolling the popup (so a #card target stays in view)', () => {
    const focus = vi.spyOn(HTMLElement.prototype, 'focus')
    renderModal()
    expect(focus).toHaveBeenCalledWith({ preventScroll: true })
    focus.mockRestore()
  })

  it('makes the page behind inert while open, and gives focus back on close', () => {
    const behind = document.createElement('main')
    const card = document.createElement('a')
    card.href = '/journey/2025'
    behind.appendChild(card)
    document.body.appendChild(behind)
    card.focus()

    const { unmount } = renderModal()
    expect(behind).toHaveAttribute('inert')
    expect(screen.getByRole('dialog').closest('[inert]')).toBeNull()

    unmount()
    expect(behind).not.toHaveAttribute('inert')
    expect(document.activeElement).toBe(card)
    behind.remove()
  })

  it('stops the page behind from scrolling while open', () => {
    const { unmount } = renderModal()
    expect(document.body.style.overflow).toBe('hidden')
    unmount()
    expect(document.body.style.overflow).toBe('')
  })
})
