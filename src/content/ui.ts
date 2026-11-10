import type { DiagramLinkKind, L, Metric, PaarKey, PaperKind, Showcase } from './types'

export const HOME_IDS = {
  work: 'work',
  projects: 'projects',
  skills: 'skills',
  ai: 'ai',
  supporting: 'more-projects',
  record: 'record',
  contact: 'contact',
} as const

export const NAV_LABELS = {
  projects: { ko: '프로젝트', en: 'Projects' },
  skills: { ko: '기술', en: 'Skills' },
  experience: { ko: '경력', en: 'Experience' },
  resume: { ko: '이력서', en: 'Résumé' },
} satisfies Record<string, L>

export const SECTION_TITLES = {
  work: { ko: '실무 경험', en: 'Work experience' },
  main: { ko: '대표 프로젝트', en: 'Main projects' },
  skills: { ko: '기술', en: 'Skills' },
  ai: { ko: 'AI와 일하는 방식', en: 'How I work with AI' },
  supporting: { ko: '보조 프로젝트', en: 'Supporting projects' },
  record: { ko: '수상과 활동', en: 'Awards and activities' },
  contact: { ko: '연락', en: 'Contact' },
} satisfies Record<string, L>

export const SECTION_LEADS = {
  skills: {
    ko: '프로젝트에서 실제로 쓴 기술만 적었습니다.',
    en: 'Only tools I have used in a project.',
  },
} satisfies Record<string, L>

export const SHOWCASE_LABELS: Record<Showcase, L> = {
  work: { ko: '실무 경험', en: 'Work experience' },
  main: { ko: '대표 프로젝트', en: 'Main project' },
  supporting: { ko: '보조 프로젝트', en: 'Supporting project' },
  other: { ko: '그 밖의 프로젝트', en: 'Other projects' },
}

export const CASE_PARTS = {
  background: { ko: '배경 및 목적', en: 'Background and goals' },
  features: { ko: '주요 기능', en: 'Key features' },
  architecture: { ko: '시스템 아키텍처', en: 'System architecture' },
  cases: { ko: '주요 문제 해결 사례', en: 'Key problems solved' },
  results: { ko: '결과 및 성과', en: 'Results' },
  retro: { ko: '회고', en: 'Reflection' },
  material: { ko: '관련 자료', en: 'Related material' },
} satisfies Record<string, L>

export const WORK_PARTS = {
  company: { ko: '회사 소개', en: 'About the company' },
  duties: { ko: '맡은 일', en: 'What I was in charge of' },
  products: { ko: '회사에서 만든 것', en: 'What I built at the company' },
  results: CASE_PARTS.results,
  retro: CASE_PARTS.retro,
  material: CASE_PARTS.material,
} satisfies Record<string, L>

export const OVERVIEW_LABELS = {
  audience: { ko: '대상', en: 'For' },
  period: { ko: '기간', en: 'Period' },
  team: { ko: '팀 구성', en: 'Team' },
  role: { ko: '담당 역할', en: 'Role' },
  status: { ko: '상태', en: 'Status' },
  scope: { ko: '기여 범위', en: 'Scope of my work' },
  highlights: { ko: '주요 성과', en: 'Key results' },
  stack: { ko: '기술 스택', en: 'Stack' },
  aiUse: { ko: 'AI 활용', en: 'AI tools' },
} satisfies Record<string, L>

export const PAAR_LABELS: Record<PaarKey, L> = {
  problem: { ko: 'Problem', en: 'Problem' },
  analysis: { ko: 'Analysis', en: 'Analysis' },
  action: { ko: 'Action', en: 'Action' },
  result: { ko: 'Result', en: 'Result' },
}

export const LEGACY_LABELS = {
  problem: { ko: '문제', en: 'Problem' },
  fix: { ko: '해결', en: 'Fix' },
} satisfies Record<string, L>

export const ARCH_LABELS = {
  decisions: { ko: '설계 판단', en: 'Design decisions' },
  versions: { ko: '시기별 구조', en: 'Structure by period' },
  legend: { ko: '범례', en: 'Legend' },
} satisfies Record<string, L>

