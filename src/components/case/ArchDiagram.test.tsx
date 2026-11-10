import { describe, expect, it } from 'vitest'
import { screen, within } from '@testing-library/react'
import { renderWithProviders } from '@/test/render'
import { l } from '@/test/fixtures'
import type { Diagram } from '@/content/types'
import { ArchDiagram, layoutLinks, type Box } from './ArchDiagram'

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
          icon: 'phone',
          links: [
            { to: 'api', label: l('음성 ↑ · 피드백 ↓', 'audio ↑ · feedback ↓'), kind: 'realtime' },
            { to: 'api', label: l('결과 조회', 'results'), kind: 'sync' },
          ],
        },
      ],
    },
    {
      title: l('서버', 'Server'),
      nodes: [{ id: 'api', title: l('API 서버', 'API server'), owner: 'mine', icon: 'server', links: [{ to: 'openai', label: l('부분 전사', 'partial transcript'), kind: 'paid' }, { to: 'db', label: l('세션', 'sessions') }] }],
    },
    { title: l('외부', 'External'), nodes: [{ id: 'openai', title: l('OpenAI', 'OpenAI'), owner: 'external', icon: 'sparkles' }] },
  ],
  footer: { title: l('데이터', 'Data'), icon: 'database', nodes: [{ id: 'db', title: l('PostgreSQL', 'PostgreSQL'), owner: 'data', icon: 'database', subtitle: l('세션 · 보고서', 'sessions · reports') }] },
  legend: [
    { kind: 'sync', label: l('요청 · 응답', 'Request · response') },
    { kind: 'realtime', label: l('실시간 WebSocket', 'Real-time WebSocket') },
    { kind: 'paid', label: l('유료 API', 'Paid API') },
  ],
  caption: l('2026 리뉴얼 기준 구조', 'Structure of the 2026 renewal'),
}

