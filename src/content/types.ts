export type Lang = 'ko' | 'en'

export type L = { ko: string; en: string }

export type Year = 2023 | 2024 | 2025 | 2026

export type Tier = 'featured' | 'supporting' | 'card' | 'line'

export type Showcase = 'flagship' | 'main' | 'supporting' | 'other'

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
  direct: L[]
  joint?: L[]
  others?: L[]
  verified?: L[]
  notYet?: L[]
}

export interface FlowStep {
  label: L
  detail?: L
  owner: 'mine' | 'external'
  branches?: { when: L; then: L }[]
}

export interface Flow {
  title: L
  steps: FlowStep[]
  caption: L
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
  period: string
  team?: L
  role?: L
  status?: L
  statusCheckedAt?: string
  stack: string[]
  summary: L
  title?: L
  product?: L
  audience?: L
  featuresHeading?: L
  features?: L[]
  resumeItems?: L[]
  contribution?: Contribution
  media?: Media[]
  flow?: Flow
  metrics?: Metric[]
  links?: LinkItem[]
  image?: string
  imageSize?: [number, number]
  imageCaption?: L
  sections?: CaseSection[]
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
