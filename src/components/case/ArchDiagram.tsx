'use client'

import { useCallback, useId, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { useLang } from '@/components/providers/LanguageProvider'
import type { Diagram, DiagramLinkKind, DiagramNode, L } from '@/content/types'
import { ARCH_LABELS } from '@/content/ui'
import { DiagramIcon } from './DiagramIcon'

type Side = 'left' | 'right' | 'top' | 'bottom'
type Pt = { x: number; y: number }
type Placement = { col: number; footer: boolean }
type Link = { key: string; from: string; to: string; kind: DiagramLinkKind; label: L; fromSide: Side; toSide: Side; crossesFooter: boolean }
type Track = { key: string; span: [number, number]; straight: boolean; verticals: { x: number; end: 'col' | 'foot' }[] }
type Geom = { colPt: Pt; gutterPt?: Pt; footPt: Pt; straight: boolean }
export type Box = { left: number; top: number; right: number; bottom: number }
export type Drawn = { key: string; d: string; kind: DiagramLinkKind; label: L; x: number; y: number; side: boolean; twoWay: boolean }
export type Layout = { drawn: Drawn[]; levels: number }

const KINDS: DiagramLinkKind[] = ['sync', 'realtime', 'async', 'paid', 'local']
const NARROW = '(max-width: 760px)'
/** Links between the columns and the footer band run along horizontal tracks above the band: the first one BAND_OFFSET above it, further ones BAND_GAP apart. */
const BAND_OFFSET = 28
const BAND_GAP = 22
/** A footer link that would run behind a lower card in its column leaves its card sideways HOOK above the bottom edge and runs down GUTTER outside the cards; several on one side nest outward. */
const HOOK = 14
const HOOK_STEP = 8
const GUTTER = 8
const GUTTER_STEP = 6

const isHorizontal = (side: Side) => side === 'left' || side === 'right'
const round = (n: number) => Math.round(n * 10) / 10
const pathOf = (points: Pt[]) => points.map((p, i) => `${i === 0 ? 'M' : 'L'}${round(p.x)} ${round(p.y)}`).join(' ')
const allNodes = (diagram: Diagram) => [...diagram.columns.flatMap((column) => column.nodes), ...(diagram.footer?.nodes ?? [])]

function placementOf(diagram: Diagram): Map<string, Placement> {
  const place = new Map<string, Placement>()
  diagram.columns.forEach((column, col) => column.nodes.forEach((node) => place.set(node.id, { col, footer: false })))
  ;(diagram.footer?.nodes ?? []).forEach((node, col) => place.set(node.id, { col, footer: true }))
  return place
}

function sidesOf(a: Placement, b: Placement, boxA: Box, boxB: Box): [Side, Side] {
  if (a.footer && !b.footer) return ['top', 'bottom']
  if (!a.footer && b.footer) return ['bottom', 'top']
  if (a.col < b.col) return ['right', 'left']
  if (a.col > b.col) return ['left', 'right']
  return boxA.top <= boxB.top ? ['bottom', 'top'] : ['top', 'bottom']
}

function edgePoint(box: Box, side: Side, along: number): Pt {
  if (side === 'left') return { x: box.left, y: along }
  if (side === 'right') return { x: box.right, y: along }
  if (side === 'top') return { x: along, y: box.top }
  return { x: along, y: box.bottom }
}

/** Gives every footer track a level (0 = nearest the band) so that no track's vertical runs through another track's horizontal and no two horizontals touch. A constraint that cannot be met together with the earlier ones is dropped: that crossing is unavoidable. */
function solveLevels(tracks: Track[]): Map<string, number> {
  const inside = (x: number, [a, b]: [number, number]) => x > a + 1 && x < b - 1
  const above = new Map<string, Set<string>>(tracks.map((track) => [track.key, new Set<string>()]))
  const reaches = (from: string, to: string): boolean => {
    const seen = new Set<string>()
    const stack = [from]
    while (stack.length > 0) {
      const key = stack.pop()!
      if (key === to) return true
      if (seen.has(key)) continue
      seen.add(key)
      above.get(key)?.forEach((next) => stack.push(next))
    }
    return false
  }
  const require = (upper: Track, lower: Track) => {
    if (upper === lower || reaches(lower.key, upper.key)) return
    above.get(upper.key)!.add(lower.key)
  }
  for (const a of tracks) {
    for (const b of tracks) {
      if (a === b) continue
      for (const v of b.verticals) {
        if (!inside(v.x, a.span)) continue
        // b's column-side vertical has to stop above a's horizontal; b's footer-side vertical has to start below it
        if (v.end === 'col') require(b, a)
        else require(a, b)
      }
    }
  }
  const level = new Map<string, number>()
  const depth = (key: string): number => {
    if (level.has(key)) return level.get(key)!
    level.set(key, 0)
    const d = Math.max(0, ...[...(above.get(key) ?? [])].map((next) => depth(next) + 1))
    level.set(key, d)
    return d
  }
  tracks.forEach((track) => depth(track.key))
  const get = (track: Track) => level.get(track.key) ?? 0
  const near = (a: Track, b: Track) => a.span[0] - 10 <= b.span[1] && b.span[0] - 10 <= a.span[1]
  const length = (track: Track) => track.span[1] - track.span[0]
  for (let pass = 0; pass < 20; pass++) {
    let changed = false
    for (let i = 0; i < tracks.length; i++) {
      for (let j = i + 1; j < tracks.length; j++) {
        const a = tracks[i]
        const b = tracks[j]
        if (a.straight || b.straight || get(a) !== get(b) || !near(a, b)) continue
        const shorter = length(a) < length(b) ? a : b
        level.set(shorter.key, get(shorter) + 1)
        changed = true
      }
    }
    if (!changed) break
    for (let guard = 0, moved = true; moved && guard < 50; guard++) {
      moved = false
      for (const track of tracks) {
        for (const lower of above.get(track.key) ?? []) {
          if (get(track) <= (level.get(lower) ?? 0)) {
            level.set(track.key, (level.get(lower) ?? 0) + 1)
            moved = true
          }
        }
      }
    }
  }
  return level
}

export function layoutLinks(diagram: Diagram, boxes: Map<string, Box>, footerEdge?: number): Layout {
  const place = placementOf(diagram)
  const links: Link[] = allNodes(diagram).flatMap((node) =>
    (node.links ?? []).flatMap((link, i) => {
      const a = place.get(node.id)
      const b = place.get(link.to)
      const boxA = boxes.get(node.id)
      const boxB = boxes.get(link.to)
      if (!a || !b || !boxA || !boxB) return []
      const [fromSide, toSide] = sidesOf(a, b, boxA, boxB)
      return [{ key: `${node.id}-${link.to}-${i}`, from: node.id, to: link.to, kind: link.kind ?? 'sync', label: link.label, fromSide, toSide, crossesFooter: a.footer !== b.footer }]
    }),
  )
  const box = (id: string) => boxes.get(id)!
  const centerX = (b: Box) => (b.left + b.right) / 2
  const center = (b: Box, side: Side) => (isHorizontal(side) ? (b.top + b.bottom) / 2 : centerX(b))
  const fromFooter = (link: Link) => place.get(link.from)!.footer
  const colEnd = (link: Link) => (fromFooter(link) ? link.to : link.from)
  const footEnd = (link: Link) => (fromFooter(link) ? link.from : link.to)

  // A footer link whose column card has cards below it would run behind them, so it bypasses them on the side facing its footer node — or the other side when those cards have links there
  const bypass = new Map<string, Side>()
  for (const link of links) {
    if (!link.crossesFooter) continue
    const colId = colEnd(link)
    const lower = diagram.columns[place.get(colId)!.col].nodes.filter((n) => n.id !== colId && (boxes.get(n.id)?.top ?? -Infinity) > box(colId).bottom).map((n) => n.id)
    if (lower.length === 0) continue
    const busy = new Set(links.filter((l) => !l.crossesFooter && isHorizontal(l.fromSide)).flatMap((l) => [lower.includes(l.from) ? l.fromSide : null, lower.includes(l.to) ? l.toSide : null]))
    const toward: Side = centerX(box(footEnd(link))) < centerX(box(colId)) ? 'left' : 'right'
    const other: Side = toward === 'left' ? 'right' : 'left'
    bypass.set(link.key, busy.has(toward) && !busy.has(other) ? other : toward)
  }

  // Links sharing a card edge are spread evenly along it, ordered by where their other end is
  const slots = new Map<string, { id: string; other: number }[]>()
  const addSlot = (slot: string, id: string, other: number) => slots.set(slot, [...(slots.get(slot) ?? []), { id, other }])
  for (const link of links) {
    const gutter = bypass.get(link.key)
    if (!(gutter && !fromFooter(link))) addSlot(`${link.from}:${link.fromSide}`, `${link.key}:from`, center(box(link.to), link.toSide))
    if (!(gutter && fromFooter(link))) addSlot(`${link.to}:${link.toSide}`, `${link.key}:to`, center(box(link.from), link.fromSide))
  }
  const along = new Map<string, number>()
  for (const [slot, items] of slots) {
    const [id, side] = slot.split(':') as [string, Side]
    const b = box(id)
    const [start, end] = isHorizontal(side) ? [b.top, b.bottom] : [b.left, b.right]
    items.sort((p, q) => p.other - q.other)
    items.forEach((item, i) => along.set(item.id, start + ((end - start) * (i + 1)) / (items.length + 1)))
  }
  const endPoint = (link: Link, end: 'from' | 'to') => edgePoint(box(link[end]), end === 'from' ? link.fromSide : link.toSide, along.get(`${link.key}:${end}`)!)

  // Bypass lines on one side of a card nest outward: first the ones that run under the card, then the rest by distance
  const gutterIndex = new Map<string, number>()
  const groups = new Map<string, Link[]>()
  for (const link of links) {
    const side = bypass.get(link.key)
    if (side) groups.set(`${colEnd(link)}:${side}`, [...(groups.get(`${colEnd(link)}:${side}`) ?? []), link])
  }
  for (const [slot, group] of groups) {
    const [colId, side] = slot.split(':') as [string, Side]
    const edge = side === 'left' ? box(colId).left : box(colId).right
    const rank = (link: Link): [number, number] => {
      const x = endPoint(link, fromFooter(link) ? 'from' : 'to').x
      return [(side === 'left' ? x > edge : x < edge) ? 0 : 1, Math.abs(x - edge)]
    }
    group.sort((p, q) => rank(p)[0] - rank(q)[0] || rank(p)[1] - rank(q)[1]).forEach((link, j) => gutterIndex.set(link.key, j))
  }

  const footerTop = footerEdge ?? Math.min(...(diagram.footer?.nodes ?? []).map((node) => boxes.get(node.id)?.top ?? Infinity))
  const geoms = new Map<string, Geom>(
    links
      .filter((link) => link.crossesFooter)
      .map((link): [string, Geom] => {
        const footPt = endPoint(link, fromFooter(link) ? 'from' : 'to')
        const side = bypass.get(link.key)
        if (!side) {
          const colPt = endPoint(link, fromFooter(link) ? 'to' : 'from')
          return [link.key, { colPt, footPt, straight: Math.abs(colPt.x - footPt.x) < 6 }]
        }
        const j = gutterIndex.get(link.key) ?? 0
        const b = box(colEnd(link))
        const y = b.bottom - HOOK - HOOK_STEP * j
        const colPt = { x: side === 'left' ? b.left : b.right, y }
        const gutterPt = { x: side === 'left' ? b.left - GUTTER - GUTTER_STEP * j : b.right + GUTTER + GUTTER_STEP * j, y }
        return [link.key, { colPt, gutterPt, footPt, straight: false }]
      }),
  )
  const tracks = [...geoms].map(([key, { colPt, gutterPt, footPt, straight }]): Track => {
    const x = gutterPt?.x ?? colPt.x
    return { key, straight, span: [Math.min(x, footPt.x), Math.max(x, footPt.x)], verticals: [{ x, end: 'col' }, { x: footPt.x, end: 'foot' }] }
  })
  const levels = solveLevels(tracks)
  const maxLevel = Math.max(0, ...levels.values())
  const trackY = (level: number) => footerTop - BAND_OFFSET - BAND_GAP * level

  const drawn = links.map((link): Drawn => {
    const base = { key: link.key, kind: link.kind, label: link.label, twoWay: link.kind === 'realtime' }
    const geom = geoms.get(link.key)
    if (geom) {
      const { colPt, gutterPt, footPt, straight } = geom
      const y = trackY(levels.get(link.key) ?? 0)
      const points: Pt[] = straight ? [colPt, footPt] : gutterPt ? [colPt, gutterPt, { x: gutterPt.x, y }, { x: footPt.x, y }, footPt] : [colPt, { x: colPt.x, y }, { x: footPt.x, y }, footPt]
      const d = pathOf(fromFooter(link) ? [...points].reverse() : points)
      if (straight) return { ...base, d, x: colPt.x, y: (colPt.y + trackY(maxLevel)) / 2, side: true }
      return { ...base, d, x: ((gutterPt?.x ?? colPt.x) + footPt.x) / 2, y, side: false }
    }
    const p = endPoint(link, 'from')
    const q = endPoint(link, 'to')
    if (isHorizontal(link.fromSide)) {
      const mx = (p.x + q.x) / 2
      return { ...base, d: `M${round(p.x)} ${round(p.y)} C${round(mx)} ${round(p.y)}, ${round(mx)} ${round(q.y)}, ${round(q.x)} ${round(q.y)}`, x: mx, y: (p.y + q.y) / 2, side: false }
    }
    if (Math.abs(p.x - q.x) < 6) return { ...base, d: pathOf([p, q]), x: p.x, y: (p.y + q.y) / 2, side: true }
    const my = (p.y + q.y) / 2
    return { ...base, d: pathOf([p, { x: p.x, y: my }, { x: q.x, y: my }, q]), x: (p.x + q.x) / 2, y: my, side: false }
  })
  return { drawn, levels: maxLevel }
}

function NodeCard({ node, titles, register }: { node: DiagramNode; titles: Map<string, L>; register: (id: string, el: HTMLElement | null) => void }) {
  const { t } = useLang()
  return (
    <li ref={(el) => register(node.id, el)} className={`arch-node is-${node.owner}`}>
      <div className="arch-node-head">
        {node.icon && (
          <span className="arch-icon">
            <DiagramIcon name={node.icon} />
          </span>
        )}
        <strong className="arch-node-title">{t(node.title)}</strong>
      </div>
      {node.subtitle && <span className="arch-node-sub">{t(node.subtitle)}</span>}
      {node.items && node.items.length > 0 && (
        <ul className="arch-items">
          {node.items.map((item) => (
            <li key={item.ko}>{t(item)}</li>
          ))}
        </ul>
      )}
      {node.links && node.links.length > 0 && (
        <ul className="arch-links">
          {node.links.map((link) => (
            <li key={`${link.to}-${link.label.ko}`} className={`arch-link is-${link.kind ?? 'sync'}`}>
              <span className="arch-arrow" aria-hidden="true">
                →
              </span>
              <span className="arch-link-to">{t(titles.get(link.to) ?? { ko: link.to, en: link.to })}</span>
              <span className="arch-link-label">{t(link.label)}</span>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

const EMPTY: Layout = { drawn: [], levels: 0 }

export function ArchDiagram({ diagram }: { diagram: Diagram }) {
  const { t, lang } = useLang()
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const canvasRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLElement>(null)
  const nodeEls = useRef(new Map<string, HTMLElement>())
  const [layout, setLayout] = useState<Layout>(EMPTY)
  const [size, setSize] = useState({ w: 0, h: 0 })

  const titles = new Map<string, L>(allNodes(diagram).map((node) => [node.id, node.title]))

  const register = useCallback((id: string, el: HTMLElement | null) => {
    if (el) nodeEls.current.set(id, el)
    else nodeEls.current.delete(id)
  }, [])

  const measure = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (typeof window !== 'undefined' && window.matchMedia(NARROW).matches) {
      setLayout(EMPTY)
      return
    }
    const base = canvas.getBoundingClientRect()
    const boxes = new Map<string, Box>()
    for (const [id, el] of nodeEls.current) {
      const r = el.getBoundingClientRect()
      boxes.set(id, { left: r.left - base.left, top: r.top - base.top, right: r.right - base.left, bottom: r.bottom - base.top })
    }
    const footer = footerRef.current ? footerRef.current.getBoundingClientRect().top - base.top : undefined
    setLayout(layoutLinks(diagram, boxes, footer))
    setSize({ w: base.width, h: base.height })
  }, [diagram])

  useLayoutEffect(() => {
    measure()
    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(() => measure())
    if (canvasRef.current) observer.observe(canvasRef.current)
    nodeEls.current.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [measure, lang])

  return (
    <figure className="arch">
      <figcaption className="arch-caption">{t(diagram.caption)}</figcaption>
      {diagram.legend && diagram.legend.length > 0 && (
        <ul className="arch-legend" aria-label={t(ARCH_LABELS.legend)}>
          {diagram.legend.map((item) => (
            <li key={item.kind} className={`is-${item.kind}`}>
              <span className="arch-legend-swatch" aria-hidden="true" />
              {t(item.label)}
            </li>
          ))}
        </ul>
      )}
      <div className="arch-canvas" ref={canvasRef}>
        <svg className="arch-lines" aria-hidden="true" width={size.w || undefined} height={size.h || undefined}>
          <defs>
            {KINDS.map((kind) => (
              <marker key={kind} id={`${uid}-${kind}`} className={`is-${kind}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0 0L10 5L0 10z" fill="currentColor" />
              </marker>
            ))}
          </defs>
          {layout.drawn.map((line) => (
            <path
              key={line.key}
              d={line.d}
              className={`arch-line is-${line.kind}`}
              markerEnd={`url(#${uid}-${line.kind})`}
              markerStart={line.twoWay ? `url(#${uid}-${line.kind})` : undefined}
            />
          ))}
        </svg>
        <div className="arch-columns" style={{ '--cols': diagram.columns.length } as CSSProperties}>
          {diagram.columns.map((column) => (
            <section key={column.title.ko} className="arch-column" aria-label={t(column.title)}>
              <p className="arch-column-title">{t(column.title)}</p>
              <ul className="arch-nodes">
                {column.nodes.map((node) => (
                  <NodeCard key={node.id} node={node} titles={titles} register={register} />
                ))}
              </ul>
            </section>
          ))}
        </div>
        {diagram.footer && (
          <section ref={footerRef} className="arch-footer" aria-label={t(diagram.footer.title)} style={{ '--levels': layout.levels } as CSSProperties}>
            <p className="arch-footer-title">
              {diagram.footer.icon && <DiagramIcon name={diagram.footer.icon} size={16} />}
              {t(diagram.footer.title)}
            </p>
            <ul className="arch-nodes arch-footer-nodes" style={{ '--cols': diagram.footer.nodes.length } as CSSProperties}>
              {diagram.footer.nodes.map((node) => (
                <NodeCard key={node.id} node={node} titles={titles} register={register} />
              ))}
            </ul>
          </section>
        )}
        <div className="arch-labels" aria-hidden="true">
          {layout.drawn.map((line) => (
            <span key={line.key} className={`arch-pill is-${line.kind}${line.side ? ' is-side' : ''}`} style={{ left: line.x, top: line.y }}>
              {t(line.label)}
            </span>
          ))}
        </div>
      </div>
    </figure>
  )
}
