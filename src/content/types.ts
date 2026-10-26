export type Lang = 'ko' | 'en'

export type L = { ko: string; en: string }

export type Year = 2023 | 2024 | 2025 | 2026

export type Tier = 'featured' | 'card' | 'line'

export interface Scene {
  minus: L
  plus: L
}

export interface LinkItem {
  label: L
  href: string
}

export type SectionId =
  | 'overview'
  | 'problem'
  | 'decision'
  | 'implementation'
  | 'validation'
  | 'result'
  | 'paper'
  | 'retro'
  | 'evidence'

export interface CaseSection {
  id: SectionId
  title: L
  body: L[]
  scenes?: Scene[]
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
  period: string
  team?: L
  role?: L
  status?: L
  stack: string[]
  summary: L
  scene?: Scene
  throughline?: number
  evidence?: string
  links?: LinkItem[]
  image?: string
  /** What the image shows (e.g. that it is a design mockup, not a screenshot). */
  imageCaption?: L
  question?: L
  sections?: CaseSection[]
}

export interface Chapter {
  year: Year
  name: L
  lesson: L
  essay: L[]
}

export interface Contact {
  kind: 'phone' | 'email' | 'address' | 'languages' | 'github' | 'linkedin'
  label: L
  value: L
  href?: string
}

export interface Profile {
  whoami: L
  quote: L
  intro: L
  photo: string
  contacts: Contact[]
}

export interface Archive {
  /** Papers keep their published title; titleEn is shown to English readers when the original is Korean. */
  papers: { title: string; titleEn?: string; venue: L; year: number; international?: boolean }[]
  awards: { date: string; name: L; org: L }[]
  activities: { period: string; name: L; org: L; desc: L }[]
  work: { company: L; role: L; period: string }[]
  skills: { group: L; items: string[] }[]
  education: { school: L; major: L; period: string; note: L; gpa: string }
  certs: { name: L; detail: L }[]
}
