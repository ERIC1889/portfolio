import { allMedia, hasNewShape } from './select'
import type { Architecture, Lang, Project } from './types'

type Found = { path: string; lang: Lang; value: string }

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isBilingual(value: unknown): value is { ko: string; en: string } {
  return isRecord(value) && Object.keys(value).length === 2 && typeof value.ko === 'string' && typeof value.en === 'string'
}

function join(path: string, key: string | number) {
  if (typeof key === 'number') return `${path}[${key}]`
  return path ? `${path}.${key}` : key
}

export function collectStrings(value: unknown, path = ''): Found[] {
  if (isBilingual(value)) {
    return [
      { path, lang: 'ko', value: value.ko },
      { path, lang: 'en', value: value.en },
    ]
  }
  if (Array.isArray(value)) return value.flatMap((item, i) => collectStrings(item, join(path, i)))
  if (isRecord(value)) return Object.entries(value).flatMap(([key, item]) => collectStrings(item, join(path, key)))
  return []
}

function collectAllStrings(value: unknown, path = ''): { path: string; key: string; value: string }[] {
  if (typeof value === 'string') return [{ path, key: path.split('.').pop() ?? '', value }]
  if (Array.isArray(value)) return value.flatMap((item, i) => collectAllStrings(item, join(path, i)))
  if (isRecord(value)) return Object.entries(value).flatMap(([key, item]) => collectAllStrings(item, join(path, key)))
  return []
}

function checkLang(content: unknown, lang: Lang): string[] {
  return collectStrings(content)
    .filter((found) => found.lang === lang && found.value.trim() === '')
    .map((found) => `${found.path || '(root)'}: empty ${lang}`)
}

export const checkKo = (content: unknown) => checkLang(content, 'ko')
export const checkEn = (content: unknown) => checkLang(content, 'en')

const ALLOWED_DOMAIN_PREFIXES = [
  'https://finz.kr',
  'https://www.finz.kr',
  'https://github.com/Hanshin-OSS-Hub/capstone25-skillpilot',
  'https://github.com/ERIC1889/portfolio',
  'https://github.com/ERIC1889/pitches',
  'https://github.com/ERIC1889/ClosetMate',
  'https://github.com/ERIC1889/InnoView',
  'https://github.com/ERIC1889/TeamFlow',
  'https://github.com/ERIC1889/Dream_Track',
]

const ALLOWED_EXACT = [
  'https://github.com/ERIC1889',
  'https://www.linkedin.com/in/%EC%A4%80%EC%98%81-%ED%97%88-8142a130a/',
  'mailto:eric1889@naver.com',
]

function isAllowedHref(href: string): boolean {
  if (ALLOWED_EXACT.includes(href)) return true
  if (href.startsWith('/') && !href.startsWith('//')) return true
  if (href.startsWith('#')) return true
  return ALLOWED_DOMAIN_PREFIXES.some((prefix) => href === prefix || href.startsWith(`${prefix}/`) || href.startsWith(`${prefix}?`))
}

export function checkLinks(content: unknown): string[] {
  return collectAllStrings(content)
    .filter((found) => found.key === 'href' && !isAllowedHref(found.value))
    .map((found) => `${found.path}: link not allowed (${found.value})`)
}

export function checkNoLocalPaths(content: unknown): string[] {
  return collectAllStrings(content)
    .filter((found) => found.value.includes('/Users/') || found.value.includes('~/'))
    .map((found) => `${found.path}: local path exposed`)
}

const PHONE = /(?:\+82[\s-]?|\b0)(?:1[016789]|2|[3-6][1-5])[\s.-]?\d{3,4}[\s.-]?\d{4}\b/

export function checkNoPhoneNumbers(content: unknown): string[] {
  return collectAllStrings(content)
    .filter((found) => PHONE.test(found.value) || found.value.startsWith('tel:'))
    .map((found) => `${found.path}: phone number exposed`)
}

export function checkBanned(project: Project, rules: (string | RegExp)[]): string[] {
  const errors: string[] = []
  for (const found of collectAllStrings(project)) {
    for (const rule of rules) {
      const hit = typeof rule === 'string' ? found.value.includes(rule) : rule.test(found.value)
      if (hit) errors.push(`${project.slug}.${found.path}: banned ${String(rule)}`)
    }
  }
  return errors
}

const DATE = /^\d{4}-\d{2}-\d{2}$/

