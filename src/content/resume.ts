import type { L, ResumeVariant } from './types'

const k = (ko: string, en: string): L => ({ ko, en })

/** 자기 소개 after the site's intro paragraph: what I do now, how I work, what the record shows */
const SUMMARY: L[] = [
  k(
    '주식회사 Finz Labs에 초기 창업 멤버로 함께해, 회사 내 유일한 개발자로 세금 계산 서비스 finz.kr을 설계·개발·운영하고 있습니다. 세무사와 함께 만든 6Way 계산 로직을 Python에서 TypeScript로 옮겨 기준 사례 21개 항목을 대조해 최대 차이 1원을 확인했고, 저장소 테스트 192개로 지키고 있습니다. 협력 개발사와 함께 만드는 세무사용 FINZ에서는 완료 보고 269건을 다시 검증하고 배포 9번 연속 실패의 원인을 재현했습니다.',
    'I joined Finz Labs as an early founding member and, as the only developer in the company, I design, build and run the tax-calculation service finz.kr. The 6Way tax logic built with a tax accountant was ported from Python to TypeScript and checked against 21 reference-case items with a largest gap of 1 won, guarded by 192 repository tests. For FINZ for tax accountants, built with a partner company, I re-verified 269 items reported as done and reproduced the cause of nine failed deployments in a row.',
  ),
  k(
    '만드는 시간보다 확인하는 시간이 길었습니다. 끝냈다고 말하기 전에 무엇으로 확인했는지부터 정하고, 외부 데이터와 AI 결과는 받는 쪽에서 의심하고 검사합니다. Claude Code · Codex · Antigravity를 매일 역할을 나눠 쓰지만, 무엇을 만들지와 결과가 맞는지는 제가 정하고 확인하며 내보낸 결과는 제가 책임집니다.',
    'Checking has taken longer than building. Before calling anything done I decide what will confirm it, and external data and AI output are doubted and checked on the receiving side. I use Claude Code, Codex and Antigravity every day in separate roles, but what to build and whether the result is right are mine to decide and verify, and I answer for what ships.',
  ),
  k(
    '학부에서는 WebDB 랩장과 AID 랩 학부 연구생으로 지내며 프로젝트 18개, 학술대회 논문 7편(국제 1편 · 1저자 6편), 수상 13건을 쌓았습니다. 넓게 벌린 만큼 깊이가 고르지 않다는 것을 알고, 지금은 대표작을 정해 실패 복구까지 완성하는 방식으로 고치고 있습니다.',
    'At university, as lead of the WebDB lab and an undergraduate researcher at the AID lab, I built up 18 projects, 7 conference papers (1 international, 6 as first author) and 13 awards. Spreading that wide left the depth uneven, so I now pick a flagship and finish it through to failure recovery.',
  ),
]

/** Why this team; the submission copy only */
const MOTIVATION: L[] = [
  k(
    '당근에 지원하는 이유는 세 가지입니다. 출시 뒤 지표와 사용자 로그로 판단하는 팀에서 일하고 싶습니다. 혼자 운영하며 지표 없이 무엇을 놓치는지 체감했기 때문입니다. 제가 다뤄 온 외부 연동, 캐시, 재시도, 비동기 처리를 당근의 트래픽 규모에서 풀어 보고 싶습니다. 그리고 언어와 프레임워크를 팀이 푸는 문제에 맞춰 고른다는 당근 백엔드의 방식이, Node.js와 Python을 오가며 일해 온 저와 맞습니다.',
    'Three reasons. I want to work in a team that judges by metrics and user logs after release; running a service alone without them showed me what I was missing. I want to take the external integrations, caching, retries and asynchronous work I have handled to Daangn\'s scale of traffic. And choosing the language and framework by the problem the team is solving, as Daangn\'s backend does, fits how I have worked across Node.js and Python.',
  ),
]

/** Bare tool lists; every tool appears in a bullet above or below with what it was used for */
const SKILLS: ResumeVariant['skills'] = [
  { area: k('백엔드', 'Backend'), items: ['TypeScript', 'Node.js (Next.js · Express 5 · Fastify)', 'Python (FastAPI)'] },
  { area: k('데이터·비동기', 'Data · async'), items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'BullMQ', 'node-cron'] },
  { area: k('AI', 'AI'), items: ['OpenAI API', 'Whisper', 'ONNX Runtime', 'PyTorch'] },
  { area: k('도구', 'Tools'), items: ['Vitest', 'pytest', 'GitHub Actions', 'Vercel', 'Expo', 'Docker'] },
]

/** Organisation experience that is not developer work but shows how the owner works with people */
const OTHER = ['웹 프로그래밍 멘토링 멘토 · 스터디 리더', '오산시 해커톤 대회 멘토', '어학 연수']

export const RESUME_SITE: ResumeVariant = { id: 'site', summary: SUMMARY, skills: SKILLS, otherExperiences: OTHER }

/** The submission copy for 당근: a backend title, the 지원 동기 paragraph and the 병역·입사 line, which stays out of the public site and the repository */
export function daangnVariant(service?: L, phone?: string): ResumeVariant {
  return { id: 'daangn', role: k('백엔드 개발자', 'Backend developer'), service, phone, summary: SUMMARY, motivation: MOTIVATION, skills: SKILLS, otherExperiences: OTHER }
}
