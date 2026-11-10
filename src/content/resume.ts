import type { L, ResumeVariant } from './types'

const k = (ko: string, en: string): L => ({ ko, en })

/** Three one-line facts a reader takes in before the first section: the job, the verification habit, the AI habit */
const SUMMARY: L[] = [
  k('주식회사 Finz Labs 개발 총괄(2026.01–, 직원 5명) · 유일한 개발자로 finz.kr 세금 계산기 4종 설계·개발·운영 중', 'Head of development at Finz Labs (2026.01–, five people) · the only developer, running the four finz.kr tax calculators I designed and built'),
  k('6Way 계산 로직을 Python에서 TypeScript로 이식해 기준 사례 21개 항목 대조 최대 차이 1원 · 테스트 192개 통과', 'Ported the 6Way tax logic from Python to TypeScript, 21 reference-case items matched with a largest gap of 1 won · 192 tests pass'),
  k('Claude Code · Codex · Antigravity를 매일 역할을 나눠 쓰고, 설계 결정과 최종 검증, 결과의 책임은 직접 집니다', 'Claude Code, Codex and Antigravity every day in separate roles; design decisions, final verification and the responsibility for the result stay with me'),
]

/** Bare tool lists; every tool appears in a bullet above or below with what it was used for */
const SKILLS: ResumeVariant['skills'] = [
  { area: k('백엔드', 'Backend'), items: ['TypeScript', 'Node.js (Next.js · Express 5 · Fastify)', 'Python (FastAPI)'] },
  { area: k('데이터·비동기', 'Data · async'), items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'BullMQ', 'node-cron'] },
  { area: k('AI', 'AI'), items: ['OpenAI API', 'Whisper', 'ONNX Runtime', 'PyTorch'] },
  { area: k('도구', 'Tools'), items: ['Vitest', 'pytest', 'GitHub Actions', 'Vercel', 'Expo'] },
]

/** Listed in full; the other conference papers are counted in one line */
const TOP_PAPERS = ['Pitches: Real-Time Presentation Coaching with Low-Latency Speech Analysis and Generative AI', 'LLM을 활용한 실시간 회의 인지·감성 분석 웹 시스템의 설계 및 구현']

export const RESUME_SITE: ResumeVariant = { id: 'site', summary: SUMMARY, skills: SKILLS, topPapers: TOP_PAPERS }

/** The submission copy for 당근: a backend title and the 병역·입사 line, which stays out of the public site and the repository */
export function daangnVariant(service?: L, phone?: string): ResumeVariant {
  return { id: 'daangn', role: k('백엔드 개발자', 'Backend developer'), service, phone, summary: SUMMARY, skills: SKILLS, topPapers: TOP_PAPERS }
}
