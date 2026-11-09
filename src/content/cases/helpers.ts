import type { CaseSection, Diagram, DiagramColumn, DiagramLinkKind, DiagramNode, DiagramOwner, Media, Metric, PaarStep } from '../types'
import { DIAGRAM_LINK_KINDS } from '../ui'

export type Pair = [ko: string, en: string]

export const k = (ko: string, en: string) => ({ ko, en })
export const pair = ([ko, en]: Pair) => ({ ko, en })
export const pairs = (items: Pair[]) => items.map(pair)

export function section(id: CaseSection['id'], title: Pair, body: Pair[], extra: Partial<CaseSection> = {}): CaseSection {
  return { id, title: pair(title), body: body.map(pair), ...extra }
}

export function shot(src: string, width: number, height: number, alt: Pair, caption: Pair, capturedAt: string, shape: Media['shape'] = 'wide'): Media {
  return { kind: 'screenshot', src, width, height, alt: pair(alt), caption: pair(caption), capturedAt, shape }
}

export function video(src: string, poster: string, width: number, height: number, alt: Pair, caption: Pair, capturedAt: string, shape: Media['shape'] = 'wide'): Media {
  return { kind: 'video', src, poster, width, height, alt: pair(alt), caption: pair(caption), capturedAt, shape }
}

export function metric(label: Pair, value: string, target: Pair, condition: Pair, source: Metric['source'], checkedAt: string): Metric {
  return { label: pair(label), value, target: pair(target), condition: pair(condition), source, checkedAt }
}

export function step(body: Pair[], lead?: Pair): PaarStep {
  return { ...(lead ? { lead: pair(lead) } : {}), body: pairs(body) }
}

type NodeExtra = { subtitle?: Pair; items?: Pair[]; links?: [to: string, label: Pair, kind?: DiagramLinkKind][] }

export function node(id: string, owner: DiagramOwner, title: Pair, extra: NodeExtra = {}): DiagramNode {
  return {
    id,
    owner,
    title: pair(title),
    ...(extra.subtitle ? { subtitle: pair(extra.subtitle) } : {}),
    ...(extra.items ? { items: pairs(extra.items) } : {}),
    ...(extra.links ? { links: extra.links.map(([to, label, kind]) => ({ to, label: pair(label), ...(kind ? { kind } : {}) })) } : {}),
  }
}

export const column = (title: Pair, nodes: DiagramNode[]): DiagramColumn => ({ title: pair(title), nodes })

export function diagram(columns: DiagramColumn[], caption: Pair, kinds: DiagramLinkKind[]): Diagram {
  return { columns, caption: pair(caption), legend: kinds.map((kind) => ({ kind, label: DIAGRAM_LINK_KINDS[kind] })) }
}