describe('ArchDiagram', () => {
  it('draws each column and the footer band as a titled group of cards, coloured by owner', () => {
    renderWithProviders(<ArchDiagram diagram={diagram} />)
    expect(screen.getAllByRole('region').map((region) => region.getAttribute('aria-label'))).toEqual(['앱', '서버', '외부', '데이터'])
    const boxes = [...document.querySelectorAll('.arch-node')]
    expect(boxes.map((box) => box.querySelector('.arch-node-title')?.textContent)).toEqual(['모바일 앱', 'API 서버', 'OpenAI', 'PostgreSQL'])
    expect(boxes.map((box) => box.className)).toEqual(['arch-node is-mine', 'arch-node is-mine', 'arch-node is-external', 'arch-node is-data'])
    expect(boxes[0].querySelector('.arch-icon svg')).not.toBeNull()
    expect(boxes[0]).toHaveTextContent('Expo')
    expect(boxes[0]).toHaveTextContent('녹음')
    expect(boxes[3]).toHaveTextContent('세션 · 보고서')
  })

  it('draws one connector and one label pill per link, coloured by kind, with a two-headed arrow for real-time links', () => {
    renderWithProviders(<ArchDiagram diagram={diagram} />)
    const lines = [...document.querySelectorAll('.arch-lines path.arch-line')]
    expect(lines).toHaveLength(4)
    expect(lines.map((line) => line.getAttribute('class'))).toEqual(['arch-line is-realtime', 'arch-line is-sync', 'arch-line is-paid', 'arch-line is-sync'])
    expect(lines[0].getAttribute('marker-start')).toMatch(/^url\(#.+-realtime\)$/)
    expect(lines[1].getAttribute('marker-start')).toBeNull()
    expect(lines.every((line) => line.getAttribute('marker-end')?.startsWith('url(#'))).toBe(true)
    expect(document.querySelectorAll('.arch-lines marker')).toHaveLength(5)
    const pills = [...document.querySelectorAll('.arch-pill')]
    expect(pills.map((pill) => pill.textContent)).toEqual(['음성 ↑ · 피드백 ↓', '결과 조회', '부분 전사', '세션'])
    expect(pills.map((pill) => pill.className)).toEqual(['arch-pill is-realtime is-above', 'arch-pill is-sync is-above', 'arch-pill is-paid is-above', 'arch-pill is-sync is-side'])
  })

  it('keeps the connections readable as text chips inside the cards for narrow screens', () => {
    renderWithProviders(<ArchDiagram diagram={diagram} />)
    const app = document.querySelector('.arch-node') as HTMLElement
    const chips = [...app.querySelectorAll('.arch-link')]
    expect(chips.map((chip) => chip.textContent)).toEqual(['→API 서버음성 ↑ · 피드백 ↓', '→API 서버결과 조회'])
    expect(chips.map((chip) => chip.className)).toEqual(['arch-link is-realtime', 'arch-link is-sync'])
  })

  it('shows the legend and the caption', () => {
    renderWithProviders(<ArchDiagram diagram={diagram} />)
    const legend = screen.getByRole('list', { name: '범례' })
    expect(within(legend).getAllByRole('listitem').map((li) => li.textContent)).toEqual(['요청 · 응답', '실시간 WebSocket', '유료 API'])
    expect(screen.getByRole('figure')).toHaveTextContent('2026 리뉴얼 기준 구조')
  })

  it('switches every label to English', async () => {
    renderWithProviders(<ArchDiagram diagram={diagram} />, 'en-US')
    expect(await screen.findByText('Mobile app')).toBeInTheDocument()
    expect(screen.getAllByRole('region').map((region) => region.getAttribute('aria-label'))).toEqual(['App', 'Server', 'External', 'Data'])
    expect([...document.querySelectorAll('.arch-pill')].map((pill) => pill.textContent)).toEqual(['audio ↑ · feedback ↓', 'results', 'partial transcript', 'sessions'])
  })
})

const boxes = (entries: Record<string, [number, number, number, number]>) => new Map<string, Box>(Object.entries(entries).map(([id, [left, top, right, bottom]]) => [id, { left, top, right, bottom }]))
const card = (id: string, links?: { to: string; label?: string; kind?: 'sync' | 'async' | 'local' }[]) => ({
  id,
  title: l(id, id),
  owner: 'mine' as const,
  links: links?.map((link) => ({ to: link.to, label: l(link.label ?? link.to, link.label ?? link.to), kind: link.kind })),
})
const withFooter = (columns: ReturnType<typeof card>[][], footer: ReturnType<typeof card>[]): Diagram => ({
  columns: columns.map((nodes, i) => ({ title: l(`열 ${i}`, `Column ${i}`), nodes })),
  footer: { title: l('데이터', 'Data'), nodes: footer },
  caption: l('구조', 'Structure'),
})

describe('layoutLinks', () => {
  it('drops a footer link straight down when nothing is in the way, with its label beside the line', () => {
    const { drawn, levels } = layoutLinks(withFooter([[card('a', [{ to: 'f', label: '세션' }])]], [card('f')]), boxes({ a: [0, 0, 100, 100], f: [0, 320, 100, 400] }))
    expect(drawn.map((line) => line.d)).toEqual(['M50 100 L50 320'])
    expect(drawn[0]).toMatchObject({ side: true, x: 50, y: 196 })
    expect(levels).toBe(0)
  })

  it('routes a footer link around a lower card in its column instead of behind it', () => {
    const diagram = withFooter([[card('a')], [card('b1', [{ to: 'f', label: '세션' }]), card('b2')]], [card('f')])
    const { drawn, levels } = layoutLinks(diagram, boxes({ a: [0, 0, 100, 100], b1: [200, 0, 300, 100], b2: [200, 140, 300, 240], f: [0, 320, 100, 400] }))
    expect(drawn.map((line) => line.d)).toEqual(['M200 86 L192 86 L192 292 L50 292 L50 320'])
    expect(drawn[0]).toMatchObject({ side: false, x: 121, y: 292 })
    expect(levels).toBe(0)
  })

  it('bypasses on the far side when the lower card has links on the near side', () => {
    const diagram = withFooter([[card('a')], [card('b1', [{ to: 'f2' }]), card('b2', [{ to: 'c' }])], [card('c')]], [card('f1'), card('f2')])
    const { drawn } = layoutLinks(diagram, boxes({ a: [0, 0, 100, 100], b1: [200, 0, 300, 100], b2: [200, 140, 300, 240], c: [400, 0, 500, 100], f1: [0, 320, 100, 400], f2: [300, 320, 400, 400] }))
    expect(drawn.find((line) => line.key.startsWith('b1-'))?.d).toBe('M200 86 L192 86 L192 292 L350 292 L350 320')
  })

  it('stacks the tracks of footer links so that none runs through another', () => {
    const diagram = withFooter([[card('a')], [card('b')]], [card('f1'), card('f2', [{ to: 'a', label: 'TFLite', kind: 'local' }, { to: 'b', label: 'ONNX', kind: 'local' }])])
    const { drawn, levels } = layoutLinks(diagram, boxes({ a: [0, 0, 100, 100], b: [150, 0, 250, 100], f1: [0, 320, 100, 400], f2: [300, 320, 400, 400] }))
    expect(drawn.map((line) => line.d)).toEqual(['M333.3 320 L333.3 292 L50 292 L50 100', 'M366.7 320 L366.7 262 L200 262 L200 100'])
    expect(drawn.map((line) => line.y)).toEqual([292, 262])
    expect(levels).toBe(1)
  })

  it('keeps neighbouring tracks on different levels so their horizontals never touch', () => {
    const diagram = withFooter([[card('a')], [card('b', [{ to: 'f1', label: '보고서' }, { to: 'f2', label: '작업 큐', kind: 'async' }])]], [card('f1'), card('f2')])
    const { drawn, levels } = layoutLinks(diagram, boxes({ a: [0, 0, 120, 100], b: [200, 0, 320, 100], f1: [0, 320, 100, 400], f2: [200, 320, 300, 400] }))
    expect(drawn.map((line) => line.d)).toEqual(['M240 100 L240 292 L50 292 L50 320', 'M280 100 L280 262 L250 262 L250 320'])
    expect(levels).toBe(1)
  })

  it('accepts an unavoidable crossing instead of stacking tracks without end', () => {
    // b1 bypasses b2 on the left and runs under it to f2, while b2 drops its own link onto f1 right through that track's extent
    const diagram = withFooter([[card('a')], [card('b1', [{ to: 'f2' }]), card('b2', [{ to: 'f1' }, { to: 'c' }])], [card('c')]], [card('f1'), card('f2')])
    const { levels } = layoutLinks(diagram, boxes({ a: [0, 0, 100, 100], b1: [200, 0, 300, 100], b2: [200, 140, 300, 240], c: [400, 0, 500, 100], f1: [150, 320, 350, 400], f2: [360, 320, 460, 400] }))
    expect(levels).toBeLessThanOrEqual(2)
  })
})
