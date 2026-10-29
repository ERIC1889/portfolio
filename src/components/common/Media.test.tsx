import { describe, expect, it } from 'vitest'
import { screen, within } from '@testing-library/react'
import { renderWithProviders } from '@/test/render'
import { l } from '@/test/fixtures'
import type { Media } from '@/content/types'
import { Gallery, MediaFigure } from './Media'

const shot = (src: string, width: number, height: number, extra: Partial<Media> = {}): Media => ({
  kind: 'screenshot',
  src,
  width,
  height,
  alt: l(`${src} 화면`),
  caption: l(`${src} 설명`),
  capturedAt: '2026-10-29',
  ...extra,
})

describe('MediaFigure', () => {
  it('plays a video only on request, showing its poster first', () => {
    const video = shot('/media/a/demo.mp4', 1280, 720, { kind: 'video', poster: '/media/a/poster.webp', alt: l('시연 영상') })
    const { container } = renderWithProviders(<MediaFigure media={video} sizes="100vw" />)
    const element = container.querySelector('video') as HTMLVideoElement
    expect(element).toHaveAttribute('controls')
    expect(element).toHaveAttribute('preload', 'none')
    expect(element).toHaveAttribute('poster', '/media/a/poster.webp')
    expect(element).toHaveAttribute('aria-label', '시연 영상')
    expect(element.querySelector('source')).toHaveAttribute('src', '/media/a/demo.mp4')
  })

  it('opens a screenshot at full size in a new tab instead of a popup', () => {
    renderWithProviders(<MediaFigure media={shot('/media/a/one.webp', 1600, 900)} sizes="100vw" />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/media/a/one.webp')
    expect(link).toHaveAttribute('target', '_blank')
    expect(within(link).getByRole('img', { name: '/media/a/one.webp 화면' })).toBeInTheDocument()
    expect(screen.getByRole('figure')).toHaveTextContent('/media/a/one.webp 설명')
    expect(screen.getByRole('figure')).not.toHaveTextContent('촬영')
  })

  it('labels a mockup on the picture itself', () => {
    renderWithProviders(<MediaFigure media={shot('/a.png', 752, 339, { kind: 'mockup' })} sizes="100vw" />)
    expect(screen.getByText('목업')).toBeInTheDocument()
  })
})

describe('Gallery', () => {
  it('shows a landscape first item large and sorts the rest by shape', () => {
    const { container } = renderWithProviders(
      <Gallery media={[shot('/lead.webp', 1600, 900), shot('/wide.webp', 1600, 900), shot('/tall.webp', 700, 1500), shot('/wide2.webp', 1200, 800)]} />,
    )
    const gallery = container.querySelector('.gallery') as HTMLElement
    const srcOf = (figure: Element) => figure.querySelector('a')?.getAttribute('href')
    expect(srcOf(gallery.children[0])).toBe('/lead.webp')
    expect([...gallery.querySelectorAll('.gallery-wide > figure')].map(srcOf)).toEqual(['/wide.webp', '/wide2.webp'])
    expect([...gallery.querySelectorAll('.gallery-tall > figure')].map(srcOf)).toEqual(['/tall.webp'])
  })

  it('keeps a phone app together in the portrait grid', () => {
    const { container } = renderWithProviders(<Gallery media={[shot('/p1.webp', 560, 900, { shape: 'phone' }), shot('/p2.webp', 560, 900, { shape: 'phone' })]} />)
    expect(container.querySelectorAll('.gallery-tall > figure')).toHaveLength(2)
    expect(container.querySelectorAll('.media-phone')).toHaveLength(2)
  })
})
