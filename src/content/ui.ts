import type { Contribution, FlowStep, L, Metric, PaperKind, Showcase } from './types'

/** Home section ids, used as anchors by the top menu. */
export const HOME_IDS = {
  flagship: 'projects',
  skills: 'skills',
  supporting: 'more-projects',
  other: 'other-work',
  experience: 'experience',
  contact: 'contact',
} as const

export const NAV_LABELS = {
  projects: { ko: '프로젝트', en: 'Projects' },
  skills: { ko: '기술', en: 'Skills' },
  experience: { ko: '경험', en: 'Experience' },
  resume: { ko: '이력서', en: 'Résumé' },
} satisfies Record<string, L>

export const SECTION_TITLES = {
  flagship: { ko: '대표 프로젝트', en: 'Main project' },
  skills: { ko: '기술', en: 'Skills' },
  supporting: { ko: '다른 프로젝트', en: 'More projects' },
  other: { ko: '그 밖의 작업', en: 'Other work' },
  experience: { ko: '경험', en: 'Experience' },
  contact: { ko: '연락', en: 'Contact' },
} satisfies Record<string, L>

export const SECTION_LEADS = {
  skills: {
    ko: '프로젝트에서 실제로 쓴 기술만 적었습니다. 근거 링크에서 쓰인 곳을 확인할 수 있습니다.',
    en: 'Only tools I have used in a project, each linked to where it was used.',
  },
  other: {
    ko: '수상과 논문으로 이어진 작업입니다. 나머지 프로젝트는 전체 기록에 있습니다.',
    en: 'Work that led to awards and papers. Every other project is in the full record.',
  },
} satisfies Record<string, L>

export const SHOWCASE_LABELS: Record<Showcase, L> = {
  flagship: { ko: '대표 프로젝트', en: 'Main project' },
  supporting: { ko: '다른 프로젝트', en: 'More projects' },
  other: { ko: '그 밖의 작업', en: 'Other work' },
}

export const SKILL_HEADINGS = {
  area: { ko: '역량', en: 'Area' },
  items: { ko: '기술', en: 'Tools' },
  did: { ko: '무엇을 했나', en: 'What I did' },
  evidence: { ko: '근거', en: 'Where to see it' },
} satisfies Record<string, L>

export const CONTRIBUTION_LABELS: Record<keyof Contribution, L> = {
  direct: { ko: '직접 구현', en: 'Built myself' },
  joint: { ko: '함께 결정', en: 'Decided together' },
  others: { ko: '다른 사람 구현', en: 'Built by others' },
  verified: { ko: '직접 검증', en: 'Verified myself' },
  notYet: { ko: '아직 안 한 일', en: 'Not done yet' },
}

export const FLOW_OWNER: Record<FlowStep['owner'], L> = {
  mine: { ko: '직접 구현', en: 'Built by me' },
  external: { ko: '외부', en: 'External' },
}

export const METRIC_HEADINGS = {
  label: { ko: '항목', en: 'Item' },
  value: { ko: '값', en: 'Value' },
  target: { ko: '무엇을 쟀나', en: 'What was measured' },
  condition: { ko: '조건', en: 'Conditions' },
  source: { ko: '출처', en: 'Source' },
  checkedAt: { ko: '확인일', en: 'Checked' },
} satisfies Record<string, L>

export const METRIC_SOURCES: Record<Metric['source'], L> = {
  measured: { ko: '직접 측정', en: 'Measured' },
  paper: { ko: '논문 보고', en: 'Reported in paper' },
  cited: { ko: '공개 자료 인용', en: 'Cited' },
  page: { ko: '페이지 표기', en: 'Stated on page' },
}

export const PAPER_KINDS: Record<PaperKind, L> = {
  international: { ko: '국제 학술대회', en: 'International conference' },
  domestic: { ko: '국내 학술대회', en: 'Domestic conference' },
  contest: { ko: '논문 공모전', en: 'Paper contest' },
  campus: { ko: '교내 발표', en: 'Campus presentation' },
}

const ORDINALS = ['First', 'Second', 'Third', 'Fourth', 'Fifth']

export function authorOrderLabel(order: number): L {
  return { ko: `${order}저자`, en: `${ORDINALS[order - 1] ?? `${order}th`} author` }
}

export function paperSummary(counts: { conference: number; international: number; firstAuthor: number }): L {
  return {
    ko: `학술대회 논문 ${counts.conference}편 (국제 ${counts.international} · 1저자 ${counts.firstAuthor})`,
    en: `${counts.conference} conference papers (${counts.international} international · ${counts.firstAuthor} as first author)`,
  }
}

export function checkedOn(date: string): L {
  return { ko: `${date} 확인`, en: `checked ${date}` }
}

