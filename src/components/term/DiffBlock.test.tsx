import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/test/render'
import { DiffBlock } from './DiffBlock'

const scene = {
  minus: { ko: '공공 API가 XML을 보낸다', en: 'The public API sends XML' },
  plus: { ko: 'XML로 다시 해석한다', en: 'Re-parse it as XML' },
}

function lineText(text: string) {
  return screen.getByText(text).closest('p')?.textContent?.replace(/\s+/g, ' ').trim()
}

describe('DiffBlock', () => {
  it('shows the hunk header and one removed and one added line', () => {
    renderWithProviders(<DiffBlock hunk="2025 SkillPilot" scene={scene} />)
    expect(screen.getByText('@@ 2025 SkillPilot @@')).toBeInTheDocument()
    expect(lineText('공공 API가 XML을 보낸다')).toBe('- 막힌 지점: 공공 API가 XML을 보낸다')
    expect(lineText('XML로 다시 해석한다')).toBe('+ 내가 한 것: XML로 다시 해석한다')
  })

  it('labels the lines in English for English readers', async () => {
    renderWithProviders(<DiffBlock hunk="2025 SkillPilot" scene={scene} />, 'en-US')
    expect(await screen.findByText('The public API sends XML')).toBeInTheDocument()
    expect(lineText('The public API sends XML')).toBe('- Constraint: The public API sends XML')
    expect(lineText('Re-parse it as XML')).toBe('+ What I did: Re-parse it as XML')
  })

  it('turns the whole block into a link when given an href', () => {
    renderWithProviders(<DiffBlock hunk="2025 SkillPilot" scene={scene} href="/projects/skillpilot" />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/projects/skillpilot')
    expect(link).toHaveTextContent('@@ 2025 SkillPilot @@')
  })

  it('is not a link without an href', () => {
    renderWithProviders(<DiffBlock hunk="2025 SkillPilot" scene={scene} />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
