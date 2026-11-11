export type Lang = 'ko' | 'en'

export type L = { ko: string; en: string }

export type Year = 2023 | 2024 | 2025 | 2026

export type Tier = 'featured' | 'supporting' | 'card' | 'line'

export type Showcase = 'work' | 'main' | 'supporting' | 'other'

export type CaseKind = 'project' | 'work'

export type LinkKind = 'live' | 'code' | 'paper' | 'slides' | 'video' | 'test' | 'site'

export interface LinkItem {
  label: L
  href: string
  kind?: LinkKind
}

export interface Media {
  kind: 'screenshot' | 'mockup' | 'video'
  src: string
  poster?: string
  width: number
  height: number
  alt: L
  caption: L
  capturedAt?: string
  shape?: 'wide' | 'phone' | 'device'
}

export interface Metric {
  label: L
  value: string
  target: L
  condition: L
  source: 'measured' | 'paper' | 'cited' | 'page'
  checkedAt: string
  href?: string
}

export interface Contribution {
  /** What I did myself; shown as a plain list under 기여 범위 */
  direct: L[]
  verified?: L[]
}

export type DiagramOwner = 'mine' | 'external' | 'data' | 'local'

export type DiagramLinkKind = 'sync' | 'realtime' | 'async' | 'paid' | 'local'

export interface DiagramLink {
  to: string
  label: L
  kind?: DiagramLinkKind
}

export type DiagramIconName =
  | 'phone'
  | 'browser'
  | 'server'
  | 'bolt'
  | 'sparkles'
  | 'cpu'
  | 'cloud'
  | 'database'
  | 'layers'
  | 'folder'
  | 'repeat'
  | 'globe'
  | 'chart'
  | 'calculator'
  | 'file'
  | 'clock'
  | 'image'
  | 'mic'

export interface DiagramNode {
  id: string
  title: L
  subtitle?: L
  items?: L[]
  owner: DiagramOwner
  icon?: DiagramIconName
  links?: DiagramLink[]
}

export interface DiagramColumn {
  title: L
  nodes: DiagramNode[]
}

export interface DiagramFooter {
  title: L
  icon?: DiagramIconName
  nodes: DiagramNode[]
}

export interface Diagram {
  columns: DiagramColumn[]
  footer?: DiagramFooter
  caption: L
  legend?: { kind: DiagramLinkKind; label: L }[]
}

export interface Architecture {
  diagram?: Diagram
  body?: L[]
  decisions?: L[]
  table?: { head: L[]; rows: L[][] }
}

export type PaarKey = 'problem' | 'analysis' | 'action' | 'result'

export interface PaarStep {
  lead?: L
  body: L[]
}

export interface Case {
  title: L
  problem: PaarStep
  analysis?: PaarStep
  action: PaarStep
  result?: PaarStep
  media?: Media[]
}

export interface Overview {
  highlights: L[]
  scope?: L[]
  aiUse?: L
}

export interface Product {
  id: string
  name: L
  status: L
  role: L
  intro: L[]
  features?: L[]
  media?: Media[]
  architecture?: Architecture
  cases?: Case[]
}

export type SectionId = 'problem' | 'implementation' | 'validation' | 'result' | 'paper' | 'retro' | 'evidence'

export interface CaseSection {
  id: SectionId
  title: L
  body: L[]
  anchor?: string
  lead?: boolean
  media?: Media[]
  table?: { head: L[]; rows: L[][] }
  hold?: boolean
  holdKey?: string
}

export interface Project {
  slug: string
  name: string
  nameEn?: string
  years: Year[]
  tier: Tier
  showcase?: Showcase
  kind?: CaseKind
  period: string
  team?: L
  role?: L
  status?: L
  statusCheckedAt?: string
  stack: string[]
  summary: L
  title?: L
  workTitle?: L
  product?: L
  audience?: L
  features?: L[]
  resumeItems?: L[]
  /** Stack line printed on the résumé when the page's stack is too long */
  resumeStack?: string[]
  contribution?: Contribution
  media?: Media[]
  metrics?: Metric[]
  links?: LinkItem[]
  image?: string
  imageSize?: [number, number]
  imageCaption?: L
  overview?: Overview
  background?: L[]
  duties?: L[]
  products?: Product[]
  architecture?: Architecture
  cases?: Case[]
  results?: L[]
  retro?: L[]
  material?: L[]
  sections?: CaseSection[]
}

export interface AiWork {
  lead: L
  tools: { name: string; role: L }[]
  flow: { step: L; who: L }[]
  cards: { title: L; body: L }[]
  example: { text: L; figure: L; href: string }
  blog: { label: L; href: string }
}

export interface Stat {
  value: number
  label: L
  note?: L
}

export interface Chapter {
  year: Year
  name: L
  lesson: L
  essay: L[]
}

export interface Contact {
  kind: 'email' | 'github' | 'linkedin' | 'blog'
  label: L
  value: string
  href: string
}

/** One rendering of the résumé: the public page and the private submission copy share the data and differ only here */
export interface ResumeVariant {
  id: 'site' | 'daangn'
  role?: L
  /** 병역·입사 line; only the submission copy has it */
  service?: L
  /** Phone number; only the submission copy has it, read from the environment, never in the repository */
  phone?: string
  /** Portrait path under public/; the page passes it only when the file exists on disk, and the file stays out of the repository */
  photo?: string
  /** 자기 소개서 paragraphs (the last part) that follow the site's own intro paragraph */
  summary: L[]
  /** 지원 동기 paragraphs; only the submission copy has them */
  motivation?: L[]
  /** Bare tool lists; what each tool was used for is in the bullets below them */
  skills: { area: L; items: string[] }[]
  /** Names of the awards listed in full; the rest are counted */
  topAwards: string[]
  /** Titles of the papers listed in full; the rest are counted */
  topPapers: string[]
}

export interface Profile {
  name: L
  role: L
  quote: L
  intro: L
  coreStack: string[]
  photo?: string
  contacts: Contact[]
}

export type PaperKind = 'international' | 'domestic' | 'contest' | 'campus'

export interface Paper {
  title: string
  titleEn?: string
  venue: L
  year: number
  kind: PaperKind
  authorOrder?: number
  href?: string
}

export interface Award {
  date: string
  name: L
  org: L
  team?: boolean
  project?: string
}

export interface Experience {
  org: L
  title: L
  period: string
  context: L
  /** Slug of the work page this job belongs to; the résumé links its live site and detail page */
  project?: string
  responsibilities: L[]
}

export interface SkillRow {
  area: L
  items: string[]
  did: L
}

export interface Archive {
  papers: Paper[]
  awards: Award[]
  topAwards: string[]
  topActivities: string[]
  activities: { period: string; name: L; org: L; desc: L }[]
  experience: Experience[]
  skills: SkillRow[]
  education: { school: L; major: L; period: string; note: L; gpa: string }
  certs: { name: L; detail: L }[]
}
