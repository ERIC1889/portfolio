import { describe, expect, it } from 'vitest'
import { screen, within } from '@testing-library/react'
import { renderWithProviders } from '@/test/render'
import { featuredProject, l } from '@/test/fixtures'
import { CaseStudy } from './CaseStudy'

describe('CaseStudy links', () => {
  it('lists the project links inside the evidence section instead of a separate block', () => {
    const project = featuredProject('skillpilot', 'SkillPilot', [2025], {
      links: [{ label: l('GitHub 저장소'), href: 'https://github.com/Hanshin-OSS-Hub/capstone25-skillpilot' }],
    })
    renderWithProviders(<CaseStudy project={project} />)
    const evidence = screen.getByRole('heading', { name: 'evidence 제목' }).closest('section')
    expect(evidence).not.toBeNull()
    expect(within(evidence as HTMLElement).getByRole('link', { name: '→ GitHub 저장소' })).toHaveAttribute(
      'href',
      'https://github.com/Hanshin-OSS-Hub/capstone25-skillpilot',
    )
    expect(screen.queryByRole('heading', { name: '링크' })).not.toBeInTheDocument()
  })
})

describe('CaseStudy image', () => {
  it('captions the image when the project says what it shows', () => {
    const project = featuredProject('pitches', 'Pitches', [2024, 2026], {
      image: '/images/projects/pitches.png',
      imageCaption: l('대회 제출 당시의 화면 디자인 목업'),
    })
    renderWithProviders(<CaseStudy project={project} />)
    const figure = screen.getByRole('figure')
    expect(figure).toContainElement(screen.getByRole('img', { name: 'Pitches' }))
    expect(figure).toHaveTextContent('대회 제출 당시의 화면 디자인 목업')
  })

  it('shows the image without a caption when none is given', () => {
    const project = featuredProject('skillpilot', 'SkillPilot', [2025], { image: '/images/projects/skillpilot.png' })
    renderWithProviders(<CaseStudy project={project} />)
    expect(screen.getByRole('img', { name: 'SkillPilot' })).toBeInTheDocument()
    expect(screen.queryByRole('figure')?.querySelector('figcaption')).toBeFalsy()
  })
})

describe('CaseStudy in a popup', () => {
  it('drops the page chrome but keeps previous and next', () => {
    const project = featuredProject('skillpilot', 'SkillPilot', [2025])
    renderWithProviders(
      <CaseStudy
        project={project}
        variant="modal"
        prev={{ slug: 'closetmate', name: l('ClosetMate') }}
        next={{ slug: 'pitches', name: l('Pitches') }}
      />,
    )
    expect(screen.queryByRole('main')).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: '사례 목록' })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: '← ClosetMate' })).toHaveAttribute('href', '/projects/closetmate')
    expect(screen.getByRole('link', { name: 'Pitches →' })).toHaveAttribute('href', '/projects/pitches')
  })
})
