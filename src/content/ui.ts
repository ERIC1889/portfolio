import type { L } from './types'

export type HomeSectionId = 'journey' | 'throughline' | 'cases' | 'archive' | 'contact'

export const NAV_LABELS = {
  journey: { ko: '4년', en: 'Journey' },
  journeyAll: { ko: '한눈에 보기', en: 'Overview' },
  cases: { ko: '사례', en: 'Cases' },
  casesAll: { ko: '사례 목록', en: 'All cases' },
  archive: { ko: '아카이브', en: 'Archive' },
  contact: { ko: '연락처', en: 'Contact' },
} satisfies Record<string, L>

export const SECTION_TITLES: Record<HomeSectionId, L> = {
  journey: { ko: '4년 한눈에', en: 'Four years at a glance' },
  throughline: { ko: '주어진 도구가 주는 데서 멈추지 않는다', en: "I don't stop where my tools stop" },
  cases: { ko: '대표 사례', en: 'Selected cases' },
  archive: { ko: '아카이브', en: 'Archive' },
  contact: { ko: '연락처', en: 'Contact' },
}

export const ARCHIVE_HEADINGS = {
  lines: { ko: '한 줄 프로젝트', en: 'Other projects' },
  papers: { ko: '논문·발표', en: 'Papers & talks' },
  awards: { ko: '수상', en: 'Awards' },
  activities: { ko: '활동', en: 'Activities' },
  work: { ko: '경력', en: 'Work' },
  skills: { ko: '기술', en: 'Skills' },
  education: { ko: '학력', en: 'Education' },
  certs: { ko: '자격', en: 'Certifications' },
} satisfies Record<string, L>

export const UI = {
  themeToggle: { ko: '테마 전환', en: 'Toggle theme' },
  menu: { ko: '메뉴', en: 'Menu' },
  footer: { ko: '© 2026 허준영. All rights reserved.', en: '© 2026 Heo Jun Young. All rights reserved.' },
  photoAlt: { ko: '허준영 프로필 사진', en: 'Portrait of Heo Jun Young' },
  ctaJourney: { ko: '4년 이야기', en: 'The four-year story' },
  ctaCases: { ko: '대표 사례', en: 'Selected cases' },
  statAwards: { ko: '수상', en: 'Awards' },
  statPapers: { ko: '논문', en: 'Papers' },
  statProjects: { ko: '프로젝트', en: 'Projects' },
  constraint: { ko: '막힌 지점', en: 'Constraint' },
  whatIDid: { ko: '내가 한 것', en: 'What I did' },
  diffLegend: { ko: '− 막힌 지점 · + 내가 한 것', en: '− the constraint · + what I did' },
  archiveToggle: { ko: '펼쳐 보기', en: 'Show all' },
  international: { ko: '국제', en: 'International' },
  gpa: { ko: '학점', en: 'GPA' },
  onHold: { ko: '공개 보류', en: 'On hold' },
  pageNav: { ko: '페이지 이동', en: 'Page navigation' },
  yearSwitcher: { ko: '연도', en: 'Years' },
  home: { ko: '홈', en: 'Home' },
  period: { ko: '기간', en: 'Period' },
  team: { ko: '팀', en: 'Team' },
  role: { ko: '역할', en: 'Role' },
  status: { ko: '상태', en: 'Status' },
  stack: { ko: '기술', en: 'Stack' },
  yearFeatured: { ko: '이 해의 대표 사례', en: 'Featured this year' },
  yearCards: { ko: '이 해의 프로젝트', en: 'Projects this year' },
  yearLines: { ko: '그 밖에', en: 'Also' },
  notFound: { ko: '찾는 페이지가 없어요.', en: "This page doesn't exist." },
  close: { ko: '닫기', en: 'Close' },
  details: { ko: '자세히 보기', en: 'See details' },
} satisfies Record<string, L>
