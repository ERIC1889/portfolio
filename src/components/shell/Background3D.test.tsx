import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'

vi.mock('@/lib/useIsMobile', () => ({ useIsMobile: vi.fn() }))
vi.mock('next/navigation', () => ({ usePathname: vi.fn() }))
// WebGL is not available in jsdom; the canvas module is replaced, and only what Background3D hands it is checked.
const sceneCanvas = vi.hoisted(() => vi.fn((_props: { showHero: boolean }) => null))
vi.mock('@/components/three/SceneCanvas', () => ({ default: sceneCanvas }))

import { usePathname } from 'next/navigation'
import { useIsMobile } from '@/lib/useIsMobile'
import { Background3D } from './Background3D'

describe('Background3D', () => {
  it('renders nothing on mobile so the 3D scene never loads there', () => {
    vi.mocked(useIsMobile).mockReturnValue(true)
    vi.mocked(usePathname).mockReturnValue('/')
    const { container } = render(<Background3D />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders a fixed, click-through layer behind the page on desktop', async () => {
    vi.mocked(useIsMobile).mockReturnValue(false)
    vi.mocked(usePathname).mockReturnValue('/')
    render(<Background3D />)
    const layer = await screen.findByTestId('background-3d')
    expect(layer).toHaveStyle({ position: 'fixed', pointerEvents: 'none', zIndex: '0' })
  })

  it('shows the large glass object only on the home page, where the hero leaves room for it', async () => {
    vi.mocked(useIsMobile).mockReturnValue(false)
    vi.mocked(usePathname).mockReturnValue('/')
    const { unmount } = render(<Background3D />)
    await waitFor(() => expect(sceneCanvas.mock.calls.at(-1)?.[0]).toEqual({ showHero: true }))
    unmount()

    vi.mocked(usePathname).mockReturnValue('/projects/pitches')
    render(<Background3D />)
    await waitFor(() => expect(sceneCanvas.mock.calls.at(-1)?.[0]).toEqual({ showHero: false }))
  })
})
