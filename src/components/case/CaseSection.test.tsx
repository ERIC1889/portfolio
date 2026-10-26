import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/test/render'
import { l } from '@/test/fixtures'
import { CaseSection } from './CaseSection'

const base = {
  id: 'implementation' as const,
  title: l('구현'),
  body: [l('첫 문단'), l('둘째 문단')],
}

describe('CaseSection', () => {
  it('marks a held section so it is obvious in previews', () => {
    renderWithProviders(<CaseSection section={{ ...base, hold: true, holdKey: 'finz' }} hunk="수지하우스" />)
    expect(screen.getByText('공개 보류')).toBeInTheDocument()
  })

  it('has no hold badge for a normal section', () => {
    renderWithProviders(<CaseSection section={base} hunk="수지하우스" />)
    expect(screen.queryByText('공개 보류')).not.toBeInTheDocument()
  })

  it('renders each body paragraph and each scene as a diff block', () => {
    const section = { ...base, scenes: [{ minus: l('API가 느리다'), plus: l('캐시를 뒀다') }] }
    renderWithProviders(<CaseSection section={section} hunk="수지하우스" />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('구현')
    expect(screen.getByText('첫 문단')).toBeInTheDocument()
    expect(screen.getByText('둘째 문단')).toBeInTheDocument()
    expect(screen.getByText('@@ 수지하우스 @@')).toBeInTheDocument()
    expect(screen.getByText('캐시를 뒀다')).toBeInTheDocument()
  })
})
