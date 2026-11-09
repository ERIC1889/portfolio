import { describe, expect, it } from 'vitest'
import { screen, within } from '@testing-library/react'
import { renderWithProviders } from '@/test/render'
import { l } from '@/test/fixtures'
import type { Diagram } from '@/content/types'
import { ArchDiagram } from './ArchDiagram'

const diagram: Diagram = {
  columns: [
    {
      title: l('앱', 'App'),
      nodes: [
        {
          id: 'app',
          title: l('모바일 앱', 'Mobile app'),
          subtitle: l('Expo', 'Expo'),
          items: [l('녹음', 'Recording')],
          owner: 'mine',
          links: [
            { to: 'api', label: l('음성 ↑ · 피드백 ↓', 'audio ↑ · feedback ↓'), kind: 'realtime' },
            { to: 'api', label: l('결과 조회', 'results'), kind: 'sync' },
          ],
        },
      ],
    },
    {
      title: l('서버', 'Server'),
      nodes: [
        { id: 'api', title: l('API 서버', 'API server'), owner: 'mine', links: [{ to: 'openai', label: l('부분 전사', 'partial transcript'), kind: 'paid' }] },
        { id: 'db', title: l('PostgreSQL', 'PostgreSQL'), owner: 'data' },
      ],
    },
    { title: l('외부', 'External'), nodes: [{ id: 'openai', title: l('OpenAI', 'OpenAI'), owner: 'external' }] },
  ],
  legend: [
    { kind: 'realtime', label: l('실시간 WebSocket', 'Real-time WebSocket') },
    { kind: 'paid', label: l('유료 API', 'Paid API') },
  ],
  caption: l('2026 리뉴얼 기준 구조', 'Structure of the 2026 renewal'),
}

describe('ArchDiagram', () => {
  it('draws each column as a titled group of boxes, each marked as mine, external or storage', () => {
    renderWithProviders(<ArchDiagram diagram={diagram} />)
    expect(screen.getAllByRole('region').map((region) => region.getAttribute('aria-label'))).toEqual(['앱', '서버', '외부'])
    const boxes = [...document.querySelectorAll('.arch-node')]
    expect(boxes.map((box) => box.querySelector('.arch-node-title')?.textContent)).toEqual(['모바일 앱', 'API 서버', 'PostgreSQL', 'OpenAI'])
    expect(boxes.map((box) => box.querySelector('.arch-owner')?.textContent)).toEqual(['내 부분', '내 부분', '저장', '외부'])
    expect(boxes[0]).toHaveTextContent('Expo')
    expect(boxes[0]).toHaveTextContent('녹음')
  })

  it('names the target box and the label on every connection, coloured by kind', () => {
    renderWithProviders(<ArchDiagram diagram={diagram} />)
    const app = document.querySelector('.arch-node') as HTMLElement
    const links = [...app.querySelectorAll('.arch-link')]
    expect(links.map((link) => link.textContent)).toEqual(['→API 서버음성 ↑ · 피드백 ↓', '→API 서버결과 조회'])
    expect(links.map((link) => link.className)).toEqual(['arch-link is-realtime', 'arch-link is-sync'])
  })

  it('shows the legend and the caption', () => {
    renderWithProviders(<ArchDiagram diagram={diagram} />)
    const legend = screen.getByRole('list', { name: '범례' })
    expect(within(legend).getAllByRole('listitem').map((li) => li.textContent)).toEqual(['실시간 WebSocket', '유료 API'])
    expect(screen.getByRole('figure')).toHaveTextContent('2026 리뉴얼 기준 구조')
  })

  it('switches every label to English', async () => {
    renderWithProviders(<ArchDiagram diagram={diagram} />, 'en-US')
    expect(await screen.findByText('Mobile app')).toBeInTheDocument()
    expect(screen.getAllByRole('region').map((region) => region.getAttribute('aria-label'))).toEqual(['App', 'Server', 'External'])
    expect(document.querySelector('.arch-owner')).toHaveTextContent('Mine')
  })
})
