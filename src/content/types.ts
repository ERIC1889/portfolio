export type Lang = 'ko' | 'en'

export type L = { ko: string; en: string }

export type Year = 2023 | 2024 | 2025 | 2026

/** featured: has its own page · card: a short entry on the story and archive pages · line: one line in the archive */
export type Tier = 'featured' | 'card' | 'line'

/** Where a featured project sits on the home page. */
export type Showcase = 'flagship' | 'supporting' | 'other'

export type LinkKind = 'live' | 'code' | 'paper' | 'slides' | 'video' | 'test' | 'site'

export interface LinkItem {
  label: L
  href: string
  kind?: LinkKind
}

/** A real screen, a design mockup, a drawn diagram or a recorded demo. */
export interface Media {
  kind: 'screenshot' | 'mockup' | 'video'
  src: string
  /** Still frame shown before a video plays. */
  poster?: string
  width: number
  height: number
  alt: L
  /** Feature · what it is (real screen / mockup) · version or source. */
  caption: L
  /** YYYY-MM-DD the screen was captured. */
  capturedAt: string
  /** phone: a bare mobile screenshot, framed with a bezel · device: a capture that already shows the device frame. */
  shape?: 'wide' | 'phone' | 'device'
}

/** A number on the site always says what was measured, under which conditions, and where it comes from. */
export interface Metric {
  label: L
  value: string
  target: L
  condition: L
  source: 'measured' | 'paper' | 'cited' | 'page'
  checkedAt: string
  href?: string
}

/** Who did what, split by feature rather than by percentage. */
export interface Contribution {
  direct: L[]
  joint?: L[]
  others?: L[]
  verified?: L[]
  notYet?: L[]
}

/** One box in a request flow, marked by who built it. */
export interface FlowStep {
  label: L
  detail?: L
  owner: 'mine' | 'external'
  /** Alternative paths out of this step, e.g. how a response is handled. */
  branches?: { when: L; then: L }[]
}

/** Input-to-result flow drawn on the case page, from the code. */
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
  /** Fragment id for links into this section (e.g. #refund-app). */
  anchor?: string
  media?: Media[]
  table?: { head: L[]; rows: L[][] }
  hold?: boolean
  holdKey?: string
}

export interface Project {
  slug: string
  /** Korean (or brand) display name; nameEn replaces it for English readers when the two differ. */
  name: string
  nameEn?: string
  years: Year[]
  tier: Tier
  showcase?: Showcase
  period: string
  team?: L
  role?: L
  status?: L
  /** YYYY-MM-DD the status was last confirmed. */
  statusCheckedAt?: string
  stack: string[]
  summary: L
  /** Product title used on the case page (e.g. "Finz property tax comparison"). */
  title?: L
  /** What the product is, in one sentence. */
  product?: L
  audience?: L
  /** The features I built myself, in a few short lines. */
  features?: L[]
  contribution?: Contribution
  media?: Media[]
  flow?: Flow
  metrics?: Metric[]
  links?: LinkItem[]
  /** Thumbnail for the story and archive pages. */
  image?: string
  imageCaption?: L
  sections?: CaseSection[]
}

/** A count on the record summary, with what it covers. */
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
  /** The owner's own one-line stance, shown under the role. */
  quote: L
  intro: L
  coreStack: string[]
  /** Omitted until the owner supplies a photo. */
  photo?: string
  contacts: Contact[]
}

export type PaperKind = 'international' | 'domestic' | 'contest' | 'campus'

export interface Paper {
  title: string
  /** English title for English readers when the published title is Korean. */
  titleEn?: string
  venue: L
  year: number
  kind: PaperKind
  /** 1 = first author. Left out when not confirmed. */
  authorOrder?: number
  href?: string
}

export interface Award {
  date: string
  name: L
  org: L
  /** Left out when not confirmed. */
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
  evidence: { label: L; href: string }[]
}

export interface Archive {
  papers: Paper[]
  awards: Award[]
  /** Shown on the home page, in this order. */
  topAwards: string[]
  activities: { period: string; name: L; org: L; desc: L }[]
  experience: Experience[]
  skills: SkillRow[]
  education: { school: L; major: L; period: string; note: L; gpa: string }
  certs: { name: L; detail: L }[]
}