export function capturedOn(date: string): L {
  return { ko: `${date} 촬영`, en: `captured ${date}` }
}

export const ARCHIVE_HEADINGS = {
  projects: { ko: '전체 프로젝트', en: 'All projects' },
  papers: { ko: '논문·발표', en: 'Papers and talks' },
  awards: { ko: '수상', en: 'Awards' },
  activities: { ko: '활동', en: 'Activities' },
  experience: { ko: '경력', en: 'Work' },
  education: { ko: '학력', en: 'Education' },
  certs: { ko: '자격', en: 'Certifications' },
} satisfies Record<string, L>

export const UI = {
  skipToContent: { ko: '본문으로 건너뛰기', en: 'Skip to content' },
  themeToDark: { ko: '어두운 화면으로 전환', en: 'Switch to dark theme' },
  themeToLight: { ko: '밝은 화면으로 전환', en: 'Switch to light theme' },
  langSwitch: { ko: 'Switch to English', en: '한국어로 보기' },
  mainMenu: { ko: '주 메뉴', en: 'Main menu' },
  footer: { ko: '© 2026 허준영', en: '© 2026 Heo Jun Young' },
  footerSource: { ko: '이 사이트의 코드', en: "This site's code" },
  photoAlt: { ko: '허준영 프로필 사진', en: 'Portrait of Heo Jun Young' },
  ctaProjects: { ko: '대표 프로젝트 보기', en: 'See the main project' },
  ctaResume: { ko: '이력서', en: 'Résumé' },
  blog: { ko: '기술 블로그', en: 'Tech blog' },
  details: { ko: '자세히 보기', en: 'Read the case study' },
  whatIBuilt: { ko: '내가 만든 것', en: 'What I built' },
  verification: { ko: '검증', en: 'Verification' },
  stack: { ko: '기술', en: 'Stack' },
  screens: { ko: '화면', en: 'Screens' },
  moreScreens: { ko: '화면 더 보기', en: 'More screens' },
  allProjects: { ko: '전체 기록 보기', en: 'See the full record' },
  story: { ko: '4년 이야기', en: 'The four-year story' },
  work: { ko: '일', en: 'Work' },
  education: { ko: '학력', en: 'Education' },
  topAwards: { ko: '대표 수상', en: 'Selected awards' },
  papers: { ko: '논문', en: 'Papers' },
  allPapers: { ko: '논문·발표 전체', en: 'All papers and talks' },
  awardsCount: { ko: '전체 수상', en: 'All awards' },
  team: { ko: '팀', en: 'Team' },
  gpa: { ko: '학점', en: 'GPA' },
  backToProjects: { ko: '프로젝트 목록', en: 'All projects' },
  onThisPage: { ko: '이 페이지', en: 'On this page' },
  mediaHeading: { ko: '화면과 시연', en: 'Screens and demo' },
  contributionHeading: { ko: '내 역할과 협업 범위', en: 'My part and who did what' },
  metricsHeading: { ko: '확인한 수치', en: 'Numbers I checked' },
  featuresHeading: { ko: '내가 만든 기능', en: 'What I built' },
  audience: { ko: '대상', en: 'For' },
  period: { ko: '기간', en: 'Period' },
  role: { ko: '역할', en: 'Role' },
  status: { ko: '상태', en: 'Status' },
  openOriginal: { ko: '원본 보기', en: 'Open full size' },
  mockupBadge: { ko: '목업', en: 'Mockup' },
  videoFallback: { ko: '이 브라우저에서는 영상을 재생할 수 없습니다.', en: "This browser can't play the video." },
  onHold: { ko: '공개 보류', en: 'On hold' },
  pageNav: { ko: '페이지 이동', en: 'Page navigation' },
  home: { ko: '홈', en: 'Home' },
  notFound: { ko: '찾는 페이지가 없습니다.', en: "This page doesn't exist." },
  storyTitle: { ko: '4년 이야기', en: 'The four-year story' },
  storyLead: {
    ko: '2023년부터 2026년까지, 해마다 무엇을 만들고 무엇을 배웠는지 적었습니다.',
    en: 'What I built and learned each year, from 2023 to 2026.',
  },
  storyYears: { ko: '연도', en: 'Years' },
  storyProjects: { ko: '이 해의 프로젝트', en: 'Projects this year' },
  archiveTitle: { ko: '전체 기록', en: 'Full record' },
  archiveLead: {
    ko: '모든 프로젝트와 논문, 수상, 활동을 모았습니다.',
    en: 'Every project, paper, award and activity in one place.',
  },
  resumeTitle: { ko: '이력서', en: 'Résumé' },
  resumePdf: { ko: 'PDF 내려받기', en: 'Download PDF' },
} satisfies Record<string, L>
