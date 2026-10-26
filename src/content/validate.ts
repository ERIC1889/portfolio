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
  'https://suzijip.com',
  'https://junyoung-dev-notes.vercel.app',
  'https://github.com/Hanshin-OSS-Hub/capstone25-skillpilot',
]

const ALLOWED_EXACT = [
  'https://github.com/ERIC1889',
  'https://www.linkedin.com/in/%EC%A4%80%EC%98%81-%ED%97%88-8142a130a/',
  'mailto:eric1889@naver.com',
]

function isAllowedHref(href: string): boolean {
  if (ALLOWED_EXACT.includes(href)) return true
  if (href.startsWith('/') && !href.startsWith('//')) return true
  if (href.startsWith('#') || href.startsWith('tel:')) return true
  return ALLOWED_DOMAIN_PREFIXES.some((prefix) => href === prefix || href.startsWith(`${prefix}/`) || href.startsWith(`${prefix}?`))
}

export function checkLinks(content: unknown): string[] {
  return collectAllStrings(content)
    .filter((found) => found.key === 'href' && !isAllowedHref(found.value))
    .map((found) => `${found.path}: link not allowed (${found.value})`)
}

const PROMPT = '~/junyoung $'

export function checkNoLocalPaths(content: unknown): string[] {
  return collectAllStrings(content)
    .filter((found) => found.value.includes('/Users/') || found.value.split(PROMPT).join('').includes('~/'))
    .map((found) => `${found.path}: local path exposed`)
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

const SECTION_ORDER: SectionId[] = ['overview', 'problem', 'decision', 'implementation', 'validation', 'result', 'paper', 'retro', 'evidence']
const REQUIRED_SECTIONS: SectionId[] = ['overview', 'problem', 'decision', 'implementation', 'validation', 'result', 'retro', 'evidence']

export function checkFeaturedShape(project: Project): string[] {
  const errors: string[] = []
  for (const field of ['question', 'status', 'role'] as const) {
    if (!project[field]?.ko.trim()) errors.push(`${project.slug}: missing ${field}`)
  }
  const ids = (project.sections ?? []).map((section) => section.id)
  for (const required of REQUIRED_SECTIONS) {
    if (!ids.includes(required)) errors.push(`${project.slug}: missing section ${required}`)
  }
  const ranks = ids.map((id) => SECTION_ORDER.indexOf(id))
  const outOfOrder = ranks.findIndex((rank, i) => i > 0 && rank < ranks[i - 1])
  if (outOfOrder !== -1) errors.push(`${project.slug}: section ${ids[outOfOrder]} is out of order`)
  return errors
}

export function checkThroughline(projects: Project[]): string[] {
  const errors: string[] = []
  const withNumber = projects.filter((project) => project.throughline !== undefined)
  const counts = new Map<number, number>()
  for (const project of withNumber) {
    counts.set(project.throughline!, (counts.get(project.throughline!) ?? 0) + 1)
    if (!project.scene) errors.push(`${project.slug}: throughline project has no scene`)
  }
  for (const [n, count] of counts) {
    if (count > 1) errors.push(`throughline ${n} is used ${count} times`)
    if (n < 1 || n > 7) errors.push(`throughline ${n} is outside 1..7`)
  }
  const missing = [1, 2, 3, 4, 5, 6, 7].filter((n) => !counts.has(n))
  if (missing.length) errors.push(`throughline missing ${missing.join(', ')}`)
  return errors
}
