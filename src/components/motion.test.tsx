import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TiltCard } from './motion'

describe('TiltCard', () => {
  it('passes clicks to its handler', async () => {
    const onClick = vi.fn()
    render(
      <TiltCard className="card" onClick={onClick}>
        카드
      </TiltCard>,
    )
    await userEvent.click(screen.getByText('카드'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('tilts in 3D by default', () => {
    render(<TiltCard className="card">카드</TiltCard>)
    expect(screen.getByText('카드')).toHaveStyle({ transformStyle: 'preserve-3d' })
  })

  it('stays flat when tilt is disabled (touch devices)', () => {
    render(
      <TiltCard className="card" disableTilt>
        카드
      </TiltCard>,
    )
    expect(screen.getByText('카드')).not.toHaveStyle({ transformStyle: 'preserve-3d' })
  })
})