export const DIAGRAM_LINK_KINDS: Record<DiagramLinkKind, L> = {
  sync: { ko: '요청 · 응답', en: 'Request · response' },
  realtime: { ko: '실시간 (WebSocket)', en: 'Real-time (WebSocket)' },
  async: { ko: '비동기 작업', en: 'Async job' },
  paid: { ko: '유료 API', en: 'Paid API' },
  local: { ko: '로컬 처리', en: 'Local processing' },
}

export const PRODUCT_HEADINGS = {
  product: { ko: '제품', en: 'Product' },
  status: { ko: '상태', en: 'Status' },
  role: { ko: '내 역할', en: 'My part' },
} satisfies Record<string, L>

export const AI_LABELS = {
  tools: { ko: '도구별 역할', en: 'Tool roles' },
  flow: { ko: '작업 흐름', en: 'Workflow' },
  example: { ko: '대표 사례', en: 'Example' },
  caseLink: { ko: '사례 보기', en: 'See the case' },
} satisfies Record<string, L>

export const SKILL_HEADINGS = {
  area: { ko: '역량', en: 'Area' },
  items: { ko: '기술', en: 'Tools' },
  did: { ko: '무엇을 했나', en: 'What I did' },
} satisfies Record<string, L>

export const METRIC_HEADINGS = {
  label: { ko: '항목', en: 'Item' },
  value: { ko: '값', en: 'Value' },
  target: { ko: '무엇을 쟀나', en: 'What was measured' },
  condition: { ko: '조건', en: 'Conditions' },
  source: { ko: '출처', en: 'Source' },
} satisfies Record<string, L>

export const METRIC_SOURCES: Record<Metric['source'], L> = {
  measured: { ko: '직접 측정', en: 'Measured' },
  paper: { ko: '논문 보고', en: 'Reported in paper' },
  cited: { ko: '공개 자료 인용', en: 'Cited' },
  page: { ko: '페이지 표기', en: 'Stated on page' },
}

export const PAPER_KINDS: Record<PaperKind, L> = {
  international: { ko: '국제학술대회', en: 'International conference' },
  domestic: { ko: '국내학술대회', en: 'Domestic conference' },
  contest: { ko: '논문 공모전', en: 'Paper contest' },
  campus: { ko: '교내 발표', en: 'Campus presentation' },
}

const ORDINALS = ['First', 'Second', 'Third', 'Fourth', 'Fifth']

export function authorOrderLabel(order: number): L {
  return { ko: `제${order}저자`, en: `${ORDINALS[order - 1] ?? `${order}th`} author` }
}

export const ARCHIVE_HEADINGS = {
  projects: { ko: '전체 프로젝트', en: 'All projects' },
  papers: { ko: '논문·발표', en: 'Papers and talks' },
  awards: { ko: '수상', en: 'Awards' },
  activities: { ko: '활동', en: 'Activities' },
  background: { ko: '경력·학력·자격', en: 'Work, education, certifications' },
  experience: { ko: '경력', en: 'Work' },
  education: { ko: '학력', en: 'Education' },
  certs: { ko: '자격', en: 'Certifications' },
  educationAndCerts: { ko: '학력·자격', en: 'Education and certifications' },
} satisfies Record<string, L>

export const STAT_LABELS = {
  projects: { ko: '프로젝트', en: 'Projects' },
  papers: { ko: '학술대회 논문', en: 'Conference papers' },
  awards: { ko: '수상', en: 'Awards' },
  activities: { ko: '활동', en: 'Activities' },
} satisfies Record<string, L>

export const STAT_NOTES = {
  years: { ko: '2023–2026', en: '2023–2026' },
  grandPrize: { ko: '해커톤 대상(1등) 포함', en: 'Including a hackathon grand prize (1st)' },
} satisfies Record<string, L>

export function seeAllProjectsLabel(count: number): L {
  return { ko: `프로젝트 ${count}개 모두 보기`, en: `See all ${count} projects` }
}