export function checkCaseShape(project: Project): string[] {
  const errors: string[] = []
  const where = project.slug
  for (const field of ['product', 'status', 'role', 'team'] as const) {
    if (!project[field]?.ko.trim()) errors.push(`${where}: missing ${field}`)
  }
  if (!project.showcase) errors.push(`${where}: missing showcase`)
  if (!project.statusCheckedAt || !DATE.test(project.statusCheckedAt)) errors.push(`${where}: statusCheckedAt must be YYYY-MM-DD`)
  if (!allMedia(project).length && !project.image) errors.push(`${where}: missing media or image`)
  if (!hasNewShape(project)) {
    errors.push(`${where}: missing the case shape (overview, background, cases or products)`)
    return errors
  }
  if (project.sections?.length) errors.push(`${where}: legacy sections with the new shape`)
  if ((project.overview?.highlights.length ?? 0) < 2) errors.push(`${where}: overview needs at least 2 highlights`)
  if (!project.background?.length) errors.push(`${where}: missing background`)
  if (!project.results?.length) errors.push(`${where}: missing results`)
  if (!project.retro?.length) errors.push(`${where}: missing retro`)
  if (project.kind === 'work') {
    for (const field of ['features', 'architecture', 'cases'] as const) {
      if (project[field]) errors.push(`${where}: ${field} never renders on a work page; move it into a product`)
    }
    if (!project.duties?.length) errors.push(`${where}: missing duties`)
    if (!project.products?.length) errors.push(`${where}: missing products`)
    const ids = (project.products ?? []).map((product) => product.id)
    if (new Set(ids).size !== ids.length) errors.push(`${where}: product ids repeat`)
    for (const product of project.products ?? []) {
      if (!product.intro.length) errors.push(`${where}: product ${product.id} needs an intro`)
    }
  }
  const cases = [...(project.cases ?? []), ...(project.products ?? []).flatMap((product) => product.cases ?? [])]
  for (const item of cases) {
    if (!item.problem.body.length || !item.action.body.length) errors.push(`${where}: case "${item.title.ko}" needs problem and action`)
  }
  const architectures = [project.architecture, ...(project.products ?? []).map((product) => product.architecture)]
  for (const architecture of architectures) errors.push(...checkDiagram(where, architecture))
  return errors
}

export function checkDiagram(where: string, architecture?: Architecture): string[] {
  const diagram = architecture?.diagram
  if (!diagram) return []
  const errors: string[] = []
  const nodes = [...diagram.columns.flatMap((column) => column.nodes), ...(diagram.footer?.nodes ?? [])]
  const ids = nodes.map((node) => node.id)
  if (new Set(ids).size !== ids.length) errors.push(`${where}: diagram node ids repeat`)
  for (const node of nodes) {
    for (const link of node.links ?? []) {
      if (!ids.includes(link.to)) errors.push(`${where}: diagram link from ${node.id} points at unknown node ${link.to}`)
    }
  }
  const used = new Set(nodes.flatMap((node) => (node.links ?? []).map((link) => link.kind ?? 'sync')))
  const listed = new Set((diagram.legend ?? []).map((item) => item.kind))
  for (const kind of used) if (!listed.has(kind)) errors.push(`${where}: diagram legend misses ${kind}`)
  return errors
}

export function checkMedia(project: Project): string[] {
  const errors: string[] = []
  for (const media of allMedia(project)) {
    const where = `${project.slug} ${media.src}`
    if (!media.src.startsWith('/')) errors.push(`${where}: src must be a site path`)
    if (!media.capturedAt || !DATE.test(media.capturedAt)) errors.push(`${where}: capturedAt must be YYYY-MM-DD`)
    if (!(media.width > 0 && media.height > 0)) errors.push(`${where}: missing size`)
    if (!media.alt.ko.trim() || !media.alt.en.trim()) errors.push(`${where}: missing alt text`)
    if (!media.caption.ko.trim() || !media.caption.en.trim()) errors.push(`${where}: missing caption`)
    if (media.kind === 'video' && !media.poster) errors.push(`${where}: video needs a poster`)
    if (media.kind === 'mockup' && !(media.caption.ko.includes('목업') && /mockup/i.test(media.caption.en))) {
      errors.push(`${where}: a mockup must be labelled as one`)
    }
  }
  return errors
}

export function checkMetrics(project: Project): string[] {
  return (project.metrics ?? []).flatMap((metric) => {
    const errors: string[] = []
    const where = `${project.slug} ${metric.label.ko}`
    if (!metric.value.trim()) errors.push(`${where}: missing value`)
    if (!metric.target.ko.trim()) errors.push(`${where}: missing target`)
    if (!metric.condition.ko.trim()) errors.push(`${where}: missing condition`)
    if (!DATE.test(metric.checkedAt)) errors.push(`${where}: checkedAt must be YYYY-MM-DD`)
    return errors
  })
}
