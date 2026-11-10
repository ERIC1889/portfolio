import type { L, ResumeVariant, SkillRow } from './types'

const k = (ko: string, en: string): L => ({ ko, en })

/** Four fact lines a reader can take in before the first section; the first two carry the numbers, the third the role, the fourth the AI habit */
const SUMMARY: L[] = [
  k(
    '주식회사 Finz Labs 개발 총괄 (2026.01–, 직원 5명) · 유일한 개발자로 finz.kr 세금 계산기 4종 설계·개발·운영 중',
    'Head of development at Finz Labs (2026.01–, a five-person startup) · the company’s only developer, designing, building and running the four personal tax calculators at finz.kr',
  ),
  k(
    '세무사와 만든 6Way 계산 로직을 Python에서 TypeScript로 이식, 워크북 21개 항목 대조 최대 차이 1원 · 테스트 192개 통과',
    'Ported the 6Way tax logic written in Python with a tax accountant to TypeScript and matched 21 reference-workbook items, largest gap 1 won · all 192 tests in the finz.kr repository pass',
  ),
  k(
    '외부 데이터와 AI 기능을 API·비동기 처리로 연결하고, 입력 검증과 실패 흐름까지 고민하는 백엔드 개발자입니다.',
    'A backend developer who wires external data and AI features through APIs and asynchronous processing, and thinks through input validation and failure paths.',
  ),
  k(
    'Claude Code · Codex · Antigravity를 거의 매일, 역할을 나눠 씁니다. 구현 속도는 AI에 기대되, 무엇을 만들지, 어떤 구조로 갈지, 결과를 내보낼지는 제가 정하고, 내보낸 결과는 제가 책임집니다.',
    'I use Claude Code, Codex and Antigravity almost every day, each in its own role. AI gives me speed; what to build, which structure to take and whether to ship the result are my decisions, and what ships is my responsibility.',
  ),
]

/** The résumé's compressed skills table; every tool here also appears in a bullet above it with what it was used for */
const SKILLS: SkillRow[] = [
  {
    area: k('백엔드·API', 'Backend · API'),
    items: ['TypeScript', 'Node.js (Next.js · Express 5 · Fastify)', 'Python (FastAPI)'],
    did: k(
      'finz.kr 계산기 API와 시세·환율 대체 조회, SkillPilot 공공 API 7종 정규화, Pitches 실시간 판정 서버, Finz 앱 백엔드(간편인증 상태 흐름, 서버 권한·결제 검증)',
      'finz.kr calculator APIs with market-data fallbacks, normalizing 7 public APIs for SkillPilot, the Pitches real-time judgment server, the Finz app backend (simple-auth state flow, server-side permission and payment checks)',
    ),
  },
  {
    area: k('데이터·비동기', 'Data · async'),
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'BullMQ', 'node-cron', 'Celery'],
    did: k(
      '확정된 시세·환율만 캐시, 정형 데이터와 AI 결과 분리 저장, 발표 후 분석 작업 큐(BullMQ), 공공 데이터·실거래가 주기 동기화(node-cron · Celery Beat)',
      'Caching only settled prices and rates, structured data and AI results stored apart, a post-talk analysis job queue (BullMQ), periodic public-data and transaction-price syncing (node-cron · Celery Beat)',
    ),
  },
  {
    area: k('AI 응용', 'Applied AI'),
    items: ['OpenAI API', 'Whisper', 'ONNX Runtime', 'PyTorch'],
    did: k('LLM 응답을 서버에서 검증, 음성 입력, 이미지 분류 모델 학습과 서버 추론', 'Checking LLM responses on the server, voice input, training an image classifier and serving it'),
  },
  {
    area: k('검증·배포', 'Verification · deployment'),
    items: ['Vitest', 'pytest', 'GitHub Actions', 'Vercel'],
    did: k('기준값 대조 스크립트, push마다 도는 보안 테스트, 이 사이트의 콘텐츠 검증 테스트와 Vercel 배포', 'Reference-value comparison scripts, security tests on every push, this site’s content checks and Vercel deployment'),
  },
]

/** Listed in full; the other conference papers are counted in one line */
const TOP_PAPERS = [
  'LLM을 활용한 실시간 회의 인지·감성 분석 웹 시스템의 설계 및 구현',
  'Pitches: Real-Time Presentation Coaching with Low-Latency Speech Analysis and Generative AI',
  'LLM을 활용한 시니어 정신건강 검사 서비스 개발',
]

export const RESUME_SITE: ResumeVariant = { id: 'site', summary: SUMMARY, skills: SKILLS, topPapers: TOP_PAPERS }

/** The submission copy for 당근: a backend title and the 병역·입사 line, which stays out of the public site and the repository */
export function daangnVariant(service?: L): ResumeVariant {
  return { id: 'daangn', role: k('백엔드 개발자', 'Backend developer'), service, summary: SUMMARY, skills: SKILLS, topPapers: TOP_PAPERS }
}