export function paperNote(counts: { international: number; firstAuthor: number }): L {
  return {
    ko: `국제 ${counts.international} · 1저자 ${counts.firstAuthor}`,
    en: `${counts.international} international · ${counts.firstAuthor} as first author`,
  }
}

export const UI = {
  skipToContent: { ko: '본문으로 건너뛰기', en: 'Skip to content' },
  themeToDark: { ko: '어두운 화면으로 전환', en: 'Switch to dark theme' },
  themeToLight: { ko: '밝은 화면으로 전환', en: 'Switch to light theme' },
  langSwitch: { ko: 'Switch to English', en: '한국어로 보기' },
  mainMenu: { ko: '주 메뉴', en: 'Main menu' },
  footer: { ko: '© 2026 허준영', en: '© 2026 Heo Jun Young' },
  footerSource: { ko: '이 사이트의 코드', en: "This site's code" },
  photoAlt: { ko: '허준영 프로필 사진', en: 'Portrait of Heo Jun Young' },
  ctaProjects: { ko: '대표 프로젝트 보기', en: 'See the main projects' },
  ctaResume: { ko: '이력서', en: 'Résumé' },
  blog: { ko: '기술 블로그', en: 'Tech blog' },
  details: { ko: '자세히 보기', en: 'Read the case study' },
  workDetails: { ko: '실무 상세 보기', en: 'See the work in detail' },
  stack: { ko: '기술', en: 'Stack' },
  allProjects: { ko: '전체 기록 보기', en: 'See the full record' },
  seeAllProjects: { ko: '전체 프로젝트 보기', en: 'See all projects' },
  story: { ko: '4년 이야기', en: 'The four-year story' },
  topAwards: { ko: '대표 수상', en: 'Selected awards' },
  topActivities: { ko: '대표 활동', en: 'Selected activities' },
  featuredActivity: { ko: '대표', en: 'Selected' },
  papers: { ko: '논문', en: 'Papers' },
  featuredAward: { ko: '대표', en: 'Selected' },
  archiveJump: { ko: '기록 바로가기', en: 'Jump to' },
  recordStats: { ko: '기록 요약', en: 'At a glance' },
  team: { ko: '팀', en: 'Team' },
  gpa: { ko: '학점', en: 'GPA' },
  backToProjects: { ko: '프로젝트 목록으로', en: 'Back to projects' },
  backToWork: { ko: '실무 경험으로', en: 'Back to work experience' },
  onThisPage: { ko: '이 페이지', en: 'On this page' },
  screens: { ko: '화면과 시연', en: 'Screens and demo' },
  screensOnly: { ko: '화면', en: 'Screens' },
  metricsHeading: { ko: '확인한 수치', en: 'Numbers I checked' },
  verifiedHeading: { ko: '직접 검증', en: 'Verified myself' },
  featuresHeading: { ko: '주요 기능', en: 'Key features' },
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
  resumePdf: { ko: 'PDF 내려받기', en: 'Download PDF' },
  resumeSummary: { ko: '요약', en: 'Summary' },
  resumePhone: { ko: '전화', en: 'Phone' },
  resumeSite: { ko: '포트폴리오', en: 'Portfolio' },
  resumeService: { ko: '병역 · 입사', en: 'Service · start' },
  resumeAwards: { ko: '수상', en: 'Awards' },
  resumeActivities: { ko: '활동', en: 'Activities' },
} satisfies Record<string, L>

/** Section titles of the résumé, in the order a Korean developer résumé is read: 제목·직무명 in the header, then these */
export const RESUME_SECTIONS = {
  profile: { ko: '인적 사항', en: 'Profile' },
  intro: { ko: '자기 소개', en: 'About me' },
  education: { ko: '학력 및 교육 사항', en: 'Education' },
  career: { ko: '경력', en: 'Experience' },
  projects: { ko: '프로젝트', en: 'Projects' },
  activities: { ko: '직무 관련 활동', en: 'Related activities' },
  other: { ko: '기타 경력 및 경험', en: 'Other experience' },
  skills: { ko: '스킬', en: 'Skills' },
} satisfies Record<string, L>
