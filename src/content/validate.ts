import type { Lang, Project, SectionId } from './types'

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

/** Every bilingual `{ ko, en }` string inside `value`, with its path. */
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

/** Every plain string (including both sides of bilingual pairs and object keys' values such as `href`). */
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
  'https://junyoung-dev-notes.vercel.app',
  'https://github.com/Hanshin-OSS-Hub/capstone25-skillpilot',
  'https://github.com/ERIC1889/portfolio',
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

// Korean mobile and landline numbers, with or without the +82 prefix.
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

const SECTION_ORDER: SectionId[] = ['problem', 'implementation', 'validation', 'result', 'paper', 'retro', 'evidence']
const REQUIRED_SECTIONS: SectionId[] = ['problem', 'implementation', 'validation', 'result', 'retro', 'evidence']

/** A featured project answers what it is, who did what and how it was checked, in the agreed section order. */
export function checkFeaturedShape(project: Project): string[] {
  const errors: string[] = []
  for (const field of ['title', 'product', 'status', 'role', 'team'] as const) {
    if (!project[field]?.ko.trim()) errors.push(`${project.slug}: missing ${field}`)
  }
  if (!project.showcase) errors.push(`${project.slug}: missing showcase`)
  if (!project.statusCheckedAt || !DATE.test(project.statusCheckedAt)) errors.push(`${project.slug}: statusCheckedAt must be YYYY-MM-DD`)
  if (!project.media?.length) errors.push(`${project.slug}: missing media`)
  const ids = (project.sections ?? []).map((section) => section.id)
  for (const required of REQUIRED_SECTIONS) {
    if (!ids.includes(required)) errors.push(`${project.slug}: missing section ${required}`)
  }
  const ranks = ids.map((id) => SECTION_ORDER.indexOf(id))
  const outOfOrder = ranks.findIndex((rank, i) => i > 0 && rank < ranks[i - 1])
  if (outOfOrder !== -1) errors.push(`${project.slug}: section ${ids[outOfOrder]} is out of order`)
  const anchors = (project.sections ?? []).flatMap((section) => (section.anchor ? [section.anchor] : []))
  if (new Set(anchors).size !== anchors.length) errors.push(`${project.slug}: section anchors repeat`)
  return errors
}

/** Every picture or video says what it is and when it was captured; a mockup says so in its caption. */
export function checkMedia(project: Project): string[] {
  const all = [...(project.media ?? []), ...(project.sections ?? []).flatMap((section) => section.media ?? [])]
  const errors: string[] = []
  for (const media of all) {
    const where = `${project.slug} ${media.src}`
    if (!media.src.startsWith('/')) errors.push(`${where}: src must be a site path`)
    if (!DATE.test(media.capturedAt)) errors.push(`${where}: capturedAt must be YYYY-MM-DD`)
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

/** A number always carries what was measured, the conditions, its source and the date it was checked. */
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
